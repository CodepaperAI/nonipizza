import { PageHero } from "@/components/PageHero";
import { ContentSections } from "@/components/ContentSections";
import { ProductGrid } from "@/components/ProductGrid";
import { Faq } from "@/components/Faq";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { getFeaturedItems } from "@/data/menu";
import { primaryLocation, formattedAddress } from "@/data/locations";

export const metadata = buildMetadata({
  title: "Pizza Delivery in Woodstock, ON | Noni's Pizza & Wings",
  description:
    "Fast pizza delivery in Woodstock, ON. Free delivery within 3 km on orders $25+ after 3 PM. Pizza, wings, shawarma & more from Noni's — freshly made and delivered hot.",
  path: "/pizza-delivery-woodstock",
});

const faqs = [
  {
    q: "Do you offer free pizza delivery in Woodstock?",
    a: `Yes — free delivery within ${primaryLocation.delivery.radiusKm} km on orders $${primaryLocation.delivery.minSubtotal}+ after ${primaryLocation.delivery.afterTime}. Delivery is also available for smaller orders and outside those hours.`,
  },
  {
    q: "How far do you deliver from Woodstock?",
    a: `Free delivery covers a ${primaryLocation.delivery.radiusKm} km radius from ${formattedAddress}. If you're not sure whether you're in range, start an order and it'll confirm at checkout.`,
  },
  {
    q: "How long does pizza delivery take?",
    a: "Because everything is made fresh to order, times vary with how busy we are — but we prep and bake as fast as we can and deliver it hot.",
  },
  {
    q: "Can I get wings and shawarma delivered too?",
    a: "Yes. Add baked wings, shawarma platters, sides and ice cream to the same delivery order.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pizza Delivery in Woodstock", path: "/pizza-delivery-woodstock" },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow="Delivery"
        title="Pizza Delivery in Woodstock"
        lead="Want pizza delivery close to you in Woodstock? Noni's delivers freshly made pizza, wings and shawarma hot to your door — free within 3 km on orders $25+ after 3 PM."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Pizza Delivery", path: "/pizza-delivery-woodstock" },
        ]}
      />

      <ContentSections
        blocks={[
          {
            heading: "Hot pizza delivery, freshly made",
            body: [
              "No frozen shortcuts. Every order is freshly prepared, never pre-cooked, then delivered hot across Woodstock. Whether it's a family feast or a solo late-night craving, Noni's brings it to you.",
              `We're open until 11 PM Sunday–Thursday and 2 AM Friday–Saturday, so pizza delivery is there when you need it.`,
            ],
          },
          {
            heading: "Pizza takeaway & delivery near you",
            body: [
              `Prefer to grab it yourself? Takeaway is ready at ${primaryLocation.street}, ${primaryLocation.unit}. Prefer delivery? It's free within ${primaryLocation.delivery.radiusKm} km on orders $${primaryLocation.delivery.minSubtotal}+ after ${primaryLocation.delivery.afterTime}.`,
              "Bundle a combo deal — pizza + wings + pop or dips — to feed the whole table and save.",
            ],
          },
        ]}
      />

      <ProductGrid heading="Delivered fresh & hot" items={getFeaturedItems().slice(0, 6)} />

      <Faq faqs={faqs} />
      <OrderCTA heading="Get it delivered" sub="Free delivery within 3 km on orders $25+ after 3 PM." />
    </>
  );
}
