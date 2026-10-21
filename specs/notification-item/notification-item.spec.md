# Notification Item

A single entry in a notification list, carrying who or what it came from, a title and message, an optional attachment, and an action. Read is the only variant and decides whether the entry still looks unseen. Everything else is a toggle, so a single component covers the range a real list throws at it.

Source: [Notification Item page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6020-1488) · extracted 2026-10-20

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `read` | enum | false, true | `false` | variant |
| `group` | boolean | true, false | `false` | groupIndicator (Read=false only) |
| `showAttachment` | boolean | true, false | `true` | attachment |
| `showActions` | boolean | true, false | `true` | actions |
| `showUrgencyIndicator` | boolean | true, false | `true` | urgencyIndicator (intended; not wired in Figma, see issues) |
| `title` | string | | `Urgent Message` | title |
| `timestamp` | string | | `Just now` | timestamp |
| `actions` | slot | Button (default), Icon, one unresolved set | one Button | actions |

**read** — false: "The unseen entry, and the state the component is drawn around." · true: "The entry has been seen. The card drops its surface and sits flush on the list background, which is what tells it apart from an unread entry at a glance."

**group** — false: "A standalone entry." · true: "Marks the entry as standing for several collapsed together. It applies while the entry is unread, and a read entry shows no group bar."

**showAttachment** — true: "Show the attached file's name and icon. Turn it on only when a file is genuinely attached, because the row is not a placeholder and reads as a broken link when empty." · false: "No attachment row, and the card shortens to match."

**showActions** — true: "Show the action slot. It is the only place an entry offers something to do, so switching it off makes the item read-only." · false: "No action row. Reach for this on entries that are purely informational."

**showUrgencyIndicator** — true: "Flag the entry as needing attention before the rest. Reserve it, because an indicator on every item in a list signals nothing." · false: "The ordinary case, and what most entries in a list should use."

**actions** — slot restricted to preferred values; default content is a [Button](../button/) at Size=small, Shape=rounded, Flavour=outline, label "User Action", no icons.

Values anywhere in this document are token names. The only literals are inside verbatim metadata quotes and inside issues; measurements are suffixed Px.

## Internal variations & content inputs

**Leading visual flavour** — via the private `_Leading Visual` (Flavour: avatar · image · icon, default avatar). Not a prop on Notification Item in Figma; "Flavour belongs to the leading visual rather than to the notification, so it is decided where the visual is supplied." Whether it becomes a prop or a leading slot in code is the implementer's call.

**Content inputs** — the leading visual's content (avatar name/photo, image src, or icon glyph), the message body (sample "New urgent message from Phil Starr…"), and the attachment filename (sample "Spring-donation-drive.pdf"). Body and filename are not Figma properties but must be inputs in code.

## Anatomy

Root: horizontal, gap `space/sm`, padding `space/gutter` top/bottom and `space/card` left/right, top-aligned; fixed width, hugs height (360×164Px measured with every row). Radius `radius/md`. Fill `surface/card` when unread, none when read. Stroke `border/default` at `stroke/base` (inside).

