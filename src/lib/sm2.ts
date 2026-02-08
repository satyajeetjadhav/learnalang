/**
 * SuperMemo-2 Algorithm Implementation
 *
 * Rating scale:
 *   0 = Again (complete blackout)
 *   1 = Hard (significant difficulty)
 *   2 = Good (correct with some hesitation)
 *   3 = Easy (perfect response)
 *
 * Maps to internal SM-2 quality: Again=0, Hard=2, Good=4, Easy=5
 */

const QUALITY_MAP: Record<number, number> = {
  0: 0, // Again
  1: 2, // Hard
  2: 4, // Good
  3: 5, // Easy
};

export interface SM2Input {
  repetitions: number;
  easeFactor: number;
  interval: number;
  rating: number; // 0-3
}

export interface SM2Output {
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReview: Date;
}

export function sm2(input: SM2Input): SM2Output {
  const quality = QUALITY_MAP[input.rating] ?? 0;
  let { repetitions, easeFactor, interval } = input;

  if (quality < 3) {
    // Failed — reset
    repetitions = 0;
    interval = 0;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return { repetitions, easeFactor, interval, nextReview };
}
