import { Pill } from "./ui/Pill";

/** "BROWSE THEN ORDER" 3-step section (DESIGN.md StepsSection). */

const steps = [
  {
    n: 1,
    word: "Browse",
    wordClass: "text-yellow",
    heading: "Find your flavour",
    body: "Pick what hits — add to cart, check out fast.",
    accent: "from-yellow/20",
  },
  {
    n: 2,
    word: "Order",
    wordClass: "text-sky",
    heading: "We fire it up",
    body: "Wait for the knock — hot and ready.",
    accent: "from-sky/20",
  },
  {
    n: 3,
    word: "Enjoy",
    wordClass: "text-pink",
    heading: "Dig in",
    body: "Eat like you mean it — no apologies, just good food.",
    accent: "from-pink/20",
  },
];

export function StepsSection() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="text-center">
          <Pill variant="outline">How it works</Pill>
          <h2 className="mt-4 font-display uppercase text-display-xl text-maroon">
            Browse Then Order
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-body-lg text-muted">
            Three taps between you and dinner.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <article
              key={s.n}
              className="relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-maroon p-6 text-cream shadow-card"
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${s.accent} to-maroon-900`}
              />
              <div className="relative">
                <Pill variant="cream" className="mb-4">
                  Step {s.n}
                </Pill>
                <span className={`block font-display text-6xl uppercase leading-none ${s.wordClass}`}>
                  {s.word}
                </span>
                <h3 className="mt-3 text-heading-md font-display uppercase">{s.heading}</h3>
                <p className="mt-1 text-cream/80">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
