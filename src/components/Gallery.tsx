"use client";

import Image from "next/image";
import { useState } from "react";
import { isGeneratedArt } from "@/lib/catalog";
import type { ProductImage } from "@/lib/types";

/** PDP gallery — 4:5 main frame, tap/hover zoom, thumbnail rail. */
export function Gallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const img = images[i] ?? images[0];

  return (
    <div>
      <div
        className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-xl border border-sand bg-parchment"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(
            `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`,
          );
        }}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onClick={() => setZoom((z) => !z)}
      >
        <Image
          src={img.url}
          alt={img.alt || name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          unoptimized={isGeneratedArt(img.url)}
          className="object-cover transition-transform duration-200"
          style={{
            transformOrigin: origin,
            transform: zoom ? "scale(1.8)" : "scale(1)",
          }}
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((im, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Image ${idx + 1}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
              className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 ${
                idx === i ? "border-gold" : "border-sand"
              }`}
            >
              <Image
                src={im.url}
                alt=""
                fill
                sizes="64px"
                unoptimized={isGeneratedArt(im.url)}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
