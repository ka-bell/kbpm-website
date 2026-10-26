import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Dutch browsers land on /nl; preference remembered via cookie.
  localeDetection: true,
});

export type AppLocale = (typeof routing.locales)[number];
