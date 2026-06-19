import { ContactForm } from "./contact-form";

export function Hero() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden">
      {/* Ambient light — a soft lime source up top, an olive pool low-left.
          Sets the mood without putting flat green on a single surface. */}
      <div
        aria-hidden
        className="glow-lime pointer-events-none absolute -right-32 -top-24 h-[40rem] w-[40rem] opacity-70"
      />
      <div
        aria-hidden
        className="glow-olive pointer-events-none absolute -bottom-40 -left-40 h-[34rem] w-[34rem]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-40">
        {/* Left — the statement */}
        <div className="reveal is-visible">
          <p className="label flex items-center gap-2">
            <span className="dot text-base leading-none">.</span>
            Independent design &amp; build studio
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,5.25rem)] text-ink">
            A studio for brands
            <br />
            that refuse to{" "}
            <span className="text-lime italic">blend in</span>
            <span className="dot">.</span>
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-muted">
            We design identities, build web and mobile products, and craft 3D —
            end to end, in-house. One small team, accountable for the whole
            thing, from the first sketch to the thing that ships.
          </p>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            <Meta term="Based" value="Manila · Worldwide" />
            <Meta term="Founded" value="Est. 2026" />
            <Meta term="Focus" value="4 disciplines" />
          </dl>

          <p className="mt-8 max-w-md text-sm text-ink-faint">
            Tell us what you&apos;re building. The form does the introducing —
            no forms-within-forms, no discovery-call gauntlet.
          </p>
        </div>

        {/* Right — the hero: contact form */}
        <div className="reveal is-visible lg:pl-4" style={{ animationDelay: "120ms" }}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="label">{term}</dt>
      <dd className="mt-1.5 text-sm text-ink">{value}</dd>
    </div>
  );
}
