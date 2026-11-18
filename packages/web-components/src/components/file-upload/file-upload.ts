import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./file-upload.styles.js";
import "../button/button.js";
import "../icon/icon.js";
import "../file-upload-item/file-upload-item.js";
import { formatFileSize } from "../file-upload-item/file-upload-item.js";

export type FileUploadState = "default" | "dragging" | "error" | "disabled";
export type FileUploadShape = "rounded" | "sharp";
export type FileUploadRejectReason = "type" | "size" | "count";
export interface FileUploadRejection { file: File; reason: FileUploadRejectReason }

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
export type FileUploadStrings = typeof fileUploadStrings;

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
const matchesAccept = (f: File, accept: string | null) => {
  if (!accept) return true;
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
@customElement("zds-file-upload")
export class ZdsFileUpload extends LitElement {
  static styles = styles;

  /** The zone's state, reflected. Set it to pin one; unset, dragging, error and disabled follow what happens. */
  @property({ type: String, reflect: true }) state: FileUploadState | null = null;
  /** Reaches the zone, the button and every row inside. */
  @property({ type: String, reflect: true }) shape: FileUploadShape = "rounded";
  @property({ type: String }) caption = "Supports PDF, PNG and JPG. Max file size 10 MB.";
  @property({ type: Boolean, attribute: "show-caption", converter: { fromAttribute: (v) => v !== "false" } }) showCaption = true;
  @property({ type: String }) accept: string | null = null;
  @property({ type: Number, attribute: "max-file-bytes" }) maxFileBytes: number | null = null;
  @property({ type: Number, attribute: "max-files" }) maxFiles: number | null = null;
  @property({ type: Boolean }) multiple = true;
  /** A product error for the zone, shown on the error row. */
  @property({ type: String }) error: string | null = null;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ attribute: false }) strings: Partial<FileUploadStrings> = {};

  @state() private dragging = false;
  @state() private refusal: string | null = null;
  @state() private hasFiles = false;
  private pinned: FileUploadState | null = null;
  private depth = 0;
  @query("input") private input?: HTMLInputElement;

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("state") && this.state !== this.derived()) this.pinned = this.state;
    this.state = this.pinned ?? this.derived();
  }
  private derived(): FileUploadState {
    const message = this.error ?? this.refusal;
    return this.disabled ? "disabled" : this.dragging ? "dragging" : message ? "error" : "default";
  }
  private get off() { return this.disabled || this.state === "disabled"; }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("shape")) this.syncRows();
  }
  private syncRows = () => {
    const slot = this.renderRoot.querySelector("slot");
    const rows = (slot?.assignedElements() ?? []).filter((e) => e.localName === "zds-file-upload-item");
    rows.forEach((r) => r.setAttribute("shape", this.shape));
    this.hasFiles = rows.length > 0 || (slot?.assignedElements().length ?? 0) > 0;
  };

  private take(list: FileList | null) {
    if (!list || this.off) return;
    const S = { ...fileUploadStrings, ...this.strings };
    const ok: File[] = [], refused: FileUploadRejection[] = [];
    for (const file of Array.from(list)) {
      if (!matchesAccept(file, this.accept)) refused.push({ file, reason: "type" });
      else if (this.maxFileBytes !== null && file.size > this.maxFileBytes) refused.push({ file, reason: "size" });
      else if (this.maxFiles !== null && ok.length >= this.maxFiles) refused.push({ file, reason: "count" });
      else ok.push(file);
    }
    if (ok.length) this.dispatchEvent(new CustomEvent("zds-files-selected", { detail: { files: ok }, bubbles: true, composed: true }));
    if (refused.length) this.dispatchEvent(new CustomEvent("zds-files-rejected", { detail: { rejections: refused }, bubbles: true, composed: true }));
    const r = refused[0];
    this.refusal = !r ? null : r.reason === "type" ? fmt(S.rejectType, { name: r.file.name })
      : r.reason === "size" ? fmt(S.rejectSize, { name: r.file.name, size: formatFileSize(this.maxFileBytes ?? 0) })
        : fmt(S.rejectCount, { count: this.maxFiles ?? 0 });
  }
  private isFiles(e: DragEvent) { return !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files"); }

  protected render() {
    const S = { ...fileUploadStrings, ...this.strings };
    const message = this.error ?? this.refusal;
    return html`<div class="zone"
        @dragenter=${(e: DragEvent) => { if (this.off || !this.isFiles(e)) return; e.preventDefault(); this.depth += 1; this.dragging = true; }}
        @dragover=${(e: DragEvent) => { if (!this.off && this.isFiles(e)) e.preventDefault(); }}
        @dragleave=${() => { if (this.depth > 0 && --this.depth === 0) this.dragging = false; }}
        @drop=${(e: DragEvent) => { if (!this.isFiles(e)) return; e.preventDefault(); this.depth = 0; this.dragging = false; this.take(e.dataTransfer!.files); }}>
        <span class="headline">${this.state === "dragging" ? S.headlineDragging : S.headline}</span>
        <span class="or">${S.or}</span>
        <zds-button flavour="primary" size="small" shape=${this.shape} ?disabled=${this.off} @click=${() => this.input?.click()}>${S.selectFiles}</zds-button>
        ${this.showCaption ? html`<span class="caption">${this.caption}</span>` : nothing}
        ${this.state === "error" && message ? html`<span class="error" role="alert">
          <zds-icon name="error" size="small" .iconStyle=${this.shape === "sharp" ? "sharp" : "rounded"}></zds-icon><span>${message}</span></span>` : nothing}
        <input type="file" hidden accept=${this.accept ?? nothing} ?multiple=${this.multiple} ?disabled=${this.off}
          @change=${(e: Event) => { const i = e.target as HTMLInputElement; this.take(i.files); i.value = ""; }} />
      </div>
      <div class="files" ?hidden=${!this.hasFiles}><slot @slotchange=${this.syncRows}></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-file-upload": ZdsFileUpload;
  }
}
