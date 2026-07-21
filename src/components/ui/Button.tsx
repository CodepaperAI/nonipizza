import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "filled" | "filledMaroon" | "outline" | "outlineMaroon";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-bold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const variants: Record<Variant, string> = {
  filled: "bg-orange text-white hover:bg-orange-600",
  filledMaroon: "bg-maroon text-cream hover:bg-maroon-800",
  outline:
    "border-2 border-cream text-cream hover:bg-cream hover:text-maroon",
  outlineMaroon:
    "border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  /** External links (order URL) render as <a> with rel/target. */
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function Button({
  children,
  href,
  variant = "filled",
  size = "md",
  external = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
