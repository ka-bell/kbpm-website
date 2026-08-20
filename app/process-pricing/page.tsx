import type { Metadata } from "next";
import { ProcessPricingPage } from "@/views/ProcessPricingPage";

export const metadata: Metadata = {
  title: "Process & Pricing",
  description:
    "How we work and what it costs. Validate, Build, and Evolve — with transparent ranges and no scope creep.",
  openGraph: {
    title: "Process & Pricing — kbell + postman",
    description: "Validate, Build, Evolve — transparent process and ranges.",
    url: "/process-pricing",
    type: "website",
  },
  alternates: { canonical: "/process-pricing" },
};

export default function Page() {
  return <ProcessPricingPage />;
}
