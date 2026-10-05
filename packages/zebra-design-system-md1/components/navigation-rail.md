# Component: Navigation Rail

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Navigation Rail |
| **Category** | Navigation |
| **Functional Role** | A vertical strip of destinations used for persistent, top-level navigation. It can be collapsed to icons only, collapsed with labels, or expanded to show full labels and nested destinations. |
| **Usage Restrictions** | Not for small single-column handheld layouts, where bottom-anchored navigation applies. Do not nest beyond one sub-level. |

Variant axes:

| Part | Axis | Values |
|:---|:---|:---|
| **Rail** | Label | false, true |
| **Rail** | Expanded | false, true |
| **Rail Item** | State | default, hover, active, selected |
| **Rail Item** | Disabled | false, true |
| **Rail Item** | Expanded | false, true |
| **Group Item (Expanded Rail)** | State | default, hover, active, selected |
| **Group Item (Expanded Rail)** | Disabled | false, true |
| **Group Item (Expanded Rail)** | Nested | false, true |
| **Rail Header** | Type | avatar, logo |
| **Rail Header** | Expanded | false, true |
| **Section Heading** | Type | default, sub page |
| **Group Disclosure Indicator** | Open | false, true |
| **Group Disclosure Indicator** | Direction | vertical, horizontal |
| **Group** | Open | false, true |

Rail configurations present: Label=false/Expanded=false (icons only), Label=true/Expanded=false (icon plus short label), Label=false/Expanded=true (full width with labels).

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Rail surface spanning full height | Solid fill, edge stroke, square corners | Required |
| **Header Slot** | Identity at the top of the rail | Avatar or logo, collapsed or expanded | Optional |
| **Item List** | Group of destinations, vertical axis | Sequence of rail items and groups | Required |
| **Item Container** | Hit area of one destination | Transparent fill that changes by state, small corner radius | Required |
| **Leading Icon** | Identifies the destination | Icon glyph | Required |
| **Label** | Destination name | Text; shown when Label is true or the rail is expanded | Required when Label = true or Expanded = true |
| **Section Heading** | Names a group of destinations | Secondary text, default or sub page type | Optional |
| **Group Disclosure Indicator** | Shows whether a group is open | Chevron glyph, vertical or horizontal direction, open or closed | Optional |
| **Nested Items** | Sub-destinations of a group | Indented rail items, only in the expanded rail | Optional |
| **Count Indicator** | Small count or badge text on an item | Small indicator text | Optional |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Rail Background** | `color.surface.section` | Rail canvas |
| **Rail Edge Stroke** | `color.border.default` | Separates rail from content |
| **Rail Edge Stroke Width** | `size.stroke.thin` | Hairline separation |
| **Rail Corner Radius** | `size.radius.none` | Flush with the screen edge |
| **Rail Internal Padding** | `size.space.lg` | Space between edge and items |
| **Item Stack Gap** | `size.space.xs` | Space between destinations |
| **Item Background (rest)** | `color.interactive.ghost.background.default` | Transparent at rest |
| **Item Height** | `size.control.lg` | Destination row height |
| **Item Corner Radius** | `size.radius.sm` | Soft item edge |
| **Item Horizontal Padding** | `size.space.lg` | Padding around icon and label |
| **Icon-Label Gap** | `size.space.sm` | Space between icon and label |
| **Icon Size** | `size.control.icon.sm` | Destination glyph |
| **Label Typography** | `typography.label.medium` | Destination name |
| **Label Text Color** | `color.interactive.neutral.foreground.default` | Readable content |
| **Section Heading Color** | `color.foreground.secondary` | De-emphasised heading |
| **Count Indicator Typography** | `typography.indicator.medium` | Compact count text |
| **Nested Indent** | `size.space.xl` | Offsets nested items |
| **Group Menu Surface** | `color.surface.menu` | Surface for open group popout |
| **Header Padding** | `size.space.md` | Space around avatar or logo |
| **Header Icon Size (collapsed logo)** | `size.control.icon.lg` | Logo mark |

---

## 4. Interactive State Matrix

Applies to Rail Item and Group Item, in every Expanded and Nested configuration.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | `color.interactive.ghost.background.default` | None | `color.interactive.neutral.foreground.default` | Baseline appearance |
| **Hover** | `color.interactive.ghost.background.hover` | None | `color.interactive.neutral.foreground.default` | Pointer over item |
| **Active (Pressed)** | `color.interactive.ghost.background.pressed` | None | `color.interactive.neutral.foreground.default` | Press in progress |
| **Selected** | `color.interactive.ghost.background.default` | None | `color.interactive.ghost.foreground.default` | Current destination; icon and label use the accent color |
| **Disabled** | `color.interactive.ghost.background.default` | None | `color.foreground.disabled` | Inactive; suppress all interactions |

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | Item height `size.control.lg` | `size.space.*` |
| **Tablet** | `size.control.target.min` | Item height `size.control.lg` | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` | Item height `size.control.lg`; `size.control.sm` permitted in pointer-first layouts | `size.space.*` |

Rail width changes only by configuration (icons only, icon with label, expanded). Nested items appear only when expanded.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Foreground tokens must keep contrast against the rail background in both light and dark themes. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | The design defines no focused state. Per global rules, a 2px ring in `color.focus.ring` must surround the focused item with an offset. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Item hit bounds must never fall below `size.control.target.min`. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Icon-only items must expose their destination name. The selected item must be exposed as current, and group items must expose open or closed. |
| **Non-color Selection** | SC 1.4.1 (Use of Color) | The selected item is marked by accent color; pair it with a programmatic current-state exposure. |

---

## Token gaps

- Figma binds a hover item to a ghost hover fill and an active item to a ghost pressed fill; both exist, no gap.
- Selected foreground uses `color.interactive.ghost.foreground.default` plus `color.interactive.subtle.foreground.default` in Figma; only the ghost key is cited here.
- Figma references `chart/series/4` and `chart/positive` on the rail frames. These appear to be stray bindings with no visible role and are not specified.
- Figma binds a `border/default` stroke and `radius/element-sm` on the rail; `size.radius.element.sm` exists but `size.radius.sm` was used on items. No missing keys.
- No icon names were identified from Figma for destinations (they are consumer supplied). Disclosure chevrons map to icons `Expand More`, `Expand Less`, `Chevron Right`, `Chevron Left` (all present in icons.json); the exact glyph per Direction and Open value was not verified.
