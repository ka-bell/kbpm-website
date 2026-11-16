"use client";

import { useEffect, useMemo, useRef } from "react";
import { useLocale } from "next-intl";
import { FinalCta } from "@/components/site/FinalCta";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import {
  MoreWork,
  workCardsFromSlugs,
} from "@/components/site/MoreWork";
import { Reveal } from "@/components/site/Reveal";
import { Tag } from "@/components/site/Tag";
import {
  getRelated,
  type CaseStudy,
} from "@/components/site/cases-data";
import { localizeCaseMeta } from "@/i18n/localize";

type NarrativeCard = { title: string; body: string };

function getCaseDetailCards(c: CaseStudy): { problem: NarrativeCard[]; build: NarrativeCard[] } {
  const cards: Record<string, { problem: NarrativeCard[]; build: NarrativeCard[] }> = {
    spilnews: {
      problem: [
        {
          title: "Workflow",
          body: "Editorial teams needed video management, metadata, scheduling, and permissions in one publishing flow.",
        },
        {
          title: "Constraints",
          body: "The system had to fit the SPIL ecosystem while still feeling purpose-built for video-first news.",
        },
        {
          title: "Measures",
          body: "A launched MVP that supports modern editorial workflows instead of article-first publishing habits.",
        },
      ],
      build: [
        {
          title: "Product strategy",
          body: "Shape the platform around video management, publishing workflow, metadata, and editorial roles.",
        },
        {
          title: "Interface system",
          body: "Design dashboard, CMS, desktop, and mobile screens that remain clear in daily newsroom use.",
        },
        {
          title: "Product build",
          body: "Combine front-end, back-end, CMS, design system, and product management into one usable MVP.",
        },
      ],
    },
    "mix-interiors": {
      problem: [
        {
          title: "Reader need",
          body: "Readers could see inspiring interior products, but could not easily identify or explore them from the image.",
        },
        {
          title: "Content gap",
          body: "Editorial photography and manufacturer product data lived in separate systems.",
        },
        {
          title: "Measure",
          body: "A discovery experience that connects images to products and sends readers directly to manufacturers.",
        },
      ],
      build: [
        {
          title: "Visual discovery",
          body: "Turn interior imagery into interactive product surfaces with hotspots and product context.",
        },
        {
          title: "Data layer",
          body: "Aggregate manufacturer catalogues into a structured product database with synchronisation.",
        },
        {
          title: "Matching system",
          body: "Support product recognition, recommendations, API integrations, and direct manufacturer links.",
        },
      ],
    },
    "virtue-worldwide": {
      problem: [
        {
          title: "Strategy need",
          body: "Cultural strategists needed to see patterns between topics, people, organisations, and communities.",
        },
        {
          title: "Constraint",
          body: "Traditional research was too slow and often missed hidden relationships shaping behaviour.",
        },
        {
          title: "Measure",
          body: "A tool that makes network intelligence useful for strategy and creative teams.",
        },
      ],
      build: [
        {
          title: "Knowledge graph",
          body: "Map relationships between topics, people, organisations, and audience communities.",
        },
        {
          title: "Data visualisation",
          body: "Make complex network data explorable through interactive graphs and clear interface states.",
        },
        {
          title: "Strategic output",
          body: "Support trend discovery, community detection, relationship mapping, and global brand reports.",
        },
      ],
    },
    hopplay: {
      problem: [
        {
          title: "Visitor need",
          body: "Destinations wanted experiences that go beyond static guides and traditional walking tours.",
        },
        {
          title: "Operational need",
          body: "Cities needed a repeatable way to create routes, challenges, and location-based content.",
        },
        {
          title: "Measure",
          body: "Live destination experiences that can scale across multiple cities.",
        },
      ],
      build: [
        {
          title: "Route builder",
          body: "Give operators a clear way to design routes, challenges, and location-triggered content.",
        },
        {
          title: "Visitor app",
          body: "Deliver the experience on mobile with maps, progress, and place-based storytelling.",
        },
        {
          title: "Ops layer",
          body: "Support multi-city rollout without rebuilding the product for every destination.",
        },
      ],
    },
    blink: {
      problem: [
        {
          title: "Lost bookings",
          body: "Artists were losing work to incomplete DMs, unclear briefs, and calendars that didn’t match how tattoo sessions actually run.",
        },
        {
          title: "Wrong tools",
          body: "Generic booking software didn’t support artist, style, or flash-based requests — or studio multi-artist scheduling.",
        },
        {
          title: "Measure",
          body: "A dedicated flow from client request to confirmed, paid appointment.",
        },
      ],
      build: [
        {
          title: "Booking widget",
          body: "Let studios embed or share a Blink link so clients pick artist, style, or flash and submit a proper request.",
        },
        {
          title: "Studio ops",
          body: "Dashboard, calendar, messaging, and Stripe so appointments and payments live in one place.",
        },
        {
          title: "Brand & craft",
          body: "A product and brand system that feels built for tattoo culture — not a clinic booking clone.",
        },
      ],
    },
    "scooply-ai": {
      problem: [
        {
          title: "Tab overload",
          body: "Research and scoops get stuck across tabs, notes, and chats — never finishing as something shareable.",
        },
        {
          title: "AI on the side",
          body: "Most AI tools sit next to the browser instead of inside the moment of discovery.",
        },
        {
          title: "Measure",
          body: "An AI scooping experience that feels native to browsing and mobile follow-up.",
        },
      ],
      build: [
        {
          title: "In-browser AI",
          body: "Design AI Mode surfaces that keep scooping inside search and reading flow.",
        },
        {
          title: "Mobile companion",
          body: "Give Scooply a clear mobile presence without turning it into another heavy app.",
        },
        {
          title: "Brand system",
          body: "Lock identity, type, and colour so Scooply feels sharp and credible as an AI media product.",
        },
      ],
    },
  };

  return (
    cards[c.slug] ?? {
      problem: [
        { title: "Context", body: c.context ?? c.problem },
        { title: "Constraint", body: c.problem },
        { title: "Measure", body: c.metricLabel },
      ],
      build: [
        { title: "Product strategy", body: c.built },
        { title: "Craft layer", body: c.craft },
        { title: "Outcome", body: c.outcome },
      ],
    }
  );
}

