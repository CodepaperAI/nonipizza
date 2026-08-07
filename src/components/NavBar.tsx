"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import { Button } from "./ui/Button";
import { siteConfig } from "@/lib/site";

const links = [
  { label: "Menu", href: "/menu" },
  { label: "Deals", href: "/deals" },
  { label: "Review", href: "/reviews" },
  { label: "Find Us", href: "/find-us" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  // Once the page is scrolled, the pill floats over bright menu content — a translucent,
  // blurred bar washes out there, so we switch to a solid, high-contrast maroon bar with a
  // stronger shadow. At the very top (over the dark hero) the lighter look reads fine.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto mx-auto flex max-w-container items-center justify-between gap-4 rounded-full px-4 py-3 text-cream transition-all duration-300 sm:px-6 ${
          scrolled
            ? "bg-maroon shadow-2xl ring-1 ring-cream/25"
            : "bg-maroon/95 shadow-lg ring-1 ring-cream/10 backdrop-blur"
        }`}
      >
        {/* Left links (desktop) */}
        <ul className="hidden flex-1 items-center gap-5 text-label font-bold uppercase lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded transition hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center wordmark */}
        <div className="flex flex-1 justify-start lg:justify-center">
          <Wordmark size="nav" />
        </div>

        {/* Right: order now (desktop) */}
        <div className="hidden flex-1 justify-end lg:flex">
          <Button href={siteConfig.orderUrl} external variant="outline" size="sm">
            Order Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-cream/20 lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div
          id="mobile-menu"
          className="pointer-events-auto mx-auto mt-2 max-w-container rounded-3xl bg-maroon p-5 text-cream shadow-lg ring-1 ring-cream/10 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-lg font-bold uppercase hover:bg-maroon-800"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Button href={siteConfig.orderUrl} external variant="filled" size="md" className="w-full">
              Order Now →
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
