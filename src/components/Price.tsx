import { discountPct, formatINR } from "@/lib/catalog";

export function Price({
  price,
  mrp,
  size = "md",
}: {
  price: number;
  mrp: number;
  size?: "md" | "lg";
}) {
  const pct = discountPct({ price, mrp });
  return (
    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span
        className={`font-bold text-maroon-deep ${size === "lg" ? "text-3xl" : "text-lg"}`}
      >
        {formatINR(price)}
      </span>
      {pct > 0 && (
        <>
          <s className={`text-mist ${size === "lg" ? "text-lg" : "text-sm"}`}>
            {formatINR(mrp)}
          </s>
          <span
            className={`font-bold text-gold ${size === "lg" ? "text-base" : "text-xs"}`}
          >
            {pct}% off
          </span>
        </>
      )}
    </span>
  );
}
