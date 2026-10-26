import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getCase } from "@/components/site/cases-data";
import { WorkCasePage } from "@/views/WorkCasePage";
import { localizeCaseMeta } from "@/i18n/localize";
import { localeAlternates, resolveLocale } from "@/i18n/page-meta";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const raw = getCase(slug);
  if (!raw) return { title: "Case" };
  const c = localizeCaseMeta(raw, locale);
  return {
    title: c.client,
    description: c.outcome,
    openGraph: {
      title: `${c.client} — kbell + postman`,
      description: c.outcome,
    },
    alternates: localeAlternates(`/work/${c.slug}`),
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const resolved = await resolveLocale(Promise.resolve({ locale }));
  setRequestLocale(resolved);
  const c = getCase(slug);
  if (!c) notFound();
  return <WorkCasePage c={c} />;
}
