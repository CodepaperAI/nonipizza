import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { menuJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";
import {
  menuItems,
  menuPageOrder,
  price,
  createYourOwnOptions,
  wingSauces,
  iceCreamFlavors,
  shawarmaSaucesAndToppings,
  type MenuItem,
} from "@/data/menu";

export const metadata = buildMetadata({
  title: "Pizza Menu in Woodstock | Noni's Pizza & Wings",
  description:
    "The full Noni's menu: specialty & Indian-fusion pizzas, baked wings, shawarma, panzerotti, sides, Kawartha ice cream & more. Order online in Woodstock, ON.",
  path: "/menu",
});

/** Group items within a category by their optional `group` field. */
function grouped(items: MenuItem[]): Record<string, MenuItem[]> {
  return items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const key = item.group ?? "";
    (acc[key] ||= []).push(item);
    return acc;
  }, {});
}

function VariantPrices({ item }: { item: MenuItem }) {
  if (item.variants.length === 1 && !item.variants[0].label) {
    return <span className="font-display text-xl text-orange">{price(item.variants[0].price)}</span>;
  }
  return (
    <div className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-right">
      {item.variants.map((v) => (
        <span key={v.label} className="whitespace-nowrap text-sm">
          <span className="text-muted">{v.label}</span>{" "}
          <span className="font-bold text-orange">{price(v.price)}</span>
        </span>
      ))}
    </div>
  );
}

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="flex flex-col gap-1 border-b border-maroon/10 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="max-w-xl">
        <h3 className="font-bold text-maroon">
          {item.name}
          {item.isNew && (
            <span className="ml-2 rounded-full bg-red px-2 py-0.5 text-[0.6rem] font-bold uppercase text-white">
              New
            </span>
          )}
        </h3>
        {item.description && <p className="mt-1 text-sm text-muted">{item.description}</p>}
      </div>
      <div className="shrink-0">
        <VariantPrices item={item} />
      </div>
    </li>
  );
}

export default function MenuPage() {
  return (
    <>
      <JsonLd
        data={[
          menuJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Menu"
        title="Pizza Menu in Woodstock"
        lead="Freshly prepared, never pre-cooked. Browse every pizza, wing, shawarma and side — then order online for pickup or delivery across Woodstock, ON."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Menu", path: "/menu" },
        ]}
      />

      {/* Jump nav */}
      <nav aria-label="Menu categories" className="sticky top-[4.5rem] z-30 border-y border-maroon/10 bg-cream/95 backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-container gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          {menuPageOrder.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="shrink-0 rounded-full bg-white px-4 py-1.5 text-label font-bold uppercase text-maroon ring-1 ring-maroon/15 hover:bg-yellow"
            >
              {c.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-container px-5 py-12 sm:px-8">
        {menuPageOrder.map((cat) => {
          const items = menuItems.filter((i) => i.category === cat.id);
          if (!items.length) return null;
          const groups = grouped(items);
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-28 py-8">
              <h2 className="font-display uppercase text-display-lg text-maroon">{cat.label}</h2>
              {Object.entries(groups).map(([group, groupItems]) => (
                <div key={group} className="mt-6">
                  {group && (
                    <h3 className="mb-1 text-label font-bold uppercase tracking-widest text-orange">
                      {group}
                    </h3>
                  )}
                  <ul>
                    {groupItems.map((item) => (
                      <ItemRow key={item.id} item={item} />
                    ))}
                  </ul>
                </div>
              ))}

              {/* Extra reference blocks */}
              {cat.id === "pizza" && (
                <div className="mt-6 rounded-3xl bg-white p-6 shadow-card">
                  <h3 className="font-display text-heading-md uppercase text-maroon">
                    Create Your Own — options
                  </h3>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                    <RefList label="Crusts" items={createYourOwnOptions.crusts} />
                    <RefList label="Sauces" items={createYourOwnOptions.sauces} />
                    <RefList label="Cheeses" items={createYourOwnOptions.cheeses} />
                    <RefList label="Meats" items={createYourOwnOptions.meats} />
                    <RefList label="Veggies" items={createYourOwnOptions.veggies} />
                  </dl>
                  <p className="mt-4 text-sm text-muted">
                    Extra topping by size — {createYourOwnOptions.extraToppingBySize}.
                  </p>
                </div>
              )}
              {cat.id === "wings" && (
                <p className="mt-4 text-sm text-muted">
                  <span className="font-bold text-maroon">Sauces:</span> {wingSauces.join(", ")}.
                </p>
              )}
              {cat.id === "ice-cream" && (
                <p className="mt-4 text-sm text-muted">
                  <span className="font-bold text-maroon">Flavours:</span>{" "}
                  {iceCreamFlavors.join(", ")}. Waffle cone +$1.00.
                </p>
              )}
              {cat.id === "shawarma" && (
                <div className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
                  <p>
                    <span className="font-bold text-maroon">Sauces:</span>{" "}
                    {shawarmaSaucesAndToppings.sauces.join(", ")}.
                  </p>
                  <p>
                    <span className="font-bold text-maroon">Toppings:</span>{" "}
                    {shawarmaSaucesAndToppings.toppings.join(", ")}.
                  </p>
                </div>
              )}
            </section>
          );
        })}

        <div className="flex flex-wrap gap-3 pt-4">
          <Button href={siteConfig.orderUrl} external variant="filled" size="lg">
            Order Now →
          </Button>
          <Link href="/deals" className="self-center underline hover:text-orange">
            See deals & coupons
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted">
          Prices in CAD, exclusive of HST and subject to change. Products may contain nuts,
          peanuts and other allergens — please inform staff before ordering.
        </p>
      </div>

      <OrderCTA />
    </>
  );
}

function RefList({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div>
      <dt className="text-label font-bold uppercase tracking-widest text-orange">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{items.join(", ")}</dd>
    </div>
  );
}
