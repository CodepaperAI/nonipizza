import { PageHero } from "@/components/PageHero";
import { ContentSections } from "@/components/ContentSections";
import { ProductGrid } from "@/components/ProductGrid";
import { Faq } from "@/components/Faq";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { getItemsByCategory } from "@/data/menu";

export const metadata = buildMetadata({
  title: "Indian Fusion Pizza in Woodstock | Butter Chicken & Tandoori",
  description:
    "Butter chicken, tandoori & spicy paneer pizzas in Woodstock, ON. Noni's Indian-fusion pizzas come with a free dip + pop. Order online for pickup or delivery.",
  path: "/indian-fusion-pizza-woodstock",
});

const faqs = [
  {
    q: "What is Indian fusion pizza?",
    a: "It's a pizza built on Indian flavours — a butter chicken, tandoori, spicy or paneer base instead of plain tomato sauce — topped with familiar ingredients like chicken, paneer, red onions and peppers. It's the taste of a curry house on a fresh-baked crust.",
  },
  {
    q: "Which Indian fusion pizzas does Noni's make?",
    a: "Butter Chicken, Butter Paneer, Tandoori Chicken, Tandoori Paneer, and our newest Spicy Chicken and Spicy Paneer. Every Indian-fusion pizza comes with a free dipping sauce and a free pop.",
  },
  {
    q: "Do you have vegetarian Indian pizzas?",
    a: "Yes — the Butter Paneer, Tandoori Paneer and Spicy Paneer pizzas are all vegetarian and built on rich paneer and spiced bases.",
  },
  {
    q: "How spicy are they?",
    a: "The butter and tandoori pizzas are mild-to-medium and crowd-friendly. The Spicy Chicken and Spicy Paneer bring real heat with jalapenos and a spicy base — tell us if you'd like it toned down.",
  },
  {
    q: "Can I order Indian fusion pizza for delivery in Woodstock?",
    a: "Yes — order online for pickup or delivery. Free delivery within 3 km on orders $25+ after 3 PM.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Indian Fusion Pizza in Woodstock", path: "/indian-fusion-pizza-woodstock" },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow="Our specialty"
        title="Indian Fusion Pizza in Woodstock"
        lead="Craving Indian fusion pizza in Woodstock? Noni's is famous for it — butter chicken, tandoori and spicy paneer pizzas on a fresh-baked crust, each with a free dip and pop. This is our signature, and nobody in town does it like us."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Indian Fusion Pizza", path: "/indian-fusion-pizza-woodstock" },
        ]}
      />

      <ContentSections
        blocks={[
          {
            heading: "The best of both worlds, freshly baked",
            body: [
              "Noni's Indian-fusion pizzas take the flavours South Asian families grew up on — creamy butter chicken, smoky tandoori, fiery spice — and put them on a hand-built pizza. It's comfort food and adventure on the same plate.",
              "For Woodstock's Indian and South Asian community, it's a familiar taste in a fast-casual format. For adventurous pizza lovers, it's the most exciting thing on any menu in town. Every Indian-fusion pizza is freshly prepared, never pre-cooked.",
            ],
          },
          {
            heading: "Butter chicken, tandoori & spicy paneer pizza",
            body: [
              "Go creamy with a Butter Chicken or Butter Paneer pizza, smoky with Tandoori Chicken or Tandoori Paneer, or bring the heat with our new Spicy Chicken and Spicy Paneer — loaded with jalapenos, red onions, cilantro and green peppers on a spicy base.",
              "Every Indian-fusion pizza comes with a FREE dipping sauce and a FREE pop, and scales from a personal 10-inch up to a shareable 16-inch X-Large.",
            ],
          },
          {
            heading: "Order Indian fusion pizza in Woodstock",
            body: [
              "Vegetarian? The paneer pizzas are made for you. Feeding a crowd? Add wings, a shawarma platter or a party pizza. Then choose pickup or delivery and we'll have it hot and ready.",
            ],
          },
        ]}
      />

      <ProductGrid
        heading="Our Indian fusion pizzas"
        intro={`Each comes with a free dipping sauce and a free pop. Sizes Small 10" to X-Large 16".`}
        items={getItemsByCategory("indian-fusion")}
      />

      <Faq faqs={faqs} />
      <OrderCTA heading="Taste the fusion" sub="Butter chicken, tandoori & spicy paneer — order online for pickup or delivery." />
    </>
  );
}
