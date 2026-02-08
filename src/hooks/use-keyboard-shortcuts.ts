"use client";

import { useEffect } from "react";
import { useNavigationStore, type Page } from "@/stores/navigation-store";

const PAGE_SHORTCUTS: Record<string, Page> = {
  "1": "dashboard",
  "2": "words",
  "3": "review",
  "4": "reader",
  "5": "modules",
};

export function useKeyboardShortcuts() {
  const setPage = useNavigationStore((s) => s.setPage);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Cmd+K / Ctrl+K to focus search (works even in inputs)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          '[data-search-input]'
        );
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
        return;
      }

      // Escape from search input to blur
      if (e.key === "Escape" && isInput) {
        (target as HTMLElement).blur();
        return;
      }

      // Don't trigger nav shortcuts if user is typing in an input
      if (isInput) return;

      // / key to focus search (vim-style)
      if (e.key === "/") {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          '[data-search-input]'
        );
        if (searchInput) {
          searchInput.focus();
        }
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
