"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RiFlashlightLine } from "react-icons/ri";

export function ReviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-2xl font-bold tracking-tight">
          Review
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Spaced repetition flashcard review
        </p>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardContent className="flex flex-col items-center justify-center py-20">
          <RiFlashlightLine className="mb-4 h-10 w-10 text-muted-foreground/30" />
          <p className="font-mono text-sm text-muted-foreground">
            Add words to start reviewing. Cards will appear here when due.
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground/60">
            Keyboard: 1=Again 2=Hard 3=Good 4=Easy · Space=Flip
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
