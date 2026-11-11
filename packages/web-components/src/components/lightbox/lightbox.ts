import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./lightbox.styles.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import { defaultTrue } from "../chip/chip.js";
import { lockScroll, unlockScroll, deepActiveElement } from "../dialog/dialog.js";
import { raiseScrim, lowerScrim } from "../scrim/scrim.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type LightboxKind = "image" | "video" | "pdf" | "other";
export type LightboxShape = "rounded" | "sharp";
/** Why the open state changed. */
export type LightboxOpenChangeReason = "close" | "escape" | "backdrop" | "other";

export interface LightboxItem {
  /** Where the content lives: a URL, or a File (an object URL is made and revoked). One of the two. */
  src?: string;
  file?: File;
  /** The name in the toolbar and on the download. Defaults to the file's name, or the URL's last segment. */
  name?: string;
  /** MIME type, when neither the file nor the name can say. */
  type?: string;
}

/** Every string the lightbox shows or announces, so a product can localise it. */
export const lightboxStrings = {
  close: "Close",
  openInNew: "Open in a new tab",
  download: "Download",
  previous: "Previous",
  next: "Next",
  counter: "{index} of {count}",
  noPreview: "No preview for this file",
  untitled: "File",
};
export type LightboxStrings = typeof lightboxStrings;

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

