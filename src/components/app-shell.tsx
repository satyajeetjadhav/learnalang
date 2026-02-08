"use client";

import { useNavigationStore, type Page } from "@/stores/navigation-store";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { Sidebar } from "./sidebar";
import { Dashboard } from "./dashboard";
import { WordBrowser } from "./word-browser";
import { ReviewPage } from "./review-page";
import { ReaderPage } from "./reader-page";
import { LanguageModules } from "./language-modules";
import {
  RiDashboardLine,
  RiBookOpenLine,
  RiFlashlightLine,
  RiArticleLine,
  RiToolsLine,
} from "react-icons/ri";
import { SettingsButton } from "./sidebar";
import { cn } from "@/lib/utils";

const PAGE_COMPONENTS = {
  dashboard: Dashboard,
  words: WordBrowser,
  review: ReviewPage,
  reader: ReaderPage,
  modules: LanguageModules,
} as const;

const MOBILE_NAV: { page: Page; icon: React.ElementType; label: string }[] = [
  { page: "dashboard", icon: RiDashboardLine, label: "Home" },
  { page: "words", icon: RiBookOpenLine, label: "Words" },
  { page: "review", icon: RiFlashlightLine, label: "Review" },
  { page: "reader", icon: RiArticleLine, label: "Reader" },
  { page: "modules", icon: RiToolsLine, label: "Modules" },
];

function MobileNav() {
  const { currentPage, setPage } = useNavigationStore();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around px-1 py-1.5">
        {MOBILE_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground/80"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-mono text-[9px]">{item.label}</span>
            </button>
          );
        })}
        <SettingsButton collapsed={true} variant="mobile" />
      </div>
    </nav>
  );
}

export function AppShell() {
  useKeyboardShortcuts();
  const currentPage = useNavigationStore((s) => s.currentPage);
  const PageComponent = PAGE_COMPONENTS[currentPage];

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <PageComponent />
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
