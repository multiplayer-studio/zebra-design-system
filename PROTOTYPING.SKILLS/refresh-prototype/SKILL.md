---
name: refresh-prototype
description: Update a prototype's tokens and component CSS to the installed Zebra Design System version. Use when you open a prototype whose version comment is older than the `version` in DESIGN.md (offer it once), or when the designer asks to refresh or update a prototype.
---

# Refresh a prototype

**Offer it.** When you open a prototype whose version comment (inside its tokens block) is older than the `version` in `DESIGN.md`, ask once with the question prompt (**Refresh it** / **Leave it**). If they leave it, don't ask again for that prototype in this conversation. If the designer asks for a refresh, just do it.

1. Replace everything between `<!-- tokens:start -->` and `<!-- tokens:end -->` with that block from the current `prototypes/_starter/index.html`. The block carries the version comment, so the version updates with it.
2. Do the same between `<!-- components:start -->` and `<!-- components:end -->`.
3. Never change anything outside the markers, with one exception: if the starter's first `<style>` block has `@font-face` rules the prototype's lacks (e.g. IBM Plex Mono), add them to the prototype's first `<style>` block.

Then open the prototype and check it still renders. If the first number of the version went up (a breaking release), search the prototype's own markup, CSS and script for class names and `--` tokens that no longer exist in the new blocks, and update them from the component files. Tell the designer the old and new versions, what you updated, and anything that now looks different because a component or token changed.
