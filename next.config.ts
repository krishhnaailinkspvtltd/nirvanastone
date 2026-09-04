import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for the Docker + Cloudflare Tunnel deploy pattern.
  output: "standalone",
  // Production builds (`next build` / `next start`) use their own output dir
  // so running a build never corrupts the dev server's .next cache —
  // mixing the two was breaking `npm run dev` with ENOENT chunk errors.
  distDir: process.env.NODE_ENV === "production" ? ".next-prod" : ".next",
  images: {
    // Product imagery: free-license Unsplash representative photos (see
    // src/data/photos.ts) + the local /api/placeholder SVG spec-art.
    // When real product photography lands (see catalog/core.ts TODO block),
    // add its CDN / Supabase Storage host here too.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
