/**
 * FULL MENU — canonical, typed. Page copy must match this (CLAUDE.md §6). Prices CAD,
 * exclusive of HST. Pizza sizes: Small 10" / Medium 12" / Large 14" / X-Large 16"
 * unless noted.
 *
 * `variants` = one or more priced sizes/options. Single-price items have one variant.
 * `image` is a slot path under /public/images (see DESIGN.md §7) — drop real photos there.
 */

export type MenuCategoryId =
  | "salads"
  | "pizza"
  | "indian-fusion"
  | "deals"
  | "panzerotti"
  | "wings"
  | "sides"
  | "dips"
  | "desserts"
  | "ice-cream"
  | "drinks";

export interface PriceVariant {
  /** e.g. "Small", "Large", "Medium 12\"", "1 LB", or "" for single-price. */
  label: string;
  price: number;
  /** Optional note e.g. "+$2.49" or "Medium only". */
  note?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  category: MenuCategoryId;
  /** Optional grouping heading within a category (e.g. "Platters", "Wraps"). */
  group?: string;
  variants: PriceVariant[];
  /** Extra descriptive tags shown as chips. */
  tags?: string[];
  isNew?: boolean;
  /** Surface in homepage "HOT SELLING" featured set. */
  featured?: boolean;
  image: string;
}

export interface MenuCategoryMeta {
  id: MenuCategoryId;
  label: string;
  /** Short menu-page / carousel blurb. */
  blurb: string;
  image: string;
  /** Accent token name for cards, rotated in DESIGN.md order. */
  accent: "orange" | "yellow" | "sky" | "pink" | "red";
}

/** Category metadata for menu jump-nav + homepage category carousel. */
export const menuCategories: MenuCategoryMeta[] = [
  { id: "pizza", label: "Pizzas", blurb: "Specialty, signature & build-your-own — freshly made to order.", image: "/images/category-pizza.svg", accent: "orange" },
  // Wings are ALWAYS baked — never fried. Do not reintroduce "deep-fried" here or anywhere
  // else on the wings line; it contradicts the brand's healthier-wings positioning.
  { id: "wings", label: "Wings", blurb: "Always baked, 9 sauces, 1–4 LB.", image: "/images/category-wings.svg", accent: "yellow" },
  { id: "indian-fusion", label: "Indian Fusion", blurb: "Butter chicken, tandoori & spicy paneer pizzas.", image: "/images/category-indian-fusion.svg", accent: "pink" },
  { id: "panzerotti", label: "Panzerotti", blurb: "Handcrafted, baked or deep-fried, 4 toppings.", image: "/images/category-panzerotti.svg", accent: "red" },
  { id: "sides", label: "Sides", blurb: "Fries, poutine, garlic fingers, samosas & more.", image: "/images/category-sides.svg", accent: "orange" },
  { id: "ice-cream", label: "Ice Cream", blurb: "Kawartha ice cream — 11 flavours.", image: "/images/category-ice-cream.svg", accent: "sky" },
];

/** All jump-nav categories on the /menu page, in render order. */
export const menuPageOrder: { id: MenuCategoryId; label: string }[] = [
  { id: "pizza", label: "Pizzas" },
  { id: "indian-fusion", label: "Indian Fusion Pizzas" },
  { id: "wings", label: "Chicken Wings" },
  { id: "panzerotti", label: "Panzerotti" },
  { id: "deals", label: "Everyday Deals" },
  { id: "salads", label: "Salads" },
  { id: "sides", label: "Side Orders" },
  { id: "dips", label: "Dipping Sauces" },
  { id: "desserts", label: "Desserts" },
  { id: "ice-cream", label: "Kawartha Ice Cream" },
  { id: "drinks", label: "Drinks" },
];

const SIZES4 = (s: number, m: number, l: number, xl: number): PriceVariant[] => [
  { label: 'Small 10"', price: s },
  { label: 'Medium 12"', price: m },
  { label: 'Large 14"', price: l },
  { label: 'X-Large 16"', price: xl },
];

const ML = (m: number, l: number): PriceVariant[] => [
  { label: "Medium", price: m },
  { label: "Large", price: l },
];

const ONE = (price: number, label = ""): PriceVariant[] => [{ label, price }];

