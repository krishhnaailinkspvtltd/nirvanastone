import Image from "next/image";
import Link from "next/link";
import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";
import { JsonLd } from "@/components/JsonLd";
import { MalaDivider } from "@/components/MalaDivider";
import { ProductCard } from "@/components/ProductCard";
import { TrustStrip } from "@/components/TrustStrip";
import { site } from "@/config/site";
import { blogPosts } from "@/data/blog";
import { photoUrl } from "@/data/photos";
import { testimonials } from "@/data/testimonials";
import { allProducts, bestsellers } from "@/lib/catalog";
import { CATEGORIES, PURPOSES, ZODIACS } from "@/lib/taxonomy";
import type { Zodiac } from "@/lib/types";

const slides: HeroSlide[] = [
  {
    eyebrow: "Certified · Energised · Verifiable",
    title: "The stone matters. The proof matters more.",
    line: "Every certified rudraksha and gemstone ships with a unique certificate code you can verify on this website — lab, date and piece, in one search.",
    cta: { label: "Shop bestsellers", href: "/collections/rudraksha" },
    secondary: { label: "Verify a certificate", href: "/verify-certificate" },
    image: {
      url: photoUrl("rudraksha-bead", "portrait"),
      alt: "Rudraksha beads",
    },
  },
  {
    eyebrow: "New · AI-guided choosing",
    title: "Not sure which stone is right for you?",
    line: "Tell our AI guide what's going on — career, love, health, protection or peace — and get two or three honest recommendations with the reasoning spelled out.",
    cta: { label: "Ask the AI guide", href: "/recommend" },
    secondary: { label: "Shop by purpose", href: "/collections/purpose/wealth" },
    image: {
      url: "/api/placeholder?kind=yantra&label=Find%20Your%20Stone&ratio=portrait",
      alt: "Find your stone",
    },
  },
  {
    eyebrow: "1–14 Mukhi · Nepal Origin",
    title: "The complete rudraksha family, bead by bead.",
    line: "From the everyday 5 mukhi to the Deva Mani — every mukhi X-ray verified, individually photographed and certified before dispatch.",
    cta: { label: "Explore rudraksha", href: "/collections/rudraksha" },
    image: {
      url: photoUrl("rudraksha-mala", "portrait"),
      alt: "Rudraksha mala",
    },
  },
];

