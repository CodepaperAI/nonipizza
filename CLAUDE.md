# CLAUDE.md — Project Source of Truth

> **Read this file first in every session.** It is the single source of truth for
> business facts, brand, tech stack, folder structure, conventions, menu data, and
> SEO strategy for the Noni's Pizza & Wings website.

---

## 1. What we are building

A production-ready **marketing + online-ordering website** for a real restaurant,
**Noni's Pizza & Wings** in Woodstock, Ontario, Canada. Goals:

1. Look like a bold, appetite-driven fast-food brand (see `DESIGN.md`).
2. Rank in Google for **local pizza / wings / shawarma search intent** near Woodstock.
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
**Delivery:** Free delivery within **3 km** on orders **$25+ after 3:00 PM**.

**Everyday specials**
- Seniors save 10% Mon–Thu
- Happy Hour 2–5 PM daily (10% off $25+)
- Free delivery after 3 PM (3 km, $25+ min)

**Positioning:** Locally owned, proud to serve the Canadian community. Known for
**Indian-fusion pizzas** (butter chicken, tandoori paneer, spicy chicken/paneer),
**baked chicken wings** (healthier than fried), custom pizza & panzerotti, shawarma,
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
    │   ├── chicken-wings-woodstock/page.tsx
    │   └── shawarma-woodstock/page.tsx
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

- **Shawarma** — Platters, Wraps, Sandwiches (S/L), Combos
- **Family Meals**
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
- **Shawarma Sauces & Toppings**

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
| `/shawarma-woodstock` | shawarma platters/wraps |
| `/find-us` | location, hours, map, directions — LocalBusiness + FAQPage schema |
| `/reviews` | testimonials — Review/AggregateRating schema **only if real reviews supplied**, else clearly labeled placeholder |

Weave each local keyword into the **H1, first paragraph, and one subheading**; link to
`/menu` and `/order-pizza-online-woodstock`. Keep copy genuine (hours, delivery radius,
what makes Noni's different) — **no keyword stuffing, no thin doorway pages.**

### Technical SEO
- Per-page metadata: title ≤ ~60 chars, description ≤ ~155, canonical, Open Graph + Twitter.
- Root layout JSON-LD: Restaurant/LocalBusiness with NAP, geo, `openingHoursSpecification`,
  `servesCuisine` (Pizza, Wings, Shawarma, Indian), `priceRange "$$"`, `hasMenu`.
- BreadcrumbList + FAQPage where relevant.
- `sitemap.xml`, `robots.txt`, clean heading hierarchy, descriptive alt text, fast LCP hero.
- Mobile-first responsive.

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
