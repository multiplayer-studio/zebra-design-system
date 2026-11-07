# Avatar

A visual representation of a user or entity, shown as a photo, initials, or icon, with an optional status indicator. Nine sizes step from xxxsmall to xxxlarge with medium as the base, and the badges, ring and glyphs all scale from that step. The status badge carries a distinct glyph per state as well as its colour. Content type isn't an exposed property, swap the nested Avatar Type instance directly to change it. For a notification count on an icon or nav item, use the Notification Indicator component instead, Avatar's own indicator is for presence, not counts.

Source: [Avatar page](https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/The-Zebra-Design-System?node-id=4906-1172) · extracted 2026-09-23 (third pass — corrects a resolver bug in earlier passes' icon-swap handling and adds a direct read of initials text scaling; see Issues)

## API

| Prop | Type | Values | Default | Controls |
|---|---|---|---|---|
| `size` | enum | xxxsmall, xxsmall, xsmall, small, medium, large, xlarge, xxlarge, xxxlarge | xxxsmall | variant |
| `showClose` | boolean | true, false | true | close (visible) |
| `showStatus` | boolean | true, false | true | status (visible) |
| `showRing` | boolean | true, false | true | ring (visible) |

These are the **only** four properties Avatar's own Figma component actually exposes. The metadata (below) also documents "Status" and "Custom Icon" as if they were Avatar-level properties — they are not; see Issues.

**Size, per option (verbatim):**
- **xxxsmall** — The smallest step, for dense inline contexts like compact tables or comment threads. The presence glyph is only a few pixels across here, so do not rely on anyone reading it.
- **xxsmall** — A step up from xxxsmall, still compact, for dense lists.
- **xsmall** — For secondary avatars in tight layouts, like a stacked group of collaborators.
- **small** — For list rows and menu items where the avatar sits alongside text.
- **medium** — The base step, and a balanced general-purpose choice for cards and list headers. Every other size is scaled from it, so start here unless something specific argues otherwise.
- **large** — For emphasis in a card header or a comment's author avatar.
- **xlarge** — For a prominent single avatar, like a user menu or account switcher.
- **xxlarge** — For profile headers where the avatar is a focal point.
- **xxxlarge** — The largest step, for full profile pages or standalone display. The close glyph does not grow with its badge at this size, so check it still reads as a target.

**Show Close:**
- **true** — Shows a dismiss badge pinned to the top-right corner. Use in removable contexts, like a multi-select chip list.
- **false** — Hides the dismiss badge. The default for most read-only contexts where the avatar isn't removable.

**Show Status:**
- **true** — Shows a presence badge pinned to the bottom-right corner, defaulting to Available.
- **false** — Hides the presence badge. Use when presence doesn't apply, like a generic entity avatar or a purely illustrative photo.

**Show Ring:**
- **true** — Shows a border/default outline ring around the avatar, weight scales with Size.
- **false** — Hides the ring. Use on backgrounds where the outline competes with surrounding content.

## Internal variations & content inputs

- **Content type** (via `_Avatar Type`) — `initials | photo | Icon`. Not an exposed property; swap the nested Avatar Type instance directly.
- **Swatch color** (via `_Avatar Swatch`) — `purple | blue | sea | yellow | orange | green | burgundy`, using `chart/series` tokens. Not used behind a photo. Code also takes any token name or colour value.
- **Status** (via `_Status Indicator`) — `Available | Away | Busy | DND | On Shift | Offline | Close | Icon`. Only shown when `showStatus` is true. The metadata now calls this "exposed" and reachable without detaching — not supported by Avatar's actual Figma properties in this extraction (see Issues). Each of the six presence states binds a genuinely distinct, verified glyph: Available→`available`, Away→`away`, Busy→`busy`, DND→`dnd`, On Shift→`on-shift`, Offline→`offline`. Close is the exception — it currently reuses Offline's glyph, which reads as a Figma bug (see Issues).
- **Custom Icon slot** (on `_Status Indicator`, `Custom Icon#4770:0`, INSTANCE_SWAP) — only meaningful on the Status Indicator's own `Status=Icon` variant; both the on-page instance and the property's own default resolve to the glyph `star`, matching the metadata's stated default exactly.
- **Photo** (content input, via `_Avatar Photos`) — 40 named sample photos (`src`), not an enum. Used only when content type is photo.

## Anatomy

1. **Avatar Type** — Fills the frame, auto-positioned. Holds initials with a colored swatch, a photo, or an icon with a colored swatch. Not an exposed property, swap the nested instance directly.
2. **Ring** — Surrounds the avatar's content circle from outside its edge (confirmed intent), not inset over it. `border/default` color, stroke only. Weight scales proportionally with Size (`rootWidthPx ÷ 24`), 2px at medium — only medium is token-bound (`stroke/thick`), every other size is a raw computed value. **Note:** Figma's own raw geometry draws the Ring ellipse at the exact same box as the content with `strokeAlign=INSIDE`, which taken literally overlaps the photo/swatch's outer rim rather than surrounding it — implement the confirmed outside-facing intent instead (see Issues).
3. **Close** — Pinned to the top-right corner. An instance of the Status Indicator component's Close variant, shown or hidden with `showClose`. Like every _Status Indicator instance, it has a `foreground/inverse` border ring around its fill (badgeSizePx ÷ 16 thick) — see the subcomponent's anatomy.
4. **Status** — Pinned to the bottom-right corner, defaults to Available. Shown or hidden with `showStatus`. The metadata says the instance is exposed so its state (and for Icon, its glyph) are reachable directly — not confirmed by this extraction. Like Close, it has the same `foreground/inverse` border ring around its fill.

Values above are token names except where marked `…Px` (a measurement, not a token) or flagged in Issues.

## Variants

| size | root sizePx | badge sizePx (= root ÷ 3) | ring weightPx (= root ÷ 24) | initials fontSizePx (= root ÷ 3) |
|---|---|---|---|---|
| xxxsmall | 24 | 8 | 1 | 8 |
| xxsmall | 32 | 10.67 | 1.33 | 10.67 |
| xsmall | 36 | 12 | 1.5 | 12 |
| small | 40 | 13.33 | 1.67 | 13.33 |
| medium | 48 (bound to `control/lg`) | 16 | 2 (bound to `stroke/thick`) | 16 (bound to `label/large/font size`) |
| large | 60 | 20 | 2.5 | 20 |
| xlarge | 80 | 26.67 | 3.33 | 26.67 |
| xxlarge | 120 | 40 | 5 | 40 |
| xxxlarge | 200 | 66.67 | 8.33 | 66.67 |

Badge size, ring weight, and the initials text size all follow exact proportional formulas across all nine sizes (badge and initials share the same root ÷ 3 ratio); only `medium` is bound to real tokens for any of them. The initials-scaling row was confirmed by directly reading the nested initials TEXT node's fontSize inside each Size variant (not covered by the earlier pass). See Issues for how this differs from what the metadata states.

## Subcomponents

### `_Avatar Type` (private)
- **API:** `type` enum — `initials | photo | Icon` (default `initials`).
- **Anatomy:** `swatch` (instance of `_Avatar Swatch`, `initials` only) + `initials` text (style `label/large`, raw `#ffffff` fill — see Issues; fontSize scales `root ÷ 3` per Avatar Size, see Variants) · `photo` (instance of `_Avatar Photos`, `photo` only) · `icon` (shared library `Icon` instance, `Icon` only — resolves to the **Verified** component, glyph `verified`, a real default, not a placeholder).
- **Variants:** `initials` shows swatch + text; `photo` shows photo; `Icon` shows icon.

### `_Avatar Swatch` (private)
- **API:** `color` enum — `purple | blue | sea | yellow | orange | green | burgundy` (default `purple`).
- **Anatomy:** a single ellipse, fill bound to a `chart/series/*` token per color.
- **Variants:** purple→`chart/series/4`, blue→`chart/series/1`, sea→`chart/series/9`, yellow→`chart/series/7`, orange→`chart/series/11`, green→`chart/series/6`, burgundy→`chart/series/5`.

### `_Avatar Photos` (private)
- **API:** `name` — 40 named sample variants (content input, not a real enum), default `Ophelia McKenna`.
- **Anatomy:** a single ellipse with an `IMAGE` fill, `CROP` scale mode.

### `_Status Indicator` (private)
- **API:** `status` enum — `Available | Away | Busy | DND | On Shift | Offline | Close | Icon` (default `Available`); `customIcon` slot (INSTANCE_SWAP, `Custom Icon#4770:0`), meaningful only on `Icon`.
- **Anatomy:** `void` (ellipse, full badge diameter, **always visible on every status, not only Offline** — a `foreground/inverse` background circle; only its colour changes, for Offline) · `fill` (ellipse, the presence colour, inset from the badge edge by exactly `badgeSizePx ÷ 16` at every size — this inset is what reveals `void` as a border ring around `fill`, on every status including Close) · `icon` (shared `Icon` instance, hidden on `Icon` status — each status swaps a genuinely distinct, verified glyph; only fill color and position constraints otherwise change) · `customIcon` (shown only on `Icon` status, default component `Star`, glyph `star`).
- **Variants:** Available→`chart/positive` fill, glyph `available` · Away→`chart/series/8` fill, glyph `away` · Busy→`chart/negative` fill, glyph `busy` · DND→`chart/series/4` fill, glyph `dnd` · On Shift→`chart/series/1` fill, glyph `on-shift` · Offline→`foreground/inverse` fill + `foreground/secondary` void (the only status where void's colour differs), glyph `offline` · Close→`chart/series/12` fill, glyph reuses **offline**'s (likely a Figma bug — see Issues) · Icon→`chart/series/1` fill + custom icon slot (default glyph `star`). `void` is `foreground/inverse` on every row except Offline.

## Tokens & theming

- **Color:** `border/default`, `chart/series/1`, `chart/series/4`, `chart/series/5`, `chart/series/6`, `chart/series/7`, `chart/series/8`, `chart/series/9`, `chart/series/11`, `chart/series/12`, `chart/positive`, `chart/negative`, `foreground/inverse`, `foreground/secondary`.
- **Dimension:** `space/none`, `stroke/thick` (medium ring only), `control/lg` (medium root width only).
- **Typography:** `label/large`.
- **Theme axes:** `palette` (Light, Dark) · `size` (Desktop, Mobile, Tablet, Desktop Compact) · `typography` (Desktop, Tablet, Mobile, Desktop Compact).
- **Source:** `tokens/` (see `tokens/manifest.json`).

## States, behavior & motion

**States:** Static — Avatar has no hover, pressed, or focus states in Figma. Close and Status are static badges that change only with the Status property, so whatever click behaviour Close has in a real interface lives in code rather than here.

**Motion:** None modeled in Figma. Avatar is presented as a static graphic, any transition when swapping Size, content, or toggling Show Close, Show Status, or Show Ring lives in code.

## Content & slots

| Property | Type | Description |
|---|---|---|
| Content type | fixed per instance | Initials, photo, or icon. Not an exposed property, swap the nested Avatar Type instance directly to change it. |
| Swatch color | fixed per instance, 7 options | Background color behind initials or an icon (purple, blue, sea, yellow, orange, green, burgundy, using chart/series tokens). Not used behind a photo. Swap the nested Swatch instance directly. |
| Photo | instance swap, 40 named options | Used only when Content type is photo, fills the circle. In Figma swap the nested Photo instance to any of the named photos in _Avatar Photos. In code any image can be passed as an image property. |
| Status | exposed nested instance, 8 states | Holds one of eight states from the _Status Indicator component, each drawn with its own glyph from the Assets library — **confirmed true** (six distinct verified glyphs; Close is a likely bug, see Issues). The instance is exposed, so the state is set from Avatar's own properties panel without detaching — *this specific "exposed" claim is not confirmed by this extraction, see Issues.* Only rendered while Show Status is true. |
| Custom Icon | instance swap, any component | The glyph used while Status is Icon. Any component can be swapped in and the suggested list holds only the Star set, so nothing constrains it to a presence-shaped mark. Default confirmed as `star`. |

## Usage (do / don't)

**Do:**
- Match Size to context, dense lists and tables call for the smaller sizes (xxxsmall to small), profile headers and standalone display call for the larger ones (xlarge to xxxlarge).
- Turn off Show Status for generic entities or purely illustrative photos where presence doesn't apply.

**Don't:**
- Don't use the presence Status badge for unread or notification counts, that's a different purpose, use the Notification Indicator component instead.

## Accessibility

- Purely visual, an avatar image or initials alone don't convey a name, pair it with visible text or provide an accessible name in code.
- Each presence state now carries its own glyph as well as its colour, so the badge no longer depends on colour alone. Still give it a text equivalent, because at the smallest sizes the glyph is only a few pixels across. *(Confirmed true — six distinct verified glyphs; Close appears to reuse Offline's by mistake, see Issues.)*
- The Close badge implies a dismiss action, give it an accessible name in code like "Remove [name]", Figma has no interactive state for it.
- The close glyph is drawn at a fixed size whatever the avatar, so on the largest avatars it sits very small inside its badge. Check it still reads as a target.

## Layout & theming intents

| Property | Type | Description |
|---|---|---|
| Size | Fixed per Size, medium is the base | Nine fixed squares stepping 24, 32, 36, 40, 48, 64, 80, 120 and 200px, with medium at 48px as the base. Medium is the only step bound to a token (control/lg), every other step is an authored value. Not resizable independently of the Size property. *(The stated 64px for `large` doesn't match the extracted 60px — see Issues.)* |
| Badge size | Scales with Size, medium is the base | The Status and Close badges are 16px at medium, exactly one third of the avatar, and step 8, 10, 12, 12, 16, 18, 24, 36 and 56px across the ladder. Above medium they grow more slowly than the avatar, so a large avatar is never dominated by its badge. *(Extraction instead finds a flat root ÷ 3 ratio at every step — see Issues.)* |
| Badge glyph | Scales with the badge | The status glyph holds a constant share of its badge at every size, 0.42 of the badge width, so it stays proportional from 24px through 200px. The close glyph is drawn at a fixed 5px at every size, so its share of the badge falls from two thirds at xxxsmall to under a tenth at xxxlarge. *(Not independently verifiable at this extraction depth — see Issues.)* |
| Ring weight | Scales per Size tier, medium is the base | stroke/thick at medium and every step below it, stroke/heavy at large and xlarge, then 6px and 8px at xxlarge and xxxlarge. The two heaviest weights are authored values rather than tokens. *(Extraction instead finds a continuous root ÷ 24 proportional scale, with only medium token-bound — see Issues.)* |
| Close and Status position | Fixed | Pinned flush to the top-right and bottom-right corners, inset by exactly the badge's own width so both sit inside the avatar's bounds at every size. They scale in position as the avatar resizes and do not move independently. |
| Color | Theming | Ring uses border/default. Each status draws its circle from a chart token, chart/positive for Available, chart/negative for Busy and chart/series steps for the rest, with the glyph on foreground/inverse. Offline inverts that pair, a foreground/inverse circle carrying a foreground/secondary glyph. Swatch colours use chart/series. All resolve separately for light and dark mode. |

## Issues

**Blockers:**
- The Property Breakdown and Content & Slot table document "Status" (8 states) and "Custom Icon" as if they were properties reachable directly on Avatar — one calling Status an "exposed nested instance... reachable in the properties panel without detaching." Avatar's actual Figma component only has 4 properties (Size, Show Close, Show Status, Show Ring); neither Status nor Custom Icon exists at the Avatar level. Both remain swap-only on the nested `_Status Indicator` subcomponent in this extraction.
- The Close status variant's icon swap resolves to the same glyph node as Offline (component "Offline") rather than a dedicated dismiss icon. Every other status has its own correctly-matched glyph, which makes this look like a copy-paste oversight on that one variant. Recommend using the verified `close` glyph for the dismiss badge instead of reading it off this swap.

**Warnings:**
- Layout & Theming states Size steps at "24, 32, 36, 40, 48, 64, 80, 120 and 200px." The extracted `large` measures 60px, not 64px.
- Layout & Theming states badge sizes step "8, 10, 12, 12, 16, 18, 24, 36 and 56px" and grow more slowly than the avatar above medium. The extracted badges are instead exactly root width ÷ 3 at every size (8, 10.67, 12, 13.33, 16, 20, 26.67, 40, 66.67) — a flat ratio, not a slowing one.
- Layout & Theming states ring weight is a stepped function (2px through medium, 4px at large/xlarge, 6–8px above). The extracted weights instead scale continuously as root width ÷ 24 (1, 1.33, 1.5, 1.67, 2, 2.5, 3.33, 5, 8.33); only medium's 2px happens to be token-bound.
- A direct re-read of the Ring ellipse confirms its bounding box is identical to the avatar's own content box at every Size, with `strokeAlign=INSIDE` — the raw Figma geometry draws the stroke overlapping the content's outer rim rather than surrounding it. Design has confirmed the intended rendering is a ring that sits **outside** the content circle; implement per that confirmed intent, not the literal Figma alignment (see the Ring anatomy entry above).

**Notes (corrected):**
- The metadata's Anatomy and States sections frame Offline as "the one hollow badge" via its void layer, implying the void/border is Offline-specific. A direct re-check across sizes shows `void` is actually a full-badge-diameter background circle present and visible on **every** status, with `fill` inset from the badge edge by exactly `badgeSizePx ÷ 16` at every size — this produces a visible `foreground/inverse` border ring around every status badge and the Close badge, not only Offline. Only `void`'s colour changes for Offline (to `foreground/secondary`), which is what makes that one read as "hollow" — the underlying two-layer (void + inset fill) structure is universal. Confirmed by measuring Fill/Void boxes directly at xxxsmall, medium, and xxxlarge (the ratio holds exactly at all three).

- Root width is bound to `control/lg` only in medium; ring `strokeWeight` is bound to `stroke/thick` only in medium — consistent with the proportional-scale finding and with Layout & Theming's own statement that medium is the only tokenized step. The initials text fontSize follows the same pattern (see Variants).
- `_Avatar Type`'s initials text fill is a raw `#ffffff` with no token or style.
- `space/none`'s description states "= 32px, source: scale/10" but resolves to 0px; `control/lg`'s states "= 56px, source: scale/15" but resolves to 48px.
- Every glyph named in this spec (`available`, `away`, `busy`, `dnd`, `on-shift`, `offline`, `verified`, `star`, and the recommended `close`) is confirmed present in `packages/icons/codepoints.json` by exact figmaName match and absent from that build's rejected list.
- **Extraction methodology, corrected:** earlier passes resolved every icon-swap property by reading only the swapped node's own variant name (e.g. "Style=rounded") instead of walking up to its parent component set's name — the actual glyph identity. That produced three false "placeholder icon, no glyph committed" blockers, all retracted in this pass: Avatar's own Icon content type (real default: `verified`), Status Indicator's Custom Icon default (real default: `star`, matching the metadata), and the presence status icons (each genuinely distinct). Any other spec built with the same earlier approach that reports an icon swap as an unresolved placeholder should be treated as suspect until re-verified the same way.
- The stated fixed 5px close-glyph size could not be verified — this extraction stops at the Close/Status instance boundary and doesn't re-walk its internals per Avatar size.
- Content type, swatch color, status, and custom icon are all swap-only in this extraction, not exposed properties — see the first blocker above.
- The master set's on-page default content type changed since the prior extraction pass in this session (previously Icon, now initials — matches `_Avatar Type`'s own default).
- States & Triggers and Behavior & Motion Intent are both explicitly "none modeled" in the metadata — intentional, not missing.
