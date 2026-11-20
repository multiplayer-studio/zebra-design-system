import{ZetaAssistChipProps,BaseProps,BaseEvents}from"../../../jsx.js";import"../../icon/icon.js";import{nothing}from"lit";import type{ZetaIconName}from"@zebra-fed/zeta-icons";import{BaseChip}from"../base-chips/base-chip.js";
/** A compact action, phrased as a verb, with an optional leading glyph naming its domain. `color` marks a state or a
 * kind of item through the border and text; `discardable` adds a remove control for an item someone can discard,
 * such as an attached file.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5161-4423
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chips--docs
 *
 * @slot - The content of the chip.
 * @cssproperty --assist-chip-foreground - Overrides the label, icon and remove colour.
 * @cssproperty --assist-chip-background - Overrides the fill.
 * @cssproperty --assist-chip-border - Overrides the border colour.
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the remove control is clicked.
 */export declare class ZetaAssistChip extends BaseChip{
/** The leading glyph naming the action's domain (spec: showLeadingIcon, on when set). */
icon?:ZetaIconName;
/** Marks a state or a kind of item through the border and the text. The fill stays neutral. */
color:"neutral"|"green"|"orange"|"blue"|"red";
/** Adds a remove control after the label. */
discardable:boolean;
/** Accessible name for the remove control, saying what it removes. */
discardLabel:string;static styles:(import("lit").CSSResult|import("lit").CSSResultGroup[])[];getIcon():import("lit").TemplateResult<1>|typeof nothing;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-assist-chip":ZetaAssistChip;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A compact action, phrased as a verb, with an optional leading glyph naming its domain. `color` marks a state or a
 * kind of item through the border and text; `discardable` adds a remove control for an item someone can discard,
 * such as an attached file.
 * ---
 *
 *
 * ### **Events:**
 *  - **close** - Fired when the remove control is clicked.
 *
 * ### **Slots:**
 *  - _default_ - The content of the chip.
 *
 * ### **CSS Properties:**
 *  - **--assist-chip-foreground** - Overrides the label, icon and remove colour. _(default: undefined)_
 * - **--assist-chip-background** - Overrides the fill. _(default: undefined)_
 * - **--assist-chip-border** - Overrides the border colour. _(default: undefined)_
 */"zeta-assist-chip":Partial<ZetaAssistChipProps&BaseProps&BaseEvents>}}}