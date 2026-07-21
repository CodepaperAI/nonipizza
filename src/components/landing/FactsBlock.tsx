import { primaryLocation, formattedAddress } from "@/data/locations";

/**
 * Factual, citable delivery/hours facts (AEO/GEO). Rendered as a definition-style table
 * so answer engines and LLMs can extract clean key/value facts. NAP identical everywhere.
 */
export function FactsBlock({
  heading = "Delivery, hours & location facts",
}: {
  heading?: string;
}) {
  const rows: [string, string][] = [
    ["Restaurant", primaryLocation.name],
    [
      "Address",
      `${formattedAddress}, ${primaryLocation.city}, ${primaryLocation.regionCode} ${primaryLocation.postalCode}`,
    ],
    ["Phone", primaryLocation.phones.join(" · ")],
    ...primaryLocation.hours.map(
      (h) => [h.days.length > 3 ? "Sun–Thu" : "Fri–Sat", h.label.split(": ")[1]] as [string, string]
    ),
    ["Delivery radius", `${primaryLocation.delivery.radiusKm} km (free over $${primaryLocation.delivery.minSubtotal} after ${primaryLocation.delivery.afterTime})`],
    ["Order options", "Online ordering, pickup, delivery, dine-in"],
    ["Cuisine", "Pizza, chicken wings, shawarma, Indian fusion"],
    ["Price range", "$$"],
  ];
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display uppercase text-display-lg text-maroon">{heading}</h2>
        <div className="mt-6 overflow-x-auto rounded-3xl bg-white shadow-card">
          <table className="w-full border-collapse text-left">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k} className="border-b border-maroon/5 last:border-0">
                  <th scope="row" className="w-40 px-5 py-3 align-top text-label uppercase tracking-widest text-orange">
                    {k}
                  </th>
                  <td className="px-5 py-3 text-ink/90">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
