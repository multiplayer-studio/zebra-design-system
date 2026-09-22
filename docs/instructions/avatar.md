# Avatar

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-6017&m=dev

## Avatar

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-6017&m=dev

### Overview

A visual representation of a user or entity, shown as a photo, initials, or icon, with an optional status indicator. Available in nine sizes, from xxxsmall to xxxlarge. Content type isn't an exposed property, swap the nested Avatar Type instance directly to change it. For a notification count on an icon or nav item, use the Notification Indicator component instead, Avatar's own indicator is for presence, not counts.

### Property Breakdown

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| Size | xxxsmall | true | 24×24px, the smallest size, for dense inline contexts like compact tables or comment threads. |
| Size | xxsmall | - | 32×32px, a step up from xxxsmall, still compact, for dense lists. |
| Size | xsmall | - | 36×36px, for secondary avatars in tight layouts, like a stacked group of collaborators. |
| Size | small | - | 40×40px, for list rows and menu items where the avatar sits alongside text. |
| Size | medium | - | 48×48px, a balanced, general-purpose choice for cards and list headers. |
| Size | large | - | 64×64px, for emphasis in a card header or a comment's author avatar. |
| Size | xlarge | - | 80×80px, for a prominent single avatar, like a user menu or account switcher. |
| Size | xxlarge | - | 120×120px, for profile headers where the avatar is a focal point. |
| Size | xxxlarge | - | 200×200px, the largest size, for full profile pages or standalone display contexts. |
| Show Close | true | true | Shows a dismiss badge pinned to the top-right corner. Use in removable contexts, like a multi-select chip list. |
| Show Close | false | - | Hides the dismiss badge. The default for most read-only contexts where the avatar isn't removable. |
| Show Status | true | true | Shows a presence badge pinned to the bottom-right corner, defaults to Available. Swap the nested Status instance to show a different presence state, it isn't an exposed property. |
| Show Status | false | - | Hides the presence badge. Use when presence doesn't apply, like a generic entity avatar or a purely illustrative photo. |
| Show Ring | true | true | Shows a border/default outline ring around the avatar, weight scales with Size. |
| Show Ring | false | - | Hides the ring. Use on backgrounds where the outline competes with surrounding content. |

### States & Triggers

| State | Trigger | Duration | What changes |
| --- | --- | --- | --- |
| Static | — | — | Avatar has no hover, pressed, or focus states in Figma. Close and Status are static badges, whatever click behavior Close has in a real interface lives in code, not modeled here. |

### Behavior & Motion Intent

| Type | Description |
| --- | --- |
| Motion | None modeled in Figma. Avatar is presented as a static graphic, any transition when swapping Size, content, or toggling Show Close, Show Status, or Show Ring lives in code. |

### Content & Slot

| Property | Type | Description |
| --- | --- | --- |
| Content type | fixed per instance | Initials, photo, or icon. Not an exposed property, swap the nested Avatar Type instance directly to change it. |
| Swatch color | fixed per instance, 7 options | Background color behind initials or an icon (purple, blue, sea, yellow, orange, green, burgundy, using chart/series tokens). Not used behind a photo. Swap the nested Swatch instance directly. |
| Photo | instance swap, 40 named options | Used only when Content type is photo, fills the circle. Swap the nested Photo instance to any of the named photos in _Avatar Photos. |
| Status | fixed per instance, 6 presence options | Available (default), Away, Busy, DND, On Shift, or Offline. Not an exposed property, swap the nested Status instance directly. Only shown when Show Status is true. |

### Anatomy

- Anatomy
- 1.
- 2.
- 4.
- 3.
- Avatar Type
- Fills the frame, auto-positioned. Holds initials with a colored swatch, a photo, or an icon with a colored swatch. Not an exposed property, swap the nested instance directly
- Ring
- An absolute-positioned outline matching the frame's edges. border/default color, stroke only. Weight scales with Size, 2px from xxxsmall to medium up to 8px at xxxlarge
- Close
- Pinned to the top-right corner. An instance of the Status Indicator component's Close variant, shown or hidden with Show Close
- Status
- Pinned to the bottom-right corner, defaults to Available. Shown or hidden with Show Status, swap the nested instance to change the presence state

### How to use

**Do:**
- Match Size to context, dense lists and tables call for the smaller sizes (xxxsmall to small), profile headers and standalone display call for the larger ones (xlarge to xxxlarge).
- Turn off Show Status for generic entities or purely illustrative photos where presence doesn't apply.

**Don't:**
- Don't use the presence Status badge for unread or notification counts, that's a different purpose, use the Notification Indicator component instead.

### Accessibility & Content Guidelines

