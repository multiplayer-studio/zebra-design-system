import{ZetaCollapsibleMenuItemProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"./caret-indicator.js";import"./sub-menu-item.js";declare const ZetaCollapsibleMenuItem_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/**
 * A group in the Navigation Rail's sub menu: a header row that opens to show nested Sub Menu Items on surface/subtle.
 * The header carries `aria-expanded`; the rows reveal on animations/smooth, off under reduced motion. Slotted
 * `zeta-sub-menu-item`s are set to `nested` and follow the group's `rounded`.
 *
 * @slot - The nested rows: `zeta-sub-menu-item`s.
 * @slot heading - The group's name.
 * @slot {zeta-icon} icon - The header's leading glyph.
 * @event toggle - Fired when the header opens or closes the group; `detail.open` is the new state.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54352
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */export declare class ZetaCollapsibleMenuItem extends ZetaCollapsibleMenuItem_base{static shadowRootOptions:ShadowRootInit;
/** Whether the group's rows show. */
open:boolean;
/** Shows the header's leading glyph. */
showLeadingIcon:boolean;protected updated():void;private nestRows;private toggle;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-collapsible-menu-item":ZetaCollapsibleMenuItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A group in the Navigation Rail's sub menu: a header row that opens to show nested Sub Menu Items on surface/subtle.
 * The header carries `aria-expanded`; the rows reveal on animations/smooth, off under reduced motion. Slotted
 * `zeta-sub-menu-item`s are set to `nested` and follow the group's `rounded`.
 * ---
 *
 *
 * ### **Events:**
 *  - **toggle** - Fired when the header opens or closes the group; `detail.open` is the new state.
 *
 * ### **Slots:**
 *  - _default_ - The nested rows: `zeta-sub-menu-item`s.
 * - **heading** - The group's name.
 * - **icon** - The header's leading glyph.
 */"zeta-collapsible-menu-item":Partial<ZetaCollapsibleMenuItemProps&BaseProps&BaseEvents>}}}