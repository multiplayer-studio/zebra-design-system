# Card

**A note on shape:** this page doesn't hold one master component — it holds two, sharing subcomponents, plus two ready-made compositions. Rather than force one into "the" component, this spec documents:

- **Family** — `Card base` and `Collapsible Card`, each a real, independent public component
- **Subcomponents** — six private parts shared between them
- **Compositions** — `Card Template Default` and `Card Template Collapsible`, pre-built recipes on top of the family

Source: [Card page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=3007-796) · extracted 2026-09-23, re-verified 2026-09-24 (see Issues for what changed and what got corrected)

---

## Family: Card base

The empty card shell, three stacked slots inside a bordered surface. It decides the surface, the border, the corner treatment and the fact that content is clipped to the frame, and nothing else. Header and Footer can each be switched off, Body is always present. Reach for a Card Template when you want a card already assembled, and for this when you are composing one yourself.

### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `shape` | enum | sharp, rounded | sharp |
| `hasHeader` | boolean | true, false | true |
| `hasFooter` | boolean | true, false | true |
| `header` | slot | — | empty (prefers `_Card Heading`) |
| `body` | slot | — | empty, **always present, no visibility toggle** |
| `footer` | slot | — | empty (prefers `_Card Footer`) |

**Shape:** sharp — Square corners, matching surfaces and controls that are also square. · rounded — Softened corners, for a card that should read as a distinct object on the page. Content is clipped to the corner, so a full-bleed image inside follows the curve rather than squaring it off.

**hasHeader:** true — Shows the header slot above the body, for a title row or a heading with actions. · false — Hides the header slot along with anything placed in it. The body then meets the top edge, which is what a media-led card wants.

**hasFooter:** true — Shows the footer slot below the body, for the actions that close out the card. · false — Hides the footer slot and everything in it. Use when the card is purely informational and has nothing to act on.

### Anatomy

1. **root** — The outer frame. Fixed width, hugging height, carrying the surface, the border and the radius. It clips everything inside it. Fill `surface/card`, stroke `border/default` at `stroke/thin`.
2. **header** — The top slot, for a title row or a heading with actions. Switched off as a whole by hasHeader.
3. **body** — The middle slot and the card's main content. It is the one slot with no visibility toggle.
4. **footer** — The bottom slot, for closing actions. Switched off as a whole by hasFooter.

### Variants

| shape | root widthPx | root heightPx (all slots empty) | radius |
|---|---|---|---|
| sharp | 330 | 214 | radius/none |
| rounded | 330 | 214 | radius/sm (4px) |

### States, behavior, content, usage, accessibility, layout

**States:** Static — The shell has no interaction states. Hover, focus and selection all belong to whatever is placed in its slots, so the card itself never changes appearance.

**Behavior:** Motion — none modeled, a slot toggle is a property change. Reflow — width fixed, height hugs, grows downward only. Clipping — shell and all three slots clip content.

**Content & Slot:**
| Property | Type | Description |
|---|---|---|
| Header | slot, prefers _Card Heading | A title row at the top, hidden by hasHeader. It ships empty. |
| Body | slot, always present | The card's main content, cannot be switched off. _Card Body, _Card Image and _Card Heading are all offered. |
| Footer | slot, prefers _Card Footer | The actions that close out the card, hidden by hasFooter. |
| Slot content | shared across variants | Each slot uses one property across both Shape variants. |

**Do:** switch off the header for a media-led card · let the card grow downward, height hugs the slots.
**Don't:** expect the card to widen for content (width is fixed) · rely on Body being optional (it has no toggle).

**Accessibility:** the shell announces nothing itself, meaning comes from its slotted parts · content clips at the edge, check long strings at the fixed width · the card is not interactive here, build any click target in code · border/default is the only separation from the page, check contrast against the surface behind it.

**Layout & theming:** Width fixed 330px · Height hugs (214px empty) · Padding/gap none (all insets come from slotted parts) · Radius fixed per shape (`radius/none` / `radius/sm`) · Border 1px `stroke/thin` on `border/default`, both shapes · Fill `surface/card` on shell and all three slots · Elevation none, no shadow.

---

## Family: Collapsible Card

A card whose body opens and closes behind a header that is always visible. The header carries a title, a description and a leading chevron that flips with the state, and the body slot appears only when expanded. Flavor chooses between a plain card and one outlined with the brand gradient. Unlike Card base it has no header or footer slot of its own, the header is built in.

### API

| Prop | Type | Values | Default |
|---|---|---|---|
| `state` | enum | collapsed, expanded | collapsed |
| `flavor` | enum | default, gradient | default |
| `shape` | enum | sharp, rounded | sharp |
| `body` | slot (×4, one per expanded combination) | — | empty |

