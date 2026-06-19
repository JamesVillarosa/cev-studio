import { Reveal } from "./reveal";

export function Cta() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-olive bg-[image:var(--gradient-olive)]">
      {/* A lime light bleeds in from the right — olive holds the field,
          green only flares at the edge and on the words that matter. */}
      <div
        aria-hidden
        className="glow-lime pointer-events-none absolute -right-24 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 opacity-60"
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent">
              Have something in mind?
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.75rem)] text-ink">
              Let&apos;s make it
              <br />
              <span className="text-lime">unmistakable</span>
              <span className="dot">.</span>
            </h2>
          </div>

          <a
            href="#contact"
            className="btn-lime group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[0.95rem] font-semibold"
          >
            Start a project
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
