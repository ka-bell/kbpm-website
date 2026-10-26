import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getServiceDetail } from "@/components/site/service-details";
import { ServiceOfferPage } from "@/views/ServiceOfferPage";
import { localizeServiceOffer } from "@/i18n/localize";
import { localeAlternates, resolveLocale } from "@/i18n/page-meta";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const raw = getServiceDetail(slug);
  if (!raw) return { title: "Service" };
  const offer = localizeServiceOffer(raw, locale);
  return {
    title: offer.name,
    description: offer.subhead,
    openGraph: {
      title: `${offer.name} — kbell + postman`,
      description: offer.subhead,
    },
    alternates: localeAlternates(`/services/offer/${offer.slug}`),
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const resolved = await resolveLocale(Promise.resolve({ locale }));
  setRequestLocale(resolved);
  const offer = getServiceDetail(slug);
  if (!offer) notFound();
  return <ServiceOfferPage offer={offer} />;
}
