import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer. Keyed
 * off the reflected `distribution` attribute. The bar binds only its top
 * border; items, Button and Divider colour themselves.
 *
 * Spec: specs/navigation-bar/navigation-bar.spec.json
 */
export default css`
  :host {
    display: block;
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  .nav {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
    /* Top edge only. Figma draws it outside the bounds with a raw 1px width
       (spec issue); here it is stroke/thin, inside the box. No fill. */
    border-top: var(--stroke-thin) solid var(--border-default);
    background: none;
  }

  /* ---- slot (the item row) ---------------------------------------------- */
  .list {
    display: flex;
    flex: 1 1 auto;
    align-items: stretch;
    min-width: 0;
    gap: var(--space-none);
  }

  /* ---- distribution (Figma: shrinkItems) -------------------------------- */
  /* start: groups hug and pack; the Spacer takes the free space. */
  :host([distribution="start"]) .list {
    justify-content: flex-start;
  }
  :host([distribution="start"]) ::slotted(zds-navigation-bar-spacer) {
    flex: 1 1 auto;
  }

  /* space-between: the row fills and spreads free space between items; a
     Spacer becomes one more evenly-placed separator (a combination Figma
     does not draw — it simply works). */
  :host([distribution="space-between"]) .list {
    justify-content: space-between;
  }

  /* In the bar, the groups' own padding already separates them. */
  ::slotted(zds-navigation-bar-spacer) {
    min-width: var(--space-none);
  }

  /* ---- action slot ------------------------------------------------------ */
  .divider-section {
    box-sizing: border-box;
    display: flex;
    align-self: stretch;
    padding-block: var(--space-sm);
  }

  .action {
    display: flex;
    flex: none;
    align-items: center;
    padding-inline: var(--space-lg) var(--space-none);
    /* Figma's 8px gap is unbound (spec issue): space/sm. */
    gap: var(--space-sm);
  }
  .action[hidden] {
    display: none;
  }
`;
