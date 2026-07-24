import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  formatPlaygroundDate,
  getPlaygroundPosts,
} from "@/components/site/playground-data";

export const Route = createFileRoute("/playground/")({
  head: () => ({
    meta: [
      { title: "Playground — kbell + postman" },
      {
        name: "description",
        content:
          "Thoughts that keep us up at night — architecture, infrastructure, AI, and the odd rabbit hole.",
      },
      { property: "og:title", content: "Playground — kbell + postman" },
      {
        property: "og:description",
        content: "Thoughts that keep us up at night.",
      },
    ],
    links: [{ rel: "canonical", href: "/playground" }],
  }),
  component: PlaygroundIndex,
});

function PlaygroundIndex() {
  const posts = getPlaygroundPosts();

  return (
    <>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end md:gap-8">
            <Reveal className="md:col-span-8">
              <p className="eyebrow">§ Playground</p>
              <h1
                className="font-display mt-5 max-w-4xl text-foreground"
                style={{
                  fontSize: "clamp(3rem, 7vw, 7rem)",
                  lineHeight: 0.9,
                  fontWeight: 500,
                }}
              >
                Playground.
              </h1>
            </Reveal>
            <Reveal delay={80} className="md:col-span-4">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Thoughts that keep us up at night.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <ul className="divide-y divide-border border border-border">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <Reveal delay={index * 40}>
                  <Link
                    to="/playground/$slug"
                    params={{ slug: post.slug }}
                    className="group flex flex-col gap-5 px-5 py-6 transition-colors hover:bg-surface-alt md:flex-row md:items-center md:gap-8 md:px-6 md:py-8"
                  >
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface-alt md:aspect-[4/3] md:w-44 lg:w-52">
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                          {formatPlaygroundDate(post.date)}
                        </p>
                        <span className="text-muted-foreground">/</span>
                        <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                          {post.author}
                        </p>
                      </div>
                      <h2 className="mt-3 text-xl font-medium text-foreground md:text-2xl">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        {post.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono-label rounded-full border border-border px-3 py-1 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border transition-colors group-hover:bg-background self-start md:self-center">
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.7}
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
