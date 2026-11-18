import{ZetaLabelProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";declare const ZetaLabel_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Names a category on an item in a word or two. `status` carries the standing of that category, and `bold` and
 * `outlined` decide how hard it pushes, from a solid fill down to a tint with no visible edge. It reports and never
 * responds, which is the line between it and Chip.
 *
 * Bold and outlined combine into three forms: bold, outlined (bold off) and plain (both off). Bold wins when both are
 * set, because that pair is not built.
 *
 * @slot  - Text displayed on the label. If not provided, the `label` property will be used.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6404-328
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */export declare class ZetaLabel extends ZetaLabel_base{
/** The standing of the category (spec: variant). */
status:"info"|"positive"|"warning"|"negative"|"neutral";
/** Text displayed on label.
 *
 * Can also be slotted. */
label?:string;
/** Solid fill with light text, the strongest form. Turn off for a tint that supports the item rather than leads it. */
bold:boolean;
/** Adds a thin border to the tinted fill. Applies only when `bold` is off. */
outlined:boolean;static styles:import("lit").CSSResultGroup[];protected render():import("lit-html").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-label":ZetaLabel;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Names a category on an item in a word or two. `status` carries the standing of that category, and `bold` and
 * `outlined` decide how hard it pushes, from a solid fill down to a tint with no visible edge. It reports and never
 * responds, which is the line between it and Chip.
 *
 * Bold and outlined combine into three forms: bold, outlined (bold off) and plain (both off). Bold wins when both are
 * set, because that pair is not built.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - Text displayed on the label. If not provided, the `label` property will be used.
 */"zeta-label":Partial<ZetaLabelProps&BaseProps&BaseEvents>}}}