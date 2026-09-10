# Contributing to Zebra Design System

## Adding a New Package

### Scaffold a new package with Nx

Use Nx generators to create new packages:

```bash
# Create a new library under packages/
pnpm exec nx generate @nx/js:library --directory packages --name my-package --bundler swc

# Create a new application under apps/
pnpm exec nx generate @nx/web:app --directory apps --name my-app
```

### Add an existing project to the monorepo

To integrate a project developed elsewhere:

1. Copy the project directory into `packages/` or `tooling/`
2. Create `project.json` in the project directory with Nx targets (build, test, lint, etc.)
3. Ensure `package.json` exists with the package name (`@zebra-design-system/my-package`)
4. Tag the project for release by adding `"tags": ["release"]` in `project.json` (enables independent versioning)
5. Run `pnpm install` to sync dependencies
6. Verify with `pnpm exec nx show project <project-name>`

(The workspace root uses `nx.json` for global config; individual packages use `project.json`.) See `packages/zeta-web/project.json` for a reference config.

## Transferring a Repo with Git History

To preserve full git history when integrating an existing repository:

### Git Subtree

```bash
# Add the external repo as a remote
git remote add <project-name> <repo-url>
git fetch <project-name> <branch>

# Merge as a subtree into packages/<project-name>
git subtree add --prefix packages/<project-name> <project-name>/<branch> --squash
```

### After Integration

- Ensure `project.json` is created with Nx configuration
- Add `"tags": ["release"]` for independent versioning
- Run `pnpm install` to sync dependencies
- Test with `pnpm exec nx show project <project-name>`
- Consider creating a conventional commit for the integration if combining separate histories

## Commit Standards

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) for automatic semantic versioning via Nx Release. This is **required** — commits that don't follow this format won't trigger version bumps.

### Commit Format

```
<type>(<scope>): <description>

<body>

<footer>
```

### Commit Types

- **`feat:`** → **minor version bump** (0.1.0 → 0.2.0) — new feature
- **`fix:`** → **patch version bump** (0.1.0 → 0.1.1) — bug fix
- **`perf:`** → **patch version bump** — performance improvement
- **`docs:`** → **no version bump** — documentation only
- **`chore:`** → **no version bump** — housekeeping (dependencies, CI, etc.)
- **`test:`** → **no version bump** — tests only
- **`refactor:`** → **no version bump** — code refactor
- **`style:`** → **no version bump** — formatting

### Breaking Changes (Major Bump)

Add `BREAKING CHANGE:` in the commit body to trigger a **major version bump** (1.0.0 → 2.0.0):

```
feat(button): redesign button API

BREAKING CHANGE: The `variant` prop has been renamed to `type`.
Consumers must update their imports.
```

Or use the shorthand `feat!:` in the type:

```
feat!(button): redesign button API

The `variant` prop has been renamed to `type`.
```

### Scope Reference

Use the `<scope>` to indicate which package or area a change affects:

| Scope | Package |
|-------|---------|
| `(tokens)` | Design tokens (`@zebra-design-system/tokens`) |
| `(zeta-web)` or `(button)`, `(card)`, etc. | Web components (`@zebra-design-system/zeta-web`) |
| `(flutter)` | Flutter package (`zeta_flutter`) |
| `(android)` | Android package (`com.zebra.zeta.android`) |
| `(icons)` | Icons package (future) |
| `(ci)` | GitHub workflows, CI configuration |
| `(config)` | Root config files (`nx.json`, `pnpm-workspace.yaml`, `.npmrc`) |
| `(build)` | Build scripts, Nx configuration, build tooling |
| *(no scope)* | Miscellaneous root changes (if unsure, omit scope) |

### Multiple Packages

If a commit affects multiple packages, list them:

```
fix(tokens,zeta-web): fix color contrast in semantic palette

This updates both the token definitions and their usage in zeta-web components.
```

Or make separate commits — Nx will version each package independently.

### Examples

**Patch bump** (zeta-web v1.4.2 → 1.4.3):
```
fix(button): correct padding on small button variant
```

**Minor bump** (tokens v1.0.0 → 1.1.0):
```
feat(tokens): add new semantic color for error states
```

**Major bump** (zeta-web v1.4.2 → 2.0.0):
```
feat!(components): remove deprecated legacy component API

BREAKING CHANGE: The legacy API for all components is removed.
Use the new recommended patterns in the migration guide.
```

**Monorepo changes** (no version bump):
```
chore(ci): update GitHub Actions node version

ci(deps): upgrade TypeScript to 5.2
```
