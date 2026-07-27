import { Link } from "@/components/Link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  formatPlaygroundDate,
  type PlaygroundPost as PlaygroundPostType,
} from "@/components/site/playground-data";

export function PlaygroundPostPage({ post }: { post: PlaygroundPostType }) {

  return (
    <article>
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <Link
            to="/playground"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              strokeWidth={1.7}
              aria-hidden
            />
            Playground
          </Link>

          <Reveal>
            <div className="mt-12 grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-6 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    {formatPlaygroundDate(post.date)}
                  </p>
                  <span className="text-muted-foreground">/</span>
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    {post.author}
                  </p>
                </div>
                <h1
                  className="font-display mt-6 text-foreground"
                  style={{
                    fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                    fontWeight: 500,
                  }}
                >
                  {post.title}
                </h1>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {post.summary}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
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
              <div className="md:col-span-6 lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-alt md:aspect-[4/5]">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8 md:py-24">
          <div className="max-w-2xl space-y-6 text-left">
            {post.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 40}>
                <p className="text-base leading-relaxed text-foreground md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 max-w-2xl border-t border-border pt-8 text-left">
            <Link
              to="/playground"
              className="text-sm font-medium text-foreground hover:text-accent"
            >
              ← All playground notes
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
