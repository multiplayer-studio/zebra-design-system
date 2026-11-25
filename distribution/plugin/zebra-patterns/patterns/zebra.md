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
| commit bar | Compose: a pinned bar with Button. The commit is `flavour="primary"`. |

## Navigation

| Pattern word | Zebra |
|---|---|
| bottom bar | Navigation Bar with Navigation Item |
| rail | Navigation Rail with Navigation Rail Item |
| drawer | Navigation Drawer with Sub Menu Item |
| tabs | Tab Bar |
| breadcrumb | Breadcrumb |
| stepper | Stepper |
| peers | No component. The items of one Tab Bar, Navigation Bar, Navigation Rail or Segmented Control, or the items of a sequence. |
| transition | No component. Each component's own motion where its spec sets one; otherwise compose it from the theme's motion. |

## Messages

| Pattern word | Zebra |
|---|---|
| system banner | System Banner (desktop and mobile specs) |
| notice | Inline Banner |
| toast | Snackbar |
| dialog | Dialog |
| tooltip | Tooltip |
| error summary | No component. Compose it from Inline Banner with `status="negative"`, holding one link per field. |

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
| split button | No component. Compose it from Button and an Icon Button that opens a Dropdown, sharing one outer shape. |
| floating action | No component. Compose it from Icon Button or Button with `flavour="primary"`, raised over the content. |

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
| Dialog | Dialog |
| Sheet | Bottom Sheet |
| Side panel | No component yet. Report it as a gap. |
| Toast | Snackbar |
| Notice | Inline Banner |
| System banner | System Banner (desktop and mobile specs) |
| Menu | Dropdown with Dropdown Menu and Menu Item |
| Error summary | No component. Compose it from Inline Banner with `status="negative"`, holding one link per field. |

## Theme

| Pattern word | Zebra |
|---|---|
| light and dark themes | `mode-light`, `mode-dark` on an ancestor |
| brand theme | An extension class, for example `ext-companion` |
| shape | Set once at the page root and inherited (DESIGN.md, Shape inheritance) |
| icons | Glyph names from `@zebra-design-system/icons` |
