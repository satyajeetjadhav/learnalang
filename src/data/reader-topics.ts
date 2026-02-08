// ─── Culturally Immersive Topic Suggestions ─────────────────
// Grouped by language. These give the reader AI culturally relevant
// context so generated passages teach language AND culture together.

export interface TopicSuggestion {
  label: string;
  prompt: string;
  emoji: string;
}

export const READER_TOPICS: Record<string, TopicSuggestion[]> = {
  kn: [
    // Personalities
    { label: "Kuvempu", prompt: "Kuvempu, the Kannada poet who wrote Jaya Bharata Jananiya Tanujate", emoji: "✍️" },
    { label: "Purandara Dasa", prompt: "Purandara Dasa, the father of Carnatic music from Karnataka", emoji: "🎵" },
    { label: "Dr. Rajkumar", prompt: "Dr. Rajkumar, the legendary Kannada film actor", emoji: "🎬" },
    { label: "Visvesvaraya", prompt: "Sir M. Visvesvaraya, the great engineer from Muddenahalli", emoji: "🏗️" },
    { label: "Sudha Murty", prompt: "Sudha Murty, the Kannada writer and philanthropist", emoji: "📚" },

    // Places & Geography
    { label: "Hampi ruins", prompt: "the ancient Vijayanagara empire ruins at Hampi", emoji: "🏛️" },
    { label: "Coorg coffee", prompt: "coffee plantations and misty hills of Coorg (Kodagu)", emoji: "☕" },
    { label: "Mysore Palace", prompt: "Mysore Palace and the Dasara festival celebrations", emoji: "👑" },
    { label: "Jog Falls", prompt: "Jog Falls, one of the highest waterfalls in India", emoji: "💧" },
    { label: "Bangalore life", prompt: "daily life in Bengaluru, the IT capital of India", emoji: "🌆" },

    // Culture & Food
    { label: "Bisi Bele Bath", prompt: "making Bisi Bele Bath, the classic Karnataka rice dish", emoji: "🍛" },
    { label: "Mysore Dasara", prompt: "Mysore Dasara festival, the Nada Habba of Karnataka", emoji: "🎪" },
    { label: "Yakshagana", prompt: "Yakshagana, the traditional theatre art form of Karnataka", emoji: "🎭" },
    { label: "Udupi temples", prompt: "Udupi Sri Krishna temple and the Ashta Mathas", emoji: "🛕" },
    { label: "Kannada Rajyotsava", prompt: "Kannada Rajyotsava, the Karnataka formation day celebration", emoji: "🏴" },

    // History
    { label: "Hoysala temples", prompt: "the intricate Hoysala temple architecture at Belur and Halebidu", emoji: "🕌" },
    { label: "Tipu Sultan", prompt: "Tipu Sultan, the Tiger of Mysore and his resistance", emoji: "⚔️" },
    { label: "Chalukya dynasty", prompt: "the Chalukya dynasty and their contribution to Kannada literature", emoji: "📜" },

    // Nature
    { label: "Western Ghats", prompt: "biodiversity of the Western Ghats in Karnataka", emoji: "🌳" },
    { label: "Bandipur safari", prompt: "a wildlife safari in Bandipur National Park", emoji: "🐘" },
  ],

  ml: [
    // Personalities
    { label: "Mammootty", prompt: "Mammootty, the legendary Malayalam film actor", emoji: "🎬" },
    { label: "Adi Shankara", prompt: "Adi Shankaracharya, the philosopher born in Kaladi, Kerala", emoji: "🧘" },
    { label: "Kumaranasan", prompt: "Kumaran Asan, the great Malayalam poet and social reformer", emoji: "✍️" },
    { label: "APJ Abdul Kalam", prompt: "APJ Abdul Kalam, the missile man who grew up in Rameswaram", emoji: "🚀" },

    // Places
    { label: "Backwaters", prompt: "houseboat journey through the Kerala backwaters at Alleppey", emoji: "🚢" },
    { label: "Munnar tea", prompt: "tea gardens and misty mountains of Munnar", emoji: "🍵" },
    { label: "Fort Kochi", prompt: "the history of Fort Kochi, Chinese fishing nets, and spice trade", emoji: "🏰" },
    { label: "Wayanad", prompt: "Wayanad forests, tribal culture, and Edakkal caves", emoji: "🌿" },

    // Culture & Food
    { label: "Onam Sadya", prompt: "Onam Sadya, the grand feast served on banana leaf", emoji: "🍌" },
    { label: "Kathakali", prompt: "Kathakali, the classical dance-drama of Kerala", emoji: "🎭" },
    { label: "Theyyam", prompt: "Theyyam, the ritual art form of North Kerala", emoji: "🔥" },
    { label: "Kerala Ayurveda", prompt: "Ayurveda traditions and wellness practices in Kerala", emoji: "🌿" },
    { label: "Boat races", prompt: "Vallam Kali, the famous snake boat races of Kerala", emoji: "🚣" },
    { label: "Appam & stew", prompt: "making appam and vegetable stew, a Kerala breakfast", emoji: "🥞" },

    // History & Nature
    { label: "Spice route", prompt: "Kerala's role in the ancient spice trade route", emoji: "🌶️" },
    { label: "Periyar wildlife", prompt: "wildlife at Periyar Tiger Reserve", emoji: "🐅" },
  ],

  bn: [
    // Personalities
    { label: "Rabindranath", prompt: "Rabindranath Tagore, the Nobel laureate poet of Bengal", emoji: "✍️" },
    { label: "Satyajit Ray", prompt: "Satyajit Ray, the legendary Bengali filmmaker", emoji: "🎬" },
    { label: "Subhas Bose", prompt: "Netaji Subhas Chandra Bose and the freedom movement", emoji: "✊" },
    { label: "Swami Vivekananda", prompt: "Swami Vivekananda's journey from Kolkata to the world", emoji: "🙏" },

    // Places
    { label: "Kolkata trams", prompt: "riding the trams of Kolkata through the old city", emoji: "🚊" },
    { label: "Sundarbans", prompt: "the Sundarbans mangrove forest and Royal Bengal Tigers", emoji: "🐅" },
    { label: "Shantiniketan", prompt: "Shantiniketan, Tagore's open-air university in Bolpur", emoji: "🏫" },
    { label: "Howrah Bridge", prompt: "Howrah Bridge and the Hooghly river in Kolkata", emoji: "🌉" },

    // Culture & Food
    { label: "Durga Puja", prompt: "Durga Puja, the biggest festival of Bengal", emoji: "🪔" },
    { label: "Rosogolla", prompt: "the origin story of Rosogolla, Bengal's famous sweet", emoji: "🍡" },
    { label: "Baul music", prompt: "Baul singers, the wandering mystic musicians of Bengal", emoji: "🎵" },
    { label: "Fish curry & rice", prompt: "maach bhaat (fish curry and rice), the quintessential Bengali meal", emoji: "🐟" },
    { label: "Adda culture", prompt: "Bengali adda culture — the art of lively conversation", emoji: "☕" },
    { label: "Poila Boishakh", prompt: "Poila Boishakh, the Bengali New Year celebration", emoji: "🎉" },

    // History & Literature
    { label: "Bengal Renaissance", prompt: "the Bengal Renaissance and its impact on modern India", emoji: "📖" },
    { label: "Kolkata book fair", prompt: "the Kolkata International Book Fair, the largest in Asia", emoji: "📚" },
  ],
};
