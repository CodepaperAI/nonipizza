/**
 * One-off image-prep step for the REAL Noni's brand assets.
 *
 * The supplied brand assets are transparent-background PNG dish shots (the same cut-outs
 * used on Noni's own menu pages) plus the dark texture the brand floats them on. This
 * script composites each cut-out onto that texture and writes web-sized JPEGs into
 * `public/images/photos/`, at the aspect ratio of the card that renders them:
 *
 *   4:3   product cards      (ProductCard)
 *   16:9  deal cards         (DealCard)
 *   3:4   category carousel  (CategoryCarousel)
 *   ~16:9 hero               (Hero, sits at 25% opacity behind the maroon overlay)
 *
 * Cut-outs are `contain`-fitted (never cropped) so no topping gets sliced off by a card's
 * object-cover. Run with: node scripts/prep-brand-images.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = "public/images/photos";
const BG = "specialty-pizzas/Nonis_Background_1920x1280.jpg.jpeg";

/** Source cut-outs, by short key. */
const SRC = {
  hawaiian: "specialty-pizzas/Nonis_Desktop_OurMenu_SpecialtyPizzas_1.png",
  deluxe: "specialty-pizzas/Nonis_Desktop_OurMenu_SpecialtyPizzas_2.png",
  // All-meat pizza: pepperoni, pink bacon/ham cubes, herby Italian-sausage crumble.
  // No mushrooms visible — so this is Meat Lover, NOT Canadian.
  meatlover: "specialty-pizzas/Nonis_Desktop_OurMenu_SpecialtyPizzas_3.png",
  veggie: "specialty-pizzas/Nonis_Desktop_OurMenu_SpecialtyPizzas_4.png",
  bbq: "specialty-pizzas/Nonis_Desktop_OurMenu_SpecialtyPizzas_5.png",
  // Near-identical shots: chicken, green pepper, red onion, cilantro on a creamy base.
  // `tandoori` carries the item slot; `fusion2` is only ever a generic category teaser.
  tandoori: "indian-fusion-pizza-sides/Nonis_Desktop_OurMenu_IndianFusionPizza_Sides_1.png",
  fusion2: "indian-fusion-pizza-sides/Nonis_Desktop_OurMenu_IndianFusionPizza_Sides_2.png",
  // IndianFusionPizza_Sides_3 is a curry-and-rice plate — a dish Noni's does not sell.
  // Deliberately unused: the /indian-fusion-pizza-woodstock page shows a real pizza instead.
  wings: "chicken-wings/Nonis_Desktop_OurMenu_ChickenWings_1.png",
  panzerotti: "panzerotti/Nonis_Desktop_OurMenu_Panzerotti_1.png",
  double: "pizza-deals/Nonis_Desktop_OurMenu_PizzaDeals_2.png",
  feast: "pizza-deals/Nonis_Desktop_OurMenu_PizzaDeals_3.png",
  combo1: "pizza-wings-combos/Nonis_Desktop_OurMenu_Pizza_WingsCombos_1.png",
  combo2: "pizza-wings-combos/Nonis_Desktop_OurMenu_Pizza_WingsCombos_2.png",
  combo3: "pizza-wings-combos/Nonis_Desktop_OurMenu_Pizza_WingsCombos_3.png",
  combo4: "pizza-wings-combos/Nonis_Desktop_OurMenu_Pizza_WingsCombos_4.png",
};

const CARD = { w: 1200, h: 900 }; // 4:3  product cards
const WIDE = { w: 1200, h: 675 }; // 16:9 deal cards
const TALL = { w: 900, h: 1200 }; // 3:4  category carousel
const HERO = { w: 1600, h: 900 };

/**
 * NOTE on `combo2` / `combo4` — they are NOT clean cut-outs. Unlike every other source
 * they ship with an opaque dark background baked in (what reads as wood-grain "streaks"
 * is that background, not stray alpha). It cannot be lifted: luma-keying it punches holes
 * through the dips and the pizza's slate, and alpha-hardening changes nothing.
 *
 * So we work with it. Any *tight crop* out of these must fill its frame (`pad: 0` +
 * `fit: "cover"`) so the baked-in background becomes the card background and no
 * rectangular seam shows against the brand texture — see the `wings-breaded` job. The
 * deal cards keep the default `contain`: there the dark rectangle nearly fills the 16:9
 * frame already, so the remaining sliver reads as an intentional margin.
 */

