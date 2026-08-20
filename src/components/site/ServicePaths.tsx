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
  }
> = {
  validate: {
    card: "bg-[#006ff7]",
    title: "text-white",
    body: "text-white",
    graphicSrc: "/services/validate-graphic.png",
    graphicAlt: "Validate",
  },
  build: {
    card: "bg-white",
    title: "text-[#1e1e1e]",
    body: "text-[#1e1e1e]",
    graphicSrc: "/services/build-graphic.png",
    graphicAlt: "Build",
  },
  evolve: {
    card: "bg-[#c7b0fe]",
    title: "text-[#1e1e1e]",
    body: "text-[#1e1e1e]",
    graphicSrc: "/services/evolve-graphic.png",
    graphicAlt: "Evolve",
  },
  support: {
    card: "bg-[#1e1e1e]",
    title: "text-white",
    body: "text-white",
    graphicSrc: "/services/support-graphic.png",
    graphicAlt: "Support",
  },
};

export function ServicePaths() {
  return (
    <section className="kbpm-hi-fi bg-[#f5f5f5] pt-16 pb-0 md:pt-20 lg:pt-[80px]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
        <Reveal>
          <div className="flex max-w-[720px] flex-col gap-8">
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
        </Reveal>
      </div>

      {/* Full-bleed sticky stack — same pattern as Qare Modules */}
      <div className="mt-12 w-full px-4 sm:mt-16 sm:px-6 lg:mt-[4.5rem] lg:px-8">
        <div className="services-stack">
          {serviceOfferings.map((group, index) => {
            const style = CARD_STYLE[group.slug];
            const tags = serviceListsByPhase[group.slug].widget;

            return (
              <article
                key={group.slug}
                className={`services-stack__card flex flex-col gap-8 p-7 sm:p-9 lg:flex-row lg:items-center lg:gap-12 lg:p-14 ${style.card}`}
                style={
                  {
                    zIndex: index + 1,
                    ["--stack-i"]: index,
                  } as CSSProperties
                }
              >
                <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between gap-10 self-stretch lg:gap-16">
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

                <div className="relative mx-auto aspect-square w-full max-w-[280px] shrink-0 self-center overflow-hidden sm:max-w-[320px] lg:mx-0 lg:size-[24rem] lg:max-w-none">
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

      <div className="mx-auto max-w-[1440px] px-6 py-10 md:hidden md:px-10">
        <Link
          to="/services"
          className="font-mono inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.6px] text-[#1e1e1e]"
        >
          All services
          <img
            src="/hero/arrow-outward-dark.svg"
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
        </Link>
      </div>
    </section>
  );
}
