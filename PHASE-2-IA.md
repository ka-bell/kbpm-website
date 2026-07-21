# KB+PM Website – Phase 2: Information Architecture

**Status:** Approved — implementing in wireframes.  
**Depends on:** Phase 1 Service Architecture (approved)  
**Out of scope:** Marketing copy, visual design, UI component redesign

---

## Objective

Translate the approved lifecycle — **Validate → Build → Evolve → Support** — into a clear website structure.

Navigation, homepage and service pages must follow the same underlying logic.

These are **not** service packages. They are moments in a product lifecycle where clients engage KB+PM.

---

## Guiding principle

Evolve the existing wireframes. Do not replace them.

Preserve strong components. Restructure, move, merge or remove only where the current package model no longer fits.

---

# 1. Evaluation of the current homepage

Current order:

1. Hero  
2. ProofStrip  
3. FeaturedCase  
4. ServicePaths  
5. HowItWorks  
6. MoreWork  
7. WhoYouWorkWith  
8. TrustedBy  
9. CtaBlock  

*(WhyKbpm exists as a component but is not currently on the homepage.)*

---

### Hero

| | |
|---|---|
| **Purpose** | Answer “what does KB+PM do?” in the first seconds |
| **Supports positioning?** | Yes — product studio for complex digital work; agency-friendly framing already present |
| **Fits lifecycle?** | Entry point — not a lifecycle stage itself |
| **Decision** | **Stay** |
| **Role change?** | Keep as positioning entry. No package language. Point forward into the lifecycle, not into named sprints |

---

### ProofStrip

| | |
|---|---|
| **Purpose** | Immediate proof through outcomes / product types |
| **Supports positioning?** | Yes — shows concrete product work, not agency claims |
| **Fits lifecycle?** | Evidence layer; examples can map across Build / Evolve |
| **Decision** | **Stay** |
| **Role change?** | Prefer product-type / outcome signals over vanity metrics. No timelines or prices |

---

### FeaturedCase

| | |
|---|---|
| **Purpose** | Deep proof — one project that shows the kind of work |
| **Supports positioning?** | Yes |
| **Fits lifecycle?** | Demonstrates Build (and often Evolve) in practice |
| **Decision** | **Stay** |
| **Role change?** | Explicitly tag which lifecycle moment(s) the case represents |

---

### ServicePaths

| | |
|---|---|
| **Purpose** | Present ways to engage |
| **Supports positioning?** | Partially — currently sells packages (Proof Sprint, Prototype Sprint, etc.) |
| **Fits lifecycle?** | Wrong model. Needs replacement of *content model*, not necessarily the section slot |
| **Decision** | **Restructure in place** |
| **Role change?** | Becomes the homepage expression of Validate → Build → Evolve → Support. No pricing, no timelines, no secondary “product” paths as packages |

---

### HowItWorks (Discover / Design / Deliver / Deploy)

| | |
|---|---|
| **Purpose** | Explain operating method inside a project |
| **Supports positioning?** | Weakly — another process model competes with the lifecycle |
| **Fits lifecycle?** | Conflicts. Two process systems (lifecycle + DDDD) confuse the architecture |
| **Decision** | **Remove from homepage** (or merge later into Build-page detail if still useful) |
| **Role change?** | Lifecycle owns “when you engage us.” Internal delivery method is secondary and should not sit as a peer homepage section |

---

### MoreWork

| | |
|---|---|
| **Purpose** | Breadth of expertise through examples |
| **Supports positioning?** | Yes |
| **Fits lifecycle?** | Supports all stages via project types |
| **Decision** | **Stay** |
| **Role change?** | Optionally filter / label by lifecycle stage. Keep as concrete examples, not abstracts |

---

### WhoYouWorkWith

| | |
|---|---|
| **Purpose** | Answer “why different?” — senior team, no account layer |
| **Supports positioning?** | Yes |
| **Fits lifecycle?** | Differentiator, not a stage |
| **Decision** | **Stay** |
| **Role change?** | Keep as trust / difference section. No change to structural role |

---

### TrustedBy

| | |
|---|---|
| **Purpose** | Social proof / client context |
| **Supports positioning?** | Yes — especially for agencies and direct clients |
| **Fits lifecycle?** | Proof layer |
| **Decision** | **Stay** (consider earlier placement — see hierarchy below) |
| **Role change?** | Can sit closer to “who we work with” / audience signals |

---

### CtaBlock

| | |
|---|---|
| **Purpose** | Conversion / next step |
| **Supports positioning?** | Yes |
| **Fits lifecycle?** | Exit for any entry stage |
| **Decision** | **Stay** |
| **Role change?** | CTA should not push a named package. Invite contact from whatever stage the visitor is in |

---

### WhyKbpm (component exists, not on homepage)

