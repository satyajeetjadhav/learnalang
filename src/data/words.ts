// ─── Word Data Types ────────────────────────────────────────

export interface Grammar {
  pos: "noun" | "verb" | "adjective" | "pronoun" | "adverb" | "number" | "question" | "particle" | "phrase";
  number?: "singular" | "plural";
  gender?: "masculine" | "feminine" | "neuter";
  person?: 1 | 2 | 3;
  tense?: "root" | "imperative";
  formality?: "formal" | "informal";
}

export interface Word {
  id: string;
  targetLang: string;
  targetWord: string;
  phoneticScript: string | null;
  marathiAnchor: string | null;
  hindiAnchor: string | null;
  englishMeaning: string;
  category: string | null;
  grammar: Grammar | null;
}

interface RawWord {
  targetWord: string;
  phoneticScript: string;
  marathiAnchor: string;
  hindiAnchor: string;
  englishMeaning: string;
  category: string;
  grammar?: Grammar;
}

function toWords(lang: string, raw: RawWord[]): Word[] {
  return raw.map((w, i) => ({
    id: `${lang}-${i}`,
    targetLang: lang,
    targetWord: w.targetWord,
    phoneticScript: w.phoneticScript,
    marathiAnchor: w.marathiAnchor,
    hindiAnchor: w.hindiAnchor,
    englishMeaning: w.englishMeaning,
    category: w.category,
    grammar: w.grammar ?? null,
  }));
}