const DEFAULT_CREDITS = [
  { role: "Product & strategy", name: "Karissa Bell" },
  { role: "Engineering & architecture", name: "Alex Postman" },
] as const;

function brandMark(client: string) {
  return client.toUpperCase();
}

function isVideoSrc(src?: string, kind?: "image" | "video") {
  if (kind === "video") return true;
  if (kind === "image" || !src) return false;
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src);
}

function CaseMedia({
  src,
  label,
  kind,
  className = "",
}: {
  src?: string;
  label: string;
  kind?: "image" | "video";
  className?: string;
}) {
  const video = isVideoSrc(src, kind);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Reveal starts at opacity 0 — browsers often skip autoplay until visible.
  useEffect(() => {
    if (!video) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    const tryPlay = () => {
      el.muted = true;
      const p = el.play();
      if (p) void p.catch(() => {});
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
      },
      { threshold: 0.05, rootMargin: "80px" },
    );
    io.observe(el);
    const timers = [100, 400, 1000, 2000].map((ms) =>
      window.setTimeout(tryPlay, ms),
    );
    return () => {
      io.disconnect();
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      timers.forEach(clearTimeout);
    };
  }, [video, src]);

  return (
    <div
      className={`relative h-[320px] w-full overflow-hidden rounded-[24px] bg-[#f5f5f5] md:h-[800px] ${className}`.trim()}
    >
      {src && video ? (
        <video
          ref={videoRef}
          src={src}
          aria-label={label}
          className="absolute inset-0 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : src ? (
        <img
          src={src}
          alt={label}
          width={1296}
          height={800}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <ImagePlaceholder label={label} className="min-h-[16rem] md:min-h-0" />
      )}
    </div>
  );
}

function DetailCard({
  index,
  title,
  body,
  className = "",
}: {
  index: number;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article
      className={`flex min-h-[297px] flex-col justify-between rounded-[24px] border border-[#1e1e1e]/20 p-8 md:p-[29px] ${className}`.trim()}
    >
      <div>
        <p className="font-mono text-[11px] uppercase leading-[16.5px] tracking-[0.05em] text-[#6b6b6b]">
          {String(index).padStart(2, "0")}
        </p>
        <h3 className="mt-5 font-display text-[24px] font-medium leading-7 text-[#1e1e1e]">
          {title}
        </h3>
      </div>
      <p className="text-[14px] leading-[1.5] text-[#6b6b6b]">{body}</p>
    </article>
  );
}

function SectionEyebrow({ mark, label }: { mark: string; label: string }) {
  return (
    <div className="flex items-center gap-4 font-mono text-[14px] uppercase leading-[1.1] tracking-[0.05em] text-[#1e1e1e]">
      <span>{mark}</span>
      <span>{label}</span>
    </div>
  );
}

/**
 * Portfolio case template — Figma 3626:16402.
 * Layout/look from Figma; copy from rewrite case data.
 */
