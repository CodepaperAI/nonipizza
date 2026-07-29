# Image Credits

Most dish photos in `public/images/photos/` are **AI-generated food renders** — one per menu
item, plus category teasers and the hero. They are self-hosted (not hotlinked) and mapped to
menu items in [`src/lib/photos.ts`](./src/lib/photos.ts).

> **Honesty note:** these are **illustrative AI-generated images**, *not* photographs of
> Noni's actual plates. Each image at least depicts the correct dish (e.g. the butter chicken
> pizza render shows a butter-chicken pizza). Replace any of them with real photography of
> Noni's food at the same file path anytime (see README → "Where to swap real photos"). The
> `DishImage` component uses whatever JPEG is at the mapped path and falls back to a branded
> SVG placeholder if a slot is empty.

## AI-generated renders

Generated with Google **Gemini** (image generation), watermark-removed, then optimized to
~1200px-wide JPEG (quality 80) for the web. Covers the hero, six category teasers (`cat-*.jpg`),
every pizza (specialty, signature, Indian-fusion, veggie), the three wing styles, panzerotti,
poutine, messy fries, ice cream, chocolate lava cake and drinks. Items without a dedicated
render fall back to their category image.

## Third-party stock (remaining)

| File | Depicts | Used for | Source |
| --- | --- | --- | --- |
| `salad.jpg` | Fresh vegetable salad | Salad product cards | [Unsplash](https://unsplash.com/license) · photo-1540420773420-3366772f4999 |

`salad.jpg` is from [Unsplash](https://unsplash.com) under the **[Unsplash License](https://unsplash.com/license)**
(free for commercial use; attribution appreciated, not required) — no dedicated salad render
exists yet. Swap in a real or generated salad photo at `public/images/photos/salad.jpg` to
replace it.

**Discontinued:** the shawarma category is discontinued, so `cat-shawarma` / `shawarma-platter`
renders were intentionally **not** used. The **Chicken Shawarma Pizza** render is kept — it's a
pizza, not the shawarma line.
