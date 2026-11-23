import{ZetaTabItemProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../../badges/indicators/indicators.js";declare const ZetaTabItem_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../../mixins/utils.js").Constructor<import("../../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/** One tab in a zeta-tab-bar: an optional icon, a label and an optional badge. The tab bar sets which tab is selected
 * and moves keyboard focus between them; set `selected` on the tab that shows the current view.
 *
 * @slot - The label. Use real words: it is the tab's name.
 * @slot icon - A leading zeta-icon.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3607-237
 * @storybook ?path=/docs/components-tab-bar--docs
 */export declare class ZetaTabItem extends ZetaTabItem_base{
/** The tab shows the current view. */
selected:boolean;
/** The legacy name for `selected`. */
active:boolean;
/** Shows the slotted icon. */
showLeadingIcon:boolean;
/** Shows a Notification Indicator after the label. */
showBadge:boolean;
/** The badge's count. */
badgeValue?:number;
/** What the badge stands for, read after the label. */
badgeLabel?:string;private hasIcon;private internals;constructor();
/** Selected, by either name. */get isSelected():boolean;protected updated(changed:PropertyValues<this>):void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-tab-item":ZetaTabItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * One tab in a zeta-tab-bar: an optional icon, a label and an optional badge. The tab bar sets which tab is selected
 * and moves keyboard focus between them; set `selected` on the tab that shows the current view.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The label. Use real words: it is the tab's name.
 * - **icon** - A leading zeta-icon.
 */"zeta-tab-item":Partial<ZetaTabItemProps&BaseProps&BaseEvents>}}}