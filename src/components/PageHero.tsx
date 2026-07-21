import Link from "next/link";
import { Button } from "./ui/Button";
import { Pill } from "./ui/Pill";
import { siteConfig } from "@/lib/site";

/** Maroon hero for inner/landing pages: breadcrumb, eyebrow, H1, lead, CTAs. */
export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumb,
  primaryCta = true,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  breadcrumb: { name: string; path: string }[];
  primaryCta?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-maroon text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(242,107,33,0.22) 0%, rgba(75,13,18,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-container px-5 pb-14 pt-28 sm:px-8 sm:pt-36">
        <nav aria-label="Breadcrumb" className="mb-6 text-label uppercase text-cream/70">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumb.map((b, i) => (
              <li key={b.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i < breadcrumb.length - 1 ? (
                  <Link href={b.path} className="hover:text-orange">
                    {b.name}
                  </Link>
                ) : (
                  <span className="text-cream">{b.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-3xl">
          {eyebrow && <Pill variant="cream">{eyebrow}</Pill>}
          <h1 className="mt-4 font-display uppercase text-display-xl text-shadow-hero">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-cream/85">{lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryCta && (
              <Button href={siteConfig.orderUrl} external variant="filled" size="lg">
                Order Now →
              </Button>
            )}
            <Button href="/menu" variant="outline" size="lg">
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
