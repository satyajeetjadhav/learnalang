// ─── Grammar Data Types ─────────────────────────────────────

export interface PronounRow {
  person: string;
  marathi: string;
  hindi: string;
  kn: string;
  knPhonetic: string;
  ml: string;
  mlPhonetic: string;
  bn: string;
  bnPhonetic: string;
}

export interface TenseRow {
  tense: string;
  marathi: string;
  hindi: string;
  kn: string;
  knPhonetic: string;
  ml: string;
  mlPhonetic: string;
  bn: string;
  bnPhonetic: string;
}

export interface PluralRule {
  rule: string;
  singular: string;
  singularPhonetic: string;
  plural: string;
  pluralPhonetic: string;
  english: string;
}

export interface CaseRow {
  caseName: string;
  marker: string;
  example: string;
  examplePhonetic: string;
  meaning: string;
}

export interface VerbConjugation {
  person: string;
  present: string;
  past: string;
  future: string;
}

// ─── Pronouns ───────────────────────────────────────────────
// Cross-linguistic pronoun comparison across all languages

export const PRONOUNS: PronounRow[] = [
  {
    person: "1st singular (I)",
    marathi: "मी", hindi: "मैं",
    kn: "ನಾನು", knPhonetic: "Nānu",
    ml: "ഞാൻ", mlPhonetic: "Ñān",
    bn: "আমি", bnPhonetic: "Āmi",
  },
  {
    person: "2nd singular informal (you)",
    marathi: "तू", hindi: "तू",
    kn: "ನೀನು", knPhonetic: "Nīnu",
    ml: "നീ", mlPhonetic: "Nī",
    bn: "তুই", bnPhonetic: "Tui",
  },
  {
    person: "2nd singular familiar (you)",
    marathi: "तू/तुम्ही", hindi: "तुम",
    kn: "ನೀನು", knPhonetic: "Nīnu",
    ml: "നിങ്ങൾ", mlPhonetic: "Niṅṅaḷ",
    bn: "তুমি", bnPhonetic: "Tumi",
  },
  {
    person: "2nd formal (you)",
    marathi: "तुम्ही/आपण", hindi: "आप",
    kn: "ನೀವು", knPhonetic: "Nīvu",
    ml: "നിങ്ങൾ/താങ്കൾ", mlPhonetic: "Niṅṅaḷ/Tāṅkaḷ",
    bn: "আপনি", bnPhonetic: "Āpni",
  },
  {
    person: "3rd singular masc (he)",
    marathi: "तो", hindi: "वह",
    kn: "ಅವನು", knPhonetic: "Avanu",
    ml: "അവൻ", mlPhonetic: "Avan",
    bn: "সে/ও", bnPhonetic: "She/O",
  },
  {
    person: "3rd singular fem (she)",
    marathi: "ती", hindi: "वह",
    kn: "ಅವಳು", knPhonetic: "Avaḷu",
    ml: "അവൾ", mlPhonetic: "Avaḷ",
    bn: "সে/ও", bnPhonetic: "She/O",
  },
  {
    person: "3rd formal (he/she)",
    marathi: "ते/त्या", hindi: "वे/आप",
    kn: "ಅವರು", knPhonetic: "Avaru",
    ml: "അദ്ദേഹം/അവർ", mlPhonetic: "Addēhaṁ/Avar",
    bn: "উনি/তিনি", bnPhonetic: "Uni/Tini",
  },
  {
    person: "1st plural (we)",
    marathi: "आम्ही/आपण", hindi: "हम",
    kn: "ನಾವು", knPhonetic: "Nāvu",
    ml: "ഞങ്ങൾ/നമ്മൾ", mlPhonetic: "Ñaṅṅaḷ/Nammaḷ",
    bn: "আমরা", bnPhonetic: "Āmrā",
  },
  {
    person: "3rd plural (they)",
    marathi: "ते/त्या", hindi: "वे",
    kn: "ಅವರು", knPhonetic: "Avaru",
    ml: "അവർ", mlPhonetic: "Avar",
    bn: "তারা/ওরা", bnPhonetic: "Tārā/Orā",
  },
];

// ─── Verb Tenses ────────────────────────────────────────────
// "to do/make" conjugated across tenses (base verb for comparison)
// Kannada: ಮಾಡು, Malayalam: ചെയ്യുക, Bangla: করা

