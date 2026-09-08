---
name: generate-commit-message-from-staged
description: Analyze staged changes and generate a concise conventional commit message.
---

# Generate Commit Message from Staged Changes

Automatically analyze git staged changes and generate a concise conventional commit message following the [Conventional Commits](https://www.conventionalcommits.org/) standard.

## When to Use

Invoke this skill when you need to:
- Create a commit message from staged changes
- Follow conventional commits format consistently
- Generate a concise, descriptive message without manual writing
- Quickly commit staged work with proper categorization

## Conventional Commits Format

```
<type>[optional scope]: <description>

[optional body]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (formatting, missing semicolons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process, dependencies, or tooling
- **ci**: Changes to CI/CD configuration and scripts

### Scope (Optional)

The scope specifies what part of the codebase is affected:
- Component name (e.g., `Button`, `Modal`)
- Feature area (e.g., `auth`, `api`, `styling`)
- File category (e.g., `config`, `workflows`, `scripts`)

### Description

- Use imperative, present tense ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Keep it concise (50 chars or less)

## How It Works

### Step 1: Get Staged Changes

```bash
git diff --cached --name-only
git diff --cached --stat
git diff --cached
```

### Step 2: Analyze Changes

Categorize by:
- **File type**: detect if changes are features, fixes, docs, etc.
- **File location**: identify scope from directory structure
- **Change pattern**: analyze what was added, removed, or modified
- **Breaking changes**: check for any incompatible modifications

### Step 3: Determine Commit Type

- **feat**: New files, new functions, new exports
- **fix**: Bug fixes, patches, corrections
- **docs**: Changes to `.md`, comments, documentation files
- **style**: Formatting, linting, style changes
- **refactor**: Code reorganization without behavior change
- **perf**: Performance optimizations
- **test**: Test files and test changes
- **chore**: Dependency updates, build config, tooling
- **ci**: GitHub workflows, CI/CD scripts

### Step 4: Extract Scope

- From file path directory structure
- From modified file names
- From common naming conventions
- Prefer the most specific relevant scope

### Step 5: Generate Description

- Analyze what the changes do
- Create a concise description
- Use present tense, imperative mood
- Keep under 50 characters

### Step 6: Output Commit Message

Print the generated message in Conventional Commits format.

## Implementation Steps

### For Agents Using This Skill

1. **Get staged files**:
   ```bash
   git diff --cached --name-only
   ```

2. **Analyze the changes**:
   ```bash
   git diff --cached --stat
   git diff --cached [specific files if many]
   ```

3. **Determine type**:
   - Look at file locations and types
   - Identify the primary change category
   - Check for mixed changes (prefer higher specificity)

4. **Extract scope** (if applicable):
   - Use directory name (e.g., `src/components/Button` → scope: `Button`)
   - Use feature name (e.g., `src/features/auth` → scope: `auth`)
   - Use system area (e.g., `.github/workflows` → scope: `ci`)
   - Omit scope if unclear or single change

5. **Create description**:
   - Summarize what changes do
   - Use present tense imperative
   - Keep concise (50 chars max)
   - Example: "add user login flow" (27 chars)

6. **Output format**:
   ```
   type(scope): description
   ```
   or without scope:
   ```
   type: description
   ```

## Examples

### Feature
```
feat(auth): add password reset flow
feat: add new dark theme option
```

### Fix
```
fix(Button): prevent double-click submission
fix: correct typo in error message
```

### Documentation
```
docs: update installation guide
docs(api): add endpoint examples
```

### Chore
```
chore: update dependencies
chore(ci): migrate workflows to pnpm
```

### Refactor
```
refactor(utils): simplify date formatting
```

## Tips for Quality Commits

1. **Be specific**: Reference what changed, not "make updates"
2. **Keep scope minimal**: Use the most relevant scope level
3. **Imperative mood**: "add" not "added", "fix" not "fixed"
4. **Lowercase first char**: Only the type is capitalized
5. **No period**: Description ends without punctuation
6. **Concise**: Aim for 50 chars or less
7. **Informative**: Describe "what" and "why" not just "what changed"

## Rules

- Must have a type
- Description is required
- Scope is optional
- Follow imperative mood
- Keep it concise
- No period at end of description
- Type and scope are lowercase
- No extra formatting or emojis

## Output

The skill generates:
- **Format**: Conventional commit message
- **Output**: Printed to stdout
- **Example**:
  ```
  feat(Button): add loading state variant
  ```

## Related Skills

- `code-review` - Review code changes
- `generate-pr-comment-from-diff` - Generate PR comments from diff
