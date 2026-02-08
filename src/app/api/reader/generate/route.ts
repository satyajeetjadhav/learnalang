import { NextRequest, NextResponse } from "next/server";
import { getWordsByLang } from "@/data/words";

const LANG_NAMES: Record<string, string> = {
  kn: "Kannada",
  ml: "Malayalam",
  bn: "Bangla",
};

const VOCAB_TOOL = {
  type: "function" as const,
  function: {
    name: "extract_vocabulary",
    description:
      "Extract new vocabulary words from the passage that are NOT in the learner's known word list.",
    parameters: {
      type: "object",
      properties: {
        vocabulary: {
          type: "array",
          items: {
            type: "object",
            properties: {
              targetWord: {
                type: "string",
                description: "The word in native script",
              },
              phoneticScript: {
                type: "string",
                description: "Romanized transliteration",
              },
              marathiAnchor: {
                type: "string",
                description: "Marathi equivalent in Devanagari",
              },
              hindiAnchor: {
                type: "string",
                description: "Hindi equivalent in Devanagari",
              },
              englishMeaning: {
                type: "string",
                description: "English translation",
              },
              category: {
                type: "string",
                description:
                  "Category like FOOD, TRAVEL, GENERAL, GREETINGS, TECHNICAL",
              },
              grammar: {
                type: "object",
                properties: {
                  pos: {
                    type: "string",
                    enum: [
                      "noun",
                      "verb",
                      "adjective",
                      "pronoun",
                      "adverb",
                      "number",
                      "question",
                      "particle",
                      "phrase",
                    ],
                  },
                  gender: {
                    type: "string",
                    enum: ["masculine", "feminine", "neuter"],
                  },
                  number: {
                    type: "string",
                    enum: ["singular", "plural"],
                  },
                },
                required: ["pos"],
              },
            },
            required: [
              "targetWord",
              "phoneticScript",
              "marathiAnchor",
              "hindiAnchor",
              "englishMeaning",
              "category",
              "grammar",
            ],
          },
        },
      },
      required: ["vocabulary"],
    },
  },
};

export async function POST(request: NextRequest) {
  const { lang, difficulty, topic, apiKey: clientKey } = await request.json();

  const apiKey = clientKey || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "No API key configured. Add one in Settings." },
      { status: 400 }
    );
  }

  // Get known words from static data
  const knownWords = getWordsByLang(lang).map((w) => ({
    targetWord: w.targetWord,
    englishMeaning: w.englishMeaning,
  }));

  const langName = LANG_NAMES[lang] ?? lang;
  const knownWordList =
    knownWords.length > 0
      ? knownWords
          .map((w) => `${w.targetWord} (${w.englishMeaning})`)
          .join(", ")
      : "No words learned yet";

  const difficultyGuide =
    difficulty === "beginner"
      ? "Use very simple sentences. 90% known words, 10% new. Write 3-4 sentences."
      : difficulty === "intermediate"
        ? "Use moderate complexity. 70% known words, 30% new. Write 5-6 sentences."
        : "Use natural complexity. 50% known words, 50% new. Write a short paragraph of 6-8 sentences.";

  const topicPrompt = topic
    ? `Write about: ${topic}.`
    : "Write about daily life or a simple story.";

  const systemPrompt = `You are a ${langName} language tutor. Generate comprehensible input text in ${langName} script for a learner.

The learner already knows these ${langName} words: ${knownWordList}

${difficultyGuide}
${topicPrompt}

Format your response as exactly 5 sections separated by blank lines:
1. The ${langName} text (in native script)
2. A blank line
3. A transliteration in Roman script
4. A blank line
5. A Marathi translation (in Devanagari)
6. A blank line
7. An English translation
8. A blank line
9. A JSON line with 3 suggested follow-up topics. These should be culturally interesting topics related to ${langName}-speaking regions — famous people, places, history, food, festivals, art, nature, daily life. Format: {"topics":[{"label":"short name","prompt":"detailed topic description","emoji":"relevant emoji"},...]}

Keep it natural and interesting. Use Devanagari-familiar sentence structures since the learner knows Marathi/Hindi. The Marathi translation is critical because the learner's mother tongue is Marathi, so seeing the Marathi side-by-side helps them bridge to ${langName}.
The suggested topics must be diverse — don't repeat the current topic. Think about what would naturally interest a learner exploring this culture.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-5-mini",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate a ${difficulty} level ${langName} reading passage.`,
          },
        ],
        max_completion_tokens: 4096,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(
        { error: err.error?.message ?? "OpenAI API error" },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Handle both standard and newer response formats
    const rawText =
      data.choices?.[0]?.message?.content ??
      data.output?.[0]?.content?.[0]?.text ??
      data.output_text ??
      "";

    // Try to extract suggested topics JSON from the last line/section
    let text = rawText;
    let suggestedTopics: { label: string; prompt: string; emoji: string }[] = [];

    const jsonMatch = rawText.match(/\{"topics"\s*:\s*\[[\s\S]*?\]\s*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed.topics)) {
          suggestedTopics = parsed.topics.slice(0, 5);
        }
        // Remove the JSON block from the text
        text = rawText.replace(jsonMatch[0], "").trimEnd();
      } catch {
        // JSON parsing failed, just return the full text
      }
    }

    // ── Call 2: Extract structured vocabulary from the passage ──
    let vocabulary: Record<string, unknown>[] = [];
    try {
      const vocabRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-5-mini",
            messages: [
              {
                role: "system",
                content: `You are a ${langName} vocabulary extractor. Given a ${langName} passage and a list of words the learner already knows, extract ONLY the new words that are NOT in the known list. Use the extract_vocabulary tool to return structured data. Only extract root words — skip inflected forms, particles, and punctuation. The learner speaks Marathi/Hindi, so provide accurate Marathi and Hindi equivalents.`,
              },
              {
                role: "user",
                content: `Known words: ${knownWordList}\n\nPassage:\n${text}`,
              },
            ],
            tools: [VOCAB_TOOL],
            tool_choice: {
              type: "function",
              function: { name: "extract_vocabulary" },
            },
            max_completion_tokens: 2048,
          }),
        }
      );

      if (vocabRes.ok) {
        const vocabData = await vocabRes.json();
        const toolCall =
          vocabData.choices?.[0]?.message?.tool_calls?.[0] ??
          vocabData.output?.find(
            (o: { type: string }) => o.type === "function_call"
          );

        const argsStr =
          toolCall?.function?.arguments ?? toolCall?.arguments ?? null;
        if (argsStr) {
          const parsed = JSON.parse(argsStr);
          if (Array.isArray(parsed.vocabulary)) {
            vocabulary = parsed.vocabulary;
          }
        }
      }
    } catch {
      // Vocabulary extraction is non-critical — passage still works without it
    }

    return NextResponse.json({ text, suggestedTopics, vocabulary });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to connect to OpenAI" },
      { status: 500 }
    );
  }
}
