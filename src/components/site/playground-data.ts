
export type PlaygroundPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  author: string;
  image: string;
  imageAlt: string;
  body: string[];
};

export const playgroundPosts: PlaygroundPost[] = [
  {
    slug: "why-we-still-write-sql-by-hand",
    title: "Why we still write SQL by hand",
    date: "2026-07-18",
    summary:
      "ORMs are fine until the query becomes the product. Notes from a platform that started hiding its own data.",
    tags: ["Architecture", "Backend"],
    author: "Alex",
    image: "/assets/case-generic.jpg",
    imageAlt: "Abstract technical texture",
    body: [
      "Most products don't die from bad UI. They die from a data model nobody can explain anymore — wrapped in an ORM that papered over the mess until the mess became load-bearing.",
      "We still use ORMs for the boring CRUD. But the queries that define the product — the ones that encode business rules, permissions, and reporting — we write those by hand. In SQL. In one place. Reviewed like code.",
      "It's slower on day one. It's faster on day ninety, when someone asks \"why is this slow?\" and the answer is a file, not a stack of generated joins.",
      "This is not nostalgia. It's ownership. If the product is the data, the query is the craft.",
    ],
  },
  {
    slug: "eu-hosting-is-a-product-decision",
    title: "EU hosting is a product decision",
    date: "2026-06-02",
    summary:
      "Data residency isn't a checkbox for legal. It changes how you design auth, backups, and incident response.",
    tags: ["Infrastructure", "EU"],
    author: "Alex",
    image: "/assets/case-sea.jpg",
    imageAlt: "Network and infrastructure visual",
    body: [
      "Teams often treat \"EU hosting\" as a procurement line. Pick a region, tick GDPR, ship.",
      "In practice it reshapes the product: where sessions live, how keys rotate, what \"restore\" means when a backup can't leave the region, and who gets paged when latency spikes in one country but not another.",
      "We treat it as architecture. If the brief says European clients or regulated data, residency is part of the product shape — not a late infra ticket.",
      "The boring version: decide early, document the data flow, and don't invent a multi-region story you can't operate.",
    ],
  },
  {
    slug: "ai-features-that-earn-their-keep",
    title: "AI features that earn their keep",
    date: "2026-05-12",
    summary:
      "A short filter for when AI belongs in a live product — and when it's just noise with an API bill.",
    tags: ["AI", "Product"],
    author: "Alex",
    image: "/assets/hero-abstract.jpg",
    imageAlt: "Abstract product surface",
    body: [
      "The useful question is not \"can we add AI?\" It's \"what decision gets better, faster, or cheaper if we do?\"",
      "If you can't name the decision, you're decorating. If you can name it — triage, matching, summarising a known workflow — then AI is another capability with clear inputs, outputs, and failure modes.",
      "We pressure-test fit before build. Same as any integration: cost, latency, evals, and a fallback when the model is wrong.",
      "Shipping AI without that filter is how products get slower and less trusted. Shipping it with that filter is just engineering.",
    ],
  },
];

export function getPlaygroundPost(slug: string) {
  return playgroundPosts.find((post) => post.slug === slug);
}

export function getPlaygroundPosts() {
  return [...playgroundPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function formatPlaygroundDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
