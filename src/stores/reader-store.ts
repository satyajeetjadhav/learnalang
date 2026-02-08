import { create } from "zustand";
import { useSettingsStore } from "./settings-store";

export interface ReaderSession {
  id: string;
  lang: string;
  difficulty: string;
  topic: string;
  text: string;
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
  setSelectedLang: (lang: string) => void;
  setDifficulty: (d: string) => void;
  setTopic: (t: string) => void;
  generateStory: () => Promise<void>;
  loadSession: (session: ReaderSession) => void;
  deleteSession: (id: string) => void;
}

export const useReaderStore = create<ReaderStore>((set, get) => ({
  selectedLang: "kn",
  difficulty: "beginner",
  topic: "",
  generatedText: "",
  loading: false,
  sessions: loadSessions(),
  aiTopics: loadAiTopics(),
  setSelectedLang: (lang) => set({ selectedLang: lang }),
  setDifficulty: (d) => set({ difficulty: d }),
  setTopic: (t) => set({ topic: t }),
  generateStory: async () => {
    const { selectedLang, difficulty, topic } = get();
    const apiKey = useSettingsStore.getState().openaiApiKey;
    set({ loading: true, generatedText: "" });
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
        const session: ReaderSession = {
          id: crypto.randomUUID(),
          lang: selectedLang,
          difficulty,
          topic,
          text: data.text,
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

        set({ generatedText: data.text, loading: false, sessions, aiTopics });
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
    set({
      selectedLang: session.lang,
      difficulty: session.difficulty,
      topic: session.topic,
      generatedText: session.text,
    });
  },
  deleteSession: (id) => {
    const sessions = get().sessions.filter((s) => s.id !== id);
    saveSessions(sessions);
    set({ sessions });
  },
}));
