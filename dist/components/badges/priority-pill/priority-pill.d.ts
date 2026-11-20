import{ZetaPriorityPillProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import"../../icon/icon.js";declare const ZetaPriorityPill_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Shows where an item sits on a four step scale, from low to urgent. `status` (spec: level) sets the fill, the
 * circle and the glyph together, `type` (spec: variant) decides whether the name appears beside the circle or the
 * circle stands alone, and `leading` swaps the direction glyph for a rank number.
 *
 * The glyphs point the way the level does: down for low, a dash for medium, up for high and the priority mark for
 * urgent. A number removes that cue, so prefer the glyph unless the exact position in a queue matters.
 *
 * @cssproperty --priority-pill-index-background-color - Color of the index character.
 * @cssproperty --priority-pill-index-text-color - Background color of the index.
 * @cssproperty --priority-pill-text-color - Color of the text.
 * @cssproperty --priority-pill-background-color - Background color of the pill.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6406-410
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */export declare class ZetaPriorityPill extends ZetaPriorityPill_base{
/** Text of Priority.
 *
 * Can also be slotted. */
label?:string;
/** Character shown at start of component. Will be truncated to a single character if longer.
 *
 * Can also be slotted.
 *
 * The value of this property is usually a single digit number that indicates the priority level. */
index?:string|number;
/**
 * (Optional) Status of the priority pill.
 *
 * This changes the color and content of the pill.
 *
 * If not provided, the pill is drawn as low. */
status?:"urgent"|"high"|"medium"|"low";
/** Size of the priority pill */
size:"small"|"large";
/** Type of the priority pill
 *
 * Lozenge shows the whole badge, including the text, while badge only shows the index character.  */type:"badge"|"lozenge";
/** What the circle holds: a direction glyph or the rank in `index`. Defaults to `number` when `index` is set. */
leading?:"icon"|"number";static styles:import("lit").CSSResultGroup[];private static readonly GLYPH;getIndex:()=>string;getText:()=>string;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-priority-pill":ZetaPriorityPill;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Shows where an item sits on a four step scale, from low to urgent. `status` (spec: level) sets the fill, the
 * circle and the glyph together, `type` (spec: variant) decides whether the name appears beside the circle or the
 * circle stands alone, and `leading` swaps the direction glyph for a rank number.
 *
 * The glyphs point the way the level does: down for low, a dash for medium, up for high and the priority mark for
 * urgent. A number removes that cue, so prefer the glyph unless the exact position in a queue matters.
 * ---
 *
 *
 * ### **CSS Properties:**
 *  - **--priority-pill-index-background-color** - Color of the index character. _(default: undefined)_
 * - **--priority-pill-index-text-color** - Background color of the index. _(default: undefined)_
 * - **--priority-pill-text-color** - Color of the text. _(default: undefined)_
 * - **--priority-pill-background-color** - Background color of the pill. _(default: undefined)_
 */"zeta-priority-pill":Partial<ZetaPriorityPillProps&BaseProps&BaseEvents>}}}