import{ZetaAvatarRailProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import type{AvatarSize}from"../avatar/avatar-size.js";
/**
 * Shows a group of people as overlapping avatars, with a counter standing in for everyone who did not fit. Up to `max`
 * avatars show (two to four, the first two always), each overlapping the next by a quarter of its diameter. Everyone
 * past `max` is counted into the overflow, so six avatars at `max` 4 read +2. Size moves the whole rail together.
 *
 * Reach for it where the group matters more than the individuals, and for a single Avatar where one person is the
 * subject.
 *
 * @slot {zeta-avatar[]} - The avatars to be displayed in the rail.
 * @part overflow - The counter circle.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6494-1953
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-avatar-rail--docs
 */export declare class ZetaAvatarRail extends LitElement{
/**
 * Shows the close icon on all avatars in the rail. An avatar's own `show-close` attribute takes precedence.
 * The spec's rail pins close off; this stays for existing Zeta use.
 */
showClose:boolean;
/**
 * The size of the avatars in the rail. This will be overridden by the individual avatar's `size` attribute.
 */
size?:AvatarSize;
/** Which end of the stack is shown whole: `start` puts the first avatar on top, `end` the last (and the counter). */
stacking:"start"|"end";
/** How many avatars show, from 2 to 4. Everyone past it is counted into the overflow. */
max:2|3|4;
/** Shows the counter when there are more avatars than `max`. Turn off only where the rail shows the whole group. */
showOverflow:boolean;private avatarCount;private get avatars();private handleSlotChange;
/** Propagates the rail's `show-close` to avatars that do not set their own. */private syncClose;protected updated(changed:Map<string,unknown>):void;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-avatar-rail":ZetaAvatarRail;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Shows a group of people as overlapping avatars, with a counter standing in for everyone who did not fit. Up to `max`
 * avatars show (two to four, the first two always), each overlapping the next by a quarter of its diameter. Everyone
 * past `max` is counted into the overflow, so six avatars at `max` 4 read +2. Size moves the whole rail together.
 *
 * Reach for it where the group matters more than the individuals, and for a single Avatar where one person is the
 * subject.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The avatars to be displayed in the rail.
 *
 * ### **CSS Parts:**
 *  - **overflow** - The counter circle.
 */"zeta-avatar-rail":Partial<ZetaAvatarRailProps&BaseProps&BaseEvents>}}}