"use client";

import { useEffect } from "react";
import { useNavigationStore, type Page } from "@/stores/navigation-store";

const PAGE_SHORTCUTS: Record<string, Page> = {
  "1": "dashboard",
  "2": "words",
  "3": "review",
  "4": "reader",
};

export function useKeyboardShortcuts() {
  const setPage = useNavigationStore((s) => s.setPage);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger shortcuts if user is typing in an input
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Number keys for navigation
      if (PAGE_SHORTCUTS[e.key]) {
        e.preventDefault();
        setPage(PAGE_SHORTCUTS[e.key]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setPage]);
}
