import { sm2, type SM2Output } from "@/lib/sm2";
import type { Word } from "./words";

// ─── SRS Card State (stored in localStorage) ────────────────

export interface SrsCard {
  wordId: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  nextReview: string; // ISO date string
  lastReview: string | null;
}

const STORAGE_KEY = "polyglot-srs-cards";

function loadCards(): Record<string, SrsCard> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCards(cards: Record<string, SrsCard>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function ensureCard(wordId: string): SrsCard {
  const cards = loadCards();
  if (!cards[wordId]) {
    cards[wordId] = {
      wordId,
      interval: 0,
      easeFactor: 2.5,
      repetitions: 0,
      nextReview: new Date().toISOString(),
      lastReview: null,
    };
    saveCards(cards);
  }
  return cards[wordId];
}

export function ensureAllCards(words: Word[]) {
  const cards = loadCards();
  let changed = false;
  for (const w of words) {
    if (!cards[w.id]) {
      cards[w.id] = {
        wordId: w.id,
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0,
        nextReview: new Date().toISOString(),
        lastReview: null,
      };
      changed = true;
    }
  }
  if (changed) saveCards(cards);
}

export function getCardForWord(wordId: string): SrsCard | undefined {
  return loadCards()[wordId];
}

export function getDueCards(words: Word[]): { card: SrsCard; word: Word }[] {
  const cards = loadCards();
  const now = new Date();
  const result: { card: SrsCard; word: Word }[] = [];

  for (const word of words) {
    const card = cards[word.id];
    if (card && new Date(card.nextReview) <= now) {
      result.push({ card, word });
    }
  }

  return result;
}

export function submitReview(wordId: string, rating: number): SrsCard {
  const cards = loadCards();
  const card = cards[wordId] ?? ensureCard(wordId);

  const result: SM2Output = sm2({
    repetitions: card.repetitions,
    easeFactor: card.easeFactor,
    interval: card.interval,
    rating,
  });

  const updated: SrsCard = {
    wordId,
    interval: result.interval,
    easeFactor: result.easeFactor,
    repetitions: result.repetitions,
    nextReview: result.nextReview.toISOString(),
    lastReview: new Date().toISOString(),
  };

  cards[wordId] = updated;
  saveCards(cards);
  return updated;
}

export function getStats(words: Word[]) {
  const cards = loadCards();
  const now = new Date();
  let totalWords = words.length;
  let dueReviews = 0;
  let mastered = 0;

  const byLanguage: Record<string, { total: number; due: number; mastered: number }> = {};

  for (const word of words) {
    if (!byLanguage[word.targetLang]) {
      byLanguage[word.targetLang] = { total: 0, due: 0, mastered: 0 };
    }
    byLanguage[word.targetLang].total++;

    const card = cards[word.id];
    if (card) {
      if (new Date(card.nextReview) <= now) {
        dueReviews++;
        byLanguage[word.targetLang].due++;
      }
      if (card.interval > 21) {
        mastered++;
        byLanguage[word.targetLang].mastered++;
      }
    }
  }

  return { totalWords, dueReviews, streak: 0, mastered, byLanguage };
}
