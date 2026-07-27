import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getServiceDetail } from "@/components/site/service-details";

export const Route = createFileRoute("/services/offer/$slug")({
  loader: ({ params }) => {
    const offer = getServiceDetail(params.slug);
    if (!offer) throw notFound();
    return { offer };
  },
  head: ({ loaderData }) => {
    const offer = loaderData?.offer;
    return {
      meta: [
        {
          title: offer ? `${offer.name} — kbell + postman` : "Service — kbell + postman",
        },
        {
          name: "description",
          content: offer?.subhead ?? "Service detail from kbell + postman.",
        },
        {
          property: "og:title",
          content: offer ? `${offer.name} — kbell + postman` : "Service",
        },
        { property: "og:description", content: offer?.subhead ?? "" },
      ],
      links: offer
        ? [{ rel: "canonical", href: `/services/offer/${offer.slug}` }]
        : [],
    };
  },
  component: ServiceOfferDetail,
});

function ServiceOfferDetail() {
  const { offer } = Route.useLoaderData();

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              strokeWidth={1.7}
              aria-hidden
            />
            All services
          </Link>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-8">
              <p className="eyebrow">
                {offer.offerNumber} — {offer.phaseLabel}
              </p>
              <h1
                className="font-display mt-5 max-w-5xl text-foreground"
                style={{
                  fontSize: "clamp(3rem, 7vw, 7rem)",
                  lineHeight: 0.9,
                  fontWeight: 500,
                }}
              >
                {offer.name}
              </h1>
              <p className="mt-8 max-w-3xl text-2xl leading-tight text-foreground md:text-3xl">
                {offer.subhead}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {offer.intro}
              </p>
            </Reveal>

            <Reveal delay={80} className="md:col-span-4">
              <div className="border border-border bg-surface-alt p-6">
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  Group
                </p>
                <p className="mt-3 text-lg font-medium text-foreground capitalize">
                  {offer.phase}
                </p>
                <Link
                  to="/services/$slug"
                  params={{ slug: offer.phase }}
                  className="mt-2 inline-block text-sm text-muted-foreground hover:text-foreground"
                >
                  View all {offer.phase} services →
                </Link>
                <Link
                  to="/contact"
                  className="group mt-8 inline-flex w-full items-center justify-between gap-3 bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
                >
                  Start a project
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                    aria-hidden
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-5">
              <p className="eyebrow">What you get</p>
              <h2
                className="font-display mt-5 max-w-xl text-foreground"
                style={{
                  fontSize: "clamp(2.25rem, 4.4vw, 4.5rem)",
                  lineHeight: 0.95,
                  fontWeight: 500,
                }}
              >
                Concrete outputs.
              </h2>
            </Reveal>
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 gap-px border border-border bg-border">
                {offer.whatYouGet.map((item) => (
                  <div key={item} className="flex gap-4 bg-background p-5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border border-foreground/30 text-foreground">
                      <Check className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <p className="text-sm leading-relaxed text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-alt">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-5">
              <p className="eyebrow">How it works</p>
              <h2
                className="font-display mt-5 max-w-xl text-foreground"
                style={{
                  fontSize: "clamp(2.25rem, 4.4vw, 4.5rem)",
                  lineHeight: 0.95,
                  fontWeight: 500,
                }}
              >
                The process.
              </h2>
            </Reveal>
            <div className="md:col-span-7">
              <div className="grid grid-cols-1 overflow-hidden border border-border bg-background">
                {offer.howItWorks.map((step, index) => (
                  <Reveal key={step} delay={index * 50}>
                    <article
                      className={`p-6 ${
                        index < offer.howItWorks.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                        0{index + 1}
                      </p>
                      <p className="mt-4 text-base leading-relaxed text-foreground">{step}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {offer.slug === "managed-hosting" ? (
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-8">
            <Link
              to="/european-first-infrastructure"
              className="group flex flex-col gap-3 border border-border p-6 transition-colors hover:bg-surface-alt md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div>
                <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                  Related
                </p>
                <p className="mt-2 text-lg font-medium text-foreground">
                  European-first infrastructure
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                Read more
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                  aria-hidden
                />
              </span>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <Reveal>
            <div className="flex flex-col gap-6 border border-border bg-foreground p-8 text-background md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="font-mono-label uppercase tracking-wider text-background/70">
                  Next step
                </p>
                <h2
                  className="font-display mt-4 text-background"
                  style={{
                    fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                    lineHeight: 0.95,
                    fontWeight: 500,
                  }}
                >
                  Start a project
                </h2>
              </div>
              <Link
                to="/contact"
                className="group inline-flex shrink-0 items-center gap-3 bg-background px-6 py-4 text-sm font-medium text-foreground"
              >
                Start a project
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.7}
                  aria-hidden
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
