import Link from "next/link";
import { siblingLinks } from "@/lib/cluster";

/** Descriptive-anchor internal links to sibling cluster pages + menu/deals (no orphans). */
export function InternalLinks({
  currentPath,
  heading = "Explore more from Noni's",
}: {
  currentPath: string;
  heading?: string;
}) {
  const links = siblingLinks(currentPath);
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display uppercase text-display-lg text-maroon">{heading}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.path}>
              <Link
                href={l.path}
                className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-bold text-maroon shadow-card transition hover:-translate-y-0.5 hover:text-orange"
              >
                {l.anchor}
                <span aria-hidden="true" className="text-orange">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
