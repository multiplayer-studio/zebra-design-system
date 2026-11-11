import{ZetaPaginationProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../icon/icon.js";declare const ZetaPagination_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Buttons for navigating between pages: four jump controls, the page numbers with the current one selected, and an
 * overflow marker where pages collapse. `outline` and `rounded` apply to every control at once.
 *
 *  @event {CustomEvent<ZetaPageEventDetail>} pageChange - Fired when page change. Contains a single value in details: `page: number`.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4489-1925
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-pagination--docs
 */export declare class ZetaPagination extends ZetaPagination_base{static styles:import("lit").CSSResultGroup[];
/** Total number of pages. */
totalPages:number;
/** Number of pages on both sides of current active page. */
siblingCount:number;
/** Shows first, previous, next and last, the four jump controls, as one group. */
showControls:boolean;
/** Collapses distant pages behind an overflow marker, keeping the first and last page. Off, only the window of
 * pages around the current one shows. */
showMore:boolean;
/** Gives every control and page number a stroke/thin border. */
outline:boolean;
/** Accessible name of the navigation landmark. */
navLabel:string;
/** Current active page. */get currentPage():number;set currentPage(page:number);private range;
/**
 * @fires ZetaPageEvent:pageChange
 */private handlePageChange;private page;private result;private static readonly CONTROL_LABELS;getIconButton(iconName:string,pageNumber:number,disabled:boolean):import("lit-html").TemplateResult<1>;protected render():import("lit-html").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-pagination":ZetaPagination;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Buttons for navigating between pages: four jump controls, the page numbers with the current one selected, and an
 * overflow marker where pages collapse. `outline` and `rounded` apply to every control at once.
 * ---
 *
 *
 * ### **Events:**
 *  - **pageChange** - Fired when page change. Contains a single value in details: `page: number`.
 */"zeta-pagination":Partial<ZetaPaginationProps&BaseProps&BaseEvents>}}}