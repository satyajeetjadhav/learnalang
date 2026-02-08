"use client";

import { useEffect, useCallback } from "react";
import { useReviewStore } from "@/stores/review-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  RiFlashlightLine,
  RiRefreshLine,
  RiCheckLine,
  RiArrowLeftRightLine,
  RiArrowLeftLine,
  RiArrowRightLine,
  RiShuffleLine,
  RiTimeLine,
  RiStackLine,
} from "react-icons/ri";
import { SpeakButton } from "./speak-button";
import { AksharaBreakdown } from "./akshara-breakdown";
import { GrammarBadges } from "./grammar-badges";

// Default rating for SM-2: "Good" (2) — maps to quality 4
const DEFAULT_RATING = 2;

const LANG_COLORS: Record<string, string> = {
  kn: "text-kannada",
  ml: "text-malayalam",
  bn: "text-bangla",
};

const LANG_LABELS: Record<string, string> = {
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  bn: "বাংলা",
};

export function ReviewPage() {
  const {
    queue,
    currentIndex,
    flipped,
    loading,
    fetchQueue,
    setFlipped,
    submitReview,
    nextCard,
    prevCard,
    goToRandom,
    sessionStats,
  } = useReviewStore();

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  const currentItem = queue[currentIndex];
  const isComplete = currentIndex >= queue.length;
  const progress = queue.length > 0
    ? Math.round((currentIndex / queue.length) * 100)
    : 0;

  const markDone = useCallback(() => {
    if (!currentItem || !flipped) return;
    submitReview(currentItem.word.id, DEFAULT_RATING);
  }, [currentItem, flipped, submitReview]);

  // Keyboard shortcuts for review
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (currentItem) {
          setFlipped(!flipped);
        }
      }

      // Arrow key navigation
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevCard();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (flipped && currentItem) {
          markDone();
        } else {
          nextCard();
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flipped, currentItem, markDone, setFlipped, nextCard, prevCard]);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Spaced Repetition
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Review</h1>
        </div>
        <div className="flex justify-center pt-8">
          <Card className="w-full max-w-lg border-border/50 bg-card/60">
            <CardContent className="flex min-h-[320px] flex-col items-center justify-center p-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-primary" />
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                Loading review queue...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && queue.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Spaced Repetition
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Review</h1>
        </div>
        <Card className="border-border/50 bg-card/60">
          <CardContent className="flex flex-col items-center justify-center py-24">
            <RiFlashlightLine className="mb-4 h-12 w-12 text-muted-foreground/60" />
            <p className="font-mono text-sm text-muted-foreground">
              No cards due for review right now.
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              Add words to start building your review queue.
            </p>
            <Button
              variant="outline"
              className="mt-6 gap-2 font-mono text-xs"
              onClick={fetchQueue}
            >
              <RiRefreshLine className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Complete state with session stats
  if (isComplete && queue.length > 0) {
    const { startTime } = sessionStats;
    const elapsedMs = startTime > 0 ? Date.now() - startTime : 0;
    const minutes = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);
    const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    return (
      <div className="space-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Spaced Repetition
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Review</h1>
        </div>

        {/* Success header */}
        <Card className="border-border/50 bg-card/60 animate-fade-up">
          <CardContent className="flex flex-col items-center py-10">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <RiCheckLine className="h-8 w-8 text-emerald-400" />
            </div>
            <p className="text-xl font-bold">Session Complete</p>
            <p className="mt-2 font-mono text-base text-muted-foreground">
              You reviewed {queue.length} card{queue.length !== 1 ? "s" : ""}
            </p>

            {/* Mini pip summary */}
            <div className="mt-4 flex gap-1">
              {Array.from({ length: queue.length }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-full bg-emerald-400 animate-fade-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="flex justify-center">
          <Card className="border-border/50 bg-card/60 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="flex items-center gap-3 px-6 py-4">
              <RiTimeLine className="h-5 w-5 text-muted-foreground/60" />
              <div>
                <p className="font-mono text-2xl font-bold">{timeStr}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  for {queue.length} card{queue.length !== 1 ? "s" : ""}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="gap-2 font-mono text-xs"
            onClick={fetchQueue}
          >
            <RiRefreshLine className="h-3.5 w-3.5" />
            Check for more
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Spaced Repetition
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Review</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <RiStackLine className="h-4 w-4 text-muted-foreground/70" />
            <span className="font-mono text-sm text-muted-foreground">
              {currentIndex + 1} / {queue.length}
            </span>
          </div>
          <Badge variant="secondary" className="font-mono text-xs">
            {queue.length - currentIndex} remaining
          </Badge>
        </div>
      </div>

      {/* Progress bar + card pips */}
      <div className="space-y-2">
        <Progress value={progress} className="h-1" />
        <div className="flex flex-wrap justify-center gap-1">
          {queue.map((_, i) => {
            const isReviewed = i < currentIndex;
            const isCurrent = i === currentIndex;
            const rating = isReviewed ? sessionStats.ratings[i] : undefined;
            const ratingColors = [
              "bg-red-400",
              "bg-orange-400",
              "bg-emerald-400",
              "bg-sky-400",
            ];
            const dotColor = isReviewed && rating !== undefined
              ? ratingColors[rating]
              : isCurrent
              ? "bg-primary"
              : "bg-muted-foreground/30";

            return (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${dotColor} ${
                  isCurrent ? "h-2.5 w-2.5 shadow-sm shadow-primary/30" : "h-1.5 w-1.5"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Flashcard */}
      {currentItem && (
        <div className="flex justify-center pt-4">
          <div
            key={currentIndex}
            className="flip-card w-full max-w-lg cursor-pointer animate-card-enter"
            onClick={() => setFlipped(!flipped)}
          >
            <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
              {/* Front */}
              <Card className="flip-card-front border-border/50 bg-card/60">
                <CardContent className="flex min-h-[400px] flex-col items-center justify-center p-10">
                  <div className="mb-6 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`font-mono text-xs uppercase ${
                        LANG_COLORS[currentItem.word.targetLang] ?? ""
                      }`}
                    >
                      {LANG_LABELS[currentItem.word.targetLang] ?? currentItem.word.targetLang}
                    </Badge>
                    {currentItem.word.category && (
                      <Badge
                        variant="outline"
                        className="font-mono text-xs text-muted-foreground/80"
                      >
                        {currentItem.word.category}
                      </Badge>
                    )}
                  </div>

                  <p
                    className={`text-6xl font-bold script-glow ${LANG_COLORS[currentItem.word.targetLang] ?? ""}`}
                  >
                    {currentItem.word.targetWord}
                  </p>

                  <SpeakButton
                    text={currentItem.word.targetWord}
                    lang={currentItem.word.targetLang}
                    size="md"
                    className="mt-4"
                  />

                  {currentItem.word.phoneticScript && (
                    <p className="mt-3 font-mono text-xl text-muted-foreground">
                      /{currentItem.word.phoneticScript}/
                    </p>
                  )}

                  <p className="mt-8 font-mono text-sm text-muted-foreground/70 kbd-hint">
                    Press Space or tap to reveal
                  </p>
                </CardContent>
              </Card>

              {/* Back */}
              <Card className="flip-card-back absolute inset-0 border-border/50 bg-card/60">
                <CardContent className="flex min-h-[400px] flex-col items-center justify-center p-10">
                  <p className="text-4xl font-bold">
                    {currentItem.word.englishMeaning}
                  </p>

                  {/* Grammar */}
                  {currentItem.word.grammar && (
                    <div className="mt-3">
                      <GrammarBadges grammar={currentItem.word.grammar} compact />
                    </div>
                  )}

                  {/* Trilateral anchors */}
                  <div className="mt-6 flex gap-8">
                    {currentItem.word.marathiAnchor && (
                      <div className="text-center">
                        <p className="font-mono text-sm text-muted-foreground">
                          मराठी
                        </p>
                        <p className="mt-1 text-xl font-medium text-primary">
                          {currentItem.word.marathiAnchor}
                        </p>
                      </div>
                    )}
                    {(currentItem.word.marathiAnchor && currentItem.word.hindiAnchor) && (
                      <RiArrowLeftRightLine className="mt-4 h-5 w-5 text-muted-foreground/50" />
                    )}
                    {currentItem.word.hindiAnchor && (
                      <div className="text-center">
                        <p className="font-mono text-sm text-muted-foreground">
                          हिन्दी
                        </p>
                        <p className="mt-1 text-xl font-medium text-primary">
                          {currentItem.word.hindiAnchor}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Target recall */}
                  <div className="mt-6 flex items-center gap-3 rounded-md border border-border/50 bg-muted/30 px-6 py-3.5">
                    <p
                      className={`text-3xl font-bold ${LANG_COLORS[currentItem.word.targetLang] ?? ""}`}
                    >
                      {currentItem.word.targetWord}
                    </p>
                    <SpeakButton
                      text={currentItem.word.targetWord}
                      lang={currentItem.word.targetLang}
                    />
                  </div>

                  {/* Akshara Breakdown */}
                  <div className="mt-4">
                    <AksharaBreakdown
                      word={currentItem.word.targetWord}
                      lang={currentItem.word.targetLang}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-3 pt-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentIndex === 0}
          className="gap-1.5 font-mono text-xs"
          onClick={prevCard}
        >
          <RiArrowLeftLine className="h-3.5 w-3.5" />
          Prev
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={queue.length <= 1}
          className="gap-1.5 font-mono text-xs"
          onClick={() => {
            if (flipped && currentItem) markDone();
            else goToRandom();
          }}
        >
          <RiShuffleLine className="h-3.5 w-3.5" />
          Random
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 font-mono text-xs"
          onClick={() => {
            if (flipped && currentItem) markDone();
            else nextCard();
          }}
        >
          Next
          <RiArrowRightLine className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Keyboard hint */}
      <p className="text-center font-mono text-xs text-muted-foreground/60">
        Space = Flip · → = Next
      </p>
    </div>
  );
}
