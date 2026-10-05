# Component: Notification Indicator

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Notification Indicator |
| **Category** | Feedback |
| **Functional Role** | A compact marker that signals unread or pending items on another element, either as a bare dot or as a count. |
| **Usage Restrictions** | Never use as a standalone control or as the only carrier of meaning; always attach to a host element that has its own accessible name. Counts too long for the Large size must be truncated or capped, not enlarged. |

### Variant Axes

| Axis | Values |
|:---|:---|
| **Size** | Small, Medium, Large |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Marker surface | Filled shape; pill-shaped for Small and Medium, wider capsule for Large | Required |
| **Count Label** | Numeric value | Centered short text, clipped if overflowing | Required when Size = Medium or Large; absent when Size = Small |

Small is a dot with no label. Medium is a round badge holding a single-character count. Large is a capsule holding a longer count.

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Container Background** | `color.interactive.destructive.background.default` | Attention fill |
| **Container Border Color** | `color.border.inverse` | Separation from host |
| **Container Border Width** | `size.stroke.base` | No visible border at rest |
| **Corner Radius (Small, Medium)** | `size.radius.pill` | Fully round |
| **Corner Radius (Large)** | `size.radius.pill` | Capsule ends |
| **Label Typography (Medium, Large)** | `typography.indicator.medium` | Compact count text |
| **Label Text Color** | `color.interactive.destructive.foreground.default` | Contrast on attention fill |
| **Internal Padding (Medium)** | `size.space.none` | Count fills the circle |
| **Internal Padding (Large)** | `size.space.xs` horizontal | Count inset |
| **Large Height Reference** | `size.control.icon.lg` governs width | Capsule width |

---

## 4. Interactive State Matrix

The Notification Indicator is non-interactive. The design defines no hover, pressed, focused or disabled states.

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | `color.interactive.destructive.background.default` | `color.border.inverse` at `size.stroke.base` | `color.interactive.destructive.foreground.default` | Static marker |

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | Not applicable (non-interactive) | Small dot, Medium round badge, Large capsule; Large width `size.control.icon.lg` | `size.space.none` and `size.space.xs` |
| **Tablet** | Not applicable | Same as Mobile | Same as Mobile |
| **Desktop / POS** | Not applicable | Same as Mobile | Same as Mobile |

| Size | Content | Shape |
|:---|:---|:---|
| **Small** | None (dot) | Round |
| **Medium** | Single-character count | Round |
| **Large** | Multi-character count | Capsule |

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Count text on the attention fill, and the fill against the host surface, must hold contrast in both themes; the inverse border preserves separation. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | Not focusable; the host element carries the focus ring. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Not a target. The host element provides the hit area. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | The host's accessible name must include the count or a "has notifications" statement; the Small dot must not rely on color alone and needs a text equivalent on the host. |

---

## Token gaps

- Figma Large uses a 10-unit corner radius and 3-unit vertical padding that are not tokens; the spec uses `size.radius.pill` and omits vertical padding.
- Medium and Large fix the label size at the indicator scale; no `typography.indicator.large` exists and none is required.
- Fixed Small (8), Medium (16) and Large (28 by 20) dimensions have no dedicated keys; only `size.control.icon.lg` approximates the Large width.
