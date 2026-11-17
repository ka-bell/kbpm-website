"use client";

import { Link } from "@/components/Link";
import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { FinalCta } from "@/components/site/FinalCta";
import { SectionEyebrow, type BrandMark } from "@/components/site/SectionEyebrow";
import {
  serviceOfferings,
  type ServiceSlug,
} from "@/components/site/service-offerings";
import {
  getServicePanelCopy,
  serviceListsByPhase,
} from "@/components/site/service-lists";
import { getServiceDetailByPlainName } from "@/components/site/service-details";

const GROUP_VISUAL: Record<
  ServiceSlug,
  { mark: BrandMark; image: string }
> = {
  validate: { mark: 4, image: "/services/index-validate.jpg" },
  build: { mark: 3, image: "/services/index-build.jpg" },
  evolve: { mark: 5, image: "/services/index-evolve.jpg" },
  support: { mark: 6, image: "/services/index-support.jpg" },
};

/** Desktop card rows — Figma 3802:5159. */
const CARD_ROWS: Record<ServiceSlug, number[]> = {
  validate: [3, 3],
  build: [2, 4, 4],
  evolve: [3, 4],
  support: [3, 3],
};

const ROW_COLS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/** Validate order on this page follows the design; shared lists stay unchanged. */
const VALIDATE_ORDER = [
  "Website & Product Audit",
  "Idea Validation",
  "Technical Feasibility Review",
  "Discovery Workshop",
  "Product Roadmap",
  "Innovation Sprint",
] as const;

function offersFor(slug: ServiceSlug) {
  const offers = [...serviceListsByPhase[slug].all];
  if (slug !== "validate") return offers;
  const rank = new Map(VALIDATE_ORDER.map((name, i) => [name, i]));
  return offers.sort((a, b) => (rank.get(a) ?? 99) - (rank.get(b) ?? 99));
}

/** Cards fade up one after another as they enter the viewport. */
function CardCascade({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = [
      ...root.querySelectorAll<HTMLElement>("[data-card-reveal]"),
    ];
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    let chain = 0;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort(
            (a, b) =>
              Number(a.dataset.cardReveal) - Number(b.dataset.cardReveal),
          );
        for (const card of visible) {
          const now = performance.now();
          const at = Math.max(now, chain);
          chain = at + 240;
          window.setTimeout(() => card.classList.add("is-visible"), at - now);
          io.unobserve(card);
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );
    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {children}
    </div>
  );
}

function chunkBy<T>(items: T[], sizes: number[]) {
  const rows: T[][] = [];
  let index = 0;
  for (const size of sizes) {
    const row = items.slice(index, index + size);
    if (row.length) rows.push(row);
    index += size;
  }
  if (index < items.length) rows.push(items.slice(index));
  return rows;
}

/**
 * Services overview — Figma 3802:5159 (Service Detail | Desktop Medium).
 */
