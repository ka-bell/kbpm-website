import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";
import { SectionEyebrow, type BrandMark } from "./SectionEyebrow";
import { getCase } from "./cases-data";

export type WorkCardConfig = {
  slug: string;
  image: string;
  kind?: string;
  kindTone?: "lime" | "blue";
};

const DEFAULT_CARDS: WorkCardConfig[] = [
  {
    slug: "mix-interiors",
    image: "/work/card-mix.jpg",
    kind: "case study",
    kindTone: "lime",
  },
  {
    slug: "virtue-worldwide",
    image: "/work/card-virtue.jpg",
    kind: "case study",
    kindTone: "blue",
  },
  {
    slug: "hopplay",
    image: "/work/card-hopplay.jpg",
    kind: "case study",
    kindTone: "lime",
  },
];

const CASE_IMAGES: Record<string, string> = {
  "mix-interiors": "/work/card-mix.jpg",
  "virtue-worldwide": "/work/card-virtue.jpg",
  hopplay: "/work/card-hopplay.jpg",
  spilnews: "/work/spilnews-featured.jpg",
  academion: "/services/support-graphic.png",
};

type MoreWorkProps = {
  /** Section eyebrow label */
  eyebrow?: string;
  eyebrowMark?: BrandMark;
  /** Omit for eyebrow-only header (featured engagement) */
  title?: string | null;
  showAllLink?: boolean;
  /** Defaults to homepage three cards */
  cards?: readonly WorkCardConfig[];
  /** Section background */
  bg?: string;
  /** Secondary meta next to case-study tag — defaults to metric · metricLabel */
  metaMode?: "metric" | "none";
  ctaLabel?: string;
};

/**
 * Work card grid — Figma 3626:4494 (3-up) / 3626:5219 (2-up asymmetric).
 */
export function MoreWork({
  eyebrow = "Selected work",
  eyebrowMark = 5,
  title = "Recent work.",
  showAllLink = true,
  cards = DEFAULT_CARDS,
  bg = "bg-[#f5f5f5]",
  metaMode = "none",
  ctaLabel = "View case",
}: MoreWorkProps) {
  const resolved = cards
    .map((card, i) => {
      const c = getCase(card.slug);
      if (!c) return null;
      return {
        ...card,
        case: c,
        image: card.image || CASE_IMAGES[card.slug] || c.img,
        kind: card.kind ?? "case study",
        kindTone: card.kindTone ?? (i % 2 === 0 ? "lime" : "blue"),
      };
    })
    .filter(Boolean);

  if (resolved.length === 0) return null;

  const twoUp = resolved.length === 2;

  return (
    <section
      className={`kbpm-hi-fi px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px] ${bg}`}
    >
      <div
        className={`mx-auto flex max-w-[1440px] flex-col ${
          title ? "gap-12 lg:gap-[72px]" : "gap-8 md:gap-10"
        }`}
      >
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-[720px] flex-col gap-8">
              <SectionEyebrow label={eyebrow} mark={eyebrowMark} />
              {title ? (
                <h2
                  className="font-display text-[#1e1e1e]"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    fontWeight: 500,
                  }}
                >
                  {title}
                </h2>
              ) : null}
            </div>

            {showAllLink ? (
              <Link
                to="/work"
                className="inline-flex h-[55px] shrink-0 items-center justify-center rounded-full border border-[#d9d9d9] px-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-70"
              >
                All case studies
              </Link>
            ) : null}
          </div>
        </Reveal>

        <div
          className={
            twoUp
              ? "flex flex-col gap-5 md:flex-row md:items-start md:gap-[21px]"
              : "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-[21px]"
          }
        >
          {resolved.map((card, i) => {
            if (!card) return null;
            const c = card.case;
            const industry = c.industry.split("/")[0]?.trim() ?? c.industry;
            // Figma 3626:5219 — both 2-up cards use lime case-study tags
            const kindTone = twoUp ? "lime" : card.kindTone;
            const kindClass =
              kindTone === "blue"
                ? "bg-[#006ff7] text-white"
                : "bg-[#c9ff6e] text-[#1e1e1e]";
            const meta =
              metaMode === "metric"
                ? `${c.metric} · ${c.metricLabel}`
                : null;

            return (
              <Reveal
                key={c.slug}
                delay={i * 70}
                className={
                  twoUp
                    ? i === 0
                      ? "min-w-0 flex-1"
                      : "w-full shrink-0 md:w-[min(100%,26rem)] lg:w-[412px]"
                    : undefined
                }
              >
                <Link
                  to="/work/$slug"
                  params={{ slug: c.slug }}
                  className="group flex h-full flex-col gap-5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:h-[540px] sm:aspect-auto">
                    <img
                      src={card.image}
                      alt=""
                      width={800}
                      height={1000}
                      decoding="async"
                      className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span className="bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase text-white backdrop-blur-[25px]">
                        {c.displayTags[0] ?? c.tags[0]}
                      </span>
                      <span className="bg-white/20 px-2.5 py-1 font-mono text-[10px] uppercase text-white backdrop-blur-[25px]">
                        {industry}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-6 md:gap-7">
                    <div className="flex flex-col gap-3.5">
                      <div className="flex flex-wrap items-center gap-3.5">
                        <span
                          className={`inline-flex w-fit items-center px-2 py-2 font-mono text-[10px] uppercase leading-[1.1] ${kindClass}`}
                        >
                          {card.kind}
                        </span>
                        {meta ? (
                          <>
                            <span
                              className="hidden h-px w-4 bg-[#d9d9d9] sm:block"
                              aria-hidden
                            />
                            <span className="text-[14px] tracking-[-0.05em] text-[#6b6b6b]">
                              {meta}
                            </span>
                          </>
                        ) : null}
                      </div>
                      <h3
                        className="font-display text-[#1e1e1e]"
                        style={{
                          fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                          lineHeight: 1.1,
                          letterSpacing: "-0.03em",
                          fontWeight: 500,
                        }}
                      >
                        {c.client}
                      </h3>
                    </div>

                    <p className="text-[16px] leading-[1.3] tracking-[-0.02em] text-[#6b6b6b]">
                      {c.outcome}
                    </p>

                    <div className="mt-auto flex flex-col gap-3.5">
                      <div className="h-px w-full bg-[#d9d9d9]" />
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[12px] tracking-[-0.01em] text-[#6b6b6b]">
                          {c.year}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.6px] text-[#6b6b6b] transition-opacity group-hover:opacity-70">
                          {ctaLabel}
                          <img
                            src="/hero/arrow-outward-dark.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="size-5 opacity-60"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Build MoreWork cards from case slugs (service group featured). */
export function workCardsFromSlugs(slugs: string[]): WorkCardConfig[] {
  return slugs.map((slug, i) => ({
    slug,
    image: CASE_IMAGES[slug] ?? `/services/validate-graphic.png`,
    kind: "case study",
    kindTone: (i % 2 === 0 ? "lime" : "blue") as "lime" | "blue",
  }));
}
