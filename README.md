# Zebra Design System

A monorepo containing the Zebra Design System, including design tokens, web components, design tooling, and example applications. Managed with **Nx** for build orchestration and independent semantic versioning.

## What's included

- **`packages/zeta-web`** — Web components library built with Lit (`@zebra-design-system/zeta-web`)
- **`packages/foundations/tokens`** — Design tokens with CSS, JavaScript, and Dart exports (`@zebra-design-system/tokens`)
- **`tooling/token-machine`** — Private tool to fetch, convert, build, and export design tokens

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

### Run Storybook

```bash
pnpm storybook
```

### Run Tests

```bash
pnpm test:web
```

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

## Versioning & Releases

This project uses **Conventional Commits** for automatic semantic versioning via Nx Release.

- **[VERSIONING.md](./VERSIONING.md)** — How to release packages, commit format, troubleshooting

Each package (`zeta-web`, `tokens`, future platforms) is versioned independently. Releases are triggered via Conventional Commit types (`feat:`, `fix:`, `feat!:`, etc.).

