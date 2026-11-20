import{ZetaDropdownMenuButtonProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import{type ZetaInputType}from"../../../mixins/form-field.js";import type{ZetaDroppable}from"../droppable.js";import"../../button/button.js";import"../../radio-button/radio-button.js";import"../../checkbox/checkbox.js";import"../menu-item/dropdown-menu-item.js";import"./../droppable.js";import type{ZetaIconName}from"@zebra-fed/zeta-icons";import type{ButtonFlavor}from"../../button/button.js";export type ZetaDropdownItem={label:string;icon?:ZetaIconName;checked?:boolean;disabled?:boolean;onClick?:()=>void;};export type ZetaDropdownType=Extract<ZetaInputType,"text-dropdown"|"checkbox-dropdown"|"radio-dropdown">;declare const ZetaDropdownMenuButton_base:import("../../../mixins/utils.js").AbstractConstructor<{type:ZetaInputType;name:string;required:boolean;value:string;disabled:boolean;checked?:boolean;indeterminate:boolean;input:HTMLInputElement;internals:ElementInternals;placeholder:string;min:number;max:number;readOnly?:boolean;handleChange(event:Event):void;handleInput(event:Event):void;handleFocus(event:FocusEvent):void;handleBlur(event:FocusEvent):void;}&LitElement>&import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../../mixins/utils.js").Constructor<import("../../../mixins/flavor.js").FlavoredInterface&LitElement>&import("../../../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&typeof LitElement;
/** Dropdown menus allow users to select an option from a list that appears when the menu is clicked or tapped.
 *
 * Zeta Dropdown Menu Button places a button that when clicked opens a dropdown menu containing the items passed into it through the items prop.
 *
 * @property {boolean} matchParentWidth - Whether the dropdown menu should match the width of its parent. Enabled by default. If disabled, the dropdown menu will size to fit its content.
 * @property {string} defaultText - The default text to display when no item is selected. Defaults to an empty string if nothing is set.
 * @property {boolean} buttonTextMatchesSelected - Whether the button text should update to match the selected item. Default is true. Only applicable for the text-dropdown type.
 * @property {boolean} open - Controls the state of the dropdown menu. Default is false.
 * @property {Array<ZetaDropdownItem>} items - Array of items to populate the dropdown. Includes label, icon (optional), checked (optional), disabled (optional), and onClick (optional) properties.
 * @property {ButtonFlavor} flavor - The flavor of the dropdown button. Default is "primary".
 * @property {ZetaDropdownType} type - The type of dropdown. Options are "text-dropdown", "checkbox-dropdown", and "radio-dropdown". Default is "text-dropdown".
 * @property {string} name - The name of the dropdown menu button for form control. Default is "default".
 * @property {"left" | "right" | "bottom" | "top"} direction - The direction of the droppable relative to the anchor. Defaults to bottom if left undefined.
 *
 * @event {CustomEvent<ZetaDropdownEventDetail>} open - Fired when the dropdown is opened.
 * @event {CustomEvent<ZetaDropdownEventDetail>} close - Fired when the dropdown is closed.
 * @event {InputEvent} input - Fired when the dropdown is closed.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2364-5903
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-dropdown--docs
 */export declare class ZetaDropdownMenuButton extends ZetaDropdownMenuButton_base{
/**
 * Whether the dropdown menu should match the width of its parent.
 * Enabled by default.
 * If disabled, the dropdown menu will size to fit its content.
 */
matchParentWidth:boolean;
/** Whether the button text should update to match the selected item. */
buttonTextMatchesSelected:boolean;
/** The default text to display when no item is selected. */
defaultText:string;
/** Controls the state of the dropdown menu. */
open:boolean;
/** Array of items to populate the dropdown */
items:Array<ZetaDropdownItem>;flavor:ButtonFlavor;
/** The type of dropdown.
 * - "text-dropdown" - A dropdown with a default dropdown buttons.
 * - "checkbox-dropdown" - A dropdown with checkboxes.
 * - "radio-dropdown" - A dropdown with radio buttons.
 */type:ZetaDropdownType;
/** The name of the dropdown menu button for form control*/
name:string;
/** The direction of the droppable relative to the anchor. Defaults to bottom if left undefined.*/
direction?:"left"|"right"|"bottom"|"top";
/** Which edges of the menu and trigger line up (spec: align). `start` is the spec's left (or top, when `direction`
 * is left or right), `end` its right (or bottom). Passed to the menu. */
alignment?:"start"|"end"|"center";
/** Tightens the menu's inset for a cramped rail (spec: Dropdown Menu, Compact). Passed to the menu. */
compact:boolean;
/** The text state which displays the currently selected item */private displayText;private checkedValues;private radioValue;anchor:HTMLElement;droppable:ZetaDroppable;handleChange(_event:Event):void;handleInput(_event:Event):void;protected firstUpdated():void;private handleItemClick;private handleClick;private handleOutsideClick;private renderItems;connectedCallback():void;disconnectedCallback():void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-dropdown-menu-button":ZetaDropdownMenuButton;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Dropdown menus allow users to select an option from a list that appears when the menu is clicked or tapped.
 *
 * Zeta Dropdown Menu Button places a button that when clicked opens a dropdown menu containing the items passed into it through the items prop.
 * ---
 *
 *
 * ### **Events:**
 *  - **open** - Fired when the dropdown is opened.
 * - **close** - Fired when the dropdown is closed.
 * - **input** - Fired when the dropdown is closed.
 *
 * ### **Methods:**
 *  - **handleChange(_event: _Event_): _void_** - Event fired when the input value changes and is committed:
 * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
 * or if it is a text-like input, when the user loses focus from the input.
 * or if it is a checkbox-like input, when the checkbox is toggled.
 * or if it is a radio-like input, when the radio is selected (but not unselected).
 * - **handleInput(_event: _Event_): _void_** - Event fired when the input value changes
 * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
 * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
 */"zeta-dropdown-menu-button":Partial<ZetaDropdownMenuButtonProps&BaseProps&BaseEvents>}}}