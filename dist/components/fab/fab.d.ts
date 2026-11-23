import{ZetaFabProps,BaseProps,BaseEvents}from"../../jsx.js";import"../icon/icon.js";import{type Flavor}from"../../mixins/flavor.js";import{BaseButton}from"../button/base-button.js";export type FabFlavor=Extract<Flavor,"primary"|"secondary"|"inverse">;declare const ZetaFab_base:import("../../mixins/utils.js").Constructor<import("../../mixins/flavor.js").FlavoredInterface&import("lit").LitElement>&typeof BaseButton;
/** Floating Action Buttons are used to trigger the primary action on a screen. They are circular buttons that float above the content.
 *
 * @slot - The icon of the button. Entered as a plain string.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21816-4283&m=dev
 * @storybook ?path=/docs/components-fabs--docs
 */export declare class ZetaFab extends ZetaFab_base{static get styles():(import("lit").CSSResult|import("lit").CSSResultGroup[])[];
/**
 * The label display on or below the button.
 */
label:string;flavor:FabFlavor;extended:boolean;size:"small"|"large";private getLabel;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-fab":ZetaFab;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Floating Action Buttons are used to trigger the primary action on a screen. They are circular buttons that float above the content.
 * ---
 *
 *
 * ### **Events:**
 *  - **submit** - Fired when the button is clicked and has the type submit
 *
 * ### **Slots:**
 *  - _default_ - The icon of the button. Entered as a plain string.
 */"zeta-fab":Partial<ZetaFabProps&BaseProps&BaseEvents>}}}