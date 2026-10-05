# Component: Card

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Card |
| **Category** | Data Display |
| **Functional Role** | A bounded surface that groups related content (heading, optional media, body text and footer actions) into one scannable unit. A collapsible flavor lets the user reveal or hide the body beneath a heading row. |
| **Usage Restrictions** | Do not nest a Card inside another Card. Do not use for page-level layout sections. A Card has no selection or navigation behavior of its own; only its header row (collapsible flavor) and its slotted actions are interactive. |

### Variant Axes

| Axis | Values | Applies To |
|:---|:---|:---|
| **Shape** | Sharp, Rounded | All card variants |
| **Layout** | Text, Media Inset, Media | Card templates |
| **Flavor** | Default, Gradient | Collapsible card |
| **Collapse State** | Collapsed, Expanded | Collapsible card |
| **Header Flavor** | Default, Hover | Collapsible header row |
| **Header Indicator State** | Open, Close | Collapsible header leading glyph |
| **Footer Actions** | 1, 2, Custom | Card footer |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Bounding surface | Card fill, hairline perimeter (static card) or no perimeter (collapsible default), corner rounding per Shape | Required |
| **Header / Heading Row** | Identifies the card | Title, subtitle, optional leading avatar, optional trailing icon action | Required |
| **Leading Content** | Contextual identity | Avatar | Optional |
| **Heading Content** | Primary and secondary text | Title text over subtitle text | Required |
| **Required Marker** | Flags a required section | Asterisk glyph after the title, in error foreground | Optional; collapsible card only |
| **Trailing Content** | Overflow or secondary action | Icon-only action, glyph `More Vertical` | Optional |
| **Expand Indicator** | Shows collapse state | Glyph `Chevron Right` when collapsed, `Expand More` when expanded | Required when card is collapsible |
| **Image** | Media band | Cropped image spanning the Container width, above or between text blocks | Optional; Layout = Media Inset or Media only |
| **Body** | Supporting copy or slotted content | Paragraph text, or free content slot (collapsible expanded) | Required |
| **Footer** | Actions row | One or two buttons, or a custom action slot | Optional |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Container Background** | `color.surface.card` | Card canvas |
| **Container Border (static card)** | `color.border.default` at `size.stroke.thin` | Structural perimeter |
| **Container Border (gradient, expanded)** | `color.border.gradient.start` at `size.stroke.thick` | Emphasis outline for gradient flavor |
| **Corner Radius, Sharp** | `size.radius.none` | Square edges |
| **Corner Radius, Rounded** | `size.radius.sm` | Softened edges |
| **Header Row Background (rest)** | `color.interactive.ghost.background.default` | Transparent header |
| **Header Row Background (hover)** | `color.interactive.ghost.background.hover` | Pointer feedback |
| **Header Row Padding (collapsible)** | `size.space.xl` horizontal, `size.space.lg` vertical | Header breathing room |
| **Header Row Padding (static)** | `size.space.lg` all sides | Heading row inset |
| **Heading Gap (avatar to text, icon to text)** | `size.space.sm` (collapsible), `size.space.lg` (static) | Slot separation |
| **Title and Subtitle Gap** | `size.space.2xs` (collapsible), `size.space.none` (static) | Tight text stack |
| **Title Gap to Required Marker** | `size.space.xs` | Marker spacing |
| **Collapsible Title Typography** | `typography.title.large` | Heading prominence |
| **Collapsible Description Typography** | `typography.title.medium` | Secondary line |
| **Static Card Title Typography** | `typography.title.medium` | Heading prominence |
| **Static Card Subtitle / Body Typography** | `typography.body.small` | Supporting copy |
| **Title Color** | `color.foreground.primary` | High-contrast text |
| **Subtitle / Description / Body Color** | `color.foreground.secondary` | Supporting text |
| **Required Marker Color** | `color.foreground.error` | Required cue (paired with text) |
| **Expand Indicator Size** | `size.control.icon.lg` | Legible disclosure glyph |
| **Expand Indicator Color** | `color.foreground.primary` | Glyph contrast |
| **Collapsible Body Padding** | `size.space.xl` horizontal and bottom, `size.space.none` top | Aligns with header text |
| **Static Body Padding** | `size.space.lg` | Content inset |
| **Image Band** | Full container width, height fixed by design, `size.space.none` padding | Edge-to-edge media |
| **Trailing Icon Action Hit Area** | `size.control.md` | Icon action bounds |
| **Trailing Icon Size** | `size.control.icon.md` | Glyph size |
| **Trailing Icon Action Background** | `color.interactive.ghost.background.default` | Transparent action |
| **Footer Padding** | `size.space.lg` | Action row inset |
| **Footer Action Gap** | `size.space.sm` between two actions; `size.space.none` for one | Action separation |
| **Primary Footer Action** | `color.interactive.primary.background.default`, `color.interactive.primary.foreground.default`, `size.control.sm` height, `size.space.md` horizontal padding, `typography.label.medium` | Main action |
| **Secondary (Outline) Footer Action** | `color.interactive.neutral.background.default`, `color.interactive.ghost.border.default` at `size.stroke.thin`, `color.interactive.ghost.foreground.default`, `typography.label.medium` | Alternate action |

