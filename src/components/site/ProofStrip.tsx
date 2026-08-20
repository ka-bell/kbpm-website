"use client";

import { Reveal } from "./Reveal";

const CARD_STYLES = [
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
  {
    card: "bg-[#c9ff6e]",
    ink: "text-[#1e1e1e]",
    rule: "border-[#1e1e1e]/15",
  },
] as const;

/** Studio metrics — Figma 3626:4316 */
const metrics = [
  {
    value: "7",
    label: "Years as a company",
  },
  {
    value: "31",
    label: "Platforms we still maintain today",
  },
  {
    value: "500K+",
    label: "Daily users on our biggest platform",
  },
] as const;

/**
 * Proof metrics ticker — Figma 3626:4316.
 */
export function ProofStrip() {
  const sequence = [...metrics, ...metrics];

  return (
    <section className="kbpm-hi-fi bg-white pb-12 md:pb-16 lg:pb-20">
      <Reveal>
        <div className="metrics-ticker-viewport" aria-label="Studio metrics">
          <ul className="metrics-ticker-track">
            {sequence.map((m, i) => {
              const style = CARD_STYLES[i % CARD_STYLES.length];
              const duplicate = i >= metrics.length;
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
      </Reveal>
    </section>
  );
}