export function ServicesIndexPage() {
  const t = useTranslations("Services");

  return (
    <>
      <section
        data-services-hero
        className="kbpm-hi-fi relative -mt-[68px] bg-[#1e1e1e] px-5 pb-10 pt-[calc(68px+2.5rem)] sm:px-6 sm:pb-16 md:px-10 md:pt-[calc(68px+4rem)] lg:-mt-20 lg:px-20 lg:pb-20 lg:pt-[calc(5rem+5rem)]"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
          <SectionEyebrow label={t("indexEyebrow")} ink="light" />
          <h1 className="font-display text-[3.5rem] font-medium leading-[1.2] tracking-[-0.02em] text-white lg:text-[6rem] lg:tracking-normal">
            {t("indexHeadline")}
          </h1>
        </div>
      </section>

      <section className="kbpm-hi-fi bg-white px-5 py-10 md:px-10 md:py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col">
          {serviceOfferings.map((group, groupIndex) => {
            const visual = GROUP_VISUAL[group.slug];
            const offers = offersFor(group.slug);
            const rows = chunkBy(offers, CARD_ROWS[group.slug]);

            let cardIndex = 0;

            return (
              <div
                key={group.slug}
                id={group.slug}
                className={`scroll-mt-28 flex flex-col gap-8 lg:gap-14 ${
                  groupIndex > 0
                    ? "mt-8 border-t border-[#e6e6e6] pt-8 lg:mt-14 lg:pt-14"
                    : ""
                }`}
              >
                  <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,611fr)_minmax(0,599fr)] lg:items-stretch lg:gap-10">
                    <div className="flex min-w-0 flex-col gap-4 lg:min-h-[465px] lg:justify-between lg:gap-8">
                      <div className="flex flex-col gap-4 lg:gap-8">
                        <SectionEyebrow
                          label={t(`groups.${group.slug}.eyebrow`)}
                          mark={visual.mark}
                        />
                        <div className="flex flex-col gap-4 lg:gap-8">
                          <h2 className="font-display text-[2.5rem] font-medium leading-[1.2] tracking-[-0.02em] text-[#1e1e1e] lg:text-[3.5rem]">
                            {group.name}
                          </h2>
                          <p className="text-[16px] leading-[1.3] tracking-[-0.01em] text-[#666] lg:text-[20px]">
                            {t(`groups.${group.slug}.body`)}
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/services/$slug"
                        params={{ slug: group.slug }}
                        className="inline-flex w-full max-w-[267px] items-center justify-between gap-4 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
                      >
                        {t("explore", { name: group.name })}
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

                    <div className="relative h-[270px] w-full overflow-hidden rounded-[16px] lg:h-[465px] lg:rounded-[24px]">
                      <img
                        src={visual.image}
                        alt=""
                        width={599}
                        height={465}
                        decoding="async"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <p className="text-[18px] leading-[1.3] tracking-[-0.01em] text-[#666] lg:text-[20px]">
                      {t(`groups.${group.slug}.listIntro`)}
                    </p>
                    <CardCascade>
                      {rows.map((row) => (
                        <ul
                          key={row[0]}
                          className={`grid grid-cols-1 gap-4 ${ROW_COLS[row.length] ?? "lg:grid-cols-3"}`}
                        >
                          {row.map((name) => {
                            const offer = getServiceDetailByPlainName(name);
                            const copy = getServicePanelCopy(name, group.name);
                            const index = cardIndex++;
                            const card = (
                              <div className="flex h-full flex-col gap-6 border border-[#ccc] bg-white/80 p-6 backdrop-blur-[11px] lg:min-h-[180px] lg:justify-between">
                                <h3 className="font-display text-[20px] font-medium leading-[1.3] tracking-[-0.01em] text-[#1e1e1e]">
                                  {name}
                                </h3>
                                <p className="text-[16px] leading-[1.3] tracking-[-0.01em] text-[#666]">
                                  {copy}
                                </p>
                              </div>
                            );

                            return (
                              <li
                                key={name}
                                data-card-reveal={index}
                                className="kbpm-reveal h-full"
                              >
                                {offer ? (
                                  <Link
                                    to="/services/offer/$slug"
                                    params={{ slug: offer.slug }}
                                    className="block h-full transition-opacity hover:opacity-80"
                                  >
                                    {card}
                                  </Link>
                                ) : (
                                  <Link
                                    to="/services/$slug"
                                    params={{ slug: group.slug }}
                                    className="block h-full transition-opacity hover:opacity-80"
                                  >
                                    {card}
                                  </Link>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      ))}
                    </CardCascade>
                  </div>
                </div>
            );
          })}
        </div>
      </section>

      <FinalCta
        headline={t("ctaHeadline")}
        className="px-10 py-10 md:px-10 md:py-16 lg:px-20 lg:py-20"
        contentClassName="gap-10 md:gap-12"
      />
    </>
  );
}
