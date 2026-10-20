import { css } from "lit";

/**
 * Every colour and dimension here is a semantic token from the generated CSS
 * layer. Because custom properties inherit through shadow roots, an
 * `.ext-*` / `.mode-*` class on any ancestor re-themes this component with no
 * JavaScript and no re-render.
 *
 * State classes on .field (`state-enabled` … `state-disabled`) are set by the
 * element from the native input; hover is plain CSS.
 *
 * Spec: specs/search/search.spec.json
 */
export default css`
  :host {
    /* The spec's 280 is the sample width (spec note); the field fills its
       container. */
    display: block;
    min-inline-size: calc(8 * var(--control-sm));
  }

  :host([hidden]) {
    display: none;
  }

  .field {
    /* --- geometry: size axis ------------------------------------------ */
    display: flex;
    align-items: center;
    box-sizing: border-box;
    gap: var(--space-xs);
    /* space/sm block padding at every size (spec warn: two medium/rounded
       variants bind space/2xs; space/sm is the stated intent). */
    padding: var(--space-sm) var(--space-md);
    block-size: var(--control-lg);
    border-radius: var(--zds-search-radius);

    /* --- colour: flavour x state axis --------------------------------- */
    background: var(--zds-search-bg);
    border: var(--zds-search-border-width) solid var(--zds-search-border);
    outline: var(--zds-search-outline, none);
    outline-offset: 0;
    color: var(--zds-search-fg);
    cursor: text;
  }

  .leading {
    flex: none;
    color: var(--zds-search-fg);
  }

  input {
    flex: 1 1 auto;
    min-inline-size: 0;
    margin: 0;
    /* The text carries space/xs of its own on both sides: next to an icon it
       adds to the field's space/xs gap; with no icon it adds to the field's
       space/md padding (spec designerClarifications, "text padding"). */
    padding-block: 0;
    padding-inline: var(--space-xs);
    box-sizing: border-box;
    border: 0;
    outline: none;
    background: transparent;
    color: var(--zds-search-text);
    caret-color: var(--foreground-cursor);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
    -webkit-appearance: none;
    appearance: none;
  }
  input::placeholder {
    /* Placeholder contrast is below 4.5:1 in Light (spec warn). Built
       faithfully; never let the placeholder carry meaning. */
    color: var(--foreground-disabled);
    opacity: 1;
  }
  /* The native clear button: the spec's own clear control replaces it. */
  input::-webkit-search-cancel-button,
  input::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
  }

  /* 3. Trailing area: one control, or (while typing) clear + divider +
     control. space/sm between parts; the divider is the shared Divider. */
  .trailing {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    /* The divider's measured height (24) has no token: the glyph box plus
       space/2xs above and below. */
    block-size: calc(var(--control-icon-md) + 2 * var(--space-2xs));
  }
  .divider {
    align-self: stretch;
  }

  /* Each control is pressable past its glyph: the metadata asks for roughly
     a 36 square target (the glyph plus about space/sm all round), which the
     space/sm either side of the divider leaves room for without two targets
     meeting. Drawn as an invisible ::before so the layout keeps the glyph's
     size (spec warn "the control targets aren't modelled"). */
  .control {
    position: relative;
    display: inline-flex;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--zds-search-fg);
    cursor: pointer;
    border-radius: var(--radius-pill);
  }
  .control::before {
    content: "";
    position: absolute;
    inset: calc(-1 * var(--space-sm));
    border-radius: inherit;
  }
  .control:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--space-2xs);
  }
  .control:disabled {
    cursor: not-allowed;
  }

  /* ---- size --------------------------------------------------------- */
  :host([size="medium"]) .field {
    block-size: var(--control-md);
  }
  :host([size="small"]) .field {
    block-size: var(--control-sm);
  }
  :host([size="small"]) input {
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }

  /* ---- shape -------------------------------------------------------- */
  :host {
    --zds-search-radius: var(--radius-none);
  }
  :host([shape="rounded"]) {
    /* radius/sm everywhere (spec warn: three rounded/typing/ghost variants
       bind radius/element-sm). */
    --zds-search-radius: var(--radius-sm);
  }
  :host([shape="full"]) {
    --zds-search-radius: var(--radius-pill);
  }

  /* ---- flavour: default --------------------------------------------- */
  :host {
    --zds-search-bg: var(--interactive-neutral-background-default);
    --zds-search-border: var(--interactive-neutral-border-default);
    --zds-search-border-width: var(--stroke-thin);
    /* Icon colour: every icon and control (magnifier, trailing control,
       clear) takes the value's colour, foreground/primary, and
       foreground/disabled when disabled — the field-family rule. Figma has
       moved the resting icons there; its typing group and disabled icons
       still bind interactive/neutral/foreground/* (spec warn "Icon colour is
       half-migrated"). Delivered as the glyph's currentColor. */
    --zds-search-fg: var(--foreground-primary);
    --zds-search-text: var(--foreground-primary);
  }
  /* Hover answers only at rest: once the field is focused, selected or
     typing, their border wins even with the pointer over it. */
  .state-enabled:hover,
  .state-filled:hover {
    --zds-search-border: var(--interactive-neutral-border-hover);
  }
  .state-selected,
  .state-typing {
    --zds-search-border: var(--border-focus);
  }
  /* Focus: the heaviest border, stroke/thick drawn OUTSIDE the field in
     place of the inside border (spec note). */
  .state-focus {
    --zds-search-border: transparent;
    --zds-search-outline: var(--stroke-thick) solid var(--border-focus);
  }

  /* ---- flavour: gradient -------------------------------------------- */
  /* At rest (enabled, filled) the border is a gradient from
     foreground/gradient/start to /end, running left to right (Figma's
     handles are tilted by a few degrees). It is drawn as a second background
     clipped to the border box under the field's surface; hover, selected
     and typing use solid border/gradient tokens; focus uses border/focus
     like every flavour (spec warn "the gradient border is more varied than
     the metadata says"). */
  :host([flavour="gradient"]) .state-enabled,
  :host([flavour="gradient"]) .state-filled {
    --zds-search-border: transparent;
    background:
      linear-gradient(var(--zds-search-bg), var(--zds-search-bg)) padding-box,
      linear-gradient(to right, var(--foreground-gradient-start), var(--foreground-gradient-end)) border-box;
  }
  :host([flavour="gradient"]) .state-enabled:hover,
  :host([flavour="gradient"]) .state-filled:hover {
    --zds-search-border: var(--border-gradient-end);
    background: var(--zds-search-bg);
  }
  :host([flavour="gradient"]) .state-selected,
  :host([flavour="gradient"]) .state-typing {
    --zds-search-border: var(--border-gradient-start);
  }

  /* ---- flavour: ghost ----------------------------------------------- */
  /* No visible border in any state but focus (stroke/base), and a
     transparent surface. Figma paints interactive/ghost/background/default
     at opacity 0, so the token never shows (spec warn "ghost's surface is
     its token at paint opacity 0"); transparent is what renders. Hover,
     selected and typing therefore show no visible change on ghost (spec
     warn). */
  :host([flavour="ghost"]) {
    --zds-search-bg: transparent;
    --zds-search-border: var(--interactive-ghost-border-default);
    --zds-search-border-width: var(--stroke-base);
  }
  :host([flavour="ghost"][hide-focus-outline]) .state-focus {
    --zds-search-outline: none;
  }

  /* ---- state: disabled ---------------------------------------------- */
  :host([disabled]) .field {
    --zds-search-bg: var(--interactive-neutral-background-disabled);
    --zds-search-border: var(--interactive-neutral-border-disabled);
    --zds-search-fg: var(--foreground-disabled);
    --zds-search-text: var(--foreground-disabled);
    cursor: not-allowed;
  }
  :host([flavour="ghost"][disabled]) .field {
    --zds-search-bg: transparent;
    --zds-search-border: var(--interactive-ghost-border-disabled);
  }
  :host([disabled]) input {
    cursor: not-allowed;
  }

  /* No transitions: the spec defines no motion ("No transition is
     defined"). */
`;
