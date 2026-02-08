import { create } from "zustand";
import type { Word } from "./words-store";

export interface SrsCard {
  id: string;
  wordId: string;
  userId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReview: string;
  lastReview: string | null;
  createdAt: string;
}

export interface ReviewItem {
  card: SrsCard;
  word: Word;
}

interface ReviewStore {
  queue: ReviewItem[];
  currentIndex: number;
  flipped: boolean;
  loading: boolean;
  setQueue: (queue: ReviewItem[]) => void;
  setFlipped: (flipped: boolean) => void;
  nextCard: () => void;
  setLoading: (loading: boolean) => void;
  fetchQueue: () => Promise<void>;
  submitReview: (cardId: string, rating: number) => Promise<void>;
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  queue: [],
  currentIndex: 0,
  flipped: false,
  loading: false,
  setQueue: (queue) => set({ queue, currentIndex: 0, flipped: false }),
  setFlipped: (flipped) => set({ flipped }),
  nextCard: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.queue.length),
      flipped: false,
    })),
  setLoading: (loading) => set({ loading }),
  fetchQueue: async () => {
    set({ loading: true });
    const res = await fetch("/api/review");
    const data = await res.json();
    set({ queue: data, currentIndex: 0, flipped: false, loading: false });
  },
  submitReview: async (cardId, rating) => {
    await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId, rating }),
    });
    get().nextCard();
  },
}));
