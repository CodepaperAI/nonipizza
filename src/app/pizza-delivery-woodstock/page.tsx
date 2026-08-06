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

const PATH = "/pizza-delivery-woodstock";

export const metadata = buildMetadata({
  title: "Pizza Delivery in Woodstock, ON | Noni's Pizza & Wings",
  description:
    "Pizza delivery near you in Woodstock, ON. Freshly made pizza, wings & panzerotti delivered hot — never pre-cooked. Order online or call (519) 290-9555.",
  path: PATH,
});

const tableItems = [
  "pizza-meat-lover",
  "pizza-butter-chicken",
  "pizza-woodstock-special",
  "wings-baked",
  "party-pizza-4",
  "pizza-create-your-own",
]
  .map(getItemById)
  .filter(Boolean) as MenuItem[];

const faqs = [
  {
    q: "Does Noni's deliver pizza near me in Woodstock?",
    a: "Yes. Noni's Pizza & Wings delivers freshly made pizza across Woodstock, ON; pickup and dine-in are also available.",
  },
  {
    q: "What time does Noni's stop delivering?",
    a: "Delivery runs during opening hours — until 9 PM Sunday to Thursday and until 11 PM Friday and Saturday.",
  },
  {
    q: "How far do you deliver from Woodstock?",
    a: "We deliver from 300 Main St, Unit 8, across Woodstock. Start an order to confirm whether your address is in range.",
  },
  {
    q: "How long does pizza delivery take?",
    a: "Because every pizza is made fresh to order, times vary with how busy we are — but we prep, bake and deliver it as fast as we can so it arrives hot.",
  },
  {
    q: "Can I get wings and sides delivered too?",
    a: "Yes — add baked wings, panzerotti, sides and Kawartha ice cream to the same delivery order.",
  },
  {
    q: "Can I pick up instead of having it delivered?",
    a: "Yes — choose pickup at checkout and collect your order at 300 Main St, Unit 8, Woodstock. Dine-in is available too.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pizza Delivery in Woodstock", path: PATH },
          ]),
          faqJsonLd(faqs),
          howToJsonLd({
            name: "How to get pizza delivered from Noni's Pizza & Wings",
            description: "Order pizza delivery in Woodstock in four steps.",
            steps: DEFAULT_ORDER_STEPS,
          }),
        ]}
      />
      <PageHero
        eyebrow="Delivery"
        title="Pizza Delivery in Woodstock, ON — Hot & Fresh to Your Door"
        lead="Yes — Noni's Pizza & Wings delivers freshly made pizza across Woodstock, ON. Order online for delivery or pickup from 300 Main St, Unit 8. Every pizza is freshly prepared, never pre-cooked. Open 11 AM–9 PM Sunday to Thursday and 11 AM–11 PM Friday and Saturday. Call (519) 290-9555."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Pizza Delivery", path: PATH },
        ]}
        showPhone
        lastUpdated={LAST_UPDATED}
      />

      <ContentSections
        blocks={[
          {
            heading: "Hot pizza delivery, freshly made",
            body: [
              "Noni's Pizza & Wings is a locally owned pizza and wings restaurant in Woodstock, Ontario — and when you want pizza delivery near you, there are no frozen shortcuts. Every order is freshly prepared, never pre-cooked, then delivered hot across town.",
              "Whether it's a family feast or a solo evening craving, we bring pizza that delivers on flavour. Prefer to grab it yourself? Takeaway and dine-in are always available too.",
            ],
          },
          {
            heading: "Pizza that delivers to you — and saves you money",
            body: [
              "Local delivery across Woodstock means the closest great pizza is also great value.",
              "Bundle a combo deal — pizza + wings + pop or dips — to feed the whole table for less.",
            ],
          },
        ]}
      />

      <WhyNoni />
      <PriceTable
        items={tableItems}
        heading="Delivered fresh & hot — popular picks"
        caption="Add any of these to a delivery order."
      />
      <HowToOrder heading="How to get it delivered" />
      <FactsBlock />
      <Faq faqs={faqs} heading="Pizza delivery — frequently asked questions" />
      <InternalLinks currentPath={PATH} />
      <NapMap />
      <OrderCTA heading="Get it delivered" sub="Freshly made pizza, delivered across Woodstock." />
    </>
  );
}
