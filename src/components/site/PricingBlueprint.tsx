import { useMemo } from "react";
import { Link } from "@tanstack/react-router";

export type PackageId = "proof" | "prototype" | "product" | "gtm" | "infra";

type Package = {
  id: PackageId;
  name: string;
  short: string;
  positioning: string;
  timeline: string;
  price: string;
  priceUnit?: string;
  who: string;
  ctaLabel: string;
};

export const PACKAGES: Package[] = [
  {
    id: "proof",
    name: "Proof Sprint",
    short: "Proof",
    positioning: "Turn an idea into something you can test.",
    timeline: "1–3 days",
    price: "3–6",
    priceUnit: "k",
    who: "Founders or teams with an idea that needs pressure-testing before anyone spends serious money on it.",
    ctaLabel: "Start a Proof Sprint",
  },
  {
    id: "prototype",
    name: "Prototype Sprint",
    short: "Prototype",
    positioning: "A working product people can actually use.",
    timeline: "4–6 weeks",
    price: "22–60",
    priceUnit: "k",
    who: "Teams with a validated idea ready to become a real, working product — end-to-end, in one fixed sprint.",
    ctaLabel: "Start a Prototype Sprint",
  },
  {
    id: "product",
    name: "Product Development",
    short: "Product",
    positioning: "We own the tech so you don't have to.",
    timeline: "Ongoing (monthly)",
    price: "8–20",
    priceUnit: "k/mo",
    who: "Teams who want a technical partner treating their product like their own — long term, no in-house build needed.",
    ctaLabel: "Start Product Development",
  },
  {
    id: "gtm",
    name: "Go-to-Market",
    short: "GTM",
    positioning: "Make a vibe-coded app production-ready.",
    timeline: "1–2 weeks",
    price: "0.25–5",
    priceUnit: "k",
    who: "Founders with a working prototype that needs to survive real users — hardened, deployed, and measured.",
    ctaLabel: "Start Go-to-Market",
  },
  {
    id: "infra",
    name: "EU-First Infrastructure",
    short: "Infra",
    positioning: "Sovereign cloud, built right.",
    timeline: "2–8 weeks",
    price: "15–50",
    priceUnit: "k",
    who: "Teams with EU data-residency, security, or compliance requirements that off-the-shelf hosting can't meet.",
    ctaLabel: "Start with Infrastructure",
  },
];

// Row indices: 1=Discovery, 2=Design, 3=Build, 4=Launch, 5=Operate
type Cell = {
  key: string;
  label: string;
  row: number;
  col: number;
  colSpan?: number;
  packages: PackageId[];
  tooltip: string;
};

const CELLS: Cell[] = [
  // Discovery
  { key: "kickoff", label: "Kickoff call", row: 1, col: 2, packages: ["proof", "prototype", "product", "gtm", "infra"], tooltip: "30-min call with both partners." },
  { key: "brief", label: "Shared brief", row: 1, col: 3, packages: ["proof", "prototype", "infra"], tooltip: "We write the brief together." },
  { key: "assumptions", label: "Assumption map", row: 1, col: 4, packages: ["proof"], tooltip: "What has to be true for this to work." },
  { key: "audit", label: "Tech audit", row: 1, col: 6, colSpan: 2, packages: ["gtm", "infra"], tooltip: "Where the current build breaks under real load." },

  // Design
  { key: "prototype", label: "Clickable prototype", row: 2, col: 3, packages: ["proof"], tooltip: "Something real to react to." },
  { key: "uxflows", label: "UX flows", row: 2, col: 4, packages: ["prototype"], tooltip: "The user's path, mapped end-to-end." },
  { key: "visual", label: "Visual system", row: 2, col: 5, packages: ["prototype"], tooltip: "Type, colour, motion, tone." },
  { key: "components", label: "Component set", row: 2, col: 6, packages: ["prototype"], tooltip: "A library, not a mockup." },
  { key: "arch", label: "Architecture plan", row: 2, col: 7, colSpan: 2, packages: ["infra"], tooltip: "Regions, data flow, failure modes." },

  // Build
  { key: "frontend", label: "Frontend", row: 3, col: 3, packages: ["prototype", "product"], tooltip: "Fast, accessible, production code." },
  { key: "backend", label: "Backend", row: 3, col: 4, packages: ["prototype", "product"], tooltip: "Data model, APIs, auth." },
  { key: "cms", label: "CMS + content", row: 3, col: 5, packages: ["prototype"], tooltip: "You can edit without us." },
  { key: "harden", label: "Production hardening", row: 3, col: 6, packages: ["gtm"], tooltip: "Auth, rate limits, error tracking." },
  { key: "cloud", label: "Sovereign cloud", row: 3, col: 7, packages: ["infra"], tooltip: "EU-only regions, keys you own." },
  { key: "residency", label: "Data residency + auth", row: 3, col: 8, packages: ["infra"], tooltip: "Where the data lives, and who can reach it." },

  // Launch
  { key: "gono", label: "Go / no-go note", row: 4, col: 2, packages: ["proof"], tooltip: "A clear recommendation, in writing." },
  { key: "ship", label: "Ship + 30-day support", row: 4, col: 4, packages: ["prototype"], tooltip: "Launch, then 30 days on us." },
  { key: "deploy", label: "Deploy + analytics", row: 4, col: 6, packages: ["gtm"], tooltip: "Live domain, observability, product analytics." },
  { key: "compliance", label: "Compliance docs", row: 4, col: 8, packages: ["infra"], tooltip: "GDPR, DPA, sub-processor list." },

  // Operate
  { key: "eng", label: "Dedicated engineering", row: 5, col: 2, colSpan: 2, packages: ["product"], tooltip: "Reserved hours every month." },
  { key: "roadmap", label: "Roadmap + product thinking", row: 5, col: 4, colSpan: 2, packages: ["product"], tooltip: "We push back and propose." },
  { key: "monitor", label: "Monitoring + fixes", row: 5, col: 6, packages: ["product", "infra"], tooltip: "Uptime, perf, bugs — handled." },
  { key: "seo", label: "SEO + performance", row: 5, col: 7, packages: ["gtm"], tooltip: "Core Web Vitals, indexing, tracking." },
  { key: "access", label: "Direct partner access", row: 5, col: 8, packages: ["product"], tooltip: "Both partners, one shared inbox." },
];

