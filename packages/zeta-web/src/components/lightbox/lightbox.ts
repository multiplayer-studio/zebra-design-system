import { customElement, property, state } from "lit/decorators.js";
import { LitElement, html, nothing, type PropertyValues } from "lit";
import styles from "./lightbox.styles.js";
import { Contourable, Popup } from "../../mixins/mixins.js";
import "../icon/icon.js";
import "../button/icon-button/icon-button.js";

export type LightboxKind = "image" | "video" | "pdf" | "other";

export interface LightboxItem {
  /** Where the content lives: a URL, or a File (an object URL is made and revoked). One of the two. */
  src?: string;
  file?: File;
  /** The name in the toolbar and on the download. Defaults to the file's name, or the URL's last segment. */
  name?: string;
  /** MIME type, when neither the file nor the name can say. */
  type?: string;
}

/** What the item is, from its MIME type first and its name's extension second (spec: Kind is derived, never set). */
export const lightboxKindOf = (item: LightboxItem): LightboxKind => {
  const type = (item.type ?? item.file?.type ?? "").toLowerCase();
  const name = (item.name ?? item.file?.name ?? item.src ?? "").toLowerCase().split(/[?#]/)[0];
  if (type.startsWith("image/") || /\.(png|jpe?g|gif|webp|avif|svg)$/.test(name)) return "image";
  if (type.startsWith("video/") || /\.(mp4|webm|mov|m4v)$/.test(name)) return "video";
  if (type === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  return "other";
};

const nameOf = (item: LightboxItem, fallback: string) =>
  item.name ?? item.file?.name ?? item.src?.split(/[?#]/)[0].split("/").pop() ?? fallback;

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));

/** A full-size preview over the page: images, videos and PDFs render themselves; anything else shows a drawn file
 * sheet with its glyph and "no preview". A toolbar names the item and offers open in a new tab, download and close;
 * previous / next page through the items (buttons and arrow keys). Each control hides behind its `show*` property.
 *
 * Paging slides a track of frames rather than swapping one for another: the neighbouring items stay mounted either
 * side of the current one, so moving between them never reloads media or flickers, and the stage's height follows
 * the current frame on the same timing, re-measured when media reports real dimensions — sizes arrive after mount,
 * so the first measure is never final. Opening is different: the panel springs in from the bottom (animations/spring)
 * with the stage already at the first frame's height — the height never animates on open. `animated` always yields
 * to the reduced-motion preference.
 *
 * Shown with `showModal()` / `show()` from the Popup mixin, as `zeta-dialog`; `rounded` (Contourable) maps the
 * spec's `shape` axis and picks the glyph family.
 *
 * @event {CustomEvent<{ index: number }>} change - Fired when paging changes the current item.
 * @event {CustomEvent<ZetaPopupEventDetail>} open - Fired when the lightbox is opened.
 * @event {Event} close - Fired when the lightbox is closed.
 *
 * @part dialog - The panel.
 * @part stage - The media well.
 *
 * @cssproperty --lightbox-width - Width of the panel. Defaults to control/lg x 16, capped at the viewport less space/page each side.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8186-337
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-lightbox--docs
 */
@customElement("zeta-lightbox")
export class ZetaLightbox extends Contourable(Popup(LitElement)) {
  /** The items being previewed. One is fine; the navigation then hides itself. */
  @property({ attribute: false }) items: LightboxItem[] = [];

  /** Which item shows. */
  @property({ type: Number, reflect: true }) index: number = 0;

  /** The open-in-a-new-tab control. */
  @property({ type: Boolean }) showOpenInNew: boolean = true;

  /** The download control. */
  @property({ type: Boolean }) showDownload: boolean = true;

  /** The previous / next controls and arrow keys. Hidden anyway with one item. */
  @property({ type: Boolean }) showNavigation: boolean = true;

  /** Slide between frames when paging. On by default; it always yields to the reduced-motion preference. */
  @property({ type: Boolean }) animated: boolean = true;

  /** Accessible name of the close control. */
  @property({ type: String }) closeLabel: string = "Close";

  /** Accessible name of the open-in-a-new-tab control. */
  @property({ type: String }) openInNewLabel: string = "Open in a new tab";

  /** Accessible name of the download control. */
  @property({ type: String }) downloadLabel: string = "Download";

  /** Accessible name of the previous control. */
  @property({ type: String }) previousLabel: string = "Previous";

  /** Accessible name of the next control. */
  @property({ type: String }) nextLabel: string = "Next";

  /** The counter text; {index} and {count} are replaced. */
  @property({ type: String }) counterFormat: string = "{index} of {count}";

  /** The message on the drawn file sheet for an unpreviewable item. */
  @property({ type: String }) noPreviewText: string = "No preview for this file";

  /** The toolbar name when an item carries none. */
  @property({ type: String }) untitledText: string = "File";

  /** Whether the lightbox is initially open (in flow, not modal), for documentation and screenshots. */
  @property({ type: Boolean }) initialOpen: boolean = false;

  // The stage takes the current frame's height, re-measured when its media gets
  // real dimensions; the CSS transition does the gliding. State rendered as a
  // style, not an imperative write: a transition needs a length on both sides
  // (auto never interpolates).
  @state() private stageHeight: number | null = null;
  // The first shown frame appears in place: transitions switch on one frame
  // after opening, so only real paging slides.
  @state() private settled = false;

  private settleFrame = 0;
  // Object URLs for File items, revoked on change and teardown.
  private urls = new Map<LightboxItem, string>();

  constructor() {
    super();
    // The panel springs in pre-sized; the height and track transitions arm
    // only once the current frame reports its real size, or on the first
    // page — never on open itself (see onMediaSized / setIndex).
    this.addEventListener("open", () => {
      this.settled = false;
      cancelAnimationFrame(this.settleFrame);
      this.measure();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    cancelAnimationFrame(this.settleFrame);
    this.revokeAll();
  }

  private urlFor(item: LightboxItem): string | null {
    if (item.file) {
      let u = this.urls.get(item);
      if (!u) {
        u = URL.createObjectURL(item.file);
        this.urls.set(item, u);
      }
      return u;
    }
    return item.src ?? null;
  }

  private revokeAll() {
    for (const u of this.urls.values()) URL.revokeObjectURL(u);
    this.urls.clear();
  }

  private get paging() {
    return this.showNavigation && this.items.length > 1;
  }

  private setIndex(index: number) {
    const next = Math.max(0, Math.min(this.items.length - 1, index));
    if (next === this.index) return;
    this.settled = true; // paging arms the transitions even if no media ever reported a size
    this.index = next;
    this.dispatchEvent(new CustomEvent("change", { detail: { index: next }, bubbles: true, composed: true }));
  }

  private readonly onKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (this.paging) this.setIndex(this.index + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (this.paging) this.setIndex(this.index - 1);
    }
  };

  // The current frame reported real dimensions: take the height without
  // animating, then arm the transitions one painted frame later.
  private readonly onMediaSized = () => {
    this.measure();
    if (!this.settled) {
      cancelAnimationFrame(this.settleFrame);
      this.settleFrame = requestAnimationFrame(() => (this.settled = true));
    }
  };

  protected updated(changed: PropertyValues<this>) {
    super.updated(changed);
    if (changed.has("items")) {
      this.revokeAll();
      this.stageHeight = null;
    }
    if (changed.has("index") || changed.has("items")) {
      this.measure();
      // A frame slid out of view must not keep talking.
      for (const v of this.renderRoot.querySelectorAll<HTMLVideoElement>("video")) {
        if (!v.closest(`[data-slot="${this.index}"]`)) v.pause();
      }
    }
  }

  /** The stage takes the current frame's height. Never trust the first measure. */
  private measure() {
    const stage = this.renderRoot.querySelector<HTMLElement>(".stage");
    const content = stage?.querySelector<HTMLElement>(`[data-slot="${this.index}"] > *`);
    if (!stage || !content) return;
    const min = parseFloat(getComputedStyle(stage).minHeight) || 0;
    const h = Math.max(content.getBoundingClientRect().height, min);
    if (this.stageHeight === null || Math.abs(this.stageHeight - h) >= 1) this.stageHeight = h;
  }

  private readonly openInNew = () => {
    const item = this.items[this.index];
    const url = item ? this.urlFor(item) : null;
    if (url) window.open(url, "_blank", "noopener");
  };

  private readonly download = () => {
    const item = this.items[this.index];
    const url = item ? this.urlFor(item) : null;
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = nameOf(item, this.untitledText);
    a.rel = "noopener";
    a.click();
  };

  private renderMedia(item: LightboxItem, current: boolean) {
    const url = this.urlFor(item);
    const kind = lightboxKindOf(item);
    const name = nameOf(item, this.untitledText);
    const sized = current ? this.onMediaSized : undefined;
    if (kind === "image" && url) return html`<img class="media" src=${url} alt=${name} @load=${sized} />`;
    if (kind === "video" && url) return html`<video class="media" src=${url} controls aria-label=${name} @loadedmetadata=${sized}></video>`;
    if (kind === "pdf" && url) return html`<iframe class="document" src=${url} title=${name} @load=${sized}></iframe>`;
    const type = (item.type ?? item.file?.type ?? "").toLowerCase();
    return html`
      <div class="unpreviewable">
        <span class="sheet" aria-hidden="true">
          <zeta-icon .rounded=${this.rounded}>${type.startsWith("audio/") ? "audio" : "document"}</zeta-icon>
        </span>
        <p class="no-preview">${this.noPreviewText}</p>
      </div>
    `;
  }

  protected render() {
    const item = this.items[this.index];
    const name = item ? nameOf(item, this.untitledText) : "";
    const url = item ? this.urlFor(item) : null;
    const sliding = this.animated && this.settled;
    const shape = this.rounded ? "rounded" : "sharp";

    return html`
      <dialog .returnValue=${this.returnValue} id=${this.id} ?open=${this.initialOpen} part="dialog" aria-label=${name} @keydown=${this.onKeydown}>
        <div class="toolbar">
          <h1 class="name" title=${name}>${name}</h1>
          ${this.paging ? html`<span class="counter">${fmt(this.counterFormat, { index: this.index + 1, count: this.items.length })}</span>` : nothing}
          <div class="actions">
            ${
              this.showOpenInNew
                ? html`<zeta-icon-button flavor="subtle" .rounded=${this.rounded} shape=${shape} aria-label=${this.openInNewLabel} ?disabled=${!url} @click=${this.openInNew}
                    >open_in_new_window</zeta-icon-button>`
                : nothing
            }
            ${
              this.showDownload
                ? html`<zeta-icon-button flavor="subtle" .rounded=${this.rounded} shape=${shape} aria-label=${this.downloadLabel} ?disabled=${!url} @click=${this.download}
                    >download</zeta-icon-button>`
                : nothing
            }
            <zeta-icon-button flavor="subtle" .rounded=${this.rounded} shape=${shape} aria-label=${this.closeLabel} @click=${() => this.hide("close")}
              >close</zeta-icon-button
            >
          </div>
        </div>
        <div class="stage" part="stage" data-animated=${sliding || nothing} style=${this.stageHeight !== null ? `height: ${this.stageHeight}px` : nothing}>
          <div class="track" style=${`translate: calc(${-this.index} * 100%) 0`}>
            ${this.items.map((it, i) => {
              const near = Math.abs(i - this.index) <= 1;
              const current = i === this.index;
              return html`<div class="slot" data-slot=${i} aria-hidden=${current ? nothing : "true"} ?inert=${!current}>
                ${near ? this.renderMedia(it, current) : nothing}
              </div>`;
            })}
          </div>
          ${
            this.paging
              ? html`
                  <!-- Contrast: the strongest neutral, so the arrows read over any media. -->
                  <zeta-icon-button class="prev" flavor="contrast" .rounded=${this.rounded} aria-label=${this.previousLabel} ?disabled=${this.index === 0}
                    @click=${() => this.setIndex(this.index - 1)}>chevron_left</zeta-icon-button>
                  <zeta-icon-button class="next" flavor="contrast" .rounded=${this.rounded} aria-label=${this.nextLabel}
                    ?disabled=${this.index === this.items.length - 1} @click=${() => this.setIndex(this.index + 1)}>chevron_right</zeta-icon-button>`
              : nothing
          }
        </div>
      </dialog>
    `;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-lightbox": ZetaLightbox;
  }
}
