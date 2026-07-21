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

const PATH = "/order-pizza-online-woodstock";

export const metadata = buildMetadata({
  title: "Order Pizza Online in Woodstock | Noni's Pizza & Wings",
  description:
    "Order pizza online in Woodstock, ON. Build your own or pick a signature or Indian-fusion pizza from Noni's — pickup or free delivery after 3 PM. Fresh, made to order.",
  path: PATH,
});

const items = [
  "pizza-create-your-own",
  "pizza-butter-chicken",
  "pizza-tandoori-chicken",
  "pizza-meat-lover",
  "party-pizza-4",
  "panzerotti-large",
]
  .map(getItemById)
  .filter(Boolean) as MenuItem[];

const faqs = [
  {
    q: "How do I order pizza online from Noni's?",
    a: "Tap any Order Now button to open our online ordering, choose pickup or delivery, build your pizza or pick a combo, and check out. It takes a couple of minutes.",
  },
  {
    q: "Can I order pizza online for pickup?",
    a: "Yes — order online, select pickup, and we'll have it freshly made and ready at 300 Main St, Unit 8, Woodstock.",
  },
  {
    q: "Can I customize my pizza when ordering online?",
    a: "Absolutely. Create Your Own lets you choose crust (including gluten-free), sauce, cheese and up to four toppings before you check out.",
  },
  {
    q: "Is there a minimum for online delivery orders?",
    a: `Free delivery applies within ${primaryLocation.delivery.radiusKm} km on orders over $${primaryLocation.delivery.minSubtotal} after ${primaryLocation.delivery.afterTime}. Smaller orders and pickup are always available.`,
  },
  {
    q: "Can I add wings, shawarma or dessert to my online order?",
    a: "Yes — add baked wings, shawarma, sides, drinks and Kawartha ice cream to the same order and check out in one go.",
  },
  {
    q: "Do you take coupon codes online?",
    a: "Yes. Enter your coupon code at checkout to apply a deal — see our deals page for current codes.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Order Pizza Online in Woodstock", path: PATH },
          ]),
          faqJsonLd(faqs),
          howToJsonLd({
            name: "How to order pizza online from Noni's Pizza & Wings",
            description: "Order pizza online in Woodstock for pickup or delivery in four steps.",
            steps: DEFAULT_ORDER_STEPS,
          }),
        ]}
      />
      <PageHero
        eyebrow="Order Online"
        title="Order Pizza Online in Woodstock — Pickup or Delivery"
        lead="Order pizza online from Noni's Pizza & Wings in Woodstock, ON in just a few taps. Build your own or choose a signature or Indian-fusion pizza, then pick fast pickup at 300 Main St, Unit 8, or free delivery within 3 km on orders over $25 after 3 PM. Call (519) 290-9555."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Order Pizza Online", path: PATH },
        ]}
        showPhone
        lastUpdated={LAST_UPDATED}
      />

      <ContentSections
        blocks={[
          {
            heading: "Online pizza ordering, made simple",
            body: [
              "Noni's Pizza & Wings is a locally owned pizza, wings and shawarma restaurant in Woodstock, Ontario. Skip the phone line: order pizza online and get exactly what you want — pick a specialty or Indian-fusion pizza, or build your own with any crust, sauce and toppings.",
              "Everything is freshly prepared, never pre-cooked, so it's hot and made just for you whether you pick it up or have it delivered.",
            ],
          },
          {
            heading: "Order pizza online near me — pickup or delivery",
            body: [
              "Choose pickup at 300 Main St, Unit 8, or have it delivered — free within 3 km on orders over $25 after 3 PM.",
              "Add wings, shawarma, sides or ice cream to the same order and check out once.",
            ],
          },
        ]}
      />

      <WhyNoni />
      <PriceTable
        items={items}
        heading="Start your online order"
        caption="Popular items to build your cart around."
      />
      <HowToOrder heading="How to order online" />
      <FactsBlock />
      <Faq faqs={faqs} heading="Ordering online — frequently asked questions" />
      <InternalLinks currentPath={PATH} />
      <NapMap />
      <OrderCTA heading="Ready to order?" sub="Your pizza is a few taps away — pickup or delivery." />
    </>
  );
}
