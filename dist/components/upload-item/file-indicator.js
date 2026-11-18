var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./file-indicator.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../icon/icon.js";
/** The file's badge in an upload item: a surface/shade tile carrying the extension, a "?" for an unknown type, or a
 * glyph. Decorative: the row names the file.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8416-636
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-file-upload--docs
 */
let ZetaFileIndicator = class ZetaFileIndicator extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** extension: the badge reads `extension`; unknown: a fixed "?"; icon: a glyph instead of text. */
        this.type = "extension";
        /** The file's extension, four letters at most. */
        this.extension = "";
        /** The glyph on the icon type. */
        this.icon = "video_play";
    }
    connectedCallback() {
        super.connectedCallback?.();
        this.setAttribute("aria-hidden", "true");
    }
    render() {
        return html `<span class="badge"
      >${this.type === "icon"
            ? html `<zeta-icon .rounded=${this.rounded}>${this.icon}</zeta-icon>`
            : this.type === "unknown"
                ? "?"
                : this.extension.slice(0, 4).toUpperCase()}</span
    >`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaFileIndicator.prototype, "type", void 0);
__decorate([
    property({ type: String })
], ZetaFileIndicator.prototype, "extension", void 0);
__decorate([
    property({ type: String })
], ZetaFileIndicator.prototype, "icon", void 0);
ZetaFileIndicator = __decorate([
    customElement("zeta-file-indicator")
], ZetaFileIndicator);
export { ZetaFileIndicator };
//# sourceMappingURL=file-indicator.js.map