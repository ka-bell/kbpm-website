import { Link } from "@tanstack/react-router";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1440px] px-6 pt-8 pb-8 md:px-8 md:pt-10 md:pb-12">
        {/* Big headline */}
        <div className="pt-8 md:pt-12">
          <Reveal delay={80}>
            <h1
              className="font-display text-foreground max-w-[18ch]"
              style={{
                fontSize: "clamp(2.25rem, 5.8vw, 5.75rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 500,
              }}
            >
              We build digital products when the idea outgrows the team.
            </h1>
          </Reveal>
        </div>

        {/* Big flagship image card */}
        <Reveal delay={160}>
          <div className="mt-10 overflow-hidden rounded-[24px] bg-surface-alt md:mt-14 md:rounded-[32px]">
            <div className="relative aspect-[16/9] w-full md:aspect-[24/9]">
              <ImagePlaceholder label="Image" />
              {/* Corner labels overlay */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                <div className="flex items-start justify-between">
                  <span className="font-mono-label rounded-full bg-background/90 px-3 py-1.5 text-foreground backdrop-blur">
                    ● Live · fig_01
                  </span>
                  <span className="font-mono-label hidden rounded-full bg-background/90 px-3 py-1.5 text-foreground backdrop-blur md:inline-block">
                    Amsterdam · CET
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-mono-label rounded-full bg-foreground/90 px-3 py-1.5 text-background backdrop-blur">
                    Studio index / 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom row: subline + CTA */}
        <Reveal delay={220}>
          <div className="mt-10 grid grid-cols-1 items-end gap-8 md:mt-14 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="text-xl text-foreground md:text-2xl" style={{ letterSpacing: "-0.01em" }}>
                Seven years as a company. Built for scale. Still trusted to maintain it.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:col-span-5 md:justify-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-px"
              >
                Start a project
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
