# Component: Icon

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Icon |
| **Category** | Data Display |
| **Functional Role** | Renders a single glyph from the icon library to reinforce meaning, status or action. |
| **Usage Restrictions** | Never the sole carrier of meaning; pair with text. Names must exist in `icons.json`; do not substitute a similar glyph. |

**Variant axes**

| Axis | Values |
|:---|:---|
| **Size** | small, medium, large |
| **Framed** | false, true |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Frame** | Fixed square hit and layout area when Framed | Transparent square, centers the glyph | Present only when Framed = true |
| **Glyph** | The icon artwork | Single-color glyph (specimen: `Verified`) | Required |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Glyph Color** | `color.foreground.primary` (default; consumers may override with another `color.foreground.*` or `color.interactive.*.foreground.*`) | Readable glyph |
| **Glyph Size, small** | `size.control.icon.sm` | Compact scale |
| **Glyph Size, medium** | `size.control.icon.md` | Standard scale |
| **Glyph Size, large** | `size.control.icon.lg` | Prominent scale |
| **Frame Size (Framed)** | `size.control.target.min` | Minimum touch area |

---

## 4. Interactive State Matrix

The Icon is non-interactive and has no state variants in the design. Interactive states belong to the host component (for example Icon Button).

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | none | none | `color.foreground.primary` | Static glyph |
| **Disabled** | none | none | `color.foreground.disabled` | Host-driven dimming |

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | `size.control.icon.*`; Framed uses the touch target | `size.space.*` |
| **Tablet** | `size.control.target.min` | `size.control.icon.*` | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` | `size.control.icon.*` | `size.space.*` |

Framed variants (all three sizes) occupy `size.control.target.min` square, with the glyph centered at its size token.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (3:1 non-text) | Meaningful glyphs hold 3:1 against the background in both themes. |
| **Focus Indicator** | SC 2.4.7 | Not focusable by itself. |
| **Target Size** | SC 2.5.8 | Interactive icons use the Framed variant or extend the hit area to `size.control.target.min`. |
| **Accessible Name** | SC 1.1.1 / 4.1.2 | Decorative glyphs are hidden from assistive technology; meaningful glyphs expose a text alternative. |

---

### Token gaps

- None for bindings. Figma variables seen: `foreground/primary`, `control/icon-sm|md|lg`, `control/target-min`, all mapped.
