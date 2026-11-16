"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

/** Why cards — Figma 3674:619–628 */
const CARDS = [
  {
    title: "No hiring. No\nmanagement.",
    body: "You get a full technical team on day one — product, design, engineering. No recruiters, no ramp-up, no dead weight.",
    card: "bg-[#006ff7] text-white",
    bodyClass: "text-white",
  },
  {
    title: "One partner, end to end.",
    body: "A senior-led studio that can take on work that outgrows a standard delivery team — with specialists when the brief needs them.",
    card: "bg-[#1e1e1e] text-white",
    bodyClass: "text-white",
  },
  {
    title: "Ship bigger ideas.",
    body: "A senior-led studio that can take on work that outgrows a standard delivery team — with specialists when the brief needs them.",
    card: "bg-[#c9ff6e] text-[#1e1e1e]",
    bodyClass: "text-[#1e1e1e]",
  },
] as const;

/**
 * Visual + text highlights — Figma 3674:615.
 * Side-by-side from xl so the 856∶412 ratio keeps card copy readable.
 */
export function WhyKbpm() {
  const t = useTranslations("WhyKbpm");

  return (
    /* Figma 3674:615 — frame 1440 / 80px inset → 1280 content */
    <section className="kbpm-hi-fi bg-white py-16 md:py-20 lg:py-[80px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 md:gap-12 md:px-10 lg:gap-[56px] lg:px-20">
        <Reveal>
          <div className="flex max-w-[45rem] flex-col gap-4 md:gap-8">
            <SectionEyebrow label={t("eyebrow")} mark={4} />
            <h2
              className="font-display text-[#1e1e1e]"
              style={{
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              {t("headline")}
            </h2>
          </div>
        </Reveal>

        {/*
          Figma 3674:617 — image ∶ cards ≈ 856∶412, gap 12.
          Stack until xl so cards aren’t crushed below ~412px.
        */}
        <div className="flex flex-col gap-3 xl:flex-row xl:items-stretch">
          <Reveal className="w-full min-w-0 xl:flex-[856] xl:basis-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] sm:aspect-[856/747] xl:aspect-auto xl:h-full xl:min-h-[40rem]">
              <img
                src="/highlights/studio.png"
                alt="Studio collaboration — reviewing work together at a desk"
                width={1200}
                height={1500}
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </Reveal>

          <div className="flex min-w-0 w-full flex-col gap-3 xl:flex-[412] xl:basis-0">
            {CARDS.map((card, i) => (
              <Reveal
                key={card.title}
                delay={80 + i * 80}
                className="flex min-h-0 flex-1"
              >
                <article
                  className={`flex h-full min-h-[13.5rem] w-full flex-col justify-between gap-6 rounded-[24px] p-6 sm:p-8 md:min-h-[15rem] ${card.card}`}
                >
                  <h3
                    className="font-display font-medium leading-[1.2] tracking-[-0.02em]"
                    style={{
                      fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                    }}
                  >
                    {card.title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p
                    className={`text-[15px] font-normal leading-[1.3] tracking-[-0.01em] opacity-80 sm:text-[16px] ${card.bodyClass}`}
                  >
                    {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
