"use client";

import React from "react";
import { useReaderStore } from "@/stores/reader-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RiArticleLine,
  RiMagicLine,
  RiLoader4Line,
  RiHistoryLine,
  RiDeleteBinLine,
  RiLightbulbLine,
  RiRefreshLine,
} from "react-icons/ri";
import { InteractiveText } from "./interactive-text";
import type { ReaderSession } from "@/stores/reader-store";
import { READER_TOPICS } from "@/data/reader-topics";
import type { TopicSuggestion } from "@/data/reader-topics";
import { SpeakButton } from "./speak-button";

const LANG_OPTIONS = [
  { value: "kn", label: "Kannada", script: "ಕನ್ನಡ" },
  { value: "ml", label: "Malayalam", script: "മലയാളം" },
  { value: "bn", label: "Bangla", script: "বাংলা" },
];

const DIFFICULTY_OPTIONS = [
  { value: "beginner", label: "Beginner", desc: "90% known · 10% new" },
  { value: "intermediate", label: "Intermediate", desc: "70% known · 30% new" },
  { value: "advanced", label: "Advanced", desc: "50% known · 50% new" },
];

const LANG_COLORS: Record<string, string> = {
  kn: "text-kannada",
  ml: "text-malayalam",
  bn: "text-bangla",
};

