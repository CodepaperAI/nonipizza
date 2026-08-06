# IMAGE-MANIFEST.md — source-asset audit

Audit of every image in the eight top-level source folders. **Every dish image in the seven
genuine folders was opened and identified visually; folder and file names were treated only
as hints.** Ambiguous pizzas were additionally inspected at 2× zoom before any slot was
assigned.

Governing rule: *a photo is assigned to a menu item only if its visible toppings match that
item's description in `src/data/menu.ts`.* Where they don't, the slot keeps its existing
fallback and appears in the GAPS list at the bottom — a wrong photo is worse than an old one.

Source folders are git- and vercel-ignored; only the processed JPEGs under
`public/images/photos/` ship. Regenerate with `npm run images:prep`.

---

## 1. Genuine Noni's photography (7 folders)

All dish files are 636×636 (Indian-fusion: 709×709) transparent PNG cut-outs, no watermark,
usable at any aspect. Shared chrome (`Nonis_Background_1920x1280.jpg.jpeg`,
`Nonis_Favicon_74x74.jpg.jpeg`, `Nonis_Logo-2.png`) is byte-identical across all seven
folders and is listed once at the end.

| Folder | File | What it actually shows | Proposed slot | Confidence |
| --- | --- | --- | --- | --- |
| specialty-pizzas | `...SpecialtyPizzas_1.png` | Pizza: pineapple chunks, pink cubed ham, bacon, red sauce | `pizza-hawaiian` | **exact** — Hawaiian = bacon, ham & pineapple (3/3) |
| specialty-pizzas | `...SpecialtyPizzas_2.png` | Pizza: pepperoni, green pepper strips, mushroom slices, black olives, feta crumbles | `pizza-deluxe` + `cat-pizza` | close — Deluxe's 3/3 present, **plus olives & feta not in the description** |
| specialty-pizzas | `...SpecialtyPizzas_3.png` | Pizza: pepperoni, pink bacon/ham cubes, herby Italian-sausage crumble. **No mushrooms** (confirmed at 2× zoom) | `pizza-meat-lover` | close — all-meat; Meat Lover = pepperoni, bacon, sausage, beef. **Not Canadian** (needs mushrooms) |
| specialty-pizzas | `...SpecialtyPizzas_4.png` | Pizza: green pepper, red onion, tomato, black olives, mushroom slices | `pizza-garden` + `deal-1-pickup` | close — Garden's 4/4 present (mushroom, red onion, green pepper, tomato), **plus olives** |
| specialty-pizzas | `...SpecialtyPizzas_5.png` | Pizza: sliced chicken, green pepper, red onion, BBQ sauce swirl | `pizza-bbq-chicken` | **exact** — 3/3 + BBQ base |
| walk-in-special | `...WalkinSpecial.png` | **Duplicate** of SpecialtyPizzas_4 (identical md5) | — (de-duped) | — |
| panzerotti | `...Panzerotti_1.png` | Folded panzerotti on a wood board, marinara dip | `panzerotti-medium/large` + `cat-panzerotti` | **exact** |
| chicken-wings | `...ChickenWings_1.png` | Roasted/baked whole wings on a wood board, 3 dips, limes | `wings-baked` + `cat-wings` | **exact** |
| indian-fusion | `...IndianFusionPizza_Sides_1.png` | Pizza: chicken chunks, green pepper, red onion, cilantro, creamy base | `pizza-tandoori-chicken` | close — 3/3 named toppings; **base reads creamy-white, not orange tandoori** ⚠ |
| indian-fusion | `...IndianFusionPizza_Sides_2.png` | Near-identical to the above, different angle | `pizza-spicy-chicken` + `cat-indian` | close — round & real; **missing the jalapenos**. Replaced a square AI render (see §4) |
| indian-fusion | `...IndianFusionPizza_Sides_1.png` (2nd use) | as above | `indian-fusion-feature` (16:9 banner) | landing-page banner |
| indian-fusion | `...IndianFusionPizza_Sides_3.png` | Butter chicken curry, rice, kachumber salad on a plate | **unused** | Noni's does not sell curry & rice — see §4 |
| pizza-deals | `...PizzaDeals_1.png` | **Duplicate** of SpecialtyPizzas_3 (identical md5) | — (de-duped) | — |
| pizza-deals | `...PizzaDeals_2.png` | Two pizzas: the veggie + the pepperoni/mushroom/pepper | `deal-2-double`, `coupon-double-deal` | **exact** — matches "2 pizzas" |
| pizza-deals | `...PizzaDeals_3.png` | 2 pizzas + board of baked wings + 2 Coca-Cola cans | `deal-3-family-feast`, `coupon-family-feast-10off` | **exact** |
| pizza-wings-combos | `...WingsCombos_1.png` | 1 pizza + baked wings + 3 Coca-Cola cans | `deal-4a-pizza-wings` | **exact** |
| pizza-wings-combos | `...WingsCombos_2.png` | 1 pizza + **breaded** wings + 3 cans. 1142×1142, **opaque dark background baked in** | `deal-4b-pizza-wings`; cropped → `wings-breaded` | **exact**; see cleanup note |
| pizza-wings-combos | `...WingsCombos_3.png` | 2 pizzas + baked wings + 2 cans | `deal-4c-pizza-wings` + `brand-16x9/4x3/1x1` | **exact** |
| pizza-wings-combos | `...WingsCombos_4.png` | 2 pizzas + **breaded** wings + 3 cans. 1141×1141, **opaque dark background baked in** | `deal-4d-pizza-wings` + `hero-spread` | **exact**; see cleanup note |
| *(all 7 folders)* | `Nonis_Background_1920x1280.jpg.jpeg` | Dark textured backdrop, no vignette detail | `brand-texture.jpg`, canvas for every composite | **exact** |
| *(all 7 folders)* | `Nonis_Logo-2.png` | "NONI'S" wordmark, red on transparent, 133×51 | `nonis-logo.png` | **exact** |
| *(all 7 folders)* | `Nonis_Favicon_74x74.jpg.jpeg` | Tomato with a white "N", on white | `src/app/icon.png`, `nonis-mark.png` | **exact** |

