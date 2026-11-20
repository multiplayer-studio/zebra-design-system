# Reviewing a codebase

Step 3 of `zebra-onboard-project`, for a project that has a codebase. The
review reads the code to learn how the product looks and is structured. It
never changes the code, installs anything or runs it.

This review is for designers building prototypes. It doesn't record coding
style or how to build in the repo.

## Read what is used, not only what is declared

- the **theme**: its tokens, variables or style constants, and the modes it defines;
- **global styles** and **fonts**;
- the **interface libraries** and their versions, from the lockfile;
- the **routes** and **layouts**, for the shell and the destinations;
- a few **representative screens**: a form, a list or table, a dialog;
- the **breakpoints** the layouts use;
- the **commit** reviewed, to record as `source-version`.

Count what screens actually use. A colour defined once and never used isn't
the project's.

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

Compare colours by calculation, read departures against the patterns, and
show the review, exactly as `REVIEW-FIGMA.md` describes under the same
headings. Read those three sections there.

## Components in a repo

Map each component the screens use to the Zebra component with the same
anatomy. The project's existing components are what ships today, so:

- a prototype at the **Zebra** or **themed** level uses the Zebra component,
  and `COMPONENTS.md` records what it replaces;
- a prototype at the **off-system** level reproduces the project's component
  as it is;
- either way, where a Zebra spec would improve the project's component,
  record that as a note. Never blend the two in one component.
