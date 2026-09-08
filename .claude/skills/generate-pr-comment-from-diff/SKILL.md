---
name: generate-pr-comment-from-diff
description: Examine the current git diff, analyze changes, and generate a comprehensive PR comment markdown file summarizing all modifications.
---

# Generate PR Comment from Diff

Automatically analyze git changes and generate a well-formatted PR comment markdown file that summarizes all modifications, organized by category and impact.

## When to Use

Invoke this skill when you need to:
- Create a PR comment that summarizes recent changes
- Document what was changed and why
- Provide reviewers with a clear summary of the diff
- Generate PR context without manual writing
- Update the PR comment with new commits

## Smart Mode (Token Saving & Context Preservation)

The skill automatically detects if there are new commits since the last PR comment was generated:
- **If no new commits exist**: The skill exits immediately and tells you to commit your changes
- **If new commits exist**: The skill reads the previous PR comment for context, then generates an updated PR comment
- This prevents unnecessary token usage when nothing has changed, and preserves accurate information from previous comments
- **Always creates a new timestamped file** rather than overwriting the previous one

## Overview

The skill:
1. Checks if there are new commits since the last PR comment for this branch
2. If **no new commits**: Exits early and tells you to commit your changes (saves tokens)
3. If **new commits exist**: Reads the previous PR comment for context
4. Reads the current git diff and recent commits
5. Categorizes changes by type (config, scripts, workflows, docs, etc.)
6. Identifies key modifications and their impact
7. Updates sections of the previous PR comment that are affected by new commits
8. Preserves information from the previous comment that is still accurate
9. Generates a new markdown file in `.github/pr-comments/` with a fresh timestamp
10. Returns the path to the newly generated file

## How It Works

### Step 0: Check for Previous PR Comment & New Commits

The skill first checks if a PR comment already exists for the current branch:

```bash
# Get current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Find the most recent PR comment file for this branch
LATEST_PR_COMMENT=$(ls -t .github/pr-comments/PR_COMMENT_${BRANCH}_*.md 2>/dev/null | head -1)

# If a previous PR comment exists:
#   - Extract the timestamp from its filename
#   - Check if there are commits after that timestamp
#   - If NO new commits → Exit (don't waste tokens)
#   - If YES new commits → Continue to generate updated PR comment

# If no previous PR comment exists:
#   - Continue directly to generate the first PR comment
```

**Result:**
- ✅ **No previous PR comment** → Generate PR comment immediately
- ✅ **Previous PR comment + new commits** → Read previous comment and generate updated version
- ⏸️ **Previous PR comment + no new commits** → Exit, inform user to commit changes

### Step 0.5: Read Previous PR Comment (if new commits exist and previous exists)

When new commits are detected and a previous PR comment exists:

```bash
# Read the previous PR comment to use as context
PREVIOUS_CONTENT=$(cat "$LATEST_PR_COMMENT")
```

**What to do with the previous content:**
- ✅ Use it as a **template** for the new PR comment
- ✅ **Preserve sections** that are still accurate (Overview, Key Changes for unchanged items, etc.)
- ✅ **Update sections** affected by new commits (Recent Commits, Diff Statistics, Testing/Verification, Next Steps)
- ✅ **Keep stable information** like Breaking Changes, References, implementation approach
- ✅ **Only remove or change** claims that are no longer true based on new commits
- ✅ **Always create a new file** with a fresh timestamp, don't modify the previous one

**Strategy:**
- Read through the previous PR comment section by section
- For each section, decide: "Is this still accurate with the new commits?"
  - If YES → Keep it as-is or slightly refresh it
  - If CHANGED → Update only the parts that changed
  - If NO → Replace it with current information
- Treat Overview, Key Changes, and Breaking Changes as mostly stable (unless new commits contradict them)
- Treat Diff Statistics, Recent Commits, Testing/Verification, and Next Steps as dynamic—update based on current state

### Step 1: Gather Diff Information (if new commits exist)

```bash
# Analyze the diff
git diff origin/main..HEAD --stat
git diff origin/main..HEAD --name-only
git diff origin/main..HEAD
```

### Step 2: Categorize Changes (if new commits exist)

Group modified files by category:
- **Config files**: `package.json`, `*.yml`, `.npmrc`, `.yarnrc`, etc.
- **Workflows**: `.github/workflows/*`
- **Documentation**: `README.md`, `CONTRIBUTING.md`, `*.md`
- **Scripts**: `scripts/`, `src/`, changes to npm/yarn scripts
- **Build/Lock files**: `lock`, `cache`, dependency files
- **Skill files**: `.claude/skills/`
- **Other**: Everything else

### Step 3: Identify Key Changes

For each category, extract:
- **What changed**: File names and brief descriptions
- **Why it changed**: Context and reasoning
- **Impact**: Who/what is affected
- **Breaking changes**: Any backward-incompatible modifications

### Step 4: Generate Markdown Structure

Create a markdown file with:

```markdown
# [Title of Changes]

## Overview
[Brief summary of what was done and why]

## ✨ Key Changes

### 1. [Category Name] (Phase N if applicable)
- ✅ Change 1
- ✅ Change 2
- ✅ Change 3

### 2. [Another Category]
- ✅ Another change

## 🐛 Bug Fixes (if any)
- Fixed: [description]

## ⚠️ Breaking Changes (if any)
- [List breaking changes]

## ✅ Testing / Verification
- ✅ Test 1 passed
- ✅ Test 2 passed

## 📝 Commits

List the logical commits if applicable:
1. commit message
2. commit message

## 🔄 Next Steps

- [ ] Step 1
- [ ] Step 2

## 📚 References

- Link 1
- Link 2
```

