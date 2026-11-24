<!--
The handoff spec template. Fill every {{…}}. Delete these comments and any section with nothing in it (never leave n/a).
Put quotation marks only around real interface text: step 6 checks it against the page.
One section under "Changes" per change. Each section must stand alone: restate values inline, never "same as above".
Name components, props, icons and tokens the way the app's library names them (step 5).
-->

# {{FEATURE}}: build spec

{{PROJECT}} · {{PROTOTYPE NAME}} · changes since {{MARK LABEL}} ({{MARK DATE}}) · built with {{LIBRARY AND VERSION}} · Zebra packages {{VERSIONS FROM THE MARK}}

Covers: {{SURFACES AND WIDTHS}} · {{MODES}}

## How to use this

Give this file and the `assets/` folder to your AI assistant in the app's codebase, with this prompt:

> Implement the changes in this spec. This app uses the Zebra Design System: read `DESIGN.md` and `AGENTS.md` beside the installed library in `node_modules/@zebra-design-system/` first. This is a change to an app that already exists: find each anchor named in the spec, reuse every part tagged **Existing** as it is, change only what's listed for **Existing, changed**, use each **Zebra component** from the library with the props given, and build each **New** part exactly as specified from the semantic tokens given. Never use a raw value where the spec gives a token, and never hand-build a component the library has. Cover every state, behaviour, surface, width and mode listed. Deliver it as a change to the existing code, not a parallel copy.

The spec is complete: if something isn't in it, it didn't change.

## What's changing

{{ONE LINE PER CHANGE, e.g.}}
- **New:** Export button in the Orders top app bar
- **New:** export dialog, opened from the Export button
- **Existing, changed:** order rows gain a selection checkbox

## Components used

| Component | Tag | In your library | Doc |
|---|---|---|---|
| {{e.g. Button}} | {{Zebra component / Not in your library yet / draft}} | {{e.g. `import { Button } from '@zebra-design-system/react-baseui'`}} | {{its usage doc}} |

## Tokens used

Only the tokens the changes use outside components, with their value in each of the project's modes.

| Token | {{Light}} | {{Dark}} | Used for |
|---|---|---|---|
| `{{--space-md}}` | {{value}} | {{value}} | {{where}} |

Theme: {{the root classes the screens need: shape, mode, size mode, and .ext-<project> if the project has its own theme}}.

## Changes

### {{N. Change name}}: {{tag}}

**Where:** {{screen}}, {{exact anchor: inside which existing part, after which existing element}}.

**Structure** (top to bottom, render order):
1. {{Part}} ({{tag}}): {{what it is: heading level, button, list…}}. {{For a component: the component, then every prop with its value, written the library's way. For anything else: layout (direction, alignment, gap, padding), size (fixed, fills or hugs), text style, fill, border, radius and shadow, each as a token.}}
   1. {{Child part}}: {{same detail}}.

**States:**

| State | What changes | Trigger |
|---|---|---|
| Default | {{…}} | {{on load}} |
| {{Empty / Loading / Error / Selected …}} | {{…}} | {{…}} |
| {{Hover / Focus / Pressed, for New parts only}} | {{token values}} | {{…}} |

**Behaviour:** {{every rule as what happens, when, and what triggers it, e.g. Export is disabled until at least one row is selected; choosing it opens the dialog with the selected count in its title.}}

**Surfaces and widths:**
- {{e.g. Handheld}}: {{layout}}
- {{e.g. Desktop, below 840px}}: {{exactly what differs}}

**Accessibility:** {{roles, accessible names (and how they're built), pressed/selected/expanded states, focus order, keyboard keys, what's announced}}.

**Motion:** {{transitions with their tokens, and what reduced motion does; or "none"}}.

**Copy:** {{every string verbatim, in order, each in quotation marks}}.

**Data:** {{what each part shows or collects, its format, and where the value comes from on screen (e.g. the number of selected rows)}}.

## Removed

- {{Exactly what goes, from where, and what closes up behind it.}}

## Requests

Where the design goes beyond the system: gaps from the project's context that these changes use.

- {{e.g. Component gap: date range picker. Built from two Inputs and a Menu until the system has one.}}

## Assets

| File | Used in | Size shown | Fit |
|---|---|---|---|
| `assets/{{file}}` | {{change}} | {{w × h}} | {{stretched / contained / cropped}} |

## Done when

- [ ] Every change above is built on every surface and width, in every mode and state listed.
- [ ] Every component is the one named, with the props given.
- [ ] Every value is the token given. No raw values.
- [ ] Every string matches this spec word for word.
- [ ] Nothing outside this spec changed.
- [ ] {{One line per behaviour rule that can be tested, e.g. With no rows selected, Export is disabled.}}
