# @zebra-design-system/tokens

## 0.2.0

### Minor Changes

- Companion follows the Companion token set, and the Target extension is removed.
  
  - **Companion** now overrides 41 palette tokens. Info status is purple, gradients
    run violet to blue, status fills use Companion's bold steps, and surfaces and
    neutrals follow Companion's values.
  - **Companion in AAA Light and AAA Dark** is purple; both modes previously fell
    back to Zebra blue.
  - **Target is gone** (removed from Figma on 17 November 2026): `.ext-target` and
    `data-brand="target"` no longer exist in the token CSS. This is a token removal,
    shipped as a 0.x minor.
  - **Dark error colour**: `status/error/default` moves from `negative/60` to
    `negative/50` in Dark, following Figma. White text on it measures 3.11:1.

## 0.1.1

### Patch Changes

- Shipped context refresh: the packaged AGENTS.md component catalog now lists
  Lightbox (and the consumer skills carry the git-install note), per the
  generated-context lockstep rule.
