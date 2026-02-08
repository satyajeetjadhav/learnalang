import { VOWELS, CONSONANTS, type ScriptChar } from "@/data/script-data";

// --- Types ---

export interface Akshara {
  display: string;
  consonants: string[];
  matra: string | null;
  vowel: string | null;
  phonetic: string;
  type: "vowel" | "consonant" | "conjunct";
}

type LangKey = "kn" | "ml" | "bn";

// --- Unicode range definitions ---

interface ScriptRange {
  vowelStart: number;
  vowelEnd: number;
  consonantStart: number;
  consonantEnd: number;
  matraStart: number;
  matraEnd: number;
  virama: number;
  anusvara: number;
  visarga: number;
  nukta?: number;
}

const SCRIPT_RANGES: Record<LangKey, ScriptRange> = {
  kn: {
    vowelStart: 0x0c85,     // ಅ
    vowelEnd: 0x0c94,       // ಔ
    consonantStart: 0x0c95, // ಕ
    consonantEnd: 0x0cb9,   // ಹ
    matraStart: 0x0cbe,     // ಾ
    matraEnd: 0x0ccc,       // ೌ
    virama: 0x0ccd,         // ್
    anusvara: 0x0c82,       // ಂ
    visarga: 0x0c83,        // ಃ
  },
  ml: {
    vowelStart: 0x0d05,     // അ
    vowelEnd: 0x0d14,       // ഔ
    consonantStart: 0x0d15, // ക
    consonantEnd: 0x0d39,   // ഹ
    matraStart: 0x0d3e,     // ാ
    matraEnd: 0x0d4c,       // ൌ
    virama: 0x0d4d,         // ്
    anusvara: 0x0d02,       // ം
    visarga: 0x0d03,        // ഃ
  },
  bn: {
    vowelStart: 0x0985,     // অ
    vowelEnd: 0x0994,       // ঔ
    consonantStart: 0x0995, // ক
    consonantEnd: 0x09b9,   // হ
    matraStart: 0x09be,     // া
    matraEnd: 0x09cc,       // ৌ
    virama: 0x09cd,         // ্
    anusvara: 0x0982,       // ং
    visarga: 0x0983,        // ঃ
    nukta: 0x09bc,          // ়
  },
};

// --- Unicode helpers ---

function getRange(lang: string): ScriptRange | null {
  return SCRIPT_RANGES[lang as LangKey] ?? null;
}

function isConsonant(cp: number, range: ScriptRange): boolean {
  return cp >= range.consonantStart && cp <= range.consonantEnd;
}

function isVowel(cp: number, range: ScriptRange): boolean {
  return cp >= range.vowelStart && cp <= range.vowelEnd;
}

function isMatra(cp: number, range: ScriptRange): boolean {
  return cp >= range.matraStart && cp <= range.matraEnd;
}

function isVirama(cp: number, range: ScriptRange): boolean {
  return cp === range.virama;
}

function isAnusvara(cp: number, range: ScriptRange): boolean {
  return cp === range.anusvara;
}

function isVisarga(cp: number, range: ScriptRange): boolean {
  return cp === range.visarga;
}

function isNukta(cp: number, range: ScriptRange): boolean {
  return range.nukta !== undefined && cp === range.nukta;
}

// --- Phonetic lookup ---

// Build lookup maps: target script char → romanization (without trailing 'a' for consonants)
function buildPhoneticMap(lang: LangKey) {
  const consonantMap = new Map<string, string>();
  const vowelMap = new Map<string, string>();

  for (const c of CONSONANTS) {
    const char = c[lang];
    if (char) {
      // Store the base romanization (e.g. "ka" for consonant)
      consonantMap.set(char, c.roman);
    }
  }

  for (const v of VOWELS) {
    const char = v[lang];
    if (char) {
      vowelMap.set(char, v.roman);
    }
  }

  return { consonantMap, vowelMap };
}

const phoneticMaps = new Map<LangKey, ReturnType<typeof buildPhoneticMap>>();
function getPhoneticMap(lang: LangKey) {
  if (!phoneticMaps.has(lang)) {
    phoneticMaps.set(lang, buildPhoneticMap(lang));
  }
  return phoneticMaps.get(lang)!;
}

// Matra code point → corresponding vowel roman
// Matras are the dependent vowel signs; their offset from matraStart
// mirrors the vowel offset from vowelStart (skipping "a" which has no matra)
function matraToRoman(cp: number, range: ScriptRange, lang: LangKey): string {
  const { vowelMap } = getPhoneticMap(lang);
  // The matra at offset 0 (matraStart) corresponds to the second vowel (ā)
  // because the first vowel (a) has no matra — it's the inherent vowel
  const offset = cp - range.matraStart;
  const vowelCp = range.vowelStart + 1 + offset; // +1 to skip 'a'
  const vowelChar = String.fromCodePoint(vowelCp);
  return vowelMap.get(vowelChar) ?? "";
}

function consonantToRoman(char: string, lang: LangKey): string {
  const { consonantMap } = getPhoneticMap(lang);
  return consonantMap.get(char) ?? "";
}

function vowelToRoman(char: string, lang: LangKey): string {
  const { vowelMap } = getPhoneticMap(lang);
  return vowelMap.get(char) ?? "";
}