- Purely visual, an avatar image or initials alone don't convey a name, pair it with visible text or provide an accessible name in code
- The Status presence badge is color-only (Available, Away, Busy, DND, On Shift, Offline), pair it with a text label or tooltip in code so presence isn't conveyed by color alone
- The Close badge implies a dismiss action, give it an accessible name in code like "Remove [name]", Figma has no interactive state for it

### Layout & Theming Intents

| Property | Type | Description |
| --- | --- | --- |
| Size | Fixed per Size | Always a fixed square, 24px to 200px across nine steps, not resizable independent of the Size property. |
| Ring weight | Fixed per Size tier | 2px (stroke/thick) from xxxsmall to medium, 4px (stroke/heavy) at large and xlarge, 6px and 8px (not bound to a token) at xxlarge and xxxlarge. |
| Close and Status position | Fixed | Pinned to the top-right and bottom-right corners respectively via corner constraints. They scale in position as the avatar resizes but don't move independently. |
| Color | Theming | Ring uses border/default. Status and Swatch colors use chart/series, chart/positive, and chart/negative tokens. All resolve separately for light and dark mode. |

### Layer structure

- Avatar (COMPONENT)
  - Avatar/Avatar Type (INSTANCE)
  - Avatar/Ring (ELLIPSE)
  - Avatar/Close (INSTANCE)
  - Avatar/Status (INSTANCE)

### Resolved tokens (default variant: Size=xxxsmall)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| Avatar/Ring | stroke[0] | #ced2db | border.default |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Size | xxsmall | Avatar | cornerRadius | radius.none |

## _Avatar Swatch

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-6017&m=dev

### Layer structure

- _Avatar Swatch (COMPONENT)
  - _Avatar Swatch/swatch (ELLIPSE)

### Resolved tokens (default variant: Color=purple)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _Avatar Swatch/swatch | fill[0] | #7e0cff | chart.series.4 |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Color | blue | _Avatar Swatch/swatch | fill[0] | chart.series.1 |
| Color | sea | _Avatar Swatch/swatch | fill[0] | chart.series.9 |
| Color | yellow | _Avatar Swatch/swatch | fill[0] | chart.series.7 |
| Color | orange | _Avatar Swatch/swatch | fill[0] | chart.series.11 |
| Color | green | _Avatar Swatch/swatch | fill[0] | chart.series.6 |
| Color | burgundy | _Avatar Swatch/swatch | fill[0] | chart.series.5 |

## _Avatar Photos

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-6017&m=dev

### Layer structure

- _Avatar Photos (COMPONENT)
  - _Avatar Photos/Photo (ELLIPSE)

### Resolved tokens (default variant: Name=Ophelia McKenna)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |

## _Avatar Type

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-6017&m=dev

### Layer structure

- _Avatar Type (COMPONENT)
  - _Avatar Type/Swatch (INSTANCE)
  - _Avatar Type/AA (TEXT)
  - _Avatar Type/Photo (INSTANCE)
  - _Avatar Type/Icon (INSTANCE)

### Resolved tokens (default variant: Type=initials)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _Avatar Type/AA | fill[0] | #ffffff | — |
| _Avatar Type/AA | fontSize | 16 | body.medium \| label.large |
| _Avatar Type/AA | lineHeight | 24 | body.medium \| label.large |
| _Avatar Type/AA | letterSpacing | 0 | body.medium \| label.large |

## _Status Indicator

Source: https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2364-6017&m=dev

### Layer structure

- _Status Indicator (COMPONENT)
  - _Status Indicator/Fill (ELLIPSE)
  - _Status Indicator/Void (VECTOR)
  - _Status Indicator/Icon (INSTANCE)
  - _Status Indicator/Custom Icon (INSTANCE)

### Resolved tokens (default variant: Status=Available)

| Layer | Field | Raw | Token |
| --- | --- | --- | --- |
| _Status Indicator/Fill | fill[0] | #00864f | chart.positive |
| _Status Indicator/Void | fill[0] | #f8fbff | foreground.inverse |

### Token changes by property

| Property | Value | Layer | Field | Token |
| --- | --- | --- | --- | --- |
| Status | Away | _Status Indicator/Fill | fill[0] | chart.series.8 |
| Status | Busy | _Status Indicator/Fill | fill[0] | chart.negative |
| Status | DND | _Status Indicator/Fill | fill[0] | chart.series.4 |
| Status | On Shift | _Status Indicator/Fill | fill[0] | chart.series.1 |
| Status | Offline | _Status Indicator/Fill | fill[0] | foreground.inverse |
| Status | Offline | _Status Indicator/Void | fill[0] | foreground.secondary |
| Status | Close | _Status Indicator/Fill | fill[0] | chart.series.12 |
| Status | Icon | _Status Indicator/Fill | fill[0] | chart.series.1 |
