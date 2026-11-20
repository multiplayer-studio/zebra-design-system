import{ZetaSubMenuHeaderProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../button/icon-button/icon-button.js";declare const ZetaSubMenuHeader_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * The title bar of the Navigation Rail's sub menu panel. The default type leads with a glyph; the sub page type leads
 * with a back button. Trailing actions are slotted. Inside a `zeta-navigation-rail` the rail sets `rounded`.
 *
 * @slot icon - The leading glyph (type default). Figma ships a `verified` placeholder.
 * @slot actions - Trailing actions, such as a small Button.
 * @event back - Fired when the back button is clicked (type sub-page).
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54332
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */export declare class ZetaSubMenuHeader extends ZetaSubMenuHeader_base{
/** default leads with a glyph; sub-page leads with a back button. */type:"default"|"sub-page";
/** The panel's title (spec: title). */
headline:string;
/** Shows the leading glyph or back button. Figma leaves it unwired on sub page (spec warn); here it hides either. */
showLeadingIcon:boolean;
/** Shows the trailing actions slot. */
showTrailingActions:boolean;
/** Accessible name of the back button. */
backLabel:string;
/** Heading level of the title. */
headingLevel:number;private hasActions;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-sub-menu-header":ZetaSubMenuHeader;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The title bar of the Navigation Rail's sub menu panel. The default type leads with a glyph; the sub page type leads
 * with a back button. Trailing actions are slotted. Inside a `zeta-navigation-rail` the rail sets `rounded`.
 * ---
 *
 *
 * ### **Events:**
 *  - **back** - Fired when the back button is clicked (type sub-page).
 *
 * ### **Slots:**
 *  - **icon** - The leading glyph (type default). Figma ships a `verified` placeholder.
 * - **actions** - Trailing actions, such as a small Button.
 */"zeta-sub-menu-header":Partial<ZetaSubMenuHeaderProps&BaseProps&BaseEvents>}}}