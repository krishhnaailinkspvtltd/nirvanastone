# Shree Nirvan · Studio Edition (v3)

A fully client-side editorial storefront prototype: glassmorphism, perspective-based 3D card motion, responsive product grids, search, category filters, sorting, product detail pages, a persistent favourites list, and enquiry cart.

## Source data and imagery

- `all_images.zip` contains **1,625** numbered source images. The supplied `README_IMAGE_MATCHING.txt` supplies image ID, filename, product name, source category, source store, reference price, source SKU and original gallery count.
- **239 reference products** are included in the public design demo, across seven customer-facing groups. Their photographs are drawn from the user-supplied archive and are stored locally as **four image atlases** plus higher-resolution featured photographs. Each mapped product is tied to the correct numbered original image. No third-party image server requests are required.
- The other **1,386 entries** remain in `FULL_IMAGE_MATCHING_REVIEW.csv` (delivered separately in the source ZIP, not deployed publicly). This is intentional: many source images contain promotional text, trademarks, competitor names, offer language, or unverified efficacy claims.
- **No right to resell, publish or claim ownership of an image is implied by its presence in the uploaded archive.** The owner should confirm usage rights, product ownership, source SKUs, materials, supplier, final pricing, compliance and fulfilment before enabling real sales. Reference values are not Shree Nirvan selling prices.
- The website uses no claimed certification, guarantees, invented reviews, or real payment gateway.

## Pages and workflows

- Home: elevated editorial hero with product photography and pointer-responsive perspective, collection photography, curated products and a brand story.
- Shop: 239 product references, 7 categories, search, sorting and pagination (16 at a time).
- Collections: photographic discovery tiles.
- Product: photograph with source-reference price disclaimer, quantity, enquiry selection and related products.
- About, Journal, Contact, Wishlist: cohesive editorial styling and functionality.
- Shared: search drawer, navigation, mobile menu, favourites, quick look, enquiry cart, keyboard dismissal, reduced-motion support.

## Local preview

```bash
cd site
python3 -m http.server 8080
# visit http://localhost:8080
```

This static site is configured for Vercel with no framework or build step. **Do not set the Vercel Framework preset to Next.js**, since this edition is not the earlier Next.js application.

## Key files

- `css/site.css` — baseline design and original layout primitives
- `css/editorial-v3.css` — Studio Edition visual treatments and mobile refinements
- `js/site.js` — all pages, cart, search, product details, and interactions
- `data/catalog.js` — curated reference product array
- `data/settings.js` — verified business email and WhatsApp configuration (both empty until supplied)
- `assets/photography/` — compressed user-provided reference photography
- `vercel.json` — security and no-index staging headers

For production, replace the read-only reference catalog with an approved first-party inventory source and implement secured checkout, fulfilment, a persistent database, privacy and legal policies, business contacts, and media usage clearance. The site is intentionally marked `noindex` until that process is complete.

## UI/UX research applied

Research references and links are provided in `DESIGN_RESOURCES.md`. The current site remains dependency-free for stability. Its responsive layout, reduced motion handling, glass elevations, keyboard operation and performant CSS motion are inspired by the design practices in those open-source projects, without copying their code or violating third-party licenses.
