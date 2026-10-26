import { routing, type AppLocale } from "./routing";

/** Canonical origin for sitemap, robots, and absolute URLs. */
export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://kbpm.nl"
  );
}

/** Locale-prefixed path (EN has no prefix with `as-needed`). */
export function localizedPath(locale: AppLocale, path: string) {
  const normalized =
    path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized || "/";
  return `/nl${normalized || ""}`;
}
