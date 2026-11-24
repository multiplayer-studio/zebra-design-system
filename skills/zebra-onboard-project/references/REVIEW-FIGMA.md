# Reviewing a Figma design

Step 3c of `zebra-onboard-project`, for a project that has a Figma design.
The review is quick. It covers the theme, the shell and the frames being
built. Every other frame is listed by name as **Not reviewed yet** and read
when a prototype first builds it. With `look: match`, leave Departures and
Components to the build (`SOURCE-PARITY.md`).

## Read data, not the picture

With the Figma tools, read:

- the file's **variables and their modes**, and its **text styles**;
- the **libraries** it uses, by name;
- the **navigation**, and the **frames being built**, at each device size
  the file draws them;
- the file's **version**, to record as `source-version`.

If Figma isn't connected, say so and ask the designer to connect it. Don't
review from a screenshot when the file is available.

## What to work out

| For | Read | Record in |
|---|---|---|
| **Brand colour** | the colour of primary actions and selection, and a secondary if there is one | `THEME.md` |
| **Neutrals** | page, card and raised surfaces, borders, text greys | `THEME.md` |
| **Status** | success, error, warning and information colours | `THEME.md` |
| **Font** | the family and weights of interface text | `THEME.md` |
| **Modes** | the modes the variables define, and the ones frames are drawn in | `PROJECT.md` |
| **Shape** | the corners of buttons, fields, chips and cards | `PROJECT.md` |
| **Density** | the control height most used | `PROJECT.md` |
| **Surfaces** | the frame sizes, and the device each is for | `PROJECT.md` |
| **Special treatments** | anything marked out, such as AI content and any gradient that marks it | `PROJECT.md` |
| **Shell and destinations** | the header, the navigation and its entries, at each frame size | `ARCHITECTURE.md` |
| **Screen types and flows** | what each frame is for, and how frames connect | `ARCHITECTURE.md` |
| **Departures** | where a frame does something the patterns say otherwise | `PATTERNS.md` |
| **Terms** | the names of the product's objects and actions, as written in the frames | `PATTERNS.md` |
| **Components** | the components the frames use, and the library each comes from | `COMPONENTS.md` |

## Compare colour by calculation

Never judge a colour difference by eye, and never match by name. For each
colour the project uses for a role, run:

```bash
npx zebra-theme --ramp=<hex>
```

It prints the nearest Zebra step and how far off the colour is, and how far
its hue is from Zebra's brand colour.

| The command says | Recommend |
|---|---|
| the same colour | keep Zebra's |
| close: the same colour at another tone | keep Zebra's, and record the value |
| a different colour, in the same family | keep Zebra's unless the designer names it as the brand |
| a different brand colour | the project's own theme |

For neutrals, a project theme is recommended only when surfaces and text are
visibly tinted throughout. For status colours it is never recommended
(`patterns 8.13`): a status drawn in an unusual hue is recorded as a finding.

For a font, keep Zebra's when the design uses a neutral sans. Recommend the
project's own when it is a different class (serif, slab, condensed, rounded),
or a typeface the project names as its brand.

Spacing is never themed. Record the density, and report an off-scale system
under Requests.

## Read departures against the patterns

Read the pattern files the frames touch, by the patterns' own README. For
each thing the design does differently:

- a rule that starts "By default": record it as a departure, with the reason
  if the file gives one;
- an accessibility minimum, or any other rule: record it as a finding.

Don't list what the design does the same way as the patterns.

## Show the review

Put the review in your reply as a table: what was read, the project's value,
Zebra's value, the difference, and what you recommend. It is a report, not a
question. Only with `look: design-system`: the questions come in step 5.
