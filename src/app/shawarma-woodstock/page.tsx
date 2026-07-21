import { PageHero } from "@/components/PageHero";
import { ContentSections } from "@/components/ContentSections";
import { ProductGrid } from "@/components/ProductGrid";
import { Faq } from "@/components/Faq";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { getItemsByCategory, shawarmaSaucesAndToppings } from "@/data/menu";

export const metadata = buildMetadata({
  title: "Shawarma in Woodstock, ON | Platters & Wraps | Noni's",
  description:
    "Chicken, donair & falafel shawarma in Woodstock, ON — platters, wraps, sandwiches and combos with garlic sauce, hummus and fresh-baked pita. Order online for pickup or delivery.",
  path: "/shawarma-woodstock",
});

const faqs = [
  {
    q: "What shawarma does Noni's serve in Woodstock?",
    a: "Chicken and donair shawarma plus falafel, served as large platters over rice, wraps, small or large sandwiches, and combos with fries, gravy and a pop.",
  },
  {
    q: "What comes on a shawarma platter?",
    a: "Marinated chicken or donair on rice with garlic sauce, hummus, fresh salad, pickles, turnip, garlic potatoes and freshly baked pita.",
  },
  {
    q: "Do you have vegetarian shawarma?",
    a: "Yes — our protein-packed falafel platter, sandwich and combo are all vegetarian.",
  },
  {
    q: "What sauces and toppings can I choose?",
    a: `Sauces include ${shawarmaSaucesAndToppings.sauces.join(", ")}. Toppings include ${shawarmaSaucesAndToppings.toppings.join(", ")}.`,
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shawarma in Woodstock", path: "/shawarma-woodstock" },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow="Shawarma"
        title="Shawarma in Woodstock"
        lead="Craving shawarma in Woodstock? Noni's serves chicken, donair and falafel shawarma as loaded platters, wraps, sandwiches and combos — with garlic sauce, hummus and freshly baked pita."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Shawarma", path: "/shawarma-woodstock" },
        ]}
      />

      <ContentSections
        blocks={[
          {
            heading: "Shawarma platters, wraps & combos",
            body: [
              "Go big with a large platter — marinated chicken or donair over rice with garlic sauce, hummus, fresh salad, pickles, turnip, garlic potatoes and fresh-baked pita. Or keep it handheld with a ranch, caesar or club wrap.",
              "Grab a small or large sandwich, or a combo with crispy fries, gravy and a pop. Feeding the family? The Family Meal and Mixed Family Meal stack two platters with all the sides and a 2L pop.",
            ],
          },
          {
            heading: "Fresh shawarma, your way",
            body: [
              `Build it exactly how you like — sauces like ${shawarmaSaucesAndToppings.sauces.join(", ")}, and toppings like ${shawarmaSaucesAndToppings.toppings.join(", ")}.`,
              "Everything is freshly prepared to order. Order shawarma online for pickup or delivery across Woodstock.",
            ],
          },
        ]}
      />

      <ProductGrid
        heading="Shawarma platters, wraps & combos"
        items={getItemsByCategory("shawarma")}
      />

      <Faq faqs={faqs} />
      <OrderCTA heading="Shawarma, freshly made" sub="Platters, wraps and combos — order online for pickup or delivery." />
    </>
  );
}
