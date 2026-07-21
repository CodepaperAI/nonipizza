/**
 * Deals — everyday deals + coupon deals (with codes). Rendered on /deals and the homepage
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
  /** Coupon code, if this is a coupon deal. */
  code?: string;
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
    includes: ["1 pizza with 1 topping", "1 dipping free"],
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

/** Coupon deals (each has a code). */
export const couponDeals: Deal[] = [
  {
    id: "coupon-shawarma-combo",
    name: "Shawarma Sandwiches Combo",
    includes: ["2 shawarma sandwiches combo"],
    prices: [{ label: "", price: 11.99 }],
    code: "010425",
    accent: "sky",
    image: "/images/coupon-shawarma-combo.svg",
    featured: true,
  },
  {
    id: "coupon-2-platters",
    name: "Noni's 2 Platters Special",
    includes: ["2 shawarma platters"],
    prices: [{ label: "", price: 26.99 }],
    code: "020425",
    accent: "pink",
    image: "/images/coupon-2-platters.svg",
    featured: true,
  },
  {
    id: "coupon-testy-combo",
    name: "$10 Deal – Testy Combo",
    includes: ["Small shawarma sandwich", "Baklava"],
    prices: [{ label: "", price: 10.0 }],
    code: "030425",
    accent: "yellow",
    image: "/images/coupon-testy-combo.svg",
  },
  {
    id: "coupon-family-meal-10off",
    name: "10% off Shawarma Family Meal",
    includes: ["10% off Family Meal / Meal Mixed"],
    prices: [],
    code: "040425",
    accent: "orange",
    image: "/images/coupon-family-meal.svg",
  },
  {
    id: "coupon-family-feast-10off",
    name: "10% off Pizza Family Feast",
    includes: ["10% off the Family Feast Deal"],
    prices: [],
    code: "050425",
    accent: "red",
    image: "/images/coupon-family-feast.svg",
  },
  {
    id: "coupon-double-deal",
    name: "Noni's Pizza Double Deal",
    includes: ["2 medium pizzas", "2 toppings each"],
    prices: [{ label: "", price: 20.99 }],
    code: "060425",
    accent: "sky",
    image: "/images/coupon-double-deal.svg",
    featured: true,
  },
  {
    id: "coupon-messy-fries",
    name: "New Messy Fries with Chicken",
    includes: ["Messy fries topped with chicken"],
    prices: [{ label: "", price: 11.99 }],
    code: "070425",
    accent: "yellow",
    image: "/images/coupon-messy-fries.svg",
    featured: true,
  },
];

/** Standing everyday specials (banner / find-us copy). */
export const everydaySpecials = [
  "Seniors save 10% Mon–Thu",
  "Happy Hour 2–5 PM daily (10% off $25+)",
  "Free delivery after 3 PM (3 km, $25+ min)",
];

export const featuredDeals = (): Deal[] =>
  [...couponDeals, ...everydayDeals].filter((d) => d.featured);
