import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/views/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — kbell + postman" },
      {
        name: "description",
        content:
          "Strategy, design, engineering, and EU-first infrastructure — what kbell + postman actually does.",
      },
      { property: "og:title", content: "About — kbell + postman" },
      {
        property: "og:description",
        content: "Strategy, design, engineering, and EU-first infrastructure.",
      },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});
