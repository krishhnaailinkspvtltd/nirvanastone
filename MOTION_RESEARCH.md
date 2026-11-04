# Shree Nirvan — Cinematic Motion v5

This is an original Shree Nirvan design informed by the structure of Carysil's publicly visible homepage (large collection campaigns, editorial category navigation, showcased products, and storytelling), not a pixel-for-pixel copy or extracted proprietary code/assets. No Carysil media is included.

## Open-source references and their roles

- **GSAP / ScrollTrigger** — https://github.com/greensock/GSAP — optional scroll-scrubbed movement and horizontal gallery pinning. CDN version pinned to 3.15.0.
- **Lenis** — https://github.com/darkroomengineering/lenis — optional desktop smooth scrolling; pinned 1.3.27.
- **Three.js** — https://github.com/mrdoob/three.js — lazy-loaded interactive faceted gemstone; pinned module 0.181.2.
- **Codrops 3DStackMotion** — https://github.com/codrops/3DStackMotion — inspiration for perspective presentation, not copied code.
- **Codrops ElasticGridScroll** — https://github.com/codrops/ElasticGridScroll — inspiration for differentiated product-image scroll speeds.
- **Codrops ScrollTextMotion** — https://github.com/codrops/ScrollTextMotion — inspiration for editorial text reveal.
- **Codrops SeamTransitions** — https://github.com/codrops/SeamTransitions — inspiration for section changeover choreography.
- **Crawlee** — https://github.com/apify/crawlee — potential tool for inspecting pages and assets where authorized, *not used to copy Carysil*.
- **Playwright** — https://github.com/microsoft/playwright — used for local visual and interaction QA.

## New original components

- Curtain-style brand preloader, with timeout fallback and reduced-motion bypass.
- Three-slide cinematic collection presentation (original composited media and local product photos).
- Scroll-responsive, individually illuminated manifesto words.
- Lazy WebGL faceted amethyst sculpture (3D) with product-photo fallback, visible only when near viewport.
- Five-card cinematic horizontal lookbook. Pin/scrub on desktops if GSAP loads; touch-first native scroll with snap on mobile.
- Non-blocking progressive-enhancement integrations of GSAP, ScrollTrigger, Lenis, and Three.js. Native CSS/JS continues to work without external CDN access.

## Performance and accessibility

No React migration and no build step are required. Noncritical libraries load after storefront content, with timeouts and graceful fallback. 3D is not loaded on data-saving, touch, or reduced-motion devices. Focus-visible states and readable links remain functional. Product imagery and prices are for client review only; checkout is still an enquiry flow.

## Licensing

GSAP has its own Standard License; check its terms before commercial production deployment. The code does not bundle GSAP or any third-party sample code. Image composites were created locally from the product photo archive supplied by the site owner; verify image usage rights before a commercial release.
