import { createFileRoute } from "@tanstack/react-router";
import { ServicesIndexPage } from "@/views/ServicesIndexPage";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "All services — kbell + postman" },
      {
        name: "description",
        content:
          "All kbell + postman services across Validate, Build, Evolve, and Support.",
      },
      { property: "og:title", content: "All services — kbell + postman" },
      {
        property: "og:description",
        content:
          "Choose where the product needs help — Validate, Build, Evolve, or Support.",
      },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndexPage,
});
