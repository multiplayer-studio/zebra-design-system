#!/usr/bin/env bash
# Typechecks one story file against packages/react-baseui. The package's own
# tsconfig only covers src/, so this widens it for the run and removes the
# temporary config afterwards.
#
#   .claude/skills/zebra-builder-skill/scripts/typecheck-story.sh stories/AvailabilityOptimizerPage.stories.tsx
set -euo pipefail
story="${1:?usage: typecheck-story.sh stories/<Name>.stories.tsx}"
cd "$(git rev-parse --show-toplevel)/packages/react-baseui"
export PATH="$HOME/.nvm/versions/node/v24.13.1/bin:$PATH"
cfg="tsconfig.page-check.json"
trap 'rm -f "$cfg"' EXIT
printf '{ "extends": "./tsconfig.json", "compilerOptions": { "noEmit": true, "rootDir": "." }, "include": ["src/**/*.ts", "src/**/*.tsx", "%s", "stories/*.d.ts"] }' "$story" > "$cfg"
npx tsc -p "$cfg" && echo "Typecheck clean: $story"
