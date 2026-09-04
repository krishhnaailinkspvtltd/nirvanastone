import "server-only";
import { allProducts, discountPct } from "@/lib/catalog";
import { PURPOSES, ZODIACS } from "@/lib/taxonomy";
import type { Product, Purpose, Zodiac } from "@/lib/types";

export interface RecommendInput {
  concern: Purpose | null;
  budget: "under-1000" | "1000-3000" | "3000-5000" | "5000-plus" | null;
  zodiac: Zodiac | null;
  freeText: string | null;
}

export interface Pick {
  product: Product;
  reason: string;
}

const BUDGETS: Record<string, { min: number; max: number }> = {
  "under-1000": { min: 0, max: 999 },
  "1000-3000": { min: 1000, max: 3000 },
  "3000-5000": { min: 3000, max: 5000 },
  "5000-plus": { min: 5000, max: 10000000 },
};

const KEYWORDS: Record<Purpose, string[]> = {
  wealth: ["wealth", "money", "business", "finance", "financial", "paisa", "dhan", "income", "debt", "loan", "profit", "shop", "sales"],
  love: ["love", "relationship", "marriage", "partner", "husband", "wife", "breakup", "shaadi", "romance", "family"],
  health: ["health", "sleep", "energy", "tired", "illness", "sick", "stress", "anxiety", "body", "healing"],
  protection: ["protection", "evil", "nazar", "negative", "enemy", "fear", "safe", "drishti", "black magic", "jealous"],
  career: ["career", "job", "interview", "promotion", "exam", "study", "office", "boss", "work", "naukri", "growth", "focus"],
  peace: ["peace", "calm", "meditation", "mind", "anger", "shanti", "clarity", "overthinking", "restless"],
};

export function inferConcern(text: string): Purpose | null {
  const t = text.toLowerCase();
  let best: Purpose | null = null;
  let bestHits = 0;
  for (const [purpose, words] of Object.entries(KEYWORDS) as [Purpose, string[]][]) {
    const hits = words.filter((w) => t.includes(w)).length;
    if (hits > bestHits) {
      bestHits = hits;
      best = purpose;
    }
  }
  return best;
}

/** Score + shortlist candidates from the real catalog. */
export function candidates(input: RecommendInput, limit = 12): Product[] {
  const concern =
    input.concern ?? (input.freeText ? inferConcern(input.freeText) : null);
  const budget = input.budget ? BUDGETS[input.budget] : null;

  return allProducts
    .filter((p) => p.stock_qty > 0)
    .map((p) => {
      let score = 1;
      if (concern && p.purpose_tags.includes(concern)) score += 6;
      if (input.zodiac && p.zodiac_tags.includes(input.zodiac)) score += 4;
      if (budget) {
        if (p.price >= budget.min && p.price <= budget.max) score += 5;
        else if (p.price > budget.max) score -= 4;
      }
      if (p.bestseller) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

/** Deterministic fallback when the LLM is unavailable. */
export function ruleBasedPicks(input: RecommendInput, pool: Product[]): Pick[] {
  const concern =
    input.concern ?? (input.freeText ? inferConcern(input.freeText) : null);
  return pool.slice(0, 3).map((product) => {
    const bits: string[] = [];
    if (concern && product.purpose_tags.includes(concern)) {
      bits.push(
        `it's one of our most chosen pieces for ${PURPOSES[concern].label.toLowerCase()} — ${PURPOSES[concern].line.toLowerCase()}`,
      );
    }
    if (input.zodiac && product.zodiac_tags.includes(input.zodiac)) {
      bits.push(
        `it's traditionally matched to ${ZODIACS[input.zodiac].label} (${ZODIACS[input.zodiac].hindi}) through its ruling planet`,
      );
    }
    if (discountPct(product) > 0) {
      bits.push(`it's currently ${discountPct(product)}% below MRP`);
    }
    const reason =
      bits.length > 0
        ? `We suggest the ${product.name} because ${bits.join(", and ")}. ${product.benefits[0]}.`
        : `${product.name}: ${product.benefits[0]}. A dependable starting point for your intention.`;
    return { product, reason };
  });
}
