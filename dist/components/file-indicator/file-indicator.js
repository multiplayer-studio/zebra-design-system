var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./file-indicator.styles.js";
import "../icon/icon.js";
/**
 * The file's badge in a File Upload Item: a surface/shade tile carrying the
 * extension, a "?" for an unknown type, or a glyph. Decorative: the row
 * names the file.
 *
 * @spec specs/file-upload/file-upload.spec.json
 */
let ZdsFileIndicator = class ZdsFileIndicator extends LitElement {
    constructor() {
        super(...arguments);
        /** extension: the badge reads `extension`; unknown: a fixed "?"; icon: a glyph instead of text. */
        this.type = "extension";
        /** The file's extension, four letters at most. */
        this.extension = "";
        /** The glyph on the icon type. */
        this.icon = "video-play";
        this.shape = "rounded";
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute("aria-hidden", "true");
    }
    render() {
        return html `<span class="badge">${this.type === "icon"
            ? html `<zds-icon name=${this.icon} size="small"></zds-icon>`
            : this.type === "unknown" ? "?" : this.extension.slice(0, 4).toUpperCase()}</span>`;
    }
};
ZdsFileIndicator.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsFileIndicator.prototype, "type", void 0);
__decorate([
    property({ type: String })
], ZdsFileIndicator.prototype, "extension", void 0);
__decorate([
    property({ type: String })
], ZdsFileIndicator.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsFileIndicator.prototype, "shape", void 0);
ZdsFileIndicator = __decorate([
    customElement("zds-file-indicator")
], ZdsFileIndicator);
export { ZdsFileIndicator };
