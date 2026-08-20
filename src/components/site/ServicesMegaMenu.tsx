"use client";

import { Link } from "@/components/Link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { services, servicesFeature } from "./nav-data";

type ServicesMegaMenuProps = {
  open: boolean;
  onOpen: () => void;
  /** Delayed close (hover leave). */
  onClose: () => void;
  /** Immediate close (click / navigate). */
  onCloseNow: () => void;
  /** Matches SiteHeader ink for the trigger */
  triggerClassName: string;
  chevronSrc: string;
};

/**
 * Services mega menu — Figma 3626:16339.
 * Portaled to document.body so hero overflow / Lenis transforms
 * can't clip or shrink the panel.
 */
export function ServicesMegaMenu({
  open,
  onOpen,
  onClose,
  onCloseNow,
  triggerClassName,
  chevronSrc,
}: ServicesMegaMenuProps) {
  const menuId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseNow();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCloseNow]);

  const panel =
    mounted &&
    createPortal(
      <div
        id={menuId}
        className={`fixed inset-x-0 z-[80] px-6 sm:px-12 lg:px-[max(5rem,12vw)] ${
          open
            ? "pointer-events-auto visible"
            : "pointer-events-none invisible"
        }`}
        style={{ top: "var(--site-header-bottom, 5.5rem)" }}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        {/* Hover bridge — gap between header bar and panel */}
        <div
          className="pointer-events-auto absolute inset-x-0 -top-5 h-5"
          aria-hidden
        />
        <div
          className={`kbpm-hi-fi mx-auto w-full max-w-[1152px] overflow-hidden rounded-2xl border-t-2 border-[#006ff7] bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] transition-all duration-200 ${
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
          role="navigation"
          aria-label="Services"
          aria-hidden={!open}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col gap-4 px-6 py-8 sm:px-10 lg:col-span-7 lg:px-14 xl:pl-16 xl:pr-12">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group flex items-center gap-6 transition-opacity hover:opacity-80"
                  onClick={onCloseNow}
                >
                  <div className="relative size-[101px] shrink-0 overflow-hidden">
                    <img
                      src={s.thumb}
                      alt=""
                      width={101}
                      height={101}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-2 py-4 pr-4">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-display text-[18px] font-medium leading-[1.3] tracking-[-0.02em] text-[#1e1e1e]">
                        {s.name}
                      </span>
                      <img
                        src="/hero/arrow-outward-dark.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="mt-0.5 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                    <p className="max-w-md pr-4 text-[14px] leading-[1.3] tracking-[-0.02em] text-[#80899d]">
                      {s.blurb}
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                to="/services"
                onClick={onCloseNow}
                className="mt-2 inline-flex w-fit items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-[#006ff7] transition-opacity hover:opacity-70"
              >
                All services
                <img
                  src="/hero/arrow-outward-blue.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4"
                />
              </Link>
            </div>

            <div className="flex flex-col gap-6 bg-[#f5f5f5] px-6 py-8 sm:px-10 lg:col-span-5 lg:px-12 xl:pr-16">
              <Link
                to={servicesFeature.ctaHref}
                onClick={onCloseNow}
                className="relative min-h-[12rem] flex-1 overflow-hidden sm:min-h-[14rem] lg:min-h-0"
              >
                <img
                  src={servicesFeature.image}
                  alt=""
                  width={800}
                  height={520}
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </Link>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                  <p
                    className="font-display text-[#1e1e1e]"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.03em",
                      fontWeight: 500,
                    }}
                  >
                    {servicesFeature.title}
                  </p>
                  <p className="text-[16px] leading-[1.3] tracking-[-0.02em] text-[#1e1e1e]/80">
                    {servicesFeature.blurb}
                  </p>
                </div>
                <Link
                  to={servicesFeature.ctaHref}
                  className="inline-flex w-fit items-center gap-2.5 rounded-full bg-[#c9ff6e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-90"
                  onClick={onCloseNow}
                >
                  {servicesFeature.ctaLabel}
                  <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-[#1e1e1e]">
                    <img
                      src="/hero/arrow-outward.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="size-4"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <div className="flex items-center">
        <Link
          to="/services"
          className={`py-2.5 pl-2 pr-1 ${triggerClassName}`}
          onClick={onCloseNow}
        >
          Services
        </Link>
        <button
          type="button"
          className={`flex items-center py-2.5 pr-1.5 ${triggerClassName}`}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close services menu" : "Open services menu"}
          onClick={() => (open ? onCloseNow() : onOpen())}
        >
          <img
            src={chevronSrc}
            alt=""
            width={18}
            height={18}
            className={`size-[18px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {panel}
    </div>
  );
}
