import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";

/**
 * Intro band under hero — Figma 3626:4308.
 * Rewrite positioning (not agency-only).
 */
export function IntroBand() {
  return (
    <section className="kbpm-hi-fi bg-white px-6 py-12 md:px-10 md:py-16 lg:px-20 lg:py-[80px]">
      <Reveal>
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-center lg:gap-16">
          <p
            className="max-w-[40rem] text-[#1e1e1e]"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            From validated idea to working product. End to end — when the idea
            outgrows the team.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#006ff7] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
            >
              Start a project
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
            <Link
              to="/work"
              className="inline-flex h-[55px] items-center justify-center rounded-full border border-[#d9d9d9] px-6 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-70"
            >
              See the work
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
