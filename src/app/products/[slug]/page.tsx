import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/BuyBox";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { MalaDivider } from "@/components/MalaDivider";
import { Price } from "@/components/Price";
import { ProductCard } from "@/components/ProductCard";
import { Stars } from "@/components/Stars";
import { site } from "@/config/site";
import { certificates } from "@/data/certificates";
import { categoryFaqs } from "@/data/faqs";
import {
  allProducts,
  getProduct,
  getProductById,
  productReviews,
  ratingSummary,
  relatedProducts,
} from "@/lib/catalog";
import { CATEGORIES } from "@/lib/taxonomy";

export const dynamicParams = false;

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description.slice(0, 155),
  };
}

/** Reusable "Why choose us" trust block — identical component on every PDP. */
function WhyChooseUs({ certified }: { certified: boolean }) {
  const rows = [
    certified
      ? {
          t: "Certificate in the box",
          d: "Independent lab certificate with a unique code — verify it on this site anytime.",
        }
      : {
          t: "Hand-inspected",
          d: "Every piece checked for material authenticity before packing.",
        },
    {
      t: "Energised before dispatch",
      d: "Rudraksha and yantras go through the traditional ritual before shipping.",
    },
    {
      t: "7-day easy replacement",
      d: "Damaged, defective or wrong item — replaced without an argument.",
    },
  ];
  return (
    <div className="rounded-xl border border-sand bg-parchment/60 p-4">
      <p className="eyebrow mb-2">Why choose us</p>
      <ul className="space-y-2.5">
        {rows.map((r) => (
          <li key={r.t} className="flex gap-2.5 text-sm">
            <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full border-2 border-gold" />
            <span>
              <strong className="text-maroon-deep">{r.t}.</strong>{" "}
              <span className="text-mist">{r.d}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const { count, avg } = ratingSummary(p.id);
  const revs = productReviews(p.id);
  const related = relatedProducts(p);
  const faqs = categoryFaqs[p.category];
  const sampleCert = certificates.find((c) => c.product_id === p.id);
  const comboItems = p.is_combo
    ? (p.combo_item_ids ?? []).map(getProductById).filter((x) => x !== undefined)
    : [];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.description,
          image: p.images.map((i) => `${site.url}${i.url}`),
          brand: { "@type": "Brand", name: site.name },
          ...(count > 0 && {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: avg,
              reviewCount: count,
            },
          }),
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: p.price,
            availability:
              p.stock_qty > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            url: `${site.url}/products/${p.slug}`,
          },
        }}
      />

      <nav aria-label="Breadcrumb" className="text-xs text-mist">
        <Link href="/" className="hover:text-maroon">Home</Link>
        {" / "}
        <Link href={`/collections/${p.category}`} className="hover:text-maroon">
          {CATEGORIES[p.category].label}
        </Link>
        {" / "}
        <span className="text-ink">{p.name}</span>
      </nav>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <Gallery images={p.images} name={p.name} />

        <div>
          <p className="eyebrow">{p.subcategory}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-maroon-deep">
            {p.name}
          </h1>
          {count > 0 && (
            <a href="#reviews" className="mt-2 inline-flex items-center gap-2 text-sm text-mist hover:text-maroon">
              <Stars rating={avg} size={16} />
              <span className="font-bold text-ink">{avg}</span> · {count} review{count > 1 ? "s" : ""}
            </a>
          )}
          <div className="mt-3">
            <Price price={p.price} mrp={p.mrp} size="lg" />
          </div>
          <p className="mt-1 text-xs text-mist">Inclusive of all taxes · Free shipping above ₹{site.freeShippingAbove}</p>

          {p.certificate_available && (
            <Link
              href={`/verify-certificate${sampleCert ? `?code=${sampleCert.certificate_code}` : ""}`}
              className="mt-4 flex items-center gap-3 rounded-xl border border-gold-soft bg-gold/10 p-3 text-sm hover:border-gold"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden className="shrink-0 fill-gold">
                <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8z" />
              </svg>
              <span>
                <strong className="text-maroon-deep">Lab certificate included.</strong>{" "}
                <span className="text-mist">
                  Ships with a unique code — try the verification tool →
                </span>
              </span>
            </Link>
          )}

          <BuyBox product={p} />

          <p className="mt-6 text-[15px] leading-relaxed text-ink">{p.description}</p>

          {comboItems.length > 0 && (
            <div className="mt-5 rounded-xl border border-sand bg-white p-4">
              <p className="eyebrow mb-2">Inside this combo</p>
              <ul className="space-y-1.5">
                {comboItems.map((item) => (
                  <li key={item.id} className="text-sm">
                    <Link href={`/products/${item.slug}`} className="font-bold text-maroon hover:underline">
                      {item.name}
                    </Link>{" "}
                    <span className="text-mist">— sold separately at ₹{item.price.toLocaleString("en-IN")}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5">
            <WhyChooseUs certified={p.certificate_available} />
          </div>
        </div>
      </div>

      {/* Benefits + care + FAQ */}
      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-maroon-deep">Benefits</h2>
          <ul className="mt-4 space-y-3">
            {p.benefits.map((b) => (
              <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
                <span aria-hidden className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-gold bg-cream" />
                {b}
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-display text-2xl font-semibold text-maroon-deep">Care</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink">{p.care_instructions}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-semibold text-maroon-deep">
            Common questions
          </h2>
          <div className="mt-4 space-y-2">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-sand bg-white px-4 py-3">
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
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mt-14">
        <h2 className="font-display text-2xl font-semibold text-maroon-deep">
          Customer reviews {count > 0 && <span className="text-mist">({count})</span>}
        </h2>
        {count > 0 ? (
          <>
            <p className="mt-1 flex items-center gap-2 text-sm text-mist">
              <Stars rating={avg} size={16} /> {avg} out of 5
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {revs.map((r) => (
                <article key={r.id} className="rounded-xl border border-sand bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-maroon-deep">{r.customer_name}</p>
                    <Stars rating={r.rating} />
                  </div>
                  {r.verified_purchase && (
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-gold">
                      Verified purchase
                    </p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-ink">{r.review_text}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm text-mist">
            No reviews yet — be the first after your order arrives.
          </p>
        )}
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-center font-display text-2xl font-semibold text-maroon-deep">
            {p.is_combo ? "You may also like" : "Complete the set"}
          </h2>
          <MalaDivider className="mt-3" />
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
      <div className="h-6" />
    </div>
  );
}
