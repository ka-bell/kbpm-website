import { Reveal } from "./Reveal";

const logos = [
  {
    name: "Schiphol Group",
    svg: (
      <svg viewBox="0 0 200 60" className="h-10 w-auto md:h-12" aria-label="Schiphol Group">
        <text x="100" y="34" textAnchor="middle" className="fill-foreground" style={{ fontFamily: "serif", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Schiphol
        </text>
        <text x="100" y="52" textAnchor="middle" className="fill-muted-foreground" style={{ fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.15em" }}>
          GROUP
        </text>
      </svg>
    ),
  },
  {
    name: "Rabobank",
    svg: (
      <svg viewBox="0 0 200 60" className="h-9 w-auto md:h-11" aria-label="Rabobank">
        <text x="100" y="40" textAnchor="middle" className="fill-foreground" style={{ fontFamily: "serif", fontStyle: "italic", fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Rabobank
        </text>
      </svg>
    ),
  },
  {
    name: "Deloitte",
    svg: (
      <svg viewBox="0 0 200 60" className="h-9 w-auto md:h-11" aria-label="Deloitte">
        <text x="95" y="40" textAnchor="middle" className="fill-foreground" style={{ fontFamily: "sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em" }}>
          Deloitte
        </text>
        <circle cx="168" cy="40" r="4" className="fill-accent" />
      </svg>
    ),
  },
  {
    name: "HopPlay",
    svg: (
      <svg viewBox="0 0 200 60" className="h-9 w-auto md:h-11" aria-label="HopPlay">
        <text x="100" y="39" textAnchor="middle" className="fill-foreground" style={{ fontFamily: "sans-serif", fontSize: 31, fontWeight: 700, letterSpacing: "-0.03em" }}>
          HopPlay
        </text>
      </svg>
    ),
  },
  {
    name: "Mediahuis",
    svg: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto md:h-10" aria-label="Mediahuis">
        <text x="100" y="38" textAnchor="middle" className="fill-foreground" style={{ fontFamily: "sans-serif", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>
          Mediahuis
        </text>
      </svg>
    ),
  },
  {
    name: "Virtue Worldwide",
    svg: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto md:h-10" aria-label="Virtue Worldwide">
        <text x="100" y="32" textAnchor="middle" className="fill-foreground" style={{ fontFamily: "sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Virtue
        </text>
        <text x="100" y="48" textAnchor="middle" className="fill-muted-foreground" style={{ fontFamily: "sans-serif", fontSize: 10, letterSpacing: "0.18em" }}>
          WORLDWIDE
        </text>
      </svg>
    ),
  },
  {
    name: "Mix Interiors",
    svg: (
      <svg viewBox="0 0 200 60" className="h-9 w-auto md:h-11" aria-label="Mix Interiors">
        <text x="100" y="38" textAnchor="middle" className="fill-foreground" style={{ fontFamily: "serif", fontSize: 28, fontWeight: 600, letterSpacing: "-0.03em" }}>
          Mix Interiors
        </text>
      </svg>
    ),
  },
  {
    name: "Academion",
    svg: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto md:h-10" aria-label="Academion">
        <text x="100" y="38" textAnchor="middle" className="fill-foreground" style={{ fontFamily: "serif", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em" }}>
          Academion
        </text>
      </svg>
    ),
  },
];

export function TrustedBy() {
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="border-y border-border py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-8">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <div className="flex items-center gap-4">
                <span aria-hidden className="inline-block h-5 w-5 bg-accent" />
                <p className="font-mono-label uppercase tracking-wider text-foreground">Our clients</p>
              </div>
              <h2
                className="font-display mt-8 text-foreground"
                style={{
                  fontSize: "clamp(2.75rem, 5vw, 5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.045em",
                  fontWeight: 500,
                }}
              >
                Trusted by teams building serious digital products.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
              A sample of teams, agencies, and product groups we have helped move from idea to
              working software.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="mt-16 overflow-hidden border-y border-border bg-background md:mt-20">
          <div className="kbpm-marquee-track">
            {marqueeLogos.map((l, index) => (
              <div
                key={`${l.name}-${index}`}
                className="flex h-40 w-[260px] shrink-0 items-center justify-center border-r border-border bg-background p-8 md:h-48 md:w-[340px]"
              >
                {l.svg}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
