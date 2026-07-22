# DESIGN.md — Noni's Pizza & Wings Design System

> Anyone should be able to rebuild the look from this file alone. Bold, appetite-driven
> fast-food theme: deep maroon + warm cream + vivid orange, with a rotating set of pop
> accent colors for category and deal cards.

---

## 1. Color tokens

Defined as CSS variables in `src/app/globals.css` and mapped to Tailwind color names in
`tailwind.config.ts`. **Never inline raw hex in components — use the token classes.**

| Token | Hex | Tailwind class | Usage |
| --- | --- | --- | --- |
| `--maroon` | `#4B0D12` | `maroon` | Primary bg, nav, footer, buttons, dark sections |
| `--maroon-800` | `#661319` | `maroon-800` | Lighter maroon for hovers |
| `--maroon-900` | `#380A0D` | `maroon-900` | Deepest shade / gradients |
| `--cream` | `#F7F1E1` | `cream` | Light sections, cards, text on maroon |
| `--cream-200` | `#EFE6CE` | `cream-200` | Subtle card borders / alt cream |
| `--orange` | `#F26B21` | `orange` | Accent, prices, CTAs, links |
| `--orange-600` | `#D9591A` | `orange-600` | Orange hover |
| `--yellow` | `#F5C518` | `yellow` | Active filter pill, promo band, BROWSE word |
| `--sky` | `#7FD1E8` | `sky` | Card accent, ORDER word |
| `--pink` | `#F4A9C4` | `pink` | Card accent, ENJOY word |
| `--red` | `#D93A2B` | `red` | Card accent / deal cards |
| `--ink` | `#2A2A2A` | `ink` | Body text on cream |
| `--muted` | `#6B6B6B` | `muted` | Descriptions, secondary text |

**Contrast rules (WCAG AA):**
- Cream (`#F7F1E1`) on maroon (`#4B0D12`) → passes for body & large text.
- Maroon / ink on cream → passes.
- Orange is an **accent**, not body text on cream at small sizes — use for prices,
  large numbers, buttons (white text on orange passes for large/bold).
- Never put yellow text on cream (fails). Yellow is a background/word-accent only.

**Accent rotation** (category cards, deal cards, step words): cycle
`orange → yellow → sky → pink → red` in DOM order.

---

## 2. Typography

| Role | Font | Notes |
| --- | --- | --- |
| Display / headings | **Anton** (Google Font, via next/font) | Heavy condensed all-caps grotesque. Closest free match to the reference bold condensed wordmark. Always `uppercase`, tight tracking, tight leading. |
| Body / UI | **Inter** (Google Font, via next/font) | Clean humanist sans for paragraphs, descriptions, buttons, nav. |

> **Font choice note:** The brief suggested Anton **or** Archivo Black for the display
> face. We chose **Anton** — it is more condensed and closer to the reference wordmark's
> tall tight caps. Body face is **Inter** (over Poppins) for tighter UI legibility.

CSS: `--font-display` (Anton), `--font-body` (Inter). Tailwind: `font-display`, `font-body`.

### Type scale

| Token | Size / line-height | Use |
| --- | --- | --- |
| `display-hero` | clamp(3.5rem, 9vw, 8rem) / 0.9 | Hero stacked headline, footer wordmark |
| `display-xl` | clamp(2.5rem, 5vw, 4rem) / 0.95 | Section headings ("PICK YOUR CRAVING") |
| `display-lg` | 2rem / 1.0 | Sub-section / card group headings |
| `heading-md` | 1.375rem / 1.15 | Card names, step headings |
| `body-lg` | 1.125rem / 1.6 | Lead paragraphs |
| `body` | 1rem / 1.6 | Default body |
| `body-sm` | 0.875rem / 1.5 | Descriptions, meta |
| `label` | 0.75rem / 1 uppercase, letter-spacing 0.08em | Pills, badges, nav |

Display tokens are always `text-transform: uppercase`. Body tokens are sentence case.

---

## 3. Spacing, radius, shadow

- **Spacing scale:** Tailwind default (4px base). Section vertical padding: `py-16`
  mobile, `py-24` desktop. Container max-width `1200px`, side padding `px-5` / `px-8`.
- **Radius:** pills fully rounded (`rounded-full`); cards `rounded-3xl` (24px);
  buttons `rounded-full`; images inside cards `rounded-2xl`.
- **Shadow:** cards `shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)]`; nav pill
  `shadow-lg`. Keep shadows soft and warm, never harsh black.
