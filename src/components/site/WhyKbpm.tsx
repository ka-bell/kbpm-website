import { Reveal } from "./Reveal";
import { SectionEyebrow } from "./SectionEyebrow";

/** Rewrite WhyKbpm copy; Figma 3626:4063 layout + color cards. */
const CARDS = [
  {
    title: "No hiring. No management.",
    body: "You get a full technical team on day one — product, design, engineering. No recruiters, no ramp-up, no dead weight.",
    card: "bg-[#006ff7] text-white",
    bodyClass: "text-white/80",
  },
  {
    title: "Ship bigger ideas.",
    body: "A senior-led studio that can take on work that outgrows a standard delivery team — with specialists when the brief needs them.",
    card: "bg-[#1e1e1e] text-white",
    bodyClass: "text-white/80",
  },
  {
    title: "One partner, end to end.",
    body: "Product thinking, UX, and build in one studio. Fewer handoffs, faster decisions, a straighter line to something shipped.",
    card: "bg-[#c9ff6e] text-[#1e1e1e]",
    bodyClass: "text-[#1e1e1e]/80",
  },
] as const;

/**
 * Visual + text highlights — Figma 3626:4063.
 */
export function WhyKbpm() {
  return (
    <section className="kbpm-hi-fi bg-white px-6 py-16 md:px-10 md:py-20 lg:px-20 lg:py-[80px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:gap-12 lg:gap-[56px]">
        <Reveal>
          <div className="flex max-w-[45rem] flex-col gap-8">
            <SectionEyebrow label="Highlights" mark={4} />
            <h2
              className="font-display text-[#1e1e1e]"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 500,
              }}
            >
              What you get with a senior studio.
            </h2>
          </div>
        </Reveal>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <Reveal className="min-h-[22rem] w-full lg:min-h-0 lg:w-[min(100%,53.5rem)] lg:shrink-0">
            <div className="relative h-full min-h-[22rem] overflow-hidden rounded-2xl lg:min-h-[46.7rem]">
              <img
                src="/highlights/studio.png"
                alt="Studio collaboration — reviewing work together at a desk"
                width={1200}
                height={1500}
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </Reveal>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {CARDS.map((card, i) => (
              <Reveal key={card.title} delay={80 + i * 80} className="flex min-h-0 flex-1">
                <article
                  className={`flex w-full flex-col justify-between rounded-2xl p-6 md:p-8 ${card.card}`}
                >
                  <h3
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      fontWeight: 500,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`mt-8 max-w-md text-[14px] leading-5 tracking-[-0.01em] md:mt-10 ${card.bodyClass}`}
                  >
                    {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
