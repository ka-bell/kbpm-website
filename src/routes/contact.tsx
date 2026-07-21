import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

const projectTypes = [
  "Validate — clarity before we build",
  "Build — design and develop the product",
  "Evolve — improve a live product",
  "Support — keep everything running",
  "Not sure yet",
];

const contextOptions = [
  "We are an agency looking for a build partner",
  "We are a founder or product owner",
  "We are an internal team with a product backlog",
  "We already have a Lovable, Cursor, or AI-built prototype",
];

const nextSteps = [
  {
    label: "01 / Read",
    text: "We read the context and look for the fastest useful next step.",
  },
  {
    label: "02 / Reply",
    text: "You get a direct reply from the people who would shape and ship the work.",
  },
  {
    label: "03 / Map",
    text: "If there is a fit, we map scope, timeline, budget, and the first decision to make.",
  },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - kbell + postman" },
      {
        name: "description",
        content:
          "Tell KBPM what you are building. Start a product sprint, productionize a prototype, or talk through product development support.",
      },
      { property: "og:title", content: "Contact - kbell + postman" },
      {
        property: "og:description",
        content: "Tell us what you are building and where the product is stuck.",
      },
    ],
  }),
  component: ContactPage,
});

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="font-mono-label uppercase tracking-wider text-muted-foreground">
      {children}
    </label>
  );
}

const fieldClass =
  "mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground";

function ContactPage() {
  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-7">
            <p className="eyebrow">Contact / Start a project</p>
            <h1
              className="font-display mt-5 max-w-5xl text-foreground"
              style={{
                fontSize: "clamp(3.25rem, 7vw, 7rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.05em",
                fontWeight: 500,
              }}
            >
              Tell us what you are building.
            </h1>
          </div>
          <div className="flex flex-col justify-end md:col-span-5">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Whether you need to validate an idea, ship a working product, repair a prototype, or
              extend an existing platform, give us enough context to understand the shape of the
              work.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="border border-border p-4">
                <p className="eyebrow">Direct</p>
                <a href="mailto:hello@kbpm.nl" className="mt-2 block text-sm text-foreground">
                  hello@kbpm.nl
                </a>
              </div>
              <div className="border border-border p-4">
                <p className="eyebrow">Studio</p>
                <p className="mt-2 text-sm text-foreground">Amsterdam - CET</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-6 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <aside className="md:col-span-4">
          <div className="sticky top-28 space-y-8">
            <div>
              <p className="eyebrow">Good fit</p>
              <h2
                className="font-display mt-4 max-w-md text-foreground"
                style={{
                  fontSize: "clamp(2rem, 3vw, 3.25rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.035em",
                  fontWeight: 500,
                }}
              >
                Useful details beat perfect briefs.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                It is completely fine if the idea is still messy. The form is here to help us
                understand what decision, prototype, or product constraint needs attention first.
              </p>
            </div>

            <div className="border border-border">
              {nextSteps.map((step, index) => (
                <div
                  key={step.label}
                  className={`p-5 ${index < nextSteps.length - 1 ? "border-b border-border" : ""}`}
                >
                  <p className="font-mono-label uppercase tracking-wider text-muted-foreground">
                    {step.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="md:col-span-8">
          <form
            action="mailto:hello@kbpm.nl"
            method="post"
            encType="text/plain"
            className="border border-border bg-background"
          >
            <div className="border-b border-border p-5 md:p-8">
              <p className="eyebrow">Project intake</p>
              <h2 className="mt-3 text-2xl font-medium text-foreground">Start with the basics.</h2>
            </div>

            <div className="grid grid-cols-1 border-b border-border md:grid-cols-2">
              <div className="border-b border-border p-5 md:border-b-0 md:border-r md:p-8">
                <FieldLabel htmlFor="name">Your name</FieldLabel>
                <input id="name" name="name" type="text" placeholder="Name" className={fieldClass} />
              </div>
              <div className="p-5 md:p-8">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input id="email" name="email" type="email" placeholder="you@company.com" className={fieldClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 border-b border-border md:grid-cols-2">
              <div className="border-b border-border p-5 md:border-b-0 md:border-r md:p-8">
                <FieldLabel htmlFor="company">Company or studio</FieldLabel>
                <input id="company" name="company" type="text" placeholder="Company name" className={fieldClass} />
              </div>
              <div className="p-5 md:p-8">
                <FieldLabel htmlFor="website">Website or prototype link</FieldLabel>
                <input id="website" name="website" type="url" placeholder="https://" className={fieldClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 border-b border-border md:grid-cols-2">
              <div className="border-b border-border p-5 md:border-b-0 md:border-r md:p-8">
                <FieldLabel htmlFor="projectType">What do you need?</FieldLabel>
                <select id="projectType" name="project_type" className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    Choose a path
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-5 md:p-8">
                <FieldLabel htmlFor="context">Which sounds closest?</FieldLabel>
                <select id="context" name="context" className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    Choose context
                  </option>
                  {contextOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 border-b border-border md:grid-cols-3">
              <div className="border-b border-border p-5 md:border-b-0 md:border-r md:p-8">
                <FieldLabel htmlFor="timeline">Timeline</FieldLabel>
                <select id="timeline" name="timeline" className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>ASAP</option>
                  <option>Next 2-4 weeks</option>
                  <option>Next quarter</option>
                  <option>Still exploring</option>
                </select>
              </div>
              <div className="border-b border-border p-5 md:border-b-0 md:border-r md:p-8">
                <FieldLabel htmlFor="budget">Budget range</FieldLabel>
                <select id="budget" name="budget" className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>Under EUR 5k</option>
                  <option>EUR 5k-15k</option>
                  <option>EUR 15k-50k</option>
                  <option>EUR 50k+</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div className="p-5 md:p-8">
                <FieldLabel htmlFor="team">Team size</FieldLabel>
                <select id="team" name="team_size" className={fieldClass} defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option>Solo founder</option>
                  <option>2-10 people</option>
                  <option>11-50 people</option>
                  <option>50+ people</option>
                  <option>Agency team</option>
                </select>
              </div>
            </div>

            <div className="border-b border-border p-5 md:p-8">
              <FieldLabel htmlFor="message">What should we know?</FieldLabel>
              <textarea
                id="message"
                name="message"
                rows={7}
                placeholder="What are you trying to build, what is already decided, and where are you stuck?"
                className={fieldClass}
              />
            </div>

            <fieldset className="border-b border-border p-5 md:p-8">
              <legend className="font-mono-label uppercase tracking-wider text-muted-foreground">
                Helpful signals
              </legend>
              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                {[
                  "We have a prototype",
                  "We need production support",
                  "EU hosting or data rules matter",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-3 border border-border p-4 text-sm text-foreground">
                    <input type="checkbox" name="signals" value={item} className="h-4 w-4 accent-foreground" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Prefer a lighter first touch? Send the same context to hello@kbpm.nl.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-6 py-4 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                Send project context
                <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
