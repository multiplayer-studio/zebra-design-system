import { css } from "lit";
/* Spec: specs/dropdown (Dropdown Menu). A floating surface/overlay panel with the Shadow/medium style (two drop shadows
   on shadow/soft), space/card padding and space/2xs between rows. */
export default css `
  :host {
    display: none;
    position: absolute;
  }

  :host([open]) {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
    padding: var(--space-card);
    background-color: var(--surface-overlay);
    box-shadow:
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
    border-radius: var(--zebra-radius-none);
    z-index: 5;
    overflow-x: auto;
  }

  /* Compact: space/xs inset and no gap between rows (spec note, re-extraction 2026-10-28). */
  :host([compact][open]) {
    padding: var(--space-xs);
    gap: var(--space-none);
  }

  :host([rounded]) {
    border-radius: var(--radius-element-md);
  }
`;
//# sourceMappingURL=droppable.styles.js.map