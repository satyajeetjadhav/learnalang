"use client";

import { useMemo } from "react";
import { getAllWordsByLang, type Word } from "@/data/words";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SpeakButton } from "./speak-button";
import { decompose } from "@/lib/morphology";
import { RiAddLine, RiCheckLine } from "react-icons/ri";
import { useReaderStore } from "@/stores/reader-store";

const LANG_COLORS: Record<string, string> = {
  kn: "text-kannada",
  ml: "text-malayalam",
  bn: "text-bangla",
};

interface InteractiveTextProps {
  text: string;
  lang: string;
  newVocab?: Word[];
}

/**
 * Splits text into tokens (words + punctuation/spaces).
 * Each token is either a "word" or a "separator".
 */
function tokenize(text: string): { value: string; isWord: boolean }[] {
  const tokens: { value: string; isWord: boolean }[] = [];
  // Match sequences of non-whitespace/non-punctuation (word chars including Indic scripts)
  // or sequences of whitespace/punctuation
  const regex = /([^\s.,;:!?।॥\-–—"'()]+)|([.\s,;:!?।॥\-–—"'()]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      tokens.push({ value: match[1], isWord: true });
    } else if (match[2]) {
      tokens.push({ value: match[2], isWord: false });
    }
  }
  return tokens;
}

/**
 * Find a matching known word for a token.
 * Tries exact match first, then checks if any known word is a prefix (for suffixed forms).
 */
function findMatch(token: string, wordMap: Map<string, Word>, words: Word[]): Word | null {
  // Exact match
  if (wordMap.has(token)) return wordMap.get(token)!;

  // Prefix match: check if the token starts with any known word (at least 2 chars)
  // Sort by length descending so longest match wins
  for (const word of words) {
    if (word.targetWord.length >= 2 && token.startsWith(word.targetWord)) {
      return word;
    }
  }

  return null;
}

export function InteractiveText({ text, lang, newVocab = [] }: InteractiveTextProps) {
  const { wordMap, sortedWords } = useMemo(() => {
    const allWords = getAllWordsByLang(lang);
    const map = new Map<string, Word>();
    for (const w of allWords) {
      map.set(w.targetWord, w);
    }
    // Sort by targetWord length descending for longest-prefix match
    const sorted = [...allWords].sort(
      (a, b) => b.targetWord.length - a.targetWord.length
    );
    return { wordMap: map, sortedWords: sorted };
  }, [lang]);

  const { vocabMap, sortedVocab } = useMemo(() => {
    const map = new Map<string, Word>();
    for (const w of newVocab) {
      map.set(w.targetWord, w);
    }
    const sorted = [...newVocab].sort(
      (a, b) => b.targetWord.length - a.targetWord.length
    );
    return { vocabMap: map, sortedVocab: sorted };
  }, [newVocab]);

  const tokens = useMemo(() => tokenize(text), [text]);

  return (
    <span>
      {tokens.map((token, i) => {
        if (!token.isWord) {
          return <span key={i}>{token.value}</span>;
        }

        // First try known words
        const match = findMatch(token.value, wordMap, sortedWords);
        if (match) {
          return <WordHover key={i} token={token.value} word={match} lang={lang} />;
        }

        // Then try new vocab
        const vocabMatch = findMatch(token.value, vocabMap, sortedVocab);
        if (vocabMatch) {
          return <NewWordHover key={i} token={token.value} word={vocabMatch} lang={lang} />;
        }

        return <span key={i}>{token.value}</span>;
      })}
    </span>
  );
}

