import { ProductCard } from "./ProductCard";
import type { MenuItem } from "@/data/menu";
import type { Accent } from "@/data/deals";

const ACCENTS: Accent[] = ["orange", "yellow", "sky", "pink", "red"];

/** A titled grid of ProductCards, for landing-page previews. */
export function ProductGrid({
  items,
  heading,
  intro,
  id,
}: {
  items: MenuItem[];
  heading?: string;
  intro?: string;
  id?: string;
}) {
  if (!items.length) return null;
  return (
    <section id={id} className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        {heading && (
          <h2 className="font-display uppercase text-display-lg text-maroon">{heading}</h2>
        )}
        {intro && <p className="mt-2 max-w-2xl text-muted">{intro}</p>}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ProductCard key={item.id} item={item} accent={ACCENTS[i % ACCENTS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}
