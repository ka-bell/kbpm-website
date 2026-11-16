"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

const LOGOS = [
  { name: "Virtue", src: "/clients/virtue.png" },
  { name: "Mix Interiors", src: "/clients/mix-interiors.png" },
  { name: "Mediahuis", src: "/clients/mediahuis.png" },
  { name: "Spilnews", src: "/clients/spilnews.png" },
] as const;

/** Mobile Figma 3674:2685 — 2×5 logo cells */
const MOBILE_GRID_COUNT = 10;

type Logo = (typeof LOGOS)[number];

/**
 * Inner logo frame — Figma “frame in frame”: fixed box, PNG fills it.
 * Desktop inner: 193.7×104 (3674:496). Mobile inner: 114.5×61.5 (3674:2687).
 */
function LogoFill({ logo, className }: { logo: Logo; className: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.name}
        width={194}
        height={104}
        decoding="async"
        className="pointer-events-none absolute inset-0 size-full object-contain"
      />
    </div>
  );
}

export function TrustedBy() {
  const t = useTranslations("TrustedBy");
  const mobileGrid = Array.from(
    { length: MOBILE_GRID_COUNT },
    (_, i) => LOGOS[i % LOGOS.length],
  );

  return (
    <section className="kbpm-hi-fi bg-white pb-10 pt-4 md:pb-20 md:pt-8 lg:pb-[80px] lg:pt-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 md:gap-12 md:px-10 lg:px-20">
        <Reveal>
          <div className="flex flex-col gap-4 md:gap-8">
            {/* Mobile eyebrow/copy — Figma 3674:2683 */}
            <div className="flex flex-col gap-4 max-md:flex md:hidden">
              <SectionEyebrow label={t("eyebrow")} mark={1} />
              <h2
                className="font-display text-[#1e1e1e]"
                style={{
                  fontSize: "2.5rem",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                {t("headline")}
              </h2>
              <p className="text-[16px] leading-[1.3] tracking-[-0.01em] text-[#666]">
                {t("caption")}
              </p>
            </div>

            {/* Desktop eyebrow/copy */}
            <div className="hidden flex-col gap-8 md:flex">
              <SectionEyebrow label={t("eyebrow")} mark={1} />
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
                <h2
                  className="font-display max-w-[32rem] text-[#1e1e1e]"
                  style={{
                    fontSize: "3.5rem",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    fontWeight: 500,
                  }}
                >
                  {t("headline")}
                </h2>
                <p className="max-w-[27rem] text-[20px] leading-[1.3] tracking-[-0.01em] text-[#666] lg:pt-1">
                  {t("caption")}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mobile — 2×5 bordered grid, inner fill frames (Figma 3674:2685) */}
        <ul
          className="grid grid-cols-2 gap-2 mix-blend-luminosity max-md:grid md:hidden"
          aria-label={t("clientsAria")}
        >
          {mobileGrid.map((logo, i) => (
            <li
              key={`${logo.src}-m-${i}`}
              className="flex aspect-[167/120] items-center justify-center overflow-hidden border border-[#1e1e1e]/08 bg-white"
            >
              <LogoFill logo={logo} className="h-[61.5px] w-[114.5px]" />
            </li>
          ))}
        </ul>

        {/* Desktop — 4 partners, gap 40, divider rules, inner 194×104 (Figma 3674:494) */}
        <ul
          className="hidden mix-blend-luminosity md:flex md:items-start md:gap-10"
          aria-label={t("clientsAria")}
        >
          {LOGOS.map((logo, i) => (
            <li
              key={logo.src}
              className={`flex min-w-0 flex-1 flex-col items-center px-5 ${
                i < LOGOS.length - 1 ? "border-r border-solid border-[#1e1e1e]/10" : ""
              }`}
            >
              <LogoFill
                logo={logo}
                className="h-[104px] w-full max-w-[193.66px]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
