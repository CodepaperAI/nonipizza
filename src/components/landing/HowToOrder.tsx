import { Button } from "../ui/Button";
import { siteConfig } from "@/lib/site";
import { primaryLocation } from "@/data/locations";

const phone = primaryLocation.phones[0];

/** Default order steps — mirror these in howToJsonLd() on the page for HowTo schema. */
export const DEFAULT_ORDER_STEPS = [
  {
    name: "Browse the menu",
    text: "Open the online menu and pick your pizzas, wings, shawarma or sides — or build your own pizza with any crust, sauce and toppings.",
  },
  {
    name: "Add to cart",
    text: "Choose your sizes and quantities and add each item to your cart. Add a combo deal to save.",
  },
  {
    name: "Choose pickup or delivery",
    text: "Select pickup at 300 Main St, Unit 8, Woodstock, or delivery to your address. Free delivery within 3 km on orders over $25 after 3 PM.",
  },
  {
    name: "Check out",
    text: "Enter your details, apply any coupon code and place your order. We start making it fresh right away.",
  },
];

/** Numbered HowTo steps (visible). Pair with howToJsonLd() using the same step data. */
export function HowToOrder({
  heading = "How to order from Noni's",
  steps = DEFAULT_ORDER_STEPS,
}: {
  heading?: string;
  steps?: { name: string; text: string }[];
}) {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display uppercase text-display-lg text-maroon">{heading}</h2>
        <ol className="mt-6 space-y-4">
          {steps.map((s, i) => (
            <li key={s.name} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange font-display text-lg text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-maroon">{s.name}</h3>
                <p className="mt-1 text-ink/90">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={siteConfig.orderUrl} external variant="filled" size="lg">
            Order Now →
          </Button>
          <Button href={`tel:${phone.replace(/[^\d]/g, "")}`} variant="outlineMaroon" size="lg">
            Call {phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
