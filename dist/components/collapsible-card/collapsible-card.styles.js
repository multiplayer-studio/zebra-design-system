import { css } from "lit";
/**
 * Every value here is a semantic token. The gradient flavour's border uses
 * the double-background technique (padding-box fill, border-box gradient)
 * since a plain `border` can't paint a gradient without losing the
 * border-radius clip.
 *
 * The chevron flip is this element's own addition: Figma's file doesn't
 * actually wire the chevron to State (spec issue — the nested header
 * instance is identical between collapsed and expanded in every variant),
 * so there is nothing to carry over faithfully; this implements the
 * metadata's stated intent instead.
 *
 * Spec: specs/card/card.spec.json
 */
export default css `
  :host {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: var(--surface-card);
    border-radius: var(--radius-none);
    overflow: hidden;
  }

  :host([hidden]) {
    display: none;
  }

  :host([shape="rounded"]) {
    border-radius: var(--radius-sm);
  }

  /* Gradient adds a 2px outline drawn on the frame itself, which is why it
     measures 4px taller/wider than the default flavour at the same content
     (spec issue's own framing, not something to normalise away). */
  :host([flavor="gradient"]) {
    border: var(--stroke-thick) solid transparent;
    background:
      linear-gradient(var(--surface-card), var(--surface-card)) padding-box,
      linear-gradient(135deg, var(--foreground-gradient-start), var(--foreground-gradient-end)) border-box;
  }

  .header {
    display: flex;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
    gap: var(--space-sm);
    padding: var(--space-lg) var(--space-xl);
    background: transparent;
    border: none;
    font: inherit;
    /* Set once here so the heading text and the chevron (currentColor, even
       across the zds-icon shadow boundary) both inherit it, rather than each
       repeating the same token. */
    color: var(--foreground-primary);
    text-align: left;
    cursor: pointer;
  }

  /* chevron-right, rotated: pointing right when collapsed, down when
     expanded. Not expand-more/expand-less — that glyph's ink sits high in
     its own box with dead space below, which reads as top-aligned no matter
     how the box itself is centered against the text. */
  .chevron {
    flex: none;
    transition: transform 160ms ease;
  }

  .chevron[expanded] {
    transform: rotate(90deg);
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);
    min-width: 0;
  }

  .heading {
    font-family: var(--title-large-font-family), system-ui, sans-serif;
    font-size: var(--title-large-font-size);
    font-weight: var(--title-large-font-weight);
    line-height: var(--title-large-line-height);
    letter-spacing: var(--title-large-letter-spacing);
    /* Inherits color from .header. */
  }

  .required {
    color: var(--foreground-error);
  }

  .description {
    font-family: var(--title-medium-font-family), system-ui, sans-serif;
    font-size: var(--title-medium-font-size);
    font-weight: var(--title-medium-font-weight);
    line-height: var(--title-medium-line-height);
    letter-spacing: var(--title-medium-letter-spacing);
    color: var(--foreground-secondary);
  }

  .body {
    padding: var(--space-none) var(--space-xl) var(--space-xl);
    box-sizing: border-box;
    /* This wrapper supplies the left/right/bottom inset (matching the
       header's own space-xl inset) — zds-card-body/zds-card-footer assume
       Card's own zero-padding shell and bring their own horizontal padding
       for that context, which would double up here, so it's zeroed via the
       custom properties they read (crosses their shadow boundary by
       inheritance). The wrapper has no top inset of its own, so
       zds-card-body keeps its own top+bottom padding and zds-card-footer
       keeps its own top padding (only its bottom is zeroed, since the
       wrapper already supplies that). */
    --zds-card-body-padding-inline: 0;
    --zds-card-footer-padding-inline: 0;
    --zds-card-footer-padding-block-end: 0;
  }
`;
