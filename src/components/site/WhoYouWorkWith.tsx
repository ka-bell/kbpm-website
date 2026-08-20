import { Link } from "@/components/Link";
import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

const founders = [
  {
    name: "Karissa",
    role: "Product, strategy, client lead",
    note: "15+ years as a UI/UX designer, across fashion, branding, advertising, recruitment, marketing and research. Shapes the brief, pressure-tests the product direction, and keeps the work close to the business goal.",
    image: "/about/karissa.png",
    imageAlt: "Karissa — product, strategy, and client lead",
  },
  {
    name: "Alex",
    role: "Engineering, architecture, delivery",
    note: "20+ years as a development lead, across advertising and real estate. Turns the direction into a working product, with the technical decisions needed to keep it useful after launch.",
    image: "/about/alex.png",
    imageAlt: "Alex — engineering, architecture, and delivery",
  },
] as const;

/** Founders — Figma 3626:11276; rewrite copy. */
export function WhoYouWorkWith() {
  return (
    <section className="kbpm-hi-fi bg-white px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex max-w-[45rem] flex-col gap-8">
            <SectionEyebrow label="Who you work with" mark={3} />
            <h2
              className="font-display text-[#1e1e1e]"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Senior-led.
              <br />
              No account layer.
            </h2>
            <p className="max-w-[36rem] text-[17px] leading-[1.2] tracking-[-0.02em] text-[#6b6b6b] md:text-[18px]">
              You always work directly with Karissa and Alex — the two of us run
              KB+PM, and have for seven years. When a project needs more hands, we
              scale up with trusted specialists who already know how we work —
              without ever adding an account layer between you and the work.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-10 lg:gap-10">
          {founders.map((person, i) => (
            <Reveal key={person.name} delay={i * 80}>
              <article className="flex flex-col gap-8 md:gap-10">
                <div className="relative aspect-[620/750] overflow-hidden rounded-[28px] bg-[#f5f5f5]">
                  <img
                    src={person.image}
                    alt={person.imageAlt}
                    width={620}
                    height={750}
                    decoding="async"
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-7">
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-display text-[#1e1e1e]"
                        style={{
                          fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                          lineHeight: 1.2,
                          letterSpacing: "-0.02em",
                          fontWeight: 500,
                        }}
                      >
                        {person.name}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.3] tracking-[-0.01em] text-[#6b6b6b] md:text-[16px]">
                        {person.role}
                      </p>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#c9ff6e] py-3 pl-6 pr-3 font-mono text-[12px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-90"
                    >
                      Contact
                      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#1e1e1e]">
                        <img
                          src="/hero/arrow-outward-light.svg"
                          alt=""
                          width={12}
                          height={12}
                          className="size-3"
                        />
                      </span>
                    </Link>
                  </div>
                  <p className="text-[15px] leading-[1.3] tracking-[-0.01em] text-[#6b6b6b] md:text-[16px]">
                    {person.note}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
