import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";

const founders = [
  {
    name: "Karissa",
    role: "Product, strategy, client lead",
    note: "15+ years as a UI/UX designer, across fashion, branding, advertising, recruitment, marketing and research. Shapes the brief, pressure-tests the product direction, and keeps the work close to the business goal.",
  },
  {
    name: "Alex",
    role: "Engineering, architecture, delivery",
    note: "20+ years as a development lead, across advertising and real estate. Turns the direction into a working product, with the technical decisions needed to keep it useful after launch.",
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
            You always work directly with Karissa and Alex — the two of us run
            KB+PM, and have for seven years. When a project needs more hands, we
            scale up with trusted specialists who already know how we work —
            without ever adding an account layer between you and the work.
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
                  Founder / 0{i + 1}
                </p>
                <h3 className="mt-4 text-2xl font-medium text-foreground">{person.name}</h3>
                <p className="mt-2 text-sm text-foreground">{person.role}</p>
                <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{person.note}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
