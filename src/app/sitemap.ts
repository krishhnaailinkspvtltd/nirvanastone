import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { blogPosts } from "@/data/blog";
import { getCatalog } from "@/lib/catalog-store";
import {
  CATEGORY_SLUGS,
  PLANET_SLUGS,
  PURPOSE_SLUGS,
  ZODIAC_SLUGS,
} from "@/lib/taxonomy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProducts = await getCatalog();
  const u = (path: string) => ({ url: `${site.url}${path}` });
  return [
    u("/"),
    u("/recommend"),
    u("/verify-certificate"),
    u("/blog"),
    u("/about"),
    u("/faq"),
    u("/contact"),
    u("/track-order"),
    ...CATEGORY_SLUGS.map((c) => u(`/collections/${c}`)),
    ...PURPOSE_SLUGS.map((p) => u(`/collections/purpose/${p}`)),
    ...ZODIAC_SLUGS.map((z) => u(`/collections/zodiac/${z}`)),
    ...PLANET_SLUGS.map((p) => u(`/collections/planet/${p}`)),
    ...allProducts.map((p) => u(`/products/${p.slug}`)),
    ...blogPosts.map((b) => u(`/blog/${b.category}/${b.slug}`)),
    ...["shipping", "returns", "privacy", "terms"].map((p) => u(`/policies/${p}`)),
  ];
}
