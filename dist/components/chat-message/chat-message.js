var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
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
let ZdsChatMessage = class ZdsChatMessage extends LitElement {
    constructor() {
        super(...arguments);
        this.platform = "desktop";
        this.chatStyle = "channel";
        this.roleName = "receiver";
        /** Pins the state, reflected. Unset, active follows hover or focus (desktop) or a long press (mobile). */
        this.state = null;
        this.sequence = "first";
        this.rounded = true;
        this.showAvatar = true;
        this.showHeader = true;
        this.replyTo = "";
        this.replyText = "";
        /** Keeps a consecutive message's time hidden until hover. The column stays either way. */
        this.hideTime = true;
        /** The assistant's controls under the message. Its space is kept when off. */
        this.showControls = true;
        /** Opens the reactions row. */
        this.reactionControls = false;
        /** Opens the action menu. */
        this.expandMenu = false;
        this.name = "";
        this.initials = "";
        this.avatarSrc = "";
        /** A glyph for the avatar instead of initials: the assistant's own avatar (companion). */
        this.avatarIcon = "";
        this.time = "";
        this.bubbleStatus = "single";
        this.loadingLabel = "";
        this.reactionOptions = REACTIONS;
        this.held = false;
        this.lift = 0;
        this.has = { attachments: false, reactions: false, footer: false, controls: false, thread: false };
        this.pinned = null;
        /** Figma carries the thread in the Attachment Slot; in code it moves to its own container (spec Threads). */
        this.moveThreads = (e) => {
            for (const el of e.target.assignedElements())
                if (el.localName === "zds-chat-thread")
                    el.setAttribute("slot", "thread");
            this.onSlot("attachments")(e);
        };
        // ---- mobile long press -------------------------------------------------
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
            else if (this.reactionControls)
                this.reactionControls = false;
        };
        this.onAway = (e) => { if (this.reactionControls && !this.held && !e.composedPath().includes(this))
            this.reactionControls = false; };
    }
    willUpdate(changed) {
        if (changed.has("state") && this.state !== this.derived())
            this.pinned = this.state;
        this.state = this.pinned ?? this.derived();
    }
    derived() { return this.reactionControls || this.expandMenu || this.held ? "active" : "default"; }
    get loading() { return this.state === "loading"; }
    /** Read from the light DOM: a slot leaving the tree fires a last, empty slotchange. */
    get hasMenu() { return !!this.querySelector(':scope > [slot="menu"]'); }
    onSlot(name) {
        return (e) => { this.has = { ...this.has, [name]: e.target.assignedNodes({ flatten: true }).some((n) => n.nodeType === 1 || (n.textContent ?? "").trim()) }; };
    }
    setHeld(h) {
        this.held = h;
        this.reactionControls = h;
        this.expandMenu = h && this.hasMenu;
        if (!h)
            this.lift = 0;
        this.dispatchEvent(new CustomEvent("zds-held-change", { detail: { held: h }, bubbles: true, composed: true }));
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
    connectedCallback() { super.connectedCallback(); document.addEventListener("keydown", this.onKey); document.addEventListener("pointerdown", this.onAway); }
    disconnectedCallback() { super.disconnectedCallback(); document.removeEventListener("keydown", this.onKey); document.removeEventListener("pointerdown", this.onAway); }
    react(r) {
        this.dispatchEvent(new CustomEvent("zds-react", { detail: { reaction: r }, bubbles: true, composed: true }));
        if (this.held)
            this.setHeld(false);
        else
            this.reactionControls = false;
    }
    reactionRow() {
        return html `<div class="reactions-row" role="toolbar" aria-label="Add reaction">
      ${this.reactionOptions.map((r) => html `<button type="button" class="reaction" @click=${() => this.react(r)}>${r}</button>`)}
      <zds-icon-button flavour="text" size="small" shape=${this.rounded ? "rounded" : "sharp"} icon="add" label="More reactions"
        @click=${() => this.react("more")}></zds-icon-button>
    </div>`;
    }
    render() {
        const assistant = this.roleName === "assistant", mobile = this.platform === "mobile";
        const own = this.chatStyle === "conversation" && this.roleName === "sender";
        const first = this.sequence === "first";
        const header = first && this.showHeader && !own;
        const shape = this.rounded ? "rounded" : "sharp";
        const lead = first
            ? (this.showAvatar && !own ? html `<zds-avatar size="xsmall" type=${this.avatarSrc ? "photo" : this.avatarIcon ? "icon" : "initials"} initials=${this.initials}
          src=${this.avatarSrc || nothing} icon=${this.avatarIcon || nothing} .showStatus=${false} .showClose=${false} .showRing=${false}></zds-avatar>` : nothing)
            : html `<span class="time-column">${this.time ? html `<zds-chat-timestamp>${this.time}</zds-chat-timestamp>` : nothing}</span>`;
        const desktopControls = !mobile && !assistant && !this.loading
            ? html `<div class="float">
          ${this.reactionControls ? this.reactionRow() : nothing}
          <zds-chat-controls ?rounded=${this.rounded} .reactOpen=${this.reactionControls} .moreOpen=${this.expandMenu} .showMore=${this.hasMenu}
            @zds-react=${() => { this.expandMenu = false; this.reactionControls = !this.reactionControls; }}>
            <slot name="controls" @slotchange=${this.onSlot("controls")}>
              <zds-icon-button flavour="text" size="small" shape=${shape} icon="reply" label="Reply"></zds-icon-button>
            </slot>
            <zds-dropdown slot="more" position="bottom" align="right" compact ?rounded=${this.rounded} .open=${this.expandMenu}
              @open-change=${(e) => { this.expandMenu = e.detail.open; if (e.detail.open)
                this.reactionControls = false; }}>
              <zds-icon-button slot="trigger" flavour="text" size="small" shape=${shape} icon="more-horizontal" label="More actions" ?data-pressed=${this.expandMenu}></zds-icon-button>
              ${this.held ? nothing : html `<slot name="menu" @slotchange=${() => this.requestUpdate()}></slot>`}
            </zds-dropdown>
          </zds-chat-controls>
        </div>`
            : nothing;
        const assistantControls = assistant && !this.loading
            ? html `<div class="assistant-controls" ?data-hidden=${!this.showControls}>
          <zds-chat-controls controls-style="none" ?rounded=${this.rounded} .showReact=${false} .showMore=${false}>
            <slot name="controls" @slotchange=${this.onSlot("controls")}>
              <zds-icon-button flavour="text" size="small" shape=${shape} icon="copy-file" label="Copy"></zds-icon-button>
              <zds-icon-button flavour="text" size="small" shape=${shape} icon="reply" label="Reply"></zds-icon-button>
              <zds-icon-button flavour="text" size="small" shape=${shape} icon="refresh" label="Regenerate"></zds-icon-button>
            </slot>
          </zds-chat-controls>
        </div>`
            : nothing;
        return html `<div class="root" ?data-header=${header} ?data-held=${this.held}
        style=${styleMap(this.held && this.lift ? { "--zds-chat-lift": `${-this.lift}px` } : {})}
        @pointerdown=${this.startPress} @pointerup=${this.cancelPress} @pointerleave=${this.cancelPress} @pointercancel=${this.cancelPress}
        @contextmenu=${(e) => { if (mobile)
            e.preventDefault(); }}>
        ${lead}
        <div class="main">
          ${header ? html `<div class="header"><span class="name">${this.name}</span>${this.time ? html `<zds-chat-timestamp>${this.time}</zds-chat-timestamp>` : nothing}</div>` : nothing}
          ${this.replyTo ? html `<div class="reply"><zds-icon name="reply" size="xsmall"></zds-icon><span class="reply-to">${this.replyTo}</span><span class="reply-text">${this.replyText}</span></div>` : nothing}
          ${this.loading
            ? html `<zds-chat-loading-indicator label=${this.loadingLabel || (assistant ? "Thinking" : "Typing")} ?rounded=${this.rounded}></zds-chat-loading-indicator>`
            : html `<div class="content">
                <zds-chat-bubble bubble-style=${this.chatStyle === "conversation" && !assistant ? "fill" : "none"} status=${this.bubbleStatus}
                  role-name=${this.roleName === "sender" ? "sender" : "receiver"} ?rounded=${this.rounded}><slot></slot></zds-chat-bubble>
                <div class="attachments" ?hidden=${!this.has.attachments}><slot name="attachments" @slotchange=${this.moveThreads}></slot></div>
              </div>`}
          <div class="reactions" ?hidden=${!this.has.reactions || assistant || this.loading}><slot name="reactions" @slotchange=${this.onSlot("reactions")}></slot></div>
          <div class="footer" ?hidden=${!this.has.footer || assistant || this.loading}><zds-icon name="check-mark" size="small"></zds-icon><slot name="footer" @slotchange=${this.onSlot("footer")}></slot></div>
          ${assistantControls}
        </div>
        ${desktopControls}
        ${this.held ? html `<div class="held-reactions">${this.reactionRow()}</div>` : nothing}
        ${this.held && this.hasMenu ? html `<zds-dropdown-menu class="held-menu" compact ?rounded=${this.rounded}><slot name="menu"></slot></zds-dropdown-menu>` : nothing}
      </div>
      <div class="thread" ?hidden=${!this.has.thread}><slot name="thread" @slotchange=${this.onSlot("thread")}></slot></div>
      ${this.held ? html `<div class="scrim" @pointerdown=${() => this.setHeld(false)}><zds-scrim></zds-scrim></div>` : nothing}`;
    }
};
ZdsChatMessage.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsChatMessage.prototype, "platform", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "chat-style" })
], ZdsChatMessage.prototype, "chatStyle", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: "role-name" })
], ZdsChatMessage.prototype, "roleName", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsChatMessage.prototype, "state", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsChatMessage.prototype, "sequence", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsChatMessage.prototype, "rounded", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-avatar" })
], ZdsChatMessage.prototype, "showAvatar", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-header" })
], ZdsChatMessage.prototype, "showHeader", void 0);
__decorate([
    property({ type: String, attribute: "reply-to" })
], ZdsChatMessage.prototype, "replyTo", void 0);
__decorate([
    property({ type: String, attribute: "reply-text" })
], ZdsChatMessage.prototype, "replyText", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "hide-time" })
], ZdsChatMessage.prototype, "hideTime", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-controls" })
], ZdsChatMessage.prototype, "showControls", void 0);
__decorate([
    property({ type: Boolean, attribute: "reaction-controls" })
], ZdsChatMessage.prototype, "reactionControls", void 0);
__decorate([
    property({ type: Boolean, attribute: "expand-menu" })
], ZdsChatMessage.prototype, "expandMenu", void 0);
__decorate([
    property({ type: String })
], ZdsChatMessage.prototype, "name", void 0);
__decorate([
    property({ type: String })
], ZdsChatMessage.prototype, "initials", void 0);
__decorate([
    property({ type: String, attribute: "avatar-src" })
], ZdsChatMessage.prototype, "avatarSrc", void 0);
__decorate([
    property({ type: String, attribute: "avatar-icon" })
], ZdsChatMessage.prototype, "avatarIcon", void 0);
__decorate([
    property({ type: String })
], ZdsChatMessage.prototype, "time", void 0);
__decorate([
    property({ type: String, attribute: "bubble-status" })
], ZdsChatMessage.prototype, "bubbleStatus", void 0);
__decorate([
    property({ type: String, attribute: "loading-label" })
], ZdsChatMessage.prototype, "loadingLabel", void 0);
__decorate([
    property({ attribute: false })
], ZdsChatMessage.prototype, "reactionOptions", void 0);
__decorate([
    state()
], ZdsChatMessage.prototype, "held", void 0);
__decorate([
    state()
], ZdsChatMessage.prototype, "lift", void 0);
__decorate([
    state()
], ZdsChatMessage.prototype, "has", void 0);
__decorate([
    query(".root")
], ZdsChatMessage.prototype, "root", void 0);
ZdsChatMessage = __decorate([
    customElement("zds-chat-message")
], ZdsChatMessage);
export { ZdsChatMessage };
