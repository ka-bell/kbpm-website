"use client";

import { Link } from "@/components/Link";
import { useRef } from "react";
import { ImagePlaceholder } from "./ImagePlaceholder";

const cases = [
  {
    slug: "mix-interiors",
    n: "03",
    client: "Mix Interiors",
    tag: "Product Discovery",
    year: "2026",
    result: "Interior imagery connected to manufacturer product data.",
    metric: "Interactive",
    metricLabel: "Product discovery",
  },
  {
    slug: "virtue-worldwide",
    n: "04",
    client: "Virtue Worldwide",
    tag: "Network Intelligence",
    year: "2025",
    result: "Interactive knowledge graphs for cultural strategy work.",
    metric: "Global",
    metricLabel: "Strategy support",
  },
  {
    slug: "hopplay",
    n: "05",
    client: "HopPlay",
    tag: "Travel Platform",
    year: "2026",
    result: "Location-based adventures launched for multiple destinations.",
    metric: "2",
    metricLabel: "Live destinations",
  },
  {
    slug: "academion",
    n: "06",
    client: "Academion",
    tag: "Higher Education",
    year: "2024",
    result: "+85% team hours saved on accreditation workflows.",
    metric: "+85%",
    metricLabel: "Team hours saved",
  },
];

export function MoreWork() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.34;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">§ 04 / Highlighted</p>
            <h2
              className="font-display mt-5 text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 500,
              }}
            >
              Recent work.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="inline-flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:bg-surface-alt"
                aria-label="Previous projects"
              >
                <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M11 7H3m0 0 3.5-3.5M3 7l3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="inline-flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:bg-surface-alt"
                aria-label="Next projects"
              >
                <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 border border-border px-5 py-3 text-sm text-foreground transition-colors hover:bg-surface-alt"
            >
              All case studies
              <svg
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cases.map((c) => (
          <Link
            key={c.slug}
            to="/work/$slug"
            params={{ slug: c.slug }}
            className="group relative min-h-[75svh] w-[85vw] shrink-0 snap-start overflow-hidden border border-border border-l-0 first:border-l sm:w-[45vw] md:min-h-[80svh] md:w-[33.333vw]"
          >
            <div className="absolute inset-0">
              <ImagePlaceholder
                label={`${c.client} visual`}
                className="min-h-full transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/30" />
            </div>

            <div className="relative z-10 flex min-h-[75svh] items-end p-5 md:min-h-[80svh] md:p-6 lg:p-8">
              <div className="w-full border border-background/20 bg-background/90 p-5 backdrop-blur-md md:p-6">
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  Case {c.n} / {c.tag}
                </p>
                <h3
                  className="font-display mt-4 text-foreground"
                  style={{
                    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.035em",
                    fontWeight: 500,
                  }}
                >
                  {c.client}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.result}
                </p>

                <dl className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono-label uppercase tracking-wider text-muted-foreground">
                      Year
                    </dt>
                    <dd className="mt-1.5 text-sm text-foreground">{c.year}</dd>
                  </div>
                  <div>
                    <dt className="font-mono-label uppercase tracking-wider text-muted-foreground">
                      Signal
                    </dt>
                    <dd className="mt-1.5 text-sm text-foreground">
                      {c.metric} · {c.metricLabel}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    View case
                  </span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M3 11 11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
