import{ZetaChatMessageProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../avatar/avatar.js";import"../icon/icon.js";import"../button/icon-button/icon-button.js";import"../scrim/scrim.js";import"./chat-parts.js";import"./chat-media.js";declare const ZetaChatMessage_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
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
 */export declare class ZetaChatMessage extends ZetaChatMessage_base{
/** desktop: controls on hover or focus. mobile: a long press opens reactions and actions over a scrim. */
platform:"mobile"|"desktop";
/** channel: group chats, plain text with avatar and name. conversation: assistant and one-to-one, yours in bubbles on the right. */
chatStyle:"conversation"|"channel";
/** The spec's Role: someone else, you, or the assistant. */
roleName:"receiver"|"sender"|"assistant";
/** Pins the state, reflected. Unset, active follows hover or focus (desktop) or a long press (mobile). */
state?:"default"|"active"|"loading";
/** first starts a run and carries the header; consecutive lines up under it. */
sequence:"first"|"consecutive";
/** Shows the avatar on a first message. */
showAvatar:boolean;
/** Shows the name and time on a first message. */
showHeader:boolean;
/** The author of the quoted message this one answers. */
replyTo:string;
/** The quoted message's text. */
replyText:string;
/** Keeps a consecutive message's time hidden until hover. The column stays either way. */
hideTime:boolean;
/** The assistant's controls under the message. Its space is kept when off. */
showControls:boolean;
/** Opens the reactions row. */
reactionControls:boolean;
/** Opens the action menu. */
expandMenu:boolean;
/** The sender's name. */
name:string;
/** The avatar's initials. */
initials:string;
/** A Zebra glyph (kebab-case) for the avatar instead of initials: the assistant's own avatar (companion). */
avatarIcon:string;
/** The avatar's swatch behind initials or an icon: give each person their own, and the assistant purple. */
avatarColor:string;
/** The send time, formatted. */
time:string;
/** Position in a run of one sender's bubbles. */
bubbleStatus:"single"|"first"|"middle"|"last";
/** The loading label. Defaults to Thinking for the assistant and Typing otherwise. */
loadingLabel:string;
/** The reactions offered in the row. */
reactionOptions:string[];private held;private lift;private has;private pinned?;private press?;private root?;protected willUpdate(changed:PropertyValues<this>):void;private derived;private get loading();
/** Read from the light DOM: a slot leaving the tree fires a last, empty slotchange. */private get hasMenu();
/** Figma carries the thread in the Attachment Slot; in code it moves to its own container (spec Threads). */private moveThreads;private onSlot;private startPress;private cancelPress;private setHeld;private onKey;private onAway;connectedCallback():void;disconnectedCallback():void;private react;private reactionRow;private panel;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-chat-message":ZetaChatMessage;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * One message in a chat, from someone else, you or the assistant. Style sets the setting: channel for group chats,
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
 * ---
 *
 *
 * ### **Events:**
 *  - **heldchange** - Fired when the mobile long press opens or closes.
 * - **react** - Fired when a reaction is chosen.
 *
 * ### **Slots:**
 *  - _default_ - The message text, shown in a Bubble.
 * - **attachments** - The Attachment Slot: zeta-chat-photos or zeta-chat-attachment. A zeta-chat-thread placed here moves to `thread`.
 * - **thread** - The reply thread, in its own container under the message: outside its surface and indented to its text, so opening it or hovering a reply never makes the parent active (spec Threads).
 * - **reactions** - The Reactions Slot: zeta-assist-chip with counts.
 * - **footer** - Delivery status under your own most recent message.
 * - **controls** - The Control Slot: extra actions between React and More.
 * - **menu** - zeta-dropdown-menu-item rows for the action menu (desktop More, mobile long press).
 */"zeta-chat-message":Partial<ZetaChatMessageProps&BaseProps&BaseEvents>}}}