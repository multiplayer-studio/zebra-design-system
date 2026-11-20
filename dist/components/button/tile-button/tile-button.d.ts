import{ZetaTileButtonProps,BaseProps,BaseEvents}from"../../../jsx.js";import{type Shape}from"../../../mixins/contourable-three.js";import{type Flavor}from"../../../mixins/flavor.js";import{BaseButton}from"./../base-button.js";import type{ZetaIconName}from"@zebra-fed/zeta-icons";import"../../icon/icon.js";import type{SizeType}from"../../../mixins/size.js";export type TileButtonShape=Exclude<Shape,"full">;export type TileButtonFlavor=Extract<Flavor,"outline-subtle">;declare const ZetaTileButton_base:import("../../../mixins/utils.js").Constructor<import("../../../mixins/flavor.js").FlavoredInterface&import("lit").LitElement>&typeof BaseButton;
/** A large, tappable button with an icon stacked above a label.
 * Ideal for grid layouts, dashboards, or mobile interfaces where quick, visually distinct actions are needed.
 *
 * @slot - Content shown on button; typically text.
 * @part button - The button element
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=23126-110945
 * @storybook https://design.zebra.com/web/storybook/?path=/story/components-buttons--tile-button
 */export declare class ZetaTileButton extends ZetaTileButton_base{
/** @internal */static get styles():(import("lit").CSSResult|import("lit").CSSResultGroup[])[];flavor:TileButtonFlavor;size:SizeType;
/**
 * Whether the component is sharp or rounded.
 * This will change the border radius and icon font.
 *
 * Possible values are:
 * - `sharp`: No border radius, uses "zeta-icons-sharp"
 * - `rounded`: Minimal border radius, uses "zeta-icons-round"
 *
 * @type {'sharp' | 'rounded'}
 * @defaultValue "rounded"
 */
shape:TileButtonShape;
/**
 * Main icon of button. Full list of icons can be found at {@link https://design.zebra.com/icons | Zeta Icons}.
 */
icon?:ZetaIconName;private handleClick;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-tile-button":ZetaTileButton;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A large, tappable button with an icon stacked above a label.
 * Ideal for grid layouts, dashboards, or mobile interfaces where quick, visually distinct actions are needed.
 * ---
 *
 *
 * ### **Events:**
 *  - **submit** - Fired when the button is clicked and has the type submit
 *
 * ### **Slots:**
 *  - _default_ - Content shown on button; typically text.
 *
 * ### **CSS Parts:**
 *  - **button** - The button element
 */"zeta-tile-button":Partial<ZetaTileButtonProps&BaseProps&BaseEvents>}}}