import { Link } from "@/components/Link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type CtaBlockProps = {
  eyebrow?: string;
  title?: ReactNode;
  ctaLabel?: string;
  to?: "/contact";
  search?: Record<string, string | undefined>;
  aside?: ReactNode;
};

export function CtaBlock({
  eyebrow = "§ 06 / Say hello",
  title = (
    <>
      <span className="text-accent">Tell us</span> what you're building.
    </>
  ),
  ctaLabel = "Start a project",
  to = "/contact",
  search,
  aside,
}: CtaBlockProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                {eyebrow}
              </p>
            </div>
            <h2
              className="font-display mt-8 text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                fontWeight: 500,
              }}
            >
              {title}
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 md:col-span-4">
            <Link
              to={to}
              search={search}
              className="group inline-flex items-center gap-3 text-sm font-medium text-foreground"
            >
              {ctaLabel}
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
                  strokeLinecap="square"
                />
              </svg>
            </Link>
            {aside ?? (
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Or a slower way in:</p>
                <a
                  href="mailto:info@kbpm.nl"
                  className="block text-foreground transition-opacity hover:opacity-70"
                >
                  info@kbpm.nl
                </a>
                <p>Amsterdam — CET</p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
