var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./file-upload.styles.js";
import "../button/button.js";
import "../icon/icon.js";
import "../file-upload-item/file-upload-item.js";
import { formatFileSize } from "../file-upload-item/file-upload-item.js";
/** Every string the zone shows. `{name}`, `{size}`, `{count}` are filled in. */
export const fileUploadStrings = {
    headline: "Drop files here to upload",
    headlineDragging: "Release to upload",
    or: "or",
    selectFiles: "Select files",
    rejectType: "{name} isn't a supported file type.",
    rejectSize: "{name} is over the {size} limit.",
    rejectCount: "You can upload up to {count} files.",
};
const fmt = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
const matchesAccept = (f, accept) => {
    if (!accept)
        return true;
    const type = f.type.toLowerCase(), name = f.name.toLowerCase();
    return accept.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
        .some((t) => (t.startsWith(".") ? name.endsWith(t) : t.endsWith("/*") ? type.startsWith(t.slice(0, -1)) : type === t));
};
/**
 * A drop zone with a Select files button, and the list of chosen files
 * beneath it. The component never uploads anything: it hands the files over
 * in `zds-files-selected` and shows whatever state the product sets on each
 * row, while `state` reports what the zone itself is doing.
 *
 * Each dropped or picked file is checked against `accept`, `max-file-bytes`
 * and `max-files`, in that order; refusals fire `zds-files-rejected` and the
 * first one names itself on the error row. Only real files highlight the
 * zone. The Select files button is the keyboard path; the zone takes no
 * focus. `shape` reaches every `zds-file-upload-item` in the slot. Kept in
 * step with packages/react-baseui `<FileUpload>`.
 *
 * @slot - The Files slot: zds-file-upload-item rows, in the order they were added.
 * @fires zds-files-selected - Accepted files. `detail.files`.
 * @fires zds-files-rejected - Refused files. `detail.rejections` (`{ file, reason }`).
 *
 * @spec specs/file-upload/file-upload.spec.json
 */
