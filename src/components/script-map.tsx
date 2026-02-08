"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VOWELS, CONSONANTS } from "@/data/script-data";

const LANG_META: Record<string, { name: string; color: string }> = {
  kn: { name: "Kannada", color: "text-kannada" },
  ml: { name: "Malayalam", color: "text-malayalam" },
  bn: { name: "Bangla", color: "text-bangla" },
};

interface ScriptMapProps {
  targetLang?: string;
}

export function ScriptMap({ targetLang = "kn" }: ScriptMapProps) {
  const [activeTab, setActiveTab] = useState<"vowels" | "consonants">("vowels");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lang = LANG_META[targetLang] ?? LANG_META.kn;
  const data = activeTab === "vowels" ? VOWELS : CONSONANTS;

  return (
    <Card className="border-border/50 bg-card/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-mono text-xs text-muted-foreground">
            Script Comparison
          </CardTitle>
          <Badge variant="secondary" className="font-mono text-[10px] uppercase">
            Devanagari → {lang.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "vowels" | "consonants")}
        >
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="vowels" className="flex-1 font-mono text-xs">
              Vowels ({VOWELS.length})
            </TabsTrigger>
            <TabsTrigger value="consonants" className="flex-1 font-mono text-xs">
              Consonants ({CONSONANTS.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-10">
              {data.map((char, i) => {
                const targetChar = char[targetLang as keyof typeof char] ?? "";
                const isHovered = hoveredIndex === i;

                return (
                  <div
                    key={char.roman}
                    className={`group relative flex flex-col items-center gap-1 rounded-lg border p-2.5 transition-all cursor-default ${
                      isHovered
                        ? "border-primary/40 bg-primary/5 scale-110 z-10 shadow-lg"
                        : "border-border/30 bg-muted/10 hover:border-border/60"
                    }`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Devanagari (source) */}
                    <span className="text-sm text-muted-foreground">
                      {char.dev}
                    </span>

                    {/* Arrow */}
                    <span className="text-[8px] text-muted-foreground/60">↓</span>

                    {/* Target script */}
                    <span className={`text-lg font-bold ${lang.color}`}>
                      {targetChar}
                    </span>

                    {/* Romanization on hover */}
                    {isHovered && (
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-popover px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground shadow-md">
                        {char.roman}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <p className="mt-6 text-center font-mono text-[10px] text-muted-foreground/70">
          Hover over a character to see romanization · All scripts descend from Brahmi
        </p>
      </CardContent>
    </Card>
  );
}