### Step 5: Generate File

Save the markdown file with the naming convention:
```
.github/pr-comments/PR_COMMENT_{BRANCH}_{DATETIME}.md
```

Example:
```
.github/pr-comments/PR_COMMENT_pnpm-monorepo-upgrade_20260907_165037.md
```

## Implementation Steps

### For Agents Using This Skill

1. **Get branch and timestamp**:
   ```bash
   BRANCH=$(git rev-parse --abbrev-ref HEAD)
   DATETIME=$(date +"%Y%m%d_%H%M%S")
   FILENAME=".github/pr-comments/PR_COMMENT_${BRANCH}_${DATETIME}.md"
   ```

2. **Check for and read previous PR comment** (if generating an update):
   ```bash
   LATEST_PR_COMMENT=$(ls -t .github/pr-comments/PR_COMMENT_${BRANCH}_*.md 2>/dev/null | head -1)
   if [ -n "$LATEST_PR_COMMENT" ]; then
     PREVIOUS_CONTENT=$(cat "$LATEST_PR_COMMENT")
   fi
   ```
   - If previous comment exists: **Use it as a template and context**
   - Read it to understand what was previously documented
   - Identify which sections need updates vs. which can stay the same

3. **Analyze changes**:
   ```bash
   git diff --name-status origin/main..HEAD | sort
   git diff --stat origin/main..HEAD
   git log origin/main..HEAD --oneline
   ```

4. **Categorize**:
   - Parse file paths to group by category
   - Read commit messages for context
   - Identify patterns in changes
   - Compare with previous comment to find what's new or changed

5. **Generate content with context preservation**:
   - Use previous PR comment as a template
   - **Keep sections that are still accurate**: Overview, Key Changes for unchanged items, Breaking Changes, References
   - **Update sections affected by new commits**: Recent Commits, Diff Statistics, Testing/Verification, Next Steps, Impact Summary
   - Create a compelling title (reuse if still accurate, update if needed)
   - Organize changes by category
   - Highlight key impacts
   - Document any fixes or breaking changes
   - Provide clear next steps

6. **Write markdown file**:
   - Use the filename format with NEW timestamp (don't modify old file)
   - Follow the markdown structure from previous comment where applicable
   - Include proper emoji/formatting
   - Make it scannable and clear
   - Ensure it reads as a cohesive whole (not like two documents spliced together)

7. **Return result**:
   ```
   Generated: .github/pr-comments/PR_COMMENT_[BRANCH]_[DATETIME].md
   Previous: .github/pr-comments/PR_COMMENT_[BRANCH]_[OLD_DATETIME].md (preserved for reference)
   ```

## Context Preservation Strategy

When updating a PR comment with new commits:

### Sections to Keep/Refresh
- **Overview**: Usually stable. Only update if new commits significantly change the scope or purpose. Refresh if it's now incomplete.
- **Key Changes**: Keep existing categories and items that are still accurate. Add new categories for new commits. Update descriptions if implementation details changed.
- **Breaking Changes**: Keep as-is unless new commits introduce or remove breaking changes.
- **References**: Usually stable. Add new links if relevant to new commits.
- **Architecture/Approach**: Keep unless new commits change the implementation strategy.

### Sections to Update
- **Diff Statistics**: Replace with current stats (always changes with new commits).
- **Recent Commits**: Replace with current commit list.
- **Testing/Verification**: Update with new test results or verification status.
- **Next Steps**: Update based on current state and remaining work.
- **Impact Summary**: Update if numbers or scope changed.

### What NOT to Do
- ❌ Don't completely rewrite sections that are still accurate
- ❌ Don't lose context from the previous comment unnecessarily
- ❌ Don't create a "before and after" appearance—blend new information naturally
- ❌ Don't claim something is done if it's not, or vice versa

## Tips for Quality PR Comments

1. **Be specific**: List actual files/changes, not vague descriptions
2. **Organize logically**: Group related changes together
3. **Show impact**: Explain what users/developers need to know
4. **Highlight risks**: Call out breaking changes or risky modifications
5. **Provide context**: Explain the "why" not just the "what"
6. **Use formatting**: Emojis, headers, lists make it scannable
7. **Include verification**: Show what was tested
8. **Suggest next steps**: What happens after merge?
9. **Preserve context**: When updating, keep accurate info from previous versions to avoid repetition
10. **Be concise but complete**: Balance brevity with thoroughness—reviewers shouldn't need to read git history to understand the PR

## Common Patterns

### Configuration Changes
- New config files
- Modified package.json fields
- Environment variables
- Build tool updates

### Workflow Changes
- CI/CD pipeline updates
- GitHub Actions modifications
- Build script changes

### Documentation
- README updates
- Migration guides
- API changes

### Code Changes
- Feature additions
- Bug fixes (include issue numbers)
- Refactoring
- Performance improvements

## Output

The skill generates:
- **File**: `.github/pr-comments/PR_COMMENT_{BRANCH}_{DATETIME}.md`
- **Format**: Well-structured markdown with emoji and clear sections
- **Usage**: Can be pasted into GitHub PR description or kept as reference
- **Content**: Comprehensive summary of all changes with context

## Related Skills

- `code-review` - Review code changes
- `simplify` - Identify simplification opportunities
