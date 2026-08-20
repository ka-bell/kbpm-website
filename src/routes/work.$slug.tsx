import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCase } from "@/components/site/cases-data";
import { WorkCasePage } from "@/views/WorkCasePage";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const c = getCase(params.slug);
    if (!c) throw notFound();
    return { c };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.c;
    const title = c ? `${c.client} — kbell + postman` : "Case — kbell + postman";
    const desc = c?.outcome ?? "Selected case study from kbell + postman.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: NotFoundCase,
  component: CaseDetail,
});

function NotFoundCase() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-32 md:px-8 md:py-40">
      <p className="eyebrow">§ 404 / Case not found</p>
      <h1
        className="font-display mt-6 text-foreground"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          fontWeight: 500,
        }}
      >
        That case has moved.
      </h1>
      <Link
        to="/work"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm text-foreground hover:border-foreground"
      >
        ← Back to all work
      </Link>
    </section>
  );
}

function CaseDetail() {
  const { c } = Route.useLoaderData();
  return <WorkCasePage c={c} />;
}