---

## 4. Interactive State Matrix

The static Card is a non-interactive surface. States below apply to the collapsible header row only; footer actions follow their own component specification.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Collapsed, Default (Rest)** | `color.interactive.ghost.background.default` | None (Default flavor); `color.border.gradient.start` (Gradient flavor) | `color.foreground.primary`, `color.foreground.secondary` | Header only; indicator glyph `Chevron Right` |
| **Collapsed, Hover** | `color.interactive.ghost.background.hover` | Unchanged | Unchanged | Header row tint; indicator glyph `Chevron Right` |
| **Expanded** | `color.surface.card` | None (Default flavor); `color.border.gradient.start` at `size.stroke.thick` (Gradient flavor) | Unchanged | Body revealed beneath header; indicator glyph `Expand More` |

Pressed, Focused and Disabled states are not defined in the design for the Card and are therefore not specified.

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | Width fills the column; height follows content; icon action `size.control.md` | `size.space.*` of the mobile tier |
| **Tablet** | `size.control.target.min` | Fixed template widths or column fill; height follows content | `size.space.*` of the tablet tier |
| **Desktop / POS** | `size.control.target.min` (touch displays) | Fixed template widths or column fill; height follows content | `size.space.*` of the desktop tier |

Footer actions use `size.control.sm`; on touch displays their hit area extends to `size.control.target.min`. The collapsible header row, being the full-width trigger, always meets the minimum target.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | `color.foreground.primary` and `color.foreground.secondary` must hold contrast on `color.surface.card` and on the hover tint, in both light and dark themes. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | The collapsible header row and every footer or icon action show a 2px `color.focus.ring` with offset when focused. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Header row, icon action and footer actions provide at least `size.control.target.min` of hit area. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | The collapsible header exposes its title, expanded or collapsed value and a toggle role. The icon-only trailing action requires an accessible name. |
| **Non-color Cues** | SC 1.4.1 (Use of Color) | The required marker is an asterisk glyph, and expanded versus collapsed is conveyed by the changing indicator glyph, never by color alone. |

---

## Token gaps

- Figma binds the gradient outline to `foreground/gradient/start` and `foreground/gradient/end`; the gradient end has no border counterpart in use, and the spec maps the outline to `color.border.gradient.start`. Confirm the intended border gradient pair.
- Figma card layouts use fixed widths and an image band height with no matching `size.container.*` or similar key; these are left to template design.
- Collapsed Gradient is 4 units taller than Collapsed Default in Figma; the cause (outline thickness) is inferred, not bound to a variable.
