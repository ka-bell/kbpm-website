"use client";

import { Link } from "@/components/Link";
import { useEffect, useState } from "react";
import { primaryNav, services } from "./nav-data";
import { Wordmark } from "./Wordmark";

export function MobileNavDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [servicesExpanded, setServicesExpanded] = useState(true);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background md:hidden" role="dialog" aria-modal="true">
      <div className="flex h-16 items-center justify-between border-b border-border px-6">
        <Wordmark />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center"
          aria-label="Close menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 py-8">
        <div className="border-b border-border">
          <div className="flex w-full items-center justify-between py-5">
            <Link
              to="/services"
              onClick={onClose}
              className="font-display text-3xl text-foreground"
            >
              Services
            </Link>
            <button
              type="button"
              onClick={() => setServicesExpanded((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center"
              aria-expanded={servicesExpanded}
              aria-label={
                servicesExpanded ? "Collapse services" : "Expand services"
              }
            >
              <svg
                className={`h-4 w-4 transition-transform ${servicesExpanded ? "rotate-180" : ""}`}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
          </div>
          {servicesExpanded && (
            <div className="pb-4">
              {services.map((s, i) => (
                <Link
                  key={s.name}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  onClick={onClose}
                  className="flex items-baseline justify-between py-3"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="eyebrow text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-foreground">{s.name}</span>
                  </span>
                  <span className="eyebrow text-muted-foreground">{s.tag}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/about"
          onClick={onClose}
          className="block border-b border-border py-5 font-display text-3xl text-foreground"
        >
          About
        </Link>

        {primaryNav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className="block border-b border-border py-5 font-display text-3xl text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-6">
        <Link
          to="/contact"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-medium text-accent-foreground"
        >
          Start a project
          <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </Link>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          info@kbpm.nl · Amsterdam
        </p>
      </div>
    </div>
  );
}
