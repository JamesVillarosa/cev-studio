import Link from "next/link";

/**
 * Typographic wordmark. The period is the brand's signature mark — rendered
 * in the accent and reused across the site (availability dot, list markers,
 * favicon).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="cev.studio — home"
      className={`group inline-flex items-baseline font-sans text-[1.05rem] font-medium tracking-tight text-ink ${className}`}
    >
      <span>cev</span>
      <span className="dot px-[0.5px] text-[1.15em] leading-none transition-transform duration-500 group-hover:scale-125">
        .
      </span>
      <span className="text-ink-muted">studio</span>
    </Link>
  );
}
