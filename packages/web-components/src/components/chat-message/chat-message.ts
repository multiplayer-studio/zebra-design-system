import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./chat-message.styles.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../dropdown/dropdown.js";
import "../dropdown-menu/dropdown-menu.js";
import "../scrim/scrim.js";
import "../chat-bubble/chat-bubble.js";
import "../chat-controls/chat-controls.js";
import "../chat-loading-indicator/chat-loading-indicator.js";
import "../chat-timestamp/chat-timestamp.js";
import type { ChatBubbleStatus } from "../chat-bubble/chat-bubble.js";

export type ChatPlatform = "mobile" | "desktop";
export type ChatStyle = "conversation" | "channel";
export type ChatRole = "receiver" | "sender" | "assistant";
export type ChatState = "default" | "active" | "loading";

const REACTIONS = ["👍", "❤️", "😂", "😮", "🙏"];

/**
 * One message in a chat, from someone else, you or the assistant. Style sets
 * the setting: channel for group chats, conversation for assistant and
 * one-to-one chats. Platform sets how actions open: hover on desktop, long
 * press on mobile. Sequence separates the first message in a run, which
 * carries the header, from the consecutive messages under it.
 *
 * Desktop: the controls float over the message's top edge, overlapping it by
 * space/lg, on hover or focus; the reactions row and the menu never show
 * together. Mobile: a long press (about 450 ms) lifts the message over a
 * scrim, reactions above it and the menu below. Escape or a tap on the scrim
 * closes everything. The assistant keeps its controls under the message,
 * with no reactions row or menu. `role-name` and `chat-style` stand for the
 * spec's Role and Style, named so as not to collide with ARIA `role` and
 * the `style` attribute.
 *
 * Spec issues followed as intended: channel messages are start aligned;
 * `hide-time` hides only the time, never the column; reactions and footer
 * never show for the assistant. Kept in step with packages/react-baseui
 * `<ChatMessage>`.
 *
 * @slot - The message text, shown in a Bubble.
 * @slot attachments - The Attachment Slot: zds-chat-photos or zds-chat-attachment. A zds-chat-thread placed here moves to `thread`.
 * @slot thread - The reply thread, in its own container under the message: outside its surface and indented to its
 *   text, so opening it or hovering a reply never makes the parent active (spec Threads).
 * @slot reactions - The Reactions Slot: zds-assist-chip with counts.
 * @slot footer - Delivery status under your own most recent message.
 * @slot controls - The Control Slot: extra actions between React and More.
 * @slot menu - zds-menu-item rows for the action menu (desktop More, mobile long press).
 * @fires zds-react - A reaction was chosen. `detail.reaction`.
 * @fires zds-held-change - The mobile long press opened or closed. `detail.held`.
 * @spec specs/chat-message/chat-message.spec.json
 */
@customElement("zds-chat-message")
export class ZdsChatMessage extends LitElement {
  static styles = styles;

  @property({ type: String, reflect: true }) platform: ChatPlatform = "desktop";
  @property({ type: String, reflect: true, attribute: "chat-style" }) chatStyle: ChatStyle = "channel";
  @property({ type: String, reflect: true, attribute: "role-name" }) roleName: ChatRole = "receiver";
  /** Pins the state, reflected. Unset, active follows hover or focus (desktop) or a long press (mobile). */
  @property({ type: String, reflect: true }) state: ChatState | null = null;
  @property({ type: String, reflect: true }) sequence: "first" | "consecutive" = "first";
  @property({ type: Boolean, reflect: true }) rounded = true;
  @property({ type: Boolean, attribute: "show-avatar" }) showAvatar = true;
  @property({ type: Boolean, attribute: "show-header" }) showHeader = true;
  @property({ type: String, attribute: "reply-to" }) replyTo = "";
  @property({ type: String, attribute: "reply-text" }) replyText = "";
  /** Keeps a consecutive message's time hidden until hover. The column stays either way. */
  @property({ type: Boolean, reflect: true, attribute: "hide-time" }) hideTime = true;
  /** The assistant's controls under the message. Its space is kept when off. */
  @property({ type: Boolean, attribute: "show-controls" }) showControls = true;
  /** Opens the reactions row. */
  @property({ type: Boolean, attribute: "reaction-controls" }) reactionControls = false;
  /** Opens the action menu. */
  @property({ type: Boolean, attribute: "expand-menu" }) expandMenu = false;
  @property({ type: String }) name = "";
  @property({ type: String }) initials = "";
  @property({ type: String, attribute: "avatar-src" }) avatarSrc = "";
  /** A glyph for the avatar instead of initials: the assistant's own avatar (companion). */
  @property({ type: String, attribute: "avatar-icon" }) avatarIcon = "";
  @property({ type: String }) time = "";
  @property({ type: String, attribute: "bubble-status" }) bubbleStatus: ChatBubbleStatus = "single";
  @property({ type: String, attribute: "loading-label" }) loadingLabel = "";
  @property({ attribute: false }) reactionOptions: string[] = REACTIONS;

