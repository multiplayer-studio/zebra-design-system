# Component: Search

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Search |
| **Category** | Data Entry |
| **Functional Role** | Single-line field where a user types a query to find content. Offers an optional leading search glyph and optional trailing clear and accessory glyphs. |
| **Usage Restrictions** | Do not use for multi-line or general-purpose text entry. Minimum width is 280 (design deviation from implementation). Do not use the gradient flavour where a neutral surface is required. |

**Variant axes:**

| Axis | Values |
|:---|:---|
| **Shape** | sharp, rounded, full |
| **State** | enabled, hover, selected, typing, focus, filled, disabled |
| **Size** | large, medium, small |
| **Flavour** | default, ghost, gradient |
| **Leading icon** | shown or hidden |
| **Trailing** | icon and clear, icon only, clear only (clear = cancel glyph) |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Bounding surface | Background fill, stroke border, corner radius set by Shape | Required |
| **Leading Slot** | Search affordance | Icon glyph `Search` | Optional |
| **Content Area** | Query value | Placeholder text, or entered text with a text cursor while typing | Required |
| **Clear Action** | Clears entered query | Icon glyph `Cancel` | Optional |
| **Trailing Divider** | Separates clear action from accessory | Thin vertical rule, shown only when both trailing items are present | Optional |
| **Trailing Accessory** | Secondary action such as voice input | Icon glyph `Microphone` | Optional |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Container Background (default flavour)** | `color.interactive.neutral.background.default` | Field canvas |
| **Container Background (ghost flavour)** | `color.interactive.ghost.background.default` | Transparent canvas |
| **Container Border (default flavour)** | `color.interactive.neutral.border.default` | Structural perimeter |
| **Container Border (ghost flavour)** | `color.interactive.ghost.border.default` | Perimeter revealed only by state |
| **Border Width (rest, default flavour)** | `size.stroke.thin` | Hairline outline |
| **Border Width (ghost flavour, rest)** | `size.stroke.base` | No outline at rest |
| **Gradient Flavour Foreground** | `color.foreground.gradient.start`, `color.foreground.gradient.end` | Brand gradient content |
| **Corner Radius, sharp** | `size.radius.none` | Square corners |
| **Corner Radius, rounded** | `size.radius.sm` | Soft corners |
| **Corner Radius, full** | `size.radius.pill` | Fully rounded ends |
| **Text Typography (large, medium)** | `typography.body.medium` | Query and placeholder text |
| **Text Typography (small)** | `typography.body.small` | Query and placeholder text |
| **Entered Text Color** | `color.foreground.primary` | Readable query |
| **Placeholder Text Color** | `color.foreground.disabled` | De-emphasised hint |
| **Icon Color** | `color.interactive.neutral.foreground.default` | Glyph colour |
| **Text Cursor** | `color.foreground.cursor` | Caret while typing |
| **Icon Size (large, medium)** | `size.control.icon.md` | Glyph bounds |
| **Icon Size (small)** | `size.control.icon.sm` | Glyph bounds |
| **Internal Padding** | `size.space.md` (horizontal), `size.space.sm` (vertical) | Space between border and content |
| **Slot Gap** | `size.space.xs` between slots; `size.space.sm` inside the trailing group; `size.space.2xs` between text and cursor | Spacing between glyphs and text |

---

## 4. Interactive State Matrix

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Enabled (Rest)** | `color.interactive.neutral.background.default` | `color.interactive.neutral.border.default` | Placeholder `color.foreground.disabled`; icons `color.interactive.neutral.foreground.default` | Placeholder visible |
| **Hover** | `color.interactive.neutral.background.default` | `color.interactive.neutral.border.hover` | Same as Enabled | Border darkens |
| **Selected** | `color.interactive.neutral.background.default` | `color.border.focus` | Placeholder `color.foreground.disabled`; cursor `color.foreground.cursor` | Field is active, caret shown, border highlighted |
| **Typing** | `color.interactive.neutral.background.default` | `color.border.focus` | Text `color.foreground.primary`; cursor `color.foreground.cursor` | Entered text with caret; clear action appears |
| **Focus** | `color.interactive.neutral.background.default` | `color.border.focus` at `size.stroke.thick` | Placeholder `color.foreground.disabled` | Keyboard or scanner focus |
| **Filled** | `color.interactive.neutral.background.default` | `color.interactive.neutral.border.default` | Text `color.foreground.primary` | Value present, field not active |
| **Disabled** | `color.interactive.neutral.background.disabled` | `color.interactive.neutral.border.disabled` | `color.interactive.neutral.foreground.disabled` | Inactive; suppress all interactions |

The ghost and gradient flavours repeat the same seven states, replacing the default flavour surface and border with the flavour tokens in Section 3. Hover, selected, typing and focus reveal the border on ghost.

---

## 5. Form-Factor Scaling & Sizing

| Size | Height | Icon Size | Text Style |
|:---|:---|:---|:---|
| **Large** | `size.control.lg` | `size.control.icon.md` | `typography.body.medium` |
| **Medium** | `size.control.md` | `size.control.icon.md` | `typography.body.medium` |
| **Small** | `size.control.sm` | `size.control.icon.sm` | `typography.body.small` |

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | Large or medium; minimum width 280 | `size.space.*` |
| **Tablet** | `size.control.target.min` | Large or medium | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` (small allowed for pointer-first only) | Any size | `size.space.*` |

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Foreground tokens must maintain verified contrast against the container background in both light and dark themes. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | A ring using `color.border.focus` at `size.stroke.thick` must surround the focused element with an offset. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Hit bounds must never fall below `size.control.target.min` on touch devices. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Must expose an unambiguous accessible name via label text or icon metadata.|
| **Single Clear Action** | SC 3.2.4 (Consistent Identification) | The field exposes exactly one clear action. Suppress any platform-native clear control. |


---

**Token gaps:** the Figma gradient-flavour border and surface variables were not individually resolved; `color.border.gradient.start`, `color.border.gradient.end`, `color.surface.gradient.start` and `color.surface.gradient.end` exist and are the expected candidates, but binding was not confirmed.
