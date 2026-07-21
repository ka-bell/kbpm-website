import { Reveal } from "./Reveal";

const steps = [
  {
    name: "Discover",
    copy:
      "We map your goals, users, constraints, and current systems into one working context. Decisions get made once and recorded where the work happens.",
    timeline: "1 week",
  },
  {
    name: "Design",
    copy:
      "Design works straight from the discovery decisions. No re-briefing, no drift from the original intent, no handoff haze.",
    timeline: "2 weeks",
  },
  {
    name: "Deliver",
    copy:
      "Engineers build from the live product context, not a spec written months ago. Existing systems and standards are respected and extended.",
    timeline: "4–6 weeks",
  },
  {
    name: "Deploy",
    copy:
      "Ship, measure, and carry everything learned into the next cycle. Delivery becomes a standing capability, not a project that ends.",
    timeline: "Ongoing",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
        <div className="border-b border-border pb-8">
          <div className="flex items-center gap-4">
            <span aria-hidden className="inline-block h-5 w-5 bg-accent" />
            <p className="font-mono-label uppercase tracking-wider text-foreground">Our framework</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-7">
            <h2
              className="font-display text-foreground"
              style={{
                fontSize: "clamp(3rem, 6vw, 6rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 500,
              }}
            >
              Applied Product Discovery
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-foreground md:text-2xl">
              Most delivery cycles lose context every time the work changes hands. Our process
              keeps one persistent working state across discovery, design, delivery, and launch.
              What is decided early is what gets built in every sprint.
            </p>
          </div>
          <div className="flex items-end md:col-span-4 md:col-start-9">
            <p className="text-sm leading-relaxed text-muted-foreground">
              A simple four-part operating model for moving from ambiguous product idea to
              shipped software without re-briefing the team at every stage.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 overflow-hidden border border-border md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <div
                className={`flex min-h-[360px] flex-col bg-background p-8 md:min-h-[430px] md:p-10 ${
                  i < steps.length - 1 ? "border-b border-border md:border-b-0 md:border-r" : ""
                }`}
              >
                <span className="font-mono-label text-muted-foreground">0{i + 1}</span>
                <h3
                  className="font-display mt-10 text-foreground"
                  style={{ fontSize: "clamp(1.75rem, 2.4vw, 2.25rem)", letterSpacing: "-0.03em", fontWeight: 500 }}
                >
                  {s.name}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">{s.copy}</p>
                <div className="mt-auto border-t border-border pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono-label uppercase tracking-wider text-foreground">Timeline</p>
                    <p className="text-sm text-foreground">{s.timeline}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
