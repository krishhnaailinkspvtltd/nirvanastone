"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { useCart } from "@/context/cart";
import { CATEGORIES, PURPOSES } from "@/lib/taxonomy";

const NAV = [
  { href: "/collections/rudraksha", label: "Rudraksha" },
  { href: "/collections/karungali", label: "Karungali" },
  { href: "/collections/bracelets", label: "Bracelets" },
  { href: "/collections/gemstones", label: "Gemstones" },
  { href: "/collections/murtis", label: "Murtis" },
  { href: "/collections/vastu", label: "Vastu" },
  { href: "/collections/zodiac", label: "Zodiac" },
  { href: "/collections/combos", label: "Combos" },
  { href: "/recommend", label: "AI Guide", accent: true },
];

const TICKER = [
  "Free shipping above ₹999",
  "COD available across India",
  "7-day easy replacement",
  "Every certified piece verifiable online",
  "Energised before dispatch",
];

export function Header() {
  const { count, hydrated } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-night/85 backdrop-blur-md">
      {/* Marquee announcement */}
      <div className="overflow-hidden bg-maroon py-1.5" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0">
              {TICKER.map((t) => (
                <span
                  key={`${half}-${t}`}
                  className="mx-6 text-[11px] font-bold tracking-wide text-cream/90"
                >
                  ✦ {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-md p-1.5 text-gold lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="text-aurum font-display text-2xl font-semibold tracking-tight">
            {site.name}
          </span>
          <span aria-hidden className="h-2 w-2 translate-y-[-2px] rounded-full bg-gold" />
        </Link>

        <nav aria-label="Main" className="ml-5 hidden items-center gap-4 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-[13px] font-bold transition-colors hover:text-gold ${
                n.accent
                  ? "rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-gold"
                  : pathname.startsWith(n.href)
                    ? "text-gold"
                    : "text-ink/80"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/track-order"
            className="hidden text-sm font-bold text-ink/80 hover:text-gold sm:block"
          >
            Track order
          </Link>
          <Link
            href="/cart"
            className="relative rounded-md p-1.5 text-gold"
            aria-label={`Cart, ${hydrated ? count : 0} items`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7h12l1.5 13h-15L6 7z" />
              <path d="M9 10V6a3 3 0 016 0v4" />
            </svg>
            {hydrated && count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-[#2b1608]">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="max-h-[70vh] overflow-y-auto border-t border-sand bg-night px-4 pb-6 pt-3 lg:hidden"
        >
          <p className="eyebrow mb-2">Shop by category</p>
          <ul className="grid grid-cols-2 gap-x-4">
            {Object.entries(CATEGORIES).map(([slug, c]) => (
              <li key={slug}>
                <Link
                  href={`/collections/${slug}`}
                  className="block py-1.5 text-[15px] font-bold text-ink"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mb-2 mt-4">Shop by purpose</p>
          <ul className="grid grid-cols-2 gap-x-4">
            {Object.entries(PURPOSES).map(([slug, p]) => (
              <li key={slug}>
                <Link
                  href={`/collections/purpose/${slug}`}
                  className="block py-1.5 text-[15px] text-ink"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/recommend" className="btn btn-gold !py-2 text-sm">
              Ask the AI guide
            </Link>
            <Link href="/verify-certificate" className="btn btn-outline !py-2 text-sm">
              Verify certificate
            </Link>
            <Link href="/track-order" className="btn btn-outline !py-2 text-sm">
              Track order
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
