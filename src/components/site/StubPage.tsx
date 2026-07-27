import { Link } from "@/components/Link";

export function StubPage({
  section,
  title,
  body,
}: {
  section: string;
  title: string;
  body: string;
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-28 md:px-8 md:py-40">
      <div className="max-w-3xl">
        <p className="eyebrow">{section} — In progress</p>
        <h1
          className="font-display mt-8 text-foreground"
          style={{
            fontSize: "clamp(2.75rem, 6vw, 6rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.045em",
            fontWeight: 500,
          }}
        >
          {title}
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">{body}</p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-px"
          >
            <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            Back home
          </Link>
          <a
            href="mailto:info@kbpm.nl"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-4 text-sm text-foreground transition-colors hover:border-foreground"
          >
            info@kbpm.nl
          </a>
        </div>
      </div>
    </section>
  );
}
