import Image from "next/image";
import Link from "next/link";

/**
 * "NONI'S PIZZA & WINGS" wordmark, led by Noni's real tomato "N" mark (DESIGN.md).
 * The supplied mark is red on a white field, so it sits inside a white circle — placing
 * it straight onto the maroon bar would not clear WCAG AA contrast. Two sizes:
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
  /** Show the text wordmark next to the mark. */
  label?: boolean;
}) {
  const circle =
    size === "giant" ? "h-[0.9em] w-[0.9em]" : "h-8 w-8";
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
        className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-white ${circle}`}
      >
        <Image
          src="/images/nonis-mark.png"
          alt=""
          fill
          sizes="64px"
          className="object-cover"
        />
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
