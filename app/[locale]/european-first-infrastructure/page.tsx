import { setRequestLocale } from "next-intl/server";
import { EuropeanFirstPage } from "@/views/EuropeanFirstPage";
import {
  localeStaticParams,
  pageMetadata,
  resolveLocale,
  type LocaleParams,
} from "@/i18n/page-meta";

export function generateStaticParams() {
  return localeStaticParams();
}

export async function generateMetadata({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, namespace: "MetaPages.europeanFirst" });
}

export default async function Page({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  return <EuropeanFirstPage />;
}
