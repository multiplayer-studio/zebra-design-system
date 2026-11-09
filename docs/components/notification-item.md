# Notification Item

> A single entry in a notification list, carrying who or what it came from, a title and message, an optional attachment, and an action. Read is the only variant and decides whether the entry still looks unseen. Everything else is a toggle, so a single component covers the range a real list throws at it.

**Implementations:** `@zebra-design-system/react-baseui` · `@zebra-design-system/web-components` · `@zebra-fed/zeta-web` (`<zeta-notification-item>`)

## API

| Prop | Type | Default | Values | Notes |
|---|---|---|---|---|
| `read` | enum | `false` | `false` `true` |  |
| `group` | boolean | `false` |  | Wired only in Read=false; Read=true has no group indicator layer, so the prop does nothing there. |
| `showAttachment` | boolean | `true` |  |  |
| `showActions` | boolean | `true` |  |  |
| `showUrgencyIndicator` | boolean | `true` |  | Defined on the set but bound to no layer in either variant: the urgency indicator is always visible in Figma. Implement visibleWhen from the intent below; see issues. |
| `title` | string | `Urgent Message` |  |  |
| `timestamp` | string | `Just now` |  |  |
| `actions` | slot | `one Button (Size=small, Shape=rounded, Flavour=outline, label "User Action")` |  |  |

## When and how to use

### Do

- Keep the title to the event and the body to the detail. The body truncates, so the title has to carry the meaning on its own.
- Switch off the rows you have no content for. An empty attachment row reads as a failed load rather than an absence.

### Don't

- Don't rely on Group on a read entry. The bar appears only while the entry is unread.
- Don't use Read as a general status. It carries two values, and anything past seen and unseen needs another mechanism.

## States

| State | Trigger | What changes |
|---|---|---|
| Static | — |  |
| Read | Read |  |
| Grouped | Group set to true |  |

## Behaviour

- **Motion** — No transition is defined. Marking an entry read is a fill disappearing, with nothing specified between the two states.
- **Height** — The card hugs its content. Hiding the attachment takes some space off and hiding the actions takes a small button height off, and because both sit in the same column the two shorten it independently.
- **Grouping** — The group bar appears on unread entries only, so the grouping affordance applies while an entry is still unseen.

## Content

| Part | Kind | Guidance |
|---|---|---|
| Action Slots | slot, one Button by default | Holds whatever the entry offers to do and fills the width of the content column. It takes a single Button by default. |
| Leading Visual | Flavour=avatar | A person, and the default. Carries an Avatar at Size=xxsmall with its own Status, Ring and Close turned off, so only the face or initials shows. Flavour belongs to the leading visual rather than to the notification, so it is decided where the visual is supplied. |
| Leading Visual | Flavour=image | Something with artwork of its own, such as a product or a file preview. The artwork is the slot's background rather than a separate element inside it. |
| Leading Visual | Flavour=icon | A system or category source with neither a face nor artwork. It tells entries apart least well of the three, so it is the fallback rather than the first choice. |
| Title and timestamp | text inputs | The two pieces of text the component takes. Title carries what happened and defaults to Urgent Message, Time Stamp carries when and defaults to Just now. |
| Body and filename | not parameterised | The message body is part of the component's content rather than inputs it accepts. Only the title, attachment and timestamp are parameterized. |

## Layout & theming

| Property | Sizing | Guidance |
|---|---|---|
| Size | Fixed width, hug height | 360 wide, and 164 tall with every row shown. Hiding the attachment takes it to 140 and hiding the actions to 120. |
| Padding and gap | Fixed | space/gutter top and bottom, space/card left and right, with a space/sm gap between the leading visual and the content column. |
| Radius | Fixed | radius/md on all four corners, identical on both variants. There is no shape property. |
| Fill | Per Read | surface/card when Read is false. Read=true carries no fill at all. |
| Border | Theming | A stroke bound to border/default sits on both variants at zero weight. The weight is a theming hook rather than an omission, so a high-contrast variable set can give every main component a hard outline, including elements that carry none by default. |
| Group Indicator | Fixed, absolute | Component width less 24 by 4 height, centered and pinned to the bottom edge, filled with border/focus and rounded to radius/md. Being absolute it does not affect the card's height. |
| Leading Visual | Fixed | 36 square on all three flavours, with radius/pill on every one so the slot is always circular. The Avatar sits at Size=xxsmall and the Icon at Size=medium, both centered inside the frame. |
| Type | Theming | Title uses label/large and Body body/small, both over foreground/primary. Timestamp is label/small over foreground/tertiary and the attachment filename label/small over foreground/link. |

## Accessibility

- Unread is carried by a fill and a small dot, both visual only. The unread state has to be exposed in the markup as well.
- The notification has no focus state of its own. Only the Button in the action slot is focusable by default, so reaching the entry itself comes from code.
- The border sits at zero weight by default and is bound to border/default, so a high-contrast theme can raise it to a hard outline. At the default weight an entry is bounded by its fill and the spacing around it.
- The leading visual carries no text in any of its three flavours, and on the image flavour the artwork is a background rather than an element of its own. The source has to be named in the title or described alongside the image.
- The urgency indicator is an icon with no text. It needs a name, or the urgency is invisible to anyone not seeing the glyph.
- The body truncates rather than wrapping on. The full message has to be reachable some other way.

---
*Generated from `specs/notification-item` — do not edit by hand. Theming: put `mode-dark`, `ext-companion`, `ext-target` or `bp-*` classes on any ancestor (Zeta Web uses `data-theme`/`data-brand` attributes instead).*
