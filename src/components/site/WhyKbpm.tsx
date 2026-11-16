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
 */
export function WhyKbpm() {
  const t = useTranslations("WhyKbpm");

  return (
    <section className="kbpm-hi-fi bg-white px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-12 lg:gap-[56px]">
        <Reveal>
          <div className="flex max-w-[45rem] flex-col gap-8">
            <SectionEyebrow label={t("eyebrow")} mark={4} />
            <h2
              className="font-display text-[#1e1e1e]"
              style={{
                fontSize: "3.5rem",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              {t("headline")}
            </h2>
          </div>
        </Reveal>

        {/* Figma 3674:617 — image 856 + cards 412, gap 12 */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-3">
          <Reveal className="min-h-[22rem] w-full lg:min-h-0 lg:w-[min(100%,53.5rem)] lg:shrink-0">
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[24px] lg:min-h-[46.7rem]">
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
              <Reveal
                key={card.title}
                delay={80 + i * 80}
                className="flex min-h-0 flex-1"
              >
                <article
                  className={`flex min-h-[241px] w-full flex-col justify-between gap-16 rounded-[24px] p-8 md:gap-0 ${card.card}`}
                >
                  {/* Heading/H4 — 32 Medium, leading 1.2, tracking -2% */}
                  <h3
                    className="font-display text-[32px] font-medium leading-[1.2] tracking-[-0.02em]"
                  >
                    {card.title.split("\n").map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  {/* Text/Regular — 16, leading 1.3, tracking -1%, opacity 80 */}
                  <p
                    className={`max-w-none text-[16px] font-normal leading-[1.3] tracking-[-0.01em] opacity-80 ${card.bodyClass}`}
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
