import Image from "next/image";
import type { Accent } from "@/data/deals";

/**
 * Dish image. When a photo `src` is provided (see src/lib/photos.ts) it renders an
 * optimized next/image; otherwise it falls back to a branded SVG placeholder (a warm
 * gradient block with the dish name). The photo slots are AI-generated dish renders
 * (CREDITS.md) — swap in real photography at the same paths anytime.
 */

const ACCENT_HEX: Record<Accent, string> = {
  orange: "#F26B21",
  yellow: "#F5C518",
  sky: "#7FD1E8",
  pink: "#F4A9C4",
  red: "#D93A2B",
};

export function DishImage({
  name,
  accent = "orange",
  src,
  className = "",
  rounded = "rounded-2xl",
  sizes = "(max-width: 640px) 100vw, 400px",
  priority = false,
}: {
  name: string;
  accent?: Accent;
  /** Real photo path under /public. Falls back to the SVG placeholder when omitted. */
  src?: string;
  className?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        <Image
          src={src}
          alt={name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const hex = ACCENT_HEX[accent];
  return (
    <div
      role="img"
      aria-label={`${name} — photo placeholder`}
      className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${hex} 0%, #4B0D12 100%)` }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        <defs>
          <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#F7F1E1" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#dots)" />
      </svg>
      <span className="relative z-10 px-4 text-center font-display text-lg uppercase leading-none tracking-wide text-cream text-shadow-hero">
        {name}
      </span>
    </div>
  );
}
