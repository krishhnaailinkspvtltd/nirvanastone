"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useMemo, useState } from "react";
import { rememberOrder, useCart, useCartLines } from "@/context/cart";
import { formatINR } from "@/lib/catalog";
import { codEligible } from "@/lib/cod";
import type { PaymentMethod, ShippingAddress } from "@/lib/types";

declare global {
  interface Window {
    Razorpay?: new (options: object) => { open: () => void };
  }
}

const EMPTY: ShippingAddress = {
  full_name: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CheckoutPage() {
  const { clear, hydrated } = useCart();
  const { lines, subtotal, settings, loading } = useCartLines();
  const router = useRouter();
  const [address, setAddress] = useState<ShippingAddress>(EMPTY);
  const [method, setMethod] = useState<PaymentMethod>("razorpay");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const promoCode =
    typeof window !== "undefined" ? localStorage.getItem("nrv-promo") : null;
  // Display estimate only — the server re-prices and re-validates everything.
  const freeAbove = settings?.freeShippingAbove ?? 999;
  const fee = settings?.shippingFee ?? 79;
  const codCap = settings?.codOrderCap ?? 5000;
  const shipping = subtotal >= freeAbove || subtotal === 0 ? 0 : fee;
  const estTotal = subtotal + shipping;

  const cod = useMemo(
    () =>
      address.pincode.replace(/\D/g, "").length === 6
        ? codEligible(address.pincode, estTotal, codCap)
        : null,
    [address.pincode, estTotal, codCap],
  );

  const set = (k: keyof ShippingAddress) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress((a) => ({ ...a, [k]: e.target.value }));

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({
            productId: l.productId,
            variantId: l.variantId,
            qty: l.qty,
          })),
          promoCode,
          paymentMethod: method,
          address,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Something went wrong — please try again.");
        setPlacing(false);
        return;
      }

      const finish = (orderId: string) => {
        rememberOrder(orderId, address.phone);
        clear();
        localStorage.removeItem("nrv-promo");
        router.push(`/order/${orderId}`);
      };

      if (data.flow === "cod") {
        finish(data.orderId);
        return;
      }

      if (data.flow === "simulate") {
        // Dev mode: no Razorpay keys configured yet.
        const sim = await fetch("/api/payment/simulate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ orderId: data.orderId }),
        });
        const simData = await sim.json();
        if (simData.ok) finish(data.orderId);
        else {
          setError(simData.error ?? "Payment simulation failed.");
          setPlacing(false);
        }
        return;
      }

      // Live Razorpay checkout
      if (!window.Razorpay) {
        setError("Payment library didn't load — check your connection and retry.");
        setPlacing(false);
        return;
      }
      const rzp = new window.Razorpay({
        ...data.razorpay,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verify = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ orderId: data.orderId, ...response }),
          });
          const vd = await verify.json();
          if (vd.ok) finish(data.orderId);
          else {
            setError(vd.error ?? "Payment verification failed — contact support with your payment ID.");
            setPlacing(false);
          }
        },
        modal: { ondismiss: () => setPlacing(false) },
        theme: { color: "#8a2f3a" },
      });
      rzp.open();
    } catch {
      setError("Couldn't reach the server — please try again.");
      setPlacing(false);
    }
  }

  if (!hydrated || (loading && lines.length === 0)) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-mist">Loading checkout…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold text-maroon-deep">
          Nothing to check out
        </h1>
        <p className="mt-3 text-sm text-mist">Your cart is empty.</p>
        <Link href="/collections/bracelets" className="btn btn-primary mt-6">
          Browse products
        </Link>
      </div>
    );
  }

  const razorpayConfigured = !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <h1 className="font-display text-3xl font-semibold text-maroon-deep">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-sand bg-parchment p-5">
            <h2 className="font-display text-xl font-semibold text-maroon-deep">
              Delivery address
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="name">Full name</label>
                <input id="name" className="field" required value={address.full_name} onChange={set("full_name")} autoComplete="name" />
              </div>
              <div>
                <label className="field-label" htmlFor="phone">Phone (for order updates)</label>
                <input id="phone" className="field" required inputMode="numeric" value={address.phone} onChange={set("phone")} autoComplete="tel" placeholder="10-digit mobile" />
              </div>
              <div>
                <label className="field-label" htmlFor="email">Email (optional)</label>
                <input id="email" className="field" type="email" value={address.email} onChange={set("email")} autoComplete="email" />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="line1">Address line 1</label>
                <input id="line1" className="field" required value={address.line1} onChange={set("line1")} autoComplete="address-line1" />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="line2">Address line 2 (optional)</label>
                <input id="line2" className="field" value={address.line2} onChange={set("line2")} autoComplete="address-line2" />
              </div>
              <div>
                <label className="field-label" htmlFor="city">City</label>
                <input id="city" className="field" required value={address.city} onChange={set("city")} autoComplete="address-level2" />
              </div>
              <div>
                <label className="field-label" htmlFor="state">State</label>
                <input id="state" className="field" required value={address.state} onChange={set("state")} autoComplete="address-level1" />
              </div>
              <div>
                <label className="field-label" htmlFor="pincode">Pincode</label>
                <input id="pincode" className="field" required inputMode="numeric" maxLength={6} value={address.pincode} onChange={set("pincode")} autoComplete="postal-code" />
                {cod && (
                  <p className={`mt-1.5 text-xs font-bold ${cod.ok ? "text-jade" : "text-gold"}`}>
                    {cod.ok ? "✓ Cash on Delivery available at this pincode" : cod.reason}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-sand bg-parchment p-5">
            <h2 className="font-display text-xl font-semibold text-maroon-deep">Payment</h2>
            <div className="mt-4 space-y-3">
              <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${method === "razorpay" ? "border-maroon bg-parchment/50" : "border-sand"}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={method === "razorpay"}
                  onChange={() => setMethod("razorpay")}
                  className="mt-1 accent-[#5b1d22]"
                />
                <span>
                  <span className="block text-sm font-bold text-maroon-deep">
                    Pay online — UPI, cards, netbanking, wallets
                  </span>
                  <span className="block text-xs text-mist">
                    Secure payment via Razorpay.
                    {!razorpayConfigured &&
                      " (Dev mode: gateway keys not configured — payment will be simulated.)"}
                  </span>
                </span>
              </label>
              <label className={`flex items-start gap-3 rounded-xl border p-4 ${cod && !cod.ok ? "cursor-not-allowed opacity-60" : "cursor-pointer"} ${method === "cod" ? "border-maroon bg-parchment/50" : "border-sand"}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={method === "cod"}
                  disabled={!!cod && !cod.ok}
                  onChange={() => setMethod("cod")}
                  className="mt-1 accent-[#5b1d22]"
                />
                <span>
                  <span className="block text-sm font-bold text-maroon-deep">
                    Cash on Delivery
                  </span>
                  <span className="block text-xs text-mist">
                    We confirm COD orders on WhatsApp before dispatch. Available up to{" "}
                    {formatINR(codCap)} on serviceable pincodes.
                  </span>
                </span>
              </label>
            </div>
          </section>

          {error && (
            <p role="alert" className="rounded-xl border border-maroon/30 bg-maroon/5 p-4 text-sm font-bold text-maroon">
              {error}
            </p>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-sand bg-parchment p-5">
          <h2 className="font-display text-xl font-semibold text-maroon-deep">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {lines.map((l) => (
              <li key={`${l.productId}:${l.variantId}`} className="flex justify-between gap-3">
                <span className="text-ink">
                  {l.name}
                  {l.variant_name ? ` (${l.variant_name})` : ""} ×{l.qty}
                </span>
                <span className="shrink-0 font-bold">{formatINR(l.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-sand pt-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist">Subtotal</dt>
              <dd className="font-bold">{formatINR(subtotal)}</dd>
            </div>
            {promoCode && (
              <div className="flex justify-between text-xs text-mist">
                <dt>Promo {promoCode}</dt>
                <dd>applied at payment</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-mist">Shipping</dt>
              <dd className="font-bold">{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-sand pt-2 text-base">
              <dt className="font-bold text-maroon-deep">To pay</dt>
              <dd className="font-bold text-maroon-deep">{formatINR(estTotal)}</dd>
            </div>
          </dl>
          <button type="submit" className="btn btn-primary mt-5 w-full" disabled={placing}>
            {placing
              ? "Placing order…"
              : method === "cod"
                ? "Place COD order"
                : "Pay & place order"}
          </button>
          <p className="mt-3 text-center text-xs text-mist">
            By placing this order you agree to our{" "}
            <Link href="/policies/terms" className="underline">terms</Link> and{" "}
            <Link href="/policies/returns" className="underline">replacement policy</Link>.
          </p>
        </aside>
      </form>
      <div className="h-6" />
    </div>
  );
}
