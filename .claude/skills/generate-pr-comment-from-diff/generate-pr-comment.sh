#!/bin/bash
# Generate a PR comment markdown file from the current git diff
# Usage: ./generate-pr-comment.sh [optional: base branch for comparison]

set -e

# Configuration
BASE_BRANCH="${1:-origin/main}"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
BRANCH_ESCAPED=$(echo "$BRANCH" | sed 's/[^a-zA-Z0-9_]/_/g')
DATETIME=$(date +"%Y%m%d_%H%M%S")
OUTPUT_DIR=".github/pr-comments"
FILENAME="PR_COMMENT_${BRANCH_ESCAPED}_${DATETIME}.md"
OUTPUT_FILE="${OUTPUT_DIR}/${FILENAME}"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Checking for new commits...${NC}"
echo "Branch: $BRANCH"
echo ""

# Check if there's a previous PR comment for this branch
LATEST_PR_COMMENT=$(ls -t "$OUTPUT_DIR"/PR_COMMENT_${BRANCH_ESCAPED}_*.md 2>/dev/null | head -1)

if [ -n "$LATEST_PR_COMMENT" ]; then
    # Extract timestamp from filename (format: PR_COMMENT_BRANCH_YYYYMMDD_HHMMSS.md)
    FILENAME_ONLY=$(basename "$LATEST_PR_COMMENT")
    # Remove prefix and .md extension to get YYYYMMDD_HHMMSS
    TIMESTAMP_STR="${FILENAME_ONLY#PR_COMMENT_${BRANCH_ESCAPED}_}"
    TIMESTAMP_STR="${TIMESTAMP_STR%.md}"

    # Convert YYYYMMDD_HHMMSS to a date git can understand
    if [[ $TIMESTAMP_STR =~ ^([0-9]{8})_([0-9]{6})$ ]]; then
        DATE_PART="${BASH_REMATCH[1]}"
        TIME_PART="${BASH_REMATCH[2]}"
        # Convert YYYYMMDD to YYYY-MM-DD
        YEAR="${DATE_PART:0:4}"
        MONTH="${DATE_PART:4:2}"
        DAY="${DATE_PART:6:2}"
        # Convert HHMMSS to HH:MM:SS
        HOUR="${TIME_PART:0:2}"
        MIN="${TIME_PART:2:2}"
        SEC="${TIME_PART:4:2}"

        LAST_PR_TIME="${YEAR}-${MONTH}-${DAY} ${HOUR}:${MIN}:${SEC}"

        # Count commits since the last PR comment was generated
        NEW_COMMITS=$(git log --oneline --since="$LAST_PR_TIME" HEAD 2>/dev/null | wc -l)

        if [ "$NEW_COMMITS" -eq 0 ]; then
            echo -e "${YELLOW}⚠️  No new commits since the last PR comment${NC}"
            echo ""
            echo "Last PR comment: $LATEST_PR_COMMENT"
            echo "Generated at: $LAST_PR_TIME"
            echo ""
            echo -e "${RED}ℹ️  To update the PR comment, commit your changes first:${NC}"
            echo "  1. Stage your changes: git add <files>"
            echo "  2. Commit them: git commit -m '<message>'"
            echo "  3. Run this skill again: /generate-pr-comment-from-diff"
            echo ""
            exit 0
        else
            echo -e "${GREEN}✅ Found $NEW_COMMITS new commit(s) since last PR comment${NC}"
            echo ""
            echo "📋 Previous PR comment will be used as context for updates:"
            echo "   $LATEST_PR_COMMENT"
            echo ""
        fi
    fi
fi

echo -e "${BLUE}Generating PR comment from diff...${NC}"
echo "Output: $OUTPUT_FILE"
echo ""

# Show previous PR comment content if it exists (for agent context)
if [ -n "$LATEST_PR_COMMENT" ]; then
    echo -e "${YELLOW}📄 Previous PR Comment (for context and preservation):${NC}"
    echo "================================"
    cat "$LATEST_PR_COMMENT"
    echo "================================"
    echo ""
