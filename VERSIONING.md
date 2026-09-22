# Versioning Guide

This project uses **Nx Release** with **Conventional Commits** for independent semantic versioning. Each package that exists today (`tokens`, `zeta-web`) is versioned independently based on the changes it receives. Flutter and Android packages are planned but don't exist in this repo yet — see the Implementation Checklist below.

## Quick Start

### Making a Release (Standard Workflow)

**Important:** Always work on feature branches and merge via PR. Never push directly to `main`.

1. **Create a feature branch and make changes with Conventional Commits**:
   ```bash
   git checkout -b fix/button-focus-ring
   git commit -m "fix(button): correct focus ring color on dark backgrounds"
   # Make more commits as needed
   ```

2. **Push to GitHub and open a Pull Request**:
   ```bash
   git push origin fix/button-focus-ring
   # → Open PR on GitHub, get reviewed, merge when approved
   ```

3. **After PR is merged to `main`, pull the latest locally**:
   ```bash
   git checkout main
   git pull origin main
   # Your merged commits are now on main
   ```

4. **Dry-run the release pipeline** to see what would be released:
   ```bash
   pnpm exec nx release --dry-run
   ```
   This shows version bumps and changelog entries **without making any changes**.

5. **Create the actual release** when ready:
   ```bash
   pnpm exec nx release
   ```
   This will:
   - Scan commits on `main` since the last tag (including your merged PRs)
   - Infer new versions for each changed package
   - Generate/update CHANGELOG.md for each package
   - Commit the version and changelog changes to git
   - Create git tags (e.g., `@zebra-design-system/zeta-web@1.5.0`)

6. **Push to GitHub** to trigger CI/CD:
   ```bash
   git push origin main --follow-tags
   ```

That's it for now — nothing is actually published anywhere from this repo yet. `nx release` only creates versions, changelogs, and git tags. See "Current State" below.

**⚠️ Key Rules:**
- ✅ Always work on **feature branches** with PR review before merging
- ✅ Use **Conventional Commits** in all branch commits (they count toward versioning once merged)
- ✅ Always run `pnpm exec nx release` from the **`main` branch** (never from feature branches)
- ❌ Never push directly to `main` — use PRs for all changes

---

## Commit Standards

**→ See [CONTRIBUTING.md](./CONTRIBUTING.md#commit-standards)** for detailed commit format, types, scopes, and examples.

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/) — this is required for automatic version bumps.

---

## How It Works

### Independent Versioning

Each package is versioned independently. When you commit a change:

1. **Nx scans conventional commits** since the last release tag for each package
2. **Infers the version bump** (patch, minor, major) based on commit types
3. **Updates package.json** version and generates/updates CHANGELOG.md
4. **Creates a git tag** named `{packageName}@{version}` (e.g., `@zebra-design-system/tokens@1.0.1`)

### Tag Pattern

Git tags follow the pattern `{packageName}@{version}`. Currently in use:
- `@zebra-design-system/zeta-web@1.4.3`
- `@zebra-design-system/tokens@1.0.1`

Planned, once those packages exist:
- `zeta_flutter@2.1.0`
- `com.zebra.zeta.android@1.0.0`

Legacy tags (e.g., `zeta-web-v1.4.2`) are preserved and never re-tagged.

### Dependency Updates

If `@zebra-design-system/tokens` releases a new version, `@zebra-design-system/zeta-web`'s dependency range is automatically updated in its package.json (typically a patch bump). However:

- **Breaking changes in tokens** require an explicit breaking-change commit in zeta-web itself to force a major bump
- This is intentional: it keeps consumers aware of breaking changes and requires explicit review


## Checking Version Inference

Before committing changes, you can preview what the next version will be:

```bash
# Dry-run: see what versions would be bumped (no changes written)
pnpm exec nx release version --dry-run --verbose

# Shows:
# @zebra-design-system/zeta-web: current 1.4.2 → inferred 1.5.0 (minor bump from feat commits)
# @zebra-design-system/tokens: current 1.0.0 → no changes detected
```

---

## Understanding the Release Files

After running `pnpm exec nx release`, you'll see:

**Updated files:**
- `packages/zeta-web/CHANGELOG.md` — new release section with all commits, grouped by type
- `packages/zeta-web/package.json` — version field updated
- `packages/foundations/tokens/CHANGELOG.md` — if tokens had changes
- `pnpm-lock.yaml` — dependency version ranges updated

**Git changes:**
- Commit: "chore(release): publish zeta-web@1.5.0" (automatically created)
- Tags: `@zebra-design-system/zeta-web@1.5.0` (and any other packages that changed)

---

## Local Development Workflow

### Making a Fix

