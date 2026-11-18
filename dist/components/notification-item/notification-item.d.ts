import{ZetaNotificationItemProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../icon/icon.js";
/**
 * A single entry in a notification list: who or what it came from, a title and message, an optional attachment and an
 * action. `read` decides whether the entry still looks unseen; every other part is a toggle, so one element covers
 * the range a real list needs.
 *
 * The leading visual goes in the `leading` slot: a `zeta-avatar` (size xxs) for a person, an `img` for something with
 * artwork of its own, or a `zeta-icon` for a system source, which gets a thin ring. The message goes in the default
 * slot and truncates after two lines, so make sure the full text is reachable elsewhere. Unread and urgency are named
 * for assistive technology, not just drawn.
 *
 * @slot - The message body.
 * @slot leading - The source: a zeta-avatar, an img or a zeta-icon.
 * @slot action - What the entry offers to do, usually one small outline zeta-button.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6020-1488
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-notification-item--docs
 */export declare class ZetaNotificationItem extends LitElement{
/** The entry has been seen: the card drops its fill and the unread dot. */
read:boolean;
/** The entry stands for several collapsed together. Shows a bar under the card while the entry is unread. */
group:boolean;
/** Shows the attachment row. Set `attachment` too; with no filename the row stays hidden. */
showAttachment:boolean;
/** Shows the action slot. Turn it off for a purely informational entry. */
showActions:boolean;
/** Flags the entry as needing attention first. Reserve it: on every entry it signals nothing. */
showUrgencyIndicator:boolean;
/** What happened (spec: title). */
headline:string;
/** When it happened. */
timestamp:string;
/** The attached file's name. */
attachment:string;
/** Accessible text for the unread state. */
unreadLabel:string;
/** Accessible name of the urgency indicator. */
urgencyLabel:string;private flavor;private onLeading;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResult;}declare global{interface HTMLElementTagNameMap{"zeta-notification-item":ZetaNotificationItem;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A single entry in a notification list: who or what it came from, a title and message, an optional attachment and an
 * action. `read` decides whether the entry still looks unseen; every other part is a toggle, so one element covers
 * the range a real list needs.
 *
 * The leading visual goes in the `leading` slot: a `zeta-avatar` (size xxs) for a person, an `img` for something with
 * artwork of its own, or a `zeta-icon` for a system source, which gets a thin ring. The message goes in the default
 * slot and truncates after two lines, so make sure the full text is reachable elsewhere. Unread and urgency are named
 * for assistive technology, not just drawn.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The message body.
 * - **leading** - The source: a zeta-avatar, an img or a zeta-icon.
 * - **action** - What the entry offers to do, usually one small outline zeta-button.
 */"zeta-notification-item":Partial<ZetaNotificationItemProps&BaseProps&BaseEvents>}}}