"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

/** Rewrite WhyKbpm copy; Figma 3626:4063 layout + color cards. */
const CARDS = [
  {
    title: "Bring what you have.\nLet’s work on what’s next.",
    body: "An early idea, a detailed brief or a prototype you’ve already built. Whatever your starting point, we’ll take it further together.",
    card: "bg-[#006ff7] text-white",
    bodyClass: "text-white/80",
  },
  {
    title: "You always know who's building it.",
    body: "Karissa and Alex have sat on every side of the table: client, agency and builder. Working with us means no black box, direct and clear communication, no process theatre.",
    card: "bg-[#1e1e1e] text-white",
    bodyClass: "text-white/80",
  },
  {
    title: "Someone who answers for it.",
    body: "AI can make it. You get a team that takes responsibility for it. Before, during and long after launch.",
    card: "bg-[#c9ff6e] text-[#1e1e1e]",
    bodyClass: "text-[#1e1e1e]/80",
  },
] as const;

/**
 * Visual + text highlights — Figma 3626:4063.
 */
export function WhyKbpm() {
  const t = useTranslations("WhyKbpm");

  return (
    <section className="kbpm-hi-fi bg-white px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-12 lg:gap-[56px]">
        <Reveal>
          <div className="flex max-w-[45rem] flex-col gap-8">
            <SectionEyebrow label={t("eyebrow")} mark={4} />            <h2
              className="font-display text-[#1e1e1e]"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 500,
              }}
            >
              {t("headline")}            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <Reveal className="min-h-[22rem] w-full lg:min-h-0 lg:w-[min(100%,53.5rem)] lg:shrink-0">
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-2xl lg:min-h-[46.7rem]">
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

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {CARDS.map((card, i) => (
              <Reveal key={card.title} delay={80 + i * 80} className="flex min-h-0 flex-1">
                <article
                  className={`flex w-full flex-col justify-between rounded-2xl p-6 md:p-8 ${card.card}`}
                >
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      fontWeight: 500,
                    }}
                  >
                    {card.title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p
                    className={`mt-8 max-w-md text-[14px] leading-5 tracking-[-0.01em] md:mt-10 ${card.bodyClass}`}
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
