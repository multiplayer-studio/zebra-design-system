import{ZetaBreadcrumbItemProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import"../../icon/icon.js";declare const ZetaBreadcrumbItem_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../../mixins/utils.js").Constructor<{href:string;}&LitElement>&typeof LitElement;
/**
 * One crumb in a `zeta-breadcrumb`: an optional glyph, a label and the separator after it. Inside a breadcrumb, the
 * parent sets `current` and `separator`, so neither needs setting by hand.
 *
 * @slot - The crumb's label.
 * @slot icon - A `zeta-icon` before the label.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7665-138
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-breadcrumb--docs
 */export declare class ZetaBreadcrumbItem extends ZetaBreadcrumbItem_base{static styles:import("lit").CSSResultGroup[];
/** The page a person is on. It is text, not a link, even with an `href`. */
current:boolean;
/** Shows the chevron after the crumb. */
separator:boolean;
/** A crumb with no `href` still has to be reachable, for a click listener on it. */private handleKey;private renderCrumb;protected render():import("lit-html").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-breadcrumb-item":ZetaBreadcrumbItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * One crumb in a `zeta-breadcrumb`: an optional glyph, a label and the separator after it. Inside a breadcrumb, the
 * parent sets `current` and `separator`, so neither needs setting by hand.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The crumb's label.
 * - **icon** - A `zeta-icon` before the label.
 */"zeta-breadcrumb-item":Partial<ZetaBreadcrumbItemProps&BaseProps&BaseEvents>}}}