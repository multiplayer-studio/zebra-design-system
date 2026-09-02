# Zebra Design System

A monorepo containing the Zebra Design System, including design tokens, web components, design tooling, and example applications.

## What's included

- **`packages/tokens`** — Design tokens package with CSS, JavaScript, and Dart exports
- **`packages/zeta-web`** — Web components library built with Lit
- **`apps/token-showcase-web`** — Example React app demonstrating token usage
- **`tooling/token-machine`** — Tool to fetch, convert, build, and export design tokens

## Setup

Install dependencies (works with Yarn 4):

```bash
yarn install
```

## Available commands

### Tokens

- `yarn sync:tokens` — Full token pipeline (clean → fetch → convert → build → export)
- `yarn clean:tokens` — Clean token artifacts
- `yarn fetch:tokens` — Fetch tokens from source
- `yarn convert:tokens` — Convert tokens to internal format
- `yarn build:tokens` — Build tokens
- `yarn export:tokens` — Export tokens to dist

### Web components

- `yarn storybook` — Run Storybook for `zeta-web` components
- `yarn test:web` — Run tests for `zeta-web`

### Apps

- `yarn dev:tokens-web` — Run the token showcase app (Vite dev server)