**State:** collapsed — Header only, body slot hidden. The resting state. · expanded — Reveals the body slot below the header. The card roughly triples in height.

**Flavor:** default — A plain card with no outline, for a list where no single card should stand out. · gradient — Outlines the card with the brand gradient, for the one card that should draw the eye. More than one in a list removes the distinction.

**Shape:** sharp / rounded — same intent as Card base.

**Body** is stored as **four separate slot properties** (one per Flavor × Shape combination while expanded) — content placed in one does not carry over to another. Fill the exact variant you intend to ship.

### Internal variations

- **header** (via `_Container header`) — `default | hover`. Always visible, not a slot. The card pins Flavor to `default` in every one of its own 8 variants; a hover treatment has to be set on the nested instance directly.

### Anatomy

1. **root** — The outer frame. Fixed width, hugging height, carrying the surface, the radius and, at the gradient flavour, the outline. Fill `surface/card`; stroke only at `flavor=gradient`, a gradient (`foreground/gradient/start` → `foreground/gradient/end`) at `stroke/thick`.
2. **header** — Instance of `_Container header`, pinned `Flavor=default`. Always visible, not a slot.
3. **body** — Slot, visible only when `state=expanded`, inset on three sides when shown.

### Variants

| state | flavor | shape | root heightPx | radius | stroke |
|---|---|---|---|---|---|
| collapsed | default | sharp | 78 | radius/none | none |
| collapsed | default | rounded | 78 | radius/sm (4px) | none |
| expanded | default | sharp | 257 | radius/none | none |
| expanded | default | rounded | 257 | radius/sm (4px) | none |
| collapsed | gradient | sharp | 82 | radius/none | stroke/thick, gradient |
| collapsed | gradient | rounded | 82 | radius/sm (4px) | stroke/thick, gradient |
| expanded | gradient | sharp | 261 | radius/none | stroke/thick, gradient |
| expanded | gradient | rounded | 261 | radius/sm (4px) | stroke/thick, gradient |

### States, behavior, content, usage, accessibility, layout

**States:** collapsed (resting, header only) · expanded (opened, body appears, icon "flips" per metadata — see Issues) · gradient outline (Flavor=gradient, +4px height/width via the frame-drawn stroke) · header hover (only via the nested instance directly, the card always pins `default`).

**Behavior:** Motion — none modeled, opening is a variant switch. Height change — expanding roughly triples height, plan surrounding layout against the expanded state. Chevron — "carries its own open/closed states and the card sets them to match State" per metadata; **not found wired in this extraction, see Issues.**

**Content & Slot:**
| Property | Type | Description |
|---|---|---|
| Body | slot, one property per expanded variant | Content revealed on open, stored separately per Flavor×Shape combination. |
| Header | exposed nested _Container header | Always visible, not a slot. Carries title, description, leading chevron. |
| Leading icon | exposed nested _Leading Icon | The chevron, tied to State per the metadata; hideable via the header's own hasLeading. |

**Do:** fill the Body of the exact variant you ship · use gradient for at most one card in a group.
**Don't:** lay a column out against the collapsed height · reach for this when content is always visible (use Card base).

**Accessibility:** the chevron direction alone doesn't convey expanded/collapsed to AT, expose state in code · the header toggles the card but isn't modeled as a button here, build the target/focus/keyboard behavior · the gradient outline is decorative only · collapsed content should be genuinely hidden from AT when closed.

**Layout & theming:** Width fixed 385px, every variant · Height hugs (78/257px default, 82/261px gradient) · Header padding 16px (`space/lg`) top/bottom, 24px (`space/xl`) sides, 8px (`space/sm`) icon-to-heading gap · Body padding none while collapsed, 24px (`space/xl`) left/right/bottom when expanded (nothing on top) · Heading spacing 2px (`space/3xs`) title-to-description, 4px (`space/2xs`) inside the title row · Radius per shape · Outline: gradient flavour only, 2px (`stroke/thick`), `foreground/gradient/start`→`foreground/gradient/end` · Fill `surface/card`, header sits on transparent `interactive/ghost/background/default` · Leading icon 28px `Icon` at `Size=large`, `Framed=false` · Description text on `foreground/secondary`.

---

## Subcomponents

