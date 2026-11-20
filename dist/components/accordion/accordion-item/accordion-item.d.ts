import{ZetaAccordionItemProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import"../../icon/icon.js";import"../../button/icon-button/icon-button.js";declare const ZetaAccordionItem_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * One disclosure row in an Accordion. The header names the section it opens; the content sits below it while
 * expanded. A plain row is one target that opens and closes it, with the caret trailing the title. A selectable row
 * splits its targets: a leading control opens and closes it, and the rest of the row selects it, with a check mark
 * trailing the title while selected. Navigation rows have no content and the whole row is the target.
 *
 * Both targets are real buttons (`aria-expanded`, `aria-pressed`) inside the row's heading, so the row works from the
 * keyboard and announces its state.
 *
 * @slot - content displayed when the accordion item is expanded.
 * @slot header - content displayed in the header of the accordion item.
 *
 * @part item-header - The header of the accordion item.
 * @part item-content - The content area of the accordion item.
 * @part header-content - The content area of the accordion item header.
 *
 * @fires item-expanded - Dispatched when the accordion item is expanded or collapsed.
 * @fires item-selected - Dispatched when the accordion item is selected or deselected.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5529-33
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-accordion--docs
 */export declare class ZetaAccordionItem extends ZetaAccordionItem_base{
/**  Title of the accordion item. */
title:string;
/** Whether the accordion item is initially open. */
expanded:boolean;
/** Whether the accordion item is initially selected. */
selected:boolean;
/** Whether the item is selectable */
selectable:boolean;
/** Whether the accordion item is a navigation item. */
navigation:boolean;protected hasDefaultSlot:boolean;protected firstUpdated():void;toggle():void;private toggleSelection;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-accordion-item":ZetaAccordionItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * One disclosure row in an Accordion. The header names the section it opens; the content sits below it while
 * expanded. A plain row is one target that opens and closes it, with the caret trailing the title. A selectable row
 * splits its targets: a leading control opens and closes it, and the rest of the row selects it, with a check mark
 * trailing the title while selected. Navigation rows have no content and the whole row is the target.
 *
 * Both targets are real buttons (`aria-expanded`, `aria-pressed`) inside the row's heading, so the row works from the
 * keyboard and announces its state.
 * ---
 *
 *
 * ### **Events:**
 *  - **item-expanded** - Dispatched when the accordion item is expanded or collapsed.
 * - **item-selected** - Dispatched when the accordion item is selected or deselected.
 *
 * ### **Slots:**
 *  - _default_ - content displayed when the accordion item is expanded.
 * - **header** - content displayed in the header of the accordion item.
 *
 * ### **CSS Parts:**
 *  - **item-header** - The header of the accordion item.
 * - **item-content** - The content area of the accordion item.
 * - **header-content** - The content area of the accordion item header.
 */"zeta-accordion-item":Partial<ZetaAccordionItemProps&BaseProps&BaseEvents>}}}