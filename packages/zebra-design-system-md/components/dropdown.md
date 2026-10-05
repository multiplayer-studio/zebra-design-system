# Component: Dropdown

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Dropdown |
| **Category** | Action |
| **Functional Role** | A trigger that reveals a floating menu of choices. The family comprises the Dropdown Template (trigger plus placement logic), the Dropdown Menu (floating surface) and Dropdown Menu Item (a single choice). |
| **Usage Restrictions** | Not for primary navigation or very long option lists. Menu items carry no color-only meaning. |

**Variant axes:**

| Component | Axis | Values |
|:---|:---|:---|
| **Dropdown Template** | Open | false, true |
| | Position | bottom, top, left, right |
| | Align | leading, trailing (for bottom and top); top, bottom (for leading and trailing) |
| **Dropdown Menu** | Rounded | false, true |
| **Dropdown Menu Item** | Type | icon, radio, checkbox, custom |
| | State | default, hover, selected, focus, selected focus, disabled |
| | Rounded | false, true |

Template variants present: closed (bottom/left); open bottom-left, bottom-right, top-left, top-right, right-top, right-bottom, left-top, left-bottom.

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Trigger** | Opens and closes the menu | Any trigger control placed in the Template (for example the User Profile in Global Header) | Required |
| **Menu Container** | Floating surface | Menu fill, elevation shadow, corner radius per Rounded | Required when Open |
| **Menu Item Container** | One row | Transparent fill, padding, hit area spans the item | Required |
| **Leading Control** | Selection indicator | Type icon: `Verified` glyph; radio: radio indicator; checkbox: checkbox indicator; custom: any content | Optional |
| **Item Label** | Choice text | Single line label | Required |

Placement: Position sets which side of the trigger the menu opens on; Align sets which edge of the trigger the menu aligns with.

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Menu Background** | `color.surface.menu` | Floating canvas |
| **Menu Elevation** | `color.shadow.soft` with `size.shadow.small.*` and `size.shadow.medium.*` | Layered drop shadow |
| **Menu Corner Radius** | `size.radius.element.md` (rounded); `size.radius.none` (not rounded) | Edge rounding |
| **Menu Padding** | `size.space.card` | Inset |
| **Menu Item Gap** | `size.space.2xs` | Row separation |
| **Item Height** | `size.control.md` | Row bounds |
| **Item Padding** | `size.space.xl` (horizontal), `size.space.xs` (vertical) | Row inset |
| **Item Leading Gap** | `size.space.sm` | Control to label |
| **Item Label** | `typography.label.medium`, `color.interactive.neutral.foreground.default` | Choice text |
| **Item Corner Radius** | `size.radius.sm` (rounded); `size.radius.none` (not rounded) | Row rounding |
| **Item Leading Glyph Size** | `size.control.icon.sm` | Glyph bounds |
| **Template Trigger Control Size** | `size.control.sm` / `size.control.md` | Trigger bounds (see trigger spec) |

---

## 4. Interactive State Matrix

Applies to Dropdown Menu Item, identically for Type icon, radio, checkbox, custom and both Rounded values.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | `color.interactive.ghost.background.default` | `color.border.transparent` | `color.interactive.neutral.foreground.default` | Baseline |
| **Hover** | `color.interactive.ghost.background.hover` | `color.border.transparent` | `color.interactive.neutral.foreground.default` | Pointer over row |
| **Selected** | `color.interactive.ghost.background.selected` | `color.border.transparent` | `color.interactive.neutral.foreground.default` | Chosen item, shown with indicator |
| **Focused** | `color.interactive.ghost.background.focused` | `color.border.focus`, `size.stroke.thin` | `color.interactive.neutral.foreground.default` | Keyboard or scanner focus |
| **Selected + Focused** | `color.interactive.ghost.background.selected` | `color.border.focus`, `size.stroke.thin` | `color.interactive.neutral.foreground.default` | Chosen and focused |
| **Disabled** | `color.interactive.ghost.background.disabled` | `color.interactive.neutral.border.disabled` | `color.interactive.neutral.foreground.disabled` | Inactive; suppress interaction |

Dropdown Template Open=false shows only the trigger; Open=true shows the Menu at the chosen Position and Align.

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | `size.control.md` per item; menu width follows content | `size.space.*` (mobile tier) |
| **Tablet** | `size.control.target.min` | `size.control.md` per item; menu width follows content | `size.space.*` (tablet tier) |
| **Desktop / POS** | `size.control.target.min` | `size.control.md` per item; menu width follows content | `size.space.*` (desktop tier) |


---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Item foreground must hold contrast on `color.surface.menu` and on every hover/selected background, in both themes. |
| **Non-color Selection** | SC 1.4.1 (Use of Color) | Selected items show a glyph or indicator in addition to the background change. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | Ring in `color.border.focus`, `size.stroke.thick`, with offset, on the trigger and focused item. |
| **Keyboard Operation** | SC 2.1.1 | Trigger opens the menu; arrow keys move between items; escape closes and returns focus to the trigger. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Items at least `size.control.target.min` tall. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Trigger exposes menu role and expanded state; items expose label and selected/disabled state. |

---

## Token gaps

- Figma disabled item border: bound only as `interactive/neutral/border/disabled` on the disabled state; mapped as shown.
- Figma item focus border is `border/focus` at thin stroke; spec's global ring (`size.stroke.thick`) may differ.
- Item rest border is not bound in Figma; `color.border.transparent` is an assumed neutral value.
- Menu gap Figma variable `space/xl` (padding 24 on items) maps to `size.space.xl`; item horizontal padding in Figma resolves to that token, not `size.space.md` - verify.
