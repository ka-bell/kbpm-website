"use client";

import { Link } from "@/components/Link";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import {
  CASE_IMAGES,
  MoreWork,
  workCardsFromSlugs,
} from "@/components/site/MoreWork";
import { filters, getPortfolioCases, type Filter } from "@/components/site/cases-data";

/**
 * Work overview — homepage Recent work language (Figma 3626:4494), finished cases only.
 */
export function WorkPage() {
  const [active, setActive] = useState<Filter>("All");
  const portfolio = getPortfolioCases();
  const availableFilters = filters.filter(
    (f) => f === "All" || portfolio.some((c) => c.tags.includes(f)),
  );

  const visible = portfolio.filter(
    (c) => active === "All" || c.tags.includes(active),
  );

  const cards = workCardsFromSlugs(visible.map((c) => c.slug)).map((card) => ({
    ...card,
    image: CASE_IMAGES[card.slug] ?? card.image,
  }));

  return (
    <div className="kbpm-hi-fi min-h-screen bg-[#f5f5f5] text-[#1e1e1e]">
      <section className="px-6 pb-0 pt-8 md:px-10 lg:px-20 lg:pt-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 lg:gap-14">
          <Reveal>
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#6b6b6b] py-3 pl-3 pr-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-70"
            >
              <img
                src="/hero/arrow-outward-dark.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 rotate-180"
              />
              Home
            </Link>
          </Reveal>

          {/* Header — same composition as Recent work screenshot */}
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex max-w-[720px] flex-col gap-8">
                <SectionEyebrow label="Work" mark={5} />
                <h1
                  className="font-display text-[#1e1e1e]"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    fontWeight: 500,
                  }}
                >
                  A few things we’ve built.
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                {availableFilters.map((f) => {
                  const isActive = f === active;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActive(f)}
                      className={`rounded-full px-4 py-2.5 font-mono text-[13px] uppercase tracking-[-0.02em] transition-colors ${
                        isActive
                          ? "bg-[#1e1e1e] text-white"
                          : "border border-[#d9d9d9] bg-white text-[#1e1e1e] hover:border-[#1e1e1e]/40"
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Card grid — MoreWork cards, header owned above */}
      {cards.length > 0 ? (
        <MoreWork
          hideHeader
          showAllLink={false}
          cards={cards}
          bg="bg-[#f5f5f5]"
          ctaLabel="View case"
        />
      ) : (
        <section className="px-6 py-20 md:px-10 lg:px-20">
          <p className="mx-auto max-w-[1440px] text-[16px] text-[#6b6b6b]">
            No projects in this filter.
          </p>
        </section>
      )}

      <section className="border-t border-[#e8e8e8] bg-white px-6 py-16 md:px-10 md:py-20 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
              <div className="max-w-[40rem]">
                <SectionEyebrow label="Next" mark={7} />
                <h2
                  className="mt-8 font-display font-medium tracking-[-0.03em] text-[#1e1e1e]"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4rem)",
                    lineHeight: 1.1,
                  }}
                >
                  See something you like? Let’s talk about yours.
                </h2>
              </div>
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#c9ff6e] px-6 py-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-90"
              >
                Start a project
                <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-[#1e1e1e]">
                  <img
                    src="/hero/arrow-outward.svg"
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
      </section>
    </div>
  );
}
