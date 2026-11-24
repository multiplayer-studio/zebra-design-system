import{ZetaCardBodyProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";
/**
 * A block of supporting text in a card, inset by space/lg on every side.
 *
 * @slot - The body content.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 */export declare class ZetaCardBody extends LitElement{protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-card-body":ZetaCardBody;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A block of supporting text in a card, inset by space/lg on every side.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The body content.
 */"zeta-card-body":Partial<ZetaCardBodyProps&BaseProps&BaseEvents>}}}