- **Borders:** category/deal cards use a **4px colored border** in the rotating accent.

---

## 4. Components

Documented components (in `src/components`):

`NavBar`, `Hero`, `CategoryCarousel`, `MenuSection` (+ `FilterPills`, `ProductCard`),
`StepsSection`, `PromoStrip`, `DealsSection` (+ `DealCard`), `AppCTA`, `Footer`,
`Wordmark`. Primitives: `Button` (filled/outline), `Pill`, `Badge`.

### Primitives

- **Button**
  - `filled` — orange bg, white bold text, `rounded-full`, `px-6 py-3`, hover `orange-600`.
  - `outline` — transparent bg, 2px cream (or maroon) border, matching text, hover fills.
  - Optional trailing `→`. Uses `<a>` for links (order URL) / `<Link>` for internal.
  - Focus: `focus-visible:ring-2 ring-orange ring-offset-2`.
- **Pill** — small `rounded-full` label chip. Variants: `default` (maroon/cream),
  `active` (yellow bg, maroon text), `outline`. Used for filters, badges, "Menu" tag.
- **Badge** — the "⚡ Delivered fast — freshly made to order." chip: cream/maroon,
  `rounded-full`, small, icon + text.
- **Wordmark** — "NONI'S PIZZA & WINGS" in Anton with an **orange circular "N"**
  (a `<span>` circle) before it. Sizes: `nav` (center of nav) and `giant` (footer).

### NavBar
Sticky, floating **maroon rounded pill bar** over the hero. Layout:
- Left: `MENU · DEALS · REVIEW · FIND US` (links; `REVIEW`→/reviews, `FIND US`→/find-us).
- Center: `Wordmark` (nav size) with orange circular N.
- Right: **outlined "ORDER NOW" pill** → order URL.
- Mobile: wordmark left, hamburger right; menu opens a maroon sheet with the links +
  a filled Order Now button. (`"use client"` for toggle.)

### Hero
- Maroon background, generous top padding to clear the floating nav.
- Huge stacked display headline: **"CRAVE IT. / TAP IT. / DEVOUR IT."** (3 lines,
  `display-hero`, cream, last line accented orange).
- `Badge` under headline: "⚡ Delivered fast — freshly made to order."
- Two CTAs: filled orange **"ORDER NOW →"** + outline cream **"VIEW DEALS"** (→/deals).
- Below CTAs: the `CategoryCarousel`.

### CategoryCarousel
- Horizontal scroll row of **tall category cards** that bleed off both edges.
- Each card: food image, **4px colored rounded border** (rotating accent), bold uppercase
  label at bottom on a translucent maroon strip.
- Labels: `PIZZAS · WINGS · SHAWARMA · INDIAN FUSION · PANZEROTTI · SIDES · ICE CREAM`.
- Each links to the relevant menu section / landing page.
- Snap scrolling; hides scrollbar. On desktop shows ~5.5 cards, mobile ~1.5.

### MenuSection ("PICK YOUR CRAVING")
- **Cream background.**
- Centered `Pill` "Menu", big `display-xl` heading "PICK YOUR CRAVING", subtitle
  "Every bite hits different. Choose your category and feast."
- `FilterPills` row: `HOT SELLING · PIZZA · WINGS · SHAWARMA · INDIAN FUSION · SALADS · SIDES`.
  Active pill filled **yellow**. Client-side filter (`"use client"`).
- Grid of **3-across `ProductCard`** (white, `rounded-3xl`): image top, bold name,
  gray truncated (2-line) description, **big orange price bottom-left**, maroon
  **"ORDER NOW"** button bottom-right.
- "HOT SELLING" = curated featured subset.

### ProductCard
White card, `rounded-3xl`, soft shadow. Structure:
`[image 4:3 rounded-2xl] · name (heading-md) · description (body-sm muted, clamp 2)
· row{ price (orange, display-lg) — Button filled maroon "ORDER NOW" }`.

### StepsSection ("BROWSE THEN ORDER")
- Cream background, heading.
- Three tall image cards with **dark gradient bottoms**. Each: `STEP N` pill, white
  heading, description, and a **big colored word**: BROWSE (yellow) · ORDER (sky) · ENJOY (pink).
  - Step 1 "Pick what hits — add to cart, check out fast."
  - Step 2 "Wait for the knock — hot and ready."
  - Step 3 "Eat like you mean it — no apologies, just good food."

