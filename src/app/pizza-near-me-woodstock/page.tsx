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
import { formattedAddress, primaryLocation } from "@/data/locations";

const PATH = "/pizza-near-me-woodstock";

export const metadata = buildMetadata({
  title: "Pizza Near Me in Woodstock, ON | Noni's Pizza & Wings",
  description:
    "Pizza near me in Woodstock? Noni's Pizza & Wings makes specialty, Indian-fusion & build-your-own pizzas fresh to order for pickup, dine-in or delivery. Order online.",
  path: PATH,
});

const items = [
  "pizza-woodstock-special",
  "pizza-meat-lover",
  "pizza-butter-chicken",
  "pizza-hawaiian",
  "pizza-chicken-shawarma",
  "pizza-create-your-own",
]
  .map(getItemById)
  .filter(Boolean) as MenuItem[];

const faqs = [
  {
    q: "Is there a good pizza place near me in Woodstock?",
    a: `Yes — Noni's Pizza & Wings is at ${formattedAddress}, central to Woodstock and easy to reach for pickup, dine-in or delivery. Every pizza is freshly prepared, never pre-cooked.`,
  },
  {
    q: "Does Noni's deliver pizza near me?",
    a: `We do. Delivery within ${primaryLocation.delivery.radiusKm} km on orders over $${primaryLocation.delivery.minSubtotal}, plus pickup and dine-in.`,
  },
  {
    q: "What kind of pizza does Noni's make?",
    a: "Specialty pizzas (three toppings), signature pizzas (four toppings), Indian-fusion pizzas (butter chicken, tandoori, spicy paneer), veggie pizzas, and a full build-your-own with gluten-free crust available.",
  },
  {
    q: "How late is Noni's open near me?",
    a: "We're open until 11 PM Sunday to Thursday and until 2 AM Friday and Saturday, so late-night pizza cravings are covered.",
  },
  {
    q: "How much does a pizza cost?",
    a: "Build-your-own pizzas start at $8.99 for a small; specialty and Indian-fusion pizzas start around $14.99. See the menu for full pricing by size.",
  },
  {
    q: "Can I get vegetarian pizza near me?",
    a: "Yes — Garden, Greek, 3 Cheese and our paneer Indian-fusion pizzas (Butter Paneer, Tandoori Paneer, Spicy Paneer) are all vegetarian.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pizza Near Me in Woodstock", path: PATH },
          ]),
          faqJsonLd(faqs),
          howToJsonLd({
            name: "How to order pizza from Noni's Pizza & Wings",
            description: "Order pizza near you in Woodstock for pickup or delivery.",
            steps: DEFAULT_ORDER_STEPS,
          }),
        ]}
      />
      <PageHero
        eyebrow="Pizza Near Me"
        title="Pizza Near Me in Woodstock, ON — Noni's Pizza & Wings"
        lead="Noni's Pizza & Wings is a locally owned pizza restaurant at 300 Main St, Unit 8, Woodstock, ON. Searching for pizza near me? We make specialty, Indian-fusion and build-your-own pizzas fresh to order for pickup, dine-in or delivery. Open until 11 PM (2 AM Fri–Sat). Order online or call (519) 290-9555."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Pizza Near Me", path: PATH },
        ]}
        showPhone
        lastUpdated={LAST_UPDATED}
      />

      <ContentSections
        blocks={[
          {
            heading: "Your local pizza place in Woodstock",
            body: [
              "Noni's Pizza & Wings is a locally owned pizza and wings restaurant in Woodstock, Ontario. When people nearby search for pizza places near me or pizza restaurants close to me, they want fresh, hot and fast — not frozen and reheated. That's exactly what we do: freshly prepared, never pre-cooked, made just for you.",
              "You'll find us on Main Street, an easy trip from anywhere in Woodstock whether you're picking up, dining in, or having it delivered to your door.",
            ],
          },
          {
            heading: "Pizza near me — fresh, fast and made your way",
            body: [
              "Choose a specialty pizza like the Woodstock Special or Meat Lover, go bold with an Indian-fusion butter chicken pizza, or build your own with any sauce, crust and up to four toppings (gluten-free crust available).",
              "Pair it with baked wings or handcrafted panzerotti, then order online in a couple of taps.",
            ],
          },
        ]}
      />

      <WhyNoni />
      <PriceTable
        items={items}
        heading="Popular pizzas near you"
        caption="A quick taste of what Woodstock is ordering right now."
      />
      <HowToOrder />
      <FactsBlock />
      <Faq faqs={faqs} heading="Pizza near me — questions Woodstock asks" />
      <InternalLinks currentPath={PATH} />
      <NapMap />
      <OrderCTA heading="Pizza near you, made to order" />
    </>
  );
}