export default function HomePage() {
  const best = bestsellers().slice(0, 8);
  const posts = [...blogPosts]
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .slice(0, 3);
  const productCount = Math.floor(allProducts.length / 10) * 10;

  return (
    <div className="mx-auto max-w-6xl px-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          email: site.supportEmail,
          address: { "@type": "PostalAddress", addressCountry: "IN" },
        }}
      />

      <div className="pt-5">
        <HeroCarousel slides={slides} />
      </div>

      {/* Category scroller */}
      <section className="mt-8" aria-label="Browse categories">
        <div className="scroller -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
          {Object.entries(CATEGORIES).map(([slug, c]) => (
            <Link
              key={slug}
              href={`/collections/${slug}`}
              className="glass lift flex shrink-0 items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4"
            >
              <span className="relative h-8 w-8 overflow-hidden rounded-full border border-gold/30">
                <Image
                  src={`/api/placeholder?kind=${c.art}&label=${encodeURIComponent(c.label)}`}
                  alt=""
                  fill
                  sizes="32px"
                  unoptimized
                  className="object-cover"
                />
              </span>
              <span className="text-[13px] font-bold text-ink">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* USP glass strip */}
      <section className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Store highlights">
        {[
          { n: `${productCount}+`, l: "Products across 13 categories" },
          { n: "1–14", l: "Mukhi rudraksha, all certified" },
          { n: "100%", l: "Certificates verifiable online" },
          { n: "COD", l: "With WhatsApp confirmation" },
        ].map((s) => (
          <div key={s.l} className="glass rounded-2xl p-4 text-center">
            <p className="text-aurum font-display text-2xl font-semibold">{s.n}</p>
            <p className="mt-1 text-xs leading-snug text-mist">{s.l}</p>
          </div>
        ))}
      </section>

      {/* Bestsellers */}
      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Most trusted</p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-maroon-deep">
              Bestsellers
            </h2>
          </div>
          <Link href="/collections/bracelets" className="text-sm font-bold text-gold hover:text-cream">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {best.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Shop by purpose */}
      <section className="mt-16">
        <h2 className="text-center font-display text-3xl font-semibold text-maroon-deep">
          Start from the <span className="text-aurum">intention</span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-mist">
          Each purpose gathers every relevant piece across rudraksha, gemstones,
          crystals, yantras and vastu.
        </p>
        <MalaDivider className="mt-4" />
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(PURPOSES).map(([slug, p]) => (
            <Link
              key={slug}
              href={`/collections/purpose/${slug}`}
              className="lift rounded-2xl border border-sand bg-gradient-to-b from-parchment to-[#1a0e12] p-4 text-center"
            >
              <p className="font-display text-lg font-semibold text-gold">{p.label}</p>
              <p className="mt-1 text-[11px] leading-snug text-mist">{p.line}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Wealth edit spotlight */}
      <section className="mt-16 overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-r from-[#3c1a10] via-[#2b1016] to-[#170a0e]">
        <div className="grid items-center md:grid-cols-[1fr_300px]">
          <div className="p-7 sm:p-10">
            <p className="eyebrow">The wealth edit</p>
            <h2 className="mt-2 max-w-md font-display text-3xl font-semibold leading-tight text-cream">
              Pyrite, citrine & the Dhan Yog line
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/75">
              The merchant's mineral in every form it's kept — bracelets, raw
              stones, tortoises, pyramids, frames and anklets — alongside Kuber
              and Lakshmi yantras, energised before dispatch.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/collections/purpose/wealth" className="btn btn-gold">
                Shop the wealth edit
              </Link>
              <Link href="/collections/combos" className="btn border-[1.5px] border-cream/40 text-cream hover:bg-cream/10">
                See combos
              </Link>
            </div>
          </div>
          <div className="relative hidden h-full min-h-[260px] md:block">
            <Image
              src={photoUrl("pyrite", "portrait")}
              alt="Raw pyrite"
              fill
              sizes="300px"
              className="object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      {/* Zodiac strip */}
      <section className="mt-16">
        <h2 className="text-center font-display text-3xl font-semibold text-maroon-deep">
          Your rashi, your stones
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-mist">
          Per-sign stone pairings, metal bands, pendants and mulank numerology —
          find yours.
        </p>
        <div className="scroller -mx-4 mt-6 flex gap-2.5 overflow-x-auto px-4 pb-1 lg:grid lg:grid-cols-6 lg:overflow-visible">
          {(Object.entries(ZODIACS) as [Zodiac, (typeof ZODIACS)[Zodiac]][]).map(([slug, z]) => (
            <Link
              key={slug}
              href={`/collections/zodiac/${slug}`}
              className="lift glass shrink-0 rounded-2xl px-4 py-3 text-center lg:shrink"
            >
              <p className="font-display text-base font-semibold text-gold">{z.label}</p>
              <p className="text-[10px] text-mist">{z.hindi} · {z.dates}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* All categories grid */}
      <section className="mt-16">
        <h2 className="text-center font-display text-3xl font-semibold text-maroon-deep">
          Everything in the temple
        </h2>
        <MalaDivider className="mt-4" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Object.entries(CATEGORIES).map(([slug, c]) => (
            <Link
              key={slug}
              href={`/collections/${slug}`}
              className="lift group overflow-hidden rounded-2xl border border-sand bg-parchment"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={`/api/placeholder?kind=${c.art}&label=${encodeURIComponent(c.label)}`}
                  alt={c.label}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-3.5">
                <p className="font-display text-lg text-maroon-deep group-hover:text-gold">
                  {c.label}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-mist">{c.blurb}</p>
              </div>
            </Link>
          ))}
          <Link
            href="/recommend"
            className="lift flex flex-col items-center justify-center gap-3 rounded-2xl border border-gold/40 bg-gradient-to-b from-[#40161e] to-[#1c0d11] p-6 text-center text-cream"
          >
            <span className="eyebrow">Undecided?</span>
            <span className="font-display text-xl leading-snug">
              Ask our AI guide which stone fits your need
            </span>
            <span className="btn btn-gold !py-2 text-sm">Start — it's free</span>
          </Link>
        </div>
      </section>

      {/* Trust strip — once, four badges */}
      <section className="mt-16">
        <TrustStrip />
      </section>

      {/* Testimonials */}
      <section className="mt-16">
        <h2 className="text-center font-display text-3xl font-semibold text-maroon-deep">
          What customers check first
        </h2>
        <MalaDivider className="mt-4" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-sand bg-parchment p-5">
              <blockquote className="text-[15px] leading-relaxed text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-3 text-sm">
                <span className="font-bold text-gold">{t.name}</span>
                <span className="text-mist"> · {t.city} · {t.product}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold text-maroon-deep">
            From the journal
          </h2>
          <Link href="/blog" className="text-sm font-bold text-gold hover:text-cream">
            All articles →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.category}/${post.slug}`}
              className="lift flex flex-col rounded-2xl border border-sand bg-parchment p-5"
            >
              <span className="eyebrow">{post.category}</span>
              <h3 className="mt-2 font-display text-lg leading-snug text-maroon-deep">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{post.excerpt}</p>
              <span className="mt-auto pt-3 text-xs font-bold text-gold">
                {post.read_minutes} min read →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommender CTA */}
      <section className="mt-16 overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-[#471820] via-[#2b1016] to-[#170a0e] px-6 py-12 text-center text-cream sm:px-10">
        <p className="eyebrow">A better way to choose</p>
        <h2 className="mx-auto mt-2 max-w-lg font-display text-3xl font-semibold leading-tight">
          Not sure which stone is <span className="text-aurum">right for you?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/80">
          Answer three short questions — or just tell us what's going on — and our
          AI guide recommends from our real catalog, with its reasoning shown.
        </p>
        <Link href="/recommend" className="btn btn-gold mt-6">
          Ask the AI guide
        </Link>
      </section>

      <div className="h-4" />
    </div>
  );
}
