import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { getCase } from "./cases-data";

const CARDS = [
  {
    slug: "mix-interiors",
    image: "/work/card-mix.jpg",
    kind: "case study" as const,
    kindTone: "lime" as const,
  },
  {
    slug: "virtue-worldwide",
    image: "/work/card-virtue.jpg",
    kind: "case study" as const,
    kindTone: "blue" as const,
  },
  {
    slug: "hopplay",
    image: "/work/card-hopplay.jpg",
    kind: "case study" as const,
    kindTone: "lime" as const,
  },
] as const;

/**
 * 3-column portfolio grid — Figma 3626:4494.
 * Rewrite section title + case data.
 */
export function MoreWork() {
  return (
    <section className="kbpm-hi-fi bg-[#f5f5f5] px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 lg:gap-[72px]">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex max-w-[720px] flex-col gap-8">
              <SectionEyebrow label="Selected work" mark={5} />
              <h2
                className="font-display text-[#1e1e1e]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  fontWeight: 500,
                }}
              >
                Recent work.
              </h2>
            </div>

            <Link
              to="/work"
              className="inline-flex h-[55px] shrink-0 items-center justify-center rounded-full border border-[#d9d9d9] px-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-70"
            >
              All case studies
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-[21px]">
          {CARDS.map((card, i) => {
            const c = getCase(card.slug);
            if (!c) return null;
            const industry = c.industry.split("/")[0]?.trim() ?? c.industry;
            const kindClass =
              card.kindTone === "blue"
                ? "bg-[#006ff7] text-white"
                : "bg-[#c9ff6e] text-[#1e1e1e]";

            return (
              <Reveal key={c.slug} delay={i * 70}>
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

                  <div className="flex flex-1 flex-col gap-7">
                    <div className="flex flex-col gap-3.5">
                      <span
                        className={`inline-flex w-fit items-center px-2 py-2 font-mono text-[10px] uppercase leading-[1.1] ${kindClass}`}
                      >
                        {card.kind}
                      </span>
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
                          View case
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
