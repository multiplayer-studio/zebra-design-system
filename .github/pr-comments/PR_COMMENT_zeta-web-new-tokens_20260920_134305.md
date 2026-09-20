# Token System Refactor & Component Flavor Migration

## Overview
This PR modernizes the design system's token infrastructure and standardizes component implementations across the codebase. Major work includes consolidating the centralized flavor system across components, updating the token architecture with cleaner JSON outputs, adding the new Divider component, and improving the search component with flavor support. Since the last update, the focus shifted to hardening the token-machine build pipeline (deduped CSS formats, typography shorthand vars, new test suite), migrating theme mode from an attribute to a property, removing build artifacts from git tracking, general repo/CI cleanup (sinon removal, gitignore reorg, skill renames), and — staged but not yet committed — renaming token-machine's `tokens/` source directory to `source/`.

## ✨ Key Changes

### 1. 🎨 Component Flavor System Refactor
Migrating components to use centralized flavor types from the flavor mixin:
- ✅ **Button** - Centralized flavor handling with improved styling architecture
- ✅ **Icon Button** - Flavor support with cleaner style composition
- ✅ **Tile Button** - Flavor types integration
- ✅ **Dialog** - Flavor support with improved button handling; button `shape` is now controllable independently of flavor (`11072dad`)
- ✅ **FAB** - Centralized flavor types implementation
- ✅ **Stepper Item** - ButtonFlavor imported from flavor mixin
- ✅ **Search Component** - Added flavor support, then further enhanced (searchbar improvements, `60577121`)

### 2. 🆕 Divider Component
Complete addition of new Divider component:
- ✅ Component implementation (`divider.ts` - 34 lines)
- ✅ Component styles (`divider.styles.js` - 20 lines)
- ✅ Storybook stories (`divider.stories.ts` - 34 lines)
- ✅ Component tests (`divider.test.ts` - 62 lines)
- ✅ Figma Code Connect mapping (`divider.figma.ts` - 9 lines)
- ✅ Documentation (`Docs.mdx`)

