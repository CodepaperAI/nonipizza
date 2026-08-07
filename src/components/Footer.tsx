import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { Button } from "./ui/Button";
import { SendQueryForm } from "./SendQueryForm";
import { siteConfig } from "@/lib/site";
import { primaryLocation, formattedAddress } from "@/data/locations";

const quickLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Deals", href: "/deals" },
  { label: "Blog", href: "/blog" },
  { label: "Find Us", href: "/find-us" },
  { label: "Reviews", href: "/reviews" },
  { label: "Pizza Near Me", href: "/pizza-near-me-woodstock" },
  { label: "Order Online", href: "/order-pizza-online-woodstock" },
  { label: "Pizza Delivery", href: "/pizza-delivery-woodstock" },
  { label: "Best Pizza", href: "/best-pizza-woodstock" },
  { label: "Indian Fusion Pizza", href: "/indian-fusion-pizza-woodstock" },
  { label: "Dine-In Pizza", href: "/dine-in-pizza-woodstock" },
  { label: "Local vs. Chains", href: "/pizza-delivery-woodstock-vs-chains" },
  { label: "Chicken Wings", href: "/chicken-wings-woodstock" },
];

const legalLinks = [
  { label: "Privacy", href: "/find-us#legal" },
  { label: "Terms", href: "/find-us#legal" },
  { label: "Refund", href: "/find-us#legal" },
];

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  primaryLocation.mapQuery
)}&output=embed`;

export function Footer() {
  return (
    <footer className="bg-maroon text-cream">
      <div className="mx-auto max-w-container px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1.2fr]">
          {/* Quick links + legal */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="mb-4 text-label font-bold uppercase tracking-widest text-orange">
                Quick Links
              </h2>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="hover:text-orange">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-label font-bold uppercase tracking-widest text-orange">
                Legal
              </h2>
              <ul className="space-y-2 text-sm">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-orange">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Send a query */}
          <div>
            <SendQueryForm />
          </div>

          {/* Map + come say hi */}
          <div>
            <h2 className="mb-4 text-label font-bold uppercase tracking-widest text-orange">
              Come Say Hi
            </h2>
            <div className="overflow-hidden rounded-3xl ring-1 ring-cream/15">
              <iframe
                title="Map to Noni's Pizza & Wings, Woodstock ON"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-48 w-full border-0"
              />
            </div>
            <address className="mt-4 space-y-1 text-sm not-italic text-cream/90">
              <p>{formattedAddress}</p>
              <p>{primaryLocation.city}, {primaryLocation.region} {primaryLocation.postalCode}</p>
              <p>
                {primaryLocation.phones.map((p, i) => (
                  <span key={p}>
                    <a href={`tel:${p.replace(/[^\d]/g, "")}`} className="hover:text-orange">
                      {p}
                    </a>
                    {i < primaryLocation.phones.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
              {primaryLocation.hours.map((h) => (
                <p key={h.label}>{h.label}</p>
              ))}
            </address>
            <div className="mt-3 flex gap-3 text-sm">
              <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-orange">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Order CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-maroon-900 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-lg font-bold">{siteConfig.tagline}</p>
          <Button href={siteConfig.orderUrl} external variant="filled" size="md">
            Order Now →
          </Button>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="overflow-hidden border-t border-cream/10 px-5 pt-8">
        <div className="mx-auto flex max-w-container justify-center">
          <Wordmark size="giant" href="/" />
        </div>
      </div>

      {/* Fine print */}
      <div className="mx-auto max-w-container px-5 py-6 text-center text-xs text-cream/60 sm:px-8">
        <p>
          Products may contain nuts, peanuts, and other allergens; cross-contamination
          possible — please inform staff before ordering. Prices exclusive of HST and
          subject to change.
        </p>
        <p className="mt-2">
          © {2026} {siteConfig.name}. Locally owned in Woodstock, Ontario.
        </p>
      </div>
    </footer>
  );
}
