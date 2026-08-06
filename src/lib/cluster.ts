/**
 * The SEO/AEO/GEO cluster (CLAUDE.md §7a). One page owns each intent; every page links to
 * its siblings with descriptive anchor text. Also feeds the sitemap.
 */
export interface ClusterPage {
  path: string;
  /** Descriptive internal-link anchor text (keyword-rich, natural). */
  anchor: string;
}

export const clusterPages: ClusterPage[] = [
  { path: "/pizza-near-me-woodstock", anchor: "pizza near me in Woodstock" },
  { path: "/pizza-delivery-woodstock", anchor: "pizza delivery in Woodstock" },
  { path: "/order-pizza-online-woodstock", anchor: "order pizza online in Woodstock" },
  { path: "/best-pizza-woodstock", anchor: "the best pizza in Woodstock" },
  { path: "/indian-fusion-pizza-woodstock", anchor: "Indian fusion pizza in Woodstock" },
  { path: "/dine-in-pizza-woodstock", anchor: "dine-in pizza in Woodstock" },
  {
    path: "/pizza-delivery-woodstock-vs-chains",
    anchor: "local vs. chain pizza delivery",
  },
];

/** All sibling links except the current page, plus menu + deals. */
export function siblingLinks(currentPath: string): ClusterPage[] {
  return [
    ...clusterPages.filter((p) => p.path !== currentPath),
    { path: "/menu", anchor: "the full Noni's menu" },
    { path: "/deals", anchor: "pizza deals & coupons in Woodstock" },
  ];
}

/** Freshness stamp shown on every cluster page (GEO). Refresh per build session. */
export const LAST_UPDATED = "August 6, 2026";
