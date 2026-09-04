import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAdminCatalog } from "@/lib/catalog-store";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rows = await getAdminCatalog();
  const row = rows.find((r) => r.product.id === id);
  if (!row) notFound();

  return (
    <div>
      <Link href="/admin/products" className="text-xs font-bold text-mist hover:text-gold">
        ← All products
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-deep">
        {row.product.name}
      </h1>
      <p className="mt-1 text-xs text-mist">
        {row.product.id} · /products/{row.product.slug}
        {row.custom && " · custom product"}
        {row.hidden && " · currently hidden from the store"}
      </p>
      <div className="mt-5">
        <ProductForm
          mode="edit"
          product={row.product}
          flags={{ edited: row.edited, hidden: row.hidden, custom: row.custom }}
        />
      </div>
    </div>
  );
}