export const menuItems: MenuItem[] = [
  // ─────────────────────────────── SALADS ───────────────────────────────
  { id: "salad-caesar", name: "Caesar Salad", category: "salads", image: "/images/salad-caesar.svg", variants: ML(8.99, 10.99), description: "Romaine, croutons, bacon, parmesan & caesar dressing." },
  { id: "salad-greek", name: "Greek Salad", category: "salads", image: "/images/salad-greek.svg", variants: ML(8.99, 10.99), description: "Romaine, mixed veg, black olives, feta & greek dressing." },
  { id: "salad-garden", name: "Garden Salad", category: "salads", image: "/images/salad-garden.svg", variants: ML(8.99, 10.99), description: "Romaine, mixed veg & balsamic." },
  { id: "salad-julienne", name: "Julienne Salad", category: "salads", image: "/images/salad-julienne.svg", variants: ML(9.99, 11.99), description: "Romaine, mixed veg, ham, cheese & ranch." },
  { id: "salad-chicken", name: "Chicken Salad", category: "salads", image: "/images/salad-chicken.svg", variants: ML(10.99, 12.99), description: "Chicken, romaine, mixed veg, turnip, pickle & garlic sauce." },
  { id: "salad-chicken-caesar", name: "Chicken Caesar Salad", category: "salads", image: "/images/salad-chicken-caesar.svg", variants: ML(10.99, 12.99), description: "Chicken, bacon, romaine, croutons, parmesan & caesar." },

  // ────────────────────────── SPECIALTY PIZZAS ──────────────────────────
  { id: "pizza-hawaiian", name: "Hawaiian", category: "pizza", group: "Specialty Pizzas", tags: ["3 toppings", "sauce & mozzarella"], featured: true, image: "/images/pizza-hawaiian.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Bacon, ham & pineapple." },
  { id: "pizza-canadian", name: "Canadian", category: "pizza", group: "Specialty Pizzas", tags: ["3 toppings"], image: "/images/pizza-canadian.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Pepperoni, bacon & mushrooms." },
  { id: "pizza-deluxe", name: "Deluxe", category: "pizza", group: "Specialty Pizzas", tags: ["3 toppings"], image: "/images/pizza-deluxe.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Pepperoni, mushrooms & green peppers." },
  { id: "pizza-woodstock-special", name: "Woodstock Special", category: "pizza", group: "Specialty Pizzas", tags: ["3 toppings"], featured: true, image: "/images/pizza-woodstock-special.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Bacon, pepperoni & pancetta." },
  { id: "pizza-bbq-chicken", name: "BBQ Chicken", category: "pizza", group: "Specialty Pizzas", tags: ["3 toppings", "BBQ base"], image: "/images/pizza-bbq-chicken.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Chicken, red onions & green peppers on a BBQ base." },
  { id: "pizza-mexican", name: "Mexican", category: "pizza", group: "Specialty Pizzas", tags: ["3 toppings"], image: "/images/pizza-mexican.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Ground beef, mushrooms & jalapenos." },
  { id: "pizza-dill-pickle", name: "Dill Pickle", category: "pizza", group: "Specialty Pizzas", tags: ["3 toppings", "garlic base"], image: "/images/pizza-dill-pickle.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Bacon, pickle & dillweed seasoning on a garlic base." },

  // ────────────────────────── SIGNATURE PIZZAS ──────────────────────────
  { id: "pizza-meat-lover", name: "Meat Lover", category: "pizza", group: "Signature Pizzas", tags: ["4 toppings"], featured: true, image: "/images/pizza-meat-lover.svg", variants: SIZES4(15.99, 18.99, 20.99, 23.99), description: "Pepperoni, bacon, italian sausage & ground beef." },
  { id: "pizza-cheese-burger", name: "Cheese Burger", category: "pizza", group: "Signature Pizzas", tags: ["4 toppings"], image: "/images/pizza-cheese-burger.svg", variants: SIZES4(15.99, 18.99, 20.99, 23.99), description: "Signature sauce, beef, bacon strips, red onions, pickle & cheddar." },
  { id: "pizza-chicken-shawarma", name: "Chicken Shawarma Pizza", category: "pizza", group: "Signature Pizzas", tags: ["4 toppings"], featured: true, image: "/images/pizza-chicken-shawarma.svg", variants: SIZES4(15.99, 18.99, 20.99, 23.99), description: "Red onions, dazzling garlic sauce, tomatoes, green olives & hot peppers." },
  { id: "pizza-nonis-special", name: "Noni's Special", category: "pizza", group: "Signature Pizzas", tags: ["4 toppings"], image: "/images/pizza-nonis-special.svg", variants: SIZES4(15.99, 18.99, 20.99, 23.99), description: "Pepperoni, bacon strips, mushrooms & red onions." },

  // ──────────────────────── INDIAN FUSION PIZZAS ────────────────────────
  // No "FREE 1 dipping + 1 pop" perk — discontinued per client review, do not re-add.
  { id: "pizza-butter-chicken", name: "Butter Chicken Pizza", category: "indian-fusion", featured: true, image: "/images/pizza-butter-chicken.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Creamy butter chicken base topped with tender chicken." },
  { id: "pizza-butter-paneer", name: "Butter Paneer Pizza", category: "indian-fusion", tags: ["vegetarian"], image: "/images/pizza-butter-paneer.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Butter paneer base topped with paneer." },
  { id: "pizza-tandoori-chicken", name: "Tandoori Chicken Pizza", category: "indian-fusion", featured: true, image: "/images/pizza-tandoori-chicken.svg", variants: SIZES4(16.99, 19.99, 22.99, 25.99), description: "Tandoori base, chicken, red onions & green peppers." },
  { id: "pizza-tandoori-paneer", name: "Tandoori Paneer Pizza", category: "indian-fusion", tags: ["vegetarian"], image: "/images/pizza-tandoori-paneer.svg", variants: SIZES4(16.99, 19.99, 22.99, 25.99), description: "Tandoori base, paneer, red onions & green peppers." },
  { id: "pizza-spicy-chicken", name: "Spicy Chicken Pizza", category: "indian-fusion", isNew: true, image: "/images/pizza-spicy-chicken.svg", variants: SIZES4(16.99, 19.99, 22.99, 25.99), description: "Spicy base, chicken, red onions, jalapenos, cilantro & green peppers." },
  { id: "pizza-spicy-paneer", name: "Spicy Paneer Pizza", category: "indian-fusion", tags: ["vegetarian"], isNew: true, image: "/images/pizza-spicy-paneer.svg", variants: SIZES4(16.99, 19.99, 22.99, 25.99), description: "Spicy base, paneer, red onions, jalapenos, cilantro & green peppers." },

  // ──────────────────────── VEGGIE FANS PIZZAS ─────────────────────────
  { id: "pizza-garden", name: "Garden Pizza", category: "pizza", group: "Veggie Fans Pizzas", tags: ["vegetarian", "sauce & mozzarella"], image: "/images/pizza-garden.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Mushrooms, red onions, green peppers & tomatoes." },
  { id: "pizza-greek", name: "Greek Pizza", category: "pizza", group: "Veggie Fans Pizzas", tags: ["vegetarian"], image: "/images/pizza-greek.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Feta, black olives, red onions & tomatoes." },
  { id: "pizza-3-cheese", name: "3 Cheese Pizza", category: "pizza", group: "Veggie Fans Pizzas", tags: ["vegetarian"], image: "/images/pizza-3-cheese.svg", variants: SIZES4(14.99, 17.99, 19.99, 22.99), description: "Cheddar, feta & mozzarella." },

  // ─────────────────────── CREATE YOUR OWN PIZZA ───────────────────────
  { id: "pizza-create-your-own", name: "Create Your Own Pizza", category: "pizza", group: "Create Your Own", tags: ["toppings", "any sauce & crust"], featured: true, image: "/images/pizza-create-your-own.svg", variants: SIZES4(8.99, 10.99, 13.99, 16.99), description: "Build it your way — choose your toppings, any sauce & crust. Crusts: Traditional, Thin, Thick, Gluten-Free (Medium only). Extra topping: S $1 / M $1.49 / L $1.99 / XL $2.49 / Party $3." },

  // ─────────────────── HIP HIP HOORAY PARTY PIZZA ──────────────────────
  // No "2 dippings free" — the free-dipping claim is discontinued, do not re-add.
  { id: "party-pizza-1", name: "Party Pizza — 1 Topping", category: "pizza", group: "Hip Hip Hooray Party Pizza", tags: ['21"×15"', "18 slices"], image: "/images/party-pizza.svg", variants: ONE(26.99), description: "Giant 21\"×15\" party pizza, 18 slices — 1 topping." },
  { id: "party-pizza-4", name: "Party Pizza — 4 Toppings", category: "pizza", group: "Hip Hip Hooray Party Pizza", tags: ['21"×15"', "18 slices"], image: "/images/party-pizza.svg", variants: ONE(32.99), description: "Giant 21\"×15\" party pizza, 18 slices — 4 toppings." },

  // ─────────────────────────── PANZEROTTI ─────────────────────────────
  { id: "panzerotti-medium", name: "Handcrafted Panzerotti — Medium", category: "panzerotti", tags: ['12"', "4 toppings + 1 marinara"], image: "/images/panzerotti.svg", variants: ONE(18.49), description: "Baked or deep-fried, 4 toppings with 1 marinara dip." },
  { id: "panzerotti-large", name: "Handcrafted Panzerotti — Large", category: "panzerotti", tags: ['14"', "4 toppings + 1 marinara"], image: "/images/panzerotti.svg", variants: ONE(20.49), description: "Baked or deep-fried, 4 toppings with 1 marinara dip." },

  // ───────────────────────── CHICKEN WINGS ────────────────────────────
  { id: "wings-baked", name: "Baked Wings", category: "wings", tags: ["9 sauces"], featured: true, image: "/images/wings-baked.svg", description: "Signature wings — baked, never fried. 9 sauces: Mild, Medium & Hot, Honey Garlic, BBQ, Sweet Thai, Buffalo, Suicide, Fire & Ice, Blue Cheese.", variants: [{ label: "1 LB", price: 13.99 }, { label: "2 LB", price: 24.99 }, { label: "3 LB", price: 35.99 }, { label: "4 LB", price: 52.99 }] },
  { id: "wings-breaded", name: "Breaded Wings", category: "wings", tags: ["9 sauces"], image: "/images/wings-breaded.svg", description: "Crispy breaded, tossed in your choice of 9 sauces.", variants: [{ label: "1 LB", price: 13.99 }, { label: "2 LB", price: 24.99 }, { label: "3 LB", price: 35.99 }, { label: "4 LB", price: 52.99 }] },
  { id: "wings-boneless", name: "Boneless Wings", category: "wings", tags: ["9 sauces"], image: "/images/wings-boneless.svg", description: "Boneless bites tossed in your choice of 9 sauces.", variants: [{ label: "1 LB", price: 12.49 }, { label: "2 LB", price: 23.49 }, { label: "3 LB", price: 34.49 }, { label: "4 LB", price: 51.49 }] },

  // ───────────────────────── SIDE ORDERS ──────────────────────────────
  { id: "side-fries", name: "Fries", category: "sides", image: "/images/side-fries.svg", variants: [{ label: "Medium", price: 4.99 }, { label: "Large", price: 6.99 }] },
  { id: "side-wedges", name: "Potato Wedges", category: "sides", image: "/images/side-wedges.svg", variants: [{ label: "Medium", price: 7.99 }, { label: "Large", price: 9.99 }] },
  { id: "side-onion-rings", name: "Onion Rings", category: "sides", image: "/images/side-onion-rings.svg", variants: [{ label: "Medium", price: 7.99 }, { label: "Large", price: 9.99 }] },
  { id: "side-poutine", name: "Poutine", category: "sides", image: "/images/side-poutine.svg", variants: [{ label: "Medium", price: 8.99 }, { label: "Large", price: 10.99 }] },
  { id: "side-messy-fries-chicken", name: "Messy Fries with Chicken", category: "sides", isNew: true, image: "/images/side-messy-fries.svg", variants: [{ label: "Medium", price: 13.99 }, { label: "Large", price: 15.99 }] },
  { id: "side-butter-chicken-fries", name: "Butter Chicken Fries", category: "sides", featured: true, image: "/images/side-butter-chicken-fries.svg", variants: [{ label: "Medium", price: 8.99 }, { label: "Large", price: 11.99 }] },
  { id: "side-loaded-veggie-fries", name: "Loaded Veggie Fries", category: "sides", image: "/images/side-loaded-veggie-fries.svg", variants: [{ label: "Medium", price: 10.99 }, { label: "Large", price: 12.99 }] },
  { id: "side-cheese-curds", name: "Cheese Pop Curds", category: "sides", image: "/images/side-cheese-curds.svg", variants: [{ label: "Medium", price: 12.99 }, { label: "Large", price: 20.99 }] },
  { id: "side-cauliflower-bites", name: "Cauliflower Bites", category: "sides", image: "/images/side-cauliflower-bites.svg", variants: ONE(8.99) },
  { id: "side-veg-samosa", name: "Vegetable Samosa", category: "sides", image: "/images/side-veg-samosa.svg", variants: ONE(0.99) },
  { id: "side-chicken-samosa", name: "Chicken Samosa", category: "sides", image: "/images/side-chicken-samosa.svg", variants: ONE(0.99) },
  { id: "side-spring-rolls", name: "Spring Rolls", category: "sides", image: "/images/side-spring-rolls.svg", variants: ONE(1.99) },
  { id: "side-cheese-garlic-fingers", name: "Cheese Garlic Fingers", category: "sides", image: "/images/side-cheese-garlic-fingers.svg", variants: ONE(8.99) },
  { id: "side-bacon-cheese-garlic-fingers", name: "Bacon Cheese Garlic Fingers", category: "sides", image: "/images/side-bacon-cheese-garlic-fingers.svg", variants: ONE(9.49) },
  { id: "side-garlic-fingers", name: "Garlic Fingers", category: "sides", image: "/images/side-garlic-fingers.svg", variants: ONE(4.99) },
  { id: "side-breaded-mushroom", name: "Breaded Fried Mushroom", category: "sides", image: "/images/side-breaded-mushroom.svg", variants: ONE(8.99) },
  { id: "side-chicken-fingers-fries", name: "Chicken Fingers + Fries", category: "sides", image: "/images/side-chicken-fingers.svg", variants: ONE(12.99) },
  { id: "side-fish-chips", name: "Fish & Chips", category: "sides", image: "/images/side-fish-chips.svg", variants: ONE(14.99) },
  // Priced by piece count, not size — client correction.
  { id: "side-mozzarella-sticks", name: "Mozzarella Sticks", category: "sides", image: "/images/side-mozzarella-sticks.svg", variants: [{ label: "5 pcs", price: 8.49 }, { label: "10 pcs", price: 13.99 }] },
  { id: "side-jalapeno-poppers", name: "Jalapeño Poppers", category: "sides", isNew: true, image: "/images/side-jalapeno-poppers.svg", description: "Crispy breaded jalapeño poppers with a creamy centre, served hot.", variants: [{ label: "5 pcs", price: 8.49 }, { label: "10 pcs", price: 13.99 }] },
  { id: "side-fried-pickle-spears", name: "Fried Pickle Spears", category: "sides", image: "/images/side-fried-pickle-spears.svg", variants: [{ label: "5 pcs", price: 7.99 }, { label: "10 pcs", price: 13.99 }] },

  // ───────────────────────── DIPPING SAUCES ───────────────────────────
  { id: "dip-creamy-garlic-plain", name: "Creamy Garlic", category: "dips", image: "/images/dip.svg", variants: ONE(1.49) },
  { id: "dip-creamy-garlic", name: "Homemade Creamy Garlic", category: "dips", image: "/images/dip.svg", variants: ONE(1.49), description: "Made fresh in house daily." },
  { id: "dip-ranch", name: "Ranch", category: "dips", image: "/images/dip.svg", variants: ONE(1.49) },
  { id: "dip-cheddar-habanero", name: "Cheddar Habanero", category: "dips", image: "/images/dip.svg", variants: ONE(1.49) },

  // ──────────────────────────── DESSERTS ──────────────────────────────
  { id: "dessert-cheesecake", name: "Cheese Cake", category: "desserts", tags: ["slice"], image: "/images/dessert-cheesecake.svg", variants: ONE(5.99) },
  { id: "dessert-choc-cheesecake", name: "Chocolate Cheese Cake", category: "desserts", tags: ["slice"], image: "/images/dessert-choc-cheesecake.svg", variants: ONE(6.99) },
  { id: "dessert-lava-cake", name: "Chocolate Lava Cake", category: "desserts", tags: ["slice"], image: "/images/dessert-lava-cake.svg", variants: ONE(6.99) },

  // ──────────────────────── KAWARTHA ICE CREAM ────────────────────────
  { id: "ice-cream-1-scoop", name: "Kawartha Ice Cream — 1 Scoop", category: "ice-cream", isNew: true, image: "/images/ice-cream.svg", variants: ONE(3.49), description: "Flavours: Vanilla, Butterscotch Ripple, Rum & Raisin, Cotton Candy, Mango, Pistachio Almond, Salty Caramel, Choc Chip Cookie Dough, Death by Chocolate, Cookies & Cream, Lactose Free Vanilla. Waffle cone +$1.00." },
  { id: "ice-cream-2-scoop", name: "Kawartha Ice Cream — 2 Scoop", category: "ice-cream", isNew: true, image: "/images/ice-cream.svg", variants: ONE(6.49), description: "Two scoops of Kawartha ice cream. Waffle cone +$1.00." },

  // ────────────────────────────── DRINKS ──────────────────────────────
  { id: "drink-2l", name: "2L Pop / Bottle", category: "drinks", image: "/images/drink-2l.svg", variants: ONE(4.99), description: "Pepsi, Coke, Sprite or Canada Dry." },
  { id: "drink-can", name: "355 ml Can", category: "drinks", image: "/images/drink-can.svg", variants: ONE(1.99), description: "Pepsi, Diet Pepsi, Coke, Diet Coke, Coke Zero, Sprite, Dr Pepper, Root Beer, Canada Dry, Orange Crush, Cream Soda, Grape Crush or Iced Tea." },
];

