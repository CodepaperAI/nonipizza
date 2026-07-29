import { PageHero } from "@/components/PageHero";
import { ContentSections } from "@/components/ContentSections";
import { WhyNoni } from "@/components/landing/WhyNoni";
import { HowToOrder, DEFAULT_ORDER_STEPS } from "@/components/landing/HowToOrder";
import { FactsBlock } from "@/components/landing/FactsBlock";
import { InternalLinks } from "@/components/landing/InternalLinks";
import { NapMap } from "@/components/landing/NapMap";
import { Faq } from "@/components/Faq";
import { OrderCTA } from "@/components/OrderCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd, howToJsonLd } from "@/lib/jsonld";
import { LAST_UPDATED } from "@/lib/cluster";

const PATH = "/pizza-delivery-woodstock-vs-chains";

export const metadata = buildMetadata({
  title: "Pizza Delivery in Woodstock: Local vs. Chains | Noni's",
  description:
    "Choosing pizza delivery in Woodstock, ON? A neutral local-vs-chain comparison — made-to-order vs pre-made, delivery, menu and ownership — plus how to order from Noni's.",
  path: PATH,
});

/** Neutral comparison. No brand names, logos or impersonation — chains described generically. */
const comparison: { feature: string; local: string; chain: string }[] = [
  {
    feature: "How it's made",
    local: "Freshly prepared, never pre-cooked — made to order.",
    chain: "Often par-baked or pre-made to a standardized spec for speed.",
  },
  {
    feature: "Menu range",
    local: "Indian-fusion pizzas (butter chicken, tandoori paneer, spicy), plus wings & panzerotti.",
    chain: "Standardized national menu; specialty/fusion options vary and are usually limited.",
  },
  {
    feature: "Delivery",
    local: "Delivery within 3 km on orders over $25; pickup & dine-in too.",
    chain: "App-based delivery over a wide area; fees and minimums vary by location.",
  },
  {
    feature: "Ownership",
    local: "Locally owned in Woodstock, Ontario.",
    chain: "Corporate or franchise-owned.",
  },
  {
    feature: "Price",
    local: "Build-your-own from $8.99 (small); specialty from $14.99. HST extra.",
    chain: "Varies; frequent national coupons and app deals.",
  },
  {
    feature: "Hours",
    local: "Until 11 PM Sun–Thu, 2 AM Fri–Sat.",
    chain: "Varies by branch.",
  },
];

const faqs = [
  {
    q: "Should I order from a chain or a local pizza place in Woodstock?",
    a: "Both deliver. If you want a fast, familiar, standardized pizza, a chain works. If you want a pizza made fresh to order with flavours like butter chicken or tandoori paneer and local ownership, Noni's Pizza & Wings is the local choice in Woodstock.",
  },
  {
    q: "Is local pizza more expensive than the chains?",
    a: "Not necessarily. Noni's build-your-own pizzas start at $8.99 (small) and specialty pizzas from $14.99, with combo deals and coupon codes that keep it competitive.",
  },
  {
    q: "Do local pizza places deliver as fast as chains?",
    a: "Because each pizza is made fresh to order, timing depends on how busy we are. We prep, bake and deliver as fast as we can so it arrives hot within our 3 km delivery area.",
  },
  {
    q: "What can I get at Noni's that chains usually don't offer?",
    a: "Indian-fusion pizzas (butter chicken, tandoori paneer, spicy chicken), baked wings, handcrafted panzerotti and Kawartha ice cream — all in one order.",
  },
  {
    q: "Does Noni's deliver across Woodstock?",
    a: "Yes — delivery within 3 km on orders over $25, plus pickup and dine-in at 300 Main St, Unit 8.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Local vs. Chain Pizza Delivery", path: PATH },
          ]),
          faqJsonLd(faqs),
          howToJsonLd({
            name: "How to order pizza delivery from Noni's in Woodstock",
            description: "Order local pizza delivery in Woodstock in four steps.",
            steps: DEFAULT_ORDER_STEPS,
          }),
        ]}
      />
      <PageHero
        eyebrow="Local vs. Chains"
        title="Pizza Delivery in Woodstock: Local vs. Chains — How to Choose"
        lead="Choosing between chain pizza delivery and a local option in Woodstock, ON? Both deliver — but Noni's Pizza & Wings makes every pizza fresh to order, never pre-cooked, with Indian-fusion flavours the big chains don't offer, delivery within 3 km on orders over $25, and local ownership. Order online or call (519) 290-9555."
        breadcrumb={[
          { name: "Home", path: "/" },
          { name: "Local vs. Chains", path: PATH },
        ]}
        showPhone
        lastUpdated={LAST_UPDATED}
      />

      <ContentSections
        blocks={[
          {
            heading: "Local vs. chain pizza delivery in Woodstock",
            body: [
              "Noni's Pizza & Wings is a locally owned pizza and wings restaurant in Woodstock, Ontario. When you're deciding where to order pizza delivery near you, it helps to compare honestly. National chains are fast, familiar and standardized. A local kitchen like Noni's focuses on making each pizza fresh to order, with a menu you won't find nationwide.",
              "This is a neutral comparison — no logos, no gimmicks — so you can pick what fits the night. The facts about Noni's below are all verifiable.",
            ],
          },
        ]}
      />

      {/* Comparison table */}
      <section className="bg-cream py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-display uppercase text-display-lg text-maroon">
            Local vs. chain — side by side
          </h2>
          <div className="mt-6 overflow-x-auto rounded-3xl bg-white shadow-card">
            <table className="w-full border-collapse text-left">
              <caption className="px-5 pt-4 text-left text-sm text-muted">
                A neutral comparison. National chains described generically; Noni&apos;s facts are
                verifiable.
              </caption>
              <thead>
                <tr className="border-b border-maroon/10 text-label uppercase tracking-widest text-orange">
                  <th scope="col" className="px-5 py-3">
                    Feature
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Noni&apos;s (local)
                  </th>
                  <th scope="col" className="px-5 py-3">
                    National chains
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-maroon/5 last:border-0 align-top">
                    <th scope="row" className="px-5 py-3 font-bold text-maroon">
                      {row.feature}
                    </th>
                    <td className="px-5 py-3 text-sm text-ink/90">{row.local}</td>
                    <td className="px-5 py-3 text-sm text-muted">{row.chain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted">
            Chain features vary by brand and branch and are described in general terms only.
          </p>
        </div>
      </section>

      <WhyNoni
        heading="What you get with the local choice"
        facts={[
          "Freshly prepared, never pre-cooked — made to order, not par-baked.",
          "Indian-fusion pizzas the national chains don't offer.",
          "Delivery within 3 km on orders over $25.",
          "Wings, panzerotti & Kawartha ice cream in one order.",
          "Open late — until 2 AM Friday and Saturday.",
          "Locally owned in Woodstock, Ontario.",
        ]}
      />

      <HowToOrder heading="How to order local pizza delivery" />
      <FactsBlock />
      <Faq faqs={faqs} heading="Local vs. chain pizza — frequently asked questions" />
      <InternalLinks currentPath={PATH} />
      <NapMap />
      <OrderCTA heading="Go local tonight" sub="Fresh, made-to-order pizza delivery in Woodstock." />
    </>
  );
}
