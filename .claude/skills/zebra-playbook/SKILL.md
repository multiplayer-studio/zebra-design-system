---
name: zebra-playbook
description: Update and republish the Manager's Playbook, the live guide for the design system manager at docs/guide. Use whenever the stale check says the playbook is behind, after a change to components, tokens, icons, specs, skills, the README or DESIGN.md that affects its steps or examples, or when someone asks to update, rebuild, republish or check the playbook.
---

# Manager's Playbook

The playbook is one published artifact, https://claude.ai/artifact/FB685boKEuodGJj7Xw3ymX. Its source is `docs/guide/`. The Stop hook runs `docs/guide/stale.mjs` and sends you here when the repo has moved past the last publish.

## Update it

1. **See what moved.** Run `node docs/guide/stale.mjs`. It names the areas: components, tokens, icons, specs, docs, skills, guide.
2. **Rebuild.** Run `node docs/guide/build.mjs` from the repo root. This brings in the real components, tokens and icons, so component and token changes need nothing more unless the words are now wrong. It also works out the Figma Status tab, comparing each Figma component with the specs and the three libraries' source (`docs/guide/figma-status.mjs`).
   - **Refresh Figma first** when components were added, renamed or removed in Figma, or a spec was just extracted. Run `node docs/guide/figma-sync.mjs`. It reads the file's component pages over the REST API with the `.env` token and rewrites `docs/guide/figma-components.json`. Never put the token on the page.
   - **A status looks wrong?** The match is by name. A spec covers a Figma component when its component, sets, subcomponents or a slot's `accepts` carry that name. A library counts as "From spec" when its source names the spec (`@spec` tags; Zeta Web's `api-map.json`). Fix the name or the tag rather than special-casing a row.
3. **Fix the words.** Read the change, then edit `docs/guide/index.html` only where the page is now wrong.

| Area | Check |
|---|---|
| components | Live examples still render. Props and flavours used in the examples still exist. |
| tokens | The traced token still exists. New modes or extensions appear in the Review example and the theming text. |
| icons | Glyph names in the page still exist in `packages/icons/codepoints.json`. |
| specs | The Notification Indicator example still matches its spec. |
| docs, skills | Steps, prompts, commands, ports and skill names still match. New skills have a place in a playbook. |
| any | Known gaps: remove what is fixed, add what is new, update its date. Sweep numbers change only after a real sweep. |

   Keep the wording short and plain. Don't invent results, and don't put secrets or tokens on the page.

4. **Look at it.** Render the page once in light and dark, and at phone width. Check for script errors and sideways scrolling.
5. **Publish** to the same link: call the Artifact tool with `file_path` `docs/guide/index.html`, `url` set to the link above, and `files` mapping `dist/zds.css`, `dist/zds.js` and `dist/build.json` to their files in `docs/guide/dist/`.
6. **Record it.** Run `node docs/guide/stale.mjs --mark`, only after the publish succeeds.

## If it can't be published

A publish needs the Artifact tool and edit access to this artifact. If either is missing, or the publish is refused, say so and don't run `--mark`. The check stays stale, so the next session with access picks it up.

If the only change is noise, such as whitespace, still rebuild, publish and mark, so the stamp stays true.
