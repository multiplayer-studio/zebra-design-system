# Component: Progress Bar

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Progress Bar |
| **Category** | Feedback |
| **Functional Role** | A horizontal bar showing how far a task has progressed, or that work is ongoing when length is unknown. |
| **Usage Restrictions** | Not for tasks with no visible duration at all; use a single status message. Use the circular indicator for compact or inline spaces. |

Variant axes:

| Axis | Values |
|:---|:---|
| **Progress** | 0%, 25%, 50%, 100%, Indeterminate, Buffering |
| **Shape** | rounded, sharp |
| **Size** | small, medium |

Optional parts: label, right-hand details area, and track visibility.

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Stacks details above the bar | Full-width column | Required |
| **Details Row** | Holds label and extra details | Single row | Optional |
| **Label** | Percent or status text | Secondary text, for example a percent complete value | Optional |
| **Trailing Slot** | Extra detail content | Consumer-supplied accessory | Optional |
| **Indicator Group** | Bounds the bar | Rounded or sharp corners, small or medium thickness | Required |
| **Track** | Full-length background | Subtle filled bar | Optional |
| **Indicator** | Completed portion | Accent-filled bar, length proportional to progress | Required |
| **Buffer Segment** | Loaded-ahead portion (Buffering) | Translucent fill between indicator and end | Present only when Progress = Buffering |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Indicator Fill** | `color.foreground.link` | Accent progress color |
| **Track Fill** | `color.border.subtle` | Neutral remaining length |
| **Label Typography** | `typography.label.medium` | Details text |
| **Label Text Color** | `color.foreground.secondary` | Supporting text |
| **Bar-Details Gap** | `size.space.lg` | Separation of label from bar |
| **Bar Internal Gap** | `size.space.none` | Track and indicator overlap |
| **Corner Radius (rounded)** | `size.radius.sm` | Soft bar ends |
| **Corner Radius (sharp)** | `size.radius.none` | Square bar ends |
| **Trailing Slot Gap** | `size.space.xs` | Spacing of accessory items |

---

## 4. Interactive State Matrix

The progress bar is not interactive and has no hover, pressed, focused or disabled states in the design. States below are the Progress values.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **0%** | `color.border.subtle` (track) | None | `color.foreground.link` (empty indicator) | Track only |
| **25% / 50%** | `color.border.subtle` (track) | None | `color.foreground.link` | Indicator fills the matching share of the track |
| **100%** | `color.border.subtle` (track) | None | `color.foreground.link` | Indicator fills the whole track |
| **Indeterminate** | `color.border.subtle` (track) | None | `color.foreground.link` | Indicator segment signals ongoing work of unknown length |
| **Buffering** | `color.border.subtle` (track) | None | `color.foreground.link` | Indicator plus a translucent buffered segment ahead of it |

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | Not interactive | Small or medium thickness, full available width | `size.space.*` |
| **Tablet** | Not interactive | Small or medium thickness, full available width | `size.space.*` |
| **Desktop / POS** | Not interactive | Small or medium thickness, full available width | `size.space.*` |

Bar thickness has two sizes, small and medium. The design does not bind thickness to a size key.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | SC 1.4.11 (Non-text Contrast, 3:1) | Indicator must hold 3:1 against the track in both themes. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Expose a name, the current value for determinate states, and an indeterminate flag for Indeterminate and Buffering. |
| **Non-color Status** | SC 1.4.1 (Use of Color) | Progress is conveyed by length and by the text label, not color alone. |
| **Status Messages** | SC 4.1.3 (Status Messages) | Value changes and completion must be announced without moving focus. |

---

## Token gaps

- Bar thickness (small, medium) is not bound to a Figma variable and has no size key.
- Buffering uses a translucent fill bound to a Figma variable `surface/subtle`; no `color.surface.subtle` key exists in tokens.json.
- The Indicator uses `color.foreground.link` in Figma, which is a foreground key used as a fill; no dedicated progress fill key exists.
