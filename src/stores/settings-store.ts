import { create } from "zustand";

interface SettingsStore {
  openaiApiKey: string;
  setOpenaiApiKey: (key: string) => void;
}

function loadApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("polyglot-flow-openai-key") ?? "";
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  openaiApiKey: loadApiKey(),
  setOpenaiApiKey: (key) => {
    localStorage.setItem("polyglot-flow-openai-key", key);
    set({ openaiApiKey: key });
  },
}));
