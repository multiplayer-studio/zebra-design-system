import{ZetaScreenHeaderBarProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../button/icon-button/icon-button.js";declare const ZetaScreenHeaderBar_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * The bar at the top of a screen: a back button, the screen's title and one action. It suits a screen with exactly
 * one primary action; use Top App Bar for more actions or a different leading control.
 *
 * `rounded` sets the shape of the back button and of the Buttons and Icon Buttons in the action slot.
 * The bar is transparent and fills the width of its container.
 *
 * @slot action - The trailing action, usually one primary Button.
 * @event back - Fired when the back button is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5712-3566
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-screen-header-bar--docs
 */export declare class ZetaScreenHeaderBar extends ZetaScreenHeaderBar_base{
/** The screen's name (spec: title). Name the screen rather than the task in progress. */
headline:string;
/** Shows the back button. Turn it off on a root screen with nowhere to go back to. */
showLeadingIcon:boolean;
/** Accessible name of the back button. */
backLabel:string;
/** Heading level of the title. */
headingLevel:number;protected updated():void;private shapeActions;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-screen-header-bar":ZetaScreenHeaderBar;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The bar at the top of a screen: a back button, the screen's title and one action. It suits a screen with exactly
 * one primary action; use Top App Bar for more actions or a different leading control.
 *
 * `rounded` sets the shape of the back button and of the Buttons and Icon Buttons in the action slot.
 * The bar is transparent and fills the width of its container.
 * ---
 *
 *
 * ### **Events:**
 *  - **back** - Fired when the back button is clicked.
 *
 * ### **Slots:**
 *  - **action** - The trailing action, usually one primary Button.
 */"zeta-screen-header-bar":Partial<ZetaScreenHeaderBarProps&BaseProps&BaseEvents>}}}