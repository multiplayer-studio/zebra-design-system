# Component: Checkbox

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Checkbox |
| **Category** | Data Entry |
| **Functional Role** | Lets a user toggle an independent option on or off, or show a partial selection of a group, with an optional text label. |
| **Usage Restrictions** | Not for mutually exclusive choices (use Radio Button). No small size is provided in design. |

**Variant axes:**

| Axis | Values |
|:---|:---|
| **Checked** | false, true |
| **Indeterminate** | false, true (indeterminate is paired with unchecked) |
| **State** | enabled, hover, disabled |
| **Shape** | sharp, rounded |
| **Size** | large, medium |
| **Label** | shown or hidden |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Hit Area** | Interactive bounds | Square region with no fill | Required |
| **Box** | Selection container | Stroked square; filled when checked or indeterminate | Required |
| **Mark** | Selection glyph | Icon glyph `Check Mark` when checked; `Remove` when indeterminate | Shown when checked or indeterminate |
| **Label** | Option description | Text | Optional |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Box Background (unchecked)** | `color.interactive.ghost.background.default` | Transparent |
| **Box Border Width** | `size.stroke.thick` | Prominent box outline |
| **Box Border / Fill (unchecked, checked, hover, disabled)** | selection tokens (see Token gaps) | Selection colouring |
| **Corner Radius, sharp** | `size.radius.none` | Square corners |
| **Corner Radius, rounded** | `size.radius.xs` | Slightly softened corners |
| **Mark Color (checked)** | `color.foreground.inverse` | Contrast on filled box |
| **Mark Size (indeterminate, medium)** | `size.control.icon.sm` | Glyph bounds |
| **Mark Size (checked, large)** | `size.control.icon.md` | Glyph bounds |
| **Box Inner Padding (unchecked)** | `size.space.2xs` | Space inside box |
| **Hit Area Size** | `size.control.target.min` | Minimum touch target |
| **Label Typography** | `typography.body.medium` | Option text |
| **Label Color** | `color.foreground.primary` | Readable text |
| **Label Color (disabled)** | `color.foreground.disabled` | Inactive text |
| **Control to Label Gap** | `size.space.none` | Label sits directly beside the hit area |

---

## 4. Interactive State Matrix

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Enabled, unchecked** | `color.interactive.ghost.background.default` | selection border default (gap) | Label `color.foreground.primary` | Empty box |
| **Enabled, checked or indeterminate** | selection background pressed (gap) | selection border pressed (gap) | Mark `color.foreground.inverse` | Filled box with check mark or minus |
| **Hover, unchecked** | `color.interactive.ghost.background.default` | selection border hover (gap) | `color.foreground.primary` | Border darkens |
| **Hover, checked or indeterminate** | selection background hover (gap) | selection border hover (gap) | Mark `color.foreground.inverse` | Fill darkens |
| **Disabled** | selection background disabled (gap, when checked or indeterminate) | selection border disabled (gap) | `color.foreground.disabled` | Inactive; suppress all interactions |

The design has no focus state for Checkbox. Keyboard focus must still show `color.border.focus` at `size.stroke.thick` (see Section 6).

---

## 5. Form-Factor Scaling & Sizing

| Size | Box | Hit Area |
|:---|:---|:---|
| **Large** | Larger box | `size.control.md` (at least `size.control.target.min`) |
| **Medium** | Smaller box (check mark uses a smaller glyph) | `size.control.md` (at least `size.control.target.min`) |

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | Large or medium | `size.space.*` |
| **Tablet** | `size.control.target.min` | Large or medium | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` | Large or medium | `size.space.*` |

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Foreground tokens must maintain verified contrast against the container background in both light and dark themes. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | A ring using `color.border.focus` at `size.stroke.thick` must surround the focused element with an offset. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Hit bounds must never fall below `size.control.target.min` on touch devices. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Must expose an unambiguous accessible name via label text or icon metadata. |

---

**Token gaps:** Figma binds `interactive/selection/{background,border}/{default,hover,pressed,disabled}`; no `color.interactive.selection.*` keys exist in tokens.json (only `color.selection.*`). Not mapped. Icon `Check Mark` for the checked glyph was inferred (the checked variant glyph was not isolated); `Remove` is confirmed for indeterminate.
