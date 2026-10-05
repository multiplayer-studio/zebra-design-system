# Component: Top App Bar

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Top App Bar |
| **Category** | Navigation |
| **Functional Role** | A bar fixed to the top of a screen that carries the page title, a primary navigation or dismiss control and a small set of actions. Its type changes with context: browsing, centered title, multi-select, search, or a taller bar with the title on a second row. |
| **Usage Restrictions** | One per screen. Limit trailing actions to those that fit without wrapping; overflow goes behind a More action. Do not mix contextual and default content in the same bar. |

### Variant Axes

| Axis | Values |
|:---|:---|
| **Type** | Default, Centered, Contextual, Contextual Alt, Search, Extended |
| **Shape** | Sharp, Rounded |

| Type | Purpose |
|:---|:---|
| **Default** | Leading nav control, avatar, leading-aligned title, trailing actions |
| **Centered** | Leading nav control, centered title, single trailing action |
| **Contextual** | Dismiss control, selection count, contextual action group |
| **Contextual Alt** | Count shown inside a labeled dismiss control, contextual action group |
| **Search** | Back control and an active search field with clear and voice actions |
| **Extended** | Two rows: controls and actions on top, title beneath |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Bar surface | Section fill, corner rounding per Shape | Required |
| **Main Row** | Primary control row | Horizontal row of leading, content and trailing slots | Required |
| **Leading Control** | Navigation or dismiss | Icon-only action: `Hamburger Menu` (Default, Centered, Extended), `Close` (Contextual), `Arrow Back` (Search) | Required |
| **Avatar** | Identity cue | Small circular photo | Optional when Type = Default |
| **Page Title** | Screen name | Single-line text | Required when Type = Default, Centered or Extended |
| **Selection Count** | Contextual summary | Text such as an item count | Required when Type = Contextual or Contextual Alt |
| **Labeled Dismiss Control** | Dismiss plus count | Icon `Close` with count label inside the control | Required when Type = Contextual Alt |
| **Trailing Slot** | Page actions | Up to three icon-only actions: `World`, `Love`, `More Vertical` as shown | Optional when Type = Default or Extended |
| **Centered Trailing Action** | Account entry | Icon-only action, `User Circle` | Optional when Type = Centered |
| **Contextual Control Slot** | Selection actions | Four icon-only actions: `Edit`, `Share`, `Delete`, `More Vertical` as shown | Required when Type = Contextual or Contextual Alt |
| **Search Field** | Query entry | Outlined field with entered text, caret, `Cancel` clear glyph, divider, `Microphone` glyph | Required when Type = Search |
| **Title Row** | Second row title | Single-line text | Required when Type = Extended |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Container Background** | `color.surface.section` | Bar canvas |
| **Corner Radius, Sharp** | `size.radius.none` | Square edges |
| **Corner Radius, Rounded** | `size.radius.element.sm` | Softened edges |
| **Container Padding** | `size.space.sm` horizontal, `size.space.md` vertical | Bar inset |
| **Row Gap (Default, Centered, Contextual, Contextual Alt, Extended)** | `size.space.sm` between rows and slots | Slot separation |
| **Extended Row Gap** | `size.space.lg` between control row and title row | Two-row separation |
| **Leading Group Gap** | `size.space.md` | Control to content |
| **Search Row Gap** | `size.space.md` | Back control to field |
| **Icon Action Background** | `color.interactive.neutral.background.default` | Quiet action surface |
| **Icon Action Border** | `color.interactive.neutral.border.default` at `size.stroke.base` | No visible outline at rest |
| **Icon Action Radius** | `size.radius.element.sm` | Matches bar rounding |
| **Icon Action Bounds** | `size.control.sm` | Compact bar action |
| **Icon Action Padding** | `size.space.xs` | Glyph inset |
| **Icon Size (actions)** | `size.control.icon.sm` | Action glyph |
| **Icon Size (search field glyphs)** | `size.control.icon.md` | Field glyph |
| **Icon Color** | `color.interactive.neutral.foreground.default` | Contrast on action surface |
| **Default Title Typography** | `typography.label.large` | Primary title |
| **Extended Title Typography** | `typography.label.large` | Primary title |
| **Centered and Selection Count Typography** | `typography.label.medium` | Compact title and count |
| **Title Color** | `color.foreground.primary` | High-contrast text |
| **Avatar Size** | `size.control.icon.lg` approximates the 24-unit avatar | Identity cue |
| **Labeled Dismiss Control Padding** | `size.space.md` horizontal, `size.space.xs` vertical | Count inside control |
| **Labeled Dismiss Control Label** | `typography.label.medium`, `color.interactive.neutral.foreground.default` | Count text |
| **Search Field Background** | `color.interactive.ghost.background.default` | Transparent field |
| **Search Field Border** | `color.border.focus` at `size.stroke.thin` | Active-entry outline |
| **Search Field Radius** | `size.radius.element.sm` | Edge rounding |
| **Search Field Height** | `size.control.sm` | Matches action height |
| **Search Field Padding** | `size.space.md` horizontal, `size.space.sm` vertical | Text inset |
| **Search Text Typography** | `typography.body.medium` | Entered text |
| **Search Text Color** | `color.foreground.primary` | Entered text |
| **Search Caret Color** | `color.foreground.cursor` | Caret |
| **Search Trailing Gap** | `size.space.sm` | Clear, divider, voice spacing |
| **Search Inner Gap** | `size.space.2xs` between text and caret | Caret adjacency |
| **Search Divider** | `color.border.default` | Separates clear from voice |

