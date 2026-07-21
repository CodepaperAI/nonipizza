import { primaryLocation, formattedAddress } from "@/data/locations";
import { siteConfig } from "@/lib/site";

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  primaryLocation.mapQuery
)}&output=embed`;

/** Embedded map + full NAP block (identical NAP everywhere). Closes each landing page. */
export function NapMap() {
  return (
    <section className="bg-cream pb-16 pt-2 sm:pb-20">
      <div className="mx-auto grid max-w-container gap-8 px-5 sm:px-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl shadow-card">
          <iframe
            title={`Map to ${siteConfig.name}, Woodstock ON`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full border-0 lg:h-full"
          />
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <h2 className="font-display uppercase text-display-lg text-maroon">Find Noni&apos;s</h2>
          <address className="mt-4 space-y-1 not-italic text-ink/90">
            <p className="font-bold text-maroon">{primaryLocation.name}</p>
            <p>{formattedAddress}</p>
            <p>
              {primaryLocation.city}, {primaryLocation.region} {primaryLocation.postalCode},{" "}
              {primaryLocation.country}
            </p>
            <p className="pt-2">
              {primaryLocation.phones.map((p, i) => (
                <span key={p}>
                  <a href={`tel:${p.replace(/[^\d]/g, "")}`} className="font-bold text-orange hover:underline">
                    {p}
                  </a>
                  {i < primaryLocation.phones.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </address>
          <div className="mt-4 space-y-1 text-sm text-muted">
            {primaryLocation.hours.map((h) => (
              <p key={h.label}>{h.label}</p>
            ))}
            <p>{primaryLocation.delivery.note}</p>
          </div>
          <a
            className="mt-4 inline-block font-bold text-orange underline"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(primaryLocation.mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions →
          </a>
        </div>
      </div>
    </section>
  );
}
