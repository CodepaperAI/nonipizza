import { DishImage } from "./DishImage";
import { Button } from "./ui/Button";
import { siteConfig } from "@/lib/site";
import { itemPhoto } from "@/lib/photos";
import { price, startingPrice, type MenuItem } from "@/data/menu";
import type { Accent } from "@/data/deals";

/**
 * Product card (DESIGN.md ProductCard): image, bold name, truncated description,
 * big orange price bottom-left, maroon "ORDER NOW" bottom-right.
 */
export function ProductCard({
  item,
  accent = "orange",
}: {
  item: MenuItem;
  accent?: Accent;
}) {
  const from = item.variants.length > 1;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full">
        <DishImage
          name={item.name}
          accent={accent}
          src={itemPhoto(item)}
          rounded="rounded-none"
          className="h-full w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
        />
        {item.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-red px-3 py-1 text-label font-bold uppercase text-white">
            New
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-heading-md font-display uppercase leading-tight text-maroon">
          {item.name}
        </h3>
        {item.description && (
          <p className="mt-2 line-clamp-2 text-body-sm text-muted">{item.description}</p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((t) => (
              <span key={t} className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs text-maroon">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="font-display text-display-lg leading-none text-orange">
            {from && <span className="mr-1 align-top text-sm text-muted">from</span>}
            {price(startingPrice(item))}
          </p>
          <Button href={siteConfig.orderUrl} external variant="filledMaroon" size="sm" ariaLabel={`Order ${item.name}`}>
            Order Now
          </Button>
        </div>
      </div>
    </article>
  );
}