const ROW_LABELS = ["Discovery", "Design", "Build", "Launch", "Operate"];

export function PricingBlueprint({
  selected,
  onSelect,
}: {
  selected: PackageId;
  onSelect: (id: PackageId) => void;
}) {
  const pkg = useMemo(() => PACKAGES.find((p) => p.id === selected)!, [selected]);

  return (
    <section id="pricing" className="bg-accent text-accent-foreground">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
        {/* Header row */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <p className="font-mono-label uppercase tracking-wider text-accent-foreground/70">
              § Pricing
            </p>
            <h1
              className="font-display mt-5"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 500,
              }}
            >
              We keep pricing crystal clear, just like our process.
            </h1>

            <div className="mt-10">
              <p className="font-mono-label uppercase tracking-wider text-accent-foreground/70">
                Select a service
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PACKAGES.map((p) => {
                  const active = p.id === selected;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onSelect(p.id)}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-2 border px-4 py-2 font-mono-label uppercase tracking-wider transition-colors ${
                        active
                          ? "border-black bg-black text-white"
                          : "border-accent-foreground/35 bg-transparent text-accent-foreground/60 hover:border-accent-foreground hover:text-accent-foreground"
                      }`}
                    >
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />}
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 md:text-right">
            <p className="font-mono-label uppercase tracking-wider text-accent-foreground/70">
              From
            </p>
            <div
              key={pkg.id}
              className="mt-2 flex items-baseline justify-start gap-2 md:justify-end"
              style={{ animation: "kbpm-fade-up 400ms ease" }}
            >
              <span
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  letterSpacing: "-0.05em",
                  fontWeight: 500,
                }}
              >
                €{pkg.price}
              </span>
              <span
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                  letterSpacing: "-0.04em",
                  fontWeight: 500,
                }}
              >
                {pkg.priceUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Blueprint grid */}
        <div className="mt-14 overflow-x-auto">
          <div
            className="relative grid min-w-[820px] gap-2"
            style={{
              gridTemplateColumns: "56px repeat(7, minmax(96px, 1fr))",
              gridTemplateRows: "repeat(5, minmax(84px, auto))",
            }}
          >
            {/* Row label rail */}
            {ROW_LABELS.map((label, i) => (
              <div
                key={label}
                className="flex items-center justify-center border-r border-accent-foreground/30"
                style={{ gridColumn: 1, gridRow: i + 1 }}
              >
                <span
                  className="font-mono-label uppercase tracking-[0.2em] text-accent-foreground/70"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {label}
                </span>
              </div>
            ))}

            {/* Faint grid guides (empty cells) */}
            {Array.from({ length: 5 }).flatMap((_, r) =>
              Array.from({ length: 7 }).map((__, c) => (
                <div
                  key={`g-${r}-${c}`}
                  className="border border-dashed border-accent-foreground/15"
                  style={{ gridColumn: c + 2, gridRow: r + 1 }}
                />
              )),
            )}

            {/* Deliverable cells */}
            {CELLS.map((cell) => {
              const active = cell.packages.includes(selected);
              return (
                <div
                  key={cell.key}
                  className={`group relative flex items-center justify-center rounded-lg border px-4 py-3 text-center transition-all duration-300 ${
                    active
                      ? "border-accent-foreground bg-accent-foreground/5 opacity-100"
                      : "border-accent-foreground/40 opacity-20"
                  }`}
                  style={{
                    gridColumn: `${cell.col} / span ${cell.colSpan ?? 1}`,
                    gridRow: cell.row,
                  }}
                  title={cell.tooltip}
                >
                  <span className="font-mono-label uppercase tracking-wider text-accent-foreground">
                    {cell.label}
                  </span>
                  {active && (
                    <span className="pointer-events-none absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent-foreground" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-12 grid grid-cols-1 items-end gap-8 border-t border-accent-foreground/20 pt-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono-label uppercase tracking-wider text-accent-foreground/70">
              Project time
            </p>
            <p
              className="font-display mt-2"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", letterSpacing: "-0.03em", fontWeight: 500 }}
            >
              {pkg.timeline}
            </p>
          </div>
          <div className="md:col-span-5">
            <p className="font-mono-label uppercase tracking-wider text-accent-foreground/70">
              Who it's for
            </p>
            <p className="mt-2 text-sm leading-relaxed text-accent-foreground/85">{pkg.who}</p>
          </div>
          <div className="md:col-span-3 md:text-right">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-accent-foreground px-5 py-3 text-sm font-medium text-accent transition-transform hover:-translate-y-px"
            >
              {pkg.ctaLabel}
              <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes kbpm-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
