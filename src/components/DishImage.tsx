import type { Accent } from "@/data/deals";

/**
 * Branded SVG placeholder for a dish (DESIGN.md §7). v1 renders a warm gradient block
 * with the dish name + a plate glyph so every layout is complete without shipping
 * copyrighted stock. The `src` in menu/deals data names the slot for the real photo.
 *
 * To go live with real photos: drop a JPEG at the slot path and swap this for
 * <Image src={src} .../> (next/image) — see README.
 */

const ACCENT_HEX: Record<Accent, string> = {
  orange: "#F26B21",
  yellow: "#F5C518",
  sky: "#7FD1E8",
  pink: "#F4A9C4",
  red: "#D93A2B",
};

const GLYPHS: Record<string, string> = {
  pizza: "M12 2 2 22h20L12 2Z",
};

export function DishImage({
  name,
  accent = "orange",
  className = "",
  rounded = "rounded-2xl",
}: {
  name: string;
  accent?: Accent;
  className?: string;
  rounded?: string;
}) {
  const hex = ACCENT_HEX[accent];
  return (
    <div
      role="img"
      aria-label={`${name} — photo placeholder`}
      className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${hex} 0%, #4B0D12 100%)`,
      }}
    >
      {/* decorative dots pattern */}
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

export { GLYPHS };
