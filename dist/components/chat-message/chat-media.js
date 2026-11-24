var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { Contourable } from "../../mixins/mixins.js";
import threadStyles from "./chat-thread.styles.js";
import photosStyles from "./chat-photos.styles.js";
import attachmentStyles from "./chat-attachment.styles.js";
import "../icon/icon.js";
import "../divider/divider.js";
import "../button/icon-button/icon-button.js";
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const LEVELS = [0.3, 0.55, 0.42, 0.85, 0.6, 1, 0.5, 0.72, 0.38, 0.9, 0.62, 0.42, 0.78, 0.5, 0.3, 0.62, 0.45, 0.26];
/** "X replies", a divider and a caret; pressing it expands the replies in place, pushing the messages below down.
 *
 * @slot - The Thread Slot: reply messages, each a zeta-chat-message.
 * @event {CustomEvent<{ open: boolean }>} toggle - Fired when the thread opens or closes.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8440-34713
 * @storybook ?path=/docs/components-chat-message--docs
 */
let ZetaChatThread = class ZetaChatThread extends LitElement {
    constructor() {
        super(...arguments);
        /** How many replies the thread holds. */
        this.replyCount = 0;
        /** Expanded, showing the replies. */
        this.open = false;
        /** The word after the count. */
        this.repliesText = "replies";
        /** The word after a count of one. */
        this.replyText = "reply";
    }
    get noun() {
        return this.replyCount === 1 ? this.replyText : this.repliesText;
    }
    toggle() {
        this.open = !this.open;
        this.dispatchEvent(new CustomEvent("toggle", { detail: { open: this.open }, bubbles: true, composed: true }));
    }
    render() {
        return html `<button
        type="button"
        aria-expanded=${String(this.open)}
        aria-controls="replies"
        aria-label=${`${this.replyCount} ${this.noun}`}
        @click=${() => this.toggle()}
      >
        <span class="count" aria-hidden="true">${this.replyCount} ${this.noun}</span>
        <zeta-divider></zeta-divider>
        <zeta-icon>${this.open ? "expand_less" : "expand_more"}</zeta-icon>
      </button>
      <div id="replies" class="replies" ?hidden=${!this.open}><slot></slot></div>`;
    }
    static { this.styles = [threadStyles]; }
};
__decorate([
    property({ type: Number })
], ZetaChatThread.prototype, "replyCount", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaChatThread.prototype, "open", void 0);
__decorate([
    property({ type: String })
], ZetaChatThread.prototype, "repliesText", void 0);
__decorate([
    property({ type: String })
], ZetaChatThread.prototype, "replyText", void 0);
ZetaChatThread = __decorate([
    customElement("zeta-chat-thread")
], ZetaChatThread);
export { ZetaChatThread };
/** Photos grouped as one grid: one full width, two equal tiles, or one large tile beside two stacked, the last
 * counting what does not fit. `count` is derived from `photos`.
 *
 * @event {CustomEvent<{ index: number }>} open - Fired when a photo is activated, when `clickable`.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19282
 * @storybook ?path=/docs/components-chat-message--docs
 */
let ZetaChatPhotos = class ZetaChatPhotos extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Image URLs. Up to three show; the rest are counted on the last tile. */
        this.photos = [];
        /** Placeholder glyph while a tile has no image. */
        this.showIcon = true;
        /** Photos open on activation. */
        this.clickable = false;
        /** Derived from `photos`. */
        this.count = "1";
    }
    willUpdate(changed) {
        if (changed.has("photos"))
            this.count = this.photos.length >= 4 ? "more" : String(Math.max(1, this.photos.length));
    }
    tile(src, i) {
        const inner = src ? html `<img src=${src} alt=${`Photo ${i + 1}`} />` : this.showIcon ? html `<zeta-icon>image</zeta-icon>` : nothing;
        return this.clickable
            ? html `<button
          type="button"
          class="photo"
          @click=${() => this.dispatchEvent(new CustomEvent("open", { detail: { index: i }, bubbles: true, composed: true }))}
        >
          ${inner}
        </button>`
            : html `<span class="photo">${inner}</span>`;
    }
    render() {
        const p = this.photos, extra = p.length - 3;
        return html `${this.tile(p[0], 0)} ${p.length === 2 ? this.tile(p[1], 1) : nothing}
    ${p.length >= 3 ? html `<span class="stack">${this.tile(p[1], 1)}${this.tile(p[2], 2)}</span>` : nothing}
    ${extra > 0 ? html `<span class="extra">+${extra}</span>` : nothing}`;
    }
    static { this.styles = [super.styles ?? [], photosStyles]; }
};
__decorate([
    property({ attribute: false })
], ZetaChatPhotos.prototype, "photos", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatPhotos.prototype, "showIcon", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatPhotos.prototype, "clickable", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaChatPhotos.prototype, "count", void 0);
ZetaChatPhotos = __decorate([
    customElement("zeta-chat-photos")
], ZetaChatPhotos);
export { ZetaChatPhotos };
/** A file tile with a download control, a video preview, or an audio waveform, in a message's attachments. Playback
 * is real when `src` is set; a playing video keeps a pause control (spec issue, as intended).
 *
 * @event {CustomEvent} download - Fired when Download is pressed on a file with no `src`.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19335
 * @storybook ?path=/docs/components-chat-message--docs
 */
