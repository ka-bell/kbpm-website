import type { ComponentProps, ReactNode } from "react";
import { Link as LocaleLink } from "@/i18n/navigation";

type SearchParams = Record<string, string | undefined>;

type Props = Omit<ComponentProps<typeof LocaleLink>, "href"> & {
  href?: string;
  to?: string;
  params?: Record<string, string>;
  search?: SearchParams;
  children?: ReactNode;
};

function resolveHref({
  href,
  to,
  params,
  search,
}: {
  href?: string;
  to?: string;
  params?: Record<string, string>;
  search?: SearchParams;
}) {
  if (href) return href;
  let path = to ?? "/";
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replaceAll(`$${key}`, value);
    }
  }
  if (search) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(search)) {
      if (value != null && value !== "") query.set(key, value);
    }
    const qs = query.toString();
    if (qs) path += `?${qs}`;
  }
  return path;
}

/**
 * Locale-aware link — drop-in for TanStack Router `Link` during Next.js migration.
 * Internal paths stay on the active locale (`/nl/...` when browsing Dutch).
 */
export function Link({ href, to, params, search, children, ...rest }: Props) {
  const resolved = resolveHref({ href, to, params, search });
  const external =
    typeof resolved === "string" &&
    (resolved.startsWith("http://") ||
      resolved.startsWith("https://") ||
      resolved.startsWith("mailto:") ||
      resolved.startsWith("tel:"));

  if (external) {
    return (
      <a href={resolved} {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <LocaleLink href={resolved} {...rest}>
      {children}
    </LocaleLink>
  );
}
