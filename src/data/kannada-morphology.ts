// ─── Kannada Morphology: Suffix Data ────────────────────────

export interface SuffixEntry {
  /** The suffix in Kannada script */
  suffix: string;
  /** Romanized form */
  roman: string;
  /** What it means / grammatical role */
  label: string;
  /** Category for grouping */
  category: "case" | "verb" | "postposition";
  /** Optional: Marathi equivalent for comparison */
  marathiEquiv?: string;
  /** Optional: Hindi equivalent */
  hindiEquiv?: string;
}

// ─── Noun Case Markers (Vibhakti Pratyaya) ──────────────────
// These attach to nouns to indicate grammatical role in the sentence.
// Kannada has 7 cases (like Sanskrit) — similar to Marathi's vibhakti system.

export const CASE_SUFFIXES: SuffixEntry[] = [
  // Accusative (ದ್ವಿತೀಯಾ) — object of the verb
  { suffix: "ಅನ್ನು", roman: "-annu", label: "accusative · object marker", category: "case", marathiEquiv: "-ला", hindiEquiv: "-को" },
  { suffix: "ನ್ನು", roman: "-nnu", label: "accusative · object marker", category: "case", marathiEquiv: "-ला", hindiEquiv: "-को" },

  // Instrumental (ತೃತೀಯಾ) — by/with
  { suffix: "ಇಂದ", roman: "-inda", label: "instrumental · by/from", category: "case", marathiEquiv: "-ने/-कडून", hindiEquiv: "-से" },
  { suffix: "ದಿಂದ", roman: "-dinda", label: "instrumental · by/from", category: "case", marathiEquiv: "-ने/-कडून", hindiEquiv: "-से" },

  // Dative (ಚತುರ್ಥೀ) — to/for
  { suffix: "ಗೆ", roman: "-ge", label: "dative · to/for", category: "case", marathiEquiv: "-ला/-ს", hindiEquiv: "-को" },
  { suffix: "ಕ್ಕೆ", roman: "-kke", label: "dative · to/for", category: "case", marathiEquiv: "-ला", hindiEquiv: "-को" },
  { suffix: "ಿಗೆ", roman: "-ige", label: "dative · to/for", category: "case", marathiEquiv: "-ला", hindiEquiv: "-को" },

  // Ablative (ಪಂಚಮೀ) — from
  { suffix: "ಇಂದ", roman: "-inda", label: "ablative · from", category: "case", marathiEquiv: "-हून", hindiEquiv: "-से" },

  // Genitive (ಷಷ್ಠೀ) — of/possessive
  { suffix: "ಅ", roman: "-a", label: "genitive · of", category: "case", marathiEquiv: "-चा/-ची/-चे", hindiEquiv: "-का/-की/-के" },
  { suffix: "ದ", roman: "-da", label: "genitive · of", category: "case", marathiEquiv: "-चा/-ची/-चे", hindiEquiv: "-का/-की/-के" },

  // Locative (ಸಪ್ತಮೀ) — in/at/on
  { suffix: "ಅಲ್ಲಿ", roman: "-alli", label: "locative · in/at", category: "case", marathiEquiv: "-त/-मध्ये", hindiEquiv: "-में" },
  { suffix: "ಲ್ಲಿ", roman: "-lli", label: "locative · in/at", category: "case", marathiEquiv: "-त/-मध्ये", hindiEquiv: "-में" },
  { suffix: "ದಲ್ಲಿ", roman: "-dalli", label: "locative · in/at", category: "case", marathiEquiv: "-त/-मध्ये", hindiEquiv: "-में" },

  // Vocative — addressing
  { suffix: "ಏ", roman: "-ē", label: "vocative · hey/oh", category: "case", marathiEquiv: "-ए", hindiEquiv: "-ए" },
];

// ─── Linking glides ─────────────────────────────────────────
// Kannada inserts ಯ (ya) between vowel-ending stems and vowel-starting suffixes.
// e.g., ಮನೆ + ಅಲ್ಲಿ → ಮನೆಯಲ್ಲಿ (mane-y-alli)
export const LINKING_GLIDES = ["ಯ"];

// ─── Verb Conjugation Suffixes ──────────────────────────────
// Kannada verbs conjugate for tense + person + number + gender.
// Root form in word list: ಹೋಗು (hōgu), ಮಾಡು (māḍu), etc.