### PromoStrip
- Bold **yellow band**, full-width, with flying-food imagery. Big display headline for a
  current promo (e.g. free/intro shawarma offer or first-order incentive), maroon text,
  filled maroon CTA.

### DealsSection ("COMBOS THAT MAKE SENSE")
- Cream background. Heading + "Stack your favorites and save big."
- **2-across `DealCard`** grid, cards rotate accent bg (orange/yellow/sky/pink).
- DealCard: `SAVE $X` pill, combo image, name (display), bulleted contents, big **white
  price** with struck-through original, maroon **"GRAB DEAL"** button.
- Populated from `deals.ts` (coupons) + everyday deals.

### AppCTA
- Phone mockup with a bottom tab bar (Home · Orders · My Cart · Notification · More) +
  **App Store / Google Play badges** (placeholder links). Maroon or cream section.

### Footer
- **Maroon background.** Columns:
  - `QUICK LINKS` (Menu, Deals, Find Us, Reviews, local pages)
  - `LEGAL` (Privacy, Terms, Refund)
  - `GET THE APP` (store badges)
  - Newsletter **"NEVER MISS A DEAL AGAIN"** (email input + orange **SUBSCRIBE**,
    "No spam, ever.")
- Right: **embedded map** of the real Woodstock address + **"COME SAY HI"** with address,
  both phones, hours, Instagram / Facebook.
- Below everything: **giant full-width "NONI'S PIZZA" wordmark** with orange circular N.
- Bottom bar: allergen note + "Prices exclusive of HST" small text + copyright.

---

## 5. Page layouts (top → bottom)

### Home `/`
Hero → CategoryCarousel → MenuSection (PICK YOUR CRAVING) → StepsSection (BROWSE THEN
ORDER) → PromoStrip → DealsSection (COMBOS THAT MAKE SENSE) → AppCTA → Footer.

### `/menu`
Breadcrumb → page hero (maroon, H1 "Pizza Menu in Woodstock") → sticky category jump
nav → every menu category rendered as titled `ProductCard`/price-list groups → Order CTA
→ Footer. Menu JSON-LD.

### `/deals`
Hero → everyday deals grid → coupon `DealCard` grid (with codes) → fine print → Footer.

### Local landing pages (`/pizza-near-me-woodstock`, `/order-pizza-online-woodstock`,
`/pizza-delivery-woodstock`, `/indian-fusion-pizza-woodstock`, `/chicken-wings-woodstock`,
`/shawarma-woodstock`)
Shared template: maroon hero with **unique H1** containing the keyword → lead paragraph
(keyword in first sentence) → 2–3 content sections (one subheading contains the keyword)
with genuine local detail → relevant `ProductCard` preview pulled from menu data →
FAQ block (FAQPage schema) → internal links to `/menu` + `/order-pizza-online-woodstock`
→ Order CTA → Footer. Indian-fusion page is the richest (key differentiator).

### `/find-us`
Hero → address / phones / hours cards → embedded map → directions/parking → delivery-area
note (3 km, $25+, after 3 PM) → FAQ (FAQPage schema) → Footer. LocalBusiness schema.

### `/reviews`
Hero → clearly-labeled placeholder testimonials (no fake AggregateRating schema until real
reviews are supplied) → CTA → Footer.

---

## 6. Responsive & motion

- **Mobile-first.** Category carousel & menu grid collapse to 1-col; nav → hamburger.
- Breakpoints: Tailwind `sm 640 / md 768 / lg 1024 / xl 1280`.
- Motion: subtle hover lift on cards (`hover:-translate-y-1 transition`), button color
  transitions. Respect `prefers-reduced-motion`.

---

## 7. Imagery

- **Real photos** live in `public/images/photos/` — generic category food photography from
  Unsplash (Unsplash License, self-hosted, see `CREDITS.md`). Mapped to categories/items/
  deals via `src/lib/photos.ts`.
- `DishImage` renders an optimized `next/image` when a photo `src` is mapped, and **falls
  back to a branded SVG placeholder** (warm gradient block + dish name) when a slot is empty.
  So the layout is always complete; drop real dish JPEGs at the mapped paths to go fully live.
- Hero uses `hero-spread.jpg` as a background under a maroon overlay (`priority` for fast LCP).
- Honesty rule: Indian-fusion **pizza** product cards use a pizza photo, not the curry image
  (`indian-fusion.jpg` is a category teaser only) — no card misrepresents the actual product.
- All images have meaningful `alt` text. **No hotlinked stock — everything is self-hosted.**
