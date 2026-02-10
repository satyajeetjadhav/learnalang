import { create } from "zustand";
import { useSettingsStore } from "./settings-store";
import type { Word } from "@/data/words";
import { addUserWord, hasUserWord } from "@/data/user-words";
import { ensureCard } from "@/data/srs-storage";

export interface ReaderSession {
  id: string;
  lang: string;
  difficulty: string;
  topic: string;
  text: string;
  newVocab?: Word[];
  createdAt: number;
}

export interface SuggestedTopic {
  label: string;
  prompt: string;
  emoji: string;
}

const STORAGE_KEY = "polyglot-flow-reader-sessions";
const TOPICS_STORAGE_KEY = "polyglot-flow-ai-topics";

function loadSessions(): ReaderSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: ReaderSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function loadAiTopics(): Record<string, SuggestedTopic[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(TOPICS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAiTopics(topics: Record<string, SuggestedTopic[]>) {
  localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(topics));
}

interface ReaderStore {
  selectedLang: string;
  difficulty: string;
  topic: string;
  generatedText: string;
  loading: boolean;
  sessions: ReaderSession[];
  aiTopics: Record<string, SuggestedTopic[]>;
  newVocab: Word[];
  savedWordIds: Set<string>;
  setSelectedLang: (lang: string) => void;
  setDifficulty: (d: string) => void;
  setTopic: (t: string) => void;
  generateStory: () => Promise<void>;
  loadSession: (session: ReaderSession) => void;
  deleteSession: (id: string) => void;
  saveWord: (word: Word) => void;
  saveAllNewWords: () => void;
}

export const useReaderStore = create<ReaderStore>((set, get) => ({
  selectedLang: "kn",
  difficulty: "beginner",
  topic: "",
  generatedText: "",
  loading: false,
  sessions: loadSessions(),
  aiTopics: loadAiTopics(),
  newVocab: [],
  savedWordIds: new Set<string>(),
  setSelectedLang: (lang) => set({ selectedLang: lang }),
  setDifficulty: (d) => set({ difficulty: d }),
  setTopic: (t) => set({ topic: t }),
  generateStory: async () => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      set({
        generatedText:
          "You're offline. Connect to the internet to generate new passages. Your past sessions are still available below.",
        loading: false,
      });
      return;
    }
    const { selectedLang, difficulty, topic } = get();
    const apiKey = useSettingsStore.getState().openaiApiKey;
    set({ loading: true, generatedText: "", newVocab: [], savedWordIds: new Set() });
    try {
      const res = await fetch("/api/reader/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang: selectedLang,
          difficulty,
          topic,
          ...(apiKey ? { apiKey } : {}),
        }),
      });
      if (res.ok) {
        const data = await res.json();

        // Parse vocabulary from API response into Word objects
        const vocab: Word[] = Array.isArray(data.vocabulary)
          ? data.vocabulary.map(
              (v: Record<string, unknown>, i: number) => ({
                id: `user-${selectedLang}-${Date.now()}-${i}`,
                targetLang: selectedLang,
                targetWord: v.targetWord as string,
                phoneticScript: (v.phoneticScript as string) ?? null,
                marathiAnchor: (v.marathiAnchor as string) ?? null,
                hindiAnchor: (v.hindiAnchor as string) ?? null,
                englishMeaning: (v.englishMeaning as string) ?? "",
                category: (v.category as string) ?? null,
                grammar: (v.grammar as Word["grammar"]) ?? null,
              })
            )
          : [];

        // Filter out words that are already saved by the user
        const unsavedVocab = vocab.filter(
          (w) => !hasUserWord(w.targetWord, w.targetLang)
        );

        const session: ReaderSession = {
          id: crypto.randomUUID(),
          lang: selectedLang,
          difficulty,
          topic,
          text: data.text,
          newVocab: vocab,
          createdAt: Date.now(),
        };
        const sessions = [session, ...get().sessions];
        saveSessions(sessions);

        // Merge AI-suggested topics (dedupe by label)
        let aiTopics = { ...get().aiTopics };
        if (data.suggestedTopics?.length) {
          const existing = aiTopics[selectedLang] ?? [];
          const existingLabels = new Set(existing.map((t: SuggestedTopic) => t.label.toLowerCase()));
          const newTopics = (data.suggestedTopics as SuggestedTopic[]).filter(
            (t) => !existingLabels.has(t.label.toLowerCase())
          );
          if (newTopics.length > 0) {
            aiTopics = {
              ...aiTopics,
              [selectedLang]: [...existing, ...newTopics].slice(-50), // keep last 50
            };
            saveAiTopics(aiTopics);
          }
        }

        // Detect which vocab words were already saved previously
        const alreadySaved = new Set(
          vocab
            .filter((w) => hasUserWord(w.targetWord, w.targetLang))
            .map((w) => w.id)
        );

        set({
          generatedText: data.text,
          loading: false,
          sessions,
          aiTopics,
          newVocab: vocab,
          savedWordIds: alreadySaved,
        });
      } else {
        const data = await res.json().catch(() => null);
        set({
          generatedText:
            data?.error ?? "Failed to generate. Configure your API key in Settings.",
          loading: false,
        });
      }
    } catch {
      set({
        generatedText: "Error connecting to the API.",
        loading: false,
      });
    }
  },
  loadSession: (session) => {
    const vocab = session.newVocab ?? [];
    const alreadySaved = new Set(
      vocab
        .filter((w) => hasUserWord(w.targetWord, w.targetLang))
        .map((w) => w.id)
    );
    set({
      selectedLang: session.lang,
      difficulty: session.difficulty,
      topic: session.topic,
      generatedText: session.text,
      newVocab: vocab,
      savedWordIds: alreadySaved,
    });
  },
  deleteSession: (id) => {
    const sessions = get().sessions.filter((s) => s.id !== id);
    saveSessions(sessions);
    set({ sessions });
  },
  saveWord: (word) => {
    addUserWord(word);
    ensureCard(word.id);
    set((state) => ({
      savedWordIds: new Set([...state.savedWordIds, word.id]),
    }));
  },
  saveAllNewWords: () => {
    const { newVocab, savedWordIds } = get();
    const unsaved = newVocab.filter((w) => !savedWordIds.has(w.id));
    for (const word of unsaved) {
      addUserWord(word);
      ensureCard(word.id);
    }
    set({
      savedWordIds: new Set(newVocab.map((w) => w.id)),
    });
  },
}));
