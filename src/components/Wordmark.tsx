import Link from "next/link";

/**
 * "NONI'S PIZZA & WINGS" wordmark with an orange circular "N" (DESIGN.md). Two sizes:
 * `nav` (in the nav bar) and `giant` (footer full-width).
 */
export function Wordmark({
  size = "nav",
  className = "",
  href = "/",
  label = true,
}: {
  size?: "nav" | "giant";
  className?: string;
  href?: string;
  /** Show the text wordmark next to the circle N. */
  label?: boolean;
}) {
  const circle =
    size === "giant"
      ? "h-[0.9em] w-[0.9em] text-[0.6em]"
      : "h-8 w-8 text-lg";
  const text =
    size === "giant"
      ? "text-display-hero"
      : "text-xl sm:text-2xl";

  const content = (
    <span
      className={`inline-flex items-center gap-2 font-display uppercase leading-none tracking-tight ${text} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-orange font-display text-white ${circle}`}
      >
        N
      </span>
      {label && (
        <span className="whitespace-nowrap">
          {size === "giant" ? "Noni's Pizza" : "Noni's Pizza & Wings"}
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Noni's Pizza & Wings — home">
        {content}
      </Link>
    );
  }
  return content;
}