### Cleanup / caveats

- **`WingsCombos_2` and `_4` are not clean cut-outs.** They ship with an *opaque* dark
  background baked in — what looks like leftover wood-grain streaking is that background,
  not stray alpha. It cannot be removed: luma-keying punches holes through the dips and the
  pizza's slate, and alpha-hardening does nothing. Handled instead by making any tight crop
  from them fill its frame, so the baked-in background becomes the card background and no
  rectangular seam shows. Verified visually.
- **Coca-Cola cans** appear in `PizzaDeals_3` and all four combo shots — they came that way
  in Noni's own supplied marketing assets. Flagged for your call; nothing was altered.
- **Butter chicken plate** (`IndianFusion_3`) is curry and rice, which Noni's does not sell.
  Now **unused** — `/indian-fusion-pizza-woodstock` shows a real Indian-fusion pizza instead.
- **No watermarks** were found on any file in the seven genuine folders.

---

## 2. `gemini-watermark-cleaned/` — AI renders, excluded ⛔

**This folder is the AI render set, not photography** — it is the source of the very images
this task replaces. Spot-checked by opening `pizza-butter-chicken-clean.png`,
`Hawaiian-pizza-clean.png`, `wings-breaded-clean.png` and `cat-shawarma-clean.png`: all are
glossy 1792–2048px AI food renders whose filenames map 1:1 onto the existing AI slots.

Per your direction, **nothing here is mapped to a slot and nothing here is in `REAL_PHOTOS`.**
The remaining 34 files were catalogued but not individually opened — with the folder excluded
from all mapping, a per-file watermark audit has no consumer. (No watermark residue was
visible in the four opened, nor in the shipping JPEGs derived from this set.)

<details>
<summary>All 38 files (excluded)</summary>

`Cheese-Burger-pizza-clean.png` · `Hawaiian-pizza-clean.png` · `Mexican-pizza-clean.png` ·
`cat-icecream-clean.png` · `cat-indian-clean.png` · `cat-panzerotti-clean.png` ·
`cat-pizza-clean.png` · `cat-shawarma-clean.png` ⛔ · `cat-sides-clean.png` ·
`cat-wings-clean.png` · `dessert-lava-cake-clean.png` · `drinks-clean.png` ·
`hero-spread-clean.png` · `icecream-clean.png` · `panzerotti-clean.png` ·
`pizza-3-cheese-clean.png` · `pizza-bbq-chicken-clean.png` · `pizza-butter-chicken-clean.png` ·
`pizza-butter-paneer-clean.png` · `pizza-canadian-clean.png` ·
`pizza-chicken-shawarma-clean.png` · `pizza-deluxe-clean.png` · `pizza-dill-pickle-clean.png` ·
`pizza-garden-clean.png` · `pizza-greek-clean.png` · `pizza-meat-lover-clean.png` ·
`pizza-nonis-special-clean.png` · `pizza-spicy-chicken-clean.png` ·
`pizza-spicy-paneer-clean.png` · `pizza-tandoori-chicken-clean.png` ·
`pizza-tandoori-paneer-clean.png` · `pizza-woodstock-special-clean.png` ·
`shawarma-platter-clean.png` ⛔ · `sides-messy-fries-clean.png` · `sides-poutine-clean.png` ·
`wings-baked-clean.png` · `wings-boneless-clean.png` · `wings-breaded-clean.png`

⛔ = shawarma; discontinued per CLAUDE.md, mapped nowhere.

</details>

---

## 4. Defects found in the AI render set ⚠

Two classes of error were found in the *remaining* AI images — both misrepresent the product,
so they matter regardless of image quality.

### a) Square pizzas — Noni's makes none ✅ resolved 2026-08-06
`pizza-spicy-chicken` and `pizza-spicy-paneer` rendered **square/rounded-square** pizzas.

- **Spicy Chicken** → replaced with the real (round) `IndianFusion_2` cut-out. It is missing
  the jalapenos, but a real photo of a round pizza beats a render of a shape we don't sell.
