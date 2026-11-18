import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./chat-photos.styles.js";
import "../icon/icon.js";

/**
 * Photos grouped as one grid: one full width, two equal tiles, or one large
 * tile beside two stacked, the last counting what does not fit. `count` is
 * derived from `photos` and reflected.
 *
 * @fires zds-open - A photo was activated (when `clickable`). `detail.index`.
 * @spec specs/chat-message/chat-message.spec.json
 */
@customElement("zds-chat-photos")
export class ZdsChatPhotos extends LitElement {
  static styles = styles;
  /** Image URLs. Up to three show; the rest are counted on the last tile. */
  @property({ attribute: false }) photos: string[] = [];
  @property({ type: Boolean, attribute: "show-icon" }) showIcon = true;
  @property({ type: Boolean, reflect: true }) rounded = true;
  @property({ type: Boolean }) clickable = false;
  @property({ type: String, reflect: true }) count: "1" | "2" | "3" | "more" = "1";

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("photos")) this.count = this.photos.length >= 4 ? "more" : (String(Math.max(1, this.photos.length)) as "1" | "2" | "3");
  }
  private tile(src: string | undefined, i: number) {
    const inner = src ? html`<img src=${src} alt=${`Photo ${i + 1}`} />` : this.showIcon ? html`<zds-icon name="image"></zds-icon>` : nothing;
    return this.clickable
      ? html`<button type="button" class="photo" @click=${() => this.dispatchEvent(new CustomEvent("zds-open", { detail: { index: i }, bubbles: true, composed: true }))}>${inner}</button>`
      : html`<span class="photo">${inner}</span>`;
  }
  protected render() {
    const p = this.photos, extra = p.length - 3;
    return html`${this.tile(p[0], 0)}
      ${p.length === 2 ? this.tile(p[1], 1) : nothing}
      ${p.length >= 3 ? html`<span class="stack">${this.tile(p[1], 1)}${this.tile(p[2], 2)}</span>` : nothing}
      ${extra > 0 ? html`<span class="extra">+${extra}</span>` : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-chat-photos": ZdsChatPhotos }
}
