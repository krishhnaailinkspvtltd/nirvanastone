import Image from "next/image";
import Link from "next/link";
import { isGeneratedArt, ratingSummary } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { Price } from "./Price";
import { QuickAdd } from "./QuickAdd";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const { count, avg } = ratingSummary(product.id);
  const img = product.images[0];
  return (
    <Link
      href={`/products/${product.slug}`}
      className="lift group flex flex-col overflow-hidden rounded-xl border border-sand bg-parchment"
    >
      <div className="relative aspect-square bg-parchment">
        <Image
          src={img.url}
          alt={img.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
          unoptimized={isGeneratedArt(img.url)}
        />
        {product.certificate_available && (
          <span className="absolute left-2 top-2 rounded-full bg-maroon/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cream">
            Lab certified
          </span>
        )}
        {product.stock_qty > 0 && product.stock_qty <= 5 && (
          <span className="absolute right-2 top-2 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold text-[#2b1608]">
            Only {product.stock_qty} left
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h3 className="font-display text-[15px] leading-snug text-ink group-hover:text-maroon">
          {product.name}
        </h3>
        {count > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-mist">
            <Stars rating={avg} />
            {avg} ({count})
          </span>
        )}
        <Price price={product.price} mrp={product.mrp} />
        <div className="mt-auto pt-2">
          <QuickAdd product={product} />
        </div>
      </div>
    </Link>
  );
}
