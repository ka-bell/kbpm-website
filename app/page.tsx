import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { ProofStrip } from "@/components/site/ProofStrip";
import { ServicePaths } from "@/components/site/ServicePaths";
import { FeaturedCase } from "@/components/site/FeaturedCase";
import { MoreWork } from "@/components/site/MoreWork";
import { TrustedBy } from "@/components/site/TrustedBy";
import { WhyKbpm } from "@/components/site/WhyKbpm";
import { CtaBlock } from "@/components/site/CtaBlock";

export const metadata: Metadata = {
  title: "kbell + postman — Digital product studio, Amsterdam",
  description:
    "Digital product studio in Amsterdam. Validate, build, evolve and support complex digital products — end to end.",
  openGraph: {
    title: "kbell + postman — Digital product studio",
    description: "Validate. Build. Evolve. Support. Amsterdam.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <TrustedBy />
      <ServicePaths />
      <FeaturedCase />
      <MoreWork />
      <WhyKbpm />
      <CtaBlock />
    </>
  );
}
