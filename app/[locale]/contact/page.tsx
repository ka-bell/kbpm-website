import { setRequestLocale } from "next-intl/server";
import { ContactPage } from "@/views/ContactPage";
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
  return pageMetadata({ locale, namespace: "MetaPages.contact" });
}

type Props = LocaleParams & {
  searchParams: Promise<{ interest?: string | string[] }>;
};

export default async function Page({ params, searchParams }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const sp = await searchParams;
  const raw = sp.interest;
  const interest = typeof raw === "string" ? raw : undefined;
  return <ContactPage interest={interest} />;
}
