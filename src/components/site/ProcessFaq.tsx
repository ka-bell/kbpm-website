import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqItem = { q: string; a: string };

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "Do you work with clients outside the Netherlands?",
    a: "Yes. Most of our communication is async anyway, and we have experience working with teams across Europe and the Middle East.",
  },
  {
    q: "Can we start with just a Draft™ and decide later?",
    a: "Absolutely. That's what it's designed for. A lot of our Make™ projects start as a Draft™.",
  },
  {
    q: "Do you work with agencies as a white-label partner?",
    a: "Yes. We've done this before and we're comfortable staying behind the scenes if that's what works for your client.",
  },
  {
    q: "What if we already have a design — can you just build it?",
    a: "Yes. We can build from an existing Figma file. We'll review it first to flag anything that would cause problems in development.",
  },
];

type ProcessFaqProps = {
  eyebrow?: string;
  title?: string;
  faqs?: FaqItem[];
};

export function ProcessFaq({
  eyebrow = "§ FAQ",
  title = "Honest answers to common questions.",
  faqs = DEFAULT_FAQS,
}: ProcessFaqProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="eyebrow">{eyebrow}</p>
            <h2
              className="font-display mt-5 text-foreground"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 500,
              }}
            >
              {title}
            </h2>
          </div>

          <div className="md:col-span-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="py-6 text-left hover:no-underline">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono-label text-muted-foreground">Q.</span>
                      <span
                        className="font-display text-foreground"
                        style={{
                          fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
                          letterSpacing: "-0.02em",
                          fontWeight: 500,
                        }}
                      >
                        {item.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono-label text-muted-foreground">A.</span>
                      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
