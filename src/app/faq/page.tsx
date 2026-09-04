import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MalaDivider } from "@/components/MalaDivider";
import { siteFaqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Orders, payments, COD, certification, energisation, shipping and returns — answered.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: siteFaqs.flatMap((s) =>
            s.items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          ),
        }}
      />
      <header className="text-center">
        <h1 className="font-display text-3xl font-semibold text-maroon-deep sm:text-4xl">
          Frequently asked questions
        </h1>
        <MalaDivider className="mt-5" />
      </header>

      {siteFaqs.map((section) => (
        <section key={section.section} className="mt-9">
          <h2 className="eyebrow">{section.section}</h2>
          <div className="mt-3 space-y-2">
            {section.items.map((f) => (
              <details key={f.q} className="group rounded-xl border border-sand bg-parchment px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-bold text-maroon-deep marker:content-none">
                  <span className="flex items-center justify-between gap-3">
                    {f.q}
                    <span aria-hidden className="text-gold transition-transform group-open:rotate-45">＋</span>
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-mist">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
      <div className="h-12" />
    </div>
  );
}
