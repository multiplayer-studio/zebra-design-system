import{ZetaCardProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";export*from"./card-body/card-body.js";export*from"./card-footer/card-footer.js";export*from"./card-header/card-header.js";declare const ZetaCard_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** The card shell: a bordered surface holding a header, a body and a footer, stacked. It decides the surface, the
 * border, the corners and that content is clipped to the frame, and nothing else; every inset comes from the slotted
 * parts (`zeta-card-header`, `zeta-card-body`, `zeta-card-footer`). Content follows a rounded corner, so a full-bleed
 * image curves with it. The card itself is not interactive.
 *
 * @slot - The content of the card.
 * @cssproperty --card-border-line-width  The line width of the border
 * @cssproperty --card-border-color The color of the border
 * @cssproperty --card-border-line-style The line style of the border
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-cards--docs
 */export declare class ZetaCard extends ZetaCard_base{protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-card":ZetaCard;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The card shell: a bordered surface holding a header, a body and a footer, stacked. It decides the surface, the
 * border, the corners and that content is clipped to the frame, and nothing else; every inset comes from the slotted
 * parts (`zeta-card-header`, `zeta-card-body`, `zeta-card-footer`). Content follows a rounded corner, so a full-bleed
 * image curves with it. The card itself is not interactive.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The content of the card.
 *
 * ### **CSS Properties:**
 *  - **--card-border-line-width** - The line width of the border _(default: undefined)_
 * - **--card-border-color** - The color of the border _(default: undefined)_
 * - **--card-border-line-style** - The line style of the border _(default: undefined)_
 */"zeta-card":Partial<ZetaCardProps&BaseProps&BaseEvents>}}}