"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RiSearchLine } from "react-icons/ri";
import { SpeakButton } from "./speak-button";
import {
  PRONOUNS,
  TENSE_EXAMPLES,
  KANNADA_PLURALS,
  MALAYALAM_PLURALS,
  BANGLA_PLURALS,
  KANNADA_CASES,
  MALAYALAM_CASES,
  BANGLA_CASES,
  KANNADA_VERB_CONJUGATION,
  MALAYALAM_VERB_CONJUGATION,
  BANGLA_VERB_CONJUGATION,
  GRAMMAR_NOTES,
  type PluralRule,
  type CaseRow,
  type VerbConjugation,
} from "@/data/grammar";

// ─── Malayalam Sandhi Decompiler ────────────────────────────
const SANDHI_EXAMPLES = [
  {
    compound: "കേരളത്തിലെ",
    parts: ["കേരളം", "-ത്തിൽ", "-എ"],
    meaning: ["Kerala", "in (locative)", "of"],
    english: "of/in Kerala",
    rule: "Locative + genitive sandhi",
  },
  {
    compound: "വീട്ടിലേക്ക്",
    parts: ["വീട്", "-ഇൽ", "-ഏക്ക്"],
    meaning: ["house", "in", "towards"],
    english: "towards the house",
    rule: "Locative + directional",
  },
  {
    compound: "പുസ്തകങ്ങൾ",
    parts: ["പുസ്തകം", "-ങ്ങൾ"],
    meaning: ["book", "plural"],
    english: "books",
    rule: "Plural suffix -ങ്ങൾ after nasal",
  },
  {
    compound: "അവരുടെ",
    parts: ["അവർ", "-ഉടെ"],
    meaning: ["they", "possessive"],
    english: "their",
    rule: "Genitive case marker",
  },
  {
    compound: "കടയിൽനിന്ന്",
    parts: ["കട", "-യിൽ", "-നിന്ന്"],
    meaning: ["shop", "in", "from"],
    english: "from the shop",
    rule: "Ablative (from-locative)",
  },
  {
    compound: "എഴുതുന്നു",
    parts: ["എഴുത്", "-ഉന്നു"],
    meaning: ["write (root)", "present tense"],
    english: "is writing",
    rule: "Present tense conjugation",
  },
  {
    compound: "പോകേണ്ടതാണ്",
    parts: ["പോക്", "-ഏണ്ട", "-ത്", "-ആണ്"],
    meaning: ["go (root)", "must", "nominalizer", "is"],
    english: "must go",
    rule: "Obligative mood construction",
  },
  {
    compound: "നല്ലതാണ്",
    parts: ["നല്ല", "-ത്", "-ആണ്"],
    meaning: ["good", "nominalizer", "is"],
    english: "it is good",
    rule: "Adjective nominalization",
  },
];

// ─── Bangla Vowel Shift ────────────────────────────────────
const VOWEL_SHIFTS = [
  { hindi: "अमर", bangla: "অমর", hindiPronounce: "Amar", banglaPronounce: "Omor", english: "Immortal", rule: "অ = O (not A)" },
  { hindi: "कमल", bangla: "কমল", hindiPronounce: "Kamal", banglaPronounce: "Komol", english: "Lotus", rule: "ক = Ko (inherent O)" },
  { hindi: "नमस्कार", bangla: "নমস্কার", hindiPronounce: "Namaskār", banglaPronounce: "Nomoshkar", english: "Greetings", rule: "ন = No, স = Sh" },
  { hindi: "बंगाल", bangla: "বাংলা", hindiPronounce: "Bangāl", banglaPronounce: "Bāṅlā", english: "Bengal", rule: "Vowel shift + nasal" },
  { hindi: "समय", bangla: "সময়", hindiPronounce: "Samay", banglaPronounce: "Shomoy", english: "Time", rule: "স = Sh, inherent O" },
  { hindi: "जल", bangla: "জল", hindiPronounce: "Jal", banglaPronounce: "Jol", english: "Water", rule: "জ = Jo, ল = Lo" },
  { hindi: "वन", bangla: "বন", hindiPronounce: "Van", banglaPronounce: "Bon", english: "Forest", rule: "ব = Bo (not Va)" },
  { hindi: "रवि", bangla: "রবি", hindiPronounce: "Ravi", banglaPronounce: "Robi", english: "Sun", rule: "র = Ro, ব = Bi" },
];

