import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";
import {
  candidates,
  ruleBasedPicks,
  type RecommendInput,
} from "@/lib/recommend";
import type { Product } from "@/lib/types";

/**
 * AI recommender — differentiator #1.
 * The model is constrained to the real catalog: we pass a shortlist of
 * candidate products and it may only pick from those ids. Anything else is
 * dropped; if the model or key is unavailable, a deterministic rule-based
 * matcher answers instead, so the page never breaks.
 */

const publicCard = (p: Product) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  category: p.category,
  price: p.price,
  mrp: p.mrp,
  image: p.images[0],
  certificate_available: p.certificate_available,
});

export async function POST(req: NextRequest) {
  let input: RecommendInput;
  try {
    const body = await req.json();
    input = {
      concern: body.concern ?? null,
      budget: body.budget ?? null,
      zodiac: body.zodiac ?? null,
      freeText:
        typeof body.freeText === "string" ? body.freeText.slice(0, 600) : null,
    };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const catalog = await getCatalog();
  const pool = candidates(catalog, input);
  if (pool.length === 0)
    return NextResponse.json({
      ok: true,
      source: "rules",
      picks: [],
      note: "Nothing in the catalog matches that budget right now — try widening it, or message us on WhatsApp.",
    });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    try {
      const client = new Anthropic({ apiKey });
      const catalogContext = pool.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        purposes: p.purpose_tags,
        zodiac: p.zodiac_tags,
        planets: p.planet_tags,
        benefits: p.benefits,
        certified: p.certificate_available,
        is_combo: p.is_combo,
      }));

      const response = await client.messages.create({
        model: "claude-opus-5",
        max_tokens: 1500,
        output_config: { effort: "low" },
        system: `You are the product guide for an Indian spiritual-wellness store selling rudraksha, gemstones, healing crystals, vastu items and yantras.

Rules — follow all of them:
1. Recommend ONLY products from the CANDIDATES list, by their exact "id". Never invent products.
2. Pick 2 or 3 products. Prefer variety of price where sensible.
3. For each pick, write a warm, honest 2–3 sentence reason grounded in the product's listed benefits and the customer's stated need. Frame spiritual effects as "traditionally associated with" — never promise outcomes, and never give medical, financial or legal advice.
4. If the need sounds like a serious medical or mental-health situation, still recommend gently but add a "note" reminding them that these products complement, never replace, professional care.
5. Respond with STRICT JSON only, no markdown fences, matching:
{"picks":[{"id":"<candidate id>","reason":"<2-3 sentences>"}],"note":"<optional single sentence or empty string>"}`,
        messages: [
          {
            role: "user",
            content: `CANDIDATES:\n${JSON.stringify(catalogContext)}\n\nCUSTOMER:\n${JSON.stringify(
              {
                concern: input.concern,
                budget: input.budget,
                zodiac: input.zodiac,
                in_their_words: input.freeText,
              },
            )}`,
          },
        ],
      });

      const text = response.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as {
          picks?: { id: string; reason: string }[];
          note?: string;
        };
        const picks = (parsed.picks ?? [])
          .map((pk) => {
            const product = getProductById(catalog, pk.id);
            // Only accept ids that were actually in the candidate pool.
            if (!product || !pool.some((c) => c.id === pk.id)) return null;
            if (typeof pk.reason !== "string" || pk.reason.length < 10) return null;
            return { product: publicCard(product), reason: pk.reason.slice(0, 600) };
          })
          .filter((x) => x !== null)
          .slice(0, 3);
        if (picks.length > 0) {
          return NextResponse.json({
            ok: true,
            source: "ai",
            picks,
            note: typeof parsed.note === "string" ? parsed.note.slice(0, 300) : "",
          });
        }
      }
      // Fall through to rules if the model returned nothing usable.
    } catch (err) {
      console.error("[recommend] LLM call failed, using rules:", err);
    }
  }

  const picks = ruleBasedPicks(input, pool).map((pk) => ({
    product: publicCard(pk.product),
    reason: pk.reason,
  }));
  return NextResponse.json({ ok: true, source: "rules", picks, note: "" });
}
