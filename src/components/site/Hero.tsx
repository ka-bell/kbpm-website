"use client";

import { useEffect, useState } from "react";
import { HeroTiles } from "./HeroTiles";

const PHRASES = [
  "when the idea outgrows the team.",
  "Proof, not promises.",
] as const;

const TYPE_MS = 48;
const DELETE_MS = 28;
const HOLD_MS = 2200;
const GAP_MS = 380;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function useTypewriter(phrases: readonly string[]) {
  const reducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState(phrases[0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [mode, setMode] = useState<"typing" | "holding" | "deleting" | "gap">(
    "holding",
  );

  useEffect(() => {
    if (reducedMotion) {
      setText(phrases[0]);
      return;
    }

    const phrase = phrases[phraseIndex];
    let timer: number;

    if (mode === "holding") {
      timer = window.setTimeout(() => setMode("deleting"), HOLD_MS);
    } else if (mode === "deleting") {
      if (text.length === 0) {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setMode("gap");
        return;
      }
      timer = window.setTimeout(() => setText(text.slice(0, -1)), DELETE_MS);
    } else if (mode === "gap") {
      timer = window.setTimeout(() => setMode("typing"), GAP_MS);
    } else if (text === phrase) {
      setMode("holding");
    } else {
      timer = window.setTimeout(
        () => setText(phrase.slice(0, text.length + 1)),
        TYPE_MS,
      );
    }

    return () => window.clearTimeout(timer);
  }, [mode, text, phraseIndex, phrases, reducedMotion]);

  return text;
}

/**
 * Hero — mobile matches Figma 3674:2575; sm+ keeps typewriter + tile grid.
 */
export function Hero() {
  const line = useTypewriter(PHRASES);

  return (
    <section className="kbpm-hi-fi w-full bg-white px-5 pt-0 sm:px-6 lg:px-8">
      {/* Pull hero up under the sticky header so the bar floats over the dark card */}
      <div className="relative -mt-[4.5rem] flex w-full min-h-[min(48rem,92dvh)] flex-col justify-between overflow-hidden rounded-2xl bg-[#1e1e1e] p-6 pb-6 pt-[5.5rem] sm:-mt-[5.5rem] sm:min-h-[40rem] sm:px-8 sm:pb-10 sm:pt-[8.25rem] lg:-mt-[6.5rem] lg:min-h-[min(90vh,56.25rem)] lg:px-[clamp(2.5rem,5vw,5rem)] lg:pb-20 lg:pt-[10.5rem]">
        {/* Mobile — Figma static headline */}
        <h1 className="font-display relative z-10 max-w-[18.5rem] text-[3rem] font-medium leading-[1.2] tracking-[-0.02em] text-white sm:hidden">
          <span className="block">Design partner</span>
          <span className="block">for ambitious design</span>
        </h1>

        {/* sm+ — typewriter headline */}
        <h1 className="font-display relative z-10 hidden max-w-4xl py-10 text-[2.125rem] font-medium leading-[1.2] tracking-[-0.02em] text-white sm:block sm:py-14 sm:text-5xl lg:max-w-5xl lg:py-4 lg:text-[4.5rem]">
          <span className="block">We build digital products</span>
          <span className="inline">
            {line}
            <span
              className="kbpm-hero-caret ml-[0.12em] inline-block h-[0.85em] w-[2px] translate-y-[0.08em] bg-white align-baseline"
              aria-hidden
            />
          </span>
        </h1>

        <HeroTiles />
      </div>
    </section>
  );
}
