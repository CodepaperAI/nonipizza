import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** sitemap.xml via Next route handler (no next-sitemap dependency). */
const routes = [
  "/",
  "/menu",
  "/deals",
  "/blog",
  "/find-us",
  "/reviews",
  "/pizza-near-me-woodstock",
  "/order-pizza-online-woodstock",
  "/pizza-delivery-woodstock",
  "/best-pizza-woodstock",
  "/indian-fusion-pizza-woodstock",
  "/dine-in-pizza-woodstock",
  "/pizza-delivery-woodstock-vs-chains",
  "/chicken-wings-woodstock",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-29");
  return routes.map((path) => ({
    url: new URL(path, siteConfig.siteUrl).toString(),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/menu" ? 0.9 : 0.7,
  }));
}
