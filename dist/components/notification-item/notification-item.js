var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./notification-item.styles.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
import "../icon-indicator/icon-indicator.js";
import "./notification-leading-visual.js";
/** True when a slot holds an element or non-blank text. */
const hasContent = (slot) => slot.assignedNodes().some((n) => n.nodeType === Node.ELEMENT_NODE || (n.textContent ?? "").trim() !== "");
/**
 * A single entry in a notification list: who or what it came from, a heading
 * and message, an optional attachment and an action slot.
 *
 * Read (spec issue "Metadata vs extracted"): Figma's Read=true also switches
 * the title from label/large to body/medium and drops the group bar, against
 * the metadata's "nothing else changes". We follow Figma — the title weight is
 * the second, non-colour unread signal — identically in React's NotificationItem.
 *
 * Not interactive itself (spec: "no hover, focus, pressed or disabled state");
 * the slotted actions are the interactive parts. The host is an `article`
 * (ElementInternals) named by its heading and read state, ready to sit in a
 * `role="feed"` or list; set `tabindex` if the feed needs entries focusable.
 * An `aria-label` on the host overrides the computed name.
 *
 * Reuses zds-avatar, zds-notification-indicator (unread dot, recoloured to
 * interactive/primary through its `root` part), zds-icon-indicator (urgency,
 * via its own `icon`/`fill`) and zds-icon.
 *
 * @slot - The message body for rich content, after `message` when both are set. Whitespace-only content is ignored.
 * @slot actions - The action slot, usually one small outline rounded zds-button. The row shows only when filled (spec `showActions`).
 * @part card - The card.
 * @part title - The heading text.
 * @part body - The message body.
 *
 * @spec specs/notification-item/notification-item.spec.json
 */
let ZdsNotificationItem = class ZdsNotificationItem extends LitElement {
    constructor() {
        super();
        /** The entry has been seen: the card drops its surface, the unread dot goes and the title drops to body weight. */
        this.read = false;
        /** The entry stands for several collapsed together. Draws a bar under the card; unread entries only. */
        this.group = false;
        /** What happened. Spec `title`; named `heading` because `title` is a global HTML attribute (native tooltip). */
        this.heading = "Urgent Message";
        /** When it happened, already formatted. */
        this.timestamp = "Just now";
        /** The detail. Clamped to two lines on screen; the full text stays in the DOM for assistive tech. */
        this.message = null;
        /** Attached file's name. The attachment row shows only when this is set (spec `showAttachment` follows its presence). */
        this.attachment = null;
        /** Flags the entry as needing attention first (spec `showUrgencyIndicator`). Reserve it. */
        this.urgent = false;
        /** Accessible name of the urgency indicator. */
        this.urgentLabel = "Urgent";
        /** The leading visual's flavour: avatar (a person), image (artwork), icon (fallback). */
        this.leading = "avatar";
        /** avatar: the photo; image: the artwork. */
        this.src = null;
        /** avatar: initials shown when there is no `src`. */
        this.initials = null;
        /** icon: the glyph. */
        this.icon = "verified";
        this.hasBody = false;
        this.hasActions = false;
        this.internals = this.attachInternals();
        this.internals.role = "article";
    }
    willUpdate(changed) {
        if (changed.has("heading") || changed.has("read") || changed.has("urgent") || changed.has("urgentLabel")) {
            this.internals.ariaLabel = [this.heading, this.read ? "read" : "unread", this.urgent ? this.urgentLabel.toLowerCase() : ""]
                .filter(Boolean)
                .join(", ");
        }
    }
    onBodySlot(e) {
        this.hasBody = hasContent(e.target);
    }
    onActionsSlot(e) {
        this.hasActions = hasContent(e.target);
    }
    render() {
        const showBody = this.hasBody || !!this.message;
        return html `
      <div part="card" class="card">
        <zds-notification-leading-visual
          flavour=${this.leading}
          src=${this.src ?? nothing}
          .initials=${this.initials}
          .icon=${this.icon}
        ></zds-notification-leading-visual>

        <div class="content">
          <div class="message">
            <div class="header">
              ${this.read
            ? nothing
            : html `<span class="dot-wrap" aria-hidden="true"
                    ><zds-notification-indicator class="dot" size="small"></zds-notification-indicator
                  ></span>`}
              <span part="title" class="title">${this.heading}</span>
              <span class="meta">
                <span class="timestamp">${this.timestamp}</span>
                ${this.urgent
            ? html `<zds-icon-indicator
                      size="small"
                      icon="important-notification"
                      fill="--interactive-destructive-background-default"
                      label=${this.urgentLabel}
                    ></zds-icon-indicator>`
            : nothing}
              </span>
            </div>
            <div part="body" class="body" ?hidden=${!showBody}>
              ${this.message ?? nothing}<slot @slotchange=${this.onBodySlot}></slot>
            </div>
          </div>

          ${this.attachment
            ? html `<div class="attachment">
                <zds-icon name="attachment" size="small"></zds-icon>
                <span class="filename">${this.attachment}</span>
              </div>`
            : nothing}

          <div class="actions" ?hidden=${!this.hasActions}>
            <slot name="actions" @slotchange=${this.onActionsSlot}></slot>
          </div>
        </div>

        ${this.group && !this.read ? html `<span class="group" aria-hidden="true"></span>` : nothing}
      </div>
    `;
    }
};
ZdsNotificationItem.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNotificationItem.prototype, "read", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNotificationItem.prototype, "group", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationItem.prototype, "heading", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationItem.prototype, "timestamp", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationItem.prototype, "message", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationItem.prototype, "attachment", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNotificationItem.prototype, "urgent", void 0);
__decorate([
    property({ type: String, attribute: "urgent-label" })
], ZdsNotificationItem.prototype, "urgentLabel", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationItem.prototype, "leading", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationItem.prototype, "src", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationItem.prototype, "initials", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationItem.prototype, "icon", void 0);
__decorate([
    state()
], ZdsNotificationItem.prototype, "hasBody", void 0);
__decorate([
    state()
], ZdsNotificationItem.prototype, "hasActions", void 0);
ZdsNotificationItem = __decorate([
    customElement("zds-notification-item")
], ZdsNotificationItem);
export { ZdsNotificationItem };
