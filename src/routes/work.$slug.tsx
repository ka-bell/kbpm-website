import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Reveal } from "@/components/site/Reveal";
import { getCase, getRelated, type CaseStudy } from "@/components/site/cases-data";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const c = getCase(params.slug);
    if (!c) throw notFound();
    return { c };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.c;
    const title = c ? `${c.client} — kbell + postman` : "Case — kbell + postman";
    const desc = c?.outcome ?? "Selected case study from kbell + postman.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: NotFoundCase,
  component: CaseDetail,
});

function NotFoundCase() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-32 md:px-8 md:py-40">
      <p className="eyebrow">§ 404 / Case not found</p>
      <h1
        className="font-display mt-6 text-foreground"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          fontWeight: 500,
        }}
      >
        That case has moved.
      </h1>
      <Link
        to="/work"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm text-foreground hover:border-foreground"
      >
        ← Back to all work
      </Link>
    </section>
  );
}

type NarrativeCard = { title: string; body: string };

function getCaseDetailCards(c: CaseStudy): { problem: NarrativeCard[]; build: NarrativeCard[] } {
  const cards: Record<string, { problem: NarrativeCard[]; build: NarrativeCard[] }> = {
    spilnews: {
      problem: [
        {
          title: "Workflow",
          body: "Editorial teams needed video management, metadata, scheduling, and permissions in one publishing flow.",
        },
        {
          title: "Constraint",
          body: "The system had to fit the SPIL ecosystem while still feeling purpose-built for video-first news.",
        },
        {
          title: "Measure",
          body: "A launched MVP that supports modern editorial workflows instead of article-first publishing habits.",
        },
      ],
      build: [
        {
          title: "Product strategy",
          body: "Shape the platform around video management, publishing workflow, metadata, and editorial roles.",
        },
        {
          title: "Interface system",
          body: "Design dashboard, CMS, desktop, and mobile screens that remain clear in daily newsroom use.",
        },
        {
          title: "Product build",
          body: "Combine front-end, back-end, CMS, design system, and product management into one usable MVP.",
        },
      ],
    },
    "mix-interiors": {
      problem: [
        {
          title: "Reader need",
          body: "Readers could see inspiring interior products, but could not easily identify or explore them from the image.",
        },
        {
          title: "Content gap",
          body: "Editorial photography and manufacturer product data lived in separate systems.",
        },
        {
          title: "Measure",
          body: "A discovery experience that connects images to products and sends readers directly to manufacturers.",
        },
      ],
      build: [
        {
          title: "Visual discovery",
          body: "Turn interior imagery into interactive product surfaces with hotspots and product context.",
        },
        {
          title: "Data layer",
          body: "Aggregate manufacturer catalogues into a structured product database with synchronisation.",
        },
        {
          title: "Matching system",
          body: "Support product recognition, recommendations, API integrations, and direct manufacturer links.",
        },
      ],
    },
    "virtue-worldwide": {
      problem: [
        {
          title: "Strategy need",
          body: "Cultural strategists needed to see patterns between topics, people, organisations, and communities.",
        },
        {
          title: "Constraint",
          body: "Traditional research was too slow and often missed hidden relationships shaping behaviour.",
        },
        {
          title: "Measure",
          body: "A tool that makes network intelligence useful for strategy and creative teams.",
        },
      ],
      build: [
        {
          title: "Knowledge graph",
          body: "Map relationships between topics, people, organisations, and audience communities.",
        },
        {
          title: "Data visualisation",
          body: "Make complex network data explorable through interactive graphs and clear interface states.",
        },
        {
          title: "Strategic output",
          body: "Support trend discovery, community detection, relationship mapping, and global brand reports.",
        },
      ],
    },
    hopplay: {
      problem: [
        {
          title: "Visitor need",
          body: "Destinations wanted experiences that go beyond static guides and traditional walking tours.",
        },
        {
          title: "Operational need",
          body: "Cities needed a repeatable way to create routes, challenges, and location-based content.",
        },
        {
          title: "Measure",
          body: "Live destination experiences that can scale across multiple cities.",
        },
      ],
      build: [
        {
          title: "Route builder",
          body: "Create curated city routes with location-based moments, challenges, and unlockable experiences.",
        },
        {
          title: "Gameplay system",
          body: "Use maps, GPS, challenges, and gamification to make exploration feel active.",
        },
        {
          title: "Multi-city CMS",
          body: "Give tourism teams a platform to manage content, destinations, and future implementations.",
        },
      ],
    },
    academion: {
      problem: [
        {
          title: "Operations",
          body: "Accreditation work was spread across email threads, documents, shared drives, and manual follow-ups.",
        },
        {
          title: "Constraint",
          body: "The platform had to respect complex review roles, evidence trails, and institutional accountability.",
        },
        {
          title: "Measure",
          body: "Less time lost to coordination, with a clear audit trail for every review cycle.",
        },
      ],
      build: [
        {
          title: "Workflow model",
          body: "Model submissions, reviewers, evidence, sign-offs, ownership, and states as one system.",
        },
        {
          title: "Permissions",
          body: "Design roles and delegated access flexible enough for university review processes.",
        },
        {
          title: "Audit trail",
          body: "Keep every artefact traceable so leadership, reviewers, and teams can trust the process.",
        },
      ],
    },
  };

  return (
    cards[c.slug] ?? {
      problem: [
        { title: "Context", body: c.context ?? c.problem },
        { title: "Constraint", body: c.problem },
        { title: "Measure", body: c.metricLabel },
      ],
      build: [
        { title: "Product strategy", body: c.built },
        { title: "Craft layer", body: c.craft },
        { title: "Outcome", body: c.outcome },
      ],
    }
  );
}

