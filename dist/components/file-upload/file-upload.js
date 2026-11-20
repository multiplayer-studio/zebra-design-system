var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { msg } from "@lit/localize";
import styles from "./file-upload.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import { formatFileSize } from "../upload-item/upload-item.js";
import "../button/button.js";
import "../icon/icon.js";
const matchesAccept = (f, accept) => {
    if (!accept)
        return true;
    const type = f.type.toLowerCase(), name = f.name.toLowerCase();
    return accept
        .split(",")
        .map(t => t.trim().toLowerCase())
        .filter(Boolean)
        .some(t => (t.startsWith(".") ? name.endsWith(t) : t.endsWith("/*") ? type.startsWith(t.slice(0, -1)) : type === t));
};
/** A drop zone with a Select files button, and the list of chosen files beneath it. The component never uploads
 * anything: it hands the files over in `filesselected` and shows whatever state the product sets on each row, while
 * `state` reports what the zone itself is doing, from resting through a drag to a refusal.
 *
 * Each dropped or picked file is checked against `accept`, `maxFileBytes` and `maxFiles`, in that order; refusals
 * fire `filesrejected` and the first one names itself on the error row. Only real files highlight the zone. The Select
 * files button is the keyboard path; the zone takes no focus. `rounded` (Contourable) maps the spec's `shape` and
 * reaches every `zeta-upload-item` in the slot.
 *
 * @slot - The Files slot: zeta-upload-item rows, in the order they were added.
 * @event {CustomEvent<{ files: File[] }>} filesselected - Fired with the accepted files.
 * @event {CustomEvent<{ rejections: FileUploadRejection[] }>} filesrejected - Fired with the refused files.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8289-840
 * @storybook ?path=/docs/components-file-upload--docs
 */
