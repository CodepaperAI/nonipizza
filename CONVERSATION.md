# CONVERSATION.md — Changelog

> Running changelog of working sessions. **Newest entry on top.** Concise summaries only
> (5–10 lines each) — never full transcripts.

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
