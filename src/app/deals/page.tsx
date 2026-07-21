import { PageHero } from "@/components/PageHero";
import { DealCard } from "@/components/DealCard";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { couponDeals, everydayDeals, everydaySpecials } from "@/data/deals";

export const metadata = buildMetadata({
  title: "Pizza Deals & Coupons in Woodstock | Noni's",
  description:
    "Save on pizza, wings & shawarma in Woodstock. Everyday combo deals, family feasts and coupon codes from Noni's Pizza & Wings. Order online for pickup or delivery.",
  path: "/deals",
});

export default function DealsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Deals", path: "/deals" },
        ])}
      />
      <PageHero
        eyebrow="Deals"
        title="Deals & Coupons in Woodstock"
        lead="Stack your favorites and save big. Everyday combo deals plus coupon codes on pizza, wings and shawarma — freshly made to order and ready for pickup or delivery."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Deals", path: "/deals" },
        ]}
      />

      {/* Everyday specials strip */}
      <section className="bg-yellow">
        <div className="mx-auto flex max-w-container flex-col gap-2 px-5 py-6 text-maroon sm:flex-row sm:items-center sm:justify-center sm:gap-8 sm:px-8">
          {everydaySpecials.map((s) => (
            <p key={s} className="text-center font-bold">
              ⚡ {s}
            </p>
          ))}
        </div>
      </section>

      {/* Coupon deals */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="font-display uppercase text-display-lg text-maroon">Coupon Deals</h2>
          <p className="mt-2 text-muted">
            Use these codes at checkout. One coupon per order unless stated otherwise.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {couponDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* Everyday deals */}
      <section className="bg-cream pb-16 sm:pb-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="font-display uppercase text-display-lg text-maroon">Everyday Combo Deals</h2>
          <p className="mt-2 text-muted">Standing deals — no code needed.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {everydayDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
          <p className="mt-6 text-xs text-muted">
            Prices in CAD, exclusive of HST and subject to change. Free delivery within 3 km on
            orders $25+ after 3:00 PM.
          </p>
        </div>
      </section>

      <OrderCTA heading="Grab a deal tonight" sub="Order online and apply your coupon at checkout." />
    </>
  );
}