1. **Leading visual** — `_Leading Visual` (Flavour=avatar), square `control/sm`, `radius/pill`. "The square slot standing for whoever or whatever the entry came from. Its Flavour picks an avatar, an image or an icon, and it is circular in all three."
2. **Content** — vertical, gap `space/sm`, fills width, hugs. "The column holding the header, the message, the attachment row and the action slot."
   - **Message** — vertical, gap `space/xs`.
     - **Header** — horizontal, gap `space/sm`, centred on the cross axis.
       - **Unread dot** — [Notification Indicator](../notification-indicator/) Size=small inside a fixed-width wrapper with `space/sm` top/bottom padding; fill overridden to `interactive/primary/background/default`, stroke `border/inverse` at `stroke/base`. Present only when `read == false`.
       - **Title** — bound to `title`; `label/large` (unread) / `body/medium` (read), `foreground/primary`, fills width, wraps.
       - **Meta** — horizontal, gap `space/xs`, padding `space/2xs` top/bottom, hugs.
         - **Timestamp** — bound to `timestamp`; `label/small`, `foreground/tertiary`.
         - **Urgency indicator** — [Icon Indicator](../badges/icon-indicator.spec.md) Size=small (`control/icon-sm`), glyph overridden to `important-notification`, fill overridden to `interactive/destructive/background/default`. Visible when `showUrgencyIndicator` (intended).
     - **Body** — `body/small`, `foreground/primary`, fills width, max 2 lines, truncates at the end.
   - **Attachment** — horizontal, gap `space/xs`, centred; visible when `showAttachment`.
     - **Attachment icon** — [Icon](../icon/) Size=small, glyph `attachment`, family from the `shape` token, colour currentColor.
     - **Filename** — `label/small`, `foreground/link`, single line.
   - **Actions** — slot bound to `actions`, horizontal, gap `space/xs`, padding `space/none` top/bottom, content aligned to the end, fills width; visible when `showActions`.
3. **Group indicator** — absolute, anchored bottom-centre (constraints CENTER / MAX), fill `border/focus`, bottom corners `radius/md`, top corners unrounded. Measured 336×4Px, starting at the card's bottom edge so it hangs just beneath it. Visible when `group && read == false`. "The bar marking a collapsed group. Hidden until Group is turned on, and present only while the entry is unread."

## Variants

| read | root fill | unread dot | title style | group indicator |
|---|---|---|---|---|
| false | `surface/card` | shown | `label/large` | present (visible when `group`) |
| true | none | removed | `body/medium` | removed |

Height (measured observation, the card hugs): 164Px with every row, 140Px without the attachment, 120Px without the actions.

## Subcomponents

### _Leading Visual (private)
"The part that makes up Notification Item. _Leading Visual is the square slot at the start of each entry, with Flavour choosing between an avatar for a person, an image for something with artwork of its own, and an icon for everything else."

Root: square `control/sm`, `radius/pill`, vertical, gap `space/none`, content centred. API: `flavour` enum avatar · image · icon (default avatar; Figma lists icon, avatar, image).

| flavour | content | root width | root stroke |
|---|---|---|---|
| avatar | [Avatar](../avatar/) Size=xxsmall with Show Status, Show Ring, Show Close off (renders 32Px inside the slot) | `control/sm` | none |
| image | image fill on the root (cover), no child | hug, unbound (renders 36Px) | none |
| icon | [Icon](../icon/) Size=medium, sample glyph `verified`, family from `shape`, currentColor | `control/sm` | `border/default`, weight unbound |

Intent per flavour — avatar: "A person, and the default. Carries an Avatar at Size=xxsmall with its own Status, Ring and Close turned off, so only the face or initials shows." · image: "Something with artwork of its own, such as a product or a file preview. The artwork is the slot's background rather than a separate element inside it." · icon: "A system or category source with neither a face nor artwork. It tells entries apart least well of the three, so it is the fallback rather than the first choice."

### Dependencies (specced elsewhere)

| Component | Spec | Used as | Pinned / overridden |
|---|---|---|---|
| Avatar | [specs/avatar](../avatar/) | leading visual (avatar) | Size=xxsmall; status, ring, close off |
| Notification Indicator | [specs/notification-indicator](../notification-indicator/) | unread dot | Size=small; fill → `interactive/primary/background/default` |
| Icon Indicator | [specs/badges/icon-indicator](../badges/icon-indicator.spec.md) | urgency indicator | Size=small; glyph → `important-notification`; fill → `interactive/destructive/background/default` |
| Icon | [specs/icon](../icon/) | attachment icon, leading icon | glyphs `attachment`, `verified` |
| Button | [specs/button](../button/) | default action | Size=small, Shape=rounded, Flavour=outline |

## Tokens & theming

