"use client";

import { Link } from "@/components/Link";
import { useEffect, useRef, useState } from "react";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { ServicesMegaMenu } from "./ServicesMegaMenu";
import { Wordmark } from "./Wordmark";

export type SiteHeaderVariant = "black" | "white";

type SiteHeaderProps = {
  /** Black = dark type on light; White = light type on dark (e.g. hero). */
  variant?: SiteHeaderVariant;
  /** Frosted floating bar. */
  floating?: boolean;
  /** When false (scrolled away), close menus and skip hover. */
  visible?: boolean;
  className?: string;
};

/**
 * Site header — Figma 3626:17653 (Black / White) + mega menu 3626:16339.
 * Sized ~40% smaller than the original floating bar.
 */
export function SiteHeader({
  variant = "black",
  floating = false,
  visible = true,
  className = "",
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isWhite = variant === "white";
  const ink = isWhite ? "text-white" : "text-[#1e1e1e]";
  const chevron = isWhite
    ? "/hero/chevron-down-light.svg"
    : "/hero/chevron-down-dark.svg";
  const navLink = `font-mono text-[12px] uppercase leading-[1.1] tracking-[-0.03em] ${ink} transition-opacity hover:opacity-70`;

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 280);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => {
    if (!visible) {
      setServicesOpen(false);
      setMobileOpen(false);
    }
  }, [visible]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const sync = () => {
      const bottom = el.getBoundingClientRect().bottom;
      document.documentElement.style.setProperty(
        "--site-header-bottom",
        `${Math.round(bottom + 6)}px`,
      );
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [floating, variant, servicesOpen, visible]);

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "relative z-20 flex w-full items-center justify-between",
          floating
            ? "h-[44px] rounded-xl px-4 backdrop-blur-[50px] sm:h-[52px] sm:px-6 lg:h-[60px] lg:px-8 xl:px-10"
            : "h-[44px] sm:h-[52px] lg:h-[60px]",
          floating && variant === "white"
            ? "bg-white/5"
            : floating && variant === "black"
              ? "bg-white/80"
              : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Wordmark
          className={`text-[clamp(1.05rem,1.8vw,1.25rem)] font-bold tracking-[-0.03em] ${ink} [&_span]:!text-inherit`}
        />

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
          <ServicesMegaMenu
            open={servicesOpen}
            onOpen={() => {
              cancelClose();
              setServicesOpen(true);
            }}
            onClose={scheduleClose}
            onCloseNow={() => {
              cancelClose();
              setServicesOpen(false);
            }}
            triggerClassName={navLink}
            chevronSrc={chevron}
          />
          <Link to="/work" className={`px-4 py-2.5 ${navLink}`}>
            Work
          </Link>
          <Link to="/about" className={`px-4 py-2.5 ${navLink}`}>
            About
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c9ff6e] py-2 pl-4 pr-2 font-mono text-[12px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-90"
          >
            Start a project
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1e1e1e]">
              <img
                src="/hero/arrow-outward.svg"
                alt=""
                width={14}
                height={14}
                className="size-3.5"
              />
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Link
            to="/contact"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#c9ff6e] px-4 font-mono text-[12px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-90"
          >
            Let’s talk
          </Link>
          <button
            type="button"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1e1e1e] text-white transition-opacity hover:opacity-90"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <svg width="19" height="12" viewBox="0 0 20 14" fill="none" aria-hidden>
              <path
                d="M0 1h20M0 7h20M0 13h20"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </button>
        </div>
      </header>

      <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
