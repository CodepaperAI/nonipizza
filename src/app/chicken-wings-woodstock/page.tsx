import { PageHero } from "@/components/PageHero";
import { ContentSections } from "@/components/ContentSections";
import { ProductGrid } from "@/components/ProductGrid";
import { Faq } from "@/components/Faq";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { getItemsByCategory, wingSauces } from "@/data/menu";

export const metadata = buildMetadata({
  title: "Chicken Wings in Woodstock, ON | Baked & Crispy | Noni's",
  description:
    "Baked and deep-fried chicken wings in Woodstock, ON — 9 sauces, boneless or breaded, 1 to 4 lbs. Baked wings are a healthier option. Order online for pickup or delivery.",
  path: "/chicken-wings-woodstock",
});

const faqs = [
  {
    q: "What makes Noni's baked wings different?",
    a: "Our signature wings can be baked instead of deep-fried — a lighter, healthier option that still comes out juicy and full of flavour, tossed in your choice of nine sauces.",
  },
  {
    q: "What wing sauces do you have?",
    a: `Nine sauces: ${wingSauces.join(", ")}.`,
  },
  {
    q: "What sizes do wings come in?",
    a: "1 LB, 2 LB, 3 LB and 4 LB — great for one person or a whole party. Choose baked, deep-fried breaded, or boneless.",
  },
  {
    q: "Can I get wings with pizza as a combo?",
    a: "Yes. Our Pizza & Wings combo deals pair a four-topping pizza with 1–2 lbs of wings plus pops or dips, at Medium, Large and X-Large sizes.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Chicken Wings in Woodstock", path: "/chicken-wings-woodstock" },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow="Wings"
        title="Chicken Wings in Woodstock"
        lead="Looking for chicken wings in Woodstock? Noni's does them baked or crispy, in nine sauces, from 1 to 4 pounds. Our baked wings are a lighter, healthier take that never skimps on flavour."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Chicken Wings", path: "/chicken-wings-woodstock" },
        ]}
      />

      <ContentSections
        blocks={[
          {
            heading: "Baked wings — a healthier way to wing it",
            body: [
              "Most wings are dropped straight into the fryer. Ours can be baked instead — so you get all the juicy, saucy satisfaction with less grease. It's the same crave-worthy wing, made a little lighter.",
              "Prefer classic crunch? Go deep-fried breaded, or pick boneless for all sauce and no bones.",
            ],
          },
          {
            heading: "Nine sauces, four sizes of chicken wings",
            body: [
              `Toss them in ${wingSauces.join(", ")} — from honey-sweet to Suicide-level heat.`,
              "Order 1, 2, 3 or 4 pounds, or bundle wings with a pizza in one of our combo deals to feed the whole table.",
            ],
          },
        ]}
      />

      <ProductGrid
        heading="Signature chicken wings"
        intro="Baked, deep-fried breaded or boneless — all tossed in your choice of 9 sauces."
        items={getItemsByCategory("wings")}
      />

      <Faq faqs={faqs} />
      <OrderCTA heading="Wing night sorted" sub="Order wings online for pickup or delivery in Woodstock." />
    </>
  );
}
