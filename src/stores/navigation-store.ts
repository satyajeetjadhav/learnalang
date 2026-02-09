import { create } from "zustand";

export type Page = "dashboard" | "words" | "review" | "reader" | "modules";

interface NavigationStore {
  currentPage: Page;
  sidebarCollapsed: boolean;
  setPage: (page: Page) => void;
  toggleSidebar: () => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentPage: "reader",
  sidebarCollapsed: false,
  setPage: (page) => set({ currentPage: page }),
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