export function WorkCasePage({ c: raw }: { c: CaseStudy }) {
  const locale = useLocale();
  const c = useMemo(() => localizeCaseMeta(raw, locale), [raw, locale]);
  const detailCards = getCaseDetailCards(c);
  const mark = brandMark(c.client);
  const stack = c.displayTags.length > 0 ? c.displayTags : c.keyFeatures;
  const visuals = c.screens;
  const afterProblem = c.mediaLayout?.afterProblem ?? "full-pair";
  const afterBuild = c.mediaLayout?.afterBuild ?? "two-full";
  const relatedCards = useMemo(
    () => workCardsFromSlugs(getRelated(c.slug, 2).map((item) => item.slug)),
    [c.slug],
  );

  // Screen index after primary (0)
  let mediaIdx = 1;
  const take = () => visuals[mediaIdx++];

  useEffect(() => {
    // Lenis owns scroll — SmoothScroll resets on route change; keep as fallback.
    window.scrollTo(0, 0);
  }, [c.slug]);

  const problemFull =
    afterProblem === "full-pair" || afterProblem === "full"
      ? take()
      : undefined;
  const problemA = afterProblem === "full" ? undefined : take();
  const problemB = afterProblem === "full" ? undefined : take();
  const buildFullOrFirst =
    afterBuild === "pair" || afterBuild === "pair-full" ? undefined : take();
  const buildSecond = take();
  const buildThird =
    afterBuild === "full-pair" ||
    afterBuild === "pair" ||
    afterBuild === "pair-full"
      ? take()
      : undefined;
  const buildAfterPairFull = afterBuild === "pair-full" ? take() : undefined;
  const closing = take() ?? visuals[visuals.length - 1];

  return (
    <div className="kbpm-hi-fi bg-white text-[#1e1e1e]">
      {/* Hero — Figma 10613:50960 (site gutters, full first viewport) */}
      <section className="kbpm-hi-fi mx-auto w-full max-w-[1440px] bg-white px-6 pt-2 pb-2 sm:pt-3 sm:pb-0 md:px-10 lg:px-20 lg:pt-4">
        <div className="relative flex w-full min-h-[calc(100dvh-56px-1rem)] items-center justify-center overflow-hidden rounded-[24px] bg-[#1e1e1e] sm:min-h-[40rem] lg:min-h-[min(90vh,56.25rem)]">
          {c.heroImage ? (
            isVideoSrc(c.heroImage) ? (
              <video
                src={c.heroImage}
                aria-hidden
                className="absolute inset-0 size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                src={c.heroImage}
                alt=""
                width={1376}
                height={920}
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
            )
          ) : (
            <>
              {/* Bottom vignette — Figma Gradient Overlay Bottom */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] mix-blend-multiply"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 100%)",
                }}
                aria-hidden
              />
              <h1
                className="relative z-10 max-w-[92%] text-center font-display font-semibold uppercase tracking-[-0.04em] text-[#f5f5f5]"
                style={{
                  fontSize:
                    mark.length > 10
                      ? "clamp(2.75rem, 12vw, 9rem)"
                      : "clamp(4rem, 16vw, 12rem)",
                  lineHeight: 0.9,
                }}
              >
                {mark}
                <span className="align-super text-[0.35em] font-semibold">*</span>
              </h1>
            </>
          )}
          {c.heroImage ? (
            <h1 className="sr-only">
              {c.client}
            </h1>
          ) : null}
        </div>
      </section>

      {/* Project identity + meta — Figma 3626:16446 */}
      <section
        id="overview"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-10 md:px-10 lg:px-20 md:py-14"
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <Reveal className="flex max-w-[440px] flex-col gap-4">
            <div className="flex flex-wrap gap-2.5">
              <Tag variant="white">
                {c.service.split("→")[0]?.trim() || "Service"}
              </Tag>
              <Tag variant="lime">
                {c.industry.split("/")[0]?.trim() || c.industry}
              </Tag>
            </div>
            <h2
              className="font-display font-medium uppercase tracking-[-0.02em] text-[#1e1e1e]"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.1 }}
            >
              {mark}
            </h2>
            <p className="text-[20px] font-medium leading-[1.3] tracking-[-0.03em] text-[#6b6b6b]">
              {c.title}
            </p>
          </Reveal>

          <Reveal
            delay={80}
            className="grid w-full max-w-[514px] grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4 lg:pt-10"
          >
            <MetaCol label="Client" value={c.client} />
            <MetaCol label="Year" value={c.year} />
            <MetaCol label="Service" value={c.service} />
            <div className="flex min-w-0 flex-col gap-2">
              <p className="font-mono text-[14px] font-medium uppercase leading-[1.35] tracking-[-0.02em] text-[#6b6b6b]">
                Stack
              </p>
              <ul className="flex flex-col gap-[5px] text-[16px] leading-[1.35] tracking-[-0.02em] text-[#1e1e1e]">
                {stack.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lede — Figma 10856:7028 */}
      <section className="mx-auto max-w-[1440px] px-6 pb-10 pt-2 md:px-10 lg:px-20 md:pb-14 md:pt-0">
        <Reveal>
          <p className="max-w-[1440px] font-display text-[clamp(1.35rem,2.4vw,1.875rem)] font-medium leading-[1.35] tracking-[-0.02em] text-[#1e1e1e] md:leading-[1.3]">
            {c.context ?? c.outcome}
          </p>
        </Reveal>
      </section>

      {/* Primary image — 3626:16471 */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
        <Reveal>
          <CaseMedia
            src={visuals[0]?.src}
            label={visuals[0]?.caption ?? "Hero image"}
            kind={visuals[0]?.kind}
          />
        </Reveal>
      </section>

      {/* 01 Problem — Figma 10614:53406 */}
      <section
        id="problem"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-20 md:px-10 lg:px-20 md:py-[80px]"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <Reveal className="max-w-[518px] shrink-0 lg:sticky lg:top-28">
            <SectionEyebrow mark="01" label="Problem" />
            <h2
              className="mt-8 font-display font-medium tracking-[-0.03em] text-[#1e1e1e]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}
            >
              The problem
              <br />
              behind the brief
            </h2>
            <p className="mt-8 text-[16px] leading-[1.45] tracking-[-0.02em] text-[#6b6b6b]">
              {c.problem}
            </p>
          </Reveal>
          <div className="flex w-full max-w-[622px] flex-col gap-5">
            {detailCards.problem.map((card, i) => (
              <Reveal key={card.title} delay={i * 60}>
                <DetailCard index={i + 1} title={card.title} body={card.body} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media grid — after problem */}
      <section className="mx-auto max-w-[1440px] space-y-6 px-6 md:space-y-[24px] md:px-10 lg:px-20">
        {problemFull ? (
          <Reveal>
            <CaseMedia
              src={problemFull.src}
              label={problemFull.caption ?? "Image"}
              kind={problemFull.kind}
            />
          </Reveal>
        ) : null}
        {problemA || problemB ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
            {problemA ? (
              <Reveal>
                <CaseMedia
                  src={problemA.src}
                  label={problemA.caption ?? "Image"}
                  kind={problemA.kind}
                />
              </Reveal>
            ) : null}
            {problemB ? (
              <Reveal delay={60}>
                <CaseMedia
                  src={problemB.src}
                  label={problemB.caption ?? "Image"}
                  kind={problemB.kind}
                />
              </Reveal>
            ) : null}
          </div>
        ) : null}
      </section>

      {/* 02 Build — Figma 10614:53406 card rhythm */}
      <section
        id="build"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-20 md:px-10 lg:px-20 md:py-[80px]"
      >
        <div className="flex flex-col gap-10 md:gap-[49px]">
          <Reveal className="flex max-w-[604px] flex-col gap-8">
            <SectionEyebrow mark="02" label="Build" />
            <div className="flex flex-col gap-8">
              <h2
                className="font-display font-medium tracking-[-0.03em] text-[#1e1e1e]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}
              >
                How we built the right thing, and built it right
              </h2>
              <p className="text-[16px] leading-[1.45] tracking-[-0.02em] text-[#6b6b6b]">
                {c.built}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {detailCards.build.map((card, i) => (
              <Reveal key={card.title} delay={i * 60}>
                <DetailCard
                  index={i + 1}
                  title={card.title}
                  body={card.body}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media stack — after build */}
      <section className="mx-auto max-w-[1440px] space-y-6 px-6 md:space-y-[24px] md:px-10 lg:px-20">
        {buildFullOrFirst ? (
          <Reveal>
            <CaseMedia
              src={buildFullOrFirst.src}
              label={buildFullOrFirst.caption ?? "Image"}
              kind={buildFullOrFirst.kind}
            />
          </Reveal>
        ) : null}
        {(afterBuild === "full-pair" ||
          afterBuild === "pair" ||
          afterBuild === "pair-full") &&
        buildSecond &&
        buildThird ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
            <Reveal>
              <CaseMedia
                src={buildSecond.src}
                label={buildSecond.caption ?? "Image"}
                kind={buildSecond.kind}
              />
            </Reveal>
            <Reveal delay={60}>
              <CaseMedia
                src={buildThird.src}
                label={buildThird.caption ?? "Image"}
                kind={buildThird.kind}
              />
            </Reveal>
          </div>
        ) : buildSecond ? (
          <Reveal>
            <CaseMedia
              src={buildSecond.src}
              label={buildSecond.caption ?? "Image"}
              kind={buildSecond.kind}
            />
          </Reveal>
        ) : null}
        {buildAfterPairFull ? (
          <Reveal>
            <CaseMedia
              src={buildAfterPairFull.src}
              label={buildAfterPairFull.caption ?? "Image"}
              kind={buildAfterPairFull.kind}
            />
          </Reveal>
        ) : null}
      </section>

      {/* Results — Figma 10613:51099 (full viewport, brand purple cards) */}
      <section
        id="results"
        className="flex min-h-dvh scroll-mt-24 items-center bg-[#1e1e1e] pt-16 pb-24 text-white md:pt-20 md:pb-32"
      >
        <Reveal className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 md:gap-24 md:px-10 lg:px-20">
          <div className="max-w-[604px]">
            <div className="flex items-center gap-4 font-mono text-[14px] uppercase leading-[1.1] tracking-[0.05em]">
              <span>03</span>
              <span>Result</span>
            </div>
            <h2
              className="mt-8 font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              Proof it worked.
            </h2>
            <p className="mt-8 text-[16px] leading-[1.3] tracking-[-0.02em] text-white/80">
              {c.outcome}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
            {(c.results.length > 0
              ? c.results
              : [
                  { value: c.metric, label: c.metricLabel },
                  { value: c.year, label: "Delivery year" },
                  { value: c.serviceSlug, label: "Engagement" },
                ]
            )
              .slice(0, 3)
              .map((result, i) => (
                <div
                  key={`${result.value}-${i}`}
                  className="flex h-[320px] flex-col justify-between rounded-[24px] bg-[#c7b0fe] p-8 text-white md:h-[360px] md:p-10"
                >
                  <p
                    className="font-display font-medium tracking-[-0.03em]"
                    style={{
                      fontSize: "clamp(2.75rem, 6vw, 6rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {result.value}
                  </p>
                  <div className="border-t border-white/25 pt-4">
                    <p className="text-[16px] leading-[1.35] tracking-[-0.02em]">
                      {result.label}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Reveal>
      </section>

      {/* Credits — desktop 10613:52653 / mobile 10614:53055 (375 × 575 hug) */}
      <section
        id="credits"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-6 py-20 md:px-10 lg:px-20 md:py-[100px]"
      >
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:justify-between lg:gap-24">
          <Reveal className="w-full shrink-0 lg:w-auto">
            <p className="font-mono text-[14px] uppercase leading-[1.1] tracking-[0.05em] text-[#6b6b6b]">
              06 Credits
            </p>
            <h2
              className="mt-4 font-display font-medium tracking-[-0.03em] text-[#1e1e1e]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}
            >
              Credits
            </h2>
          </Reveal>
          <Reveal
            delay={60}
            className="flex w-full flex-col items-start gap-6 lg:max-w-[360px] lg:gap-5 lg:pt-1"
          >
            {[
              ...DEFAULT_CREDITS,
              { role: "Client partner", name: c.quote.name },
            ].map((credit) => (
              <div
                key={credit.role}
                className="flex flex-col gap-0.5 text-[16px] leading-[1.2] tracking-[-0.02em]"
              >
                <p className="text-[#6b6b6b]">{credit.role}</p>
                <p className="font-medium text-[#1e1e1e]">{credit.name}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Closing image — 3626:16569 */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-20">
        <Reveal>
          <CaseMedia
            src={closing?.src}
            label={closing?.caption ?? "Image"}
            kind={closing?.kind}
          />
        </Reveal>
      </section>

      {/* Related cases — Figma 10613:52831 */}
      <MoreWork
        eyebrow="Related case"
        eyebrowMark={4}
        title={null}
        showAllLink={false}
        cards={relatedCards}
        bg="bg-white"
        ctaLabel="Read more"
      />

      <FinalCta />
    </div>
  );
}

/** Meta grid — Figma 10613:51013 / mobile 10856:7028 */
function MetaCol({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <p className="font-mono text-[14px] font-medium uppercase leading-[1.35] tracking-[-0.02em] text-[#6b6b6b]">
        {label}
      </p>
      <p className="break-words text-[16px] leading-[1.35] tracking-[-0.02em] text-[#1e1e1e]">
        {value}
      </p>
    </div>
  );
}
