"use client";

import { useState } from "react";
import {
  useOnboardingStore,
  type OnboardingStep,
} from "@/stores/onboarding-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useReaderStore } from "@/stores/reader-store";
import { useNavigationStore } from "@/stores/navigation-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  RiArrowRightLine,
  RiArrowLeftLine,
  RiCheckLine,
  RiKeyLine,
  RiLoader4Line,
  RiBookOpenLine,
  RiGlobalLine,
  RiTranslate2,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

const STEPS: { key: OnboardingStep; label: string }[] = [
  { key: "language", label: "Language" },
  { key: "anchors", label: "Your Languages" },
  { key: "apikey", label: "API Key" },
  { key: "generate", label: "First Lesson" },
];

const TARGET_LANGUAGES = [
  {
    value: "kn",
    label: "Kannada",
    script: "ಕನ್ನಡ",
    available: true,
    desc: "Dravidian language of Karnataka",
  },
  {
    value: "ml",
    label: "Malayalam",
    script: "മലയാളം",
    available: false,
    desc: "Coming soon",
  },
  {
    value: "bn",
    label: "Bangla",
    script: "বাংলা",
    available: false,
    desc: "Coming soon",
  },
];

const ANCHOR_LANGUAGES = [
  { value: "marathi", label: "Marathi", script: "मराठी" },
  { value: "hindi", label: "Hindi", script: "हिन्दी" },
  { value: "english", label: "English", script: "Eng" },
];

