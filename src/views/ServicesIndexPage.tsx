import { Link } from "@/components/Link";
import { Reveal } from "@/components/site/Reveal";
import { SectionEyebrow, type BrandMark } from "@/components/site/SectionEyebrow";
import {
  serviceOfferings,
  type ServiceSlug,
} from "@/components/site/service-offerings";
import {
  getServicePanelCopy,
  serviceListsByPhase,
} from "@/components/site/service-lists";
import { getServiceDetailByPlainName } from "@/components/site/service-details";

/** Mobile Figma 3674:3026 — services overview (all four groups). */
const GROUP_META: Record<
  ServiceSlug,
  {
    eyebrow: string;
    mark: BrandMark;
    body: string;
    listIntro: string;
    image: string;
  }
> = {
  validate: {
    eyebrow: "Clarity & evidence",
    mark: 4,
    body: "For teams who need confidence before design or development starts. We help define the right problem, test the idea, and map what is worth building.",
    listIntro: "Useful when the brief is still forming.",
    image: "/services/index-validate.jpg",
  },
  build: {
    eyebrow: "Product design & build",
    mark: 3,
    body: "For teams who know what to make and need a senior team to design and develop it. From prototype to platform — we ship focused increments toward product-market fit.",
    listIntro: "Useful when the product needs to become real.",
    image: "/services/index-build.jpg",
  },
  evolve: {
    eyebrow: "Improve & scale",
    mark: 5,
    body: "For live products that need sharper features, better performance, smarter AI, clearer data, or a more useful experience for real users.",
    listIntro: "Useful when the product is live but not finished.",
    image: "/services/index-evolve.jpg",
  },
  support: {
    eyebrow: "Operate & protect",
    mark: 6,
    body: "For products that need continuity after launch: maintenance, hosting, documentation, security, and senior technical judgement when it matters.",
    listIntro: "Useful when the product needs to stay healthy.",
    image: "/services/index-support.jpg",
  },
};

/**
 * Services overview — Figma mobile 3674:3026.
 */
export function ServicesIndexPage() {
  return (
    <>
      {/* Dark hero */}
      <section className="kbpm-hi-fi relative -mt-[4.5rem] bg-[#1e1e1e] px-5 pb-10 pt-[5.5rem] sm:-mt-[5.5rem] sm:px-6 sm:pb-16 sm:pt-[6.5rem] md:px-10 lg:-mt-[6.5rem] lg:px-20 lg:pb-[80px] lg:pt-[8.5rem]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
          <p className="font-mono text-[10px] uppercase leading-[1.1] tracking-[0.3px] text-white">
            Services
          </p>
          <h1
            className="font-display max-w-[18ch] text-white md:max-w-none"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 4.5rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Choose where the product needs help.
          </h1>
        </div>
      </section>

      {/* Groups */}
      <section className="kbpm-hi-fi bg-white px-5 py-10 md:px-10 md:py-16 lg:px-20 lg:py-[80px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:gap-16">
          {serviceOfferings.map((group, groupIndex) => {
            const meta = GROUP_META[group.slug];
            const offers = serviceListsByPhase[group.slug].all;

            return (
              <Reveal key={group.slug} delay={groupIndex * 40}>
                <div
                  id={group.slug}
                  className={`scroll-mt-28 flex flex-col gap-8 ${
                    groupIndex > 0
                      ? "border-t border-[#e8e8e8] pt-8 md:pt-16"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                    <div className="flex min-w-0 flex-1 flex-col gap-4">
                      <SectionEyebrow label={meta.eyebrow} mark={meta.mark} />
                      <h2
                        className="font-display text-[#1e1e1e]"
                        style={{
                          fontSize: "clamp(2.5rem, 5vw, 4rem)",
                          lineHeight: 1.2,
                          letterSpacing: "-0.02em",
                          fontWeight: 500,
                        }}
                      >
                        {group.name}
                      </h2>
                      <p className="max-w-[40rem] text-[16px] leading-[1.3] tracking-[-0.01em] text-[#666]">
                        {meta.body}
                      </p>
                      <Link
                        to="/services/$slug"
                        params={{ slug: group.slug }}
                        className="mt-0 inline-flex w-fit max-w-full items-center justify-between gap-4 rounded-full bg-[#1e1e1e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-white transition-opacity hover:opacity-90"
                      >
                        Explore {group.name}
                        <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-white">
                          <img
                            src="/hero/arrow-outward-dark.svg"
                            alt=""
                            width={16}
                            height={16}
                            className="size-4"
                          />
                        </span>
                      </Link>
                    </div>

                    <div className="relative h-[270px] w-full shrink-0 overflow-hidden rounded-2xl lg:h-[320px] lg:w-[min(100%,28rem)]">
                      <img
                        src={meta.image}
                        alt=""
                        width={800}
                        height={640}
                        decoding="async"
                        className="absolute inset-0 size-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <p className="text-[18px] leading-[1.3] tracking-[-0.01em] text-[#666] md:text-[20px]">
                      {meta.listIntro}
                    </p>
                    <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
                      {offers.map((name) => {
                        const offer = getServiceDetailByPlainName(name);
                        const copy = getServicePanelCopy(name, group.name);
                        const card = (
                          <div className="flex h-full flex-col gap-6 border border-[#ccc] bg-white/80 p-4 backdrop-blur-[11px] md:p-6">
                            <h3 className="font-display text-[20px] font-medium leading-[1.3] tracking-[-0.01em] text-[#1e1e1e]">
                              {name}
                            </h3>
                            <p className="text-[16px] leading-[1.3] tracking-[-0.01em] text-[#666]">
                              {copy}
                            </p>
                          </div>
                        );

                        return (
                          <li key={name}>
                            {offer ? (
                              <Link
                                to="/services/offer/$slug"
                                params={{ slug: offer.slug }}
                                className="block h-full transition-opacity hover:opacity-80"
                              >
                                {card}
                              </Link>
                            ) : (
                              <Link
                                to="/services/$slug"
                                params={{ slug: group.slug }}
                                className="block h-full transition-opacity hover:opacity-80"
                              >
                                {card}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Blue CTA — Figma 3674:3165 */}
      <section className="kbpm-hi-fi bg-[#006ff7] px-10 py-10 md:px-16 md:py-16 lg:px-20 lg:py-[80px]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-10">
          <h2
            className="font-display max-w-[16ch] text-white md:max-w-[20ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Not sure which model fits your project?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#c9ff6e] py-3 pl-6 pr-3 font-mono text-[14px] uppercase leading-[1.35] tracking-[-0.03em] text-[#1e1e1e] transition-opacity hover:opacity-90"
          >
            Let’s talk
            <span className="flex size-[31px] shrink-0 items-center justify-center rounded-full bg-[#1e1e1e]">
              <img
                src="/hero/arrow-outward.svg"
                alt=""
                width={16}
                height={16}
                className="size-4"
              />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
