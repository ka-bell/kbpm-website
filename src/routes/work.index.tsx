import { createFileRoute } from "@tanstack/react-router";
import { WorkPage } from "@/views/WorkPage";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — kbell + postman" },
      {
        name: "description",
        content:
          "A few things we've built. Selected case studies from kbell + postman, a digital product studio in Amsterdam.",
      },
      { property: "og:title", content: "Work — kbell + postman" },
      {
        property: "og:description",
        content: "A few things we've built.",
      },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});
