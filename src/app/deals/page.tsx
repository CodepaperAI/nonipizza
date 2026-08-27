import { PageHero } from "@/components/PageHero";
import { DealCard } from "@/components/DealCard";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { everydayDeals, everydaySpecials } from "@/data/deals";

export const metadata = buildMetadata({
  title: "Pizza Deals & Combos in Woodstock | Noni's",
  description:
    "Save on pizza, wings & combos in Woodstock. Everyday combo deals and family feasts from Noni's Pizza & Wings. Order online for pickup or delivery.",
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
        title="Everyday Pizza Deals in Woodstock"
        lead="Stack your favorites and save big. Everyday combo deals on pizza, wings and family feasts — freshly made to order and ready for pickup or delivery."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Deals", path: "/deals" },
        ]}
      />

      {/* Everyday specials — one card per offer */}
      <section className="bg-yellow">
        <div className="mx-auto max-w-container px-5 py-10 sm:px-8">
          <h2 className="text-center font-display uppercase text-display-lg text-maroon">
            Everyday Specials
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {everydaySpecials.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl bg-cream p-6 text-maroon shadow-sm"
              >
                <h3 className="font-display uppercase text-2xl">{s.name}</h3>
                <p className="mt-1 font-bold">⚡ {s.summary}</p>
                {s.terms && (
                  <ul className="mt-3 list-disc pl-5 text-sm text-maroon/80">
                    {s.terms.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {s.promoCode && (
                  <p className="mt-3 text-sm">
                    Use promo code{" "}
                    <span className="rounded bg-maroon px-2 py-1 font-bold uppercase tracking-wider text-yellow">
                      {s.promoCode}
                    </span>{" "}
                    at online checkout.
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm font-bold text-maroon">
            One discount per order — Happy Hour and the Senior Discount can&apos;t be
            combined.
          </p>
        </div>
      </section>

      {/* Everyday combo deals */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-container px-5 sm:px-8">
          <h2 className="font-display uppercase text-display-lg text-maroon">Everyday Combo Deals</h2>
          <p className="mt-2 text-muted">Standing deals — no code needed.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {everydayDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
          <p className="mt-6 text-xs text-muted">
            Prices in CAD, exclusive of HST and subject to change.
          </p>
        </div>
      </section>

      <OrderCTA heading="Grab a deal tonight" sub="Order online for pickup or delivery." />
    </>
  );
}
