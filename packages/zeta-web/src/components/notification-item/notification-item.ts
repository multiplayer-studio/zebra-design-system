import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./notification-item.styles.js";
import "../icon/icon.js";

/**
 * A single entry in a notification list: who or what it came from, a title and message, an optional attachment and an
 * action. `read` decides whether the entry still looks unseen; every other part is a toggle, so one element covers
 * the range a real list needs.
 *
 * The leading visual goes in the `leading` slot: a `zeta-avatar` (size xxs) for a person, an `img` for something with
 * artwork of its own, or a `zeta-icon` for a system source, which gets a thin ring. The message goes in the default
 * slot and truncates after two lines, so make sure the full text is reachable elsewhere. Unread and urgency are named
 * for assistive technology, not just drawn.
 *
 * @slot - The message body.
 * @slot leading - The source: a zeta-avatar, an img or a zeta-icon.
 * @slot action - What the entry offers to do, usually one small outline zeta-button.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6020-1488
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-notification-item--docs
 */
@customElement("zeta-notification-item")
export class ZetaNotificationItem extends LitElement {
  /** The entry has been seen: the card drops its fill and the unread dot. */
  @property({ type: Boolean, reflect: true }) read = false;

  /** The entry stands for several collapsed together. Shows a bar under the card while the entry is unread. */
  @property({ type: Boolean, reflect: true }) group = false;

  /** Shows the attachment row. Set `attachment` too; with no filename the row stays hidden. */
  @property({ type: Boolean, reflect: true, attribute: "show-attachment" }) showAttachment = true;

  /** Shows the action slot. Turn it off for a purely informational entry. */
  @property({ type: Boolean, reflect: true, attribute: "show-actions" }) showActions = true;

  /** Flags the entry as needing attention first. Reserve it: on every entry it signals nothing. */
  @property({ type: Boolean, reflect: true, attribute: "show-urgency-indicator" }) showUrgencyIndicator = true;

  /** What happened (spec: title). */
  @property({ type: String }) headline = "Urgent Message";

  /** When it happened. */
  @property({ type: String }) timestamp = "Just now";

  /** The attached file's name. */
  @property({ type: String }) attachment = "";

  /** Accessible text for the unread state. */
  @property({ type: String, attribute: "unread-label" }) unreadLabel = "Unread";

  /** Accessible name of the urgency indicator. */
  @property({ type: String, attribute: "urgency-label" }) urgencyLabel = "Urgent";

  @state() private flavor: "avatar" | "image" | "icon" | null = null;

  private onLeading = (e: Event) => {
    const el = (e.target as HTMLSlotElement).assignedElements()[0];
    this.flavor = !el ? null : el.localName === "zeta-icon" ? "icon" : el.localName === "img" ? "image" : "avatar";
  };

  protected render() {
    return html`<div class="item">
      <div class="leading" data-flavor=${this.flavor ?? nothing} ?hidden=${!this.flavor}>
        <slot name="leading" @slotchange=${this.onLeading}></slot>
      </div>
      <div class="content">
        <div class="message">
          <div class="header">
            ${this.read ? nothing : html`<span class="dot" aria-hidden="true"></span>`}
            <span class="title">${this.headline}${this.read ? nothing : html`<span class="sr">, ${this.unreadLabel}</span>`}</span>
            <span class="meta">
              <span class="timestamp">${this.timestamp}</span>
              ${
                this.showUrgencyIndicator
                  ? html`<span class="urgency" role="img" aria-label=${this.urgencyLabel}><zeta-icon>important_notification</zeta-icon></span>`
                  : nothing
              }
            </span>
          </div>
          <div class="body"><slot></slot></div>
        </div>
        ${
          this.showAttachment && this.attachment
            ? html`<div class="attachment"><zeta-icon aria-hidden="true">attachment</zeta-icon><span class="filename">${this.attachment}</span></div>`
            : nothing
        }
        ${this.showActions ? html`<div class="actions"><slot name="action"></slot></div>` : nothing}
      </div>
      ${this.group && !this.read ? html`<div class="group" aria-hidden="true"></div>` : nothing}
    </div>`;
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-notification-item": ZetaNotificationItem;
  }
}
