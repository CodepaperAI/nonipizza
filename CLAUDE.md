# CLAUDE.md — Project Source of Truth

> **Read this file first in every session.** It is the single source of truth for
> business facts, brand, tech stack, folder structure, conventions, menu data, and
> SEO strategy for the Noni's Pizza & Wings website.

---

## 1. What we are building

A production-ready **marketing + online-ordering website** for a real restaurant,
**Noni's Pizza & Wings** in Woodstock, Ontario, Canada. Goals:

1. Look like a bold, appetite-driven fast-food brand (see `DESIGN.md`).
2. Rank in Google for **local pizza / wings / Indian-fusion search intent** near Woodstock.
3. Drive clicks to the online ordering flow (external URL, configurable).

No backend/database in v1. Menu data lives in typed files. "Order Now" links to a
configurable external ordering URL.

---

## 2. Business facts (NAP — keep identical site-wide)

Local SEO depends on **NAP consistency** (Name, Address, Phone identical everywhere).
Never vary the formatting below.

| Field | Value |
| --- | --- |
| **Name** | Noni's Pizza & Wings |
| **Tagline** | Freshly Prepared, Never Pre-Cooked, Simply Delicious, Made Just for You! |
| **Address** | 300 Main St, Unit 8, Woodstock, ON N4S 1T3, Canada |
| **Phone 1** | (519) 290-9555 |
| **Phone 2** | (519) 290-9521 |
| **Website** | www.nonispizza.ca |

**Hours**
- Mon–Thu & Sun: 11:00 AM – 11:00 PM
- Fri–Sat: 11:00 AM – 2:00 AM (closes 2 AM next day)

**Order options:** Online ordering, Pickup, Delivery, Dine-in.
**Delivery:** Delivery within **3 km** on orders **$25+** (standard paid delivery).

**Everyday specials**
- Seniors save 10% Mon–Thu
- Happy Hour 2–5 PM daily (10% off $25+)

> **Discontinued — do NOT re-add (future sessions):**
> - **Shawarma** (platters, wraps, sandwiches, combos) and the shawarma-based **Family
>   Meals** are discontinued. The `/shawarma-woodstock` landing page, the Shawarma menu
>   category, the Family Meals category, the shawarma coupons and `shawarmaSaucesAndToppings`
>   were all removed. The **"Chicken Shawarma Pizza"** signature *pizza* is a topping flavour
>   and **stays**. Do not recreate a shawarma page/category or list Shawarma in `servesCuisine`.
> - **Free delivery after 3 PM** is discontinued. Delivery is now standard/paid within 3 km on
>   $25+ orders — never describe delivery as "free" or tie it to "after 3 PM".

**Positioning:** Locally owned, proud to serve the Canadian community. Known for
**Indian-fusion pizzas** (butter chicken, tandoori paneer, spicy chicken/paneer),
**baked chicken wings** (healthier than fried), custom pizza & panzerotti,
and Kawartha ice cream.

**Target audiences (write copy for these):** South Asian / Indian diaspora wanting
familiar flavors fast-casual; adventurous pizza lovers; Woodstock families wanting
affordable delivery; students / young adults into fusion food; locals wanting quick
customizable weeknight meals.

**Allergen note (footer small text):** Products may contain nuts, peanuts, and other
allergens; cross-contamination possible — inform staff before ordering. Prices
exclusive of HST, subject to change.

---

## 3. Tech stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js (App Router) + TypeScript** | SSR/SSG, per-page metadata, easy sitemap/robots — best for SEO |
| Styling | **Tailwind CSS** | Design tokens in `tailwind.config.ts` + CSS variables |
| Fonts | **next/font** (Anton display, Inter body) | Self-hosted, no layout shift, fast LCP |
| Sitemap/robots | **Next.js route handlers** (`app/sitemap.ts`, `app/robots.ts`) | No extra dependency (chose this over `next-sitemap`) |
| Structured data | **JSON-LD** (Restaurant/LocalBusiness, Menu, FAQPage, BreadcrumbList) | Rich results, local SEO |
| Data | Typed files in `/src/data` | No DB needed for v1 |
| Ordering | External URL via `NEXT_PUBLIC_ORDER_URL` | Placeholder `https://www.nonispizza.ca` |

**Do not add dependencies beyond this stack without a note here.**

### Environment variables
- `NEXT_PUBLIC_ORDER_URL` — external online-ordering URL. Default/placeholder
  `https://www.nonispizza.ca`. Every "Order Now" CTA reads from
  `src/lib/site.ts` which reads this env var.
