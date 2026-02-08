import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { words, srsCards } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const lang = searchParams.get("lang");

  const query = lang
    ? db.select().from(words).where(eq(words.targetLang, lang))
    : db.select().from(words);

  const result = await query;
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const [word] = await db
    .insert(words)
    .values({
      targetLang: body.targetLang,
      targetWord: body.targetWord,
      phoneticScript: body.phoneticScript,
      marathiAnchor: body.marathiAnchor,
      hindiAnchor: body.hindiAnchor,
      englishMeaning: body.englishMeaning,
      category: body.category,
      audioUrl: body.audioUrl,
    })
    .returning();

  // Auto-create an SRS card for the new word
  await db.insert(srsCards).values({
    wordId: word.id,
  });

  return NextResponse.json(word, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const [updated] = await db
    .update(words)
    .set({
      targetLang: body.targetLang,
      targetWord: body.targetWord,
      phoneticScript: body.phoneticScript,
      marathiAnchor: body.marathiAnchor,
      hindiAnchor: body.hindiAnchor,
      englishMeaning: body.englishMeaning,
      category: body.category,
      audioUrl: body.audioUrl,
    })
    .where(eq(words.id, body.id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Word not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const [deleted] = await db
    .delete(words)
    .where(eq(words.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Word not found" }, { status: 404 });
  }

  return NextResponse.json(deleted);
}
