import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Reveal } from "@/components/site/Reveal";
import { cases } from "@/components/site/cases-data";
import {
  getServiceOffering,
  legacyServiceRedirects,
} from "@/components/site/service-offerings";
import { getServicePanelCopy } from "@/components/site/service-lists";
import { getServiceDetailByPlainName } from "@/components/site/service-details";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    if (params.slug === "eu-first-infrastructure") {
      throw redirect({ to: "/european-first-infrastructure" });
    }
    if (params.slug === "go-to-market") {
      throw redirect({ to: "/go-to-market" });
    }
    const legacy = legacyServiceRedirects[params.slug];
    if (legacy) {
      throw redirect({ to: "/services/$slug", params: { slug: legacy } });
    }
    const service = getServiceOffering(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    return {
      meta: [
        {
          title: service ? `${service.name} — kbell + postman` : "Service — kbell + postman",
        },
        {
          name: "description",
          content: service?.when ?? "Services from kbell + postman.",
        },
        {
          property: "og:title",
          content: service ? `${service.name} — kbell + postman` : "Service",
        },
        { property: "og:description", content: service?.goal ?? "" },
      ],
      links: service ? [{ rel: "canonical", href: `/services/${service.slug}` }] : [],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const [activeCapability, setActiveCapability] = useState(service.capabilities[0]);
  useEffect(() => {
    setActiveCapability(service.capabilities[0]);
  }, [service.slug, service.capabilities]);
  const relatedCases = cases.filter((c) => service.cases.includes(c.slug));
  const activeOffer = getServiceDetailByPlainName(activeCapability);

  return (
    <>
      {/* Phase identity + when + goal */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              strokeWidth={1.7}
              aria-hidden
            />
            All services
          </Link>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-8">
              <p className="eyebrow">
                SERVICES / {service.name.toUpperCase()}
              </p>
              <h1
                className="font-display mt-5 max-w-5xl text-foreground"
                style={{
                  fontSize: "clamp(3rem, 7vw, 7rem)",
                  lineHeight: 0.9,
                  fontWeight: 500,
                }}
              >
                {service.name}
              </h1>
              <p className="mt-8 max-w-3xl text-2xl leading-tight text-foreground md:text-3xl">
                {service.goal}
              </p>
            </Reveal>

            <Reveal delay={80} className="md:col-span-4">
              <div className="border border-border bg-surface-alt p-6">
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  When this fits
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground">{service.when}</p>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    What you leave with
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{service.outcome}</p>
                </div>
                <Link
                  to="/contact"
                  className="group mt-8 inline-flex w-full items-center justify-between gap-3 bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
                >
                  Start a project
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                    aria-hidden
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services in this group */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-4">
              <p className="eyebrow">Services</p>
              <h2
                className="font-display mt-5 max-w-lg text-foreground"
                style={{
                  fontSize: "clamp(2.25rem, 4.4vw, 4.5rem)",
                  lineHeight: 0.95,
                  fontWeight: 500,
                }}
              >
                What we offer.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {service.panelIntro}
              </p>
            </Reveal>
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
                <div className="bg-background">
                  {service.capabilities.map((cap) => (
                    <button
                      key={cap}
                      type="button"
                      onClick={() => setActiveCapability(cap)}
                      className={`flex w-full items-center justify-between border-b border-border px-5 py-4 text-left text-sm transition-colors last:border-b-0 ${
                        activeCapability === cap
                          ? "bg-foreground text-background"
                          : "bg-background text-foreground hover:bg-surface-alt"
                      }`}
                    >
                      {cap}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-60" strokeWidth={1.7} />
                    </button>
                  ))}
                </div>
                <div className="flex min-h-[280px] flex-col bg-surface-alt p-6">
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    Selected
                  </p>
                  <h3 className="mt-4 text-2xl font-medium text-foreground">{activeCapability}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {getServicePanelCopy(activeCapability, service.name)}
                  </p>
                  <div className="mt-auto pt-8">
                    <div className="aspect-[16/10] overflow-hidden border border-border bg-background">
                      <ImagePlaceholder
                        key={activeCapability}
                        label={`${activeCapability} visual`}
                      />
                    </div>
                    {activeOffer ? (
                      <Link
                        to="/services/offer/$slug"
                        params={{ slug: activeOffer.slug }}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4"
                      >
                        View {activeOffer.name}
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden />
                      </Link>
                    ) : (
                      <Link
                        to="/contact"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4"
                      >
                        Start a project
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {service.slug === "support" || service.slug === "build" ? (
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-8 md:py-16">
            <Reveal>
              <div
                className={`grid grid-cols-1 gap-4 ${
                  service.slug === "build" ? "md:grid-cols-2" : ""
                }`}
              >
                {service.slug === "build" ? (
                  <Link
                    to="/go-to-market"
                    className="group flex flex-col justify-between gap-6 border border-border p-6 transition-colors hover:bg-surface-alt md:p-8"
                  >
                    <div>
                      <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                        Related
                      </p>
                      <h2 className="mt-4 text-2xl font-medium text-foreground">
                        Go-to-Market
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Vibecoded app looks ready? We harden it for real users —
                        scan, fix, and ship.
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
                ) : null}
                <Link
                  to="/european-first-infrastructure"
                  className="group flex flex-col justify-between gap-6 border border-border p-6 transition-colors hover:bg-surface-alt md:p-8"
                >
                  <div>
                    <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                      Related
                    </p>
                    <h2 className="mt-4 text-2xl font-medium text-foreground">
                      European-first infrastructure
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Where the product runs matters — data residency, providers,
                      migration and a practical EU stack.
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
          </div>
        </section>
      ) : null}

      {/* Related projects */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Related projects</p>
              <h2
                className="font-display mt-5 text-foreground"
                style={{
                  fontSize: "clamp(2.25rem, 4.4vw, 4.5rem)",
                  lineHeight: 0.95,
                  fontWeight: 500,
                }}
              >
                Work from this group.
              </h2>
            </div>
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 text-sm font-medium text-foreground"
            >
              See all work
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.7}
                aria-hidden
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {relatedCases.map((caseStudy, index) => (
              <Reveal key={caseStudy.slug} delay={index * 80}>
                <Link
                  to="/work/$slug"
                  params={{ slug: caseStudy.slug }}
                  className="group grid min-h-[360px] border border-border bg-background transition-colors hover:bg-surface-alt md:grid-cols-2"
                >
                  <div className="min-h-[220px] border-b border-border bg-surface-alt md:border-b-0 md:border-r">
                    <ImagePlaceholder label="Case image" />
                  </div>
                  <div className="flex flex-col p-6">
                    <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                      Case {caseStudy.n} / {caseStudy.client}
                    </p>
                    <h3 className="mt-6 text-2xl font-medium leading-tight text-foreground">
                      {caseStudy.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {caseStudy.outcome}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
                      <span className="font-mono-label uppercase tracking-wider text-muted-foreground">
                        {caseStudy.metric} / {caseStudy.metricLabel}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.7}
                        aria-hidden
                      />
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
