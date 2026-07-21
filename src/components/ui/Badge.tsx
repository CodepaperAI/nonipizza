import type { ReactNode } from "react";

/** The "⚡ Delivered fast — freshly made to order." style chip (DESIGN.md). */
export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm font-medium text-cream ring-1 ring-cream/20 backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}
