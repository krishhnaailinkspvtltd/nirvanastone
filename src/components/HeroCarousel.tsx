"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface HeroSlide {
  eyebrow: string;
  title: string;
  line: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  image: { url: string; alt: string };
}

/** Two–three rotating slots max, per the brief — never a banner stack. */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const s = slides[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-[#471820] via-[#2b1016] to-[#170a0e] text-cream shadow-[0_30px_80px_-40px_rgba(217,169,78,0.35)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid items-stretch md:grid-cols-2">
        <div key={`t${i}`} className="fade-slide-in flex flex-col justify-center gap-4 p-7 sm:p-10 lg:p-14">
          <p className="eyebrow">{s.eyebrow}</p>
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.9rem]">
            {s.title}
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-cream/80">{s.line}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href={s.cta.href} className="btn btn-gold">
              {s.cta.label}
            </Link>
            {s.secondary && (
              <Link
                href={s.secondary.href}
                className="btn border-[1.5px] border-cream/40 text-cream hover:bg-cream/10"
              >
                {s.secondary.label}
              </Link>
            )}
          </div>
        </div>
        <div key={`i${i}`} className="fade-slide-in relative hidden items-center justify-center p-8 md:flex">
          <div className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-2xl border border-gold/30 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.6)]">
            <Image
              src={s.image.url}
              alt={s.image.alt}
              fill
              sizes="340px"
              className="object-cover"
              unoptimized={s.image.url.startsWith("/api/")}
              priority={i === 0}
            />
          </div>
        </div>
      </div>
      {slides.length > 1 && (
        <div className="flex justify-center gap-2 pb-4 md:-mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-6 bg-gold-soft" : "w-2 bg-cream/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
