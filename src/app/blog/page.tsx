import type { Metadata } from "next";
import Link from "next/link";
import { MalaDivider } from "@/components/MalaDivider";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Journal — guides to rudraksha, gemstones, vastu & zodiac",
  description:
    "Plain-language answers to the questions people actually ask about rudraksha, gemstones, healing crystals and vastu.",
};

const CATEGORY_LABELS: Record<string, string> = {
  rudraksha: "Rudraksha",
  gemstones: "Gemstones",
  vastu: "Vastu",
  zodiac: "Zodiac & Astrology",
};

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) =>
    b.published_at.localeCompare(a.published_at),
  );
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10">
      <header className="text-center">
        <p className="eyebrow">The journal</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-deep sm:text-4xl">
          Questions, answered honestly
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-mist">
          Guides written to answer the exact questions people search — which
          rudraksha to start with, which stone suits a rashi, where the pyramid
          actually goes.
        </p>
        <MalaDivider className="mt-5" />
      </header>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.category}/${post.slug}`}
            className="lift flex flex-col rounded-xl border border-sand bg-parchment p-5"
          >
            <span className="eyebrow">{CATEGORY_LABELS[post.category]}</span>
            <h2 className="mt-2 font-display text-lg leading-snug text-maroon-deep">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">{post.excerpt}</p>
            <span className="mt-auto pt-3 text-xs font-bold text-gold">
              {post.read_minutes} min read →
            </span>
          </Link>
        ))}
      </div>
      <div className="h-10" />
    </div>
  );
}
