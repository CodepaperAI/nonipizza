# CONVERSATION.md — Changelog

> Running changelog of working sessions. **Newest entry on top.** Concise summaries only
> (5–10 lines each) — never full transcripts.

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
