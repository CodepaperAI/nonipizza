import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { CategoryCarousel } from "./CategoryCarousel";
import { siteConfig } from "@/lib/site";

/** Homepage hero (DESIGN.md Hero). Maroon bg, huge stacked headline, two CTAs, carousel. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-maroon text-cream">
      {/* warm radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(242,107,33,0.25) 0%, rgba(75,13,18,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-container px-5 pb-10 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display uppercase text-display-hero text-shadow-hero">
            Crave it.
            <br />
            Tap it.
            <br />
            <span className="text-orange">Devour it.</span>
          </h1>
          <div className="mt-6 flex justify-center">
            <Badge>⚡ Delivered fast — freshly made to order.</Badge>
          </div>
          <p className="mx-auto mt-5 max-w-xl text-body-lg text-cream/85">
            Locally owned pizza, baked wings, shawarma & bold Indian-fusion pizzas in
            Woodstock. {siteConfig.tagline}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={siteConfig.orderUrl} external variant="filled" size="lg">
              Order Now →
            </Button>
            <Button href="/deals" variant="outline" size="lg">
              View Deals
            </Button>
          </div>
        </div>
      </div>

      {/* Category carousel bleeds off both edges */}
      <div className="relative pb-14">
        <CategoryCarousel />
      </div>
    </section>
  );
}
