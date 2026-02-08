"use client";

import { useMemo } from "react";
import { decomposeWord, type Akshara } from "@/lib/akshara";

const LANG_COLORS: Record<string, string> = {
  kn: "text-kannada",
  ml: "text-malayalam",
  bn: "text-bangla",
};

interface AksharaBreakdownProps {
  word: string;
  lang: string;
  compact?: boolean;
}

export function AksharaBreakdown({ word, lang, compact = false }: AksharaBreakdownProps) {
  const aksharas = useMemo(() => decomposeWord(word, lang), [word, lang]);

  if (aksharas.length === 0) return null;

  const langColor = LANG_COLORS[lang] ?? "text-foreground";

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {aksharas.map((a, i) => (
          <span
            key={i}
            className={`inline-flex items-center rounded border border-border/40 bg-muted/20 px-2 py-1 text-base font-semibold ${langColor}`}
          >
            {a.display}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Akshara Breakdown
      </p>
      <div className="flex flex-wrap gap-2.5">
        {aksharas.map((a, i) => (
          <AksharaPill key={i} akshara={a} langColor={langColor} />
        ))}
      </div>
    </div>
  );
}

function AksharaPill({ akshara, langColor }: { akshara: Akshara; langColor: string }) {
  const typeLabel =
    akshara.type === "vowel"
      ? "V"
      : akshara.type === "conjunct"
      ? "C+C"
      : "C";

  const typeBg =
    akshara.type === "vowel"
      ? "bg-primary/10 text-primary"
      : akshara.type === "conjunct"
      ? "bg-orange-500/10 text-orange-400"
      : "bg-muted/30 text-muted-foreground";

  return (
    <div className="flex flex-col items-center gap-1.5 rounded-lg border border-border/40 bg-card/80 px-4 py-2.5 transition-colors hover:border-border/70 hover:bg-muted/20">
      {/* Main character */}
      <span className={`text-2xl font-bold leading-none ${langColor}`}>
        {akshara.display}
      </span>

      {/* Component breakdown */}
      <div className="flex items-center gap-1">
        {akshara.consonants.length > 0 && (
          <span className="font-mono text-xs text-muted-foreground/70">
            {akshara.consonants.join("+")}
          </span>
        )}
        {akshara.matra && (
          <>
            <span className="font-mono text-[10px] text-muted-foreground/60">+</span>
            <span className="font-mono text-xs text-primary/80">
              {akshara.matra}
            </span>
          </>
        )}
        {akshara.vowel && akshara.type === "vowel" && (
          <span className="font-mono text-xs text-primary/80">
            {akshara.vowel}
          </span>
        )}
      </div>

      {/* Phonetic + type badge */}
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-xs font-medium text-muted-foreground">
          {akshara.phonetic}
        </span>
        <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase ${typeBg}`}>
          {typeLabel}
        </span>
      </div>
    </div>
  );
}
