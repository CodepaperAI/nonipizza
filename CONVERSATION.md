# CONVERSATION.md — Changelog

> Running changelog of working sessions. **Newest entry on top.** Concise summaries only
> (5–10 lines each) — never full transcripts.

---

## Entry 17 — Scroll-aware navbar visibility (client feedback) — 2026-08-07

- **Client:** the fixed navbar washed out and was hard to see when scrolling down over the
  bright cream menu content. `NavBar.tsx` now tracks a `scrolled` state (scroll listener) and
  swaps the translucent `bg-maroon/95 backdrop-blur` pill for a **solid `bg-maroon` bar with
  `shadow-2xl` + `ring-cream/25`** once past 8px. At the very top (over the dark hero) the
  lighter translucent look is kept, so contrast is high in both places. `transition-all` keeps
  the swap smooth. No errors in dev; console clean.

---

## Entry 16 — Uplift AI remote image support & next.config update — 2026-08-07

- **Remote image configuration**: Updated `next.config.mjs` with `remotePatterns` for all HTTPS image hosts so blog featured images from Uplift AI's CDN/S3 load directly.
- **Direct Uplift AI image rendering**: Removed website fallback image paths from `/blog` and `/blog/[slug]`. Posts now render their `featuredImage` directly from Uplift AI's API response with `unoptimized` prop.
- **Live verification**: Successfully built with `.env.local` token, fetching live post `/blog/best-pizza-in-woodstock` directly from Uplift AI. Build clean (22 static routes).

---

## Entry 15 — Environment variables template & Uplift AI direct integration — 2026-08-07

- **Removed dummy blog data**: `src/lib/blog.ts` now fetches exclusively from Uplift AI API (`UPLIFTAI_BLOG_TOKEN`). Added clean empty state UI to `/blog` when no posts are published yet.
- **Updated `.env.example`**: Configured template with `UPLIFTAI_BLOG_TOKEN`, `RESEND_API_KEY`, `RESEND_TO_EMAIL`, and `RESEND_FROM_EMAIL`.
- **Verification**: `npm run build` passed clean (21 routes compiled).

- **Footer updates**: Removed Facebook link; updated Instagram URL to `https://www.instagram.com/nonispizzanwings?igsh=MThrenBpcGZheG9haA==`; added **Blog** link under Quick Links.
- **Send a Query section**: Removed old newsletter subscribe box. Added interactive `SendQueryForm` component and `/api/query` route powered by Resend (`process.env.RESEND_API_KEY`), with graceful logging when key is pending.
- **Uplift AI Blog pages**: Built `/blog` listing page and `/blog/[slug]` detail route matching the site theme. Integrated with Uplift AI API endpoints (`UPLIFTAI_BLOG_TOKEN`), with high-quality fallback articles for offline/pending token states.
- **SEO & Build**: Added `/blog` to `sitemap.ts` and `BlogPosting` JSON-LD schema. `npm run build` passed clean (25 routes).

---

## Entry 13 — Client review round 3: salad sizes, dips, coupon removal — 2026-08-07

- **Salad size labels updated**: All 6 salads relabeled from Small/Large → **Medium / Large** in `menu.ts` (prices unchanged: Caesar/Greek/Garden M $8.99/L $10.99, Julienne M $9.99/L $11.99, Chicken & Chicken Caesar M $10.99/L $12.99).
- **Dipping sauces**: Added plain **Creamy Garlic** ($1.49) back as its own item alongside **Homemade Creamy Garlic** ($1.49, "Made fresh in house daily.").
- **Coupon codes & code-based deals removed completely**: Removed `couponDeals` section, code badges, and all "coupon code"/"use these codes" text across `/deals`, homepage, header/footer, FAQs, and `cluster.ts`. Everyday code-free deals remain.
- **Verification**: `npm run build` passed cleanly (19 static routes); zero `CODE `, `coupon code`, or `use these codes` strings in built `.next` HTML.
- **Still pending**: "Change price to 3.99" item awaiting client clarification on target item.

---

## Entry 12 — Client review round 2: wings, dips, prices — 2026-08-07

