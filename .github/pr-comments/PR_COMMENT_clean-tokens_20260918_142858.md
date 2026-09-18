# 🧹 Clean Tokens: Consolidate Token Exports into Resolved Format

## Overview

This PR refactors the token build system to consolidate token exports into a unified, resolved-tokens format. The changes remove intermediate JavaScript and split JSON exports while introducing a new `export-resolved-tokens` module that generates comprehensive, merged token bundles. This simplifies the token architecture by eliminating fragmented outputs and providing a single source of truth for resolved tokens.

**Key motivation**: Reduce token distribution complexity and provide cleaner, more usable token exports.

---

## ✨ Key Changes

### 1. **Token Build System Refactoring** (tooling/token-machine)
- ✅ Added new `export-resolved-tokens.ts` module for consolidated token export pipeline
- ✅ Removed `js-synthesizer.ts` and `building-block-js-synthesizer.ts` (JS generation no longer needed)
- ✅ Updated `build-tokens/index.ts` to skip JS synthesis steps and introduce resolved fragments directory
- ✅ Updated style-dictionary formats configuration to support new export strategy
- ✅ Modified `convert-tokens.ts` to prepare tokens for resolved export
- ✅ Updated constants and config to reference `RESOLVED_FRAGMENTS_DIR`

### 2. **Token Distribution Cleanup** (packages/foundations/tokens/dist)
- ✅ **Removed**: 17 JavaScript files (colors, companion-colors, sizes, typography, palette variants, semantics, etc.)
- ✅ **Removed**: 8 JSON files (split palette, primitives-value, semantics-base files)
- ✅ **Added**: 2 new comprehensive resolved token JSON files:
  - `resolved-companion-tokens.json` (~3,996 lines) — merged companion theme tokens
  - `resolved-target-tokens.json` (~3,996 lines) — merged target theme tokens
- ✅ **Expanded**: `resolved-tokens.json` (now 5,206+ lines, ~5,000 line net expansion)
- ✅ **Updated**: CSS files across all categories with minor reference updates

### 3. **Token Source Data Updates** (tooling/token-machine/tokens)
- ✅ Modified DTCG token definitions in all collections:
  - `primitives-value.json`, `primitives-target-value.json`
  - `semantics-base.json`
  - All size variants (desktop, mobile, tablet, compact)
  - All typography variants (desktop, mobile, tablet, compact)
- ✅ Updated `raw-tokens.json` with structural reorganization (7,341 lines changed)

### 4. **Build Configuration Updates**
- ✅ Updated `config.json` to support new resolved fragments directory
- ✅ Updated `package.json` to reflect new build dependencies/scripts
- ✅ Updated `.gitignore` for new build artifacts

---

## 📊 Impact Analysis

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total files changed** | — | 73 | — |
| **Lines added** | — | 16,873 | — |
| **Lines deleted** | — | 18,377 | — |
| **JS exports** | ~17 files | Removed | -1,800+ lines |
| **JSON exports** | 8 split files | 2 comprehensive files | Consolidated |
| **Resolved tokens** | 1 file | 3 files (expanded) | +5,000 net lines |

### What Breaks
⚠️ **Breaking Changes**:
- **JavaScript imports**: Any code importing token JS files (e.g., `from '@zebra/tokens/dist/js/colors'`) will break
- **Split JSON imports**: Code relying on split JSON files (e.g., `palette-dark.json`, `semantics-base.json`) will need migration to `resolved-tokens.json` or category-specific alternatives
- **Consumption patterns**: Consumers will need to update import statements to use new export structure

### What Stays Stable
✅ **Backward compatible**:
- CSS exports remain and are updated
- Resolved tokens can be consumed as before (expanded with new variants)
- Build process is internal; no public API change beyond token files themselves

---

## 🔄 Distribution Changes

