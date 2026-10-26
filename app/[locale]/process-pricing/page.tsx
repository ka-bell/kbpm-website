import { setRequestLocale } from "next-intl/server";
import { ProcessPricingPage } from "@/views/ProcessPricingPage";
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
  return pageMetadata({ locale, namespace: "MetaPages.processPricing" });
}

export default async function Page({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  return <ProcessPricingPage />;
}
