import { Pill } from "./ui/Pill";
import { DealCard } from "./DealCard";
import { Button } from "./ui/Button";
import { featuredDeals } from "@/data/deals";

/** "COMBOS THAT MAKE SENSE" deals section (DESIGN.md DealsSection). 2-across cards. */
export function DealsSection() {
  const deals = featuredDeals();
  return (
    <section id="deals" className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <div className="text-center">
          <Pill variant="active">Deals</Pill>
          <h2 className="mt-4 font-display uppercase text-display-xl text-maroon">
            Combos That Make Sense
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-body-lg text-muted">
            Stack your favorites and save big.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/deals" variant="filledMaroon" size="lg">
            See all deals →
          </Button>
        </div>
      </div>
    </section>
  );
}
