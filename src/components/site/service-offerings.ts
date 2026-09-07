/** Service groups — umbrellas for ordering individual services, not packages. */

import { serviceListsByPhase } from "./service-lists";

export type ServiceSlug = "validate" | "build" | "evolve" | "support";

export type ServiceGroup = {
  slug: ServiceSlug;
  name: string;
  order: number;
  /** When these services usually fit */
  when: string;
  /** Short group framing */
  goal: string;
  /** Intro under "What we offer" on the group page */
  panelIntro: string;
  capabilities: string[];
  examples: string[];
  outcome: string;
  cases: string[];
};

/** @deprecated Use ServiceGroup */
export type LifecyclePhase = ServiceGroup;

export const serviceOfferings: ServiceGroup[] = [
  {
    slug: "validate",
    name: "Validate",
    order: 1,
    when: "You need clarity before investing in design or development.",
    goal: "Direction before you commit to building.",
    panelIntro:
      "Audits, workshops and feasibility work — so you know what to build before you spend on it.",
    capabilities: [...serviceListsByPhase.validate.all],
    examples: [...serviceListsByPhase.validate.all],
    outcome: "A clear direction and a plan you can act on.",
    cases: ["mix-interiors", "virtue-worldwide", "scooply-ai"],
  },
  {
    slug: "build",
    name: "Build",
    order: 2,
    when: "You know what to make and need a senior team to design and develop it.",
    goal: "Design and develop the product.",
    panelIntro:
      "From prototype to platform — we design and develop the product end to end.",
    capabilities: [...serviceListsByPhase.build.all],
    examples: [...serviceListsByPhase.build.all],
    outcome: "A working digital product ready for real users.",
    cases: ["spilnews", "mix-interiors", "virtue-worldwide", "blink", "staatsloterij", "frame", "pepperminds"],
  },
  {
    slug: "evolve",
    name: "Evolve",
    order: 3,
    when: "Your product is live and you want to keep improving it.",
    goal: "Improve a product that's already in use.",
    panelIntro:
      "Features, AI, performance and analytics — for products that are already live.",
    capabilities: [...serviceListsByPhase.evolve.all],
    examples: [...serviceListsByPhase.evolve.all],
    outcome: "A product that keeps getting better.",
    cases: ["hopplay", "spilnews"],
  },
  {
    slug: "support",
    name: "Support",
    order: 4,
    when: "You need a trusted technical partner to keep everything running.",
    goal: "Keep the product stable, secure and supported.",
    panelIntro:
      "Maintenance, hosting, emergencies and fractional CTO — so nothing gets neglected after launch.",
    capabilities: [...serviceListsByPhase.support.all],
    examples: [...serviceListsByPhase.support.all],
    outcome: "A stable, secure product you don't have to babysit.",
    cases: ["academion", "hopplay"],
  },
];

/** Old package URLs → service group */
export const legacyServiceRedirects: Record<string, ServiceSlug> = {
  "prototype-sprint": "build",
  "product-development": "evolve",
};

export function getServiceOffering(slug: string) {
  const resolved = legacyServiceRedirects[slug] ?? slug;
  return serviceOfferings.find((group) => group.slug === resolved);
}

export function getServicePath(slug: ServiceSlug) {
  return `/services/${slug}` as const;
}

/** @deprecated Package model removed — maps old package ids to service group slugs */
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
