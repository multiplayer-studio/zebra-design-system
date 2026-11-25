import{ZetaSegmentedControlProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import{ZetaSegmentedItem}from"./segmented-item.js";declare const ZetaSegmentedControl_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button.
 * Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * To listen for changes, add a `click` event listener to the `zeta-segmented-control` element.
 *
 * To set the active segment, set the `active` property on the `zeta-segmented-item` element.
 *
 * Exactly one segment is active; the first is chosen when none is. The control is a radio group with one tab stop, and
 * the arrow keys move the choice. A single indicator slides to the active segment on animations/spring, off under
 * reduced motion. `rounded` and `flavor` are set once here and reach every segment.
 *
 * @slot {zeta-segmented-item[]} - The content of the segmented control. Should be a collection of `zeta-segmented-item` elements.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-774
 * @storybook ?path=/docs/components-segmented-control--docs
 */export declare class ZetaSegmentedControl extends ZetaSegmentedControl_base{items:Array<ZetaSegmentedItem>;
/** What every segment shows: icon and label, the label alone, or the icon alone. Sets their padding. */
flavor:"default"|"text-only"|"icon-only";activeItem?:ZetaSegmentedItem;initComplete:boolean;indicator:HTMLDivElement;constructor();connectedCallback():void;private findSegmentedItem;private select;private onKeyDown;private syncItems;protected firstUpdated(_changedProperties:PropertyValues):void;protected updated(changed:PropertyValues<this>):void;render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-segmented-control":ZetaSegmentedControl;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button.
 * Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * To listen for changes, add a `click` event listener to the `zeta-segmented-control` element.
 *
 * To set the active segment, set the `active` property on the `zeta-segmented-item` element.
 *
 * Exactly one segment is active; the first is chosen when none is. The control is a radio group with one tab stop, and
 * the arrow keys move the choice. A single indicator slides to the active segment on animations/spring, off under
 * reduced motion. `rounded` and `flavor` are set once here and reach every segment.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The content of the segmented control. Should be a collection of `zeta-segmented-item` elements.
 */"zeta-segmented-control":Partial<ZetaSegmentedControlProps&BaseProps&BaseEvents>}}}