- **Wings are baked-only.** "Deep-Fried Baked Wings" → **Baked Wings**, "Deep-Fried Breaded
  Wings" → **Breaded Wings**; Boneless unchanged. Stripped every fried reference from the
  category teaser, `/chicken-wings-woodstock` (H1, lead, 2 FAQs, meta, body, grid intro) and
  the WhyNoni bullet. "Baked, never fried" added once on the item + once in the lead.
  *Panzerotti keeps "baked or deep-fried" — genuinely offered both ways, out of scope.*
- **Party Pizza**: descriptions now end "— 1 topping." / "— 4 toppings."; dropped the
  "2 dippings free" chip too. Prices unchanged ($26.99 / $32.99).
- **Free-dipping scrub**: Deal 1 "1 dipping free" → "1 dipping" (dip still in the combo,
  just not billed as free). Combo "3 pops or dips" left alone.
- **Gluten-free upcharge removed** from both places it lived — the Create-Your-Own
  description and `createYourOwnOptions.crusts` → "Gluten-Free (Medium only)".
- Fried Pickle Spears → **5 pcs $7.99 / 10 pcs $13.99**. Creamy Garlic → **Homemade Creamy
  Garlic**, "Made fresh in house daily." Kawartha **1 Scoop $3.49**, **2 Scoop $6.49**.
- **Not applied — awaiting confirmation:** "change price to 3.99" (ambiguous target). Build passes.

## Entry 11 — Image gap-fill: every menu item now has its own photo — 2026-08-06

- Client supplied 34 generated renders in `nonipizza_photos/`, one per placeholder slot.
  **Every file was opened and checked against its `menu.ts` description before mapping** —
  filenames treated as hints only, per the rule that caused this whole batch.
- All 34 verified correct and mutually distinct: Caesar ≠ Greek ≠ Garden; plain Fries vs
  skin-on Wedges vs Onion Rings; poppers vs mozzarella sticks; three separable garlic-finger
  variants; veg vs chicken samosa fillings.
- Caught in review: every source carries a Gemini **"✦" watermark** bottom-right, and several
  have light letterbox borders. New `scripts/prep-generated-photos.mjs`
  (`npm run images:generated`) crops both out with a proportional 4:3 window → 1200×900 q82.
  Outputs re-checked visually; watermark gone.
- Also fixed two long-standing defects from IMAGE-MANIFEST §4: **Butter Chicken now has no
  onion**, and **all three paneer pizzas show cubed paneer, not chicken**. `NO_PHOTO` is now
  empty and **0 of 65 menu items render the placeholder** (was 32).
- These are AI renders, **not** Noni's photography — deliberately kept out of `REAL_PHOTOS`;
  CREDITS.md documents the split as Batch A/B. Deleted the unused Unsplash `salad.jpg`
  (686 KB, no longer referenced). `nonipizza_photos/` git/vercel-ignored. Build passes.

## Entry 10 — Client review batch: hours, offers, images — 2026-08-06

- **Hours changed sitewide**: Sun–Thu 11 AM–9 PM, Fri–Sat 11 AM–11 PM. One edit in
  `locations.ts` drives footer, /find-us, FactsBlock and the Restaurant JSON-LD
  (`closes` 21:00 / 23:00); the hardcoded "until 11 PM (2 AM Fri–Sat)" AEO leads and FAQs on
  all 7 cluster pages were rewritten. **Owner must update the Google Business Profile to match.**
- **All free-delivery framing removed**, including the "within 3 km on orders $25+" phrasing
  the client reads as a free-delivery claim — leads, FAQs, HowTo step 3, PromoStrip, deals
  footnote, FactsBlock row, meta descriptions. Copy now says only that we deliver in Woodstock.
  Radius/minimum kept as data in `primaryLocation.delivery`, unpublished. **Flagged:** CLAUDE.md
  §2 had them as real facts — confirm customers shouldn't see the $25 minimum anywhere.
- **"FREE 1 dipping + 1 pop"** stripped from all six Indian-fusion items and every repeat of it
  on `/indian-fusion-pizza-woodstock`. Create Your Own dropped "4 toppings" → "toppings".
  Mozzarella Sticks & Jalapeño Poppers now priced **5 pcs / 10 pcs**. New hero sub-line verbatim.
