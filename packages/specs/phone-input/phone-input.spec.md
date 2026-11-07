# Phone Input

Takes a phone number, with a country picker joined to its start. The picker sets the flag and dial code, and the field groups digits as they are typed. The whole number is available in E.164.

Source: [Phone Input page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7682-19850) · component set `7687:1493` · extracted 2026-11-01 · 83 variants · default `State=default, Size=medium, Shape=rounded, Open=false, Flavour=default`

> **No blockers, 7 warnings.** See [Issues](#issues).

## API

| Prop | Type | Values | Default |
|---|---|---|---|
| `state` | enum | `default`, `invalid`, `disabled` | `default` |
| `size` | enum | `small`, `medium`, `large` | `medium` |
| `shape` | enum | `rounded`, `sharp`, `full` | `rounded` |
| `flavour` | enum | `default`, `gradient`, `ghost` | `default` |
| `open` *(derived)* | enum | `false`, `true` | `false` |
| `flag` *(metadata only)* | enum | `emoji`, `artwork`, `icon` | `emoji` |
| `value` *(code only)* | string |  |  |
| `onValueChange` *(code only)* | function |  |  |
| `country` *(code only)* | string |  |  |
| `countries` *(code only)* | array |  |  |
| `countryLabel` *(code only)* | string |  |  |
| `name` *(code only)* | string |  |  |

**state**
- `default`: One state across the label, country control, number and hint.
- `invalid`: Marks the number, with the reason in the hint. The error stays on while a person corrects it.
- `disabled`: Dims every part and takes the country control and number out of the tab order.

**size**
- `medium`: Fits the field to its surface. Heights are control/md, control/sm and control/lg.
- `small`: The tightest, and the only size that also reduces the text.
- `large`: For a field that is the main thing on its surface.

**shape**
- `rounded`: The softened corner, shared by the country control's start and the number's end.
- `sharp`: Matches square surfaces.
- `full`: A pill, for a field that reads as its own object.

**flavour**
- `default`: A bordered field, and the right choice inside a form.
- `gradient`: A distinct interaction. The country control takes foreground/gradient/start, where the number's border starts.
- `ghost`: No surface or visible border, for a surface that already bounds it.

**open**
- `false`: The country menu is closed. Figma only: derived from the menu, not a prop.
- `true`: Shows the country menu below the control.

**flag**
- `emoji`: Code's default: the country's system emoji flag. Windows shows letters such as US instead.
- `artwork`: Real flag artwork, set with flag on a country. It replaces the emoji everywhere, on every platform.
- `icon`: Figma's default: the flag glyph, a placeholder. Swap the exposed Flag instance for a flag component.

**value**: National digits, without the dial code.

**onValueChange**: Called on every edit and country change, with the digits, the country and the E.164 number.

**country**: The selected country's ISO code. defaultCountry sets the first one.

**countries**: The countries offered. Each takes code, name, dialCode, format and flag.

**countryLabel**: Accessible name of the country control. The selected country follows it.

**name**: Submits the number in E.164 under this name.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes, measurements suffixed `Px`, and the issues.

## Internal variations & content inputs

- **flag**: Takes real flag artwork. Figma only: the default is the flag glyph as a placeholder, so swap in a flag component wherever the real flag matters. In code, pass flag on a country.
- **value** (`value`): Sample digits, not API.
- **dial code** (`country`): Sample + 1, fixed text.
- **country rows** (`countries`): Two sample rows.

## Anatomy

| Part | Kind | Details |
|---|---|---|
| `root` | container | layout: direction vertical; gap space/2xs · sizing: fixed width, hug height |
| `label` | instance | The field's name. · ref: Input Label · refVariant: Type=default, Disabled per state |
| `control` | container | note: Joins countryControl and number edge to edge. · layout: direction horizontal; gap none · sizing: width fill; height hug |
| `countryControl` | instance | The flag and chevron. Opens the country menu. · ref: _Phone Country |
| `number` | instance | The dial code and digits, grouped as they are typed. · ref: Input / Phone · sizing: width fill |
| `hint` | instance | The supporting line, and the reason when invalid. · ref: Input Hint · refVariant: Type per state |
| `countryMenu` | instance | ref: Dropdown Menu · refVariant: Compact=false, Rounded per shape · visibleWhen: open · note: Figma only: drawn inside the component. Sample rows are Menu Items. · position: below countryControl, left aligned |

## Variants

Cells are token names, except those ending Px, which are measurements of the rendered file.

### state

| state | number.state | countryControl.state | label.disabled | hint.type | figmaNode |
|---|---|---|---|---|---|
| default | filled | default | false | default | 7687:640 |
| invalid | invalid | default, flavour default on gradient | false | error | 7687:665 |
| disabled | disabled | disabled | true | disabled | 7687:690 |

### size

| size | height | text | measuredHeightPx |
|---|---|---|---|
| small | control/sm | body/small | 36 |
| medium | control/md | body/medium | 40 |
| large | control/lg | body/medium | 48 |

### shape

| shape | countryControl.startRadius | number.endRadius | menu.rounded |
|---|---|---|---|
| sharp | radius/none | radius/none | false |
| rounded | radius/sm | radius/sm | true |
| full | radius/pill | radius/pill | not drawn |

### flavour

| flavour | figmaNode |
|---|---|
| default | 7687:640 |
| gradient | 7689:2952 |
| ghost | 7689:3762 |

### open

| open | countryControl.state | figmaNode | countryMenu | measuredMenuPx | measuredOffsetPx |
|---|---|---|---|---|---|
| false | per state | 7687:640 |  |  |  |
| true | open | 7687:1269 | Dropdown Menu, More Items off | 213 x 108 | 8 |

## Subcomponents

### Input / Phone

Set `7682:19934` · 243 variant(s) · public

#### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `size` | enum | `large`, `medium`, `small` | `medium` |
| `shape` | enum | `sharp`, `rounded`, `full` | `rounded` |
| `state` | enum | `enabled`, `hover`, `focus`, `selected`, `typing`, `filled`, `invalid`, `read-only`, `disabled` | `enabled` |
| `flavour` | enum | `default`, `gradient`, `ghost` | `default` |

#### Anatomy

| Part | Details |
|---|---|
| `root` | radius: radius/none at the start, per shape at the end · height: per size · layout: direction horizontal; gap space/2xs; padding space/sm block, space/sm start, space/md end; align center |
| `inputText` | layout: direction horizontal; gap space/2xs; padding space/2xs inline · sizing: width fill |
| `dialCode` | note: Fixed text, sample + 1. |
| `number` | note: Sample digits. Grouped with a cursor while focused. |
| `clear` | ref: Icon · glyph: cancel · visibleWhen: state == typing |

Cells are token names. selected and filled follow the Input family.

#### state

| state | root.fill | root.stroke | number.color | dialCode.color |
|---|---|---|---|---|
| enabled | interactive/neutral/background/default | interactive/neutral/border/default at stroke/thin | foreground/disabled | foreground/primary |
| hover | interactive/neutral/background/default | interactive/neutral/border/hover at stroke/thin | foreground/disabled | foreground/primary |
| focus | interactive/neutral/background/default | border/focus at stroke/thick, outside | foreground/disabled | foreground/primary |
| selected | interactive/neutral/background/default | border/focus at stroke/thin | foreground/disabled | foreground/primary |
| typing | interactive/neutral/background/default | border/focus at stroke/thin | foreground/primary | foreground/primary |
| filled | interactive/neutral/background/default | interactive/neutral/border/default at stroke/thin | foreground/primary | foreground/primary |
| invalid | feedback/error/background/subtle | border/error at stroke/thick | foreground/primary | foreground/primary |
| read-only | interactive/neutral/background/default | border/subtle at stroke/thin | foreground/primary | foreground/primary |
| disabled | interactive/neutral/background/disabled | interactive/neutral/border/disabled at stroke/thin | foreground/disabled | foreground/disabled |

#### flavour

| flavour | state | root.stroke | root.fill |
|---|---|---|---|
| gradient | enabled, filled | gradient paint from Input at stroke/thin |  |
| gradient | hover | border/gradient/end at stroke/thin |  |
| gradient | selected, typing | border/gradient/start at stroke/thin |  |
| gradient | focus, invalid, read-only, disabled | as default |  |
| ghost | enabled, filled, hover, selected, typing, read-only | stroke/base, with default's colour except enabled and filled, which take interactive/ghost/border/default | none |
| ghost | focus | border/focus at stroke/thick, outside | none |
| ghost | invalid | border/error at stroke/thick | feedback/error/background/subtle |
| ghost | disabled | interactive/ghost/border/disabled at stroke/base |  |

### _Phone Country

Set `7687:639` · 162 variant(s) · private

#### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `size` | enum | `large`, `medium`, `small` | `large` |
| `shape` | enum | `sharp`, `rounded`, `full` | `sharp` |
| `state` | enum | `default`, `hover`, `pressed`, `focus`, `open`, `disabled` | `default` |
| `flavour` | enum | `default`, `gradient`, `ghost` | `default` |

#### Anatomy

| Part | Details |
|---|---|
| `root` | radius: per shape at the start, radius/none at the end · height: per size · stroke: stroke/thin on top, bottom and start, none at the end · layout: direction horizontal; gap space/2xs; padding space/none by space/sm; align center · sizing: hug width |
| `flag` | ref: Icon · refVariant: Size=medium · glyph: flag · note: Exposed. Figma-only placeholder. |
| `chevron` | ref: Icon · refVariant: Size=small · glyph: expand-more |

Cells are token names. Stroke weight is stroke/thin, stroke/base on ghost, and stroke/thick outside on focus.

#### state

| state | default.fill | default.stroke | gradient.stroke | ghost.fill | ghost.stroke |
|---|---|---|---|---|---|
| default | interactive/neutral/background/default | interactive/neutral/border/default | foreground/gradient/start | none | interactive/ghost/border/default |
| hover | interactive/neutral/background/hover | interactive/neutral/border/default | foreground/gradient/start | interactive/ghost/background/hover | interactive/ghost/border/default |
| pressed | interactive/neutral/background/pressed | interactive/neutral/border/default | foreground/gradient/start | interactive/ghost/background/pressed | interactive/ghost/border/default |
| focus | interactive/neutral/background/default | border/focus | border/focus | none | border/focus |
| open | interactive/neutral/background/selected | interactive/neutral/border/default | foreground/gradient/start | interactive/ghost/background/selected | interactive/ghost/border/default |
| disabled | interactive/neutral/background/disabled | interactive/neutral/border/disabled | interactive/neutral/border/disabled | none | interactive/ghost/border/disabled |

## Dependencies

- **Input Label** (`6329:31743`): label, Type=default
- **Input Hint** (`6329:31836`): hint, Type per state
- **Dropdown Menu** (`2666:6863`): country menu, Compact=false, More Items off
- **Menu Item** (`2402:6508`): country rows
- **Template/Dropdown** (`2669:10309`): named by the metadata as the trigger and menu pattern, not instanced on the page
- **Icon** (`2046:15010`): flag placeholder at medium, chevron at small, clear

## Tokens & theming

Names only; values live in `tokens/`.

- **Color:** `interactive/neutral/background/default`, `interactive/neutral/background/hover`, `interactive/neutral/background/pressed`, `interactive/neutral/background/selected`, `interactive/neutral/background/disabled`, `interactive/neutral/border/default`, `interactive/neutral/border/hover`, `interactive/neutral/border/disabled`, `interactive/ghost/background/hover`, `interactive/ghost/background/pressed`, `interactive/ghost/background/selected`, `interactive/ghost/border/default`, `interactive/ghost/border/disabled`, `border/focus`, `border/error`, `border/subtle`, `border/gradient/start`, `border/gradient/end`, `foreground/primary`, `foreground/disabled`, `foreground/gradient/start`, `feedback/error/background/subtle`
- **Dimension:** `space/{none,xxs,sm,md}`, `radius/{none,sm,pill}`, `stroke/{base,thin,thick}`, `control/{sm,md,lg}`
- **Typography:** `body/medium`, `body/small`
- **Named by the metadata, bound by a nested component:** `control/icon-md`
- **Theme axes:** palette Light, Dark · size Desktop, Mobile, Tablet, Desktop Compact · typography Desktop, Tablet, Mobile, Desktop Compact · extensions tokens/extensions/ (companion, target, condensed)

Every token resolves in the export, and glyphs `flag`, `expand-more` and `cancel` are in the icon font.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| default | — | — | Label and hint at rest, with the number in its own state. |
| hover, focus, typing | The number's own states | — | Hover, focus and typing belong to the number. Typing adds a clear control. Filled, typing and selected are derived from focus and value. |
| invalid | Set on the assembly | — | The number takes feedback/error/background/subtle and a stroke/thick border/error. The hint becomes the error. |
| disabled | Set on the assembly | — | Every part dims, and the country control and number leave the tab order. |
| Country control | Pointer or keyboard | — | Hover, pressed and focus are CSS states. Open comes from the menu. |
| Open | Activating the country control | — | Opens the country menu. The control reports itself as expanded. |

- **Motion:** No transition is defined.
- **Grouping:** Digits group by the country's format as they are typed, and the caret stays with its digit. Grouping is visual: it does not check that a number exists.
- **Length:** Digits stop at the format's length. Without a format they stop at the E.164 limit.
- **Country:** Picking a country changes the dial code and format, and keeps the digits. Extra digits are dropped.
- **Value:** value is the national digits. onValueChange also gives the E.164 number, and name submits it.
- **Dropdown:** The country control is the Template/Dropdown trigger. The menu opens below it, left aligned, space/sm away, with one row per country. It scrolls past eight rows.
- **Keyboard:** Enter or Space opens the menu. Arrow keys move through the rows. Escape closes it and returns focus to the control.
- **Flags:** Code uses the system's emoji flag unless a country passes flag. Pass artwork where flags must show everywhere, because Windows has no emoji flags. Artwork replaces the emoji in the control and every row.
- **Portal:** Figma only: the menu is drawn inside the component. In code it mounts in a portal and is positioned against the control, with collision handling.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Label | Input Label, parent owned | The field's name. It marks required or optional, like Input. |
| Country control | _Phone Country, parent owned | The flag and a chevron, joined to the number. It has no visible text, so countryLabel names it. |
| Flag | Flag instance, exposed | Takes real flag artwork. Figma only: the default is the flag glyph as a placeholder, so swap in a flag component wherever the real flag matters. In code, pass flag on a country. |
| Number | Input / Phone, parent owned | The dial code and digits. Dial Code is fixed text that reads with the value. |
| Hint | Input Hint, parent owned | The supporting line, and the reason when invalid. |
| Country menu | Dropdown Menu, parent owned | One Menu Item per country, with its flag and dial code. The selected country takes the selected row. |
| Sample digits | Figma only | The number, dial code and two menu rows are sample content, not API. |

## Usage

**Do**
- Use real flag artwork in the product. Pass flag on each country, or swap the exposed Flag instance in a design.
- Pair it with validation, and set invalid with the reason in the hint. Grouping alone does not prove a number exists.

**Don't**
- Don't ship the flag glyph as the real thing. It is a placeholder, and it says nothing about the country.
- Don't use the flag as the only sign of the country. The dial code and the country's name in the menu carry it too.

## Accessibility

- The label names the number, and the hint is tied to it.
- The country control has no visible text, so countryLabel names it, with the selected country and dial code following.
- Flags are decorative and hidden from assistive tech, whether emoji or artwork.
- Opening the menu moves focus into it, and Escape returns it to the control.
- The number uses a tel input mode and tel-national autocomplete.
- Invalid is not colour alone, because the hint gives the reason.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Start width, hug height | Starts 280 wide and narrows to fit its container, and block fills it. Height follows size through control/sm, control/md and control/lg. |
| Join | No gap | The country control and number sit edge to edge. The control has no end border, and only the outer corners take the radius. |
| Country control | Hug | space/sm at the sides, with space/2xs between flag and chevron. interactive/neutral backgrounds, as the number. |
| Flag | Set to medium | control/icon-md wide, emoji or artwork. Artwork keeps its own ratio. |
| Number | Fill | space/sm at the start, with space/2xs between the dial code and the digits. |
| Gradient | Theming | The control's border is foreground/gradient/start, so it runs into the number's. It goes neutral when invalid. |
| Ghost | Theming | No surface, and a stroke/base border. Hover, pressed and open use interactive/ghost backgrounds. |

## Visual reference

- [Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7682-19850) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-1493) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7682-21069)
- [default](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-640) · [invalid](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-665) · [disabled](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-690) · [small](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-855) · [large](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-1062) · [sharp](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-717) · [full](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-786) · [gradient](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7689-2952) · [ghost](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7689-3762) · [open](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-1269) · [Input / Phone](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7682-19934) · [_Phone Country](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7687-639)

