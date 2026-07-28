"use client";

import { Link } from "@/components/Link";
import { useEffect, useRef, useState } from "react";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Reveal } from "@/components/site/Reveal";
import { WhoYouWorkWith } from "@/components/site/WhoYouWorkWith";

const CAPABILITIES: Array<{ label: string; title: string; items: string[] }> = [
  {
    label: "01",
    title: "Product & Strategy",
    items: [
      "Product discovery & scoping",
      "Technical due diligence",
      "Prototype-to-production roadmaps",
      "Architecture decisions",
      "Fixed-scope sprint planning",
      "Founder-facing workshops",
    ],
  },
  {
    label: "02",
    title: "Design",
    items: [
      "Product & UX design",
      "Design systems",
      "Rapid prototyping (Figma → code)",
      "Interaction & motion",
      "Landing pages & marketing sites",
      "Accessibility (WCAG 2.1 AA)",
    ],
  },
  {
    label: "03",
    title: "Engineering",
    items: [
      "Full-stack TypeScript (React, Next, TanStack)",
      "Edge runtimes (Cloudflare, Vercel)",
      "Supabase, Postgres, RLS",
      "AI features — LLMs, RAG, agents",
      "Payments — Stripe, Paddle",
      "Mobile — React Native, Expo",
      "Hardening vibe-coded apps for production",
    ],
  },
  {
    label: "04",
    title: "Infrastructure & Ops",
    items: [
      "EU-first / sovereign cloud (Hetzner, Scaleway, OVH)",
      "CI/CD, observability, on-call",
      "GDPR & data residency",
      "Auth — SSO, OAuth, magic link",
      "Migrations off US-hosted stacks",
      "Long-term maintenance retainers",
    ],
  },
];

const TOOLS: Array<{ name: string; color: string; use: string; mono: string }> = [
  { name: "React", color: "#61DAFB", mono: "R", use: "The default view layer." },
  { name: "TanStack", color: "#FF4154", mono: "TS", use: "Router, Query, Table." },
  { name: "Next.js", color: "#FFFFFF", mono: "N", use: "When we need App Router." },
  { name: "TypeScript", color: "#3178C6", mono: "TS", use: "Non-negotiable, everywhere." },
  { name: "Supabase", color: "#3ECF8E", mono: "S", use: "Auth, Postgres, storage, edge." },
  { name: "Postgres", color: "#4479A1", mono: "PG", use: "Data lives here. RLS on." },
  { name: "Cloudflare", color: "#F38020", mono: "CF", use: "Edge, Workers, R2, DNS." },
  { name: "Stripe", color: "#635BFF", mono: "$", use: "Payments, subscriptions, tax." },
  { name: "Figma", color: "#F24E1E", mono: "F", use: "Design, prototype, hand-off." },
  { name: "Expo", color: "#4630EB", mono: "E", use: "iOS + Android from one codebase." },
  { name: "Hetzner", color: "#D50C2D", mono: "H", use: "EU-first bare metal & cloud." },
  { name: "OpenAI", color: "#10A37F", mono: "AI", use: "LLMs, embeddings, agents." },
];

const TESTIMONIALS: Array<{
  quote: string;
  name: string;
  role: string;
  marker: string;
}> = [
  {
    quote:
      "We came to Kbell & Postman with a vibe-coded prototype and a deadline. Six weeks later we had a production app, EU-hosted, paying customers on it. They act like a co-founder, not a vendor.",
    name: "Marijn de Vries",
    role: "Founder — Halden (fintech, Amsterdam)",
    marker: "§ Case coming soon",
  },
  {
    quote:
      "They turned a fuzzy product brief into something our team could actually test. The work felt senior from the first call: clear scope, calm decisions, and no theatre.",
    name: "Lotte Bakker",
    role: "Strategy Lead — Northern Studio",
    marker: "§ Prototype sprint",
  },
  {
    quote:
      "The biggest difference was momentum. We stopped debating abstractions and started reviewing a working product every week. That changed the whole client conversation.",
    name: "Samir El Idrissi",
    role: "Managing Partner — Atlas & Co.",
    marker: "§ Product build",
  },
];

