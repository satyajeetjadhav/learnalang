// Shared Devanagari → Target script mappings
// Used by ScriptMap component and Akshara decomposition engine

export interface ScriptChar {
  dev: string;
  kn: string;
  ml: string;
  bn: string;
  roman: string;
}

export const VOWELS: ScriptChar[] = [
  { dev: "अ", kn: "ಅ", ml: "അ", bn: "অ", roman: "a" },
  { dev: "आ", kn: "ಆ", ml: "ആ", bn: "আ", roman: "ā" },
  { dev: "इ", kn: "ಇ", ml: "ഇ", bn: "ই", roman: "i" },
  { dev: "ई", kn: "ಈ", ml: "ഈ", bn: "ঈ", roman: "ī" },
  { dev: "उ", kn: "ಉ", ml: "ഉ", bn: "উ", roman: "u" },
  { dev: "ऊ", kn: "ಊ", ml: "ഊ", bn: "ঊ", roman: "ū" },
  { dev: "ए", kn: "ಎ", ml: "എ", bn: "এ", roman: "e" },
  { dev: "ऐ", kn: "ಐ", ml: "ഐ", bn: "ঐ", roman: "ai" },
  { dev: "ओ", kn: "ಒ", ml: "ഒ", bn: "ও", roman: "o" },
  { dev: "औ", kn: "ಔ", ml: "ഔ", bn: "ঔ", roman: "au" },
];

export const CONSONANTS: ScriptChar[] = [
  // Velars
  { dev: "क", kn: "ಕ", ml: "ക", bn: "ক", roman: "ka" },
  { dev: "ख", kn: "ಖ", ml: "ഖ", bn: "খ", roman: "kha" },
  { dev: "ग", kn: "ಗ", ml: "ഗ", bn: "গ", roman: "ga" },
  { dev: "घ", kn: "ಘ", ml: "ഘ", bn: "ঘ", roman: "gha" },
  { dev: "ङ", kn: "ಙ", ml: "ങ", bn: "ঙ", roman: "ṅa" },
  // Palatals
  { dev: "च", kn: "ಚ", ml: "ച", bn: "চ", roman: "ca" },
  { dev: "छ", kn: "ಛ", ml: "ഛ", bn: "ছ", roman: "cha" },
  { dev: "ज", kn: "ಜ", ml: "ജ", bn: "জ", roman: "ja" },
  { dev: "झ", kn: "ಝ", ml: "ഝ", bn: "ঝ", roman: "jha" },
  { dev: "ञ", kn: "ಞ", ml: "ഞ", bn: "ঞ", roman: "ña" },
  // Retroflexes
  { dev: "ट", kn: "ಟ", ml: "ട", bn: "ট", roman: "ṭa" },
  { dev: "ठ", kn: "ಠ", ml: "ഠ", bn: "ঠ", roman: "ṭha" },
  { dev: "ड", kn: "ಡ", ml: "ഡ", bn: "ড", roman: "ḍa" },
  { dev: "ढ", kn: "ಢ", ml: "ഢ", bn: "ঢ", roman: "ḍha" },
  { dev: "ण", kn: "ಣ", ml: "ണ", bn: "ণ", roman: "ṇa" },
  // Dentals
  { dev: "त", kn: "ತ", ml: "ത", bn: "ত", roman: "ta" },
  { dev: "थ", kn: "ಥ", ml: "ഥ", bn: "থ", roman: "tha" },
  { dev: "द", kn: "ದ", ml: "ദ", bn: "দ", roman: "da" },
  { dev: "ध", kn: "ಧ", ml: "ധ", bn: "ধ", roman: "dha" },
  { dev: "न", kn: "ನ", ml: "ന", bn: "ন", roman: "na" },
  // Labials
  { dev: "प", kn: "ಪ", ml: "പ", bn: "প", roman: "pa" },
  { dev: "फ", kn: "ಫ", ml: "ഫ", bn: "ফ", roman: "pha" },
  { dev: "ब", kn: "ಬ", ml: "ബ", bn: "ব", roman: "ba" },
  { dev: "भ", kn: "ಭ", ml: "ഭ", bn: "ভ", roman: "bha" },
  { dev: "म", kn: "ಮ", ml: "മ", bn: "ম", roman: "ma" },
  // Semi-vowels & sibilants
  { dev: "य", kn: "ಯ", ml: "യ", bn: "য", roman: "ya" },
  { dev: "र", kn: "ರ", ml: "ര", bn: "র", roman: "ra" },
  { dev: "ल", kn: "ಲ", ml: "ല", bn: "ল", roman: "la" },
  { dev: "व", kn: "ವ", ml: "വ", bn: "ব", roman: "va" },
  { dev: "श", kn: "ಶ", ml: "ശ", bn: "শ", roman: "śa" },
  { dev: "ष", kn: "ಷ", ml: "ഷ", bn: "ষ", roman: "ṣa" },
  { dev: "स", kn: "ಸ", ml: "സ", bn: "স", roman: "sa" },
  { dev: "ह", kn: "ಹ", ml: "ഹ", bn: "হ", roman: "ha" },
];
