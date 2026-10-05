import { css } from "lit";
export default css`
  :host * {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--foreground-primary);
  }

  #header-main {
    justify-content: space-between;
    padding: var(--space-sm);
    background-color: var(--surface-section);
  }

  #header-right {
    gap: var(--space-gutter);
  }

  #platform-name {
    font: var(--title-medium);
    color: var(--foreground-primary);
  }

  /*User info container - Holds name, avatar and icon*/
  #name {
    color: var(--foreground-primary);
    font: var(--label-small);
    background-color: inherit;
  }
  #user-info-icon {
    background-color: inherit;
  }

  /*Optional nav items*/
  ::slotted([slot="menu-items"]) {
    padding-left: var(--space-sm);
  }
  ::slotted([slot="menu-items"]) zeta-button::part(button) {
    font: var(--label-medium);
  }
  ::slotted([slot="menu-items"]) zeta-icon {
    --icon-color: var(--foreground-secondary);
  }
  ::slotted([slot="action-items"]) {
    padding-right: var(--space-sm);
  }
  #menu-items.has-items {
    border-left: var(--stroke-thin) solid var(--border-default);
  }
  #action-items.has-items {
    border-right: var(--stroke-thin) solid var(--border-default);
  }

  #header-info zeta-icon-button {
    margin-right: 10px;
  }

  /*zeta-icon-button and zeta-button styling*/
  zeta-icon-button::part(icon) {
    --icon-color: var(--foreground-primary);
    --icon-size: var(--space-xl);
    width: var(--space-xl);
    height: var(--space-xl);
  }
  ::slotted([slot="action-items"]) {
    --icon-color: var(--foreground-primary);
  }
  zeta-icon-button::part(button),
  zeta-button::part(button) {
    color: var(--foreground-secondary);
  }

  /*Spacing between elements in header-info*/
  #logo {
    margin: 0 var(--space-lg) 0 var(--space-sm);
  }
  #header-info {
    margin-right: var(--space-gutter);
  }

  /*Style avatar icon*/
  #avatar {
    --avatar-color: var(--foreground-info);
    --avatar-initials-color: var(--surface-page);
  }

  [part="logo"] svg {
    background-color: transparent;
    fill: var(--surface-inverse);
    width: 76px;
  }

  /* Invert logo in dark mode*/
  [part="logo"] {
    fill: var(--surface-inverse);
    background-color: transparent;
    width: 80px;
    height: 32px;
    margin-inline: var(--space-lg);
  }

  /*Hide components at different screen sizes*/
  /*Use nth child for slotted elements and display none for others*/
  @media (max-width: 1440px) {
    #header-right.six-menu-action-items #search-bar {
      display: none;
    }
    #header-main {
      gap: calc(var(--space-2xl) + var(--space-sm));
    }
  }
`;
