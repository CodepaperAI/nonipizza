import { PageHero } from "@/components/PageHero";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { Pill } from "@/components/ui/Pill";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "Reviews | Noni's Pizza & Wings, Woodstock",
  description:
    "What Woodstock is saying about Noni's Pizza & Wings — Indian-fusion pizzas, baked wings and shawarma. Sample testimonials shown; real reviews coming soon.",
  path: "/reviews",
});

/**
 * Placeholder testimonials — clearly labeled. Per CLAUDE.md §7, we do NOT emit
 * Review / AggregateRating JSON-LD until real, verifiable reviews are supplied, to avoid
 * fake structured data. Swap these for real quotes and add the schema then.
 */
const placeholders = [
  {
    quote:
      "The butter chicken pizza is unreal — exactly the flavour I grew up with, on a fresh crust. My new Friday-night go-to.",
    name: "Sample Customer",
    detail: "Indian Fusion Pizza",
  },
  {
    quote:
      "Baked wings that actually taste great and feel a bit lighter. Honey garlic is the move. Delivery was hot and on time.",
    name: "Sample Customer",
    detail: "Chicken Wings",
  },
  {
    quote:
      "Huge shawarma platter with all the sides and fresh pita. Fed two of us easily. Great value.",
    name: "Sample Customer",
    detail: "Shawarma Platter",
  },
  {
    quote:
      "Ordered the family feast for a birthday — two pizzas, wings and fries. Everyone was happy and it was ready fast.",
    name: "Sample Customer",
    detail: "Family Feast Deal",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
      <PageHero
        eyebrow="Reviews"
        title="What Woodstock Is Saying"
        lead="Noni's is locally owned and proud to serve the Woodstock community. Here's a taste of the kind of feedback we love to hear."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ]}
      />

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-3xl bg-yellow/60 p-4 text-maroon ring-1 ring-maroon/10">
            <Pill variant="default">Please note</Pill>
            <p className="text-sm font-medium">
              The testimonials below are <strong>sample placeholders</strong> to show the layout.
              Real, verified customer reviews will replace them — and we&apos;ll add star-rating
              rich results once genuine reviews are collected.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {placeholders.map((r, i) => (
              <figure key={i} className="flex flex-col rounded-3xl bg-white p-6 shadow-card">
                <div className="text-orange" aria-hidden="true">
                  ★★★★★
                </div>
                <blockquote className="mt-3 text-body-lg text-ink/90">“{r.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted">
                  <span className="font-bold text-maroon">{r.name}</span> · {r.detail}
                  <span className="ml-2 rounded-full bg-cream-200 px-2 py-0.5 text-[0.65rem] uppercase">
                    Sample
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted">
            Enjoyed your order? Leave us a review on Google, Instagram or Facebook — we&apos;d love
            to feature real Woodstock voices here.
          </p>
        </div>
      </section>

      <OrderCTA heading="Taste it for yourself" sub="Order online and see what the fuss is about." />
    </>
  );
}
