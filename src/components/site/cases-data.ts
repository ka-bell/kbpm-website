
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
  /** Optional full-bleed hero panel image (replaces typographic mark). */
  heroImage?: string;
  year: string;
  industry: string;
  productUrl?: string;
  keyFeatures: string[];
  service: string;
  serviceSlug: "validate" | "build" | "evolve" | "support";
  serviceCta: string;
  context?: string;
  problem: string;
  built: string;
  craft: string;
  screens: { src: string; caption: string; ratio: string }[];
  /**
   * afterProblem: full-pair = full then 2-up (default); pair = 2-up only
   * afterBuild: two-full = two full widths (default); full-pair = full then 2-up
   */
  mediaLayout?: {
    afterProblem?: "full-pair" | "pair";
    afterBuild?: "two-full" | "full-pair";
  };
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
    img: "/work/spilnews/primary.jpg",
    heroImage: "/work/spilnews/hero.jpg",
    mediaLayout: { afterProblem: "full-pair", afterBuild: "full-pair" },
    year: "2025",
    industry: "Media / Publishing",
    keyFeatures: [
      "Video content management",
      "Editorial scheduling & permissions",
      "Distribution workflow",
    ],
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
      {
        src: "/work/spilnews/primary.jpg",
        caption: "Product hero — video-first publishing platform",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/spilnews/grid-full.jpg",
        caption: "Mobile viewer — video story with metadata and share",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/spilnews/grid-a.jpg",
        caption: "Brand mark — Spil News identity",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/spilnews/grid-b.jpg",
        caption: "Design system — Spil News colour palette",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/spilnews/stack-full.jpg",
        caption: "Editorial product — desktop publishing environment",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/spilnews/stack-a.jpg",
        caption: "CMS dashboard — video library and workflow",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/spilnews/stack-b.jpg",
        caption: "Publishing tools — scheduling and distribution",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/spilnews/closing.jpg",
        caption: "Closing visual — Spil News in context",
        ratio: "aspect-[1296/700]",
      },
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
    img: "/assets/case-plus.jpg",
    year: "2026",
    industry: "Interior Design / Media",
    keyFeatures: [
      "Interactive image hotspots",
      "Product recognition & matching",
      "Manufacturer catalogue sync",
    ],
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
      { src: "/assets/case-plus.jpg", caption: "Visual discovery — products identified from interior imagery", ratio: "aspect-[16/10]" },
      { src: "/assets/case-plus.jpg", caption: "Image hotspots — editorial photography becomes interactive", ratio: "aspect-[4/5]" },
      { src: "/assets/case-plus.jpg", caption: "Product matching — recognition, recommendations, and direct links", ratio: "aspect-[4/5]" },
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
    img: "/assets/case-sea.jpg",
    year: "2025",
    industry: "Advertising / Strategy",
    keyFeatures: [
      "Interactive knowledge graphs",
      "Community detection",
      "Cultural trend exploration",
    ],
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
      { src: "/assets/case-sea.jpg", caption: "Network graph — people, organisations, and topics mapped together", ratio: "aspect-[16/10]" },
      { src: "/assets/case-sea.jpg", caption: "Community detection — emerging clusters and relationships", ratio: "aspect-[4/5]" },
      { src: "/assets/case-sea.jpg", caption: "Trend exploration — strategic research through interactive data", ratio: "aspect-[4/5]" },
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
    img: "/work/card-hopplay.jpg",
    year: "2026",
    industry: "Travel & Tourism",
    keyFeatures: [
      "GPS-based city adventures",
      "Route & challenge builder",
      "Multi-city CMS",
    ],
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
      { src: "/work/card-hopplay.jpg", caption: "Adventure platform — routes, challenges, and destination content", ratio: "aspect-[16/10]" },
      { src: "/work/card-hopplay.jpg", caption: "Mobile gameplay — GPS-based visitor experiences", ratio: "aspect-[4/5]" },
      { src: "/work/card-hopplay.jpg", caption: "CMS dashboard — manage routes, cities, and challenges", ratio: "aspect-[4/5]" },
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
    img: "/assets/case-academion.jpg",
    year: "2024",
    industry: "Higher Education",
    keyFeatures: [
      "Structured accreditation workflow",
      "Role-based permissions",
      "Immutable audit trail",
    ],
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
      { src: "/assets/case-academion.jpg", caption: "Review dashboard — every artefact, every state", ratio: "aspect-[16/10]" },
      { src: "/assets/case-academion.jpg", caption: "Reviewer view — scoped, focused, offline-ready", ratio: "aspect-[4/5]" },
      { src: "/assets/case-academion.jpg", caption: "Type system — heavy on tables, light on decoration", ratio: "aspect-[4/5]" },
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
  {
    slug: "blink",
    n: "06",
    client: "Blink",
    title: "Tattoo booking that actually works.",
    outcome:
      "A booking platform built for tattoo artists — from public request flow to studio calendar and payments.",
    tags: ["Product", "Platform"],
    displayTags: ["Booking", "Product Design", "Platform"],
    metric: "End-to-end",
    metricLabel: "Booking → calendar → pay",
    img: "/work/blink/brand.jpg",
    heroImage: "/work/blink/hero.jpg",
    mediaLayout: { afterProblem: "full-pair", afterBuild: "two-full" },
    year: "2025",
    industry: "Creative services",
    keyFeatures: [
      "Booking widget",
      "Studio calendar",
      "Stripe payments",
      "Artist messaging",
    ],
    service: "Build",
    serviceSlug: "build",
    serviceCta: "This was a Build engagement. Want one?",
    context:
      "Blink is a booking platform designed specifically for tattoo artists and studios. Artists needed a professional way to take requests, manage appointments, and get paid — without bolting together generic tools.",
    problem:
      "Tattoo artists were losing bookings to messy DMs, incomplete briefs, and double-booked calendars. Generic booking tools didn’t fit how tattoo work is priced, scoped, or scheduled.",
    built:
      "We designed and built Blink end to end: a public booking widget clients can embed or share, an onboarding flow for artists, messaging and reminders, and a studio dashboard for bookings, calendar, and payments.",
    craft:
      "Product design, brand, UX/UI, and a full platform build — booking methods by artist, style, or flash; calendar sync; Stripe; and a studio ops layer for day-to-day appointments.",
    screens: [
      {
        src: "/work/blink/primary.jpg",
        caption: "Booking widget — pick artist, style, or flash",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/blink/onboarding.jpg",
        caption: "Artist onboarding — calendar, Stripe, share link",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/blink/messaging.jpg",
        caption: "Client messaging and appointment reminders",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/blink/brand.jpg",
        caption: "Brand system — tattoo booking, but actually good",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/blink/laptop.jpg",
        caption: "Studio dashboard — bookings and portfolio",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/blink/tablet.jpg",
        caption: "Studio calendar — multi-artist scheduling",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/blink/closing.jpg",
        caption: "Live booking page — share from Instagram bio",
        ratio: "aspect-[1296/700]",
      },
    ],
    results: [
      { value: "1 flow", label: "Request → book → pay" },
      { value: "Studio", label: "Calendar + bookings ops" },
      { value: "Embed", label: "Widget or standalone link" },
    ],
    quote: {
      text: "Blink finally feels built for how tattoo studios actually take work.",
      name: "Founding artist",
      role: "Blink",
    },
  },
  {
    slug: "staatsloterij",
    n: "08",
    client: "Staatsloterij",
    title: "Digital lottery experience for the Netherlands.",
    outcome:
      "A redesigned digital platform that makes playing the Dutch state lottery feel modern, clear, and trustworthy.",
    tags: ["Product", "Agency Build"],
    displayTags: ["Lottery", "Product Design", "Brand"],
    metric: "National",
    metricLabel: "Platform redesign",
    img: "/work/staatsloterij/primary.jpg",
    heroImage: "/work/staatsloterij/hero.jpg",
    mediaLayout: { afterProblem: "full-pair", afterBuild: "full-pair" },
    year: "2023",
    industry: "Entertainment / Gaming",
    keyFeatures: [
      "Ticket purchase flow",
      "My Staatsloterij account",
      "Results & winnings UX",
    ],
    service: "Build",
    serviceSlug: "build",
    serviceCta: "This was a Build engagement. Want one?",
    context:
      "Staatsloterij is the Dutch national lottery — one of the most recognisable brands in the Netherlands. We were brought in to modernise the digital product experience: from ticket purchase to results, account management, and brand expression online.",
    problem:
      "The existing digital experience felt disconnected from the excitement of the lottery itself. Purchase flows were cumbersome, account management was opaque, and the brand didn't translate clearly to digital.",
    built:
      "We redesigned and rebuilt the core digital platform end to end — ticket purchase, account, notifications, results — with a clear information architecture and a brand system built for digital-first use.",
    craft:
      "Product design, brand application, UX/UI, design system, and front-end development. The work centred on making complex lottery logic feel simple: pick your numbers, confirm your entry, check results, and manage your account in as few steps as possible.",
    screens: [
      {
        src: "/work/staatsloterij/primary.jpg",
        caption: "Platform hero — Staatsloterij digital experience",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/staatsloterij/grid-full.jpg",
        caption: "Ticket flow — select, confirm, and play",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/staatsloterij/grid-a.jpg",
        caption: "Brand system — Staatsloterij digital identity",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/staatsloterij/grid-b.jpg",
        caption: "Results experience — winnings, clear and fast",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/staatsloterij/stack-a.jpg",
        caption: "Account overview — entries and notifications",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/staatsloterij/stack-b.jpg",
        caption: "Mobile — lottery on the go",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/staatsloterij/closing.jpg",
        caption: "Closing visual — Staatsloterij in context",
        ratio: "aspect-[1296/700]",
      },
    ],
    results: [
      { value: "National", label: "Platform launch" },
      { value: "End-to-end", label: "Ticket to results flow" },
      { value: "Digital-first", label: "Brand redesign" },
    ],
    quote: {
      text: "The new platform made playing the lottery feel like it should — simple, clear, and exciting.",
      name: "Product lead",
      role: "Staatsloterij",
    },
  },
  {
    slug: "scooply-ai",
    n: "07",
    client: "Scooply AI",
    title: "AI that turns browsing into scoops.",
    outcome:
      "A browser-native AI product that helps people find, shape, and share sharper stories from the open web.",
    tags: ["Product", "AI"],
    displayTags: ["AI", "Product Design", "Brand"],
    metric: "AI Mode",
    metricLabel: "In-browser scooping",
    img: "/work/scooply/primary.jpg",
    heroImage: "/work/scooply/hero.jpg",
    mediaLayout: { afterProblem: "pair", afterBuild: "two-full" },
    year: "2025",
    industry: "AI / Media",
    keyFeatures: [
      "Browser AI mode",
      "Mobile companion",
      "Brand & type system",
      "Product UI",
    ],
    service: "Validate → Build",
    serviceSlug: "validate",
    serviceCta: "This was a Validate → Build engagement. Want one?",
    context:
      "Scooply AI sits where search and storytelling meet. The product needed a clear brand, a credible in-browser AI experience, and a mobile presence that still felt light.",
    problem:
      "People drown in tabs and half-finished research. Generic AI chat sits beside the browser instead of inside the moment of discovery — so scoops stay stuck in notes apps and DMs.",
    built:
      "We shaped Scooply end to end: product direction, brand and type system, in-browser AI surfaces, and mobile moments that make scooping feel instant rather than like another tool to learn.",
    craft:
      "Brand, UX/UI, and a design system tuned for AI media — purple identity, Inter-based type, and interfaces that keep the scoop in flow with browsing.",
    screens: [
      {
        src: "/work/scooply/primary.jpg",
        caption: "Browser AI Mode — scooping from search",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/scooply/grid-a.jpg",
        caption: "Mobile — Scooply.ai splash",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/scooply/grid-b.jpg",
        caption: "Product moments — in-context AI",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/scooply/stack-a.jpg",
        caption: "Design system — type and colour",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/scooply/stack-b.jpg",
        caption: "Brand & product — Scooply in use",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/scooply/closing.jpg",
        caption: "Closing visual — Scooply AI",
        ratio: "aspect-[1296/700]",
      },
    ],
    results: [
      { value: "Brand", label: "Identity + type system" },
      { value: "AI UI", label: "Browser + mobile" },
      { value: "Scoop", label: "Discovery → share flow" },
    ],
    quote: {
      text: "Scooply finally feels like AI that lives where the story starts — in the browser.",
      name: "Founder",
      role: "Scooply AI",
    },
  },
  {
    slug: "frame",
    n: "09",
    client: "Frame",
    title: "Framing work that deserves a stage.",
    outcome:
      "A product experience that helps creative teams present, share, and protect their work with clarity.",
    tags: ["Product", "Platform"],
    displayTags: ["Product Design", "Brand", "UX/UI"],
    metric: "Product",
    metricLabel: "Creative platform",
    img: "/work/frame/primary.jpg",
    heroImage: "/work/frame/hero.jpg",
    mediaLayout: { afterProblem: "full-pair", afterBuild: "two-full" },
    year: "2023",
    industry: "Creative tools",
    keyFeatures: ["Product Design", "Brand Design", "UX/UI"],
    service: "Build",
    serviceSlug: "build",
    serviceCta: "This was a Build engagement. Want one?",
    context:
      "Frame is a creative product for teams that need their work to look finished the moment it leaves the studio — presentation, sharing, and brand presence in one flow.",
    problem:
      "Creative work often loses impact between the tool where it’s made and the place where it’s shown. Framing, sharing, and brand consistency lived in separate habits.",
    built:
      "We shaped Frame as a product experience: mobile-first surfaces, a clear brand system, and flows that make presenting work feel intentional rather than improvised.",
    craft:
      "Product design, brand, and UX/UI — focused on calm interfaces that keep the work itself centre stage.",
    screens: [
      {
        src: "/work/frame/primary.jpg",
        caption: "Product — Frame mobile experience",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/frame/hero.jpg",
        caption: "Brand panel — Frame",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/frame/primary.jpg",
        caption: "Mobile — Frame in hand",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/frame/hero.jpg",
        caption: "Experience — Frame product moments",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/frame/primary.jpg",
        caption: "Product detail — Frame",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/frame/hero.jpg",
        caption: "Closing — Frame",
        ratio: "aspect-[1296/700]",
      },
    ],
    results: [
      { value: "Mobile", label: "Product experience" },
      { value: "Brand", label: "Identity system" },
      { value: "Clear", label: "Present & share flow" },
    ],
    quote: {
      text: "Frame finally makes presenting creative work feel as considered as making it.",
      name: "Product lead",
      role: "Frame",
    },
  },
  {
    slug: "pepperminds",
    n: "10",
    client: "Pepperminds",
    title: "A sharper surface for brand and product.",
    outcome:
      "A digital product and brand system that gives Pepperminds a clearer, more confident presence across screens.",
    tags: ["Product", "Agency Build"],
    displayTags: ["Product Design", "Brand", "UX/UI"],
    metric: "Brand + UI",
    metricLabel: "Product system",
    img: "/work/pepperminds/primary.jpg",
    heroImage: "/work/pepperminds/hero.jpg",
    mediaLayout: { afterProblem: "full-pair", afterBuild: "full-pair" },
    year: "2023",
    industry: "Brand / Product",
    keyFeatures: ["Product Design", "Brand Design", "UX/UI"],
    service: "Build",
    serviceSlug: "build",
    serviceCta: "This was a Build engagement. Want one?",
    context:
      "Pepperminds needed a digital expression that matched the energy of the brand — product UI, brand fragments, and storytelling in one coherent system.",
    problem:
      "The brand and product surfaces felt scattered. Without a shared system, screens and stories competed instead of reinforcing each other.",
    built:
      "We designed a product and brand system that holds UI, photography, and messaging in the same visual language — ready for mobile and desktop use.",
    craft:
      "Brand, product design, and UX/UI assembled into layered screens that feel lively without losing clarity.",
    screens: [
      {
        src: "/work/pepperminds/primary.jpg",
        caption: "Product collage — Pepperminds UI",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/pepperminds/grid-full.jpg",
        caption: "Product — Pepperminds in context",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/pepperminds/grid-a.jpg",
        caption: "Mobile — Pepperminds screens",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/pepperminds/grid-b.jpg",
        caption: "Brand moments — Pepperminds",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/pepperminds/stack-full.jpg",
        caption: "Product system — Pepperminds",
        ratio: "aspect-[1296/700]",
      },
      {
        src: "/work/pepperminds/stack-a.jpg",
        caption: "Interface — Pepperminds detail",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/pepperminds/stack-b.jpg",
        caption: "UI collage — Pepperminds",
        ratio: "aspect-[636/700]",
      },
      {
        src: "/work/pepperminds/closing.jpg",
        caption: "Closing visual — Pepperminds",
        ratio: "aspect-[1296/700]",
      },
    ],
    results: [
      { value: "System", label: "Brand + product UI" },
      { value: "Mobile", label: "Screen language" },
      { value: "Coherent", label: "Story across surfaces" },
    ],
    quote: {
      text: "Pepperminds finally feels like one brand across every screen.",
      name: "Brand lead",
      role: "Pepperminds",
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

/** Cases from the Figma Cases round — work overview / recent work. */
export const portfolioSlugs = [
  "blink",
  "spilnews",
  "scooply-ai",
  "staatsloterij",
  "frame",
  "pepperminds",
] as const;

export function getPortfolioCases() {
  return portfolioSlugs
    .map((slug) => cases.find((c) => c.slug === slug))
    .filter((c): c is CaseStudy => Boolean(c));
}

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}

export function getRelated(slug: string, count = 3) {
  const portfolio = getPortfolioCases().filter((c) => c.slug !== slug);
  if (portfolio.length > 0) return portfolio.slice(0, count);
  return cases.filter((c) => c.slug !== slug).slice(0, count);
}
