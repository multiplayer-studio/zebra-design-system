# Component: Radio Button

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Radio Button |
| **Category** | Data Entry |
| **Functional Role** | Lets a user choose exactly one option from a mutually exclusive set, with an optional text label. |
| **Usage Restrictions** | Not for multi-select (use Checkbox). Needs at least two options in a group. No small size is provided in design. |

**Variant axes:**

| Axis | Values |
|:---|:---|
| **Checked** | false, true |
| **State** | enabled, hover, focus, disabled (disabled appears for unchecked only) |
| **Size** | large, medium |
| **Label** | shown or hidden |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Hit Area** | Interactive bounds | Square region with no fill | Required |
| **Control Glyph** | Selection indicator | Icon glyph `Radio Button Unchecked` or `Radio Button Checked` | Required |
| **Focus Ring** | Keyboard focus marker | Fully rounded stroke around the glyph | Shown in focus state |
| **Label** | Option description | Text | Optional |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Hit Area Background** | `color.interactive.ghost.background.default` | Transparent |
| **Glyph Rest Color** | selection border default (see Token gaps) | Unchecked ring colour |
| **Glyph Hover Color** | selection hover (see Token gaps) | Hover emphasis |
| **Glyph Disabled Color** | selection disabled (see Token gaps) | Inactive |
| **Focus Ring Color** | `color.border.focus` | Focus visibility |
| **Focus Ring Width** | `size.stroke.thick` | Prominent ring |
| **Focus Ring Radius** | `size.radius.pill` | Round ring |
| **Label Typography** | `typography.body.medium` | Option text |
| **Label Color** | `color.foreground.primary` | Readable text |
| **Label Color (disabled)** | `color.foreground.disabled` | Inactive text |
| **Control to Label Gap** | `size.space.none` | Label sits directly beside the hit area |
| **Hit Area Size** | `size.control.target.min` | Minimum touch target |

---

## 4. Interactive State Matrix

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Enabled (Rest)** | `color.interactive.ghost.background.default` | selection border default (gap) | `color.foreground.primary` | Baseline; checked shows filled glyph |
| **Hover** | `color.interactive.ghost.background.default` | selection border hover (gap) | `color.foreground.primary` | Pointer over control; checked and unchecked both darken |
| **Focus** | `color.interactive.ghost.background.default` | `color.border.focus` at `size.stroke.thick` | `color.foreground.primary` | Keyboard or scanner focus ring |
| **Disabled** | `color.interactive.ghost.background.default` | selection border disabled (gap) | `color.foreground.disabled` | Inactive; suppress all interactions |

Checked and unchecked differ by glyph shape, not colour alone.

---

## 5. Form-Factor Scaling & Sizing

| Size | Glyph | Hit Area |
|:---|:---|:---|
| **Large** | Larger glyph | `size.control.target.min` |
| **Medium** | Smaller glyph | `size.control.target.min` |

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

**Token gaps:** Figma binds `interactive/selection/border/{default,hover,disabled}`, but no `color.interactive.selection.*` keys exist in tokens.json (only `color.selection.background|border|text`). Not mapped to avoid a guess. Control glyph size has no distinct token resolved for large versus medium.
