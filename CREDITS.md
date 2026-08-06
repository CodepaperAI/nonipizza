# Image Credits

Dish photos in `public/images/photos/` are self-hosted (not hotlinked) and mapped to menu
items in [`src/lib/photos.ts`](./src/lib/photos.ts). There are **two kinds**, and the split
is tracked in code by the exported `REAL_PHOTOS` set in that file.

## 1. Real Noni's brand photography ✅

Supplied by the restaurant as transparent-background PNG dish cut-outs (the same cut-outs
used on Noni's own menu pages), plus Noni's dark texture background, wordmark and favicon.
[`scripts/prep-brand-images.mjs`](./scripts/prep-brand-images.mjs) composites each cut-out
onto that texture and writes web-sized JPEGs at the aspect ratio of the card that renders
them (4:3 product cards, 16:9 deal cards, 3:4 category teasers, 16:9 hero). Cut-outs are
`contain`-fitted, never cropped, so no topping is sliced off by a card's `object-cover`.

A slot only qualifies if the cut-out's **visible toppings match the menu description** — see
[`IMAGE-MANIFEST.md`](./IMAGE-MANIFEST.md) for the per-file audit and the GAPS list of slots
still awaiting real photography.

| Slot | Depicts |
| --- | --- |
| `pizza-hawaiian` · `pizza-deluxe` · `pizza-meat-lover` · `pizza-garden` · `pizza-bbq-chicken` | the matching specialty / signature / veggie pizza |
| `pizza-tandoori-chicken` · `pizza-spicy-chicken` | the Indian-fusion chicken pizzas |
| `indian-fusion-feature` | banner on `/indian-fusion-pizza-woodstock` |
| `wings-baked` · `wings-breaded` | baked wings; breaded wings (cropped from the combo shot) |
| `panzerotti` | handcrafted panzerotti |
| `cat-pizza` · `cat-wings` · `cat-indian` · `cat-panzerotti` | category-carousel teasers |
| `deal-walkin` · `deal-double-pizza` · `deal-family-feast` · `deal-combo-*` | one shot per deal in `src/data/deals.ts` |
| `hero-spread` | the double-pizza + wings + pop spread behind the homepage headline |

Brand chrome from the same asset set: `public/images/nonis-logo.png` (wordmark),
`public/images/nonis-mark.png` + `src/app/icon.png` (the tomato "N"), and
`public/images/brand-texture.jpg` (the dark texture).

> The combo shots include branded Coca-Cola cans, as supplied in Noni's own marketing
> assets. Re-shoot or crop if that ever needs to change.

Two source files (`..._Pizza_WingsCombos_2/4.png`) are not clean cut-outs — they ship with an
opaque dark background baked in, which cannot be keyed out without damaging the food. Tight
crops from them fill their frame instead, so no rectangular seam shows.

## 2. AI-generated renders (remaining slots)

Everything **not** in `REAL_PHOTOS` is an AI render: generated with Google **Gemini**,
optimized to 1200×900 JPEG. There are two batches.

> **Honesty note:** these are **illustrative AI-generated images**, *not* photographs of
> Noni's actual plates. Each image depicts the correct dish with the toppings its menu
> description names. **Nothing here may be added to `REAL_PHOTOS`.**

### Batch A — original set (`gemini-watermark-cleaned/`)
Canadian, Woodstock Special, Mexican, Dill Pickle, Cheese Burger, Chicken Shawarma Pizza,
Noni's Special, Greek, 3 Cheese, boneless wings, poutine, messy fries with chicken,
lava cake, `cat-sides`, `cat-icecream`, `ice-cream`, `drinks`.

### Batch B — 2026-08-06 gap-fill (`nonipizza_photos/`)
34 renders commissioned to close the GAPS list: **all 6 salads**, **all 19 remaining sides**,
**all 3 dips**, **both cheesecakes**, plus corrected **Butter Chicken** (no onion) and all
three **paneer** pizzas (cubed paneer, not chicken). Processed by
[`scripts/prep-generated-photos.mjs`](./scripts/prep-generated-photos.mjs)
(`npm run images:generated`), which crops out the generator's "✦" watermark and any
letterbox border, then writes the 4:3 card JPEG. Every file was opened and checked against
its menu description before being mapped.

> ⚠ Batch A's known defects are documented in [`IMAGE-MANIFEST.md`](./IMAGE-MANIFEST.md) §4.
> The two that mattered — square pizzas, and paneer pizzas showing chicken — are now fixed by
> Batch B. Check any AI render against the real product before trusting it.

> **No borrowed photos.** `salads`, `sides` and `desserts` have **no category fallback**:
> their items differ by ingredient, so a shared image would show the wrong food. Every item in
> those categories now has its own dedicated file — do not point two ids at one file, and do
> not reinstate a fallback.

Drop real photography in at the same file path to replace any of them — `DishImage` uses
whatever JPEG is at the mapped path and falls back to a branded SVG placeholder if a slot is
empty. Add the filename to `REAL_PHOTOS` when you do.

## 3. Third-party stock

**None.** The site no longer serves any third-party stock photography.

`salad.jpg` (Unsplash, photo-1540420773420-3366772f4999) was previously the fallback for
**all six salads**. Batch B gave each salad its own image, so the file was **deleted** —
it was unreferenced and shipped 686 KB to production for nothing. Recoverable from git
history if ever needed.

**Discontinued:** the shawarma category is discontinued, so `cat-shawarma` / `shawarma-platter`
renders were intentionally **not** used. The **Chicken Shawarma Pizza** render is kept — it's a
pizza, not the shawarma line.
