 # token-showcase

Example React + Vite app demonstrating how to consume `zebra-design-system-tokens`.

It imports only the fully-resolved **default theme**:

```ts
import 'zebra-design-system-tokens/css/colors';
import 'zebra-design-system-tokens/css/sizes';
```

and renders every semantic color token as a swatch, every `interactive-*` token as a real
working button (hover/pressed/disabled/focus states included), and every size token
(spacing, radius, stroke, control sizes) as a scaled visual example, plus a live demo of
`--container-default` changing at each responsive breakpoint.

## Running it

From the repo root (this app is an npm workspace, so `zebra-design-system-tokens` resolves
to the local `packages/zebra-design-system-tokens` build):

```bash
npm install
npm run dev:tokens
```

If you've changed the token source, rebuild the tokens package first: `npm run build:tokens`
from the repo root, then restart the dev server (Vite doesn't watch files outside its own
project root by default).

## Trying a different theme/mix

To see this same app resolve differently, swap the imports in `src/main.tsx` for the
building-block files instead — e.g. `zebra-design-system-tokens/css/primitives/target`,
`zebra-design-system-tokens/css/palette/companion`, and
`zebra-design-system-tokens/css/semantics` — no other code in this app needs to change,
since every component here only ever references semantic/size CSS variable names.
See `tooling/token-machine/README.md` §3b for details.