## Issues

### Warn

- *gaps*: The file holds no flag artwork. The Flag instance is the flag glyph, so a real flag needs assets this page does not have.
- *metadata vs structure*: Flag is in the Property Breakdown, but Figma has no such property. Its emoji and artwork values exist only in the metadata.
- *metadata vs structure*: The metadata says the error stays on while a person corrects it. Input / Phone has no invalid and focused state, because typing and focus replace invalid.
- *metadata vs structure*: The Content row says the label marks required or optional, and Layout names block. Neither is a property or a Property Breakdown row.
- *structure (gaps)*: The menu's distance from the control is a raw 8 on an absolute layer, because Figma cannot bind it. The metadata says space/sm.
- *structure*: open is drawn at medium, default state and default flavour only, in rounded and sharp. There is no full open variant, so the menu's radius on full is unspecified.
- *structure*: _Phone Country defaults to large and sharp, while Phone Input and Input / Phone default to medium and rounded. A fresh instance of the part will not match its parent.

### Note

- *structure*: Phone Input has 83 variants: the full 81 of state, size, shape and flavour, plus the two open ones.
- *structure*: On gradient, an invalid assembly uses the country control's default flavour, so it goes neutral. On ghost the control stays ghost beside the error field.
- *structure*: Ghost's stroke/base resolves to zero, so hover, selected, typing and read-only change a stroke that draws nothing. Input's spec records the same.
- *structure*: The gradient border on enabled and filled is a gradient paint from the Input family, not a single token.
- *metadata*: control/icon-md is named by the metadata and belongs to the nested Icon, so this page binds it through Size=medium.
- *metadata*: Phone Input's description still calls it experimental and carries escaped apostrophes, such as Input&amp;#39;s. Input / Phone and _Phone Country have no description.
- *metadata*: No motion, by the metadata's own statement. The Do and Don't picture areas are empty. Layout has no colour or theming row, so scope behaviour and portalContainer are unstated.
