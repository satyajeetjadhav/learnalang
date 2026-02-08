"use client";

import { useState } from "react";
import { useNavigationStore, type Page } from "@/stores/navigation-store";
import { useSettingsStore } from "@/stores/settings-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RiDashboardLine,
  RiBookOpenLine,
  RiFlashlightLine,
  RiArticleLine,
  RiToolsLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiSettings3Line,
  RiCheckLine,
  RiKeyLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { page: Page; label: string; icon: React.ElementType; shortcut: string }[] = [
  { page: "dashboard", label: "Dashboard", icon: RiDashboardLine, shortcut: "1" },
  { page: "words", label: "Words", icon: RiBookOpenLine, shortcut: "2" },
  { page: "review", label: "Review", icon: RiFlashlightLine, shortcut: "3" },
  { page: "reader", label: "Reader", icon: RiArticleLine, shortcut: "4" },
  { page: "modules", label: "Modules", icon: RiToolsLine, shortcut: "5" },
];

export function Sidebar() {
  const { currentPage, sidebarCollapsed, setPage, toggleSidebar } =
    useNavigationStore();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200",
        sidebarCollapsed ? "w-14" : "w-56"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 px-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 font-mono text-sm font-black text-white shadow-lg shadow-amber-500/20">
          P
        </div>
        {!sidebarCollapsed && (
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-tight text-sidebar-foreground">
              polyglot-flow
            </span>
            <span className="font-mono text-[9px] text-muted-foreground/70">
              delta-learning engine
            </span>
          </div>
        )}
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 p-2">
        <TooltipProvider delayDuration={0}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <Tooltip key={item.page}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground",
                      isActive &&
                        "bg-sidebar-accent text-primary font-medium",
                      sidebarCollapsed && "justify-center px-0"
                    )}
                    onClick={() => setPage(item.page)}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="flex-1 text-left text-sm">
                        {item.label}
                      </span>
                    )}
                    {!sidebarCollapsed && (
                      <kbd className="font-mono text-[10px] text-muted-foreground opacity-50">
                        {item.shortcut}
                      </kbd>
                    )}
                  </Button>
                </TooltipTrigger>
                {sidebarCollapsed && (
                  <TooltipContent side="right" className="font-mono text-xs">
                    {item.label}
                    <span className="ml-2 text-muted-foreground">
                      {item.shortcut}
                    </span>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* Settings + Collapse */}
      <div className="space-y-1 p-2">
        <SettingsButton collapsed={sidebarCollapsed} />

        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full text-sidebar-foreground/50 hover:text-sidebar-foreground",
            sidebarCollapsed && "justify-center px-0"
          )}
          onClick={toggleSidebar}
        >
          {sidebarCollapsed ? (
            <RiMenuUnfoldLine className="h-4 w-4" />
          ) : (
            <>
              <RiMenuFoldLine className="h-4 w-4" />
              <span className="ml-2 text-xs">Collapse</span>
            </>
          )}
        </Button>

        {!sidebarCollapsed && (
          <div className="mt-1 rounded-md border border-border/30 bg-muted/20 px-2.5 py-1.5">
            <p className="font-mono text-[9px] text-muted-foreground/70">
              <kbd className="rounded bg-muted/50 px-1">⌘K</kbd> Search ·{" "}
              <kbd className="rounded bg-muted/50 px-1">/</kbd> Focus ·{" "}
              <kbd className="rounded bg-muted/50 px-1">1-5</kbd> Navigate
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

export function SettingsButton({ collapsed, variant = "sidebar" }: { collapsed: boolean; variant?: "sidebar" | "mobile" }) {
  const { openaiApiKey, setOpenaiApiKey } = useSettingsStore();
  const [draft, setDraft] = useState(openaiApiKey);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const hasKey = openaiApiKey.length > 0;

  const handleSave = () => {
    setOpenaiApiKey(draft.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setOpen(false);
    }, 800);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (v) {
          setDraft(openaiApiKey);
          setSaved(false);
        }
      }}
    >
      <DialogTrigger asChild>
        {variant === "mobile" ? (
          <button className="flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-muted-foreground/80 transition-colors">
            <div className="relative">
              <RiSettings3Line className="h-5 w-5" />
              {hasKey && (
                <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
            </div>
            <span className="font-mono text-[9px]">Settings</span>
          </button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground/50 hover:text-sidebar-foreground",
              collapsed && "justify-center px-0"
            )}
          >
            <div className="relative">
              <RiSettings3Line className="h-4 w-4 shrink-0" />
              {hasKey && (
                <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              )}
            </div>
            {!collapsed && <span className="text-xs">Settings</span>}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-mono text-sm">
            <RiKeyLine className="h-4 w-4 text-primary" />
            API Configuration
          </DialogTitle>
          <DialogDescription className="text-sm">
            Your API key is stored locally in this browser and sent directly to
            OpenAI. It never touches any server.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="font-mono text-xs">
              OpenAI API Key
            </Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="font-mono text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
            <p className="font-mono text-xs text-muted-foreground">
              Used for the Reader page (GPT-4o-mini). Get one at{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                platform.openai.com
              </a>
            </p>
          </div>
          <div className="flex items-center justify-between">
            {draft && (
              <Button
                variant="ghost"
                size="sm"
                className="font-mono text-xs text-destructive hover:text-destructive"
                onClick={() => {
                  setDraft("");
                  setOpenaiApiKey("");
                }}
              >
                Remove key
              </Button>
            )}
            <Button
              size="sm"
              className="ml-auto gap-1.5 font-mono text-xs"
              onClick={handleSave}
            >
              {saved ? (
                <>
                  <RiCheckLine className="h-3.5 w-3.5" />
                  Saved
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
