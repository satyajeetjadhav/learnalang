import {
  ALL_SUFFIXES,
  LINKING_GLIDES,
  type SuffixEntry,
} from "@/data/kannada-morphology";
import type { Word } from "@/data/words";

export interface MorphBreakdown {
  root: Word;
  /** The actual root portion as it appears in the token */
  rootPart: string;
  /** Linking glide between root and suffix (e.g. ಯ) */
  glide: string | null;
  /** The matched suffix entry */
  suffix: SuffixEntry;
  /** The raw suffix string from the token */
  suffixPart: string;
}

/**
 * Given a token (inflected word) and a matched root Word,
 * try to decompose the remaining characters into a known suffix.
 *
 * Example:
 *   token: ಮನೆಗೆ, root: ಮನೆ → { root, suffix: -ಗೆ (dative) }
 *   token: ಮನೆಯಲ್ಲಿ, root: ಮನೆ → { root, glide: ಯ, suffix: -ಅಲ್ಲಿ (locative) }
 *   token: ಹೋಗುತ್ತೇನೆ, root: ಹೋಗು → { root, suffix: -ತ್ತೇನೆ (present 1st) }
 */
export function decompose(token: string, root: Word): MorphBreakdown | null {
  const rootStr = root.targetWord;

  // Token must start with root and be longer
  if (!token.startsWith(rootStr) || token.length <= rootStr.length) {
    return null;
  }

  const remainder = token.slice(rootStr.length);

  // Try direct suffix match (no glide)
  const directMatch = findSuffix(remainder, root);
  if (directMatch) {
    return {
      root,
      rootPart: rootStr,
      glide: null,
      suffix: directMatch,
      suffixPart: remainder,
    };
  }

  // Try with linking glide (e.g., ಯ between vowel stem and vowel suffix)
  for (const glide of LINKING_GLIDES) {
    if (remainder.startsWith(glide)) {
      const afterGlide = remainder.slice(glide.length);
      const glideMatch = findSuffix(afterGlide, root);
      if (glideMatch) {
        return {
          root,
          rootPart: rootStr,
          glide,
          suffix: glideMatch,
          suffixPart: remainder,
        };
      }
    }
  }

  return null;
}

function findSuffix(remainder: string, root: Word): SuffixEntry | null {
  const isVerb = root.grammar?.pos === "verb";

  for (const entry of ALL_SUFFIXES) {
    if (remainder === entry.suffix) {
      // For verb suffixes, only match against verb roots
      if (entry.category === "verb" && !isVerb) continue;
      // For case suffixes, only match against non-verbs
      if (entry.category === "case" && isVerb) continue;
      return entry;
    }
  }

  // No exact match found — return null
  return null;
}
