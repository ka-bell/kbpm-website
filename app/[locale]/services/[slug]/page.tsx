import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  getServiceOffering,
  legacyServiceRedirects,
  type ServiceSlug,
} from "@/components/site/service-offerings";
import { ServiceDetailPage } from "@/views/ServiceDetailPage";
import { redirect } from "@/i18n/navigation";
import { localeAlternates, resolveLocale } from "@/i18n/page-meta";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceOffering(slug);
  if (!service) {
    return { title: "Service" };
  }
  const t = await getTranslations({
    locale,
    namespace: `Services.groups.${service.slug}`,
  });
  return {
    title: service.name,
    description: t("when"),
    openGraph: {
      title: `${service.name} — kbell + postman`,
      description: t("goal"),
    },
    alternates: localeAlternates(`/services/${service.slug}`),
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const resolved = await resolveLocale(Promise.resolve({ locale }));
  setRequestLocale(resolved);

  if (slug === "eu-first-infrastructure") {
    redirect({ href: "/european-first-infrastructure", locale: resolved });
  }
  if (slug === "go-to-market") {
    redirect({ href: "/go-to-market", locale: resolved });
  }
  const legacy = legacyServiceRedirects[slug];
  if (legacy) {
    redirect({ href: `/services/${legacy}`, locale: resolved });
  }

  const service = getServiceOffering(slug);
  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
