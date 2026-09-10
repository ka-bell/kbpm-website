"use client";

import type { CSSProperties } from "react";
import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { serviceOfferings, type ServiceSlug } from "./service-offerings";
import { serviceListsByPhase } from "./service-lists";
import { getServiceDetailByPlainName } from "./service-details";

const CARD_STYLE: Record<
  ServiceSlug,
  {
    card: string;
    title: string;
    body: string;
    graphicSrc: string;
    graphicAlt: string;
    /** Small brand mark tile for mobile Figma 3674:2706 */
    markSrc: string;
  }
> = {
  validate: {
    card: "bg-[#006ff7]",
    title: "text-white",
    body: "text-white",
    graphicSrc: "/services/validate-graphic.png",
    graphicAlt: "Validate",
    markSrc: "/hero/tile-2.png",
  },
  build: {
    card: "bg-white",
    title: "text-[#1e1e1e]",
    body: "text-[#1e1e1e]",
    graphicSrc: "/services/build-graphic.png",
    graphicAlt: "Build",
    markSrc: "/hero/tile-3.png",
  },
  evolve: {
    card: "bg-[#c7b0fe]",
    title: "text-[#1e1e1e]",
    body: "text-[#1e1e1e]",
    graphicSrc: "/services/evolve-graphic.png",
    graphicAlt: "Evolve",
    markSrc: "/hero/tile-5.png",
  },
  support: {
    card: "bg-[#1e1e1e]",
    title: "text-white",
    body: "text-white",
    graphicSrc: "/services/support-graphic.png",
    graphicAlt: "Support",
    markSrc: "/hero/tile-6.png",
  },
};

/**
 * Services section — mobile Figma 3674:2706; sticky stack on md+.
 */