function CaseDetail() {
  const { c } = Route.useLoaderData() as { c: CaseStudy };
  const [nerdOut, setNerdOut] = useState(false);

  useEffect(() => {
    setNerdOut(false);
    window.scrollTo({ top: 0 });
  }, [c.slug]);

  useEffect(() => {
    if (nerdOut) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [nerdOut]);

  return (
    <>
      {nerdOut ? <CaseDeepDive c={c} /> : <SimpleCaseView c={c} />}

      <button
        type="button"
        onClick={() => setNerdOut((v) => !v)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-foreground px-5 py-3.5 text-sm font-medium text-background shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5 md:bottom-8 md:right-8"
      >
        {nerdOut ? "Back to summary" : "Want to nerd out? See the full build."}
      </button>
    </>
  );
}

/** Simple default case view — fixed structure for every case */
function SimpleCaseView({ c }: { c: CaseStudy }) {
  const gallery = c.screens.slice(1, 4);

  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-6 pt-24 pb-12 md:px-8 md:pt-32 md:pb-16">
        <Link
          to="/work"
          className="font-mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          ← All work
        </Link>

        <div className="mt-10">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
              Case {c.n} / {c.client} — {c.year}
            </p>
          </div>
          <h1
            className="font-display mt-8 max-w-5xl text-foreground"
            style={{
              fontSize: "clamp(2.5rem, 6.5vw, 6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
              fontWeight: 500,
            }}
          >
            {c.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 md:px-8">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-surface-alt md:rounded-[36px]">
            <ImagePlaceholder label="Hero image" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-7">
            <p className="max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
              {c.outcome}
            </p>
          </Reveal>

          <Reveal delay={80} className="md:col-span-5">
            <dl className="grid grid-cols-2 gap-6 border border-border p-6">
              <div>
                <dt className="eyebrow">Client</dt>
                <dd className="mt-2 text-sm text-foreground">{c.client}</dd>
              </div>
              <div>
                <dt className="eyebrow">Year</dt>
                <dd className="mt-2 text-sm text-foreground">{c.year}</dd>
              </div>
              <div>
                <dt className="eyebrow">Industry</dt>
                <dd className="mt-2 text-sm text-foreground">{c.industry}</dd>
              </div>
              <div>
                <dt className="eyebrow">Service</dt>
                <dd className="mt-2 text-sm text-foreground">{c.service}</dd>
              </div>
              {c.productUrl ? (
                <div className="col-span-2 border-t border-border pt-6">
                  <dt className="eyebrow">Product URL</dt>
                  <dd className="mt-2">
                    <a
                      href={c.productUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-foreground underline decoration-accent decoration-2 underline-offset-4"
                    >
                      {c.productUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 md:px-8 md:pb-24">
        <Reveal>
          <p className="eyebrow">Key features</p>
          <ul className="mt-8 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
            {c.keyFeatures.map((feature, index) => (
              <li key={feature} className="bg-background p-6">
                <p className="font-mono-label text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-6 text-base font-medium text-foreground">{feature}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {gallery.length > 0 ? (
        <section className="mx-auto max-w-[1440px] px-6 pb-16 md:px-8 md:pb-24">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
            {gallery.map((visual, index) => (
              <Reveal key={`${visual.caption}-${index}`} delay={index * 60}>
                <div
                  className={`relative overflow-hidden rounded-[16px] bg-surface-alt md:rounded-[24px] ${visual.ratio}`}
                >
                  <ImagePlaceholder label="Image" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1440px] px-6 pb-28 md:px-8 md:pb-36">
        <Reveal>
          <figure className="max-w-4xl">
            <blockquote
              className="font-display text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.035em",
                fontWeight: 500,
              }}
            >
              <span className="text-accent">"</span>
              {c.quote.text}
              <span className="text-accent">"</span>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
              <span className="h-10 w-10 rounded-full bg-foreground/10" aria-hidden />
              <div>
                <p className="text-sm text-foreground">{c.quote.name}</p>
                <p className="text-sm text-muted-foreground">{c.quote.role}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </section>
    </main>
  );
}

/** Existing deep-dive template — preserved as-is */
function CaseDeepDive({ c }: { c: CaseStudy }) {
  const related = getRelated(c.slug, 3);
  const visuals = c.screens;
  const problemCopy = c.problem;
  const buildCopy = c.built;
  const detailCards = getCaseDetailCards(c);
  const applicationVisuals = visuals.slice(5, 8);
  const closingVisuals = [
    {
      src: c.img,
      caption: `Results context — ${c.client} product in use`,
      ratio: "aspect-[4/5]",
    },
    {
      src: c.img,
      caption: "Launch handoff — product system, operations, and next-step roadmap",
      ratio: "aspect-[4/5]",
    },
  ];

  return (
    <main>
      <section className="mx-auto max-w-[1440px] px-6 pt-24 pb-12 md:px-8 md:pt-32 md:pb-16">
        <Link
          to="/work"
          className="font-mono-label inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          ← All work
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                Case {c.n} / {c.client} — {c.year}
              </p>
            </div>
            <h1
              className="font-display mt-8 text-foreground"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 6rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
                fontWeight: 500,
              }}
            >
              {c.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">{c.outcome}</p>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-border md:pl-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-1 md:gap-8">
              <div>
                <p className="eyebrow">Client</p>
                <p className="mt-2 text-base text-foreground">{c.client}</p>
              </div>
              <div>
                <p className="eyebrow">Year</p>
                <p className="mt-2 text-base text-foreground">{c.year}</p>
              </div>
              <div>
                <p className="eyebrow">Service</p>
                <p className="mt-2 text-base text-foreground">{c.service}</p>
              </div>
              <div>
                <p className="eyebrow">Stack</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {c.displayTags.map((t) => (
                    <span
                      key={t}
                      className="font-mono-label rounded-full border border-border px-3 py-1 text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 md:px-8">
        <VisualFigure visual={visuals[0]} index={0} priority="hero" />
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pt-20 pb-16 md:px-8 md:pt-28 md:pb-20">
        <NarrativeSection
          eyebrow="01 — The problem"
          title="The problem behind the brief"
          paragraph={problemCopy}
          cards={detailCards.problem}
        />
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-8 md:pb-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <VisualFigure visual={visuals[1]} index={1} />
          <VisualFigure visual={visuals[2]} index={2} />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 md:px-8 md:pb-20">
        <NarrativeSection
          eyebrow="02 — Build approach"
          title="How we built the right thing, and built it right"
          paragraph={buildCopy}
          cards={detailCards.build}
        />
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-8 md:pb-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <VisualFigure visual={visuals[3]} index={3} priority="wide" className="md:col-span-12" />
          <VisualFigure visual={visuals[4]} index={4} className="md:col-span-12" />
        </div>
      </section>

      {applicationVisuals.length > 0 ? (
        <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-8 md:pb-28">
          <Reveal>
            <div className="mb-10 grid grid-cols-1 gap-6 md:mb-14 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="eyebrow">03 — Product application</p>
                <h2
                  className="font-display mt-5 text-foreground"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.95,
                    fontWeight: 500,
                  }}
                >
                  The system in use.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end">
                Product surfaces, operational tooling, and reusable interface decisions that made
                the build usable after launch.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
            {applicationVisuals.map((s, i) => (
              <VisualFigure
                key={`${s.caption}-${i}`}
                visual={s}
                index={i + 5}
                className={i === 2 ? "md:col-span-12" : "md:col-span-6"}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="w-full bg-black text-white">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono-label uppercase tracking-wider text-white/70">
                04 — Results / What actually happened
              </p>
              <h2
                className="font-display mt-6 text-white"
                style={{
                  fontSize: "clamp(2.5rem, 5.5vw, 5.75rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.045em",
                  fontWeight: 500,
                }}
              >
                Proof it worked.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/70 md:col-span-5 md:justify-self-end">
              Launch signals from the project: what shipped, what became usable, and what gave the
              client a clearer product foundation.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 border border-white/20 md:grid-cols-3">
            {c.results.map((r, index) => (
              <div
                key={r.label}
                className={`min-h-[280px] p-6 md:p-8 ${
                  index < c.results.length - 1
                    ? "border-b border-white/20 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <p className="font-mono-label uppercase tracking-wider text-white/50">
                  Metric / {String(index + 1).padStart(2, "0")}
                </p>
                <p
                  className="font-display mt-16 text-white md:mt-20"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 5.5rem)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.045em",
                    fontWeight: 500,
                  }}
                >
                  {r.value}
                </p>
                <div className="mt-8 h-px w-full bg-white/20" />
                <p className="mt-5 text-base text-white/75">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {closingVisuals.map((visual, i) => (
            <VisualFigure key={visual.caption} visual={visual} index={visuals.length + i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-8 md:pb-32">
        <Reveal>
          <figure className="max-w-4xl">
            <p className="eyebrow">05 — Client quote</p>
            <blockquote
              className="font-display mt-8 text-foreground"
              style={{
                fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.035em",
                fontWeight: 500,
              }}
            >
              <span className="text-accent">"</span>
              {c.quote.text}
              <span className="text-accent">"</span>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
              <span className="h-10 w-10 rounded-full bg-foreground/10" aria-hidden />
              <div>
                <p className="text-sm text-foreground">{c.quote.name}</p>
                <p className="text-sm text-muted-foreground">{c.quote.role}</p>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-8 md:pb-32">
        <Reveal>
          <div className="rounded-[28px] border border-border bg-surface-alt p-8 md:rounded-[40px] md:p-14">
            <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-8">
                <p className="eyebrow">06 — Related service</p>
                <h3
                  className="font-display mt-6 text-foreground"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    fontWeight: 500,
                  }}
                >
                  {c.serviceCta}
                </h3>
              </div>
              <div className="md:col-span-4 md:justify-self-end">
                <Link
                  to="/services/$slug"
                  params={{ slug: c.serviceSlug }}
                  className="group inline-flex items-center gap-4 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition-transform hover:-translate-y-px"
                >
                  See the service
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
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-8 md:pb-32">
        <div className="mb-10 flex items-end justify-between md:mb-14">
          <div>
            <p className="eyebrow">07 — More work</p>
            <h2
              className="font-display mt-5 text-foreground"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                fontWeight: 500,
              }}
            >
              Keep reading.
            </h2>
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm text-foreground hover:border-foreground"
          >
            All cases
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 80}>
              <Link to="/work/$slug" params={{ slug: r.slug }} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-foreground md:rounded-[24px]">
                  <ImagePlaceholder label="Image" />
                  <span className="font-mono-label absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1.5 text-foreground backdrop-blur">
                    Case {r.n}
                  </span>
                </div>
                <h3
                  className="font-display mt-5 text-foreground"
                  style={{
                    fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
                    letterSpacing: "-0.03em",
                    fontWeight: 500,
                  }}
                >
                  <span className="text-muted-foreground">{r.client} —</span> {r.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}

function NarrativeSection({
  eyebrow,
  title,
  paragraph,
  cards,
}: {
  eyebrow: string;
  title: string;
  paragraph: string;
  cards: { title: string; body: string }[];
}) {
  return (
    <Reveal>
      <div className="border-t border-border pt-10 md:pt-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start md:gap-12">
          <div className="md:col-span-5">
            <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
              {eyebrow}
            </p>
            <h2
              className="font-display mt-4 text-foreground"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.75rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.98,
                fontWeight: 500,
              }}
            >
              {title}
            </h2>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{paragraph}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 border border-border md:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`min-h-[220px] p-6 md:p-7 ${
                index < cards.length - 1 ? "border-b border-border md:border-b-0 md:border-r" : ""
              }`}
            >
              <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-10 text-lg font-medium text-foreground">{card.title}</h3>
              <div className="my-5 h-px w-full bg-border" />
              <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function VisualFigure({
  visual,
  index,
  priority,
  className = "",
}: {
  visual?: CaseStudy["screens"][number];
  index: number;
  priority?: "hero" | "wide";
  className?: string;
}) {
  if (!visual) return null;

  const frameClass =
    priority === "hero"
      ? "rounded-[24px] md:rounded-[36px]"
      : priority === "wide"
        ? "rounded-[20px] md:rounded-[28px]"
        : "rounded-[16px] md:rounded-[24px]";

  return (
    <Reveal className={className}>
      <figure>
        <div className={`relative ${visual.ratio} overflow-hidden bg-surface-alt ${frameClass}`}>
          <ImagePlaceholder label="Image" />
        </div>
        <figcaption className="font-mono-label mt-3 text-muted-foreground">
          Image {String(index + 1).padStart(2, "0")} — {visual.caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