export function AboutPage() {
  const capabilitiesSectionRef = useRef<HTMLElement | null>(null);
  const capabilitiesViewportRef = useRef<HTMLDivElement | null>(null);
  const capabilitiesTrackRef = useRef<HTMLDivElement | null>(null);
  const [capabilityProgress, setCapabilityProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateCapabilities = () => {
      frame = 0;
      const section = capabilitiesSectionRef.current;
      const viewport = capabilitiesViewportRef.current;
      const track = capabilitiesTrackRef.current;
      if (!section || !viewport || !track) return;

      const sectionRect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-sectionRect.top / scrollableDistance, 0), 1);
      const maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);

      track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;
      setCapabilityProgress(progress);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateCapabilities);
    };

    updateCapabilities();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % TESTIMONIALS.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="mx-auto max-w-[1440px] px-6 pt-24 pb-28 md:px-10 md:pt-36 md:pb-36">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
              ABOUT US
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-16 md:mt-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <Reveal>
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(2.75rem, 8.5vw, 8rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.05em",
                  fontWeight: 500,
                }}
              >
                Senior-led.
                <br />
                <span className="text-accent">No account layer.</span>
              </h1>
            </Reveal>
          </div>
          <div className="flex items-end md:col-span-4">
            <Reveal>
              <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
                Kbell &amp; Postman is a small, senior studio in Amsterdam. We
                take products from idea to production — strategy, design, and
                code — for teams whose ideas have outgrown their in-house
                capacity.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-border pt-10 md:mt-28 md:grid-cols-4 md:gap-10">
            {[
              ["30+", "Combined years in digital products"],
              ["Senior", "Led on every engagement"],
              ["EU", "Infra, when it matters"],
              ["Direct", "No account layer, ever"],
            ].map(([n, l]) => (
              <div key={l}>
                <p
                  className="font-display text-foreground"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    fontWeight: 500,
                  }}
                >
                  {n}
                </p>
                <p className="mt-3 font-mono-label uppercase tracking-wider text-muted-foreground">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Client quote — prominent, early */}
      <section className="border-t border-border bg-surface-alt/40">
        <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
          <Reveal>
            <div className="overflow-hidden py-4">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translate3d(${-activeTestimonial * 100}%, 0, 0)` }}
              >
                {TESTIMONIALS.map((testimonial) => (
                  <figure key={testimonial.name} className="w-full shrink-0 pr-2">
                    <svg
                      className="h-12 w-12 text-accent md:h-14 md:w-14"
                      viewBox="0 0 40 40"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M8 26c0-6 4-11 10-13v4c-3.5 1.5-6 4.5-6 8h6v10H8V26zm18 0c0-6 4-11 10-13v4c-3.5 1.5-6 4.5-6 8h6v10H26V26z"
                        fill="currentColor"
                      />
                    </svg>
                    <blockquote
                      className="font-display mt-12 max-w-5xl text-foreground"
                      style={{
                        fontSize: "clamp(2rem, 5vw, 4.25rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.035em",
                        fontWeight: 500,
                      }}
                    >
                      "{testimonial.quote}"
                    </blockquote>
                    <figcaption className="mt-14 flex flex-col gap-1 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-base text-foreground md:text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground md:text-base">
                          {testimonial.role}
                        </p>
                      </div>
                      <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                        {testimonial.marker}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
              <div className="flex gap-2" aria-label="Testimonial slides">
                {TESTIMONIALS.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2.5 w-10 border border-border transition-colors ${
                      activeTestimonial === index ? "bg-foreground" : "bg-background"
                    }`}
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-pressed={activeTestimonial === index}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((current) =>
                      current === 0 ? TESTIMONIALS.length - 1 : current - 1,
                    )
                  }
                  className="inline-flex h-10 w-10 items-center justify-center border border-border text-sm"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((current) => (current + 1) % TESTIMONIALS.length)
                  }
                  className="inline-flex h-10 w-10 items-center justify-center border border-border text-sm"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team / founders */}
      <div className="border-t border-border">
        <WhoYouWorkWith />
      </div>

      {/* One team, three disciplines */}
      <section
        ref={capabilitiesSectionRef}
        className="relative border-t border-border"
        style={{ height: "360vh" }}
      >
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden bg-background">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-10 md:py-24">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-5">
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                      § Capabilities
                    </p>
                  </div>
                  <h2
                    className="font-display mt-6"
                    style={{
                      fontSize: "clamp(2rem, 4.5vw, 4rem)",
                      lineHeight: 0.98,
                      letterSpacing: "-0.04em",
                      fontWeight: 500,
                    }}
                  >
                    What we actually do.
                  </h2>
                </Reveal>
              </div>
              <div className="md:col-span-5 md:col-start-8">
                <Reveal>
                  <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                    Four disciplines in one studio. Specialists join when the brief
                    needs them. Keep scrolling here: the capability cards move
                    sideways, then the page continues.
                  </p>
                </Reveal>
              </div>
            </div>

            <div
              ref={capabilitiesViewportRef}
              className="mt-12 overflow-hidden border-y border-border py-8 md:mt-16 md:py-10"
            >
              <div
                ref={capabilitiesTrackRef}
                className="flex w-max gap-5 transition-transform duration-75 ease-linear md:gap-8"
              >
                {CAPABILITIES.map((c) => (
                  <article
                    key={c.title}
                    className="flex min-h-[390px] w-[78vw] max-w-[520px] shrink-0 flex-col border border-border bg-background p-6 md:min-h-[430px] md:w-[42vw] md:p-8 lg:w-[34vw]"
                  >
                    <div className="flex items-start justify-between gap-8 border-b border-border pb-6">
                      <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                        § {c.label}
                      </p>
                      <span className="font-mono-label text-muted-foreground">Capability</span>
                    </div>
                    <h3
                      className="font-display mt-8"
                      style={{
                        fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                        letterSpacing: "-0.025em",
                        lineHeight: 1,
                        fontWeight: 500,
                      }}
                    >
                      {c.title}
                    </h3>
                    <ul className="mt-auto space-y-3.5 pt-10">
                      {c.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-[10px] h-px w-3 shrink-0 bg-muted-foreground/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-5">
              <div className="h-px overflow-hidden bg-border">
                <div
                  className="h-full bg-foreground transition-[width] duration-100"
                  style={{ width: `${Math.round(capabilityProgress * 100)}%` }}
                />
              </div>
              <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                {String(
                  Math.min(
                    Math.floor(capabilityProgress * CAPABILITIES.length) + 1,
                    CAPABILITIES.length,
                  ),
                ).padStart(2, "0")}{" "}
                / {String(CAPABILITIES.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack — bottom */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    § Tools we reach for
                  </p>
                </div>
                <h2
                  className="font-display mt-6"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 4rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.04em",
                    fontWeight: 500,
                  }}
                >
                  The stack, in colour.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-6">
              <Reveal>
                <p className="max-w-md text-muted-foreground md:ml-auto">
                  The ones we pick up most often. Opinionated, not religious —
                  the stack follows the problem, not the other way around.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className="group relative flex flex-col justify-between gap-8 bg-background p-6 transition-colors duration-300 hover:bg-[color:var(--tool-tint)] md:p-7"
                style={
                  {
                    ["--tool-tint" as string]: "var(--wire-fill)",
                  } as React.CSSProperties
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[13px] font-semibold tracking-tight"
                    style={{
                      backgroundColor: "var(--wire-fill)",
                      color: "var(--color-foreground)",
                      border: "1px solid var(--color-border)",
                    }}
                    aria-hidden
                  >
                    {t.mono}
                  </div>
                  <span
                    className="mt-1 h-2 w-2 rounded-full opacity-70 transition-opacity group-hover:opacity-100"
                    style={{ backgroundColor: "var(--color-foreground)" }}
                    aria-hidden
                  />
                </div>
                <div>
                  <p
                    className="font-display text-foreground"
                    style={{
                      fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      fontWeight: 500,
                    }}
                  >
                    {t.name}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {t.use}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing — Amsterdam */}
      <section className="border-t border-border">
        <div className="relative h-[90vh] w-full overflow-hidden">
          <ImagePlaceholder label="Image" className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-6 pb-12 md:px-10 md:pb-16">
            <p className="font-mono-label uppercase tracking-wider text-foreground/80">
              § The studio · Amsterdam
            </p>
            <p
              className="font-display mt-4 max-w-2xl text-foreground"
              style={{
                fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 500,
              }}
            >
              Amsterdam. Seven years of shipping — and the team the brief needs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  § Next
                </p>
                <h2
                  className="font-display mt-6"
                  style={{
                    fontSize: "clamp(2.25rem, 6vw, 5.5rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.04em",
                    fontWeight: 500,
                  }}
                >
                  Not sure which capability you need?{" "}
                  <span className="text-accent">Tell us the problem.</span>
                </h2>
              </div>
              <div className="flex flex-col gap-4 md:col-span-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-between gap-4 rounded-full bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-px"
                >
                  Start a project
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
                <Link
                  to="/services"
                  className="text-sm text-muted-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-foreground"
                >
                  Or explore all services →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
