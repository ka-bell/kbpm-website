import { Link } from "@/components/Link";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";

export function FeaturedCase() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-20 pb-20 md:px-8 md:pt-24 md:pb-28">
      <Reveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <div>
            <p className="eyebrow">§ 02 / Featured case — 2025</p>
            <h2
              className="font-display mt-5 text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 500,
              }}
            >
              SpilNews.
            </h2>
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm text-foreground transition-colors hover:border-foreground"
          >
            See the full case
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          </Link>
        </div>
      </Reveal>

      {/* Big image card */}
      <Reveal delay={100}>
        <div className="relative overflow-hidden rounded-[28px] bg-surface-alt md:rounded-[40px]">
          <div className="relative aspect-[16/10] w-full">
            <ImagePlaceholder label="Image" />
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-10">
              <div className="flex items-start justify-between">
                <span className="font-mono-label rounded-full bg-background/90 px-3 py-1.5 text-foreground backdrop-blur">
                  Case 02 / SpilNews
                </span>
                <span className="font-mono-label hidden rounded-full bg-background/90 px-3 py-1.5 text-foreground backdrop-blur md:inline-block">
                  Product build · 2025
                </span>
              </div>
              <div>
                <h3
                  className="font-display max-w-3xl text-background"
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 3.75rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.035em",
                    fontWeight: 500,
                  }}
                >
                  A video-native news platform Gen Z actually owns.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Case meta strip */}
      <Reveal delay={160}>
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8 md:mt-10 md:grid-cols-4 md:gap-10">
          <div>
            <p className="eyebrow">Client</p>
            <p className="mt-2 text-base text-foreground">SpilNews</p>
          </div>
          <div>
            <p className="eyebrow">Load time</p>
            <p className="mt-2 text-base text-foreground">&lt; 1.5s on 3G</p>
          </div>
          <div>
            <p className="eyebrow">Audience</p>
            <p className="mt-2 text-base text-foreground">15–25 yrs</p>
          </div>
          <div>
            <p className="eyebrow">Stack</p>
            <p className="mt-2 text-base text-foreground">Next.js · Headless CMS · EU infra</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
