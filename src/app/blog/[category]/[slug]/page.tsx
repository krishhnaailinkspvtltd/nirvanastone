import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { MalaDivider } from "@/components/MalaDivider";
import { site } from "@/config/site";
import { blogPosts } from "@/data/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && p.category === category);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.category}/${post.slug}`;

  return (
    <article className="mx-auto max-w-2xl px-4 pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.published_at,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: url,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.sections.map((s) => ({
            "@type": "Question",
            name: s.question,
            acceptedAnswer: { "@type": "Answer", text: s.answer },
          })),
        }}
      />

      <nav aria-label="Breadcrumb" className="text-xs text-mist">
        <Link href="/blog" className="hover:text-maroon">Journal</Link>
        {" / "}
        <span className="capitalize">{post.category}</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-maroon-deep sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-mist">
        {new Date(post.published_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        · {post.read_minutes} min read
      </p>
      <p className="mt-4 text-[17px] leading-relaxed text-ink">{post.excerpt}</p>

      <MalaDivider className="my-8" />

      {post.sections.map((s) => (
        <section key={s.question} className="mb-8">
          <h2 className="font-display text-2xl font-semibold leading-snug text-maroon-deep">
            {s.question}
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-ink">{s.answer}</p>
        </section>
      ))}

      <aside className="mb-10 rounded-2xl bg-maroon p-6 text-center text-cream">
        <p className="font-display text-xl">Still choosing?</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-cream/80">
          Our AI guide matches your situation to the catalog and explains its picks.
        </p>
        <Link href="/recommend" className="btn btn-gold mt-4">
          Ask the AI guide
        </Link>
      </aside>
    </article>
  );
}
