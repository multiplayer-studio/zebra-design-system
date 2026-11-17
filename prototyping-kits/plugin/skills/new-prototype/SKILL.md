---
name: new-prototype
description: Start a new Zebra Design System prototype — link a Jira ticket, read the in-flight project's GitHub repo, copy the starter, then build. Use at the start of every new prototype, whenever the designer asks for a new screen, flow or prototype.
---

# Start a new prototype

Work through these in order. Ask each question in a prompt of its own (see Asking the designer in `PROTOTYPING.AGENTS.md`).

1. **Jira.** Follow `JIRA.md` in this skill's folder.
2. **GitHub.** Once the Jira question is answered (and any ticket read), follow `GITHUB.md` in this skill's folder.
3. **Start the file.** Pick a short, hyphenated name from the brief and copy `prototypes/_starter/index.html` to `prototypes/<name>/index.html` (see Stack in `PROTOTYPING.AGENTS.md`). Check `templates/`, then `templates/universal/`, for a layout that fits.
4. **Build.** With a reference design, use the `build-from-reference` skill. Without one, follow No reference in `PROTOTYPING.AGENTS.md`.
5. **Finish.** When the designer is happy: post to the Jira ticket, if there is one (`JIRA.md` step 2), then offer Figma with the `send-to-figma` skill.
