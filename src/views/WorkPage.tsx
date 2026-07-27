"use client";

import { Link } from "@/components/Link";
import { useState } from "react";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Reveal } from "@/components/site/Reveal";
import { cases, filters, type Filter } from "@/components/site/cases-data";

export function WorkPage() {
  const [active, setActive] = useState<Filter>("All");

  return (
    <main>
      {/* Header */}
      <section className="mx-auto max-w-[1440px] px-6 pt-24 pb-10 md:px-8 md:pt-32 md:pb-14">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
            § Work / Index — 2025
          </p>
        </div>
        <h1
          className="font-display mt-8 max-w-5xl text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.045em",
            fontWeight: 500,
          }}
        >
          Five builds. Real clients. <span className="text-accent">Real problems</span> solved.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          We design and build digital products end to end — from validated idea to working product.
        </p>
      </section>

      {/* Filter row */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-8">
        <div className="flex flex-wrap items-center gap-2 border-y border-border py-5 md:gap-3">
          <span className="font-mono-label mr-2 hidden uppercase tracking-wider text-muted-foreground md:inline">
            Filter /
          </span>
          {filters.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-foreground hover:border-foreground"
                }`}
              >
                {f}
              </button>
            );
          })}
          <span className="font-mono-label ml-auto text-muted-foreground">
            {active === "All"
              ? `${cases.length} projects`
              : `${cases.filter((c) => c.tags.includes(active)).length} of ${cases.length}`}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1440px] px-6 pt-12 pb-20 md:px-8 md:pt-16 md:pb-28">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {cases.map((c, i) => {
            const match = active === "All" || c.tags.includes(active);
            return (
              <Reveal key={c.client} delay={i * 60}>
                <article
                  className="group transition-all duration-500"
                  style={{
                    opacity: match ? 1 : 0.18,
                    filter: match ? "none" : "saturate(0.2)",
                    pointerEvents: match ? "auto" : "none",
                  }}
                >
                  <Link to="/work/$slug" params={{ slug: c.slug }} className="block">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-foreground md:rounded-[28px]">
                      <ImagePlaceholder label="Image" />
                      <div className="pointer-events-none absolute inset-0 flex items-start justify-between p-5 md:p-7">
                        <span className="font-mono-label rounded-full bg-background/90 px-3 py-1.5 text-foreground backdrop-blur">
                          Case {c.n} / {c.client}
                        </span>
                      </div>
                    </div>
                  </Link>


                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h2
                        className="font-display text-foreground"
                        style={{
                          fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                          letterSpacing: "-0.03em",
                          lineHeight: 1.05,
                          fontWeight: 500,
                        }}
                      >
                        <span className="text-muted-foreground">{c.client} —</span> {c.title}
                      </h2>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.displayTags.map((t) => (
                          <span
                            key={t}
                            className="font-mono-label rounded-full border border-border px-3 py-1 text-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link
                        to="/work/$slug"
                        params={{ slug: c.slug }}
                        className="mt-5 inline-flex items-center gap-2 text-sm text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                      >

                        View case
                        <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                          <path
                            d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Footer CTA - full-bleed blue */}
      <section className="w-full bg-accent text-accent-foreground">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-end gap-10 px-6 py-24 md:grid-cols-12 md:gap-10 md:px-8 md:py-32">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-foreground" />
              <p className="font-mono-label uppercase tracking-wider text-accent-foreground/80">
                § Next / Say hello
              </p>
            </div>
            <h2
              className="font-display mt-8 text-accent-foreground"
              style={{
                fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                fontWeight: 500,
              }}
            >
              See something you like? Let's talk about yours.
            </h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-between gap-6 rounded-full bg-accent-foreground px-6 py-4 text-sm font-medium text-accent transition-transform hover:-translate-y-px"
            >
              Start a project
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
      </section>
    </main>
  );
}
