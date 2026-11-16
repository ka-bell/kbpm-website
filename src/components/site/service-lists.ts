/**
 * Plain service names + panel copy from the services brief.
 * Homepage widget = `widget` only. Phase pages + overview = `all`.
 * Panel descriptions power the interactive "What we offer" selector.
 */
export const serviceListsByPhase = {
  validate: {
    widget: [
      "Website & Product Audit",
      "Idea Validation",
      "Discovery Workshop",
      "Technical Feasibility Review",
    ],
    all: [
      "Website & Product Audit",
      "Idea Validation",
      "Discovery Workshop",
      "Technical Feasibility Review",
      "Product Roadmap",
      "Innovation Sprint",
    ],
  },
  build: {
    widget: [
      "Prototype Build",
      "MVP Development",
      "Platform Development",
      "Campaign & Marketing Website",
    ],
    all: [
      "Prototype Build",
      "MVP Development",
      "Platform Development",
      "Campaign & Marketing Website",
      "Customer Portal Development",
      "Agency Partner / White-Label Development",
      "API Development & Integration",
      "E-commerce Development",
      "Mobile App Development",
      "Headless CMS Development",
    ],
  },
  evolve: {
    widget: [
      "Feature Development",
      "AI Integration",
      "Performance Optimisation",
      "Analytics Setup",
    ],
    all: [
      "Feature Development",
      "AI Integration",
      "Performance Optimisation",
      "Analytics Setup",
      "Legacy System Modernisation",
      "Conversion Rate Optimisation (CRO)",
      "Scalability Review",
    ],
  },
  support: {
    widget: [
      "Maintenance Retainer",
      "Hosting & Infrastructure Management",
      "Emergency Support",
      "Fractional CTO",
    ],
    all: [
      "Maintenance Retainer",
      "Hosting & Infrastructure Management",
      "Emergency Support",
      "Fractional CTO",
      "Security Monitoring & Penetration Testing",
      "Technical Documentation & Knowledge Transfer",
    ],
  },
} as const;

/** Compact copy for the interactive phase-page selector panel */
export const servicePanelCopy: Record<string, string> = {
  "Website & Product Audit":
    "Send us the link — we'll review it against real technical and UX standards and tell you what's solid, what's not.",
  "Idea Validation":
    "Not sure if it's worth building? We'll pressure-test it with real evidence before you commit.",
  "Discovery Workshop":
    "One focused session with your team to align on the problem, the users, and what success looks like.",
  "Technical Feasibility Review":
    "We'll assess the risk and architecture before you commit — so the expensive mistakes get caught on paper.",
  "Product Roadmap":
    "Have direction but no plan? We'll sequence what gets built, and when.",
  "Innovation Sprint":
    "Stuck between options? A short sprint to explore the idea space and lock a direction worth building.",

  "Prototype Build":
    "Need to prove it works before committing to a full build? We'll build a fully functional prototype, fast.",
  "MVP Development":
    "We'll take your validated idea and build a working first version — solid enough to build on, fast enough to test.",
  "Platform Development":
    "Full design and development of a complex digital product, end to end.",
  "Customer Portal Development":
    "A dedicated portal for your customers or users, designed and built from scratch.",
  "Campaign & Marketing Website":
    "Need a site live fast for a launch or campaign? We'll build it properly, on your timeline.",
  "Agency Partner / White-Label Development":
    "Need a technical team behind your agency's pitch? We build it, you present it.",
  "API Development & Integration":
    "Need systems talking to each other? We build and connect the APIs that make it work.",
  "E-commerce Development":
    "Building an online store? We design and build it to actually convert, not just look good.",
  "Mobile App Development":
    "Need your product on iOS or Android? We design and build native or cross-platform apps.",
  "Headless CMS Development":
    "Want content managed separately from how it's displayed? We build headless CMS setups that scale with you.",

  "Feature Development":
    "Need to add to a product that's already live, without breaking what works? This is that.",
  "AI Integration":
    "Wondering if AI belongs in your live product? We find where it helps, and build it in.",
  "Performance Optimisation":
    "Product getting slower as it grows? We find what's holding it back and fix it.",
  "Analytics Setup":
    "Not sure what's actually working? We set up the data that tells you.",
  "Legacy System Modernisation":
    "Running on an outdated system? We modernise it without disrupting what's already working.",
  "Conversion Rate Optimisation (CRO)":
    "Traffic's fine but conversions aren't? We find the friction and fix it.",
  "Scalability Review":
    "Growing fast and not sure your platform can keep up? We review it and tell you honestly.",

  "Maintenance Retainer":
    "Monthly coverage — updates, patches, and monitoring, so nothing gets neglected after launch.",
  "Hosting & Infrastructure Management":
    "We manage your hosting and infrastructure, so uptime isn't something you think about.",
  "Emergency Support":
    "Something down right now? A direct line to an engineer who knows your product, with a clear XLA.",
  "Fractional CTO":
    "Need senior technical leadership, without hiring a CTO? We step in as yours.",
  "Security Monitoring & Penetration Testing":
    "Want to know where you're exposed before someone else finds it? We test and monitor continuously.",
  "Technical Documentation & Knowledge Transfer":
    "Building an internal team? We document what we built, so your team can take it from here.",
};