export const TENSE_EXAMPLES: TenseRow[] = [
  {
    tense: "Present (I do)",
    marathi: "मी करतो/करते", hindi: "मैं करता/करती हूँ",
    kn: "ನಾನು ಮಾಡುತ್ತೇನೆ", knPhonetic: "Nānu māḍuttēne",
    ml: "ഞാൻ ചെയ്യുന്നു", mlPhonetic: "Ñān ceyyunnu",
    bn: "আমি করি", bnPhonetic: "Āmi kori",
  },
  {
    tense: "Past (I did)",
    marathi: "मी केले/केली", hindi: "मैंने किया/की",
    kn: "ನಾನು ಮಾಡಿದೆ", knPhonetic: "Nānu māḍide",
    ml: "ഞാൻ ചെയ്തു", mlPhonetic: "Ñān ceytu",
    bn: "আমি করলাম", bnPhonetic: "Āmi korlām",
  },
  {
    tense: "Future (I will do)",
    marathi: "मी करेन/करीन", hindi: "मैं करूँगा/करूँगी",
    kn: "ನಾನು ಮಾಡುತ್ತೇನೆ", knPhonetic: "Nānu māḍuvenu",
    ml: "ഞാൻ ചെയ്യും", mlPhonetic: "Ñān ceyyuṁ",
    bn: "আমি করব", bnPhonetic: "Āmi korbo",
  },
  {
    tense: "Imperative (Do!)",
    marathi: "कर / करा", hindi: "करो / कीजिये",
    kn: "ಮಾಡು / ಮಾಡಿ", knPhonetic: "Māḍu / Māḍi",
    ml: "ചെയ്യൂ / ചെയ്യുക", mlPhonetic: "Ceyyū / Ceyyuka",
    bn: "করো / করুন", bnPhonetic: "Koro / Korun",
  },
  {
    tense: "Negative (I don't do)",
    marathi: "मी करत नाही", hindi: "मैं नहीं करता/करती",
    kn: "ನಾನು ಮಾಡುವುದಿಲ್ಲ", knPhonetic: "Nānu māḍuvudilla",
    ml: "ഞാൻ ചെയ്യുന്നില്ല", mlPhonetic: "Ñān ceyyunnilla",
    bn: "আমি করি না", bnPhonetic: "Āmi kori nā",
  },
  {
    tense: "Progressive (I am doing)",
    marathi: "मी करत आहे", hindi: "मैं कर रहा/रही हूँ",
    kn: "ನಾನು ಮಾಡುತ್ತಿದ್ದೇನೆ", knPhonetic: "Nānu māḍuttiddēne",
    ml: "ഞാൻ ചെയ്യുകയാണ്", mlPhonetic: "Ñān ceyyukayāṇ",
    bn: "আমি করছি", bnPhonetic: "Āmi korchi",
  },
];

// ─── Plural Formation ───────────────────────────────────────

export const KANNADA_PLURALS: PluralRule[] = [
  { rule: "-ಗಳು suffix (most common)", singular: "ಮನೆ", singularPhonetic: "Mane", plural: "ಮನೆಗಳು", pluralPhonetic: "Manegaḷu", english: "house → houses" },
  { rule: "-ಗಳು suffix", singular: "ಹುಡುಗ", singularPhonetic: "Huḍuga", plural: "ಹುಡುಗರು", pluralPhonetic: "Huḍugaru", english: "boy → boys (animate)" },
  { rule: "-ರು suffix (animate)", singular: "ಹೆಂಗಸು", singularPhonetic: "Heṅgasu", plural: "ಹೆಂಗಸರು", pluralPhonetic: "Heṅgasaru", english: "woman → women" },
  { rule: "-ಗಳು suffix", singular: "ಪುಸ್ತಕ", singularPhonetic: "Pustaka", plural: "ಪುಸ್ತಕಗಳು", pluralPhonetic: "Pustakagaḷu", english: "book → books" },
  { rule: "-ಗಳು suffix", singular: "ಮರ", singularPhonetic: "Mara", plural: "ಮರಗಳು", pluralPhonetic: "Maragaḷu", english: "tree → trees" },
];