fi

# Get diff statistics
echo -e "${YELLOW}Analyzing changes...${NC}"

# List of changed files
CHANGED_FILES=$(git diff --name-only "$BASE_BRANCH"..HEAD || git diff --name-only HEAD~5..HEAD 2>/dev/null || echo "")

# Categorize files
CONFIG_FILES=$(echo "$CHANGED_FILES" | grep -E '(package\.json|\.npmrc|\.yarnrc|pnpm-workspace|tsconfig)' | sort || echo "")
WORKFLOW_FILES=$(echo "$CHANGED_FILES" | grep -E '\.github/workflows' | sort || echo "")
DOC_FILES=$(echo "$CHANGED_FILES" | grep -E '(README|CONTRIBUTING|\.md$)' | sort || echo "")
SKILL_FILES=$(echo "$CHANGED_FILES" | grep -E '\.claude/skills' | sort || echo "")
IGNORE_FILES=$(echo "$CHANGED_FILES" | grep -E '(\.gitignore|\.DS_Store)' | sort || echo "")
LOCK_FILES=$(echo "$CHANGED_FILES" | grep -E '(lock|yarn\.lock|pnpm-lock)' | sort || echo "")
OTHER_FILES=$(echo "$CHANGED_FILES" | grep -vE '(package\.json|\.npmrc|\.yarnrc|pnpm-workspace|tsconfig|\.github|README|CONTRIBUTING|\.md$|\.claude|\.gitignore|\.DS_Store|lock|yarn\.lock|pnpm-lock)' | sort || echo "")

# Count changes
TOTAL_CHANGED=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')
echo "Total files changed: $TOTAL_CHANGED"
echo ""

# Start building the markdown
read -r -d '' PR_CONTENT << 'EOF' || true
# Summary of Changes

## Overview

This PR includes the following modifications to the codebase.

---

## ✨ Key Changes
EOF

# Add configuration changes
if [ -n "$CONFIG_FILES" ]; then
    echo "" >> "$OUTPUT_FILE"
    echo "Configuration files modified:" >> "$OUTPUT_FILE"
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        echo "- \`$file\`" >> "$OUTPUT_FILE"
    done <<< "$CONFIG_FILES"
fi

# Add workflow changes
if [ -n "$WORKFLOW_FILES" ]; then
    echo "" >> "$OUTPUT_FILE"
    echo "### CI/CD Workflows Updated:" >> "$OUTPUT_FILE"
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        echo "- \`$file\`" >> "$OUTPUT_FILE"
    done <<< "$WORKFLOW_FILES"
fi

# Add documentation changes
if [ -n "$DOC_FILES" ]; then
    echo "" >> "$OUTPUT_FILE"
    echo "### Documentation:" >> "$OUTPUT_FILE"
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        echo "- \`$file\`" >> "$OUTPUT_FILE"
    done <<< "$DOC_FILES"
fi

# Add skill changes
if [ -n "$SKILL_FILES" ]; then
    echo "" >> "$OUTPUT_FILE"
    echo "### Skills/Tools Updated:" >> "$OUTPUT_FILE"
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        echo "- \`$file\`" >> "$OUTPUT_FILE"
    done <<< "$SKILL_FILES"
fi

# Add lock file changes
if [ -n "$LOCK_FILES" ]; then
    echo "" >> "$OUTPUT_FILE"
    echo "### Dependency Lockfiles:" >> "$OUTPUT_FILE"
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        echo "- \`$file\`" >> "$OUTPUT_FILE"
    done <<< "$LOCK_FILES"
fi

# Add other changes
if [ -n "$OTHER_FILES" ]; then
    echo "" >> "$OUTPUT_FILE"
    echo "### Other Changes:" >> "$OUTPUT_FILE"
    while IFS= read -r file; do
        [ -z "$file" ] && continue
        echo "- \`$file\`" >> "$OUTPUT_FILE"
    done <<< "$OTHER_FILES"
