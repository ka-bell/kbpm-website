"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const LOGOS = [
  { name: "Virtue", src: "/clients/virtue.png", scale: 1 },
  { name: "Mix Interiors", src: "/clients/mix-interiors.png", scale: 1 },
  { name: "Mediahuis", src: "/clients/mediahuis.png", scale: 1.05 },
  { name: "Spilnews", src: "/clients/spilnews.png", scale: 1.1 },
] as const;

const MARQUEE_SECONDS = 45;

function PlusMark() {
  return (
    <span className="relative inline-block size-8 shrink-0" aria-hidden>
      <span className="absolute left-[11px] top-0 h-8 w-2.5 bg-[#006ff7]" />
      <span className="absolute left-0 top-[11px] h-2.5 w-8 bg-[#006ff7]" />
    </span>
  );
}

export function TrustedBy() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const pauseBriefly = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 2000);
  }, []);

  const seekTo = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      const strip = stripRef.current;
      const fill = fillRef.current;
      if (!track || !strip) return;

      const half = strip.scrollWidth / 2;
      if (half <= 0) return;
      const rect = track.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const offset = x * half;

      strip.style.animation = "none";
      strip.style.transform = `translate3d(${-offset}px, 0, 0)`;
      if (fill) fill.style.width = `${Math.max(6, x * 100)}%`;

      pauseBriefly();

      window.setTimeout(() => {
        if (!stripRef.current) return;
        const delay = -(x * MARQUEE_SECONDS);
        stripRef.current.style.transform = "";
        stripRef.current.style.animation = "";
        stripRef.current.style.animationDelay = `${delay}s`;
      }, 50);
    },
    [pauseBriefly],
  );

  useEffect(() => {
    const dragging = { current: false };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      seekTo(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    const track = trackRef.current;
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      seekTo(e.clientX);
    };
    track?.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      track?.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, [seekTo]);

  useEffect(() => {
    const strip = stripRef.current;
    const fill = fillRef.current;
    if (!strip || !fill) return;

    let raf = 0;
    const tick = () => {
      if (!paused) {
        const style = window.getComputedStyle(strip);
        const matrix = style.transform;
        let x = 0;
        if (matrix && matrix !== "none") {
          const m = matrix.match(/matrix.*\((.+)\)/);
          if (m) x = Math.abs(parseFloat(m[1].split(",")[4] ?? "0"));
        }
        const half = strip.scrollWidth / 2 || 1;
        fill.style.width = `${Math.max(6, Math.min(100, (x / half) * 100))}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const sequence = [...LOGOS, ...LOGOS];

  return (
    <section className="kbpm-hi-fi bg-white py-16 md:py-20 lg:py-[80px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 md:gap-12 md:px-10 lg:px-20">
        <Reveal>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <PlusMark />
              <p className="font-mono text-[14px] uppercase leading-[1.1] tracking-[0.7px] text-[#1e1e1e]">
                Our clients
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
              <h2
                className="font-display max-w-[32rem] text-[#1e1e1e]"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                Trusted by teams building serious digital products.
              </h2>
              <p className="max-w-[27rem] text-[18px] leading-[1.2] tracking-[-0.02em] text-[#838383] md:text-[20px] lg:pt-1">
                A sample of the founders, agencies and companies we&apos;ve
                helped move from idea to working product.
              </p>
            </div>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Logo carousel position"
          tabIndex={0}
          className="relative h-3 w-full cursor-pointer touch-none outline-none"
        >
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[rgba(0,20,60,0.1)]" />
          <div
            ref={fillRef}
            className="absolute left-0 top-1/2 h-px w-[8%] -translate-y-1/2 bg-[#1e1e1e]"
          />
          <div className="absolute right-0 top-1/2 size-3 -translate-y-1/2 rounded-full bg-[#1e1e1e]" />
        </div>

        <div className="clients-logo-viewport">
          <ul
            ref={stripRef}
            className={`clients-logo-scroller${paused ? " is-paused" : ""}`}
          >
            {sequence.map((logo, i) => (
              <li
                key={`${logo.src}-${i}`}
                aria-hidden={i >= LOGOS.length}
                style={{ ["--logo-scale" as string]: String(logo.scale) }}
              >
                <img
                  src={logo.src}
                  alt={i < LOGOS.length ? logo.name : ""}
                  width={180}
                  height={56}
                  decoding="async"
                  draggable={false}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
