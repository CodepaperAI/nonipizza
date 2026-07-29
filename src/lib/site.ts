import { primaryLocation } from "@/data/locations";

/**
 * Central site configuration. Every "Order Now" CTA and all NAP data flows from here
 * (see CLAUDE.md §5). NAP itself lives in src/data/locations.ts to keep it identical
 * site-wide for local SEO.
 */
export const siteConfig = {
  name: "Noni's Pizza & Wings",
  tagline:
    "Freshly Prepared, Never Pre-Cooked, Simply Delicious, Made Just for You!",
  shortDescription:
    "Locally owned pizza, baked wings & Indian-fusion pizzas in Woodstock, ON. Order online for pickup or delivery.",
  // External ordering URL — Mealsy online ordering. Overridable via NEXT_PUBLIC_ORDER_URL.
  orderUrl:
    process.env.NEXT_PUBLIC_ORDER_URL ??
    "https://onlineordering.mealsy.ca/en/#/Nonis-Pizza-And-Wings/online/menus",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nonispizza.ca",
  priceRange: "$$",
  cuisines: ["Pizza", "Chicken Wings", "Indian"],
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
  location: primaryLocation,
} as const;

export type SiteConfig = typeof siteConfig;
