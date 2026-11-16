"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

/** Figma 10629:31532 — Overview / Problem / Approach / Result + back-to-top */
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "build", label: "Approach" },
  { id: "results", label: "Result" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/**
 * Floating case controller — dark pill, blue active chip, back-to-top.
 * Desktop Figma 10629:31532 (641×90); mobile scales the same layout.
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

  const goTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="kbpm-hi-fi pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-3 sm:px-6 sm:pb-5 lg:pb-6">
      <nav
        aria-label="Case sections"
        className="pointer-events-auto flex h-[56px] w-full max-w-[641px] items-center gap-1 rounded-full bg-[#1e1e1e]/75 px-1.5 backdrop-blur-[50px] sm:h-[72px] sm:gap-2 sm:px-3 lg:h-[90px] lg:px-4"
      >
        <ul className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1">
          {SECTIONS.map((section) => {
            const isActive = section.id === active;
            return (
              <li key={section.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => goTo(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`block whitespace-nowrap rounded-full px-2.5 py-2 font-mono text-[10px] uppercase leading-[1.1] tracking-[-0.03em] transition-colors sm:px-4 sm:py-3 sm:text-[12px] lg:px-5 ${
                    isActive
                      ? "bg-[#006ff7] text-white"
                      : "text-white/55 hover:text-white/85"
                  }`}
                >
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={goTop}
          aria-label="Back to top"
          className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#1e1e1e] transition-opacity hover:opacity-85 sm:size-11 lg:size-12"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden
            className="sm:h-[18px] sm:w-[18px]"
          >
            <path
              d="M9 14.25V3.75M9 3.75L4.5 8.25M9 3.75L13.5 8.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}
