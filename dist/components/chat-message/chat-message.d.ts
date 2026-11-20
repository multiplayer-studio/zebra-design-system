import { LitElement, type PropertyValues } from "lit";
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
export declare class ZdsChatMessage extends LitElement {
    static styles: import("lit").CSSResult;
    platform: ChatPlatform;
    chatStyle: ChatStyle;
    roleName: ChatRole;
    /** Pins the state, reflected. Unset, active follows hover or focus (desktop) or a long press (mobile). */
    state: ChatState | null;
    sequence: "first" | "consecutive";
    rounded: boolean;
    showAvatar: boolean;
    showHeader: boolean;
    replyTo: string;
    replyText: string;
    /** Keeps a consecutive message's time hidden until hover. The column stays either way. */
    hideTime: boolean;
    /** The assistant's controls under the message. Its space is kept when off. */
    showControls: boolean;
    /** Opens the reactions row. */
    reactionControls: boolean;
    /** Opens the action menu. */
    expandMenu: boolean;
    name: string;
    initials: string;
    avatarSrc: string;
    /** A glyph for the avatar instead of initials: the assistant's own avatar (companion). */
    avatarIcon: string;
    /** The avatar's swatch behind initials or an icon: give each person their own, and the assistant purple. */
    avatarColor: string;
    time: string;
    bubbleStatus: ChatBubbleStatus;
    loadingLabel: string;
    reactionOptions: string[];
    private held;
    private lift;
    private has;
    private pinned;
    private press?;
    private root?;
    protected willUpdate(changed: PropertyValues<this>): void;
    private derived;
    private get loading();
    /** Read from the light DOM: a slot leaving the tree fires a last, empty slotchange. */
    private get hasMenu();
    /** Figma carries the thread in the Attachment Slot; in code it moves to its own container (spec Threads). */
    private moveThreads;
    private onSlot;
    private startPress;
    private cancelPress;
    private setHeld;
    private onKey;
    private onAway;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private react;
    private reactionRow;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-chat-message": ZdsChatMessage;
    }
}
//# sourceMappingURL=chat-message.d.ts.map