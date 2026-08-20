/**
 * Individual service detail pages — Part 2 of kb+pm-services-copy.md
 * Branded names + full page copy. Bracketed items are draft placeholders.
 */

export type ServicePhase = "validate" | "build" | "evolve" | "support";

export type ServiceDetail = {
  slug: string;
  /** Plain name as shown in widget / lists */
  plainName: string;
  /** Branded headline */
  name: string;
  phase: ServicePhase;
  phaseLabel: string;
  offerNumber: string;
  /** Stakes line under the headline */
  subhead: string;
  intro: string;
  whatYouGet: string[];
  howItWorks: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "proof-sprint",
    plainName: "Idea Validation",
    name: "Idea Validation",
    phase: "validate",
    phaseLabel: "Validation Offer",
    offerNumber: "01",
    subhead: "Pressure-test the idea before the expensive part starts.",
    intro:
      "A short, evidence-led sprint for founders and teams who need to know whether an idea is worth building, pitching, or killing.",
    whatYouGet: [
      "A written validation report: evidence for and against the idea",
      "A clear go / no-go / adjust recommendation",
      "Key risks and open questions flagged before you build",
    ],
    howItWorks: [
      "Kickoff — align on the idea and what \"validated\" means for you",
      "Evidence gathering — user signals, market signals, technical feasibility",
      "Findings session — walk through what we found, together",
      "Report delivered — your go / no-go, in writing",
    ],
  },
  {
    slug: "site-check",
    plainName: "Website & Product Audit",
    name: "Site Check",
    phase: "validate",
    phaseLabel: "Audit Offer",
    offerNumber: "02",
    subhead: "Know what's solid, what's broken, and what it'll take to fix.",
    intro:
      "A structured review of your existing site or product, for teams who aren't sure if what they have can support what's next.",
    whatYouGet: [
      "A written audit report scored across UX, technical, and performance criteria",
      "A prioritised list of fixes, ranked by impact and effort",
      "A clear recommendation: fix, extend, or rebuild",
    ],
    howItWorks: [
      "We review your product against real technical and UX standards",
      "Findings compiled into a report — no jargon, no fluff",
      "Walkthrough session to go through what we found and what to do next",
    ],
  },
  {
    slug: "direction-workshop",
    plainName: "Discovery Workshop",
    name: "Direction Workshop",
    phase: "validate",
    phaseLabel: "Alignment Offer",
    offerNumber: "03",
    subhead: "One session. A clear brief, not just notes.",
    intro:
      "A focused workshop with your team to align on the problem, the users, and what success actually looks like — before any design or build work starts.",
    whatYouGet: [
      "A written brief: problem statement, target users, success criteria",
      "Alignment across your team on what you're actually building and why",
    ],
    howItWorks: [
      "Pre-workshop prep — a short questionnaire so the session isn't wasted on context-setting",
      "Half-day workshop with key stakeholders",
      "Brief delivered within a few days of the session",
    ],
  },
  {
    slug: "build-risk-review",
    plainName: "Technical Feasibility Review",
    name: "Build Risk Review",
    phase: "validate",
    phaseLabel: "Feasibility Offer",
    offerNumber: "04",
    subhead: "Catch the expensive mistakes on paper, not in production.",
    intro:
      "Technical due diligence before you commit to building — assessing feasibility, risk, and architecture decisions before they get expensive to change.",
    whatYouGet: [
      "A technical risk assessment covering architecture, integrations, and scale",
      "A recommended technical approach, with alternatives considered and ruled out",
      "Realistic cost and timeline implications before you commit",
    ],
    howItWorks: [
      "We review your concept, existing systems, and constraints",
      "Technical assessment and options laid out",
      "Recommendation delivered, with reasoning — not just a verdict",
    ],
  },
  {
    slug: "product-roadmap",
    plainName: "Product Roadmap",
    name: "Product Roadmap",
    phase: "validate",
    phaseLabel: "Planning Offer",
    offerNumber: "05",
    subhead: "A validated idea, turned into a sequenced plan.",
    intro:
      "For teams who know what they want to build but need it sequenced — what gets built first, what waits, and why.",
    whatYouGet: [
      "A prioritised roadmap, sequenced by impact and effort",
      "Clear phases with defined outcomes, not just a task list",
    ],
    howItWorks: [
      "Review of your validated direction and constraints",
      "Roadmap drafted and prioritised",
      "Review session to adjust based on your input",
    ],
  },
  {
    slug: "zero-to-one",
    plainName: "MVP Development",
    name: "Zero to One",
    phase: "build",
    phaseLabel: "MVP Offer",
    offerNumber: "06",
    subhead: "A working first version — fast enough to test, solid enough to build on.",
    intro:
      "We take a validated idea and build a working first version, so you can get it in front of real users fast.",
    whatYouGet: [
      "A live, working MVP — not a prototype or a mockup",
      "Built on an architecture that can scale if the MVP proves out",
    ],
    howItWorks: [
      "Scoping — what's essential for version one, what waits",
      "Design and build, in short, visible sprints",
      "Launch — live, and ready for real users",
    ],
  },
  {
    slug: "platform-build",
    plainName: "Platform Development",
    name: "Platform Build",
    phase: "build",
    phaseLabel: "Platform Offer",
    offerNumber: "07",
    subhead: "Full design and development of a complex digital product, end to end.",
    intro:
      "For teams whose product is too complex, too important, or too technical to leave to a junior team.",
    whatYouGet: [
      "A fully designed and built platform, from architecture to launch",
      "Senior product, design, and engineering involvement throughout — not a rotating team",
    ],
    howItWorks: [
      "Kickoff and architecture planning",
      "Design and development in parallel, in structured phases",
      "QA and launch",
      "Optional handover into an Evolve or Support engagement",
    ],
  },
  {
    slug: "portal-build",
    plainName: "Customer Portal Development",
    name: "Portal Build",
    phase: "build",
    phaseLabel: "Portal Offer",
    offerNumber: "08",
    subhead: "A dedicated portal for your customers or users, designed and built from scratch.",
    intro:
      "For teams that need a proper, purpose-built portal — not a bolted-on feature of something else.",
    whatYouGet: [
      "A fully designed and built customer or user portal",
      "Built to integrate with your existing systems",
    ],
    howItWorks: [
      "Scoping the portal's core use cases",
      "Design and build",
      "QA and launch",
    ],
  },
  {
    slug: "campaign-site",
    plainName: "Campaign & Marketing Website",
    name: "Campaign Site",
    phase: "build",
    phaseLabel: "Campaign Offer",
    offerNumber: "09",
    subhead: "Live fast, built properly.",
    intro: "A focused website for a single campaign, launch, or marketing push.",
    whatYouGet: ["A live campaign or marketing website, built to your timeline"],
    howItWorks: [
      "Brief and design",
      "Build",
      "Launch — fast turnaround, without cutting corners",
    ],
  },
  {
    slug: "feature-sprint",
    plainName: "Feature Development",
    name: "Feature Sprint",
    phase: "evolve",
    phaseLabel: "Feature Offer",
    offerNumber: "10",
    subhead: "New functionality, without breaking what already works.",
    intro:
      "For teams adding to a product that's already live and can't afford to disrupt it.",
    whatYouGet: [
      "New feature(s), designed and built to fit your existing product",
      "No disruption to what's already working",
    ],
    howItWorks: [
      "Scoping the feature against your existing product",
      "Design and build",
      "QA and release",
    ],
  },
  {
    slug: "ai-fit-check",
    plainName: "AI Integration",
    name: "AI Fit Check + Build",
    phase: "evolve",
    phaseLabel: "AI Offer",
    offerNumber: "11",
    subhead: "We find where AI actually helps. Then we build it.",
    intro:
      "For teams wondering if AI belongs in their product — we tell you honestly, then build it if it does.",
    whatYouGet: [
      "An honest assessment of where AI would and wouldn't help your product",
      "If it's a fit: a built, working AI feature",
    ],
    howItWorks: [
      "Fit check — where AI could genuinely add value, and where it's just noise",
      "If it's a fit: scoping and build",
      "Launch",
    ],
  },
  {
    slug: "speed-fix",
    plainName: "Performance Optimisation",
    name: "Speed Fix",
    phase: "evolve",
    phaseLabel: "Performance Offer",
    offerNumber: "12",
    subhead: "Find what's slowing you down. Then fix it.",
    intro: "For products that are getting slower as they grow.",
    whatYouGet: [
      "A performance audit, with root causes identified",
      "The fixes implemented — not just a report",
    ],
    howItWorks: [
      "Performance audit",
      "Fixes prioritised and implemented",
      "Before/after performance comparison",
    ],
  },
  {
    slug: "signal-setup",
    plainName: "Analytics Setup",
    name: "Signal Setup",
    phase: "evolve",
    phaseLabel: "Analytics Offer",
    offerNumber: "13",
    subhead: "See what's actually happening in your product.",
    intro: "For teams making decisions on guesses instead of data.",
    whatYouGet: [
      "Tracking implemented across key user flows",
      "A dashboard showing what's actually happening",
    ],
    howItWorks: [
      "Define what actually needs measuring",
      "Implementation",
      "Dashboard delivered and explained",
    ],
  },
  {
    slug: "always-on",
    plainName: "Maintenance Retainer",
    name: "Always On",
    phase: "support",
    phaseLabel: "Retainer Offer",
    offerNumber: "14",
    subhead: "Monthly coverage, so nothing gets neglected.",
    intro:
      "Ongoing support after launch — updates, security patches, and monitoring, on a defined monthly cadence.",
    whatYouGet: [
      "Monthly maintenance: updates, patches, monitoring",
      "A defined point of contact, not a ticket queue",
    ],
    howItWorks: [
      "Onboarding — we learn your product and set up monitoring",
      "Ongoing monthly coverage",
      "Regular reporting, so you know what's been done",
    ],
  },
  {
    slug: "managed-hosting",
    plainName: "Hosting & Infrastructure Management",
    name: "Managed Hosting",
    phase: "support",
    phaseLabel: "Hosting Offer",
    offerNumber: "15",
    subhead: "Uptime, handled.",
    intro:
      "We manage your hosting and infrastructure so it's not something you have to think about.",
    whatYouGet: [
      "Hosting and infrastructure fully managed on your behalf",
      "Uptime monitoring and proactive issue resolution",
    ],
    howItWorks: [
      "Infrastructure review and (if needed) migration",
      "Ongoing management",
    ],
  },
  {
    slug: "on-call",
    plainName: "Emergency Support",
    name: "On Call",
    phase: "support",
    phaseLabel: "Emergency Offer",
    offerNumber: "16",
    subhead: "A direct line to someone who knows your product.",
    intro:
      "For when something breaks and you need it fixed fast, by someone who already understands your system.",
    whatYouGet: [
      "A defined response-time XLA (Experience Level Agreement) — focused on the outcome you experience, not just a ticket-response clock",
      "Direct access to an engineer familiar with your product — not a generic support queue",
    ],
    howItWorks: [
      "Something breaks — you contact us directly",
      "Response within the agreed XLA",
      "Fixed, with a summary of what happened and why",
    ],
  },
];

export function getServiceDetail(slug: string) {
  return serviceDetails.find((s) => s.slug === slug);
}

export function getServiceDetailByPlainName(plainName: string) {
  return serviceDetails.find((s) => s.plainName === plainName);
}
