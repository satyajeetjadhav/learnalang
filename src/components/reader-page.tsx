"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RiArticleLine } from "react-icons/ri";

export function ReaderPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-2xl font-bold tracking-tight">
          Reader
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contextual reading with known-word highlighting
        </p>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardContent className="flex flex-col items-center justify-center py-20">
          <RiArticleLine className="mb-4 h-10 w-10 text-muted-foreground/30" />
          <p className="font-mono text-sm text-muted-foreground">
            The contextual reader will generate stories using 90% known + 10%
            new words.
          </p>
          <p className="mt-2 font-mono text-xs text-muted-foreground/60">
            Coming soon — requires OpenAI GPT-4o integration
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
