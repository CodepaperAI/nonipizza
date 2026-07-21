import { PageHero } from "@/components/PageHero";
import { ContentSections } from "@/components/ContentSections";
import { WhyNoni } from "@/components/landing/WhyNoni";
import { PriceTable } from "@/components/landing/PriceTable";
import { HowToOrder, DEFAULT_ORDER_STEPS } from "@/components/landing/HowToOrder";
import { FactsBlock } from "@/components/landing/FactsBlock";
import { InternalLinks } from "@/components/landing/InternalLinks";
import { NapMap } from "@/components/landing/NapMap";
import { ProductGrid } from "@/components/ProductGrid";
import { Faq } from "@/components/Faq";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd, howToJsonLd } from "@/lib/jsonld";
import { LAST_UPDATED } from "@/lib/cluster";
import { getItemsByCategory } from "@/data/menu";

const PATH = "/indian-fusion-pizza-woodstock";

export const metadata = buildMetadata({
  title: "Indian Fusion Pizza Woodstock | Butter Chicken & Tandoori",
  description:
    "Indian fusion pizza in Woodstock, ON: butter chicken, tandoori paneer & spicy chicken pizzas, each with a free dip + pop. Noni's is Woodstock's Indian-style pizza spot. Order online.",
  path: PATH,
});

const fusion = getItemsByCategory("indian-fusion");

const faqs = [
  {
    q: "What is Indian fusion pizza?",
    a: "Indian fusion pizza is a pizza built on Indian flavours — a butter chicken, tandoori or spicy base instead of plain tomato sauce — topped with ingredients like chicken, paneer, red onions and peppers. It's the taste of a curry house on a fresh-baked crust.",
  },
  {
    q: "Where can I get Indian pizza near me in Woodstock?",
    a: "At Noni's Pizza & Wings, 300 Main St, Unit 8, Woodstock. We're the local spot for Indian-style pizza — butter chicken, tandoori paneer and spicy chicken — freshly made for pickup or delivery.",
  },
  {
    q: "Which Indian fusion pizzas does Noni's make?",
    a: "Butter Chicken, Butter Paneer, Tandoori Chicken, Tandoori Paneer, and our newest Spicy Chicken and Spicy Paneer. Every Indian-fusion pizza comes with a free dipping sauce and a free pop.",
  },
  {
    q: "Do you have vegetarian Indian pizza?",
    a: "Yes — the Butter Paneer, Tandoori Paneer and Spicy Paneer pizzas are all vegetarian, built on rich paneer and spiced bases.",
  },
  {
    q: "How spicy are the Indian pizzas?",
    a: "The butter and tandoori pizzas are mild-to-medium and crowd-friendly. The Spicy Chicken and Spicy Paneer bring real heat with jalapenos and a spicy base — ask us to tone it down if you'd like.",
  },
  {
    q: "Can I order butter chicken pizza for delivery?",
    a: "Yes — order any Indian-fusion pizza online for pickup or delivery. Free delivery within 3 km on orders over $25 after 3 PM.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Indian Fusion Pizza in Woodstock", path: PATH },
          ]),
          faqJsonLd(faqs),
          howToJsonLd({
            name: "How to order Indian fusion pizza from Noni's",
            description: "Order butter chicken, tandoori or spicy pizza in Woodstock in four steps.",
            steps: DEFAULT_ORDER_STEPS,
          }),
        ]}
      />
      <PageHero
        eyebrow="Our specialty"
        title="Indian Fusion Pizza in Woodstock — Butter Chicken, Tandoori Paneer & More"
        lead="Noni's Pizza & Wings serves Indian fusion pizza in Woodstock, ON — butter chicken, tandoori paneer, spicy chicken and more, built on rich Indian bases and freshly baked to order. Each comes with a free dip and pop. It's the Indian-style pizza Woodstock searches for, made locally. Order online or call (519) 290-9555."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Indian Fusion Pizza", path: PATH },
        ]}
        showPhone
        lastUpdated={LAST_UPDATED}
      />

      <ContentSections
        blocks={[
          {
            heading: "Woodstock's home of Indian-style pizza",
            body: [
              "Noni's Pizza & Wings is a locally owned pizza, wings and shawarma restaurant in Woodstock, Ontario — and Indian fusion pizza is what we're known for. We take the flavours South Asian families grew up on (creamy butter chicken, smoky tandoori, fiery spice) and put them on a hand-built, fresh-baked pizza.",
              "If you've searched for Indian pizza near you or wished a big pizza brand did a proper butter chicken pie, this is it — the same craveable idea, done locally and freshly, never pre-cooked. For Woodstock's Indian and South Asian community it's a familiar taste in fast-casual form; for adventurous pizza lovers it's the most exciting thing on any menu in town.",
            ],
          },
          {
            heading: "Butter chicken, tandoori paneer & spicy pizza",
            body: [
              "Go creamy with a Butter Chicken or Butter Paneer pizza, smoky with Tandoori Chicken or Tandoori Paneer, or bring the heat with our new Spicy Chicken and Spicy Paneer — loaded with jalapenos, red onions, cilantro and green peppers on a spicy base.",
              "Every Indian-fusion pizza comes with a FREE dipping sauce and a FREE pop, and scales from a personal 10-inch to a shareable 16-inch X-Large. Vegetarian? The paneer pizzas are made for you.",
            ],
          },
        ]}
      />

      <WhyNoni
        heading="Why Noni's for Indian fusion pizza"
        facts={[
          "Butter chicken, butter paneer, tandoori chicken, tandoori paneer, spicy chicken & spicy paneer pizzas.",
          "Every Indian-fusion pizza includes a FREE dipping sauce and a FREE pop.",
          "Authentic Indian bases (butter, tandoori, spicy) — not just toppings on tomato sauce.",
          "Freshly prepared, never pre-cooked — baked to order.",
          "Vegetarian paneer options and gluten-free crust available.",
          "Locally owned in Woodstock, Ontario — the town's Indian-style pizza specialist.",
        ]}
      />

      <PriceTable
        items={fusion}
        heading="Indian fusion pizza menu & prices"
        caption="Each comes with a free dip and pop. Sizes Small 10 inch to X-Large 16 inch — starting prices shown."
      />

      <ProductGrid heading="See them" items={fusion} />

      <HowToOrder heading="How to order Indian fusion pizza" />
      <FactsBlock />
      <Faq faqs={faqs} heading="Indian fusion pizza — frequently asked questions" />
      <InternalLinks currentPath={PATH} />
      <NapMap />
      <OrderCTA
        heading="Taste the fusion"
        sub="Butter chicken, tandoori & spicy paneer — order online for pickup or delivery."
      />
    </>
  );
}
