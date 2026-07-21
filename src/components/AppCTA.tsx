import { Button } from "./ui/Button";
import { siteConfig } from "@/lib/site";

/** App / order CTA with a phone mockup + store badges (DESIGN.md AppCTA). */

const tabs = ["Home", "Orders", "My Cart", "Notification", "More"];

export function AppCTA() {
  return (
    <section className="bg-maroon py-16 text-cream sm:py-24">
      <div className="mx-auto grid max-w-container items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display uppercase text-display-xl">
            Order in <span className="text-orange">taps</span>, not calls
          </h2>
          <p className="mt-4 max-w-md text-body-lg text-cream/85">
            Browse the full menu, build your own pizza, stack a combo and track it to your
            door. Pickup or delivery — {siteConfig.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.orderUrl} external variant="filled" size="lg">
              Order Now →
            </Button>
            <Button href="/menu" variant="outline" size="lg">
              View Menu
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <StoreBadge store="apple" href={siteConfig.appLinks.apple} />
            <StoreBadge store="google" href={siteConfig.appLinks.google} />
          </div>
        </div>

        {/* Phone mockup */}
        <div className="flex justify-center">
          <div className="relative w-64 rounded-[2.5rem] border-8 border-maroon-900 bg-cream p-3 shadow-card">
            <div className="rounded-[1.6rem] bg-white p-4">
              <div className="mb-3 h-1.5 w-16 rounded-full bg-cream-200" />
              <p className="font-display text-2xl uppercase leading-none text-maroon">
                Tonight&apos;s craving?
              </p>
              <div className="mt-4 space-y-3">
                {["Butter Chicken Pizza", "Honey Garlic Wings", "Chicken Shawarma"].map((n, i) => (
                  <div key={n} className="flex items-center gap-3 rounded-2xl bg-cream p-3">
                    <span
                      className="h-10 w-10 shrink-0 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${["#F26B21", "#F5C518", "#7FD1E8"][i]}, #4B0D12)`,
                      }}
                    />
                    <span className="text-sm font-bold text-maroon">{n}</span>
                    <span className="ml-auto text-sm font-bold text-orange">Add</span>
                  </div>
                ))}
              </div>
            </div>
            {/* bottom tab bar */}
            <div className="mt-3 flex justify-between rounded-2xl bg-maroon px-3 py-2 text-[0.55rem] uppercase text-cream">
              {tabs.map((t) => (
                <span key={t} className="text-center leading-tight">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreBadge({ store, href }: { store: "apple" | "google"; href: string }) {
  const label = store === "apple" ? "App Store" : "Google Play";
  const top = store === "apple" ? "Download on the" : "Get it on";
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-xl bg-cream/10 px-4 py-2 ring-1 ring-cream/20 transition hover:bg-cream/20"
      aria-label={`${top} ${label} (placeholder link)`}
    >
      <span aria-hidden="true" className="text-2xl">{store === "apple" ? "" : "▶"}</span>
      <span className="leading-tight">
        <span className="block text-[0.6rem] uppercase text-cream/70">{top}</span>
        <span className="block text-sm font-bold">{label}</span>
      </span>
    </a>
  );
}