### `_Container header` (private)
Used by Collapsible Card's built-in header.
- **API:** `flavor` enum (`default | hover`) · `hasLeading` boolean (default true) · `required` boolean (default true) · `showDescription` boolean (default true) — **new since the first extraction pass**, controls the description text's visibility. Collapsible Card's own componentPropertyDefinitions still has no pass-through for it (same pattern as `hasLeading`/`required`) — its embedded header instance is presumably pinned true, not exposed further up.
- **Anatomy:** `leadingIcon` (instance of `_Leading Icon`, `State=close`, visible when `hasLeading`) · `heading` text (`title/large`) · `requiredMark` text ("*", `foreground/error`, visible when `required`) · `description` text (`title/medium`, `foreground/secondary`, visible when `showDescription`).
- **Variants:** default → `interactive/ghost/background/default` at 0% opacity (fully transparent) · hover → `interactive/ghost/background/hover` at 5% opacity.

### `_Leading Icon` (private)
Used by `_Container header`.
- **API:** `state` enum (`close | open`, default open).
- **Anatomy:** an `Icon` instance (shared library, `Size=large`, `Framed=false`) that swaps a genuinely distinct, verified glyph per state (confirmed by resolving each swap to its parent component set, not just its own variant name — see Issues). This subcomponent pins the **sharp** icon family (Avatar and Button both pin rounded).
- **Variants:** `open` → glyph `expand-more` · `close` → glyph `chevron-right`. Both confirmed present in `packages/icons` and not rejected — see Issues for why the built components deliberately don't swap between them literally.

