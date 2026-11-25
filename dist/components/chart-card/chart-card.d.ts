import{ZetaChartCardProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../icon/icon.js";declare const ZetaChartCard_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A flexible card component specifically designed for dashboard charts and visualizations.
 *
 * @slot header - The header content of the chart card. If not provided, title and subtitle props will be used.
 * @slot - The main content of the card, typically containing chart visualizations.
 * @slot footer - Footer content, typically containing action buttons or additional information.
 *
 * @cssproperty --chart-card-border-color - The color of the card border
 * @cssproperty --chart-card-border-width - The width of the card border
 * @cssproperty --chart-card-background - The background color of the card
 * @cssproperty --chart-card-min-height - The minimum height of the card content area
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-10&m=dev
 * @storybook ?path=/docs/components-chart-card--docs
 */export declare class ZetaChartCard extends ZetaChartCard_base{
/** The title of the chart card, displayed in the header when no header slot is provided. */
title:string;
/** The subtitle of the chart card, displayed below the title in the header when no header slot is provided. */
subtitle:string;
/** Error message to display in the content area.
 *
 * When provided, the error message will be displayed instead of the slotted content.
 */
error?:string;
/** Whether the card is clickable.
 *
 * When true, the card will have hover effects and can be clicked.
 * Use the `click` event to handle clicks.
 */
clickable:boolean;private hasHeaderSlot;private hasFooterSlot;protected render():import("lit").TemplateResult<1>;private renderHeader;private renderContent;private renderFooter;private handleClick;private handleKeyDown;private handleHeaderSlotChange;private handleFooterSlotChange;connectedCallback():void;disconnectedCallback():void;private updateSlotStates;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-chart-card":ZetaChartCard;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A flexible card component specifically designed for dashboard charts and visualizations.
 * ---
 *
 *
 * ### **Slots:**
 *  - **header** - The header content of the chart card. If not provided, title and subtitle props will be used.
 * - _default_ - The main content of the card, typically containing chart visualizations.
 * - **footer** - Footer content, typically containing action buttons or additional information.
 *
 * ### **CSS Properties:**
 *  - **--chart-card-border-color** - The color of the card border _(default: undefined)_
 * - **--chart-card-border-width** - The width of the card border _(default: undefined)_
 * - **--chart-card-background** - The background color of the card _(default: undefined)_
 * - **--chart-card-min-height** - The minimum height of the card content area _(default: undefined)_
 */"zeta-chart-card":Partial<ZetaChartCardProps&BaseProps&BaseEvents>}}}