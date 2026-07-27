import type { Metadata } from "next";
import { ProcessPricingPage } from "@/views/ProcessPricingPage";

export const metadata: Metadata = {
  title: "Process & Pricing",
  description:
    "How we work and what it costs. Three packages — Draft™, Make™, Keep™ — with transparent ranges and no scope creep.",
  openGraph: {
    title: "Process & Pricing — kbell + postman",
    description: "Three packages, one flat fee each, transparent process.",
    url: "/process-pricing",
    type: "website",
  },
  alternates: { canonical: "/process-pricing" },
};

export default function Page() {
  return <ProcessPricingPage />;
}
