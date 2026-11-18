# LIBRARY.md

How this project builds and maintains its component library from the Zebra Design System. The design-system docs in this folder say **what** each component is. This file says **how** this project turns those docs into code.

Your engineers own this file and fill it in once, before the first component is built. The agent reads it before every component change (`AGENTS.md`, Building a component) and keeps the Components table up to date. It never changes the conventions on its own.

**To fill it in:** ask your agent to run the `design-system-init` skill (`/design-system-init`). It scans the repo, proposes answers section by section for you to confirm, then wires the tokens and builds a first component. To fill it in by hand instead, replace every `<…>` placeholder, delete any guidance you don't need, and delete the React example at the end once your own sections are complete.

**More than one platform** (e.g. React web and a Flutter app in one repo): repeat sections 1–5 under a `### <Platform>` heading for each. Sections 6–9 are shared.

---

## 1. Technology

- **Platform and language:** `<e.g. React 19 + TypeScript, SwiftUI, Flutter, Jetpack Compose, plain CSS>`
- **Styling approach:** `<e.g. CSS Modules, styled-components, ThemeData, Compose theme>`
- **Behaviour or accessibility primitives (if any):** `<e.g. a headless UI library, or "none, built by hand">`

## 2. Library location

- **Folder:** `<e.g. src/components/zebra/>`. Every documented component lives here and nowhere else.
- **One component looks like:**

  ```
  <folder layout for one component, e.g. Button/Button.tsx, Button.module.css, index.ts>
  ```

- **How screens import it:** `<e.g. import { Button } from '@/components/zebra'>`

## 3. Tokens

- **Generated token file:** `<path, e.g. design-system/tokens.css>`
- **Regenerate with:** `<command>`. Run it after every change to `DESIGN.md` or a component's `tokens:` block.
- **Where it's loaded:** `<e.g. imported once in the app entry point>`
- **Name transform:** `<the one mechanical rule from token key to code name>`

  | Token key | In code |
  |---|---|
  | `button-primary-container-background-hover` | `<e.g. var(--button-primary-container-background-hover)>` |

- **Modes:** `<how light, dark, AAA and AAA dark, each with and without Companion, are switched, e.g. data-theme / data-contrast / data-brand attributes, a ThemeMode provider>`

## 4. Component API

How a doc's Properties table becomes the component's API.

- **Property names:** `<e.g. camelCase of the doc name: "Leading icon" → leadingIcon>`
- **Options:** `<e.g. a string union of the doc's options, in lower case>`
- **Defaults:** same as the doc's Default column.
- **Icons:** `<how an icon name from icons.json is passed, e.g. icon="add">`
- **Pass-through:** `<what native props or attributes are forwarded, and what is blocked, e.g. className and style are not accepted>`

## 5. Conventions

Anything your team wants every component to follow. Delete what you don't use.

- **States:** `<how hover, pressed, focused, disabled, selected and error are implemented>`
- **Composites:** `<how a component renders its children, e.g. imports them from the library index>`
- **Tests:** `<what each component must have, e.g. one test per documented state, axe check>`
- **Previews:** `<e.g. a Storybook story per variant and size, in every mode>`
- **Review:** `<who approves a library change, and what they check>`

## 6. Workflow

How a change to the library happens in this project. `AGENTS.md` (Changing the design system) sets the order: docs, then code, then `CHANGES.md`. Add your project's steps around it.

1. `<e.g. branch name convention>`
2. `<e.g. run the token command, tests and previews before opening a PR>`
3. `<e.g. PR title prefix, reviewers>`

## 7. Open questions

Questions raised by draft components (`status: draft`, † in `DESIGN.md` §8) or by gaps in the docs, until someone answers them.

| Component | Question | Asked | Answer |
|---|---|---|---|

## 8. Existing UI

Components the project had before the design system, and what happens to each. Migration is done one component at a time, like any other build. Delete this section if there were none.

| Existing component | Path | Maps to doc | Plan |
|---|---|---|---|

Plan is `replace` (the library component takes over and screens move to it), `extend doc` (it needs something the doc lacks: `AGENTS.md`, When something is missing) or `keep` (stays outside the library, with the reason).

## 9. Components

One row per component built. The agent adds the row in the same change that builds the component.

| Component | Platform | Doc | Code | Status |
|---|---|---|---|---|

Status is `stable`, or `draft` while it has placeholders from section 7.

---

## Example: React

A complete version of this file for a React project. Delete this section once yours is filled in.

### 1. Technology

- **Platform and language:** React 19 + TypeScript, built with Vite.
- **Styling approach:** CSS Modules. One `.module.css` per component.
- **Behaviour or accessibility primitives:** Base UI (`@base-ui/react`) for focus management, keyboard handling and ARIA on interactive components (Switch, Checkbox, Tabs, Dialog, Menu…). Base UI ships unstyled; all styling is ours.

### 2. Library location

- **Folder:** `src/components/zebra/`
- **One component looks like:**

  ```
  src/components/zebra/
    Button/
      Button.tsx            the component; its props are the doc's Properties table
      Button.module.css     styles, component tokens only
      Button.test.tsx       one test per documented state
      Button.stories.tsx    every variant and size, in light, dark, AAA and AAA dark
      index.ts              export { Button } from './Button'
    index.ts                re-exports every component
  ```

- **How screens import it:** `import { Button } from '@/components/zebra'`. Never from a component's own folder.

### 3. Tokens

- **Generated token file:** `design-system/tokens.css`
- **Regenerate with:** `python3 design-system/scripts/tokens-css.py`
- **Where it's loaded:** `import '../design-system/tokens.css'` once, in `src/main.tsx`.
- **Name transform:** token key → CSS custom property of the same name.

  | Token key | In code |
  |---|---|
  | `button-primary-container-background-hover` | `var(--button-primary-container-background-hover)` |

