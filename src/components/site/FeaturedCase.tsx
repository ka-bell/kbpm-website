import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { getCase } from "./cases-data";

/**
 * Full-bleed featured portfolio item — Figma 3626:4468.
 * Wireframe copy stays leading; tags from case data.
 */
export function FeaturedCase() {
  const c = getCase("spilnews");
  const serviceTag = c?.serviceSlug ? c.serviceSlug : "build";
  const industryTag = c?.industry?.split("/")[0]?.trim() ?? "Media";
  const overlayTitle =
    "A video-native news platform Gen Z actually owns.";

  return (
    <section className="kbpm-hi-fi bg-white px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-5">
              <SectionEyebrow
                label={`Featured case — ${c?.year ?? "2025"}`}
                mark={6}
              />
              <h2
                className="font-display text-[#1e1e1e]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1.07,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                {c?.client ?? "SpilNews"}.
              </h2>
            </div>

            <Link
              to="/work/$slug"
              params={{ slug: c?.slug ?? "spilnews" }}
              className="inline-flex h-[55px] items-center justify-center rounded-full border border-[#d9d9d9] px-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-70"
            >
              See the full case
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Link
            to="/work/$slug"
            params={{ slug: c?.slug ?? "spilnews" }}
            className="group relative flex min-h-[28rem] w-full flex-col justify-end overflow-hidden rounded-2xl p-8 sm:min-h-[36rem] sm:p-12 lg:min-h-[48rem] lg:p-16"
          >
            <img
              src="/work/spilnews-featured.jpg"
              alt={
                c
                  ? `${c.client} — ${c.title}`
                  : "SpilNews product on laptop"
              }
              width={2400}
              height={1800}
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/50 to-transparent mix-blend-multiply"
              aria-hidden
            />

            <div className="relative z-[1] flex max-w-4xl flex-col gap-4">
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-[14px] uppercase tracking-[0.7px] text-white backdrop-blur-[2px]">
                  {serviceTag}
                </span>
                <span className="inline-flex items-center rounded-full bg-[#c9ff6e] px-4 py-2 font-mono text-[14px] uppercase tracking-[0.7px] text-[#1e1e1e]">
                  {industryTag}
                </span>
              </div>
              <p
                className="font-display max-w-[22ch] text-white sm:max-w-none"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  fontWeight: 600,
                }}
              >
                {overlayTitle}
              </p>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
