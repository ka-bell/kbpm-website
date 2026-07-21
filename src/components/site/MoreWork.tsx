import { Link } from "@tanstack/react-router";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";

const cases = [
  {
    slug: "mix-interiors",
    client: "Mix Interiors",
    tag: "Product Discovery",
    result: "Interior imagery connected to manufacturer product data.",
  },
  {
    slug: "virtue-worldwide",
    client: "Virtue Worldwide",
    tag: "Network Intelligence",
    result: "Interactive knowledge graphs for cultural strategy work.",
  },
  {
    slug: "hopplay",
    client: "HopPlay",
    tag: "Travel Platform",
    result: "Location-based adventures launched for multiple destinations.",
  },
  {
    slug: "academion",
    client: "Academion",
    tag: "Higher Education",
    result: "+85% team hours saved on accreditation workflows.",
  },
];

export function MoreWork() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-24">
      <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-9">
          <p className="eyebrow">§ 04 / Selected work</p>
          <h2
            className="font-display mt-5 text-foreground"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            More proof, less noise.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A few extra signals of range: internal tools, marketplaces, commerce, and workflow
            products. The featured case carries the story; this section shows KBPM is not a
            one-project studio.
          </p>
        </div>
        <Link
          to="/work"
          className="group inline-flex items-center gap-2 border border-border px-5 py-3 text-sm text-foreground transition-colors hover:bg-surface-alt md:col-span-3 md:justify-self-end"
        >
          All case studies
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 border border-border md:grid-cols-4">
        {cases.map((c, i) => (
          <Reveal key={c.client} delay={i * 70}>
            <Link
              to="/work/$slug"
              params={{ slug: c.slug }}
              className={`group flex h-full min-h-[390px] flex-col bg-background p-5 transition-colors hover:bg-surface-alt md:p-6 ${
                i < cases.length - 1 ? "border-b border-border md:border-b-0 md:border-r" : ""
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-surface-alt">
                <ImagePlaceholder label="Image" />
              </div>
              <div className="mt-6">
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  Case 0{i + 3} / {c.tag}
                </p>
                <h3 className="mt-4 text-xl font-medium text-foreground">{c.client}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.result}</p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
                <span className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  View case
                </span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 11 11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
