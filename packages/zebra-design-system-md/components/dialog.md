# Component: Dialog

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Dialog |
| **Category** | Feedback |
| **Functional Role** | A focused surface that interrupts the current flow to deliver a message and request a decision. Composed of a Dialog Header, a body content area, and an optional Dialog Footer holding up to three actions. |
| **Usage Restrictions** | Not for long forms or large content (use a Modal or Sheet). The dismiss glyph is always shown in the design; the footer may be hidden via a visibility switch. Modal and dialog are separate components. |

**Variant axes:**

| Axis | Values |
|:---|:---|
| **Flavour** | default, error, info, success, warning |
| **Shape** | round, sharp |
| **Show Footer** | on, off |

Flavour only changes the header status glyph; surface, text and action tokens are identical across flavours.

**Subcomponents:** Dialog Header; Dialog Footer with an **Actions** axis of 1, 2, 3, custom (leading and trailing action slots).

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Bounding surface | Dialog fill, thin default border, corner radius per Shape | Required |
| **Header** | Title row | Status glyph, title text, dismiss glyph | Required |
| **Status Glyph** | Flavour indicator | default: `Block`; error: `Error`; info: `Info`; success: `Verified`; warning: `Warning` | Required |
| **Title** | Dialog heading | Single line title text | Required |
| **Dismiss Glyph** | Close affordance | `Close` icon | Required |
| **Body Content** | Message | Body text, wraps across lines | Required |
| **Footer** | Action row | Leading action (tertiary, text style), trailing action group (secondary outlined, primary filled) | Optional |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Container Background** | `color.surface.dialog` | Dialog canvas |
| **Container Border** | `color.border.default` with `size.stroke.thin` | Outer perimeter |
| **Corner Radius (round)** | `size.radius.element.md` | Soft corners |
| **Corner Radius (sharp)** | `size.radius.none` | Square corners |
| **Container Padding** | `size.space.md` | Inset from edge |
| **Header Padding / Gap** | `size.space.md` / `size.space.sm` | Header spacing and glyph-to-title gap |
| **Body Padding** | `size.space.md` (sides, top), `size.space.section` (bottom) | Separation from footer |
| **Title Typography** | `typography.title.large` | Heading |
| **Title and Body Text Color** | `color.foreground.primary` | Readable content |
| **Body Typography** | `typography.body.medium` | Message |
| **Header Icon Size** | `size.control.icon.md` | Glyph bounds |
| **Footer Padding / Action Gap** | `size.space.md` / `size.space.sm` | Footer spacing |
| **Tertiary Action** | `color.interactive.ghost.background.default`, `color.interactive.ghost.foreground.default`, `color.interactive.ghost.border.default`, `size.stroke.base` | Text-style action |
| **Secondary Action** | `color.interactive.neutral.background.default`, `color.interactive.neutral.foreground.default`, `color.interactive.neutral.border.default`, `size.stroke.thin` | Outlined action |
| **Primary Action** | `color.interactive.primary.background.default`, `color.interactive.primary.foreground.default`, `color.interactive.primary.border.default`, `size.stroke.base` | Confirming action |
| **Action Typography / Radius / Height** | `typography.label.large` / `size.radius.element.sm` / `size.control.md` | Action geometry |
| **Action Internal Padding** | `size.space.md` (horizontal), `size.space.xs` (vertical), `size.space.sm` (label inset) | Button padding |

---

## 4. Interactive State Matrix

The Dialog surface itself has no hover, pressed or disabled states in the design. Interactive states belong to the dismiss glyph and the actions, which follow their own component specs. Only the rest state is defined here.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | `color.surface.dialog` | `color.border.default` | `color.foreground.primary` | Baseline, for all five flavours and both shapes |

Modal behavior: focus is trapped inside the Dialog and returns to the trigger on close (see DESIGN.md).

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | `size.control.md` per action; surface width follows content | `size.space.*` (mobile tier) |
| **Tablet** | `size.control.target.min` | `size.control.md` per action; surface width follows content | `size.space.*` (tablet tier) |
| **Desktop / POS** | `size.control.target.min` | `size.control.md` per action; surface width follows content | `size.space.*` (desktop tier) |


---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | `color.foreground.primary` must hold contrast on `color.surface.dialog` in light and dark themes. |
| **Non-color Status** | SC 1.4.1 (Use of Color) | Flavour is conveyed by glyph and title text, never by color. Each flavour uses its own glyph. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | Ring in `color.focus.ring`, `size.stroke.thick`, with offset, on the dismiss glyph and every action. |
| **Focus Management** | SC 2.4.3 (Focus Order) | Focus is trapped within the Dialog and returned to the trigger on close. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Dismiss glyph hit area never below `size.control.target.min`. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | The Dialog is exposed as a dialog named by its title; the dismiss glyph exposes a name such as "Close". |

---

## Token gaps

None. Figma variable `radius/element-md` and `radius/element-sm` map to `size.radius.element.md` and `size.radius.element.sm`.
