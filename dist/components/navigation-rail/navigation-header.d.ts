import{ZetaNavigationHeaderProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../button/icon-button/icon-button.js";declare const ZetaNavigationHeader_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * The Navigation Rail's header: a brand mark, and in the wide rail a title and a settings action. Collapsed it shows
 * the mark alone. Inside a `zeta-navigation-rail` the rail sets `expanded` and `rounded`.
 *
 * @slot mark - The brand mark: a `zeta-avatar` at size s (type avatar), or a logo (type logo).
 * @event action - Fired when the action is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54312
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */export declare class ZetaNavigationHeader extends ZetaNavigationHeader_base{
/** Which mark the header carries. Both are slotted; the type sets the logo's framed height. */type:"avatar"|"logo";
/** The wide form, with title and action. Inside a rail, the rail sets it. */
expanded:boolean;
/** The title beside the mark (spec: title). */
headline:string;
/** Shows the title. No effect when collapsed. */
showTitle:boolean;
/** Shows the settings action. No effect when collapsed. */
showIconButton:boolean;
/** Accessible name of the action. */
actionLabel:string;
/** The action's glyph (a Zeta icon name). Settings by default; set any icon, with `action-label` to match. */
actionIcon:string;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-header":ZetaNavigationHeader;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The Navigation Rail's header: a brand mark, and in the wide rail a title and a settings action. Collapsed it shows
 * the mark alone. Inside a `zeta-navigation-rail` the rail sets `expanded` and `rounded`.
 * ---
 *
 *
 * ### **Events:**
 *  - **action** - Fired when the action is clicked.
 *
 * ### **Slots:**
 *  - **mark** - The brand mark: a `zeta-avatar` at size s (type avatar), or a logo (type logo).
 */"zeta-navigation-header":Partial<ZetaNavigationHeaderProps&BaseProps&BaseEvents>}}}