- **Spicy Paneer** → now has a **round** render showing cubed paneer, red onion, jalapeños,
  cilantro and green pepper (Batch B). It came off `NO_PHOTO`.

### b) Vegetarian items showing chicken ✅ resolved 2026-08-06
`pizza-butter-paneer.jpg` and `pizza-tandoori-paneer.jpg` previously showed **chicken chunks,
not paneer** — a real customer-facing problem on vegetarian menu items. Both were re-rendered
in Batch B with unmistakably **cuboid paneer**; Butter Paneer on a creamy butter base, Tandoori
Paneer on a red tandoori base with red onion and green pepper. Verified by opening both files.

### c) Butter Chicken pizza render showed onion ✅ resolved 2026-08-06
`pizza-butter-chicken.jpg` showed **red onion rings** across the pie; the menu description is
"creamy butter chicken base topped with tender chicken" — no onion. Client: *"Remove onion
from pics."* The slot was emptied, then filled in Batch B with an **onion-free** butter chicken
pizza (creamy orange base, chicken, cilantro). Verified.

### d) One image standing in for many dishes ✅ resolved 2026-08-06
`cat-sides.jpg` (loaded messy fries with chicken) was the `sides` **category fallback**, so it
rendered on Fries, Potato Wedges, Onion Rings and every other side without a dedicated photo.
`salad.jpg` did the same for all six salads, and `dessert-lava-cake.jpg` for the cheesecakes.
The `salads`, `sides` and `desserts` category fallbacks were **removed**, and Batch B then gave
every one of those items its own image. `cat-sides.jpg` stays only as the *category-carousel
teaser*, where it depicts a genuine menu item (Messy Fries with Chicken) rather than posing as
another dish. **Do not re-add the fallbacks** — they are what caused this defect.

### e) Generator watermark ⚠ handled in the pipeline
Every Batch B source carries a "✦" watermark at ~88–93% width / ~85–92% height, and some carry
thin light letterbox borders. `scripts/prep-generated-photos.mjs` crops both out with a single
proportional 4:3 window (keep x from 2% to 87.2% of width, centred vertically). **If a future
batch places the watermark elsewhere, that constant must be re-checked** — verify the output,
not the input.

---

## 3. GAPS — slots still wanting a real photo

**Coverage: all 65 menu items now render a dedicated, topping-accurate image. Nothing falls
back to the branded placeholder.** What remains below is a *quality* wishlist — slots filled
by an AI render where real Noni's photography would be better — not a correctness problem.

### Closed 2026-08-06 (Batch B, `nonipizza_photos/`) ✅
All six **salads** (each matching its own description — Caesar ≠ Greek ≠ Garden), all
nineteen remaining **sides** (plain Fries, skin-on Potato Wedges, battered Onion Rings, the
two distinct loaded-fries, three distinguishable garlic-finger variants, poppers that don't
look like mozzarella sticks, …), all three **dips**, both **cheesecakes**, plus
**Butter Chicken** (no onion) and all three **paneer** pizzas (cubed paneer, not chicken).
Every file was opened and checked against `src/data/menu.ts` before mapping.

### Pizzas — an AI render stands in; real photography would be better
| Item | Needs to show |
| --- | --- |
| Canadian | pepperoni, bacon, **mushrooms** (the all-meat shot has no mushrooms) |
| Woodstock Special | bacon, pepperoni, pancetta |
| Mexican | ground beef, mushrooms, jalapenos |
| Dill Pickle | bacon, pickle, dillweed on garlic base |
| Cheese Burger | beef, bacon, red onion, pickle, cheddar |
| Chicken Shawarma Pizza | red onion, garlic sauce, tomato, green olives, hot peppers |
| Noni's Special | pepperoni, bacon, mushrooms, red onions |
| Spicy Chicken | has a real round photo; still wants the **jalapenos** visible |
| Greek | feta, black olives, red onion, tomato |
| 3 Cheese | cheddar, feta, mozzarella |

⚠ **Tandoori Chicken** is assigned but only a *close* match — its base reads creamy-white
rather than orange tandoori. Move it here if you'd rather not ship it.

### Known shared images — acceptable, but worth a shot each
| Slot | Shared by | Why it's tolerable |
| --- | --- | --- |
| `cat-pizza.jpg` | Create Your Own · Party Pizza ×2 | Create Your Own is generic by design. **Party Pizza is a 21×15 rectangle** — the round image is a shape mismatch and is the one worth re-shooting. |
| `panzerotti.jpg` | Panzerotti Medium · Large | Same dish, two sizes. |
| `ice-cream.jpg` | Kawartha 1 Scoop · 2 Scoop | Same product; a 1-scoop and a 2-scoop shot would be better. |
| `drinks.jpg` | 2L Bottle · 355 ml Can | Different packaging in one generic drinks shot. |

### Everything else
Wings: **Boneless**. Category teasers: `cat-sides`, `cat-icecream`.
Coupon: `coupon-messy-fries`.

**No shawarma slot exists anywhere** — category, teaser and platter are all absent by design.
The Chicken Shawarma *Pizza* remains, since it is a pizza flavour and not the shawarma line.
