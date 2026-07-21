import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** robots.txt via Next route handler. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: new URL("/sitemap.xml", siteConfig.siteUrl).toString(),
    host: siteConfig.siteUrl,
  };
}
