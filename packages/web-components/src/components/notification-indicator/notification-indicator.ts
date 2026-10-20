import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./notification-indicator.styles.js";

export type NotificationIndicatorSize = "small" | "medium" | "large";

/**
 * A small badge that flags unread or pending activity on an icon or
 * navigation item.
 *
 * Marks that something is waiting on whatever it is pinned to, optionally
 * with a count; small is a plain dot. It carries one fixed colour, so it
 * reports how many and never what kind. The count is its only text, so what
 * it refers to has to be named by whatever it is pinned to.
 *
 * @part root - The badge itself: the filled, sized dot or pill.
 * @part label - The count/label text, absent entirely at size="small".
 *
 * @spec specs/notification-indicator/notification-indicator.spec.json
 */
@customElement("zds-notification-indicator")
export class ZdsNotificationIndicator extends LitElement {
  static styles = styles;

  /**
   * Fits the badge to its context. Figma's own default is the largest
   * option (spec issue — most size axes in this file default to the
   * smallest); kept as extracted rather than silently switched.
   */
  @property({ type: String, reflect: true }) size: NotificationIndicatorSize = "large";

  /**
   * The count or short label shown inside the badge. Only rendered at
   * medium and large — small is a plain dot with no label part at all.
   */
  @property({ type: String }) value = "2";

  protected render() {
    return html`
      <span part="root" class="root">
        ${this.size !== "small" ? html`<span part="label" class="label">${this.value}</span>` : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-notification-indicator": ZdsNotificationIndicator;
  }
}
