import type { OrderStatus } from "@/lib/types";

const STYLES: Record<OrderStatus, string> = {
  pending: "bg-sand text-ink",
  cod_confirmation_pending: "bg-gold/20 text-gold",
  confirmed: "bg-jade/15 text-jade",
  shipped: "bg-[#4a72c4]/20 text-[#8db0f0]",
  delivered: "bg-jade/25 text-jade",
  cancelled: "bg-maroon/30 text-[#e08a94]",
};

const LABELS: Record<OrderStatus, string> = {
  pending: "Payment pending",
  cod_confirmation_pending: "COD to confirm",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
