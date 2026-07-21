import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — kbell + postman" },
      {
        name: "description",
        content:
          "The people behind kbell + postman. A small, named studio in Amsterdam.",
      },
      { property: "og:title", content: "Team — kbell + postman" },
      { property: "og:description", content: "The people behind kbell + postman." },
    ],
  }),
  component: () => (
    <StubPage
      section="§ Team"
      title="The people behind the work."
      body="A small, named studio in Amsterdam. Full team page coming soon."
    />
  ),
});
