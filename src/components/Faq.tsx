/** Accessible FAQ list (visual). Pair with faqJsonLd() for the FAQPage schema. */
export function Faq({
  faqs,
  heading = "Frequently asked questions",
}: {
  faqs: { q: string; a: string }[];
  heading?: string;
}) {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display uppercase text-display-lg text-maroon">{heading}</h2>
        <div className="mt-6 divide-y divide-maroon/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-maroon">
                {f.q}
                <span className="shrink-0 text-orange transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-2 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