```bash
# 1. Make your changes and commit with a conventional message
git commit -m "fix(button): correct focus ring color on dark backgrounds"

# 2. Preview the release
pnpm exec nx release --dry-run

# 3. When ready, create the release
pnpm exec nx release

# 4. Push to GitHub
git push origin main --follow-tags
```

### Making a Breaking Change

```bash
# 1. Make changes and commit
git commit -m "feat!(button): change API from variant to type prop

The 'variant' prop is no longer supported. Use 'type' instead.
See MIGRATION.md for details."

# 2. Check that it infers a major bump
pnpm exec nx release version --dry-run --verbose
# Output: @zebra-design-system/zeta-web@1.4.2 → 2.0.0 ✓

# 3. Release
pnpm exec nx release

# 4. Push
git push origin main --follow-tags
```

---

## Troubleshooting

### "No changes were detected"

The release pipeline found no new commits with conventional-commit types since the last tag. This is expected if:
- You just updated docs or tests (commit types that don't trigger bumps)
- You haven't committed yet (use `git add .` and `git commit -m "..."`)

To check what commits Nx sees:
```bash
git log @zebra-design-system/zeta-web@1.4.2..HEAD --oneline
```

### "No git tags matching pattern... were found" (but the tag exists)

This means the release tag exists but isn't an ancestor of `HEAD` — usually because a squash-merge or rebase rewrote the history it was pointing at, stranding it. Check with:

```bash
git merge-base --is-ancestor "@zebra-design-system/<package>@<version>" HEAD && echo OK || echo STRANDED
```

If stranded, delete and re-create it at the current `HEAD`:

```bash
git tag -d "@zebra-design-system/<package>@<version>"
git tag -a "@zebra-design-system/<package>@<version>" HEAD -m "@zebra-design-system/<package>@<version>"
```

Note: this repo's git config signs tags (`tag.gpgSign = true`), so `git tag -a ... -m ...` will prompt for your GPG passphrase — run it in a real terminal, not through an automated tool.

### "Version looks wrong for tokens"

Tokens has never had independent releases — its first Nx-driven bump is inferred from all unscoped commits that touched `packages/foundations/tokens/**`. If the inferred version seems off, you can override it:

```bash
pnpm exec nx release version --specifier=patch --projects=@zebra-design-system/tokens
```

### "Want to undo a release?"

If you ran `pnpm exec nx release` and want to undo it (before pushing):

```bash
# Find the tags created
git tag -l "@zebra-design-system/*"

# Delete them locally
git tag -d @zebra-design-system/zeta-web@1.5.0 @zebra-design-system/tokens@1.0.1

# Reset the commit
git reset --soft HEAD~1

# Edit package.json and CHANGELOG back to previous versions, then:
git add .
git commit -m "chore: revert accidental release"
```

**Never** run `git push` with the tags if you're unsure.

---

## Current State: Nothing Is Published From This Repo

`pnpm exec nx release` only creates versions, changelogs, and git tags — no package is currently published anywhere from this monorepo.

There is a `.github/workflows/zeta-web-on-release.yml` that publishes `zeta-web` to npmjs.com on a GitHub Release. It's a leftover artifact from when `zeta-web` was pulled in from its old standalone (pre-monorepo) repo, not an active or intentional part of this repo's release process — don't rely on it.

To see what a published artifact would look like without actually publishing:

- `pnpm exec nx run <package>:pack` creates a tarball in `dist/artifacts/`
- Verify tarball contents: `tar -tzf dist/artifacts/*.tgz | head`

Real distribution (npm, GAR, Pub.dev, Maven, etc.) isn't set up yet — see the Implementation Checklist below for planned phases.

---

## Implementation Checklist

### Phase 1: Complete Versioning System Setup ✅ (Already Done)
- [x] Nx initialized with independent project versioning
- [x] Workspace restructured (tokens → foundations/tokens)
- [x] Project.json files created for all packages
- [x] Bootstrap tags created (@zebra-design-system/zeta-web@1.4.2, tokens@1.0.0)
- [x] Nx release config validated and tested
- [x] Dry-run and pack targets verified working
- [x] VERSIONING.md documentation complete

### Phase 2: Git & Team Setup ⏳ (Ready, Awaiting Signature)
- [x] Run git commands to create baseline tags (requires your git signature)
- [x] Commit Phase 1 + Phase 2 changes
- [x] Push to GitHub with `--follow-tags`
- [x] Verify CI/CD runs without errors
- [ ] Share VERSIONING.md with team

### Phase 3: npm Publishing to Google Artifact Registry (GAR)
**Prerequisites:** Google Cloud project, GAR repository created
- [ ] Create npm repository in GAR (e.g., `us-central1-npm.pkg.dev/PROJECT/npm-repo`)
- [ ] Create service account with "Artifact Registry Writer" role
- [ ] Generate and store GAR_NPM_TOKEN as GitHub secret
- [ ] Add `.npmrc` with GAR registry URL and token reference
- [ ] Create `.github/workflows/publish-npm.yml` workflow (triggered on `@zebra-design-system/*@*` tags)
- [ ] Test: make a feature commit, run `pnpm exec nx release`, push tags
- [ ] Verify: check GAR console for published packages
- [ ] Update CI to run publish job (or confirm it runs automatically on tag)

### Phase 4: Flutter Publishing to Pub.dev
**Prerequisites:** Pub.dev account (or private Flutter registry)
- [ ] Confirm Flutter project structure in `packages/flutter/zeta_flutter/`
- [ ] Set up Pub.dev credentials (OAuth token)
- [ ] Store PUB_DEV_CREDENTIALS as GitHub secret
- [ ] Create `.github/workflows/publish-flutter.yml` workflow (triggered on `zeta_flutter@*` tags)
- [ ] Add Flutter build targets to Nx (if not already present)
- [ ] Test: make a feature commit to Flutter package, release, verify Pub.dev
- [ ] Document: add Flutter versioning notes to VERSIONING.md

### Phase 5: Android Publishing to Maven (GAR or Cloud Run)
**Prerequisites:** Maven repository configured, credentials available
- [ ] Set up private Maven repository (GAR, Cloud Run, Artifactory, or Nexus)
- [ ] Get Maven endpoint URL and authentication credentials
- [ ] Store as GitHub secrets: MAVEN_REPO_URL, MAVEN_USERNAME, MAVEN_PASSWORD
- [ ] Add Maven/Gradle configuration to Android package
- [ ] Create `.github/workflows/publish-android.yml` workflow (triggered on `com.zebra.zeta.android@*` tags)
- [ ] Add Android build targets to Nx (if not already present)
- [ ] Test: make a feature commit to Android package, release, verify Maven repo
- [ ] Document: add Android versioning notes to VERSIONING.md

### Phase 6: Icons Package (Future)
**When ready to publish @zebra-fed/zeta-icons or @zebra-design-system/zeta-icons:**
- [ ] Determine registry (npm GAR, or keep external)
- [ ] Create Nx project.json with `tags: ["release"]` and `targets: { build, pack, nx-release-publish }`
- [ ] Wire up versioning to use Conventional Commits
- [ ] Create corresponding CI workflow if publishing to GAR
- [ ] Add to VERSIONING.md scope reference table

### Phase 7: AI Skills Package (Future)
**When ready to publish @zebra-fed/zeta-skills to external registry:**
- [ ] Determine registry (npm public, GAR, or other)
- [ ] Create Nx project.json with release configuration
- [ ] Set up MCP server / Skills distribution
- [ ] Create CI workflow for distribution
- [ ] Document versioning policy (independent from design system packages or coupled?)

### Phase 8: Process & Documentation
- [ ] Add pre-commit hook enforcing Conventional Commits (optional, recommended)
  ```bash
  pnpm add -D commitlint @commitlint/config-conventional
  # Add .commitlintrc.js and git hook
  ```
- [ ] Set up branch protection rules requiring version PR review
- [ ] Document package owner responsibilities (who owns what, who approves releases)
- [ ] Create internal runbook: "How to troubleshoot a failed release"
- [ ] Set up Slack notifications for successful/failed releases
- [ ] Train team on the versioning workflow (walkthrough, Q&A)

### Phase 9: Continuous Improvement
- [ ] Monitor releases for any unexpected version bumps
- [ ] Collect feedback from team on workflow friction
- [ ] Adjust commit scope conventions if needed
- [ ] Document any ad-hoc release decisions or exceptions
- [ ] Review and update this checklist quarterly

---

## Current Status by Registry

| Registry | Status | Next Step |
|----------|--------|-----------|
| **Versioning & Tagging** | ✅ Complete | Push to GitHub with baseline tags |
| **npm (GAR)** | ⏳ Ready to configure | Set up GAR repo + credentials |
| **Flutter (Pub.dev)** | 📋 Planned | Create Flutter package structure |
| **Android (Maven)** | 📋 Planned | Set up Maven + Gradle config |
| **Icons** | 📅 Future | Determine registry, create project |
| **Skills** | 📅 Future | Plan distribution model |

---

## Reference

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Nx Release Docs](https://nx.dev/features/manage-releases)
- [GAR npm Setup](https://cloud.google.com/artifact-registry/docs/npm/quickstart)
- [Pub.dev Publishing](https://dart.dev/tools/pub/publishing)
- [Android Publishing to Maven](https://developer.android.com/studio/publish/maven-publish-plugin)
