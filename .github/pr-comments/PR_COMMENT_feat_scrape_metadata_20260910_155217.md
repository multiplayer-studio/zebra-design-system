# 🔗 Figma Metadata Scraper & Component Scope Analysis

Infrastructure for syncing Figma design specs with implementation code.

## Overview

This PR adds two new capabilities to the design system tooling:
1. **Figma Metadata Scraper** — A build tool that extracts component documentation frames from Figma and exports them as structured JSON suitable for AI context, doc generation, and design-code synchronization
2. **Component Scope Analysis Skill** — A reusable methodology for comparing design specifications against implementation code to catch gaps and mismatches

Together, these enable **design-spec-to-code verification** and provide rich documentation context for build pipelines.

Also includes **GitHub Actions improvements** to ensure PR comments are reliably generated and committed to the branch.

## ✨ Key Changes

### 1. Figma Metadata Scraper (`tooling/figma-metadata-scraper/`)

A new build tool in the Nx workspace:

- **`parse.ts`** (712 lines) — Core scraping logic
  - Parses Figma REST API responses into structured component metadata
  - Structural classification for tables, anatomy, how-to-use, and bullet-list sections
  - Position-based cell bucketing for sparse table rows
  - Checkmark detection (converts boolean iconography to JSON `true/false`)
  - Graceful fallback to `kind: 'unknown'` for unrecognized section types

- **`scrape-metadata.ts`** (145 lines) — CLI entry point
  - Fetches component frames from Figma using `FIGMA_PERSONAL_ACCESS_TOKEN` and `FIGMA_FILE_KEY`
  - Generates one JSON file per component in `output/`
  - Supports scraping all components or a single component by name

- **`types.ts`** (79 lines) — TypeScript interfaces for the JSON output schema

- **Configuration**
  - `components.json` — Maps component names to their Figma node IDs (e.g., `"Button": "3840:907"`)
  - `config.json` — Figma file key and base config
  - `project.json` — Nx project metadata with `scrape` and `selfcheck` targets
  - `package.json` — Dependencies and npm scripts

- **Documentation** (`README.md`)
  - Setup instructions (requires `FIGMA_PERSONAL_ACCESS_TOKEN` and `FIGMA_FILE_KEY` in root `.env`)
  - Usage from workspace root (`pnpm scrape:metadata`) or tool directory (`pnpm scrape`)
  - Output JSON schema with examples (component name, source URL, hero section, structured sections)
  - Section kinds: `table`, `anatomy`, `how-to-use`, `bullet-list`, `unknown`
  - Implementation notes on structural classification, position bucketing, and checkmark handling

### 2. Component Scope Analysis Skill (`.claude/skills/component-scope-analysis/SKILL.md`)

A 236-line methodology document for AI-assisted design-code comparison:

- **Phase 1** — Parse Design Intent: Extract all specified properties, variants, states, dimensions, colors, animations
- **Phase 2** — Map Code Architecture: Trace inheritance chains, mixins, framework wrappers
- **Phase 3** — Extract Available Properties: Find all property declarations from root to leaf classes
- **Phase 4** — Discover Styling & Behavior: Identify variants, animations, responsive behavior, state selectors
- **Phase 5** — Deep Dive on Gaps: For each missing property, confirm it's truly missing, check for naming mismatches, verify CSS implementation

Works across Web Components, React, Vue, Svelte, Flutter, Python, Kotlin, and other frameworks/languages.

### 3. GitHub Actions Workflow Improvements

Fixed PR comment generation reliability:

- **Branch Checkout** — Now checks out the actual PR head branch (not the merge commit) to ensure the latest changes are visible
- **Full History** — Fetch depth set to 0 to ensure complete git history is available for accurate diff analysis
- **Branch Name Escaping** — Fixed escaping logic to properly handle branch names with special characters (`/`, `-`, etc.)
- **Script Updates** — Enhanced `generate-pr-comment.sh` to consistently escape branch names when finding/creating PR comment files

### 4. Workspace Integration

Added **`pnpm scrape:metadata`** command to root `package.json`:
```bash
"scrape:metadata": "pnpm --filter @zebra-design-system/figma-metadata-scraper run scrape"
```

Aligns with existing `sync:tokens` pattern for design system build steps.

## 📊 Diff Summary

```
 16 files changed, 1,529 insertions(+), 4 deletions(-)

 .claude/skills/component-scope-analysis/SKILL.md     +236
 tooling/figma-metadata-scraper/README.md             +152
 tooling/figma-metadata-scraper/parse.ts              +712
 tooling/figma-metadata-scraper/scrape-metadata.ts    +145
 tooling/figma-metadata-scraper/types.ts              +79
 tooling/figma-metadata-scraper/project.json          +31
 tooling/figma-metadata-scraper/package.json          +17
 tooling/figma-metadata-scraper/tsconfig.json         +17
 tooling/figma-metadata-scraper/components.json       +4
 tooling/figma-metadata-scraper/config.json           +5
 .github/workflows/generate-pr-comment.yml            +5 -1
 .claude/skills/generate-pr-comment-from-diff/generate-pr-comment.sh  +7 -1
 .github/pr-comments/PR_COMMENT_*.md                  +109 (generated)
 .gitignore                                           +1
 package.json                                         +1
 pnpm-lock.yaml                                       +12
```

## 📋 Commits

1. `347e0ea7` chore(config): added figma-metadata-scraper/output to .gitignore
2. `882988b4` feat(build): figma-metadata-scraper script and commands
3. `411a1db3` claude skill comparing json metadata to actual component
4. `c883340e` claude PR comment (initial generation)
5. `cfc989b8` retrigger workflow
6. `2fe804fd` fix(workflow): checkout PR head branch instead of merge commit
7. `111efabc` fix(workflow): fetch full depth and add debug step
8. `95e1ebfc` debug: add detailed logging to find-comment-file step
9. `bac9a880` fix: consistent branch name escaping for PR comment filenames

## 🚀 What's Next

- [ ] Populate `components.json` with actual Figma node IDs from the Zebra design system
- [ ] Run `pnpm scrape:metadata` to generate initial metadata exports
- [ ] Use `component-scope-analysis` skill to audit component implementations against Figma specs
- [ ] Integrate metadata into docs/context pipelines (future work noted in tool README)
- [ ] Consider schema validation (JSONSchema or Zod) for robustness

## 📚 Testing / Verification

- [x] Tool includes self-check command (`pnpm selfcheck`) for regression testing
- [x] TypeScript type checking available (`pnpm typecheck`)
- [x] Skill structure follows design-system-agnostic methodology
- [x] GitHub Actions workflow now reliably generates and commits PR comments
- [x] Branch name escaping handles special characters correctly

---

🎯 **Note**: This infrastructure is scaffolding — no metadata is generated yet pending Figma node ID configuration and token setup. The tool is ready to use once `FIGMA_PERSONAL_ACCESS_TOKEN` is set in `.env` and component frame IDs are added to `components.json`.
