"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "build", label: "Build" },
  { id: "results", label: "Results" },
  { id: "credits", label: "Credits" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/**
 * Floating bottom nav for case pages — same chrome language as SiteHeader,
 * jumps between sections within the current case.
 */
export function CaseStudyNav() {
  const lenis = useLenis();
  const [active, setActive] = useState<SectionId>(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (els.length === 0) return;

    const sync = () => {
      const marker = window.innerHeight * 0.35;
      let current: SectionId = SECTIONS[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= marker) {
          current = el.id as SectionId;
        }
      }
      setActive(current);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const goTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -24 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="kbpm-hi-fi pointer-events-none fixed inset-x-0 bottom-0 z-50 px-6 pb-3 sm:px-12 sm:pb-4 lg:px-[max(5rem,12vw)] lg:pb-5">
      <div className="pointer-events-auto mx-auto w-full max-w-[1152px]">
        <nav
          aria-label="Case sections"
          className="kbpm-work-scroll flex h-[44px] items-center justify-center overflow-x-auto rounded-xl bg-white/80 px-2 backdrop-blur-[50px] sm:h-[52px] sm:px-3 lg:h-[60px] lg:overflow-visible lg:px-4"
        >
          <ul className="flex w-max items-center">
            {SECTIONS.map((section) => {
              const isActive = section.id === active;
              return (
                <li key={section.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => goTo(section.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block whitespace-nowrap px-3 py-2.5 font-mono text-[11px] uppercase leading-[1.1] tracking-[-0.03em] transition-opacity sm:px-4 sm:text-[12px] ${
                      isActive
                        ? "text-[#1e1e1e] opacity-100"
                        : "text-[#1e1e1e] opacity-45 hover:opacity-70"
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
