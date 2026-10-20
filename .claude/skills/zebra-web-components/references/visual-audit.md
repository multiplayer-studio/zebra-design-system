# The visual audit

`scripts/visual-audit.mjs` renders a component for real and asserts the things
that only exist once something is painted. It complements `pnpm run check`; it
does not replace it.

```bash
node .claude/skills/zebra-web-components/scripts/visual-audit.mjs <component> [--full] [--keep]
```

| Flag | Effect |
|---|---|
| `--full` | Render the cross product of every axis instead of one axis at a time. Slow, thorough. |
| `--keep` | Leave `packages/web-components/.audit/` in place — the harness, the built page and the screenshot. |
| `--pkg`, `--specs` | Point at a different package or spec directory. |

## How it works

1. Regenerates the token CSS, so the audit can never pass against stale tokens.
2. Reads `specs/<component>/<component>.spec.json` and turns `api` into
   specimens: one per value of each enum or boolean axis, against the defaults.
3. Writes a Vite harness into `<pkg>/.audit`, builds it, serves it over
   loopback HTTP.
4. Drives headless Chrome over the DevTools protocol: evaluates a probe that
   waits for `document.fonts.ready`, then reads geometry and computed styles
   for every specimen, then captures a full-page screenshot.
5. Asserts, prints, and deletes `.audit` unless `--keep`.

Three implementation details are load-bearing, and all three were failures
first:

- **Loopback HTTP, not `file://`.** A `file://` page has an opaque origin and
  Chrome refuses the webfont, so every icon assertion fails for a reason that
  has nothing to do with the component.
- **A private `--user-data-dir`.** Without one, a Chrome already running on the
  machine takes the request over and opens a tab in the user's own window. The
  script then hangs forever rather than rendering anything.
- **CDP, not `--dump-dom` / `--screenshot`.** `requestAnimationFrame` does not
  fire under `--virtual-time-budget` in current headless builds, so a probe
  that waits for a frame waits for ever. CDP gives a promise to await and a
  real timeout.

## What each assertion means

| Assertion | What a failure actually is |
|---|---|
| **no specimen collapsed** | A part sized `hug` around content that has none, or a flex child with no basis. Reads as "the component did not render". |
| **height grows across the size axis** | The size axis is not wired, or two options resolve to the same token. |
| **no label on its own background** | A flavour set `--zds-button-bg` and `--zds-button-fg` from the same token, or a state rule overrode one and not the other. |
| **label contrast ≥ 4.5:1** | Advisory. The Figma palette has genuine WCAG shortfalls recorded in the spec's `issues` — compare the count to the spec before calling it a regression. |
| **every icon glyph resolved and drew** | `icons.css` not loaded, a name absent from `codepoints.json`, or one of the nine icons the font build rejects. All three render nothing, silently. |
| **dark mode changes the page surface** | The generated `themes.css` is missing or not imported. |
| **dark mode reaches the component** | The component hard-codes a colour instead of reading a semantic token. Note that a brand colour legitimately does not move between light and dark, so the check only requires *some* specimen to change. |
| **nested `mode-light` restores light** | The theme scope emitted only its own diff against base rather than the family's full closure. This is the bug `build-tokens-css.mjs` computes closures to prevent. |
| **the extension re-themes the component** | Advisory. `.ext-companion` did not reach the tokens the component uses. |
| **no custom property resolved to empty** | A `var()` naming a token that does not exist — usually a typo, or a prefixed name used where an unprefixed one was meant. |
| **every spec axis is a property** | The spec declares an axis the element does not expose. Often correct (an interaction-state axis is CSS, never a property); sometimes a prop nobody wired up. The audit cannot tell them apart, so it reports. |

## Then look at the screenshot

The assertions are a floor, not a verdict. They cannot see that a button is the
wrong shape, that spacing is doubled, that a gradient runs the wrong way, or
that two flavours are indistinguishable. On this design system that is not
hypothetical: two cross-component bugs on Navigation Rail — a dark/light
theming conflict and a zero-height collapse — survived per-component review and
were caught only by looking at the rendered result afterwards.

The screenshot path is printed on the last line. Open it.

## Adding an assertion

Assertions live in section 6 of the script, each a single `check(level, name,
ok, detail)` call over the `got` structure the probe returned. `got.specimens`
is one row per specimen per pane with geometry, colours, radius, font and any
icon glyphs found; `got.panes` is the per-pane surface and foreground.

Two guidelines. Make the failure detail name the specimens, because "something
is wrong" costs more than it saves. And choose `warn` over `fail` whenever the
design system is legitimately allowed to be in that state — a check that fails
on correct code gets ignored, and then so does the one beside it.

## Adding a theme pane

`PANES` is a list of `{ id, chain, note }`, where `chain` is the ancestor
elements outermost-first and a space *inside* an entry means two classes on the
same element. The distinction is the entire point:
`.ext-companion.mode-dark` and `.mode-dark > .ext-companion` are different
selectors, and flattening a chain onto one element silently tests neither. The
same shape is used by `scripts/check-theming.mjs`.