export function getServicePanelCopy(name: string, _phaseName?: string) {
  return (
    servicePanelCopy[name] ??
    "Tell us about this need and we'll map scope, timing, and the first useful next step."
  );
}

/** Blue meta pills on the offer panel — Figma 10621:18715 */
export const servicePanelTags: Record<string, string[]> = {
  "Website & Product Audit": ["5 working days", "Written report", "Fixed fee"],
  "Idea Validation": ["2 weeks", "Go / no-go report", "Fixed fee"],
  "Discovery Workshop": ["Half day", "Written brief", "Fixed fee"],
  "Technical Feasibility Review": [
    "1–2 weeks",
    "Risk assessment",
    "Fixed fee",
  ],
  "Product Roadmap": ["1–2 weeks", "Sequenced plan", "Fixed fee"],
  "Innovation Sprint": ["1–2 weeks", "Direction locked", "Fixed fee"],
  "Prototype Build": ["Fast turnaround", "Working prototype", "Fixed scope"],
  "MVP Development": ["Live MVP", "Scalable base", "Sprint delivery"],
  "Platform Development": ["End to end", "Senior-led", "Phased build"],
  "Customer Portal Development": ["Custom portal", "Integrations", "Launch ready"],
  "Campaign & Marketing Website": ["Fast launch", "Campaign-ready", "Fixed scope"],
  "Agency Partner / White-Label Development": [
    "White-label",
    "Agency partner",
    "Flexible",
  ],
  "API Development & Integration": ["APIs", "Integrations", "Documented"],
  "E-commerce Development": ["Conversion-led", "Store build", "Launch ready"],
  "Mobile App Development": ["iOS / Android", "Product design", "Launch ready"],
  "Headless CMS Development": ["Headless", "Scalable", "Editor-friendly"],
  "Feature Development": ["Non-disruptive", "Feature sprint", "QA included"],
  "AI Integration": ["Fit check", "Build if useful", "Honest advice"],
  "Performance Optimisation": ["Audit + fix", "Measurable gains", "Root cause"],
  "Analytics Setup": ["Tracking", "Dashboard", "Actionable"],
  "Legacy System Modernisation": ["No downtime", "Modern stack", "Phased"],
  "Conversion Rate Optimisation (CRO)": [
    "Friction audit",
    "A/B ready",
    "Conversion lift",
  ],
  "Scalability Review": ["Honest review", "Growth plan", "Risk map"],
  "Maintenance Retainer": ["Monthly", "Monitoring", "Named contact"],
  "Hosting & Infrastructure Management": [
    "Managed hosting",
    "Uptime",
    "Proactive",
  ],
  "Emergency Support": ["Direct line", "Defined XLA", "Product-aware"],
  "Fractional CTO": ["Senior leadership", "Part-time", "Strategic"],
  "Security Monitoring & Penetration Testing": [
    "Continuous",
    "Pen test",
    "Remediation",
  ],
  "Technical Documentation & Knowledge Transfer": [
    "Docs",
    "Handover",
    "Team-ready",
  ],
};

export function getServicePanelTags(name: string) {
  return servicePanelTags[name] ?? ["Senior-led", "Clear scope", "Fixed fee"];
}
