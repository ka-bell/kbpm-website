import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getServiceOffering,
  legacyServiceRedirects,
} from "@/components/site/service-offerings";
import { ServiceDetailPage } from "@/views/ServiceDetailPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceOffering(slug);
  if (!service) {
    return { title: "Service" };
  }
  return {
    title: service.name,
    description: service.when,
    openGraph: {
      title: `${service.name} — kbell + postman`,
      description: service.goal,
    },
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  if (slug === "eu-first-infrastructure") {
    redirect("/european-first-infrastructure");
  }
  if (slug === "go-to-market") {
    redirect("/go-to-market");
  }
  const legacy = legacyServiceRedirects[slug];
  if (legacy) {
    redirect(`/services/${legacy}`);
  }

  const service = getServiceOffering(slug);
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
