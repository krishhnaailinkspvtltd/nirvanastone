# Shree Nirvan — Website Redesign

Responsive static storefront with Home, Shop, Collections, Product, About, Journal, Contact and Wishlist pages.

## Local preview

Run `python3 -m http.server 8080` from the repository root and visit http://localhost:8080.

## Deployment

The repository is linked to Vercel projects `nirvanastone` and `stonenirvan`. This static redesign replaces the previous Next.js source. Vercel framework should be set to Other (`null`) with no build command.

## Scope

This is a front-end demo: product photos are local illustrations, prices are for review, cart and wishlist use browser localStorage, and checkout is an enquiry flow rather than a payment service. Set verified business details in `data/settings.js` before live enquiries. A `noindex` Vercel header prevents indexing until approved.

## Backup

The previous Next.js source is preserved at branch `backup-before-shreenirvan-redesign-2026-11-04`.
