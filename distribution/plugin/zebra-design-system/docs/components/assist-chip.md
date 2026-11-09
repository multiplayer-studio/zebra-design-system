# Assist Chip

> Offers a contextual action, or stands for an item someone can discard, such as an attached file. Five colours borrow the status tokens to mark a state or a kind of item, with PDFs in red, spreadsheets in green and documents in blue, and in code foreground, background and border each take an override beyond those five. The label is the only content a consumer writes, and one colour should hold for every chip of the same kind. Reach for a button when the action is the primary next step, and a filter chip when it narrows content.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-assist-chip>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `label` | string | `Label` |  |  |
| `showLeadingIcon` | boolean | `true` |  |  |
| `state` | enum | `default` | `default` `hover` `focus` `selected` `dragged` | hover and focus are interaction states in code; dragged comes from a reorder interaction; selected is questioned by the metadata (see issues). |
| `disabled` | boolean | `false` |  |  |
| `rounded` | boolean | `true` |  |  |
| `discardable` | boolean | `true` |  |  |
| `color` | enum | `neutral` | `neutral` `green` `orange` `blue` `red` |  |
| `foreground` | colorToken | `null` |  |  |
| `background` | colorToken | `null` |  |  |
| `border` | colorToken | `null` |  |  |

## When and how to use

### Do

- Phrase the label as a verb. The chip is a thing to do, not a thing to pick.
- Keep Show Leading Icon consistent across a row. One chip without an icon among several with them looks misaligned.

### Don't

- Don't reach for an assist chip when the action is the main one on the screen. That is a button.
- Don't use State=selected to mean an action has stuck. A chip that stays selected is usually a filter chip in disguise.

## States

| State | Trigger | What changes |
|---|---|---|
| default | — |  |
| hover | Pointer over the chip |  |
| focus | Keyboard focus |  |
| selected | State set to selected |  |
| dragged | Chip being reordered |  |
| disabled | disabled set to true |  |

## Behaviour

- **Motion** — Figma stores no timing and no transition is authored. Every state change is a flat swap of fill, border or text colour.
- **Action** — Nothing in the set records what the chip does or what happens afterwards. An assist chip is a trigger, and the result belongs entirely to the implementation.
- **Coverage** — 52 variants are built. disabled appears only with State=default and Color=neutral, and active offers a single value.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Label | text property | Plain text set per instance, defaulting to Label. Phrase it as the action itself. |
| Leading Icon | nested Icon, toggled by Show Leading Icon | An Icon at Size=small, shipped swapped to Star. The swap runs through the Icon's own Name property, so the glyph can be changed per instance, while visibility is the one thing the chip itself surfaces. |
| Remove control | nested Icon, toggled by Discardable | A Close icon after the label, shown when Discardable is on. It takes the label colour. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Hug width, fixed height | 30 tall at rest and 28 at focus and disabled. The width hugs the label and icons. |
| Padding and gap | Fixed | space/xs on all sides and no gap. The label sits in its own frame padded space/xxs left and right, which spaces it from the icon and the remove control. |
| Radius | Per Rounded | radius/pill when true and radius/none when false. |
| Fill | Per state | interactive/neutral/background at default, hover, focused, selected and disabled, with pressed reused for dragged. |
| Border | Per state | 1px inside at rest, interactive/neutral/border/default on neutral and border/success, warning, info or error per Color. Focus swaps to 2px focus/outline drawn outside. Disabled carries none. |
| Label | Theming | indicator/medium, IBM Plex Sans Medium 12 over a 14px line. interactive/neutral/foreground/default on neutral, feedback/success, warning, info or error foreground per Color, and the disabled token when disabled. |
| Leading icon | Fixed | Icon at Size=small, 16 square. |
| Colour overrides | Per Color, or per instance in code | Color sets the border and the label. In code, foreground, background and border each accept a colour token on top, so one kind of item can hold one colour across a view. |

## Accessibility

- The chip is a control. It needs a button role and a name stating the action, not just the label text.
- Focus is the only state with a visible outline and it is drawn outside the chip, so check it is not clipped by a scrolling row.
- The leading icon sits next to the label and is decorative. If it ever carries meaning the label does not, that meaning has to be in text.
- Disabled chips lose the border and rely on fill and text colour alone. Check both against the surface behind them.
- The label uses indicator/medium at 12px over a 14px line. It is the action's only name, so it should not be shortened to an abbreviation.
- Colour marks the kind of item but never replaces the label. Check each override pair for contrast against the surface behind it.
- The remove control is a real target. Name it after what it removes, such as Remove Document.pdf.

---
*Generated from `specs/assist-chip` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
