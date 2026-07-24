import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { ProcessFaq } from "@/components/site/ProcessFaq";
import { CtaBlock } from "@/components/site/CtaBlock";

export const Route = createFileRoute("/european-first-infrastructure")({
  head: () => ({
    meta: [
      { title: "European-first infrastructure — kbell + postman" },
      {
        name: "description",
        content:
          "Map, design and run products on European-first infrastructure — start with an EU Stack Scan.",
      },
      {
        property: "og:title",
        content: "European-first infrastructure — kbell + postman",
      },
      {
        property: "og:description",
        content:
          "Build fast, keep your data safe. A practical EU-first product stack.",
      },
    ],
    links: [{ rel: "canonical", href: "/european-first-infrastructure" }],
  }),
  component: EuropeanFirstPage,
});

const packages = [
  {
    id: "eu-scan" as const,
    label: "EU Stack Scan",
    tag: "Start here",
    body: "Know where your product really runs — providers, data flows, lock-in and migration options.",
    gets: [
      "Map of current stack and dependencies",
      "Risk and residency overview",
      "Staged plan: what to change now vs later",
    ],
    cta: "Book the Scan",
  },
  {
    id: "eu-setup" as const,
    label: "EU-First Setup",
    tag: "Build",
    body: "Hosting, database, storage, email, backups and deployment on European infrastructure from day one.",
    gets: [
      "Practical EU architecture for your stage",
      "Staging + production foundations",
      "Clear ownership of keys, data and deploy",
    ],
    cta: "Plan my setup",
  },
  {
    id: "eu-migrate" as const,
    label: "Migration Plan",
    tag: "Move",
    body: "Move off Firebase, Vercel, AWS or other default stacks without breaking the product.",
    gets: [
      "Phased migration, highest-risk first",
      "Downtime and rollback thinking",
      "Portable building blocks, less lock-in",
    ],
    cta: "Plan migration",
  },
];

const timeline = [
  {
    name: "Map",
    duration: "Week 1",
    copy: "Infrastructure, providers, data flows and dependencies — so decisions are based on reality, not assumptions.",
  },
  {
    name: "Design",
    duration: "Week 1–2",
    copy: "A practical EU-first architecture for your product stage: what stays, what moves, what can wait.",
  },
  {
    name: "Build",
    duration: "As scoped",
    copy: "Hosting, data, email, deployment and product foundations on European platforms you can explain.",
  },
  {
    name: "Run",
    duration: "Ongoing",
    copy: "Monitoring, backups, ownership docs and migration readiness — so you stay in control after go-live.",
  },
];

const needFromYou = [
  {
    label: "01 / Context",
    text: "What the product does, who uses it, and why EU-first matters now (clients, compliance, positioning).",
  },
  {
    label: "02 / Stack",
    text: "Current hosting, database, auth, email, AI and storage — even a rough list is enough to start.",
  },
  {
    label: "03 / Constraints",
    text: "Regions that matter, timeline pressure, and anything that cannot move yet.",
  },
];

const providers = [
  "Hetzner",
  "OVHcloud",
  "Scaleway",
  "Bunny.net",
  "IONOS",
  "UpCloud",
  "Exoscale",
  "Brevo",
];

const stack = [
  {
    title: "Hosting & deployment",
    body: "European servers, containers, staging, production and deploy workflows.",
  },
  {
    title: "Databases & storage",
    body: "Postgres, backups, file storage and S3-compatible object storage.",
  },
  {
    title: "Email & notifications",
    body: "Transactional email, invites, password resets and system messages.",
  },
  {
    title: "Product architecture",
    body: "Frontend, backend, APIs, admin, auth, logs and background jobs.",
  },
  {
    title: "AI workflows",
    body: "Clear choices on sensitive data, processing and where content goes.",
  },
  {
    title: "Security & operations",
    body: "Backups, monitoring, secrets handling and practical runtime hardening.",
  },
];

const faqs = [
  {
    q: "Where should we start?",
    a: "Most teams start with an EU Stack Scan. You get a clear map and a staged plan before spending on migration or a full setup.",
  },
  {
    q: "Do we need to migrate everything to Europe at once?",
    a: "No. We usually phase this — map first, then move the highest-risk or highest-value parts. That avoids downtime and keeps product delivery moving.",
  },
  {
    q: "Will an EU-first setup hurt performance for global users?",
    a: "Not by default. We design region-aware architectures with CDN, caching and routing so European residency and strong UX can coexist.",
  },
  {
    q: "What do you need from us to start?",
    a: "A short product context, a rough list of current providers, and any hard constraints on region or timeline. Repo or infra access helps for a Scan, but is not always required on day one.",
  },
  {
    q: "Can we still use AI with strict data requirements?",
    a: "Yes. We separate sensitive and non-sensitive flows, define what can leave your controlled environment, and choose patterns that fit your constraints.",
  },
  {
    q: "Is European-first always cheaper?",
    a: "Not always line-by-line. Often better in total cost once compliance pressure, migration risk and long-term flexibility are included — we compare realistic operational cost, not headline pricing only.",
  },
];