---

## 4. Interactive State Matrix

The design defines no hover, pressed, focused or disabled variants for the Top App Bar. Only the rest appearance per Type is defined; the Search type shows its field in the active-entry condition.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest), all Types** | `color.surface.section` | None | `color.foreground.primary`, `color.interactive.neutral.foreground.default` | Baseline appearance of the bar |
| **Search field, active entry** | `color.interactive.ghost.background.default` | `color.border.focus` at `size.stroke.thin` | `color.foreground.primary`, caret `color.foreground.cursor` | Field outlined while text is being entered |

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | Single row for Default, Centered, Contextual, Contextual Alt, Search; two rows for Extended; width fills the screen | `size.space.*` of the mobile tier |
| **Tablet** | `size.control.target.min` | Same row structure; width fills the pane | `size.space.*` of the tablet tier |
| **Desktop / POS** | `size.control.target.min` (touch displays) | Same row structure; width fills the pane | `size.space.*` of the desktop tier |

Icon actions are `size.control.sm`, below the touch minimum; on touch displays their hit area must extend to `size.control.target.min` without changing the visual footprint.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Title and glyph colors must hold contrast on `color.surface.section` in both light and dark themes. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | Every action and the search field show a 2px `color.focus.ring` with offset when focused. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Hit bounds never fall below `size.control.target.min` on touch devices. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Every icon-only action needs an accessible name (menu, close, back, clear, voice input, edit, share, delete, more). The bar exposes a navigation landmark and the search field exposes its label and value. |
| **Focus Order** | SC 2.4.3 (Focus Order) | Leading control, title or field, then trailing actions, in reading order. |
| **Non-color Cues** | SC 1.4.1 (Use of Color) | Contextual mode is identified by the dismiss glyph and visible count text, not color. |

---

## Token gaps

- The 24-unit avatar has no dedicated size key; `size.control.icon.lg` (28) is the nearest and may not match.
- Title color in Figma is a literal black rather than a bound variable; mapped to `color.foreground.primary`.
- Figma binds `radius/element-sm`, `control/icon-sm`, `control/icon-md`, `control/icon-lg` which exist as `size.radius.element.sm`, `size.control.icon.*`; no gaps there.
- Search divider color is not bound in Figma; `color.border.default` is assumed.
- Icon glyph names are the Figma component names (Hamburger Menu, World, Love, More Vertical, User Circle, Close, Edit, Share, Delete, Arrow Back, Cancel, Microphone); all exist in `icons.json`. Expand More and Chevron Right (Card) also exist.