| | |
|---|---|
| **Purpose** | Explicit “why us” for agencies |
| **Supports positioning?** | Yes |
| **Fits lifecycle?** | Differentiator |
| **Decision** | **Add / restore** on homepage (or merge with WhoYouWorkWith if redundancy is high) |
| **Role change?** | Place after lifecycle + work proof, before or with team |

---

### Legacy package items (Go-to-Market, EU-First Infrastructure)

Not phases in Phase 1. Do **not** remain as peer “services.”

| Item | IA placement |
|---|---|
| Go-to-Market hardening | Capability / example under **Build** (production readiness) |
| EU-First Infrastructure | Capability under **Build** (Infrastructure) and/or operational concern under **Support** (Hosting / Security) — resolve uniqueness when capabilities are locked; structurally: not a top-level nav item |

---

### About-menu pages that need IA decisions

| Page | Decision |
|---|---|
| About | **Stay** — studio context |
| Team | **Stay** — can remain page + homepage section |
| Expertise & Capabilities | **Merge into lifecycle** — capabilities live under Validate / Build / Evolve / Support, not a separate parallel taxonomy |
| Process & Pricing | **Remove or replace** — pricing out of scope; process must not compete with lifecycle. If kept, rename and demote to supporting content under About, not primary nav |

---

# 2. Homepage hierarchy

Recommended order (structure only):

| # | Section | Why it exists | Question it answers | Journey role |
|---|---|---|---|---|
| 1 | **Hero** | Immediate positioning | What does KB+PM do? | Entry |
| 2 | **Who we work with** *(audience signal — agencies / companies / startups; can reuse TrustedBy logos + short audience framing)* | Clarify fit | Is this for me? | Qualification |
| 3 | **Lifecycle** *(restructured ServicePaths)* | Core architecture on the homepage | When should I engage you? | Orientation |
| 4 | **Featured work** | Proof of complex product work | What does this look like? | Evidence |
| 5 | **More work** | Breadth of expertise | Do you do work like mine? | Evidence |
| 6 | **Why KB+PM** | Differentiation | Why you vs a capacity shop? | Trust |
| 7 | **Team** *(WhoYouWorkWith)* | Human proof of “senior / direct” | Who do I actually work with? | Trust |
| 8 | **Contact / CTA** | Next step from any entry stage | How do we start? | Conversion |

### Optional / conditional

| Section | Note |
|---|---|
| ProofStrip | Keep if it adds product-outcome proof without duplicating Featured/More work; place after Hero or after Lifecycle |
| HowItWorks | Not on homepage |

### Explicit removals from homepage IA

* Package cards (Proof Sprint, Prototype Sprint, Product Development as products)
* Secondary package paths (Go-to-Market, EU-First as peer services)
* Dual process model (Discover / Design / Deliver / Deploy as homepage peer)
* Pricing / timeline fields anywhere in these sections

---

# 3. Navigation hierarchy

## Primary navigation

| Item | Type | Role |
|---|---|---|
| **Services** | Mega menu | Lifecycle entry — Validate / Build / Evolve / Support |
| **Work** | Link | Proof / examples |
| **About** | Mega menu or simple menu | Studio, team, differentiation |
| **Contact** | Link | Conversion |

Persistent CTA (existing pattern): **Start a project** → Contact

## Secondary (under About)

| Item | Role |
|---|---|
| About | Studio story / positioning |
| Team | People |
| *(Optional)* Approach | Only if needed later — must not introduce a second lifecycle |

## Removed from primary/secondary as currently framed

| Item | Reason |
|---|---|
| Expertise & Capabilities as separate top item | Capabilities belong inside lifecycle phases |
| Process & Pricing | Pricing removed; process must not compete with lifecycle |
| Individual package URLs as primary service model | Replaced by phase pages |

## Why this supports both audiences

| Audience | How the nav helps |
|---|---|
| **Creative agencies** | Services = moments they need a partner (often Build / Evolve); Work = proof for pitches; About/Team = trust that they’re not buying an account-managed capacity shop |
| **Direct clients** | Same lifecycle — they self-identify by situation (idea / build / live product / support), not by agency jargon; Work shows product types they recognise |

Naming note for later (Phase 3): “Services” may stay as nav label for familiarity, but the *content model* behind it is lifecycle moments — not packages. Do not rename in Phase 2 unless necessary for clarity.

---

# 4. Mega menu hierarchy

**Services** menu = approved lifecycle. Information hierarchy only.

```
Services
├── Validate
│   ├── [capabilities from Phase 1]
│   └── → /services/validate
├── Build
│   ├── [capabilities from Phase 1]
│   └── → /services/build
├── Evolve
│   ├── [capabilities from Phase 1]
│   └── → /services/evolve
└── Support
    ├── [capabilities from Phase 1]
    └── → /services/support
```

### Menu behaviour (IA, not UI)

