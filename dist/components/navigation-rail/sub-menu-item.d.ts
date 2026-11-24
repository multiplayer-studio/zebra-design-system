import{ZetaSubMenuItemProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"./caret-indicator.js";import"../badges/indicators/indicators.js";import"../tooltip/tooltip.js";declare const ZetaSubMenuItem_base:import("../../mixins/utils.js").Constructor<{href:string;}&LitElement>&import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/**
 * A row in the Navigation Rail's sub menu panel: leading glyph, label, an optional counter badge and an optional
 * caret. Renders a link when `href` is set, otherwise a button; `selected` sets `aria-current="page"`. Inside a
 * `zeta-collapsible-menu-item` the group sets `nested`.
 *
 * A label cut off by its ellipsis shows in full in a tooltip after a 3 second hover, or at once on keyboard focus.
 *
 * @slot - The row's name.
 * @slot {zeta-icon} icon - The leading glyph. Figma ships a `verified` placeholder; swap it.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54275
 * @storybook ?path=/docs/components-navigation-rail--docs
 */export declare class ZetaSubMenuItem extends ZetaSubMenuItem_base{static shadowRootOptions:ShadowRootInit;
/** The row the user is on. */
selected:boolean;
/** A child row under a collapsible group: indented, quieter label, smaller type. Set by the group. */
nested:boolean;
/** Shows the leading glyph. Keep it on for every row in a list, or off for all. */
showLeadingIcon:boolean;
/** Shows the trailing caret, for a row that opens a further level. */
subMenu:boolean;
/** Turns the caret while the level it opens is showing. */
open:boolean;
/** Shows the counter badge between the label and the caret. It takes space in the row. */
showBadge:boolean;
/** The badge's count. Above 99 it reads "99+". */
badgeValue:number;
/** Text equivalent of the badge in the accessible name. Defaults to the count. */
badgeLabel?:string;private tipOpen;private labelEl?;private tipTimer?;private get truncated();private showTip;private hideTip;disconnectedCallback():void;private renderContent;private renderRow;protected render():import("lit").TemplateResult<1>;private guard;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-sub-menu-item":ZetaSubMenuItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A row in the Navigation Rail's sub menu panel: leading glyph, label, an optional counter badge and an optional
 * caret. Renders a link when `href` is set, otherwise a button; `selected` sets `aria-current="page"`. Inside a
 * `zeta-collapsible-menu-item` the group sets `nested`.
 *
 * A label cut off by its ellipsis shows in full in a tooltip after a 3 second hover, or at once on keyboard focus.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The row's name.
 * - **icon** - The leading glyph. Figma ships a `verified` placeholder; swap it.
 */"zeta-sub-menu-item":Partial<ZetaSubMenuItemProps&BaseProps&BaseEvents>}}}