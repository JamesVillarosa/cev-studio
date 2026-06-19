import { Reveal } from "./reveal";

const PRINCIPLES = [
  {
    title: "Taste is a discipline",
    body: "Good design isn't decoration applied at the end. It's a hundred small decisions made in the right order. We make them deliberately.",
  },
  {
    title: "Small team, full ownership",
    body: "No account managers, no telephone game. You talk to the people doing the work, and they own the outcome end to end.",
  },
  {
    title: "Ship, then refine",
    body: "Real feedback comes from real use. We get things live early, watch how people behave, and sharpen from there.",
  },
];

export function Studio() {
  return (
    <section id="studio" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="label">The studio</p>
            <p className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.9rem)] leading-[1.08] text-ink">
              We&apos;re a small, independent studio that designs and builds
              digital products for people who&apos;d rather be{" "}
              <span className="text-lime italic">unmistakable</span> than safe
              <span className="dot">.</span>
            </p>
            <p className="mt-7 max-w-md leading-relaxed text-ink-muted">
              Four disciplines under one roof means an idea never has to survive
              a handoff. The person who names your brand can talk to the person
              shipping your app — because they sit at the same table.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {PRINCIPLES.map((p) => (
                <li
                  key={p.title}
                  className="group flex flex-col gap-2 bg-paper p-7 transition-colors duration-500 hover:bg-paper-card sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="dot mt-1 text-lg leading-none">.</span>
                  <div>
                    <h3 className="font-display text-2xl text-ink">{p.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
