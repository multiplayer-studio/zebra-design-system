# Code style — packages/react-baseui

Conventions as they exist in `Button.tsx`, `button.css` and `Icon.tsx`.

## The two files

```
src/components/button/
├── Button.tsx    the component: props, JSX, docs
└── button.css    every visual value, keyed off data attributes
```

`Button.tsx` is PascalCase because it exports a component; `button.css` is
kebab-case because it is an asset. The component imports the stylesheet for its
side effect:

```tsx
import "./button.css";
```

`src/css.d.ts` declares `*.css` so TypeScript accepts that import.

## The component file

```tsx
import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon, type IconName } from "../icon/Icon.js";
import "./button.css";

export type ButtonFlavour = "primary" | "positive" | /* … */ "text-gradient";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, "className"> {
  /** How much weight the action carries. One primary per view. */
  flavour?: ButtonFlavour;
  /** Glyph before the label. */
  leadingIcon?: IconName;
  className?: string;
}

/**
 * One-line statement of what it does, in the spec's own words.
 *
 * Behaviour — focus handling, the disabled semantics, `render` polymorphism —
 * comes from Base UI's Button. Everything visual comes from the token layer via
 * `button.css`, keyed off data attributes, so an `.ext-*` / `.mode-*` class on
 * any ancestor re-themes it with no re-render.
 *
 * @spec specs/button/button.spec.md
 */
export const Button = React.forwardRef<HTMLElement, ButtonProps>(function Button(
  { flavour = "primary", size = "small", leadingIcon, className, children, ...rest },
  ref,
) {
  return (
    <BaseButton
      ref={ref}
      {...rest}
      className={["zds-button", className].filter(Boolean).join(" ")}
      data-flavour={flavour}
      data-size={size}
    >
      {leadingIcon ? <Icon className="zds-button__icon" name={leadingIcon} /> : null}
      <span className="zds-button__label">{children}</span>
    </BaseButton>
  );
});
```

Rules that matter:

- **`forwardRef` with a *named* function.** The name is what React DevTools and
  every stack trace show; an anonymous arrow shows `ForwardRef`.
- **Extend the primitive's props**, do not restate them. `ComponentPropsWithoutRef<typeof BaseButton>`
  keeps `render`, `disabled`, `onClick` and everything else working, and keeps
  them correct when Base UI changes.
- **`Omit<…, "className">` then redeclare `className`.** The component composes
  its own class with the consumer's rather than letting one replace the other.
- **Spread `...rest` *before* the props you control.** `className` and the
  `data-*` attributes must win; a consumer cannot be allowed to knock out
  `data-flavour` by accident.
- **Variant axes are `data-*` attributes, not classes.** `data-flavour="primary"`
  selects as `[data-flavour="primary"]`, reads in DevTools as the value it is,
  and never collides with a consumer's class.
- **Defaults live in the destructure**, matching the spec's defaults exactly.
- **Doc every public prop.** Storybook's autodocs reads these.
- **Import with `.js` extensions.** The package is ESM and compiles with `tsc`,
  so specifiers must be what the runtime will resolve.

## The CSS file

```css
/* Button — every value is a semantic token from the shared token layer.
   Keyed off data attributes that Button sets, plus Base UI's own
   [data-disabled]. Nothing here knows about themes: an .ext-* / .mode-* class
   on any ancestor changes what these tokens resolve to.

   Spec: specs/button/button.spec.md */

.zds-button {
  /* geometry: size axis */
  height: var(--control-sm);
  padding: var(--space-xs) var(--space-md);

  /* colour: flavour x state axis */
  background: var(--zds-button-bg);
  color: var(--zds-button-fg);
}

.zds-button__label { /* … */ }

.zds-button[data-size="medium"] { height: var(--control-md); }

.zds-button[data-flavour="primary"] {
  --zds-button-bg: var(--interactive-primary-background-default);
  --zds-button-fg: var(--interactive-primary-foreground-default);
}
.zds-button[data-flavour="primary"]:hover:not([data-disabled]) {
  --zds-button-bg: var(--interactive-primary-background-hover);
}
```

- **Block naming is `zds-<component>` and `zds-<component>__<part>`.** Parts
  match the spec's anatomy ids.
- **Section the file by the spec's axes, in the spec's order**, with the same
  banner comments. Someone holding the spec open should be able to scan both.
- **Route colour through one local custom property per role.**
  `--zds-button-bg` is set once per flavour and consumed once. Without it every
  flavour × state combination restates three declarations and the file grows by
  the product rather than the sum.
- **Guard interaction states with `:not([data-disabled])`.** Base UI sets that
  attribute; a hover rule without the guard lights up a disabled control.
- **Style against `[data-disabled]`, not `:disabled`.** Base UI can keep an
  element focusable while disabled, in which case there is no `:disabled`.
- **Comment anything not derived from the spec.** The ghost-scrim opacities are
  written with `color-mix` and are Button's only untokenised values; the comment
  says so and names the spec issue.

## Tokens

`src/tokens/*.css` is **generated** by the web-components script and overwritten
by every `pnpm run tokens`, which Storybook and the check target both run.

- **Unprefixed names only.** A collection nothing else references is the public
  API and is emitted unprefixed (`--surface-page`, `--control-sm`,
  `--interactive-primary-background-default`). Prefixed names (`--palette-*`,
  `--primitives-*`) are internal layers; binding to one couples the component
  to a level the theme system moves.
- **No hard-coded colour, radius, spacing or type value.** If no token exists,
  that is a finding for the spec's `issues`, not a licence to inline a hex.
- **No CSS-in-JS, no `styled`, no inline style objects for anything themed.** A
  themed value must be a custom property so the cascade can re-point it. The
  one exception in the package is `Icon`, whose inline styles set font metrics
  that are not themed.

## Stories

`stories/<Name>.stories.tsx`, titled `Components/<Name>`, `tags: ["autodocs"]`.
A `Playground` with full controls, then one export per spec axis rendering that
axis as a row, so the story set mirrors the spec's variant table.

Icon controls take their options from the font, never a hand-written list:

```tsx
import { iconNames } from "@zebra-design-system/icons/names";
leadingIcon: { control: "select", options: [undefined, ...iconNames] },
```

## TypeScript

`strict`, ESM, React 19. `pnpm run typecheck` is `tsc --noEmit`. No `any` in a
public signature. Use `import type` for type-only imports.
