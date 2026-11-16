"use client";

import { Link } from "@/components/Link";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { FinalCta } from "@/components/site/FinalCta";
import {
  CASE_IMAGES,
  MoreWork,
  workCardsFromSlugs,
} from "@/components/site/MoreWork";
import {
  filters,
  getPortfolioCases,
  type Filter,
  type CaseStudy,
} from "@/components/site/cases-data";
import {
  formatPlaygroundDate,
  getPlaygroundPosts,
} from "@/components/site/playground-data";
import { localizePlaygroundPost } from "@/i18n/localize";

type ServiceFilter = "all" | CaseStudy["serviceSlug"];
type SortMode = "date" | "name";

const SERVICE_OPTIONS: ServiceFilter[] = [
  "all",
  "validate",
  "build",
  "evolve",
  "support",
];

const INSIGHT_DOTS = ["#006ff7", "#c9ff6e", "#ff6b9d", "#ffb020"] as const;

/** Figma 10617:16757 — labeled select fields */
const selectClassName =
  "work-filter-select h-12 w-full appearance-none border border-[#d9d9d9] bg-white bg-[length:16px_16px] bg-[right_1rem_center] bg-no-repeat px-4 pr-10 font-mono text-[14px] uppercase tracking-[-0.03em] text-[#1e1e1e] outline-none transition-colors hover:border-[#1e1e1e]/40 focus:border-[#1e1e1e]";

const selectChevron =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%231e1e1e' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

/**
 * Cases overview — Figma 10617:3175.
 */
export function WorkPage() {
  const t = useTranslations("Work");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const [service, setService] = useState<ServiceFilter>("all");
  const [type, setType] = useState<Filter | "All">("All");
  const [sort, setSort] = useState<SortMode>("date");

  const portfolio = getPortfolioCases();
  const availableTypes = filters.filter(
    (f) => f === "All" || portfolio.some((c) => c.tags.includes(f)),
  );

  const visible = useMemo(() => {
    const filtered = portfolio.filter((c) => {
      if (service !== "all" && c.serviceSlug !== service) return false;
      if (type !== "All" && !c.tags.includes(type)) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "name") {
        return a.client.localeCompare(b.client);
      }
      return Number(b.year) - Number(a.year);
    });
  }, [portfolio, service, type, sort]);

  const cards = workCardsFromSlugs(visible.map((c) => c.slug)).map((card) => ({
    ...card,
    image: CASE_IMAGES[card.slug] ?? card.image,
  }));

  const insights = getPlaygroundPosts()
    .slice(0, 4)
    .map((post) => localizePlaygroundPost(post, locale));

  return (
    <div className="kbpm-hi-fi min-h-screen bg-white text-[#1e1e1e]">
      <section className="px-5 pb-0 pt-10 sm:px-6 md:px-10 lg:px-20 lg:pt-14">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-12 lg:gap-14">
          <Reveal>
            <div className="flex max-w-[52rem] flex-col gap-6 md:gap-8">
              <div className="flex flex-col gap-4 md:gap-5">
                <SectionEyebrow label={t("eyebrow")} mark={5} />
                <h1
                  className="font-display text-[#1e1e1e]"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 6rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    fontWeight: 500,
                  }}
                >
                  {t("headline")}
                </h1>
              </div>
              <p className="max-w-xl text-[16px] leading-[1.3] tracking-[-0.01em] text-[#6b6b6b] md:text-[18px]">
                {t("intro")}
              </p>
            </div>
          </Reveal>

          {/* Filters — Figma 10617:16757 */}
          <Reveal delay={60}>
            <div className="flex w-full max-w-[1280px] flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
              <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
                <label className="flex min-w-0 flex-1 flex-col gap-2 sm:w-[200px] sm:flex-none lg:w-[220px]">
                  <span className="font-mono text-[12px] uppercase tracking-[0.05em] text-[#6b6b6b]">
                    {t("filterService")}
                  </span>
                  <select
                    value={service}
                    onChange={(e) =>
                      setService(e.target.value as ServiceFilter)
                    }
                    className={selectClassName}
                    style={{ backgroundImage: selectChevron }}
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {t(`services.${opt}`)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex min-w-0 flex-1 flex-col gap-2 sm:w-[200px] sm:flex-none lg:w-[220px]">
                  <span className="font-mono text-[12px] uppercase tracking-[0.05em] text-[#6b6b6b]">
                    {t("filterType")}
                  </span>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as Filter | "All")}
                    className={selectClassName}
                    style={{ backgroundImage: selectChevron }}
                  >
                    {availableTypes.map((f) => (
                      <option key={f} value={f}>
                        {t(`filters.${f}`)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex w-full flex-col gap-2 sm:w-[200px] lg:w-[220px]">
                <span className="font-mono text-[12px] uppercase tracking-[0.05em] text-[#6b6b6b] sm:text-right">
                  {t("filterSort")}
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortMode)}
                  className={selectClassName}
                  style={{ backgroundImage: selectChevron }}
                >
                  <option value="date">{t("sortDate")}</option>
                  <option value="name">{t("sortName")}</option>
                </select>
              </label>
            </div>
          </Reveal>
        </div>
      </section>

      {cards.length > 0 ? (
        <MoreWork
          hideHeader
          showAllLink={false}
          cards={cards}
          bg="bg-white"
          ctaLabel={tc("readMore")}
        />
      ) : (
        <section className="px-5 py-16 sm:px-6 md:px-10 lg:px-20">
          <p className="mx-auto max-w-[1440px] text-[16px] text-[#6b6b6b]">
            {t("empty")}
          </p>
        </section>
      )}

      {insights.length > 0 ? (
        <section className="border-t border-[#e8e8e8] bg-white px-5 py-12 sm:px-6 md:px-10 md:py-16 lg:px-20 lg:py-[80px]">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:gap-10">
            <Reveal>
              <h2
                className="font-display text-[#1e1e1e]"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                {t("insightsHeadline")}
              </h2>
            </Reveal>

            <ul className="flex flex-col">
              {insights.map((post, i) => (
                <li key={post.slug}>
                  <Reveal delay={i * 40}>
                    <Link
                      to="/playground/$slug"
                      params={{ slug: post.slug }}
                      className="group flex items-center gap-4 border-b border-[#e8e8e8] py-5 transition-opacity hover:opacity-70 md:gap-6 md:py-6"
                    >
                      <span
                        className="size-3 shrink-0 rounded-sm md:size-3.5"
                        style={{
                          backgroundColor:
                            INSIGHT_DOTS[i % INSIGHT_DOTS.length],
                        }}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-[18px] font-medium leading-[1.25] tracking-[-0.02em] text-[#1e1e1e] md:text-[22px]">
                          {post.title}
                        </p>
                        <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.05em] text-[#6b6b6b]">
                          {formatPlaygroundDate(post.date, locale)}
                          {post.tags[0] ? ` · ${post.tags[0]}` : ""}
                        </p>
                      </div>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#d9d9d9] transition-colors group-hover:border-[#1e1e1e] md:size-11">
                        <img
                          src="/hero/arrow-outward-dark.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="size-4"
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <FinalCta headline={t("ctaHeadline")} />
    </div>
  );
}