function WordHover({ token, word, lang }: { token: string; word: Word; lang: string }) {
  const langColor = LANG_COLORS[lang] ?? "";
  const isInflected = token !== word.targetWord;

  const morph = useMemo(() => {
    if (!isInflected) return null;
    return decompose(token, word);
  }, [token, word, isInflected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className={`cursor-pointer rounded-sm border-b border-dashed transition-colors hover:bg-primary/5 active:bg-primary/10 ${
            isInflected
              ? "border-amber-400/40 hover:border-amber-400"
              : "border-primary/30 hover:border-primary"
          } ${langColor}`}
        >
          {token}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="top" align="center">
        {/* Morphology breakdown (shown when word is inflected) */}
        {morph && (
          <div className="mb-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Word Breakdown
            </p>
            <div className="flex items-center gap-1.5 text-lg">
              <span className={`font-bold ${langColor}`}>{morph.rootPart}</span>
              {morph.glide && (
                <span className="text-muted-foreground/60">{morph.glide}</span>
              )}
              <span className="text-amber-400">+</span>
              <span className="font-semibold text-amber-300">{morph.suffix.suffix}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground">
                {word.englishMeaning}
              </span>
              <span className="text-amber-400">+</span>
              <Badge variant="outline" className="border-amber-500/30 font-mono text-[10px] text-amber-300">
                {morph.suffix.roman}
              </Badge>
              <span className="text-muted-foreground/80">{morph.suffix.label}</span>
            </div>
            {/* Marathi/Hindi comparison for the suffix */}
            {(morph.suffix.marathiEquiv || morph.suffix.hindiEquiv) && (
              <div className="mt-2 flex gap-2 text-[11px]">
                {morph.suffix.marathiEquiv && (
                  <span className="text-muted-foreground/70">
                    मराठी: <span className="text-foreground/80">{morph.suffix.marathiEquiv}</span>
                  </span>
                )}
                {morph.suffix.hindiEquiv && (
                  <span className="text-muted-foreground/70">
                    हिन्दी: <span className="text-foreground/80">{morph.suffix.hindiEquiv}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Target word */}
        <div className="flex items-center justify-between">
          <p className={`text-2xl font-bold ${langColor}`}>
            {word.targetWord}
          </p>
          <SpeakButton text={word.targetWord} lang={lang} />
        </div>
        {word.phoneticScript && (
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            /{word.phoneticScript}/
          </p>
        )}

        {/* English meaning */}
        <p className="mt-2 text-sm font-medium">{word.englishMeaning}</p>

        {/* Grammar badge */}
        {word.grammar && (
          <Badge variant="secondary" className="mt-1.5 font-mono text-[10px] uppercase">
            {word.grammar.pos}
            {word.grammar.gender ? ` · ${word.grammar.gender}` : ""}
          </Badge>
        )}

        {/* Anchors */}
        <div className="mt-3 space-y-1.5">
          {word.marathiAnchor && (
            <div className="flex items-center justify-between rounded border border-border/50 bg-muted/20 px-2.5 py-1.5">
              <span className="text-sm">{word.marathiAnchor}</span>
              <span className="font-mono text-[10px] text-muted-foreground/80">मराठी</span>
            </div>
          )}
          {word.hindiAnchor && (
            <div className="flex items-center justify-between rounded border border-border/50 bg-muted/20 px-2.5 py-1.5">
              <span className="text-sm">{word.hindiAnchor}</span>
              <span className="font-mono text-[10px] text-muted-foreground/80">हिन्दी</span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function NewWordHover({ token, word, lang }: { token: string; word: Word; lang: string }) {
  const langColor = LANG_COLORS[lang] ?? "";
  const savedWordIds = useReaderStore((s) => s.savedWordIds);
  const saveWord = useReaderStore((s) => s.saveWord);
  const isSaved = savedWordIds.has(word.id);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className={`cursor-pointer rounded-sm border-b transition-colors hover:bg-amber-500/5 active:bg-amber-500/10 ${
            isSaved
              ? "border-primary/30 border-dashed hover:border-primary"
              : "border-amber-400/50 border-dotted hover:border-amber-400"
          } ${langColor}`}
        >
          {token}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="top" align="center">
        {/* New word indicator */}
        {!isSaved && (
          <div className="mb-3 flex items-center gap-2">
            <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 font-mono text-[10px] uppercase">
              New Word
            </Badge>
          </div>
        )}

        {/* Target word */}
        <div className="flex items-center justify-between">
          <p className={`text-2xl font-bold ${langColor}`}>
            {word.targetWord}
          </p>
          <SpeakButton text={word.targetWord} lang={lang} />
        </div>
        {word.phoneticScript && (
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            /{word.phoneticScript}/
          </p>
        )}

        {/* English meaning */}
        <p className="mt-2 text-sm font-medium">{word.englishMeaning}</p>

        {/* Grammar badge */}
        {word.grammar && (
          <Badge variant="secondary" className="mt-1.5 font-mono text-[10px] uppercase">
            {word.grammar.pos}
            {word.grammar.gender ? ` · ${word.grammar.gender}` : ""}
          </Badge>
        )}

        {/* Anchors */}
        <div className="mt-3 space-y-1.5">
          {word.marathiAnchor && (
            <div className="flex items-center justify-between rounded border border-border/50 bg-muted/20 px-2.5 py-1.5">
              <span className="text-sm">{word.marathiAnchor}</span>
              <span className="font-mono text-[10px] text-muted-foreground/80">मराठी</span>
            </div>
          )}
          {word.hindiAnchor && (
            <div className="flex items-center justify-between rounded border border-border/50 bg-muted/20 px-2.5 py-1.5">
              <span className="text-sm">{word.hindiAnchor}</span>
              <span className="font-mono text-[10px] text-muted-foreground/80">हिन्दी</span>
            </div>
          )}
        </div>

        {/* Save button */}
        <Button
          variant={isSaved ? "secondary" : "default"}
          size="sm"
          className="mt-3 w-full gap-2 font-mono text-xs"
          disabled={isSaved}
          onClick={() => saveWord(word)}
        >
          {isSaved ? (
            <>
              <RiCheckLine className="h-3.5 w-3.5" />
              Saved to Word List
            </>
          ) : (
            <>
              <RiAddLine className="h-3.5 w-3.5" />
              Save Word
            </>
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
