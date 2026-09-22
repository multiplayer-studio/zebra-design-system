---
name: triage-design-changes
description: Use when a merged PR changed docs/instructions, packages/foundations/tokens (or, in future, the icons package) and you need to work out what that means for zeta-web. Classifies the nature, impact and complexity of the design change, traces it back to the zeta-web source files it affects, audits for drift between the generated instructions and the existing code, and emits a plan of the PRs that should be opened. Used by .github/workflows/design-sync-on-merge.yml.
---

# Triage a landed design change

You are given the diff of a design change that has already landed on `main`, plus a freshly
regenerated set of instruction/token artifacts. Your job is **analysis and planning only** — do
not edit `packages/zeta-web` source, do not commit, do not open PRs. The only file you write is
the plan.

## Inputs

Written by the workflow into `.design-sync/` (git-ignored):

| File | Contents |
| --- | --- |
| `.design-sync/landed.diff` | The merged PR's diff, restricted to the watched paths |
| `.design-sync/regenerated.diff` | Drift the pipeline run produced on top of that (empty if the committed artifacts were already current) |
| `.design-sync/context.json` | `{ pr_number, pr_title, base_sha, head_sha, run_id }` |

The watched paths are `docs/instructions/`, `tooling/token-machine/source/` (the committed DTCG
token data — `packages/foundations/tokens/dist/` is git-ignored build output, so token *values*
only ever change on the source side) and `tooling/instructions-machine/output/`.

Read both diffs in full before classifying. `regenerated.diff` matters: if it is non-empty the
committed instruction files were stale, and the regenerated version — not the landed one — is the
source of truth for what the code must match.

## 1. Classify

Pick **all** that apply for nature, exactly one for impact and complexity.

**Nature** — what kind of change this is:
- `tokens` — only token values/names changed; component structure and API are unchanged.
- `icons-assets` — icon or other asset additions/changes. (Not wired up yet; if you see it, say so.)
- `component-api` — a Figma component property was added, removed, renamed or its options changed. Maps to a `@property`/slot/part/event change in zeta-web.
- `visual-nonbreaking` — styling changed in a way that needs no consumer action (a colour token swap, a spacing nudge).
- `visual-breaking` — styling changed in a way that alters layout or removes a variant consumers may rely on.
- `docs-metadata` — only prose/intent/metadata changed (descriptions, guidance, `output/metadata/*.json` hero or table text). No code change is implied.

**Impact** — drives what the workflow does with the resulting PR:
- `patch` — no consumer-visible impact (docs/metadata only, or a token value change already flowing through `var()` with no code edit needed). Auto-publish: the PR is opened with auto-merge enabled.
- `minor` — additive and backward compatible (new variant, new prop, new token usage). PR opened for human review.
- `major` — breaking (a Figma property removed/renamed, a variant dropped, a layout change that would break consumers). PR opened for human review and labelled `breaking-change`.

Remember zeta-web's hard rule from `update-web-component`: **changes must be backward
compatible**. A `major` classification therefore means "Figma dropped something" — the PR should
add the replacement and `@deprecated` the old thing, never delete it. Say so in the PR's `notes`.

**Complexity** — chooses the implementing model:
- `low` — mechanical and local: token swaps in a `.styles.js`, doc-comment updates, adding one enum value alongside existing ones.
- `high` — needs judgement: touches a shared mixin, changes component structure/markup, adds or deprecates API, spans more than ~3 files, or the drift audit found the code and the instructions already disagree.

## 2. Trace back to zeta-web source

For each changed `docs/instructions/<page>.md`, the page can describe several components (e.g.
`button.md` covers both Button and Icon Button — see the `##` headings and the matching
`tooling/instructions-machine/output/specs/<page>-<component>.json` files). Resolve each component
separately.

For a component `foo-bar`, collect every file that exists:

```
packages/zeta-web/src/components/**/foo-bar/foo-bar.ts
packages/zeta-web/src/components/**/foo-bar/foo-bar.styles.js
packages/zeta-web/src/stories/components/<Group>/foo-bar.stories.ts
packages/zeta-web/src/stories/components/<Group>/Docs.mdx
packages/zeta-web/src/test/**/foo-bar/foo-bar.test.ts   (or src/test/**/foo-bar.test.ts)
packages/zeta-web/src/figma/foo-bar.figma.ts
```

Use `Glob`/`Bash` to confirm each path — component families nest (`src/components/button/icon-button/`),
and test paths are inconsistent (`src/test/button/icon-button.test.ts` vs `src/test/foo/foo.test.ts`).
Never put a path in the plan that you have not verified exists.