/** What the item is, from its MIME type first and its name's extension second. */
export const lightboxKindOf = (item: LightboxItem): LightboxKind => {
  const type = (item.type ?? item.file?.type ?? "").toLowerCase();
  const name = (item.name ?? item.file?.name ?? item.src ?? "").toLowerCase().split(/[?#]/)[0];
  if (type.startsWith("image/") || /\.(png|jpe?g|gif|webp|avif|svg)$/.test(name)) return "image";
  if (type.startsWith("video/") || /\.(mp4|webm|mov|m4v)$/.test(name)) return "video";
  if (type === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  return "other";
};

/** The glyph on the unpreviewable sheet: the broad family of the file. */
const SHEET_ICON = (item: LightboxItem): IconName => {
  const type = (item.type ?? item.file?.type ?? "").toLowerCase();
  if (type.startsWith("audio/")) return "audio";
  return "document";
};

const nameOf = (item: LightboxItem, fallback: string) =>
  item.name ?? item.file?.name ?? item.src?.split(/[?#]/)[0].split("/").pop() ?? fallback;

/**
 * A full-size preview over the page: images, videos and PDFs render
 * themselves; anything else shows a drawn file sheet with its glyph and
 * "no preview". A toolbar names the item and offers open in a new tab,
 * download and close; previous / next page through the items (buttons and
 * arrow keys). Each control hides behind its `show-*` attribute.
 *
 * Paging slides a track of frames rather than swapping one for another: the
 * neighbouring items stay mounted either side of the current one, so moving
 * between them never reloads media or flickers, and the old frame glides out
 * as the new one glides in on one CSS transition (`animated`, yielding to
 * reduced motion). The stage's height follows the current frame on the same
 * timing, measured again when media reports real dimensions — sizes arrive
 * after mount, so the first measure is never final. Opening is different: the
 * panel springs in from the bottom (animations/spring) with the stage already
 * at the first frame's height — the height never animates on open.
 *
 * Modal behaviour — the top layer, the inert page, Escape, scroll lock and
 * focus return — comes from the native `<dialog>` and `showModal()`, exactly
 * as `zds-dialog`. Kept in step with packages/react-baseui `<Lightbox>`.
 *
 * @fires zds-open-change - `{ open, reason }` when close, Escape or the backdrop closes it. Not fired for a programmatic `open` change.
 * @fires zds-index-change - `{ index }` when paging changes the current item.
 * @part lightbox - The panel.
 * @part stage - The media well.
 *
 * @spec specs/lightbox/lightbox.spec.json
 */
@customElement("zds-lightbox")
export class ZdsLightbox extends LitElement {
  static styles = styles;

  /** Whether the lightbox is open. Reflected. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The items being previewed. One is fine; the navigation then hides itself. */
  @property({ attribute: false }) items: LightboxItem[] = [];

  /** Which item shows. */
  @property({ type: Number, reflect: true }) index = 0;

  /** The open-in-a-new-tab control. `show-open-in-new="false"` removes it. */
  @property({ type: Boolean, attribute: "show-open-in-new", reflect: true, converter: defaultTrue }) showOpenInNew = true;

  /** The download control. `show-download="false"` removes it. */
  @property({ type: Boolean, attribute: "show-download", reflect: true, converter: defaultTrue }) showDownload = true;

  /** The previous / next controls and arrow keys. Hidden anyway with one item. */
  @property({ type: Boolean, attribute: "show-navigation", reflect: true, converter: defaultTrue }) showNavigation = true;

  /** Corner radius, and the glyph family of every icon. */
  @property({ type: String, reflect: true }) shape: LightboxShape = "rounded";

  /**
   * Slide between frames when paging, the old one leaving as the new one
   * arrives. On by default; it always yields to the reduced-motion preference.
   */
  @property({ type: Boolean, reflect: true, converter: defaultTrue }) animated = true;

  /** Replaces any of the lightbox's texts — see `lightboxStrings` for the keys and defaults. */
  @property({ attribute: false }) strings: Partial<LightboxStrings> = {};

  /**
   * Renders the panel in normal flow, always shown, with no backdrop, focus
   * trap or dismissal — the component exactly as the spec draws it, for
   * documentation and screenshots.
   */
  @property({ type: Boolean, reflect: true }) inline = false;

  @query("dialog") private dialogEl?: HTMLDialogElement;
  @query("zds-scrim") private scrimEl?: HTMLElement;
  @query(".stage") private stageEl?: HTMLElement;

  // The stage takes the current frame's height, re-measured when its media
  // gets real dimensions; the CSS transition does the gliding. State rendered
  // as a style, not an imperative write: a transition needs a length on both
  // sides (auto never interpolates).
  @state() private stageHeight: number | null = null;
  // The first shown frame appears in place: transitions switch on one frame
  // after opening, so only real paging slides.
  @state() private settled = false;

  private returnFocus: HTMLElement | null = null;
  private locked = false;
  private settleFrame = 0;
  // Object URLs for File items, keyed by the item, revoked on change/teardown.
  private urls = new Map<LightboxItem, string>();

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.locked) { unlockScroll(); this.locked = false; }
    cancelAnimationFrame(this.settleFrame);
    this.revokeAll();
  }

  /** Opens the lightbox, optionally at an item (same as setting `index` and `open`). */
  show(index?: number) {
    if (index !== undefined) this.index = index;
    this.open = true;
  }

  /** Closes the lightbox (same as `open = false`). */
  close() { this.open = false; }

  private get s(): LightboxStrings { return { ...lightboxStrings, ...this.strings }; }

  private urlFor(item: LightboxItem): string | null {
    if (item.file) {
      let u = this.urls.get(item);
      if (!u) { u = URL.createObjectURL(item.file); this.urls.set(item, u); }
      return u;
    }
    return item.src ?? null;
  }

  private revokeAll() {
    for (const u of this.urls.values()) URL.revokeObjectURL(u);
    this.urls.clear();
  }

  /** A user-originated close: update `open` and announce it. */
  private setClosed(reason: LightboxOpenChangeReason) {
    if (!this.open) return;
    this.open = false;
    this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open: false, reason }, bubbles: true, composed: true }));
  }

  private setIndex(index: number) {
    const next = Math.max(0, Math.min(this.items.length - 1, index));
    if (next === this.index) return;
    this.settled = true; // paging arms the transitions even if no media ever reported a size
    this.index = next;
    this.dispatchEvent(new CustomEvent("zds-index-change", { detail: { index: next }, bubbles: true, composed: true }));
  }

  private get paging() { return this.showNavigation && this.items.length > 1; }
  private prev = () => { if (this.paging) this.setIndex(this.index - 1); };
  private next = () => { if (this.paging) this.setIndex(this.index + 1); };

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); this.next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); this.prev(); }
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); this.setClosed("escape"); }
  };

  private onCancel = (e: Event) => { e.preventDefault(); this.setClosed("escape"); };

  private onDialogClick = (e: MouseEvent) => {
    const dlg = this.dialogEl;
    if (!dlg || e.target !== dlg) return;
    // The ::backdrop hit-tests as the <dialog> itself; test the point against
    // the panel box, as zds-dialog does.
    const r = dlg.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) this.setClosed("backdrop");
  };

  // The current frame reported real dimensions: take the height without
  // animating, then arm the transitions one painted frame later.
  private onMediaSized = () => {
    this.measure();
    if (!this.settled) {
      cancelAnimationFrame(this.settleFrame);
      this.settleFrame = requestAnimationFrame(() => { this.settled = true; });
    }
  };

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("open") || changed.has("inline")) this.syncDialog();
    if (changed.has("items")) { this.revokeAll(); this.stageHeight = null; }
    if (changed.has("index") || changed.has("open") || changed.has("items")) this.measure();
    // A frame slid out of view must not keep talking.
    if (changed.has("index")) {
      for (const v of this.renderRoot.querySelectorAll<HTMLVideoElement>("video")) {
        if (!v.closest(`[data-slot="${this.index}"]`)) v.pause();
      }
    }
  }

  private syncDialog() {
    const dlg = this.dialogEl;
    cancelAnimationFrame(this.settleFrame);
    if (this.inline || !dlg) {
      if (this.locked) { unlockScroll(); this.locked = false; }
      this.settled = true;
      return;
    }
    if (!this.open) lowerScrim(this.scrimEl);
    if (this.open && !dlg.open) {
      this.returnFocus = deepActiveElement();
      raiseScrim(this.scrimEl);
      dlg.showModal();
      if (!this.locked) { lockScroll(); this.locked = true; }
      // The panel springs in pre-sized; the height and track transitions arm
      // only once the current frame reports its real size, or on the first
      // page — never on open itself (see onMediaSized / setIndex).
      this.settled = false;
      // Initial focus: the close button, as the first control after the name.
      this.renderRoot.querySelector<HTMLElement>(".actions zds-icon-button:last-of-type")?.focus();
    } else if (!this.open && dlg.open) {
      dlg.close();
      if (this.locked) { unlockScroll(); this.locked = false; }
      this.settled = false;
      const back = this.returnFocus;
      this.returnFocus = null;
      if (back?.isConnected) back.focus();
    }
  }

  /** The stage takes the current frame's height. Never trust the first measure. */
  private measure() {
    const stage = this.stageEl;
    if (!stage || (!this.open && !this.inline)) { this.stageHeight = null; return; }
    const content = stage.querySelector<HTMLElement>(`[data-slot="${this.index}"] > *`);
    if (!content) return;
    const min = parseFloat(getComputedStyle(stage).minBlockSize) || 0;
    const h = Math.max(content.getBoundingClientRect().height, min);
    if (this.stageHeight === null || Math.abs(this.stageHeight - h) >= 1) this.stageHeight = h;
  }

  private openInNew = () => {
    const url = this.items[this.index] ? this.urlFor(this.items[this.index]) : null;
    if (url) window.open(url, "_blank", "noopener");
  };

  private download = () => {
    const item = this.items[this.index];
    const url = item ? this.urlFor(item) : null;
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = nameOf(item, this.s.untitled);
    a.rel = "noopener";
    a.click();
  };

  private renderMedia(item: LightboxItem, current: boolean) {
    const url = this.urlFor(item);
    const kind = lightboxKindOf(item);
    const name = nameOf(item, this.s.untitled);
    const sized = current ? this.onMediaSized : undefined;
    if (kind === "image" && url) return html`<img class="media" src=${url} alt=${name} @load=${sized} />`;
    if (kind === "video" && url) return html`<video class="media" src=${url} controls aria-label=${name} @loadedmetadata=${sized}></video>`;
    if (kind === "pdf" && url) return html`<iframe class="document" src=${url} title=${name} @load=${sized}></iframe>`;
    return html`
      <div class="unpreviewable">
        <span class="sheet" aria-hidden="true">
          <zds-icon name=${SHEET_ICON(item)} size="large" .iconStyle=${this.shape === "sharp" ? "sharp" : "rounded"}></zds-icon>
        </span>
        <p class="no-preview">${this.s.noPreview}</p>
      </div>`;
  }

  protected render() {
    const S = this.s;
    const item = this.items[this.index];
    const name = item ? nameOf(item, S.untitled) : "";
    const url = item ? this.urlFor(item) : null;
    const sliding = this.animated && this.settled;

    const content = html`
      <div class="toolbar">
        <h2 class="name" id="name" title=${name}>${name}</h2>
        ${this.paging ? html`<span class="counter">${fmt(S.counter, { index: this.index + 1, count: this.items.length })}</span>` : nothing}
        <div class="actions">
          ${this.showOpenInNew
            ? html`<zds-icon-button flavour="subtle" size="medium" shape=${this.shape} icon="open-in-new-window"
                label=${S.openInNew} ?disabled=${!url} @click=${this.openInNew}></zds-icon-button>`
            : nothing}
          ${this.showDownload
            ? html`<zds-icon-button flavour="subtle" size="medium" shape=${this.shape} icon="download"
                label=${S.download} ?disabled=${!url} @click=${this.download}></zds-icon-button>`
            : nothing}
          <zds-icon-button flavour="subtle" size="medium" shape=${this.shape} icon="close"
            label=${S.close} @click=${() => (this.inline ? undefined : this.setClosed("close"))}></zds-icon-button>
        </div>
      </div>
      <div class="stage" part="stage" data-animated=${sliding || nothing}
        style=${this.stageHeight !== null ? `block-size: ${this.stageHeight}px` : nothing}>
        <div class="track" style=${`translate: calc(${-this.index} * 100%) 0`}>
          ${this.items.map((it, i) => {
            const near = Math.abs(i - this.index) <= 1;
            const current = i === this.index;
            return html`<div class="slot" data-slot=${i} aria-hidden=${current ? nothing : "true"} ?inert=${!current}>
              ${near ? this.renderMedia(it, current) : nothing}
            </div>`;
          })}
        </div>
        ${this.paging
          ? html`
            <!-- Contrast: the strongest neutral, so the arrows read over any media. -->
            <zds-icon-button class="prev" flavour="contrast" size="medium" shape=${this.shape} icon="chevron-left"
              label=${S.previous} ?disabled=${this.index === 0} @click=${this.prev}></zds-icon-button>
            <zds-icon-button class="next" flavour="contrast" size="medium" shape=${this.shape} icon="chevron-right"
              label=${S.next} ?disabled=${this.index === this.items.length - 1} @click=${this.next}></zds-icon-button>`
          : nothing}
      </div>
    `;

    return this.inline
      ? html`<div class="panel inline" part="lightbox" role="dialog" aria-labelledby="name" @keydown=${this.onKeydown}>${content}</div>`
      : html`<zds-scrim popover="manual" tone="scrim"></zds-scrim><dialog class="panel" part="lightbox" aria-labelledby="name"
          @keydown=${this.onKeydown} @cancel=${this.onCancel} @click=${this.onDialogClick}>${content}</dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-lightbox": ZdsLightbox;
  }
  interface HTMLElementEventMap {
    "zds-index-change": CustomEvent<{ index: number }>;
  }
}
