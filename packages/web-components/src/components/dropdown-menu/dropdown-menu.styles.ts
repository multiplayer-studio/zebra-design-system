import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer. Because
 * custom properties inherit through shadow roots, an `.ext-*` / `.mode-*`
 * class on any ancestor in the light DOM re-themes this component with no
 * JavaScript and no re-render.
 *
 * Spec: specs/dropdown/dropdown.spec.json (Dropdown Menu subcomponent)
 */
export default css`
  :host {
    display: inline-block;
  }

  :host([hidden]) {
    display: none;
  }

  .menu {
    /* --- geometry: hug on both axes ------------------------------------- */
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: var(--space-xxs);
    padding: var(--space-card);
    border-radius: var(--radius-none);

    /* --- colour: theming only, everything else lives on the rows -------- */
    background: var(--surface-menu);

    /* "Shadow/medium" style: two stacked drop shadows on one colour token.
       No component in this package has needed box-shadow before this one, so
       there is no shared shadow-token pattern to match yet — this composes
       the shadow/medium and shadow/small dimension tokens directly. */
    box-shadow:
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }

  /* ---- rounded --------------------------------------------------------- */
  :host([rounded]) .menu {
    border-radius: var(--radius-element-md);
  }
`;
