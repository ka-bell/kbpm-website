import type { ReactNode } from "react";
import { Link } from "@/components/Link";
import { FooterCradle } from "./FooterCradle";
import { Wordmark } from "./Wordmark";
import { services } from "./nav-data";

const studioLinks = [
  { label: "Work", to: "/work" as const },
  { label: "About", to: "/about" as const },
  { label: "Playground", to: "/playground" as const },
  { label: "Go-to-Market", to: "/go-to-market" as const },
  { label: "EU-first infra", to: "/european-first-infrastructure" as const },
  { label: "Contact", to: "/contact" as const },
] as const;

const elsewhereLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Are.na", href: "#" },
] as const;

function FooterLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-[14px] leading-5 text-white transition-opacity hover:opacity-70 ${className}`.trim()}
    >
      {children}
    </span>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="kbpm-hi-fi bg-[#1e1e1e] text-white">
      <div className="relative mx-auto max-w-[1440px] px-6 pt-24 pb-10 md:px-8">
        {/* Cradle sits behind copy — long strings from top of footer */}
        <FooterCradle />

        <div className="relative z-10 grid grid-cols-2 gap-10 pb-[clamp(11rem,28vw,18rem)] md:grid-cols-12 md:gap-10">
          <div className="col-span-2 flex flex-col gap-2 md:col-span-5">
            <Wordmark
              ink="white"
              className="font-display text-[1.9rem] font-bold leading-none tracking-[-0.03em]"
            />
            <p className="font-display mt-[1.65rem] max-w-[20rem] text-[1.5rem] font-medium leading-[1.1] tracking-[-0.038em] text-white">
              Digital products end to end,
              <br />
              when the idea is bigger
              <br />
              than the team.
            </p>
            <div className="mt-6 space-y-0 text-[14px] leading-5 text-white">
              <p>Jan van Galenstraat 122</p>
              <p>1056 CA Amsterdam</p>
            </div>
            <a
              href="mailto:info@kbpm.nl"
              className="mt-0.5 inline-block text-[14px] leading-5 text-white underline decoration-solid underline-offset-2 transition-opacity hover:opacity-70"
            >
              info@kbpm.nl
            </a>
          </div>

          <div className="col-span-2 flex flex-wrap gap-x-12 gap-y-10 md:col-span-5 md:col-start-8 md:justify-end md:gap-x-[6.2rem]">
            <div className="min-w-[7rem] flex-1 space-y-4">
              <p className="font-mono text-[11px] uppercase leading-[1.5] tracking-[0.04em] text-white">
                Services
              </p>
              <ul className="space-y-2.5">
                {services.map((s) => (
                  <li key={s.name}>
                    <Link to="/services/$slug" params={{ slug: s.slug }}>
                      <FooterLink>{s.name}</FooterLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-[7rem] flex-1 space-y-4 md:max-w-[12.25rem]">
              <p className="font-mono text-[11px] uppercase leading-[1.5] tracking-[0.04em] text-white">
                Studio
              </p>
              <ul className="space-y-2.5">
                {studioLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>
                      <FooterLink>{item.label}</FooterLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-[7rem] flex-1 space-y-4">
              <p className="font-mono text-[11px] uppercase leading-[1.5] tracking-[0.04em] text-white">
                Elsewhere
              </p>
              <ul className="space-y-2.5">
                {elsewhereLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>
                      <FooterLink>{item.label} ↗</FooterLink>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-start justify-between gap-3 border-t border-white/20 pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] leading-[1.5] tracking-[0.06em] text-white">
            © {year} kbell + postman B.V. — Digital product studio, Amsterdam
          </p>
          <p className="font-mono text-[11px] leading-[1.5] tracking-[0.06em] text-white">
            KvK 00000000 · Built end-to-end in-house
          </p>
        </div>
      </div>
    </footer>
  );
}
