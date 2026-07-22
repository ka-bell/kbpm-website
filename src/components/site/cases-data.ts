import spilImg from "@/assets/case-spilnews.jpg";
import plusImg from "@/assets/case-plus.jpg";
import seaImg from "@/assets/case-sea.jpg";
import blinkImg from "@/assets/case-blink.jpg";
import academionImg from "@/assets/case-academion.jpg";

export type Filter =
  | "All"
  | "Agency Build"
  | "Product"
  | "AI"
  | "Platform"
  | "Technical Sprint";

export type CaseStudy = {
  slug: string;
  n: string;
  client: string;
  title: string;
  outcome: string;
  tags: Filter[];
  displayTags: string[];
  metric: string;
  metricLabel: string;
  img: string;
  year: string;
  service: string;
  serviceSlug: "validate" | "build" | "evolve" | "support";
  serviceCta: string;
  context?: string;
  problem: string;
  built: string;
  craft: string;
  screens: { src: string; caption: string; ratio: string }[];
  results: { value: string; label: string }[];
  quote: { text: string; name: string; role: string };
};

export const cases: CaseStudy[] = [
  {
    slug: "spilnews",
    n: "01",
    client: "SpilNews",
    title: "Video news platform for modern editorial teams.",
    outcome: "A dedicated video publishing platform for creating, managing, and distributing video-first news content.",
    tags: ["Product", "Agency Build"],
    displayTags: ["Mediahuis", "Video Platform", "CMS"],
    metric: "MVP",
    metricLabel: "Launched into SPIL ecosystem",
    img: spilImg,
    year: "2025",
    service: "Build → Evolve",
    serviceSlug: "build",
    serviceCta: "This was a Build engagement. Want one?",
    context:
      "Brought in as the product build partner for SpilNews / Mediahuis. They needed a modern publishing environment for video-first news — editorial workflows, metadata, scheduling, permissions, and distribution without forcing the team into a system built mainly for written articles.",
    problem:
      "Traditional publishing systems are primarily built around written articles, making it difficult for editorial teams to efficiently manage and publish video content within the same workflow.",
    built:
      "We designed and built a dedicated video publishing platform that gives editorial teams a streamlined environment for managing video content, metadata, publishing workflows, scheduling, and user permissions.",
    craft:
      "The work combined product strategy, UX design, UI design, a design system, front-end development, back-end development, and product management. The platform was shaped around practical editorial use: fast publishing, clear dashboard states, reusable CMS structures, and room for future video workflows.",
    screens: [
      { src: spilImg, caption: "Product hero — video-first publishing platform", ratio: "aspect-[16/9]" },
      { src: spilImg, caption: "Editorial dashboard — video content, metadata, and status", ratio: "aspect-[4/5]" },
      { src: spilImg, caption: "Publishing workflow — scheduling and distribution logic", ratio: "aspect-[4/5]" },
      { src: spilImg, caption: "CMS structure — content management for modern editorial teams", ratio: "aspect-[21/9]" },
      { src: spilImg, caption: "Permissions model — clear roles across the newsroom", ratio: "aspect-[16/10]" },
      { src: spilImg, caption: "Wireframes — workflow mapped before build", ratio: "aspect-[4/5]" },
      { src: spilImg, caption: "Mobile screens — video content prepared for smaller contexts", ratio: "aspect-[4/5]" },
      { src: spilImg, caption: "Design system — reusable patterns for daily publishing", ratio: "aspect-[16/10]" },
    ],
    results: [
      { value: "MVP", label: "Successfully launched" },
      { value: "SPIL", label: "Integrated ecosystem" },
      { value: "Video-first", label: "Editorial workflow" },
    ],
    quote: {
      text: "The platform gave our editorial team a clearer way to manage video-first publishing.",
      name: "Editorial lead",
      role: "SpilNews",
    },
  },
  {
    slug: "mix-interiors",
    n: "02",
    client: "Mix Interiors",
    title: "Visual product discovery platform.",
    outcome: "An interactive product discovery platform that helps readers identify and explore products directly from inspirational interior imagery.",
    tags: ["Product", "AI", "Agency Build"],
    displayTags: ["Interior Design", "AI", "CMS"],
    metric: "2026",
    metricLabel: "Product launch",
    img: plusImg,
    year: "2026",
    service: "Validate → Build",
    serviceSlug: "validate",
    serviceCta: "This was a Validate → Build engagement. Want one?",
    context:
      "Delivered as an agency product build for Mix Interiors: connect editorial inspiration with the actual products featured inside interior imagery. Readers were inspired by project photography, but finding the product behind a chair, light, table, or finish often meant manual search.",
    problem:
      "Interior inspiration often starts with beautiful project photography, but identifying the products featured within an image usually requires time-consuming manual searches.",
    built:
      "We designed and built an interactive product discovery platform that connects editorial inspiration with a continuously updated database of products aggregated from leading interior manufacturers. Users can explore images, discover featured products, and continue directly to the manufacturer's website for more information.",
    craft:
      "The platform combines interactive image hotspots, product recognition and matching, similar-product recommendations, API integrations, automated data synchronisation, and direct manufacturer linking. The result is a structured product database that keeps editorial content connected to real commercial product data.",
    screens: [
      { src: plusImg, caption: "Visual discovery — products identified from interior imagery", ratio: "aspect-[16/10]" },
      { src: plusImg, caption: "Image hotspots — editorial photography becomes interactive", ratio: "aspect-[4/5]" },
      { src: plusImg, caption: "Product matching — recognition, recommendations, and direct links", ratio: "aspect-[4/5]" },
    ],
    results: [
      { value: "Interactive", label: "Product discovery experience" },
      { value: "Structured", label: "Manufacturer database" },
      { value: "Direct", label: "Referral path to manufacturers" },
    ],
    quote: {
      text: "The product turns inspiration into a direct discovery path for readers and manufacturers.",
      name: "Product lead",
      role: "Mix Interiors",
    },
  },
  {
    slug: "virtue-worldwide",
    n: "03",
    client: "Virtue Worldwide",
    title: "Network intelligence platform.",
    outcome: "A strategic intelligence platform that helps agencies uncover cultural trends, audience communities, and hidden relationships between topics.",
    tags: ["Platform", "AI", "Agency Build"],
    displayTags: ["Strategy", "Knowledge Graph", "Data Visualisation"],
    metric: "Global",
    metricLabel: "Strategy support",
    img: seaImg,
    year: "2025",
    service: "Build → Evolve",
    serviceSlug: "build",
    serviceCta: "This was a Build engagement. Want one?",
    context:
      "Virtue Worldwide needed a strategic research tool for exploring rapidly evolving cultural trends and niche communities. The platform had to help strategists see hidden relationships between people, organisations, topics, and audience behaviour.",
    problem:
      "Modern brands need to understand rapidly evolving cultural trends and niche communities. Traditional research methods are time-consuming and often fail to reveal the hidden relationships that shape consumer behaviour.",
    built:
      "We designed and built a network intelligence platform that maps relationships between people, organisations, and topics into interactive knowledge graphs. Strategists can explore emerging communities, identify cultural patterns, and support trend reports for global brands.",
    craft:
      "The product combines data engineering, relationship mapping, community detection, trend discovery, audience intelligence, and interactive data visualisation. The interface had to make complex network data usable for strategic and creative teams, not only analysts.",
    screens: [
      { src: seaImg, caption: "Network graph — people, organisations, and topics mapped together", ratio: "aspect-[16/10]" },
      { src: seaImg, caption: "Community detection — emerging clusters and relationships", ratio: "aspect-[4/5]" },
      { src: seaImg, caption: "Trend exploration — strategic research through interactive data", ratio: "aspect-[4/5]" },
    ],
    results: [
      { value: "Graphs", label: "Interactive knowledge maps" },
      { value: "Faster", label: "Strategic research" },
      { value: "Global", label: "Brand strategy support" },
    ],
    quote: {
      text: "The platform made cultural research easier to explore, explain, and use in strategy work.",
      name: "Strategy lead",
      role: "Virtue Worldwide",
    },
  },
  {
    slug: "hopplay",
    n: "04",
    client: "HopPlay",
    title: "Location-based adventure platform.",
    outcome: "A mobile gameplay platform that turns cities into interactive visitor experiences.",
    tags: ["Platform", "Product"],
    displayTags: ["Travel & Tourism", "Mobile Gameplay", "CMS"],
    metric: "2",
    metricLabel: "Live destinations",
    img: blinkImg,
    year: "2026",
    service: "Build → Evolve",
    serviceSlug: "evolve",
    serviceCta: "This was an Evolve engagement. Want one?",
    context:
      "HopPlay was created for tourism organisations that want to engage visitors beyond static guides and traditional walking tours. The platform needed to support location-based adventures across multiple destinations.",
    problem:
      "Cities and tourism organisations are constantly looking for new ways to engage visitors beyond traditional walking tours and static guides.",
    built:
      "We designed and built HopPlay, a scalable platform that enables cities and tourism organisations to launch their own location-based adventures. Visitors explore destinations by completing interactive challenges, following curated routes, and unlocking new experiences throughout the city.",
    craft:
      "The platform combines interactive maps, GPS-based experiences, route building, challenge systems, gamification, CMS development, and multi-city management. It was built to support live implementations for Giethoorn and Sightseeing Vienna while remaining scalable for future destinations.",
    screens: [
      { src: blinkImg, caption: "Adventure platform — routes, challenges, and destination content", ratio: "aspect-[16/10]" },
      { src: blinkImg, caption: "Mobile gameplay — GPS-based visitor experiences", ratio: "aspect-[4/5]" },
      { src: blinkImg, caption: "CMS dashboard — manage routes, cities, and challenges", ratio: "aspect-[4/5]" },
    ],
    results: [
      { value: "Live", label: "City experiences launched" },
      { value: "2", label: "Destinations implemented" },
      { value: "Multi-city", label: "Scalable platform" },
    ],
    quote: {
      text: "HopPlay gives destinations a more active way to guide visitors through the city.",
      name: "Project lead",
      role: "HopPlay",
    },
  },
  {
    slug: "academion",
    n: "05",
    client: "Academion",
    title: "Research operations platform.",
    outcome: "An accreditation workflow tool that gave teams back 85% of their week.",
    tags: ["Platform", "Agency Build"],
    displayTags: ["Platform", "Laravel", "Vue.js"],
    metric: "+85%",
    metricLabel: "Team hours saved",
    img: academionImg,
    year: "2024",
    service: "Build → Support",
    serviceSlug: "support",
    serviceCta: "This was a Build → Support engagement. Want one?",
    context:
      "An agency product build for Academion: replace email threads, Word docs, and shared drives with a structured accreditation workflow European universities could trust.",
    problem:
      "Academion runs accreditation for European universities — a process that lived in email threads, Word docs, and shared drives. Every review cycle burned weeks. It wasn't a UX problem; it was an operations problem.",
    built:
      "A Laravel + Vue platform that models the entire review as structured workflow: submissions, reviewers, evidence, sign-offs. Every artefact has a state, an owner, and a paper trail. Reviewers only see what's theirs; leadership sees everything.",
    craft:
      "The interesting part was designing a permissions model flexible enough to survive university politics. We built it around explicit roles, delegated review, and immutable audit — so nobody can argue with the trail, even three years later.",
    screens: [
      { src: academionImg, caption: "Review dashboard — every artefact, every state", ratio: "aspect-[16/10]" },
      { src: academionImg, caption: "Reviewer view — scoped, focused, offline-ready", ratio: "aspect-[4/5]" },
      { src: academionImg, caption: "Type system — heavy on tables, light on decoration", ratio: "aspect-[4/5]" },
    ],
    results: [
      { value: "+85%", label: "Team hours saved" },
      { value: "0", label: "Emails per review cycle" },
      { value: "3 yrs", label: "Audit trail, immutable" },
    ],
    quote: {
      text: "They understood that this wasn't a design refresh. It was an operational surgery.",
      name: "Head of Accreditation",
      role: "Academion",
    },
  },
];

export const filters: Filter[] = [
  "All",
  "Agency Build",
  "Product",
  "AI",
  "Platform",
  "Technical Sprint",
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function getRelated(slug: string, count = 3) {
  return cases.filter((c) => c.slug !== slug).slice(0, count);
}
