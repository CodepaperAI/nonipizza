import type { MenuCategoryId, MenuItem } from "@/data/menu";
import type { Deal } from "@/data/deals";

/**
 * Dish photo slots, self-hosted under /public/images/photos — see CREDITS.md.
 *
 * Two kinds of image live here:
 *  1. **Real Noni's brand photography** — the transparent-background dish cut-outs supplied
 *     by the restaurant, composited onto Noni's own dark texture by
 *     `scripts/prep-brand-images.mjs`. These are marked in `REAL_PHOTOS` below.
 *  2. **AI-generated renders** for dishes with no supplied photo yet — illustrative, NOT
 *     photographs of Noni's plates. Each still depicts the right dish.
 *
 * Both are named per menu-item id, so real photography can drop in at the same path later.
 * `DishImage` falls back to the branded SVG placeholder when no photo is mapped.
 */
const P = "/images/photos";

export const heroPhoto = `${P}/hero-spread.jpg`;

/** The dark brand texture the dish cut-outs are shot against. */
export const brandTexture = "/images/brand-texture.jpg";

/** Banner for /indian-fusion-pizza-woodstock — a real Noni's Indian-fusion pizza. */
export const indianFusionFeaturePhoto = `${P}/indian-fusion-feature.jpg`;

/**
 * Items that must render the branded placeholder rather than ANY photo.
 *
 * Governing rule (client, Aug 2026): a product image must depict *that* item with matching
 * toppings. Where no topping-accurate image exists we ship the neutral placeholder and log
 * the slot in IMAGE-MANIFEST.md's GAPS list — we never borrow another dish's photo.
 *
 * Currently empty: the 2026-08-06 render batch filled every slot that was blocked here
 * (Butter Chicken without onion, Spicy Paneer with actual paneer). Keep the mechanism — add
 * an id back the moment a slot's only available image misrepresents the dish.
 */
const NO_PHOTO = new Set<string>();

/**
 * Filenames backed by real Noni's photography (everything else is an AI render).
 * Kept explicit so CREDITS.md and the honesty note stay verifiable from code.
 *
 * A slot only earns a place here if the cut-out's *visible toppings* match the menu
 * description. Nothing from `gemini-watermark-cleaned/` belongs here — that folder is the
 * AI render set, not photography. See IMAGE-MANIFEST.md for the per-file audit.
 */
export const REAL_PHOTOS = new Set([
  "hero-spread.jpg",
  "indian-fusion-feature.jpg",
  "pizza-spicy-chicken.jpg",
  "pizza-hawaiian.jpg",
  "pizza-deluxe.jpg",
  "pizza-meat-lover.jpg",
  "pizza-garden.jpg",
  "pizza-bbq-chicken.jpg",
  "pizza-tandoori-chicken.jpg",
  "wings-baked.jpg",
  "wings-breaded.jpg",
  "panzerotti.jpg",
  "cat-pizza.jpg",
  "cat-wings.jpg",
  "cat-indian.jpg",
  "cat-panzerotti.jpg",
  "deal-walkin.jpg",
  "deal-double-pizza.jpg",
  "deal-family-feast.jpg",
  "deal-combo-1lb.jpg",
  "deal-combo-2lb.jpg",
  "deal-combo-double-1lb.jpg",
  "deal-combo-double-2lb.jpg",
  "brand-16x9.jpg",
  "brand-4x3.jpg",
  "brand-1x1.jpg",
]);

/** Category-carousel teaser image (portrait). */
const CATEGORY_PHOTO: Partial<Record<MenuCategoryId, string>> = {
  pizza: `${P}/cat-pizza.jpg`,
  wings: `${P}/cat-wings.jpg`,
  "indian-fusion": `${P}/cat-indian.jpg`,
  panzerotti: `${P}/cat-panzerotti.jpg`,
  sides: `${P}/cat-sides.jpg`,
  "ice-cream": `${P}/cat-icecream.jpg`,
};

