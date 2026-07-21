/** Lifecycle phases — not service packages. From Phase 1 architecture. */

export type ServiceSlug = "validate" | "build" | "evolve" | "support";

export type LifecyclePhase = {
  slug: ServiceSlug;
  name: string;
  order: number;
  /** When does a client come to us? */
  when: string;
  /** Goal of this phase */
  goal: string;
  capabilities: string[];
  /** Concrete examples of work (not case studies) */
  examples: string[];
  outcome: string;
  /** Related case slugs */
  cases: string[];
  /** Next phase in the lifecycle */
  nextSlug: ServiceSlug;
};

export const serviceOfferings: LifecyclePhase[] = [
  {
    slug: "validate",
    name: "Validate",
    order: 1,
    when: "They have an idea but need clarity before investing in design or development.",
    goal: "Create direction before build starts.",
    capabilities: [
      "Discovery Workshops",
      "Product Strategy",
      "User Research",
      "Technical Discovery",
      "AI Opportunity Scan",
      "Roadmapping",
    ],
    examples: [
      "Validate an AI product concept",
      "Define the roadmap for a SaaS platform",
      "Technical due diligence before development",
      "Scope a complex platform",
    ],
    outcome: "A validated product direction and clear execution plan.",
    cases: ["mix-interiors", "virtue-worldwide"],
    nextSlug: "build",
  },
  {
    slug: "build",
    name: "Build",
    order: 2,
    when: "They know what they want to build and need a senior product team to design and develop it.",
    goal: "Design and develop the product.",
    capabilities: [
      "UX/UI Design",
      "Product Engineering",
      "Front-end",
      "Back-end",
      "AI Integrations",
      "CMS Development",
      "Infrastructure",
      "QA & Launch",
    ],
    examples: [
      "Headless website",
      "AI platform",
      "Customer portal",
      "Campaign platform",
      "Internal tooling",
      "SaaS product",
    ],
    outcome: "A production-ready digital product.",
    cases: ["spilnews", "mix-interiors", "virtue-worldwide"],
    nextSlug: "evolve",
  },
  {
    slug: "evolve",
    name: "Evolve",
    order: 3,
    when: "Their product is live and they want to keep improving it.",
    goal: "Continuously improve a live product.",
    capabilities: [
      "Feature Development",
      "Product Optimisation",
      "AI Enhancements",
      "Performance",
      "Analytics",
      "Product Roadmapping",
    ],
    examples: [
      "Add AI functionality",
      "Improve subscription flows",
      "Extend an existing CMS",
      "Optimise platform performance",
    ],
    outcome: "A product that continuously improves.",
    cases: ["hopplay", "spilnews"],
    nextSlug: "support",
  },
  {
    slug: "support",
    name: "Support",
    order: 4,
    when: "They need a trusted technical partner to keep everything running.",
    goal: "Keep the product stable, secure and supported.",
    capabilities: [
      "Monitoring",
      "Maintenance",
      "Hosting",
      "Security",
      "Bug Fixes",
      "Technical Support",
      "Incident Response",
    ],
    examples: [
      "Ongoing support after launch",
      "Hosting and infrastructure management",
      "Security updates",
      "Incident resolution",
      "Monthly maintenance",
    ],
    outcome: "A stable, secure and supported digital product.",
    cases: ["academion", "hopplay"],
    nextSlug: "evolve",
  },
];

/** Old package URLs → lifecycle phase */
export const legacyServiceRedirects: Record<string, ServiceSlug> = {
  "proof-sprint": "validate",
  "prototype-sprint": "build",
  "product-development": "evolve",
  "go-to-market": "build",
  "eu-first-infrastructure": "support",
};

export function getServiceOffering(slug: string) {
  const resolved = legacyServiceRedirects[slug] ?? slug;
  return serviceOfferings.find((phase) => phase.slug === resolved);
}

export function getServicePath(slug: ServiceSlug) {
  return `/services/${slug}` as const;
}

/** @deprecated Package model removed — maps old package ids to lifecycle slugs */
export function getServiceSlugByPackage(id: string) {
  const map: Record<string, ServiceSlug> = {
    proof: "validate",
    prototype: "build",
    product: "evolve",
    gtm: "build",
    infra: "support",
  };
  return map[id] ?? ("build" as ServiceSlug);
}

export function getServicePathByPackage(id: string) {
  return getServicePath(getServiceSlugByPackage(id));
}
