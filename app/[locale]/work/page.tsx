import { setRequestLocale } from "next-intl/server";
import { WorkPage } from "@/views/WorkPage";
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
  return pageMetadata({ locale, namespace: "MetaPages.work" });
}

export default async function Page({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  return <WorkPage />;
}
