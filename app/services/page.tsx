import type { Metadata } from "next";
import { ServicesIndexPage } from "@/views/ServicesIndexPage";

export const metadata: Metadata = {
  title: "All services",
  description:
    "All kbell + postman services across Validate, Build, Evolve, and Support.",
  openGraph: {
    title: "All services — kbell + postman",
    description:
      "Work with us from start to finish — or bring us in for exactly what you need.",
  },
  alternates: { canonical: "/services" },
};

export default function Page() {
  return <ServicesIndexPage />;
}
