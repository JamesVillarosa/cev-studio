import { Reveal } from "./reveal";

const STEPS = [
  {
    no: "01",
    title: "Discover",
    body: "We start with the problem, not the deliverable. A short, sharp briefing — your goals, your constraints, the people you're for.",
  },
  {
    no: "02",
    title: "Design",
    body: "Directions, not endless options. We show taste early, decide fast, and lock the system before a single screen is built.",
  },
  {
    no: "03",
    title: "Build",
    body: "Production code from day one. You watch it come together on a live preview URL — no big reveal, no surprises at the end.",
  },
  {
    no: "04",
    title: "Ship",
    body: "We deploy it, measure it, and hand you something you can actually run. Then we stick around for the part everyone else calls 'phase two'.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-20 border-t border-line bg-paper-card/30">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="label">How we work</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,4.5vw,3.5rem)] text-ink">
            A short path from a vague idea to a thing that runs<span className="dot">.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.no} delay={i * 70} className="h-full">
              <div className="flex h-full flex-col gap-4 bg-paper p-7 transition-colors duration-500 hover:bg-paper-card">
                <span className="font-mono text-sm text-ink-faint">
                  {step.no} <span className="dot">/</span> 04
                </span>
                <h3 className="font-display text-2xl text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
