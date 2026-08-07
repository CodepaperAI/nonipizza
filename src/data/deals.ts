/**
 * Deals — everyday combo deals. Rendered on /deals and the homepage
 * "COMBOS THAT MAKE SENSE" section. Accent colors rotate per DESIGN.md.
 */

export type Accent = "orange" | "yellow" | "sky" | "pink" | "red";

export interface DealPrice {
  label: string; // e.g. "Medium", "Large", "X-Large", or ""
  price: number;
}

export interface Deal {
  id: string;
  name: string;
  /** Short headline / subtitle. */
  blurb?: string;
  /** Bulleted contents. */
  includes: string[];
  /** One or more prices (sizes). */
  prices: DealPrice[];
  /** Optional original price for strike-through. */
  wasPrice?: number;
  /** Optional "SAVE $X" amount for the pill. */
  save?: number;
  accent: Accent;
  image: string;
  /** Surface in homepage deals section. */
  featured?: boolean;
}

/** Everyday / standing deals (Deal 1–4). */
export const everydayDeals: Deal[] = [
  {
    id: "deal-1-pickup",
    name: "Pickup / Walk-in Special",
    blurb: "Deal 1",
    // "1 dipping" — the dip is part of the deal, but never call it free (client, Aug 2026).
    includes: ["1 pizza with 1 topping", "1 dipping"],
    prices: [
      { label: "Small", price: 8.99 },
      { label: "Medium", price: 10.99 },
      { label: "Large", price: 13.99 },
      { label: "X-Large", price: 16.99 },
    ],
    accent: "orange",
    image: "/images/deal-pickup.svg",
    featured: true,
  },
  {
    id: "deal-2-double",
    name: "Double Pizza",
    blurb: "Deal 2",
    includes: ["2 pizzas, 4 toppings each", "2 dips OR 2 cans of pop"],
    prices: [
      { label: "Medium", price: 32.99 },
      { label: "Large", price: 36.99 },
      { label: "X-Large", price: 40.99 },
    ],
    accent: "yellow",
    image: "/images/deal-double.svg",
    featured: true,
  },
  {
    id: "deal-3-family-feast",
    name: "Family Feast",
    blurb: "Deal 3",
    includes: [
      "2 pizzas, 4 toppings each",
      "2 lbs wings",
      "Garlic fingers OR large fries",
      "3 dips OR 3 cans of pop",
    ],
    prices: [
      { label: "Medium", price: 59.99 },
      { label: "Large", price: 64.99 },
      { label: "X-Large", price: 69.99 },
    ],
    accent: "sky",
    image: "/images/deal-family-feast.svg",
    featured: true,
  },
  {
    id: "deal-4a-pizza-wings",
    name: "Pizza & Wings Combo",
    blurb: "Deal 4",
    includes: ["1 pizza, 4 toppings", "1 lb wings", "3 pops or dips"],
    prices: [
      { label: "Medium", price: 28.99 },
      { label: "Large", price: 31.99 },
      { label: "X-Large", price: 35.99 },
    ],
    accent: "pink",
    image: "/images/deal-pizza-wings.svg",
  },
  {
    id: "deal-4b-pizza-wings",
    name: "Pizza & Wings Combo — 2 lb",
    blurb: "Deal 4",
    includes: ["1 pizza, 4 toppings", "2 lb wings", "3 pops or dips"],
    prices: [
      { label: "Medium", price: 37.99 },
      { label: "Large", price: 40.99 },
      { label: "X-Large", price: 44.99 },
    ],
    accent: "red",
    image: "/images/deal-pizza-wings.svg",
  },
  {
    id: "deal-4c-pizza-wings",
    name: "Double Pizza & Wings Combo",
    blurb: "Deal 4",
    includes: ["2 pizzas, 4 toppings each", "1 lb wings", "3 pops or dips"],
    prices: [
      { label: "Medium", price: 41.99 },
      { label: "Large", price: 46.99 },
      { label: "X-Large", price: 51.99 },
    ],
    accent: "orange",
    image: "/images/deal-pizza-wings.svg",
  },
  {
    id: "deal-4d-pizza-wings",
    name: "Double Pizza & 2 lb Wings Combo",
    blurb: "Deal 4",
    includes: ["2 pizzas, 4 toppings each", "2 lb wings", "3 pops or dips"],
    prices: [
      { label: "Medium", price: 51.99 },
      { label: "Large", price: 56.99 },
      { label: "X-Large", price: 61.99 },
    ],
    accent: "yellow",
    image: "/images/deal-pizza-wings.svg",
  },
];

/** Standing everyday specials (banner / find-us copy). */
export const everydaySpecials = [
  "Seniors save 10% Mon–Thu",
  "Happy Hour 2–5 PM daily (10% off $25+)",
];

export const featuredDeals = (): Deal[] =>
  everydayDeals.filter((d) => d.featured);

