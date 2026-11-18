import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./file-upload-item.styles.js";
import "../file-indicator/file-indicator.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../button/button.js";
import "../progress-bar/progress-bar.js";
import "../progress-circle/progress-circle.js";
import type { IconName } from "@zebra-design-system/icons/names";
import type { FileIndicatorType } from "../file-indicator/file-indicator.js";

export type FileUploadStatus = "waiting" | "uploading" | "complete" | "error";
export type FileUploadIndicator = "bar" | "ring";

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
export type FileUploadItemStrings = typeof fileUploadItemStrings;

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
/** Bytes as the product would phrase them: KB under a megabyte, MB with one decimal above. */
export const formatFileSize = (n: number) =>
  n >= 1048576 ? `${Math.round((n / 1048576) * 10) / 10} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;

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
@customElement("zds-file-upload-item")
export class ZdsFileUploadItem extends LitElement {
  static styles = styles;

  /** Set by the product as the upload moves on; never derived. */
  @property({ type: String, reflect: true }) status: FileUploadStatus = "waiting";
  /** bar: a Progress Bar under the meta line (rows grow). ring: a Progress Circle at the end (rows keep one height). */
  @property({ type: String, reflect: true }) indicator: FileUploadIndicator = "bar";
  /** Set by the File Upload it sits in. */
  @property({ type: String, reflect: true }) shape: "rounded" | "sharp" = "rounded";
  /** The trailing cancel or delete. Off for lists that must not be edited; on a ring row it also turns off cancel in the circle. */
  @property({ type: Boolean, attribute: "show-dismiss", converter: { fromAttribute: (v) => v !== "false" } }) showDismiss = true;
  @property({ type: String, attribute: "file-name" }) fileName = "";
  /** Badges the file indicator. Defaults to the file name's extension. */
  @property({ type: String }) extension: string | null = null;
  @property({ type: String, attribute: "indicator-type" }) indicatorType: FileIndicatorType = "extension";
  /** Total size in bytes, for the meta line. */
  @property({ type: Number }) size: number | null = null;
  /** 0–100. Clamped and rounded; complete always reads 100. */
  @property({ type: Number }) progress = 0;
  /** Replaces "Failed" on an error row: say why, e.g. "Connection lost". */
  @property({ type: String, attribute: "error-text" }) errorText: string | null = null;
  @property({ attribute: false }) strings: Partial<FileUploadItemStrings> = {};

  @state() private announced = "";

  protected updated(changed: PropertyValues<this>) {
    // Announce on a change of status, never on every percent.
    if (changed.has("status") && changed.get("status") !== undefined) {
      const S = { ...fileUploadItemStrings, ...this.strings };
      this.announced = fmt(S.announce, { name: this.fileName, status: this.statusText(S) || `${this.pct}%` });
    }
  }

  private get pct() { return this.status === "complete" ? 100 : Math.round(Math.min(100, Math.max(0, this.progress))); }
  private statusText(S: FileUploadItemStrings) {
    return this.status === "waiting" ? S.waiting : this.status === "complete" ? S.complete : this.status === "error" ? (this.errorText ?? S.failed) : "";
  }
  private fire(name: string) { this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true })); }

  protected render() {
    const S = { ...fileUploadItemStrings, ...this.strings };
    const ring = this.indicator === "ring", st = this.status, pct = this.pct, name = this.fileName;
    const ext = this.extension ?? (name.includes(".") ? name.split(".").pop()! : "");
    const total = this.size !== null ? formatFileSize(this.size) : "";
    const done = this.size !== null ? formatFileSize((this.size * pct) / 100) : "";
    const icon: IconName | null = st === "waiting" ? "schedule" : st === "complete" ? "check-circle" : st === "error" ? "error" : null;
    const ctlShape = this.shape === "sharp" ? "sharp" : ring ? "full" : "rounded";
    const inFlight = st === "waiting" || st === "uploading";
    const dismiss = this.showDismiss && !(ring && st === "uploading")
      ? html`<zds-icon-button class="dismiss" flavour="subtle" size=${ring ? "large" : "small"} shape=${ctlShape}
          icon=${inFlight ? "close" : "delete-outline"} label=${fmt(inFlight ? S.cancel : S.remove, { name })}
          @click=${() => this.fire(inFlight ? "zds-cancel" : "zds-remove")}></zds-icon-button>`
      : nothing;
    const sizeText = st === "uploading"
      ? (ring && total ? fmt(S.transferredPercent, { done, total, percent: pct }) : total ? fmt(S.transferred, { done, total }) : ring ? `${pct}%` : "")
      : total;
    const retryRing = html`<zds-icon-button flavour="subtle" size="large" shape=${ctlShape} icon="refresh"
      label=${fmt(S.retryNamed, { name })} @click=${() => this.fire("zds-retry")}></zds-icon-button>`;
    return html`<div class="row">
      <zds-file-indicator type=${this.indicatorType} extension=${ext} shape=${this.shape}></zds-file-indicator>
      <div class="body">
        <span class="name" title=${name}>${name}</span>
        <span class="meta">
          ${sizeText ? html`<span class="size">${sizeText}</span>` : nothing}
          ${icon ? html`<span class="status"><zds-icon name=${icon} size="small" .iconStyle=${this.shape === "sharp" ? "sharp" : "rounded"}></zds-icon><span>${this.statusText(S)}</span></span>` : nothing}
        </span>
        ${!ring && st === "uploading" ? html`<span class="progress">
          <zds-progress-bar .value=${pct} size="small" shape=${this.shape} .showLabel=${false} label=${name}></zds-progress-bar>
          <span class="percent">${pct}%</span></span>` : nothing}
        ${!ring && st === "error" ? html`<zds-button class="retry" flavour="text" size="small" shape=${this.shape} leading-icon="refresh"
          @click=${() => this.fire("zds-retry")}>${S.retry}</zds-button>` : nothing}
      </div>
      ${ring && st === "uploading" ? html`<zds-progress-circle .value=${pct} size="medium" .rounded=${this.shape !== "sharp"} upload
        .showCancel=${this.showDismiss} cancel-label=${fmt(S.cancel, { name })} label=${name}></zds-progress-circle>` : nothing}
      ${ring ? (st === "error" || dismiss !== nothing ? html`<span class="actions">${st === "error" ? retryRing : nothing}${dismiss}</span>` : nothing) : dismiss}
      <span class="sr-only" role="status">${this.announced}</span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-file-upload-item": ZdsFileUploadItem;
  }
}
