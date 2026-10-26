import type { MetadataRoute } from "next";
import { cases } from "@/components/site/cases-data";
import { playgroundPosts } from "@/components/site/playground-data";
import { serviceDetails } from "@/components/site/service-details";
import { services } from "@/components/site/nav-data";
import { getSiteUrl, localizedPath } from "@/i18n/site";
import { routing, type AppLocale } from "@/i18n/routing";

const STATIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/work",
  "/playground",
  "/go-to-market",
  "/european-first-infrastructure",
  "/process-pricing",
  "/team",
] as const;

function entry(
  base: string,
  path: string,
  locale: AppLocale,
  extras?: Partial<MetadataRoute.Sitemap[number]>,
): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${base}${localizedPath(l, path)}`]),
  ) as Record<string, string>;
  languages["x-default"] = `${base}${localizedPath(routing.defaultLocale, path)}`;

  return {
    url: `${base}${localizedPath(locale, path)}`,
    lastModified: new Date(),
    alternates: { languages },
    ...extras,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push(
        entry(base, path, locale, {
          changeFrequency: path === "/" ? "weekly" : "monthly",
          priority: path === "/" ? 1 : 0.7,
        }),
      );
    }

    for (const service of services) {
      entries.push(
        entry(base, `/services/${service.slug}`, locale, {
          changeFrequency: "monthly",
          priority: 0.8,
        }),
      );
    }

    for (const offer of serviceDetails) {
      entries.push(
        entry(base, `/services/offer/${offer.slug}`, locale, {
          changeFrequency: "monthly",
          priority: 0.6,
        }),
      );
    }

    for (const c of cases) {
      entries.push(
        entry(base, `/work/${c.slug}`, locale, {
          changeFrequency: "monthly",
          priority: 0.6,
        }),
      );
    }

    for (const post of playgroundPosts) {
      entries.push(
        entry(base, `/playground/${post.slug}`, locale, {
          changeFrequency: "monthly",
          priority: 0.5,
        }),
      );
    }
  }

  return entries;
}