- **Colour:** `surface/card`, `border/default`, `border/focus`, `foreground/primary`, `foreground/tertiary`, `foreground/link`, `interactive/primary/background/default`, `interactive/destructive/background/default`, `border/inverse`
- **Dimension:** `space/none`, `space/2xs`, `space/xs`, `space/sm`, `space/card`, `space/gutter`, `radius/md`, `radius/pill`, `stroke/base`, `control/sm`, `control/icon-sm`
- **Typography:** `label/large`, `label/small`, `body/small`, `body/medium`
- **String:** `shape` (icon family)
- **Glyphs:** `important-notification`, `attachment`, `verified`

Theme axes (tokens/manifest.json): palette Light · Dark; size Desktop · Mobile · Tablet · Desktop Compact; typography Desktop · Tablet · Mobile · Desktop Compact. All names resolve in `tokens/base`; all glyphs are in `packages/icons/codepoints.json` and not retired.

## States, behavior & motion

| State | Trigger | Duration | What changes |
|---|---|---|---|
| Static | — | — | The notification itself has no hover, focus, pressed or disabled state. The only interactive part is the Button in the action slot, which carries its own. |
| Read | Read | — | Read=false fills the card with surface/card and shows the indicator dot in the header. Read=true removes both. Nothing else changes. |
| Grouped | Group set to true | — | A bar appears pinned to the bottom edge of the card. It is absolutely positioned, so the card's height does not change. |

| Type | Description |
|---|---|
| Motion | No transition is defined. Marking an entry read is a fill disappearing, with nothing specified between the two states. |
| Height | The card hugs its content. Hiding the attachment takes some space off and hiding the actions takes a small button height off, and because both sit in the same column the two shorten it independently. |
| Grouping | The group bar appears on unread entries only, so the grouping affordance applies while an entry is still unseen. |

## Content & slots

| Property | Type | Description |
|---|---|---|
| Action Slots | slot, one Button by default | Holds whatever the entry offers to do and fills the width of the content column. It takes a single Button by default. |
| Leading Visual | Flavour=avatar | A person, and the default. Carries an Avatar at Size=xxsmall with its own Status, Ring and Close turned off, so only the face or initials shows. Flavour belongs to the leading visual rather than to the notification, so it is decided where the visual is supplied. |
| Leading Visual | Flavour=image | Something with artwork of its own, such as a product or a file preview. The artwork is the slot's background rather than a separate element inside it. |
| Leading Visual | Flavour=icon | A system or category source with neither a face nor artwork. It tells entries apart least well of the three, so it is the fallback rather than the first choice. |
| Title and timestamp | text inputs | The two pieces of text the component takes. Title carries what happened and defaults to Urgent Message, Time Stamp carries when and defaults to Just now. |
| Body and filename | not parameterised | The message body is part of the component's content rather than inputs it accepts. Only the title, attachment and timestamp are parameterized. |

## Usage

**Do**
- Keep the title to the event and the body to the detail. The body truncates, so the title has to carry the meaning on its own.
- Switch off the rows you have no content for. An empty attachment row reads as a failed load rather than an absence.

**Don't**
- Don't rely on Group on a read entry. The bar appears only while the entry is unread.
- Don't use Read as a general status. It carries two values, and anything past seen and unseen needs another mechanism.

## Accessibility

