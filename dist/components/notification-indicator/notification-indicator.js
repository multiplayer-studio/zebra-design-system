var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./notification-indicator.styles.js";
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
let ZdsNotificationIndicator = class ZdsNotificationIndicator extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Fits the badge to its context. Defaults to large, as Figma does.
         */
        this.size = "large";
        /**
         * The count or short label shown inside the badge. Only rendered at
         * medium and large — small is a plain dot with no label part at all.
         * It holds 3 characters at most, and anything above 99 reads 99+.
         */
        this.value = "2";
    }
    get count() {
        return Number(this.value) > 99 ? "99+" : (this.value ?? "").slice(0, 3);
    }
    render() {
        return html `
      <span part="root" class="root">
        ${this.size !== "small" ? html `<span part="label" class="label">${this.count}</span>` : nothing}
      </span>
    `;
    }
};
ZdsNotificationIndicator.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsNotificationIndicator.prototype, "size", void 0);
__decorate([
    property({ type: String })
], ZdsNotificationIndicator.prototype, "value", void 0);
ZdsNotificationIndicator = __decorate([
    customElement("zds-notification-indicator")
], ZdsNotificationIndicator);
export { ZdsNotificationIndicator };
