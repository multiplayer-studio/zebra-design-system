import{ZetaSegmentedItemProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";declare const ZetaSegmentedItem_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button. Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * A segment is a radio in its control's group. Give an icon-only segment an `aria-label`.
 *
 * @slot - The content of the item: a `zeta-icon`, a label, or both.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-774
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-segmented-control--docs
 */export declare class ZetaSegmentedItem extends ZetaSegmentedItem_base{
/**
 * Whether the item is active.
 */
active:boolean;
/** Set by the control: icon and label, the label alone, or the icon alone. */
flavor:"default"|"text-only"|"icon-only";connectedCallback():void;protected updated(changed:PropertyValues<this>):void;render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-segmented-item":ZetaSegmentedItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button. Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * A segment is a radio in its control's group. Give an icon-only segment an `aria-label`.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The content of the item: a `zeta-icon`, a label, or both.
 */"zeta-segmented-item":Partial<ZetaSegmentedItemProps&BaseProps&BaseEvents>}}}