/** Per-item photo, keyed by menu-item id. One dedicated image per dish. */
const ITEM_PHOTO: Record<string, string> = {
  // Salads — one per salad; Caesar ≠ Greek ≠ Garden, never a shared bowl.
  "salad-caesar": `${P}/salad-caesar.jpg`,
  "salad-greek": `${P}/salad-greek.jpg`,
  "salad-garden": `${P}/salad-garden.jpg`,
  "salad-julienne": `${P}/salad-julienne.jpg`,
  "salad-chicken": `${P}/salad-chicken.jpg`,
  "salad-chicken-caesar": `${P}/salad-chicken-caesar.jpg`,

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
  // Indian-fusion pizzas. The three paneer pizzas show cubed paneer, not chicken, and
  // Butter Chicken has no onion — both were corrected in the 2026-08-06 render batch.
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
  // Panzerotti (both sizes share the one photo)
  "panzerotti-medium": `${P}/panzerotti.jpg`,
  "panzerotti-large": `${P}/panzerotti.jpg`,
  // Sides — every one has its own shot. Fries are plain fries, wedges are wedges, onion
  // rings are onion rings; the three garlic-finger variants and the two loaded-fries are
  // each distinguishable. Do not point two of these at the same file.
  "side-fries": `${P}/side-fries.jpg`,
  "side-wedges": `${P}/side-wedges.jpg`,
  "side-onion-rings": `${P}/side-onion-rings.jpg`,
  "side-poutine": `${P}/side-poutine.jpg`,
  "side-messy-fries-chicken": `${P}/side-messy-fries.jpg`,
  "side-butter-chicken-fries": `${P}/side-butter-chicken-fries.jpg`,
  "side-loaded-veggie-fries": `${P}/side-loaded-veggie-fries.jpg`,
  "side-cheese-curds": `${P}/side-cheese-curds.jpg`,
  "side-cauliflower-bites": `${P}/side-cauliflower-bites.jpg`,
  "side-veg-samosa": `${P}/side-veg-samosa.jpg`,
  "side-chicken-samosa": `${P}/side-chicken-samosa.jpg`,
  "side-spring-rolls": `${P}/side-spring-rolls.jpg`,
  "side-cheese-garlic-fingers": `${P}/side-cheese-garlic-fingers.jpg`,
  "side-bacon-cheese-garlic-fingers": `${P}/side-bacon-cheese-garlic-fingers.jpg`,
  "side-garlic-fingers": `${P}/side-garlic-fingers.jpg`,
  "side-breaded-mushroom": `${P}/side-breaded-mushroom.jpg`,
  "side-chicken-fingers-fries": `${P}/side-chicken-fingers-fries.jpg`,
  "side-fish-chips": `${P}/side-fish-chips.jpg`,
  "side-mozzarella-sticks": `${P}/side-mozzarella-sticks.jpg`,
  "side-jalapeno-poppers": `${P}/side-jalapeno-poppers.jpg`,
  "side-fried-pickle-spears": `${P}/side-fried-pickle-spears.jpg`,
  // Dipping sauces
  "dip-creamy-garlic": `${P}/dip-creamy-garlic.jpg`,
  "dip-ranch": `${P}/dip-ranch.jpg`,
  "dip-cheddar-habanero": `${P}/dip-cheddar-habanero.jpg`,
  // Desserts — the two cheesecakes are distinct; neither borrows the lava cake.
  "dessert-cheesecake": `${P}/dessert-cheesecake.jpg`,
  "dessert-choc-cheesecake": `${P}/dessert-choc-cheesecake.jpg`,
  "dessert-lava-cake": `${P}/dessert-lava-cake.jpg`,
};

/**
 * Fallback photo by category, for items without a dedicated photo.
 *
 * Only categories whose items are visually interchangeable get a fallback. `salads`,
 * `sides` and `desserts` deliberately have none: their items differ by ingredient
 * (Caesar vs Greek vs Garden; fries vs wedges vs onion rings; cheesecake vs lava cake), so
 * a shared image would show the customer the wrong food. Those slots render the branded
 * placeholder until a topping-accurate photo exists — see IMAGE-MANIFEST.md GAPS.
 */
const ITEM_CATEGORY_PHOTO: Partial<Record<MenuCategoryId, string>> = {
  pizza: `${P}/cat-pizza.jpg`,
  "indian-fusion": `${P}/cat-indian.jpg`,
  panzerotti: `${P}/panzerotti.jpg`,
  wings: `${P}/cat-wings.jpg`,
  "ice-cream": `${P}/ice-cream.jpg`,
  drinks: `${P}/drinks.jpg`,
};

export function categoryPhoto(id: MenuCategoryId): string | undefined {
  return CATEGORY_PHOTO[id];
}

export function itemPhoto(item: MenuItem): string | undefined {
  if (NO_PHOTO.has(item.id)) return undefined;
  return ITEM_PHOTO[item.id] ?? ITEM_CATEGORY_PHOTO[item.category];
}

/**
 * Deal photo, keyed by deal id. Noni's supplied a shot per deal — a single pizza for the
 * walk-in special, two for the double, pizzas + wings + pop for the feast and combos.
 */
const DEAL_PHOTO: Record<string, string> = {
  "deal-1-pickup": `${P}/deal-walkin.jpg`,
  "deal-2-double": `${P}/deal-double-pizza.jpg`,
  "deal-3-family-feast": `${P}/deal-family-feast.jpg`,
  "deal-4a-pizza-wings": `${P}/deal-combo-1lb.jpg`,
  "deal-4b-pizza-wings": `${P}/deal-combo-2lb.jpg`,
  "deal-4c-pizza-wings": `${P}/deal-combo-double-1lb.jpg`,
  "deal-4d-pizza-wings": `${P}/deal-combo-double-2lb.jpg`,
  "coupon-family-feast-10off": `${P}/deal-family-feast.jpg`,
  "coupon-double-deal": `${P}/deal-double-pizza.jpg`,
  "coupon-messy-fries": `${P}/side-messy-fries.jpg`,
};

export function dealPhoto(deal: Deal): string {
  if (DEAL_PHOTO[deal.id]) return DEAL_PHOTO[deal.id];
  // Fallback for any deal added later, by what it contains.
  const s = `${deal.id} ${deal.name}`.toLowerCase();
  if (s.includes("wing")) return `${P}/deal-combo-1lb.jpg`;
  if (s.includes("fries") || s.includes("messy")) return `${P}/side-messy-fries.jpg`;
  return `${P}/deal-double-pizza.jpg`;
}
