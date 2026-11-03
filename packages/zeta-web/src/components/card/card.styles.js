import { css } from "lit";

/* Spec: specs/card (Card base). The shell owns the surface, the border, the corners and clipping; every inset comes
   from the slotted parts. The --card-border-* overrides stay for existing Zeta use. */
export default css`
  :host {
    display: block;
  }

  .card {
    --_card-border-line-width: var(--card-border-line-width, var(--stroke-thin));
    --_card-border-line-style: var(--card-border-line-style, solid);
    --_card-border-color: var(--card-border-color, var(--zebra-border-default));
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
    background: var(--surface-card);
    border: var(--_card-border-line-width) var(--_card-border-line-style) var(--_card-border-color);
    border-radius: var(--zebra-radius-none);
  }

  :host([rounded]) .card {
    border-radius: var(--radius-sm);
  }
`;
