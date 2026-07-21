import type { ReactNode } from "react";

type Variant = "default" | "active" | "outline" | "cream";

const variants: Record<Variant, string> = {
  default: "bg-maroon text-cream",
  active: "bg-yellow text-maroon",
  outline: "border-2 border-maroon/30 text-maroon",
  cream: "bg-cream text-maroon",
};

export function Pill({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-label font-bold uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
