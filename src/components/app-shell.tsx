"use client";

import { useNavigationStore } from "@/stores/navigation-store";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { Sidebar } from "./sidebar";
import { Dashboard } from "./dashboard";
import { WordBrowser } from "./word-browser";
import { ReviewPage } from "./review-page";
import { ReaderPage } from "./reader-page";

const PAGE_COMPONENTS = {
  dashboard: Dashboard,
  words: WordBrowser,
  review: ReviewPage,
  reader: ReaderPage,
} as const;

export function AppShell() {
  useKeyboardShortcuts();
  const currentPage = useNavigationStore((s) => s.currentPage);
  const PageComponent = PAGE_COMPONENTS[currentPage];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <PageComponent />
        </div>
      </main>
    </div>
  );
}
