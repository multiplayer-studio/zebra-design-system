import{ZetaCaretIndicatorProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../icon/icon.js";declare const ZetaCaretIndicator_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * The caret that marks something as able to open, and turns when it does. Figma swaps glyphs per state; here one
 * glyph rotates (owner decision): `expand_more` turned 180° for vertical, `chevron_right` turned 90° for horizontal.
 * Decorative: the control it sits in carries `aria-expanded`. The colour is currentColor.
 *
 * @cssproperty --caret-indicator-motion - Duration and easing of the turn. Inside the rail it is animations/smooth.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54347
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */export declare class ZetaCaretIndicator extends ZetaCaretIndicator_base{
/** Whether the thing it marks is open. Turns the glyph. */
open:boolean;
/** vertical: a list that drops down. horizontal: a row that opens a further level. */
direction:"vertical"|"horizontal";
/** The nested Icon's size: small 16px, medium 20px, large 28px (measured in Figma). */
size:"small"|"medium"|"large";protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-caret-indicator":ZetaCaretIndicator;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The caret that marks something as able to open, and turns when it does. Figma swaps glyphs per state; here one
 * glyph rotates (owner decision): `expand_more` turned 180° for vertical, `chevron_right` turned 90° for horizontal.
 * Decorative: the control it sits in carries `aria-expanded`. The colour is currentColor.
 * ---
 *
 *
 * ### **CSS Properties:**
 *  - **--caret-indicator-motion** - Duration and easing of the turn. Inside the rail it is animations/smooth. _(default: undefined)_
 */"zeta-caret-indicator":Partial<ZetaCaretIndicatorProps&BaseProps&BaseEvents>}}}