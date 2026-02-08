"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  RiBookOpenLine,
  RiFlashlightLine,
  RiFireLine,
  RiTranslate2,
  RiArrowRightLine,
  RiTimeLine,
} from "react-icons/ri";
import { useNavigationStore } from "@/stores/navigation-store";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useWordsStore } from "@/stores/words-store";
import { ScriptMap } from "@/components/script-map";

const LANGUAGES = [
  { code: "kn", name: "Kannada", script: "ಕನ್ನಡ", color: "text-kannada", bgGlow: "from-kannada/10 to-transparent" },
  { code: "ml", name: "Malayalam", script: "മലയാളം", color: "text-malayalam", bgGlow: "from-malayalam/10 to-transparent" },
  { code: "bn", name: "Bangla", script: "বাংলা", color: "text-bangla", bgGlow: "from-bangla/10 to-transparent" },
];

export function Dashboard() {
  const setPage = useNavigationStore((s) => s.setPage);
  const { stats, fetchStats } = useDashboardStore();
  const setSelectedLang = useWordsStore((s) => s.setSelectedLang);
  const [scriptLang, setScriptLang] = useState("kn");

  const navigateToLang = (langCode: string) => {
    setSelectedLang(langCode);
    setPage("words");
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statCards = [
    {
      label: "Total Words",
      value: stats.totalWords.toString(),
      icon: RiBookOpenLine,
      description: "across all languages",
      accent: "group-hover:text-primary",
    },
    {
      label: "Due Reviews",
      value: stats.dueReviews.toString(),
      icon: RiFlashlightLine,
      description: "cards to review today",
      accent: "group-hover:text-amber-400",
    },
    {
      label: "Day Streak",
      value: stats.streak.toString(),
      icon: RiFireLine,
      description: "consecutive days",
      accent: "group-hover:text-orange-400",
    },
    {
      label: "Mastered",
      value: stats.mastered.toString(),
      icon: RiTimeLine,
      description: "interval > 21 days",
      accent: "group-hover:text-emerald-400",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Polyglot-Flow
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Delta-learning across Kannada, Malayalam, and Bangla
          </p>
        </div>
        {stats.dueReviews > 0 && (
          <Button
            onClick={() => setPage("review")}
            className="gap-2 font-mono text-xs"
          >
            Start Review
            <RiArrowRightLine className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="group border-border/50 bg-card/60 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-5 w-5 text-muted-foreground/70 transition-colors ${stat.accent}`} />
              </CardHeader>
              <CardContent>
                <div className="font-mono text-4xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Language Cards */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Target Languages
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 font-mono text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setPage("words")}
          >
            View all words
            <RiArrowRightLine className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {LANGUAGES.map((lang, i) => {
            const langStats = stats.byLanguage[lang.code];
            const progress = langStats
              ? Math.round(
                  (langStats.mastered / Math.max(langStats.total, 1)) * 100
                )
              : 0;

            return (
              <Card
                key={lang.code}
                className="group relative cursor-pointer overflow-hidden border-border/50 bg-card/60 transition-all hover:border-border hover:bg-card/80 animate-fade-up"
                style={{ animationDelay: `${(i + 4) * 80}ms` }}
                onClick={() => navigateToLang(lang.code)}
              >
                {/* Subtle gradient glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${lang.bgGlow} opacity-0 transition-opacity group-hover:opacity-100`}
                />

                <CardContent className="relative p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`text-3xl font-bold script-glow ${lang.color}`}>
                        {lang.script}
                      </p>
                      <p className="mt-1.5 text-base text-muted-foreground">
                        {lang.name}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="font-mono text-xs uppercase"
                    >
                      {lang.code}
                    </Badge>
                  </div>

                  {/* Progress */}
                  <div className="mt-6 space-y-2.5">
                    <div className="flex justify-between font-mono text-sm">
                      <span className="text-muted-foreground">
                        {langStats?.total ?? 0} words
                      </span>
                      <span className="text-muted-foreground">
                        {langStats?.due ?? 0} due
                      </span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                    <p className="text-right font-mono text-xs text-muted-foreground">
                      {progress}% mastered
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Anchor Languages */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "700ms" }}
      >
        <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Bridge Languages
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Marathi", script: "मराठी", tag: "Base 1" },
            { name: "Hindi", script: "हिन्दी", tag: "Base 2" },
            { name: "English", script: "English", tag: "Bridge" },
          ].map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/40 px-5 py-3"
            >
              <span className="text-lg font-medium text-primary">
                {lang.script}
              </span>
              <span className="text-sm text-muted-foreground">
                {lang.name}
              </span>
              <Badge
                variant="outline"
                className="ml-1 font-mono text-xs uppercase text-muted-foreground/80"
              >
                {lang.tag}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Script Comparison */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "800ms" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Script Mapping
          </h2>
          <div className="flex gap-1.5">
            {LANGUAGES.map((l) => (
              <Button
                key={l.code}
                variant={scriptLang === l.code ? "secondary" : "ghost"}
                size="sm"
                className={`h-8 px-3 font-mono text-xs ${
                  scriptLang === l.code ? l.color : "text-muted-foreground"
                }`}
                onClick={() => setScriptLang(l.code)}
              >
                {l.name}
              </Button>
            ))}
          </div>
        </div>
        <ScriptMap targetLang={scriptLang} />
      </div>
    </div>
  );
}
