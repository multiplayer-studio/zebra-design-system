import { LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./chat-attachment.styles.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";

const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const LEVELS = [0.3, 0.55, 0.42, 0.85, 0.6, 1, 0.5, 0.72, 0.38, 0.9, 0.62, 0.42, 0.78, 0.5, 0.3, 0.62, 0.45, 0.26];

/**
 * A file tile with a download control, a video preview, or an audio
 * waveform, in a message's Attachment Slot. Playback is real when `src` is
 * set; a playing video keeps a pause control (spec issue, as intended).
 *
 * @fires zds-download - Download pressed on a file with no `src`.
 * @spec specs/chat-message/chat-message.spec.json
 */
@customElement("zds-chat-attachment")
export class ZdsChatAttachment extends LitElement {
  static styles = styles;
  @property({ type: String, reflect: true }) type: "file" | "video" | "audio" = "file";
  @property({ type: String, attribute: "file-name" }) fileName = "";
  @property({ type: String, attribute: "file-meta" }) fileMeta = "";
  @property({ type: String }) duration = "";
  @property({ type: String }) src = "";
  @property({ type: String }) poster = "";
  @property({ type: Boolean, attribute: "show-icon" }) showIcon = true;
  @property({ type: Boolean, reflect: true }) rounded = true;
  @property({ type: Boolean, reflect: true }) playing = false;
  @state() private progress = 0;
  @state() private elapsed = 0;
  @query("audio, video") private media?: HTMLMediaElement;

  private toggle() { const m = this.media; if (!m) { this.playing = !this.playing; return; } if (m.paused) void m.play(); else m.pause(); }
  private get events() {
    return {
      play: () => (this.playing = true), pause: () => (this.playing = false),
      ended: () => { this.playing = false; this.progress = 0; },
      time: (e: Event) => { const m = e.target as HTMLMediaElement; this.elapsed = m.currentTime; this.progress = m.duration ? m.currentTime / m.duration : 0; },
    };
  }

  protected render() {
    const r = this.rounded, ev = this.events;
    if (this.type === "file") {
      return html`<span class="tile"><zds-icon name="document" size="large"></zds-icon></span>
        <span class="text"><span class="name" title=${this.fileName}>${this.fileName}</span>${this.fileMeta ? html`<span class="meta">${this.fileMeta}</span>` : nothing}</span>
        <zds-icon-button class="download" flavour="text" size="medium" shape=${r ? "rounded" : "sharp"} icon="download" label=${`Download ${this.fileName}`}
          @click=${() => { if (this.src) { const a = document.createElement("a"); a.href = this.src; a.download = this.fileName; a.click(); } else this.dispatchEvent(new CustomEvent("zds-download", { bubbles: true, composed: true })); }}></zds-icon-button>`;
    }
    const play = (cls: string, size: "small" | "large") => html`<zds-icon-button class=${cls} flavour="primary" size=${size} shape=${r ? "full" : "sharp"}
      icon=${this.playing ? "pause" : "play"} label=${this.playing ? "Pause" : "Play"} @click=${() => this.toggle()}></zds-icon-button>`;
    if (this.type === "video") {
      return html`${this.src ? html`<video src=${this.src} poster=${this.poster || nothing} playsinline @play=${ev.play} @pause=${ev.pause} @ended=${ev.ended} @timeupdate=${ev.time}></video>`
          : this.poster ? html`<img src=${this.poster} alt="" />` : this.showIcon ? html`<zds-icon class="poster" name="image"></zds-icon>` : nothing}
        ${play("play", "large")}
        ${this.duration && !this.playing ? html`<span class="chip">${this.duration}</span>` : nothing}`;
    }
    const played = Math.round(this.progress * LEVELS.length);
    return html`${this.src ? html`<audio src=${this.src} preload="metadata" @play=${ev.play} @pause=${ev.pause} @ended=${ev.ended} @timeupdate=${ev.time}></audio>` : nothing}
      ${play("audio-play", "small")}
      <span class="wave" aria-hidden="true">${LEVELS.map((l, i) => html`<span ?data-played=${this.playing && i < played} style=${styleMap({ "--zds-level": String(l) })}></span>`)}</span>
      <span class="duration">${this.playing ? clock(this.elapsed) : this.duration}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-chat-attachment": ZdsChatAttachment }
}