export const VERB_SUFFIXES: SuffixEntry[] = [
  // Present tense (-ತ್ತ- stem)
  { suffix: "ತ್ತೇನೆ", roman: "-ttēne", label: "present · I (1st sg)", category: "verb", marathiEquiv: "-तो/-ते (मी)", hindiEquiv: "-ता/ती हूँ" },
  { suffix: "ತ್ತೀಯ", roman: "-ttīya", label: "present · you (2nd sg inf)", category: "verb", marathiEquiv: "-तोस/-तेस (तू)", hindiEquiv: "-ता/ती है (तू)" },
  { suffix: "ತ್ತೀಯಾ", roman: "-ttīyā", label: "present · you (2nd sg inf)", category: "verb", marathiEquiv: "-तोस/-तेस (तू)", hindiEquiv: "-ता/ती है (तू)" },
  { suffix: "ತ್ತಾನೆ", roman: "-ttāne", label: "present · he (3rd sg m)", category: "verb", marathiEquiv: "-तो (तो)", hindiEquiv: "-ता है (वह)" },
  { suffix: "ತ್ತಾಳೆ", roman: "-ttāḷe", label: "present · she (3rd sg f)", category: "verb", marathiEquiv: "-ते (ती)", hindiEquiv: "-ती है (वह)" },
  { suffix: "ತ್ತದೆ", roman: "-ttade", label: "present · it (3rd sg n)", category: "verb", marathiEquiv: "-तं (ते)", hindiEquiv: "-ता है" },
  { suffix: "ತ್ತೇವೆ", roman: "-ttēve", label: "present · we (1st pl)", category: "verb", marathiEquiv: "-तो (आम्ही)", hindiEquiv: "-ते हैं (हम)" },
  { suffix: "ತ್ತೀರಿ", roman: "-ttīri", label: "present · you (2nd pl/for)", category: "verb", marathiEquiv: "-ता (तुम्ही)", hindiEquiv: "-ते हैं (आप)" },
  { suffix: "ತ್ತಾರೆ", roman: "-ttāre", label: "present · they (3rd pl)", category: "verb", marathiEquiv: "-तात (ते/त्या)", hindiEquiv: "-ते हैं (वे)" },

  // Past tense
  { suffix: "ದೆ", roman: "-de", label: "past · I (1st sg)", category: "verb", marathiEquiv: "-लो/-ले (मी)", hindiEquiv: "-ा/-ी (मैंने)" },
  { suffix: "ದೆನು", roman: "-denu", label: "past · I (1st sg)", category: "verb", marathiEquiv: "-लो/-ले (मी)", hindiEquiv: "-ा/-ी (मैंने)" },
  { suffix: "ದೆಯ", roman: "-deya", label: "past · you (2nd sg inf)", category: "verb", marathiEquiv: "-लास/-लीस (तू)", hindiEquiv: "-ा/-ी (तूने)" },
  { suffix: "ದ", roman: "-da", label: "past · he (3rd sg m)", category: "verb", marathiEquiv: "-ला (त्याने)", hindiEquiv: "-ा (उसने)" },
  { suffix: "ದನು", roman: "-danu", label: "past · he (3rd sg m)", category: "verb", marathiEquiv: "-ला (त्याने)", hindiEquiv: "-ा (उसने)" },
  { suffix: "ದಳು", roman: "-daḷu", label: "past · she (3rd sg f)", category: "verb", marathiEquiv: "-ली (तिने)", hindiEquiv: "-ी (उसने)" },
  { suffix: "ದೆವು", roman: "-devu", label: "past · we (1st pl)", category: "verb", marathiEquiv: "-लो (आम्ही)", hindiEquiv: "-ा/-ी (हमने)" },
  { suffix: "ದಿರಿ", roman: "-diri", label: "past · you (2nd pl/for)", category: "verb", marathiEquiv: "-लात (तुम्ही)", hindiEquiv: "-ा/-ी (आपने)" },
  { suffix: "ದರು", roman: "-daru", label: "past · they (3rd pl)", category: "verb", marathiEquiv: "-ले (त्यांनी)", hindiEquiv: "-ा/-ी (उन्होंने)" },

  // Future tense
  { suffix: "ುವೆನು", roman: "-uvenu", label: "future · I (1st sg)", category: "verb", marathiEquiv: "-ईन (मी)", hindiEquiv: "-ूँगा/-ूँगी (मैं)" },
  { suffix: "ುವೆ", roman: "-uve", label: "future · you (2nd sg inf)", category: "verb", marathiEquiv: "-शील (तू)", hindiEquiv: "-ेगा/-ेगी (तू)" },
  { suffix: "ುವನು", roman: "-uvanu", label: "future · he (3rd sg m)", category: "verb", marathiEquiv: "-ईल (तो)", hindiEquiv: "-ेगा (वह)" },
  { suffix: "ುವಳು", roman: "-uvaḷu", label: "future · she (3rd sg f)", category: "verb", marathiEquiv: "-ईल (ती)", hindiEquiv: "-ेगी (वह)" },
  { suffix: "ುವುದು", roman: "-uvudu", label: "future · it (3rd sg n)", category: "verb", marathiEquiv: "-ईल (ते)", hindiEquiv: "-ेगा" },
  { suffix: "ುವೆವು", roman: "-uvevu", label: "future · we (1st pl)", category: "verb", marathiEquiv: "-ू (आम्ही)", hindiEquiv: "-ेंगे (हम)" },
  { suffix: "ುವಿರಿ", roman: "-uviri", label: "future · you (2nd pl/for)", category: "verb", marathiEquiv: "-ाल (तुम्ही)", hindiEquiv: "-ेंगे (आप)" },
  { suffix: "ುವರು", roman: "-uvaru", label: "future · they (3rd pl)", category: "verb", marathiEquiv: "-तील (ते/त्या)", hindiEquiv: "-ेंगे (वे)" },

  // Imperative (already have formal in word list, adding informal)
  { suffix: "ು", roman: "-u", label: "imperative · informal", category: "verb", marathiEquiv: "कर (तू)", hindiEquiv: "कर (तू)" },
  { suffix: "ಿ", roman: "-i", label: "imperative · formal", category: "verb", marathiEquiv: "करा (तुम्ही)", hindiEquiv: "कीजिये (आप)" },
  { suffix: "ಿರಿ", roman: "-iri", label: "imperative · very formal", category: "verb", marathiEquiv: "करा (तुम्ही)", hindiEquiv: "कीजिये (आप)" },
];

// All suffixes combined, sorted longest first for greedy matching
export const ALL_SUFFIXES: SuffixEntry[] = [
  ...VERB_SUFFIXES,
  ...CASE_SUFFIXES,
].sort((a, b) => b.suffix.length - a.suffix.length);
