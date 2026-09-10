# 📚 Extract Contributing Guide & Refactor Versioning Docs

## Overview

Extracted commit standards and contribution guidelines into a dedicated `CONTRIBUTING.md` file, improving documentation organization and making each guide focused and easier to navigate. The `VERSIONING.md` has been streamlined to concentrate on release workflows while commit conventions now live in the contributing guide.

## ✨ Key Changes

### 📝 Documentation Reorganization

#### **New File: `CONTRIBUTING.md` (+150 lines)**
Comprehensive guide covering:
- **Adding a new package** — Nx generator commands for libraries and apps
- **Importing existing projects** — Step-by-step process with Nx configuration
- **Transferring repos with git history** — Git subtree instructions to preserve full history
- **Commit standards** — Conventional Commits format, types, scopes, breaking changes, and detailed examples
  - Scope reference table for tokens, zeta-web, flutter, android, icons, ci, config, build
  - Examples showing patch, minor, major version bumps
  - Multiple-package commit patterns

#### **Modified: `VERSIONING.md` (-107 lines)**
Streamlined to focus on release workflows:
- Quick-start release workflow (feature branch → PR → release command)
- Release mechanics (how Nx scans commits and infers versions)
- Tag patterns and independent versioning
- Dry-run and troubleshooting guidance
- Implementation checklist (phases 1–9)
- Removed detailed commit standards (now in CONTRIBUTING.md)
- Cross-reference to CONTRIBUTING.md for commit format

## 🎯 Impact

### **For Contributors**
- **Clearer entry point**: New contributors go to CONTRIBUTING.md for "how do I contribute?"
- **Better organization**: Commit standards are with other contribution guidance, not release mechanics
- **Easier reference**: Scopes, types, and examples are in one focused section

### **For Release Engineers**
- **Focused guide**: VERSIONING.md is now purely about release workflows and tag patterns
- **Cross-referenced**: Direct link to CONTRIBUTING.md for commit conventions they'll need to know
- **Maintainable**: Separating concerns makes updates easier (commit changes go to CONTRIBUTING.md, release changes stay in VERSIONING.md)

## 📊 Diff Summary

```
 CONTRIBUTING.md | 150 +++++++++++++++++++++++++++++++++++++++++++++++ (new)
 VERSIONING.md   | 107 +--------- (streamlined, removed ~107 lines)
 ───────────────────────────────
 2 files changed, 153 insertions(+), 104 deletions(-)
```

## ✅ Commits

1. **`a987140d`** — `docs: added contributing guide` — Created CONTRIBUTING.md with package scaffolding, import, and git history preservation guidance
2. **`a4c4a30b`** — `docs: extracted commit standards from VERSIONING.md` — Moved commit format details to CONTRIBUTING.md, leaving VERSIONING.md focused on release workflows

## 🔄 Next Steps

- [ ] Review documentation clarity and scope coverage
- [ ] Verify contributing guide examples work end-to-end
- [ ] Merge PR and add to team onboarding materials
- [ ] Consider adding CONTRIBUTING.md to GitHub repo settings (displays on PR template)

## 📚 References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Nx Release Docs](https://nx.dev/features/manage-releases)
