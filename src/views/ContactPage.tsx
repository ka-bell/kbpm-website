"use client";

import { Link } from "@/components/Link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";

const INTEREST_KEYS = [
  "scan",
  "release",
  "eu-scan",
  "eu-setup",
  "eu-migrate",
] as const;

type InterestKey = (typeof INTEREST_KEYS)[number];

function isInterestKey(value: string | undefined): value is InterestKey {
  return INTEREST_KEYS.includes(value as InterestKey);
}

/**
 * Contact — Figma 3626:9843.
 */
export function ContactPage({ interest }: { interest?: string }) {
  const t = useTranslations("Contact");
  const tc = useTranslations("Common");
  const hint = isInterestKey(interest) ? t(`interests.${interest}`) : "";
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorKey, setErrorKey] = useState<
    "emailRequired" | "consentRequired" | "generic" | null
  >(null);

  const cards = useMemo(
    () =>
      (
        [
          { key: "studio" as const, href: undefined },
          { key: "email" as const, href: "mailto:hello@kbpm.nl" },
          { key: "hours" as const, href: undefined },
        ] as const
      ).map((card) => ({
        ...card,
        label: t(`cards.${card.key}.label`),
        title: t(`cards.${card.key}.title`),
        body: t(`cards.${card.key}.body`),
      })),
    [t],
  );

  useEffect(() => {
    if (!hint) return;
    const el = document.getElementById("message") as HTMLTextAreaElement | null;
    if (el && !el.value) {
      el.value = `${t("interestedIn", { hint })}\n\n`;
    }
  }, [hint, t]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const email = (
      form.elements.namedItem("email") as HTMLInputElement | null
    )?.value.trim();

    setStatus("idle");
    setErrorKey(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      event.preventDefault();
      setStatus("error");
      setErrorKey("emailRequired");
      return;
    }

    if (!consent) {
      event.preventDefault();
      setStatus("error");
      setErrorKey("consentRequired");
      return;
    }

    // mailto: opens the client; treat that as a successful handoff.
    setStatus("success");
  }

  return (
    <div className="kbpm-hi-fi">
      <div className="relative -mt-[4.5rem] bg-[#1e1e1e] text-white sm:-mt-[5.5rem] lg:-mt-[6.5rem]">
        <section className="mx-auto max-w-[1440px] px-6 pb-10 pt-[5.5rem] sm:pt-[6.5rem] md:px-20 md:pb-14 lg:px-20 lg:pb-20 lg:pt-[8.5rem]">
          <div className="flex flex-col gap-14">
            <Reveal>
              <Link
                to="/"
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white px-6 py-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-80"
              >
                <img
                  src="/hero/arrow-outward-light.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 rotate-180"
                />
                {tc("home")}
              </Link>
            </Reveal>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <Reveal className="max-w-[44rem]">
                <div className="flex flex-col gap-8">
                  <p className="font-mono text-[14px] uppercase leading-[16.5px] tracking-[0.05em] text-white">
                    {t("eyebrow")}
                  </p>
                  <h1
                    className="font-display font-medium text-white"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 6rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {t("headlineLine1")}
                    <br />
                    {t("headlineLine2")}
                  </h1>
                </div>
              </Reveal>
              <Reveal delay={80} className="max-w-[22.5rem] lg:pb-1">
                <p className="text-[18px] leading-[1.2] tracking-[-0.02em] text-white">
                  {t("intro")}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-6 md:px-20 md:pb-20 md:pt-10">
          <Reveal>
            <form
              action="mailto:hello@kbpm.nl"
              method="post"
              encType="text/plain"
              onSubmit={onSubmit}
              noValidate
              className="flex max-w-[955px] flex-col gap-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-4">
                  <span className="text-[16px] leading-[1.3] tracking-[-0.02em] text-white">
                    {t("fullName")}
                  </span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="h-12 w-full border border-white bg-transparent px-3 text-[16px] text-white outline-none placeholder:text-white/40 focus:border-white"
                  />
                </label>
                <label className="flex flex-col gap-4">
                  <span className="text-[16px] leading-[1.3] tracking-[-0.02em] text-white">
                    {t("email")}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-invalid={errorKey === "emailRequired"}
                    className="h-12 w-full border border-white bg-transparent px-3 text-[16px] text-white outline-none placeholder:text-white/40 focus:border-white"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-4">
                <span className="text-[16px] leading-[1.3] tracking-[-0.02em] text-white">
                  {t("message")}
                </span>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  placeholder={t("messagePlaceholder")}
                  className="min-h-[180px] w-full resize-y border border-white bg-transparent p-3 text-[16px] leading-[1.3] tracking-[-0.02em] text-white outline-none placeholder:text-white/45 focus:border-white"
                />
              </label>

              <label className="flex items-start gap-2 pb-4 sm:items-center">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  aria-invalid={errorKey === "consentRequired"}
                  className="mt-0.5 size-[18px] shrink-0 appearance-none border border-white bg-transparent checked:bg-white"
                />
                <span className="text-[12px] leading-[1.2] tracking-[-0.01em] text-white">
                  {t("consent")}
                </span>
              </label>

              {status === "error" && errorKey ? (
                <p
                  role="alert"
                  className="text-[14px] leading-[1.3] text-[#ffb4b4]"
                >
                  {t(`errors.${errorKey}`)}
                </p>
              ) : null}

              {status === "success" ? (
                <p
                  role="status"
                  className="text-[14px] leading-[1.3] text-[#c9ff6e]"
                >
                  {t("success")}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex w-fit items-center justify-center rounded-full bg-[#006ff7] px-6 py-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
              >
                {status === "success" ? t("submitting") : t("submit")}
              </button>
            </form>
          </Reveal>
        </section>
      </div>

      <section
        data-contact-light
        className="bg-white px-6 py-16 text-[#1e1e1e] md:px-20 md:py-20"
      >
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="flex max-w-[45rem] flex-col gap-8">
            <SectionEyebrow label={t("detailsEyebrow")} mark={3} />
            <h2
              className="font-display font-medium tracking-[-0.03em] text-[#1e1e1e]"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
              }}
            >
              {t("detailsHeadlineLine1")}
              <br />
              {t("detailsHeadlineLine2")}
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:mt-[72px] md:grid-cols-3">
            {cards.map((card, i) => (
              <Reveal key={card.label} delay={i * 60}>
                <article className="flex min-h-[18.5rem] flex-col justify-between border border-[#1e1e1e]/20 p-7 md:min-h-[297px]">
                  <div>
                    <p className="font-mono text-[11px] uppercase leading-[16.5px] tracking-[0.05em] text-[#6b6b6b]">
                      {card.label}
                    </p>
                    {card.href ? (
                      <a
                        href={card.href}
                        className="mt-[19px] block font-display text-[24px] font-medium leading-7 text-[#1e1e1e] transition-opacity hover:opacity-70"
                      >
                        {card.title}
                      </a>
                    ) : (
                      <p className="mt-[19px] font-display text-[24px] font-medium leading-7 text-[#1e1e1e]">
                        {card.title}
                      </p>
                    )}
                  </div>
                  <p className="text-[14px] leading-[22.75px] text-[#6b6b6b]">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="relative aspect-[1440/820] w-full overflow-hidden bg-[#f5f5f5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/contact/studio.jpg"
            alt={t("studioPhotoAlt")}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
