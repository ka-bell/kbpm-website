import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceDetail } from "@/components/site/service-details";
import { ServiceOfferPage } from "@/views/ServiceOfferPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = getServiceDetail(slug);
  if (!offer) {
    return { title: "Service" };
  }
  return {
    title: offer.name,
    description: offer.subhead,
    openGraph: {
      title: `${offer.name} — kbell + postman`,
      description: offer.subhead,
    },
    alternates: { canonical: `/services/offer/${offer.slug}` },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const offer = getServiceDetail(slug);
  if (!offer) notFound();
  return <ServiceOfferPage offer={offer} />;
}