export function Onboarding() {
  const {
    currentStep,
    targetLang,
    anchorLangs,
    setStep,
    setTargetLang,
    toggleAnchorLang,
    completeOnboarding,
  } = useOnboardingStore();

  const { openaiApiKey, setOpenaiApiKey } = useSettingsStore();
  const [apiDraft, setApiDraft] = useState(openaiApiKey);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateStory = useReaderStore((s) => s.generateStory);
  const setSelectedLang = useReaderStore((s) => s.setSelectedLang);
  const setDifficulty = useReaderStore((s) => s.setDifficulty);
  const setTopic = useReaderStore((s) => s.setTopic);
  const setPage = useNavigationStore((s) => s.setPage);

  const stepIndex = STEPS.findIndex((s) => s.key === currentStep);

  const canContinue = () => {
    switch (currentStep) {
      case "language":
        return targetLang !== "";
      case "anchors":
        return anchorLangs.length > 0;
      case "apikey":
        return true; // optional
      case "generate":
        return true;
      default:
        return false;
    }
  };

  const goNext = () => {
    const idx = STEPS.findIndex((s) => s.key === currentStep);
    if (idx < STEPS.length - 1) {
      setStep(STEPS[idx + 1].key);
    }
  };

  const goBack = () => {
    const idx = STEPS.findIndex((s) => s.key === currentStep);
    if (idx > 0) {
      setStep(STEPS[idx - 1].key);
    }
  };

  const handleSaveKey = () => {
    setOpenaiApiKey(apiDraft.trim());
    goNext();
  };

  const handleSkipKey = () => {
    goNext();
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setSelectedLang(targetLang);
    setDifficulty("beginner");
    setTopic("basic greetings and introductions");
    await generateStory();
    setGenerating(false);
    setGenerated(true);
  };

  const handleFinish = () => {
    completeOnboarding();
    setPage("reader");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 font-mono text-lg font-black text-white shadow-lg shadow-amber-500/20">
            P
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            polyglot-flow
          </h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            delta-learning engine
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          {STEPS.map((step, i) => (
            <div key={step.key} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs transition-colors",
                  i < stepIndex
                    ? "bg-primary text-primary-foreground"
                    : i === stepIndex
                    ? "border-2 border-primary text-primary"
                    : "border border-border/50 text-muted-foreground/50"
                )}
              >
                {i < stepIndex ? (
                  <RiCheckLine className="h-3.5 w-3.5" />
                ) : (
                  i + 1
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-px w-8 transition-colors",
                    i < stepIndex ? "bg-primary" : "bg-border/50"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardContent className="p-6">
            {/* Step 1: Language Selection */}
            {currentStep === "language" && (
              <div className="space-y-6">
                <div className="text-center">
                  <RiGlobalLine className="mx-auto h-8 w-8 text-primary" />
                  <h2 className="mt-3 text-lg font-semibold">
                    What language do you want to learn?
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select a target language to get started
                  </p>
                </div>
                <div className="space-y-3">
                  {TARGET_LANGUAGES.map((lang) => (
                    <button
                      key={lang.value}
                      disabled={!lang.available}
                      onClick={() => setTargetLang(lang.value)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all",
                        lang.available
                          ? targetLang === lang.value
                            ? "border-primary bg-primary/5"
                            : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
                          : "cursor-not-allowed border-border/30 opacity-50"
                      )}
                    >
                      <span className="text-3xl font-bold">{lang.script}</span>
                      <div className="flex-1">
                        <p className="font-medium">{lang.label}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {lang.desc}
                        </p>
                      </div>
                      {targetLang === lang.value && (
                        <RiCheckLine className="h-5 w-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={goNext}
                    disabled={!canContinue()}
                    className="gap-2 font-mono text-xs"
                  >
                    Continue
                    <RiArrowRightLine className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Anchor Languages */}
            {currentStep === "anchors" && (
              <div className="space-y-6">
                <div className="text-center">
                  <RiTranslate2 className="mx-auto h-8 w-8 text-primary" />
                  <h2 className="mt-3 text-lg font-semibold">
                    Which languages do you already know?
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We use these as anchor languages to help you learn through
                    cognates and familiar patterns
                  </p>
                </div>
                <div className="space-y-3">
                  {ANCHOR_LANGUAGES.map((lang) => {
                    const selected = anchorLangs.includes(lang.value);
                    return (
                      <button
                        key={lang.value}
                        onClick={() => toggleAnchorLang(lang.value)}
                        className={cn(
                          "flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all",
                          selected
                            ? "border-primary bg-primary/5"
                            : "border-border/50 hover:border-primary/30 hover:bg-muted/30"
                        )}
                      >
                        <span className="text-2xl font-bold">{lang.script}</span>
                        <div className="flex-1">
                          <p className="font-medium">{lang.label}</p>
                        </div>
                        {selected && (
                          <RiCheckLine className="h-5 w-5 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={goBack}
                    className="gap-2 font-mono text-xs"
                  >
                    <RiArrowLeftLine className="h-3.5 w-3.5" />
                    Back
                  </Button>
                  <Button
                    onClick={goNext}
                    disabled={!canContinue()}
                    className="gap-2 font-mono text-xs"
                  >
                    Continue
                    <RiArrowRightLine className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: API Key */}
            {currentStep === "apikey" && (
              <div className="space-y-6">
                <div className="text-center">
                  <RiKeyLine className="mx-auto h-8 w-8 text-primary" />
                  <h2 className="mt-3 text-lg font-semibold">
                    Connect your OpenAI key
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Required for the AI reader to generate passages. Your key is
                    stored locally and sent directly to OpenAI.
                  </p>
                </div>
                <div className="space-y-3">
                  <Input
                    type="password"
                    placeholder="sk-..."
                    value={apiDraft}
                    onChange={(e) => setApiDraft(e.target.value)}
                    className="font-mono text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && apiDraft.trim())
                        handleSaveKey();
                    }}
                  />
                  <p className="font-mono text-xs text-muted-foreground">
                    Get one at{" "}
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2"
                    >
                      platform.openai.com
                    </a>
                  </p>
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={goBack}
                    className="gap-2 font-mono text-xs"
                  >
                    <RiArrowLeftLine className="h-3.5 w-3.5" />
                    Back
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleSkipKey}
                      className="font-mono text-xs"
                    >
                      Skip for now
                    </Button>
                    {apiDraft.trim() && (
                      <Button
                        onClick={handleSaveKey}
                        className="gap-2 font-mono text-xs"
                      >
                        Save & Continue
                        <RiArrowRightLine className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Generate first exercise */}
            {currentStep === "generate" && (
              <div className="space-y-6">
                <div className="text-center">
                  <RiBookOpenLine className="mx-auto h-8 w-8 text-primary" />
                  <h2 className="mt-3 text-lg font-semibold">
                    Generate your first reading exercise
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {openaiApiKey
                      ? "We'll create a beginner passage with basic greetings and introductions."
                      : "You can add an API key later from Settings to unlock the AI reader."}
                  </p>
                </div>

                {generated ? (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                    <RiCheckLine className="mx-auto h-6 w-6 text-emerald-400" />
                    <p className="mt-2 font-mono text-sm text-emerald-300">
                      Your first lesson is ready!
                    </p>
                  </div>
                ) : openaiApiKey ? (
                  <Button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="w-full gap-2 font-mono text-xs"
                  >
                    {generating ? (
                      <>
                        <RiLoader4Line className="h-4 w-4 animate-spin" />
                        Generating your first passage...
                      </>
                    ) : (
                      <>
                        <RiBookOpenLine className="h-4 w-4" />
                        Generate First Lesson
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="rounded-lg border border-border/50 bg-muted/20 p-4 text-center">
                    <p className="font-mono text-xs text-muted-foreground">
                      No API key configured. You can still browse the word list
                      and review flashcards.
                    </p>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={goBack}
                    className="gap-2 font-mono text-xs"
                  >
                    <RiArrowLeftLine className="h-3.5 w-3.5" />
                    Back
                  </Button>
                  <Button
                    onClick={handleFinish}
                    className="gap-2 font-mono text-xs"
                  >
                    {generated ? "Go to Reader" : "Get Started"}
                    <RiArrowRightLine className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Step label */}
        <p className="text-center font-mono text-[10px] text-muted-foreground/50">
          Step {stepIndex + 1} of {STEPS.length} &middot;{" "}
          {STEPS[stepIndex]?.label}
        </p>
      </div>
    </div>
  );
}
