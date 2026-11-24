import{ZetaCardHeaderProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";
/**
 * The heading row of a card: optional leading content (usually a small Avatar), a heading and a subheading, and
 * optional trailing content (usually a text Icon Button). Use it in a card's header, or in its body above a block of
 * text.
 *
 * @slot - The headline text.
 * @slot leading - Content placed before the headline
 * @slot trailing - Content placed after the headline
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 */export declare class ZetaCardHeader extends LitElement{
/** The headline text. Can Also be slotted. */
headline?:string;
/** The sub headline text. */
subHeadline?:string;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-card-header":ZetaCardHeader;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The heading row of a card: optional leading content (usually a small Avatar), a heading and a subheading, and
 * optional trailing content (usually a text Icon Button). Use it in a card's header, or in its body above a block of
 * text.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The headline text.
 * - **leading** - Content placed before the headline
 * - **trailing** - Content placed after the headline
 */"zeta-card-header":Partial<ZetaCardHeaderProps&BaseProps&BaseEvents>}}}