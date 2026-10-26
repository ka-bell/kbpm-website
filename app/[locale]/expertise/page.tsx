import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { resolveLocale, type LocaleParams } from "@/i18n/page-meta";

export default async function ExpertiseRedirect({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  redirect({ href: "/about", locale });
}
