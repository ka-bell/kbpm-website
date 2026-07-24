import { Reveal } from "./Reveal";

export type ProcessStep = {
  name: string;
  duration: string;
  copy: string;
};

const DEFAULT_STEPS: ProcessStep[] = [
  {
    name: "First call",
    duration: "30 min",
    copy: "We talk through what you're building and whether we're the right fit. No pitch, no deck.",
  },
  {
    name: "Brief",
    duration: "1–2 days",
    copy: "We write a clear brief together. This is where most projects succeed or fail, so we take it seriously.",
  },
  {
    name: "Draft™",
    duration: "If needed",
    copy: "If the idea needs validating first, we run a Draft sprint before committing to a full build.",
  },
  {
    name: "Make™",
    duration: "4–6 weeks",
    copy: "We design and build. Weekly check-ins. You see progress every week, not just at the end.",
  },
  {
    name: "Launch",
    duration: "Ship day",
    copy: "We ship. We're there for the first 30 days to fix anything that comes up.",
  },
  {
    name: "Keep™",
    duration: "If continuing",
    copy: "We stay on as your technical partner. Monthly, ongoing, on your terms.",
  },
];

type ProcessTimelineProps = {
  eyebrow?: string;
  title?: string;
  steps?: ProcessStep[];
  className?: string;
};

export function ProcessTimeline({
  eyebrow = "§ Process",
  title = "How a project flows.",
  steps = DEFAULT_STEPS,
  className = "border-y border-border bg-surface-alt",
}: ProcessTimelineProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12 md:mb-16">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            className="font-display mt-5 max-w-3xl text-foreground"
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 4.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            {title}
          </h2>
        </div>

        <ol className="border-t border-border">
          {steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <li className="grid grid-cols-12 items-baseline gap-4 border-b border-border py-8 md:py-10">
                <span className="col-span-2 font-mono-label text-muted-foreground md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10 md:col-span-4">
                  <h3
                    className="font-display text-foreground"
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                      letterSpacing: "-0.03em",
                      fontWeight: 500,
                    }}
                  >
                    {s.name}
                  </h3>
                </div>
                <p className="col-span-12 max-w-xl text-sm leading-relaxed text-muted-foreground md:col-span-5">
                  {s.copy}
                </p>
                <p className="col-span-12 font-mono-label uppercase tracking-wider text-muted-foreground md:col-span-2 md:text-right">
                  {s.duration}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
