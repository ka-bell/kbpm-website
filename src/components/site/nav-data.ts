export const services = [
  {
    name: "Validate",
    slug: "validate" as const,
    tag: "01",
    blurb: "You need clarity before investing in design or development.",
    thumb: "/hero/tile-2.png",
  },
  {
    name: "Build",
    slug: "build" as const,
    tag: "02",
    blurb: "You know what to make and need a senior team to design and develop it.",
    thumb: "/hero/tile-3.png",
  },
  {
    name: "Evolve",
    slug: "evolve" as const,
    tag: "03",
    blurb: "Your product is live and you want to keep improving it.",
    thumb: "/hero/tile-5.png",
  },
  {
    name: "Support",
    slug: "support" as const,
    tag: "04",
    blurb: "You need a trusted technical partner to keep everything running.",
    thumb: "/hero/tile-6.png",
  },
] as const;

export const servicesFeature = {
  image: "/nav/mega-feature.jpg",
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