### Removed (Cleaned Up)
```
dist/js/
  ├── colors.js
  ├── companion-colors.js
  ├── companion-sizes.js
  ├── companion-typography.js
  ├── palette/
  │   ├── companion.js
  │   ├── default.js
  │   └── target.js
  ├── primitives/
  │   ├── default.js
  │   └── target.js
  ├── semantics.js
  ├── size/
  │   └── default.js
  ├── sizes.js
  ├── target-colors.js
  ├── target-sizes.js
  ├── target-typography.js
  ├── typography.js
  └── typography/default.js

dist/json/
  ├── palette-companion-dark.json
  ├── palette-companion-light.json
  ├── palette-dark.json
  ├── palette-light.json
  ├── palette-target-dark.json
  ├── palette-target-light.json
  ├── primitives-target-value.json
  ├── primitives-value.json
  ├── semantics-base.json
  ├── size-desktop.json (split files)
  ├── size-mobile.json
  ├── size-tablet.json
  ├── typography-desktop.json (split files)
  └── typography-*.json (all variants)
```

### Added (New Consolidated Exports)
```
dist/json/
  ├── resolved-tokens.json (expanded, all tokens merged)
  ├── resolved-companion-tokens.json (NEW, companion theme only)
  └── resolved-target-tokens.json (NEW, target theme only)

dist/css/ (maintained, no change to availability)
  └── All existing CSS files updated
```

---

## 🛠️ Build Process Changes

### Before
```
Compile tokens → Generate CSS → Generate JS (colors, sizes, typography, etc.) → Generate JSON (split by type/theme)
```

### After
```
Compile tokens → Generate CSS → Generate Resolved Fragments → Export Resolved Tokens (merged JSON)
```

### New Export Module
The `export-resolved-tokens.ts` module:
- Loads resolved token fragments from a temporary directory
- Merges them into comprehensive theme-specific and universal bundles
- Outputs 3 consolidated JSON files: `resolved-tokens.json`, `resolved-companion-tokens.json`, `resolved-target-tokens.json`
- Handles deep merging of DTCG tokens with proper type preservation

---

## ✅ Testing & Verification

To verify this change works correctly:

1. **Build tokens**:
   ```bash
   pnpm nx run @zebra/tokens:build
   ```
   Verify:
   - ✅ New resolved JSON files are created in `dist/json/`
   - ✅ CSS files are generated correctly
   - ✅ No JavaScript files in `dist/js/`

2. **Check resolved tokens**:
   ```bash
   cat packages/foundations/tokens/dist/json/resolved-tokens.json | jq 'keys | length'
   ```
   Should output a count of merged tokens (5,000+)

3. **Verify structure**:
   ```bash
   jq '.color, .size, .typography | keys | length' packages/foundations/tokens/dist/json/resolved-tokens.json
   ```
   Verify all token categories are present

4. **CSS outputs**:
   ```bash
   ls -la packages/foundations/tokens/dist/css/
   ```
   Verify CSS files exist and have content

5. **Update consuming code**:
   - Any components importing JS token files need to migrate to resolved JSON
   - Update test fixtures that reference JS imports
   - Update build configurations if they reference JS token paths

---

## 📋 Commits

- `69c845cf` — refactor(tokens): consolidate token exports into resolved format

---

## 🚀 Next Steps

- [ ] Review token consolidation strategy and verify no data loss
- [ ] Update all consuming packages that import JS token files
- [ ] Update documentation to reflect new token import paths
- [ ] Update build/test fixtures that reference old token file structure
- [ ] Test in dependent packages to ensure resolved tokens work as expected
- [ ] Update token consumption guide in documentation
- [ ] (Optional) Add deprecation notice or migration guide for consumers

---

## 📚 References

- Token machine: `tooling/token-machine/`
- Token distribution: `packages/foundations/tokens/dist/`
- New export module: `tooling/token-machine/export-resolved-tokens.ts`
- Build process: `tooling/token-machine/build-tokens/index.ts`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
