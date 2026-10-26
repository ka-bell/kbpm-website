"use client";

import { Link } from "@/components/Link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";
import { WhoYouWorkWith } from "@/components/site/WhoYouWorkWith";

const CAPABILITY_KEYS = ["product", "design", "engineering", "infra"] as const;
const TESTIMONIAL_META = [
  {
    key: "t1" as const,
    tint: "#c9ff6e",
    ink: "text-[#1e1e1e]",
    border: "border-[#1e1e1e]/15",
    column: "left" as const,
  },
  {
    key: "t2" as const,
    tint: "#ff1c77",
    ink: "text-white",
    border: "border-white/25",
    column: "right" as const,
  },
  {
    key: "t3" as const,
    tint: "#c7b0fe",
    ink: "text-[#1e1e1e]",
    border: "border-[#1e1e1e]/15",
    column: "right" as const,
  },
  {
    key: "t4" as const,
    tint: "#fe6337",
    ink: "text-white",
    border: "border-white/25",
    column: "left" as const,
  },
  {
    key: "t5" as const,
    tint: "#006ff7",
    ink: "text-white",
    border: "border-white/25",
    column: "right" as const,
  },
];

const TOOLS: Array<{ name: string; src: string }> = [
  { name: "React", src: "/stack/react.svg" },
  { name: "TanStack", src: "/stack/tanstack.svg" },
  { name: "Next.js", src: "/stack/nextjs.svg" },
  { name: "TypeScript", src: "/stack/typescript.svg" },
  { name: "Supabase", src: "/stack/supabase.svg" },
  { name: "Postgres", src: "/stack/postgres.svg" },
  { name: "Cloudflare", src: "/stack/cloudflare.svg" },
  { name: "Stripe", src: "/stack/stripe.svg" },
  { name: "Figma", src: "/stack/figma.svg" },
  { name: "Expo", src: "/stack/expo.svg" },
  { name: "Hetzner", src: "/stack/hetzner.svg" },
  { name: "OpenAI", src: "/stack/openai.svg" },
  { name: "Tailwind", src: "/stack/tailwind.svg" },
  { name: "Vercel", src: "/stack/vercel.svg" },
  { name: "Node.js", src: "/stack/nodejs.svg" },
  { name: "Docker", src: "/stack/docker.svg" },
  { name: "GitHub", src: "/stack/github.svg" },
  { name: "Framer", src: "/stack/framer.svg" },
  { name: "Linear", src: "/stack/linear.svg" },
  { name: "Notion", src: "/stack/notion.svg" },
];

type TestimonialCardData = {
  quote: string;
  name: string;
  role: string;
  tint: string;
  ink: string;
  border: string;
  column: "left" | "right";
};

