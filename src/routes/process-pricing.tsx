import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PricingBlueprint, PACKAGES, type PackageId } from "@/components/site/PricingBlueprint";
import { ProcessFaq } from "@/components/site/ProcessFaq";
import { Reveal } from "@/components/site/Reveal";
import { getServiceSlugByPackage } from "@/components/site/service-offerings";

export const Route = createFileRoute("/process-pricing")({
  head: () => ({
    meta: [
      { title: "Process & Pricing — kbell + postman" },
      {
        name: "description",
        content:
          "How we work and what it costs. Three packages — Draft™, Make™, Keep™ — with transparent ranges and no scope creep.",
      },
      { property: "og:title", content: "Process & Pricing — kbell + postman" },
      {
        property: "og:description",
        content: "Three packages, one flat fee each, transparent process.",
      },
      { property: "og:url", content: "/process-pricing" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/process-pricing" }],
  }),
  component: ProcessPricing,
});

const INCLUSIONS: Record<PackageId, string[]> = {
  proof: [
    "Kickoff call with both partners",
    "Assumption mapping and idea validation",
    "Clickable concept prototype",
    "A clear go / no-go recommendation",
  ],
  prototype: [
    "Full UX and design (flows, components, visual system)",
    "Frontend and backend development",
    "CMS setup and content integration",
    "Launch and handover",
    "30 days post-launch support",
  ],
  product: [
    "Dedicated engineering time each month",
    "Product thinking and roadmap input",
    "Performance monitoring and fixes",
    "Feature development as needed",
    "Direct access to both partners",
  ],
  gtm: [
    "Tech audit of the current build",
    "Production hardening (auth, rate limits, error tracking)",
    "Deploy to a live domain with analytics",
    "SEO, Core Web Vitals, and observability setup",
    "Launch support",
  ],
  infra: [
    "Architecture plan with regions and data flow",
    "Sovereign EU cloud setup, keys you own",
    "Data residency and auth configuration",
    "GDPR, DPA, and sub-processor documentation",
    "Ongoing monitoring and incident response",
  ],
};

const CORE_PACKAGE_IDS: PackageId[] = ["proof", "prototype", "product"];
const SPECIALIST_PACKAGE_IDS: PackageId[] = ["gtm", "infra"];

function ProcessPricing() {
  const [selected, setSelected] = useState<PackageId>("prototype");

  const corePackages = PACKAGES.filter((p) => CORE_PACKAGE_IDS.includes(p.id));
  const specialistPackages = PACKAGES.filter((p) => SPECIALIST_PACKAGE_IDS.includes(p.id));

  return (
    <>
      {/* Interactive blueprint */}
      <PricingBlueprint selected={selected} onSelect={setSelected} />

      {/* Offering cards */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
          <div className="mb-12 md:mb-16">
            <p className="eyebrow">§ What's included</p>
            <h2
              className="font-display mt-5 max-w-3xl text-foreground"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 4.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 500,
              }}
            >
              Three core ways to work with us.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Most projects start by proving the idea, building the first usable version, or
              extending a product that already exists. Specialist support sits underneath when
              the product needs launch hardening or EU-first infrastructure.
            </p>
          </div>

          <div>
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
              <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                Core paths
              </p>
              <p className="hidden text-sm text-muted-foreground md:block">
                Prove → build → grow
              </p>
            </div>
            <div className="grid grid-cols-1 overflow-hidden border border-border md:grid-cols-3">
              {corePackages.map((p, i) => (
                <Reveal key={p.id} delay={i * 80} className="h-full">
                  <article
                    className={`flex h-full min-h-[560px] flex-col p-7 transition-colors md:p-8 ${
                      selected === p.id ? "bg-surface-alt ring-1 ring-inset ring-foreground/20" : "bg-background"
                    } ${i < corePackages.length - 1 ? "border-b border-border md:border-b-0 md:border-r" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-label text-muted-foreground">0{i + 1}</span>
                      <span className="font-mono-label uppercase tracking-wider text-muted-foreground">
                        {p.timeline}
                      </span>
                    </div>
                    <h3
                      className="font-display mt-10 text-foreground"
                      style={{ fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)", letterSpacing: "-0.03em", fontWeight: 500 }}
                    >
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm italic text-muted-foreground">
                      {p.positioning}
                    </p>

                    <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-foreground">
                      {INCLUSIONS[p.id].map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center border border-foreground/30 text-foreground">
                            <Check className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 border-t border-border pt-6">
                      <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                        From
                      </p>
                      <p
                        className="font-display mt-1 text-foreground"
                        style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.03em", fontWeight: 500 }}
                      >
                        €{p.price}
                        <span className="ml-1 text-lg text-muted-foreground">{p.priceUnit}</span>
                      </p>
                    </div>

                    <div className="mt-6 flex-1">
                      <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                        Who it's for
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {p.who}
                      </p>
                    </div>

                    <Link
                      to="/services/$slug"
                      params={{ slug: getServiceSlugByPackage(p.id) }}
                      className="group mt-8 inline-flex items-center justify-between gap-3 border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
                    >
                      View details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={260}>
            <div className="mt-12 border-t border-border pt-8 md:mt-14">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-start md:gap-8">
                <div className="md:col-span-3">
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    Specialist support
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Useful when the product needs production hardening, compliance, or a more
                    deliberate infrastructure layer.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:col-span-9 md:grid-cols-2">
                  {specialistPackages.map((p, i) => (
                    <article
                      key={p.id}
                      className={`flex h-full flex-col border border-border p-5 transition-colors md:p-6 ${
                        selected === p.id ? "bg-surface-alt ring-1 ring-inset ring-foreground/20" : "bg-background"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                            0{i + 4} / {p.timeline}
                          </p>
                          <h3 className="mt-4 text-xl font-medium text-foreground">{p.name}</h3>
                        </div>
                        <p className="font-mono-label shrink-0 uppercase tracking-wider text-muted-foreground">
                          From €{p.price}{p.priceUnit}
                        </p>
                      </div>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {p.positioning} {p.who}
                      </p>
                      <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-foreground">
                        {INCLUSIONS[p.id].slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center border border-foreground/30 text-foreground">
                              <Check className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/services/$slug"
                        params={{ slug: getServiceSlugByPackage(p.id) }}
                        className="group mt-6 inline-flex items-center justify-between gap-3 border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
                      >
                        View details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} aria-hidden />
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <ProcessFaq />

      {/* CTA */}
      <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-foreground p-8 md:rounded-[40px] md:p-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-8">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <p className="font-mono-label uppercase tracking-wider text-background/70">
                    § Say hello
                  </p>
                </div>
                <h2
                  className="font-display mt-8 text-background"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.045em",
                    fontWeight: 500,
                  }}
                >
                  Ready to <span className="text-accent">talk?</span>
                </h2>
                <p className="mt-6 max-w-lg text-base text-background/70">
                  We respond within one business day.
                </p>
              </div>
              <div className="flex flex-col justify-end gap-3 md:col-span-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-between gap-4 rounded-full bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-px"
                >
                  Start a project
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                  </svg>
                </Link>
                <a
                  href="mailto:hello@kbpm.nl"
                  className="group inline-flex items-center justify-between gap-4 rounded-full border border-background/30 px-6 py-4 text-sm font-medium text-background transition-colors hover:border-background hover:bg-background/5"
                >
                  Email us directly
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
