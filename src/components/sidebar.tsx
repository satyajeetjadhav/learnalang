"use client";

import { useNavigationStore, type Page } from "@/stores/navigation-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { page: Page; label: string; icon: React.ElementType; shortcut: string }[] = [
  { page: "dashboard", label: "Dashboard", icon: RiDashboardLine, shortcut: "1" },
  { page: "words", label: "Words", icon: RiBookOpenLine, shortcut: "2" },
  { page: "review", label: "Review", icon: RiFlashlightLine, shortcut: "3" },
  { page: "reader", label: "Reader", icon: RiArticleLine, shortcut: "4" },
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
      <div className="flex h-14 items-center gap-2 px-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
          P
        </div>
        {!sidebarCollapsed && (
          <span className="font-mono text-sm font-semibold tracking-tight text-sidebar-foreground">
            polyglot-flow
          </span>
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

      {/* Collapse toggle */}
      <div className="p-2">
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
      </div>
    </aside>
  );
}
