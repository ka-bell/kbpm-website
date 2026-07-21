import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { serviceOfferings } from "@/components/site/service-offerings";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — kbell + postman" },
      {
        name: "description",
        content:
          "Validate, Build, Evolve, Support — the product lifecycle moments where clients engage kbell + postman.",
      },
      { property: "og:title", content: "Services — kbell + postman" },
      {
        property: "og:description",
        content: "One lifecycle. Four moments to engage.",
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
                One product lifecycle.
              </h1>
            </Reveal>
            <Reveal delay={80} className="md:col-span-4">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                These are not packages. They are the typical moments clients engage KB+PM —
                from first idea through long-term support.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
            <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
              Lifecycle
            </p>
            <p className="hidden text-sm text-muted-foreground md:block">
              Validate → Build → Evolve → Support
            </p>
          </div>

          <div className="grid grid-cols-1 overflow-hidden border border-border md:grid-cols-2">
            {serviceOfferings.map((phase, index) => (
              <Reveal key={phase.slug} delay={index * 70}>
                <Link
                  to="/services/$slug"
                  params={{ slug: phase.slug }}
                  className={`group flex min-h-[420px] flex-col bg-background p-7 transition-colors hover:bg-surface-alt md:p-8 ${
                    index % 2 === 0 ? "md:border-r" : ""
                  } ${index < serviceOfferings.length - 2 ? "border-b" : ""} border-border`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono-label text-muted-foreground">0{phase.order}</p>
                    <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                      Phase
                    </p>
                  </div>
                  <h2 className="mt-10 text-3xl font-medium leading-none text-foreground">
                    {phase.name}
                  </h2>
                  <p className="mt-4 text-lg leading-snug text-foreground">{phase.goal}</p>
                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{phase.when}</p>
                  <ul className="mt-8 space-y-1">
                    {phase.capabilities.slice(0, 5).map((cap) => (
                      <li key={cap} className="text-sm text-foreground">
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto border-t border-border pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-muted-foreground">{phase.outcome}</p>
                      <span className="inline-flex h-12 w-12 items-center justify-center border border-border transition-colors group-hover:bg-background">
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.7}
                          aria-hidden
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