let ZetaChatAttachment = class ZetaChatAttachment extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** file, video or audio. */
        this.type = "file";
        /** The file's name. */
        this.fileName = "";
        /** Type and size, e.g. "PDF · 248 KB". */
        this.fileMeta = "";
        /** Media length, e.g. "0:08". */
        this.duration = "";
        /** Media or file URL. */
        this.src = "";
        /** Video poster image. */
        this.poster = "";
        /** Placeholder glyph while there is no poster. */
        this.showIcon = true;
        /** Playing, reflected. */
        this.playing = false;
        this.progress = 0;
        this.elapsed = 0;
        this.onTime = (e) => {
            const m = e.target;
            this.elapsed = m.currentTime;
            this.progress = m.duration ? m.currentTime / m.duration : 0;
        };
    }
    toggle() {
        const m = this.media;
        if (!m) {
            this.playing = !this.playing;
            return;
        }
        if (m.paused)
            void m.play();
        else
            m.pause();
    }
    download() {
        if (this.src) {
            const a = document.createElement("a");
            a.href = this.src;
            a.download = this.fileName;
            a.click();
        }
        else
            this.dispatchEvent(new CustomEvent("download", { bubbles: true, composed: true }));
    }
    render() {
        const shape = this.rounded ? "rounded" : "sharp";
        if (this.type === "file") {
            return html `<span class="tile"><zeta-icon .rounded=${this.rounded}>document</zeta-icon></span>
        <span class="text"
          ><span class="name" title=${this.fileName}>${this.fileName}</span>${this.fileMeta ? html `<span class="meta">${this.fileMeta}</span>` : nothing}</span
        >
        <zeta-icon-button flavor="text" size="medium" shape=${shape} aria-label=${`Download ${this.fileName}`} @click=${() => this.download()}
          >download</zeta-icon-button
        >`;
        }
        const play = (cls, size) => html `<zeta-icon-button
        class=${cls}
        flavor="primary"
        size=${size}
        shape=${this.rounded ? "full" : "sharp"}
        aria-label=${this.playing ? "Pause" : "Play"}
        @click=${() => this.toggle()}
        >${this.playing ? "pause" : "play"}</zeta-icon-button
      >`;
        const ev = { play: () => (this.playing = true), pause: () => (this.playing = false), ended: () => ((this.playing = false), (this.progress = 0)) };
        if (this.type === "video") {
            return html `${this.src
                ? html `<video
              src=${this.src}
              poster=${this.poster || nothing}
              playsinline
              @play=${ev.play}
              @pause=${ev.pause}
              @ended=${ev.ended}
              @timeupdate=${this.onTime}
            ></video>`
                : this.poster
                    ? html `<img src=${this.poster} alt="" />`
                    : this.showIcon
                        ? html `<zeta-icon class="poster">image</zeta-icon>`
                        : nothing}
      ${play("play", "large")} ${this.duration && !this.playing ? html `<span class="chip">${this.duration}</span>` : nothing}`;
        }
        const played = Math.round(this.progress * LEVELS.length);
        return html `${this.src
            ? html `<audio src=${this.src} preload="metadata" @play=${ev.play} @pause=${ev.pause} @ended=${ev.ended} @timeupdate=${this.onTime}></audio>`
            : nothing}
      ${play("audio-play", "small")}
      <span class="wave" aria-hidden="true"
        >${LEVELS.map((l, i) => html `<span ?data-played=${this.playing && i < played} style=${styleMap({ "--level": String(l) })}></span>`)}</span
      >
      <span class="duration">${this.playing ? clock(this.elapsed) : this.duration}</span>`;
    }
    static { this.styles = [super.styles ?? [], attachmentStyles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaChatAttachment.prototype, "type", void 0);
__decorate([
    property({ type: String })
], ZetaChatAttachment.prototype, "fileName", void 0);
__decorate([
    property({ type: String })
], ZetaChatAttachment.prototype, "fileMeta", void 0);
__decorate([
    property({ type: String })
], ZetaChatAttachment.prototype, "duration", void 0);
__decorate([
    property({ type: String })
], ZetaChatAttachment.prototype, "src", void 0);
__decorate([
    property({ type: String })
], ZetaChatAttachment.prototype, "poster", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatAttachment.prototype, "showIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaChatAttachment.prototype, "playing", void 0);
__decorate([
    state()
], ZetaChatAttachment.prototype, "progress", void 0);
__decorate([
    state()
], ZetaChatAttachment.prototype, "elapsed", void 0);
__decorate([
    query("audio, video")
], ZetaChatAttachment.prototype, "media", void 0);
ZetaChatAttachment = __decorate([
    customElement("zeta-chat-attachment")
], ZetaChatAttachment);
export { ZetaChatAttachment };
//# sourceMappingURL=chat-media.js.map