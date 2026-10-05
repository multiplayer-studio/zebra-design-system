# Component: Avatar

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Avatar |
| **Category** | Data Display |
| **Functional Role** | Represents a person or entity as initials, a photo, or a glyph on a colored swatch. Can carry an optional presence status indicator, an optional removal affordance and an optional ring. |
| **Usage Restrictions** | Do not use for decorative imagery. Do not convey presence by color alone; the status indicator always pairs color with a glyph. Removal affordance and status indicator are offered only as optional overlays. |

**Variant axes in the source design**

| Axis | Values |
|:---|:---|
| **Size** | xxxsmall, xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge |
| **Type** | initials, photo, icon |
| **Swatch Color** | purple, blue, sea, yellow, orange, green, burgundy |
| **Status** | available, away, busy, dnd, on shift, offline, close, icon |
| **Optional overlays** | ring, close, status (each toggled independently) |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Square bounding area, scales with Size | Circular clip | Required |
| **Swatch** | Colored fill behind initials or icon | Solid color fill, one of seven swatch colors | Required when Type = initials or icon |
| **Photo** | Person image filling the container | Image clipped to the container shape | Required when Type = photo |
| **Initials** | Two-letter identification | Text label centered on swatch | Required when Type = initials |
| **Icon** | Glyph centered on swatch (icon `Verified` shown as placeholder) | Icon glyph | Required when Type = icon |
| **Ring** | Outline around the container | Stroke around the perimeter | Optional |
| **Close Overlay** | Removal affordance at top trailing corner | Filled disc with `Close` glyph, scales with Size | Optional |
| **Status Overlay** | Presence marker at bottom trailing corner | Filled disc with state glyph, scales with Size | Optional |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Swatch Fill (purple)** | `color.chart.series.4` | Categorical hue |
| **Swatch Fill (blue)** | `color.chart.series.1` | Categorical hue |
| **Swatch Fill (sea)** | `color.chart.series.6` | Categorical hue |
| **Swatch Fill (yellow)** | `color.chart.series.7` | Categorical hue |
| **Swatch Fill (orange)** | `color.chart.series.11` | Categorical hue |
| **Swatch Fill (burgundy)** | `color.chart.series.5` | Categorical hue |
| **Initials Typography** | `typography.label.large` | Two-letter label (medium-scale reference size) |
| **Initials / Icon Color** | `color.foreground.inverse` | High-contrast content on swatch |
| **Ring Stroke Weight** | `size.stroke.thick` | Outline emphasis |
| **Ring / Overlay Edge Color** | `color.border.default` | Separation from background |
| **Status: Available** | `color.chart.positive` | Presence fill |
| **Status: Away** | `color.chart.series.8` | Presence fill |
| **Status: Busy** | `color.chart.negative` | Presence fill |
| **Status: DND** | `color.chart.series.4` | Presence fill |
| **Status: On Shift** | `color.chart.series.1` | Presence fill |
| **Status: Offline** | `color.chart.series.12` | Presence fill |
| **Status Glyph Color** | `color.foreground.inverse` | Glyph on presence fill |
| **Status / Close Glyph Names** | icons `Close`, `Check Mark`, `Verified` | Glyph content |

---

## 4. Interactive State Matrix

The Avatar itself is non-interactive in the source design. Only the optional Close Overlay is an action. No hover, pressed, focused or disabled visuals are defined in the design.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | Swatch tokens in Section 3 | `color.border.default` (Ring only) | `color.foreground.inverse` | Baseline appearance |

**Status values (visual only)**

| Status | Fill Token | Glyph |
|:---|:---|:---|
| **Available** | `color.chart.positive` | Presence glyph |
| **Away** | `color.chart.series.8` | Presence glyph |
| **Busy** | `color.chart.negative` | Presence glyph |
| **DND** | `color.chart.series.4` | Presence glyph |
| **On Shift** | `color.chart.series.1` | Presence glyph |
| **Offline** | `color.chart.series.12` | Presence glyph |
| **Close** | `color.chart.series.12` | `Close` |
| **Icon** | `color.chart.series.1` | Custom glyph |

---

## 5. Form-Factor Scaling & Sizing

Avatar size is selected by the Size axis, not by viewport. Overlays scale proportionally with the container.

| Size | Container | Notes |
|:---|:---|:---|
| **xxxsmall** | Smallest; ring, close and status overlays supported | Initials not shown |
| **xxsmall to small** | Small tier | Overlays scale proportionally |
| **medium** | `size.control.lg` | Aligns with large control height |
| **large to xxxlarge** | Larger tiers | Glyph and overlays scale proportionally |

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` (when Close Overlay is used) | Size axis | `size.space.none` |
| **Tablet** | `size.control.target.min` | Size axis | `size.space.none` |
| **Desktop / POS** | `size.control.target.min` | Size axis | `size.space.none` |

The Close Overlay at small sizes must extend its hit bounds to at least `size.control.target.min`.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Initials and glyphs in `color.foreground.inverse` must keep contrast against every swatch fill in both themes. |
| **Use of Color** | SC 1.4.1 (Use of Color) | Presence is conveyed by glyph as well as color. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | When the Close Overlay is interactive, a 2px focus ring using `color.focus.ring` must surround it. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Close Overlay hit bounds never fall below `size.control.target.min`. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Expose the person's name and, when shown, the presence status as text. Photo and icon types need a text alternative. |

---

## Token gaps

- No size tokens for the nine Avatar sizes (xxxsmall through xxxlarge) other than medium = `size.control.lg`.
- Ring color and ring stroke are not bound to a variable in Figma; `color.border.default` / `size.stroke.thick` are the closest matches.
- Initials typography is only bound at the 36 size (`label/large`); no per-size typography variables.
- Swatch green has no distinct variable in Figma; `color.chart.series.9` appeared on the page and is unassigned. Swatch and status color-to-token pairing is inferred from variable order.
- Presence and swatch colors use chart series tokens; no dedicated `color.status.*` or avatar swatch semantic keys exist.
- Figma glyphs use a placeholder `Verified` icon; presence glyph names have no matching icon in icons.json (`Check Mark` is the nearest).
