# Reviewing a codebase

Step 3c of `designer-project-onboarding`, for a project that has a codebase. The
review reads the code to learn how the product looks and is structured. It
never changes the code, installs anything or runs it.

This review is for designers building prototypes. It doesn't record coding
style or how to build in the repo.

## Start from the survey

Step 3a ran `scripts/survey-repo.mjs` once. Its output already has the
commit to record as `source-version`, the interface libraries and their
versions, the theme and style files, the colours, fonts, corners and screen
sizes with how often each is used, the modes, the routes, the shell files
and the components used most. Don't search for any of these again.

A colour or font near the top of its count is the project's. One used once
isn't.

## Then read only what the first build needs

- the **theme files** the survey names, for which colour plays which role
  (primary actions, surfaces, text, status) and what each mode changes;
- the **shell files** the survey names, for the header, the navigation and
  its destinations;
- each **screen being built**. Run the survey on it for what it is made of:

  ```bash
  node "<this skill's folder>/scripts/survey-repo.mjs" "<the app's folder>" --screen=<the screen's file>
  ```

  Then read that file and the parts it lists.

List every other route by name as **Not reviewed yet**. Don't open it. It is
reviewed the same way when a prototype first builds it.

## What to work out

| For | Read | Record in |
|---|---|---|
| **Brand colour** | the colour primary actions and selection resolve to | `THEME.md` |
| **Neutrals, status, font** | what surfaces, messages and text resolve to | `THEME.md` |
| **Modes** | the modes the theme defines and the ones screens support | `PROJECT.md` |
| **Shape, density** | corner and control-height values in use | `PROJECT.md` |
| **Surfaces** | the breakpoints, and any device-specific layouts | `PROJECT.md` |
| **Special treatments** | anything marked out, such as AI content | `PROJECT.md` |
| **Shell and destinations** | the layout components and the route tree | `ARCHITECTURE.md` |
| **Screen types and flows** | what each route is for, and how they connect | `ARCHITECTURE.md` |
| **Departures** | where a screen does something the patterns say otherwise | `PATTERNS.md` |
| **Terms** | the names of objects and actions in the interface copy | `PATTERNS.md` |
| **Components** | the components screens use, and the library each comes from | `COMPONENTS.md` |

A row is filled only for what was reviewed. With `look: match`, leave
Departures and Components to the build (`SOURCE-PARITY.md`).

## Compare colours by calculation

Never judge a colour difference by eye. For each colour the project uses
for a role, run `npx zebra-theme --ramp=<hex>`. It prints the nearest
Design System step and how far off the colour is.

| The command says | Recommend |
|---|---|
| the same colour, or the same at another tone | keep Zebra's, and record the value |
| a different colour, in the same family | keep Zebra's unless the designer names it as the brand |
| a different brand colour | the project's own theme |

Neutrals get a project theme only when surfaces and text are visibly tinted
throughout. Status colours are never themed (`patterns 8.13`). Keep Zebra's
font when the project uses a neutral sans. Spacing is never themed.

With `look: match`, skip the recommendation: the project's values are kept
as they are.

## Departures and the review table

Only with `look: design-system`. For each thing a reviewed screen does
differently from the patterns: a rule that starts "By default" is recorded
as a departure, anything else as a finding. Then put the review in your
reply as a short table: what was read, the project's value, Zebra's value
and what you recommend. It is a report, not a question.

## Components in a repo

Map each component the screens use to the Zebra component with the same
anatomy. The project's existing components are what ships today, so:

- a prototype at the **Zebra** or **themed** level matches the project's
  component first, with the Zebra component as it is, adjusted or custom, as
  `SOURCE-PARITY.md` says, and `COMPONENTS.md` records which;
- a prototype at the **off-system** level reproduces the project's component
  as it is;
- either way, where a Zebra spec would improve the project's component,
  record that as a note. Never blend the two in one component.
