import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { msg } from "@lit/localize";
import styles from "./file-upload.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import { formatFileSize } from "../upload-item/upload-item.js";
import "../button/button.js";
import "../icon/icon.js";

export type FileUploadState = "default" | "dragging" | "error" | "disabled";
export interface FileUploadRejection {
  file: File;
  reason: "type" | "size" | "count";
}

const matchesAccept = (f: File, accept?: string) => {
  if (!accept) return true;
  const type = f.type.toLowerCase(),
    name = f.name.toLowerCase();
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
@customElement("zeta-file-upload")
export class ZetaFileUpload extends Contourable(LitElement) {
  /** The zone's state, reflected. Set it to pin one; unset, dragging, error and disabled follow what happens. */
  @property({ type: String, reflect: true }) state?: FileUploadState;

  /** The headline text. */
  @property({ type: String }) headline: string = msg("Drop files here to upload");

  /** The headline while files are over the zone. */
  @property({ type: String }) headlineDragging: string = msg("Release to upload");

  /** The Select files button's label. */
  @property({ type: String }) selectFilesText: string = msg("Select files");

  /** The caption naming what is accepted. */
  @property({ type: String }) caption: string = "Supports PDF, PNG and JPG. Max file size 10 MB.";

  /** Shows the caption. */
  @property({ type: Boolean }) showCaption = true;

  /**
   * A comma separated list of accepted file formats.
   *
   * For more information see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#additional_attributes.
   */
  @property({ type: String }) accept?: string;

  /** Largest file, in bytes. */
  @property({ type: Number }) maxFileBytes?: number;

  /** Most files in one pick or drop. */
  @property({ type: Number }) maxFiles?: number;

  /** Allows multiple files to be added to the input. Also affects drag and drop. */
  @property({ type: Boolean }) multiple = true;

  /** The name given to the file input. */
  @property({ type: String }) name?: string;

  /** A product error for the zone, shown on the error row. */
  @property({ type: String }) errorMessage?: string;

  /** No drops or picks. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  @state() private dragging = false;
  @state() private refusal: string | null = null;
  @state() private hasFiles = false;
  private pinned?: FileUploadState;
  private depth = 0;

  @query("input") fileInput?: HTMLInputElement;

  private derived(): FileUploadState {
    return this.disabled ? "disabled" : this.dragging ? "dragging" : (this.errorMessage ?? this.refusal) ? "error" : "default";
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("state") && this.state !== this.derived()) this.pinned = this.state;
    this.state = this.pinned ?? this.derived();
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("rounded")) this.passShape();
  }

  private get off() {
    return this.disabled || this.state === "disabled";
  }

  private rows() {
    return (this.renderRoot.querySelector("slot")?.assignedElements() ?? []).filter(e => e.localName === "zeta-upload-item");
  }

  /** Passes `rounded` to the rows; called on a shape change, so it sets no state of its own. */
  private passShape() {
    this.rows().forEach(r => ((r as unknown as { rounded: boolean }).rounded = !!this.rounded));
  }

  private syncRows = () => {
    this.passShape();
    this.hasFiles = (this.renderRoot.querySelector("slot")?.assignedElements() ?? []).length > 0;
  };

  private take(list: FileList | null) {
    if (!list || this.off) return;
    const ok: File[] = [],
      refused: FileUploadRejection[] = [];
    for (const file of Array.from(list)) {
      if (!matchesAccept(file, this.accept)) refused.push({ file, reason: "type" });
      else if (this.maxFileBytes !== undefined && file.size > this.maxFileBytes) refused.push({ file, reason: "size" });
      else if (this.maxFiles !== undefined && ok.length >= this.maxFiles) refused.push({ file, reason: "count" });
      else ok.push(file);
    }
    if (ok.length) this.dispatchEvent(new CustomEvent("filesselected", { detail: { files: ok }, bubbles: true, composed: true }));
    if (refused.length) this.dispatchEvent(new CustomEvent("filesrejected", { detail: { rejections: refused }, bubbles: true, composed: true }));
    const r = refused[0];
    this.refusal = !r
      ? null
      : r.reason === "type"
        ? msg(`${r.file.name} isn't a supported file type.`)
        : r.reason === "size"
          ? msg(`${r.file.name} is over the ${formatFileSize(this.maxFileBytes ?? 0)} limit.`)
          : msg(`You can upload up to ${this.maxFiles ?? 0} files.`);
  }

  private isFiles(e: DragEvent) {
    return !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files");
  }

  protected override render() {
    const message = this.errorMessage ?? this.refusal;
    return html`<div
        class="zone"
        @dragenter=${(e: DragEvent) => {
          if (this.off || !this.isFiles(e)) return;
          e.preventDefault();
          this.depth += 1;
          this.dragging = true;
        }}
        @dragover=${(e: DragEvent) => {
          if (!this.off && this.isFiles(e)) e.preventDefault();
        }}
        @dragleave=${() => {
          if (this.depth > 0 && --this.depth === 0) this.dragging = false;
        }}
        @drop=${(e: DragEvent) => {
          if (!this.isFiles(e)) return;
          e.preventDefault();
          this.depth = 0;
          this.dragging = false;
          this.take(e.dataTransfer!.files);
        }}
      >
        <span class="headline">${this.state === "dragging" ? this.headlineDragging : this.headline}</span>
        <span class="or">${msg("or")}</span>
        <zeta-button size="small" shape=${this.rounded ? "rounded" : "sharp"} ?disabled=${this.off} @click=${() => this.fileInput?.click()}
          >${this.selectFilesText}</zeta-button
        >
        ${this.showCaption ? html`<span class="caption">${this.caption}</span>` : nothing}
        ${
          this.state === "error" && message
            ? html`<span class="error" role="alert"><zeta-icon .rounded=${this.rounded}>error</zeta-icon><span>${message}</span></span>`
            : nothing
        }
        <input
          type="file"
          hidden
          id=${ifDefined(this.id || undefined)}
          name=${ifDefined(this.name)}
          accept=${ifDefined(this.accept)}
          .multiple=${this.multiple}
          ?disabled=${this.off}
          @change=${(e: Event) => {
            const i = e.target as HTMLInputElement;
            this.take(i.files);
            i.value = "";
          }}
        />
      </div>
      <div class="files" ?hidden=${!this.hasFiles}><slot @slotchange=${this.syncRows}></slot></div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-file-upload": ZetaFileUpload;
  }
}
