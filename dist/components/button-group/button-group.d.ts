import{ZetaButtonGroupProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";export*from"./button-group-item/button-group-item.js";declare const ZetaButtonGroup_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A row of related actions sharing one bordered surface, where each carries equal weight rather than one leading.
 * The group owns the fill, the outline and the rules between items; each item is a subtle button. Size is the
 * group's call and every item inherits it. Reach for a single Button when one action is clearly the primary one.
 *
 * `rounded` reaches the group's outline and the outer corners of the first and last items, nothing else.
 *
 * @slot - Children must be of type `zeta-button-group-item` otherwise they will not be displayed.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5763-1251
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-button-group--docs
 */export declare class ZetaButtonGroup extends ZetaButtonGroup_base{
/** Size of the group. Every item takes it. */
size:"small"|"medium"|"large";private items;
/** Items take the group's size; it is never set per item (spec: size). */private syncItems;protected updated(changed:PropertyValues):void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-button-group":ZetaButtonGroup;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A row of related actions sharing one bordered surface, where each carries equal weight rather than one leading.
 * The group owns the fill, the outline and the rules between items; each item is a subtle button. Size is the
 * group's call and every item inherits it. Reach for a single Button when one action is clearly the primary one.
 *
 * `rounded` reaches the group's outline and the outer corners of the first and last items, nothing else.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - Children must be of type `zeta-button-group-item` otherwise they will not be displayed.
 */"zeta-button-group":Partial<ZetaButtonGroupProps&BaseProps&BaseEvents>}}}