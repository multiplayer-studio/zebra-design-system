# Zebra Design System

A monorepo containing the Zebra Design System, including design tokens, web components, design tooling, and example applications. Managed with **Nx** for build orchestration and independent semantic versioning.

## What's included

- **`packages/zeta-web`** — Web components library built with Lit (`@zebra-design-system/zeta-web`)
- **`packages/foundations/tokens`** — Design tokens with CSS, JavaScript, and Dart exports (`@zebra-design-system/tokens`)
- **`packages/zebra-design-system`** — Umbrella package that re-exports everything (`@zebra-design-system/zebra-design-system`)
- **`tooling/token-machine`** — Private tool to fetch, convert, build, and export design tokens
- **`tooling/instructions-machine`** — Private tool that generates durable Markdown docs per Figma page (components, variants, resolved tokens) for LLM-assisted component work

## Quick Start

### Setup

```bash
pnpm install
```

#### Environment Variables

Create a `.env` file in the root with:

```
FIGMA_FILE_KEY=<your-figma-file-key>
FIGMA_PERSONAL_ACCESS_TOKEN=<your-figma-personal-access-token>
```

- `FIGMA_FILE_KEY` — the key segment in the Figma file's URL, e.g. `figma.com/file/<FIGMA_FILE_KEY>/...`
- `FIGMA_PERSONAL_ACCESS_TOKEN` — generate one from your Figma account following [Figma's guide on managing personal access tokens](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens)

### Run Storybook

```bash
pnpm storybook
```

### Run Tests

```bash
pnpm test:web
```

#### Test Coverage Notes

Some test suites in `zeta-web` are currently **skipped** during the token migration:

- **Accessibility tests** — Skipped pending design team input on new token accessibility values. The components render correctly, but color contrast and accessibility assertions need to be verified against the finalized token values.
- **Dimensions & Styling tests** — Skipped because the new design tokens affect layout and visual measurements. We're evaluating whether to:
  - Remove these tests in favor of visual regression testing
  - Convert them to use dynamic token-based assertions instead of hard-coded pixel values

These tests will be re-enabled once the token values are finalized and test strategies are updated.

### Make a Release

See **[VERSIONING.md](./VERSIONING.md)** for how to version and release packages independently using Conventional Commits.

## Build Orchestration with Nx

This monorepo uses **Nx** to orchestrate builds, run tests, and manage independent package versioning.

```bash
# Build all affected packages
pnpm exec nx run-many -t build

# Test a specific package
pnpm exec nx run @zebra-design-system/zeta-web:test

# Dry-run a release to see what would version
pnpm exec nx release --dry-run
```

See [Versioning](./VERSIONING.md) for more Nx release commands and workflows.

## Token Pipeline

```bash
# Full token pipeline (fetch → convert → build → export)
pnpm run sync:tokens

# Or individual steps:
pnpm run build:tokens   # Build from committed DTCG tokens
pnpm run export:tokens  # Export to dist
```

## Design Sync Automation

When a PR lands on `main` that changed `docs/figma-generated-instructions/**` or `packages/foundations/tokens/**`,
[`.github/workflows/design-sync-on-merge.yml`](.github/workflows/design-sync-on-merge.yml) picks it up:

1. **Regenerate** — runs `pnpm run sync:design` (platform token variables first, then the
   instruction docs/metadata/specs, which resolve tokens out of the token build's output).
2. **Triage** — Claude Haiku loads the [`triage-design-changes`](.claude/skills/triage-design-changes/SKILL.md)
   skill to classify the change (nature / impact / complexity), trace it to the affected `zeta-web`
   source files, audit whether the code already matches, and plan the smallest set of PRs — one per
   component, or one shared PR where components share a mixin.
3. **Implement** — one agent per planned PR (Haiku for `low` complexity, Sonnet for `high`) follows
   [`update-web-component`](.claude/skills/update-web-component/SKILL.md) (or [`new-web-component`](.claude/skills/new-web-component/SKILL.md)), commits with Conventional
   Commits so Nx Release picks up the version bump, opens the PR, then generates a PR comment via
   [`generate-pr-comment-from-diff`](.claude/skills/generate-pr-comment-from-diff/SKILL.md).

`patch`-impact PRs get auto-merge enabled; `minor` and `major` wait for review, with `major` labelled `breaking-change`. 

Requires the `ANTHROPIC_API_KEY`, `FIGMA_PERSONAL_ACCESS_TOKEN`, `FIGMA_FILE_KEY`
and `PERSONAL_ACCESS_TOKEN` secrets.

```bash
pnpm run sync:design   # what step 1 runs locally (needs .env with Figma credentials)
```

## Design Token Component Migration

The zeta-web components are being progressively updated to use the new design token system. This ensures consistent theming, improved maintainability, and alignment with the design system.

**Components Updated to New Tokens: 17 of ~48**
- Button (base-button)
- Icon Button
- Divider
- Global Header
- Icon
- Pagination
- Search
- Dropdown (droppable, dropdown-menu-button, dropdown-menu-item)
- Avatar
- Tab Bar
- Badges (indicator, label, priority-pill, status-label, tag)
- Card (card, header, body, footer, container)
- Dialog
- Navigation Bar
- Navigation Rail (rail, rail item)
- Progress Indicators (progress bar, progress circle)
- Top App Bar

**Migration Status:** Ongoing — Components are being updated incrementally.

## Versioning & Releases

This project uses **Conventional Commits** for automatic semantic versioning via Nx Release.

- **[VERSIONING.md](./VERSIONING.md)** — How to release packages, commit format, troubleshooting

Each package (`zeta-web`, `tokens`, future platforms) is versioned independently. Releases are triggered via Conventional Commit types (`feat:`, `fix:`, `feat!:`, etc.).

## Contributing

Branches and commit messages should follow the conventional commits standards. 

Always push the pnpm-lock.yaml file.
