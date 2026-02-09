import { create } from "zustand";

const STORAGE_KEY = "polyglot-flow-onboarding";

export type OnboardingStep = "language" | "anchors" | "apikey" | "generate";

export interface OnboardingState {
  completed: boolean;
  currentStep: OnboardingStep;
  targetLang: string;
  anchorLangs: string[]; // e.g. ["marathi", "hindi", "english"]
}

function loadState(): OnboardingState {
  if (typeof window === "undefined")
    return { completed: false, currentStep: "language", targetLang: "", anchorLangs: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completed: false, currentStep: "language", targetLang: "", anchorLangs: [] };
}

function persist(state: OnboardingState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

interface OnboardingStore extends OnboardingState {
  setStep: (step: OnboardingStep) => void;
  setTargetLang: (lang: string) => void;
  toggleAnchorLang: (lang: string) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => {
  const initial = loadState();
  return {
    ...initial,
    setStep: (step) => {
      const next = { ...get(), currentStep: step };
      persist(next);
      set({ currentStep: step });
    },
    setTargetLang: (lang) => {
      const next = { ...get(), targetLang: lang };
      persist(next);
      set({ targetLang: lang });
    },
    toggleAnchorLang: (lang) => {
      const current = get().anchorLangs;
      const updated = current.includes(lang)
        ? current.filter((l) => l !== lang)
        : [...current, lang];
      const next = { ...get(), anchorLangs: updated };
      persist(next);
      set({ anchorLangs: updated });
    },
    completeOnboarding: () => {
      const next = { ...get(), completed: true };
      persist(next);
      set({ completed: true });
    },
    resetOnboarding: () => {
      const fresh: OnboardingState = {
        completed: false,
        currentStep: "language",
        targetLang: "",
        anchorLangs: [],
      };
      persist(fresh);
      set(fresh);
    },
  };
});