// --- Main decomposition ---

export function decomposeWord(word: string, lang: string): Akshara[] {
  const range = getRange(lang);
  if (!range) return [];

  const langKey = lang as LangKey;
  const codePoints: number[] = [];
  for (const ch of word) {
    const cp = ch.codePointAt(0);
    if (cp !== undefined) codePoints.push(cp);
  }

  const aksharas: Akshara[] = [];
  let i = 0;

  while (i < codePoints.length) {
    const cp = codePoints[i];

    // Case 1: Standalone vowel
    if (isVowel(cp, range)) {
      const char = String.fromCodePoint(cp);
      let display = char;
      let phonetic = vowelToRoman(char, langKey);

      // Check for anusvara/visarga after vowel
      if (i + 1 < codePoints.length && isAnusvara(codePoints[i + 1], range)) {
        display += String.fromCodePoint(codePoints[i + 1]);
        phonetic += "ṁ";
        i++;
      } else if (i + 1 < codePoints.length && isVisarga(codePoints[i + 1], range)) {
        display += String.fromCodePoint(codePoints[i + 1]);
        phonetic += "ḥ";
        i++;
      }

      aksharas.push({
        display,
        consonants: [],
        matra: null,
        vowel: char,
        phonetic,
        type: "vowel",
      });
      i++;
      continue;
    }

    // Case 2: Consonant (possibly with virama+consonant clusters, matra, anusvara)
    if (isConsonant(cp, range)) {
      const consonantChars: string[] = [];
      let display = "";
      let phonetic = "";
      let matraStr: string | null = null;
      let matraPhonetic: string | null = null;

      // Collect consonant(s) — handle virama-linked conjuncts
      while (i < codePoints.length && isConsonant(codePoints[i], range)) {
        const cChar = String.fromCodePoint(codePoints[i]);
        consonantChars.push(cChar);
        display += cChar;

        // Skip nukta if present (Bangla)
        if (i + 1 < codePoints.length && isNukta(codePoints[i + 1], range)) {
          display += String.fromCodePoint(codePoints[i + 1]);
          i++;
        }

        // Check for virama + next consonant (conjunct)
        if (
          i + 1 < codePoints.length &&
          isVirama(codePoints[i + 1], range) &&
          i + 2 < codePoints.length &&
          isConsonant(codePoints[i + 2], range)
        ) {
          display += String.fromCodePoint(codePoints[i + 1]); // virama
          i += 2; // advance past virama, loop picks up next consonant
          continue;
        }

        // Check for virama at end (halant / pure consonant)
        if (
          i + 1 < codePoints.length &&
          isVirama(codePoints[i + 1], range)
        ) {
          display += String.fromCodePoint(codePoints[i + 1]);
          i += 2;
          break;
        }

        i++;
        break;
      }

      // Build consonant phonetics
      const consonantRomans = consonantChars.map((c) => {
        const r = consonantToRoman(c, langKey);
        // Strip trailing 'a' for all but the last consonant in a conjunct
        return r;
      });

      // Check for matra
      if (i < codePoints.length && isMatra(codePoints[i], range)) {
        const matraCp = codePoints[i];
        matraStr = String.fromCodePoint(matraCp);
        matraPhonetic = matraToRoman(matraCp, range, langKey);
        display += matraStr;
        i++;
      }

      // Check for anusvara/visarga after matra or consonant
      let suffix = "";
      if (i < codePoints.length && isAnusvara(codePoints[i], range)) {
        display += String.fromCodePoint(codePoints[i]);
        suffix = "ṁ";
        i++;
      } else if (i < codePoints.length && isVisarga(codePoints[i], range)) {
        display += String.fromCodePoint(codePoints[i]);
        suffix = "ḥ";
        i++;
      }

      // Build phonetic string
      if (consonantChars.length > 1) {
        // Conjunct: strip 'a' from all consonants, add matra vowel or inherent 'a' at end
        phonetic = consonantRomans.map((r) => r.replace(/a$/, "")).join("");
        phonetic += matraPhonetic ?? "a";
      } else {
        // Single consonant
        if (matraPhonetic) {
          phonetic = consonantRomans[0].replace(/a$/, "") + matraPhonetic;
        } else if (display.includes(String.fromCodePoint(range.virama))) {
          // Halant form — no inherent vowel
          phonetic = consonantRomans[0].replace(/a$/, "");
        } else {
          phonetic = consonantRomans[0]; // inherent 'a'
        }
      }
      phonetic += suffix;

      aksharas.push({
        display,
        consonants: consonantChars,
        matra: matraStr,
        vowel: null,
        phonetic,
        type: consonantChars.length > 1 ? "conjunct" : "consonant",
      });
      continue;
    }

    // Case 3: Anusvara/visarga at start or standalone
    if (isAnusvara(cp, range) || isVisarga(cp, range)) {
      const char = String.fromCodePoint(cp);
      aksharas.push({
        display: char,
        consonants: [],
        matra: null,
        vowel: null,
        phonetic: isAnusvara(cp, range) ? "ṁ" : "ḥ",
        type: "vowel",
      });
      i++;
      continue;
    }

    // Case 4: Non-Indic character (space, punctuation, etc.) — skip
    i++;
  }

  return aksharas;
}