export function ReaderPage() {
  const {
    selectedLang,
    difficulty,
    topic,
    generatedText,
    loading,
    sessions,
    setSelectedLang,
    setDifficulty,
    setTopic,
    generateStory,
    loadSession,
    deleteSession,
  } = useReaderStore();

  // Split the generated text into sections (native, transliteration, translation)
  const sections = generatedText
    ? generatedText.split(/\n\s*\n/).filter(Boolean)
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Comprehensible Input
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Reader</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          AI-generated passages using your known vocabulary + controlled new words
        </p>
      </div>

      {/* Controls */}
      <Card className="border-border/50 bg-card/60">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-full space-y-2 sm:w-auto">
              <Label className="font-mono text-xs">Language</Label>
              <Select value={selectedLang} onValueChange={setSelectedLang}>
                <SelectTrigger className="w-full font-mono text-sm sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANG_OPTIONS.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.script} {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full space-y-2 sm:w-auto">
              <Label className="font-mono text-xs">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-full font-mono text-sm sm:w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_OPTIONS.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <Label className="font-mono text-xs">
                Topic{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                placeholder="e.g., going to a restaurant, software development..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="font-mono text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) generateStory();
                }}
              />
            </div>

            <Button
              onClick={generateStory}
              disabled={loading}
              className="gap-2 font-mono text-xs"
            >
              {loading ? (
                <RiLoader4Line className="h-4 w-4 animate-spin" />
              ) : (
                <RiMagicLine className="h-4 w-4" />
              )}
              Generate
            </Button>
          </div>

          {/* Difficulty hint */}
          <p className="mt-3 font-mono text-[10px] text-muted-foreground/80">
            {DIFFICULTY_OPTIONS.find((d) => d.value === difficulty)?.desc}
            {" · "}Passages are generated from your known word list
          </p>
        </CardContent>
      </Card>

      {/* Topic Suggestions */}
      <TopicSuggestions
        lang={selectedLang}
        onSelect={(prompt) => {
          setTopic(prompt);
          generateStory();
        }}
        loading={loading}
      />

      {/* Generated Content */}
      {generatedText ? (
        <div className="space-y-4 animate-fade-up">
          {/* Native script */}
          {sections[0] && (
            <Card className="border-border/50 bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Badge variant="secondary" className="font-mono text-[10px] uppercase">
                    {selectedLang}
                  </Badge>
                  Native Script
                  <SpeakButton
                    text={sections[0]}
                    lang={selectedLang}
                    size="md"
                    passage
                    className="ml-auto"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl leading-relaxed font-medium">
                  <InteractiveText text={sections[0]} lang={selectedLang} />
                </p>
              </CardContent>
            </Card>
          )}

          {/* Transliteration */}
          {sections[1] && (
            <Card className="border-border/50 bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-xs text-muted-foreground">
                  Transliteration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm leading-relaxed text-foreground/80">
                  {sections[1]}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Marathi translation (only in 4-section format) */}
          {sections.length >= 4 && sections[2] && (
            <Card className="border-border/50 bg-card/60">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Badge variant="secondary" className="font-mono text-[10px] uppercase">
                    मराठी
                  </Badge>
                  Marathi Translation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-primary">
                  {sections[2]}
                </p>
              </CardContent>
            </Card>
          )}

          {/* English translation */}
          {(() => {
            const englishSection = sections.length >= 4 ? sections[3] : sections[2];
            return englishSection ? (
              <Card className="border-border/50 bg-card/60">
                <CardHeader className="pb-2">
                  <CardTitle className="font-mono text-xs text-muted-foreground">
                    English Translation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {englishSection}
                  </p>
                </CardContent>
              </Card>
            ) : null;
          })()}

          {/* If the response didn't split cleanly, show as-is */}
          {sections.length <= 1 && generatedText && (
            <Card className="border-border/50 bg-card/60">
              <CardContent className="p-5">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {generatedText}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        !loading && (
          <Card className="border-border/50 bg-card/60">
            <CardContent className="flex flex-col items-center justify-center py-24">
              <RiArticleLine className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <p className="font-mono text-sm text-muted-foreground">
                Generate a passage to start reading practice.
              </p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                The AI will use 90% of your known words + introduce 10% new vocabulary.
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground/70">
                Configure your OpenAI API key in Settings
              </p>
            </CardContent>
          </Card>
        )
      )}

      {/* Loading state */}
      {loading && (
        <Card className="border-border/50 bg-card/60">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <RiLoader4Line className="mb-4 h-8 w-8 animate-spin text-primary" />
            <p className="font-mono text-sm text-muted-foreground">
              Generating comprehensible input...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Past Sessions */}
      {sessions.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <RiHistoryLine className="h-4 w-4" />
            Past Sessions ({sessions.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sessions.map((s) => (
              <SessionCard
                key={s.id}
                session={s}
                onLoad={loadSession}
                onDelete={deleteSession}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function TopicSuggestions({
  lang,
  onSelect,
  loading,
}: {
  lang: string;
  onSelect: (prompt: string) => void;
  loading: boolean;
}) {
  const aiTopics = useReaderStore((s) => s.aiTopics);
  const staticTopics = READER_TOPICS[lang] ?? [];
  const dynamicTopics = aiTopics[lang] ?? [];

  // Merge static + AI topics, dedupe by label
  const allTopics = React.useMemo(() => {
    const seen = new Set<string>();
    const merged: TopicSuggestion[] = [];
    // AI topics first so they appear fresher
    for (const t of [...dynamicTopics, ...staticTopics]) {
      const key = t.label.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(t);
      }
    }
    return merged;
  }, [staticTopics, dynamicTopics]);

  const [displayed, setDisplayed] = React.useState<TopicSuggestion[]>([]);

  React.useEffect(() => {
    setDisplayed(shuffle(allTopics).slice(0, 6));
  }, [lang, allTopics.length]);

  const reshuffle = () => {
    setDisplayed(shuffle(allTopics).slice(0, 6));
  };

  if (allTopics.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <RiLightbulbLine className="h-3.5 w-3.5 text-amber-400" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Topic ideas
        </p>
        <button
          onClick={reshuffle}
          className="ml-auto flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] text-muted-foreground/60 transition-colors hover:text-muted-foreground"
        >
          <RiRefreshLine className="h-3 w-3" />
          More
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {displayed.map((t) => (
          <button
            key={t.label}
            disabled={loading}
            onClick={() => onSelect(t.prompt)}
            className="rounded-full border border-border/50 bg-card/60 px-3 py-1.5 font-mono text-xs text-foreground/80 transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-foreground disabled:opacity-50"
          >
            <span className="mr-1.5">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const LANG_LABELS: Record<string, string> = {
  kn: "Kannada",
  ml: "Malayalam",
  bn: "Bangla",
};

function SessionCard({
  session,
  onLoad,
  onDelete,
}: {
  session: ReaderSession;
  onLoad: (s: ReaderSession) => void;
  onDelete: (id: string) => void;
}) {
  const preview = session.text.split(/\n/)[0]?.slice(0, 80) ?? "";
  const date = new Date(session.createdAt);
  const timeStr = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  }) + " · " + date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      className="group cursor-pointer border-border/50 bg-card/60 transition-colors hover:border-primary/30"
      onClick={() => onLoad(session)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={`font-mono text-[10px] uppercase ${LANG_COLORS[session.lang] ?? ""}`}
              >
                {LANG_LABELS[session.lang] ?? session.lang}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                {session.difficulty}
              </Badge>
            </div>
            {session.topic && (
              <p className="mt-1.5 truncate font-mono text-xs text-foreground/80">
                {session.topic}
              </p>
            )}
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {preview}...
            </p>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground/60">
              {timeStr}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(session.id);
            }}
          >
            <RiDeleteBinLine className="h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
