var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./file-upload.styles.js";
import { msg } from "@lit/localize";
import { Contourable } from "../../mixins/mixins.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../button/button.js";
/** A dialog that allows users to upload files.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=898-10794
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-file-upload--docs
 */
let ZetaFileUpload = class ZetaFileUpload extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        this.defaultHeadline = msg("Drop files here to upload");
        this.errorMsg = "";
        /** The headline text. */
        this.headline = this.defaultHeadline;
        /** Allows multiple files to be added to the input. Also affects drag and drop. */
        this.multiple = true;
        /** Used to trigger the 'active' state of the file input. */
        this.active = false;
        /** Use to show the 'error' state of the file input. */
        this.error = false;
        this.dropHandler = (e) => {
            e.preventDefault();
            this.active = false;
            this.error = false;
            if (!this.checkTypes(e.dataTransfer.files)) {
                this.errorMsg = msg("Selection contains files with invalid types.");
                this.error = true;
            }
            else if (this.checkMultiple(e) && e.dataTransfer?.items && this.fileInput) {
                this.fileInput.files = e.dataTransfer.files;
            }
        };
        this.dragOverHandler = (e) => {
            e.preventDefault();
            if (!this.checkMultiple(e)) {
                this.errorMsg = msg("Multiple files are not allowed.");
                this.error = true;
            }
            else {
                this.active = true;
            }
        };
        this.dragLeaveHandler = (e) => {
            e.preventDefault();
            this.active = false;
            this.error = false;
        };
        this.mouseLeaveHandler = () => {
            this.error = false;
        };
        this.openFileInput = () => {
            this.fileInput?.click();
        };
    }
    checkMultiple(e) {
        return this.multiple || (!this.multiple && e.dataTransfer?.items && e.dataTransfer?.items.length == 1);
    }
    checkTypes(files) {
        if (!this.accept || this.accept.length === 0)
            return true;
        const allowedExtensions = this.accept?.split(",");
        let filesAccepted = true;
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i);
            let typeMatch = false;
            for (const ext of allowedExtensions) {
                typeMatch = this.typesEqual(file.type, ext);
                if (typeMatch)
                    break;
            }
            if (!typeMatch) {
                filesAccepted = false;
                break;
            }
        }
        return filesAccepted;
    }
    typesEqual(fileType, allowedType) {
        // MIME types are equal eg image/jpg
        if (fileType === allowedType)
            return true;
        // E.g. fileType is image/png, allowedType is .png
        const t = allowedType.replaceAll(".", "");
        if (fileType.includes(t))
            return true;
        // E.g. fileType is image/png, allowedType is image/*
        const allowedSplit = allowedType.split("/");
        const fileTypeSplit = fileType.split("/");
        if (allowedSplit[1] == "*" && allowedSplit[0] == fileTypeSplit[0])
            return true;
        return false;
    }
    render() {
        return html `
      <div
        class="file-upload"
        @drop=${this.dropHandler}
        @dragover=${this.dragOverHandler}
        @dragleave=${this.dragLeaveHandler}
        @mouseleave=${this.mouseLeaveHandler}
      >
        <div class="main-content">
          <h1>${this.headline}</h1>
          <h2>${msg("or")}</h2>
          <zeta-button shape=${this.rounded ? "rounded" : "sharp"} @click=${this.openFileInput}>Select Files</zeta-button>
        </div>
        ${this.errorMsg || this.caption ? html `<h2 class="caption">${this.errorMsg || this.caption}</h2>` : nothing}
        <input type="file" id=${this.id} name=${ifDefined(this.name)} accept=${ifDefined(this.accept)} .multiple=${this.multiple} />
      </div>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "headline", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaFileUpload.prototype, "caption", void 0);
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "accept", void 0);
__decorate([
    property({ type: Boolean })
], ZetaFileUpload.prototype, "multiple", void 0);
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "name", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaFileUpload.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaFileUpload.prototype, "error", void 0);
__decorate([
    query("input")
], ZetaFileUpload.prototype, "fileInput", void 0);
ZetaFileUpload = __decorate([
    customElement("zeta-file-upload")
], ZetaFileUpload);
export { ZetaFileUpload };
//# sourceMappingURL=file-upload.js.map