import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { Button } from "./ui/Button";
import { siteConfig } from "@/lib/site";
import { primaryLocation, formattedAddress } from "@/data/locations";

const quickLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Deals", href: "/deals" },
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
  { label: "Shawarma", href: "/shawarma-woodstock" },
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
              <h2 className="mb-4 mt-8 text-label font-bold uppercase tracking-widest text-orange">
                Get the App
              </h2>
              <div className="flex flex-col gap-2">
                <StoreBadge store="apple" href={siteConfig.appLinks.apple} />
                <StoreBadge store="google" href={siteConfig.appLinks.google} />
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-display-lg uppercase leading-none">
              Never Miss a<br />
              <span className="text-orange">Deal</span> Again
            </h2>
            <p className="mt-3 text-sm text-cream/80">
              Get Noni&apos;s specials, new menu drops & coupon codes straight to
              your inbox.
            </p>
            <form
              className="mt-4 flex flex-col gap-2 sm:flex-row"
              action={siteConfig.orderUrl}
              method="get"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                placeholder="you@email.com"
                className="w-full rounded-full bg-cream px-5 py-3 text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              />
              <button
                type="submit"
                className="rounded-full bg-orange px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-cream/60">No spam, ever.</p>
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
              <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-orange">
                Facebook
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

function StoreBadge({ store, href }: { store: "apple" | "google"; href: string }) {
  const label = store === "apple" ? "App Store" : "Google Play";
  const top = store === "apple" ? "Download on the" : "Get it on";
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-xl bg-cream/10 px-4 py-2 ring-1 ring-cream/20 transition hover:bg-cream/20"
      aria-label={`${top} ${label} (placeholder)`}
    >
      <span aria-hidden="true" className="text-2xl">
        {store === "apple" ? "" : "▶"}
      </span>
      <span className="leading-tight">
        <span className="block text-[0.6rem] uppercase text-cream/70">{top}</span>
        <span className="block text-sm font-bold">{label}</span>
      </span>
    </a>
  );
}
