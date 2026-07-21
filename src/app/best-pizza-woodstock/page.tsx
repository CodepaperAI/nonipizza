import { PageHero } from "@/components/PageHero";
import { ContentSections } from "@/components/ContentSections";
import { WhyNoni } from "@/components/landing/WhyNoni";
import { PriceTable } from "@/components/landing/PriceTable";
import { HowToOrder, DEFAULT_ORDER_STEPS } from "@/components/landing/HowToOrder";
import { FactsBlock } from "@/components/landing/FactsBlock";
import { InternalLinks } from "@/components/landing/InternalLinks";
import { NapMap } from "@/components/landing/NapMap";
import { Faq } from "@/components/Faq";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd, howToJsonLd } from "@/lib/jsonld";
import { LAST_UPDATED } from "@/lib/cluster";
import { getItemById } from "@/data/menu";
import type { MenuItem } from "@/data/menu";
import { primaryLocation } from "@/data/locations";

const PATH = "/best-pizza-woodstock";

export const metadata = buildMetadata({
  title: "Best Pizza in Woodstock, ON | Noni's Pizza & Wings",
  description:
    "Looking for the best pizza in Woodstock, ON? Noni's makes it fresh, never pre-cooked — signature, Indian-fusion & build-your-own pizzas. Order online for pickup or delivery.",
  path: PATH,
});

const items = [
  "pizza-butter-chicken",
  "pizza-meat-lover",
  "pizza-woodstock-special",
  "pizza-chicken-shawarma",
  "pizza-tandoori-paneer",
  "pizza-create-your-own",
]
  .map(getItemById)
  .filter(Boolean) as MenuItem[];

const faqs = [
  {
    q: "What makes the best pizza in Woodstock?",
    a: "The best pizza is made fresh, not reheated. At Noni's every pizza is freshly prepared, never pre-cooked, with dough, sauces and toppings built to order — plus unique Indian-fusion options you won't find at the chains.",
  },
  {
    q: "Which is Noni's best pizza?",
    a: "Favourites include the Butter Chicken Indian-fusion pizza, the four-meat Meat Lover, and the Woodstock Special (bacon, pepperoni, pancetta). Or build your own exactly how you like it.",
  },
  {
    q: "Where can I find good pizza near me in Woodstock?",
    a: `Noni's Pizza & Wings is at ${primaryLocation.street}, ${primaryLocation.unit}, Woodstock, ON — open until 11 PM (2 AM Fri–Sat) for pickup, dine-in and delivery.`,
  },
  {
    q: "Does the best pizza cost more?",
    a: "Not here. Build-your-own pizzas start at $8.99 for a small and specialty pizzas from $14.99, so fresh, made-to-order pizza stays affordable.",
  },
  {
    q: "Do you make gluten-free or vegetarian pizza?",
    a: "Yes — gluten-free crust is available (medium), and there are several vegetarian pizzas including Garden, Greek, 3 Cheese and our paneer Indian-fusion pizzas.",
  },
  {
    q: "Can I order the best pizza for delivery?",
    a: "Yes — order online for delivery or pickup. Free delivery within 3 km on orders over $25 after 3 PM.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Best Pizza in Woodstock", path: PATH },
          ]),
          faqJsonLd(faqs),
          howToJsonLd({
            name: "How to order Noni's pizza in Woodstock",
            description: "Order fresh, made-to-order pizza in Woodstock in four steps.",
            steps: DEFAULT_ORDER_STEPS,
          }),
        ]}
      />
      <PageHero
        eyebrow="Best Pizza"
        title="The Best Pizza in Woodstock, ON — Freshly Made, Never Pre-Cooked"
        lead="Noni's Pizza & Wings makes some of the best pizza in Woodstock, ON — freshly prepared and never pre-cooked, from signature and Indian-fusion pizzas to fully custom build-your-own. Locally owned, made to order for pickup, dine-in or delivery. Open until 11 PM (2 AM Fri–Sat). Order online or call (519) 290-9555."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Best Pizza", path: PATH },
        ]}
        showPhone
        lastUpdated={LAST_UPDATED}
      />

      <ContentSections
        blocks={[
          {
            heading: "What makes a pizza the best?",
            body: [
              "Noni's Pizza & Wings is a locally owned pizza, wings and shawarma restaurant in Woodstock, Ontario. We think the best pizza — and the good pizza people search for near them — comes down to one thing: freshness. Everything is freshly prepared, never pre-cooked, and built to order.",
              "That means real dough, sauces made in-house, and toppings added the moment you order — not pizzas sitting under a warmer. It's a difference you can taste in every slice.",
            ],
          },
          {
            heading: "Best pizza near me — plus flavours the chains don't have",
            body: [
              "Beyond the classics, Noni's makes Indian-fusion pizzas (butter chicken, tandoori paneer, spicy chicken) that set us apart in Woodstock. Prefer to design your own? Build-your-own gives you any crust, sauce and up to four toppings.",
              "Pair a pizza with baked wings or a shawarma platter for a full spread.",
            ],
          },
        ]}
      />

      <WhyNoni
        heading="Why Noni's is a top pizza pick in Woodstock"
        facts={[
          "Freshly prepared, never pre-cooked — made to order, not reheated.",
          "Signature four-topping pizzas and three-topping specialty pizzas.",
          "Unique Indian-fusion pizzas: butter chicken, tandoori paneer, spicy chicken.",
          "Build-your-own with any crust, sauce and toppings — gluten-free available.",
          "Baked wings, panzerotti, shawarma & Kawartha ice cream round out the menu.",
          "Locally owned in Woodstock, Ontario, at fair prices.",
        ]}
      />

      <PriceTable
        items={items}
        heading="Top pizzas & prices"
        caption="Some of the most-loved pizzas at Noni's."
      />
      <HowToOrder heading="How to order Noni's pizza" />
      <FactsBlock />
      <Faq faqs={faqs} heading="Best pizza in Woodstock — frequently asked questions" />
      <InternalLinks currentPath={PATH} />
      <NapMap />
      <OrderCTA heading="Taste the difference" sub="Fresh, made-to-order pizza — pickup or delivery in Woodstock." />
    </>
  );
}
