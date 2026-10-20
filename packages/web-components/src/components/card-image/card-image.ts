import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./card-image.styles.js";

/**
 * A full-bleed image for `zds-card`'s body slot. Fills the width and clips to
 * the card's own corner radius (via the card's `overflow: hidden`); height is
 * left to the consumer — the spec's own 259px is an unbound, authored canvas
 * value, not a real constraint.
 *
 * @part image - The image element.
 * @spec specs/card/card.spec.json
 */
@customElement("zds-card-image")
export class ZdsCardImage extends LitElement {
  static styles = styles;

  /** Image source. */
  @property({ type: String }) src: string | null = null;

  /** Accessible text for the image. */
  @property({ type: String }) alt: string | null = null;

  protected render() {
    return html`<img part="image" src=${this.src ?? nothing} alt=${this.alt ?? ""} />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-card-image": ZdsCardImage;
  }
}