- **Modes:** `data-theme="dark"` (on `<html>` or any container), `data-contrast="aaa"` (on `<html>`) and `data-brand="companion"` (on `<html>` or any container), alone or together, as defined in `tokens.css`. A `ThemeProvider` in `src/app/` sets them; components never read the mode.

### 4. Component API

- **Property names:** camelCase of the doc's property name: `Flavour` → `flavour`, `Leading icon` → `leadingIcon`.
- **Options:** a TypeScript string union of the doc's options, exactly as written: `flavour?: 'primary' | 'positive' | 'negative' | 'contrast' | 'gradient' | 'outline' | 'outline-subtle' | 'outline-contrast' | 'text' | 'text-gradient' | 'subtle'`.
- **Defaults:** set in the destructuring, matching the doc's Default column.
- **On/off properties:** booleans (`disabled?: boolean`).
- **Text properties:** `children` for the main label, named props for anything else.
- **Icons:** an icon name from `design-system/icons.json` as a string (`leadingIcon="add"`), rendered through the library's `Icon`.
- **Pass-through:** native props of the root element (`onClick`, `type`, `aria-*`) are forwarded. `className` and `style` are not accepted: screens never restyle a component.

For example, `atoms/button.md`:

```tsx
// src/components/zebra/Button/Button.tsx
import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';
import styles from './Button.module.css';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> & {
  flavour?: 'primary' | 'positive' | 'negative' | 'contrast' | 'gradient' | 'outline' | 'outline-subtle' | 'outline-contrast' | 'text' | 'text-gradient' | 'subtle';
  shape?: 'sharp' | 'rounded' | 'full';
  size?: 'small' | 'medium' | 'large';
  leadingIcon?: IconName;
  trailingIcon?: IconName;
};

export function Button({
  flavour = 'primary', shape = 'rounded', size = 'medium',
  leadingIcon, trailingIcon, children, type = 'button', ...rest
}: Props) {
  const iconVariant = shape === 'sharp' ? 'sharp' : 'rounded'; // atoms/icon.md: sharp set for sharp shapes
  return (
    <button
      {...rest}
      type={type}
      className={[styles.button, styles[flavour], styles[shape], styles[size]].join(' ')}
    >
      {leadingIcon && <Icon name={leadingIcon} variant={iconVariant} />}
      <span className={styles.label}>{children}</span>
      {trailingIcon && <Icon name={trailingIcon} variant={iconVariant} />}
    </button>
  );
}
```

```css
/* src/components/zebra/Button/Button.module.css: component tokens only */
.primary { background: var(--button-primary-container-background-enabled); color: var(--button-primary-label-foreground); }
.primary:hover { background: var(--button-primary-container-background-hover); }
.primary:active { background: var(--button-primary-container-background-pressed); }
.button:focus-visible { outline: var(--button-focus-ring-width) solid var(--button-focus-ring-color); }
.primary:disabled { background: var(--button-primary-container-background-disabled); color: var(--button-primary-label-foreground-disabled); }
.rounded { border-radius: var(--button-container-radius-rounded); }
.small { height: var(--button-container-height-small); padding: var(--button-container-padding-y) var(--button-container-padding-x-small); }
.small .label { padding: 0 var(--button-label-padding-x-small); font: var(--button-label-font-small); }
.small svg { width: var(--button-icon-size-small); height: var(--button-icon-size-small); }
/* …one block per flavour, shape and size in the doc */
```

### 5. Conventions

- **States:** CSS pseudo-classes for hover (inside `@media (hover: hover)`), pressed (`:active`) and focused (`:focus-visible`); the native `disabled` attribute for disabled; `aria-selected`, `aria-checked` and `aria-invalid` selectors for selected, checked and error. Never a state held in React state just for styling.
- **Composites:** render children from `@/components/zebra` with the variant and size the doc names. A composite's CSS module only styles its own parts.
- **Tests:** Vitest + Testing Library. One test per documented state, plus an `axe` check on the default render.
- **Previews:** one Storybook story per component, with controls for every property and a toolbar switch for light, dark, AAA and AAA dark.
- **Review:** any PR touching `src/components/zebra/` or `design-system/` needs a review from the front-end lead, who checks it against the doc's tables.

### 6. Workflow

1. Branch `zebra/<component>-<change>`, e.g. `zebra/button-add-loading-state`.
2. Docs first, then `python3 design-system/scripts/tokens-css.py`, then code, then `CHANGES.md` (see `AGENTS.md`).
3. Run `npm test` and `npm run storybook` and check the component in every theme mode.
4. PR title `zebra: <summary>`, with the `CHANGES.md` entry pasted in the description.

### 7. Open questions

| Component | Question | Asked | Answer |
|---|---|---|---|
| Date Picker † | Day-cell size and spacing are placeholders. What are the measurements? | 2026-11-10 | |

### 8. Existing UI

| Existing component | Path | Maps to doc | Plan |
|---|---|---|---|
| `AppButton` | `src/ui/AppButton.tsx` | `design-system/atoms/button.md` | replace |
| `StatusPill` | `src/ui/StatusPill.tsx` | `design-system/atoms/status-label.md` | extend doc: needs a `pending` colour |

### 9. Components

| Component | Platform | Doc | Code | Status |
|---|---|---|---|---|
| Icon | React | `design-system/atoms/icon.md` | `src/components/zebra/Icon/` | stable |
| Button | React | `design-system/atoms/button.md` | `src/components/zebra/Button/` | stable |
| Input | React | `design-system/molecules/input.md` | `src/components/zebra/Input/` | stable |
| Date Picker | React | `design-system/organisms/date-picker.md` | `src/components/zebra/DatePicker/` | draft |
