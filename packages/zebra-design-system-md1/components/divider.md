# Component: Divider

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Divider |
| **Category** | Layout |
| **Functional Role** | A thin line that separates groups of related content. |
| **Usage Restrictions** | Decorative only; do not use to convey state or as an interactive element. Avoid stacking with container borders. |

**Variant axes**

| Axis | Values |
|:---|:---|
| **Orientation** | horizontal, vertical |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Line** | Separator | Single stroke spanning the available length; horizontal fills width, vertical fills height | Required |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Line Color** | `color.border.default` | Neutral separation |
| **Line Thickness** | `size.stroke.thin` | Hairline |
| **Corner Radius** | `size.radius.none` | Square ends |

---

## 4. Interactive State Matrix

Non-interactive; no states exist in the design.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | none | `color.border.default` | none | Static separator |

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | Not applicable | Thickness `size.stroke.thin`; length from parent | `size.space.*` around it |
| **Tablet** | Not applicable | Same | `size.space.*` |
| **Desktop / POS** | Not applicable | Same | `size.space.*` |

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (3:1 non-text) when it conveys structure | `color.border.default` should hold 3:1 where grouping is essential; otherwise purely decorative. |
| **Focus Indicator** | SC 2.4.7 | Not focusable. |
| **Target Size** | SC 2.5.8 | Not applicable. |
| **Accessible Name** | SC 1.3.1 | Exposed as a separator with orientation, or hidden if purely decorative. |

---

### Token gaps

- The vertical specimen height in Figma is a fixed sample length with no token; length is supplied by the parent layout.
