import{ZetaButtonGroupItemProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import"../../icon/icon.js";declare const ZetaButtonGroupItem_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../../mixins/utils.js").Constructor<import("../../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/**
 * One action in a Button Group: a subtle button whose size and outer corners come from the group, with Button's own
 * hover, pressed, focus and disabled states.
 *
 * @slot - Button label content.
 * @slot {zeta-icon} icon - Icon to display on leading side of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
 * @part button - The button element.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5763-1251
 * @storybook ?path=/docs/components-button-group--docs
 */export declare class ZetaButtonGroupItem extends ZetaButtonGroupItem_base{static shadowRootOptions:ShadowRootInit;
/** Name for the button, used if the button is in a form.*/
name?:string;
/** Size of button. Set by the group; setting it here is overridden. */
size:"small"|"medium"|"large";
/** Whether to show the dropdown icon. */
showDropdown?:boolean;flavor?:"default"|"inverse";onclick:((this:GlobalEventHandlers,ev:MouseEvent)=>unknown)|null;private readonly buttonElement;icon?:Array<Node>;private addGap;focus():void;blur():void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-button-group-item":ZetaButtonGroupItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * One action in a Button Group: a subtle button whose size and outer corners come from the group, with Button's own
 * hover, pressed, focus and disabled states.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - Button label content.
 * - **icon** - Icon to display on leading side of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
 *
 * ### **CSS Parts:**
 *  - **button** - The button element.
 */"zeta-button-group-item":Partial<ZetaButtonGroupItemProps&BaseProps&BaseEvents>}}}