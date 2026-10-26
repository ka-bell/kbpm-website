"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

type Props = {
  className?: string;
  /** Match header ink (white on dark hero, dark elsewhere). */
  ink?: "light" | "dark";
};

export function LanguageSwitcher({ className = "", ink = "dark" }: Props) {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  const inkClass =
    ink === "light"
      ? "text-white/70 hover:text-white"
      : "text-[#1e1e1e]/55 hover:text-[#1e1e1e]";
  const activeClass =
    ink === "light" ? "text-white" : "text-[#1e1e1e]";

  const switchTo = (next: AppLocale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className={`inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[-0.03em] ${className}`}
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((code, i) => (
        <span key={code} className="inline-flex items-center gap-1">
          {i > 0 ? (
            <span className={inkClass} aria-hidden>
              /
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => switchTo(code)}
            className={`transition-opacity ${
              code === locale ? activeClass : inkClass
            }`}
            aria-current={code === locale ? "true" : undefined}
          >
            {t(code)}
          </button>
        </span>
      ))}
    </div>
  );
}