// ─────────────────────── Non-item reference data ───────────────────────

/** Build-your-own pizza options (rendered on /menu and the create-your-own card). */
export const createYourOwnOptions = {
  // Gluten-free carries NO listed upcharge — client removed it. Do not re-add a price here.
  crusts: ["Traditional", "Thin", "Thick", "Gluten-Free (Medium only)"],
  sauces: ["Marinara", "BBQ", "Alfredo", "Garlic Spread", "Tandoori Base", "Spicy Base", "Butter Base", "Pesto"],
  cheeses: ["Mozzarella", "Feta", "Mix Cheddar", "Vegan"],
  meats: ["Pepperoni", "Bacon Crumble", "Ground Beef", "Sliced Bacon", "Italian Sausage", "Ham", "Tandoori Chicken", "Salami", "Hot Sausage", "Pancetta"],
  veggies: ["Red Onion", "Mushroom", "Green Pepper", "Hot Pepper", "Red Pepper", "Jalapeno", "Black Olive", "Green Olive", "Spinach", "Tomato", "Sun-Dried Tomato", "Garlic", "Pineapple", "Broccoli"],
  extraToppingBySize: "S $1 / M $1.49 / L $1.99 / XL $2.49 / Party $3",
} as const;

export const wingSauces = ["Mild", "Medium & Hot", "Honey Garlic", "BBQ", "Sweet Thai", "Buffalo", "Suicide", "Fire & Ice", "Blue Cheese"] as const;

export const iceCreamFlavors = ["Vanilla", "Butterscotch Ripple", "Rum & Raisin", "Cotton Candy", "Mango", "Pistachio Almond", "Salty Caramel", "Choc Chip Cookie Dough", "Death by Chocolate", "Cookies & Cream", "Lactose Free Vanilla"] as const;

// ─────────────────────────────── Helpers ───────────────────────────────

export const getItemsByCategory = (id: MenuCategoryId): MenuItem[] =>
  menuItems.filter((i) => i.category === id);

export const getFeaturedItems = (): MenuItem[] =>
  menuItems.filter((i) => i.featured);

export const getItemById = (id: string): MenuItem | undefined =>
  menuItems.find((i) => i.id === id);

/** Lowest price across an item's variants — for "from $X" display and schema. */
export const startingPrice = (item: MenuItem): number =>
  Math.min(...item.variants.map((v) => v.price));

/** Format a CAD price. */
export const price = (n: number): string => `$${n.toFixed(2)}`;
