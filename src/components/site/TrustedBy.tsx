"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

/** Client logos — Figma 3674:2683 / 3674:2685 (black PNGs). */
const LOGOS = [
  { name: "VICE", src: "/clients/vice.png" },
  { name: "Spilnews", src: "/clients/spilnews.png" },
  { name: "De Speld", src: "/clients/de-speld.png" },
  { name: "Frameweb", src: "/clients/frameweb.png" },
  { name: "Mix Interiors", src: "/clients/mix-interiors.png" },
  { name: "PLUS Supermarkt", src: "/clients/plus-supermarkt.png" },
  { name: "Staatsloterij", src: "/clients/staatsloterij.png" },
  { name: "Pepperminds", src: "/clients/pepperminds.png" },
  { name: "Virtue", src: "/clients/virtue.png" },
  { name: "Videoland", src: "/clients/videoland.png" },
  { name: "bol.com", src: "/clients/bol.png" },
  { name: "Parteon", src: "/clients/parteon.png" },
] as const;

type Logo = (typeof LOGOS)[number];

/**
 * Logo glyph — desktop size is locked in CSS (equal height); mobile uses framed box.
 */
function LogoFill({
  logo,
  className,
  framed = false,
}: {
  logo: Logo;
  className?: string;
  /** Mobile cells keep a white inset frame; desktop is bare glyph (3674:494). */
  framed?: boolean;
}) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden ${
        framed ? "bg-white" : "bg-transparent"
      } ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.name}
        width={160}
        height={44}
        decoding="async"
        className={
          framed
            ? "pointer-events-none h-auto max-h-[70%] w-auto max-w-[82%] object-contain"
            : "pointer-events-none"
        }
      />
    </div>
  );
}

export function TrustedBy() {
  const t = useTranslations("TrustedBy");
  const loop = [...LOGOS, ...LOGOS];

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

        {/* Mobile — 2×6 bordered grid (Figma 3674:2685) */}
        <ul
          className="grid grid-cols-2 gap-2 max-md:grid md:hidden"
          aria-label={t("clientsAria")}
        >
          {LOGOS.map((logo) => (
            <li
              key={`${logo.src}-m`}
              className="flex aspect-[163.5/121] items-center justify-center overflow-hidden border-[0.5px] border-[#ccc] bg-white p-2"
            >
              <LogoFill logo={logo} className="h-[72px] w-[68px]" framed />
            </li>
          ))}
        </ul>

        {/* Desktop — horizontal marquee, divider rules only (Figma 3674:494) */}
        <div
          className="clients-logo-viewport hidden md:block"
          aria-label={t("clientsAria")}
        >
          <ul className="clients-logo-scroller">
            {loop.map((logo, i) => (
              <li
                key={`${logo.src}-d-${i}`}
                className="clients-logo-scroller__cell"
                aria-hidden={i >= LOGOS.length}
              >
                <LogoFill logo={logo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
