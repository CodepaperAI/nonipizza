import Link from "next/link";
import { Button } from "./ui/Button";
import { siteConfig } from "@/lib/site";

/** Reusable order call-to-action band + internal links (SEO: link to /menu + order page). */
export function OrderCTA({
  heading = "Hungry yet?",
  sub = "Order online for pickup or delivery — freshly made to order.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="bg-maroon py-16 text-cream">
      <div className="mx-auto max-w-container px-5 text-center sm:px-8">
        <h2 className="font-display uppercase text-display-xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-body-lg text-cream/85">{sub}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={siteConfig.orderUrl} external variant="filled" size="lg">
            Order Now →
          </Button>
          <Button href="/order-pizza-online-woodstock" variant="outline" size="lg">
            Order Pizza Online
          </Button>
          <Button href="/deals" variant="outline" size="lg">
            View Deals
          </Button>
        </div>
        <p className="mt-6 text-sm text-cream/70">
          Explore the{" "}
          <Link href="/menu" className="underline hover:text-orange">
            full menu
          </Link>{" "}
          or{" "}
          <Link href="/find-us" className="underline hover:text-orange">
            find us in Woodstock
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
