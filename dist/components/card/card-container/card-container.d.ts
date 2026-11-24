import{ZetaCardContainerProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import"../../icon/icon.js";declare const ZetaCardContainer_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A card whose body opens and closes behind a header that is always visible (spec: Collapsible Card). The header
 * carries a title, an optional required mark and a description; when `collapsible`, it is a button that opens and
 * closes the body, led by a chevron that turns as it opens. `ai` outlines the card with the brand gradient (spec:
 * flavor=gradient), for the one card in a group that should draw the eye.
 *
 * Without `collapsible` it is a plain titled card whose content is always shown.
 *
 * @slot - The main content of the card. If `collapsible` is true, this content will be hidden when the card is collapsed.
 * @part content - The content area of the card where slotted content is rendered.
 * @part header - The header area of the card.
 *
 * @figma - https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3007-796
 * @storybook ?path=/story/components-cards--container
 */export declare class ZetaCardContainer extends ZetaCardContainer_base{
/** The title of the card, displayed in the header. */
title:string;
/** Description of the card, displayed in the header. */
description:string;
/** Whether the card is collapsible.
 *
 * Slotted content *must* be provided for the collapsible functionality to work. */
collapsible:boolean;
/** Whether the card is expanded or collapsed.
 *
 * If `collapsible` is true, this property controls the initial state of the card. */
expanded:boolean;
/** Whether the card is required, indicated by a red asterisk (*) in the header.*/
required:boolean;
/** Outlines the card with the brand gradient (spec: flavor=gradient). Use it on one card in a group at most. */
ai:boolean;
/** Internal state to track if slot has content */private hasSlotContent;protected render():import("lit").TemplateResult<1>;private renderHeading;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-card-container":ZetaCardContainer;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A card whose body opens and closes behind a header that is always visible (spec: Collapsible Card). The header
 * carries a title, an optional required mark and a description; when `collapsible`, it is a button that opens and
 * closes the body, led by a chevron that turns as it opens. `ai` outlines the card with the brand gradient (spec:
 * flavor=gradient), for the one card in a group that should draw the eye.
 *
 * Without `collapsible` it is a plain titled card whose content is always shown.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The main content of the card. If `collapsible` is true, this content will be hidden when the card is collapsed.
 *
 * ### **CSS Parts:**
 *  - **content** - The content area of the card where slotted content is rendered.
 * - **header** - The header area of the card.
 */"zeta-card-container":Partial<ZetaCardContainerProps&BaseProps&BaseEvents>}}}