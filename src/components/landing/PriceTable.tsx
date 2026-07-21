import Link from "next/link";
import { price, startingPrice, type MenuItem } from "@/data/menu";

/**
 * Real HTML <table> of menu items + prices. Answer engines and LLMs extract tables
 * cleanly, so this is a core AEO/GEO surface. Give it 4–8 relevant items per page.
 */
export function PriceTable({
  items,
  heading = "Menu highlights & prices",
  caption,
}: {
  items: MenuItem[];
  heading?: string;
  caption?: string;
}) {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display uppercase text-display-lg text-maroon">{heading}</h2>
        <div className="mt-6 overflow-x-auto rounded-3xl bg-white shadow-card">
          <table className="w-full border-collapse text-left">
            {caption && (
              <caption className="px-5 pt-4 text-left text-sm text-muted">{caption}</caption>
            )}
            <thead>
              <tr className="border-b border-maroon/10 text-label uppercase tracking-widest text-orange">
                <th scope="col" className="px-5 py-3">
                  Item
                </th>
                <th scope="col" className="px-5 py-3">
                  Details
                </th>
                <th scope="col" className="px-5 py-3 text-right">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const multi = item.variants.length > 1;
                return (
                  <tr key={item.id} className="border-b border-maroon/5 last:border-0">
                    <th scope="row" className="px-5 py-3 font-bold text-maroon">
                      {item.name}
                    </th>
                    <td className="px-5 py-3 text-sm text-muted">
                      {item.description ?? item.tags?.join(", ") ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-orange">
                      {multi && <span className="mr-1 text-xs text-muted">from</span>}
                      {price(startingPrice(item))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">
          Prices in CAD, exclusive of HST. See{" "}
          <Link href="/menu" className="font-bold text-orange underline">
            the full Noni&apos;s menu
          </Link>{" "}
          for every pizza, wing, shawarma and side.
        </p>
      </div>
    </section>
  );
}
