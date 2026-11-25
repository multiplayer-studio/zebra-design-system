import{ZetaAvatarProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../icon/icon.js";import"../badges/indicators/indicators.js";import type{AvatarSize}from"./avatar-size.js";export type AvatarSwatchColor="purple"|"blue"|"sea"|"yellow"|"orange"|"green"|"burgundy";export type AvatarStatus="available"|"away"|"busy"|"dnd"|"on-shift"|"offline";
/**
 * A visual representation of a user or entity, shown as a photo, initials or an icon, with an optional presence badge
 * and dismiss badge. Nine sizes step from xxxs to xxxl with m as the base; the badges, ring and initials all scale from
 * the avatar's own size. Each presence state carries its own glyph as well as its colour.
 *
 * The presence glyphs come from the Zebra icon set, `@zebra-design-system/icons`.
 *
 * @cssproperty --avatar-color - Overrides the swatch behind initials or an icon.
 * @cssproperty --avatar-initials-color - The colour of the initials.
 * @cssproperty --avatar-border-color - The colour of the ring.
 * @slot - The content of the avatar. Should be an img element, a zeta-icon, or text.
 * @slot status - A custom status badge, shown when `status` is not set.
 * @part ring - The outline ring.
 * @part close - The dismiss badge.
 * @part status - The presence badge.
 * @attr {boolean} show-ring - Shows the ring around the avatar.
 * @attr {boolean} show-close - Shows the dismiss badge.
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the dismiss badge is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4906-1172
 * @storybook ?path=/docs/components-avatar--docs
 */export declare class ZetaAvatar extends LitElement{
/**
 * The size of the avatar.
 * Possible values:
 * - xxxs: 24px
 * - xxs: 32px
 * - xs: 36px
 * - s: 40px
 * - m: 48px
 * - l: 60px
 * - xl: 80px
 * - xxl: 120px
 * - xxxl: 200px
 *
 * Default value: m
 */
size?:AvatarSize;
/**
 * The swatch behind initials or an icon. Not used behind a photo. One of the seven swatches, or any other colour: a
 * token name (`chart/series/2`), a custom property (`--brand-accent`) or a CSS colour value.
 */
swatchColor:AvatarSwatchColor|(string&{});
/** Shows the ring around the avatar. */
showRing:boolean;
/** Shows the dismiss badge. */
showClose:boolean;
/** Accessible name for the dismiss badge, such as "Remove Jane Doe". */
closeLabel:string;
/** Presence state, drawn as a badge with its own glyph and colour. When unset, the `status` slot is shown instead. */
status?:AvatarStatus;
/** Accessible text for the presence badge, such as "Available". Give one whenever `status` is set. */
statusLabel?:string;protected willUpdate(changed:Map<PropertyKey,unknown>):void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-avatar":ZetaAvatar;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A visual representation of a user or entity, shown as a photo, initials or an icon, with an optional presence badge
 * and dismiss badge. Nine sizes step from xxxs to xxxl with m as the base; the badges, ring and initials all scale from
 * the avatar's own size. Each presence state carries its own glyph as well as its colour.
 *
 * The presence glyphs come from the Zebra icon set, `@zebra-design-system/icons`.
 * ---
 *
 *
 * ### **Events:**
 *  - **close** - Fired when the dismiss badge is clicked.
 *
 * ### **Slots:**
 *  - _default_ - The content of the avatar. Should be an img element, a zeta-icon, or text.
 * - **status** - A custom status badge, shown when `status` is not set.
 *
 * ### **CSS Properties:**
 *  - **--avatar-color** - Overrides the swatch behind initials or an icon. _(default: undefined)_
 * - **--avatar-initials-color** - The colour of the initials. _(default: undefined)_
 * - **--avatar-border-color** - The colour of the ring. _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **ring** - The outline ring.
 * - **close** - The dismiss badge.
 * - **status** - The presence badge.
 */"zeta-avatar":Partial<ZetaAvatarProps&BaseProps&BaseEvents>}}}