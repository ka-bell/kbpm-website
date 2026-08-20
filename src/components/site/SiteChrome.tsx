"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const SERVICE_GROUP_RE = /^\/services\/(validate|build|evolve|support)\/?$/;

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const aboutDark = pathname.startsWith("/about");
  const serviceGroupDark = SERVICE_GROUP_RE.test(pathname);
  const startsOverDark = isHome || aboutDark || serviceGroupDark;

  /** White ink over dark surfaces (home hero / about / service groups); black elsewhere. */
  const [overDark, setOverDark] = useState(startsOverDark);
  /** Hide on scroll-down; ease back in on scroll-up. */
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const sync = () => {
      const y = window.scrollY;

      if (isHome || serviceGroupDark) {
        setOverDark(y < window.innerHeight * 0.55);
      } else {
        setOverDark(aboutDark);
      }

      const delta = y - lastY;
      if (y < 32) {
        setNavHidden(false);
      } else if (delta > 6) {
        setNavHidden(true);
      } else if (delta < -6) {
        setNavHidden(false);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome, aboutDark, serviceGroupDark, pathname]);

  const variant = overDark ? "white" : "black";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* In-flow spacer — matches fixed chrome so hero overlap stays stable */}
      <div
        className="pointer-events-none h-[56px] shrink-0 sm:h-[68px] lg:h-[80px]"
        aria-hidden
      />

      <div
        className={`kbpm-hi-fi fixed inset-x-0 top-0 z-50 w-full bg-transparent px-6 pt-3 transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-12 sm:pt-4 lg:px-[max(5rem,12vw)] lg:pt-5 motion-reduce:duration-150 ${
          navHidden ? "duration-300" : "duration-700"
        } ${
          navHidden
            ? "-translate-y-full pointer-events-none"
            : "translate-y-0"
        }`}
      >
        <div className="mx-auto w-full max-w-[1152px]">
          <SiteHeader variant={variant} floating visible={!navHidden} />
        </div>
      </div>

      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
