"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/cart";

/** App-style bottom navigation on mobile (hidden on product pages,
 *  where the sticky buy bar takes over — see globals.css). */
const TABS = [
  {
    href: "/",
    label: "Home",
    icon: <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" />,
  },
  {
    href: "/collections/rudraksha",
    label: "Shop",
    icon: <path d="M4 7h16M4 7l1.5 13h13L20 7M9 10V5a3 3 0 016 0v5" />,
  },
  {
    href: "/recommend",
    label: "AI Guide",
    icon: <path d="M12 3l1.8 4.7L18.5 9l-4.7 1.8L12 15.5l-1.8-4.7L5.5 9l4.7-1.3zM18 15l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z" />,
  },
  {
    href: "/verify-certificate",
    label: "Verify",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6zM9 12l2 2 4-4" />,
  },
  {
    href: "/cart",
    label: "Cart",
    icon: <path d="M6 7h12l1.5 13h-15L6 7zM9 10V6a3 3 0 016 0v4" />,
    badge: true,
  },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();

  return (
    <nav
      aria-label="Bottom navigation"
      className="mobile-tabbar fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-night/92 backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {TABS.map((t) => {
          const active =
            t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                className={`relative flex flex-col items-center gap-0.5 py-2 text-[10px] font-bold ${
                  active ? "text-gold" : "text-mist"
                }`}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {t.icon}
                </svg>
                {t.label}
                {t.badge && hydrated && count > 0 && (
                  <span className="absolute right-[calc(50%-20px)] top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-[#2b1608]">
                    {count}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
