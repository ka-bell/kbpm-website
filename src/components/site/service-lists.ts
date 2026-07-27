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
    "Tell us about this need and we'll map scope, timing, and the first useful next step.",

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
