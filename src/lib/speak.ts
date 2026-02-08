const LANG_MAP: Record<string, string> = {
  kn: "kn-IN",
  ml: "ml-IN",
  bn: "bn-IN",
  mr: "mr-IN",
  hi: "hi-IN",
};

const FALLBACK_CHAIN = ["hi-IN", "en-IN", "en-US"];

let currentUtterance: SpeechSynthesisUtterance | null = null;
let passageQueue: string[] = [];
let passageTimer: ReturnType<typeof setTimeout> | null = null;
let currentLang = "";

function findVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  // Exact match first
  const exact = voices.find((v) => v.lang === lang);
  if (exact) return exact;
  // Prefix match (e.g. "kn" matches "kn-IN")
  const prefix = voices.find((v) => v.lang.startsWith(lang.split("-")[0]));
  if (prefix) return prefix;
  return null;
}

/**
 * Split text into sentences for natural reading.
 * Handles Indic purna viram (।), double danda (॥), and standard punctuation.
 */
function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[।॥.!?])\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function speakNextSentence(): void {
  if (passageQueue.length === 0) {
    currentUtterance = null;
    return;
  }

  const sentence = passageQueue.shift()!;
  const ietfLang = LANG_MAP[currentLang] ?? currentLang;

  const utterance = new SpeechSynthesisUtterance(sentence);
  utterance.rate = 0.8;
  utterance.pitch = 1;

  let voice = findVoice(ietfLang);
  if (!voice) {
    for (const fallback of FALLBACK_CHAIN) {
      voice = findVoice(fallback);
      if (voice) break;
    }
  }

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = ietfLang;
  }

  utterance.onend = () => {
    // Pause between sentences for natural rhythm
    passageTimer = setTimeout(speakNextSentence, 400);
  };
  utterance.onerror = () => {
    currentUtterance = null;
    passageQueue = [];
  };

  currentUtterance = utterance;
  speechSynthesis.speak(utterance);
}

/** Speak a single word or short phrase (used by word hover cards). */
export function speak(text: string, lang: string): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  stopSpeaking();

  const ietfLang = LANG_MAP[lang] ?? lang;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  utterance.pitch = 1;

  let voice = findVoice(ietfLang);
  if (!voice) {
    for (const fallback of FALLBACK_CHAIN) {
      voice = findVoice(fallback);
      if (voice) break;
    }
  }

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = ietfLang;
  }

  utterance.onend = () => {
    currentUtterance = null;
  };
  utterance.onerror = () => {
    currentUtterance = null;
  };

  currentUtterance = utterance;
  speechSynthesis.speak(utterance);
}

/** Speak a full passage sentence-by-sentence with pauses. */
export function speakPassage(text: string, lang: string): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  stopSpeaking();

  currentLang = lang;
  passageQueue = splitSentences(text);
  speakNextSentence();
}

export function stopSpeaking(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  speechSynthesis.cancel();
  currentUtterance = null;
  passageQueue = [];
  if (passageTimer) {
    clearTimeout(passageTimer);
    passageTimer = null;
  }
}

export function isSpeaking(): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  return speechSynthesis.speaking || passageQueue.length > 0;
}
