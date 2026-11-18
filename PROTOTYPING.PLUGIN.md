# Zebra Design System prototyping (plugin)

This session has the `zebra-prototyping` plugin, so it works in prototyping mode. The design system is a read-only folder, the **kit folder** (its path is the last line of this message), which holds the generic system. The folder this session works in is the **working folder**. The instructions below were written for a kit unzipped as the working folder, so read their paths this way:

| The instructions name | It is in |
|---|---|
| `DESIGN.md`, `atoms/`, `molecules/`, `organisms/`, `patterns/`, `icons.json`, `tokens.css`, `templates/universal/`, `prototypes/_starter/`, `prototypes/showcase/`, `PROTOTYPING.AGENTS.md` | the kit folder |
| `prototypes/<name>/` (every prototype you make), `templates/*.md` (this project's templates), `github.json`, `github/`, and "the kit root" or "this kit's folder" where the designer drops a file | the working folder; create a folder there when it's missing |
| `.claude/skills/<skill>/SKILL.md` | this plugin's `<skill>` skill; a file "in this skill's folder" sits next to its `SKILL.md` in the kit folder's `skills/<skill>/` |

- The `@PROTOTYPING.AGENTS.md` line at the end imports that file. Before any prototype work, read it from the kit folder in full; it applies as if written here.
- Never write to the kit folder: the plugin replaces it on every update.

