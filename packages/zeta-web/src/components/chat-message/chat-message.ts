import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./chat-message.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../avatar/avatar.js";
import { iconGlyphs } from "@zebra-design-system/icons/codepoints.js";

const zebraIconGlyphs: Record<string, string> = iconGlyphs;
import "../icon/icon.js";
import "../button/icon-button/icon-button.js";
import "../scrim/scrim.js";
import "./chat-parts.js";
import "./chat-media.js";

const REACTIONS = ["👍", "❤️", "😂", "😮", "🙏"];

/** One message in a chat, from someone else, you or the assistant. Style sets the setting: channel for group chats,
 * conversation for assistant and one-to-one chats. Platform sets how actions open: hover on desktop, long press on
 * mobile. Sequence separates the first message in a run, which carries the header, from the consecutive messages
 * under it.
 *
 * Desktop: the controls float over the message's top edge, overlapping it by space/lg, on hover or focus; the
 * reactions row and the menu never show together. Mobile: a long press (about 450 ms) lifts the message over a scrim,
 * reactions above it and the menu below. Escape or a tap on the scrim closes everything. The assistant keeps its
 * controls under the message, with no reactions row or menu. `roleName` and `chatStyle` stand for the spec's Role and
 * Style. `rounded` (Contourable) maps the spec's Rounded and reaches every part.
 *
 * Spec issues followed as intended: channel messages are start aligned; `hideTime` hides only the time, never the
 * column; reactions and footer never show for the assistant.
 *
 * @slot - The message text, shown in a Bubble.
 * @slot attachments - The Attachment Slot: zeta-chat-photos or zeta-chat-attachment. A zeta-chat-thread placed here moves to
 * `thread`.
 * @slot thread - The reply thread, in its own container under the message: outside its surface and indented to its
 * text, so opening it or hovering a reply never makes the parent active (spec Threads).
 * @slot reactions - The Reactions Slot: zeta-assist-chip with counts.
 * @slot footer - Delivery status under your own most recent message.
 * @slot controls - The Control Slot: extra actions between React and More.
 * @slot menu - zeta-dropdown-menu-item rows for the action menu (desktop More, mobile long press).
 * @event {CustomEvent<{ reaction: string }>} react - Fired when a reaction is chosen.
 * @event {CustomEvent<{ held: boolean }>} heldchange - Fired when the mobile long press opens or closes.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-18698
 * @storybook ?path=/docs/components-chat-message--docs
 */
@customElement("zeta-chat-message")
export class ZetaChatMessage extends Contourable(LitElement) {
  /** desktop: controls on hover or focus. mobile: a long press opens reactions and actions over a scrim. */
  @property({ type: String, reflect: true }) platform: "mobile" | "desktop" = "desktop";

  /** channel: group chats, plain text with avatar and name. conversation: assistant and one-to-one, yours in bubbles on the right. */
  @property({ type: String, reflect: true }) chatStyle: "conversation" | "channel" = "channel";

  /** The spec's Role: someone else, you, or the assistant. */
  @property({ type: String, reflect: true }) roleName: "receiver" | "sender" | "assistant" = "receiver";

  /** Pins the state, reflected. Unset, active follows hover or focus (desktop) or a long press (mobile). */
  @property({ type: String, reflect: true }) state?: "default" | "active" | "loading";

  /** first starts a run and carries the header; consecutive lines up under it. */
  @property({ type: String, reflect: true }) sequence: "first" | "consecutive" = "first";

  /** Shows the avatar on a first message. */
  @property({ type: Boolean }) showAvatar = true;

  /** Shows the name and time on a first message. */
  @property({ type: Boolean }) showHeader = true;

  /** The author of the quoted message this one answers. */
  @property({ type: String }) replyTo = "";

  /** The quoted message's text. */
  @property({ type: String }) replyText = "";

  /** Keeps a consecutive message's time hidden until hover. The column stays either way. */
  @property({ type: Boolean, reflect: true }) hideTime = true;

  /** The assistant's controls under the message. Its space is kept when off. */
  @property({ type: Boolean }) showControls = true;

  /** Opens the reactions row. */
  @property({ type: Boolean }) reactionControls = false;

  /** Opens the action menu. */
  @property({ type: Boolean }) expandMenu = false;

  /** The sender's name. */
  @property({ type: String }) name = "";

  /** The avatar's initials. */
  @property({ type: String }) initials = "";

  /** A Zebra glyph (kebab-case) for the avatar instead of initials: the assistant's own avatar (companion). */
  @property({ type: String }) avatarIcon = "";

  /** The avatar's swatch behind initials or an icon: give each person their own, and the assistant purple. */
  @property({ type: String }) avatarColor = "";

