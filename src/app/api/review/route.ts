import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { srsCards, reviewLogs, words } from "@/db/schema";
import { eq, lte } from "drizzle-orm";
import { sm2 } from "@/lib/sm2";

// GET — fetch cards due for review
export async function GET() {
  const now = new Date();

  const dueCards = await db
    .select({
      card: srsCards,
      word: words,
    })
    .from(srsCards)
    .innerJoin(words, eq(srsCards.wordId, words.id))
    .where(lte(srsCards.nextReview, now));

  return NextResponse.json(dueCards);
}

// POST — record a review result and update SM-2 scheduling
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { cardId, rating } = body;

  if (!cardId || rating === undefined || rating < 0 || rating > 3) {
    return NextResponse.json(
      { error: "cardId and rating (0-3) are required" },
      { status: 400 }
    );
  }

  // Fetch current card state
  const [card] = await db
    .select()
    .from(srsCards)
    .where(eq(srsCards.id, cardId));

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  // Run SM-2 algorithm
  const result = sm2({
    repetitions: card.repetitions,
    easeFactor: card.easeFactor,
    interval: card.interval,
    rating,
  });

  // Update card and log review in parallel (async-parallel rule)
  const [updatedCard] = await Promise.all([
    db
      .update(srsCards)
      .set({
        repetitions: result.repetitions,
        easeFactor: result.easeFactor,
        interval: result.interval,
        nextReview: result.nextReview,
        lastReview: new Date(),
      })
      .where(eq(srsCards.id, cardId))
      .returning()
      .then((rows) => rows[0]),
    db.insert(reviewLogs).values({
      cardId,
      rating,
    }),
  ]);

  return NextResponse.json({
    card: updatedCard,
    nextReview: result.nextReview,
    interval: result.interval,
  });
}
