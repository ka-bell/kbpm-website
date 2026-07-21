import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export function CtaBlock() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-foreground p-8 md:rounded-[40px] md:p-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <p className="font-mono-label uppercase tracking-wider text-background/70">§ 06 / Say hello</p>
              </div>
              <h2
                className="font-display mt-8 text-background"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.045em",
                  fontWeight: 500,
                }}
              >
                Ready to start? <span className="text-accent">Tell us</span> what you're building.
              </h2>
            </div>
            <div className="flex flex-col justify-end gap-6 md:col-span-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-between gap-4 rounded-full bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-px"
              >
                Start a project
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </Link>
              <div className="space-y-1 text-sm text-background/70">
                <p>Or a slower way in:</p>
                <a href="mailto:hello@kbpm.nl" className="block text-background underline decoration-accent decoration-2 underline-offset-4">
                  hello@kbpm.nl
                </a>
                <p>Amsterdam — CET</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
