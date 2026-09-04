import Link from "next/link";
import { ReviewModeration } from "@/components/admin/ReviewModeration";
import { getProductById } from "@/lib/catalog";
import { getCatalog } from "@/lib/catalog-store";
import { getStoredReviews } from "@/lib/reviews-store";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const [stored, catalog] = await Promise.all([getStoredReviews(), getCatalog()]);
  const pending = stored.filter((r) => !r.approved);
  const approved = stored.filter((r) => r.approved);

  const Row = ({ review }: { review: (typeof stored)[number] }) => {
    const product = getProductById(catalog, review.product_id);
    return (
      <li className="rounded-xl border border-sand bg-parchment p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm">
              <span className="font-bold text-ink">{review.customer_name}</span>
              <span className="text-gold"> {"★".repeat(review.rating)}</span>
              <span className="text-mist">
                {" "}on{" "}
                {product ? (
                  <Link href={`/products/${product.slug}`} className="font-bold text-gold hover:underline">
                    {product.name}
                  </Link>
                ) : (
                  review.product_id
                )}
              </span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">{review.review_text}</p>
            <p className="mt-1 text-[11px] text-mist">
              {new Date(review.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
          <ReviewModeration id={review.id} approved={review.approved} />
        </div>
      </li>
    );
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-maroon-deep">Reviews</h1>
      <p className="mt-1 text-sm text-mist">
        Customer submissions from product pages. Approved reviews appear on the
        product immediately.
      </p>

      <h2 className="mt-6 font-display text-xl font-semibold text-maroon-deep">
        Awaiting approval <span className="text-mist">({pending.length})</span>
      </h2>
      {pending.length === 0 ? (
        <p className="mt-2 text-sm text-mist">Nothing waiting — all clear.</p>
      ) : (
        <ul className="mt-3 space-y-2">{pending.map((r) => <Row key={r.id} review={r} />)}</ul>
      )}

      <h2 className="mt-8 font-display text-xl font-semibold text-maroon-deep">
        Published <span className="text-mist">({approved.length})</span>
      </h2>
      {approved.length === 0 ? (
        <p className="mt-2 text-sm text-mist">No customer reviews published yet.</p>
      ) : (
        <ul className="mt-3 space-y-2">{approved.map((r) => <Row key={r.id} review={r} />)}</ul>
      )}
    </div>
  );
}
