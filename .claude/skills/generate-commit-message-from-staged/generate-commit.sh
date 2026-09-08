#!/bin/bash
# Generate a conventional commit message from staged changes
# Usage: ./generate-commit.sh

set -e

# Check if there are staged changes
STAGED=$(git diff --cached --name-only | wc -l)
if [ "$STAGED" -eq 0 ]; then
    echo "❌ No staged changes found. Stage changes with: git add <files>" >&2
    exit 1
fi

# Get staged files
STAGED_FILES=$(git diff --cached --name-only)

# Analyze file types
HAS_FEAT=0
HAS_FIX=0
HAS_DOCS=0
HAS_TEST=0
HAS_STYLE=0
HAS_CI=0
HAS_CHORE=0

# Detect type based on files changed
while IFS= read -r file; do
    # Skills are features
    if [[ "$file" =~ \.claude/skills ]]; then
        HAS_FEAT=1
    # CI/Workflows
    elif [[ "$file" =~ \.github/workflows ]]; then
        HAS_CI=1
    # Documentation
    elif [[ "$file" =~ \.(md|txt)$ ]] || [[ "$file" == "README"* ]]; then
        HAS_DOCS=1
    # Tests
    elif [[ "$file" =~ \.(test|spec)\.(ts|tsx|js|jsx)$ ]]; then
        HAS_TEST=1
    # Package/Config changes typically mean chore
    elif [[ "$file" =~ package\.json$ ]] || [[ "$file" =~ (pnpm-lock|yarn\.lock|package-lock)\.yaml$ ]]; then
        HAS_CHORE=1
    # Source code - check if it's likely a feature or fix
    elif [[ "$file" =~ \.(ts|tsx|js|jsx|rs|py|go)$ ]]; then
        # Look at diff content to distinguish feat vs fix
        if git diff --cached "$file" | grep -q "^+.*function\|^+.*class\|^+.*export"; then
            HAS_FEAT=1
        elif git diff --cached "$file" | grep -q "^-.*console\|^-.*bug\|^-.*error"; then
            HAS_FIX=1
        else
            HAS_FEAT=1
        fi
    fi
done <<< "$STAGED_FILES"

# Determine primary type (priority order)
TYPE=""
if [ $HAS_FIX -eq 1 ]; then
    TYPE="fix"
elif [ $HAS_FEAT -eq 1 ]; then
    TYPE="feat"
elif [ $HAS_TEST -eq 1 ]; then
    TYPE="test"
elif [ $HAS_DOCS -eq 1 ]; then
    TYPE="docs"
elif [ $HAS_CI -eq 1 ]; then
    TYPE="ci"
elif [ $HAS_STYLE -eq 1 ]; then
    TYPE="style"
else
    TYPE="chore"
fi

# Extract scope from file paths
SCOPE=""
FILE_COUNT=$(echo "$STAGED_FILES" | wc -l)

if [ "$FILE_COUNT" -eq 1 ]; then
    # Single file - extract scope from path
    FILE="$STAGED_FILES"
    # Remove extension
    BASENAME=$(basename "$FILE" | sed 's/\.[^.]*$//')

    # Get directory name if it's meaningful
    DIR=$(dirname "$FILE")

    # Prefer component/feature names for src files
    if [[ "$FILE" =~ src/components/([^/]+) ]]; then
        SCOPE="${BASH_REMATCH[1]}"
    elif [[ "$FILE" =~ src/features/([^/]+) ]]; then
        SCOPE="${BASH_REMATCH[1]}"
    elif [[ "$DIR" != "." ]] && [[ "$DIR" != "src" ]]; then
        # Use last directory component if it's meaningful
        SCOPE=$(basename "$DIR" | tr -d '[:space:]')
        # Filter out generic names
        if [[ "$SCOPE" == "src" ]] || [[ "$SCOPE" == "utils" ]] || [[ "$SCOPE" == "lib" ]]; then
            SCOPE=""
        fi
    fi
fi

# Generate description based on type and changes
DESCRIPTION=""

case "$TYPE" in
    feat)
        if grep -q "\.claude/skills" <<< "$STAGED_FILES"; then
            if [[ -n "$SCOPE" ]]; then
                DESCRIPTION="add ${SCOPE} skill"
            else
                DESCRIPTION="add new skill"
            fi
        elif [[ -n "$SCOPE" ]]; then
            DESCRIPTION="add ${SCOPE} feature"
        else
            DESCRIPTION="add new feature"
        fi
        ;;
    fix)
        if [[ -n "$SCOPE" ]]; then
            DESCRIPTION="fix ${SCOPE} issue"
        else
            DESCRIPTION="fix issue"
        fi
        ;;
    docs)
        DESCRIPTION="update documentation"
        SCOPE=""
        ;;
    test)
        DESCRIPTION="add tests"
        if [[ -n "$SCOPE" ]]; then
            DESCRIPTION="add tests for ${SCOPE}"
        fi
        ;;
    ci)
        DESCRIPTION="update ci configuration"
        SCOPE=""
        ;;
    style)
        DESCRIPTION="apply code formatting"
        SCOPE=""
        ;;
    chore)
        if grep -q "package.json\|pnpm-lock\|yarn.lock" <<< "$STAGED_FILES"; then
            DESCRIPTION="update dependencies"
        else
            DESCRIPTION="update build configuration"
        fi
        SCOPE=""
        ;;
esac

# Build commit message
if [[ -n "$SCOPE" ]]; then
    COMMIT_MSG="$TYPE($SCOPE): $DESCRIPTION"
else
    COMMIT_MSG="$TYPE: $DESCRIPTION"
fi

# Output the commit message
echo "$COMMIT_MSG"
