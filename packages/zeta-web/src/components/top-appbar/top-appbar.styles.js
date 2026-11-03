import { css } from "lit";

/* Spec: specs/top-app-bar. The title uses foreground/primary, because Figma's raw black would not follow dark mode
   (spec issue). contextual keeps space/md after the leading control, as the metadata says (spec issue). */
export default css`
  :host([centered]) .title,
  :host([type="centered"]) .title {
    justify-content: center;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-width: 0;
  }

  header {
    display: flex;
    height: fit-content;
    flex-direction: column;
    gap: var(--space-sm);
    background-color: var(--surface-section);
    color: var(--foreground-primary);
    padding: var(--space-md) var(--space-sm);
    font: var(--text-label-large);
    letter-spacing: var(--label-large-letter-spacing);
    border-radius: var(--zebra-radius-none);
  }

  :host([shape="rounded"]) header {
    border-radius: var(--radius-element-sm);
  }

  :host([extended]) header,
  :host([type="extended"]) header {
    gap: var(--space-lg);
  }

  :host([extended]) .title,
  :host([type="extended"]) .title {
    padding-inline: var(--space-sm);
  }

  .body {
    gap: var(--space-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* The trailing region's own space/none, not the row's gap. */
  :host([type]) #trailing-slot {
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-none);
  }

  .count {
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
  }

  .search {
    flex: 1;
    min-width: 0;
  }

  :host([type="contextual alt"]) #leading-slot {
    display: block;
    flex: 1;
  }

  ::slotted(zeta-search) {
    --search-icon-display: none;
    --search-border-color: transparent;
    width: 100%;
  }
`;
