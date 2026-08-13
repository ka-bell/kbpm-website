"use client";

import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";
import { serviceOfferings, type ServiceSlug } from "./service-offerings";
import { serviceListsByPhase } from "./service-lists";
import { getServiceDetailByPlainName } from "./service-details";

const CARD_STYLE: Record<
  ServiceSlug,
  {
    card: string;
    title: string;
    body: string;
    arrow: string;
    graphicBg: string;
    graphicSrc: string;
    graphicAlt: string;
  }
> = {
  validate: {
    card: "bg-[#006ff7]",
    title: "text-white",
    body: "text-white",
    arrow: "/hero/arrow-outward-blue.svg",
    graphicBg: "bg-[#c9ff6e]",
    graphicSrc: "/hero/tile-2.png",
    graphicAlt: "Validate",
  },
  build: {
    card: "bg-white",
    title: "text-[#1e1e1e]",
    body: "text-[#222]",
    arrow: "/hero/arrow-outward-dark.svg",
    graphicBg: "bg-[#006ff7]",
    graphicSrc: "/hero/tile-3.png",
    graphicAlt: "Build",
  },
  evolve: {
    card: "bg-[#c7b0fe]",
    title: "text-[#1e1e1e]",
    body: "text-[#222]",
    arrow: "/hero/arrow-outward-dark.svg",
    graphicBg: "bg-[#ff1c77]",
    graphicSrc: "/hero/tile-5.png",
    graphicAlt: "Evolve",
  },
  support: {
    card: "bg-[#1e1e1e]",
    title: "text-white",
    body: "text-white",
    arrow: "/hero/arrow-outward-dark.svg",
    graphicBg: "bg-[#c7b0fe]",
    graphicSrc: "/hero/tile-6.png",
    graphicAlt: "Support",
  },
};

function PlusMark() {
  return (
    <span className="relative inline-block size-8 shrink-0" aria-hidden>
      <span className="absolute left-[11px] top-0 h-8 w-2.5 bg-[#006ff7]" />
      <span className="absolute left-0 top-[11px] h-2.5 w-8 bg-[#006ff7]" />
    </span>
  );
}

export function ServicePaths() {
  return (
    <section className="kbpm-hi-fi bg-[#f5f5f5] py-16 md:py-20 lg:py-[80px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-6 md:gap-[72px] md:px-10 lg:px-20">
        <Reveal>
          <div className="flex max-w-[720px] flex-col gap-8">
            <div className="flex items-center gap-4">
              <PlusMark />
              <p className="font-mono text-[14px] uppercase leading-[1.1] tracking-[0.7px] text-[#1e1e1e]">
                Services
              </p>
            </div>
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
            <p className="text-[18px] leading-[1.2] tracking-[-0.02em] text-[#838383] md:text-[20px]">
              Work with us from start to finish — or bring us in for exactly what
              you need.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8 md:gap-10 lg:gap-[48px]">
          {serviceOfferings.map((group, i) => {
            const style = CARD_STYLE[group.slug];
            const tags = serviceListsByPhase[group.slug].widget;

            return (
              <Reveal key={group.slug} delay={i * 60}>
                <article
                  className={`flex flex-col gap-8 p-6 sm:p-8 md:flex-row md:items-center md:gap-12 md:p-14 ${style.card}`}
                  style={{ borderRadius: "32px 32px 0 0" }}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-10 md:gap-16">
                    <div className="flex items-start justify-between gap-4">
                      <h3
                        className={`font-display ${style.title}`}
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
                        className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#dee3e7] bg-white p-4 transition-opacity hover:opacity-80"
                        aria-label={`View ${group.name} services`}
                      >
                        <img
                          src={style.arrow}
                          alt=""
                          width={20}
                          height={20}
                          className="size-5"
                        />
                      </Link>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                      <p
                        className={`max-w-md text-[15px] leading-[1.3] tracking-[-0.01em] md:text-base ${style.body}`}
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

                  <div
                    className={`relative mx-auto aspect-square w-full max-w-[280px] shrink-0 overflow-hidden sm:max-w-[320px] md:mx-0 md:max-w-[384px] ${style.graphicBg}`}
                  >
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
              </Reveal>
            );
          })}
        </div>

        <div className="md:hidden">
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
      </div>
    </section>
  );
}