- Unread is carried by a fill and a small dot, both visual only. The unread state has to be exposed in the markup as well.
- The notification has no focus state of its own. Only the Button in the action slot is focusable by default, so reaching the entry itself comes from code.
- The border sits at zero weight by default and is bound to border/default, so a high-contrast theme can raise it to a hard outline. At the default weight an entry is bounded by its fill and the spacing around it.
- The leading visual carries no text in any of its three flavours, and on the image flavour the artwork is a background rather than an element of its own. The source has to be named in the title or described alongside the image.
- The urgency indicator is an icon with no text. It needs a name, or the urgency is invisible to anyone not seeing the glyph.
- The body truncates rather than wrapping on. The full message has to be reachable some other way.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed width, hug height | 360 wide, and 164 tall with every row shown. Hiding the attachment takes it to 140 and hiding the actions to 120. |
| Padding and gap | Fixed | space/gutter top and bottom, space/card left and right, with a space/sm gap between the leading visual and the content column. |
| Radius | Fixed | radius/md on all four corners, identical on both variants. There is no shape property. |
| Fill | Per Read | surface/card when Read is false. Read=true carries no fill at all. |
| Border | Theming | A stroke bound to border/default sits on both variants at zero weight. The weight is a theming hook rather than an omission, so a high-contrast variable set can give every main component a hard outline, including elements that carry none by default. |
| Group Indicator | Fixed, absolute | Component width less 24 by 4 height, centered and pinned to the bottom edge, filled with border/focus and rounded to radius/md. Being absolute it does not affect the card's height. |
| Leading Visual | Fixed | 36 square on all three flavours, with radius/pill on every one so the slot is always circular. The Avatar sits at Size=xxsmall and the Icon at Size=medium, both centered inside the frame. |
| Type | Theming | Title uses label/large and Body body/small, both over foreground/primary. Timestamp is label/small over foreground/tertiary and the attachment filename label/small over foreground/link. |

## Visual reference

[Page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6020-1488) · [Component set](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6032-3093) · [Metadata](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6064-124) · [Read=false](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6032-3092) · [Read=true](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6032-3125) · [Group indicator](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6032-3815) · [_Leading Visual](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6032-3319) (avatar [6032-3318](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6032-3318), image [6032-3317](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6032-3317), icon [6032-3316](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6032-3316))

## Issues

**Warn**
- **API wiring:** Show Urgency Indicator#6032:16 is bound to no layer in either variant; the Icon Indicator is always shown and the toggle does nothing in Figma. Implement it as `visibleWhen` per the metadata.
- **API default vs metadata:** Show Urgency Indicator defaults to true, yet the metadata says false is "what most entries in a list should use". Consider defaulting to false.
- **Metadata vs extracted:** Read=true also switches the title from `label/large` to `body/medium` (and drops the group indicator layer), contradicting "Nothing else changes" and "Title uses label/large".
- **Dependency overrides:** the unread dot overrides Notification Indicator's fill (`interactive/destructive/background/default` → `interactive/primary/background/default`). Code needs a recolour hook, or the item draws its own dot.
- **Dependency overrides:** the urgency indicator swaps Icon Indicator's fixed clock glyph for `important-notification` and its `foreground/secondary` fill for `interactive/destructive/background/default`, against that spec's "fixed meaning". Either Icon Indicator gains glyph/tone inputs or the item draws its own.
- **Slot preferred values:** Action Slots allows only Button, Icon and an unresolvable set (key aee1f4fe89a3f70a26978e68621194baf1271b8a). Icon as action content is odd; the metadata mentions only Button.
- **Gaps (_Leading Visual):** Flavour=icon carries a `border/default` stroke at weight 1 with no stroke token, not mentioned in the metadata.
- **Binding drift (_Leading Visual):** root width is `control/sm` in avatar and icon, but HUG and unbound in image (renders 36). Use `control/sm` for all three.

**Note**
- Header wrapper "Frame 1" around the unread dot has an unbound gap of 10 (inert, one child) and an unnamed layer.
- Group indicator: only bottom corners bound to `radius/md`; it sits at y = card height, hanging below the card; fixed width 336 with a CENTER constraint, so "width less 24" holds only at the default 360.
- Avatar renders at 32 inside the 36 slot (Size=xxsmall); the "36 square" is the slot.
- Body and filename are not Figma properties; "Only the title, attachment and timestamp are parameterized" refers to attachment visibility. Both must be inputs in code.
- Title, Time Stamp and Action Slots are not in the Property Breakdown (covered under Content & Slot); Flavour is swap-only.
- Glyph fills on nested Icons are unbound → currentColor. Icon family is bound to the `shape` token (rounded by default).
- `stroke/base` resolves to zero, matching the metadata's "zero weight" border hook.
- No motion defined (stated). Neither component set has a Figma description; the Component Details cards carry it.
