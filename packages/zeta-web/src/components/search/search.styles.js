import { css } from "lit";
// TODO: should the form border be a box-shadow or border?
export default css`
  :host {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    --icon-color: var(--interactive-neutral-foreground-default);
  }

  :host([disabled]) {
    zeta-icon {
      --icon-color: var(--interactive-neutral-foreground-disabled);
    }

    .contourable-target {
      pointer-events: none;
      background-color: var(--interactive-neutral-background-disabled);
    }

    input {
      color: var(--interactive-neutral-foreground-disabled);
    }
  }

  :host(:not([disabled])) zeta-icon.right {
    --icon-color: var(--interactive-neutral-foreground-default);
  }

  :host([round="full"][rounded]) .contourable-target {
    border-radius: var(--radius-pill);
  }

  form {
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: inherit;
    height: fit-content;
    border: var(--stroke-thin) solid var(--interactive-neutral-border-default);

    background-color: var(--interactive-neutral-background-default);
    flex-shrink: 0;
    gap: var(--space-xs);
    -webkit-tap-highlight-color: transparent;

    &:has(input:focus) {
      border: var(--stroke-thin) solid var(--border-focus);
    }
  }

  :host([disabled]) form {
    border: var(--stroke-thin) solid var(--interactive-neutral-border-disabled);
  }

  :host([flavor="ghost"]) form {
    border: var(--stroke-base) solid var(--interactive-ghost-border-default);
    background-color: var(--interactive-ghost-background-default);
  }

  :host([flavor="gradient"]) form {
    position: relative;
    border: var(--stroke-thin) solid transparent;
    background-color: var(--interactive-ghost-background-default);
    background-clip: padding-box;
  }

  :host([flavor="gradient"]) form::before {
    content: "";
    position: absolute;
    inset: calc(var(--stroke-thin) * -1);
    padding: var(--stroke-thin);
    background: linear-gradient(96deg, var(--surface-gradient-start) 0%, var(--surface-gradient-end) 87.02%);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  :host([flavor="gradient"][disabled]) form::before {
    background: transparent;
  }

  :host([data-focus-source="keyboard"]) form {
    outline: var(--stroke-thick) solid var(--border-focus);
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    form:hover {
      border: var(--stroke-thin) solid var(--interactive-neutral-border-hover);
    }
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }

  input {
    background-color: inherit;
    border: none;
    outline: none;
    caret-color: var(--foreground-cursor);
    color: var(--foreground-primary);
    flex: 1;
    padding: 0;
    margin: 0;

    &::placeholder {
      font-size: inherit;
      line-height: inherit;
    }
  }

  .divider {
    display: flex;
    width: var(--stroke-thin);
    background-color: var(--border-default);
  }

  /* SIZE */
  :host([size="small"]) {
    .contourable-target {
      padding: var(--space-xs) var(--space-md);
    }

    .divider {
      height: var(--space-xl);
    }

    input {
      font: var(--body-small);
    }
  }

  :host([size="medium"]) {
    .contourable-target {
      padding: var(--space-sm) var(--space-md);
    }

    .divider {
      height: var(--space-xl);
    }

    input {
      font: var(--body-medium);
    }
  }

  :host([size="large"]) {
    .contourable-target {
      padding: var(--space-lg) var(--space-md);
    }

    .divider {
      height: var(--space-xl);
    }

    input {
      font: var(--body-medium);
    }
  }
`;
