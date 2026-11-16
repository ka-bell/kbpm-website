"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";

/**
 * Intro band under hero — Figma 3626:4308.
 * Text left + CTAs right, top-aligned (items-start), shared 1440 / px-20 grid.
 */
export function IntroBand() {
  const t = useTranslations("IntroBand");

  return (
    <section className="kbpm-hi-fi bg-white px-5 pb-8 pt-10 md:px-10 md:pb-10 md:pt-14 lg:px-20 lg:pb-12 lg:pt-[80px]">
      <Reveal className="w-full">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-8 lg:flex-row lg:gap-16">
          <p
            className="max-w-[40.3rem] text-[#1e1e1e] lg:max-w-[645px]"
            style={{
              fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            {t("bodyBefore")}{" "}
            <strong className="font-medium">{t("trusties")}</strong>
            {t("bodyAfter")}
          </p>

          <div className="flex shrink-0 flex-wrap items-center gap-4 lg:pt-0.5">
            <Link
              to="/contact"
              className="inline-flex h-[55px] items-center gap-2.5 rounded-full bg-[#006ff7] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
            >
              {t("startProject")}
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
            <Link
              to="/work"
              className="inline-flex h-[55px] items-center justify-center rounded-full border border-[#d9d9d9] px-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-70"
            >
              {t("seeWork")}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
