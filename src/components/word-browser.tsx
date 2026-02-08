"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useWordsStore, type Word } from "@/stores/words-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RiSearchLine,
  RiCloseLine,
  RiArrowLeftRightLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
} from "react-icons/ri";
import { SpeakButton } from "./speak-button";
import { AksharaBreakdown } from "./akshara-breakdown";
import { GrammarBadges } from "./grammar-badges";

const LANG_OPTIONS = [
  { value: "kn", label: "Kannada", script: "ಕನ್ನಡ" },
  { value: "ml", label: "Malayalam", script: "മലയാളം" },
  { value: "bn", label: "Bangla", script: "বাংলা" },
];

const LANG_COLORS: Record<string, string> = {
  kn: "text-kannada",
  ml: "text-malayalam",
  bn: "text-bangla",
};

export function WordBrowser() {
  const {
    words,
    loading,
    searchQuery,
    selectedLang,
    setSearchQuery,
    setSelectedLang,
    fetchWords,
  } = useWordsStore();

  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchWords();
  }, [fetchWords, selectedLang]);

  // On mobile, scroll the detail panel into view when a word is selected
  useEffect(() => {
    if (selectedWord && detailRef.current && window.innerWidth < 1024) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedWord]);

  const filteredWords = useMemo(() => {
    if (!searchQuery) return words;
    const q = searchQuery.toLowerCase();
    return words.filter(
      (w) =>
        w.targetWord.toLowerCase().includes(q) ||
        w.englishMeaning.toLowerCase().includes(q) ||
        w.marathiAnchor?.toLowerCase().includes(q) ||
        w.hindiAnchor?.toLowerCase().includes(q) ||
        w.phoneticScript?.toLowerCase().includes(q)
    );
  }, [words, searchQuery]);

  const selectedIndex = useMemo(() => {
    if (!selectedWord) return -1;
    return filteredWords.findIndex((w) => w.id === selectedWord.id);
  }, [filteredWords, selectedWord]);

  const goToPrev = useCallback(() => {
    if (filteredWords.length === 0) return;
    const idx = selectedIndex <= 0 ? filteredWords.length - 1 : selectedIndex - 1;
    setSelectedWord(filteredWords[idx]);
  }, [filteredWords, selectedIndex]);

  const goToNext = useCallback(() => {
    if (filteredWords.length === 0) return;
    const idx = selectedIndex >= filteredWords.length - 1 ? 0 : selectedIndex + 1;
    setSelectedWord(filteredWords[idx]);
  }, [filteredWords, selectedIndex]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Trilateral Mapping
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Words</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cross-linguistic word mappings across all target languages
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            data-search-input
            placeholder="Search words, meanings, anchors...  (/ or ⌘K)"
            className="pl-9 font-mono text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={selectedLang ?? "all"}
          onValueChange={(v) => setSelectedLang(v === "all" ? null : v)}
        >
          <SelectTrigger className="w-full font-mono text-sm sm:w-44">
            <SelectValue placeholder="All languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {LANG_OPTIONS.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.script} {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Table */}
        <Card className="flex-1 border-border/50 bg-card/60">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between font-mono text-xs font-medium text-muted-foreground">
              <span>{filteredWords.length} words</span>
              {loading && (
                <span className="animate-pulse text-primary">Loading...</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredWords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <RiArrowLeftRightLine className="mb-3 h-8 w-8 text-muted-foreground/40" />
                <p className="font-mono text-sm text-muted-foreground">
                  No words found matching your search.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="font-mono text-xs uppercase tracking-wider">
                      Target
                    </TableHead>
                    <TableHead className="font-mono text-xs uppercase tracking-wider">
                      Phonetic
                    </TableHead>
                    <TableHead className="font-mono text-xs uppercase tracking-wider">
                      English
                    </TableHead>
                    <TableHead className="font-mono text-xs uppercase tracking-wider">
                      Lang
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWords.map((word, i) => (
                    <TableRow
                      key={word.id}
                      className={`border-border/30 cursor-pointer transition-colors hover:bg-muted/50 animate-fade-up ${
                        selectedWord?.id === word.id ? "bg-muted/40" : ""
                      }`}
                      style={{ animationDelay: `${Math.min(i, 20) * 30}ms` }}
                      onClick={() => setSelectedWord(word)}
                    >
                      <TableCell
                        className={`text-lg font-semibold ${LANG_COLORS[word.targetLang] ?? ""}`}
                      >
                        {word.targetWord}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {word.phoneticScript ?? "—"}
                      </TableCell>
                      <TableCell className="text-base text-muted-foreground">
                        {word.englishMeaning}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="font-mono text-xs uppercase"
                        >
                          {word.targetLang}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Trilateral Detail Panel */}
        {selectedWord && (
          <Card ref={detailRef} className="-order-1 w-full shrink-0 border-border/50 bg-card/60 animate-fade-up lg:order-none lg:sticky lg:top-6 lg:self-start lg:w-96">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-xs text-muted-foreground">
                  Trilateral Map
                </CardTitle>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-xs text-muted-foreground/70">
                    {selectedIndex + 1}/{filteredWords.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={goToPrev}
                  >
                    <RiArrowUpSLine className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={goToNext}
                  >
                    <RiArrowDownSLine className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setSelectedWord(null)}
                  >
                    <RiCloseLine className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Target Word */}
              <div className="text-center">
                <p
                  className={`text-5xl font-bold script-glow ${LANG_COLORS[selectedWord.targetLang] ?? ""}`}
                >
                  {selectedWord.targetWord}
                </p>
                <SpeakButton
                  text={selectedWord.targetWord}
                  lang={selectedWord.targetLang}
                  size="md"
                  className="mx-auto mt-2"
                />
                {selectedWord.phoneticScript && (
                  <p className="mt-1.5 font-mono text-base text-muted-foreground">
                    /{selectedWord.phoneticScript}/
                  </p>
                )}
                <Badge
                  variant="secondary"
                  className="mt-2 font-mono text-xs uppercase"
                >
                  {selectedWord.targetLang} ·{" "}
                  {selectedWord.category ?? "general"}
                </Badge>
              </div>

              {/* Grammar */}
              {selectedWord.grammar && (
                <GrammarBadges grammar={selectedWord.grammar} />
              )}

              {/* Akshara Breakdown */}
              <AksharaBreakdown
                word={selectedWord.targetWord}
                lang={selectedWord.targetLang}
              />

              {/* Mapping Arrows */}
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-md border border-border/50 bg-muted/30 px-4 py-3">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      मराठी Marathi
                    </p>
                    <p className="mt-1 text-lg font-medium">
                      {selectedWord.marathiAnchor ?? "—"}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] uppercase text-muted-foreground/80"
                  >
                    Base 1
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border/50 bg-muted/30 px-4 py-3">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      हिन्दी Hindi
                    </p>
                    <p className="mt-1 text-lg font-medium">
                      {selectedWord.hindiAnchor ?? "—"}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] uppercase text-muted-foreground/80"
                  >
                    Base 2
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border/50 bg-muted/30 px-4 py-3">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      English
                    </p>
                    <p className="mt-1 text-lg font-medium">
                      {selectedWord.englishMeaning}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] uppercase text-muted-foreground/80"
                  >
                    Bridge
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
