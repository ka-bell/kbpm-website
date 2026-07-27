import { Link } from "@/components/Link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { ProcessFaq } from "@/components/site/ProcessFaq";
import { CtaBlock } from "@/components/site/CtaBlock";

const packages = [
  {
    id: "scan" as const,
    label: "Launch Scan",
    price: "EUR 250",
    tag: "Start here",
    body: "Fast technical scan with a practical risk and fix overview.",
    gets: [
      "Risk map of auth, data, APIs and secrets",
      "Prioritised fix list",
      "Clear recommendation: ship, harden, or pause",
    ],
    cta: "Book the Scan",
  },
  {
    id: "release" as const,
    label: "Release Ready",
    price: "EUR 1,500",
    tag: "Hands-on",
    body: "Full review, testing, and implementation pass for safe launch confidence.",
    gets: [
      "Everything in the Scan",
      "Critical and high-priority fixes in your codebase",
      "Production-readiness check on deploy and runtime",
    ],
    cta: "Book Release Ready",
  },
];

const timeline = [
  {
    name: "Intake",
    duration: "Day 1",
    copy: "Short call or async brief. You share the repo (or read-only access) and what you want live.",
  },
  {
    name: "Review",
    duration: "Day 2–3",
    copy: "We inspect auth, permissions, APIs, secrets, billing and the usual AI-code gaps.",
  },
  {
    name: "Harden",
    duration: "Day 3–4",
    copy: "On Release Ready we fix the launch-blocking issues. On Scan you get the map first.",
  },
  {
    name: "Ship",
    duration: "Day 5",
    copy: "You get a short report, remaining recommendations, and a clear go / no-go for launch.",
  },
];

const needFromYou = [
  {
    label: "01 / Access",
    text: "Repo link or read-only access. Staging URL if you have one. NDA is fine.",
  },
  {
    label: "02 / Context",
    text: "What the app does, who uses it, and when you want to launch.",
  },
  {
    label: "03 / Priority",
    text: "Anything you already know is shaky — auth, payments, AI features, admin.",
  },
];

const platforms = [
  "Cursor",
  "Lovable",
  "Claude",
  "Bolt",
  "v0",
  "Replit",
  "Supabase",
  "Firebase",
];

const risks = [
  { title: "Auth + Permissions", body: "Role checks, ownership, admin bypass." },
  { title: "Data + API Safety", body: "Server validation, secrets, database policies." },
  { title: "Secrets + Config", body: "Exposed keys, weak env separation, bad defaults." },
  { title: "Billing + Quotas", body: "Entitlements, webhooks, idempotency." },
  { title: "AI / Prompt Surface", body: "Tool calls, retrieval context, output handling." },
  { title: "Deploy + Runtime", body: "Hosting, logging, monitoring, rollback." },
];

const faqs = [
  {
    q: "How long does this take?",
    a: "A Launch Scan usually lands within a few working days. Release Ready is typically about a week, depending on repo access and how fast we can iterate on fixes.",
  },
  {
    q: "What access do you need?",
    a: "A repository (or read-only access), and ideally a staging environment. We can work under NDA. You keep ownership of everything.",
  },
  {
    q: "Do you only write a report, or do you change code?",
    a: "The Scan is diagnosis. Release Ready is hands-on — we fix critical and high-priority issues in your codebase, plus a short report with what is left.",
  },
  {
    q: "Will you break my app?",
    a: "We work on a branch or staging first whenever possible. Fixes stay scoped to launch risk — not redesigns or big feature work.",
  },
  {
    q: "What is not included?",
    a: "Full redesign, large new features, a complete rebuild, complex infrastructure migration, and ongoing maintenance — unless we agree that up front.",
  },
  {
    q: "What if the scope is bigger than the package?",
    a: "We flag it early, before extra work. You choose: stay in package scope, or expand with a clear next step.",
  },
];

export function GoToMarketPage() {
  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-7">
              <p className="eyebrow">§ Go-to-Market</p>
              <h1
                className="font-display mt-5 max-w-4xl text-foreground"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.045em",
                  fontWeight: 500,
                }}
              >
                Your vibecoded app looks ready. We make it actually ready to
                launch.
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Start with a €250 scan if you want clarity. Go Release Ready if
                you want us to fix the launch-blocking issues.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  search={{ interest: "scan" }}
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
                  search={{ interest: "release" }}
                  className="group inline-flex items-center gap-3 border border-border px-6 py-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-alt"
                >
                  Book Release Ready
                </Link>
              </div>
            </Reveal>
            <Reveal delay={80} className="md:col-span-5">
              <div className="border border-border bg-surface-alt p-6">
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  Best for
                </p>
                <p className="mt-3 text-lg font-medium text-foreground">
                  Founders with a working AI-built demo that needs to survive
                  real users.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <li>User accounts, private data, or payments</li>
                  <li>Built with Cursor, Lovable, v0, Bolt, Claude…</li>
                  <li>Launch in days or weeks — not months</li>
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
              Two clear offers. One ladder.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Most teams start with the Scan. If the risk is clear and you want
              us in the codebase, step up to Release Ready.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            {packages.map((pkg, index) => (
              <Reveal key={pkg.id} delay={index * 60}>
                <article className="flex h-full flex-col border border-border bg-background p-6 md:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                      {pkg.tag}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {pkg.price}
                      <span className="ml-1 text-muted-foreground">ex VAT</span>
                    </p>
                  </div>
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
        title="From intake to ship — about a week."
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
                Keep it light. Useful details beat a perfect brief — we can start
                as soon as access is there.
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
              <p className="eyebrow">Where demos break</p>
              <h2
                className="font-display mt-5 max-w-xl text-foreground"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  fontWeight: 500,
                }}
              >
                The failure zones we check first.
              </h2>
            </Reveal>
            <Reveal delay={60} className="md:col-span-6">
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:ml-auto md:text-right">
                Built with vibe-coding tools? We harden what you already shipped
                — Cursor, Lovable, Claude, Bolt, v0, Replit, Supabase, Firebase.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-8">
            {platforms.map((name) => (
              <span
                key={name}
                className="font-mono-label uppercase tracking-wider text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-1 border-t border-border md:grid-cols-2">
            {risks.map((item, index) => (
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
            Make it <span className="text-accent">release-ready</span>.
          </>
        }
        ctaLabel="Start with the Scan"
        search={{ interest: "scan" }}
      />
    </>
  );
}