fi

# Add git statistics
echo "" >> "$OUTPUT_FILE"
echo "## 📊 Diff Statistics" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "\`\`\`" >> "$OUTPUT_FILE"
git diff --stat "$BASE_BRANCH"..HEAD 2>/dev/null >> "$OUTPUT_FILE" || git diff --stat HEAD~5..HEAD 2>/dev/null >> "$OUTPUT_FILE" || echo "Unable to generate stats" >> "$OUTPUT_FILE"
echo "\`\`\`" >> "$OUTPUT_FILE"

# Add commit information
echo "" >> "$OUTPUT_FILE"
echo "## 📝 Recent Commits" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
git log --oneline "$BASE_BRANCH"..HEAD --no-decorate 2>/dev/null | head -20 >> "$OUTPUT_FILE" || git log --oneline -20 --no-decorate >> "$OUTPUT_FILE" || echo "Unable to get commit log" >> "$OUTPUT_FILE"

# Add footer
echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**Generated**: $(date)" >> "$OUTPUT_FILE"
echo "**Branch**: \`$BRANCH\`" >> "$OUTPUT_FILE"
echo "**Files Changed**: $TOTAL_CHANGED" >> "$OUTPUT_FILE"

# Actually write to file
cat > "$OUTPUT_FILE" << EOFINAL
# Summary of Changes

## Overview

This PR includes the following modifications to the codebase.

---

## ✨ Changes by Category

### Configuration Files
$([ -n "$CONFIG_FILES" ] && echo "$CONFIG_FILES" | sed 's/^/- `/' | sed 's/$/`/' || echo "No configuration changes")

### CI/CD Workflows
$([ -n "$WORKFLOW_FILES" ] && echo "$WORKFLOW_FILES" | sed 's/^/- `/' | sed 's/$/`/' || echo "No workflow changes")

### Documentation
$([ -n "$DOC_FILES" ] && echo "$DOC_FILES" | sed 's/^/- `/' | sed 's/$/`/' || echo "No documentation changes")

### Skills & Tools
$([ -n "$SKILL_FILES" ] && echo "$SKILL_FILES" | sed 's/^/- `/' | sed 's/$/`/' || echo "No skill changes")

### Dependencies & Lockfiles
$([ -n "$LOCK_FILES" ] && echo "$LOCK_FILES" | sed 's/^/- `/' | sed 's/$/`/' || echo "No lockfile changes")

### Other Changes
$([ -n "$OTHER_FILES" ] && echo "$OTHER_FILES" | sed 's/^/- `/' | sed 's/$/`/' || echo "No other changes")

---

## 📊 Diff Statistics

\`\`\`
$(git diff --stat "$BASE_BRANCH"..HEAD 2>/dev/null || git diff --stat HEAD~5..HEAD 2>/dev/null || echo "Unable to generate stats")
\`\`\`

## 📝 Recent Commits

$(git log --oneline "$BASE_BRANCH"..HEAD --no-decorate 2>/dev/null || git log --oneline -20 --no-decorate)

---

**Generated**: $(date)
**Branch**: \`$BRANCH\`
**Files Changed**: $TOTAL_CHANGED

---

## Next Steps

1. Review the changes in each category
2. Identify any areas that need clarification
3. Merge when ready
4. Update relevant documentation after merge

EOFINAL

echo ""
echo -e "${GREEN}✅ PR comment generated successfully!${NC}"
echo ""
echo "File: $OUTPUT_FILE"
echo ""
echo "You can now:"
echo "  1. Copy the content and paste into your GitHub PR description"
echo "  2. Add this file to git: git add $OUTPUT_FILE"
echo "  3. Use it as a reference for your PR"
echo ""
echo -e "${BLUE}Quick git commands to add, commit, and push:${NC}"
echo ""
echo -e "${YELLOW}git add $OUTPUT_FILE && git commit -m 'docs: add PR comment for $BRANCH' && git push${NC}"
echo ""
