import { Reveal } from "./reveal";

const SERVICES = [
  {
    no: "01",
    title: "Web Development",
    body: "Fast, accessible sites and web apps on a modern stack. We build with Next.js, TypeScript, and infrastructure that scales — and we sweat the details most teams skip: motion, performance budgets, and the empty states.",
    tags: ["Next.js / React", "Headless CMS", "Web apps", "E-commerce"],
  },
  {
    no: "02",
    title: "Mobile Apps",
    body: "Native-feeling iOS and Android products that respect the platform. From the first prototype to the App Store listing, designed and shipped by the same people — so nothing gets lost in a handoff.",
    tags: ["React Native", "iOS / Android", "Prototyping", "Release"],
  },
  {
    no: "03",
    title: "Brand Identity",
    body: "Names, marks, and the system around them. We build visual languages that hold up everywhere they land — a logo is the easy part; the rules that make it unmistakable are the work.",
    tags: ["Logo & wordmark", "Type & color", "Guidelines", "Art direction"],
  },
  {
    no: "04",
    title: "3D Modelling",
    body: "Product renders, motion, and interactive 3D that turn browsers into believers. We model, light, and bring objects into the page — real-time when it needs to move, pixel-perfect when it needs to sell.",
    tags: ["Product renders", "Motion", "WebGL / R3F", "Visualisation"],
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="label">What we do</p>
              <h2 className="mt-4 max-w-xl font-display text-[clamp(2.2rem,4.5vw,3.5rem)] text-ink">
                Four disciplines, one team, no handoffs<span className="dot">.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-ink-muted">
              Most studios do one of these well. We do all four because brands
              don&apos;t experience them separately — and neither should you.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.no} delay={i * 80}>
              <article className="group grid gap-6 border-b border-line py-10 md:grid-cols-[auto_1fr_auto] md:gap-12 md:py-12">
                <div className="font-mono text-sm text-ink-faint transition-colors duration-300 group-hover:text-accent">
                  {s.no}
                </div>

                <div className="max-w-2xl">
                  <h3 className="font-display text-3xl text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] md:group-hover:translate-x-1 md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
                    {s.body}
                  </p>
                </div>

                <div className="flex flex-wrap content-start gap-2 md:max-w-[14rem] md:justify-end">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wide text-ink-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
