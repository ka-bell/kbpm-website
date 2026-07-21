# Expertise & Capabilities — plan

## 1. Add to About mega-menu

In `src/components/site/nav-data.ts`, add a new entry to `aboutItems` (placed second, right after "About"):

```
Expertise & Capabilities   /expertise
Tag: What we do
Blurb: The full stack — strategy, design, engineering, ops.
Thumb: unsplash tech/workspace image
```

Order becomes: About → Expertise & Capabilities → Process & Pricing → Team.
No changes needed in `SiteNav.tsx` — it renders from data.

## 2. New route `/expertise`

Create `src/routes/expertise.tsx` with proper `head()` metadata:
- title: "Expertise & Capabilities — kbell + postman"
- description, og:title, og:description
- Route: `createFileRoute("/expertise")`

Update `routeTree.gen.ts` is auto-generated — no manual edit.

## 3. Page design (dark theme, KBPM voice)

Full page uses `bg-foreground text-background` (black bg, white text). Sections stack:

### a. Hero
- Eyebrow: `§ Expertise`
- Big display headline: "The full stack, in two heads."
- Sub: short KBPM-flavoured paragraph — small named studio in Amsterdam, technical depth from prototype to production, EU-first infrastructure, agencies' build partner.

### b. Capabilities grid (4 columns on desktop, stack on mobile)
Each column: category label + list of bullets, tailored to KBPM (not agency-style branding fluff).

**Product & Strategy**
- Product discovery & scoping
- Technical due diligence
- Prototype-to-production roadmaps
- Architecture decisions
- Fixed-scope sprint planning
- Founder-facing workshops

**Design**
- Product & UX design
- Design systems
- Rapid prototyping (Figma → code)
- Interaction & motion
- Landing pages & marketing sites
- Accessibility (WCAG 2.1 AA)

**Engineering**
- Full-stack TypeScript (React, Next, TanStack)
- Node / edge runtimes (Cloudflare Workers, Vercel)
- Supabase / Postgres / RLS
- AI features (LLM integration, RAG, agents)
- Payments (Stripe, Paddle)
- Mobile (React Native / Expo)
- Vibe-coded app hardening (make Lovable/v0 output production-ready)

**Infrastructure & Ops**
- EU-first / sovereign cloud (Hetzner, Scaleway, OVH)
- CI/CD, observability, on-call
- GDPR & data residency
- Auth (SSO, OAuth, magic link)
- Migrations from US-hosted stacks
- Long-term maintenance retainers

### c. Featured / awards strip (optional, lightweight)
Small horizontal list of markers — e.g. "Awwwards honourable mention", press features. Keep to 3–4 entries max, or omit if fabricating feels wrong. **Recommendation: omit for now** — KBPM is a real business, not fair to invent awards. Replace with a "Tools we reach for" strip (React, TanStack, Supabase, Cloudflare, Stripe, Postgres, Figma).

### d. Testimonial quote (single, large)
Pull one existing quote from home/case studies rather than inventing. If none exists, skip and leave the CTA to carry it.

### e. CTA
Reuse the existing `CtaBlock` component — but since the page background is dark and `CtaBlock` is already dark, we'll drop it in as-is at the bottom, or wrap the preceding sections in a dark container and let `CtaBlock` follow on light. Cleanest: keep whole page dark, end with a smaller inline CTA ("Not sure which capability you need? — Start a project") linking to `/contact`, so `CtaBlock` isn't duplicated.

Include `SiteNav` + `SiteFooter` as with other routes.

## Technical notes
- Tailwind semantic tokens only — `bg-foreground`, `text-background`, `text-background/70`, `border-background/10`. No hardcoded black/white.
- Reuse `Reveal` for scroll-in animation, matching other pages.
- Font sizing follows existing pattern: `font-display` with `clamp()` inline styles, `font-mono-label` for eyebrows.
- No new dependencies.

## Files
- edit `src/components/site/nav-data.ts` (add menu item)
- create `src/routes/expertise.tsx` (page + head metadata + all sections inline, or split into `src/components/site/ExpertiseGrid.tsx` if it gets long)

Open question before building: **Do you want the awards/press strip included (invented placeholders you'd fill in later), or replaced with a "tools we use" strip? I'd default to the tools strip unless you tell me otherwise.**
