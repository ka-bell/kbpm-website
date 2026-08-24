import type { ReactNode } from "react";
import { Link } from "@/components/Link";
import { FooterCradle } from "./FooterCradle";
import { Wordmark } from "./Wordmark";
import { services } from "./nav-data";

export type SiteFooterVariant = "dark" | "light";

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
      className={`text-[14px] leading-5 transition-opacity hover:opacity-70 ${className}`.trim()}
    >
      {children}
    </span>
  );
}

type SiteFooterProps = {
  /** Dark = default site + Newton's cradle; light = About/Work + falling tiles. */
  variant?: SiteFooterVariant;
};

export function SiteFooter({ variant = "dark" }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const light = variant === "light";

  const shell = light
    ? "kbpm-hi-fi overflow-hidden bg-white text-[#1e1e1e]"
    : "kbpm-hi-fi bg-[#1e1e1e] text-white";
  const muted = light ? "text-[#6b6b6b]" : "text-white";
  const link = light ? "text-[#1e1e1e]" : "text-white";
  const border = light ? "border-[#1e1e1e]/20" : "border-white/20";
  const email = light
    ? "text-[#1e1e1e] underline decoration-solid underline-offset-2"
    : "text-white underline decoration-solid underline-offset-2";

  /** Light footer: pass clicks through empty space to physics; dark: normal. */
  const contentPe = light ? "pointer-events-none" : "";
  const interactivePe = light ? "pointer-events-auto" : "";

  return (
    <footer className={shell}>
      <div className="relative mx-auto max-w-[1440px] px-6 pt-14 pb-8 md:px-8 md:pt-24 md:pb-10">
        <FooterCradle variant={variant} />

        <div
          className={`relative z-10 grid grid-cols-2 gap-8 md:grid-cols-12 md:gap-10 ${contentPe} ${
            light
              ? "pb-12 md:pb-20"
              : "pb-[clamp(7.5rem,20vw,18rem)] md:pb-[clamp(11rem,28vw,18rem)]"
          }`}
        >
          <div className="col-span-2 flex flex-col gap-2 md:col-span-5">
            <Wordmark
              ink={light ? "default" : "white"}
              className={`font-display text-[1.5rem] font-bold leading-none tracking-[-0.03em] md:text-[1.9rem] ${interactivePe}`}
            />
            <p
              className={`font-display mt-4 max-w-[20rem] text-[1.25rem] font-medium leading-[1.1] tracking-[-0.038em] md:mt-[1.65rem] md:text-[1.5rem] ${link}`}
            >
              Digital products end to end,
              <br />
              when the idea is bigger
              <br />
              than the team.
            </p>
            <div className={`mt-4 space-y-0 text-[14px] leading-5 md:mt-6 ${muted}`}>
              <p>Jan van Galenstraat 122</p>
              <p>1056 CA Amsterdam</p>
            </div>
            <a
              href="mailto:info@kbpm.nl"
              className={`mt-0.5 inline-block text-[14px] leading-5 transition-opacity hover:opacity-70 ${email} ${interactivePe}`}
            >
              info@kbpm.nl
            </a>
          </div>

          <div className="col-span-2 flex flex-wrap gap-x-10 gap-y-6 md:col-span-5 md:col-start-8 md:justify-end md:gap-x-[6.2rem] md:gap-y-10">
            <div className="min-w-[7rem] flex-1 space-y-3 md:space-y-4">
              <p
                className={`font-mono text-[11px] uppercase leading-[1.5] tracking-[0.04em] ${muted}`}
              >
                Services
              </p>
              <ul className={`space-y-1.5 md:space-y-2.5 ${interactivePe}`}>
                {services.map((s) => (
                  <li key={s.name}>
                    <Link to="/services/$slug" params={{ slug: s.slug }}>
                      <FooterLink className={link}>{s.name}</FooterLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-[7rem] flex-1 space-y-3 md:max-w-[12.25rem] md:space-y-4">
              <p
                className={`font-mono text-[11px] uppercase leading-[1.5] tracking-[0.04em] ${muted}`}
              >
                Studio
              </p>
              <ul className={`space-y-1.5 md:space-y-2.5 ${interactivePe}`}>
                {studioLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to}>
                      <FooterLink className={link}>{item.label}</FooterLink>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-[7rem] flex-1 space-y-3 md:space-y-4">
              <p
                className={`font-mono text-[11px] uppercase leading-[1.5] tracking-[0.04em] ${muted}`}
              >
                Elsewhere
              </p>
              <ul className={`space-y-1.5 md:space-y-2.5 ${interactivePe}`}>
                {elsewhereLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>
                      <FooterLink className={link}>{item.label} ↗</FooterLink>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {light ? (
          <div
            className={`pointer-events-none relative z-10 flex items-start justify-between border-t ${border} pt-10 pb-6 md:pt-14`}
            aria-hidden
          >
            <span
              className={`font-display font-semibold leading-none tracking-[-0.03em] ${link}`}
              style={{ fontSize: "clamp(4.5rem, 19vw, 17rem)" }}
            >
              kb
            </span>
            <span
              className={`font-display font-semibold leading-none tracking-[-0.03em] ${link}`}
              style={{ fontSize: "clamp(4.5rem, 19vw, 17rem)" }}
            >
              pm
            </span>
          </div>
        ) : null}

        <div
          className={`relative z-10 flex flex-col items-start justify-between gap-2 border-t ${border} pt-4 md:flex-row md:items-center md:gap-3 md:pt-6 ${contentPe}`}
        >
          <p
            className={`font-mono text-[11px] leading-[1.5] tracking-[0.06em] ${muted}`}
          >
            © {year} kbell + postman B.V. — Digital product studio, Amsterdam
          </p>
          <p
            className={`font-mono text-[11px] leading-[1.5] tracking-[0.06em] ${muted}`}
          >
            KvK 00000000 · Built end-to-end in-house
          </p>
        </div>
      </div>
    </footer>
  );
}
