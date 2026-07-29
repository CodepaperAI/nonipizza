import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/Faq";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd, restaurantJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";
import { primaryLocation, formattedAddress } from "@/data/locations";
import { everydaySpecials } from "@/data/deals";

export const metadata = buildMetadata({
  title: "Find Us in Woodstock, ON | Noni's Pizza & Wings",
  description:
    "Noni's Pizza & Wings — 300 Main St, Unit 8, Woodstock, ON N4S 1T3. Hours, phone, map, directions and delivery area. Open late Fri–Sat until 2 AM.",
  path: "/find-us",
});

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  primaryLocation.mapQuery
)}&output=embed`;

const faqs = [
  {
    q: "Where is Noni's Pizza & Wings located?",
    a: `We're at ${formattedAddress}, ${primaryLocation.city}, ${primaryLocation.regionCode} ${primaryLocation.postalCode}, Canada — on Main Street in Woodstock.`,
  },
  {
    q: "What are your hours?",
    a: "Mon–Thu & Sun 11:00 AM–11:00 PM; Fri–Sat 11:00 AM–2:00 AM.",
  },
  {
    q: "What's your delivery area?",
    a: `Delivery within ${primaryLocation.delivery.radiusKm} km on orders $${primaryLocation.delivery.minSubtotal}+. We also offer pickup and dine-in.`,
  },
  {
    q: "How can I reach you?",
    a: `Call us at ${primaryLocation.phones.join(" or ")}, or order online any time.`,
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          restaurantJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Find Us", path: "/find-us" },
          ]),
          faqJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow="Find Us"
        title="Find Noni's in Woodstock"
        lead="Come say hi. We're on Main Street in Woodstock, open late every night — dine in, pick up, or get it delivered to your door."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Find Us", path: "/find-us" },
        ]}
      />

      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto grid max-w-container gap-8 px-5 sm:px-8 lg:grid-cols-2">
          {/* Info cards */}
          <div className="space-y-4">
            <InfoCard title="Address">
              <address className="not-italic">
                {formattedAddress}
                <br />
                {primaryLocation.city}, {primaryLocation.region} {primaryLocation.postalCode}, {primaryLocation.country}
              </address>
              <a
                className="mt-2 inline-block font-bold text-orange underline"
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(primaryLocation.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions →
              </a>
            </InfoCard>

            <InfoCard title="Phone">
              {primaryLocation.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/[^\d]/g, "")}`} className="block font-bold text-maroon hover:text-orange">
                  {p}
                </a>
              ))}
            </InfoCard>

            <InfoCard title="Hours">
              {primaryLocation.hours.map((h) => (
                <p key={h.label}>{h.label}</p>
              ))}
            </InfoCard>

            <InfoCard title="Delivery & specials">
              <p>{primaryLocation.delivery.note}</p>
              <ul className="mt-2 list-disc pl-5">
                {everydaySpecials.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm">
                Prefer to eat in? See{" "}
                <Link href="/dine-in-pizza-woodstock" className="font-bold text-orange underline">
                  dine-in pizza in Woodstock
                </Link>
                , or{" "}
                <Link href="/order-pizza-online-woodstock" className="font-bold text-orange underline">
                  order pizza online
                </Link>
                .
              </p>
            </InfoCard>
          </div>

          {/* Map */}
          <div>
            <div className="overflow-hidden rounded-3xl shadow-card">
              <iframe
                title={`Map to ${siteConfig.name}, Woodstock ON`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[28rem] w-full border-0"
              />
            </div>
            <p className="mt-3 text-sm text-muted">
              Parking is available on and around Main Street. Look for the orange “N”.
            </p>
          </div>
        </div>
      </section>

      {/* Legal anchor */}
      <section id="legal" className="scroll-mt-28 bg-cream pb-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-display uppercase text-display-lg text-maroon">Legal</h2>
          <div className="mt-4 space-y-3 text-sm text-muted">
            <p>
              <strong className="text-maroon">Privacy:</strong> We only use contact details you
              provide to process your order and, if you opt in, to send occasional deals. We never
              sell your information.
            </p>
            <p>
              <strong className="text-maroon">Terms:</strong> Prices are in CAD, exclusive of HST and
              subject to change. Menu items and availability may vary.
            </p>
            <p>
              <strong className="text-maroon">Refunds:</strong> If something isn&apos;t right with your
              order, call us at {primaryLocation.phones[0]} and we&apos;ll make it right.
            </p>
            <p>
              <strong className="text-maroon">Allergens:</strong> Products may contain nuts, peanuts and
              other allergens; cross-contamination is possible — please inform staff before ordering.
            </p>
          </div>
        </div>
      </section>

      <Faq faqs={faqs} />
      <OrderCTA heading="See you soon" sub="Dine in, pick up, or order online for delivery." />
    </>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-card">
      <h2 className="text-label font-bold uppercase tracking-widest text-orange">{title}</h2>
      <div className="mt-2 text-ink">{children}</div>
    </div>
  );
}
