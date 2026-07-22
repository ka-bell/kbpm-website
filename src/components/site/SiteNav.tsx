import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Wordmark";
import { primaryNav, services, servicesFeature } from "./nav-data";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { MobileNavDrawer } from "./MobileNavDrawer";

type MenuItem = {
  name: string;
  href?: string;
  slug?: string;
  tag: string;
  blurb: string;
  thumb: string;
};

type Feature = {
  image: string;
  title: string;
  blurb: string;
  ctaLabel: string;
  ctaHref: "/contact";
};

function MegaMenu({
  label,
  open,
  onOpen,
  onClose,
  items,
  feature,
}: {
  label: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  items: readonly MenuItem[];
  feature: Feature;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className="group inline-flex cursor-default items-center gap-1.5 py-2 text-sm text-foreground"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="relative">
          {label}
          <span
            className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
              open ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
        >
          <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <div
        className={`fixed left-1/2 top-16 z-40 w-[1040px] max-w-[calc(100vw-32px)] -translate-x-1/2 pt-4 md:top-20 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`overflow-hidden border border-border bg-background shadow-[0_20px_60px_-20px_rgba(17,17,17,0.18)] transition-all duration-200 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          <div className="grid grid-cols-12">
            <div className="col-span-7 divide-y divide-border border-r border-border">
              {items.map((s) => (
                <Link
                  key={s.name}
                  {...(s.slug
                    ? { to: "/services/$slug" as const, params: { slug: s.slug } }
                    : { to: s.href as "/about" | "/team" })}
                  className="group flex items-center gap-5 px-6 py-4 transition-colors hover:bg-surface-alt"
                >
                  <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-surface-alt">
                    <ImagePlaceholder label="Image" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-display text-lg leading-tight text-foreground">
                        {s.name}
                      </div>
                      <span className="eyebrow shrink-0 text-muted-foreground">
                        {s.tag}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.blurb}</div>
                  </div>
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 11 11 3M11 3H5M11 3v6"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                </Link>
              ))}
            </div>

            <div className="relative col-span-5 overflow-hidden bg-foreground">
              <ImagePlaceholder label="Image" className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-8">
                <h3
                  className="font-display text-background"
                  style={{
                    fontSize: "clamp(1.5rem, 2vw, 1.875rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    fontWeight: 500,
                  }}
                >
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/80">
                  {feature.blurb}
                </p>
                <Link
                  to={feature.ctaHref}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-px"
                >
                  {feature.ctaLabel}
                  <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="square"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = (setter: (v: boolean) => void) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setter(false), 150);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-background/85 backdrop-blur transition-[border-color,background-color] ${
          scrolled ? "border-b border-border" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10">
          <Wordmark />

          <nav className="hidden items-center gap-10 md:flex">
            <MegaMenu
              label="Services"
              open={servicesOpen}
              onOpen={() => {
                cancelClose();
                setServicesOpen(true);
              }}
              onClose={() => scheduleClose(setServicesOpen)}
              items={services}
              feature={servicesFeature}
            />

            <Link
              to="/about"
              className="group relative py-2 text-sm text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {({ isActive }) => (
                <span className="relative">
                  About
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              )}
            </Link>

            {primaryNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative py-2 text-sm text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {({ isActive }) => (
                  <span className="relative">
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-px md:inline-flex"
            >
              Start a project
              <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center md:hidden"
              aria-label="Open menu"
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
                <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNavDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
