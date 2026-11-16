"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";

/**
 * Closing CTA — Figma 3674:632 Text Heading Section / service 10631:31700.
 * Mobile: stacked left (headline + button).
 */
export function FinalCta({ headline }: { headline?: string } = {}) {
  const t = useTranslations("FinalCta");
  const tc = useTranslations("Common");

  return (
    <section className="kbpm-hi-fi bg-[#006ff7] px-5 py-10 md:px-10 md:py-16 lg:px-20 lg:py-[80px]">
      <Reveal>
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 md:flex-row md:items-start md:gap-12">
          <h2 className="font-display max-w-[641px] text-[2.5rem] font-medium leading-[1.2] tracking-[-0.02em] text-white md:text-[clamp(2.5rem,5vw,3.5rem)]">
            {headline ?? t("headline")}
          </h2>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2.5 self-start rounded-full bg-[#c9ff6e] px-6 py-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-90"
          >
            {tc("letsTalk")}
            <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-[#1e1e1e] p-[6px]">
              <img
                src="/hero/arrow-outward.svg"
                alt=""
                width={19}
                height={19}
                className="size-[19px]"
              />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