- `NEXT_PUBLIC_SITE_URL` — canonical site origin (default `https://www.nonispizza.ca`),
  used for canonical URLs, Open Graph, and the sitemap.

---

## 4. Folder structure

```
/
├── CLAUDE.md              # this file — read first
├── DESIGN.md              # full design system
├── CONVERSATION.md        # dated changelog (newest on top)
├── README.md             # run instructions, where to swap photos + ordering URL
├── package.json
├── tailwind.config.ts    # design tokens live here
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
├── public/
│   └── images/           # placeholder food photos (descriptive names = real-photo slots)
└── src/
    ├── app/
    │   ├── layout.tsx            # root layout: fonts, global JSON-LD (LocalBusiness), header/footer
    │   ├── globals.css           # CSS variables + Tailwind layers
    │   ├── page.tsx              # homepage
    │   ├── sitemap.ts            # sitemap.xml
    │   ├── robots.ts             # robots.txt
    │   ├── menu/page.tsx
    │   ├── deals/page.tsx
    │   ├── find-us/page.tsx
    │   ├── reviews/page.tsx
    │   ├── pizza-near-me-woodstock/page.tsx
    │   ├── order-pizza-online-woodstock/page.tsx
    │   ├── pizza-delivery-woodstock/page.tsx
    │   ├── indian-fusion-pizza-woodstock/page.tsx
    │   └── chicken-wings-woodstock/page.tsx
    ├── components/               # NavBar, Hero, CategoryCarousel, MenuSection, ...
    ├── data/
    │   ├── menu.ts               # full typed menu
    │   ├── deals.ts              # everyday deals + coupons
    │   └── locations.ts          # NAP, hours, geo
    └── lib/
        ├── site.ts               # site config (order URL, NAP, socials)
        ├── seo.ts                # metadata helpers
        └── jsonld.ts             # JSON-LD builders
```

---

## 5. Coding conventions

- **TypeScript strict.** Everything typed. Menu/deals/locations are typed data objects.
- **Server Components by default.** Only mark `"use client"` where interactivity is
  required (menu filter pills, mobile nav toggle, carousel).
- **All NAP/order data flows from `src/lib/site.ts` and `src/data/locations.ts`** — never
  hardcode the address/phone in components. This keeps NAP consistent for SEO.
- **Every Order Now button** uses the shared `Button` primitive pointing at
  `siteConfig.orderUrl` (from `NEXT_PUBLIC_ORDER_URL`).
- **Images**: placeholders in `/public/images` with descriptive filenames + meaningful
  `alt` text. No hotlinking copyrighted stock. Real photos drop into the same slots.
- **Accessibility**: semantic HTML, alt text, visible focus states, WCAG AA contrast.
- **Styling**: Tailwind utility classes + tokens; no inline hex — use token classes
  (`bg-maroon`, `text-orange`, etc.) defined in `tailwind.config.ts`.

---

## 6. Menu data reference

Full menu is encoded in `src/data/menu.ts` as typed objects. Categories:

- **Salads** (S/L)
- **Pizzas** — Specialty (3 topping), Signature (4 topping), Indian Fusion,
  Veggie Fans, Create Your Own, Hip Hip Hooray Party Pizza
- **Everyday Deals** (Deal 1–4)
- **Panzerotti**
- **Chicken Wings** (baked / deep-fried breaded / boneless, 1–4 LB, 9 sauces)
- **Side Orders**
- **Dipping Sauces**
- **Desserts**
- **Kawartha Ice Cream**
- **Drinks**

Coupon deals live in `src/data/deals.ts` (each has a code, e.g. `010425`).
Prices are CAD, exclusive of HST. Pizza sizes: Small 10" / Medium 12" / Large 14" /
X-Large 16" unless noted. **Menu data is the canonical source** — page copy must match it.

---

## 7. SEO strategy

**Principle:** One local restaurant → target **local + intent long-tail** terms, not
national branded terms.

**Do NOT create pages impersonating or targeting competitor brands** ("pizza hut",
"domino's", etc.). Reframe that demand into local intent: someone searching "pizza hut
that delivers" in Woodstock actually wants **local pizza delivery** — so we rank for
"pizza delivery Woodstock", not the competitor's name. This avoids trademark/impersonation
issues and still captures the real intent.

### Landing pages (each = own route, unique H1, unique useful copy, local schema, internal links, Order Now CTA)