- **One dish, one accurate image** is now a rule in CLAUDE.md §5. Removed the `salads`, `sides`
  and `desserts` category fallbacks — one messy-fries photo was standing in for Fries, Wedges,
  Onion Rings and 15 other sides; one salad photo for all six salads. Butter Chicken's render
  shows onion the dish doesn't have, so it joined `NO_PHOTO`. **~30 slots now render the branded
  placeholder** and are itemised in IMAGE-MANIFEST.md GAPS — they need a photo shoot.
- Coupon Deals section left untouched pending the client's answer. `npm run build` passes.

## Entry 9 — Square-pizza fix + Indian-fusion banner — 2026-08-05

- Client flagged the Spicy Chicken / Spicy Paneer renders as **square pizzas** — Noni's makes
  none. Spicy Chicken now uses the real (round) IndianFusion_2 cut-out; it lacks the jalapenos,
  but a real photo beats a render of a shape we don't sell.
- **Spicy Paneer now has no photo.** It's vegetarian and every option was wrong: the only
  paneer-accurate render is the square one, and both other "paneer" renders *and* the
  `indian-fusion` category fallback show chicken. Added a `NO_PHOTO` set to `src/lib/photos.ts`
  so it renders the branded placeholder instead of chicken.
- Found unreported: `pizza-butter-paneer` and `pizza-tandoori-paneer` also show **chicken on
  vegetarian items**. Round, so out of the reported scope — flagged in IMAGE-MANIFEST.md §4
  awaiting a decision, not changed.
- `/indian-fusion-pizza-woodstock`: replaced the curry-and-rice figure with a real Indian-fusion
  pizza banner (16:9, `indian-fusion-feature.jpg`). Curry cut-out now unused; Noni's doesn't
  sell curry. Deleted the two orphaned JPEGs. Build clean, 19/19.

---

## Entry 8 — Topping-accurate photo audit + menu additions — 2026-08-05

- Audited every source image by opening it (2× zoom on ambiguous pizzas) and wrote
  `IMAGE-MANIFEST.md`. Rule applied: assign a photo only if visible toppings match the menu
  description; otherwise leave the AI fallback and log it under GAPS.
- **Corrected two wrong assignments from Entry 7**: SpecialtyPizzas_3 has no mushrooms, so it
  is **Meat Lover, not Canadian**; the two Indian-fusion shots are near-duplicates, so only one
  becomes Tandoori Chicken and **Spicy Chicken reverts to fallback** (needs jalapenos). Restored
  both AI originals from git.
- `gemini-watermark-cleaned/` identified as the **AI render set, not photography** — excluded
  from all mapping and from `REAL_PHOTOS`. No shawarma slot exists anywhere (CLAUDE.md rule).
- Fixed a real defect: WingsCombos_2/4 ship with an *opaque* baked-in background (not stray
  alpha). Alpha-hardening and luma-keying both failed; tight crops now fill their frame so no
  black rectangle shows. Recomputed the `wings-breaded` crop against rendered candidates.
- Menu: added **Pesto** sauce to Create Your Own, and **Jalapeño Poppers** to Sides ($8.49/$13.99).
- Source folders git+vercel-ignored; only JPEGs ship. Build clean, 19/19 static pages.

---

## Entry 7 — Real Noni's brand photography replaces AI renders — 2026-08-05

- Noni's supplied its real assets: transparent-PNG dish cut-outs (7 top-level folders), the
  dark brand texture, the wordmark and the tomato "N" favicon.
- Added `scripts/prep-brand-images.mjs` (`npm run images:prep`) — composites each cut-out onto
  the brand texture and writes JPEGs at each card's aspect ratio (4:3 product / 16:9 deal /
  3:4 category / 16:9 hero), `contain`-fitted so no topping gets cropped. Hardens the alpha on
  the two combo files that shipped with wood-grain streaks; crops breaded wings out of a combo.
- **23 slots are now real photos**: Hawaiian, Deluxe, Canadian, Garden, BBQ Chicken, Tandoori
  Chicken, Spicy Chicken, baked + breaded wings, panzerotti, 4 category teasers, all 7 deals,
  2 coupons and the hero. Deal photos are now an explicit id→file map, not keyword matching.
- Real wordmark/favicon wired in: `Wordmark` now shows the tomato mark (white circle — red on
  maroon fails contrast); `src/app/icon.png` + apple icon in layout metadata.
