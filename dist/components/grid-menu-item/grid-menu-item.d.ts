import{ZetaGridMenuItemProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../badges/indicators/indicators.js";declare const ZetaGridMenuItem_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * A destination in a navigation bar, or an entry in a bottom sheet's grid (spec: Navigation Item): an icon over a
 * one- or two-word label. `active` marks where the user is, so give it to exactly one item in a bar; `disabled`
 * applies to inactive items only. `notificationValue` set to `true` puts a dot over the icon's corner without
 * changing the item's size; a number shows a count (a Zeta extension). `tile` is the bottom sheet form (spec: Grid Menu
 * Item): a square with a larger icon and label, which a `zeta-bottom-sheet` sets on its grid items.
 *
 * @slot - Label to be displayed.
 * @slot {zeta-icon} icon - Icon to be displayed. Full list of icons can be found at https://design.zebra.com/icons.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2838-3508
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-grid-menu-item--docs
 */export declare class ZetaGridMenuItem extends ZetaGridMenuItem_base{notificationValue?:string|boolean;active:boolean;
/** The destination is unavailable. Applies to inactive items only. */
disabled:boolean;
/** The bottom sheet tile: a focusable square with a larger icon and label. */
tile:boolean;protected render():import("lit").TemplateResult<1>;protected updated():void;connectedCallback():void;disconnectedCallback():void;private onKeydown;private renderBadge;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-grid-menu-item":ZetaGridMenuItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A destination in a navigation bar, or an entry in a bottom sheet's grid (spec: Navigation Item): an icon over a
 * one- or two-word label. `active` marks where the user is, so give it to exactly one item in a bar; `disabled`
 * applies to inactive items only. `notificationValue` set to `true` puts a dot over the icon's corner without
 * changing the item's size; a number shows a count (a Zeta extension). `tile` is the bottom sheet form (spec: Grid Menu
 * Item): a square with a larger icon and label, which a `zeta-bottom-sheet` sets on its grid items.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - Label to be displayed.
 * - **icon** - Icon to be displayed. Full list of icons can be found at https://design.zebra.com/icons.
 */"zeta-grid-menu-item":Partial<ZetaGridMenuItemProps&BaseProps&BaseEvents>}}}