  /** The send time, formatted. */
  @property({ type: String }) time = "";

  /** Position in a run of one sender's bubbles. */
  @property({ type: String }) bubbleStatus: "single" | "first" | "middle" | "last" = "single";

  /** The loading label. Defaults to Thinking for the assistant and Typing otherwise. */
  @property({ type: String }) loadingLabel = "";

  /** The reactions offered in the row. */
  @property({ attribute: false }) reactionOptions: string[] = REACTIONS;

  @state() private held = false;
  @state() private lift = 0;
  @state() private has = { attachments: false, reactions: false, footer: false, thread: false };
  private pinned?: "default" | "active" | "loading";
  private press?: number;
  @query(".root") private root?: HTMLElement;

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("state") && this.state !== this.derived()) this.pinned = this.state;
    this.state = this.pinned ?? this.derived();
  }

  private derived() {
    return this.reactionControls || this.expandMenu || this.held ? "active" : "default";
  }

  private get loading() {
    return this.state === "loading";
  }

  /** Read from the light DOM: a slot leaving the tree fires a last, empty slotchange. */
  private get hasMenu() {
    return !!this.querySelector(':scope > [slot="menu"]');
  }

  /** Figma carries the thread in the Attachment Slot; in code it moves to its own container (spec Threads). */
  private moveThreads = (e: Event) => {
    for (const el of (e.target as HTMLSlotElement).assignedElements()) if (el.localName === "zeta-chat-thread") el.setAttribute("slot", "thread");
    this.onSlot("attachments")(e);
  };

  private onSlot(name: keyof typeof this.has) {
    return (e: Event) => {
      this.has = {
        ...this.has,
        [name]: (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).some(n => n.nodeType === 1 || (n.textContent ?? "").trim())
      };
    };
  }

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
    this.dispatchEvent(new CustomEvent("heldchange", { detail: { held: h }, bubbles: true, composed: true }));
    if (h)
      requestAnimationFrame(() => {
        // Slide up just enough for the menu, leaving space/sm at the bottom.
        const el = this.root,
          menu = this.renderRoot.querySelector<HTMLElement>(".held-menu");
        if (!el) return;
        const gap = parseFloat(getComputedStyle(el).getPropertyValue("--space-sm")) || 8;
        const over = el.getBoundingClientRect().bottom + (menu?.offsetHeight ?? 0) + gap * 2 - window.innerHeight;
        this.lift = over > 0 ? Math.min(over, el.getBoundingClientRect().top - gap * 8) : 0;
      });
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (this.held) this.setHeld(false);
    else {
      this.reactionControls = false;
      this.expandMenu = false;
    }
  };

  private onAway = (e: PointerEvent) => {
    if (this.held || e.composedPath().includes(this)) return;
    this.reactionControls = false;
    this.expandMenu = false;
  };

  connectedCallback() {
    super.connectedCallback?.();
    document.addEventListener("keydown", this.onKey);
    document.addEventListener("pointerdown", this.onAway);
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    document.removeEventListener("keydown", this.onKey);
    document.removeEventListener("pointerdown", this.onAway);
  }

  private react(r: string) {
    this.dispatchEvent(new CustomEvent("react", { detail: { reaction: r }, bubbles: true, composed: true }));
    if (this.held) this.setHeld(false);
    else this.reactionControls = false;
  }

  private reactionRow() {
    return html`<div class="reactions-row" role="toolbar" aria-label="Add reaction">
      ${this.reactionOptions.map(r => html`<button type="button" class="reaction" @click=${() => this.react(r)}>${r}</button>`)}
      <zeta-icon-button flavor="text" size="small" shape=${this.rounded ? "rounded" : "sharp"} aria-label="More reactions" @click=${() => this.react("more")}
        >add</zeta-icon-button
      >
    </div>`;
  }

  private panel(cls: string) {
    return html`<div class="panel ${cls}" role="menu" @click=${() => (this.held ? this.setHeld(false) : (this.expandMenu = false))}>
      <slot name="menu"></slot>
    </div>`;
  }

  protected render() {
    const assistant = this.roleName === "assistant",
      mobile = this.platform === "mobile";
    const own = this.chatStyle === "conversation" && this.roleName === "sender";
    const first = this.sequence === "first";
    const header = first && this.showHeader && !own;
    const shape = this.rounded ? "rounded" : "sharp";
    const lead = first
      ? this.showAvatar && !own
        ? html`<zeta-avatar size="xs" swatch-color=${this.avatarColor || nothing}
            >${this.avatarIcon
              ? html`<span class="avatar-glyph" aria-hidden="true">${zebraIconGlyphs[this.avatarIcon]}</span>`
              : this.initials}</zeta-avatar
          >`
        : nothing
      : html`<span class="time-column">${this.time ? html`<zeta-chat-timestamp>${this.time}</zeta-chat-timestamp>` : nothing}</span>`;
    const desktopControls =
      !mobile && !assistant && !this.loading
        ? html`<div class="float">
            ${this.reactionControls ? this.reactionRow() : nothing}
            <zeta-chat-controls
              .rounded=${!!this.rounded}
              .reactOpen=${this.reactionControls}
              .moreOpen=${this.expandMenu}
              .showMore=${this.hasMenu}
              @react=${() => {
                this.expandMenu = false;
                this.reactionControls = !this.reactionControls;
              }}
              @more=${() => {
                this.reactionControls = false;
                this.expandMenu = !this.expandMenu;
              }}
            >
              <slot name="controls"><zeta-icon-button flavor="text" size="small" shape=${shape} aria-label="Reply">reply</zeta-icon-button></slot>
            </zeta-chat-controls>
            ${this.expandMenu && !this.held ? html`<div class="menu">${this.panel("")}</div>` : nothing}
          </div>`
        : nothing;
    const assistantControls =
      assistant && !this.loading
        ? html`<div class="assistant-controls" ?data-hidden=${!this.showControls}>
            <zeta-chat-controls controlsStyle="none" .rounded=${!!this.rounded} .showReact=${false} .showMore=${false}>
              <slot name="controls">
                <zeta-icon-button flavor="text" size="small" shape=${shape} aria-label="Copy">copy_file</zeta-icon-button>
                <zeta-icon-button flavor="text" size="small" shape=${shape} aria-label="Reply">reply</zeta-icon-button>
                <zeta-icon-button flavor="text" size="small" shape=${shape} aria-label="Regenerate">refresh</zeta-icon-button>
              </slot>
            </zeta-chat-controls>
          </div>`
        : nothing;
    return html`<div
        class="root"
        ?data-header=${header}
        ?data-held=${this.held}
        style=${styleMap(this.held && this.lift ? { "--zds-chat-lift": `${-this.lift}px` } : {})}
        @pointerdown=${this.startPress}
        @pointerup=${this.cancelPress}
        @pointerleave=${this.cancelPress}
        @pointercancel=${this.cancelPress}
        @contextmenu=${(e: Event) => {
          if (mobile) e.preventDefault();
        }}
      >
        ${lead}
        <div class="main">
          ${
            header
              ? html`<div class="header">
                  <span class="name">${this.name}</span>${this.time ? html`<zeta-chat-timestamp>${this.time}</zeta-chat-timestamp>` : nothing}
                </div>`
              : nothing
          }
          ${
            this.replyTo
              ? html`<div class="reply">
                  <zeta-icon .rounded=${this.rounded}>reply</zeta-icon><span class="reply-to">${this.replyTo}</span
                  ><span class="reply-text">${this.replyText}</span>
                </div>`
              : nothing
          }
          ${
            this.loading
              ? html`<zeta-chat-loading-indicator
                  label=${this.loadingLabel || (assistant ? "Thinking" : "Typing")}
                  .rounded=${!!this.rounded}
                ></zeta-chat-loading-indicator>`
              : html`<div class="content">
                  <zeta-chat-bubble
                    bubbleStyle=${this.chatStyle === "conversation" && !assistant ? "fill" : "none"}
                    status=${this.bubbleStatus}
                    roleName=${this.roleName === "sender" ? "sender" : "receiver"}
                    .rounded=${!!this.rounded}
                    ><slot></slot
                  ></zeta-chat-bubble>
                  <div class="attachments" ?hidden=${!this.has.attachments}><slot name="attachments" @slotchange=${this.moveThreads}></slot></div>
                </div>`
          }
          <div class="reactions" ?hidden=${!this.has.reactions || assistant || this.loading}>
            <slot name="reactions" @slotchange=${this.onSlot("reactions")}></slot>
          </div>
          <div class="footer" ?hidden=${!this.has.footer || assistant || this.loading}>
            <zeta-icon .rounded=${this.rounded}>check_mark</zeta-icon><slot name="footer" @slotchange=${this.onSlot("footer")}></slot>
          </div>
          ${assistantControls}
        </div>
        ${desktopControls} ${this.held ? html`<div class="held-reactions">${this.reactionRow()}</div>` : nothing}
        ${this.held && this.hasMenu ? this.panel("held-menu") : nothing}
      </div>
      <div class="thread" ?hidden=${!this.has.thread}><slot name="thread" @slotchange=${this.onSlot("thread")}></slot></div>
      ${this.held ? html`<div class="scrim" @pointerdown=${() => this.setHeld(false)}><zeta-scrim></zeta-scrim></div>` : nothing}`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-chat-message": ZetaChatMessage;
  }
}
