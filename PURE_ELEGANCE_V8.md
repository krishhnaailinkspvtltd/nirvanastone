# Shree Nirvan — Pure Elegance v8

Approved Design B, converted into native responsive HTML/CSS/JS. The homepage includes a cream-and-emerald visual palette, animated golden orbits, new loading screen, interactive Zodiac selector, scroll reveals, hover/magnetic button effects, and curated collections. The storefront's original search, wishlist, product pages, and enquiry-cart actions remain in `js/site.js`.

## Source and image notes

The abstract gemstone hero and decorative motif crops in `assets/pure-elegance/` were extracted from the two original AI-generated concepts approved in the conversation. They are **illustrative, not photographs of merchandise for sale**; a buyer must inspect the actual product before ordering. Photos in `assets/photography/` and `assets/zodiac/` remain reference material pending seller approval and image-usage rights confirmation. No unverified material certifications or medical claims are advertised. Real checkout is not enabled.

## Motion and accessibility

Pure JS/CSS animations: scroll-reveal IntersectionObserver, keyframe gold orbits and shimmer, requestAnimationFrame pointer parallax on capable devices, CTA magnetic hover, Zodiac photo switch. Respects `prefers-reduced-motion`, data-saver mode, touch fallbacks. Introduction is automatically skipped after first view per session and has a visible SKIP INTRO button.

## Run

From the project root: `python3 -m http.server 8080`, then open `http://localhost:8080/`. Vercel uses a no-build static deployment.
