# Replace figma-metadata-scraper with instructions-machine

## Overview

Replaces `tooling/figma-metadata-scraper` with a new `tooling/instructions-machine` package, and generates the first batch of committed component docs under `docs/instructions/`. Where the old scraper only pulled raw metadata JSON, the new tool discovers every component on a Figma **page**, resolves every color/spacing/radius/typography value to its real design-token name, and renders one durable Markdown file per page — something a future LLM session (or human) can read to build/update a component without live Figma access. The `new-web-component` and `update-web-component` skills are updated to check these docs first, falling back to live Figma only when the doc is missing or incomplete.

## ✨ Key Changes

### 1. `tooling/instructions-machine` (new package, replaces `figma-metadata-scraper`)
- ✅ `discover.ts` — finds every `COMPONENT_SET`/`COMPONENT` on a page plus any sibling `"<Name> Metadata"` frame
- ✅ `extract.ts` — walks a component's variants into a `ComponentSpecDoc` (structure, properties, resolved values)
- ✅ `metadata.ts` (renamed from `figma-metadata-scraper/parse.ts`) — classifies a metadata frame's content into hero/sections
- ✅ `token-resolver.ts` — value-based typography matching against `resolved-tokens.json` (the one case bound variables can't resolve)
- ✅ `variables.ts` — fetches a file's Figma Variables once, maps id → token name
- ✅ `render-markdown.ts` / `generate-page-docs.ts` — renders final Markdown, CLI entrypoint
- ✅ Colors/spacing/radius/stroke are resolved from each node's actual bound Figma Variable, not a guessed reverse lookup from raw hex/px — avoids picking a wrong token when a raw value is shared by several token names
- ✅ Pure Figma REST API, no MCP, no screenshots, no cross-package dependencies
- ✅ Deletes `tooling/figma-metadata-scraper/*` and `tooling/utils/extract-component-props.ts`

### 2. Generated component docs (`docs/instructions/*.md`)
- ✅ 15 new docs committed: avatar, badge, button, dialog, divider, dropdown, global-header, icon, navigation-bar, navigation-rail, pagination, progress-indicator, search, tab-bar, top-app-bar
- ✅ Each covers layer structure, resolved tokens per variant, and (where a matching metadata frame exists in Figma) hero/anatomy/how-to-use/accessibility content

### 3. Skill updates
- ✅ `new-web-component` — checks `docs/instructions/<component>.md` first; falls back to `figma-design-to-code` + live `get_design_context` only if the doc is missing or lacks detail
- ✅ `update-web-component` — same doc-first pattern; diff the doc mentally against current implementation before touching code

### 4. `package.json` script changes
- ✅ `scrape:metadata` → `docs:figma` (`pnpm --filter @zebra-design-system/instructions-machine run generate`)
- ✅ Added `test:figma` and a root `test` script (`test:tokens && test:figma && test:web`)
- ✅ Removed `extract:props` (backed the now-deleted `tooling/utils/extract-component-props.ts`)
- ✅ `typecheck` now targets `instructions-machine` instead of `figma-metadata-scraper`

### 5. `.gitignore`
- ✅ Dropped the `tooling/figma-metadata-scraper/output/` ignore rule — package removed, ignore rule now lives with the new package's own `output/` (debug JSON dumps in `output/specs/` and `output/metadata/`, not the committed `.md` artifact)

## ⚠️ Breaking Changes

- `pnpm run scrape:metadata` no longer exists — use `pnpm run docs:figma`
- `pnpm run extract:props` removed with no replacement
- `tooling/figma-metadata-scraper` package is gone; anything referencing it directly (imports, CI steps, docs) needs updating

## ✅ Testing / Verification

- New `tooling/instructions-machine/test/output-shape.test.ts` covers the generated output shape
- `pnpm run test:figma` wired into root `test` script

## 📝 Commits

1. `bcd81e77` refactor(tooling): replace figma-metadata-scraper with instructions-machine
2. `c30c6d1e` refactor(skills): skills are aware of instruction files

## 🔄 Next Steps

- [ ] Run `pnpm run docs:figma` periodically (or add to CI) to keep `docs/instructions/*.md` in sync as Figma designs change
- [ ] Fill in `pages.json` with any remaining component pages not yet covered
- [ ] Known limitations to watch (see `tooling/instructions-machine/README.md`): per-corner radius only reads top-left, gradient fills unresolved, typography only matches the `mobile` breakpoint

## 📚 References

- `tooling/instructions-machine/README.md` — full design/usage notes for the new tool
