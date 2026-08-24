"use client";

import { Link } from "@/components/Link";
import { useEffect } from "react";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Reveal } from "@/components/site/Reveal";
import type { CaseStudy } from "@/components/site/cases-data";

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
  return client.replace(/\s+/g, "").toUpperCase();
}

function CaseMedia({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] bg-[#f5f5f5] ${className}`.trim()}
    >
      <ImagePlaceholder label={label} className="min-h-[16rem] md:min-h-0" />
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
      className={`flex min-h-[18.5rem] flex-col justify-between rounded-[24px] border border-[#1e1e1e]/20 p-7 ${className}`.trim()}
    >
      <div>
        <p className="font-mono text-[11px] uppercase leading-[16.5px] tracking-[0.05em] text-[#6b6b6b]">
          {String(index).padStart(2, "0")}
        </p>
        <h3 className="mt-[19px] font-display text-[24px] font-medium leading-7 text-[#1e1e1e]">
          {title}
        </h3>
      </div>
      <p className="text-[14px] leading-[22.75px] text-[#6b6b6b]">{body}</p>
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
export function WorkCasePage({ c }: { c: CaseStudy }) {
  const detailCards = getCaseDetailCards(c);
  const mark = brandMark(c.client);
  const stack = c.displayTags.length > 0 ? c.displayTags : c.keyFeatures;
  const visuals = c.screens;

  useEffect(() => {
    // Lenis owns scroll — SmoothScroll resets on route change; keep as fallback.
    window.scrollTo(0, 0);
  }, [c.slug]);

  return (
    <div className="kbpm-hi-fi bg-white text-[#1e1e1e]">
      {/* Hero brand panel — Figma 3626:16403 */}
      <section className="px-6 pb-8 pt-4 md:px-8 md:pb-8 md:pt-2">
        <div className="relative mx-auto flex h-[min(57.5rem,85dvh)] min-h-[28rem] w-full max-w-[1376px] items-center justify-center overflow-hidden rounded-[24px] bg-[#1e1e1e]">
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
        </div>
      </section>

      {/* Project identity + meta — Figma 3626:16446 */}
      <section className="mx-auto max-w-[1440px] px-6 py-10 md:px-[72px] md:py-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <Reveal className="flex max-w-[440px] flex-col gap-4">
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center rounded-full border border-black/10 px-4 py-2 font-mono text-[14px] font-light tracking-[0.05em] text-[#1e1e1e]">
                {c.service.split("→")[0]?.trim() || "Service"}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#c9ff6e] px-4 py-2 font-mono text-[14px] font-light tracking-[0.05em] text-[#1e1e1e]">
                {c.industry.split("/")[0]?.trim() || c.industry}
              </span>
            </div>
            <h2
              className="font-display font-medium uppercase tracking-[-0.02em] text-[#1e1e1e]"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.1 }}
            >
              {mark}
            </h2>
            <p className="text-[20px] font-medium leading-[1.1] tracking-[-0.03em] text-[#1e1e1e]">
              {c.title}
            </p>
          </Reveal>

          <Reveal
            delay={80}
            className="grid w-full max-w-[514px] grid-cols-2 gap-5 sm:grid-cols-4 lg:pt-10"
          >
            <MetaCol label="Client" value={c.client} />
            <MetaCol label="Year" value={c.year} />
            <MetaCol label="Service" value={c.service} />
            <div>
              <p className="font-mono text-[14px] font-medium leading-[1.35] tracking-[-0.02em] text-[#1e1e1e]">
                Stack
              </p>
              <ul className="mt-[22px] space-y-[5px] text-[16px] leading-[1.35] tracking-[-0.02em] text-[#1e1e1e]">
                {stack.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lede — 3626:16468 */}
      <section className="mx-auto max-w-[1440px] px-6 pb-10 md:px-[72px] md:pb-14">
        <Reveal>
          <p className="max-w-[1296px] font-display text-[clamp(1.35rem,2.4vw,1.875rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#1e1e1e]">
            {c.context ?? c.outcome}
          </p>
        </Reveal>
      </section>

      {/* Primary image — 3626:16471 */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-[72px]">
        <Reveal>
          <CaseMedia
            label={visuals[0]?.caption ?? "Hero image"}
            className="aspect-[1296/700] w-full"
          />
        </Reveal>
      </section>

      {/* 01 Problem — 3626:16473 */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-20 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <Reveal className="max-w-[518px] shrink-0 lg:sticky lg:top-28">
            <SectionEyebrow mark="01" label="Problem" />
            <h2
              className="mt-8 font-display font-medium tracking-[-0.03em] text-[#1e1e1e]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              The problem
              <br />
              behind the brief
            </h2>
            <p className="mt-8 text-[16px] leading-[1.3] tracking-[-0.02em] text-[#6b6b6b]">
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

      {/* Media grid — 3626:16501 */}
      <section className="mx-auto max-w-[1440px] space-y-6 px-6 md:space-y-[24px] md:px-[72px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
          <Reveal>
            <CaseMedia
              label={visuals[1]?.caption ?? "Image"}
              className="aspect-[636/700] w-full"
            />
          </Reveal>
          <Reveal delay={60}>
            <CaseMedia
              label={visuals[2]?.caption ?? "Image"}
              className="aspect-[636/700] w-full"
            />
          </Reveal>
        </div>
        <Reveal>
          <CaseMedia
            label={visuals[3]?.caption ?? "Image"}
            className="aspect-[1296/700] w-full"
          />
        </Reveal>
      </section>

      {/* 02 Build — Figma 3626:16507 (header + 3-col cards) */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-20 md:py-20">
        <div className="flex flex-col gap-12 md:gap-[49px]">
          <Reveal className="flex max-w-[604px] flex-col gap-8">
            <SectionEyebrow mark="02" label="Build" />
            <div className="flex flex-col gap-8">
              <h2
                className="font-display font-medium tracking-[-0.03em] text-[#1e1e1e]"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                How we built the right thing, and built it right
              </h2>
              <p className="text-[16px] leading-[1.3] tracking-[-0.02em] text-[#6b6b6b]">
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
                  className="h-full md:min-h-[297px]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media stack — 3626:16535 */}
      <section className="mx-auto max-w-[1440px] space-y-6 px-6 md:space-y-[24px] md:px-[72px]">
        <Reveal>
          <CaseMedia
            label={visuals[4]?.caption ?? "Image"}
            className="aspect-[1296/700] w-full"
          />
        </Reveal>
        <Reveal>
          <CaseMedia
            label={visuals[5]?.caption ?? "Image"}
            className="aspect-[1296/700] w-full"
          />
        </Reveal>
      </section>

      {/* 04 Results — 3626:16540 */}
      <section className="px-6 py-16 md:px-20 md:py-20">
        <Reveal>
          <div className="mx-auto flex max-w-[1280px] flex-col gap-16 rounded-none bg-[#1e1e1e] p-8 text-white md:gap-24 md:p-10">
            <div className="max-w-[604px]">
              <div className="flex items-center gap-4 font-mono text-[14px] uppercase leading-[1.1] tracking-[0.05em]">
                <span>04</span>
                <span>Results / What actually happened</span>
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
                    className="flex min-h-[16rem] flex-col justify-between rounded-[24px] bg-[#f5f5f5] p-10 text-[#1e1e1e] md:min-h-[26rem]"
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
                    <p className="text-[16px] leading-[1.35] tracking-[-0.02em]">
                      {result.label}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 06 Credits — 3626:16563 */}
      <section className="mx-auto max-w-[1440px] px-6 py-14 md:px-[72px] md:py-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[12rem]">
          <Reveal className="max-w-[547px] shrink-0">
            <p className="text-[14px] font-medium leading-[1.28] tracking-[-0.02em] text-[#1e1e1e]">
              06 CREDITS
            </p>
            <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#1e1e1e]">
              Who made it happen?
            </h2>
          </Reveal>
          <Reveal delay={60} className="space-y-5 text-[16px] leading-[1.35] tracking-[-0.02em] text-[#1e1e1e]">
            {DEFAULT_CREDITS.map((credit) => (
              <div key={credit.role}>
                <p>{credit.role}</p>
                <p className="font-medium">{credit.name}</p>
              </div>
            ))}
            <div>
              <p>Client partner</p>
              <p className="font-medium">{c.quote.name}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing image — 3626:16569 */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-[72px]">
        <Reveal>
          <CaseMedia
            label={visuals[6]?.caption ?? visuals[visuals.length - 1]?.caption ?? "Image"}
            className="aspect-[1296/700] w-full"
          />
        </Reveal>
      </section>

      {/* CTA — 3626:16571 */}
      <section className="mx-auto max-w-[1440px] px-6 py-14 md:px-[72px] md:py-14">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <h2
              className="max-w-[641px] font-display font-semibold tracking-[-0.03em] text-[#1e1e1e]"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.1 }}
            >
              Building something similar? Let’s talk.
            </h2>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#c9ff6e] px-6 py-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-90"
            >
              Let’s talk
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
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function MetaCol({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[14px] font-medium leading-[1.35] tracking-[-0.02em] text-[#1e1e1e]">
        {label}
      </p>
      <p className="mt-[22px] text-[16px] leading-[1.35] tracking-[-0.02em] text-[#1e1e1e]">
        {value}
      </p>
    </div>
  );
}
