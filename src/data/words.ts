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

  // ─── Swadesh: Quantifiers & Particles ──────────────────────
  { targetWord: "ಅಲ್ಲ", phoneticScript: "Alla", marathiAnchor: "नाही/नव्हे", hindiAnchor: "नहीं", englishMeaning: "Not (it isn't)", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಎಲ್ಲ", phoneticScript: "Ella", marathiAnchor: "सगळे/सर्व", hindiAnchor: "सब/सभी", englishMeaning: "All", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಹಲ", phoneticScript: "Hala", marathiAnchor: "अनेक", hindiAnchor: "अनेक/बहुत", englishMeaning: "Many/Several", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಕೆಲ", phoneticScript: "Kela", marathiAnchor: "काही", hindiAnchor: "कुछ", englishMeaning: "Some", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಸ್ವಲ್ಪ", phoneticScript: "Svalpa", marathiAnchor: "थोडं", hindiAnchor: "थोड़ा", englishMeaning: "A little/Few", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಬೇರೆ", phoneticScript: "Bēre", marathiAnchor: "वेगळे/दुसरे", hindiAnchor: "दूसरा/अलग", englishMeaning: "Other/Different", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ತುಂಬಾ", phoneticScript: "Tumbā", marathiAnchor: "खूप/फार", hindiAnchor: "बहुत", englishMeaning: "Very/Much", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ಮಾತ್ರ", phoneticScript: "Mātra", marathiAnchor: "फक्त", hindiAnchor: "सिर्फ़/केवल", englishMeaning: "Only", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಸಹ", phoneticScript: "Saha", marathiAnchor: "सुद्धा/देखील", hindiAnchor: "भी", englishMeaning: "Also/Too", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಇದೆ", phoneticScript: "Ide", marathiAnchor: "आहे", hindiAnchor: "है", englishMeaning: "There is/Have", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಯಾವ", phoneticScript: "Yāva", marathiAnchor: "कोणता", hindiAnchor: "कौन सा", englishMeaning: "Which", category: "GENERAL", grammar: { pos: "question" } },

  // ─── Conjunctions & Postpositions ──────────────────────────
  { targetWord: "ಮತ್ತು", phoneticScript: "Mattu", marathiAnchor: "आणि", hindiAnchor: "और", englishMeaning: "And", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಆದರೆ", phoneticScript: "Ādare", marathiAnchor: "पण", hindiAnchor: "लेकिन/पर", englishMeaning: "But", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಅಥವಾ", phoneticScript: "Athavā", marathiAnchor: "किंवा", hindiAnchor: "या", englishMeaning: "Or", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಯಾಕೆಂದರೆ", phoneticScript: "Yākendare", marathiAnchor: "कारण", hindiAnchor: "क्योंकि", englishMeaning: "Because", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಒಳಗೆ", phoneticScript: "Oḷage", marathiAnchor: "आत", hindiAnchor: "अंदर", englishMeaning: "Inside/In", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ಹೊರಗೆ", phoneticScript: "Horage", marathiAnchor: "बाहेर", hindiAnchor: "बाहर", englishMeaning: "Outside", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ಜೊತೆ", phoneticScript: "Jote", marathiAnchor: "सोबत/बरोबर", hindiAnchor: "साथ", englishMeaning: "With/Together", category: "GENERAL", grammar: { pos: "particle" } },
  { targetWord: "ಆಗ", phoneticScript: "Āga", marathiAnchor: "तेव्हा/मग", hindiAnchor: "तब/फिर", englishMeaning: "Then/At that time", category: "GENERAL", grammar: { pos: "adverb" } },
  { targetWord: "ವರ್ಷ", phoneticScript: "Varṣa", marathiAnchor: "वर्ष", hindiAnchor: "वर्ष/साल", englishMeaning: "Year", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },

  // ─── Swadesh: People & Family ──────────────────────────────
  { targetWord: "ಹೆಣ್ಣು", phoneticScript: "Heṇṇu", marathiAnchor: "बाई/स्त्री", hindiAnchor: "औरत/स्त्री", englishMeaning: "Woman", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಗಂಡಸು", phoneticScript: "Gaṇḍasu", marathiAnchor: "पुरुष/माणूस", hindiAnchor: "आदमी/पुरुष", englishMeaning: "Man (adult male)", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಮನುಷ್ಯ", phoneticScript: "Manuṣya", marathiAnchor: "माणूस", hindiAnchor: "इंसान/मनुष्य", englishMeaning: "Human/Person", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಮಗು", phoneticScript: "Magu", marathiAnchor: "मूल", hindiAnchor: "बच्चा", englishMeaning: "Child", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಹೆಂಡತಿ", phoneticScript: "Heṇḍati", marathiAnchor: "बायको", hindiAnchor: "पत्नी", englishMeaning: "Wife", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಗಂಡ", phoneticScript: "Gaṇḍa", marathiAnchor: "नवरा", hindiAnchor: "पति", englishMeaning: "Husband", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಅಮ್ಮ", phoneticScript: "Amma", marathiAnchor: "आई", hindiAnchor: "माँ", englishMeaning: "Mother", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಅಪ್ಪ", phoneticScript: "Appa", marathiAnchor: "बाबा/वडील", hindiAnchor: "पिता/पापा", englishMeaning: "Father", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಅಣ್ಣ", phoneticScript: "Aṇṇa", marathiAnchor: "दादा/मोठा भाऊ", hindiAnchor: "बड़ा भाई", englishMeaning: "Elder brother", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಅಕ್ಕ", phoneticScript: "Akka", marathiAnchor: "ताई/मोठी बहीण", hindiAnchor: "बड़ी बहन", englishMeaning: "Elder sister", category: "FAMILY", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಹೆಸರು", phoneticScript: "Hesaru", marathiAnchor: "नाव", hindiAnchor: "नाम", englishMeaning: "Name", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },

  // ─── Swadesh: Animals ──────────────────────────────────────
  { targetWord: "ಪ್ರಾಣಿ", phoneticScript: "Prāṇi", marathiAnchor: "प्राणी", hindiAnchor: "जानवर/प्राणी", englishMeaning: "Animal", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮೀನು", phoneticScript: "Mīnu", marathiAnchor: "मासा", hindiAnchor: "मछली", englishMeaning: "Fish", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಹಕ್ಕಿ", phoneticScript: "Hakki", marathiAnchor: "पक्षी", hindiAnchor: "पक्षी/चिड़िया", englishMeaning: "Bird", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ನಾಯಿ", phoneticScript: "Nāyi", marathiAnchor: "कुत्रा", hindiAnchor: "कुत्ता", englishMeaning: "Dog", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಹಾವು", phoneticScript: "Hāvu", marathiAnchor: "साप", hindiAnchor: "साँप", englishMeaning: "Snake", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "masculine" } },

  // ─── Swadesh: Plants & Vegetation ──────────────────────────
  { targetWord: "ಮರ", phoneticScript: "Mara", marathiAnchor: "झाड", hindiAnchor: "पेड़", englishMeaning: "Tree", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕಾಡು", phoneticScript: "Kāḍu", marathiAnchor: "जंगल", hindiAnchor: "जंगल", englishMeaning: "Forest", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕೋಲು", phoneticScript: "Kōlu", marathiAnchor: "काठी", hindiAnchor: "छड़ी/डंडा", englishMeaning: "Stick", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಎಲೆ", phoneticScript: "Ele", marathiAnchor: "पान", hindiAnchor: "पत्ता", englishMeaning: "Leaf", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಹೂವು", phoneticScript: "Hūvu", marathiAnchor: "फूल", hindiAnchor: "फूल", englishMeaning: "Flower", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಹುಲ್ಲು", phoneticScript: "Hullu", marathiAnchor: "गवत", hindiAnchor: "घास", englishMeaning: "Grass", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },

  // ─── Swadesh: Body Parts ───────────────────────────────────
  { targetWord: "ಚರ್ಮ", phoneticScript: "Carma", marathiAnchor: "त्वचा/कातडी", hindiAnchor: "त्वचा/चमड़ा", englishMeaning: "Skin", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ರಕ್ತ", phoneticScript: "Rakta", marathiAnchor: "रक्त", hindiAnchor: "ख़ून/रक्त", englishMeaning: "Blood", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಎಲುಬು", phoneticScript: "Elubu", marathiAnchor: "हाड", hindiAnchor: "हड्डी", englishMeaning: "Bone", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮೊಟ್ಟೆ", phoneticScript: "Moṭṭe", marathiAnchor: "अंडे", hindiAnchor: "अंडा", englishMeaning: "Egg", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕೂದಲು", phoneticScript: "Kūdalu", marathiAnchor: "केस", hindiAnchor: "बाल", englishMeaning: "Hair", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ತಲೆ", phoneticScript: "Tale", marathiAnchor: "डोके", hindiAnchor: "सिर", englishMeaning: "Head", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕಿವಿ", phoneticScript: "Kivi", marathiAnchor: "कान", hindiAnchor: "कान", englishMeaning: "Ear", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕಣ್ಣು", phoneticScript: "Kaṇṇu", marathiAnchor: "डोळा", hindiAnchor: "आँख", englishMeaning: "Eye", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮೂಗು", phoneticScript: "Mūgu", marathiAnchor: "नाक", hindiAnchor: "नाक", englishMeaning: "Nose", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಬಾಯಿ", phoneticScript: "Bāyi", marathiAnchor: "तोंड", hindiAnchor: "मुँह", englishMeaning: "Mouth", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಹಲ್ಲು", phoneticScript: "Hallu", marathiAnchor: "दात", hindiAnchor: "दाँत", englishMeaning: "Tooth", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ನಾಲಗೆ", phoneticScript: "Nālage", marathiAnchor: "जीभ", hindiAnchor: "जीभ", englishMeaning: "Tongue", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಅಡಿ", phoneticScript: "Aḍi", marathiAnchor: "पाऊल", hindiAnchor: "पैर का तलवा", englishMeaning: "Foot/Sole", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕಾಲು", phoneticScript: "Kālu", marathiAnchor: "पाय", hindiAnchor: "पैर/टाँग", englishMeaning: "Leg", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮಂಡಿ", phoneticScript: "Maṇḍi", marathiAnchor: "गुडघा", hindiAnchor: "घुटना", englishMeaning: "Knee", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕೈ", phoneticScript: "Kai", marathiAnchor: "हात", hindiAnchor: "हाथ", englishMeaning: "Hand", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಹೊಟ್ಟೆ", phoneticScript: "Hoṭṭe", marathiAnchor: "पोट", hindiAnchor: "पेट", englishMeaning: "Belly/Stomach", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕತ್ತು", phoneticScript: "Kattu", marathiAnchor: "मान/गळा", hindiAnchor: "गर्दन/गला", englishMeaning: "Neck", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಬೆನ್ನು", phoneticScript: "Bennu", marathiAnchor: "पाठ", hindiAnchor: "पीठ", englishMeaning: "Back", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಹೃದಯ", phoneticScript: "Hṛdaya", marathiAnchor: "हृदय", hindiAnchor: "हृदय/दिल", englishMeaning: "Heart", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮಾಂಸ", phoneticScript: "Māṃsa", marathiAnchor: "मांस", hindiAnchor: "मांस", englishMeaning: "Meat/Flesh", category: "FOOD", grammar: { pos: "noun", number: "singular", gender: "neuter" } },

  // ─── Swadesh: Earth, Sky & Weather ─────────────────────────
  { targetWord: "ಸೂರ್ಯ", phoneticScript: "Sūrya", marathiAnchor: "सूर्य", hindiAnchor: "सूरज/सूर्य", englishMeaning: "Sun", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಚಂದ್ರ", phoneticScript: "Candra", marathiAnchor: "चंद्र", hindiAnchor: "चाँद/चंद्रमा", englishMeaning: "Moon", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ನಕ್ಷತ್ರ", phoneticScript: "Nakṣatra", marathiAnchor: "नक्षत्र/तारा", hindiAnchor: "तारा/नक्षत्र", englishMeaning: "Star", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮಳೆ", phoneticScript: "Maḷe", marathiAnchor: "पाऊस", hindiAnchor: "बारिश", englishMeaning: "Rain", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ನದಿ", phoneticScript: "Nadi", marathiAnchor: "नदी", hindiAnchor: "नदी", englishMeaning: "River", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಕೆರೆ", phoneticScript: "Kere", marathiAnchor: "तळे/तलाव", hindiAnchor: "तालाब/झील", englishMeaning: "Lake/Pond", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಸಮುದ್ರ", phoneticScript: "Samudra", marathiAnchor: "समुद्र", hindiAnchor: "समुद्र/सागर", englishMeaning: "Sea/Ocean", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "masculine" } },
  { targetWord: "ಕಲ್ಲು", phoneticScript: "Kallu", marathiAnchor: "दगड", hindiAnchor: "पत्थर", englishMeaning: "Stone", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮರಳು", phoneticScript: "Maraḷu", marathiAnchor: "वाळू", hindiAnchor: "रेत/बालू", englishMeaning: "Sand", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ನೆಲ", phoneticScript: "Nela", marathiAnchor: "जमीन", hindiAnchor: "ज़मीन/भूमि", englishMeaning: "Earth/Ground", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮೋಡ", phoneticScript: "Mōḍa", marathiAnchor: "ढग", hindiAnchor: "बादल", englishMeaning: "Cloud", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಆಕಾಶ", phoneticScript: "Ākāśa", marathiAnchor: "आकाश", hindiAnchor: "आसमान/आकाश", englishMeaning: "Sky", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಗಾಳಿ", phoneticScript: "Gāḷi", marathiAnchor: "वारा", hindiAnchor: "हवा", englishMeaning: "Wind/Air", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಹೊಗೆ", phoneticScript: "Hoge", marathiAnchor: "धूर", hindiAnchor: "धुआँ", englishMeaning: "Smoke", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಬೆಂಕಿ", phoneticScript: "Beṅki", marathiAnchor: "आग/अग्नी", hindiAnchor: "आग", englishMeaning: "Fire", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಬೂದಿ", phoneticScript: "Būdi", marathiAnchor: "राख", hindiAnchor: "राख", englishMeaning: "Ash", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಹಾದಿ", phoneticScript: "Hādi", marathiAnchor: "वाट/रस्ता", hindiAnchor: "रास्ता", englishMeaning: "Path/Road", category: "TRAVEL", grammar: { pos: "noun", number: "singular", gender: "feminine" } },
  { targetWord: "ಹಗಲು", phoneticScript: "Hagalu", marathiAnchor: "दिवस", hindiAnchor: "दिन (समय)", englishMeaning: "Daytime", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },

  // ─── Swadesh: Colors ───────────────────────────────────────
  { targetWord: "ಕೆಂಪು", phoneticScript: "Kempu", marathiAnchor: "लाल", hindiAnchor: "लाल", englishMeaning: "Red", category: "COLORS", grammar: { pos: "adjective" } },
  { targetWord: "ಹಸಿರು", phoneticScript: "Hasiru", marathiAnchor: "हिरवा", hindiAnchor: "हरा", englishMeaning: "Green", category: "COLORS", grammar: { pos: "adjective" } },
  { targetWord: "ಹಳದಿ", phoneticScript: "Haḷadi", marathiAnchor: "पिवळा", hindiAnchor: "पीला", englishMeaning: "Yellow", category: "COLORS", grammar: { pos: "adjective" } },
  { targetWord: "ಬಿಳಿ", phoneticScript: "Biḷi", marathiAnchor: "पांढरा", hindiAnchor: "सफ़ेद", englishMeaning: "White", category: "COLORS", grammar: { pos: "adjective" } },
  { targetWord: "ಕರಿ", phoneticScript: "Kari", marathiAnchor: "काळा", hindiAnchor: "काला", englishMeaning: "Black", category: "COLORS", grammar: { pos: "adjective" } },

  // ─── Swadesh: More Adjectives ──────────────────────────────
  { targetWord: "ನಿಡು", phoneticScript: "Niḍu", marathiAnchor: "लांब", hindiAnchor: "लंबा", englishMeaning: "Long", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಅಗಲ", phoneticScript: "Agala", marathiAnchor: "रुंद", hindiAnchor: "चौड़ा", englishMeaning: "Wide", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ದಪ್ಪ", phoneticScript: "Dappa", marathiAnchor: "जाड", hindiAnchor: "मोटा", englishMeaning: "Thick/Fat", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ತೂಕ", phoneticScript: "Tūka", marathiAnchor: "जड/वजन", hindiAnchor: "भारी/वज़न", englishMeaning: "Heavy/Weight", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಗಿಡ್ಡ", phoneticScript: "Giḍḍa", marathiAnchor: "ठेंगणा", hindiAnchor: "नाटा/ठिगना", englishMeaning: "Short (height)", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಸಪುರ", phoneticScript: "Sapura", marathiAnchor: "अरुंद", hindiAnchor: "संकरा/पतला", englishMeaning: "Narrow/Thin", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ತೆಳು", phoneticScript: "Teḷu", marathiAnchor: "पातळ", hindiAnchor: "पतला", englishMeaning: "Thin", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಬೆಚ್ಚ", phoneticScript: "Becca", marathiAnchor: "कोमट/उबदार", hindiAnchor: "गुनगुना/गरम", englishMeaning: "Warm", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಕುಳಿರು", phoneticScript: "Kuḷiru", marathiAnchor: "थंडी", hindiAnchor: "ठंड", englishMeaning: "Cold (chill)", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ತುಂಬು", phoneticScript: "Tumbu", marathiAnchor: "भरलेला", hindiAnchor: "भरा/पूर्ण", englishMeaning: "Full", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಕೆಟ್ಟ", phoneticScript: "Keṭṭa", marathiAnchor: "वाईट", hindiAnchor: "बुरा/ख़राब", englishMeaning: "Bad", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಕೊಳಕು", phoneticScript: "Koḷaku", marathiAnchor: "घाणेरडा", hindiAnchor: "गंदा", englishMeaning: "Dirty", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಗುಂಡು", phoneticScript: "Guṇḍu", marathiAnchor: "गोल", hindiAnchor: "गोल", englishMeaning: "Round", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಹರಿತ", phoneticScript: "Harita", marathiAnchor: "धारदार/तीक्ष्ण", hindiAnchor: "तेज़/धारदार", englishMeaning: "Sharp", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಒದ್ದೆ", phoneticScript: "Odde", marathiAnchor: "ओला", hindiAnchor: "गीला", englishMeaning: "Wet", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಒಣ", phoneticScript: "Oṇa", marathiAnchor: "कोरडा/सुका", hindiAnchor: "सूखा", englishMeaning: "Dry", category: "GENERAL", grammar: { pos: "adjective" } },

  // ─── Swadesh: More Verbs ───────────────────────────────────
  { targetWord: "ಇರು", phoneticScript: "Iru", marathiAnchor: "असणे", hindiAnchor: "होना/रहना", englishMeaning: "Be/Exist/Stay", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಬಾ", phoneticScript: "Bā", marathiAnchor: "ये", hindiAnchor: "आ/आओ", englishMeaning: "Come (informal)", category: "GENERAL", grammar: { pos: "verb", tense: "imperative", formality: "informal" } },
  { targetWord: "ನಡೆ", phoneticScript: "Naḍe", marathiAnchor: "चालणे", hindiAnchor: "चलना", englishMeaning: "Walk", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕೂರು", phoneticScript: "Kūru", marathiAnchor: "बसणे", hindiAnchor: "बैठना", englishMeaning: "Sit", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ನಿಲ್ಲು", phoneticScript: "Nillu", marathiAnchor: "उभे राहणे/थांबणे", hindiAnchor: "खड़ा होना/रुकना", englishMeaning: "Stand/Stop", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಮಲಗು", phoneticScript: "Malagu", marathiAnchor: "झोपणे", hindiAnchor: "सोना", englishMeaning: "Sleep/Lie down", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ತಿಳಿ", phoneticScript: "Tiḷi", marathiAnchor: "कळणे/माहीत", hindiAnchor: "जानना/पता होना", englishMeaning: "Know/Understand", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಯೋಚಿಸು", phoneticScript: "Yōcisu", marathiAnchor: "विचार करणे", hindiAnchor: "सोचना", englishMeaning: "Think", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ನಗು", phoneticScript: "Nagu", marathiAnchor: "हसणे", hindiAnchor: "हँसना", englishMeaning: "Laugh", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಅಳು", phoneticScript: "Aḷu", marathiAnchor: "रडणे", hindiAnchor: "रोना", englishMeaning: "Cry", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹೆದರು", phoneticScript: "Hedaru", marathiAnchor: "घाबरणे", hindiAnchor: "डरना", englishMeaning: "Fear/Be afraid", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಬಾಳು", phoneticScript: "Bāḷu", marathiAnchor: "जगणे", hindiAnchor: "जीना", englishMeaning: "Live", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಸಾಯಿ", phoneticScript: "Sāyi", marathiAnchor: "मरणे", hindiAnchor: "मरना", englishMeaning: "Die", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕೊಲ್ಲು", phoneticScript: "Kollu", marathiAnchor: "मारणे", hindiAnchor: "मारना/जान लेना", englishMeaning: "Kill", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹೋರಾಡು", phoneticScript: "Hōrāḍu", marathiAnchor: "लढणे", hindiAnchor: "लड़ना", englishMeaning: "Fight", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹೊಡೆ", phoneticScript: "Hoḍe", marathiAnchor: "मारणे", hindiAnchor: "मारना", englishMeaning: "Hit/Beat", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕತ್ತರಿಸು", phoneticScript: "Kattarisu", marathiAnchor: "कापणे", hindiAnchor: "काटना", englishMeaning: "Cut", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹಿಡಿ", phoneticScript: "Hiḍi", marathiAnchor: "धरणे/पकडणे", hindiAnchor: "पकड़ना", englishMeaning: "Hold/Catch", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ತೊಳೆ", phoneticScript: "Toḷe", marathiAnchor: "धुणे", hindiAnchor: "धोना", englishMeaning: "Wash", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಒರೆಸು", phoneticScript: "Oresu", marathiAnchor: "पुसणे", hindiAnchor: "पोंछना", englishMeaning: "Wipe", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಎಳಿ", phoneticScript: "Eḷi", marathiAnchor: "ओढणे", hindiAnchor: "खींचना", englishMeaning: "Pull", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ನೂಕು", phoneticScript: "Nūku", marathiAnchor: "ढकलणे", hindiAnchor: "धकेलना", englishMeaning: "Push", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಎಸಿ", phoneticScript: "Esi", marathiAnchor: "फेकणे", hindiAnchor: "फेंकना", englishMeaning: "Throw", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕಟ್ಟು", phoneticScript: "Kaṭṭu", marathiAnchor: "बांधणे", hindiAnchor: "बाँधना", englishMeaning: "Tie/Build", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಎಣಿಸು", phoneticScript: "Eṇisu", marathiAnchor: "मोजणे", hindiAnchor: "गिनना", englishMeaning: "Count", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹಾಡು", phoneticScript: "Hāḍu", marathiAnchor: "गाणे", hindiAnchor: "गाना", englishMeaning: "Sing", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಆಡು", phoneticScript: "Āḍu", marathiAnchor: "खेळणे", hindiAnchor: "खेलना", englishMeaning: "Play", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಈಜು", phoneticScript: "Īju", marathiAnchor: "पोहणे", hindiAnchor: "तैरना", englishMeaning: "Swim", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹಾರು", phoneticScript: "Hāru", marathiAnchor: "उडणे", hindiAnchor: "उड़ना", englishMeaning: "Fly", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ತಿರುಗು", phoneticScript: "Tirugu", marathiAnchor: "फिरणे/वळणे", hindiAnchor: "मुड़ना/घूमना", englishMeaning: "Turn/Rotate", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಬೀಳು", phoneticScript: "Bīḷu", marathiAnchor: "पडणे", hindiAnchor: "गिरना", englishMeaning: "Fall", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಸುಡು", phoneticScript: "Suḍu", marathiAnchor: "जळणे/भाजणे", hindiAnchor: "जलना/जलाना", englishMeaning: "Burn", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹರಿ", phoneticScript: "Hari", marathiAnchor: "वाहणे", hindiAnchor: "बहना", englishMeaning: "Flow", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕಡಿ", phoneticScript: "Kaḍi", marathiAnchor: "चावणे", hindiAnchor: "काटना", englishMeaning: "Bite", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಮೂಸು", phoneticScript: "Mūsu", marathiAnchor: "हुंगणे", hindiAnchor: "सूँघना", englishMeaning: "Smell/Sniff", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಊದು", phoneticScript: "Ūdu", marathiAnchor: "फुंकणे", hindiAnchor: "फूँकना", englishMeaning: "Blow", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },

  // ─── High-Frequency Verbs ──────────────────────────────────
  { targetWord: "ಹಾಕು", phoneticScript: "Hāku", marathiAnchor: "ठेवणे/टाकणे", hindiAnchor: "रखना/डालना", englishMeaning: "Put/Place", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕಲಿ", phoneticScript: "Kali", marathiAnchor: "शिकणे", hindiAnchor: "सीखना", englishMeaning: "Learn", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಬಿಡು", phoneticScript: "Biḍu", marathiAnchor: "सोडणे", hindiAnchor: "छोड़ना", englishMeaning: "Leave/Release", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ತರು", phoneticScript: "Taru", marathiAnchor: "आणणे", hindiAnchor: "लाना", englishMeaning: "Bring", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕಳಿಸು", phoneticScript: "Kaḷisu", marathiAnchor: "पाठवणे", hindiAnchor: "भेजना", englishMeaning: "Send", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹುಡುಕು", phoneticScript: "Huḍuku", marathiAnchor: "शोधणे", hindiAnchor: "खोजना/ढूँढना", englishMeaning: "Search/Find", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ತೋರಿಸು", phoneticScript: "Tōrisu", marathiAnchor: "दाखवणे", hindiAnchor: "दिखाना", englishMeaning: "Show", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ತೆರೆ", phoneticScript: "Tere", marathiAnchor: "उघडणे", hindiAnchor: "खोलना", englishMeaning: "Open", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಮುಚ್ಚು", phoneticScript: "Muccu", marathiAnchor: "बंद करणे", hindiAnchor: "बंद करना", englishMeaning: "Close/Shut", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },

  // ─── Swadesh: Remaining Entries ────────────────────────────
  { targetWord: "ಹಿಮ", phoneticScript: "Hima", marathiAnchor: "बर्फ/हिम", hindiAnchor: "बर्फ़/हिम", englishMeaning: "Snow", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮಂಜು", phoneticScript: "Mañju", marathiAnchor: "धुके", hindiAnchor: "कोहरा", englishMeaning: "Fog/Mist", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮಂಜುಗಡ್ಡೆ", phoneticScript: "Mañjugaḍḍe", marathiAnchor: "बर्फ", hindiAnchor: "बर्फ़", englishMeaning: "Ice", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ದುಂಬು", phoneticScript: "Dumbu", marathiAnchor: "धूळ", hindiAnchor: "धूल", englishMeaning: "Dust", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಬೀಜ", phoneticScript: "Bīja", marathiAnchor: "बीज/बी", hindiAnchor: "बीज", englishMeaning: "Seed", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಬೇರು", phoneticScript: "Bēru", marathiAnchor: "मूळ", hindiAnchor: "जड़", englishMeaning: "Root", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ತೊಗಟೆ", phoneticScript: "Togaṭe", marathiAnchor: "साल", hindiAnchor: "छाल", englishMeaning: "Bark (of tree)", category: "NATURE", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ನೇಣು", phoneticScript: "Nēṇu", marathiAnchor: "दोर/दोरी", hindiAnchor: "रस्सी", englishMeaning: "Rope", category: "GENERAL", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಹೇನು", phoneticScript: "Hēnu", marathiAnchor: "ऊ", hindiAnchor: "जूँ", englishMeaning: "Louse", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಹುಳ", phoneticScript: "Huḷa", marathiAnchor: "किडा/अळी", hindiAnchor: "कीड़ा", englishMeaning: "Worm", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕೊಬ್ಬು", phoneticScript: "Kobbu", marathiAnchor: "चरबी", hindiAnchor: "चर्बी", englishMeaning: "Fat (noun)", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕೊಂಬು", phoneticScript: "Kombu", marathiAnchor: "शिंग", hindiAnchor: "सींग", englishMeaning: "Horn", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಬಾಲ", phoneticScript: "Bāla", marathiAnchor: "शेपूट", hindiAnchor: "पूँछ", englishMeaning: "Tail", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಗರಿ", phoneticScript: "Gari", marathiAnchor: "पीस", hindiAnchor: "पंख", englishMeaning: "Feather", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಉಗುರು", phoneticScript: "Uguru", marathiAnchor: "नख", hindiAnchor: "नाख़ून", englishMeaning: "Fingernail", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ರೆಕ್ಕೆ", phoneticScript: "Rekke", marathiAnchor: "पंख", hindiAnchor: "पंख", englishMeaning: "Wing", category: "ANIMALS", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಕೆಚ್ಚು", phoneticScript: "Keccu", marathiAnchor: "आतडी", hindiAnchor: "अंतड़ी", englishMeaning: "Guts/Innards", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಮೊಲೆ", phoneticScript: "Mole", marathiAnchor: "स्तन", hindiAnchor: "स्तन", englishMeaning: "Breast", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಈಲಿ", phoneticScript: "Īli", marathiAnchor: "यकृत/काळीज", hindiAnchor: "जिगर/यकृत", englishMeaning: "Liver", category: "BODY", grammar: { pos: "noun", number: "singular", gender: "neuter" } },
  { targetWord: "ಚೀಪು", phoneticScript: "Cīpu", marathiAnchor: "चोखणे", hindiAnchor: "चूसना", englishMeaning: "Suck", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಉಗುಳು", phoneticScript: "Uguḷu", marathiAnchor: "थुंकणे", hindiAnchor: "थूकना", englishMeaning: "Spit", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಕಾರು", phoneticScript: "Kāru", marathiAnchor: "ओकणे", hindiAnchor: "उल्टी करना", englishMeaning: "Vomit", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಉಸಿರಾಡು", phoneticScript: "Usirāḍu", marathiAnchor: "श्वास घेणे", hindiAnchor: "साँस लेना", englishMeaning: "Breathe", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹಿಚುಕು", phoneticScript: "Hicuku", marathiAnchor: "पिळणे", hindiAnchor: "निचोड़ना", englishMeaning: "Squeeze", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಉಜ್ಜು", phoneticScript: "Ujju", marathiAnchor: "घासणे", hindiAnchor: "रगड़ना", englishMeaning: "Rub", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹೊಲಿ", phoneticScript: "Holi", marathiAnchor: "शिवणे", hindiAnchor: "सिलना", englishMeaning: "Sew", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ತೇಲು", phoneticScript: "Tēlu", marathiAnchor: "तरंगणे", hindiAnchor: "तैरना", englishMeaning: "Float", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಹೆಪ್ಪುಗಟ್ಟು", phoneticScript: "Heppugaṭṭu", marathiAnchor: "गोठणे", hindiAnchor: "जमना", englishMeaning: "Freeze", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಬೇಟೆಯಾಡು", phoneticScript: "Bēṭeyāḍu", marathiAnchor: "शिकार करणे", hindiAnchor: "शिकार करना", englishMeaning: "Hunt", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಪಡು", phoneticScript: "Paḍu", marathiAnchor: "आडवे होणे", hindiAnchor: "लेटना", englishMeaning: "Lie (recline)", category: "GENERAL", grammar: { pos: "verb", tense: "root" } },
  { targetWord: "ಮೊಂಡ", phoneticScript: "Moṇḍa", marathiAnchor: "बोथट", hindiAnchor: "कुंद/भोथरा", englishMeaning: "Dull/Blunt", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ನುಣ್ಣಗೆ", phoneticScript: "Nuṇṇage", marathiAnchor: "गुळगुळीत", hindiAnchor: "चिकना", englishMeaning: "Smooth", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಕೊಳೆತ", phoneticScript: "Koḷeta", marathiAnchor: "सडलेला/कुजलेला", hindiAnchor: "सड़ा हुआ", englishMeaning: "Rotten", category: "GENERAL", grammar: { pos: "adjective" } },
  { targetWord: "ಒಂದು ವೇಳೆ", phoneticScript: "Ondu vēḷe", marathiAnchor: "जर", hindiAnchor: "अगर", englishMeaning: "If", category: "GENERAL", grammar: { pos: "particle" } },
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

export function getAllWordsByLang(lang: string | null): Word[] {
  // Lazy import to avoid circular deps at module level
  const { getUserWords } = require("./user-words") as typeof import("./user-words");
  const userWords = getUserWords();
  const combined = [...ALL_WORDS, ...userWords];
  if (!lang) return combined;
  return combined.filter((w) => w.targetLang === lang);
}

export function getWordById(id: string): Word | undefined {
  const { getUserWords } = require("./user-words") as typeof import("./user-words");
  const all = [...ALL_WORDS, ...getUserWords()];
  return all.find((w) => w.id === id);
}
