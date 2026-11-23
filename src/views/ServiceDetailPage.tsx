"use client";

import { Link } from "@/components/Link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { getCase, type CaseStudy } from "@/components/site/cases-data";
import { FinalCta } from "@/components/site/FinalCta";
import { Tag } from "@/components/site/Tag";
import type {
  ServiceGroup,
  ServiceSlug,
} from "@/components/site/service-offerings";
import {
  getServicePanelCopy,
  getServicePanelTags,
} from "@/components/site/service-lists";
import { getServiceDetailByPlainName } from "@/components/site/service-details";

/** Viewport-heights of scroll track per offer (sticky scrub). */
const OFFER_SCROLL_VH = 0.72;

/** Panel art rotates as you scrub offers — starts on this group’s graphic. */
const OFFER_PANEL_GRAPHICS: ServiceSlug[] = [
  "validate",
  "build",
  "evolve",
  "support",
];

const FEATURED_SLUGS = ["blink", "spilnews"] as const;

function stillImage(item: CaseStudy) {
  const video = /\.(mp4|webm|mov)(\?|$)/i;
  if (item.heroImage && !video.test(item.heroImage)) return item.heroImage;
  if (!video.test(item.img)) return item.img;
  return item.heroImage ?? item.img;
}

function FeaturedEngagement() {
  const tc = useTranslations("Common");
  const cards = FEATURED_SLUGS.map((slug) => getCase(slug)).filter(
    (item): item is CaseStudy => Boolean(item),
  );

  return (
    <section className="kbpm-hi-fi bg-white px-5 py-16 sm:px-6 md:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
        <SectionEyebrow label="Featured engagement" mark={6} />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_413px] lg:items-stretch">
          {cards.map((item) => (
            <article key={item.slug} className="flex h-full flex-col gap-5">
              <Link
                to="/work/$slug"
                params={{ slug: item.slug }}
                className="group relative block h-[280px] overflow-hidden rounded-[24px] sm:h-[400px] lg:h-[540px]"
              >
                <img
                  src={stillImage(item)}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute left-5 top-5 flex gap-2">
                  {item.displayTags.slice(0, 2).map((tag) => (
                    <Tag key={tag} variant="frost">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex w-fit items-center bg-[#c9ff6e] px-2 py-2 font-mono text-[10px] uppercase leading-[1.1] text-[#1e1e1e]">
                    case study
                  </span>
                  <h3 className="font-display text-[24px] font-medium leading-[1.2] tracking-[-0.02em] text-[#1e1e1e]">
                    {item.client}
                  </h3>
                </div>
                <p className="text-[16px] leading-[1.3] tracking-[-0.01em] text-[#6b6b6b]">
                  {item.outcome}
                </p>
                <div className="mt-auto flex flex-col gap-3.5">
                  <div className="h-px w-full bg-[#1e1e1e]/15" />
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] leading-[1.3] tracking-[-0.01em] text-[#6b6b6b]">
                      {item.year}
                    </p>
                    <Link
                      to="/work/$slug"
                      params={{ slug: item.slug }}
                      className="inline-flex items-center gap-1 font-mono text-[14px] uppercase leading-[1.1] tracking-[0.03em] text-[#6b6b6b] transition-opacity hover:opacity-70"
                    >
                      {tc("readMore")}
                      <img
                        src="/hero/arrow-outward-dark.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 opacity-70"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Unique panel image per offer index; phase graphics first, then brand tiles. */
function offerPanelSrc(slug: ServiceSlug, index: number, capability: string) {
  if (capability === "Website & Product Audit") {
    return "/services/validate-audit.jpg";
  }
  const start = Math.max(0, OFFER_PANEL_GRAPHICS.indexOf(slug));
  const pool = [
    ...OFFER_PANEL_GRAPHICS.slice(start).map(
      (s) => `/services/${s}-graphic.png`,
    ),
    ...OFFER_PANEL_GRAPHICS.slice(0, start).map(
      (s) => `/services/${s}-graphic.png`,
    ),
    ...[1, 2, 3, 4, 5, 6, 7].map((n) => `/hero/tile-${n}.png`),
  ];
  return pool[index % pool.length];
}

/**
 * Service group page — white hero, offer scrub, homepage cases, final CTA.
 */
export function ServiceDetailPage({ service }: { service: ServiceGroup }) {
  const t = useTranslations("Services");
  const tg = useTranslations(`Services.groups.${service.slug}`);
  const tc = useTranslations("Common");
  const tCta = useTranslations("FinalCta");
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

  const activeIndex = Math.max(
    0,
    service.capabilities.indexOf(activeCapability),
  );
  const activeOffer = getServiceDetailByPlainName(activeCapability);
  const offerImage = offerPanelSrc(service.slug, activeIndex, activeCapability);
  const panelTags = getServicePanelTags(activeCapability);
  const total = service.capabilities.length;
  const offerTrackStyle =
    total > 1
      ? { height: `${Math.max(total, 2) * OFFER_SCROLL_VH * 100}vh` }
      : undefined;

  return (
    <>
      {/* White hero — Figma 10621:18696 desktop / 10621:18614 mobile */}
      <section className="kbpm-hi-fi relative -mt-[4.5rem] bg-white px-5 pb-12 pt-[5.5rem] sm:-mt-[5.5rem] sm:px-6 sm:pb-16 sm:pt-[6.5rem] md:px-10 md:pb-20 lg:-mt-[6.5rem] lg:px-20 lg:pb-[80px] lg:pt-[8.5rem]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-14">
          <Reveal>
            <Link
              to="/services"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[#d9d9d9] text-[#1e1e1e] transition-opacity hover:opacity-70 sm:h-auto sm:w-fit sm:gap-2.5 sm:px-0 sm:py-3 sm:pl-3 sm:pr-6"
              aria-label={tc("allServices")}
            >
              <img
                src="/hero/arrow-outward-dark.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 -rotate-[135deg]"
              />
              <span className="hidden font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] sm:inline">
                {tc("allServices")}
              </span>
            </Link>
          </Reveal>

          <div className="flex flex-col items-stretch justify-between gap-8 sm:gap-10 lg:flex-row lg:items-end lg:gap-16">
            <Reveal className="min-w-0 flex-1">
              <div className="flex max-w-[44rem] flex-col gap-5 sm:gap-6 md:gap-8">
                <div className="flex flex-col gap-4 sm:gap-6">
                  <p className="font-mono text-[12px] uppercase leading-[16.5px] tracking-[0.05em] text-[#6b6b6b] sm:text-[14px] sm:text-[#1e1e1e]">
                    {t("detailBreadcrumb", { name: service.name })}
                  </p>
                  <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-medium leading-[0.95] tracking-[-0.03em] text-[#1e1e1e] lg:text-[96px] lg:leading-[1.2] lg:tracking-normal">
                    {service.name}
                  </h1>
                </div>
                <p className="max-w-xl text-[18px] leading-[1.25] text-[#6b6b6b] lg:text-[20px] lg:leading-[1.3] lg:tracking-[-0.2px] lg:text-[#666]">
                  {tg("goal")}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80} className="w-full shrink-0 lg:w-[406px]">
              <div className="flex h-full flex-col gap-6 rounded-[16px] bg-[#f5f5f5] p-5 sm:gap-8 sm:rounded-[24px] sm:p-8 md:p-8">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <p className="font-mono text-[12px] uppercase leading-[1.1] tracking-[-0.03em] text-[#6b6b6b]">
                    {t("whenFits")}
                  </p>
                  <p className="text-[16px] font-medium leading-[1.2] tracking-[-0.01em] text-[#1e1e1e]">
                    {tg("when")}
                  </p>
                </div>

                <div className="h-px w-full bg-[#1e1e1e]/15" />

                <div className="flex flex-col gap-3 sm:gap-4">
                  <p className="font-mono text-[12px] uppercase leading-[1.1] tracking-[-0.03em] text-[#6b6b6b]">
                    {t("leaveWith")}
                  </p>
                  <p className="text-[16px] font-medium leading-[1.2] tracking-[-0.01em] text-[#1e1e1e]">
                    {tg("outcome")}
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="mt-auto inline-flex w-full items-center justify-between gap-3 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
                >
                  {tc("startProject")}
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

      {/* What we offer — pills stay horizontal (scroll on mobile) */}
      <section
        data-service-offer-dark
        className="kbpm-hi-fi bg-[#1e1e1e] px-5 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 md:px-10 md:pt-20 lg:px-20 lg:pb-[160px] lg:pt-[80px]"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:gap-12">
          <Reveal>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div className="flex max-w-[45rem] flex-col gap-6 lg:gap-8">
                <SectionEyebrow
                  label={t("indexEyebrow")}
                  mark={6}
                  ink="light"
                />
                <h2
                  className="font-display text-white"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    fontWeight: 500,
                  }}
                >
                  {t("whatWeOffer")}
                </h2>
              </div>
              <p className="max-w-md text-[16px] leading-[1.3] tracking-[-0.01em] text-white/70 md:text-[18px] lg:max-w-[435px] lg:pb-1 lg:text-[20px] lg:text-[#f5f5f5]">
                {tg("panelIntro")}
              </p>
            </div>
          </Reveal>

          <div
            ref={offerTrackRef}
            className="relative"
            style={offerTrackStyle}
          >
            <div className="sticky top-[68px] flex h-[calc(100dvh-68px-1rem)] flex-col gap-4 lg:top-20 lg:h-[calc(100dvh-5rem-1.5rem)] lg:gap-6">
              {/* Horizontal row — never wrap/stack */}
              <div
                className="flex w-full shrink-0 flex-nowrap gap-2 overflow-x-auto overscroll-x-contain pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-wrap lg:overflow-visible [&::-webkit-scrollbar]:hidden"
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
                      className={`inline-flex shrink-0 items-center gap-2.5 rounded-full px-5 py-3 font-mono uppercase leading-[1.35] transition-colors sm:px-6 ${
                        active
                          ? "bg-white text-[#1e1e1e]"
                          : "border border-white/25 text-white hover:border-white/50"
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

              <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[16px] md:rounded-[24px] lg:flex-row">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#2a2a2a] sm:aspect-auto sm:min-h-[14rem] sm:flex-[0.85] lg:order-2 lg:aspect-auto lg:h-auto lg:min-h-0 lg:w-1/2 lg:flex-1">
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

                <div className="flex min-h-0 flex-1 flex-col justify-between gap-5 overflow-y-auto bg-white p-5 sm:gap-6 sm:p-8 md:p-10 lg:order-1 lg:w-1/2 lg:p-14">
                  <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
                    <p className="font-mono text-[12px] uppercase tracking-[0.05em] text-[#6b6b6b] sm:text-[14px]">
                      Selected / {pad(activeIndex + 1)} of {pad(total)}
                    </p>
                    <h3 className="font-display text-[clamp(1.5rem,3vw,2.75rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[#1e1e1e] lg:text-[48px] lg:leading-[1.2]">
                      {activeCapability}
                    </h3>
                    <p className="max-w-md text-[15px] leading-[1.3] tracking-[-0.01em] text-[#6b6b6b] sm:text-[16px]">
                      {getServicePanelCopy(activeCapability, service.name)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {panelTags.map((tag) => (
                        <Tag key={tag} variant="blue">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>

                  {activeOffer ? (
                    <Link
                      to="/services/offer/$slug"
                      params={{ slug: activeOffer.slug }}
                      className="inline-flex w-full shrink-0 items-center justify-between gap-2.5 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90 lg:w-fit lg:justify-center"
                    >
                      {activeOffer.name}
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
                      className="inline-flex w-full shrink-0 items-center justify-between gap-2.5 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90 lg:w-fit lg:justify-center"
                    >
                      {tc("startProject")}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedEngagement />

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
                    className="group flex flex-col justify-between gap-6 rounded-[24px] border border-[#e8e8e8] p-6 transition-colors hover:bg-[#f5f5f5] md:p-8"
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
                  className="group flex flex-col justify-between gap-6 rounded-[24px] border border-[#e8e8e8] p-6 transition-colors hover:bg-[#f5f5f5] md:p-8"
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

      {/* Closing CTA — Figma 10631:31700 */}
      <FinalCta headline={tCta("serviceHeadline")} />
    </>
  );
}
