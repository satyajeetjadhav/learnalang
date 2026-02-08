"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RiVolumeUpLine } from "react-icons/ri";
import { speak, speakPassage, stopSpeaking, isSpeaking } from "@/lib/speak";
import { cn } from "@/lib/utils";

interface SpeakButtonProps {
  text: string;
  lang: string;
  size?: "sm" | "md";
  /** Use passage mode for longer text — reads sentence-by-sentence with pauses */
  passage?: boolean;
  className?: string;
}

export function SpeakButton({ text, lang, size = "sm", passage = false, className }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (speaking) {
        stopSpeaking();
        setSpeaking(false);
        return;
      }
      setSpeaking(true);
      if (passage) {
        speakPassage(text, lang);
      } else {
        speak(text, lang);
      }
    },
    [text, lang, speaking, passage]
  );

  // Listen for speech end (checks both speechSynthesis.speaking and passage queue)
  useEffect(() => {
    if (!speaking) return;

    const check = setInterval(() => {
      if (typeof window !== "undefined" && !isSpeaking()) {
        setSpeaking(false);
      }
    }, 200);

    return () => clearInterval(check);
  }, [speaking]);

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const btnSize = size === "sm" ? "h-6 w-6" : "h-8 w-8";

  return (
    <Button
      variant="ghost"
      className={cn(
        btnSize,
        "shrink-0 rounded-full p-0 text-muted-foreground/60 hover:text-primary",
        speaking && "animate-pulse text-primary",
        className
      )}
      onClick={handleClick}
      aria-label={`Speak ${text}`}
    >
      <RiVolumeUpLine className={iconSize} />
    </Button>
  );
}
