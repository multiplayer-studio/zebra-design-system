import { customElement, property } from "lit/decorators.js";
import { LitElement, html } from "lit";
import styles from "./card-header.styles.js";

/**
 * The heading row of a card: optional leading content (usually a small Avatar), a heading and a subheading, and
 * optional trailing content (usually a text Icon Button). Use it in a card's header, or in its body above a block of
 * text.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline
 * @slot trailing - Content placed after the headline
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 */
@customElement("zeta-card-header")
export class ZetaCardHeader extends LitElement {
  /** The headline text. Can Also be slotted. */
  @property({ type: String }) headline?: string;

  /** The sub headline text. */
  @property({ type: String }) subHeadline?: string;

  protected render() {
    return html`<div class="card-header">
      <div class="leading">
        <slot name="leading"></slot>
        <div class="main-content">
          <h1>${this.headline}<slot></slot></h1>
          <h2>${this.subHeadline}</h2>
        </div>
      </div>
      <div class="trailing">
        <slot name="trailing"></slot>
      </div>
    </div>`;
  }

  static styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-card-header": ZetaCardHeader;
  }
}
