"use client";

import { Badge } from "@/components/ui/badge";
import type { Grammar } from "@/data/words";

const POS_COLORS: Record<string, string> = {
  noun: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  verb: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  adjective: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  pronoun: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  adverb: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  number: "bg-pink-500/15 text-pink-400 border-pink-500/20",
  question: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  particle: "bg-slate-500/15 text-slate-400 border-slate-500/20",
  phrase: "bg-teal-500/15 text-teal-400 border-teal-500/20",
};

interface GrammarBadgesProps {
  grammar: Grammar;
  compact?: boolean;
}

export function GrammarBadges({ grammar, compact = false }: GrammarBadgesProps) {
  const posColor = POS_COLORS[grammar.pos] ?? "";
  const items: string[] = [];

  if (grammar.person) items.push(`${grammar.person}p`);
  if (grammar.number) items.push(grammar.number === "singular" ? "sg" : "pl");
  if (grammar.gender) items.push(grammar.gender === "masculine" ? "m" : grammar.gender === "feminine" ? "f" : "n");
  if (grammar.tense) items.push(grammar.tense);
  if (grammar.formality) items.push(grammar.formality === "formal" ? "for." : "inf.");

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1">
        <Badge variant="outline" className={`font-mono text-[9px] uppercase ${posColor}`}>
          {grammar.pos}
        </Badge>
        {items.length > 0 && (
          <Badge variant="outline" className="font-mono text-[9px] text-muted-foreground">
            {items.join(" · ")}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        Grammar
      </p>
      <div className="flex flex-wrap gap-1">
        <Badge variant="outline" className={`font-mono text-[9px] uppercase ${posColor}`}>
          {grammar.pos}
        </Badge>
        {grammar.person && (
          <Badge variant="outline" className="font-mono text-[9px] text-muted-foreground">
            {grammar.person === 1 ? "1st" : grammar.person === 2 ? "2nd" : "3rd"} person
          </Badge>
        )}
        {grammar.number && (
          <Badge variant="outline" className="font-mono text-[9px] text-muted-foreground">
            {grammar.number}
          </Badge>
        )}
        {grammar.gender && (
          <Badge variant="outline" className="font-mono text-[9px] text-muted-foreground">
            {grammar.gender}
          </Badge>
        )}
        {grammar.tense && (
          <Badge variant="outline" className="font-mono text-[9px] text-muted-foreground">
            {grammar.tense}
          </Badge>
        )}
        {grammar.formality && (
          <Badge variant="outline" className="font-mono text-[9px] text-muted-foreground">
            {grammar.formality}
          </Badge>
        )}
      </div>
    </div>
  );
}
