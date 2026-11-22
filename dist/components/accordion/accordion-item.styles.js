import { css } from "lit";
/**
 * One row. Every value is a semantic token from the generated CSS layer.
 * Kept rule-for-rule identical to packages/react-baseui accordion.css (same
 * class names) so the two packages cannot drift; the one addition is the
 * leading control, which React gets from Icon Button (see the element's
 * JSDoc for why it is drawn here).
 *
 * Spec: specs/accordion/accordion.spec.json (subcomponents › Accordion Item, Accordion Header)
 */
export default css `
  :host {
    display: block;
    width: 100%;
  }
  :host([hidden]) {
    display: none;
  }

  /* ---- 2. item (row) ---------------------------------------------------- */
  .zds-accordion__item {
    display: flex;
    flex-direction: column;
    gap: var(--space-none);
    width: 100%;
  }
  /* The last row never shows its divider (spec: "in code the last element
     will always have the divider turned off"). */
  :host(:last-child) .zds-accordion__divider {
    display: none;
  }

  /* ---- 3. header -------------------------------------------------------- */
  .zds-accordion__header {
    --zds-accordion-header-bg: var(--interactive-ghost-background-default);
    --zds-accordion-fg: var(--foreground-primary);

    display: flex;
    align-items: center;
    margin: 0;
    padding: var(--space-none);
    border: none;
    border-radius: var(--radius-none);
    background: var(--zds-accordion-header-bg);
    color: var(--zds-accordion-fg);
    /* A heading element: normalise the UA's bold/size so only title/medium
       speaks (the font-weight token currently resolves to a word, a
       pipeline bug — both packages inherit the same weight). */
    font: inherit;
  }

  /* The plain row: the whole header is one button. */
  .zds-accordion__trigger,
  .zds-accordion__select {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    min-width: 0;
    margin: 0;
    border: none;
    border-radius: var(--radius-none);
    background: none;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }
  .zds-accordion__trigger {
    gap: var(--space-sm);
    box-sizing: border-box;
    /* 56 tall, like the selectable header (space/sm + control/md + space/sm).
       With title/medium the plain header would hug to 52; Figma pins it to an
       untokenised 56 inside the row (spec warn "Plain header height is now a
       pinned, untokenised 56"), so the two row kinds stay level. */
    min-height: calc(var(--control-md) + 2 * var(--space-sm));
    padding: var(--space-lg);
  }

  /* The selectable row: leading control, then the selection target. */
  .zds-accordion__header[data-selectable] {
    gap: var(--space-2xs);
    padding: var(--space-sm);
  }
  .zds-accordion__control {
    flex: none;
  }
  .zds-accordion__select {
    gap: var(--space-2xs);
    align-self: stretch;
    padding: var(--space-none);
  }

  /* Heading column (gap space/3xs, fill) holding the title. */
  .zds-accordion__heading {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: var(--space-3xs);
    min-width: 0;
  }
  .zds-accordion__title {
    /* title/medium (Figma moved it from title/large on 2026-10-21). Hugs and
       wraps: no truncation is specified (spec note). */
    overflow-wrap: anywhere;
    font-family: var(--title-medium-font-family), system-ui, sans-serif;
    font-size: var(--title-medium-font-size);
    font-weight: var(--title-medium-font-weight);
    line-height: var(--title-medium-line-height);
    letter-spacing: var(--title-medium-letter-spacing);
  }

  /* Caret and leading-control glyph: one glyph, rotated with the open state
     (owner decision, in place of Figma's glyph swaps), on the animations/spring
     token, the motion Switch uses (owner decision; Figma models no motion). */
  .zds-accordion__caret,
  .zds-accordion__control-icon {
    flex: none;
    transition: transform var(--animations-spring);
  }
  .zds-accordion__item[data-open] .zds-accordion__caret {
    transform: rotate(180deg);
  }
  .zds-accordion__item[data-open] .zds-accordion__control-icon {
    transform: rotate(90deg);
  }
  .zds-accordion__mark {
    flex: none;
  }

  /* ---- leading control: Icon Button, subtle / medium -------------------- */
  /* Button's own tokens for that flavour and size, restated because the
     control must be a button in this shadow root (see the element). */
  .zds-accordion__control {
    --zds-button-bg: var(--interactive-ghost-background-default);
    --zds-button-border: var(--interactive-neutral-border-default);
    --zds-button-fg: var(--interactive-neutral-foreground-default);

    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--control-md);
    height: var(--control-md);
    margin: 0;
    padding: var(--space-2xs);
    border-style: solid;
    border-width: var(--stroke-base);
    border-radius: var(--radius-none);
    background: var(--zds-button-bg);
    border-color: var(--zds-button-border);
    color: var(--zds-button-fg);
    font: inherit;
    cursor: pointer;
    transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
  }
  .zds-accordion__header[data-rounded] .zds-accordion__control {
    border-radius: var(--radius-element-sm);
  }
  .zds-accordion__control:hover:not([data-disabled]) {
    --zds-button-bg: var(--interactive-ghost-background-hover);
  }
  .zds-accordion__control:active:not([data-disabled]) {
    --zds-button-bg: var(--interactive-ghost-background-pressed);
  }
  .zds-accordion__control:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: 0;
    border-color: transparent;
  }
  .zds-accordion__control[data-disabled] {
    cursor: not-allowed;
    --zds-button-bg: var(--interactive-ghost-background-disabled);
    --zds-button-border: var(--interactive-neutral-border-disabled);
    --zds-button-fg: var(--interactive-neutral-foreground-disabled);
  }

  /* ---- header state ----------------------------------------------------- */
  /* hover: only the background answers (spec). */
  .zds-accordion__header:hover:not([data-disabled]) {
    --zds-accordion-header-bg: var(--interactive-ghost-background-hover);
  }
  /* pressed (not designed — spec warn "Only hover is modelled"): the ghost
     family's own pressed step, while the row's target is held. */
  .zds-accordion__header:not([data-disabled]):has(.zds-accordion__trigger:active, .zds-accordion__select:active) {
    --zds-accordion-header-bg: var(--interactive-ghost-background-pressed);
  }
  /* focus (not designed — same warn): the library's ring, stroke/thick
     border/focus as on Button, drawn inset so the container's clip and the
     neighbouring rows never cut it. The leading control keeps Icon Button's. */
  .zds-accordion__trigger:focus-visible,
  .zds-accordion__select:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }
  .zds-accordion__select:focus-visible {
    /* the target sits inside the header's space/sm padding; ring its edge */
    outline-offset: 0;
  }
  /* disabled (not designed — same warn): the ghost disabled background and
     the neutral disabled foreground, as on Chip and Segmented Control. */
  .zds-accordion__header[data-disabled] {
    --zds-accordion-header-bg: var(--interactive-ghost-background-disabled);
    --zds-accordion-fg: var(--interactive-neutral-foreground-disabled);
  }
  .zds-accordion__trigger[data-disabled],
  .zds-accordion__select[data-disabled] {
    cursor: not-allowed;
  }

  /* ---- 4. content panel ------------------------------------------------- */
  /* Height animates with the same spring as the caret, from the measured
     --zds-accordion-panel-height the element sets (as Base UI does for the
     React package; none is authored in Figma, the owner asked for it). */
  .zds-accordion__panel {
    box-sizing: border-box;
    width: 100%;
    height: var(--zds-accordion-panel-height, auto);
    overflow: hidden;
    transition: height var(--animations-spring);
  }
  .zds-accordion__panel[hidden] {
    display: none;
  }
  .zds-accordion__panel[data-starting-style],
  .zds-accordion__panel[data-ending-style] {
    height: 0;
  }
  /* Fills the row's width (spec warn "Content Slot hugs width"). */
  .zds-accordion__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    box-sizing: border-box;
    width: 100%;
    padding: var(--space-lg);
    /* Content typography is not specced: body/medium as a default the
       content's own styles override. */
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  /* ---- 5. divider ------------------------------------------------------- */
  .zds-accordion__divider {
    flex: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .zds-accordion__caret,
    .zds-accordion__control-icon,
    .zds-accordion__panel {
      transition: none;
    }
  }
`;