function EuropeanFirstPage() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-7">
              <p className="eyebrow">§ European-first infrastructure</p>
              <h1
                className="font-display mt-5 max-w-4xl text-foreground"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.045em",
                  fontWeight: 500,
                }}
              >
                Build fast, keep your data safe.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Start with a Stack Scan if you want clarity. Set up or migrate
                when the map is clear — without making infra unnecessarily
                complex.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  search={{ interest: "eu-scan" }}
                  className="group inline-flex items-center gap-3 bg-foreground px-6 py-4 text-sm font-medium text-background"
                >
                  Start with the Scan
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                    aria-hidden
                  />
                </Link>
                <Link
                  to="/contact"
                  search={{ interest: "eu-migrate" }}
                  className="group inline-flex items-center gap-3 border border-border px-6 py-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
                >
                  Plan a migration
                </Link>
              </div>
            </Reveal>
            <Reveal delay={80} className="md:col-span-5">
              <div className="border border-border bg-surface-alt p-6">
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  Best for
                </p>
                <p className="mt-3 text-lg font-medium text-foreground">
                  Founders, agencies and SaaS teams who need data control they
                  can explain to clients.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <li>Customer data, documents or member accounts</li>
                  <li>Privacy positioning and EU residency</li>
                  <li>Less lock-in than the default US cloud stack</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow">Choose your path</p>
            <h2
              className="font-display mt-5 max-w-3xl text-foreground"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 500,
              }}
            >
              Three ways in. One ladder.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Most products start with a Scan. Then you either set up EU-first
              foundations or migrate what already exists.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <Reveal key={pkg.id} delay={index * 60}>
                <article className="flex h-full flex-col border border-border bg-background p-6 md:p-8">
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    {pkg.tag}
                  </p>
                  <h3 className="mt-4 text-2xl font-medium text-foreground">
                    {pkg.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pkg.body}
                  </p>
                  <ul className="mt-8 flex-1 space-y-2 border-t border-border pt-6 text-sm text-foreground">
                    {pkg.gets.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    search={{ interest: pkg.id }}
                    className="group mt-8 inline-flex w-full items-center justify-between gap-3 bg-foreground px-5 py-3 text-sm font-medium text-background"
                  >
                    {pkg.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                      aria-hidden
                    />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline
        eyebrow="§ How it works"
        title="Map first. Then design, build and run."
        steps={timeline}
        className="border-b border-border bg-background"
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <Reveal className="md:col-span-5">
              <p className="eyebrow">Onboarding</p>
              <h2
                className="font-display mt-5 text-foreground"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  fontWeight: 500,
                }}
              >
                What we need from you.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Useful context beats a perfect architecture doc. We can start
                from a messy stack list.
              </p>
            </Reveal>
            <Reveal delay={60} className="md:col-span-7">
              <div className="border border-border">
                {needFromYou.map((step, index) => (
                  <div
                    key={step.label}
                    className={`p-5 md:p-6 ${
                      index < needFromYou.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                      {step.label}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-6">
              <p className="eyebrow">Stack</p>
              <h2
                className="font-display mt-5 max-w-xl text-foreground"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  fontWeight: 500,
                }}
              >
                A practical European product stack.
              </h2>
            </Reveal>
            <Reveal delay={60} className="md:col-span-6">
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:ml-auto md:text-right">
                Most products quietly land on the default cloud stack — fine
                until customer data, AI workflows or client questions make
                residency matter.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-8">
            {providers.map((name) => (
              <span
                key={name}
                className="font-mono-label uppercase tracking-wider text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-1 border-t border-border md:grid-cols-2">
            {stack.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 30}>
                <div
                  className={`border-b border-border py-5 md:py-6 ${
                    index % 2 === 0 ? "md:pr-10 md:border-r" : "md:pl-10"
                  }`}
                >
                  <h3 className="text-base font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessFaq
        eyebrow="§ FAQ"
        title="Quick answers before you book."
        faqs={faqs}
      />

      <CtaBlock
        eyebrow="§ Next"
        title={
          <>
            Map your <span className="text-accent">EU-first</span> setup.
          </>
        }
        ctaLabel="Start with the Scan"
        search={{ interest: "eu-scan" }}
      />
    </>
  );
}
