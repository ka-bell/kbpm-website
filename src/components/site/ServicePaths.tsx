import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { serviceOfferings } from "./service-offerings";
import { serviceListsByPhase } from "./service-lists";

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
              Work with us from start to finish — or bring us in for exactly what you need.
            </p>
          </div>
          <div className="hidden md:col-span-4 md:flex md:justify-end">
            <Link
              to="/services"
              className="font-mono-label inline-flex items-center gap-3 uppercase tracking-wider text-foreground"
            >
              All services
              <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 11 11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:overflow-hidden lg:border lg:border-border">
          {serviceOfferings.map((phase, i) => (
            <Reveal key={phase.slug} delay={i * 60}>
              <div
                className={`flex flex-col border border-border bg-background p-6 md:p-8 lg:border-0 ${
                  i < serviceOfferings.length - 1 ? "lg:border-r lg:border-border" : ""
                }`}
              >
                <Link to="/services/$slug" params={{ slug: phase.slug }} className="group">
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    0{phase.order} / {phase.name}
                  </p>
                </Link>
                <ul className="mt-8 flex flex-1 flex-col">
                  {serviceListsByPhase[phase.slug].widget.map((name) => (
                    <li key={name} className="border-t border-border first:border-t-0">
                      <Link
                        to="/services/$slug"
                        params={{ slug: phase.slug }}
                        className="group flex items-center justify-between gap-3 py-3.5 text-sm text-foreground transition-colors hover:text-accent"
                      >
                        <span>{name}</span>
                        <svg
                          className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M3 11 11 3M11 3H5M11 3v6"
                            stroke="currentColor"
                            strokeWidth="1.4"
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
