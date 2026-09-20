# Refactor: Dropdown Components Migrated to New Design Tokens

## Overview

This PR migrates the dropdown component suite (droppable, dropdown-menu-button, dropdown-menu-item) to the new Zebra design token system. All hardcoded CSS values are replaced with design tokens for consistency, maintainability, and theming. Additionally, the positioning and alignment API has been improved with clearer naming and backward compatibility for deprecated properties.

**Progress:** Dropdown is now the 8th component family migrated to the new token system (out of ~48).

---

## ✨ Key Changes

### 1. Design Token System Migration
- ✅ **All style files updated** to use new token variables (`--space-*`, `--control-*`, `--interactive-ghost-background-*`, `--radius-*`)
- ✅ **CSS variable replacements**:
  - `--spacing-medium` → `--space-md`
  - `--spacing-6xl` → `--control-md`
  - `--surface-hover` → `--interactive-ghost-background-hover`
  - `--surface-selected` → `--interactive-ghost-background-selected`
  - `--radius-minimal` → `--radius-sm`
- ✅ **Affected files**:
  - `dropdown-menu-button.styles.js`
  - `dropdown-menu-item.styles.js`
  - `droppable.styles.js`

### 2. API Improvements: Positioning & Alignment
- ✅ **New properties with clearer semantics**:
  - `position` (new) — Replaces `direction`; specifies which side of the anchor the droppable opens on
  - `align` (new) — Replaces `alignment`; specifies alignment along the perpendicular axis with context-aware defaults
- ✅ **Deprecated properties preserved for backward compatibility**:
  - `direction` → Deprecated, falls back to `position` for backward compatibility
  - `alignment` → Deprecated, falls back to `align` with smart mapping
- ✅ **Type exports for consuming components**:
  - `ZetaDroppablePosition` — Type for position values
  - `ZetaDroppableAlign` — Type for align values
- ✅ **Resolved getters** handle fallback logic internally:
  - `resolvedPosition` — Returns `position ?? direction ?? "bottom"`
  - `resolvedAlign` — Returns `align ?? (mapped alignment) ?? undefined`

### 3. Property Changes & Defaults
- ✅ **`matchParentWidth` default changed**: `true` → `false`
  - Now defaults to sizing the dropdown to fit its content with a sensible min-width
  - Provides better out-of-the-box UX; can still be enabled explicitly if needed
- ✅ **Improved documentation** for all positioning/alignment properties in JSDoc

### 4. Positioning Logic Enhancements
- ✅ **Vertical alignment calculation refined** for edge cases
- ✅ **Figma link updated** to current design file
- ✅ **Internal positioning methods refactored** to use resolved getters for consistency

### 5. Test Coverage Expanded
- ✅ **New comprehensive test suite**: `droppable.test.ts` (86 lines)
  - Tests for positioning logic with various anchor positions
  - Tests for alignment behavior
  - Tests for deprecated property fallbacks
- ✅ **`dropdown-menu-button.test.ts`** expanded (37 new lines)
  - Tests for new position/align props
  - Tests for default behavior
- ✅ **`dropdown-menu-item.test.ts`** expanded (16 new lines)
  - Validation of item-level behavior

### 6. Storybook Stories Updated
- ✅ **`dropdown-menu-button.stories.ts`** updated with new props showcased (21 lines changed)
- ✅ **`dropdown-menu-item.stories.ts`** refreshed (3 lines changed)

### 7. Documentation
- ✅ **README.md updated** to reflect Dropdown's migration to new tokens
  - Updated component count: 8 of ~48
  - Listed all three dropdown sub-components: droppable, dropdown-menu-button, dropdown-menu-item

---

## ⚠️ Breaking Changes

### 1. `matchParentWidth` Default Changed
- **Old behavior**: Dropdown defaulted to `matchParentWidth: true` (matched parent width)
- **New behavior**: Dropdown defaults to `matchParentWidth: false` (sizes to content)
- **Migration**: Explicitly set `matchParentWidth="true"` if you need the old behavior

### 2. Property Deprecations (with Backward Compatibility)
- **`direction` property** → Deprecated in favor of `position`
  - Still works as a fallback; will log deprecation warning in dev mode
  - Migration: Replace `direction="left"` with `position="left"`
- **`alignment` property** → Deprecated in favor of `align`
  - Smart mapping handles old values: `"end"` → context-aware edge alignment, `"start"` → default edge
  - Migration: Use `align="left"` / `align="right"` / `align="top"` / `align="bottom"` instead

### 3. New Required Knowledge
- **`position` and `align` are context-aware**:
  - When `position` is `"bottom"` or `"top"`: `align="left"` or `align="right"`
  - When `position` is `"left"` or `"right"`: `align="top"` or `align="bottom"`
  - Updated JSDoc clarifies these relationships

---

## 🧪 Testing / Verification

- ✅ All new tests passing
- ✅ Dropdown behavior validated across:
  - Standard positioning (bottom, top, left, right)
  - Alignment variations (left, right, top, bottom, center)
  - Deprecated property fallbacks
  - Default minWidth behavior
- ✅ Token values verified against design system
- ✅ Visual appearance tested with new token colors/spacing
- ✅ Backward compatibility confirmed for deprecated props

---

## 📝 Commits

1. `55f7af2c` — **refactor(dropdown): update to use new design tokens**
   - Migrates 3 dropdown sub-components to new token system
   - Introduces position/align API improvements
   - Expands test coverage
   - Updates README and documentation

---

## 📚 References

- **Figma Design File**: [Zebra Design System](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=2669-10309)
- **Storybook**: [Dropdown Component](https://design.zebra.com/web/storybook/?path=/docs/components-dropdown--docs)
- **Related Token Migration**: Dropdown follows the pattern established by Button, Icon Button, Divider, and other migrated components

---

## 🔄 Migration Guide

### If you're consuming the dropdown component:

**Minimal change needed** — No action required if you're not setting positioning props:
```tsx
// Still works! Default behavior improved (no longer forces parent width)
<zeta-dropdown-menu-button>
  <!-- items -->
</zeta-dropdown-menu-button>
```

**If you use positioning**:
```tsx
// Old way (deprecated but still works)
<zeta-droppable direction="left" alignment="end"></zeta-droppable>

// New way (recommended)
<zeta-droppable position="left" align="bottom"></zeta-droppable>
```

**If you relied on `matchParentWidth: true`**:
```tsx
// Old default behavior
<zeta-dropdown-menu-button match-parent-width></zeta-dropdown-menu-button>

// Or explicitly in JS
dropdownButton.matchParentWidth = true;
```

---

## ✅ Summary

**Files changed**: 12 | **Insertions**: 272 | **Deletions**: 60

This refactor brings the dropdown component family in line with the new design token system while improving the positioning API with clearer semantics and backward compatibility. All existing code continues to work; migration to new props is gradual.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
