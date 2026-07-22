import type { MenuCategoryId, MenuItem } from "@/data/menu";
import type { Deal } from "@/data/deals";

/**
 * Real photo slots (downloaded from Unsplash, Unsplash License — see CREDITS.md).
 * These are generic category photos, NOT Noni's actual dishes; the named slots stay so
 * real dish photography can drop in later. `DishImage` falls back to the branded SVG
 * placeholder when no photo is mapped.
 *
 * Honesty note: individual product cards for Indian-fusion PIZZAS use a pizza photo (they
 * ARE pizzas), not the curry photo — the curry image is only a thematic category teaser.
 */
const P = "/images/photos";

export const heroPhoto = `${P}/hero-spread.jpg`;

/** Category-carousel teaser image (thematic). */
const CATEGORY_PHOTO: Partial<Record<MenuCategoryId, string>> = {
  pizza: `${P}/pizza.jpg`,
  wings: `${P}/wings.jpg`,
  shawarma: `${P}/shawarma.jpg`,
  "indian-fusion": `${P}/indian-fusion.jpg`, // curry — thematic flavor cue for the teaser
  panzerotti: `${P}/panzerotti.jpg`,
  sides: `${P}/sides.jpg`,
  "ice-cream": `${P}/ice-cream.jpg`,
};

/** Per-item photo (product cards). Indian-fusion → a pizza photo, since the item is a pizza. */
const ITEM_CATEGORY_PHOTO: Partial<Record<MenuCategoryId, string>> = {
  pizza: `${P}/pizza.jpg`,
  "indian-fusion": `${P}/pizza-2.jpg`,
  panzerotti: `${P}/panzerotti.jpg`,
  wings: `${P}/wings.jpg`,
  shawarma: `${P}/shawarma.jpg`,
  "family-meals": `${P}/shawarma.jpg`,
  salads: `${P}/salad.jpg`,
  sides: `${P}/sides.jpg`,
  "ice-cream": `${P}/ice-cream.jpg`,
  desserts: `${P}/ice-cream.jpg`,
};

export function categoryPhoto(id: MenuCategoryId): string | undefined {
  return CATEGORY_PHOTO[id];
}

export function itemPhoto(item: MenuItem): string | undefined {
  // Party pizza & create-your-own read best as a classic pizza shot.
  if (item.category === "pizza") return `${P}/pizza.jpg`;
  return ITEM_CATEGORY_PHOTO[item.category];
}

/** Deal photo by contents keyword. */
export function dealPhoto(deal: Deal): string {
  const s = `${deal.id} ${deal.name}`.toLowerCase();
  if (s.includes("wing")) return `${P}/wings.jpg`;
  if (s.includes("platter") || s.includes("shawarma")) return `${P}/shawarma.jpg`;
  if (s.includes("fries") || s.includes("messy")) return `${P}/sides.jpg`;
  return `${P}/pizza.jpg`;
}
