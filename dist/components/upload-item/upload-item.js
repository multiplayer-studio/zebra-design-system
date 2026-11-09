var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./upload-item.styles.js";
import { Contourable } from "../../mixins/contour.js";
import "../icon/icon.js";
import "../progress-indicators/progress-circle/progress-circle.js";
import { ZetaCancelUploadEvent } from "../../events.js";
/** A list tile showing the upload progress of an item.
 *
 * @slot - The title of the file being uploaded.
 * @slot subtitle - Any extra information about the upload.
 * @slot leading - The thumbnail of the file being uploaded.
 *
 * @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when the cancel button inside the progress circle is clicked.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-42&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-file-upload--docs
 */
let ZetaUploadItem = class ZetaUploadItem extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The flavor of the upload item. */
        this.flavor = "default";
        /** The progress shown on the progress circle on the upload item. */
        this.progress = 0;
    }
    getTrailingContent() {
        switch (this.flavor) {
            case "completed":
                return html `<zeta-icon>check_circle</zeta-icon>`;
            case "error":
                return html `<zeta-icon>error</zeta-icon>`;
            default:
                return html ` <zeta-progress-circle size="48" type="upload" progress=${this.progress}></zeta-progress-circle>`;
        }
    }
    onCancelClicked() {
        this.dispatchEvent(new ZetaCancelUploadEvent().toEvent());
    }
    render() {
        return html `
      <div>
        <slot name="leading"> </slot>
        <div class="body">
          <div class="title"><slot></slot></div>
          <div class="subtitle"><slot name="subtitle">4.6MB of 5.7MB</slot></div>
        </div>
        <div class="trailing">
          ${this.getTrailingContent()}
          <zeta-icon id="cancel" @click=${() => this.onCancelClicked()}>close</zeta-icon>
        </div>
      </div>
    `;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "flavor", void 0);
__decorate([
    property({ type: Number })
], ZetaUploadItem.prototype, "progress", void 0);
ZetaUploadItem = __decorate([
    customElement("zeta-upload-item")
], ZetaUploadItem);
export { ZetaUploadItem };
//# sourceMappingURL=upload-item.js.map