function TestimonialCard({ card }: { card: TestimonialCardData }) {
  return (
    <figure
      className={`flex min-h-[22rem] w-full max-w-[26rem] flex-col justify-between rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl backdrop-saturate-150 ${card.ink}`}
      style={{
        backgroundColor: `color-mix(in srgb, ${card.tint} 62%, transparent)`,
      }}
    >
      <blockquote className="text-[20px] font-medium leading-[1.2] tracking-[-0.01em] md:text-[22px]">
        “{card.quote}”
      </blockquote>
      <figcaption
        className={`mt-10 flex items-center gap-5 border-t pt-4 ${card.border}`}
      >
        <span
          className={`size-[52px] shrink-0 rounded-full ${
            card.ink.includes("white") ? "bg-white/80" : "bg-[#1e1e1e]/80"
          } backdrop-blur-sm`}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="text-[18px] font-bold leading-7">{card.name}</p>
          <p className="text-[16px] leading-6 opacity-90">{card.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function AboutPage() {
  const t = useTranslations("About");
  const tc = useTranslations("Common");
  const capabilities = useMemo(
    () =>
      CAPABILITY_KEYS.map((key) => ({
        title: t(`capabilities.${key}.title`),
        items: t.raw(`capabilities.${key}.items`) as string[],
      })),
    [t],
  );
  const testimonials = useMemo(
    () =>
      TESTIMONIAL_META.map((meta) => ({
        ...meta,
        quote: t(`testimonials.${meta.key}.quote`),
        name: t(`testimonials.${meta.key}.name`),
        role: t(`testimonials.${meta.key}.role`),
      })),
    [t],
  );
  const stats = useMemo(
    () =>
      (["years", "senior", "eu", "direct"] as const).map((key) => [
        t(`stats.${key}.value`),
        t(`stats.${key}.label`),
      ]),
    [t],
  );

  const capabilitiesSectionRef = useRef<HTMLElement | null>(null);
  const capabilitiesViewportRef = useRef<HTMLDivElement | null>(null);
  const capabilitiesTrackRef = useRef<HTMLDivElement | null>(null);
  const [capabilityProgress, setCapabilityProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateCapabilities = () => {
      frame = 0;
      const section = capabilitiesSectionRef.current;
      const viewport = capabilitiesViewportRef.current;
      const track = capabilitiesTrackRef.current;
      if (!section || !viewport || !track) return;

      const sectionRect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-sectionRect.top / scrollableDistance, 0), 1);
      const maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);

      track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
      setCapabilityProgress(progress);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateCapabilities);
    };

    updateCapabilities();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="kbpm-hi-fi min-h-screen bg-white text-[#1e1e1e]">
      {/* Hero — Figma 3626:10981; rewrite copy */}
      <section className="bg-white px-6 pb-16 pt-8 md:px-10 md:pb-20 lg:px-20 lg:pb-[80px] lg:pt-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-12 lg:gap-14">
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
              {tc("home")}
            </Link>
          </Reveal>

          <div className="flex flex-col items-stretch justify-between gap-10 lg:flex-row lg:items-end lg:gap-16">
            <Reveal className="min-w-0 flex-1">
              <div className="flex max-w-[44rem] flex-col gap-6 md:gap-8">
                <p className="font-mono text-[14px] uppercase leading-[16.5px] tracking-[0.05em] text-[#1e1e1e]">
                  {t("eyebrow")}
                </p>
                <h1
                  className="font-display text-[#1e1e1e]"
                  style={{
                    fontSize: "clamp(3rem, 8vw, 6rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                    fontWeight: 500,
                  }}
                >
                  {t("headlineLine1")}
                  <br />
                  {t("headlineLine2")}
                </h1>
              </div>
            </Reveal>

            <Reveal delay={80} className="w-full shrink-0 lg:w-[min(100%,22.5rem)]">
              <p className="text-[17px] leading-[1.2] tracking-[-0.01em] text-[#6b6b6b] md:text-[18px]">
                {t("intro")}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-8 border-t border-[#1e1e1e]/20 pt-8 md:grid-cols-4 md:gap-10 md:pt-10">
              {stats.map(([n, l]) => (
                <div key={l} className="flex flex-col gap-3">
                  <p
                    className="font-display text-[#1e1e1e]"
                    style={{
                      fontSize: "clamp(2rem, 3.5vw, 3rem)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.03em",
                      fontWeight: 500,
                    }}
                  >
                    {n}
                  </p>
                  <p className="font-mono text-[11px] uppercase leading-[16.5px] tracking-[0.05em] text-[#6b6b6b]">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities — Figma 3635:576; sticky scrub fits one viewport */}
      <section
        ref={capabilitiesSectionRef}
        className="relative bg-[#f5f5f5]"
        style={{ height: "320vh" }}
      >
        {/* Stick high; header + cards + progress fill the viewport so nothing clips */}
        <div className="sticky top-3 flex h-[calc(100dvh-0.75rem)] flex-col overflow-hidden md:top-4">
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col gap-5 px-6 py-3 md:gap-6 md:px-10 md:py-4 lg:gap-8 lg:px-20">
            <div className="shrink-0">
              <Reveal>
                <div className="flex max-w-[36rem] flex-col gap-4 md:gap-5">
                  <SectionEyebrow label={t("capabilitiesEyebrow")} mark={2} />
                  <h2
                    className="font-display text-[#1e1e1e]"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      fontWeight: 500,
                    }}
                  >
                    {t("capabilitiesHeadline")}
                  </h2>
                  <p className="max-w-xl text-[16px] leading-[1.25] tracking-[-0.02em] text-[#838383] md:text-[18px]">
                    {t("capabilitiesBody")}
                  </p>
                </div>
              </Reveal>
            </div>

            <div
              ref={capabilitiesViewportRef}
              className="min-h-0 flex-1 overflow-hidden"
            >
              <div
                ref={capabilitiesTrackRef}
                className="flex h-full w-max gap-6 md:gap-8"
                style={{ willChange: "transform" }}
              >
                {capabilities.map((c) => (
                  <article
                    key={c.title}
                    className="flex h-full w-[min(82vw,30rem)] shrink-0 flex-col rounded-[28px] border border-black/10 bg-[#1e1e1e] p-6 md:w-[30rem] md:p-8 lg:p-10"
                  >
                    <div className="flex h-full min-h-0 flex-col justify-between gap-6 md:gap-8">
                      <h3
                        className="shrink-0 font-display text-white"
                        style={{
                          fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                          lineHeight: 1.1,
                          letterSpacing: "-0.02em",
                          fontWeight: 500,
                        }}
                      >
                        {c.title}
                      </h3>
                      <div className="flex min-h-0 flex-wrap content-start gap-2 overflow-y-auto">
                        {c.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex h-8 items-center bg-[#c9ff6e] px-5 text-[14px] leading-[21px] tracking-[-0.02em] text-black"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid shrink-0 grid-cols-[1fr_auto] items-center gap-5 pb-1">
              <div className="h-px overflow-hidden bg-[#1e1e1e]/15">
                <div
                  className="h-full bg-[#1e1e1e] transition-[width] duration-100"
                  style={{ width: `${Math.round(capabilityProgress * 100)}%` }}
                />
              </div>
              <p className="font-mono text-[12px] uppercase tracking-[0.05em] text-[#6b6b6b]">
                {String(
                  Math.min(
                    Math.floor(capabilityProgress * capabilities.length) + 1,
                    capabilities.length,
                  ),
                ).padStart(2, "0")}{" "}
                / {String(capabilities.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — Figma 3626:11146; title first, then cards scroll over */}
      <section className="relative bg-[#1e1e1e]">
        {/* Full-screen title pins first; cards arrive on further scroll */}
        <div className="sticky top-0 z-0 flex h-dvh items-center justify-center px-6">
          <h2
            className="pointer-events-none max-w-[18ch] text-center font-display text-white md:max-w-none"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            {t("testimonialsHeadline")}
          </h2>
        </div>

        {/* After the title viewport, cards rise from below and flow over it */}
        <div className="relative z-10 px-6 pb-[30vh] pt-8 md:px-10 md:pb-[40vh] md:pt-12 lg:px-20">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 md:grid-cols-2 md:gap-x-16 lg:gap-x-24">
            <div className="flex flex-col items-center gap-[min(50vh,26rem)] md:items-start">
              {testimonials
                .filter((c) => c.column === "left")
                .map((card) => (
                  <TestimonialCard
                    key={`${card.name}-${card.tint}`}
                    card={card}
                  />
                ))}
            </div>
            <div className="flex flex-col items-center gap-[min(50vh,26rem)] md:items-end md:pt-[35vh]">
              {testimonials
                .filter((c) => c.column === "right")
                .map((card) => (
                  <TestimonialCard
                    key={`${card.name}-${card.tint}`}
                    card={card}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stack — Figma 3626:11186; product logos + names */}
      <section className="bg-white px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <div className="flex flex-col gap-8">
              <SectionEyebrow label={t("toolsEyebrow")} mark={5} />
              <h2
                className="font-display text-[#1e1e1e]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                {t("toolsHeadline")}
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-16 md:grid-cols-4 lg:grid-cols-5 lg:gap-2">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className="relative flex min-h-[7.5rem] items-center justify-center border border-[#1e1e1e]/20 px-4 py-6 md:min-h-[7.75rem]"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={t.src}
                    alt=""
                    width={28}
                    height={28}
                    className="size-7 shrink-0 object-contain"
                    decoding="async"
                  />
                  <span className="text-[15px] font-medium tracking-[-0.02em] text-[#1e1e1e] md:text-[16px]">
                    {t.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders — Figma 3626:11276 */}
      <WhoYouWorkWith />

      {/* Closing CTA — rewrite */}
      <section className="border-t border-[#e8e8e8] bg-[#f5f5f5] px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <SectionEyebrow label={t("ctaEyebrow")} mark={7} />
                <h2
                  className="mt-8 font-display text-[#1e1e1e]"
                  style={{
                    fontSize: "clamp(2.25rem, 5vw, 4rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    fontWeight: 500,
                  }}
                >
                  {t("ctaHeadline")}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  to="/contact"
                  className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
                >
                  {tc("startProject")}                  <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-white">
                    <img
                      src="/hero/arrow-outward-dark.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="size-4"
                    />
                  </span>
                </Link>
                <Link
                  to="/services"
                  className="font-mono text-[13px] uppercase tracking-[0.05em] text-[#6b6b6b] underline decoration-[#c9ff6e] decoration-2 underline-offset-4 transition-colors hover:text-[#1e1e1e]"
                >
                  {tc("exploreServices")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
