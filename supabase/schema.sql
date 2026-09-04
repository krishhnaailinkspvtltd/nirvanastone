-- ══════════════════════════════════════════════════════════════════
-- Supabase schema — run in the SQL editor of a fresh Supabase project.
-- The app works without Supabase in dev (local JSON order store);
-- set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY to switch
-- order persistence to these tables.
-- Products/reviews/certificates currently ship as versioned seed data
-- in src/data/*; migrate them into these tables in the admin phase.
-- ══════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── products ────────────────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in
    ('rudraksha','gemstones','crystal-jewelry','vastu','yantras','zodiac-bracelets','combos')),
  subcategory text,
  description text not null default '',
  benefits text[] not null default '{}',
  care_instructions text not null default '',
  price integer not null check (price >= 0),
  mrp integer not null check (mrp >= 0),
  purpose_tags text[] not null default '{}',
  zodiac_tags text[] not null default '{}',
  planet_tags text[] not null default '{}',
  is_combo boolean not null default false,
  combo_item_ids uuid[],
  certificate_available boolean not null default false,
  stock_qty integer not null default 0 check (stock_qty >= 0),
  images jsonb not null default '[]', -- [{url, alt, is_placeholder}]
  bestseller boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  variant_name text not null,
  price_delta integer not null default 0,
  stock_qty integer not null default 0 check (stock_qty >= 0)
);

-- ── orders ──────────────────────────────────────────────────────────
create table if not exists orders (
  id text primary key,                    -- human-friendly: NRV-YYYYMMDD-XXXXX
  user_id uuid references auth.users(id), -- null for guest checkout
  items jsonb not null,                   -- [{product_id, slug, name, variant_name, unit_price, qty}]
  subtotal integer not null,
  discount integer not null default 0,
  promo_code text,
  shipping_fee integer not null default 0,
  total integer not null,
  payment_method text not null check (payment_method in ('razorpay','cod')),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid','paid','refunded','simulated')),
  order_status text not null default 'pending'
    check (order_status in
      ('pending','cod_confirmation_pending','confirmed','shipped','delivered','cancelled')),
  shipping_address jsonb not null,
  tracking_id text,
  cod_confirmed boolean not null default false,
  razorpay_order_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_phone_idx
  on orders ((shipping_address->>'phone'));
create index if not exists orders_status_idx on orders (order_status);

-- ── reviews ─────────────────────────────────────────────────────────
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  customer_name text not null,
  rating integer not null check (rating between 1 and 5),
  review_text text not null,
  image_url text,
  verified_purchase boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists reviews_product_idx on reviews (product_id);

-- ── certificates ────────────────────────────────────────────────────
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  certificate_code text unique not null,  -- public lookup string, e.g. NRV-2026-00042
  product_id uuid not null references products(id),
  order_item_id text,                     -- ties a unit to a dispatched order line
  lab_name text not null,
  issue_date date not null,
  pdf_url text,
  qr_code_url text
);

create index if not exists certificates_code_idx on certificates (certificate_code);

-- ── Row Level Security ──────────────────────────────────────────────
-- The storefront's server routes use the service-role key (bypasses RLS).
-- Lock the anon key down to read-only catalog data.
alter table products enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;
alter table reviews enable row level security;
alter table certificates enable row level security;

create policy "public read products" on products for select using (true);
create policy "public read variants" on product_variants for select using (true);
create policy "public read reviews" on reviews for select using (true);
create policy "public read certificates" on certificates for select using (true);
-- orders: NO anon policies — accessible only via service-role server routes.
