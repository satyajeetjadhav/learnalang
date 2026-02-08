import { create } from "zustand";
import { type Word, getWordsByLang } from "@/data/words";
import { ensureAllCards } from "@/data/srs-storage";

export type { Word };

interface WordsStore {
  words: Word[];
  loading: boolean;
  searchQuery: string;
  selectedLang: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedLang: (lang: string | null) => void;
  fetchWords: () => void;
}

export const useWordsStore = create<WordsStore>((set, get) => ({
  words: [],
  loading: false,
  searchQuery: "",
  selectedLang: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedLang: (lang) => set({ selectedLang: lang }),
  fetchWords: () => {
    const { selectedLang } = get();
    const words = getWordsByLang(selectedLang);
    ensureAllCards(words);
    set({ words, loading: false });
  },
}));
