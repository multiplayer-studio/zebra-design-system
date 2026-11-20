import{ZetaInputChipProps,BaseProps,BaseEvents}from"../../../jsx.js";import"../../icon/icon.js";import{BaseChip}from"../base-chips/base-chip.js";
/** A value someone entered into a field, usually a name or a term, with a remove control that is always present. Put
 * a `zeta-avatar` at size xxxs in the `leading` slot when the value is a person, and leave it out for a tag or term.
 *
 * @slot - The value, as text.
 * @slot leading - An optional avatar for a person.
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the remove control is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5125-3467
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 */export declare class ZetaInputChip extends BaseChip{
/** Accessible name for the remove control, saying what it removes. */
removeLabel:string;static styles:(import("lit").CSSResult|import("lit").CSSResultGroup[])[];protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-input-chip":ZetaInputChip;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A value someone entered into a field, usually a name or a term, with a remove control that is always present. Put
 * a `zeta-avatar` at size xxxs in the `leading` slot when the value is a person, and leave it out for a tag or term.
 * ---
 *
 *
 * ### **Events:**
 *  - **close** - Fired when the remove control is clicked.
 *
 * ### **Slots:**
 *  - _default_ - The value, as text.
 * - **leading** - An optional avatar for a person.
 */"zeta-input-chip":Partial<ZetaInputChipProps&BaseProps&BaseEvents>}}}