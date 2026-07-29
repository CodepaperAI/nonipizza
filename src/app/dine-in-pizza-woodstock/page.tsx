import { PageHero } from "@/components/PageHero";
import { ContentSections } from "@/components/ContentSections";
import { WhyNoni } from "@/components/landing/WhyNoni";
import { PriceTable } from "@/components/landing/PriceTable";
import { HowToOrder } from "@/components/landing/HowToOrder";
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

const PATH = "/dine-in-pizza-woodstock";

export const metadata = buildMetadata({
  title: "Dine-In Pizza in Woodstock, ON | Noni's Pizza & Wings",
  description:
    "Dine-in pizza in Woodstock, ON at Noni's Pizza & Wings, 300 Main St, Unit 8. Fresh pizza, wings & panzerotti to eat in. Open until 11 PM (2 AM Fri–Sat). Pickup & delivery too.",
  path: PATH,
});

const items = [
  "pizza-woodstock-special",
  "wings-baked",
  "panzerotti-large",
  "pizza-butter-chicken",
  "side-poutine",
  "ice-cream-2-scoop",
]
  .map(getItemById)
  .filter(Boolean) as MenuItem[];

const dineInSteps = [
  {
    name: "Visit us on Main Street",
    text: "Come to Noni's Pizza & Wings at 300 Main St, Unit 8, Woodstock, ON — look for the orange 'N'.",
  },
  {
    name: "Grab a table",
    text: "Seat yourself and browse the menu — pizzas, baked wings, panzerotti, sides and Kawartha ice cream.",
  },
  {
    name: "Order fresh",
    text: "Order at the counter; everything is freshly prepared, never pre-cooked, and made to order.",
  },
  {
    name: "Eat in — or take the rest home",
    text: "Enjoy it hot in-house. Prefer to keep it moving? We also do pickup and delivery.",
  },
];

const faqs = [
  {
    q: "Does Noni's have dine-in pizza in Woodstock?",
    a: `Yes — you can dine in at Noni's Pizza & Wings, ${primaryLocation.street}, ${primaryLocation.unit}, Woodstock, ON. Eat fresh pizza, wings and panzerotti in-house, or choose pickup or delivery.`,
  },
  {
    q: "What are your dine-in hours?",
    a: "We're open for dine-in until 11 PM Sunday to Thursday and until 2 AM Friday and Saturday.",
  },
  {
    q: "Is Noni's good for families and groups?",
    a: "Yes — with party pizzas (21×15 inch, 18 slices) and combo deals, it's an easy spot for families, students and groups.",
  },
  {
    q: "Can I dine in and order Indian-fusion pizza?",
    a: "Absolutely. Our butter chicken, tandoori paneer and spicy pizzas are available to dine in, take out or have delivered.",
  },
  {
    q: "Do you offer pickup and delivery as well as dine-in?",
    a: "Yes — all three. Delivery within 3 km on orders over $25, plus pickup at the counter.",
  },
  {
    q: "Where exactly are you located?",
    a: `${primaryLocation.street}, ${primaryLocation.unit}, ${primaryLocation.city}, ${primaryLocation.regionCode} ${primaryLocation.postalCode} — on Main Street in Woodstock, with parking nearby.`,
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Dine-In Pizza in Woodstock", path: PATH },
          ]),
          faqJsonLd(faqs),
          howToJsonLd({
            name: "How to dine in at Noni's Pizza & Wings",
            description: "Dine in on fresh pizza, wings and panzerotti in Woodstock.",
            steps: dineInSteps,
          }),
        ]}
      />
      <PageHero
        eyebrow="Dine-In"
        title="Dine-In Pizza in Woodstock, ON at Noni's Pizza & Wings"
        lead="Yes — you can dine in at Noni's Pizza & Wings, 300 Main St, Unit 8, Woodstock, ON. Enjoy freshly made pizza, baked wings, panzerotti and Kawartha ice cream in-house, or choose pickup or delivery. Open until 11 PM (2 AM Fri–Sat). Call (519) 290-9555 or order online."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Dine-In Pizza", path: PATH },
        ]}
        showPhone
        lastUpdated={LAST_UPDATED}
      />

      <ContentSections
        blocks={[
          {
            heading: "A local spot to sit down and eat in Woodstock",
            body: [
              "Noni's Pizza & Wings is a locally owned pizza and wings restaurant in Woodstock, Ontario. Looking for dine-in pizza restaurants near you? Come eat in on Main Street — fresh pizza, baked wings and handcrafted panzerotti, made to order while you relax.",
              "Everything is freshly prepared, never pre-cooked, so what reaches your table is hot and made for you.",
            ],
          },
          {
            heading: "Great for families, students and late nights",
            body: [
              "Bring the family for a party pizza (21×15 inch, 18 slices) or a combo deal, grab a quick weeknight bite, or settle in late — we serve until 2 AM on Friday and Saturday.",
              "Not staying? The same fresh menu is available for pickup and delivery.",
            ],
          },
        ]}
      />

      <WhyNoni
        heading="Why dine in at Noni's"
        facts={[
          "Freshly prepared, never pre-cooked — made to order at the counter.",
          "Indian-fusion pizzas, baked wings and panzerotti all under one roof.",
          "Party pizzas and combo deals for groups.",
          "Open late — until 2 AM Friday and Saturday.",
          "Kawartha ice cream (11 flavours) for dessert.",
          "Locally owned on Main Street, Woodstock, with parking nearby.",
        ]}
      />

      <PriceTable
        items={items}
        heading="Dine-in favourites & prices"
        caption="A cross-section of what's good to eat in."
      />
      <HowToOrder heading="How to dine in" steps={dineInSteps} />
      <FactsBlock />
      <Faq faqs={faqs} heading="Dine-in pizza — frequently asked questions" />
      <InternalLinks currentPath={PATH} />
      <NapMap />
      <OrderCTA heading="Come eat with us" sub="Dine in on Main Street — or order online for pickup or delivery." />
    </>
  );
}
