import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "My account" };

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 text-center">
      <h1 className="font-display text-3xl font-semibold text-maroon-deep">My account</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
        No sign-in required to shop or track. Orders placed from this browser are
        listed under your orders; any order can be tracked with its ID and phone
        number.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/account/orders" className="btn btn-primary">My orders</Link>
        <Link href="/track-order" className="btn btn-outline">Track any order</Link>
      </div>
      <p className="mx-auto mt-8 max-w-md rounded-xl border border-sand bg-parchment/60 p-4 text-xs leading-relaxed text-mist">
        Full accounts (saved addresses, wishlist, order history across devices)
        arrive with the Supabase auth phase — nothing about your current orders
        will be lost.
      </p>
    </div>
  );
}