  @state() private held = false;
  @state() private lift = 0;
  @state() private has = { attachments: false, reactions: false, footer: false, controls: false, thread: false };
  private pinned: ChatState | null = null;
  private press?: number;
  @query(".root") private root?: HTMLElement;

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("state") && this.state !== this.derived()) this.pinned = this.state;
    this.state = this.pinned ?? this.derived();
  }
  private derived(): ChatState { return this.reactionControls || this.expandMenu || this.held ? "active" : "default"; }
  private get loading() { return this.state === "loading"; }
  /** Read from the light DOM: a slot leaving the tree fires a last, empty slotchange. */
  private get hasMenu() { return !!this.querySelector(':scope > [slot="menu"]'); }

  /** Figma carries the thread in the Attachment Slot; in code it moves to its own container (spec Threads). */
  private moveThreads = (e: Event) => {
    for (const el of (e.target as HTMLSlotElement).assignedElements()) if (el.localName === "zds-chat-thread") el.setAttribute("slot", "thread");
    this.onSlot("attachments")(e);
  };

  private onSlot(name: keyof typeof this.has) {
    return (e: Event) => { this.has = { ...this.has, [name]: (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).some((n) => n.nodeType === 1 || (n.textContent ?? "").trim()) }; };
  }

  // ---- mobile long press -------------------------------------------------
  private startPress = (e: PointerEvent) => {
    if (this.platform !== "mobile" || this.roleName === "assistant" || this.loading || e.button !== 0) return;
    clearTimeout(this.press);
    this.press = window.setTimeout(() => this.setHeld(true), 450);
  };
  private cancelPress = () => clearTimeout(this.press);
  private setHeld(h: boolean) {
    this.held = h;
    this.reactionControls = h;
    this.expandMenu = h && this.hasMenu;
    if (!h) this.lift = 0;
    this.dispatchEvent(new CustomEvent("zds-held-change", { detail: { held: h }, bubbles: true, composed: true }));
    if (h) requestAnimationFrame(() => {
      // Slide up just enough for the menu, leaving space/sm at the bottom.
      const el = this.root, menu = this.renderRoot.querySelector<HTMLElement>(".held-menu");
      if (!el) return;
      const gap = parseFloat(getComputedStyle(el).getPropertyValue("--space-sm")) || 8;
      const over = el.getBoundingClientRect().bottom + (menu?.offsetHeight ?? 0) + gap * 2 - window.innerHeight;
      this.lift = over > 0 ? Math.min(over, el.getBoundingClientRect().top - gap * 8) : 0;
    });
  }
  private onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (this.held) this.setHeld(false);
    else if (this.reactionControls) this.reactionControls = false;
  };
  private onAway = (e: PointerEvent) => { if (this.reactionControls && !this.held && !e.composedPath().includes(this)) this.reactionControls = false; };
  connectedCallback() { super.connectedCallback(); document.addEventListener("keydown", this.onKey); document.addEventListener("pointerdown", this.onAway); }
  disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener("keydown", this.onKey); document.removeEventListener("pointerdown", this.onAway); }

  private react(r: string) {
    this.dispatchEvent(new CustomEvent("zds-react", { detail: { reaction: r }, bubbles: true, composed: true }));
    if (this.held) this.setHeld(false); else this.reactionControls = false;
  }

  private reactionRow() {
    return html`<div class="reactions-row" role="toolbar" aria-label="Add reaction">
      ${this.reactionOptions.map((r) => html`<button type="button" class="reaction" @click=${() => this.react(r)}>${r}</button>`)}
      <zds-icon-button flavour="text" size="small" shape=${this.rounded ? "rounded" : "sharp"} icon="add" label="More reactions"
        @click=${() => this.react("more")}></zds-icon-button>
    </div>`;
  }

  protected render() {
    const assistant = this.roleName === "assistant", mobile = this.platform === "mobile";
    const own = this.chatStyle === "conversation" && this.roleName === "sender";
    const first = this.sequence === "first";
    const header = first && this.showHeader && !own;
    const shape = this.rounded ? "rounded" : "sharp";
    const lead = first
      ? (this.showAvatar && !own ? html`<zds-avatar size="xsmall" type=${this.avatarSrc ? "photo" : this.avatarIcon ? "icon" : "initials"} initials=${this.initials}
          src=${this.avatarSrc || nothing} icon=${this.avatarIcon || nothing} .showStatus=${false} .showClose=${false} .showRing=${false}></zds-avatar>` : nothing)
      : html`<span class="time-column">${this.time ? html`<zds-chat-timestamp>${this.time}</zds-chat-timestamp>` : nothing}</span>`;
    const desktopControls = !mobile && !assistant && !this.loading
      ? html`<div class="float">
          ${this.reactionControls ? this.reactionRow() : nothing}
          <zds-chat-controls ?rounded=${this.rounded} .reactOpen=${this.reactionControls} .moreOpen=${this.expandMenu} .showMore=${this.hasMenu}
            @zds-react=${() => { this.expandMenu = false; this.reactionControls = !this.reactionControls; }}>
            <slot name="controls" @slotchange=${this.onSlot("controls")}>
              <zds-icon-button flavour="text" size="small" shape=${shape} icon="reply" label="Reply"></zds-icon-button>
            </slot>
            <zds-dropdown slot="more" position="bottom" align="right" compact ?rounded=${this.rounded} .open=${this.expandMenu}
              @open-change=${(e: CustomEvent<{ open: boolean }>) => { this.expandMenu = e.detail.open; if (e.detail.open) this.reactionControls = false; }}>
              <zds-icon-button slot="trigger" flavour="text" size="small" shape=${shape} icon="more-horizontal" label="More actions" ?data-pressed=${this.expandMenu}></zds-icon-button>
              ${this.held ? nothing : html`<slot name="menu" @slotchange=${() => this.requestUpdate()}></slot>`}
            </zds-dropdown>
          </zds-chat-controls>
        </div>`
      : nothing;
    const assistantControls = assistant && !this.loading
      ? html`<div class="assistant-controls" ?data-hidden=${!this.showControls}>
          <zds-chat-controls controls-style="none" ?rounded=${this.rounded} .showReact=${false} .showMore=${false}>
            <slot name="controls" @slotchange=${this.onSlot("controls")}>
              <zds-icon-button flavour="text" size="small" shape=${shape} icon="copy-file" label="Copy"></zds-icon-button>
              <zds-icon-button flavour="text" size="small" shape=${shape} icon="reply" label="Reply"></zds-icon-button>
              <zds-icon-button flavour="text" size="small" shape=${shape} icon="refresh" label="Regenerate"></zds-icon-button>
            </slot>
          </zds-chat-controls>
        </div>`
      : nothing;
    return html`<div class="root" ?data-header=${header} ?data-held=${this.held}
        style=${styleMap(this.held && this.lift ? { "--zds-chat-lift": `${-this.lift}px` } : {})}
        @pointerdown=${this.startPress} @pointerup=${this.cancelPress} @pointerleave=${this.cancelPress} @pointercancel=${this.cancelPress}
        @contextmenu=${(e: Event) => { if (mobile) e.preventDefault(); }}>
        ${lead}
        <div class="main">
          ${header ? html`<div class="header"><span class="name">${this.name}</span>${this.time ? html`<zds-chat-timestamp>${this.time}</zds-chat-timestamp>` : nothing}</div>` : nothing}
          ${this.replyTo ? html`<div class="reply"><zds-icon name="reply" size="xsmall"></zds-icon><span class="reply-to">${this.replyTo}</span><span class="reply-text">${this.replyText}</span></div>` : nothing}
          ${this.loading
            ? html`<zds-chat-loading-indicator label=${this.loadingLabel || (assistant ? "Thinking" : "Typing")} ?rounded=${this.rounded}></zds-chat-loading-indicator>`
            : html`<div class="content">
                <zds-chat-bubble bubble-style=${this.chatStyle === "conversation" && !assistant ? "fill" : "none"} status=${this.bubbleStatus}
                  role-name=${this.roleName === "sender" ? "sender" : "receiver"} ?rounded=${this.rounded}><slot></slot></zds-chat-bubble>
                <div class="attachments" ?hidden=${!this.has.attachments}><slot name="attachments" @slotchange=${this.moveThreads}></slot></div>
              </div>`}
          <div class="reactions" ?hidden=${!this.has.reactions || assistant || this.loading}><slot name="reactions" @slotchange=${this.onSlot("reactions")}></slot></div>
          <div class="footer" ?hidden=${!this.has.footer || assistant || this.loading}><zds-icon name="check-mark" size="small"></zds-icon><slot name="footer" @slotchange=${this.onSlot("footer")}></slot></div>
          ${assistantControls}
        </div>
        ${desktopControls}
        ${this.held ? html`<div class="held-reactions">${this.reactionRow()}</div>` : nothing}
        ${this.held && this.hasMenu ? html`<zds-dropdown-menu class="held-menu" compact ?rounded=${this.rounded}><slot name="menu"></slot></zds-dropdown-menu>` : nothing}
      </div>
      <div class="thread" ?hidden=${!this.has.thread}><slot name="thread" @slotchange=${this.onSlot("thread")}></slot></div>
      ${this.held ? html`<div class="scrim" @pointerdown=${() => this.setHeld(false)}><zds-scrim></zds-scrim></div>` : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-chat-message": ZdsChatMessage }
}