// ─── Kannada Words ──────────────────────────────────────────
const KANNADA_RAW: RawWord[] = [
  // Greetings & Basic Phrases
  { targetWord: "ನಮಸ್ಕಾರ", phoneticScript: "Namaskāra", marathiAnchor: "नमस्कार", hindiAnchor: "नमस्कार", englishMeaning: "Hello/Greetings", category: "GREETINGS", grammar: { pos: "phrase" } },
  { targetWord: "ಹೇಗಿದ್ದೀರಾ", phoneticScript: "Hēgiddīrā", marathiAnchor: "कसे आहात", hindiAnchor: "कैसे हैं", englishMeaning: "How are you?", category: "GREETINGS", grammar: { pos: "phrase", formality: "formal" } },
  { targetWord: "ಧನ್ಯವಾದ", phoneticScript: "Dhanyavāda", marathiAnchor: "धन्यवाद", hindiAnchor: "धन्यवाद", englishMeaning: "Thank you", category: "GREETINGS", grammar: { pos: "phrase" } },
  { targetWord: "ಹೌದು", phoneticScript: "Haudu", marathiAnchor: "हो", hindiAnchor: "हाँ", englishMeaning: "Yes", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಇಲ್ಲ", phoneticScript: "Illa", marathiAnchor: "नाही", hindiAnchor: "नहीं", englishMeaning: "No", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಬನ್ನಿ", phoneticScript: "Banni", marathiAnchor: "या", hindiAnchor: "आइये", englishMeaning: "Come", category: "GENERAL", grammar: { pos: "verb", tense: "imperative", formality: "formal" } },
  { targetWord: "ಹೋಗಿ", phoneticScript: "Hōgi", marathiAnchor: "जा", hindiAnchor: "जाइये", englishMeaning: "Go", category: "GENERAL", grammar: { pos: "verb", tense: "imperative", formality: "formal" } },
  { targetWord: "ದಯವಿಟ್ಟು", phoneticScript: "Dayaviṭṭu", marathiAnchor: "कृपया", hindiAnchor: "कृपया", englishMeaning: "Please", category: "GREETINGS", grammar: { pos: "adverb" } },
  { targetWord: "ಕ್ಷಮಿಸಿ", phoneticScript: "Kṣamisi", marathiAnchor: "माफ करा", hindiAnchor: "माफ़ कीजिये", englishMeaning: "Sorry/Excuse me", category: "GREETINGS", grammar: { pos: "verb", tense: "imperative", formality: "formal" } },
  { targetWord: "ಒಳ್ಳೆಯದು", phoneticScript: "Oḷḷeyadu", marathiAnchor: "चांगलं", hindiAnchor: "अच्छा", englishMeaning: "Good", category: "GENERAL", grammar: { pos: "adjective" } },

  // Pronouns
  { targetWord: "ನಾನು", phoneticScript: "Nānu", marathiAnchor: "मी", hindiAnchor: "मैं", englishMeaning: "I", category: "GENERAL", grammar: { pos: "pronoun", person: 1, number: "singular" } },
  { targetWord: "ನೀನು", phoneticScript: "Nīnu", marathiAnchor: "तू", hindiAnchor: "तू", englishMeaning: "You (informal)", category: "GENERAL", grammar: { pos: "pronoun", person: 2, number: "singular", formality: "informal" } },
  { targetWord: "ನೀವು", phoneticScript: "Nīvu", marathiAnchor: "तुम्ही", hindiAnchor: "आप", englishMeaning: "You (formal)", category: "GENERAL", grammar: { pos: "pronoun", person: 2, number: "singular", formality: "formal" } },
  { targetWord: "ಅವನು", phoneticScript: "Avanu", marathiAnchor: "तो", hindiAnchor: "वह (पु.)", englishMeaning: "He", category: "GENERAL", grammar: { pos: "pronoun", person: 3, number: "singular", gender: "masculine" } },
  { targetWord: "ಅವಳು", phoneticScript: "Avaḷu", marathiAnchor: "ती", hindiAnchor: "वह (स्त्री.)", englishMeaning: "She", category: "GENERAL", grammar: { pos: "pronoun", person: 3, number: "singular", gender: "feminine" } },
  { targetWord: "ಅವರು", phoneticScript: "Avaru", marathiAnchor: "ते/त्या", hindiAnchor: "वे", englishMeaning: "They/He-She (formal)", category: "GENERAL", grammar: { pos: "pronoun", person: 3, number: "plural", formality: "formal" } },
  { targetWord: "ನಾವು", phoneticScript: "Nāvu", marathiAnchor: "आम्ही/आपण", hindiAnchor: "हम", englishMeaning: "We", category: "GENERAL", grammar: { pos: "pronoun", person: 1, number: "plural" } },
  { targetWord: "ಇದು", phoneticScript: "Idu", marathiAnchor: "हे", hindiAnchor: "यह", englishMeaning: "This", category: "GENERAL", grammar: { pos: "pronoun", number: "singular" } },
  { targetWord: "ಅದು", phoneticScript: "Adu", marathiAnchor: "ते", hindiAnchor: "वह", englishMeaning: "That", category: "GENERAL", grammar: { pos: "pronoun", number: "singular" } },
  { targetWord: "ಏನು", phoneticScript: "Ēnu", marathiAnchor: "काय", hindiAnchor: "क्या", englishMeaning: "What", category: "GENERAL", grammar: { pos: "question" } },

  // Common Verbs
  { targetWord: "ಮಾಡು", phoneticScript: "Māḍu", marathiAnchor: "कर", hindiAnchor: "करो", englishMeaning: "Do/Make", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹೇಳು", phoneticScript: "Hēḷu", marathiAnchor: "सांग", hindiAnchor: "बोलो/कहो", englishMeaning: "Say/Tell", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ನೋಡು", phoneticScript: "Nōḍu", marathiAnchor: "बघ", hindiAnchor: "देखो", englishMeaning: "See/Look", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕೊಡು", phoneticScript: "Koḍu", marathiAnchor: "दे", hindiAnchor: "दो", englishMeaning: "Give", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ತೆಗೆ", phoneticScript: "Tege", marathiAnchor: "घे", hindiAnchor: "लो", englishMeaning: "Take", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ತಿನ್ನು", phoneticScript: "Tinnu", marathiAnchor: "खा", hindiAnchor: "खाओ", englishMeaning: "Eat", category: "FOOD", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕುಡಿ", phoneticScript: "Kuḍi", marathiAnchor: "पी", hindiAnchor: "पीओ", englishMeaning: "Drink", category: "FOOD", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಓದು", phoneticScript: "Ōdu", marathiAnchor: "वाच", hindiAnchor: "पढ़ो", englishMeaning: "Read", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಬರೆ", phoneticScript: "Bare", marathiAnchor: "लिहि", hindiAnchor: "लिखो", englishMeaning: "Write", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕೇಳು", phoneticScript: "Kēḷu", marathiAnchor: "ऐक/विचार", hindiAnchor: "सुनो/पूछो", englishMeaning: "Listen/Ask", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },

  // Numbers
  { targetWord: "ಒಂದು", phoneticScript: "Ondu", marathiAnchor: "एक", hindiAnchor: "एक", englishMeaning: "One", category: "GENERAL", grammar: { pos: "number" } },
  { targetWord: "ಎರಡು", phoneticScript: "Eraḍu", marathiAnchor: "दोन", hindiAnchor: "दो", englishMeaning: "Two", category: "GENERAL", grammar: { pos: "number" } },
  { targetWord: "ಮೂರು", phoneticScript: "Mūru", marathiAnchor: "तीन", hindiAnchor: "तीन", englishMeaning: "Three", category: "GENERAL", grammar: { pos: "number" } },
  { targetWord: "ನಾಲ್ಕು", phoneticScript: "Nālku", marathiAnchor: "चार", hindiAnchor: "चार", englishMeaning: "Four", category: "GENERAL", grammar: { pos: "number" } },
  { targetWord: "ಐದು", phoneticScript: "Aidu", marathiAnchor: "पाच", hindiAnchor: "पाँच", englishMeaning: "Five", category: "GENERAL", grammar: { pos: "number" } },
  { targetWord: "ಆರು", phoneticScript: "Āru", marathiAnchor: "सहा", hindiAnchor: "छह", englishMeaning: "Six", category: "GENERAL", grammar: { pos: "number" } },
  { targetWord: "ಏಳು", phoneticScript: "Ēḷu", marathiAnchor: "सात", hindiAnchor: "सात", englishMeaning: "Seven", category: "GENERAL", grammar: { pos: "number" } },
  { targetWord: "ಎಂಟು", phoneticScript: "Eṇṭu", marathiAnchor: "आठ", hindiAnchor: "आठ", englishMeaning: "Eight", category: "GENERAL", grammar: { pos: "number" } },
  { targetWord: "ಒಂಬತ್ತು", phoneticScript: "Ombattu", marathiAnchor: "नऊ", hindiAnchor: "नौ", englishMeaning: "Nine", category: "GENERAL", grammar: { pos: "number" } },
  { targetWord: "ಹತ್ತು", phoneticScript: "Hattu", marathiAnchor: "दहा", hindiAnchor: "दस", englishMeaning: "Ten", category: "GENERAL", grammar: { pos: "number" } },

  // Food & Drink
  { targetWord: "ನೀರು", phoneticScript: "Nīru", marathiAnchor: "पाणी", hindiAnchor: "पानी", englishMeaning: "Water", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಅನ್ನ", phoneticScript: "Anna", marathiAnchor: "भात", hindiAnchor: "चावल", englishMeaning: "Rice", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ರೊಟ್ಟಿ", phoneticScript: "Roṭṭi", marathiAnchor: "भाकरी/रोटी", hindiAnchor: "रोटी", englishMeaning: "Bread/Roti", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಹಾಲು", phoneticScript: "Hālu", marathiAnchor: "दूध", hindiAnchor: "दूध", englishMeaning: "Milk", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕಾಫಿ", phoneticScript: "Kāphi", marathiAnchor: "कॉफी", hindiAnchor: "कॉफ़ी", englishMeaning: "Coffee", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಚಹಾ", phoneticScript: "Cahā", marathiAnchor: "चहा", hindiAnchor: "चाय", englishMeaning: "Tea", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಹಣ್ಣು", phoneticScript: "Haṇṇu", marathiAnchor: "फळ", hindiAnchor: "फल", englishMeaning: "Fruit", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ತರಕಾರಿ", phoneticScript: "Tarakāri", marathiAnchor: "भाजी", hindiAnchor: "सब्ज़ी", englishMeaning: "Vegetable", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಉಪ್ಪು", phoneticScript: "Uppu", marathiAnchor: "मीठ", hindiAnchor: "नमक", englishMeaning: "Salt", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಸಕ್ಕರೆ", phoneticScript: "Sakkare", marathiAnchor: "साखर", hindiAnchor: "चीनी", englishMeaning: "Sugar", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "feminine" } },

  // Travel & Directions
  { targetWord: "ಎಲ್ಲಿ", phoneticScript: "Elli", marathiAnchor: "कुठे", hindiAnchor: "कहाँ", englishMeaning: "Where", category: "TRAVEL", grammar: { pos: "question" } },
  { targetWord: "ಇಲ್ಲಿ", phoneticScript: "Illi", marathiAnchor: "इथे", hindiAnchor: "यहाँ", englishMeaning: "Here", category: "TRAVEL", grammar: { pos: "adverb" } },
  { targetWord: "ಅಲ್ಲಿ", phoneticScript: "Alli", marathiAnchor: "तिथे", hindiAnchor: "वहाँ", englishMeaning: "There", category: "TRAVEL", grammar: { pos: "adverb" } },
  { targetWord: "ಬಲಕ್ಕೆ", phoneticScript: "Balakke", marathiAnchor: "उजवीकडे", hindiAnchor: "दाएँ", englishMeaning: "Right (direction)", category: "TRAVEL", grammar: { pos: "adverb" } },
  { targetWord: "ಎಡಕ್ಕೆ", phoneticScript: "Eḍakke", marathiAnchor: "डावीकडे", hindiAnchor: "बाएँ", englishMeaning: "Left (direction)", category: "TRAVEL", grammar: { pos: "adverb" } },
  { targetWord: "ನೇರ", phoneticScript: "Nēra", marathiAnchor: "सरळ", hindiAnchor: "सीधा", englishMeaning: "Straight", category: "TRAVEL", grammar: { pos: "adverb" } },
  { targetWord: "ಹತ್ತಿರ", phoneticScript: "Hattira", marathiAnchor: "जवळ", hindiAnchor: "पास", englishMeaning: "Near", category: "TRAVEL", grammar: { pos: "adverb" } },
  { targetWord: "ದೂರ", phoneticScript: "Dūra", marathiAnchor: "दूर", hindiAnchor: "दूर", englishMeaning: "Far", category: "TRAVEL", grammar: { pos: "adverb" } },
  { targetWord: "ಮನೆ", phoneticScript: "Mane", marathiAnchor: "घर", hindiAnchor: "घर", englishMeaning: "House", category: "TRAVEL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಅಂಗಡಿ", phoneticScript: "Aṅgaḍi", marathiAnchor: "दुकान", hindiAnchor: "दुकान", englishMeaning: "Shop", category: "TRAVEL", grammar: { pos: "noun", number: "singular", gender: "feminine" } },

  // Time & Common Words
  { targetWord: "ಇಂದು", phoneticScript: "Indu", marathiAnchor: "आज", hindiAnchor: "आज", englishMeaning: "Today", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ನಾಳೆ", phoneticScript: "Nāḷe", marathiAnchor: "उद्या", hindiAnchor: "कल (आने वाला)", englishMeaning: "Tomorrow", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ನಿನ್ನೆ", phoneticScript: "Ninne", marathiAnchor: "काल", hindiAnchor: "कल (बीता हुआ)", englishMeaning: "Yesterday", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ಈಗ", phoneticScript: "Īga", marathiAnchor: "आता", hindiAnchor: "अब", englishMeaning: "Now", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ಮೊದಲು", phoneticScript: "Modalu", marathiAnchor: "आधी", hindiAnchor: "पहले", englishMeaning: "Before/First", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ನಂತರ", phoneticScript: "Nantara", marathiAnchor: "नंतर", hindiAnchor: "बाद में", englishMeaning: "After/Later", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ಸಮಯ", phoneticScript: "Samaya", marathiAnchor: "वेळ", hindiAnchor: "समय", englishMeaning: "Time", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ದಿನ", phoneticScript: "Dina", marathiAnchor: "दिवस", hindiAnchor: "दिन", englishMeaning: "Day", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ರಾತ್ರಿ", phoneticScript: "Rātri", marathiAnchor: "रात्र", hindiAnchor: "रात", englishMeaning: "Night", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಬೆಳಿಗ್ಗೆ", phoneticScript: "Beḷigge", marathiAnchor: "सकाळ", hindiAnchor: "सुबह", englishMeaning: "Morning", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "feminine" } },

  // Adjectives
  { targetWord: "ದೊಡ್ಡ", phoneticScript: "Doḍḍa", marathiAnchor: "मोठा", hindiAnchor: "बड़ा", englishMeaning: "Big", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಚಿಕ್ಕ", phoneticScript: "Cikka", marathiAnchor: "लहान", hindiAnchor: "छोटा", englishMeaning: "Small", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಹೊಸ", phoneticScript: "Hosa", marathiAnchor: "नवीन", hindiAnchor: "नया", englishMeaning: "New", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಹಳೆ", phoneticScript: "Haḷe", marathiAnchor: "जुना", hindiAnchor: "पुराना", englishMeaning: "Old", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಬಿಸಿ", phoneticScript: "Bisi", marathiAnchor: "गरम", hindiAnchor: "गरम", englishMeaning: "Hot", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ತಣ್ಣಗೆ", phoneticScript: "Taṇṇage", marathiAnchor: "थंड", hindiAnchor: "ठंडा", englishMeaning: "Cold", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಸುಂದರ", phoneticScript: "Sundara", marathiAnchor: "सुंदर", hindiAnchor: "सुन्दर", englishMeaning: "Beautiful", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಹೆಚ್ಚು", phoneticScript: "Heccu", marathiAnchor: "जास्त", hindiAnchor: "ज़्यादा", englishMeaning: "More/Many", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಕಡಿಮೆ", phoneticScript: "Kaḍime", marathiAnchor: "कमी", hindiAnchor: "कम", englishMeaning: "Less/Few", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಬೇಕು", phoneticScript: "Bēku", marathiAnchor: "पाहिजे/हवे", hindiAnchor: "चाहिए", englishMeaning: "Want/Need", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },

  // Technical/Modern
  { targetWord: "ಕಂಪ್ಯೂಟರ್", phoneticScript: "Kampyūṭar", marathiAnchor: "संगणक", hindiAnchor: "कंप्यूटर", englishMeaning: "Computer", category: "TECHNICAL", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಮೊಬೈಲ್", phoneticScript: "Mobail", marathiAnchor: "मोबाईल", hindiAnchor: "मोबाइल", englishMeaning: "Mobile", category: "TECHNICAL", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಅಂತರ್ಜಾಲ", phoneticScript: "Antarjāla", marathiAnchor: "अंतर्जाल", hindiAnchor: "इंटरनेट", englishMeaning: "Internet", category: "TECHNICAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕೋಡ್", phoneticScript: "Kōḍ", marathiAnchor: "कोड", hindiAnchor: "कोड", englishMeaning: "Code", category: "TECHNICAL", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಕೆಲಸ", phoneticScript: "Kelasa", marathiAnchor: "काम", hindiAnchor: "काम", englishMeaning: "Work", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಹಣ", phoneticScript: "Haṇa", marathiAnchor: "पैसे", hindiAnchor: "पैसा", englishMeaning: "Money", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಪುಸ್ತಕ", phoneticScript: "Pustaka", marathiAnchor: "पुस्तक", hindiAnchor: "किताब/पुस्तक", englishMeaning: "Book", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಶಾಲೆ", phoneticScript: "Shāle", marathiAnchor: "शाळा", hindiAnchor: "स्कूल", englishMeaning: "School", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಗಾಡಿ", phoneticScript: "Gāḍi", marathiAnchor: "गाडी", hindiAnchor: "गाड़ी", englishMeaning: "Vehicle", category: "TRAVEL", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ರಸ್ತೆ", phoneticScript: "Raste", marathiAnchor: "रस्ता", hindiAnchor: "रास्ता", englishMeaning: "Road", category: "TRAVEL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },

  // More Common Phrases
  { targetWord: "ಗೊತ್ತಿಲ್ಲ", phoneticScript: "Gottilla", marathiAnchor: "माहित नाही", hindiAnchor: "पता नहीं", englishMeaning: "Don't know", category: "GENERAL", grammar: { pos: "phrase" } },
  { targetWord: "ಗೊತ್ತು", phoneticScript: "Gottu", marathiAnchor: "माहित आहे", hindiAnchor: "पता है", englishMeaning: "I know", category: "GENERAL", grammar: { pos: "phrase" } },
  { targetWord: "ಬೇಡ", phoneticScript: "Bēḍa", marathiAnchor: "नको", hindiAnchor: "नहीं चाहिए", englishMeaning: "Don't want", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಸಾಕು", phoneticScript: "Sāku", marathiAnchor: "पुरे/बस", hindiAnchor: "बस/काफ़ी", englishMeaning: "Enough", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಯಾಕೆ", phoneticScript: "Yāke", marathiAnchor: "का", hindiAnchor: "क्यों", englishMeaning: "Why", category: "GENERAL", grammar: { pos: "question" } },
  { targetWord: "ಯಾವಾಗ", phoneticScript: "Yāvāga", marathiAnchor: "कधी", hindiAnchor: "कब", englishMeaning: "When", category: "GENERAL", grammar: { pos: "question" } },
  { targetWord: "ಹೇಗೆ", phoneticScript: "Hēge", marathiAnchor: "कसे", hindiAnchor: "कैसे", englishMeaning: "How", category: "GENERAL", grammar: { pos: "question" } },
  { targetWord: "ಯಾರು", phoneticScript: "Yāru", marathiAnchor: "कोण", hindiAnchor: "कौन", englishMeaning: "Who", category: "GENERAL", grammar: { pos: "question" } },
  { targetWord: "ಎಷ್ಟು", phoneticScript: "Eṣṭu", marathiAnchor: "किती", hindiAnchor: "कितना", englishMeaning: "How much/many", category: "GENERAL", grammar: { pos: "question" } },
  { targetWord: "ಸರಿ", phoneticScript: "Sari", marathiAnchor: "ठीक/बरोबर", hindiAnchor: "ठीक है", englishMeaning: "Okay/Correct", category: "GENERAL", grammar: { pos: "particle" } },
];

// ─── All Words ──────────────────────────────────────────────
export const ALL_WORDS: Word[] = [
  ...toWords("kn", KANNADA_RAW),
  // Malayalam and Bangla can be added here later
];

export function getWordsByLang(lang: string | null): Word[] {
  if (!lang) return ALL_WORDS;
  return ALL_WORDS.filter((w) => w.targetLang === lang);
}

export function getWordById(id: string): Word | undefined {
  return ALL_WORDS.find((w) => w.id === id);
}
