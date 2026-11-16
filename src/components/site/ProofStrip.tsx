"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
] as const;

const COUNT_MS = 2200;
const STAGGER_MS = 160;
const ENTER_MS = 700;

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function parseMetric(value: string) {
  const match = value.trim().match(/^([\d.]+)(.*)$/);
  if (!match) return { target: 0, suffix: value, decimals: 0 };
  const raw = match[1];
  const decimals = raw.includes(".") ? (raw.split(".")[1]?.length ?? 0) : 0;
  return {
    target: Number.parseFloat(raw),
    suffix: match[2] ?? "",
    decimals,
  };
}

function formatCount(n: number, decimals: number) {
  if (decimals > 0) return n.toFixed(decimals);
  return String(Math.round(n));
}

type Metric = {
  value: string;
  label: string;
};

function StatCard({
  metric,
  style,
  index,
}: {
  metric: Metric;
  style: (typeof CARD_STYLES)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { target, suffix, decimals } = useMemo(
    () => parseMetric(metric.value),
    [metric.value],
  );
  const [display, setDisplay] = useState(() => formatCount(0, decimals));
  const [visible, setVisible] = useState(false);
  const played = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let revealTimer = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();

        revealTimer = window.setTimeout(
          () => setVisible(true),
          index * STAGGER_MS,
        );

        if (reduced.matches) {
          setDisplay(formatCount(target, decimals));
          return;
        }

        const startAt = performance.now() + index * STAGGER_MS;
        const tick = (now: number) => {
          const t = Math.min(1, Math.max(0, (now - startAt) / COUNT_MS));
          setDisplay(formatCount(target * easeOutExpo(t), decimals));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(revealTimer);
    };
  }, [decimals, index, target]);

  return (
    <article
      ref={ref}
      className={`metrics-stack__card flex min-h-[16rem] flex-col justify-between rounded-2xl p-7 sm:min-h-[18rem] sm:p-8 lg:min-h-[20rem] lg:p-10 ${style.card}`}
      style={{ ["--stack-i" as string]: String(index) }}
    >
      <p
        className={`font-display ${style.ink} transition-[opacity,filter,transform] ease-out ${
          visible
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-3 opacity-0 blur-sm"
        }`}
        style={{
          fontSize: "clamp(3rem, 12vw, 5.5rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
          fontWeight: 500,
          transitionDuration: `${ENTER_MS}ms`,
        }}
      >
        <span className="tabular-nums">
          {display}
          {suffix}
        </span>
      </p>
      <div
        className={`border-t pt-4 transition-[opacity,transform] ease-out ${style.rule} ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{
          transitionDuration: `${ENTER_MS}ms`,
          transitionDelay: visible ? "120ms" : "0ms",
        }}
      >
        <p className={`max-w-[16rem] text-[14px] leading-5 tracking-[-0.01em] ${style.ink}`}>
          {metric.label}
        </p>
      </div>
    </article>
  );
}

/**
 * Proof metrics — mobile vertical sticky stack; desktop horizontal row.
 * Count-up: Animated Stats Pro–style blur enter + easeOutExpo.
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

  return (
    <section
      className="kbpm-hi-fi bg-white px-5 pb-6 pt-2 sm:px-6 md:px-10 md:pb-10 lg:px-20 lg:pb-12"
      aria-label={t("ariaLabel")}
    >
      <div className="metrics-stack mx-auto max-w-[1440px]">
        {metrics.map((metric, i) => (
          <StatCard
            key={metric.label}
            metric={metric}
            style={CARD_STYLES[i % CARD_STYLES.length]}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
