import { css } from "lit";

/* Spec: specs/notification-item. A card 360 wide that hugs its rows: space/gutter by space/card padding, space/sm
   between the leading visual and the content, radius/md. Unread fills it with surface/card; read drops the fill. The
   border is border/default at stroke/base, a theming hook that resolves to zero. border/default is one of the names the
   legacy set also defines, so it is read through its --zebra- alias. */
export default css`
  :host {
    display: block;
    width: 360px;
    max-width: 100%;
  }

  .item {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    padding: var(--space-gutter) var(--space-card);
    border: var(--stroke-base) solid var(--zebra-border-default);
    border-radius: var(--radius-md);
    background-color: var(--surface-card);
  }

  :host([read]) .item {
    background-color: transparent;
  }

  /* ---- leading visual: a circular control/sm slot ---- */
  .leading {
    box-sizing: border-box;
    flex: none;
    display: grid;
    place-items: center;
    width: var(--control-sm);
    height: var(--control-sm);
    border-radius: var(--radius-pill);
    overflow: hidden;
  }

  .leading[hidden] {
    display: none;
  }

  /* The icon flavour carries a border/default ring; Figma's weight is unbound, so stroke/thin (spec warn). */
  .leading[data-flavor="icon"] {
    border: var(--stroke-thin) solid var(--zebra-border-default);
  }

  ::slotted(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ::slotted(zeta-icon) {
    --icon-size: var(--control-icon-md);
    --icon-color: currentColor;
  }

  /* ---- content ---- */
  .content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    color: var(--foreground-primary);
  }

  .message {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  /* The unread dot: Notification Indicator's small dot, recoloured to interactive/primary (spec warn). */
  .dot {
    box-sizing: border-box;
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: var(--radius-pill);
    background-color: var(--interactive-primary-background-default);
    border: var(--stroke-base) solid var(--border-inverse);
  }

  .title {
    flex: 1;
    min-width: 0;
    font: var(--text-label-large);
    letter-spacing: var(--label-large-letter-spacing);
    overflow-wrap: anywhere;
  }

  /* Read also drops the title to body/medium, as Figma draws it (spec warn). */
  :host([read]) .title {
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
  }

  .meta {
    flex: none;
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    padding: var(--space-3xs) 0;
  }

  .timestamp {
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-tertiary);
    white-space: nowrap;
  }

  /* The urgency indicator: Icon Indicator at small with the important-notification glyph on a destructive fill. */
  .urgency {
    display: grid;
    place-items: center;
    width: var(--control-icon-sm);
    height: var(--control-icon-sm);
    border-radius: var(--radius-pill);
    background-color: var(--interactive-destructive-background-default);
    --icon-size: 12px;
    --icon-color: var(--foreground-on-strong);
  }

  /* Two lines, then an ellipsis. */
  .body {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font: var(--text-body-small);
    letter-spacing: var(--body-small-letter-spacing);
  }

  .attachment {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    min-width: 0;
    --icon-size: var(--control-icon-sm);
    --icon-color: currentColor;
  }

  .filename {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-link);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2xs);
  }

  /* The group bar hangs just below the card, inset space/card each side, 4 high (no token), border/focus. */
  .group {
    position: absolute;
    top: 100%;
    inset-inline: var(--space-card);
    height: 4px;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    background-color: var(--border-focus);
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
