---
description: Verify and fix this project's Zebra Design System wiring — packages, entry imports, theming, skills
---

Check this project's Zebra Design System setup and fix what's missing, reporting each finding:

1. **Packages.** Is `@zebra-design-system/react-baseui` or `@zebra-design-system/web-components` installed (plus `tokens` and `icons`)? If none, ask which library the app uses before installing anything. Until the packages are on npmjs, install them straight from the repo's distribution branches — internal deps resolve themselves via version tags:
   `npm i "git+https://github.com/multiplayer-studio/zebra-design-system.git#dist/react-baseui"` (or `#dist/web-components`, `#dist/tokens`, `#dist/icons`; pin with `#<pkg>-v<version>`).
2. **Entry imports.** The app entry must import `@zebra-design-system/tokens/css` and `@zebra-design-system/icons/icons.css` exactly once. Add them if missing.
3. **Theming smoke.** Render any Zebra component, toggle `mode-dark` on the root, and confirm it re-themes. If it doesn't, look for a hard-coded colour or a missing tokens import rather than patching the symptom.
4. **Skills.** If `.claude/skills/zebra-figma-to-code` is absent, run `npx zebra-skills` (shipped in the library package) so the Figma, build, prototype, project onboarding and UX pattern skills are available in this project.
5. **Patterns.** Confirm `node_modules/@zebra-design-system/patterns/dist/manifest.json` exists. It installs with the library; if it is missing, install it from `#dist/patterns` the same way.
6. **Context.** Confirm `node_modules/@zebra-design-system/*/AGENTS.md` exists and skim it — it is the authoritative usage contract for the installed version.

End with a short status table: packages (versions), imports, theming, skills, patterns — each OK or fixed.
