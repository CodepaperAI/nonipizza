import { Button } from "./ui/Button";
import { siteConfig } from "@/lib/site";

/** Bold yellow promo band (DESIGN.md PromoStrip). */
export function PromoStrip() {
  return (
    <section className="relative overflow-hidden bg-yellow">
      {/* playful confetti dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #4B0D12 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto flex max-w-container flex-col items-center gap-6 px-5 py-12 text-center text-maroon sm:flex-row sm:justify-between sm:px-8 sm:text-left">
        <div>
          <p className="text-label font-bold uppercase tracking-widest">Limited-time offer</p>
          <h2 className="mt-2 font-display uppercase text-display-lg leading-none sm:text-4xl">
            Free delivery after 3 PM
          </h2>
          <p className="mt-2 max-w-lg text-maroon/80">
            On orders $25+ within 3 km. Plus Happy Hour 2–5 PM daily & seniors save
            10% Mon–Thu.
          </p>
        </div>
        <Button href={siteConfig.orderUrl} external variant="filledMaroon" size="lg">
          Order Now →
        </Button>
      </div>
    </section>
  );
}