### 3. 🪙 Token System & Build Pipeline
- ✅ **Token Generation** - Generated locales and updated token system
- ✅ **Raw Tokens** - Major overhaul of raw tokens JSON
- ✅ **Token Compatibility** - New CSS compatibility layer (`tokens-compat.css` - 145 lines)
- ✅ **Theme Mode Migration** - `data-theme` attribute replaced by a `data-mode` property/attribute across global-header, pagination, search, and the accessibility test runner (`60577121`)
- ✅ **CSS Format Dedup** - `css/variables` and `css/variables-root` Style Dictionary formats consolidated into one renderer; unused `javascript/object-entries` format removed (`c4dcadde`)
- ✅ **Typography Shorthand** - New `buildTypographyShorthand` synthesizes shorthand CSS vars (e.g. `--display-large`) from sibling font-weight/size/line-height/family vars, emitted once outside breakpoint media blocks (`c4dcadde`)
- ✅ **Build Pipeline Consolidation** - `export`/`pack` steps moved into token-machine's own `postbuild`/`artifact` nx targets; dead `export-dtcg-tokens.ts` removed (`c4dcadde`)
- ✅ **Token Machine Tests** - Added vitest suite: `css-synthesizer.test.ts`, `utils.test.ts`, `test/build-output.test.ts` (191 lines), wired up as an nx `test` target
- ✅ **Build Artifacts Untracked** - `packages/foundations/tokens/dist/**` (CSS, resolved JSON, `.tgz` artifact - ~16K lines) removed from git tracking; `.gitignore` reorganized across root, `zeta-web`, and `foundations/tokens` (`1cc56ab9`, `e83779a5`, `69938426`)
- 🟡 **Source Directory Rename (staged, uncommitted)** - `tooling/token-machine/tokens/` renamed to `tooling/token-machine/source/` (raw-tokens.json + dtcg-tokens/*.json), with `config.json`, `clean-tokens.ts`, `project.json`'s `build` inputs, `build-output.test.ts`, and the token-machine `README.md` all updated to match. `fetch-tokens.ts` also drops an unused `...rest` spread when writing variable objects. `raw-tokens.json` is no longer `.gitignore`d — it's tracked directly under the new `source/` path instead.

### 4. 🧬 Flavor & Mixin System Enhancements
- ✅ **Flavor Styles** - Comprehensive updates to flavor.styles.js with improved color mapping
- ✅ **Flavor Types** - Updated flavor.ts with better type definitions
- ✅ **Interactive Styles** - Enhanced interactive.styles.js mixin
- ✅ **Icon Styling** - Significant improvements to icon.styles.js
- ✅ **Global Header** - Updated to use new flavor system and property-based theme mode
- ✅ **Pagination** - Style and test updates alongside theme mode migration

### 5. 🧪 Test Infrastructure Cleanup
- ✅ **Sinon Removed** - `sinon` dependency dropped from both root and `zeta-web`; spy/stub assertions simplified across `button`, `tile-button`, `dialog`, `global-header`, and `stepper` tests (`549a800d`)
- ✅ **Accessibility Test Runner** - Local `getContrast` implementation replaces the `polished` import; `data-theme` → `data-mode` attribute updated to match the theme mode migration
- ✅ **New Tooling** - `tooling/utils/extract-component-props.ts` added (ts-morph based prop extractor) with an `extract:props` root script
- ✅ **Web Test Runner Commands** - `test`/`test:watch` switched from `web-test-runner` to the `wtr` bin; added `test:file`/`test:file:watch` and a dedicated `typecheck` script (`13103acb`)
- ✅ **Root `check` Script** - New `pnpm check` composes `typecheck` + `lint` + `format` across token-machine, figma-metadata-scraper, and zeta-web (`b83b9c37`)

### 6. 🗂️ Repository Reorganization
- ✅ **Package Structure** - Added zebra-design-system README for better package documentation
- ✅ **Storybook Config** - Updated main.ts with improved configuration
- ✅ **CSS Organization** - Consolidated styles.css with token updates
- ✅ **Index Files** - Updated component exports in index.ts
- ✅ **Skills Renamed** - Repo skills renamed/updated (`44f3eb55`, `c63a9733`)
- ✅ **README** - Added "Design Token Component Migration" section tracking progress (7 of ~48 components); `CLAUDE.md` updated with instructions to keep it in sync (`56a8c3d9`)

### 7. 🧹 Repository Cleanup
Removed stale and redundant files:
- ✅ **Workflows** - Removed `codeql.yml`, `create-figma-links.yml`, `dependency-review.yml`, `on-main.yml`, `on-release.yml`, `pull-request.yml`, `update-icons.yml`, and `pr-summary-claude.yml` (`d89c1e24`)
- ✅ **Skills** - Removed old new-component SKILL.md
- ✅ **Vscode Config** - Cleaned up `.vscode/extensions.json`, `launch.json`, `settings.json`
- ✅ **Yarn Release** - Removed bundled yarn 4.18.0.cjs
- ✅ **Repository Config** - Removed CODEOWNERS file
- ✅ **Workflow Helpers** - Removed link-docs workflow helpers (action.yml, index.js)
- ✅ **Build Artifacts** - Removed committed `dist/` output for `foundations/tokens` (see Token System section)

### 8. 🧪 Test Updates
Comprehensive test updates across all modified components to support new flavor system and theme mode migration:
- Button, Icon Button, Tile Button, Dialog, FAB, Stepper, Search, Pagination, Global Header, and many more
- Tests updated to properly validate new flavor type implementations and the `data-mode` attribute

### 9. 📖 Storybook & Documentation
- ✅ **Icon Stories** - Major updates to icon.stories.ts with improved showcase
- ✅ **Search Stories** - Added search component stories with new flavor examples, then updated for theme mode
- ✅ **Button Stories** - Updated for new flavor system
- ✅ **Divider Stories** - New stories for divider component
- ✅ **Divider Docs** - New MDX documentation file
- ✅ **PR Comment Skill** - Updated to no longer include a full commit list (`de42e580`)

## 📊 Impact Summary
- **Files Changed**: 165 (151 committed + 14 staged, mostly renames)
- **Insertions**: ~11,100
- **Deletions**: ~32,200 (largely committed `dist/` build output being untracked, plus the `tokens/` → `source/` rename re-diffing renamed JSON files)
- **Net Impact**: Leaner git history (no build artifacts), a more maintainable token pipeline with a clearer `source/` naming convention, and a cleaner component/theme-mode architecture
- **Uncommitted**: The `tokens/` → `source/` rename (`.gitignore`, `config.json`, `clean-tokens.ts`, `fetch-tokens.ts`, `project.json`, `build-output.test.ts`, `README.md`, and all `dtcg-tokens/*.json` + `raw-tokens.json`) is currently staged but not committed

## ✅ Testing / Verification
- ✅ Component tests updated for new flavor system and theme mode migration
- ✅ Storybook stories demonstrate new implementations
- ✅ Token generation verified
- ✅ Divider component fully tested
- ✅ Search component flavor support validated
- ✅ New token-machine vitest suite covers CSS synthesis and build output
- ✅ `pnpm check` now runs typecheck + lint + format in one command
- ⬜ Staged `source/` rename not yet verified with a full `sync:tokens` / `build:tokens` run

## 🔄 Next Steps
- [ ] Commit the staged `tokens/` → `source/` rename
- [ ] Review flavor system consistency across all components
- [ ] Verify token changes in visual regression testing
- [ ] Test Divider component in various contexts
- [ ] Confirm `data-mode` migration doesn't break consumers still setting `data-theme`
- [ ] Continue README "Design Token Component Migration" count as more components move to new tokens
- [ ] Documentation review for new components

## 📚 References
- Flavor mixin pattern documentation
- Token system architecture
- Component migration guide for flavor types
- Divider component specifications
- `CLAUDE.md` README sync-maintenance guidance

---
Generated with [Claude Code](https://claude.com/claude-code)
