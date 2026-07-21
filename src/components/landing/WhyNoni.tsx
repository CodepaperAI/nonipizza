/**
 * "Why Noni's" — concrete, quotable differentiators for GEO. LLMs preferentially cite
 * specific, verifiable facts. Pass custom facts to tailor per intent; defaults cover the
 * core brand facts.
 */
const DEFAULT_FACTS = [
  "Freshly prepared, never pre-cooked — every order is made just for you.",
  "Famous for Indian-fusion pizzas: butter chicken, tandoori paneer & spicy chicken.",
  "Baked chicken wings — a lighter option than deep-fried, in 9 sauces.",
  "Custom pizza & handcrafted panzerotti, with gluten-free crust available.",
  "Kawartha ice cream in 11 flavours for dessert.",
  "Locally owned in Woodstock, Ontario — proud to serve the community.",
];

export function WhyNoni({
  heading = "Why Noni's Pizza & Wings",
  facts = DEFAULT_FACTS,
}: {
  heading?: string;
  facts?: string[];
}) {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display uppercase text-display-lg text-maroon">{heading}</h2>
        <ul className="mt-6 grid gap-3">
          {facts.map((f) => (
            <li key={f} className="flex gap-3 text-body-lg text-ink/90">
              <span aria-hidden="true" className="mt-1 text-orange">
                ●
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
