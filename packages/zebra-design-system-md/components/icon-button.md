# Component: Icon Button

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Icon Button |
| **Category** | Action |
| **Functional Role** | Triggers a single action using only a glyph, for compact toolbars and dense layouts. |
| **Usage Restrictions** | Do not use when the glyph is ambiguous without a text label. Always provide an accessible name. |

**Variant axes**

| Axis | Values |
|:---|:---|
| **Size** | small, medium, large |
| **Shape** | sharp, rounded, full |
| **Flavour** | primary, positive, negative, outline, outline-subtle, text, subtle, gradient, text-gradient |
| **State** | default, hover, pressed, focus |
| **Disabled** | false, true |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Bounding surface | Background fill, stroke, corner radius per Shape | Required |
| **Icon Slot** | Sole content | Icon glyph from `icons.json` | Required |

---

## 3. Semantic Token Bindings

Flavour colors follow the exact mapping in the Button specification (`button.md`, Section 3): primary, positive, negative (destructive family), outline (ghost border and foreground, neutral background), outline-subtle and subtle (neutral family), text (ghost family), gradient and text-gradient.

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Container Background** | `color.interactive.<family>.background.default` | Component canvas |
| **Container Border** | `color.interactive.<family>.border.default` | Perimeter |
| **Border Width** | `size.stroke.thin` for outline flavours; otherwise `size.stroke.base` | Perimeter weight |
| **Icon Color** | `color.interactive.<family>.foreground.default` | Glyph contrast |
| **Corner Radius** | sharp: `size.radius.none`; rounded: `size.radius.element.sm`; full: `size.radius.pill` | Edge rounding |
| **Padding** | `size.space.xs` | Inset around glyph |
| **Icon Size** | small: `size.control.icon.sm`; medium: `size.control.icon.md`; large: `size.control.icon.lg` | Glyph scale |

---

## 4. Interactive State Matrix

Family per flavour as in `button.md` Section 4.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | `color.interactive.<family>.background.default` | `color.interactive.<family>.border.default` | `color.interactive.<family>.foreground.default` | Baseline |
| **Hover** | `color.interactive.<family>.background.hover` | `color.interactive.<family>.border.hover` | `color.interactive.<family>.foreground.default` | Pointer over element |
| **Pressed** | `color.interactive.<family>.background.pressed` | `color.interactive.<family>.border.pressed` | `color.interactive.<family>.foreground.default` | Press or tap down |
| **Focused** | `color.interactive.<family>.background.focused` | `size.stroke.thick` ring in `color.border.focus` | `color.interactive.<family>.foreground.default` | Keyboard or scanner focus |
| **Disabled** | `color.interactive.<family>.background.disabled` | `color.interactive.<family>.border.disabled` | `color.interactive.<family>.foreground.disabled` | Inactive; suppress interactions |

---

## 5. Form-Factor Scaling & Sizing

| Size | Component Bounds |
|:---|:---|
| **small** | `size.control.sm` square |
| **medium** | `size.control.md` square |
| **large** | `size.control.lg` square |

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | `size.control.*` (medium or large) | `size.space.*` |
| **Tablet** | `size.control.target.min` | `size.control.*` | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` | `size.control.*` | `size.space.*` |

Small is shorter than `size.control.target.min`; on touch displays extend the hit area to the minimum.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (3:1 non-text) | Glyph color must hold 3:1 against the container in both themes. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | A `size.stroke.thick` ring in `color.focus.ring` with offset. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Hit bounds at least `size.control.target.min`. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Required explicit name, since there is no visible text. |

---

### Token gaps

- Sample sizes and padding were checked on primary default variants only; gradient and text-gradient state bindings follow Button and were not individually verified.
