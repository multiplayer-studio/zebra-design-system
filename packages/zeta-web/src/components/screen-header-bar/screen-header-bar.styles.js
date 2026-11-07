import { css } from "lit";

/* Spec: specs/screen-header-bar. A transparent row, space/md top, right and bottom and space/sm leading, space/2xs
   between back button, heading and action. The heading is title/large on foreground/primary, padded space/gutter
   each side, and fills the space between, holding the action hard right. The bar fills its container (spec note: Figma fixes its width). */
export default css`
  :host {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    width: 100%;
    padding: var(--space-md) var(--space-md) var(--space-md) var(--space-sm);
    background-color: transparent;
  }

  .back {
    flex: none;
  }

  .heading {
    flex: 1;
    min-width: 0;
    padding-inline: var(--space-gutter);
    font: var(--text-title-large);
    letter-spacing: var(--title-large-letter-spacing);
    color: var(--foreground-primary);
  }

  .action {
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-2xs);
  }
`;
