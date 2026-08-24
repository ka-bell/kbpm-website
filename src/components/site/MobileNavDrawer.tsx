"use client";

import { Link } from "@/components/Link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-white text-[#1e1e1e] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#1e1e1e]/10 px-6">
        <Wordmark />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center text-[#1e1e1e]"
          aria-label="Close menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto bg-white px-6 py-8">
        <div className="border-b border-[#1e1e1e]/10">
          <div className="flex w-full items-center justify-between py-5">
            <Link
              to="/services"
              onClick={onClose}
              className="font-display text-3xl text-[#1e1e1e]"
            >
              Services
            </Link>
            <button
              type="button"
              onClick={() => setServicesExpanded((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center text-[#1e1e1e]"
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
                    <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-[#6b6b6b]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base text-[#1e1e1e]">{s.name}</span>
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-[#6b6b6b]">
                    {s.tag}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/about"
          onClick={onClose}
          className="block border-b border-[#1e1e1e]/10 py-5 font-display text-3xl text-[#1e1e1e]"
        >
          About
        </Link>

        {primaryNav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className="block border-b border-[#1e1e1e]/10 py-5 font-display text-3xl text-[#1e1e1e]"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="shrink-0 border-t border-[#1e1e1e]/10 bg-white p-6">
        <Link
          to="/contact"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c9ff6e] px-6 py-4 text-base font-medium text-[#1e1e1e]"
        >
          Start a project
          <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </Link>
        <p className="mt-4 text-center text-xs text-[#6b6b6b]">
          info@kbpm.nl · Amsterdam
        </p>
      </div>
    </div>,
    document.body,
  );
}
