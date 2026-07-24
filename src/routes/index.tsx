import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { ProofStrip } from "@/components/site/ProofStrip";
import { ServicePaths } from "@/components/site/ServicePaths";
import { FeaturedCase } from "@/components/site/FeaturedCase";
import { MoreWork } from "@/components/site/MoreWork";
import { TrustedBy } from "@/components/site/TrustedBy";
import { WhyKbpm } from "@/components/site/WhyKbpm";
import { CtaBlock } from "@/components/site/CtaBlock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "kbell + postman — Digital product studio, Amsterdam" },
      {
        name: "description",
        content:
          "Digital product studio in Amsterdam. Validate, build, evolve and support complex digital products — end to end.",
      },
      { property: "og:title", content: "kbell + postman — Digital product studio" },
      {
        property: "og:description",
        content: "Validate. Build. Evolve. Support. Amsterdam.",
      },
    ],
  }),
  component: Index,
});

function Index() {
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
