import type { Word } from "./words";

const STORAGE_KEY = "polyglot-user-words";

function loadUserWords(): Word[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUserWords(words: Word[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

export function getUserWords(): Word[] {
  return loadUserWords();
}

export function getUserWordsByLang(lang: string): Word[] {
  return loadUserWords().filter((w) => w.targetLang === lang);
}

export function addUserWord(word: Word): void {
  const words = loadUserWords();
  // Avoid duplicates by targetWord + lang
  if (words.some((w) => w.targetWord === word.targetWord && w.targetLang === word.targetLang)) {
    return;
  }
  words.push(word);
  saveUserWords(words);
}

export function removeUserWord(id: string): void {
  const words = loadUserWords().filter((w) => w.id !== id);
  saveUserWords(words);
}

export function hasUserWord(targetWord: string, lang: string): boolean {
  return loadUserWords().some(
    (w) => w.targetWord === targetWord && w.targetLang === lang
  );
}
