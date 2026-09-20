import { css } from "lit";

export default css`
  :host {
    display: block;
    border: none;
    background-color: var(--border-default);
  }

  :host([orientation="horizontal"]) {
    width: 100%;
    height: var(--stroke-thin);
  }

  :host([orientation="vertical"]) {
    display: inline-block;
    width: var(--stroke-thin);
    height: 100%;
  }
`;
