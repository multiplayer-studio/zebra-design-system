import{ZetaDroppableProps,BaseProps,BaseEvents}from"../../jsx.js";export*from"./menu-item/dropdown-menu-item.js";import{LitElement,nothing}from"lit";declare const ZetaDroppable_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** The surface a dropdown opens onto (spec: Dropdown Menu): a floating panel holding `zeta-dropdown-menu-item` rows,
 * with its own surface and elevation. It opens on the `direction` side of its `anchor`, 8px away, and lines up per
 * `alignment`. `rounded` reaches every row inside it, so panel and rows agree; `compact` tightens the inset.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2364-5903
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-dropdown--docs
 */export declare class ZetaDroppable extends ZetaDroppable_base{
/** Controls the open state of the droppable. */
open:boolean;
/** Tightens the inset for a menu with little room to spare. */
compact:boolean;
/** The fixed gap between the anchor and the panel (raw 8px in Figma, no token). */private static readonly OFFSET;
/** Controls whether the droppable is fit to the width of the anchor */
matchParentWidth:boolean;
/** The anchor element to position the droppable */
anchor?:HTMLElement;
/** The alignment of the droppable relative to the anchor */
alignment?:"start"|"end"|"center";
/** The direction of the droppable relative to the anchor */
direction?:"left"|"right"|"bottom"|"top";slottedElements:Array<HTMLElement>;private getAnchorPosition;private getDroppablePosition;private topVisible;private bottomVisible;private alignHorizontally;private alignVertically;private setDroppablePosition;private matchParentWidthHandler;private resizeHandler;connectedCallback():void;disconnectedCallback():void;protected updated():void;
/** Rows take the panel's rounded, so panel and rows agree (spec: rounded propagation). */private syncItems;protected render():import("lit").TemplateResult<1>|typeof nothing;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-droppable":ZetaDroppable;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The surface a dropdown opens onto (spec: Dropdown Menu): a floating panel holding `zeta-dropdown-menu-item` rows,
 * with its own surface and elevation. It opens on the `direction` side of its `anchor`, 8px away, and lines up per
 * `alignment`. `rounded` reaches every row inside it, so panel and rows agree; `compact` tightens the inset.
 * ---
 *
 */"zeta-droppable":Partial<ZetaDroppableProps&BaseProps&BaseEvents>}}}