const BANGLA_RULES = [
  { rule: "Inherent vowel is O", desc: "Unlike Hindi/Marathi where अ = A, Bangla অ = O. Every consonant has an inherent 'O' sound." },
  { rule: "ব = B (never V)", desc: "Bangla has no V sound. Hindi व (va) becomes ব (bo) in Bangla." },
  { rule: "স/শ/ষ = Sh", desc: "All three sibilants tend to merge into 'Sh' in Bangla pronunciation." },
  { rule: "জ = J (with O)", desc: "Hindi ज (ja) becomes জ (jo) — same letter shape, different inherent vowel." },
];

const LANG_COLORS: Record<string, string> = {
  kn: "text-kannada",
  ml: "text-malayalam",
  bn: "text-bangla",
};

// ─── Sub-Components ─────────────────────────────────────────

function PronounTable({ focusLang }: { focusLang: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/30">
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Person</th>
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-primary">मराठी</th>
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-primary">हिन्दी</th>
            <th className={`px-3 py-2 text-left font-mono text-[10px] uppercase ${LANG_COLORS[focusLang]}`}>
              {focusLang === "kn" ? "ಕನ್ನಡ" : focusLang === "ml" ? "മലയാളം" : "বাংলা"}
            </th>
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Phonetic</th>
          </tr>
        </thead>
        <tbody>
          {PRONOUNS.map((row, i) => {
            const target = focusLang === "kn" ? row.kn : focusLang === "ml" ? row.ml : row.bn;
            const phonetic = focusLang === "kn" ? row.knPhonetic : focusLang === "ml" ? row.mlPhonetic : row.bnPhonetic;
            return (
              <tr
                key={row.person}
                className="border-b border-border/20 animate-fade-up"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{row.person}</td>
                <td className="px-3 py-2 text-sm">{row.marathi}</td>
                <td className="px-3 py-2 text-sm">{row.hindi}</td>
                <td className={`px-3 py-2 text-sm font-semibold ${LANG_COLORS[focusLang]}`}>
                  <span className="inline-flex items-center gap-1">
                    {target}
                    <SpeakButton text={target} lang={focusLang} />
                  </span>
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">/{phonetic}/</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TenseTable({ focusLang }: { focusLang: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/30">
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Tense</th>
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-primary">मराठी</th>
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-primary">हिन्दी</th>
            <th className={`px-3 py-2 text-left font-mono text-[10px] uppercase ${LANG_COLORS[focusLang]}`}>
              {focusLang === "kn" ? "ಕನ್ನಡ" : focusLang === "ml" ? "മലയാളം" : "বাংলা"}
            </th>
          </tr>
        </thead>
        <tbody>
          {TENSE_EXAMPLES.map((row, i) => {
            const target = focusLang === "kn" ? row.kn : focusLang === "ml" ? row.ml : row.bn;
            const phonetic = focusLang === "kn" ? row.knPhonetic : focusLang === "ml" ? row.mlPhonetic : row.bnPhonetic;
            return (
              <tr
                key={row.tense}
                className="border-b border-border/20 animate-fade-up"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{row.tense}</td>
                <td className="px-3 py-2 text-sm">{row.marathi}</td>
                <td className="px-3 py-2 text-sm">{row.hindi}</td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-1">
                    <span className={`text-sm font-semibold ${LANG_COLORS[focusLang]}`}>{target}</span>
                    <SpeakButton text={target} lang={focusLang} />
                  </span>
                  <span className="ml-1 font-mono text-[10px] text-muted-foreground">/{phonetic}/</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PluralTable({ rules, langColor }: { rules: PluralRule[]; langColor: string }) {
  return (
    <div className="space-y-2">
      {rules.map((r, i) => (
        <div
          key={r.singular}
          className="flex flex-wrap items-center gap-2 rounded-lg border border-border/30 bg-muted/10 px-3 py-2.5 animate-fade-up"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <span className={`text-base font-semibold ${langColor}`}>{r.singular}</span>
          <span className="font-mono text-xs text-muted-foreground/60">→</span>
          <span className={`text-base font-bold ${langColor}`}>{r.plural}</span>
          <Badge variant="outline" className="ml-auto font-mono text-[8px] text-muted-foreground/80">{r.rule}</Badge>
          <span className="basis-full text-xs text-muted-foreground">{r.english} · /{r.singularPhonetic}/ → /{r.pluralPhonetic}/</span>
        </div>
      ))}
    </div>
  );
}

function CaseTable({ cases, langColor }: { cases: CaseRow[]; langColor: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/30">
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Case</th>
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Marker</th>
            <th className={`px-3 py-2 text-left font-mono text-[10px] uppercase ${langColor}`}>Example</th>
            <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Meaning</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr
              key={c.caseName}
              className="border-b border-border/20 animate-fade-up"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <td className="px-3 py-2 font-mono text-xs font-medium text-muted-foreground">{c.caseName}</td>
              <td className={`px-3 py-2 font-semibold ${langColor}`}>{c.marker}</td>
              <td className="px-3 py-2">
                <span className={`text-sm ${langColor}`}>{c.example}</span>
                <span className="ml-2 font-mono text-[10px] text-muted-foreground">/{c.examplePhonetic}/</span>
              </td>
              <td className="px-3 py-2 text-xs text-muted-foreground">{c.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConjugationTable({ conjugations, langColor, verb }: { conjugations: VerbConjugation[]; langColor: string; verb: string }) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-xs text-muted-foreground">
        Verb: <span className={`font-semibold ${langColor}`}>{verb}</span> (to do/make)
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/30">
              <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Person</th>
              <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Present</th>
              <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Past</th>
              <th className="px-3 py-2 text-left font-mono text-[10px] uppercase text-muted-foreground">Future</th>
            </tr>
          </thead>
          <tbody>
            {conjugations.map((c, i) => (
              <tr
                key={c.person}
                className="border-b border-border/20 animate-fade-up"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <td className={`px-3 py-2 text-xs font-medium ${langColor}`}>{c.person}</td>
                <td className={`px-3 py-2 ${langColor}`}>{c.present}</td>
                <td className={`px-3 py-2 ${langColor}`}>{c.past}</td>
                <td className={`px-3 py-2 ${langColor}`}>{c.future}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────

export function LanguageModules() {
  const [focusLang, setFocusLang] = useState("kn");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSandhi = searchQuery
    ? SANDHI_EXAMPLES.filter(
        (s) =>
          s.compound.includes(searchQuery) ||
          s.english.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SANDHI_EXAMPLES;

  const filteredShifts = searchQuery
    ? VOWEL_SHIFTS.filter(
        (s) =>
          s.hindi.includes(searchQuery) ||
          s.bangla.includes(searchQuery) ||
          s.english.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : VOWEL_SHIFTS;

  const langNotes = GRAMMAR_NOTES.filter((n) => n.lang === focusLang);

  const pluralData = focusLang === "kn" ? KANNADA_PLURALS : focusLang === "ml" ? MALAYALAM_PLURALS : BANGLA_PLURALS;
  const caseData = focusLang === "kn" ? KANNADA_CASES : focusLang === "ml" ? MALAYALAM_CASES : BANGLA_CASES;
  const conjugationData = focusLang === "kn" ? KANNADA_VERB_CONJUGATION : focusLang === "ml" ? MALAYALAM_VERB_CONJUGATION : BANGLA_VERB_CONJUGATION;
  const verbLabel = focusLang === "kn" ? "ಮಾಡು" : focusLang === "ml" ? "ചെയ്യുക" : "করা";

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Specialized Modules
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Language Tools
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Grammar, morphology, and cross-linguistic comparison
        </p>
      </div>

      {/* Language Focus Selector */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-muted-foreground">Focus:</span>
        {[
          { code: "kn", label: "Kannada", script: "ಕ" },
          { code: "ml", label: "Malayalam", script: "മ" },
          { code: "bn", label: "Bangla", script: "ব" },
        ].map((l) => (
          <Button
            key={l.code}
            variant={focusLang === l.code ? "secondary" : "ghost"}
            size="sm"
            className={`h-8 gap-1.5 font-mono text-xs ${
              focusLang === l.code ? LANG_COLORS[l.code] : "text-muted-foreground"
            }`}
            onClick={() => setFocusLang(l.code)}
          >
            <span className={LANG_COLORS[l.code]}>{l.script}</span>
            {l.label}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search examples..."
          className="pl-9 font-mono text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="grammar">
        <TabsList className="w-full flex-wrap">
          <TabsTrigger value="grammar" className="flex-1 font-mono text-xs">
            Grammar
          </TabsTrigger>
          <TabsTrigger value="sandhi" className="flex-1 font-mono text-xs">
            <span className="text-malayalam mr-1">മ</span>
            Sandhi
          </TabsTrigger>
          <TabsTrigger value="vowel-shift" className="flex-1 font-mono text-xs">
            <span className="text-bangla mr-1">ব</span>
            Vowel Shift
          </TabsTrigger>
        </TabsList>

        {/* ─── Grammar Tab ──────────────────────────────── */}
        <TabsContent value="grammar" className="mt-4 space-y-6">
          {/* Grammar Notes */}
          {langNotes.length > 0 && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {langNotes.map((note) => (
                <div
                  key={note.title}
                  className="rounded-lg border border-border/50 bg-muted/10 p-3"
                >
                  <p className={`font-mono text-xs font-medium ${LANG_COLORS[focusLang]}`}>
                    {note.title}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {note.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Pronouns */}
          <Card className="border-border/50 bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="font-mono text-xs text-muted-foreground">
                Pronouns — Cross-linguistic Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <PronounTable focusLang={focusLang} />
            </CardContent>
          </Card>

          {/* Tenses */}
          <Card className="border-border/50 bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="font-mono text-xs text-muted-foreground">
                Verb Tenses — &quot;to do / make&quot;
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TenseTable focusLang={focusLang} />
            </CardContent>
          </Card>

          {/* Verb Conjugation */}
          <Card className="border-border/50 bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="font-mono text-xs text-muted-foreground">
                Full Verb Conjugation Table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ConjugationTable
                conjugations={conjugationData}
                langColor={LANG_COLORS[focusLang]}
                verb={verbLabel}
              />
            </CardContent>
          </Card>

          {/* Plurals */}
          <Card className="border-border/50 bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="font-mono text-xs text-muted-foreground">
                Plural Formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PluralTable rules={pluralData} langColor={LANG_COLORS[focusLang]} />
            </CardContent>
          </Card>

          {/* Case Markers */}
          <Card className="border-border/50 bg-card/60">
            <CardHeader className="pb-2">
              <CardTitle className="font-mono text-xs text-muted-foreground">
                Case Markers (Vibhakti)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CaseTable cases={caseData} langColor={LANG_COLORS[focusLang]} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Malayalam Sandhi Tab ──────────────────────── */}
        <TabsContent value="sandhi" className="mt-4 space-y-3">
          <p className="font-mono text-xs text-muted-foreground">
            Malayalam agglutinates words heavily. This decompiler breaks compound
            words into their root + suffix components.
          </p>
          {filteredSandhi.map((item, i) => (
            <Card
              key={item.compound}
              className="border-border/50 bg-card/60 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xl font-bold text-malayalam">
                        {item.compound}
                      </p>
                      <SpeakButton text={item.compound} lang="ml" />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.english}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[9px] text-muted-foreground/80"
                  >
                    {item.rule}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {item.parts.map((part, j) => (
                    <div key={j} className="flex items-center gap-1.5">
                      {j > 0 && (
                        <span className="font-mono text-[10px] text-muted-foreground/60">
                          +
                        </span>
                      )}
                      <div className="rounded-md border border-border/50 bg-muted/20 px-2.5 py-1.5">
                        <span className="text-sm font-medium text-malayalam">
                          {part}
                        </span>
                        <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                          {item.meaning[j]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ─── Bangla Vowel Shift Tab ───────────────────── */}
        <TabsContent value="vowel-shift" className="mt-4 space-y-4">
          <p className="font-mono text-xs text-muted-foreground">
            The most critical difference: Bangla&apos;s inherent vowel is &apos;O&apos;
            (not &apos;A&apos; like Hindi/Marathi). This shifts pronunciation of every
            Tatsama word.
          </p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {BANGLA_RULES.map((rule) => (
              <div
                key={rule.rule}
                className="rounded-lg border border-border/50 bg-muted/10 p-3"
              >
                <p className="font-mono text-xs font-medium text-bangla">
                  {rule.rule}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>

          {filteredShifts.map((item, i) => (
            <Card
              key={item.hindi}
              className="border-border/50 bg-card/60 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-center">
                      <p className="font-mono text-[10px] text-muted-foreground">
                        हिन्दी
                      </p>
                      <p className="text-lg font-medium">{item.hindi}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        /{item.hindiPronounce}/
                      </p>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="font-mono text-xs text-muted-foreground/60">
                        →
                      </span>
                      <Badge
                        variant="outline"
                        className="mt-0.5 font-mono text-[8px] text-primary"
                      >
                        A→O
                      </Badge>
                    </div>

                    <div className="text-center">
                      <p className="font-mono text-[10px] text-muted-foreground">
                        বাংলা
                      </p>
                      <div className="flex items-center justify-center gap-1">
                        <p className="text-lg font-bold text-bangla">
                          {item.bangla}
                        </p>
                        <SpeakButton text={item.bangla} lang="bn" />
                      </div>
                      <p className="font-mono text-xs text-bangla/70">
                        /{item.banglaPronounce}/
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {item.english}
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-1 font-mono text-[9px] text-muted-foreground/80"
                    >
                      {item.rule}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