export function ServicePaths() {
  return (
    <section className="kbpm-hi-fi bg-[#f5f5f5] pt-10 pb-0 md:pt-20 lg:pt-[80px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-20">
        <Reveal>
          <div className="flex max-w-[720px] flex-col gap-4 md:gap-8">
            {/* Mobile header */}
            <div className="flex flex-col gap-4 md:hidden">
              <SectionEyebrow label="Collaborate" mark={4} />
              <h2
                className="font-display text-[#1e1e1e]"
                style={{
                  fontSize: "2.5rem",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                Validate. Build.
                <br />
                Evolve. Support.
              </h2>
              <p className="text-[16px] leading-[1.3] tracking-[-0.01em] text-[#666]">
                Our service tiers guide you from early strategy through design and
                development execution, all the way to ongoing growth. Each step is
                built around proven practices, cross-functional teams, and the
                flexibility to meet you exactly where you are in your product
                journey.
              </p>
            </div>

            {/* Desktop header */}
            <div className="hidden flex-col gap-8 md:flex">
              <SectionEyebrow label="Services" mark={4} />
              <h2
                className="font-display text-[#1e1e1e]"
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                Validate. Build. Evolve. Support.
              </h2>
              <p className="text-[18px] leading-[1.2] tracking-[-0.02em] text-[#6b6b6b] md:text-[20px]">
                Work with us from start to finish — or bring us in for exactly what
                you need.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-6 w-full max-w-[1440px] px-5 pb-10 sm:mt-16 md:mt-12 md:px-10 md:pb-8 lg:mt-[4.5rem] lg:px-20">
        <div className="services-stack">
          {serviceOfferings.map((group, index) => {
            const style = CARD_STYLE[group.slug];
            const tags = serviceListsByPhase[group.slug].widget;

            return (
              <article
                key={group.slug}
                className={`services-stack__card flex flex-col p-6 md:gap-8 md:p-9 lg:flex-row lg:items-center lg:gap-12 lg:p-14 ${style.card}`}
                style={
                  {
                    zIndex: index + 1,
                    ["--stack-i"]: index,
                  } as CSSProperties
                }
              >
                {/* Mobile — Figma 3674:2706: mark + title / arrow, then body + tags */}
                <div className="flex flex-col gap-[120px] md:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-col gap-4">
                      <img
                        src={style.markSrc}
                        alt=""
                        width={47}
                        height={47}
                        decoding="async"
                        className="size-[47px] shrink-0 object-cover"
                        aria-hidden
                      />
                      <h3
                        className={`font-display ${style.title}`}
                        style={{
                          fontSize: "2.5rem",
                          lineHeight: 1.2,
                          letterSpacing: "-0.02em",
                          fontWeight: 500,
                        }}
                      >
                        {group.name}
                      </h3>
                    </div>
                    <Link
                      to="/services/$slug"
                      params={{ slug: group.slug }}
                      className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-[#dee3e7] bg-white p-4 transition-opacity hover:opacity-80"
                      aria-label={`View ${group.name} services`}
                    >
                      <img
                        src="/hero/arrow-outward-dark.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="size-5"
                      />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-6">
                    <p
                      className={`text-[16px] leading-[1.3] tracking-[-0.01em] ${style.body}`}
                    >
                      {group.when}
                    </p>
                    <ul className="flex flex-wrap content-start gap-2">
                      {tags.map((name) => {
                        const offer = getServiceDetailByPlainName(name);
                        const chip = (
                          <span className="inline-flex h-8 items-center bg-[#c9ff6e] px-3 text-[14px] leading-[21px] tracking-[-0.02em] text-[#1e1e1e]">
                            {name}
                          </span>
                        );
                        return (
                          <li key={name}>
                            {offer ? (
                              <Link
                                to="/services/offer/$slug"
                                params={{ slug: offer.slug }}
                                className="transition-opacity hover:opacity-80"
                              >
                                {chip}
                              </Link>
                            ) : (
                              <Link
                                to="/services/$slug"
                                params={{ slug: group.slug }}
                                className="transition-opacity hover:opacity-80"
                              >
                                {chip}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Desktop — horizontal sticky card with large graphic */}
                <div className="hidden min-h-0 min-w-0 flex-1 flex-col justify-between gap-10 self-stretch md:flex lg:gap-16">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={`font-display min-w-0 pr-4 ${style.title}`}
                      style={{
                        fontSize: "clamp(2.25rem, 4.5vw, 4rem)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        fontWeight: 500,
                      }}
                    >
                      {group.name}
                    </h3>
                    <Link
                      to="/services/$slug"
                      params={{ slug: group.slug }}
                      className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-[#dee3e7] bg-white p-4 transition-opacity hover:opacity-80"
                      aria-label={`View ${group.name} services`}
                    >
                      <img
                        src="/hero/arrow-outward-dark.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="size-5"
                      />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-5 sm:flex-row sm:gap-8">
                    <p
                      className={`flex-1 text-[15px] leading-[1.3] tracking-[-0.01em] md:text-base ${style.body}`}
                    >
                      {group.when}
                    </p>
                    <ul className="flex flex-1 flex-wrap content-start gap-2">
                      {tags.map((name) => {
                        const offer = getServiceDetailByPlainName(name);
                        const chip = (
                          <span className="inline-flex h-8 items-center bg-[#c9ff6e] px-5 text-[14px] leading-[21px] tracking-[-0.02em] text-[#1e1e1e]">
                            {name}
                          </span>
                        );
                        return (
                          <li key={name}>
                            {offer ? (
                              <Link
                                to="/services/offer/$slug"
                                params={{ slug: offer.slug }}
                                className="transition-opacity hover:opacity-80"
                              >
                                {chip}
                              </Link>
                            ) : (
                              <Link
                                to="/services/$slug"
                                params={{ slug: group.slug }}
                                className="transition-opacity hover:opacity-80"
                              >
                                {chip}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="relative mx-auto hidden aspect-square w-full max-w-[280px] shrink-0 self-center overflow-hidden sm:max-w-[320px] md:block lg:mx-0 lg:size-[24rem] lg:max-w-none">
                  <img
                    src={style.graphicSrc}
                    alt={style.graphicAlt}
                    width={384}
                    height={384}
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
