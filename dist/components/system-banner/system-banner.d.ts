import{ZetaSystemBannerProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../icon/icon.js";import"../button/icon-button/icon-button.js";import type{ZetaIconName}from"@zebra-fed/zeta-icons";export type ZetaSystemBannerStatus="default"|"positive"|"negative"|"warning"|"info";declare const ZetaSystemBanner_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A full-width message pinned to the top of a screen or view: a status colour, a title, an optional description and
 * optional actions. It spans its container and stays until something clears it. `layout` picks the desktop banner or
 * the mobile one.
 *
 * It is locked to Dark, whatever the page's mode, so the white text and the controls hold on the strong status
 * colours. The banner stays square; `rounded` sets the shape of the dismiss and every Button or Icon Button in the
 * actions. `status="negative"` never shows a dismiss and interrupts assistive technology; the others announce politely.
 * It reveals by sliding down and pushing the content below; the dismiss or `open=false` plays that in reverse.
 *
 * @slot - The title, when `heading` is not set (the legacy way to give the text).
 * @slot actions - The controls the message needs, typically one small outline-contrast zeta-button.
 * @slot {zeta-icon} leadingIcon - A leading icon in place of the status glyph (legacy).
 * @slot {zeta-icon} trailingIcon - An icon at the trailing end (legacy).
 * @part row - The message row.
 * @event close - The dismiss was pressed. The banner plays its exit and hides first.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5255-2146
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-system-banner--docs
 */export declare class ZetaSystemBanner extends ZetaSystemBanner_base{
/** The status colour. `default` is the success colour, despite the name; `positive` is its legacy name. */
status:ZetaSystemBannerStatus;
/** The desktop view banner or the mobile screen banner. */
layout:"desktop"|"mobile";
/** The headline: what happened (spec: title). */
heading:string;
/** The legacy name for `heading`. */
text?:string;
/** The supporting line. On desktop it makes the banner multiline. */
description:string;
/** Keeps the status glyph. */
showLeadingIcon:boolean;
/** Mobile only: the glyph, chosen per use. Desktop's follows `status`. */
icon:ZetaIconName;
/** Lets the person dismiss the banner. Ignored on negative. */
showClose:boolean;
/** Accessible name of the dismiss. */
closeLabel:string;
/** Shows the banner; false plays the exit and hides it, true again replays the reveal. */
open:boolean;
/** Legacy: `center` centres the message in the row. */
align:"start"|"center";private hasActions;private hasLeading;private hasTrailing;connectedCallback():void;private get row();protected firstUpdated():void;protected updated(changed:PropertyValues<this>):void;private shapeActions;private onActions;private dismiss;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-system-banner":ZetaSystemBanner;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A full-width message pinned to the top of a screen or view: a status colour, a title, an optional description and
 * optional actions. It spans its container and stays until something clears it. `layout` picks the desktop banner or
 * the mobile one.
 *
 * It is locked to Dark, whatever the page's mode, so the white text and the controls hold on the strong status
 * colours. The banner stays square; `rounded` sets the shape of the dismiss and every Button or Icon Button in the
 * actions. `status="negative"` never shows a dismiss and interrupts assistive technology; the others announce politely.
 * It reveals by sliding down and pushing the content below; the dismiss or `open=false` plays that in reverse.
 * ---
 *
 *
 * ### **Events:**
 *  - **close** - The dismiss was pressed. The banner plays its exit and hides first.
 *
 * ### **Slots:**
 *  - _default_ - The title, when `heading` is not set (the legacy way to give the text).
 * - **actions** - The controls the message needs, typically one small outline-contrast zeta-button.
 * - **leadingIcon** - A leading icon in place of the status glyph (legacy).
 * - **trailingIcon** - An icon at the trailing end (legacy).
 *
 * ### **CSS Parts:**
 *  - **row** - The message row.
 */"zeta-system-banner":Partial<ZetaSystemBannerProps&BaseProps&BaseEvents>}}}