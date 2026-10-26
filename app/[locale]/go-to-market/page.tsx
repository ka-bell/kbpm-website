import { setRequestLocale } from "next-intl/server";
import { GoToMarketPage } from "@/views/GoToMarketPage";
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
  return pageMetadata({ locale, namespace: "MetaPages.goToMarket" });
}

export default async function Page({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  return <GoToMarketPage />;
}
