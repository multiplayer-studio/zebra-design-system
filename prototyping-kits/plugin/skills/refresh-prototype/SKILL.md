---
name: refresh-prototype
description: Update a prototype's tokens and component CSS to the installed Zebra Design System version. Use when you open a prototype whose version comment is older than the `version` in DESIGN.md (offer it once), or when the designer asks to refresh or update a prototype.
---

# Refresh a prototype

**Offer it.** When you open a prototype whose version comment (inside its tokens block) is older than the `version` in `DESIGN.md`, ask once with the question prompt (**Refresh it** / **Leave it**). If they leave it, don't ask again for that prototype in this conversation. If the designer asks for a refresh, just do it.

1. Replace everything between `<!-- tokens:start -->` and `<!-- tokens:end -->` with that block from the current `prototypes/_starter/index.html`. The block carries the version comment, so the version updates with it.
2. Do the same between `<!-- components:start -->` and `<!-- components:end -->`.
3. Never change anything outside the markers.

Then open the prototype and check it still renders. Tell the designer the old and new versions, and anything that now looks different because a component or token changed.
