# Component: Button

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Button |
| **Category** | Action |
| **Functional Role** | Lets the user trigger a single action. Emphasis is chosen through the Flavour axis; geometry through Size and Shape. |
| **Usage Restrictions** | Do not use for navigation between content that reads as a link. Use one high-emphasis (primary, gradient) button per view region. Square-only icon actions use Icon Button instead. |

**Variant axes**

| Axis | Values |
|:---|:---|
| **Size** | small, medium, large |
| **Shape** | sharp, rounded, full |
| **Flavour** | primary, positive, negative, outline, outline-subtle, text, subtle, gradient, text-gradient |
| **State** | default, hover, pressed, focus |
| **Disabled** | false, true |
| **Leading Icon / Trailing Icon** | optional on/off |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Bounding surface | Background fill, stroke, corner radius per Shape | Required |
| **Leading Slot** | Contextual glyph before the label | Icon glyph | Optional |
| **Content Area** | Action label | Single-line text label | Required |
| **Trailing Slot** | Contextual glyph after the label | Icon glyph | Optional |

Icon glyphs are chosen by the consumer from `icons.json`.

---

## 3. Semantic Token Bindings

Flavour to token family mapping (rest state):

| Flavour | Background | Border | Label / Icon Color |
|:---|:---|:---|:---|
| **primary** | `color.interactive.primary.background.default` | `color.interactive.primary.border.default` | `color.interactive.primary.foreground.default` |
| **positive** | `color.interactive.positive.background.default` | `color.interactive.positive.border.default` | `color.interactive.positive.foreground.default` |
| **negative** | `color.interactive.destructive.background.default` | `color.interactive.destructive.border.default` | `color.interactive.destructive.foreground.default` |
| **outline** | `color.interactive.neutral.background.default` | `color.interactive.ghost.border.default` | `color.interactive.ghost.foreground.default` |
| **outline-subtle** | `color.interactive.neutral.background.default` | `color.interactive.neutral.border.default` | `color.interactive.neutral.foreground.default` |
| **text** | `color.interactive.ghost.background.default` | `color.interactive.ghost.border.default` (stroke width none) | `color.interactive.ghost.foreground.default` |
| **subtle** | `color.interactive.neutral.background.default` | `color.interactive.neutral.border.default` (stroke width none) | `color.interactive.neutral.foreground.default` |
| **gradient** | Gradient from `color.surface.gradient.start` to `color.surface.gradient.end` | `color.interactive.primary.border.default` (stroke width none) | `color.interactive.primary.foreground.default` |
| **text-gradient** | `color.interactive.ghost.background.default` | `color.interactive.ghost.border.default` (stroke width none) | Gradient from `color.foreground.gradient.start` to `color.foreground.gradient.end` |

Shared bindings:

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Corner Radius, sharp** | `size.radius.none` | Square corners |
| **Corner Radius, rounded** | `size.radius.element.sm` | Softly rounded corners |
| **Corner Radius, full** | `size.radius.pill` | Fully rounded ends |
| **Border Width, outline / outline-subtle** | `size.stroke.thin` | Visible perimeter |
| **Border Width, all other flavours** | `size.stroke.base` | No visible perimeter |
| **Label Typography, small** | `typography.label.medium` | Compact label |
| **Label Typography, medium and large** | `typography.label.large` | Standard label |
| **Container Padding (horizontal)** | small and medium: `size.space.md`; large: `size.space.lg` | Edge breathing room |
| **Container Padding (vertical)** | `size.space.xs` | Vertical inset |
| **Label Padding (horizontal)** | small: `size.space.xs`; medium and large: `size.space.sm` | Separation of label from icons |
| **Slot Gap** | `size.space.none` | Spacing comes from label padding |
| **Icon Size** | small: `size.control.icon.sm`; medium: `size.control.icon.md`; large: `size.control.icon.lg` where large icon sizing is not distinguished in the design, use `size.control.icon.md` | Glyph scale |

---

## 4. Interactive State Matrix

Token family per flavour: primary = `primary`, positive = `positive`, negative = `destructive`, outline and text = `ghost` (outline keeps neutral rest background), outline-subtle and subtle = `neutral`.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | `color.interactive.<family>.background.default` | `color.interactive.<family>.border.default` | `color.interactive.<family>.foreground.default` | Baseline appearance |
| **Hover** | `color.interactive.<family>.background.hover` | `color.interactive.<family>.border.hover` | `color.interactive.<family>.foreground.default` | Pointer over element |
| **Pressed** | `color.interactive.<family>.background.pressed` | `color.interactive.<family>.border.pressed` | `color.interactive.<family>.foreground.default` | Press or tap down |
| **Focused** | `color.interactive.<family>.background.focused` | `size.stroke.thick` ring in `color.border.focus` | `color.interactive.<family>.foreground.default` | Keyboard or scanner focus |
| **Disabled** | `color.interactive.<family>.background.disabled` | `color.interactive.<family>.border.disabled` | `color.interactive.<family>.foreground.disabled` | Inactive; suppress all interactions |

Gradient flavours:

| State | Gradient Flavour | Text-Gradient Flavour |
|:---|:---|:---|
| **Default** | Gradient fill `color.surface.gradient.start` to `color.surface.gradient.end` | Gradient label `color.foreground.gradient.start` to `color.foreground.gradient.end` |
| **Hover** | Gradient fill, border `color.interactive.primary.border.hover` | Background `color.interactive.ghost.background.hover`, border `color.interactive.ghost.border.hover` |
| **Pressed, Focused, Disabled** | Same family rule as above (primary family for gradient, ghost family for text-gradient) | Same |

---

## 5. Form-Factor Scaling & Sizing

| Size | Component Height |
|:---|:---|
| **small** | `size.control.sm` |
| **medium** | `size.control.md` |
| **large** | `size.control.lg` |

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | `size.control.*` (use medium or large) | `size.space.*` |
| **Tablet** | `size.control.target.min` | `size.control.*` | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` (small allowed for pointer-only) | `size.control.*` | `size.space.*` |

Where the small size is shorter than `size.control.target.min` on touch displays, the hit area must be extended to the minimum.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Label and icon colors must hold contrast against the container in both themes; gradient flavours must be checked at both gradient ends. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | A `size.stroke.thick` ring in `color.focus.ring` surrounds the container with an offset. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Hit bounds never fall below `size.control.target.min` on touch devices. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Label text provides the name; icon-only content must supply an explicit name. Disabled state is exposed to assistive technology. |
| **Non-color meaning** | SC 1.4.1 (Use of Color) | Positive and negative flavours must be accompanied by label text that states the outcome. |

---

### Token gaps

- Figma `Gradient/background` and `Gradient/foreground` styles have no single key; composed from the `gradient.start` / `gradient.end` tokens above.
- Figma Gradient hover/pressed/focus/disabled bindings were only spot-checked (hover: `color.interactive.primary.border.hover`); verify against Figma.
- Large-size icon dimension is not distinguished from medium in the sampled Button variants.
