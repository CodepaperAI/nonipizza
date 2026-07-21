import type { Metadata } from "next";
import { siteConfig } from "./site";

/**
 * Per-page metadata helper. Keeps titles ≤ ~60 chars and descriptions ≤ ~155 (enforce by
 * hand at call sites) and sets canonical + Open Graph + Twitter consistently. See
 * CLAUDE.md §7 Technical SEO.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  /** Path beginning with "/" — used for canonical + OG url. */
  path: string;
  /** OG image path under /public; defaults to the brand OG image. */
  ogImage?: string;
}): Metadata {
  const url = new URL(opts.path, siteConfig.siteUrl).toString();
  const ogImage = opts.ogImage ?? "/images/og-default.svg";
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: siteConfig.name,
      locale: "en_CA",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
  };
}
