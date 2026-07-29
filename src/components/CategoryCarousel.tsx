import Link from "next/link";
import { DishImage } from "./DishImage";
import { categoryPhoto } from "@/lib/photos";
import { menuCategories } from "@/data/menu";

/**
 * Horizontal row of tall category cards that bleed off both edges (DESIGN.md
 * CategoryCarousel). Each card links to its menu section / landing page.
 */

const CATEGORY_LINKS: Record<string, string> = {
  pizza: "/menu#pizza",
  wings: "/chicken-wings-woodstock",
  "indian-fusion": "/indian-fusion-pizza-woodstock",
  panzerotti: "/menu#panzerotti",
  sides: "/menu#sides",
  "ice-cream": "/menu#ice-cream",
};

const BORDER: Record<string, string> = {
  orange: "border-orange",
  yellow: "border-yellow",
  sky: "border-sky",
  pink: "border-pink",
  red: "border-red",
};

export function CategoryCarousel() {
  return (
    <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8">
      {menuCategories.map((cat) => (
        <Link
          key={cat.id}
          href={CATEGORY_LINKS[cat.id] ?? "/menu"}
          className="group relative aspect-[3/4] w-44 shrink-0 snap-start overflow-hidden rounded-3xl border-4 sm:w-52 md:w-56"
          style={{}}
        >
          <span className={`absolute inset-0 rounded-[1.25rem] border-4 ${BORDER[cat.accent]}`} aria-hidden="true" />
          <DishImage
            name={cat.label}
            accent={cat.accent}
            src={categoryPhoto(cat.id)}
            rounded="rounded-2xl"
            className="h-full w-full transition group-hover:scale-105"
            sizes="(max-width: 640px) 60vw, 224px"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon via-maroon/70 to-transparent p-4 pt-10">
            <span className="block font-display text-xl uppercase leading-none text-cream">
              {cat.label}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
