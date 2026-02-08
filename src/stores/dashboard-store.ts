import { create } from "zustand";
import { ALL_WORDS } from "@/data/words";
import { getUserWords } from "@/data/user-words";
import { getStats, ensureAllCards } from "@/data/srs-storage";

interface LangStats {
  total: number;
  due: number;
  mastered: number;
}

interface DashboardStats {
  totalWords: number;
  dueReviews: number;
  streak: number;
  mastered: number;
  byLanguage: Record<string, LangStats>;
}

interface DashboardStore {
  stats: DashboardStats;
  loading: boolean;
  fetchStats: () => void;
}

const emptyStats: DashboardStats = {
  totalWords: 0,
  dueReviews: 0,
  streak: 0,
  mastered: 0,
  byLanguage: {},
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: emptyStats,
  loading: false,
  fetchStats: () => {
    const allWords = [...ALL_WORDS, ...getUserWords()];
    ensureAllCards(allWords);
    const stats = getStats(allWords);
    set({ stats, loading: false });
  },
}));
