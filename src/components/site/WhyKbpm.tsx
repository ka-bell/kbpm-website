import { Reveal } from "./Reveal";

const columns = [
  {
    title: "No hiring. No management.",
    body: "You get a full technical team on day one — product, design, engineering. No recruiters, no ramp-up, no dead weight.",
  },
  {
    title: "Pitch bigger ideas.",
    body: "We're the build partner behind the pitches your competitors can't win. Bring us in as the invisible ninth floor.",
  },
  {
    title: "One partner, end to end.",
    body: "Product thinking, UX, and build in one studio. Fewer handoffs, faster decisions, a straighter line to something shipped.",
  },
];

export function WhyKbpm() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12 md:mb-16">
          <p className="eyebrow">§ 05 / Why us</p>
          <h2
            className="font-display mt-5 max-w-3xl text-foreground"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            What agencies get when they call us.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {columns.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface-alt p-8 md:p-10">
                <span className="font-mono-label text-muted-foreground">0{i + 1}</span>
                <h3
                  className="font-display mt-12 text-foreground"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.03em", fontWeight: 500, lineHeight: 1.05 }}
                >
                  {c.title}
                </h3>
                <p className="mt-5 text-sm text-muted-foreground">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
