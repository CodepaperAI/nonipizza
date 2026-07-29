import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { StepsSection } from "@/components/StepsSection";
import { PromoStrip } from "@/components/PromoStrip";
import { DealsSection } from "@/components/DealsSection";
import { AppCTA } from "@/components/AppCTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Noni's Pizza & Wings | Pizza in Woodstock, ON",
  description:
    "Locally owned pizza, baked wings & Indian-fusion pizzas in Woodstock, ON. Order online for pickup, delivery or dine-in.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }])} />
      <Hero />
      <MenuSection />
      <StepsSection />
      <PromoStrip />
      <DealsSection />
      <AppCTA />
    </>
  );
}