- Butter chicken shot used on `/indian-fusion-pizza-woodstock` as a captioned flavour-base
  figure, **not** a menu item — Noni's sells the pizzas, not curry and rice.
- `REAL_PHOTOS` in `src/lib/photos.ts` tracks real-vs-AI; CREDITS/README/CLAUDE.md updated.

---

## Entry 6 — Real ordering URL + drop app badges — 2026-07-29

- Pointed all **Order Now / Grab Deal** CTAs at Noni's **Mealsy** online-ordering page
  (`onlineordering.mealsy.ca/en/#/Nonis-Pizza-And-Wings/online/menus`) — set as the default
  `orderUrl` in `src/lib/site.ts` (still overridable via `NEXT_PUBLIC_ORDER_URL`); updated `.env.example`.
- Ordering is **web-only**, so removed the App Store / Google Play badges: dropped `StoreBadge`
  from `AppCTA.tsx` and the Footer "Get the App" column, and deleted the now-unused `appLinks` config.
- Updated CLAUDE.md / README / DESIGN.md (order-URL default, no-app note, and the imagery section
  that still described the old Unsplash photos).
- Verified on a fresh prod server: 29 CTAs resolve to the Mealsy URL (new tab, `rel=noopener`), zero
  app-badge markup, viewport meta + `sm/md/lg` responsive classes intact. Clean build 18/18.

---

## Entry 5 — Per-dish images (AI renders) — 2026-07-29

- Owner supplied 38 AI-generated (Gemini), watermark-cleaned dish PNGs (~9 MB each) in
  `gemini-watermark-cleaned/`. Optimized **36** → ~1200px JPEG q80 (8.2 MB total) into
  `public/images/photos/` via `sharp` (added as a **devDependency**; noted in CLAUDE.md).
- **Skipped** `cat-shawarma` + `shawarma-platter` (discontinued); **kept** the Chicken Shawarma
  Pizza render. Spot-checked several images render correctly & watermark-free.
- Reworked `src/lib/photos.ts` to a **per-menu-item photo map** (each pizza/wing/etc. now gets its
  own render) with category-teaser + category-fallback maps; updated `dealPhoto`. Deleted 5 orphaned
  generic stock jpgs (salad.jpg stays — still Unsplash). Rewrote CREDITS.md; ignored the source PNG folder.
- Honesty: images are **illustrative AI renders, not photos of Noni's actual plates** (noted in
  CREDITS/README/DishImage). Clean build 18/18; verified all 37 paths exist + optimizer serves 200.

---

## Entry 4 — Discontinue shawarma + drop free delivery — 2026-07-29

- Owner: **shawarma is discontinued** and the **"free delivery after 3 PM"** offer is gone.
- Removed the whole shawarma line (menu category, `/shawarma-woodstock` page, coupons,
  `shawarmaSaucesAndToppings`, nav/footer/sitemap, `servesCuisine`, `shawarma.jpg`) **and** the
  shawarma-based **Family Meals** category. Kept the **Chicken Shawarma Pizza** (a topping flavour).
- Delivery is now **standard/paid within 3 km on $25+** — dropped "free" and "after 3 PM" site-wide
  (removed `delivery.afterTime`; rewrote FactsBlock/HowToOrder/NapMap + every landing FAQ/lead/CTA).
  Repurposed the homepage `PromoStrip` from free-delivery to **Happy Hour**.
- Updated CLAUDE.md (added a **"discontinued — do not re-add"** note), DESIGN.md, README, CREDITS.
  Refreshed `LAST_UPDATED`/sitemap to 2026-07-29. Clean build **18/18** static pages, no type/lint errors.

---

## Entry 3 — Real photography (Unsplash) — 2026-07-22

- Requested: real pictures from Unsplash. Downloaded & self-hosted 10 category food photos
  to `public/images/photos/` (Unsplash License); **visually verified each** depicts the right
  dish before wiring (pizza, margherita, wings, shawarma, curry, panzerotti/calzone, fries,
  salad, ice-cream cone, pizza-table hero).
- `DishImage` now renders optimized `next/image` when a photo is mapped, with the branded SVG
  as automatic fallback. New `src/lib/photos.ts` maps category/item/deal/hero → photo.
