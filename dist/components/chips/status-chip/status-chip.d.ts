import{ZetaStatusChipProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";declare const ZetaStatusChip_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A chip that looks like a label.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=21265-14282
 * @storybook ?path=/docs/components-chips--docs
 */export declare class ZetaStatusChip extends ZetaStatusChip_base{
/** Text displayed in the chip.  */
text:string;static styles:import("lit").CSSResultGroup[];protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-status-chip":ZetaStatusChip;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A chip that looks like a label.
 * ---
 *
 */"zeta-status-chip":Partial<ZetaStatusChipProps&BaseProps&BaseEvents>}}}