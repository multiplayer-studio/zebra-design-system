var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./file-upload-item.styles.js";
import "../file-indicator/file-indicator.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../button/button.js";
import "../progress-bar/progress-bar.js";
import "../progress-circle/progress-circle.js";
/** Every string a row shows or announces. `{name}`, `{done}`, `{total}`, `{percent}`, `{status}` are filled in. */
export const fileUploadItemStrings = {
    waiting: "Waiting",
    complete: "Complete",
    failed: "Failed",
    transferred: "{done} of {total}",
    transferredPercent: "{done} of {total} · {percent}%",
    cancel: "Cancel upload of {name}",
    remove: "Remove {name}",
    retry: "Try again",
    retryNamed: "Try uploading {name} again",
    announce: "{name}: {status}",
};
const fmt = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
/** Bytes as the product would phrase them: KB under a megabyte, MB with one decimal above. */
export const formatFileSize = (n) => n >= 1048576 ? `${Math.round((n / 1048576) * 10) / 10} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
/**
 * One file in a File Upload list: the file indicator, the name and a meta
 * line, and a progress readout. The trailing control follows the status:
 * close while waiting or uploading, delete once complete or failed, and a
 * failed row also offers Try again. Its accessible name changes with it.
 *
 * Spec issues followed as intended rather than as drawn: `extension`
 * reaches the indicator; Try again stays on a failed ring row when
 * `show-dismiss` is off; `show-dismiss` off also removes the cancel inside
 * the ring; ring controls are a full circle when rounded in every status.
 * Kept in step with packages/react-baseui `<FileUploadItem>`.
 *
 * @fires zds-cancel - Close pressed while waiting or uploading.
 * @fires zds-remove - Delete pressed on a complete or failed row.
 * @fires zds-retry - Try again pressed on a failed row.
 *
 * @spec specs/file-upload/file-upload.spec.json
 */
let ZdsFileUploadItem = class ZdsFileUploadItem extends LitElement {
    constructor() {
        super(...arguments);
        /** Set by the product as the upload moves on; never derived. */
        this.status = "waiting";
        /** bar: a Progress Bar under the meta line (rows grow). ring: a Progress Circle at the end (rows keep one height). */
        this.indicator = "bar";
        /** Set by the File Upload it sits in. */
        this.shape = "rounded";
        /** The trailing cancel or delete. Off for lists that must not be edited; on a ring row it also turns off cancel in the circle. */
        this.showDismiss = true;
        this.fileName = "";
        /** Badges the file indicator. Defaults to the file name's extension. */
        this.extension = null;
        this.indicatorType = "extension";
        /** Total size in bytes, for the meta line. */
        this.size = null;
        /** 0–100. Clamped and rounded; complete always reads 100. */
        this.progress = 0;
        /** Replaces "Failed" on an error row: say why, e.g. "Connection lost". */
        this.errorText = null;
        this.strings = {};
        this.announced = "";
    }
    updated(changed) {
        // Announce on a change of status, never on every percent.
        if (changed.has("status") && changed.get("status") !== undefined) {
            const S = { ...fileUploadItemStrings, ...this.strings };
            this.announced = fmt(S.announce, { name: this.fileName, status: this.statusText(S) || `${this.pct}%` });
        }
    }
    get pct() { return this.status === "complete" ? 100 : Math.round(Math.min(100, Math.max(0, this.progress))); }
    statusText(S) {
        return this.status === "waiting" ? S.waiting : this.status === "complete" ? S.complete : this.status === "error" ? (this.errorText ?? S.failed) : "";
    }
    fire(name) { this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true })); }
    render() {
        const S = { ...fileUploadItemStrings, ...this.strings };
        const ring = this.indicator === "ring", st = this.status, pct = this.pct, name = this.fileName;
        const ext = this.extension ?? (name.includes(".") ? name.split(".").pop() : "");
        const total = this.size !== null ? formatFileSize(this.size) : "";
        const done = this.size !== null ? formatFileSize((this.size * pct) / 100) : "";
        const icon = st === "waiting" ? "schedule" : st === "complete" ? "check-circle" : st === "error" ? "error" : null;
        const ctlShape = this.shape === "sharp" ? "sharp" : ring ? "full" : "rounded";
        const inFlight = st === "waiting" || st === "uploading";
        const dismiss = this.showDismiss && !(ring && st === "uploading")
            ? html `<zds-icon-button class="dismiss" flavour="subtle" size=${ring ? "large" : "small"} shape=${ctlShape}
          icon=${inFlight ? "close" : "delete-outline"} label=${fmt(inFlight ? S.cancel : S.remove, { name })}
          @click=${() => this.fire(inFlight ? "zds-cancel" : "zds-remove")}></zds-icon-button>`
            : nothing;
        const sizeText = st === "uploading"
            ? (ring && total ? fmt(S.transferredPercent, { done, total, percent: pct }) : total ? fmt(S.transferred, { done, total }) : ring ? `${pct}%` : "")
            : total;
        const retryRing = html `<zds-icon-button flavour="subtle" size="large" shape=${ctlShape} icon="refresh"
      label=${fmt(S.retryNamed, { name })} @click=${() => this.fire("zds-retry")}></zds-icon-button>`;
        return html `<div class="row">
      <zds-file-indicator type=${this.indicatorType} extension=${ext} shape=${this.shape}></zds-file-indicator>
      <div class="body">
        <span class="name" title=${name}>${name}</span>
        <span class="meta">
          ${sizeText ? html `<span class="size">${sizeText}</span>` : nothing}
          ${icon ? html `<span class="status"><zds-icon name=${icon} size="small" .iconStyle=${this.shape === "sharp" ? "sharp" : "rounded"}></zds-icon><span>${this.statusText(S)}</span></span>` : nothing}
        </span>
        ${!ring && st === "uploading" ? html `<span class="progress">
          <zds-progress-bar .value=${pct} size="small" shape=${this.shape} .showLabel=${false} label=${name}></zds-progress-bar>
          <span class="percent">${pct}%</span></span>` : nothing}
        ${!ring && st === "error" ? html `<zds-button class="retry" flavour="text" size="small" shape=${this.shape} leading-icon="refresh"
          @click=${() => this.fire("zds-retry")}>${S.retry}</zds-button>` : nothing}
      </div>
      ${ring && st === "uploading" ? html `<zds-progress-circle .value=${pct} size="medium" .rounded=${this.shape !== "sharp"} upload
        .showCancel=${this.showDismiss} cancel-label=${fmt(S.cancel, { name })} label=${name}></zds-progress-circle>` : nothing}
      ${ring ? (st === "error" || dismiss !== nothing ? html `<span class="actions">${st === "error" ? retryRing : nothing}${dismiss}</span>` : nothing) : dismiss}
      <span class="sr-only" role="status">${this.announced}</span>
    </div>`;
    }
};
ZdsFileUploadItem.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsFileUploadItem.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsFileUploadItem.prototype, "indicator", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsFileUploadItem.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-dismiss", converter: { fromAttribute: (v) => v !== "false" } })
], ZdsFileUploadItem.prototype, "showDismiss", void 0);
__decorate([
    property({ type: String, attribute: "file-name" })
], ZdsFileUploadItem.prototype, "fileName", void 0);
__decorate([
    property({ type: String })
], ZdsFileUploadItem.prototype, "extension", void 0);
__decorate([
    property({ type: String, attribute: "indicator-type" })
], ZdsFileUploadItem.prototype, "indicatorType", void 0);
__decorate([
    property({ type: Number })
], ZdsFileUploadItem.prototype, "size", void 0);
__decorate([
    property({ type: Number })
], ZdsFileUploadItem.prototype, "progress", void 0);
__decorate([
    property({ type: String, attribute: "error-text" })
], ZdsFileUploadItem.prototype, "errorText", void 0);
__decorate([
    property({ attribute: false })
], ZdsFileUploadItem.prototype, "strings", void 0);
__decorate([
    state()
], ZdsFileUploadItem.prototype, "announced", void 0);
ZdsFileUploadItem = __decorate([
    customElement("zds-file-upload-item")
], ZdsFileUploadItem);
export { ZdsFileUploadItem };