- Wired into Hero (background under maroon overlay, `priority` LCP), CategoryCarousel,
  ProductCard, DealCard. Honesty guard: Indian-fusion **pizza** cards use a pizza photo, not
  the curry (curry is a category teaser only) — no card misrepresents the product.
- Added `CREDITS.md` (attribution + "these are stock, not Noni's actual dishes"); updated
  README/DESIGN photo notes. Clean build 19/19; all photos serve 200 + next/image optimizer OK.

---

## Entry 2 — Search layer (SEO/AEO/GEO) — 2026-07-22

- Added **§7a Search Strategy** to CLAUDE.md: SEO/AEO/GEO definitions, permanent **Rule 0**
  (never build competitor-branded pages), keyword→page cluster map, per-page template, and
  AEO/GEO checklists.
- Built the **7-page cluster** on a shared template (direct-answer block → order CTA + phone
  → intro/entity → Why Noni's → price `<table>` → HowTo steps → facts table → FAQ →
  internal links → map/NAP → "Last updated" stamp): upgraded `/pizza-near-me-woodstock`,
  `/pizza-delivery-woodstock`, `/order-pizza-online-woodstock`, `/indian-fusion-pizza-woodstock`
  (strongest — absorbs "Indian Domino's" intent); added new `/best-pizza-woodstock`,
  `/dine-in-pizza-woodstock`, `/pizza-delivery-woodstock-vs-chains` (honest, no-impersonation
  comparison table for chain intent).
- New components: `WhyNoni`, `PriceTable`, `HowToOrder`, `FactsBlock`, `InternalLinks`,
  `NapMap`; `howToJsonLd` builder; `lib/cluster.ts` (siblings + LAST_UPDATED). Each page emits
  BreadcrumbList + FAQPage + HowTo JSON-LD; sitemap + footer + find-us cross-linked.
- Build: 19/19 static; clean-build production smoke test — all routes 200 with schema + tables
  verified. (A corrupt `.next` from orphaned dev servers caused transient 500s; fixed by a
  clean rebuild.) No competitor slugs in sitemap.

---

## Entry 1 — full v1 build — 2026-07-21

- Scaffolded Next.js 14 (App Router) + TypeScript + Tailwind manually (no interactive CLI);
  tokens in `tailwind.config.ts` + CSS vars, Anton (display) + Inter (body) via next/font.
- Encoded the entire menu in `src/data/menu.ts`, deals/coupons in `deals.ts`, NAP/hours/geo
  in `locations.ts`; central config + SEO + JSON-LD helpers in `src/lib`.
- Built the design system + all homepage sections (Nav, Hero, CategoryCarousel, MenuSection
  with client filter pills, Steps, PromoStrip, Deals, AppCTA, Footer w/ live map + newsletter).
- Shipped all 11 routes: `/`, `/menu` (Menu JSON-LD), `/deals`, 6 local-intent landing pages
  (each unique H1/copy/FAQ schema, internal links), `/find-us` (LocalBusiness+FAQ), `/reviews`
  (clearly-labeled placeholders, no fake rating schema). Added sitemap.ts + robots.ts.
- Branded SVG placeholder art via `DishImage` (real-photo slots named in data); README added.
- `npm run build` → 16/16 static pages; dev smoke test: all routes 200, JSON-LD + order URL
  wired. Committed.

---

## Entry 0 — project kickoff — 2026-07-21

- Received full brief: build a production-ready marketing + online-ordering site for
  **Noni's Pizza & Wings** (Woodstock, ON), matching a bold maroon/cream/orange
  fast-food reference UI, SEO-optimized for local pizza/wings/shawarma intent.
- Locked tech stack: **Next.js (App Router) + TypeScript + Tailwind**, next/font, JSON-LD,
  Next route handlers for sitemap/robots (chose this over `next-sitemap` — no extra dep).
- Created the three source-of-truth docs: **CLAUDE.md** (business facts/NAP, stack, folder
  structure, conventions, menu reference, SEO strategy), **DESIGN.md** (color tokens,
  typography, components, page layouts), and this **CONVERSATION.md**.
- `git init` done; committing docs first, then scaffolding the app.
- Next: scaffold Next.js app → design system (tokens + primitives) → typed data files →
  homepage → SEO landing routes → technical SEO (metadata/JSON-LD/sitemap/robots) → README.