let ZdsFileUpload = class ZdsFileUpload extends LitElement {
    constructor() {
        super(...arguments);
        /** The zone's state, reflected. Set it to pin one; unset, dragging, error and disabled follow what happens. */
        this.state = null;
        /** Reaches the zone, the button and every row inside. */
        this.shape = "rounded";
        this.caption = "Supports PDF, PNG and JPG. Max file size 10 MB.";
        this.showCaption = true;
        this.accept = null;
        this.maxFileBytes = null;
        this.maxFiles = null;
        this.multiple = true;
        /** A product error for the zone, shown on the error row. */
        this.error = null;
        this.disabled = false;
        this.strings = {};
        this.dragging = false;
        this.refusal = null;
        this.hasFiles = false;
        this.pinned = null;
        this.depth = 0;
        this.syncRows = () => {
            const slot = this.renderRoot.querySelector("slot");
            const rows = (slot?.assignedElements() ?? []).filter((e) => e.localName === "zds-file-upload-item");
            rows.forEach((r) => r.setAttribute("shape", this.shape));
            this.hasFiles = rows.length > 0 || (slot?.assignedElements().length ?? 0) > 0;
        };
    }
    willUpdate(changed) {
        if (changed.has("state") && this.state !== this.derived())
            this.pinned = this.state;
        this.state = this.pinned ?? this.derived();
    }
    derived() {
        const message = this.error ?? this.refusal;
        return this.disabled ? "disabled" : this.dragging ? "dragging" : message ? "error" : "default";
    }
    get off() { return this.disabled || this.state === "disabled"; }
    updated(changed) {
        if (changed.has("shape"))
            this.syncRows();
    }
    take(list) {
        if (!list || this.off)
            return;
        const S = { ...fileUploadStrings, ...this.strings };
        const ok = [], refused = [];
        for (const file of Array.from(list)) {
            if (!matchesAccept(file, this.accept))
                refused.push({ file, reason: "type" });
            else if (this.maxFileBytes !== null && file.size > this.maxFileBytes)
                refused.push({ file, reason: "size" });
            else if (this.maxFiles !== null && ok.length >= this.maxFiles)
                refused.push({ file, reason: "count" });
            else
                ok.push(file);
        }
        if (ok.length)
            this.dispatchEvent(new CustomEvent("zds-files-selected", { detail: { files: ok }, bubbles: true, composed: true }));
        if (refused.length)
            this.dispatchEvent(new CustomEvent("zds-files-rejected", { detail: { rejections: refused }, bubbles: true, composed: true }));
        const r = refused[0];
        this.refusal = !r ? null : r.reason === "type" ? fmt(S.rejectType, { name: r.file.name })
            : r.reason === "size" ? fmt(S.rejectSize, { name: r.file.name, size: formatFileSize(this.maxFileBytes ?? 0) })
                : fmt(S.rejectCount, { count: this.maxFiles ?? 0 });
    }
    isFiles(e) { return !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files"); }
    render() {
        const S = { ...fileUploadStrings, ...this.strings };
        const message = this.error ?? this.refusal;
        return html `<div class="zone"
        @dragenter=${(e) => { if (this.off || !this.isFiles(e))
            return; e.preventDefault(); this.depth += 1; this.dragging = true; }}
        @dragover=${(e) => { if (!this.off && this.isFiles(e))
            e.preventDefault(); }}
        @dragleave=${() => { if (this.depth > 0 && --this.depth === 0)
            this.dragging = false; }}
        @drop=${(e) => { if (!this.isFiles(e))
            return; e.preventDefault(); this.depth = 0; this.dragging = false; this.take(e.dataTransfer.files); }}>
        <span class="headline">${this.state === "dragging" ? S.headlineDragging : S.headline}</span>
        <span class="or">${S.or}</span>
        <zds-button flavour="primary" size="small" shape=${this.shape} ?disabled=${this.off} @click=${() => this.input?.click()}>${S.selectFiles}</zds-button>
        ${this.showCaption ? html `<span class="caption">${this.caption}</span>` : nothing}
        ${this.state === "error" && message ? html `<span class="error" role="alert">
          <zds-icon name="error" size="small" .iconStyle=${this.shape === "sharp" ? "sharp" : "rounded"}></zds-icon><span>${message}</span></span>` : nothing}
        <input type="file" hidden accept=${this.accept ?? nothing} ?multiple=${this.multiple} ?disabled=${this.off}
          @change=${(e) => { const i = e.target; this.take(i.files); i.value = ""; }} />
      </div>
      <div class="files" ?hidden=${!this.hasFiles}><slot @slotchange=${this.syncRows}></slot></div>`;
    }
};
ZdsFileUpload.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsFileUpload.prototype, "state", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsFileUpload.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], ZdsFileUpload.prototype, "caption", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-caption", converter: { fromAttribute: (v) => v !== "false" } })
], ZdsFileUpload.prototype, "showCaption", void 0);
__decorate([
    property({ type: String })
], ZdsFileUpload.prototype, "accept", void 0);
__decorate([
    property({ type: Number, attribute: "max-file-bytes" })
], ZdsFileUpload.prototype, "maxFileBytes", void 0);
__decorate([
    property({ type: Number, attribute: "max-files" })
], ZdsFileUpload.prototype, "maxFiles", void 0);
__decorate([
    property({ type: Boolean })
], ZdsFileUpload.prototype, "multiple", void 0);
__decorate([
    property({ type: String })
], ZdsFileUpload.prototype, "error", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsFileUpload.prototype, "disabled", void 0);
__decorate([
    property({ attribute: false })
], ZdsFileUpload.prototype, "strings", void 0);
__decorate([
    state()
], ZdsFileUpload.prototype, "dragging", void 0);
__decorate([
    state()
], ZdsFileUpload.prototype, "refusal", void 0);
__decorate([
    state()
], ZdsFileUpload.prototype, "hasFiles", void 0);
__decorate([
    query("input")
], ZdsFileUpload.prototype, "input", void 0);
ZdsFileUpload = __decorate([
    customElement("zds-file-upload")
], ZdsFileUpload);
export { ZdsFileUpload };