/**
 * Crop windows (fractions of the source) used to pull one dish out of a combo shot.
 * Breaded wings appear only inside the combo shots, never on their own.
 *
 * This window was tuned against rendered candidates, not guessed: it frames the whole
 * board (all wings, the three dips, the limes) with no clipping. A wider window pulled in
 * a Coca-Cola can and a slab of pizza; a tighter one cut the board's edges off. A sliver
 * of can and a pizza corner remain at the margins — unavoidable given the source layout.
 */
const CROPS = {
  breadedWings: { src: "combo2", left: 0.42, top: 0.18, width: 0.58, height: 0.5 },
};

/** [outfile, sourceKey, size, options] */
const JOBS = [
  // ---- Pizzas (product cards, 4:3) ----
  // Only slots whose visible toppings match the menu description. Canadian (needs
  // mushrooms), Spicy Chicken (needs jalapenos + spicy base) and every other pizza have no
  // topping-accurate cut-out and deliberately stay on their existing fallback.
  ["pizza-hawaiian.jpg", "hawaiian", CARD],
  ["pizza-deluxe.jpg", "deluxe", CARD],
  ["pizza-meat-lover.jpg", "meatlover", CARD],
  ["pizza-garden.jpg", "veggie", CARD],
  ["pizza-bbq-chicken.jpg", "bbq", CARD],
  ["pizza-tandoori-chicken.jpg", "tandoori", CARD],
  // The AI render for Spicy Chicken showed a SQUARE pizza — Noni's only makes round ones.
  // This real cut-out is round and correct on chicken, red onion and green pepper; it is
  // missing only the jalapenos. A real photo beats a render of a product we don't sell.
  ["pizza-spicy-chicken.jpg", "fusion2", CARD],

  // ---- Wings & panzerotti ----
  ["wings-baked.jpg", "wings", CARD],
  // `cover` + zero padding: this crop comes from an opaque-background source, so it must
  // fill the card or a black rectangle shows against the texture. Only the source's own
  // dark margin is lost — every wing, dip and lime stays in frame.
  ["wings-breaded.jpg", { crop: "breadedWings" }, CARD, { pad: 0, fit: "cover" }],
  ["panzerotti.jpg", "panzerotti", CARD],

  // ---- Feature banner for /indian-fusion-pizza-woodstock ----
  // 16:9 so it reads as a banner rather than a repeat of the product card below it.
  ["indian-fusion-feature.jpg", "tandoori", WIDE],

  // ---- Category teasers (3:4) ----
  ["cat-pizza.jpg", "deluxe", TALL],
  ["cat-wings.jpg", "wings", TALL],
  ["cat-indian.jpg", "fusion2", TALL],
  ["cat-panzerotti.jpg", "panzerotti", TALL],

  // ---- Deals (16:9) ----
  ["deal-walkin.jpg", "veggie", WIDE],
  ["deal-double-pizza.jpg", "double", WIDE],
  ["deal-family-feast.jpg", "feast", WIDE],
  ["deal-combo-1lb.jpg", "combo1", WIDE],
  ["deal-combo-2lb.jpg", "combo2", WIDE],
  ["deal-combo-double-1lb.jpg", "combo3", WIDE],
  ["deal-combo-double-2lb.jpg", "combo4", WIDE],

  // ---- Restaurant JSON-LD entity image, in the three crops Google asks for ----
  ["brand-16x9.jpg", "combo3", WIDE],
  ["brand-4x3.jpg", "combo3", CARD],
  ["brand-1x1.jpg", "combo3", { w: 1200, h: 1200 }],

  // ---- Hero spread ----
  // Sits at 25% opacity under the maroon overlay, so filling the frame beats fitting it.
  ["hero-spread.jpg", "combo4", HERO, { pad: 0, fit: "cover" }],
];

/** Resolve the SRC key a job spec refers to. */
function srcKey(spec) {
  return typeof spec === "string" ? spec : CROPS[spec.crop].src;
}

