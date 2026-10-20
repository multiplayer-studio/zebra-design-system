# The visual audit

`scripts/visual-audit.mjs` renders a component for real and asserts the things
that only exist once something is painted. It complements `pnpm run check`; it
does not replace it.

```bash
node .claude/skills/zebra-react-baseui/scripts/visual-audit.mjs <component> [--full] [--keep]
```

| Flag | Effect |
|---|---|
| `--full` | Render the cross product of every axis instead of one axis at a time. Slow, thorough. |
| `--keep` | Leave `packages/react-baseui/.audit/` in place — harness, built page and screenshot. |
| `--pkg`, `--specs` | Point at a different package or spec directory. |

The component argument is the spec slug (`button`, `navigation-rail`); the
script derives the export name from it (`Button`, `NavigationRail`) and looks
it up in `src/index.ts`. A component missing from that barrel file fails here
first.

## How it works

1. Regenerates the token CSS, so the audit can never pass against stale tokens.
2. Reads `specs/<component>/<component>.spec.json` and turns `api` into
   specimens: one per value of each enum or boolean axis, against the defaults.
3. Writes a Vite + React harness into `<pkg>/.audit`, builds it, serves it over
   loopback HTTP.
4. Drives headless Chrome over the DevTools protocol: evaluates a probe that
   waits for `document.fonts.ready`, reads geometry and computed styles for
   every specimen, then captures a full-page screenshot.
5. Asserts, prints, and deletes `.audit` unless `--keep`.

Four implementation details are load-bearing, and all four were failures first:

- **Loopback HTTP, not `file://`.** A `file://` page has an opaque origin and
  Chrome refuses the webfont, so every icon assertion fails for a reason that
  has nothing to do with the component.
- **A private `--user-data-dir`.** Without one, a Chrome already running on the
  machine takes the request over and opens a tab in the user's own window,
  and the script hangs rather than rendering.
- **CDP, not `--dump-dom` / `--screenshot`.** `requestAnimationFrame` does not
  fire under `--virtual-time-budget` in current headless builds, so a probe
  that waits for a frame waits for ever.
- **Spec values are normalised before they become props.** A spec records
  `disabled` as the *strings* `"false"` and `"true"`, both of which are truthy;
  passing them through would leave every specimen disabled and the audit would
  cheerfully pass on a page of grey boxes.

## What each assertion means

| Assertion | What a failure actually is |
|---|---|
| **no specimen collapsed** | A part sized to content that has none, or a flex child with no basis. Reads as "the component did not render". |
| **height grows across the size axis** | The size axis is not wired, or two options resolve to the same token. |
| **no label on its own background** | A flavour set `--zds-*-bg` and `--zds-*-fg` from the same token, or a state rule overrode one and not the other. |
| **label contrast ≥ 4.5:1** | Advisory. The Figma palette has genuine WCAG shortfalls recorded in the spec's `issues` — compare the count before calling it a regression. |
| **every icon glyph resolved and drew** | `icons.css` not loaded, a name absent from `codepoints.json`, or one of the nine icons the font build rejects. All three render nothing, silently. |
| **dark mode changes the page surface** | The generated `themes.css` is missing or not imported. |
| **dark mode reaches the component** | The component hard-codes a colour instead of reading a semantic token. A brand colour legitimately does not move between light and dark, so the check only requires *some* specimen to change. |
| **nested `mode-light` restores light** | The theme scope emitted only its own diff against base rather than the family's full closure — the bug `build-tokens-css.mjs` computes closures to prevent. |
| **the extension re-themes the component** | Advisory. `.ext-companion` did not reach the tokens the component uses. |
| **no custom property resolved to empty** | A `var()` naming a token that does not exist — usually a typo, or a prefixed name where an unprefixed one was meant. |
| **every spec axis changes something** | An axis rendered identically for all its values. Often correct (an interaction-state axis is CSS, never a prop); otherwise a prop the spec declares and the component never reads. |

That last one is this package's substitute for introspection. A custom element
exposes its properties and can simply be asked; a React component cannot, so
the audit infers from effect instead — which has the side benefit of catching a
prop that exists in the signature but is never applied.

## Then look at the screenshot

The assertions are a floor, not a verdict. They cannot see that a component is
the wrong shape, that spacing is doubled, that a gradient runs the wrong way,
or that two flavours are indistinguishable. On this design system that is not
hypothetical: two cross-component bugs on Navigation Rail — a dark/light
theming conflict and a zero-height collapse — survived per-component review and
were caught only by looking at the rendered result.

The screenshot path is printed on the last line. Open it.

## Parity with web-components

The same spec is implemented twice, and the two must agree. Run both audits and
compare the two PNGs:

```bash
node .claude/skills/zebra-web-components/scripts/visual-audit.mjs button --keep
node .claude/skills/zebra-react-baseui/scripts/visual-audit.mjs button --keep
```

The panes are identical in both scripts and the specimens come from the same
spec, so the two images are directly comparable pane by pane. A difference in a
single cell is a real divergence between the packages — the CSS is written
twice, and nothing else in the toolchain compares them.

## Adding an assertion

Assertions live in section 6, each a `check(level, name, ok, detail)` call over
the `got` structure. `got.specimens` is one row per specimen per pane with
geometry, colours, radius, font and any icon glyphs found; `got.panes` is the
per-pane surface and foreground.

Name the offending specimens in the detail string — "something is wrong" costs
more than it saves. And prefer `warn` to `fail` wherever the design system is
legitimately allowed to be in that state: a check that fails on correct code
gets ignored, and then so does the one beside it.

## Adding a theme pane

`PANES` is a list of `{ id, chain, note }`, where `chain` is the ancestor
elements outermost-first and a space *inside* an entry means two classes on the
same element. The distinction is the entire point:
`.ext-companion.mode-dark` and `.mode-dark > .ext-companion` are different
selectors, and flattening a chain onto one element silently tests neither. The
same shape is used by `web-components/scripts/check-theming.mjs`.
