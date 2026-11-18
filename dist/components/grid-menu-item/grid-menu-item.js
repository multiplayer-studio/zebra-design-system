var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./grid-menu-item.styles.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
/**
 * One tile of the grid arrangement inside a bottom sheet: an icon above a
 * short label. Hover and press come from the pointer. `active` marks the
 * option a person is on, and `disabled` puts one out of reach.
 *
 * Departures from Figma, each a spec issue:
 * - `icon` is an input, because every tile needs its own glyph. Figma fixes it
 *   to `star`, which stays the default.
 * - `active` sets `aria-current` and `disabled` the native attribute, because
 *   both are otherwise carried by the label's colour alone.
 *
 * @fires click - The tile was activated. Not fired while disabled.
 * @csspart tile - The `<button>`.
 * @csspart label - The label text.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.json
 */
let ZdsGridMenuItem = class ZdsGridMenuItem extends LitElement {
    constructor() {
        super(...arguments);
        /** Names the option beneath its icon. A long label wraps and makes every tile in the row taller. */
        this.label = "Label";
        /** Glyph above the label. */
        this.icon = "star";
        /** Marks the option a person is on now. */
        this.active = false;
        /** Puts the option out of reach and takes it out of the tab order. */
        this.disabled = false;
        /** Softens the tile's corners. */
        this.rounded = true;
        /** Adds a dot over the icon. It carries no number. */
        this.showBadge = false;
    }
    render() {
        return html `
      <button part="tile" class="tile" type="button" ?disabled=${this.disabled} aria-current=${this.active ? "true" : nothing}>
        <span class="indicator">
          <zds-icon name=${this.icon} size="large"></zds-icon>
          ${this.showBadge ? html `<zds-notification-indicator class="badge" size="small"></zds-notification-indicator>` : nothing}
        </span>
        <span part="label" class="label">${this.label}</span>
      </button>
    `;
    }
};
ZdsGridMenuItem.styles = styles;
__decorate([
    property({ type: String })
], ZdsGridMenuItem.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsGridMenuItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsGridMenuItem.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsGridMenuItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsGridMenuItem.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-badge" })
], ZdsGridMenuItem.prototype, "showBadge", void 0);
ZdsGridMenuItem = __decorate([
    customElement("zds-grid-menu-item")
], ZdsGridMenuItem);
export { ZdsGridMenuItem };
