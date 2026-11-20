import { css } from "lit";
/* Spec: specs/card (_Card Footer). Buttons fill the row in equal shares. Figma pins them sharp whatever the card's
   shape (spec issue); they keep their own shape here. */
export default css `
  .card-footer {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-lg);
  }

  ::slotted(zeta-button:not([flavor="text"])) {
    flex: 1 1 0;
  }
`;
//# sourceMappingURL=card-footer.styles.js.map