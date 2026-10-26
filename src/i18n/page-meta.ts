import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type AppLocale } from "./routing";

/** Locale-aware alternates for a path without locale prefix (e.g. `/about`). */
export function localeAlternates(path: string) {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return {
    canonical: normalized || "/",
    languages: {
      en: normalized || "/",
      nl: `/nl${normalized || ""}`,
      "x-default": normalized || "/",
    } as Record<string, string>,
  };
}

export async function pageMetadata({
  locale,
  namespace,
}: {
  locale: string;
  namespace: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const path = t("path");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: localeAlternates(path),
  };
}

export function localeStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export type LocaleParams = { params: Promise<{ locale: string }> };

export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<AppLocale> {
  const { locale } = await params;
  return (routing.locales as readonly string[]).includes(locale)
    ? (locale as AppLocale)
    : routing.defaultLocale;
}
