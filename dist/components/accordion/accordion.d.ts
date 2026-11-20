import{ZetaAccordionProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";declare const ZetaAccordion_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * A vertical stack of Accordion Items, each a header that opens and closes its own content. By default one item is
 * open at a time; `expandMultiple` lets several stay open. The container has no fill of its own. In a card (`inCard`)
 * it takes a thin border and divides its items; `rounded` curves the card's corners.
 *
 * @slot - children should be `zeta-accordion-item` elements.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5529-33
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-accordion--docs
 */export declare class ZetaAccordion extends ZetaAccordion_base{
/** Determines if the ZetaAccordion should be in a card container. */
inCard:boolean;
/** Determines if multiple items can be open at the same time.
    When `false`, only one accordion item can be open at a time. */
expandMultiple:boolean;
/** Determines if multiple accordion items can be selected. */
selectMultiple:boolean;protected firstUpdated(_changedProperties:PropertyValues):void;disconnectedCallback():void;private handleItemExpanded;private handleItemSelected;private getAccordionItems;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-accordion":ZetaAccordion;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A vertical stack of Accordion Items, each a header that opens and closes its own content. By default one item is
 * open at a time; `expandMultiple` lets several stay open. The container has no fill of its own. In a card (`inCard`)
 * it takes a thin border and divides its items; `rounded` curves the card's corners.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - children should be `zeta-accordion-item` elements.
 */"zeta-accordion":Partial<ZetaAccordionProps&BaseProps&BaseEvents>}}}