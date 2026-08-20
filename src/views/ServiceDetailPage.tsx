"use client";

import { Link } from "@/components/Link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import {
  MoreWork,
  workCardsFromSlugs,
} from "@/components/site/MoreWork";
import type { ServiceGroup } from "@/components/site/service-offerings";
import { getServicePanelCopy } from "@/components/site/service-lists";
import { getServiceDetailByPlainName } from "@/components/site/service-details";

/** Viewport-heights of scroll track per offer (sticky scrub). */
const OFFER_SCROLL_VH = 0.72;

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
  const offerTrackRef = useRef<HTMLDivElement>(null);
  const ignoreScrollSync = useRef(false);

  useEffect(() => {
    setActiveCapability(service.capabilities[0]);
  }, [service.slug, service.capabilities]);

  const syncOfferFromScroll = useCallback(() => {
    if (ignoreScrollSync.current) return;
    const track = offerTrackRef.current;
    const caps = service.capabilities;
    if (!track || caps.length < 2) return;

    const rect = track.getBoundingClientRect();
    const scrollable = track.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    // 0 when track top hits viewport top; 1 when track bottom hits viewport bottom
    const raw = -rect.top / scrollable;
    const progress = Math.min(1, Math.max(0, raw));
    const index = Math.min(
      caps.length - 1,
      Math.floor(progress * caps.length),
    );
    const next = caps[index];
    setActiveCapability((current) => (current === next ? current : next));
  }, [service.capabilities]);

  useEffect(() => {
    syncOfferFromScroll();
    window.addEventListener("scroll", syncOfferFromScroll, { passive: true });
    window.addEventListener("resize", syncOfferFromScroll);
    return () => {
      window.removeEventListener("scroll", syncOfferFromScroll);
      window.removeEventListener("resize", syncOfferFromScroll);
    };
  }, [syncOfferFromScroll, service.slug]);

  const selectCapability = (cap: string) => {
    const caps = service.capabilities;
    const track = offerTrackRef.current;
    const index = caps.indexOf(cap);
    if (index < 0) return;

    setActiveCapability(cap);

    if (!track || caps.length < 2) return;

    const scrollable = track.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    // Center of each segment so scroll lands clearly on that pill
    const progress = (index + 0.5) / caps.length;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const target = trackTop + progress * scrollable;

    ignoreScrollSync.current = true;
    window.scrollTo({ top: target, behavior: "smooth" });
    window.setTimeout(() => {
      ignoreScrollSync.current = false;
      syncOfferFromScroll();
    }, 700);
  };

  const featuredCards = workCardsFromSlugs(service.cases);

  const activeIndex = Math.max(
    0,
    service.capabilities.indexOf(activeCapability),
  );
  const activeOffer = getServiceDetailByPlainName(activeCapability);
  const offerImage = `/services/${service.slug}-graphic.png`;
  const total = service.capabilities.length;
  const offerTrackStyle =
    total > 1
      ? { height: `${Math.max(total, 2) * OFFER_SCROLL_VH * 100}vh` }
      : undefined;

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

      {/* What we offer — Figma 3626:5169 (scroll-scrubbed pills) */}
      <section className="kbpm-hi-fi bg-[#f5f5f5] px-6 pt-16 md:px-10 md:pt-20 lg:px-20 lg:pt-[80px]">
        <div className="mx-auto max-w-[1440px]">
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

          <div
            ref={offerTrackRef}
            className="relative mt-12 lg:mt-16"
            style={offerTrackStyle}
          >
            {/* Stick high; pills + card fill the viewport so nothing clips */}
            <div className="sticky top-3 flex h-[calc(100dvh-0.75rem)] flex-col gap-5 md:top-4 md:gap-6 lg:gap-8">
              <div
                className="flex shrink-0 flex-wrap gap-2"
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
                      onClick={() => selectCapability(cap)}
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

              <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[27px] lg:flex-row">
                <div className="flex min-h-0 flex-1 flex-col justify-between gap-6 overflow-y-auto bg-white p-6 sm:gap-8 sm:p-8 md:p-10 lg:p-12">
                  <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
                    <p className="font-mono text-[14px] uppercase tracking-[0.05em] text-[#1e1e1e]">
                      Selected / {pad(activeIndex + 1)} of {pad(total)}
                    </p>
                    <h3
                      className="font-display text-[#1e1e1e]"
                      style={{
                        fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.02em",
                        fontWeight: 500,
                      }}
                    >
                      {activeCapability}
                    </h3>
                    <p className="max-w-md text-[15px] leading-[1.3] tracking-[-0.01em] text-[#6b6b6b] sm:text-[16px]">
                      {getServicePanelCopy(activeCapability, service.name)}
                    </p>
                  </div>

                  {activeOffer ? (
                    <Link
                      to="/services/offer/$slug"
                      params={{ slug: activeOffer.slug }}
                      className="inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
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
                      className="inline-flex w-fit shrink-0 items-center gap-2.5 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
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

                <div className="relative min-h-0 flex-[0.9] lg:flex-1">
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
            </div>
          </div>
        </div>
      </section>

      {/* Featured engagement — same MoreWork as homepage; 2-up = Figma 3626:5219 */}
      {featuredCards.length > 0 ? (
        <MoreWork
          eyebrow="Featured engagement"
          eyebrowMark={3}
          title={null}
          showAllLink={false}
          cards={featuredCards}
          bg="bg-white"
          metaMode="metric"
          ctaLabel="Read more"
        />
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
