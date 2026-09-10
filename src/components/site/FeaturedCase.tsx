import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { getCase } from "./cases-data";

/**
 * Featured portfolio item — desktop Figma 3626:4468; mobile 3674:2798.
 */
export function FeaturedCase() {
  const c = getCase("spilnews");
  const serviceTag = c?.serviceSlug ? c.serviceSlug : "build";
  const industryTag = c?.industry?.split("/")[0]?.trim() ?? "Media";
  const overlayTitle = (
    <>
      A video-native news platform
      <br className="md:hidden" />{" "}
      Gen Z actually owns.
    </>
  );

  return (
    <section className="kbpm-hi-fi bg-white px-5 pb-5 pt-10 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:gap-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-4 md:gap-5">
              <SectionEyebrow
                label={`Featured case — ${c?.year ?? "2025"}`}
                mark={6}
              />
              <h2
                className="font-display text-[#1e1e1e]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1.2,
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
              className="hidden h-[55px] items-center justify-center rounded-full border border-[#d9d9d9] px-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-70 md:inline-flex"
            >
              See the full case
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Link
            to="/work/$slug"
            params={{ slug: c?.slug ?? "spilnews" }}
            className="group relative flex h-[534px] w-full flex-col justify-end overflow-hidden rounded-2xl p-6 md:h-auto md:min-h-[36rem] md:rounded-2xl md:p-12 lg:min-h-[48rem] lg:p-16"
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
              className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/80 to-transparent mix-blend-multiply md:h-[70%] md:from-black/50"
              aria-hidden
            />

            <div className="relative z-[1] flex max-w-4xl flex-col gap-4">
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center rounded-full bg-white px-4 py-2 font-mono text-[10px] uppercase tracking-[0.5px] text-[#1e1e1e] md:border md:border-white/20 md:bg-white/10 md:text-[14px] md:tracking-[0.7px] md:text-white md:backdrop-blur-[2px]">
                  {serviceTag}
                </span>
                <span className="inline-flex items-center rounded-full bg-[#c9ff6e] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.5px] text-[#1e1e1e] md:text-[14px] md:tracking-[0.7px]">
                  {industryTag}
                </span>
              </div>
              <p
                className="font-display text-white"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
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
