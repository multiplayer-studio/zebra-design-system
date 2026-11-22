import{LitElement}from"lit";declare const BaseButton_base:import("../../mixins/utils.js").Constructor<{shape:import("../../mixins/contourable-three.js").Shape;}&LitElement>&import("../../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/**
 * @event {SubmitEvent} submit - Fired when the button is clicked and has the type submit
 */export declare class BaseButton extends BaseButton_base{static formAssociated:boolean;
/** @internal */static shadowRootOptions:ShadowRootInit;
/** The type of the button when used in a form */type?:"submit"|"reset"|"button";constructor();protected internals:ElementInternals;
/** Name for the button, used if the button is in a form. */
name?:string;
/** The value of the name property When submitted as part of a form */
value?:string;focus():void;blur():void;click():void;protected _handleClick(event:Event):Event;
/** @internal */private readonly buttonElement;static styles:import("lit").CSSResultGroup[];}export{};