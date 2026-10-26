import type { ServiceDetail } from "@/components/site/service-details";
import type { CaseStudy } from "@/components/site/cases-data";
import type { PlaygroundPost } from "@/components/site/playground-data";
import { serviceOffersNl } from "@/content/nl/service-offers";
import { casesMetaNl } from "@/content/nl/cases-meta";
import { playgroundNl } from "@/content/nl/playground";
import type { AppLocale } from "./routing";

export function localizeServiceOffer(
  offer: ServiceDetail,
  locale: string,
): ServiceDetail {
  if (locale !== "nl") return offer;
  const nl = serviceOffersNl[offer.slug as keyof typeof serviceOffersNl];
  if (!nl) return offer;
  return {
    ...offer,
    plainName: nl.plainName,
    name: nl.name,
    phaseLabel: nl.phaseLabel,
    subhead: nl.subhead,
    intro: nl.intro,
    whatYouGet: [...nl.whatYouGet],
    howItWorks: [...nl.howItWorks],
  };
}

export function localizeCaseMeta(c: CaseStudy, locale: string): CaseStudy {
  if (locale !== "nl") return c;
  const nl = casesMetaNl[c.slug as keyof typeof casesMetaNl];
  if (!nl) return c;
  return {
    ...c,
    title: nl.title,
    outcome: nl.outcome,
    metricLabel: nl.metricLabel,
  };
}

export function localizePlaygroundPost(
  post: PlaygroundPost,
  locale: string,
): PlaygroundPost {
  if (locale !== "nl") return post;
  const nl = playgroundNl[post.slug as keyof typeof playgroundNl];
  if (!nl) return post;
  return {
    ...post,
    title: nl.title,
    summary: nl.summary,
    imageAlt: nl.imageAlt,
    body: [...nl.body],
  };
}

export function isNl(locale: string): locale is "nl" {
  return locale === "nl";
}

export type { AppLocale };
