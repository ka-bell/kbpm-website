import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";
import { Tag } from "./Tag";
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
    /* Figma 3626:4468 — frame 1440 with 80px inset → 1280 content (not 1440 content). */
    <section className="kbpm-hi-fi bg-white pb-5 pt-10 md:py-20 lg:py-[80px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-5 md:gap-12 md:px-10 lg:px-20">
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
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
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
            className="group relative flex h-[534px] w-full flex-col justify-end overflow-hidden rounded-[16px] p-6 md:h-auto md:aspect-[1280/773] md:min-h-0 md:rounded-[24px] md:p-12 lg:p-16"
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
                <Tag variant="white">{serviceTag}</Tag>
                <Tag variant="lime">{industryTag}</Tag>
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
