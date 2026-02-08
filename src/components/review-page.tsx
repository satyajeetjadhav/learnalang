"use client";

import { useEffect, useCallback, useMemo } from "react";
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
  RiBarChartLine,
  RiThumbUpLine,
  RiStackLine,
} from "react-icons/ri";
import { SpeakButton } from "./speak-button";
import { AksharaBreakdown } from "./akshara-breakdown";
import { GrammarBadges } from "./grammar-badges";

const RATING_BUTTONS = [
  { rating: 0, label: "Again", hint: "Forgot", key: "1", color: "hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30", activeColor: "bg-red-500/20 text-red-400 border-red-500/30" },
  { rating: 1, label: "Hard", hint: "Struggled", key: "2", color: "hover:bg-orange-500/20 hover:text-orange-400 hover:border-orange-500/30", activeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { rating: 2, label: "Good", hint: "Got it", key: "3", color: "hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30", activeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { rating: 3, label: "Easy", hint: "Instant", key: "4", color: "hover:bg-sky-500/20 hover:text-sky-400 hover:border-sky-500/30", activeColor: "bg-sky-500/20 text-sky-400 border-sky-500/30" },
];

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

  const handleRating = useCallback(
    (rating: number) => {
      if (!currentItem || !flipped) return;
      submitReview(currentItem.word.id, rating);
    },
    [currentItem, flipped, submitReview]
  );

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
        nextCard();
      }

      // Rating keys only when flipped
      if (flipped && currentItem) {
        const ratingMap: Record<string, number> = {
          "1": 0,
          "2": 1,
          "3": 2,
          "4": 3,
        };
        if (ratingMap[e.key] !== undefined) {
          e.preventDefault();
          handleRating(ratingMap[e.key]);
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [flipped, currentItem, handleRating, setFlipped, nextCard, prevCard]);

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
    const { ratings, startTime } = sessionStats;
    const elapsedMs = startTime > 0 ? Date.now() - startTime : 0;
    const minutes = Math.floor(elapsedMs / 60000);
    const seconds = Math.floor((elapsedMs % 60000) / 1000);
    const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    const avgRating =
      ratings.length > 0
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : "—";
    const ratingLabels = ["Again", "Hard", "Good", "Easy"];
    const ratingCounts = [0, 1, 2, 3].map(
      (r) => ratings.filter((v) => v === r).length
    );
    const accuracyPct =
      ratings.length > 0
        ? Math.round(
            (ratings.filter((r) => r >= 2).length / ratings.length) * 100
          )
        : 0;

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

            {/* Mini pip summary showing rating colors */}
            <div className="mt-4 flex gap-1">
              {ratings.map((r, i) => {
                const colors = [
                  "bg-red-400",
                  "bg-orange-400",
                  "bg-emerald-400",
                  "bg-sky-400",
                ];
                return (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${colors[r]} animate-fade-up`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-border/50 bg-card/60 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="flex flex-col items-center py-6">
              <RiTimeLine className="mb-2 h-6 w-6 text-muted-foreground/60" />
              <p className="font-mono text-3xl font-bold">{timeStr}</p>
              <p className="mt-1.5 font-mono text-sm text-muted-foreground">
                Duration
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/60 animate-fade-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="flex flex-col items-center py-6">
              <RiThumbUpLine className="mb-2 h-6 w-6 text-muted-foreground/60" />
              <p className="font-mono text-3xl font-bold">{accuracyPct}%</p>
              <p className="mt-1.5 font-mono text-sm text-muted-foreground">
                Accuracy (Good+Easy)
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/60 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="flex flex-col items-center py-6">
              <RiBarChartLine className="mb-2 h-6 w-6 text-muted-foreground/60" />
              <p className="font-mono text-3xl font-bold">{avgRating}</p>
              <p className="mt-1.5 font-mono text-sm text-muted-foreground">
                Avg Rating
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rating breakdown */}
        <Card className="border-border/50 bg-card/60 animate-fade-up" style={{ animationDelay: "250ms" }}>
          <CardContent className="py-6">
            <p className="mb-4 font-mono text-sm text-muted-foreground">
              Rating Breakdown
            </p>
            <div className="flex gap-4">
              {ratingLabels.map((label, i) => {
                const count = ratingCounts[i];
                const pct =
                  ratings.length > 0
                    ? Math.round((count / ratings.length) * 100)
                    : 0;
                const colors = [
                  "bg-red-500/20 text-red-400",
                  "bg-orange-500/20 text-orange-400",
                  "bg-emerald-500/20 text-emerald-400",
                  "bg-sky-500/20 text-sky-400",
                ];
                return (
                  <div key={label} className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">
                        {label}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {count}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-muted/30">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${colors[i]?.split(" ")[0]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

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

      {/* Rating Buttons */}
      <div className="space-y-2 pt-2">
        <p className={`text-center font-mono text-xs transition-opacity duration-300 ${flipped ? "text-muted-foreground" : "text-muted-foreground/0"}`}>
          How well did you recall?
        </p>
        <div className="flex justify-center gap-3 sm:gap-4">
          {RATING_BUTTONS.map((btn) => (
            <Button
              key={btn.rating}
              variant="outline"
              disabled={!flipped}
              className={`w-24 flex-col gap-1 py-4 font-mono transition-all sm:w-28 ${btn.color} ${
                !flipped ? "opacity-30" : ""
              }`}
              onClick={() => handleRating(btn.rating)}
            >
              <span className="text-sm font-medium">{btn.label}</span>
              <span className="text-[10px] text-muted-foreground/70">{btn.hint}</span>
              <kbd className="text-[10px] text-muted-foreground/60">
                {btn.key}
              </kbd>
            </Button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-3 pt-1">
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
          onClick={goToRandom}
        >
          <RiShuffleLine className="h-3.5 w-3.5" />
          Random
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentIndex >= queue.length - 1}
          className="gap-1.5 font-mono text-xs"
          onClick={nextCard}
        >
          Next
          <RiArrowRightLine className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Keyboard hint */}
      <p className="text-center font-mono text-xs text-muted-foreground/60">
        Space = Flip · 1-4 = Rate · ← → = Navigate
      </p>
    </div>
  );
}
