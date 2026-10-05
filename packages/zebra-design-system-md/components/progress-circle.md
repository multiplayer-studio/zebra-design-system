# Component: Progress Circle

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Progress Circle |
| **Category** | Feedback |
| **Functional Role** | A circular indicator for ongoing or measured progress in compact spaces, optionally with a percent value or a stop control at its center (upload use). |
| **Usage Restrictions** | Not for long labels or multiple concurrent tasks; use the progress bar. |

Variant axes:

| Part | Axis | Values |
|:---|:---|:---|
| **Circle** | Size | xxsmall, xsmall, small, medium, large |
| **Circle** | Rounded | true, false |
| **Upload Center** | Stop | false (percent value), true (stop button) |

Optional parts: track visibility, upload center.

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Square bounding area | Fixed square per size | Required |
| **Track** | Full ring background | Subtle ring | Optional |
| **Indicator** | Progress arc | Accent ring segment; rounded or flat ends | Required |
| **Upload Center** | Value or control inside the ring | Percent text, or a circular stop button | Optional |
| **Stop Button Icon** | Cancels the task | Close glyph in a circular icon button | Required when Stop = true |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Indicator Color** | `color.foreground.link` | Accent progress color |
| **Track Color** | `color.border.subtle` | Neutral remaining ring |
| **Info Ring Color** | `color.border.info` | Info-tinted ring |
| **Ring Thickness** | `size.stroke.heavy` | Ring weight |
| **Corner Radius** | `size.radius.none` | No box rounding |
| **Center Value Typography** | `typography.indicator.medium` | Percent value text |
| **Stop Button Background** | `color.interactive.neutral.background.hover` | Circular button fill |
| **Stop Button Border Width** | `size.stroke.base` | No visible border |
| **Stop Button Border Color** | `color.interactive.neutral.border.default` | Border definition |
| **Stop Button Radius** | `size.radius.pill` | Circular shape |
| **Stop Button Padding** | `size.space.xs` | Space around glyph |
| **Stop Icon Size** | `size.control.icon.sm` | Close glyph |
| **Stop Icon** | Icon `Close` | Cancel action |

---

## 4. Interactive State Matrix

Only the Stop button is interactive, and The design defines one visual for it.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Progress Circle (non-interactive)** | None | None | `color.foreground.link` | Ring animates or fills with progress |
| **Stop Button (Stop=true)** | `color.interactive.neutral.background.hover` | `color.interactive.neutral.border.default` | `color.foreground.primary` | Cancels the task |
| **Percent Value (Stop=false)** | None | None | `color.foreground.primary` | Shows the current value |

Rounded true gives round ring ends; Rounded false gives flat ring ends.

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` for the Stop button hit area | Five sizes, xxsmall to large | `size.space.*` |
| **Tablet** | `size.control.target.min` for the Stop button hit area | Five sizes, xxsmall to large | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` for the Stop button hit area | Five sizes, xxsmall to large | `size.space.*` |

The Stop button is visually smaller than the minimum target, so its hit area must extend to `size.control.target.min`.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | SC 1.4.11 (Non-text Contrast, 3:1) | The indicator must hold 3:1 against the track and surface in both themes. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | The Stop button has no focused state in the design. Per global rules, a 2px ring in `color.focus.ring` must show on it. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Stop button hit bounds must not fall below `size.control.target.min`. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Expose a progress name and value; the Stop button needs an explicit name such as cancel. |

---

## Token gaps

- The five circle sizes (24, 36, 40, 48, 64 in Figma) have no matching `size.control.*` keys; none are cited.
- Center value text color is a hardcoded black in Figma; `color.foreground.primary` is the closest key.
- Ring layers bind `foreground/link`, `border/subtle`, `border/info` and `stroke/heavy`; the role of `border.info` in the ring is unclear.
