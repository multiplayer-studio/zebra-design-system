# Zebra Design System

This repository is a monorepo containing everything related to the Zebra Design System — the packages that ship it, the services that support it, the tooling that builds it, its documentation, and apps that showcase it.

## Folder structure

- **`apps/`** — A collection of example applications to show off the system and the website used to host the documentation.
- **`packages/`** — Publishable packages, such as the design tokens package (`packages/zebra-design-system-tokens`). See `packages/PACKAGES_README.md`.
- **`services/`** — Standalone services that support the design system, such as the MCP server (`services/mcp-server`). See `services/mcp-server/MCP_README.md`.
- **`tooling/`** — Internal tools used to build and maintain the design system, such as the token machine. See `tooling/token-machine`.

Each of these top-level folders has its own README with more detail on what lives inside it.

## Getting started

Install dependencies from the root of the repo:

```
npm i
```

This installs dependencies for every workspace (`apps/*`, `tooling/*` and `packages/*`) in one step.

