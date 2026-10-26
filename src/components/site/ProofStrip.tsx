"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";

const CARD_STYLES = [
  {
    card: "bg-[#c9ff6e]",
    ink: "text-[#1e1e1e]",
    rule: "border-[#1e1e1e]/15",
  },
  {
    card: "bg-[#c7b0fe]",
    ink: "text-white",
    rule: "border-white/20",
  },
  {
    card: "bg-[#1e1e1e]",
    ink: "text-white",
    rule: "border-white/20",
  },
  {
    card: "bg-[#006ff7]",
    ink: "text-white",
    rule: "border-white/20",
  },
] as const;

/** Pixels per second — slow enough to read, fast enough to feel alive. */
const SPEED_PX = 42;

/**
 * Proof metrics ticker — continuous never-ending marquee.
 */
export function ProofStrip() {
  const t = useTranslations("ProofStrip");
  const metrics = useMemo(
    () => [
      { value: t("yearsValue"), label: t("yearsLabel") },
      { value: t("platformsValue"), label: t("platformsLabel") },
      { value: t("usersValue"), label: t("usersLabel") },
    ],
    [t],
  );
  const loopUnit = useMemo(
    () => [...metrics, ...metrics, ...metrics, ...metrics],
    [metrics],
  );
  const sequence = useMemo(() => [...loopUnit, ...loopUnit], [loopUnit]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let raf = 0;
    let last = performance.now();
    let active = false;

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      if (active && !pausedRef.current) {
        const half = track.scrollWidth / 2;
        if (half > 0) {
          offsetRef.current = (offsetRef.current + (SPEED_PX * dt) / 1000) % half;
          track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) last = performance.now();
      },
      { threshold: 0.05 },
    );
    io.observe(viewport);

    const onEnter = () => {
      pausedRef.current = true;
    };
    const onLeave = () => {
      pausedRef.current = false;
      last = performance.now();
    };
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="kbpm-hi-fi bg-white pb-12 md:pb-16 lg:pb-20">
      <div
        ref={viewportRef}
        className="metrics-ticker-viewport"
        aria-label={t("ariaLabel")}
      >
        <ul ref={trackRef} className="metrics-ticker-track">
          {sequence.map((m, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            const duplicate = i >= loopUnit.length;
            return (
              <li
                key={`${m.value}-${m.label}-${i}`}
                aria-hidden={duplicate}
                className="metrics-ticker-item"
              >
                <article
                  className={`flex h-full min-h-[16rem] flex-col justify-between rounded-2xl p-7 sm:min-h-[18rem] sm:p-8 lg:min-h-[21rem] ${style.card}`}
                >
                  <p
                    className={`font-display ${style.ink}`}
                    style={{
                      fontSize: "clamp(3rem, 7vw, 6rem)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.04em",
                      fontWeight: 500,
                    }}
                  >
                    {m.value}
                  </p>
                  <div className={`border-t pt-4 ${style.rule}`}>
                    <p
                      className={`text-[14px] leading-5 tracking-[-0.01em] ${style.ink}`}
                    >
                      {m.label}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
