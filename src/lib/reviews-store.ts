import "server-only";
import { cache } from "react";
import { reviews as seedReviews } from "@/data/reviews";
import type { Review } from "./types";
import { getKV, setKV } from "./kv";

/**
 * Customer-submitted reviews (Phase 2 "reviews system", completed):
 * visitors submit on the PDP, reviews wait for approval in /admin/reviews,
 * approved ones merge with the seed reviews on the product page.
 */

export interface StoredReview extends Review {
  approved: boolean;
}

const KEY = "reviews";

async function readStored(): Promise<StoredReview[]> {
  return (await getKV<StoredReview[]>(KEY)) ?? [];
}

export const getStoredReviews = cache(readStored);

/** Seed + approved customer reviews for one product, newest first. */
export async function getMergedReviews(productId: string): Promise<Review[]> {
  const stored = await getStoredReviews();
  const approved = stored.filter((r) => r.approved && r.product_id === productId);
  const seed = seedReviews.filter((r) => r.product_id === productId);
  return [...approved, ...seed].sort((a, b) =>
    b.created_at.localeCompare(a.created_at),
  );
}

export async function addReview(input: {
  product_id: string;
  customer_name: string;
  rating: Review["rating"];
  review_text: string;
}): Promise<void> {
  const stored = await readStored();
  stored.unshift({
    id: `ur${Date.now().toString(36)}`,
    product_id: input.product_id,
    customer_name: input.customer_name,
    rating: input.rating,
    review_text: input.review_text,
    image_url: null,
    verified_purchase: false,
    created_at: new Date().toISOString(),
    approved: false,
  });
  await setKV(KEY, stored.slice(0, 500));
}

export async function setReviewApproval(id: string, approved: boolean): Promise<boolean> {
  const stored = await readStored();
  const r = stored.find((x) => x.id === id);
  if (!r) return false;
  r.approved = approved;
  await setKV(KEY, stored);
  return true;
}

export async function deleteStoredReview(id: string): Promise<void> {
  const stored = await readStored();
  await setKV(KEY, stored.filter((x) => x.id !== id));
}
