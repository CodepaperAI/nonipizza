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
  title: "Pizza Near Me in Woodstock, ON | Noni's Pizza & Wings",
  description:
    "Looking for pizza near me in Woodstock? Noni's Pizza & Wings serves freshly made specialty, Indian-fusion & build-your-own pizzas for pickup or delivery. Order online.",
  path: "/pizza-near-me-woodstock",
});

const faqs = [
  {
    q: "Where can I find pizza near me in Woodstock?",
    a: `Noni's Pizza & Wings is at ${formattedAddress}, ${primaryLocation.city}, ${primaryLocation.regionCode} ${primaryLocation.postalCode} — central to Woodstock and easy to reach for pickup or delivery.`,
  },
  {
    q: "Do you deliver pizza near me?",
    a: `Yes. We offer free delivery within ${primaryLocation.delivery.radiusKm} km on orders $${primaryLocation.delivery.minSubtotal}+ after ${primaryLocation.delivery.afterTime}, plus pickup and dine-in.`,
  },
  {
    q: "What kind of pizza does Noni's make?",
    a: "Specialty pizzas, four-topping signature pizzas, Indian-fusion (butter chicken, tandoori, spicy paneer), veggie pizzas, and a full build-your-own with gluten-free crust available.",
  },
  {
    q: "Are you open late?",
    a: "Yes — we're open until 11 PM Sunday to Thursday and until 2 AM on Friday and Saturday.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pizza Near Me in Woodstock", path: "/pizza-near-me-woodstock" },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow="Pizza Near Me"
        title="Pizza Near Me in Woodstock, ON"
        lead="Searching for pizza near me in Woodstock? You just found it. Noni's Pizza & Wings makes every pizza fresh to order — specialty, Indian-fusion and build-your-own — for fast pickup or delivery across town."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Pizza Near Me", path: "/pizza-near-me-woodstock" },
        ]}
      />

      <ContentSections
        blocks={[
          {
            heading: "Your local pizza place in Woodstock",
            body: [
              `When people in Woodstock search for "pizza places near me," they want fresh, hot and fast — not frozen and reheated. That's exactly what Noni's does: freshly prepared, never pre-cooked, made just for you at ${formattedAddress}.`,
              "We're locally owned and proud to serve the Woodstock community, from weeknight family dinners to late-night cravings. Order pizza with pickup, dine-in, or delivery straight to your door.",
            ],
          },
          {
            heading: "Pizza near me — fresh, fast & made your way",
            body: [
              "Choose a specialty pizza like the Woodstock Special or Meat Lover, go bold with an Indian-fusion butter chicken or tandoori paneer pizza, or build your own with any sauce, crust and up to four toppings (gluten-free crust available).",
              `Free delivery within ${primaryLocation.delivery.radiusKm} km on orders $${primaryLocation.delivery.minSubtotal}+ after ${primaryLocation.delivery.afterTime} means the closest great pizza to you is also one of the best-value.`,
            ],
          },
        ]}
      />

      <ProductGrid
        heading="Popular pizzas near you"
        intro="A quick taste of what Woodstock is ordering right now."
        items={getFeaturedItems().slice(0, 6)}
      />

      <Faq faqs={faqs} />
      <OrderCTA heading="Pizza near you, made to order" />
    </>
  );
}
