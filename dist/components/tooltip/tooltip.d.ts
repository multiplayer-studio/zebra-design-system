import{ZetaTooltipProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";declare const ZetaTooltip_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A short floating message that names what an adjacent control does. `point` is the edge the arrow sits on, the edge
 * facing the trigger: bottom puts the bubble above its trigger, left puts it to the right. Placing it against the
 * trigger, and showing and hiding it, belong to whatever uses it. Give the control its own accessible name too: a
 * tooltip alone never reaches anyone who doesn't hover.
 *
 * @slot - The label: a few words naming the action. A long one wraps.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5470-1664
 * @storybook ?path=/docs/components-tooltip--docs
 */export declare class ZetaTooltip extends ZetaTooltip_base{
/** The edge the pointer sits on, facing the trigger. */
point:"left"|"right"|"top"|"bottom";
/** The label, when nothing is slotted. */
label:string;private internals;constructor();protected firstUpdated(_changed:PropertyValues<this>):void;static styles:import("lit").CSSResultGroup[];protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-tooltip":ZetaTooltip;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A short floating message that names what an adjacent control does. `point` is the edge the arrow sits on, the edge
 * facing the trigger: bottom puts the bubble above its trigger, left puts it to the right. Placing it against the
 * trigger, and showing and hiding it, belong to whatever uses it. Give the control its own accessible name too: a
 * tooltip alone never reaches anyone who doesn't hover.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The label: a few words naming the action. A long one wraps.
 */"zeta-tooltip":Partial<ZetaTooltipProps&BaseProps&BaseEvents>}}}