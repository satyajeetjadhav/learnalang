import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  real,
  timestamp,
} from "drizzle-orm/pg-core";

export const languages = pgTable("languages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  scriptName: varchar("script_name", { length: 100 }).notNull(),
  code: varchar("code", { length: 10 }).notNull().unique(),
});

export const words = pgTable("words", {
  id: uuid("id").defaultRandom().primaryKey(),
  targetLang: varchar("target_lang", { length: 10 })
    .notNull()
    .references(() => languages.code),
  targetWord: text("target_word").notNull(),
  phoneticScript: text("phonetic_script"),
  marathiAnchor: text("marathi_anchor"),
  hindiAnchor: text("hindi_anchor"),
  englishMeaning: text("english_meaning").notNull(),
  category: varchar("category", { length: 100 }),
  audioUrl: text("audio_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const srsCards = pgTable("srs_cards", {
  id: uuid("id").defaultRandom().primaryKey(),
  wordId: uuid("word_id")
    .notNull()
    .references(() => words.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull().default("default"),
  interval: integer("interval").notNull().default(0),
  easeFactor: real("ease_factor").notNull().default(2.5),
  repetitions: integer("repetitions").notNull().default(0),
  nextReview: timestamp("next_review").defaultNow().notNull(),
  lastReview: timestamp("last_review"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviewLogs = pgTable("review_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  cardId: uuid("card_id")
    .notNull()
    .references(() => srsCards.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  reviewedAt: timestamp("reviewed_at").defaultNow().notNull(),
});