| Route | Primary intent |
| --- | --- |
| `/` | brand + "pizza in Woodstock" |
| `/menu` | "pizza menu Woodstock" — full menu, Menu JSON-LD |
| `/deals` | deals & coupons |
| `/pizza-near-me-woodstock` | "pizza near me", "pizza places near me" |
| `/order-pizza-online-woodstock` | "online pizza order near me" |
| `/pizza-delivery-woodstock` | "pizza delivery close to me", "takeaway delivery near me" |
| `/indian-fusion-pizza-woodstock` | butter chicken / tandoori pizza — **key differentiator, make it strong** |
| `/chicken-wings-woodstock` | baked wings |
| `/find-us` | location, hours, map, directions — LocalBusiness + FAQPage schema |
| `/reviews` | testimonials — Review/AggregateRating schema **only if real reviews supplied**, else clearly labeled placeholder |

Weave each local keyword into the **H1, first paragraph, and one subheading**; link to
`/menu` and `/order-pizza-online-woodstock`. Keep copy genuine (hours, delivery radius,
what makes Noni's different) — **no keyword stuffing, no thin doorway pages.**

### Technical SEO
- Per-page metadata: title ≤ ~60 chars, description ≤ ~155, canonical, Open Graph + Twitter.
- Root layout JSON-LD: Restaurant/LocalBusiness with NAP, geo, `openingHoursSpecification`,
  `servesCuisine` (Pizza, Wings, Indian), `priceRange "$$"`, `hasMenu`.
- BreadcrumbList + FAQPage where relevant.
- `sitemap.xml`, `robots.txt`, clean heading hierarchy, descriptive alt text, fast LCP hero.
- Mobile-first responsive.

---

## 7a. Search Strategy (SEO / AEO / GEO)

We optimize for **three surfaces at once**:

- **SEO** — classic Google organic + the local pack.
- **AEO** (Answer Engine Optimization) — featured snippets, People Also Ask, voice: content
  that answers the question in the **first 40–60 words**.
- **GEO** (Generative Engine Optimization) — AI answers (Google AI Overviews, ChatGPT,
  Perplexity, Gemini): clear, quotable, factual, entity-consistent copy + structured data an
  LLM can lift verbatim.

### Rule 0 — DO NOT target competitor brands directly (permanent)

The raw keyword list contains branded terms ("pizza hut …", "domino's …", "Indian Domino's
Pizza"). **Never create a page titled after, or claiming to be, Pizza Hut / Domino's / any
chain.** That is trademark misuse, gets filtered by Google as doorway spam, and cannot rank
for brand-navigational queries anyway. **Future sessions: do not "helpfully" add competitor
pages.** Instead:

1. **Capture the generic intent** behind branded queries (user wants pizza delivered near
   them → route to the delivery page).
2. **One honest comparison page** — [`/pizza-delivery-woodstock-vs-chains`] — helps users
   choose between chains and a local option. Factual, respectful, **no impersonation, no
   logos**; describe chains generically; only make verifiable claims about Noni's.
3. **"Indian Domino's Pizza" → the goldmine.** Someone wanting Indian-style pizza with a
   big-brand experience → point at [`/indian-fusion-pizza-woodstock`] (butter chicken,
   tandoori paneer, spicy chicken). This is Noni's real differentiator — **strongest page on
   the site.**

### Cluster: keyword → page map (one page owns each intent; siblings cross-link)

Consolidated to avoid keyword cannibalization. **Do not create duplicates of these.**

| Page | Primary keyword | Variants captured |
| --- | --- | --- |
| `/pizza-near-me-woodstock` | pizza near me | pizza places/restaurants/shops near me · close to me · pizza from near me · pizza near to me · pizza and delivery near me |
| `/pizza-delivery-woodstock` | pizza delivery near me | pizza that delivers to me · pizza close to me that delivers · takeaway/food delivery near me pizza · delivery near me delivery |
| `/order-pizza-online-woodstock` | order pizza online near me | order pizza near me online · online pizza order near me |
| `/best-pizza-woodstock` | best pizza near me | good pizza near me · pizza near me best |
| `/indian-fusion-pizza-woodstock` | Indian fusion pizza Woodstock | butter chicken pizza · tandoori paneer pizza · Indian pizza near me · **"Indian Domino's Pizza"** intent |
| `/dine-in-pizza-woodstock` | dine in pizza restaurants near me | dine-in pizza Woodstock |
| `/pizza-delivery-woodstock-vs-chains` | *(intent behind)* pizza hut / domino's near me / delivers / closest | reframed → local delivery + neutral comparison |

Existing `/`, `/menu`, `/deals`, `/chicken-wings-woodstock`,
`/find-us`, `/reviews` stay and cross-link into this cluster.

### Per-page template (apply to every cluster landing page, in this order)

1. **H1** — primary keyword used naturally + "Woodstock, ON" + brand. One H1 only.
2. **Direct-answer block (AEO)** — a 40–60 word paragraph immediately under H1 that fully
   answers the query. This is what answer engines / AI Overviews quote. (Implemented as the
   `PageHero` lead so it's the first prose under the H1.)
3. **Order CTA** — filled orange "Order Now" (`NEXT_PUBLIC_ORDER_URL`) + phone
   **(519) 290-9555**.
4. **Intro / value** — 2–3 short paragraphs, keyword + variants woven naturally. State the
   entity for GEO: *"Noni's Pizza & Wings is a locally owned pizza and wings
   restaurant in Woodstock, Ontario."*
5. **Why Noni's** — bulleted concrete, quotable differentiators (freshly prepared never
   pre-cooked; Indian-fusion pizzas; baked wings; custom pizza & panzerotti; Kawartha ice
   cream; locally owned).
6. **Menu highlights + price `<table>`** — 4–8 relevant items with prices; link to `/menu`.
7. **How to order (HowTo)** — numbered steps, marked up with **HowTo JSON-LD**.
8. **Delivery / hours facts** — address, hours per day, 3 km radius, $25 minimum,
   phone. Identical to NAP everywhere.
9. **FAQ (AEO + GEO core)** — 5–8 voice-style question headings; each answer self-contained
   1–3 sentences. Marked up with **FAQPage JSON-LD**.
10. **Internal links** — to the other cluster pages + `/menu` + `/deals`, descriptive anchors.
11. **Map + NAP block** — embedded map of the real address + full NAP.
12. **Visible "Last updated: <date>" stamp** (freshness signal for GEO).

Every cluster page must have **genuinely unique copy** — vary intro, FAQs and highlights per
intent. Thin/cloned pages get filtered.

### Structured data per page
- **Global (root layout):** `Restaurant` (LocalBusiness subtype) — NAP, geo,
  `openingHoursSpecification`, `servesCuisine`, `priceRange "$$"`, `hasMenu`, `areaServed`
  "Woodstock, ON", `sameAs`. We emit this **once globally** and do NOT duplicate a second
  full Restaurant node per page (avoids conflicting entities — better for GEO).
- **Landing pages:** add `FAQPage` + `BreadcrumbList`.
- **Order / how-to pages:** add `HowTo`.
- **`/menu`:** `Menu` + `MenuSection` + `MenuItem` with `offers`/price.
- **`/reviews`:** `Review`/`AggregateRating` **only if real reviews** — otherwise omit and
  label testimonials as samples.
- **NAP in schema is byte-for-byte identical** to visible NAP and Google Business Profile.

### AEO checklist
Lead with the 40–60 word direct answer · question-style H2s mirroring voice queries ·
self-contained answers (readable out of context) · tables for prices/comparisons · ordered
lists for steps · FAQPage + HowTo schema · concise, definition-first, scannable writing.

### GEO checklist
State the brand as a clear entity in paragraph 1 of every page · always "Noni's Pizza &
Wings" (never variants) · specific verifiable facts (hours, 3 km radius, $25 threshold, named
signature dishes, "never pre-cooked") · visible "Last updated" stamp · comparison tables &
factual lists LLMs can extract · structured data mirrors visible content · no vague fluff.

---

## 8. How to work in this repo

1. **Read this file, then `DESIGN.md`.**
2. Build order: docs → scaffold → design system (tokens + primitives) → data → homepage → routes → SEO/technical.
3. Keep **NAP identical** everywhere (pull from `src/data/locations.ts`).
4. Every Order Now CTA → `NEXT_PUBLIC_ORDER_URL`.
5. Match `DESIGN.md` closely for look & feel.
6. **After each working session, append a dated ≤10-line summary to `CONVERSATION.md`
   (newest on top). Do not paste transcripts.**
7. `npm run dev` to develop, `npm run build` to verify production build.

---

## 9. Commands

```bash
npm install        # install deps
npm run dev        # local dev server (http://localhost:3000)
npm run build      # production build (verifies SSG + types)
npm run start      # serve production build
npm run lint       # eslint
```
