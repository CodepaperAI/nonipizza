import { PageHero } from "@/components/PageHero";
import { ContentSections } from "@/components/ContentSections";
import { ProductGrid } from "@/components/ProductGrid";
import { Faq } from "@/components/Faq";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { getItemById } from "@/data/menu";
import type { MenuItem } from "@/data/menu";
import { primaryLocation } from "@/data/locations";

export const metadata = buildMetadata({
  title: "Order Pizza Online in Woodstock | Noni's Pizza & Wings",
  description:
    "Order pizza online in Woodstock, ON. Build your own or pick a signature or Indian-fusion pizza from Noni's — pickup or free delivery after 3 PM. Fresh, fast, made to order.",
  path: "/order-pizza-online-woodstock",
});

const ids = [
  "pizza-create-your-own",
  "pizza-butter-chicken",
  "pizza-meat-lover",
  "pizza-woodstock-special",
  "pizza-tandoori-chicken",
  "party-pizza-4",
];
const items = ids.map(getItemById).filter(Boolean) as MenuItem[];

const faqs = [
  {
    q: "How do I order pizza online from Noni's?",
    a: "Tap any Order Now button to open our online ordering, choose pickup or delivery, build your pizza or pick a combo, and check out. It takes a couple of minutes.",
  },
  {
    q: "Is there a minimum for online delivery orders?",
    a: `Free delivery applies within ${primaryLocation.delivery.radiusKm} km on orders $${primaryLocation.delivery.minSubtotal}+ after ${primaryLocation.delivery.afterTime}. Smaller orders and pickup are always available too.`,
  },
  {
    q: "Can I order online for pickup?",
    a: "Absolutely — order online, select pickup, and we'll have it freshly made and ready at 300 Main St, Unit 8, Woodstock.",
  },
  {
    q: "Can I customize my pizza online?",
    a: "Yes. Create Your Own lets you choose crust (including gluten-free), sauce, cheese and up to four toppings online before you check out.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Order Pizza Online in Woodstock", path: "/order-pizza-online-woodstock" },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow="Order Online"
        title="Order Pizza Online in Woodstock"
        lead="Order pizza online in Woodstock in just a few taps. Build your own or choose a signature or Indian-fusion pizza from Noni's, then pick fast pickup or free delivery after 3 PM."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Order Pizza Online", path: "/order-pizza-online-woodstock" },
        ]}
      />

      <ContentSections
        blocks={[
          {
            heading: "Online pizza ordering, made simple",
            body: [
              "Skip the phone line. Order pizza online from Noni's Pizza & Wings and get exactly what you want: pick a specialty or Indian-fusion pizza, or build your own with any crust, sauce and toppings.",
              "Everything is freshly prepared, never pre-cooked — so it's hot and made just for you whether you pick it up or have it delivered.",
            ],
          },
          {
            heading: "Order pizza online near me — pickup or delivery",
            body: [
              `Choose pickup at ${primaryLocation.street}, ${primaryLocation.unit}, or have it delivered — free within ${primaryLocation.delivery.radiusKm} km on orders $${primaryLocation.delivery.minSubtotal}+ after ${primaryLocation.delivery.afterTime}.`,
              "Add wings, shawarma, sides or Kawartha ice cream to the same order and check out in one go.",
            ],
          },
        ]}
      />

      <ProductGrid heading="Start your online order" items={items} />

      <Faq faqs={faqs} />
      <OrderCTA heading="Ready to order?" sub="Your pizza is a few taps away — pickup or delivery." />
    </>
  );
}
