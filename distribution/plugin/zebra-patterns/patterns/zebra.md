# Zebra binding

Maps each pattern word in [terms.md](terms.md) onto the Zebra Design System. Read it with the pattern files when the project is built with a Zebra library. A project on another system does not need this file.

Component names are the names of the Zebra component specs. Tokens are written as CSS custom properties.

## Parts of a screen

| Pattern word | Zebra |
|---|---|
| header (product) | Global Header |
| header (screen, desktop) | Screen Header Bar |
| header (screen, mobile) | Top App Bar |
| pinned bar | No component. Compose it from layout and Button. |
| primary action | Button with `flavour="primary"` |

## Navigation

| Pattern word | Zebra |
|---|---|
| bottom bar | Navigation Bar with Navigation Item |
| rail | Navigation Rail with Navigation Rail Item |
| drawer | Navigation Drawer with Sub Menu Item |
| tabs | Tab Bar |
| breadcrumb | Breadcrumb |
| stepper | Stepper |

## Messages

| Pattern word | Zebra |
|---|---|
| system banner | System Banner (desktop and mobile specs) |
| notice | Inline Banner |
| toast | Snackbar |
| dialog | Dialog |
| tooltip | Tooltip |

## Surfaces

| Pattern word | Zebra |
|---|---|
| sheet | Bottom Sheet |
| side panel | No component yet. Report it as a gap. |
| menu | Dropdown with Dropdown Menu and Menu Item |
| scrim | Scrim |
| card | Card |

## Small parts

| Pattern word | Zebra |
|---|---|
| tag (category) | Label, from the Badges set |
| tag (status) | Status Label, from the Badges set |
| tag (priority) | Priority Pill, from the Badges set |
| badge | Notification Indicator |
| chip (filter) | Filter Chip |
| chip (suggestion) | Assist Chip |
| chip (entered value) | Input Chip |
| skeleton | No component yet. Report it as a gap. |
| composer | Message Input (experimental) |
| AI mark | No component yet. Report it as a gap. |
| progress, measured or unmeasured | Progress Bar, Progress Circle |

## Sizes

| Pattern word | Zebra |
|---|---|
| compact (width) | `bp-mobile` on an ancestor |
| medium (width) | `bp-tablet` on an ancestor |
| expanded (width) | The default. No class. |
| compact (density) | `bp-desktop-compact`, or the `ext-condensed` extension |
| touch target size | `--control-target-min` |
| gloved target size | `--control-lg` |
| contrast floors | Met by the semantic colour pairs. `mode-aaa-light` and `mode-aaa-dark` are the higher-contrast scheme. |
| focus indicator | `--focus-outline`, `--focus-ring` |

## Severity

| Pattern word | Zebra |
|---|---|
| info, success, warning, error | The `feedback/<status>/` tokens, and `surface/`, `foreground/` and `border/` of the same status. Components name error "negative" in some props. |

## Spacing steps

The steps in [compositions/spacing.md](compositions/spacing.md), as tokens. Where two are given, use the first unless the note says otherwise.

| Step | Zebra |
|---|---|
| tight | `--space-2xs` under a label, `--space-xs` beside an icon. Inside a component, its own gap. |
| related | `--space-sm`, or `--space-md` between fields and between rows that are targets |
| heading | `--space-sm` |
| inset | `--space-lg`, or `--space-md` at compact width. Never less than `--space-card`. |
| gutter | `--space-gutter` |
| group | `--space-xl` |
| section | `--space-2xl`. Never less than `--space-section`. |
| page | `--space-page`. The size mode on the root changes its value with width. |

## Organisms

The blocks in [compositions/organisms.md](compositions/organisms.md). Most have no single component: compose them from the parts named, with layout and tokens.

| Organism | Zebra |
|---|---|
| Page header | Screen Header Bar on desktop, Top App Bar on mobile |
| Identity block | Compose: Avatar or Icon, a title, Status Label, secondary text |
| Fact grid | Compose: a grid of label and value text. No component. |
| Section navigator | Tab Bar. Select at compact width with many sections. |
| Commit bar | Compose: a pinned bar with Button. The commit is `flavour="primary"`. |
| Search field | Search |
| Filter bar | Compose: Filter Chip, Dropdown for sort, Input Chip for active filters |
| Collection row | A Table row, or compose a list row. Card only when items differ in kind. |
| Selection bar | Top App Bar in its selection state on mobile. Compose on desktop. |
| Summary tile | Compose: Card with label, value and comparison text |
| Chart card | Compose: Card. No chart component yet. Report it as a gap. |
| Exception item | Notification Item, or compose: Icon Indicator, text, Button |
| Current item | Compose: Card with the item, its facts and its position |
| Step list | Stepper |
| Step footer | Compose: a pinned bar with Button. Next is `flavour="primary"`. |
| Field group | Compose: a heading with Input, Select and the other field components |
| Review block | Compose: a heading, a fact grid and a text Button for Change |
| Message list | Chat Message |
| Composer | Message Input (experimental) |
| Scan target | Compose: instruction text, the result, and Input for typing instead |
| Viewfinder | No component. Compose it full screen with Icon Button. |
| Decision card | Compose: Card. No AI mark yet. Report it as a gap. |
| State block | Compose: Icon, text and Button. Progress Circle while loading. |

## Theme

| Pattern word | Zebra |
|---|---|
| light and dark themes | `mode-light`, `mode-dark` on an ancestor |
| brand theme | An extension class, for example `ext-companion` |
| shape | Set once at the page root and inherited (DESIGN.md, Shape inheritance) |
| icons | Glyph names from `@zebra-design-system/icons` |