* Four phase groups as primary structure
* Capabilities listed under the correct phase only (one place each)
* Selecting a phase goes to that phase page
* Selecting a capability can deep-link to that capability on the phase page (anchor / panel) — same template, not new page types
* Feature / preview panel (existing mega menu pattern): show related example work for the hovered phase or capability — reuse existing component pattern

### Do not put in the mega menu

* Timelines
* Prices
* Package names
* Go-to-Market / EU-First as peer rows

---

# 5. Service page template

One reusable structure for every lifecycle page (`/services/validate`, `/services/build`, `/services/evolve`, `/services/support`).

| Block | Answers |
|---|---|
| **Phase identity** | What is this phase? |
| **When clients come** | Trigger / situation |
| **Goal** | Goal of this phase (from Phase 1) |
| **Capabilities** | Which capabilities belong here (unique list) |
| **Examples of work** | Concrete product types (not case study essays) |
| **Related projects** | Proof from Work |
| **Next phase** | Where this sits in the continuous lifecycle |
| **Contact / CTA** | How to engage from this moment |

### Capability interaction (structure only)

On the phase page (and optionally mirrored in mega menu):

* Capability list is the index
* Selecting a capability reveals: short explanation + supporting visual + related project
* Feels like exploring expertise, not browsing products

### Index page `/services`

Optional hub:

* Lifecycle overview (four phases as connected journey)
* Entry points by situation
* Links into each phase page

Not a fifth package grid.

---

# 6. Internal linking strategy

The site should feel like **one continuous product lifecycle**. Clients may enter at any stage.

### Phase → next phase

| From | To | Purpose |
|---|---|---|
| Validate | Build | Natural progression after direction is clear |
| Build | Evolve | After launch / first version |
| Evolve | Support | Stability alongside continuous improvement |
| Support | Evolve | Support is not a dead end — improvement loops back |

Also allow **any → Contact** and **any → Work**.

### Cross-links (not only linear)

| Pattern | Purpose |
|---|---|
| Phase → related Work items | Proof |
| Work item → relevant phase(s) | Reverse: “this project involved Build + Evolve” |
| Homepage Lifecycle → phase pages | Drill-down |
| Mega menu capability → phase page capability | Deep link |
| Phase CTA → Contact | Conversion without forcing linear path |

### Entry flexibility

Visitors should never be forced to start at Validate. Architecture communicates connection, not a mandatory funnel.

---

# 7. URL / sitemap (structure)

```
/
/services
/services/validate
/services/build
/services/evolve
/services/support
/work
/work/:slug
/about
/team
/contact
```

### Deprecated / redirect later (not Phase 3 copy — IA mapping)

| Old | Maps to |
|---|---|
| `/services/proof-sprint` | `/services/validate` |
| `/services/prototype-sprint` | `/services/build` |
| `/services/product-development` | Split conceptually: ongoing build/improve → **Evolve**; ops → **Support** (redirect decision at implementation) |
| `/services/go-to-market` | `/services/build` (capability) |
| `/services/eu-first-infrastructure` | `/services/build` and/or `/services/support` |
| `/expertise` | Absorbed into phase pages |
| `/process-pricing` | Remove or demote under About |

---

# 8. Component reuse map

| Existing component | Action | New structural role |
|---|---|---|
| Hero | Keep | Positioning entry |
| ProofStrip | Keep (optional position tweak) | Outcome / product-type proof |
| FeaturedCase | Keep | Flagship evidence |
| ServicePaths | Restructure content model | Lifecycle section |
| HowItWorks | Remove from homepage | Do not compete with lifecycle |
| MoreWork | Keep | Expertise breadth |
| WhoYouWorkWith | Keep | Team / direct access |
| TrustedBy | Keep | Audience / client proof — consider earlier |
| WhyKbpm | Restore on homepage | Differentiation |
| CtaBlock | Keep | Stage-agnostic CTA |
| SiteNav + mega menu | Restructure data model | Lifecycle hierarchy |
| PricingBlueprint / timeline fields | Remove from service IA | Out of scope for architecture |
| Stub / old service offering pages | Replace with phase template | One template × four phases |

---

# 9. Deliverable checklist

- [x] Homepage hierarchy  
- [x] Evaluation of existing homepage sections (stay / move / merge / remove)  
- [x] Navigation hierarchy  
- [x] Mega menu hierarchy  
- [x] Service page hierarchy (reusable template)  
- [x] Internal linking strategy  
- [x] Reuse / move / merge / remove recommendations  

---

## Success criteria for Phase 2

Someone can navigate the site and immediately understand:

* KB+PM works across a product lifecycle, not a menu of packages
* They can enter at Validate, Build, Evolve or Support
* Capabilities live in one place only
* Work and differentiation support the same story
* Nothing important from the current wireframes was discarded without a reason

---

## Next (only after Phase 2 approval)

**Phase 3** — headlines, copywriting, visual hierarchy, final content.

Still no unnecessary component redesign. Expression follows this IA.