### `_Card Heading` (private, single component — no variants)
Used as Card base's preferred header/body content, and inside both Card Templates.
- **API:** `leadingContent` slot (default: Avatar, `Size=small`, ring/status/close off) · `trailingContent` slot (default: Icon Button, `Flavour=text`) · `hasLeading` / `hasTrailing` booleans (default true).
- **Anatomy:** leadingContent slot · `heading` text (`title/medium`, `foreground/primary`) · `subheading` text (`body/small`, `foreground/secondary`) · trailingContent slot.
- Fixed width 360px raw (used at 328px fill-width inside Card base's 330px shell — a drawing-canvas convenience, not a binding). Default leading content cross-references the already-specced **Avatar** component.

### `_Card Body` (private, single component — no variants, no properties)
A plain text block (`body/small`, `foreground/secondary`), padding `space/lg` all sides, fixed width 360px raw.

### `_Card Image` (private, single component — no variants, no properties)
A single image fill, fixed height 259px raw, fills width. A content input (placeholder image), not a design decision.

### `_Card Footer` (private)
- **API:** `actions` enum (`1 | 2 | custom`, default 1) · `slot` (only meaningful at `actions=custom`).
- **Anatomy:** `actions=1` → one `Button` (`Flavor=primary`), fill width. `actions=2` → two buttons, gap `space/sm`, outline then primary. `actions=custom` → a slot, default content one outline `Button`.
- Every Button instance is pinned `Shape=sharp` regardless of the Actions option, and this subcomponent has no Shape property of its own — see Issues.

---

## Compositions

### Card Template Default (builds on Card base)
A ready-made card built on Card base, offered in three content layouts and two corner treatments. It declares no properties of its own beyond those two axes, so everything else is configured through the exposed Card base instance inside it.

- **API:** `layout` enum (`text | media inset | media`) · `shape` enum (`sharp | round`).
- **Layout, per option (verbatim):** text — "A heading row, a block of body text and a footer of actions. The everyday card, and the only layout with no image in it." · media inset — "Adds an image inside the body above a second heading and the text, keeping the card's own header row on top." · media — "Drops the header row entirely and leads with the image. It is wider than the other two, so it will not line up with them in a grid."
- **Content:** Card base (exposed nested instance) · header filled per layout (`_Card Heading` with Avatar + Icon Button, absent in media) · body filled per layout (`_Card Body` alone in text; `_Card Image` + `_Card Heading` + `_Card Body` stacked in both media layouts) · footer `_Card Footer` in every layout.
- **Accessibility:** the template is a composition, not new behavior · media layouts need an image description or a heading that carries it · content clips at the shell's fixed width · nothing here makes the whole card clickable.
- **Layout & theming:** Width fixed per layout (360 text/media-inset, 394 media) · Height hugs (228 / 523 / 451) · Shape passed straight to the shell · surface/border/clipping all belong to Card base.

### Card Template Collapsible (builds on Collapsible Card)
A ready-made collapsible card built on Collapsible Card, with the body already filled. It declares no properties of its own beyond its three axes.

- **API:** `state` enum (`collapsed | expanded`) · `flavor` enum (`gradient | default`, **template default is gradient** — note this disagrees with the shell's own default of `default`, per the metadata itself) · `shape` enum (`sharp | round`).
- **Content:** Collapsible Card (exposed nested instance) · body content differs per flavor — default's expanded body holds `_Card Body` + `_Card Image` + `_Card Footer`; gradient's holds `_Card Body` + `_Card Footer` with no image.
- **Accessibility:** expanding isn't modeled as behavior here, build the toggle/focus/state in code · the two flavours ship different body content, so what a reader sees on opening depends on a choice that looks decorative · gradient outline carries no meaning of its own · collapsed content should be genuinely hidden from AT when closed.
- **Layout & theming:** Width fixed 385px, inherited · Height hugs (78/481 default, 82/226 gradient — the two flavours differ by far more than the outline's 4px because their bodies hold different content) · Shape and Flavor both map straight onto the shell's axes.

---

## Tokens & theming

- **Color:** `surface/card`, `border/default`, `foreground/primary`, `foreground/secondary`, `foreground/error`, `foreground/gradient/start`, `foreground/gradient/end`, `interactive/ghost/background/default`, `interactive/ghost/background/hover`, `interactive/ghost/border/default`, `interactive/primary/background/default`, `interactive/primary/border/default`, `interactive/neutral/background/default`.
- **Dimension:** `space/none`, `space/3xs`, `space/2xs`, `space/sm`, `space/md`, `space/lg`, `space/xl`, `radius/none`, `radius/sm`, `stroke/thin`, `stroke/base`, `stroke/thick`, `control/sm`, `control/md`, `control/lg`.
- **Typography:** `title/large`, `title/medium`, `body/small`.
- **Theme axes:** `palette` (Light, Dark) · `size` (Desktop, Mobile, Tablet, Desktop Compact) · `typography` (Desktop, Tablet, Mobile, Desktop Compact).
- **Source:** `tokens/` (see `tokens/manifest.json`).

## Issues

**Blockers:**
- The metadata states the leading chevron "carries its own open and closed states and the card sets them to match State," and that it's "exposed, so it can be hidden through the header's own hasLeading toggle" implying a State-driven flip. This extraction found the nested `_Container header` instance byte-identical across every collapsed/expanded pair in all 8 Collapsible Card variants — no instance-property change, no variant swap. Collapsible Card's own properties have no compound "State#…" entry that would let code drive this either. **The chevron does not currently flip with State in this Figma file.** What it should swap between, if wired, is now known precisely: `chevron-right` when closed, `expand-more` when open — both real, verified glyphs (see `_Leading Icon`'s own variants), not a rotation of one glyph.

**Warnings:**
- Collapsible Card exposes a `Footer#3541:48` slot property with an empty `controls` list — no part in any of the 8 variants is bound to it. Likely vestigial; the metadata itself says Collapsible Card has no footer slot at all.
- `_Card Footer`'s Button instances are pinned `Shape=sharp` in every Actions option, with no Shape property of its own on the footer — there's no evident binding tying its buttons' corners to the parent Card's own Shape. A rounded Card's footer buttons may need manual attention in code.
- `_Leading Icon`'s two states genuinely swap between the glyphs `chevron-right` (closed) and `expand-more` (open) — both verified present and not rejected. But `expand-more` is not vertically symmetric within its own glyph box (ink sits high, dead space below), which reads as top-misaligned when box-centered against multi-line header text — this was independently found against the built React/Web-components implementation. Those implementations deliberately rotate the single, optically-symmetric `chevron-right` glyph 90° instead of swapping to `expand-more`, trading literal fidelity to this glyph pairing for correct visual alignment. Don't "fix" this back to a literal two-glyph swap — that reintroduces the alignment bug.

**Notes:**
- `_Card Heading`'s default leading-content Avatar instance resolves to component id `2699:17793`, which predates a Figma edit made earlier in this session that recreated Avatar's master under a new id (`4906:1172` — see `specs/avatar`). This instance may reference an orphaned prior Avatar; worth a manual check.
- Card base's 330px and Collapsible Card's 385px root widths are raw, unbound values by design — both metadata frames state "Width: Fixed" with the px value directly, not a token, reading as intentional rather than an oversight.
- **Corrected:** an earlier pass reported `_Leading Icon`'s swap as a generic placeholder with no real glyph committed. Re-resolving each swap to its parent component set (the same extraction-methodology fix applied on Avatar's spec) shows two real, verified, distinct glyphs — see the warning above.
- The two Card Templates were documented from their own metadata plus the page-level variant/prop summary, not independently re-walked node-by-node — everything they compose is already fully extracted under Family and Subcomponents, and their own metadata calls itself "a condensed record."
- Neither Card base nor Collapsible Card has any effect (shadow) at any variant — confirmed by extraction, matching Card base's own "Elevation: None" row exactly.
- **New since the first pass:** `_Container header` gained a `Show Description#5002:0` boolean property (default true, controls the description text's visibility). Everything else on the page — Card base, Collapsible Card, the other five subcomponents, both templates, all node ids — is unchanged.
