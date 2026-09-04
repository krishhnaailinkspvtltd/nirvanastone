import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { adminPassword, isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { isDefault } = adminPassword();

  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 pt-6">
      <aside className="hidden w-48 shrink-0 md:block">
        <p className="eyebrow px-3">Store manager</p>
        <nav className="mt-3 space-y-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block rounded-lg px-3 py-2 text-sm font-bold text-ink hover:bg-parchment hover:text-gold"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm font-bold text-mist hover:bg-parchment hover:text-gold"
          >
            ← View store
          </Link>
        </nav>
        <div className="mt-4 px-0">
          <LogoutButton />
        </div>
      </aside>

      <div className="min-w-0 flex-1 pb-10">
        {/* Mobile nav */}
        <nav className="scroller -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="shrink-0 rounded-full border border-sand bg-parchment px-3.5 py-1.5 text-xs font-bold text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {isDefault && (
          <p className="mb-4 rounded-xl border border-gold/40 bg-gold/10 p-3 text-xs font-bold text-gold">
            Running on the default admin password — set ADMIN_PASSWORD in the
            environment (Vercel → Settings → Environment Variables) before real
            orders flow.
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
