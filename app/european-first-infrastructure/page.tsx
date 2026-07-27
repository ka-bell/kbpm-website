import type { Metadata } from "next";
import { EuropeanFirstPage } from "@/views/EuropeanFirstPage";

export const metadata: Metadata = {
  title: "European-first infrastructure",
  description:
    "Map, design and run products on European-first infrastructure — start with an EU Stack Scan.",
  openGraph: {
    title: "European-first infrastructure — kbell + postman",
    description:
      "Build fast, keep your data safe. A practical EU-first product stack.",
  },
  alternates: { canonical: "/european-first-infrastructure" },
};

export default function Page() {
  return <EuropeanFirstPage />;
}
