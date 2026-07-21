import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { serviceOfferings } from "./service-offerings";

export function ServicePaths() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="flex items-center gap-4">
              <span aria-hidden className="inline-block h-5 w-5 bg-accent" />
              <p className="font-mono-label uppercase tracking-wider text-foreground">Services</p>
            </div>
            <h2
              className="font-display mt-8 max-w-4xl text-foreground"
              style={{
                fontSize: "clamp(2.75rem, 5.8vw, 5.75rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 500,
              }}
            >
              Validate. Build. Evolve. Support.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Not packages — the typical lifecycle of a digital product, and the moments clients
              engage KB+PM.
            </p>
          </div>
          <div className="hidden md:col-span-4 md:flex md:justify-end">
            <Link
              to="/services"
              className="font-mono-label inline-flex items-center gap-3 uppercase tracking-wider text-foreground"
            >
              Explore the lifecycle
              <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 11 11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 overflow-hidden border border-border md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {serviceOfferings.map((phase, i) => (
            <Reveal key={phase.slug} delay={i * 60}>
              <Link
                to="/services/$slug"
                params={{ slug: phase.slug }}
                className={`group flex min-h-[380px] flex-col bg-background p-8 transition-colors hover:bg-surface-alt md:p-8 ${
                  i < serviceOfferings.length - 1
                    ? "border-b border-border lg:border-b-0 lg:border-r"
                    : ""
                }`}
              >
                <div>
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    0{phase.order} / Lifecycle
                  </p>
                  <h3
                    className="font-display mt-4 text-foreground"
                    style={{
                      fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      fontWeight: 500,
                    }}
                  >
                    {phase.name}
                  </h3>
                  <p className="mt-4 text-base text-muted-foreground">{phase.goal}</p>
                </div>
                <ul className="mt-8 space-y-1.5">
                  {phase.capabilities.slice(0, 4).map((cap) => (
                    <li key={cap} className="text-sm text-foreground">
                      {cap}
                    </li>
                  ))}
                  {phase.capabilities.length > 4 && (
                    <li className="text-sm text-muted-foreground">
                      +{phase.capabilities.length - 4} more
                    </li>
                  )}
                </ul>
                <div className="mt-auto border-t border-border pt-6">
                  <div className="flex items-center justify-between gap-6">
                    <p className="text-sm text-muted-foreground line-clamp-2">{phase.outcome}</p>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-border transition-colors group-hover:bg-background">
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden
                      >
                        <path d="M3 11 11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
