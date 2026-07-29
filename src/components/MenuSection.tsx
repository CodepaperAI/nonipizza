"use client";

import { useMemo, useState } from "react";
import { Pill } from "./ui/Pill";
import { ProductCard } from "./ProductCard";
import { Button } from "./ui/Button";
import { menuItems, type MenuCategoryId, type MenuItem } from "@/data/menu";
import type { Accent } from "@/data/deals";

/**
 * "PICK YOUR CRAVING" menu section (DESIGN.md MenuSection). Client-side filter pills,
 * 3-across ProductCards. "HOT SELLING" = featured items.
 */

type FilterId = "hot" | MenuCategoryId;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "hot", label: "Hot Selling" },
  { id: "pizza", label: "Pizza" },
  { id: "wings", label: "Wings" },
  { id: "indian-fusion", label: "Indian Fusion" },
  { id: "salads", label: "Salads" },
  { id: "sides", label: "Sides" },
];

const ACCENTS: Accent[] = ["orange", "yellow", "sky", "pink", "red"];

const LIMIT = 6;

export function MenuSection() {
  const [active, setActive] = useState<FilterId>("hot");

  const items: MenuItem[] = useMemo(() => {
    const list =
      active === "hot"
        ? menuItems.filter((i) => i.featured)
        : menuItems.filter((i) => i.category === active);
    return list.slice(0, LIMIT);
  }, [active]);

  return (
    <section id="menu" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="text-center">
          <Pill variant="active">Menu</Pill>
          <h2 className="mt-4 font-display uppercase text-display-xl text-maroon">
            Pick Your Craving
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-body-lg text-muted">
            Every bite hits different. Choose your category and feast.
          </p>
        </div>

        {/* Filter pills */}
        <div className="no-scrollbar mt-8 flex justify-start gap-2 overflow-x-auto pb-2 sm:justify-center sm:flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              className={`shrink-0 rounded-full px-4 py-2 text-label font-bold uppercase transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                active === f.id
                  ? "bg-yellow text-maroon"
                  : "bg-white text-maroon ring-1 ring-maroon/15 hover:bg-cream-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ProductCard key={item.id} item={item} accent={ACCENTS[i % ACCENTS.length]} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/menu" variant="filledMaroon" size="lg">
            See the full menu →
          </Button>
        </div>
      </div>
    </section>
  );
}
