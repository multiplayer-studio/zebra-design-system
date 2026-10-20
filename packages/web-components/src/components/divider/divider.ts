import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./divider.styles.js";

export type DividerOrientation = "horizontal" | "vertical";

/**
 * A thin line used to visually separate content into distinct sections or
 * groups, such as list rows, cards, or menu items. Orientation sets whether
 * the line runs horizontal or vertical.
 *
 * Divider has no behaviour to delegate to a primitive, so it exposes the
 * platform's separator role and `aria-orientation` itself, on the inner
 * line rather than the host.
 *
 * Not a spacing or margin mechanism — it has no built-in padding. Use layout
 * gap for spacing between elements instead.
 *
 * @part line - The separator element.
 *
 * @spec specs/divider/divider.spec.json
 */
@customElement("zds-divider")
export class ZdsDivider extends LitElement {
  static styles = styles;

  /** Horizontal separates stacked content; vertical separates side-by-side content. */
  @property({ type: String, reflect: true }) orientation: DividerOrientation = "horizontal";

  protected render() {
    return html`<div part="line" class="line" role="separator" aria-orientation=${this.orientation}></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-divider": ZdsDivider;
  }
}
