import { siteConfig } from "./site";
import { primaryLocation, formattedAddress } from "@/data/locations";
import { menuItems, menuPageOrder, startingPrice, type MenuItem } from "@/data/menu";

/**
 * JSON-LD builders (CLAUDE.md §7). Rendered via <script type="application/ld+json">.
 * All NAP data comes from src/data/locations.ts to stay consistent.
 */

const ORG_ID = `${siteConfig.siteUrl}/#restaurant`;

function openingHoursSpecification() {
  return primaryLocation.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

/** Restaurant / LocalBusiness — used in the root layout on every page. */
export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": ORG_ID,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    url: siteConfig.siteUrl,
    telephone: primaryLocation.phones[0],
    servesCuisine: siteConfig.cuisines,
    priceRange: siteConfig.priceRange,
    // Real photography in the three crops Google asks for (16:9, 4:3, 1:1). Must be a
    // raster format — Google's structured-data image guidance excludes SVG.
    image: [
      `${siteConfig.siteUrl}/images/photos/brand-16x9.jpg`,
      `${siteConfig.siteUrl}/images/photos/brand-4x3.jpg`,
      `${siteConfig.siteUrl}/images/photos/brand-1x1.jpg`,
    ],
    slogan: siteConfig.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${primaryLocation.street}, ${primaryLocation.unit}`,
      addressLocality: primaryLocation.city,
      addressRegion: primaryLocation.regionCode,
      postalCode: primaryLocation.postalCode,
      addressCountry: primaryLocation.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: primaryLocation.geo.lat,
      longitude: primaryLocation.geo.lng,
    },
    openingHoursSpecification: openingHoursSpecification(),
    hasMenu: `${siteConfig.siteUrl}/menu`,
    acceptsReservations: "False",
    potentialAction: {
      "@type": "OrderAction",
      target: siteConfig.orderUrl,
      deliveryMethod: [
        "http://purl.org/goodrelations/v1#DeliveryModePickUp",
        "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
      ],
    },
    sameAs: Object.values(siteConfig.socials),
  };
}

/** Full Menu schema for /menu. */
export function menuJsonLd() {
  const sections = menuPageOrder
    .map((cat) => {
      const items = menuItems.filter((i) => i.category === cat.id);
      if (!items.length) return null;
      return {
        "@type": "MenuSection",
        name: cat.label,
        hasMenuItem: items.map((item: MenuItem) => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          offers: {
            "@type": "Offer",
            price: startingPrice(item).toFixed(2),
            priceCurrency: "CAD",
          },
        })),
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${siteConfig.name} Menu`,
    url: `${siteConfig.siteUrl}/menu`,
    hasMenuSection: sections,
  };
}

/** BreadcrumbList. items = [{name, path}] in order, path relative "/...". */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: new URL(it.path, siteConfig.siteUrl).toString(),
    })),
  };
}

/** HowTo — for order/how-to pages. steps = [{name, text}]. */
export function howToJsonLd(opts: {
  name: string;
  description?: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${siteConfig.orderUrl}`,
    })),
  };
}

/** FAQPage from Q/A pairs. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export { formattedAddress };
