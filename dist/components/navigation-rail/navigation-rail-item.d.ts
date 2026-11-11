import{ZetaNavigationRailItemProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../badges/indicators/indicators.js";declare const ZetaNavigationRailItem_base:import("../../mixins/utils.js").Constructor<{href:string;}&LitElement>&import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/**
 * A single destination in a Navigation Rail: a glyph in a square target, or glyph and label on one row in the wide
 * form. Selection recolours the glyph and label instead of laying a scrim behind them.
 *
 * Renders a link when `href` is set, otherwise a button; `selected` sets `aria-current="page"`. Inside a
 * `zeta-navigation-rail` the rail sets `expanded`, `showLabel` and `rounded`. The label is always the accessible name,
 * even when it is hidden in the narrow form.
 *
 * @slot - The label of the navigation item.
 * @slot {zeta-icon} icon - The glyph. Figma ships a `star` placeholder; swap it on every item.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54230
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */export declare class ZetaNavigationRailItem extends ZetaNavigationRailItem_base{static shadowRootOptions:ShadowRootInit;
/** The destination the user is on. Exactly one item across the rail and its panel should carry it. */
selected:boolean;
/** The wide form: glyph and label on one row. Inside a rail, the rail sets it. */
expanded:boolean;
/** Adds the caption under the glyph in the narrow form. No effect in the wide form, where the label always shows. */
showLabel:boolean;
/** Shows the glyph, and the badge anchored to it. Keep it on in the narrow form. */
showIcon:boolean;
/** A notification dot over the glyph's top-right corner. It sits outside the layout. */
showBadge:boolean;
/** Text equivalent of the badge, added to the accessible name. */
badgeLabel?:string;
/** Makes the item a disclosure toggle with this `aria-expanded` value. The rail's toggle item uses it. */
toggleExpanded?:boolean;private renderContent;protected render():import("lit-html").TemplateResult<1>;
/** A disabled link must not navigate or reach click listeners on the host. */private guard;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-rail-item":ZetaNavigationRailItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A single destination in a Navigation Rail: a glyph in a square target, or glyph and label on one row in the wide
 * form. Selection recolours the glyph and label instead of laying a scrim behind them.
 *
 * Renders a link when `href` is set, otherwise a button; `selected` sets `aria-current="page"`. Inside a
 * `zeta-navigation-rail` the rail sets `expanded`, `showLabel` and `rounded`. The label is always the accessible name,
 * even when it is hidden in the narrow form.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The label of the navigation item.
 * - **icon** - The glyph. Figma ships a `star` placeholder; swap it on every item.
 */"zeta-navigation-rail-item":Partial<ZetaNavigationRailItemProps&BaseProps&BaseEvents>}}}