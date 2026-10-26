"use client";

import { Link } from "@/components/Link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="font-display mt-4 text-5xl text-foreground">
          {t("headline")}
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">{t("body")}</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-foreground px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