Then widen:
- **Mixins.** If the change is about flavour, shape, size, or interactive state, it probably belongs in `packages/zeta-web/src/mixins/` (`flavor.ts`/`flavor.styles.js`, `contour.ts`, `size.ts`, `interactive.styles.js`, `tertiary-interactive.styles.js`) rather than in the component. Grep the component's styles for the token that changed — if it is not there, follow it into the mixin.
- **Shared consumers.** `grep -rn "zeta-foo-bar" packages/zeta-web/src` to find other components, stories and templates that compose it. A change to a mixin or a widely-composed component affects all of them.
- **Sub-components.** A page's subcomponents (spec files prefixed `_` or `Template/` in Figma) have their own directories; include them.
- `packages/zeta-web/src/index.ts` is generated — never list it as a target.

## 3. Audit for drift before deciding anything is needed

A human may already have made the change by hand, or the code may have diverged from the design in
some unrelated way. For every component you identified, compare the regenerated spec/metadata
against the current implementation — load the `component-scope-analysis` skill and apply it to
`tooling/instructions-machine/output/specs/<page>-<component>.json` versus the component's `.ts` and
`.styles.js`.

Then, for each component, decide:
- **Already implemented** — the code matches the new instructions. Drop it from the plan; record it in `skipped` with the reason.
- **Needs work** — list only the concrete deltas. Do not include pre-existing drift that this design change did not introduce; mention it in `notes` so a human can pick it up, but keep the PR scoped to what landed.

If nothing needs work, emit a plan with `"prs": []`. That is a valid and common outcome for
`docs-metadata` changes.

## 4. Split into PRs

Aim for the smallest reviewable PRs:
- **One PR per component** by default.
- **One PR for a shared change** (a mixin, a token that many components read) rather than N PRs each editing the same file — concurrent branches editing `src/mixins/flavor.styles.js` will conflict.
- **A component whose change is entirely inside a shared file it shares with others** belongs in that shared PR, not its own.
- Two components in the same family that must change together to stay visually consistent (e.g. Button and Icon Button sharing a flavour) can share one PR. Say why in `notes`.
- Never put two unrelated components in one PR just to reduce the count.

Each PR's `complexity` is its own, not the overall change's — a shared-mixin PR is `high` even when
the per-component PRs beside it are `low`.

Branch names: `design-sync/<slug>-<run_id>`. Titles: conventional commits, scoped to the component
(`feat(button): …`, `fix(avatar): …`, `feat(flavor)!: …` for breaking).

## 5. Write the plan

Write `.design-sync/plan.json` — exactly this shape, no extra keys, no markdown fence:

```json
{
  "nature": ["tokens", "visual-nonbreaking"],
  "impact": "minor",
  "complexity": "low",
  "summary": "One or two sentences a reviewer can read to know what landed and why these PRs exist.",
  "skipped": [
    { "component": "divider", "reason": "styles already use --border-subtle; no delta" }
  ],
  "prs": [
    {
      "slug": "button",
      "title": "feat(button): adopt new interactive hover tokens",
      "branch": "design-sync/button-12345",
      "complexity": "low",
      "impact": "minor",
      "instructions": ["docs/instructions/button.md"],
      "specs": ["tooling/instructions-machine/output/specs/button-button.json"],
      "targets": [
        "packages/zeta-web/src/components/button/button.styles.js",
        "packages/zeta-web/src/test/button/button.test.ts"
      ],
      "changes": [
        "Swap --main-primary for --interactive-primary-background-hover in the :hover rule",
        "Add a Styling test asserting the new token resolves"
      ],
      "notes": "Backward compatible; no API change."
    }
  ]
}
```

- `slug` must be unique and safe for a git branch (lowercase, `a-z0-9-`).
- `instructions` + `specs` are what the implementing agent reads for design truth.
- `targets` are verified existing paths, or a new path you are explicitly asking to be created (flag those in `changes`).
- `changes` is the instruction list the implementing agent will follow. Be specific enough that an agent with no other context can act on it — name the token, the property, the selector.
- Keep `prs` to at most 8 entries. If the change genuinely fans out wider than that, emit the 8 highest-impact and note the remainder in `summary`.

Finally, print the plan to stdout as well so it lands in the workflow log.

## Brand new components

If a changed `docs/instructions/<page>.md` describes a component with **no** matching directory
under `packages/zeta-web/src/components/`, that is a new component: set its `complexity` to `high`,
leave `targets` empty, and put `"new component — follow the new-web-component skill"` first in
`changes`. The workflow tells the implementing agent to load `new-web-component` instead of
`update-web-component` when `targets` is empty.
