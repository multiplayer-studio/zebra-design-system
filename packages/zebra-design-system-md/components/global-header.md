# Component: Global Header

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Global Header |
| **Category** | Navigation |
| **Functional Role** | The persistent top bar of an application. Holds the navigation toggle, brand logo, platform name, optional menu items, a search field, optional action buttons, the user profile menu and an app switcher. |
| **Usage Restrictions** | One per screen, at the top. Not for in-page section headings. The bar uses a dark section surface in both themes. |

**Variant axes:**

| Axis | Values |
|:---|:---|
| **Rounded** | false, true |

**Content options (switches):** menu items, search bar, action menu, app switcher, dividers, platform name; the logo, menu items and action menu are replaceable slots.

**Subcomponent: User Profile** (the trigger inside the Header Trailing group)

| Axis | Values |
|:---|:---|
| **State** | default, hover, pressed, focus, disabled |
| **Rounded** | false, true |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Bar surface | Section fill, base border | Required |
| **Header Leading** | Identity group | Navigation toggle (`Hamburger Menu`), logo slot, platform name | Required |
| **Divider (leading)** | Group separator | Thin line across the bar height | Optional |
| **Header Middle** | Navigation and search group | Menu items slot (`Chevron Left` icon button, text button), Search field with `Search` glyph and placeholder, actions slot (`More Horizontal`, `Star` icon buttons) | Optional |
| **Divider (trailing)** | Group separator | Thin line across the bar height | Optional |
| **Header Trailing** | Account group | User Profile (username, avatar, `Expand More` glyph), app switcher icon button (`Apps`) | Required |
| **User Profile Avatar** | User identity | Swatch circle with `Verified` placeholder glyph | Required |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Container Background** | `color.surface.section` | Header canvas |
| **Container Border** | `color.border.default` with `size.stroke.base` | Perimeter |
| **Container Padding** | `size.space.sm` | Edge inset |
| **Group Gap** | `size.space.gutter` | Spacing between groups |
| **Inner Group Gap** | `size.space.sm` (middle group), `size.space.2xs` (between slotted buttons) | Compact clustering |
| **Corner Radius** | `size.radius.none` (not rounded); rounded variant uses `size.radius.element.sm` | Edge rounding |
| **Icon Button Background / Border** | `color.interactive.neutral.background.default` / `color.interactive.neutral.border.default` | Control chrome |
| **Icon Button Foreground** | `color.interactive.neutral.foreground.default` | Glyph color |
| **Icon Button Size / Glyph** | `size.control.md` / `size.control.icon.md` | Hit bounds |
| **Platform Name** | `typography.title.medium`, `color.foreground.primary` | Brand text |
| **Menu Item Label** | `typography.label.large`, `color.interactive.neutral.foreground.default` | Nav text |
| **Search Field** | `color.interactive.neutral.background.default`, `color.interactive.neutral.border.default`, `size.stroke.thin`, `size.control.md`, padding `size.space.md` / `size.space.sm`, gap `size.space.xs` | Input chrome |
| **Search Placeholder** | `typography.body.medium`, `color.foreground.disabled` | Hint text |
| **User Profile Label** | `typography.label.small`, `color.foreground.primary` | Username |
| **User Profile Padding / Gap** | `size.space.sm` (horizontal), `size.space.xs` (vertical and gap) | Trigger spacing |
| **User Profile Chevron / Glyph Size** | `size.control.icon.sm` | Small glyph bounds |

---

## 4. Interactive State Matrix

States below apply to the User Profile trigger (the only Header element with explicit state variants in the design). Other controls inside the Header follow their own component specs.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | `color.interactive.neutral.background.default` | `color.interactive.neutral.border.default` | `color.foreground.primary` | Baseline |
| **Hover** | `color.interactive.neutral.background.hover` | `color.interactive.neutral.border.default` | `color.foreground.primary` | Pointer over trigger |
| **Pressed** | `color.interactive.neutral.background.pressed` | `color.interactive.neutral.border.default` | `color.foreground.primary` | Tap or click down |
| **Focused** | `color.interactive.neutral.background.focused` | `color.border.focus`, `size.stroke.thin` | `color.foreground.primary` | Keyboard or scanner focus |
| **Disabled** | `color.interactive.neutral.background.disabled` | `color.interactive.neutral.border.disabled` | `color.interactive.ghost.foreground.disabled` | Inactive; no interaction |

Both Rounded values use the same state tokens. Note that the design binds the hover/pressed/focused label color to `color.foreground.inverse` in the light-surface variants of this trigger; confirm against the dark header surface when implementing.

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | `size.control.md` for the control row; bar height is control height plus twice `size.space.sm` | `size.space.*` (mobile tier) |
| **Tablet** | `size.control.target.min` | `size.control.md` for the control row; bar height is control height plus twice `size.space.sm` | `size.space.*` (tablet tier) |
| **Desktop / POS** | `size.control.target.min` | `size.control.md` for the control row; bar height is control height plus twice `size.space.sm` | `size.space.*` (desktop tier) |


---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | `color.foreground.primary` and neutral foreground tokens must hold contrast on `color.surface.section` in both themes; the placeholder token is disabled-grade and must be paired with a visible search glyph. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | Ring in `color.border.focus`, `size.stroke.thick`, with offset, on every control. |
| **Focus Order** | SC 2.4.3 | Leading to trailing: navigation toggle, logo, menu items, search, actions, user profile, app switcher. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Icon buttons and the profile trigger meet `size.control.target.min`. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Icon-only buttons (toggle, actions, app switcher) need explicit names; the profile trigger is named by username. The bar is exposed as a banner landmark. |

---

## Token gaps

- Avatar swatch color is bound in Figma to a chart series variable (`color.chart.series.4`), which is not a semantic surface or foreground key; no avatar-specific token exists.
- Logo asset (Brand Logo Horizontal) is not in `icons.json` and is supplied through the logo slot.
- Swatch placeholder glyph is `Verified` (exists).
