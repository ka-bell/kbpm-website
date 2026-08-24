import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/views/ContactPage";

type ContactSearch = {
  interest?: string;
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    interest:
      typeof search.interest === "string" ? search.interest : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact - kbell + postman" },
      {
        name: "description",
        content:
          "Tell KBPM what you are building. Start a product sprint, productionize a prototype, or talk through product development support.",
      },
      { property: "og:title", content: "Contact - kbell + postman" },
      {
        property: "og:description",
        content: "Tell us what you are building and where the product is stuck.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactRoute,
});

function ContactRoute() {
  const { interest } = Route.useSearch();
  return <ContactPage interest={interest} />;
}
