# Component: Tab Bar

---

## 1. Overview & Role

| Attribute | Specification |
|:---|:---|
| **Component Name** | Tab Bar |
| **Category** | Navigation |
| **Functional Role** | A horizontal row of tab items that switches between sibling views. Exactly one tab is selected, marked by an underline. |
| **Usage Restrictions** | Not for primary app navigation or for actions that do not switch a view. Tabs must be siblings of equal weight. |

**Variant axes in the source design**

| Axis | Component | Values |
|:---|:---|:---|
| **Flavour** | Tab Bar | full width (tabs share the bar width equally), condensed (tabs size to content) |
| **State** | Tab Item (Navigation Rail Item) | default, hover, selected, disabled |
| **Optional parts** | Tab Item | leading icon, notification badge |

---

## 2. Visual Anatomy

| Layer / Slot | Structural Role | Visual Nature | Required / Optional |
|:---|:---|:---|:---|
| **Container** | Bar surface | Solid section background | Required |
| **Tab Slot** | Holds the tab items in a row | Horizontal layout | Required |
| **Tab Item** | One selectable tab | Transparent fill with bottom underline | Required |
| **Leading Icon** | Contextual glyph (icon `Star` shown as placeholder) | Icon glyph | Optional |
| **Label** | Tab name | Text, single line, truncates | Required |
| **Notification Badge** | Count indicator trailing the label | Filled pill with short count text | Optional |
| **Selected Underline** | Marks the selected tab | Bottom stroke in primary color | Required on selected |

---

## 3. Semantic Token Bindings

| Element Property | Semantic Token Reference | Fallback Intent |
|:---|:---|:---|
| **Bar Background** | `color.surface.section` | Bar canvas |
| **Tab Background (rest)** | `color.interactive.ghost.background.default` | Transparent |
| **Tab Underline (rest)** | `color.border.transparent` | Hidden underline |
| **Tab Underline Weight** | `size.stroke.thick` | Underline emphasis |
| **Selected Underline Color** | `color.interactive.primary.border.default` | Selection marker |
| **Label Typography** | `typography.label.medium` | Tab text |
| **Label Color (rest, hover)** | `color.foreground.secondary` | De-emphasized text |
| **Label Color (selected)** | `color.interactive.neutral.foreground.default` | Emphasized text |
| **Label Color (disabled)** | `color.interactive.neutral.foreground.disabled` | Inactive text |
| **Icon Size** | `size.control.icon.md` | Glyph size |
| **Horizontal Padding** | `size.space.gutter` | Edge padding |
| **Vertical Padding** | `size.space.md` | Vertical padding |
| **Slot Gap** | `size.space.sm` | Gap between icon, label, badge |
| **Min Tab Height** | `size.control.lg` | Tab bounds |
| **Badge Background** | `color.interactive.destructive.background.default` | Alert fill |
| **Badge Text** | `color.interactive.destructive.foreground.default` | Count text |
| **Badge Typography** | `typography.indicator.medium` | Count text |
| **Badge Horizontal Padding** | `size.space.xs` | Badge padding |
| **Badge Edge Stroke** | `size.stroke.base` with `color.border.inverse` | Badge perimeter |

---

## 4. Interactive State Matrix

| State | Background Token | Border Token | Foreground / Content Token | Visual Behavior |
|:---|:---|:---|:---|:---|
| **Default (Rest)** | `color.interactive.ghost.background.default` | `color.border.transparent` | `color.foreground.secondary` | Baseline appearance |
| **Hover** | `color.interactive.ghost.background.hover` | `color.border.transparent` | `color.foreground.secondary` | Pointer over tab; subtle tint |
| **Selected** | `color.interactive.ghost.background.focused` | `color.interactive.primary.border.default` | `color.interactive.neutral.foreground.default` | Underline in primary color |
| **Disabled** | `color.interactive.ghost.background.default` | `color.border.transparent` | `color.interactive.neutral.foreground.disabled` | Inactive; suppress all interactions |
| **Focused** | `color.interactive.ghost.background.focused` | 2px solid `color.focus.ring` | `color.foreground.secondary` | Keyboard focus (guardrail; not drawn in the design) |

Pressed is not defined in the source design.

---

## 5. Form-Factor Scaling & Sizing

| Viewport Profile | Min Touch Target | Component Height / Bounds | Internal Spacing Tier |
|:---|:---|:---|:---|
| **Mobile / Rugged Handheld** | `size.control.target.min` | `size.control.lg` | `size.space.*` |
| **Tablet** | `size.control.target.min` | `size.control.lg` | `size.space.*` |
| **Desktop / POS** | `size.control.target.min` | `size.control.lg` | `size.space.*` |

Full width flavour distributes tabs evenly across the bar. Condensed flavour sizes each tab to its content.

---

## 6. Accessibility & Interaction Guardrails

| Guideline Area | WCAG 2.2 Criterion | Implementation Contract |
|:---|:---|:---|
| **Contrast Ratio** | Level AA (4.5:1 text, 3:1 non-text) | Label tokens must keep contrast against `color.surface.section` in both themes; the underline must be 3:1 against the bar. |
| **Use of Color** | SC 1.4.1 (Use of Color) | Selection is shown by underline and label emphasis, not color alone. |
| **Focus Indicator** | SC 2.4.7 (Focus Visible) | A 2px ring using `color.focus.ring` surrounds the focused tab with minimum 2px offset. |
| **Target Size** | SC 2.5.8 (Target Size - Minimum) | Each tab is at least `size.control.target.min` in both dimensions. |
| **Accessible Name** | SC 4.1.2 (Name, Role, Value) | Each tab exposes its label, its selected state and its position in the set; badge count is announced. |

---

## Token gaps

- Badge corner radius is half its height; no matching radius key was bound (`size.radius.pill` is the nearest).
- Badge fixed height and width have no size tokens.
- The Figma selected tab uses `ghost/background/focused`; no dedicated selected-state key was bound.
- Figma binds label color on hover to `foreground.secondary`; no separate hover foreground exists.
