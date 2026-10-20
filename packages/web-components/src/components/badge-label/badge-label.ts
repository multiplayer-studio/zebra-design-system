import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./badge-label.styles.js";

export type BadgeLabelVariant = "neutral" | "info" | "positive" | "warning" | "negative";
export type BadgeLabelShape = "rounded" | "sharp";

/**
 * Figma's "Label" badge. Names a category on an item in a word or two,
 * filled solid in one of five colours. Variant carries the standing of that
 * category and Shape matches the surface it sits on. Reach for it where the
 * thing shown is a fixed category, and for `<zds-status-label>` where it is a
 * state that changes over time.
 *
 * Named `zds-badge-label` so it does not read as a form label. Not
 * interactive; the text is the accessible name and the only thing naming the
 * category.
 *
 * @slot - The category. One or two words.
 * @csspart root - The badge.
 *
 * @spec specs/badges/label.spec.json
 */
@customElement("zds-badge-label")
export class ZdsBadgeLabel extends LitElement {
  static styles = styles;

  /** The standing of the category; fill, border and text move together. positive / negative draw the success / error tokens. */
  @property({ type: String, reflect: true }) variant: BadgeLabelVariant = "neutral";

  /** Softly rounded (radius/element-sm) or square (radius/none). */
  @property({ type: String, reflect: true }) shape: BadgeLabelShape = "rounded";

  protected render() {
    return html`<span part="root" class="root"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-badge-label": ZdsBadgeLabel; }
}
