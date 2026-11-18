var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./chat-message.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../avatar/avatar.js";
import { zebraIconGlyphs } from "../../generated/zebra-icons/glyphs.js";
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
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */
let ZetaChatMessage = class ZetaChatMessage extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** desktop: controls on hover or focus. mobile: a long press opens reactions and actions over a scrim. */
        this.platform = "desktop";
        /** channel: group chats, plain text with avatar and name. conversation: assistant and one-to-one, yours in bubbles on the right. */
        this.chatStyle = "channel";
        /** The spec's Role: someone else, you, or the assistant. */
        this.roleName = "receiver";
        /** first starts a run and carries the header; consecutive lines up under it. */
        this.sequence = "first";
        /** Shows the avatar on a first message. */
        this.showAvatar = true;
        /** Shows the name and time on a first message. */
        this.showHeader = true;
        /** The author of the quoted message this one answers. */
        this.replyTo = "";
        /** The quoted message's text. */
        this.replyText = "";
        /** Keeps a consecutive message's time hidden until hover. The column stays either way. */
        this.hideTime = true;
        /** The assistant's controls under the message. Its space is kept when off. */
        this.showControls = true;
        /** Opens the reactions row. */
        this.reactionControls = false;
        /** Opens the action menu. */
        this.expandMenu = false;
        /** The sender's name. */
        this.name = "";
        /** The avatar's initials. */
        this.initials = "";
        /** A Zebra glyph (kebab-case) for the avatar instead of initials: the assistant's own avatar (companion). */
        this.avatarIcon = "";
        /** The send time, formatted. */
        this.time = "";
        /** Position in a run of one sender's bubbles. */
        this.bubbleStatus = "single";
        /** The loading label. Defaults to Thinking for the assistant and Typing otherwise. */
        this.loadingLabel = "";
        /** The reactions offered in the row. */
        this.reactionOptions = REACTIONS;
        this.held = false;
        this.lift = 0;
        this.has = { attachments: false, reactions: false, footer: false, thread: false };
        /** Figma carries the thread in the Attachment Slot; in code it moves to its own container (spec Threads). */
        this.moveThreads = (e) => {
            for (const el of e.target.assignedElements())
                if (el.localName === "zeta-chat-thread")
                    el.setAttribute("slot", "thread");
            this.onSlot("attachments")(e);
        };
        this.startPress = (e) => {
            if (this.platform !== "mobile" || this.roleName === "assistant" || this.loading || e.button !== 0)
                return;
            clearTimeout(this.press);
            this.press = window.setTimeout(() => this.setHeld(true), 450);
        };
        this.cancelPress = () => clearTimeout(this.press);
        this.onKey = (e) => {
            if (e.key !== "Escape")
                return;
            if (this.held)
                this.setHeld(false);
            else {
                this.reactionControls = false;
                this.expandMenu = false;
            }
        };
        this.onAway = (e) => {
            if (this.held || e.composedPath().includes(this))
                return;
            this.reactionControls = false;
            this.expandMenu = false;
        };
    }
    willUpdate(changed) {
        if (changed.has("state") && this.state !== this.derived())
            this.pinned = this.state;
        this.state = this.pinned ?? this.derived();
    }
    derived() {
        return this.reactionControls || this.expandMenu || this.held ? "active" : "default";
    }
    get loading() {
        return this.state === "loading";
    }
    /** Read from the light DOM: a slot leaving the tree fires a last, empty slotchange. */
    get hasMenu() {
        return !!this.querySelector(':scope > [slot="menu"]');
    }
    onSlot(name) {
        return (e) => {
            this.has = {
                ...this.has,
                [name]: e.target.assignedNodes({ flatten: true }).some(n => n.nodeType === 1 || (n.textContent ?? "").trim())
            };
        };
    }
    setHeld(h) {
        this.held = h;
        this.reactionControls = h;
        this.expandMenu = h && this.hasMenu;
        if (!h)
            this.lift = 0;
        this.dispatchEvent(new CustomEvent("heldchange", { detail: { held: h }, bubbles: true, composed: true }));
        if (h)
            requestAnimationFrame(() => {
                // Slide up just enough for the menu, leaving space/sm at the bottom.
                const el = this.root, menu = this.renderRoot.querySelector(".held-menu");
                if (!el)
                    return;
                const gap = parseFloat(getComputedStyle(el).getPropertyValue("--space-sm")) || 8;
                const over = el.getBoundingClientRect().bottom + (menu?.offsetHeight ?? 0) + gap * 2 - window.innerHeight;
                this.lift = over > 0 ? Math.min(over, el.getBoundingClientRect().top - gap * 8) : 0;
            });
    }
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
    react(r) {
        this.dispatchEvent(new CustomEvent("react", { detail: { reaction: r }, bubbles: true, composed: true }));
        if (this.held)
            this.setHeld(false);
        else
            this.reactionControls = false;
    }
    reactionRow() {
        return html `<div class="reactions-row" role="toolbar" aria-label="Add reaction">
      ${this.reactionOptions.map(r => html `<button type="button" class="reaction" @click=${() => this.react(r)}>${r}</button>`)}
      <zeta-icon-button flavor="text" size="small" shape=${this.rounded ? "rounded" : "sharp"} aria-label="More reactions" @click=${() => this.react("more")}
        >add</zeta-icon-button
      >
    </div>`;
    }
    panel(cls) {
        return html `<div class="panel ${cls}" role="menu" @click=${() => (this.held ? this.setHeld(false) : (this.expandMenu = false))}>
      <slot name="menu"></slot>
    </div>`;
    }
    render() {
        const assistant = this.roleName === "assistant", mobile = this.platform === "mobile";
        const own = this.chatStyle === "conversation" && this.roleName === "sender";
        const first = this.sequence === "first";
        const header = first && this.showHeader && !own;
        const shape = this.rounded ? "rounded" : "sharp";
        const lead = first
            ? this.showAvatar && !own
                ? html `<zeta-avatar size="xs"
            >${this.avatarIcon
                    ? html `<span class="avatar-glyph" aria-hidden="true">${zebraIconGlyphs[this.avatarIcon]}</span>`
                    : this.initials}</zeta-avatar
          >`
                : nothing
            : html `<span class="time-column">${this.time ? html `<zeta-chat-timestamp>${this.time}</zeta-chat-timestamp>` : nothing}</span>`;
        const desktopControls = !mobile && !assistant && !this.loading
            ? html `<div class="float">
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
            ${this.expandMenu && !this.held ? html `<div class="menu">${this.panel("")}</div>` : nothing}
          </div>`
            : nothing;
        const assistantControls = assistant && !this.loading
            ? html `<div class="assistant-controls" ?data-hidden=${!this.showControls}>
            <zeta-chat-controls controlsStyle="none" .rounded=${!!this.rounded} .showReact=${false} .showMore=${false}>
              <slot name="controls">
                <zeta-icon-button flavor="text" size="small" shape=${shape} aria-label="Copy">copy_file</zeta-icon-button>
                <zeta-icon-button flavor="text" size="small" shape=${shape} aria-label="Reply">reply</zeta-icon-button>
                <zeta-icon-button flavor="text" size="small" shape=${shape} aria-label="Regenerate">refresh</zeta-icon-button>
              </slot>
            </zeta-chat-controls>
          </div>`
            : nothing;
        return html `<div
        class="root"
        ?data-header=${header}
        ?data-held=${this.held}
        style=${styleMap(this.held && this.lift ? { "--zds-chat-lift": `${-this.lift}px` } : {})}
        @pointerdown=${this.startPress}
        @pointerup=${this.cancelPress}
        @pointerleave=${this.cancelPress}
        @pointercancel=${this.cancelPress}
        @contextmenu=${(e) => {
            if (mobile)
                e.preventDefault();
        }}
      >
        ${lead}
        <div class="main">
          ${header
            ? html `<div class="header">
                  <span class="name">${this.name}</span>${this.time ? html `<zeta-chat-timestamp>${this.time}</zeta-chat-timestamp>` : nothing}
                </div>`
            : nothing}
          ${this.replyTo
            ? html `<div class="reply">
                  <zeta-icon .rounded=${this.rounded}>reply</zeta-icon><span class="reply-to">${this.replyTo}</span
                  ><span class="reply-text">${this.replyText}</span>
                </div>`
            : nothing}
          ${this.loading
            ? html `<zeta-chat-loading-indicator
                  label=${this.loadingLabel || (assistant ? "Thinking" : "Typing")}
                  .rounded=${!!this.rounded}
                ></zeta-chat-loading-indicator>`
            : html `<div class="content">
                  <zeta-chat-bubble
                    bubbleStyle=${this.chatStyle === "conversation" && !assistant ? "fill" : "none"}
                    status=${this.bubbleStatus}
                    roleName=${this.roleName === "sender" ? "sender" : "receiver"}
                    .rounded=${!!this.rounded}
                    ><slot></slot
                  ></zeta-chat-bubble>
                  <div class="attachments" ?hidden=${!this.has.attachments}><slot name="attachments" @slotchange=${this.moveThreads}></slot></div>
                </div>`}
          <div class="reactions" ?hidden=${!this.has.reactions || assistant || this.loading}>
            <slot name="reactions" @slotchange=${this.onSlot("reactions")}></slot>
          </div>
          <div class="footer" ?hidden=${!this.has.footer || assistant || this.loading}>
            <zeta-icon .rounded=${this.rounded}>check_mark</zeta-icon><slot name="footer" @slotchange=${this.onSlot("footer")}></slot>
          </div>
          ${assistantControls}
        </div>
        ${desktopControls} ${this.held ? html `<div class="held-reactions">${this.reactionRow()}</div>` : nothing}
        ${this.held && this.hasMenu ? this.panel("held-menu") : nothing}
      </div>
      <div class="thread" ?hidden=${!this.has.thread}><slot name="thread" @slotchange=${this.onSlot("thread")}></slot></div>
      ${this.held ? html `<div class="scrim" @pointerdown=${() => this.setHeld(false)}><zeta-scrim></zeta-scrim></div>` : nothing}`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaChatMessage.prototype, "platform", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaChatMessage.prototype, "chatStyle", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaChatMessage.prototype, "roleName", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaChatMessage.prototype, "state", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaChatMessage.prototype, "sequence", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatMessage.prototype, "showAvatar", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatMessage.prototype, "showHeader", void 0);
