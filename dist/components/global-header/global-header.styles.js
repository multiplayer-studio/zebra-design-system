import { css } from "lit";
/* Spec: specs/global-header. Frozen in dark through data-theme, the override included. The six item limit stays as
   Zeta behaviour. */
export default css `
  :host * {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--foreground-primary);
  }

  #header-main {
    justify-content: space-between;
    gap: var(--space-gutter);
    padding: var(--space-sm);
    background-color: var(--surface-section);
    border: var(--stroke-base) solid var(--zebra-border-default);
  }

  /* Only a floating bar rounds its own corners (rounded and not anchored). An anchored bar stays square, over the
     contour mixin's radius on the first child. */
  #header-main:not([data-floating]) {
    border-radius: var(--radius-none);
  }

  #header-main[data-floating] {
    border-radius: var(--radius-element-sm);
    /* The spec's Shadow/medium effect style: the medium and small shadows on shadow/soft. */
    box-shadow:
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }

  /* The left side keeps its content, so search gives way first and the two never overlap. */
  #header-left {
    flex: none;
    gap: var(--space-gutter);
  }

  #header-right {
    flex: 1 1 auto;
    justify-content: flex-end;
    gap: var(--space-sm);
  }

  /* Fills what's spare up to 280 (raw in Figma, spec issue), down to the width that still shows its icon. */
  #search-bar {
    /* The input's intrinsic width would otherwise hold the band open. */
    contain: inline-size;
    flex: 1 1 280px;
    max-width: 280px;
    min-width: calc(2 * var(--control-md));
  }

  #action-items,
  #account-group {
    flex: none;
  }

  /* Regions with nothing slotted take no room, so the gaps around them do not double up. */
  #menu-items:not(.has-items),
  #action-items:not(.has-items) {
    display: none;
  }

  /* space/gutter around the account group, which sits in the space/sm row. */
  #account-group,
  #header-right zeta-divider {
    margin-left: calc(var(--space-gutter) - var(--space-sm));
  }

  #account-group {
    gap: var(--space-gutter);
  }

  #platform-name {
    font: var(--text-title-medium);
    letter-spacing: var(--title-medium-letter-spacing);
    color: var(--foreground-primary);
    white-space: nowrap;
  }

  /*User info container - Holds name, avatar and icon*/
  #name {
    color: var(--foreground-primary);
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
    background-color: inherit;
  }
  #user-info-icon {
    --icon-size: var(--control-icon-sm);
    background-color: inherit;
  }

  /* :host * makes each slot its own flex box, so the gap has to reach it too. */
  #action-items,
  #action-items slot,
  #menu-items,
  #menu-items slot {
    gap: var(--space-3xs);
  }

  /* The account control: the neutral interactive grounds of _User Profile. */
  #user-info-button::part(button) {
    gap: var(--space-2xs);
    height: var(--control-md);
    padding: var(--space-2xs) var(--space-sm);
    background-color: var(--interactive-neutral-background-default);
  }
  #user-info-button:focus-within::part(button) {
    background-color: var(--interactive-neutral-background-focused);
  }
  #user-info-button:hover::part(button) {
    background-color: var(--interactive-neutral-background-hover);
  }
  #user-info-button:active::part(button) {
    background-color: var(--interactive-neutral-background-pressed);
  }

  /*zeta-icon-button and zeta-button styling*/
  zeta-icon-button::part(icon) {
    --icon-color: var(--foreground-primary);
  }
  ::slotted([slot="action-items"]) {
    --icon-color: var(--foreground-primary);
  }
  zeta-icon-button::part(button),
  zeta-button::part(button) {
    color: var(--foreground-primary);
  }

  /*Spacing between elements in header-info*/
  #header-info {
    gap: var(--space-gutter);
  }

  /*Style avatar icon*/
  #avatar {
    margin-inline: var(--space-2xs);
    /* The avatar's white initials fall to 2:1 on the dark mode swatch. */
    --avatar-initials-color: var(--foreground-inverse);
  }

  [part="logo"] svg {
    background-color: transparent;
    fill: currentColor;
    width: 80px;
  }

  [part="logo"] {
    color: var(--foreground-primary);
    background-color: transparent;
    width: 80px;
    height: 32px;
  }

  [part="logo"][hidden] {
    display: none;
  }

  /*Hide components at different screen sizes*/
  /*Use nth child for slotted elements and display none for others*/
  @media (max-width: 1440px) {
    #header-right.six-menu-action-items #search-bar {
      display: none;
    }
  }
`;
//# sourceMappingURL=global-header.styles.js.map