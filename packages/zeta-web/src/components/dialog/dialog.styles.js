import { css } from "lit";
export default css`
  :host {
    --_dialog-width: var(--dialog-width, 480px);
    --_dialog-max-height: var(--dialog-max-height, 80vh);
    --_dialog-title-font-size: var(--dialog-title-font-size, var(--title-large-font-size));
    --_dialog-title-line-height: var(--dialog-title-line-height, var(--title-large-line-height));
    /* "rounded" and "full" share the same dialog corners; only the action buttons become pill-shaped for "full" */
    --_dialog-contour: var(--radius-element-md);

    footer[data-element-count="3"] {
      justify-content: space-between;
    }

    footer[data-element-count="2"] {
      justify-content: flex-end;
    }

    & .actions,
    & ::slotted([slot="other"]) {
      width: fit-content;
    }
  }

  :host([shape="sharp"]) {
    --_dialog-contour: var(--radius-none);
  }

  dialog {
    flex-direction: column;
    width: var(--_dialog-width);
    min-width: var(--_dialog-width);
    max-width: var(--_dialog-width);
    max-height: var(--_dialog-max-height);
    overflow: auto;

    border: none;
    padding: var(--space-md);

    background-color: var(--surface-dialog);
    color: var(--foreground-primary);
    border: 1px solid var(--border-default);
  }

  /* Higher specificity than ContourableThree's ":host > *" rule, which would otherwise pill the whole box for shape="full" */
  :host dialog {
    border-radius: var(--_dialog-contour);
  }

  dialog[open] {
    display: flex;
  }

  header {
    display: flex;
    padding: var(--space-md);
    gap: var(--space-sm);
    align-items: center;
    align-self: stretch;
  }
  header h1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
  }

  :host([centered]) header {
    align-items: center;
  }

  footer {
    display: flex;
    flex-shrink: 0;
    padding: var(--space-md);
    gap: var(--space-lg);
    justify-content: space-between;
    overflow: auto;

    ::slotted(:not(zeta-button)) {
      display: none;
    }

    ::slotted(zeta-button) {
      width: 100%;
    }

    .actions {
      display: flex;
      gap: var(--space-sm);
      width: 100%;
    }
  }

  h1 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;
    font: var(--title-large);
    font-size: var(--_dialog-title-font-size);
    line-height: var(--_dialog-title-line-height);
    margin: 0;
    padding: 0;
  }

  div[part="body"] {
    display: flex;
    padding: var(--space-md) var(--space-md) var(--space-xl) var(--space-md);
    flex: 1;
    overflow: auto;
    /*Note: the designs as of 28/11/2024 show a different font size for the large dialog body ("Standard/Body/Large"). This isnt in ZDS tokens and needs to be changed in Figma*/
    font: var(--body-medium);
    min-height: var(--body-medium-line-height);
  }

  :host([flavor="info"]) {
    & [part="header-icon"] {
      --icon-color: var(--foreground-info);
    }
  }
  :host([flavor="warning"]) {
    & [part="header-icon"] {
      --icon-color: var(--foreground-warning);
    }
  }
  :host([flavor="success"]) {
    & [part="header-icon"] {
      --icon-color: var(--foreground-success);
    }
  }
  :host([flavor="error"]) {
    & [part="header-icon"] {
      --icon-color: var(--foreground-error);
    }
  }
  zeta-icon {
    --icon-size: var(--space-xl);
  }
  zeta-icon[name="close"] {
    cursor: pointer;
  }
`;
