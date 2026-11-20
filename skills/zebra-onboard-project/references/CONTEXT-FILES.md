# The context files

The layout of each file in `zebra-context/`. Keep the headings as they are, so
every project's context reads the same way. Write short, plain sentences. A
section with nothing in it yet says **Not established**.

Mark what you write: **observed** (read from the source), **assumed** (your
reading, not confirmed) or **decided** (the designer chose it, with the date).

## PROJECT.md

```markdown
---
project: route-planner
source: figma                  # new | figma | repo | figma+repo
reference: <Figma link, or owner/repo @ branch>
reviewed: 2026-11-20
source-version: <Figma file version, or the repo commit reviewed>
zebra-packages:                # the versions installed when this was written
  tokens: 0.3.0
  web-components: 0.5.0
  patterns: 0.1.0
level: themed                  # zebra | themed | off-system
extension: none                # a shipped extension the project starts from, or none
theme: route-planner           # themed only: the class is .ext-route-planner
modes: [light, dark]
default-mode: light
shape: rounded                 # rounded | sharp
shape-full:                    # the cases that are fully round, if any
  - "The floating action button"
density: comfortable           # comfortable | compact
surfaces: [handheld, desktop]  # form factors, from the patterns' devices.md
special-treatments: [ai-interactions]
adjusted-components: keep      # with a source, the answer after the first build: keep | switch | not asked yet
library: none                  # off-system only: name, exact version, the URL it loads from
handoff:                       # added by zebra-handoff at the project's first handoff
  library: react-baseui        # what the app is built with: react-baseui | web-components | zeta-web | none
  app: .                       # the app's codebase: . for this folder, a path, or owner/repo
---

# Route Planner

## What it is
<two or three sentences: what the product does and who uses it>

## Surfaces
<each form factor: the device families, the size mode it is built in, the inputs, anything locked such as orientation>

## Decisions
<one line each: what was chosen, what the alternative was, who chose it, when>

## Requests
<token requests, component gaps and treatments the system doesn't have>

## Review
<what was read and when: the frames or files, and the review table>
```

## ARCHITECTURE.md

```markdown
# Architecture

## Shell
<what stays on every screen: the header, the global navigation and its form at each width, any device or session context>

## Destinations
<the top-level areas, in order, and what each holds>

## Screen types
<the kinds of screen the product has, each with its job and the recipe it follows in the patterns' compositions folder: find-one, act-on-one, work-through-many, monitor, create-in-steps, converse, capture. A screen with no recipe says what it is composed from>

## Key flows
<the main tasks, each as a short list of steps>

## Open questions
```

Describe the product in the patterns' words (shell, pane, side panel, system
banner), not in component names.

## PATTERNS.md

```markdown
# Patterns

How this product departs from or adds to the Zebra UX patterns.

## Departures
| Rule | The pattern says | This product does | Why | Kind |
|---|---|---|---|---|
| patterns 1.46 | Up to five destinations in the bottom bar | Shows four, with Scan as a centre action | Scanning is the main job | default overridden |

## Additions
<ways of doing things the patterns don't cover, that every screen of this product follows>

## Findings
<where the source breaks an accessibility minimum or a rule that isn't a default. Each one: the rule, what was seen, and what the prototypes do instead>

## Terms
| Term | Means | Not |
|---|---|---|
| Route | An ordered set of stops for one driver and one shift | Trip, run |
```

**Kind** is one of: default overridden, addition, finding. Cite rules as
`patterns 4.21`. Cite only rule numbers that exist.

## THEME.md

```markdown
# Theme

## Mapping
| The project's value | Where it is used | Token | Zebra's value | Difference | Kept or changed |
|---|---|---|---|---|---|
| #7a1fa2 | Primary buttons, links, selection | the color/brand/main ramp | #1f69ff | 50° of hue | changed: new ramp |
| #f7f7f8 | Page background | surface/page | #f5f6f7 | 0.6 | kept |

## Ramps
<for each ramp the theme replaces: the colour it was made from, and which step carries the exact colour>

## Contrast
<what zebra-theme reported. Every pair it listed as lost, and what was changed to fix it>

## Not themed
<values the project has that the theme leaves alone, and why: status colours, spacing, anything with no role>
```

On a project at the Zebra level, the mapping still lists what was compared,
all marked kept.

## COMPONENTS.md

```markdown
# Components

| The project's component | Seen in | Zebra component | Match | Notes |
|---|---|---|---|---|
| Primary button | every screen | Button, primary flavour | same anatomy | |
| Stop card | route list | Card with a status label | composed | three slots: type, name, status |
| Date range picker | filters | none | gap | requested |
```

**Match** is one of: same anatomy, composed (built from Zebra components),
adjusted (the Zebra component with a style change kept in the project, to
match the source; Notes says what changed), custom (built in the project to
match the source; counted against the 20% limit in `SOURCE-PARITY.md`), gap
(nothing fits; recorded under Requests in `PROJECT.md`), or hand-built
(off-system only, with what was guessed).
