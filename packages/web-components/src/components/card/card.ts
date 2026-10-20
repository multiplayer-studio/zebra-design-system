import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./card.styles.js";

export type CardShape = "sharp" | "rounded";

/**
 * The empty card shell: three stacked slots inside a bordered surface. It
 * decides the surface, the border, the corner treatment and clipping, and
 * nothing else — every inset comes from whatever fills the slots
 * (`zds-card-heading`, `zds-card-body`, `zds-card-image`, `zds-card-footer`,
 * or anything else).
 *
 * Header and footer can each be switched off; the body has no toggle. Width
 * is not fixed here — the spec's own 330px is a Figma canvas artifact, not a
 * constraint ("whoever places it decides the width"), so this shell sizes to
 * its container.
 *
 * @slot header - The header slot, hidden by has-header.
 * @slot - The body slot. Always present.
 * @slot footer - The footer slot, hidden by has-footer.
 * @part header - The header wrapper.
 * @part body - The body wrapper.
 * @part footer - The footer wrapper.
 *
 * @spec specs/card/card.spec.json
 */
@customElement("zds-card")
export class ZdsCard extends LitElement {
  static styles = styles;

  /** Corner treatment. Content clips to it, so a full-bleed image follows the curve. */
  @property({ type: String, reflect: true }) shape: CardShape = "sharp";

  /** Shows the header slot above the body. */
  @property({ type: Boolean, attribute: "has-header", reflect: true }) hasHeader = true;

  /** Shows the footer slot below the body. */
  @property({ type: Boolean, attribute: "has-footer", reflect: true }) hasFooter = true;

  protected render() {
    return html`
      ${this.hasHeader ? html`<div part="header" class="header"><slot name="header"></slot></div>` : nothing}
      <div part="body" class="body"><slot></slot></div>
      ${this.hasFooter ? html`<div part="footer" class="footer"><slot name="footer"></slot></div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-card": ZdsCard;
  }
}
