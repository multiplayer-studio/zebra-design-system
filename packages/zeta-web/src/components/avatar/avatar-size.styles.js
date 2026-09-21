import { css } from "lit";
export default css`
  :host([size="xxxs"]) {
    --avatar-size: 24px;
    --icon-size: 12px;
    --avatar-status-indicator-size: 8px;
  }

  :host([size="xxs"]) {
    --avatar-size: 32px;
    --icon-size: 16px;
    --avatar-status-indicator-size: 10px;
  }

  :host([size="xs"]) {
    --avatar-size: 36px;
    --icon-size: 18px;
    --avatar-status-indicator-size: 12px;
  }

  :host([size="s"]) {
    --avatar-size: 40px;
    --icon-size: 20px;
    --avatar-status-indicator-size: 12px;
  }

  :host([size="m"]) {
    --avatar-size: var(--default-avatar-size);
    --icon-size: 24px;
  }

  :host([size="l"]) {
    --avatar-size: 64px;
    --icon-size: 32px;
    --border-width: var(--stroke-heavy);
    --avatar-status-indicator-size: 18px;
  }

  :host([size="xl"]) {
    --avatar-size: 80px;
    --icon-size: 40px;
    --border-width: var(--stroke-heavy);
    --avatar-status-indicator-size: 24px;
  }

  :host([size="xxl"]) {
    --avatar-size: 120px;
    --icon-size: 60px;
    --border-width: 6px;
    --avatar-status-indicator-size: 36px;
  }

  :host([size="xxxl"]) {
    --avatar-size: 200px;
    --icon-size: 100px;
    --border-width: 8px;
    --avatar-status-indicator-size: 56px;
  }
`;
