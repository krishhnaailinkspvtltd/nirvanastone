import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div>
      <Link href="/admin/products" className="text-xs font-bold text-mist hover:text-gold">
        ← All products
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-deep">
        Add product
      </h1>
      <div className="mt-5">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