export const MALAYALAM_PLURALS: PluralRule[] = [
  { rule: "-കൾ suffix (most common)", singular: "വീട്", singularPhonetic: "Vīṭ", plural: "വീടുകൾ", pluralPhonetic: "Vīṭukaḷ", english: "house → houses" },
  { rule: "-ങ്ങൾ (after nasal)", singular: "പുസ്തകം", singularPhonetic: "Pustakaṁ", plural: "പുസ്തകങ്ങൾ", pluralPhonetic: "Pustakaṅṅaḷ", english: "book → books" },
  { rule: "-മാർ (animate)", singular: "കുട്ടി", singularPhonetic: "Kuṭṭi", plural: "കുട്ടികൾ", pluralPhonetic: "Kuṭṭikaḷ", english: "child → children" },
  { rule: "-കൾ suffix", singular: "മരം", singularPhonetic: "Maraṁ", plural: "മരങ്ങൾ", pluralPhonetic: "Maraṅṅaḷ", english: "tree → trees" },
  { rule: "-ർ (respectful)", singular: "അധ്യാപകൻ", singularPhonetic: "Adhyāpakan", plural: "അധ്യാപകർ", pluralPhonetic: "Adhyāpakar", english: "teacher → teachers" },
];

export const BANGLA_PLURALS: PluralRule[] = [
  { rule: "-রা suffix (animate)", singular: "ছেলে", singularPhonetic: "Chele", plural: "ছেলেরা", pluralPhonetic: "Chelerā", english: "boy → boys" },
  { rule: "-গুলো (inanimate common)", singular: "বই", singularPhonetic: "Boi", plural: "বইগুলো", pluralPhonetic: "Boigulo", english: "book → books" },
  { rule: "-গুলি (inanimate formal)", singular: "গাছ", singularPhonetic: "Gāch", plural: "গাছগুলি", pluralPhonetic: "Gāchguli", english: "tree → trees" },
  { rule: "-সকল (formal)", singular: "শিক্ষক", singularPhonetic: "Shikkhok", plural: "শিক্ষকসকল", pluralPhonetic: "Shikkhokshokol", english: "teacher → teachers" },
  { rule: "-দের (animate possessive)", singular: "মেয়ে", singularPhonetic: "Meye", plural: "মেয়েদের", pluralPhonetic: "Meyeder", english: "girl → girls'" },
];

// ─── Case Markers ───────────────────────────────────────────

export const KANNADA_CASES: CaseRow[] = [
  { caseName: "Nominative", marker: "-ಉ", example: "ಹುಡುಗನು ಬಂದನು", examplePhonetic: "Huḍuganu bandanu", meaning: "The boy came" },
  { caseName: "Accusative", marker: "-ಅನ್ನು", example: "ಪುಸ್ತಕವನ್ನು ಓದು", examplePhonetic: "Pustakavannu ōdu", meaning: "Read the book" },
  { caseName: "Instrumental", marker: "-ಇಂದ", example: "ಕೈಯಿಂದ ಮಾಡು", examplePhonetic: "Kaiyinda māḍu", meaning: "Do with hand" },
  { caseName: "Dative", marker: "-ಗೆ/-ಕ್ಕೆ", example: "ಮನೆಗೆ ಹೋಗು", examplePhonetic: "Manege hōgu", meaning: "Go to house" },
  { caseName: "Ablative", marker: "-ಇಂದ", example: "ಊರಿಂದ ಬಂದ", examplePhonetic: "Ūrinda banda", meaning: "Came from town" },
  { caseName: "Genitive", marker: "-ಅ", example: "ಅವನ ಮನೆ", examplePhonetic: "Avana mane", meaning: "His house" },
  { caseName: "Locative", marker: "-ಅಲ್ಲಿ/-ಲ್ಲಿ", example: "ಮನೆಯಲ್ಲಿ", examplePhonetic: "Maneyalli", meaning: "In the house" },
];

