import { create } from "zustand";

export interface Word {
  id: string;
  targetLang: string;
  targetWord: string;
  phoneticScript: string | null;
  marathiAnchor: string | null;
  hindiAnchor: string | null;
  englishMeaning: string;
  category: string | null;
  audioUrl: string | null;
  createdAt: string;
}

interface WordsStore {
  words: Word[];
  loading: boolean;
  searchQuery: string;
  selectedLang: string | null;
  setWords: (words: Word[]) => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedLang: (lang: string | null) => void;
  fetchWords: () => Promise<void>;
}

export const useWordsStore = create<WordsStore>((set, get) => ({
  words: [],
  loading: false,
  searchQuery: "",
  selectedLang: null,
  setWords: (words) => set({ words }),
  setLoading: (loading) => set({ loading }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedLang: (lang) => set({ selectedLang: lang }),
  fetchWords: async () => {
    set({ loading: true });
    const lang = get().selectedLang;
    const url = lang ? `/api/words?lang=${lang}` : "/api/words";
    const res = await fetch(url);
    const data = await res.json();
    set({ words: data, loading: false });
  },
}));
