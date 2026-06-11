import { Reveal } from "./reveal";

export function Cta() {
  return (
    <section className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <Reveal className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-paper/50">
              Have something in mind?
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,6vw,4.75rem)] text-paper">
              Let&apos;s make it
              <br />
              unmistakable<span className="dot">.</span>
            </h2>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-paper/25 px-7 py-3.5 text-[0.95rem] text-paper transition-all duration-300 hover:border-paper hover:bg-paper hover:text-ink"
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
