var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./chat-photos.styles.js";
import "../icon/icon.js";
/**
 * Photos grouped as one grid: one full width, two equal tiles, or one large
 * tile beside two stacked, the last counting what does not fit. `count` is
 * derived from `photos` and reflected.
 *
 * @fires zds-open - A photo was activated (when `clickable`). `detail.index`.
 * @spec specs/chat-message/chat-message.spec.json
 */
let ZdsChatPhotos = class ZdsChatPhotos extends LitElement {
    constructor() {
        super(...arguments);
        /** Image URLs. Up to three show; the rest are counted on the last tile. */
        this.photos = [];
        this.showIcon = true;
        this.rounded = true;
        this.clickable = false;
        this.count = "1";
    }
    willUpdate(changed) {
        if (changed.has("photos"))
            this.count = this.photos.length >= 4 ? "more" : String(Math.max(1, this.photos.length));
    }
    tile(src, i) {
        const inner = src ? html `<img src=${src} alt=${`Photo ${i + 1}`} />` : this.showIcon ? html `<zds-icon name="image"></zds-icon>` : nothing;
        return this.clickable
            ? html `<button type="button" class="photo" @click=${() => this.dispatchEvent(new CustomEvent("zds-open", { detail: { index: i }, bubbles: true, composed: true }))}>${inner}</button>`
            : html `<span class="photo">${inner}</span>`;
    }
    render() {
        const p = this.photos, extra = p.length - 3;
        return html `${this.tile(p[0], 0)}
      ${p.length === 2 ? this.tile(p[1], 1) : nothing}
      ${p.length >= 3 ? html `<span class="stack">${this.tile(p[1], 1)}${this.tile(p[2], 2)}</span>` : nothing}
      ${extra > 0 ? html `<span class="extra">+${extra}</span>` : nothing}`;
    }
};
ZdsChatPhotos.styles = styles;
__decorate([
    property({ attribute: false })
], ZdsChatPhotos.prototype, "photos", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-icon" })
], ZdsChatPhotos.prototype, "showIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsChatPhotos.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean })
], ZdsChatPhotos.prototype, "clickable", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsChatPhotos.prototype, "count", void 0);
ZdsChatPhotos = __decorate([
    customElement("zds-chat-photos")
], ZdsChatPhotos);
export { ZdsChatPhotos };
