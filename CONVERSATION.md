# CONVERSATION.md — Changelog

> Running changelog of working sessions. **Newest entry on top.** Concise summaries only
> (5–10 lines each) — never full transcripts.

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
