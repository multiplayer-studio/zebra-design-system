import{ZetaStepperItemProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,nothing,type PropertyValues,type TemplateResult}from"lit";import"../icon/icon.js";
/** Where a step stands. One step in a stepper is `active`. */export type StepperItemStatus="default"|"complete"|"active"|"partial"|"error"|"disabled";
/** Which step part the item draws. Set by the parent zeta-stepper. */export type StepperItemKind="horizontal"|"vertical"|"card"|"segment";
/** @deprecated Use `status`. `success` is `complete`. */export type StepperItemFlavor="partial"|"success"|"active"|"default";
/**
 * One step of a zeta-stepper. It draws Step / Horizontal, Step / Vertical, Step Card or Step Segment, whichever the
 * parent's `variant`, `size` and `card` call for. Each step sets its own `status`; keep exactly one `active`.
 * Steps are numbered from 1 automatically, and the last drops its connector.
 *
 * @slot - The label, when `label` is not set.
 * @part indicator - The numbered circle.
 * @event select - The step's text was chosen. Only with `selectable`. `detail.position` is the step's number.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7357-18457
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-stepper--docs
 */export declare class ZetaStepperItem extends LitElement{
/** How the step reads at a glance: the indicator, the label colour and the connector all follow it. */
status:StepperItemStatus;
/** @deprecated Use `status`. Sets `status`, with `success` as `complete`. */
flavor?:StepperItemFlavor;
/** Names the step in a word or two. Wins over the slotted label. */
label:string;
/** A qualifier under the label, a word or two. Drawn when `show-subtitle` is on. */
subtitle?:string;
/** Draws the subtitle. Defaults to on when a subtitle is given; `show-subtitle="false"` hides it. */
showSubtitle?:boolean;
/** Draws the connector to the next step. By default every step but the last draws it. */
showLine?:boolean;
/** The number in the indicator. Defaults to the step's position. complete and error show a glyph instead. */
stepNumber?:string|number;
/** Makes the step's text a button that fires `select`, for going back to a step. Only the focus ring shows it. */
selectable:boolean;
/** Shows a pen on the indicator while the step is being edited. Kept from the old item; not in the spec. */
editing:boolean;
/** Which step part to draw. Set by the parent zeta-stepper. */
kind:StepperItemKind;
/** Card corners. Set by the parent's `rounded`. */
shape:"rounded"|"sharp";
/** The step's 1-based position. Set by the parent zeta-stepper. */
position:number;
/** Whether this is the last step. Set by the parent zeta-stepper. */
last:boolean;
/** False when the parent zeta-stepper's `show-subtitle` is off, which hides this step's subtitle too. */
parentShowSubtitle:boolean;connectedCallback():void;protected willUpdate(changed:PropertyValues<this>):void;protected updated(changed:PropertyValues<this>):void;private get hasLine();private indicator;private text;private handleSelect;protected render():TemplateResult<1>|typeof nothing;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-stepper-item":ZetaStepperItem;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * One step of a zeta-stepper. It draws Step / Horizontal, Step / Vertical, Step Card or Step Segment, whichever the
 * parent's `variant`, `size` and `card` call for. Each step sets its own `status`; keep exactly one `active`.
 * Steps are numbered from 1 automatically, and the last drops its connector.
 * ---
 *
 *
 * ### **Events:**
 *  - **select** - The step's text was chosen. Only with `selectable`. `detail.position` is the step's number.
 *
 * ### **Slots:**
 *  - _default_ - The label, when `label` is not set.
 *
 * ### **CSS Parts:**
 *  - **indicator** - The numbered circle.
 */"zeta-stepper-item":Partial<ZetaStepperItemProps&BaseProps&BaseEvents>}}}