# Nirvana — Spiritual Jewellery & Gemstone E-Commerce

Custom Next.js storefront for an Indian D2C spiritual-wellness brand: rudraksha,
natural gemstones, healing crystal jewellery, vastu items, yantras and zodiac
bracelets. Built to out-execute the Shopify reference competitors on speed,
authenticity-proof and recommendation experience.

> **Placeholder notice:** the domain, WhatsApp number and all
> product imagery are placeholders. See **Before launch** below.

## Stack

- **Next.js 15** (App Router, TypeScript, standalone output) + **Tailwind CSS v4**
- **Supabase** (Postgres) for orders — with a local JSON fallback so everything
  works before Supabase is provisioned
- **Razorpay** for prepaid (UPI/cards/netbanking) — with a simulated-payment dev
  mode when keys are absent
- **COD** as a first-class, separately-gated flow (pincode serviceability +
  ₹5,000 cap + WhatsApp-confirmation status)
- **Claude (Anthropic API)** for the AI recommender — rule-based fallback when
  no key is set
- **Docker + Cloudflare Tunnel** deploy (see `docker-compose.yml`)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Everything works out of the box with **zero**
configuration: a ~205-SKU seed catalog across 13 categories (full 1–14 mukhi
rudraksha range, karungali, 21 bracelet lines, malas, deity pendants, anklets,
15 loose vedic gemstones, murtis, yantras & pyrite frames, vastu decor,
per-sign zodiac + mulank, accessories, combos — modelled on astrotalk.store and
srimandir.store's real ranges, with original copy), designed SVG placeholder
imagery, COD + simulated prepaid checkout, order tracking, AI-guide fallback,
certificate verification (demo codes `NRV-2026-00001`, `NRV-2026-00042`,
`NRV-2026-00107`), promo codes `WELCOME10` / `SHUBH100`.

The UI is the dark **"Midnight Temple"** theme — token slots documented at the
top of `src/app/globals.css`; catalog families live in `src/data/catalog/*`.

## Environment

Copy `.env.example` → `.env.local` and fill in what you have. Every integration
degrades gracefully when unset:

| Variable | Enables | Without it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Orders in Postgres (run `supabase/schema.sql` first) | Orders in `.data/orders.json` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` | Live Razorpay checkout + HMAC verification | Simulated payment (auto-blocked once keys exist) |
| `ANTHROPIC_API_KEY` | LLM recommendations with reasoning | Deterministic rule-based matcher |
| `N8N_WEBHOOK_BASE_URL` (+ optional `N8N_WEBHOOK_TOKEN`) | Order-lifecycle webhooks → n8n → WhatsApp | Events logged to server console |
| `NEXT_PUBLIC_SHOW_PLACEHOLDER_TAG=false` | Hides the PLACEHOLDER corner tag for screenshots | Tag shown (default) |

## Admin panel (/admin)

Sign in at `/admin` with `ADMIN_PASSWORD` (dev default: `admin123` — a
warning banner shows until you set the real one). Everything is managed
there and applies to the live store immediately, no rebuild:

- **Dashboard** — orders, order value, COD queue, low-stock alerts
- **Orders** — every purchase appears the moment it's placed; confirm COD,
  mark shipped (with courier tracking ID), delivered, or cancelled;
  status changes fire the n8n/WhatsApp webhooks; delivered COD auto-marks paid
- **Products** — edit any of the 205 seed products (price, MRP, stock,
  copy, tags, images, variants), hide them, reset them to original, or
  create brand-new products; stock decrements automatically on each order
- **Settings** — shipping fee, free-shipping threshold, COD cap, promo codes

Admin state lives in the same dual store as orders: Supabase (`kv_store`
table) when configured, local JSON otherwise (`/tmp` on Vercel — ephemeral
there until Supabase is set up).

## Webhook events (n8n / WhatsApp phase)

`POST {N8N_WEBHOOK_BASE_URL}/{event}` with JSON body, `Bearer` token optional:

- `order-placed` — send order confirmation
- `cod-confirmation-needed` — WhatsApp COD confirmation (the RTO-killer)
- `order-shipped` / `order-delivered` — fired by the future admin panel when
  statuses change (helpers ready in `src/lib/webhooks.ts`)

## Where things live

- `src/config/site.ts` — brand identity, COD caps, pincode prefixes ← **edit first**
- `src/data/products.ts` — seed catalog + the real-photo TODO list
- `src/data/{reviews,testimonials,certificates,blog,faqs,policies}.ts` — seed content
- `src/app/api/*` — checkout, payment verify/simulate, track, recommend,
  verify-certificate, promo, placeholder art
- `supabase/schema.sql` — full production schema incl. RLS

## Before launch (checklist)

1. **Brand**: replace every `[PLACEHOLDER]` in `src/config/site.ts`; adjust the
   palette in `src/app/globals.css` if the client has brand assets.
2. **Photos**: product imagery is currently free-license Unsplash
   *representative* photography (mapped per product in `src/data/photos.ts`,
   credits inside) with designed SVG spec-art where no honest stock exists.
   These are legal to ship but are NOT photos of the actual SKUs — replace
   with real photography per the TODO block in `src/data/catalog/core.ts`
   (1:1 squares for grids, 4:5 for PDP). Never scrape competitor or Google
   images.
3. **Content**: replace seed reviews/testimonials with real ones (with
   permission); legal review of `src/data/policies.ts`.
4. **Supabase**: create project, run `supabase/schema.sql`, set env vars.
5. **Razorpay**: add live keys; the simulate endpoint disables itself.
6. **COD coverage**: tighten `codPincodePrefixes` to the courier's actual list.
7. **Deploy**: `docker compose up -d --build` behind a Cloudflare Tunnel
   (`TUNNEL_TOKEN` in `.env`).

## Roadmap (per build brief)

- ✅ Phase 1 — storefront, cart, checkout (Razorpay + COD), order flow, seed data
- ✅ Phase 2 — AI recommender, certificate verification, reviews, webhook surface
- ⬜ Phase 3 — admin panel (products/inventory/orders), blog CMS, Supabase auth accounts
- ⬜ Phase 4 — Core Web Vitals pass with real imagery, accessibility audit, copy review
