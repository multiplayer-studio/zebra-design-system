import{ZetaNavigationProfileProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";declare const ZetaNavigationProfile_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * TODO this has been removed from the FIGMA, this may become deprecated soon
 * @slot - The headline text.
 * @slot leading - The leading content. Typically a zeta-avatar.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=1075-21296&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/story/components-navigation-header--profile
 */export declare class ZetaNavigationProfile extends ZetaNavigationProfile_base{protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-profile":ZetaNavigationProfile;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * TODO this has been removed from the FIGMA, this may become deprecated soon
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The headline text.
 * - **leading** - The leading content. Typically a zeta-avatar.
 */"zeta-navigation-profile":Partial<ZetaNavigationProfileProps&BaseProps&BaseEvents>}}}