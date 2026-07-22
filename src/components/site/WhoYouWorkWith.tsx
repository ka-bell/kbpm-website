import { Link } from "@tanstack/react-router";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";

const founders = [
  {
    name: "Kiki",
    role: "Product, strategy, client lead",
    note: "Shapes the brief, pressure-tests the product direction, and keeps the work close to the business goal.",
  },
  {
    name: "Alex",
    role: "Engineering, architecture, delivery",
    note: "Turns the direction into a working product, with the technical decisions needed to keep it useful after launch.",
  },
];

export function WhoYouWorkWith() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-7">
          <p className="eyebrow">§ 05 / Who you work with</p>
          <h2
            className="font-display mt-5 max-w-4xl text-foreground"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            Senior-led. No account layer.
          </h2>
        </Reveal>
        <Reveal delay={80} className="md:col-span-5">
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            You work directly with the people shaping and shipping the product.
            When the brief needs more hands, we bring in trusted specialists —
            without adding an account layer between you and the work.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 border border-border md:grid-cols-2">
        {founders.map((person, i) => (
          <Reveal key={person.name} delay={i * 80}>
            <article
              className={`grid min-h-[360px] grid-cols-1 gap-6 bg-background p-5 md:grid-cols-[220px_1fr] md:p-6 ${
                i === 0 ? "border-b border-border md:border-b-0 md:border-r" : ""
              }`}
            >
              <div className="aspect-[4/5] bg-surface-alt md:aspect-auto">
                <ImagePlaceholder label="Portrait" />
              </div>
              <div className="flex flex-col">
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  Studio lead / 0{i + 1}
                </p>
                <h3 className="mt-4 text-2xl font-medium text-foreground">{person.name}</h3>
                <p className="mt-2 text-sm text-foreground">{person.role}</p>
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{person.note}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160}>
        <div className="mt-8 flex justify-end">
          <Link
            to="/team"
            className="group inline-flex items-center gap-2 border border-border px-5 py-3 text-sm text-foreground transition-colors hover:bg-surface-alt"
          >
            Meet the team
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
