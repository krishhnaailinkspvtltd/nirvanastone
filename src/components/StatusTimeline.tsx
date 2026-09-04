import type { OrderStatus, PaymentMethod } from "@/lib/types";

const LABELS: Record<string, string> = {
  pending: "Payment pending",
  cod_confirmation_pending: "COD confirmation pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
};

export function StatusTimeline({
  status,
  paymentMethod,
}: {
  status: OrderStatus;
  paymentMethod: PaymentMethod;
}) {
  if (status === "cancelled") {
    return (
      <p className="rounded-xl border border-maroon/30 bg-maroon/5 p-4 text-sm font-bold text-maroon">
        This order was cancelled.
      </p>
    );
  }

  const steps: OrderStatus[] =
    paymentMethod === "cod"
      ? ["cod_confirmation_pending", "confirmed", "shipped", "delivered"]
      : ["pending", "confirmed", "shipped", "delivered"];
  const current = steps.indexOf(status);

  return (
    <ol className="flex flex-col gap-0 sm:flex-row sm:items-start sm:gap-0">
      {steps.map((s, i) => {
        const done = i <= current;
        return (
          <li key={s} className="flex flex-1 items-start gap-3 sm:flex-col sm:items-center sm:gap-2">
            <span className="flex flex-col items-center sm:contents">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  done
                    ? "border-gold bg-gold text-[#2b1608]"
                    : "border-sand bg-parchment text-mist"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className={`ml-3.5 h-6 w-0.5 sm:hidden ${done && i < current ? "bg-gold" : "bg-sand"}`}
                />
              )}
            </span>
            <span
              className={`pb-4 text-sm sm:pb-0 sm:text-center ${
                i === current ? "font-bold text-maroon-deep" : done ? "text-ink" : "text-mist"
              }`}
            >
              {LABELS[s]}
              {s === "cod_confirmation_pending" && i === current && (
                <span className="block text-xs font-normal text-mist">
                  We'll confirm on WhatsApp before dispatch
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
