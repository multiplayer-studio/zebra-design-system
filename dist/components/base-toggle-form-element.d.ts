import{LitElement}from"lit";import"./icon/icon.js";declare const BaseToggleFormElement_base:import("../mixins/utils.js").AbstractConstructor<{type:import("../mixins/form-field.js").ZetaInputType;name:string;required:boolean;value:string;disabled:boolean;checked?:boolean;indeterminate:boolean;input:HTMLInputElement;internals:ElementInternals;placeholder:string;min:number;max:number;readOnly?:boolean;handleChange(event:Event):void;handleInput(event:Event):void;handleFocus(event:FocusEvent):void;handleBlur(event:FocusEvent):void;}&LitElement>&import("../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&import("../mixins/utils.js").Constructor<import("../mixins/interactive.js").InteractiveInterface&LitElement>&import("../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * Base Class for Form Elements that toggle (i.e. Checkbox, Radio, Switch)
 *
 * @event {InputEvent} input - Fired when the value of the element changes.
 * @event {Event} change - Fired when the value of the element changes and is committed.
 *
 * @part icon - The icon of the element.
 */export declare abstract class BaseToggleFormElement extends BaseToggleFormElement_base{static shadowRootOptions:ShadowRootInit;handleChange(_event:Event):Event|void;key(e:KeyboardEvent,type:"down"|"up"):void;protected render():unknown;static styles:import("lit").CSSResultGroup[];}export{};