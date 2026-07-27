import NextLink from "next/link";
import type { ComponentProps, ReactNode } from "react";

type SearchParams = Record<string, string | undefined>;

type Props = Omit<ComponentProps<typeof NextLink>, "href"> & {
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

/** Drop-in replacement for TanStack Router Link during Next.js migration. */
export function Link({ href, to, params, search, children, ...rest }: Props) {
  return (
    <NextLink href={resolveHref({ href, to, params, search })} {...rest}>
      {children}
    </NextLink>
  );
}
