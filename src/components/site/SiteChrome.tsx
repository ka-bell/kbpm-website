"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navIsDark = pathname.startsWith("/about");

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {!isHome &&
        (navIsDark ? (
          <div className="dark bg-background text-foreground">
            <SiteNav />
          </div>
        ) : (
          <SiteNav />
        ))}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
