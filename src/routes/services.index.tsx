import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { serviceOfferings } from "@/components/site/service-offerings";
import { serviceListsByPhase } from "@/components/site/service-lists";
import { getServiceDetailByPlainName } from "@/components/site/service-details";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "All services — kbell + postman" },
      {
        name: "description",
        content:
          "All kbell + postman services across Validate, Build, Evolve, and Support.",
      },
      { property: "og:title", content: "All services — kbell + postman" },
      {
        property: "og:description",
        content: "Work with us from start to finish — or bring us in for exactly what you need.",
      },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-8">
            <Reveal className="md:col-span-8">
              <p className="eyebrow">§ Services</p>
              <h1
                className="font-display mt-5 max-w-5xl text-foreground"
                style={{
                  fontSize: "clamp(3rem, 7vw, 7rem)",
                  lineHeight: 0.9,
                  fontWeight: 500,
                }}
              >
                All services.
              </h1>
            </Reveal>
            <Reveal delay={80} className="md:col-span-4">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Work with us from start to finish — or bring us in for exactly
                what you need.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] space-y-16 px-6 py-16 md:space-y-24 md:px-8 md:py-24">
          {serviceOfferings.map((group, groupIndex) => (
            <Reveal key={group.slug} delay={groupIndex * 40}>
              <div id={group.slug} className="scroll-mt-28">
                <div className="mb-5 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                      0{group.order} / {group.name}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{group.goal}</p>
                  </div>
                  <Link
                    to="/services/$slug"
                    params={{ slug: group.slug }}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    Open {group.name}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                      aria-hidden
                    />
                  </Link>
                </div>

                <ul className="divide-y divide-border border border-border">
                  {serviceListsByPhase[group.slug].all.map((name) => {
                    const offer = getServiceDetailByPlainName(name);
                    return (
                      <li key={name}>
                        {offer ? (
                          <Link
                            to="/services/offer/$slug"
                            params={{ slug: offer.slug }}
                            className="group flex items-center justify-between gap-6 px-5 py-5 transition-colors hover:bg-surface-alt md:px-6 md:py-6"
                          >
                            <span className="text-base font-medium text-foreground md:text-lg">
                              {name}
                            </span>
                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border transition-colors group-hover:bg-background">
                              <ArrowRight
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                strokeWidth={1.7}
                                aria-hidden
                              />
                            </span>
                          </Link>
                        ) : (
                          <Link
                            to="/services/$slug"
                            params={{ slug: group.slug }}
                            className="group flex items-center justify-between gap-6 px-5 py-5 transition-colors hover:bg-surface-alt md:px-6 md:py-6"
                          >
                            <span className="text-base font-medium text-foreground md:text-lg">
                              {name}
                            </span>
                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border transition-colors group-hover:bg-background">
                              <ArrowRight
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                strokeWidth={1.7}
                                aria-hidden
                              />
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-16 grid grid-cols-1 gap-4 md:mt-24 md:grid-cols-2">
            <Link
              to="/go-to-market"
              className="group flex flex-col justify-between gap-6 border border-border p-6 transition-colors hover:bg-surface-alt md:p-8"
            >
              <div>
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  Related
                </p>
                <h2 className="mt-4 text-2xl font-medium text-foreground md:text-3xl">
                  Go-to-Market
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Harden vibecoded apps for launch — scan, fix, and ship with
                  confidence.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 text-sm font-medium text-foreground">
                Read more
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                  aria-hidden
                />
              </span>
            </Link>
            <Link
              to="/european-first-infrastructure"
              className="group flex flex-col justify-between gap-6 border border-border p-6 transition-colors hover:bg-surface-alt md:p-8"
            >
              <div>
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  Related
                </p>
                <h2 className="mt-4 text-2xl font-medium text-foreground md:text-3xl">
                  European-first infrastructure
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Hosting, data residency, migration and a practical EU product
                  stack.
                </p>
              </div>
              <span className="inline-flex items-center gap-3 text-sm font-medium text-foreground">
                Read more
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                  aria-hidden
                />
              </span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
