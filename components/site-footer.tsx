import { Logo } from "./logo";

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              An independent design &amp; build studio. Brand, web, mobile, and
              3D — made by people who care how it ships.
            </p>
            <a
              href="mailto:hello@cev.studio"
              className="link-underline mt-5 inline-block font-display text-2xl text-ink"
            >
              hello@cev.studio
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Studio"
              links={[
                { label: "Services", href: "#services" },
                { label: "Approach", href: "#approach" },
                { label: "About", href: "#studio" },
                { label: "Start a project", href: "#contact" },
              ]}
            />
            <FooterCol
              title="Disciplines"
              links={[
                { label: "Web Development", href: "#services" },
                { label: "Mobile Apps", href: "#services" },
                { label: "Brand Identity", href: "#services" },
                { label: "3D Modelling", href: "#services" },
              ]}
            />
            <FooterCol
              title="Elsewhere"
              links={[
                { label: "Instagram", href: "#" },
                { label: "Dribbble", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "GitHub", href: "#" },
              ]}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {YEAR} cev<span className="dot">.</span>studio — All rights
            reserved
          </span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for new work — Q3 2026
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="label mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="link-underline text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
