"use client";

import { Link } from "@/components/Link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { getCase } from "@/components/site/cases-data";
import type { ServiceGroup } from "@/components/site/service-offerings";
import { getServicePanelCopy } from "@/components/site/service-lists";
import { getServiceDetailByPlainName } from "@/components/site/service-details";

const CASE_IMAGES: Record<string, string> = {
  "mix-interiors": "/work/card-mix.jpg",
  "virtue-worldwide": "/work/card-virtue.jpg",
  hopplay: "/work/card-hopplay.jpg",
  spilnews: "/work/spilnews-featured.jpg",
  academion: "/services/support-graphic.png",
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Service group page — Figma 3626:5145 template.
 * Copy from rewrite (serviceOfferings / lists / cases-data).
 */
export function ServiceDetailPage({ service }: { service: ServiceGroup }) {
  const [activeCapability, setActiveCapability] = useState(
    service.capabilities[0],
  );

  useEffect(() => {
    setActiveCapability(service.capabilities[0]);
  }, [service.slug, service.capabilities]);

  const relatedCases = service.cases
    .map((slug) => getCase(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 2);

  const activeIndex = Math.max(
    0,
    service.capabilities.indexOf(activeCapability),
  );
  const activeOffer = getServiceDetailByPlainName(activeCapability);
  const offerImage = `/services/${service.slug}-graphic.png`;
  const total = service.capabilities.length;

  return (
    <>
      {/* Dark hero — Figma 3626:5147 (pulls under floating header) */}
      <section className="kbpm-hi-fi relative -mt-[4.5rem] bg-[#1e1e1e] px-6 pb-16 pt-[5.5rem] sm:-mt-[5.5rem] sm:pb-20 sm:pt-[6.5rem] md:px-10 lg:-mt-[6.5rem] lg:px-20 lg:pb-[80px] lg:pt-[8.5rem]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-12 lg:gap-14">
          <Reveal>
            <Link
              to="/services"
              className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#006ff7] py-3 pl-3 pr-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
            >
              <img
                src="/hero/arrow-outward-light.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 rotate-180"
              />
              All services
            </Link>
          </Reveal>

          <div className="flex flex-col items-stretch justify-between gap-10 lg:flex-row lg:items-end lg:gap-16">
            <Reveal className="min-w-0 flex-1">
              <div className="flex max-w-[44rem] flex-col gap-6 md:gap-8">
                <div className="flex flex-col gap-6">
                  <p className="font-mono text-[14px] uppercase leading-[16.5px] tracking-[0.05em] text-white">
                    Services / {service.name}
                  </p>
                  <h1
                    className="font-display text-white"
                    style={{
                      fontSize: "clamp(3.5rem, 8vw, 6rem)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      fontWeight: 500,
                    }}
                  >
                    {service.name}
                  </h1>
                </div>
                <p
                  className="max-w-xl text-white"
                  style={{
                    fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)",
                    lineHeight: 1.25,
                    fontWeight: 400,
                  }}
                >
                  {service.goal}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80} className="w-full shrink-0 lg:w-[406px]">
              <div className="flex h-full flex-col gap-8 rounded-[28px] bg-[#c9ff6e] p-8">
                <div className="flex flex-col gap-4">
                  <p className="font-mono text-[12px] uppercase leading-[1.1] tracking-[-0.03em] text-[#1e1e1e]/75">
                    When this fits
                  </p>
                  <p className="text-[16px] font-medium leading-[1.2] tracking-[-0.01em] text-[#1e1e1e]">
                    {service.when}
                  </p>
                </div>

                <div className="h-px w-full bg-[#1e1e1e]/20" />

                <div className="flex flex-col gap-4">
                  <p className="font-mono text-[12px] uppercase leading-[1.1] tracking-[-0.03em] text-[#1e1e1e]/75">
                    What you leave with
                  </p>
                  <p className="text-[16px] font-medium leading-[1.2] tracking-[-0.01em] text-[#1e1e1e]">
                    {service.outcome}
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="mt-auto inline-flex w-full items-center justify-between gap-3 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
                >
                  Start a project
                  <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-white">
                    <img
                      src="/hero/arrow-outward-dark.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="size-4"
                    />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we offer — Figma 3626:5169 */}
      <section className="kbpm-hi-fi bg-[#f5f5f5] px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex max-w-[45rem] flex-col gap-8">
                <SectionEyebrow label="Services" mark={2} />
                <h2
                  className="font-display text-[#1e1e1e]"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    fontWeight: 500,
                  }}
                >
                  What we offer.
                </h2>
              </div>
              <p className="max-w-md text-[18px] leading-[1.2] tracking-[-0.02em] text-[#6b6b6b] md:text-[20px] lg:max-w-[26rem]">
                {service.panelIntro}
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal delay={40}>
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label={`${service.name} services`}
              >
                {service.capabilities.map((cap, i) => {
                  const active = cap === activeCapability;
                  return (
                    <button
                      key={cap}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCapability(cap)}
                      className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-mono uppercase leading-[1.35] transition-colors ${
                        active
                          ? "bg-[#1e1e1e] text-white"
                          : "border border-[#1e1e1e]/20 text-[#1e1e1e] hover:border-[#1e1e1e]/40"
                      }`}
                    >
                      <span className="text-[12px] tracking-[-0.03em]">
                        {pad(i + 1)}
                      </span>
                      <span className="text-[14px] tracking-[0.05em]">
                        {cap}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex min-h-[28rem] flex-col overflow-hidden rounded-[27px] lg:min-h-[37.5rem] lg:flex-row">
                <div className="flex flex-1 flex-col justify-between gap-10 bg-white p-8 md:p-12 lg:p-14">
                  <div className="flex flex-col gap-8">
                    <p className="font-mono text-[14px] uppercase tracking-[0.05em] text-[#1e1e1e]">
                      Selected / {pad(activeIndex + 1)} of {pad(total)}
                    </p>
                    <h3
                      className="font-display text-[#1e1e1e]"
                      style={{
                        fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        fontWeight: 500,
                      }}
                    >
                      {activeCapability}
                    </h3>
                    <p className="max-w-md text-[16px] leading-[1.3] tracking-[-0.01em] text-[#6b6b6b]">
                      {getServicePanelCopy(activeCapability, service.name)}
                    </p>
                  </div>

                  {activeOffer ? (
                    <Link
                      to="/services/offer/$slug"
                      params={{ slug: activeOffer.slug }}
                      className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
                    >
                      View {activeOffer.name}
                      <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-white">
                        <img
                          src="/hero/arrow-outward-dark.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="size-4"
                        />
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to="/contact"
                      className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
                    >
                      Start a project
                      <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-white">
                        <img
                          src="/hero/arrow-outward-dark.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="size-4"
                        />
                      </span>
                    </Link>
                  )}
                </div>

                <div className="relative min-h-[16rem] flex-1 lg:min-h-0">
                  <img
                    key={activeCapability}
                    src={offerImage}
                    alt=""
                    width={800}
                    height={1000}
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured engagement — Figma 3626:5219 */}
      {relatedCases.length > 0 ? (
        <section className="kbpm-hi-fi bg-white px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:gap-10">
            <Reveal>
              <SectionEyebrow label="Featured engagement" mark={3} />
            </Reveal>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[21px]">
              {relatedCases.map((caseStudy, i) => {
                if (!caseStudy) return null;
                const industry =
                  caseStudy.industry.split("/")[0]?.trim() ??
                  caseStudy.industry;
                const image =
                  CASE_IMAGES[caseStudy.slug] ?? offerImage;
                const kindTone = i % 2 === 0 ? "lime" : "blue";
                const kindClass =
                  kindTone === "blue"
                    ? "bg-[#006ff7] text-white"
                    : "bg-[#c9ff6e] text-[#1e1e1e]";

                return (
                  <Reveal key={caseStudy.slug} delay={i * 70}>
                    <Link
                      to="/work/$slug"
                      params={{ slug: caseStudy.slug }}
                      className="group flex h-full flex-col gap-5"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:h-[540px] sm:aspect-auto">
                        <img
                          src={image}
                          alt=""
                          width={800}
                          height={1000}
                          decoding="async"
                          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                          <span className="bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase text-white backdrop-blur-[25px]">
                            {caseStudy.displayTags[0] ?? caseStudy.tags[0]}
                          </span>
                          <span className="bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase text-white backdrop-blur-[25px]">
                            {industry}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-6">
                        <div className="flex flex-col gap-3.5">
                          <div className="flex items-center gap-3.5">
                            <span
                              className={`inline-flex w-fit items-center px-2 py-2 font-mono text-[10px] uppercase leading-[1.1] ${kindClass}`}
                            >
                              Case study
                            </span>
                            <span className="text-[14px] tracking-[-0.05em] text-[#6b6b6b]">
                              {caseStudy.metric} · {caseStudy.metricLabel}
                            </span>
                          </div>
                          <h3
                            className="font-display text-[#1e1e1e]"
                            style={{
                              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                              lineHeight: 1.1,
                              letterSpacing: "-0.03em",
                              fontWeight: 500,
                            }}
                          >
                            {caseStudy.client}
                          </h3>
                        </div>

                        <p className="text-[16px] leading-[1.3] tracking-[-0.02em] text-[#6b6b6b]">
                          {caseStudy.outcome}
                        </p>

                        <div className="mt-auto flex flex-col gap-3.5">
                          <div className="h-px w-full bg-[#d9d9d9]" />
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[12px] tracking-[-0.01em] text-[#6b6b6b]">
                              {caseStudy.year}
                            </span>
                            <span className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.6px] text-[#6b6b6b] transition-opacity group-hover:opacity-70">
                              Read more
                              <img
                                src="/hero/arrow-outward-dark.svg"
                                alt=""
                                width={20}
                                height={20}
                                className="size-5 opacity-60"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Related sales pages — build / support only */}
      {service.slug === "support" || service.slug === "build" ? (
        <section className="kbpm-hi-fi border-t border-[#e8e8e8] bg-white px-6 py-12 md:px-10 md:py-16 lg:px-20">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <div
                className={`grid grid-cols-1 gap-4 ${
                  service.slug === "build" ? "md:grid-cols-2" : ""
                }`}
              >
                {service.slug === "build" ? (
                  <Link
                    to="/go-to-market"
                    className="group flex flex-col justify-between gap-6 rounded-2xl border border-[#e8e8e8] p-6 transition-colors hover:bg-[#f5f5f5] md:p-8"
                  >
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6b6b6b]">
                        Related
                      </p>
                      <h2 className="mt-4 font-display text-2xl font-medium tracking-[-0.03em] text-[#1e1e1e]">
                        Go-to-Market
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b]">
                        Vibecoded app looks ready? We harden it for real users —
                        scan, fix, and ship.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-[#1e1e1e]">
                      Read more
                      <img
                        src="/hero/arrow-outward-dark.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                ) : null}
                <Link
                  to="/european-first-infrastructure"
                  className="group flex flex-col justify-between gap-6 rounded-2xl border border-[#e8e8e8] p-6 transition-colors hover:bg-[#f5f5f5] md:p-8"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6b6b6b]">
                      Related
                    </p>
                    <h2 className="mt-4 font-display text-2xl font-medium tracking-[-0.03em] text-[#1e1e1e]">
                      European-first infrastructure
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b]">
                      Where the product runs matters — data residency, providers,
                      migration and a practical EU stack.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-[#1e1e1e]">
                    Read more
                    <img
                      src="/hero/arrow-outward-dark.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}
    </>
  );
}
