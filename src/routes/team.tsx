import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — kbell + postman" },
      {
        name: "description",
        content:
          "The people behind kbell + postman. A senior-led studio in Amsterdam — specialists when the brief needs them.",
      },
      { property: "og:title", content: "Team — kbell + postman" },
      { property: "og:description", content: "Senior-led studio. Specialists when needed." },
    ],
  }),
  component: () => (
    <StubPage
      section="§ Team"
      title="The people behind the work."
      body="A senior-led studio in Amsterdam. Named leads on every engagement, with specialists brought in when the brief needs them. Full team page coming soon."
    />
  ),
});