export const MALAYALAM_CASES: CaseRow[] = [
  { caseName: "Nominative", marker: "(none)", example: "കുട്ടി വന്നു", examplePhonetic: "Kuṭṭi vannu", meaning: "The child came" },
  { caseName: "Accusative", marker: "-എ/-യെ", example: "പുസ്തകം വായിക്കുക", examplePhonetic: "Pustakaṁ vāyikkuka", meaning: "Read the book" },
  { caseName: "Instrumental", marker: "-ആൽ/-കൊണ്ട്", example: "കൈകൊണ്ട് ചെയ്യുക", examplePhonetic: "Kaikoṇṭ ceyyuka", meaning: "Do with hand" },
  { caseName: "Dative", marker: "-ക്ക്/-ന്", example: "വീട്ടിലേക്ക്", examplePhonetic: "Vīṭṭilēkk", meaning: "To the house" },
  { caseName: "Ablative", marker: "-ഇൽനിന്ന്", example: "നാട്ടിൽനിന്ന്", examplePhonetic: "Nāṭṭilninn", meaning: "From town" },
  { caseName: "Genitive", marker: "-ഉടെ/-ന്റെ", example: "അവന്റെ വീട്", examplePhonetic: "Avanṟe vīṭ", meaning: "His house" },
  { caseName: "Locative", marker: "-ഇൽ", example: "വീട്ടിൽ", examplePhonetic: "Vīṭṭil", meaning: "In the house" },
];

export const BANGLA_CASES: CaseRow[] = [
  { caseName: "Nominative", marker: "(none)", example: "ছেলে এলো", examplePhonetic: "Chele elo", meaning: "The boy came" },
  { caseName: "Accusative", marker: "-কে", example: "বইটা পড়ো", examplePhonetic: "Boiṭā poṛo", meaning: "Read the book" },
  { caseName: "Instrumental", marker: "-দিয়ে", example: "হাত দিয়ে করো", examplePhonetic: "Hāt diye koro", meaning: "Do with hand" },
  { caseName: "Dative", marker: "-কে/-তে", example: "বাড়িতে যাও", examplePhonetic: "Bāṛite yāo", meaning: "Go to house" },
  { caseName: "Ablative", marker: "-থেকে", example: "গ্রাম থেকে এলাম", examplePhonetic: "Grām theke elām", meaning: "Came from village" },
  { caseName: "Genitive", marker: "-র/-ের", example: "তার বাড়ি", examplePhonetic: "Tār bāṛi", meaning: "His house" },
  { caseName: "Locative", marker: "-তে/-এ", example: "বাড়িতে", examplePhonetic: "Bāṛite", meaning: "In the house" },
];

// ─── Verb Conjugation Tables ────────────────────────────────
// Present tense of "to do" across all persons

export const KANNADA_VERB_CONJUGATION: VerbConjugation[] = [
  { person: "ನಾನು (I)", present: "ಮಾಡುತ್ತೇನೆ", past: "ಮಾಡಿದೆ", future: "ಮಾಡುವೆನು" },
  { person: "ನೀನು (you inf.)", present: "ಮಾಡುತ್ತೀಯ", past: "ಮಾಡಿದೆ", future: "ಮಾಡುವೆ" },
  { person: "ನೀವು (you for.)", present: "ಮಾಡುತ್ತೀರಿ", past: "ಮಾಡಿದಿರಿ", future: "ಮಾಡುವಿರಿ" },
  { person: "ಅವನು (he)", present: "ಮಾಡುತ್ತಾನೆ", past: "ಮಾಡಿದನು", future: "ಮಾಡುವನು" },
  { person: "ಅವಳು (she)", present: "ಮಾಡುತ್ತಾಳೆ", past: "ಮಾಡಿದಳು", future: "ಮಾಡುವಳು" },
  { person: "ಅವರು (they/for.)", present: "ಮಾಡುತ್ತಾರೆ", past: "ಮಾಡಿದರು", future: "ಮಾಡುವರು" },
  { person: "ನಾವು (we)", present: "ಮಾಡುತ್ತೇವೆ", past: "ಮಾಡಿದೆವು", future: "ಮಾಡುವೆವು" },
];

