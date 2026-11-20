import{ZetaFilterChipProps,BaseProps,BaseEvents}from"../../../jsx.js";import{nothing}from"lit";import"../../icon/icon.js";import{BaseChip}from"../base-chips/base-chip.js";
/** A switch for one filter criterion. `active` is the real switch: it adds a check mark and flips the chip to the
 * inverse palette, so the on state reads without colour. Name the criterion, not the result.
 *
 * @event {Event} change - Fired when the filter chip is selected/deselected
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5126-3677
 * @storybook ?path=/docs/components-chips--docs
 */export declare class ZetaFilterChip extends BaseChip{
/** Whether the filter is on. */
active?:boolean;static styles:(import("lit").CSSResult|import("lit").CSSResultGroup[])[];getIcon():import("lit").TemplateResult<1>|typeof nothing;clickHandler():void;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-filter-chip":ZetaFilterChip;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A switch for one filter criterion. `active` is the real switch: it adds a check mark and flips the chip to the
 * inverse palette, so the on state reads without colour. Name the criterion, not the result.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired when the filter chip is selected/deselected
 */"zeta-filter-chip":Partial<ZetaFilterChipProps&BaseProps&BaseEvents>}}}