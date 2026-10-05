# Component: Navigation Bar

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Navigation Bar |
| **Category** | Navigation |
| **Functional Role** | A bottom-anchored bar of icon-and-label destinations for switching between top-level areas. May include a trailing primary action and a divider separating item groups. |
| **Usage Restrictions** | Not for in-page view switching (use Tab Bar). Keep destinations few and of equal weight. |

**Variant axes in the source design**

| Axis | Component | Values |
|:---|:---|:---|
| **Shrink Items** | Navigation Bar | true (items hug content), false (items spread evenly across the bar) |
| **Spacer** | Navigation Bar | true (leading group and trailing group pushed apart), false |
| **Show Divider** | Navigation Bar | true (divider between groups; requires spacer), false |
| **Action Slot** | Navigation Bar | shown or hidden |
| **Active** | Navigation Item | false, true |
| **Disabled** | Navigation Item | false, true |
| **Notification Badge** | Navigation Item | shown or hidden (small dot) |

Documented combinations: shrink + no spacer, no shrink + no spacer, shrink + spacer, shrink + spacer + divider.

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Bar boundary | Top edge stroke | Required |
| **Item Group** | Holds navigation items | Group, horizontal axis | Required |
| **Trailing Item Group** | Second item group, used with spacer | Group, horizontal axis | Optional |
| **Divider** | Separates item groups | Vertical line inset from the bar top and bottom edges | Optional |
| **Navigation Item** | One destination | Indicator above Label | Required |
| **Indicator** | Item glyph area | Icon glyph (icon `Star` shown as placeholder) | Required |
| **Notification Dot** | Unread marker at top trailing corner of glyph | Small filled circle | Optional |
| **Label** | Destination name | Text | Required |
| **Action Slot** | Trailing primary action | Compact filled action with text label | Optional |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Container Top Edge** | `color.border.default` with `size.stroke.thin` | Structural separation |
| **Item Label Typography** | `typography.body.small` | Destination text |
| **Item Label Color (rest)** | `color.foreground.primary` | Readable content |
| **Item Label Color (active)** | `color.interactive.subtle.foreground.default` | Selection emphasis |
| **Item Label Color (disabled)** | `color.interactive.subtle.foreground.disabled` | Inactive text |
| **Item Glyph Size** | `size.control.icon.md` | Glyph size |
| **Item Horizontal Padding** | `size.space.lg` | Edge padding |
| **Item Vertical Padding** | `size.space.sm` | Vertical padding |
| **Item Inner Gap** | `size.space.sm` | Gap between glyph and label |
| **Notification Dot Fill** | `color.interactive.destructive.background.default` | Alert fill |
| **Notification Dot Shape** | `size.radius.pill` | Circular |
| **Notification Dot Edge** | `size.stroke.base` with `color.border.inverse` | Perimeter |
| **Divider Inset** | `size.space.sm` | Divider vertical inset |
| **Divider Color** | `color.border.default` | Group separation |
| **Action Padding** | `size.space.lg` leading offset; `size.space.md` horizontal, `size.space.xs` vertical | Action placement |
| **Action Background** | `color.interactive.primary.background.default` | Primary fill |
| **Action Border** | `color.interactive.primary.border.default` with `size.stroke.base` | Perimeter |
| **Action Corner Radius** | `size.radius.element.sm` | Edge rounding |
| **Action Label** | `typography.label.medium`, `color.interactive.primary.foreground.default` | Action text |

---

## 4. Interactive State Matrix

States apply to the Navigation Item.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | None | None | `color.foreground.primary` | Baseline appearance |
| **Active** | None | None | `color.interactive.subtle.foreground.default` | Current destination; label emphasized |
| **Disabled** | None | None | `color.interactive.subtle.foreground.disabled` | Inactive; suppress all interactions |
| **Hover** | Not defined in design | | | |
| **Pressed** | Not defined in design | | | |
| **Focused** | None | 2px solid `color.focus.ring` | `color.foreground.primary` | Keyboard focus (guardrail; not drawn in the design) |

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | Item height exceeds target minimum | `size.space.*` |
| **Tablet** | `size.control.target.min` | Item height exceeds target minimum | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` | Item height exceeds target minimum | `size.space.*` |

When items do not shrink, they distribute across the full bar width. With a spacer, groups pin to opposite ends.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Label tokens must keep contrast against the bar surface in both themes. |
| **Use of Color** | SC 1.4.1 (Use of Color) | Active item is not distinguished by color alone; pair with a distinct glyph treatment. Notification dot needs a text equivalent. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | A 2px ring using `color.focus.ring` surrounds the focused item with minimum 2px offset. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Items and the action are at least `size.control.target.min`. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Each item exposes its label, active state and unread status. |

---

## Token gaps

- Navigation Item height has no size token.
- Action height has no size token.
- The bar background fill is not bound to a variable in Figma; none is specified here.
- Active label uses `interactive/subtle/foreground/default` in Figma (no `selected` foreground key exists).
- Active glyph treatment differs from rest in Figma but is not bound to a variable.
