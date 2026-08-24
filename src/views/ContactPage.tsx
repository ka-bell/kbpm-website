"use client";

import { Link } from "@/components/Link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow } from "@/components/site/SectionEyebrow";

const INTEREST_HINT: Record<string, string> = {
  scan: "Launch Scan / vibecode readiness",
  release: "Release Ready / vibecode hardening",
  "eu-scan": "EU Stack Scan",
  "eu-setup": "EU-First Setup",
  "eu-migrate": "EU Migration Plan",
};

const CONTACT_CARDS = [
  {
    label: "Studio",
    title: "Amsterdam, NL",
    body: "Remote-first delivery with in-person working sessions when the project benefits from it.",
  },
  {
    label: "Email",
    title: "hello@kbpm.nl",
    href: "mailto:hello@kbpm.nl",
    body: "Best for briefs, prototype links, procurement questions, and first project context.",
  },
  {
    label: "Working hours",
    title: "CET / CEST",
    body: "Useful overlap for European teams, agencies, founders, and product owners.",
  },
] as const;

/**
 * Contact — Figma 3626:9843.
 * Layout/look from Figma; rewrite copy where Figma used placeholders (Miyagami).
 */
export function ContactPage({ interest }: { interest?: string }) {
  const hint = INTEREST_HINT[interest ?? ""] ?? "";
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (!hint) return;
    const el = document.getElementById("message") as HTMLTextAreaElement | null;
    if (el && !el.value) {
      el.value = `Interested in: ${hint}\n\n`;
    }
  }, [hint]);

  return (
    <div className="kbpm-hi-fi">
      {/* Dark hero + form — continuous #1e1e1e; pulls under floating header */}
      <div className="relative -mt-[4.5rem] bg-[#1e1e1e] text-white sm:-mt-[5.5rem] lg:-mt-[6.5rem]">
        {/* Hero — Figma 3626:9845 */}
        <section className="mx-auto max-w-[1440px] px-6 pb-10 pt-[5.5rem] sm:pt-[6.5rem] md:px-20 md:pb-14 lg:px-20 lg:pb-20 lg:pt-[8.5rem]">
          <div className="flex flex-col gap-14">
            <Reveal>
              <Link
                to="/"
                className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white px-6 py-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-80"
              >
                <img
                  src="/hero/arrow-outward-light.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 rotate-180"
                />
                Home
              </Link>
            </Reveal>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <Reveal className="max-w-[44rem]">
                <div className="flex flex-col gap-8">
                  <p className="font-mono text-[14px] uppercase leading-[16.5px] tracking-[0.05em] text-white">
                    Contact
                  </p>
                  <h1
                    className="font-display font-medium text-white"
                    style={{
                      fontSize: "clamp(3rem, 8vw, 6rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Let’s build
                    <br />
                    together.
                  </h1>
                </div>
              </Reveal>
              <Reveal delay={80} className="max-w-[22.5rem] lg:pb-1">
                <p className="text-[18px] leading-[1.2] tracking-[-0.02em] text-white">
                  kbell + postman is a small, senior studio in Amsterdam. We take
                  products from idea to production — strategy, design, and code —
                  for teams whose ideas have outgrown their in-house capacity.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Form — Figma 3626:9856 */}
        <section className="mx-auto max-w-[1440px] px-6 pb-16 pt-6 md:px-20 md:pb-20 md:pt-10">
          <Reveal>
            <form
              action="mailto:hello@kbpm.nl"
              method="post"
              encType="text/plain"
              className="flex max-w-[955px] flex-col gap-6"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-4">
                  <span className="text-[16px] leading-[1.3] tracking-[-0.02em] text-white">
                    Full name
                  </span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="h-12 w-full border border-white bg-transparent px-3 text-[16px] text-white outline-none placeholder:text-white/40 focus:border-white"
                  />
                </label>
                <label className="flex flex-col gap-4">
                  <span className="text-[16px] leading-[1.3] tracking-[-0.02em] text-white">
                    Email address *
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="h-12 w-full border border-white bg-transparent px-3 text-[16px] text-white outline-none placeholder:text-white/40 focus:border-white"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-4">
                <span className="text-[16px] leading-[1.3] tracking-[-0.02em] text-white">
                  Message
                </span>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  placeholder="Type your message..."
                  className="min-h-[180px] w-full resize-y border border-white bg-transparent p-3 text-[16px] leading-[1.3] tracking-[-0.02em] text-white outline-none placeholder:text-white/45 focus:border-white"
                />
              </label>

              <label className="flex items-start gap-2 pb-4 sm:items-center">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 size-[18px] shrink-0 appearance-none border border-white bg-transparent checked:bg-white"
                />
                <span className="text-[12px] leading-[1.2] tracking-[-0.01em] text-white">
                  I agree to kbell + postman storing my information for the
                  purpose of this inquiry.
                </span>
              </label>

              <button
                type="submit"
                className="inline-flex w-fit items-center justify-center rounded-full bg-[#006ff7] px-6 py-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
              >
                Submit
              </button>
            </form>
          </Reveal>
        </section>
      </div>

      {/* Studio details — Figma 3626:9870 */}
      <section
        data-contact-light
        className="bg-white px-6 py-16 text-[#1e1e1e] md:px-20 md:py-20"
      >
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="flex max-w-[45rem] flex-col gap-8">
            <SectionEyebrow label="Capabilities and Services" mark={3} />
            <h2
              className="font-display font-medium tracking-[-0.03em] text-[#1e1e1e]"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
              }}
            >
              Small studio,
              <br />
              direct access.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:mt-[72px] md:grid-cols-3">
            {CONTACT_CARDS.map((card, i) => (
              <Reveal key={card.label} delay={i * 60}>
                <article className="flex min-h-[18.5rem] flex-col justify-between border border-[#1e1e1e]/20 p-7 md:min-h-[297px]">
                  <div>
                    <p className="font-mono text-[11px] uppercase leading-[16.5px] tracking-[0.05em] text-[#6b6b6b]">
                      {card.label}
                    </p>
                    {"href" in card && card.href ? (
                      <a
                        href={card.href}
                        className="mt-[19px] block font-display text-[24px] font-medium leading-7 text-[#1e1e1e] transition-opacity hover:opacity-70"
                      >
                        {card.title}
                      </a>
                    ) : (
                      <p className="mt-[19px] font-display text-[24px] font-medium leading-7 text-[#1e1e1e]">
                        {card.title}
                      </p>
                    )}
                  </div>
                  <p className="text-[14px] leading-[22.75px] text-[#6b6b6b]">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Studio photo — Figma 3626:9901 */}
      <section className="bg-white">
        <div className="relative aspect-[1440/820] w-full overflow-hidden bg-[#f5f5f5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/contact/studio.jpg"
            alt="kbell + postman studio workspace in Amsterdam"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