__decorate([
    property({ type: String })
], ZetaChatMessage.prototype, "replyTo", void 0);
__decorate([
    property({ type: String })
], ZetaChatMessage.prototype, "replyText", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaChatMessage.prototype, "hideTime", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatMessage.prototype, "showControls", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatMessage.prototype, "reactionControls", void 0);
__decorate([
    property({ type: Boolean })
], ZetaChatMessage.prototype, "expandMenu", void 0);
__decorate([
    property({ type: String })
], ZetaChatMessage.prototype, "name", void 0);
__decorate([
    property({ type: String })
], ZetaChatMessage.prototype, "initials", void 0);
__decorate([
    property({ type: String })
], ZetaChatMessage.prototype, "avatarIcon", void 0);
__decorate([
    property({ type: String })
], ZetaChatMessage.prototype, "time", void 0);
__decorate([
    property({ type: String })
], ZetaChatMessage.prototype, "bubbleStatus", void 0);
__decorate([
    property({ type: String })
], ZetaChatMessage.prototype, "loadingLabel", void 0);
__decorate([
    property({ attribute: false })
], ZetaChatMessage.prototype, "reactionOptions", void 0);
__decorate([
    state()
], ZetaChatMessage.prototype, "held", void 0);
__decorate([
    state()
], ZetaChatMessage.prototype, "lift", void 0);
__decorate([
    state()
], ZetaChatMessage.prototype, "has", void 0);
__decorate([
    query(".root")
], ZetaChatMessage.prototype, "root", void 0);
ZetaChatMessage = __decorate([
    customElement("zeta-chat-message")
], ZetaChatMessage);
export { ZetaChatMessage };
//# sourceMappingURL=chat-message.js.map