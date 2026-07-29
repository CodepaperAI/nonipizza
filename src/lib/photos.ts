import type { MenuCategoryId, MenuItem } from "@/data/menu";
import type { Deal } from "@/data/deals";

/**
 * Dish photo slots. Most images are AI-generated food renders (one per menu item),
 * self-hosted under /public/images/photos — see CREDITS.md.
 *
 * Honesty note: these are illustrative AI-generated images of each dish, NOT photographs
 * of Noni's actual plates. Named per menu-item id so real photography can drop in later at
 * the same path. `DishImage` falls back to the branded SVG placeholder when no photo is
 * mapped. (Salads still use a generic stock photo — no dedicated render yet.)
 */
const P = "/images/photos";

export const heroPhoto = `${P}/hero-spread.jpg`;

/** Category-carousel teaser image (portrait). */
const CATEGORY_PHOTO: Partial<Record<MenuCategoryId, string>> = {
  pizza: `${P}/cat-pizza.jpg`,
  wings: `${P}/cat-wings.jpg`,
  "indian-fusion": `${P}/cat-indian.jpg`,
  panzerotti: `${P}/cat-panzerotti.jpg`,
  sides: `${P}/cat-sides.jpg`,
  "ice-cream": `${P}/cat-icecream.jpg`,
};

/** Per-item photo, keyed by menu-item id. One dedicated render per dish. */
const ITEM_PHOTO: Record<string, string> = {
  // Specialty pizzas
  "pizza-hawaiian": `${P}/pizza-hawaiian.jpg`,
  "pizza-canadian": `${P}/pizza-canadian.jpg`,
  "pizza-deluxe": `${P}/pizza-deluxe.jpg`,
  "pizza-woodstock-special": `${P}/pizza-woodstock-special.jpg`,
  "pizza-bbq-chicken": `${P}/pizza-bbq-chicken.jpg`,
  "pizza-mexican": `${P}/pizza-mexican.jpg`,
  "pizza-dill-pickle": `${P}/pizza-dill-pickle.jpg`,
  // Signature pizzas
  "pizza-meat-lover": `${P}/pizza-meat-lover.jpg`,
  "pizza-cheese-burger": `${P}/pizza-cheese-burger.jpg`,
  "pizza-chicken-shawarma": `${P}/pizza-chicken-shawarma.jpg`,
  "pizza-nonis-special": `${P}/pizza-nonis-special.jpg`,
  // Indian-fusion pizzas
  "pizza-butter-chicken": `${P}/pizza-butter-chicken.jpg`,
  "pizza-butter-paneer": `${P}/pizza-butter-paneer.jpg`,
  "pizza-tandoori-chicken": `${P}/pizza-tandoori-chicken.jpg`,
  "pizza-tandoori-paneer": `${P}/pizza-tandoori-paneer.jpg`,
  "pizza-spicy-chicken": `${P}/pizza-spicy-chicken.jpg`,
  "pizza-spicy-paneer": `${P}/pizza-spicy-paneer.jpg`,
  // Veggie pizzas
  "pizza-garden": `${P}/pizza-garden.jpg`,
  "pizza-greek": `${P}/pizza-greek.jpg`,
  "pizza-3-cheese": `${P}/pizza-3-cheese.jpg`,
  // Wings
  "wings-baked": `${P}/wings-baked.jpg`,
  "wings-breaded": `${P}/wings-breaded.jpg`,
  "wings-boneless": `${P}/wings-boneless.jpg`,
  // Panzerotti (both sizes share the one render)
  "panzerotti-medium": `${P}/panzerotti.jpg`,
  "panzerotti-large": `${P}/panzerotti.jpg`,
  // Sides
  "side-poutine": `${P}/side-poutine.jpg`,
  "side-messy-fries-chicken": `${P}/side-messy-fries.jpg`,
  // Dessert
  "dessert-lava-cake": `${P}/dessert-lava-cake.jpg`,
};

/** Fallback photo by category, for items without a dedicated render. */
const ITEM_CATEGORY_PHOTO: Partial<Record<MenuCategoryId, string>> = {
  pizza: `${P}/cat-pizza.jpg`,
  "indian-fusion": `${P}/cat-indian.jpg`,
  panzerotti: `${P}/panzerotti.jpg`,
  wings: `${P}/cat-wings.jpg`,
  salads: `${P}/salad.jpg`,
  sides: `${P}/cat-sides.jpg`,
  "ice-cream": `${P}/ice-cream.jpg`,
  desserts: `${P}/dessert-lava-cake.jpg`,
  drinks: `${P}/drinks.jpg`,
};

export function categoryPhoto(id: MenuCategoryId): string | undefined {
  return CATEGORY_PHOTO[id];
}

export function itemPhoto(item: MenuItem): string | undefined {
  return ITEM_PHOTO[item.id] ?? ITEM_CATEGORY_PHOTO[item.category];
}

/** Deal photo by contents keyword. */
export function dealPhoto(deal: Deal): string {
  const s = `${deal.id} ${deal.name}`.toLowerCase();
  if (s.includes("wing")) return `${P}/wings-baked.jpg`;
  if (s.includes("fries") || s.includes("messy")) return `${P}/side-messy-fries.jpg`;
  return `${P}/pizza-meat-lover.jpg`;
}
