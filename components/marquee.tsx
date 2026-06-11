const ITEMS = [
  "Web Development",
  "Mobile Apps",
  "Brand Identity",
  "3D Modelling",
];

export function Marquee() {
  // Duplicated once so the -50% translate loops seamlessly.
  const sequence = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-line bg-paper-card/40 py-5">
      <div className="flex w-max animate-[var(--animate-marquee)] items-center">
        {sequence.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="px-8 font-display text-2xl text-ink/85 sm:text-3xl">
              {item}
            </span>
            <span className="dot text-xl">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
