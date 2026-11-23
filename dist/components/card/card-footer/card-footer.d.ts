import{ZetaCardFooterProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";
/**
 * The actions that close out a card. Slotted buttons share the row equally, with space/sm between them; use one
 * primary, or an outline and a primary.
 *
 * @slot - The footer actions, usually zeta-button elements at size small.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 */export declare class ZetaCardFooter extends LitElement{protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-card-footer":ZetaCardFooter;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The actions that close out a card. Slotted buttons share the row equally, with space/sm between them; use one
 * primary, or an outline and a primary.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The footer actions, usually zeta-button elements at size small.
 */"zeta-card-footer":Partial<ZetaCardFooterProps&BaseProps&BaseEvents>}}}