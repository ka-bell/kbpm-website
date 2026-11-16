"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { CaseStudyNav } from "@/components/site/CaseStudyNav";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { stripLocalePrefix } from "@/i18n/path";

const SERVICE_GROUP_RE = /^\/services\/(validate|build|evolve|support)\/?$/;
const CASE_PATH_RE = /^\/work\/([^/]+)\/?$/;

export function SiteChrome({ children }: { children: ReactNode }) {
  const rawPathname = usePathname();
  const pathname = stripLocalePrefix(rawPathname);
  const isHome = pathname === "/";
  const isContact = pathname.startsWith("/contact");
  const caseMatch = pathname.match(CASE_PATH_RE);
  const caseSlug = caseMatch?.[1] ?? null;
  const serviceGroupPage = SERVICE_GROUP_RE.test(pathname);
  /** Home / service heroes sit on white — black ink at top. Contact starts dark. */
  const startsOverDark = isContact;

  /** White ink over dark surfaces; black elsewhere. */
  const [overDark, setOverDark] = useState(startsOverDark);
  /** Hide on scroll-down; ease back in on scroll-up. */
  const [navHidden, setNavHidden] = useState(false);
  /** Frosted bar once scrolled (home: readable when the dark card slides under). */
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const sync = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      if (isHome) {
        setOverDark(false);
      } else if (isContact) {
        const light = document.querySelector("[data-contact-light]");
        if (light) {
          const top = light.getBoundingClientRect().top + window.scrollY;
          setOverDark(y < top - 48);
        } else {
          setOverDark(y < window.innerHeight * 1.1);
        }
      } else if (serviceGroupPage) {
        const dark = document.querySelector("[data-service-offer-dark]");
        if (dark) {
          const top = dark.getBoundingClientRect().top + window.scrollY;
          setOverDark(y > top - 48);
        } else {
          setOverDark(false);
        }
      } else {
        setOverDark(false);
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
  }, [isHome, isContact, serviceGroupPage, pathname]);

  const variant = overDark ? "white" : "black";
  // Home: frosted after scroll; elsewhere: pill when over dark surfaces.
  const floating = isHome ? scrolled : overDark;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/*
        In-flow spacer = fixed chrome height (pt + header row).
        Mobile: pt-5 (20) + h-[68] = 88. md: pt-4 (16) + 68 = 84. lg: pt-5 + 60 = 80.
      */}
      <div
        className="pointer-events-none h-[88px] shrink-0 md:h-[84px] lg:h-[80px]"
        aria-hidden
      />

      <div
        className={`kbpm-hi-fi fixed inset-x-0 top-0 z-50 w-full bg-transparent px-6 pt-5 transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] md:px-10 md:pt-4 lg:px-20 lg:pt-5 motion-reduce:duration-150 ${
          navHidden ? "duration-300" : "duration-700"
        } ${
          navHidden
            ? "-translate-y-full pointer-events-none"
            : "translate-y-0"
        }`}
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <SiteHeader variant={variant} floating={floating} visible={!navHidden} />
        </div>
      </div>

      <main className={`flex-1 ${caseSlug ? "pb-24 sm:pb-28" : ""}`}>
        {children}
      </main>
      <SiteFooter variant="dark" />
      {caseSlug ? <CaseStudyNav key={caseSlug} /> : null}
    </div>
  );
}
