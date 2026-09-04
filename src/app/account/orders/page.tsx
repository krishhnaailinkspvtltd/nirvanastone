"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { myOrders } from "@/context/cart";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<{ id: string; at: string }[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOrders(myOrders());
    setLoaded(true);
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 pt-10">
      <h1 className="text-center font-display text-3xl font-semibold text-maroon-deep">
        My orders
      </h1>
      <p className="mt-2 text-center text-sm text-mist">
        Orders placed from this browser. For any other order, use{" "}
        <Link href="/track-order" className="font-bold text-gold hover:underline">
          Track order
        </Link>.
      </p>

      {loaded && orders.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-sm text-mist">No orders from this browser yet.</p>
          <Link href="/collections/bracelets" className="btn btn-primary mt-5">
            Start shopping
          </Link>
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {orders.map((o) => (
          <li key={o.id}>
            <Link
              href={`/order/${o.id}`}
              className="lift flex items-center justify-between rounded-xl border border-sand bg-parchment p-4"
            >
              <span className="font-bold text-maroon-deep">{o.id}</span>
              <span className="text-xs text-mist">
                {new Date(o.at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-10" />
    </div>
  );
}
