import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/site/Hero";
import { IntroBand } from "@/components/site/IntroBand";
import { ProofStrip } from "@/components/site/ProofStrip";
import { ServicePaths } from "@/components/site/ServicePaths";
import { FeaturedCase } from "@/components/site/FeaturedCase";
import { MoreWork } from "@/components/site/MoreWork";
import { TrustedBy } from "@/components/site/TrustedBy";
import { WhyKbpm } from "@/components/site/WhyKbpm";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: locale === "nl" ? "/nl" : "/",
      languages: {
        en: "/",
        nl: "/nl",
        "x-default": "/",
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <IntroBand />
      <ProofStrip />
      <TrustedBy />
      <ServicePaths />
      <FeaturedCase />
      <MoreWork layout="scroll" />
      <WhyKbpm />
    </>
  );
}