/** Read a cut-out, optionally cropping to a single dish within a combo shot. */
async function loadCutout(spec) {
  const key = srcKey(spec);
  let buf = await sharp(SRC[key]).ensureAlpha().png().toBuffer();

  if (typeof spec !== "string" && spec.crop) {
    const c = CROPS[spec.crop];
    const { width, height } = await sharp(buf).metadata();
    // Must be its own pass — sharp allows only one extract per pipeline, so chaining
    // extract and trim together throws "bad extract area".
    buf = await sharp(buf)
      .extract({
        left: Math.round(c.left * width),
        top: Math.round(c.top * height),
        width: Math.round(c.width * width),
        height: Math.round(c.height * height),
      })
      .png()
      .toBuffer();
  }

  // Drop the fully-transparent margin so the dish fills the frame.
  return sharp(buf).trim({ threshold: 8 }).png().toBuffer();
}

/**
 * Background tile. Offset per output so every card isn't the identical texture crop —
 * the texture is a subtle vignette, so a shifted crop reads as a different surface.
 */
function background(w, h, i) {
  const pos = ["centre", "north", "south", "east", "west", "northeast", "southwest"][i % 7];
  return sharp(BG).resize(w, h, { fit: "cover", position: pos });
}

/** Brand chrome: the real wordmark, the texture itself, and the real favicon. */
async function chrome() {
  await mkdir("public/images", { recursive: true });

  // Wordmark — kept at native size (133x51); upscaling a small raster only softens it.
  await sharp("specialty-pizzas/Nonis_Logo-2.png")
    .png({ compressionLevel: 9 })
    .toFile("public/images/nonis-logo.png");
  console.log("✓ public/images/nonis-logo.png  133x51");

  // The dark texture, reusable as a section background.
  await sharp(BG)
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile("public/images/brand-texture.jpg");
  console.log("✓ public/images/brand-texture.jpg  1920x1280");

  // Real favicon / brand mark (the tomato "N").
  await sharp("specialty-pizzas/Nonis_Favicon_74x74.jpg.jpeg")
    .png()
    .toFile("src/app/icon.png");
  console.log("✓ src/app/icon.png  74x74");

  // Same mark for the nav/footer wordmark. It ships on a white field, so the Wordmark
  // renders it inside a white circle — red-on-maroon would not clear WCAG contrast.
  await sharp("specialty-pizzas/Nonis_Favicon_74x74.jpg.jpeg")
    .png()
    .toFile("public/images/nonis-mark.png");
  console.log("✓ public/images/nonis-mark.png  74x74");

  // Open Graph card, 1200x630. Replaces the old SVG — Facebook, LinkedIn and X all
  // ignore SVG og:image, so the previous card never rendered anywhere.
  const og = await sharp(await loadCutout("combo4"))
    .resize(1104, 580, { fit: "inside" })
    .toBuffer({ resolveWithObject: true });
  await sharp(BG)
    .resize(1200, 630, { fit: "cover" })
    .composite([
      {
        input: og.data,
        left: Math.round((1200 - og.info.width) / 2),
        top: Math.round((630 - og.info.height) / 2),
      },
    ])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile("public/images/og-default.jpg");
  console.log("✓ public/images/og-default.jpg  1200x630");
}

async function run() {
  await mkdir(OUT, { recursive: true });
  await chrome();

  for (const [i, [name, spec, size, opts = {}]] of JOBS.entries()) {
    const pad = opts.pad ?? 0.03;
    const boxW = Math.round(size.w * (1 - pad * 2));
    const boxH = Math.round(size.h * (1 - pad * 2));

    const cutout = await sharp(await loadCutout(spec))
      .resize(boxW, boxH, { fit: opts.fit ?? "inside", withoutEnlargement: false })
      .toBuffer({ resolveWithObject: true });

    const out = path.join(OUT, name);
    await background(size.w, size.h, i)
      .composite([
        {
          input: cutout.data,
          left: Math.round((size.w - cutout.info.width) / 2),
          top: Math.round((size.h - cutout.info.height) / 2),
        },
      ])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);

    console.log(`✓ ${out}  ${size.w}x${size.h}`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
