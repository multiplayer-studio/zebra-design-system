var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
 * @storybook ?path=/story/components-notification-item--notification-item
 */
let ZetaNotificationItem = class ZetaNotificationItem extends LitElement {
    constructor() {
        super(...arguments);
        /** The entry has been seen: the card drops its fill and the unread dot. */
        this.read = false;
        /** The entry stands for several collapsed together. Shows a bar under the card while the entry is unread. */
        this.group = false;
        /** Shows the attachment row. Set `attachment` too; with no filename the row stays hidden. */
        this.showAttachment = true;
        /** Shows the action slot. Turn it off for a purely informational entry. */
        this.showActions = true;
        /** Flags the entry as needing attention first. Reserve it: on every entry it signals nothing. */
        this.showUrgencyIndicator = true;
        /** What happened (spec: title). */
        this.headline = "Urgent Message";
        /** When it happened. */
        this.timestamp = "Just now";
        /** The attached file's name. */
        this.attachment = "";
        /** Accessible text for the unread state. */
        this.unreadLabel = "Unread";
        /** Accessible name of the urgency indicator. */
        this.urgencyLabel = "Urgent";
        this.flavor = null;
        this.onLeading = (e) => {
            const el = e.target.assignedElements()[0];
            this.flavor = !el ? null : el.localName === "zeta-icon" ? "icon" : el.localName === "img" ? "image" : "avatar";
        };
    }
    render() {
        return html `<div class="item">
      <div class="leading" data-flavor=${this.flavor ?? nothing} ?hidden=${!this.flavor}>
        <slot name="leading" @slotchange=${this.onLeading}></slot>
      </div>
      <div class="content">
        <div class="message">
          <div class="header">
            ${this.read ? nothing : html `<span class="dot" aria-hidden="true"></span>`}
            <span class="title">${this.headline}${this.read ? nothing : html `<span class="sr">, ${this.unreadLabel}</span>`}</span>
            <span class="meta">
              <span class="timestamp">${this.timestamp}</span>
              ${this.showUrgencyIndicator
            ? html `<span class="urgency" role="img" aria-label=${this.urgencyLabel}><zeta-icon>important_notification</zeta-icon></span>`
            : nothing}
            </span>
          </div>
          <div class="body"><slot></slot></div>
        </div>
        ${this.showAttachment && this.attachment
            ? html `<div class="attachment"><zeta-icon aria-hidden="true">attachment</zeta-icon><span class="filename">${this.attachment}</span></div>`
            : nothing}
        ${this.showActions ? html `<div class="actions"><slot name="action"></slot></div>` : nothing}
      </div>
      ${this.group && !this.read ? html `<div class="group" aria-hidden="true"></div>` : nothing}
    </div>`;
    }
    static { this.styles = styles; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNotificationItem.prototype, "read", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNotificationItem.prototype, "group", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-attachment" })
], ZetaNotificationItem.prototype, "showAttachment", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-actions" })
], ZetaNotificationItem.prototype, "showActions", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-urgency-indicator" })
], ZetaNotificationItem.prototype, "showUrgencyIndicator", void 0);
__decorate([
    property({ type: String })
], ZetaNotificationItem.prototype, "headline", void 0);
__decorate([
    property({ type: String })
], ZetaNotificationItem.prototype, "timestamp", void 0);
__decorate([
    property({ type: String })
], ZetaNotificationItem.prototype, "attachment", void 0);
__decorate([
    property({ type: String, attribute: "unread-label" })
], ZetaNotificationItem.prototype, "unreadLabel", void 0);
__decorate([
    property({ type: String, attribute: "urgency-label" })
], ZetaNotificationItem.prototype, "urgencyLabel", void 0);
__decorate([
    state()
], ZetaNotificationItem.prototype, "flavor", void 0);
ZetaNotificationItem = __decorate([
    customElement("zeta-notification-item")
], ZetaNotificationItem);
export { ZetaNotificationItem };
//# sourceMappingURL=notification-item.js.map