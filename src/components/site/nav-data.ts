export const services = [
  {
    name: "Validate",
    slug: "validate" as const,
    tag: "01",
    blurb: "Clarity before design or development.",
    thumb:
      "https://images.unsplash.com/photo-1499336315816-097655dcfbda?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Build",
    slug: "build" as const,
    tag: "02",
    blurb: "Design and develop the product.",
    thumb:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Evolve",
    slug: "evolve" as const,
    tag: "03",
    blurb: "Keep improving a live product.",
    thumb:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Support",
    slug: "support" as const,
    tag: "04",
    blurb: "Keep everything running.",
    thumb:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
  },
] as const;

export const servicesFeature = {
  image:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  title: "Not sure where you are?",
  blurb:
    "Tell us where the product sits — idea, first build, live, or support — and we'll meet you there.",
  ctaLabel: "Start a project",
  ctaHref: "/contact" as const,
};

export const primaryNav = [
  { label: "Work", to: "/work" as const },
  { label: "Contact", to: "/contact" as const },
] as const;

export const aboutItems = [
  {
    name: "About",
    href: "/about" as const,
    tag: "The studio",
    blurb: "Strategy, design, engineering — what we actually do.",
    thumb:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Team",
    href: "/team" as const,
    tag: "The people",
    blurb: "The names and faces behind the work.",
    thumb:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
  },
] as const;

export const aboutFeature = {
  image:
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
  title: "Meet the studio.",
  blurb:
    "Two people, one shared inbox, and a decade of shipping. Tell us what you're building.",
  ctaLabel: "Start a project",
  ctaHref: "/contact" as const,
};
