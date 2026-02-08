"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RiBookOpenLine,
  RiFlashlightLine,
  RiFireLine,
  RiTranslate2,
} from "react-icons/ri";

const LANGUAGES = [
  { code: "kn", name: "Kannada", script: "ಕನ್ನಡ", color: "text-amber-400" },
  { code: "ml", name: "Malayalam", script: "മലയാളം", color: "text-emerald-400" },
  { code: "bn", name: "Bangla", script: "বাংলা", color: "text-sky-400" },
];

const STATS = [
  {
    label: "Total Words",
    value: "0",
    icon: RiBookOpenLine,
    description: "across all languages",
  },
  {
    label: "Due Reviews",
    value: "0",
    icon: RiFlashlightLine,
    description: "cards to review today",
  },
  {
    label: "Day Streak",
    value: "0",
    icon: RiFireLine,
    description: "consecutive days",
  },
  {
    label: "Languages",
    value: "3",
    icon: RiTranslate2,
    description: "target languages",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-mono text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Delta-learning across Kannada, Malayalam, and Bangla
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-mono text-2xl font-bold">{stat.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Language Cards */}
      <div>
        <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Target Languages
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {LANGUAGES.map((lang) => (
            <Card
              key={lang.code}
              className="group cursor-pointer border-border/50 bg-card/50 transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`font-mono text-2xl font-bold ${lang.color}`}
                    >
                      {lang.script}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
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
                <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                  <span>0 words</span>
                  <span>0 due</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Anchor Languages */}
      <div>
        <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Anchor Languages
        </h2>
        <div className="flex gap-3">
          {[
            { name: "Marathi", script: "मराठी" },
            { name: "Hindi", script: "हिन्दी" },
            { name: "English", script: "English" },
          ].map((lang) => (
            <Badge
              key={lang.name}
              variant="outline"
              className="gap-2 px-3 py-1.5 font-mono text-xs"
            >
              <span className="text-primary">{lang.script}</span>
              <span className="text-muted-foreground">{lang.name}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
