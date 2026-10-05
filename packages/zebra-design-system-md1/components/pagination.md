# Component: Pagination

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Pagination |
| **Category** | Navigation |
| **Functional Role** | Lets a user move between pages of a long result set using first, previous, next and last controls and numbered page indicators, with an overflow marker for hidden pages. |
| **Usage Restrictions** | Not for step-by-step flows or tab switching. Controls and the overflow marker can each be hidden; page indicators always remain. |

**Variant axes:**

| Axis | Values |
|:---|:---|
| **Outline** | off, on |
| **Rounded** | off (sharp), on (rounded) |
| **Show controls** | shown or hidden |
| **Show more** | shown or hidden |
| **Item State (controls)** | enabled, hover, pressed, focused, disabled |
| **Item State (indicators)** | enabled, hover, pressed, focused, disabled, selected |

Item flavour (shape and outline) is inherited from the parent Pagination.

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Horizontal group of items | Group of items, horizontal axis, evenly gapped | Required |
| **First Control** | Jump to first page | Square item with icon glyph `First Page` | Present only when Show controls = shown |
| **Previous Control** | Go back one page | Square item with icon glyph `Chevron Left` | Present only when Show controls = shown |
| **Page Indicators** | Numbered pages | Square items holding a page number; one is selected | Required |
| **Overflow Marker** | Stands for hidden pages | Square item with icon glyph `More Horizontal` | Present only when Show more = shown |
| **Next Control** | Go forward one page | Square item with icon glyph `Chevron Right` | Present only when Show controls = shown |
| **Last Control** | Jump to last page | Square item with icon glyph `Last Page` | Present only when Show controls = shown |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Item Background** | `color.interactive.neutral.background.default` | Item canvas |
| **Item Border (outline on)** | `color.interactive.neutral.border.default` at `size.stroke.thin` | Visible perimeter |
| **Item Border Width (outline off)** | `size.stroke.base` | No visible perimeter |
| **Corner Radius, sharp** | `size.radius.none` | Square corners |
| **Corner Radius, rounded** | `size.radius.sm` | Soft corners |
| **Page Number Typography** | `typography.body.small` | Page number text |
| **Page Number Color** | `color.foreground.primary` | Readable number |
| **Control Glyph Color** | `color.foreground.primary` | Readable glyph |
| **Control Glyph Size** | `size.control.icon.md` | Glyph bounds |
| **Selected Item Background** | `color.interactive.inverse.background.selected` | Current page emphasis |
| **Selected Item Border** | `color.interactive.inverse.border.default` | Current page perimeter |
| **Selected Item Text Color** | `color.foreground.inverse` | Contrast on selected fill |
| **Item Gap** | `size.space.sm` | Spacing between items |

---

## 4. Interactive State Matrix

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Enabled (Rest)** | `color.interactive.neutral.background.default` | `color.interactive.neutral.border.default` | `color.foreground.primary` | Baseline appearance |
| **Hover** | `color.interactive.neutral.background.hover` | `color.interactive.neutral.border.default` | `color.foreground.primary` | Pointer over item |
| **Pressed** | `color.interactive.neutral.background.pressed` | `color.interactive.neutral.border.pressed` (outline on) | `color.foreground.primary` | Tap or click down |
| **Focused** | `color.interactive.neutral.background.default` | `color.border.focus` at `size.stroke.thick` | `color.foreground.primary` | Keyboard or scanner focus |
| **Selected (indicators only)** | `color.interactive.inverse.background.selected` | `color.interactive.inverse.border.default` | `color.foreground.inverse` | Current page |
| **Disabled** | `color.interactive.neutral.background.disabled` | `color.interactive.neutral.border.disabled` | `color.foreground.disabled` | Inactive; suppress all interactions |

---

## 5. Form-Factor Scaling & Sizing

The design defines one item size for controls and indicators (a square with equal width and height), unified for hit-target consistency. Item size matches `size.control.sm` in the resolved tier.

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | Items must extend hit area to the minimum | `size.space.*` |
| **Tablet** | `size.control.target.min` | Items must extend hit area to the minimum | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` for touch-capable displays | `size.control.sm` square items | `size.space.*` |

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Foreground tokens must maintain verified contrast against the container background in both light and dark themes. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | A ring using `color.border.focus` at `size.stroke.thick` must surround the focused element with an offset. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Hit bounds must never fall below `size.control.target.min` on touch devices. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Must expose an unambiguous accessible name via label text or icon metadata. |

---

**Token gaps:** none for the verified bindings. Item square size has no exact token match (resolves to `size.control.sm` by value only; not confirmed in Figma variables).
