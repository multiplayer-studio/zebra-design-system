var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./upload-item.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import { ZetaCancelUploadEvent } from "../../events.js";
import "./file-indicator.js";
import "../icon/icon.js";
import "../button/button.js";
import "../button/icon-button/icon-button.js";
import "../progress-indicators/progress-bar/progress-bar.js";
import "../progress-indicators/progress-circle/progress-circle.js";
const fmt = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
/** Bytes as the product would phrase them: KB under a megabyte, MB with one decimal above. */
export const formatFileSize = (n) => (n >= 1048576 ? `${Math.round((n / 1048576) * 10) / 10} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
/** One file in a File Upload list: the file indicator, the name and a meta line, and a progress readout. The status
 * is set by the product. The trailing control follows it: close while waiting or uploading, delete once complete or
 * failed, and a failed row also offers Try again. Its accessible name changes with it. `indicator` chooses between a
 * bar under the meta line, which makes the row taller, and a ring at the row's end, which keeps one height.
 *
 * Spec issues followed as intended rather than as drawn: `extension` reaches the indicator; Try again stays on a
 * failed ring row when `showDismiss` is off; `showDismiss` off also removes the cancel inside the ring; ring controls
 * are a full circle when rounded in every status.
 *
 * @slot leading - Replaces the file indicator, e.g. with a thumbnail.
 * @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when close is pressed while waiting or uploading.
 * @event {CustomEvent} remove - Fired when delete is pressed on a complete or failed row.
 * @event {CustomEvent} retry - Fired when Try again is pressed on a failed row.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8288-545
 * @storybook ?path=/docs/components-file-upload--docs
 */
let ZetaUploadItem = class ZetaUploadItem extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Set by the product as the upload moves on; never derived. */
        this.status = "waiting";
        /** bar: a Progress Bar under the meta line (rows grow). ring: a Progress Circle at the end (rows keep one height). */
        this.indicator = "bar";
        /** The trailing cancel or delete. Off for lists that must not be edited; on a ring row it also turns off the cancel in the circle. */
        this.showDismiss = true;
        /** The file's name. One line, ellipsised. */
        this.fileName = "";
        /** The file indicator's type. */
        this.indicatorType = "extension";
        /** 0–100. Clamped and rounded; complete always reads 100. */
        this.progress = 0;
        /** Status label while waiting. */
        this.waitingText = "Waiting";
        /** Status label once complete. */
        this.completeText = "Complete";
        /** Status label on a failed row, when there is no errorText. */
        this.failedText = "Failed";
        /** Try again's label. */
        this.retryText = "Try again";
        /** Accessible name of cancel; {name} is replaced. */
        this.cancelLabel = "Cancel upload of {name}";
        /** Accessible name of delete; {name} is replaced. */
        this.removeLabel = "Remove {name}";
        this.announced = "";
        this.cancel = () => this.dispatchEvent(new ZetaCancelUploadEvent().toEvent());
    }
    updated(changed) {
        // Announce on a change of status, never on every percent.
        if (changed.has("status") && changed.get("status") !== undefined) {
            this.announced = `${this.fileName}: ${this.statusText || `${this.pct}%`}`;
        }
    }
    get pct() {
        return this.status === "complete" ? 100 : Math.round(Math.min(100, Math.max(0, this.progress)));
    }
    get statusText() {
        return this.status === "waiting"
            ? this.waitingText
            : this.status === "complete"
                ? this.completeText
                : this.status === "error"
                    ? (this.errorText ?? this.failedText)
                    : "";
    }
    fire(name) {
        this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
    }
    render() {
        const ring = this.indicator === "ring", st = this.status, pct = this.pct, name = this.fileName;
        const ext = this.extension ?? (name.includes(".") ? name.split(".").pop() : "");
        const total = this.size !== undefined ? formatFileSize(this.size) : "";
        const done = this.size !== undefined ? formatFileSize((this.size * pct) / 100) : "";
        const icon = st === "waiting" ? "schedule" : st === "complete" ? "check_circle" : st === "error" ? "error" : null;
        const shape = !this.rounded ? "sharp" : ring ? "full" : "rounded";
        const inFlight = st === "waiting" || st === "uploading";
        const dismiss = this.showDismiss && !(ring && st === "uploading")
            ? html `<zeta-icon-button
            class="dismiss"
            flavor="subtle"
            size=${ring ? "large" : "small"}
            shape=${shape}
            aria-label=${fmt(inFlight ? this.cancelLabel : this.removeLabel, { name })}
            @click=${() => (inFlight ? this.cancel() : this.fire("remove"))}
            >${inFlight ? "close" : "delete_outline"}</zeta-icon-button
          >`
            : nothing;
        const sizeText = st === "uploading" ? (total ? `${done} of ${total}${ring ? ` · ${pct}%` : ""}` : ring ? `${pct}%` : "") : total;
        return html `<div class="row">
      <slot name="leading"><zeta-file-indicator type=${this.indicatorType} extension=${ext} .rounded=${this.rounded}></zeta-file-indicator></slot>
      <div class="body">
        <span class="name" title=${name}>${name || html `<slot></slot>`}</span>
        <span class="meta">
          ${sizeText ? html `<span class="size">${sizeText}</span>` : nothing}
          ${icon ? html `<span class="status"><zeta-icon .rounded=${this.rounded}>${icon}</zeta-icon><span>${this.statusText}</span></span>` : nothing}
        </span>
        ${!ring && st === "uploading"
            ? html `<span class="progress"
                ><zeta-progress-bar .value=${pct / 100} size="small" .rounded=${this.rounded}></zeta-progress-bar><span class="percent">${pct}%</span></span
              >`
            : nothing}
        ${!ring && st === "error"
            ? html `<zeta-button
                class="retry"
                flavor="text"
                size="small"
                shape=${this.rounded ? "rounded" : "sharp"}
                .leadingIcon=${"refresh"}
                @click=${() => this.fire("retry")}
                >${this.retryText}</zeta-button
              >`
            : nothing}
      </div>
      ${ring && st === "uploading"
            ? html `<zeta-progress-circle
              size="48"
              .progress=${pct}
              ?upload=${this.showDismiss}
              .rounded=${this.rounded}
              cancel-label=${fmt(this.cancelLabel, { name })}
              label=${name}
            ></zeta-progress-circle>`
            : nothing}
      ${ring
            ? st === "error" || dismiss !== nothing
                ? html `<span class="actions"
                >${st === "error"
                    ? html `<zeta-icon-button flavor="subtle" size="large" shape=${shape} aria-label=${this.retryText} @click=${() => this.fire("retry")}
                        >refresh</zeta-icon-button
                      >`
                    : nothing}${dismiss}</span
              >`
                : nothing
            : dismiss}
      <span class="sr-only" role="status">${this.announced}</span>
    </div>`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaUploadItem.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaUploadItem.prototype, "indicator", void 0);
__decorate([
    property({ type: Boolean })
], ZetaUploadItem.prototype, "showDismiss", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "fileName", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "extension", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "indicatorType", void 0);
__decorate([
    property({ type: Number })
], ZetaUploadItem.prototype, "size", void 0);
__decorate([
    property({ type: Number })
], ZetaUploadItem.prototype, "progress", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "errorText", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "waitingText", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "completeText", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "failedText", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "retryText", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "cancelLabel", void 0);
__decorate([
    property({ type: String })
], ZetaUploadItem.prototype, "removeLabel", void 0);
__decorate([
    state()
], ZetaUploadItem.prototype, "announced", void 0);
ZetaUploadItem = __decorate([
    customElement("zeta-upload-item")
], ZetaUploadItem);
export { ZetaUploadItem };
//# sourceMappingURL=upload-item.js.map