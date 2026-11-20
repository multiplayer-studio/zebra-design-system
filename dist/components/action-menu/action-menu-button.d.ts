import{ZetaActionMenuButtonProps,BaseProps,BaseEvents}from"../../jsx.js";import type{ZetaDroppable}from"../dropdown/droppable.js";import"../button/icon-button/icon-button.js";import"../dropdown/menu-item/dropdown-menu-item.js";import"../dropdown/droppable.js";import type{ZetaIconName}from"@zebra-fed/zeta-icons";import type{ZetaDropdownItem}from"../dropdown/dropdown-menu/dropdown-menu-button.js";import{ZetaButton}from"../button/button.js";
/** Zeta Action Menu Button places a button that when clicked opens an action menu containing the items passed into it through the items prop.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=22391-10146
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-action-menu--docs
 */export declare class ZetaActionMenuButton extends ZetaButton{
/** Controls the state of the dropdown menu. */
open:boolean;
/** Array of action items */
items:Array<ZetaDropdownItem>;
/** The icon to be displayed on the button */
icon:ZetaIconName;
/** The alignment of the droppable relative to the action menu. Defaults start if left undefined.*/
alignment?:"start"|"end"|"center";
/** The direction of the droppable relative to the anchor. Defaults to bottom if left undefined.*/
direction?:"left"|"right"|"bottom"|"top";anchor:HTMLElement;droppable:ZetaDroppable;protected firstUpdated():void;private handleClick;private handleOutsideClick;private renderItems;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-action-menu-button":ZetaActionMenuButton;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Zeta Action Menu Button places a button that when clicked opens an action menu containing the items passed into it through the items prop.
 * ---
 *
 *
 * ### **Events:**
 *  - **submit** - Fired when the button is clicked and has the type submit
 *
 * ### **Slots:**
 *  - _default_ - Content shown on button; typically text.
 *
 * ### **CSS Properties:**
 *  - **--flavor-background-color** - Overrides the resting background. _(default: undefined)_
 * - **--flavor-disabled-background-color** - Overrides the disabled background. _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **button** - The button element
 * - **label** - The wrapper around the slotted label, for text buttons.
 * - **icon** - The icon element of the button, for buttons of type "icon".
 */"zeta-action-menu-button":Partial<ZetaActionMenuButtonProps&BaseProps&BaseEvents>}}}