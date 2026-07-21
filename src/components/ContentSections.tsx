import Link from "next/link";

export interface ContentBlock {
  heading: string;
  /** Paragraphs (plain strings). */
  body: string[];
}

/** Alternating prose sections for landing pages. One subheading should carry the keyword. */
export function ContentSections({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-10 px-5 sm:px-8">
        {blocks.map((b) => (
          <div key={b.heading}>
            <h2 className="font-display uppercase text-display-lg text-maroon">{b.heading}</h2>
            {b.body.map((p, i) => (
              <p key={i} className="mt-3 text-body-lg leading-relaxed text-ink/90">
                {p}
              </p>
            ))}
          </div>
        ))}
        <p className="text-body-lg text-ink/90">
          Ready to eat? Browse the{" "}
          <Link href="/menu" className="font-bold text-orange underline">
            full menu
          </Link>{" "}
          or{" "}
          <Link href="/order-pizza-online-woodstock" className="font-bold text-orange underline">
            order pizza online
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
