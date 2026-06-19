import Link from "next/link";

/**
 * Typographic wordmark. "cev" carries the lime — it's the loud half of the
 * name. The period is the signature mark, also lime, and reused across the
 * site (availability dot, list markers, favicon). "studio" stays white so
 * the green never tips into noise.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="cev.studio — home"
      className={`group inline-flex items-baseline font-sans text-[1.05rem] font-semibold tracking-tight ${className}`}
    >
      <span className="text-accent">cev</span>
      <span className="dot px-[0.5px] text-[1.15em] leading-none transition-transform duration-500 group-hover:scale-125">
        .
      </span>
      <span className="font-medium text-ink">studio</span>
    </Link>
  );
}
