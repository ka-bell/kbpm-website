import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { services } from "./nav-data";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-10 md:px-8 md:pt-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <Wordmark />
            <p
              className="font-display mt-8 max-w-xs text-foreground"
              style={{ fontSize: "1.5rem", letterSpacing: "-0.03em", fontWeight: 500, lineHeight: 1.1 }}
            >
              The build partner agencies call when the idea is bigger than their team.
            </p>
            <p className="mt-8 text-sm text-muted-foreground">
              Jan van Galenstraat 122<br />
              1056 CA Amsterdam
            </p>
            <a
              href="mailto:hello@kbpm.nl"
              className="mt-2 inline-block text-sm text-foreground underline decoration-accent decoration-2 underline-offset-4"
            >
              hello@kbpm.nl
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Services</p>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-sm text-foreground hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">Studio</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link to="/work" className="text-sm text-foreground hover:text-accent">Work</Link></li>
              <li><Link to="/about" className="text-sm text-foreground hover:text-accent">About</Link></li>
              <li><Link to="/contact" className="text-sm text-foreground hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              <li><a href="#" className="text-sm text-foreground hover:text-accent">LinkedIn ↗</a></li>
              <li><a href="#" className="text-sm text-foreground hover:text-accent">Instagram ↗</a></li>
              <li><a href="#" className="text-sm text-foreground hover:text-accent">Are.na ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Huge wordmark */}
        <div className="mt-24 border-t border-border pt-14 pb-6">
          <p
            className="font-display text-foreground"
            style={{
              fontSize: "clamp(4rem, 18vw, 18rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.06em",
              fontWeight: 500,
            }}
          >
            kb<span className="text-accent">+</span>pm
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="font-mono-label text-muted-foreground">
            © {year} kbell + postman B.V. — Digital product studio, Amsterdam
          </p>
          <p className="font-mono-label text-muted-foreground">
            KvK 00000000 · Built end-to-end in-house
          </p>
        </div>
      </div>
    </footer>
  );
}