export const MALAYALAM_VERB_CONJUGATION: VerbConjugation[] = [
  { person: "ഞാൻ (I)", present: "ചെയ്യുന്നു", past: "ചെയ്തു", future: "ചെയ്യും" },
  { person: "നീ (you inf.)", present: "ചെയ്യുന്നു", past: "ചെയ്തു", future: "ചെയ്യും" },
  { person: "നിങ്ങൾ (you for.)", present: "ചെയ്യുന്നു", past: "ചെയ്തു", future: "ചെയ്യും" },
  { person: "അവൻ (he)", present: "ചെയ്യുന്നു", past: "ചെയ്തു", future: "ചെയ്യും" },
  { person: "അവൾ (she)", present: "ചെയ്യുന്നു", past: "ചെയ്തു", future: "ചെയ്യും" },
  { person: "അവർ (they)", present: "ചെയ്യുന്നു", past: "ചെയ്തു", future: "ചെയ്യും" },
  { person: "ഞങ്ങൾ (we)", present: "ചെയ്യുന്നു", past: "ചെയ്തു", future: "ചെയ്യും" },
];

export const BANGLA_VERB_CONJUGATION: VerbConjugation[] = [
  { person: "আমি (I)", present: "করি", past: "করলাম", future: "করব" },
  { person: "তুই (you inf.)", present: "করিস", past: "করলি", future: "করবি" },
  { person: "তুমি (you fam.)", present: "করো", past: "করলে", future: "করবে" },
  { person: "আপনি (you for.)", present: "করেন", past: "করলেন", future: "করবেন" },
  { person: "সে (he/she)", present: "করে", past: "করল", future: "করবে" },
  { person: "উনি (he/she for.)", present: "করেন", past: "করলেন", future: "করবেন" },
  { person: "আমরা (we)", present: "করি", past: "করলাম", future: "করব" },
];

// ─── Key Grammar Notes ──────────────────────────────────────

export interface GrammarNote {
  title: string;
  description: string;
  lang: string;
}

export const GRAMMAR_NOTES: GrammarNote[] = [
  // Kannada
  { lang: "kn", title: "SOV word order", description: "Kannada follows Subject-Object-Verb order like Hindi/Marathi. ನಾನು ಅನ್ನ ತಿನ್ನುತ್ತೇನೆ (I rice eat)." },
  { lang: "kn", title: "Agglutinative verb endings", description: "Verb stems take suffixes for tense + person + number + gender. ಮಾಡು → ಮಾಡುತ್ತೇನೆ (māḍu → māḍuttēne)." },
  { lang: "kn", title: "No grammatical gender in plural", description: "Unlike Hindi/Marathi, Kannada plural verbs don't change for gender. ಅವರು ಮಾಡುತ್ತಾರೆ (avaru māḍuttāre) for all genders." },
  { lang: "kn", title: "Case suffixes agglutinate", description: "ಮನೆ (house) → ಮನೆಗೆ (to house) → ಮನೆಯಲ್ಲಿ (in house) → ಮನೆಯಿಂದ (from house)." },

  // Malayalam
  { lang: "ml", title: "Verb-final but flexible", description: "Malayalam is SOV but allows more word order flexibility than Kannada. Emphasis changes word order." },
  { lang: "ml", title: "No verb person agreement", description: "Unlike Kannada, Malayalam verbs DON'T change for person/number. ചെയ്യുന്നു (ceyyunnu) = 'doing' for all persons." },
  { lang: "ml", title: "Heavy agglutination", description: "Single words can pack root + case + postposition. കടയിൽനിന്ന് = shop + in + from." },
  { lang: "ml", title: "Inclusive vs exclusive we", description: "ഞങ്ങൾ (ñaṅṅaḷ) = exclusive we (not you), നമ്മൾ (nammaḷ) = inclusive we (including you). Hindi/Marathi don't distinguish." },

  // Bangla
  { lang: "bn", title: "Three-level politeness", description: "Bangla has tui (intimate) / tumi (familiar) / āpni (formal) — each with different verb forms. Similar to Marathi तू/तुम्ही/आपण." },
  { lang: "bn", title: "No grammatical gender", description: "Unlike Hindi/Marathi, Bangla has NO grammatical gender. No masculine/feminine verb agreement." },
  { lang: "bn", title: "Classifier system", description: "Bangla uses classifiers before nouns: একটি বই (ekṭi boi) = one-CL book. Similar to Japanese/Chinese counters." },
  { lang: "bn", title: "Inherent O vowel", description: "The inherent vowel is 'O' not 'A'. করা (pronounced 'korā' not 'karā'). This shifts ALL tatsama pronunciation." },
];
