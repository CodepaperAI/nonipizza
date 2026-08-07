import { DishImage } from "./DishImage";
import { Button } from "./ui/Button";
import { siteConfig } from "@/lib/site";
import { dealPhoto } from "@/lib/photos";
import { price } from "@/data/menu";
import type { Deal, Accent } from "@/data/deals";

/** Colorful deal card (DESIGN.md DealCard). Accent-tinted background. */

const BG: Record<Accent, string> = {
  orange: "bg-orange text-white",
  yellow: "bg-yellow text-maroon",
  sky: "bg-sky text-maroon",
  pink: "bg-pink text-maroon",
  red: "bg-red text-white",
};

export function DealCard({ deal }: { deal: Deal }) {
  const light = deal.accent === "yellow" || deal.accent === "sky" || deal.accent === "pink";
  const priceColor = light ? "text-maroon" : "text-white";
  const from = deal.prices.length > 1;
  return (
    <article className={`flex flex-col overflow-hidden rounded-3xl shadow-card ${BG[deal.accent]}`}>
      <div className="relative aspect-[16/9] w-full">
        <DishImage
          name={deal.name}
          accent={deal.accent}
          src={dealPhoto(deal)}
          rounded="rounded-none"
          className="h-full w-full"
          sizes="(max-width: 768px) 100vw, 580px"
        />
        {typeof deal.save === "number" && (
          <span className="absolute right-3 top-3 rounded-full bg-maroon px-3 py-1 text-label font-bold uppercase text-cream">
            Save ${deal.save}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {deal.blurb && (
          <span className="text-label font-bold uppercase opacity-70">{deal.blurb}</span>
        )}
        <h3 className="mt-1 font-display text-heading-md uppercase leading-tight">{deal.name}</h3>
        {deal.includes.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm opacity-90">
            {deal.includes.map((line) => (
              <li key={line} className="flex gap-2">
                <span aria-hidden="true">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          {deal.prices.length > 0 && (
            <p className={`font-display text-4xl leading-none ${priceColor}`}>
              {from && <span className="mr-1 align-top text-sm opacity-70">from</span>}
              {price(Math.min(...deal.prices.map((p) => p.price)))}
              {deal.wasPrice && (
                <span className="ml-2 align-middle text-lg font-body line-through opacity-60">
                  {price(deal.wasPrice)}
                </span>
              )}
            </p>
          )}
          <Button href={siteConfig.orderUrl} external variant="filledMaroon" size="sm" ariaLabel={`Grab deal: ${deal.name}`}>
            Grab Deal
          </Button>
        </div>
      </div>
    </article>
  );
}
