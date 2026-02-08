"use client";

import { useEffect, useMemo } from "react";
import { useWordsStore } from "@/stores/words-store";
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
import { RiSearchLine, RiAddLine } from "react-icons/ri";

const LANG_OPTIONS = [
  { value: "kn", label: "Kannada" },
  { value: "ml", label: "Malayalam" },
  { value: "bn", label: "Bangla" },
];

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

  useEffect(() => {
    fetchWords();
  }, [fetchWords]);

  const filteredWords = useMemo(() => {
    if (!searchQuery) return words;
    const q = searchQuery.toLowerCase();
    return words.filter(
      (w) =>
        w.targetWord.toLowerCase().includes(q) ||
        w.englishMeaning.toLowerCase().includes(q) ||
        w.marathiAnchor?.toLowerCase().includes(q) ||
        w.hindiAnchor?.toLowerCase().includes(q)
    );
  }, [words, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-bold tracking-tight">
            Words
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Trilateral word mappings across all languages
          </p>
        </div>
        <Button size="sm" className="gap-2 font-mono text-xs">
          <RiAddLine className="h-4 w-4" />
          Add Word
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search words..."
            className="pl-9 font-mono text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={selectedLang ?? "all"}
          onValueChange={(v) => setSelectedLang(v === "all" ? null : v)}
        >
          <SelectTrigger className="w-40 font-mono text-sm">
            <SelectValue placeholder="All languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {LANG_OPTIONS.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-border/50 bg-card/50">
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
              <p className="font-mono text-sm text-muted-foreground">
                {loading
                  ? "Loading words..."
                  : "No words yet. Add your first word to get started."}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="font-mono text-xs">Target</TableHead>
                  <TableHead className="font-mono text-xs">
                    Phonetic
                  </TableHead>
                  <TableHead className="font-mono text-xs">Marathi</TableHead>
                  <TableHead className="font-mono text-xs">Hindi</TableHead>
                  <TableHead className="font-mono text-xs">English</TableHead>
                  <TableHead className="font-mono text-xs">Lang</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWords.map((word) => (
                  <TableRow
                    key={word.id}
                    className="border-border/30 cursor-pointer transition-colors hover:bg-muted/50"
                  >
                    <TableCell className="font-semibold">
                      {word.targetWord}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {word.phoneticScript ?? "—"}
                    </TableCell>
                    <TableCell>{word.marathiAnchor ?? "—"}</TableCell>
                    <TableCell>{word.hindiAnchor ?? "—"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {word.englishMeaning}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="font-mono text-[10px] uppercase"
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
    </div>
  );
}
