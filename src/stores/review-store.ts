import { create } from "zustand";
import type { Word } from "@/data/words";
import { ALL_WORDS } from "@/data/words";
import { type SrsCard, getDueCards, submitReview as srsSubmit, ensureAllCards } from "@/data/srs-storage";

export type { SrsCard };

export interface ReviewItem {
  card: SrsCard;
  word: Word;
}

interface SessionStats {
  ratings: number[];
  startTime: number;
}

interface ReviewStore {
  queue: ReviewItem[];
  currentIndex: number;
  flipped: boolean;
  loading: boolean;
  sessionStats: SessionStats;
  setFlipped: (flipped: boolean) => void;
  nextCard: () => void;
  prevCard: () => void;
  goToRandom: () => void;
  fetchQueue: () => void;
  submitReview: (wordId: string, rating: number) => void;
}

const emptySession: SessionStats = { ratings: [], startTime: 0 };

export const useReviewStore = create<ReviewStore>((set, get) => ({
  queue: [],
  currentIndex: 0,
  flipped: false,
  loading: false,
  sessionStats: emptySession,
  setFlipped: (flipped) => set({ flipped }),
  nextCard: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.queue.length),
      flipped: false,
    })),
  prevCard: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
      flipped: false,
    })),
  goToRandom: () =>
    set((state) => {
      if (state.queue.length <= 1) return {};
      let idx: number;
      do {
        idx = Math.floor(Math.random() * state.queue.length);
      } while (idx === state.currentIndex);
      return { currentIndex: idx, flipped: false };
    }),
  fetchQueue: () => {
    set({ loading: true });
    ensureAllCards(ALL_WORDS);
    const due = getDueCards(ALL_WORDS);
    set({
      queue: due,
      currentIndex: 0,
      flipped: false,
      loading: false,
      sessionStats: { ratings: [], startTime: Date.now() },
    });
  },
  submitReview: (wordId, rating) => {
    srsSubmit(wordId, rating);
    set((state) => ({
      sessionStats: {
        ...state.sessionStats,
        ratings: [...state.sessionStats.ratings, rating],
      },
    }));
    get().nextCard();
  },
}));