let ZetaFileUpload = class ZetaFileUpload extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The headline text. */
        this.headline = msg("Drop files here to upload");
        /** The headline while files are over the zone. */
        this.headlineDragging = msg("Release to upload");
        /** The Select files button's label. */
        this.selectFilesText = msg("Select files");
        /** The caption naming what is accepted. */
        this.caption = "Supports PDF, PNG and JPG. Max file size 10 MB.";
        /** Shows the caption. */
        this.showCaption = true;
        /** Allows multiple files to be added to the input. Also affects drag and drop. */
        this.multiple = true;
        /** No drops or picks. */
        this.disabled = false;
        this.dragging = false;
        this.refusal = null;
        this.hasFiles = false;
        this.depth = 0;
        this.syncRows = () => {
            this.passShape();
            this.hasFiles = (this.renderRoot.querySelector("slot")?.assignedElements() ?? []).length > 0;
        };
    }
    derived() {
        return this.disabled ? "disabled" : this.dragging ? "dragging" : (this.errorMessage ?? this.refusal) ? "error" : "default";
    }
    willUpdate(changed) {
        if (changed.has("state") && this.state !== this.derived())
            this.pinned = this.state;
        this.state = this.pinned ?? this.derived();
    }
    updated(changed) {
        if (changed.has("rounded"))
            this.passShape();
    }
    get off() {
        return this.disabled || this.state === "disabled";
    }
    rows() {
        return (this.renderRoot.querySelector("slot")?.assignedElements() ?? []).filter(e => e.localName === "zeta-upload-item");
    }
    /** Passes `rounded` to the rows; called on a shape change, so it sets no state of its own. */
    passShape() {
        this.rows().forEach(r => (r.rounded = !!this.rounded));
    }
    take(list) {
        if (!list || this.off)
            return;
        const ok = [], refused = [];
        for (const file of Array.from(list)) {
            if (!matchesAccept(file, this.accept))
                refused.push({ file, reason: "type" });
            else if (this.maxFileBytes !== undefined && file.size > this.maxFileBytes)
                refused.push({ file, reason: "size" });
            else if (this.maxFiles !== undefined && ok.length >= this.maxFiles)
                refused.push({ file, reason: "count" });
            else
                ok.push(file);
        }
        if (ok.length)
            this.dispatchEvent(new CustomEvent("filesselected", { detail: { files: ok }, bubbles: true, composed: true }));
        if (refused.length)
            this.dispatchEvent(new CustomEvent("filesrejected", { detail: { rejections: refused }, bubbles: true, composed: true }));
        const r = refused[0];
        this.refusal = !r
            ? null
            : r.reason === "type"
                ? msg(`${r.file.name} isn't a supported file type.`)
                : r.reason === "size"
                    ? msg(`${r.file.name} is over the ${formatFileSize(this.maxFileBytes ?? 0)} limit.`)
                    : msg(`You can upload up to ${this.maxFiles ?? 0} files.`);
    }
    isFiles(e) {
        return !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files");
    }
    render() {
        const message = this.errorMessage ?? this.refusal;
        return html `<div
        class="zone"
        @dragenter=${(e) => {
            if (this.off || !this.isFiles(e))
                return;
            e.preventDefault();
            this.depth += 1;
            this.dragging = true;
        }}
        @dragover=${(e) => {
            if (!this.off && this.isFiles(e))
                e.preventDefault();
        }}
        @dragleave=${() => {
            if (this.depth > 0 && --this.depth === 0)
                this.dragging = false;
        }}
        @drop=${(e) => {
            if (!this.isFiles(e))
                return;
            e.preventDefault();
            this.depth = 0;
            this.dragging = false;
            this.take(e.dataTransfer.files);
        }}
      >
        <span class="headline">${this.state === "dragging" ? this.headlineDragging : this.headline}</span>
        <span class="or">${msg("or")}</span>
        <zeta-button size="small" shape=${this.rounded ? "rounded" : "sharp"} ?disabled=${this.off} @click=${() => this.fileInput?.click()}
          >${this.selectFilesText}</zeta-button
        >
        ${this.showCaption ? html `<span class="caption">${this.caption}</span>` : nothing}
        ${this.state === "error" && message
            ? html `<span class="error" role="alert"><zeta-icon .rounded=${this.rounded}>error</zeta-icon><span>${message}</span></span>`
            : nothing}
        <input
          type="file"
          hidden
          id=${ifDefined(this.id || undefined)}
          name=${ifDefined(this.name)}
          accept=${ifDefined(this.accept)}
          .multiple=${this.multiple}
          ?disabled=${this.off}
          @change=${(e) => {
            const i = e.target;
            this.take(i.files);
            i.value = "";
        }}
        />
      </div>
      <div class="files" ?hidden=${!this.hasFiles}><slot @slotchange=${this.syncRows}></slot></div>`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaFileUpload.prototype, "state", void 0);
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "headline", void 0);
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "headlineDragging", void 0);
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "selectFilesText", void 0);
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "caption", void 0);
__decorate([
    property({ type: Boolean })
], ZetaFileUpload.prototype, "showCaption", void 0);
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "accept", void 0);
__decorate([
    property({ type: Number })
], ZetaFileUpload.prototype, "maxFileBytes", void 0);
__decorate([
    property({ type: Number })
], ZetaFileUpload.prototype, "maxFiles", void 0);
__decorate([
    property({ type: Boolean })
], ZetaFileUpload.prototype, "multiple", void 0);
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "name", void 0);
__decorate([
    property({ type: String })
], ZetaFileUpload.prototype, "errorMessage", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaFileUpload.prototype, "disabled", void 0);
__decorate([
    state()
], ZetaFileUpload.prototype, "dragging", void 0);
__decorate([
    state()
], ZetaFileUpload.prototype, "refusal", void 0);
__decorate([
    state()
], ZetaFileUpload.prototype, "hasFiles", void 0);
__decorate([
    query("input")
], ZetaFileUpload.prototype, "fileInput", void 0);
ZetaFileUpload = __decorate([
    customElement("zeta-file-upload")
], ZetaFileUpload);
export { ZetaFileUpload };
//# sourceMappingURL=file-upload.js.map