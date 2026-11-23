import React from"react";import type{ZetaTableLegacyColumn,ZetaTableLegacyRow,ZetaTableLegacyAction,PaginationType,SortDirection}from"./table-legacy.js";import"./table-legacy.js";export type{ZetaTableLegacyColumn,ZetaTableLegacyRow,ZetaTableLegacyAction,PaginationType,SortDirection};
/**
 * Props accepted by the ZetaTableLegacyReact wrapper.
 *
 * - Table configuration (columns, data, pagination, selection, etc.) maps 1:1
 *   to the Lit component's public properties.
 * - Event callbacks (onSortChange, onLoadMore, etc.) are forwarded as function
 *   references to the Lit component so it can call them directly.
 * - `loadingContent` and `noDataContent` accept React elements that will be
 *   portal-rendered into the Lit component's DOM.
 * - `style` allows passing CSS custom properties for theming (e.g. --table-row-height).
 */export interface ZetaTableLegacyReactProps{columns:ZetaTableLegacyColumn[];data:ZetaTableLegacyRow[];paginationType?:PaginationType;loading?:boolean;hasMoreData?:boolean;selectable?:boolean;selectAll?:boolean;selectedRows?:(string|number)[];expandable?:boolean;exportable?:boolean;columnConfigure?:boolean;showDataCount?:boolean;tableTitle?:string;pageSize?:number;currentPage?:number;totalItems?:number;actionsLabel?:string;searchPlaceholder?:string;refreshLabel?:string;columnsLabel?:string;rowActions?:ZetaTableLegacyAction[];disabledRows?:(string|number)[];allowDisabledSelection?:boolean;loadingContent?:React.ReactNode;noDataContent?:React.ReactNode;onSortChange?:(field:string,direction:SortDirection)=>void;onLoadMore?:(currentCount:number)=>void;onRowAction?:(actionKey:string,rowData:ZetaTableLegacyRow,rowIndex:number)=>void;onRowClick?:(rowData:ZetaTableLegacyRow,rowIndex:number)=>void;selectOnRowClick?:(rowData:ZetaTableLegacyRow,rowIndex:number)=>void;onSelectionChange?:(selectedIds:(string|number)[])=>void;onPageChange?:(page:number,pageSize:number)=>void;onExport?:(data:ZetaTableLegacyRow[])=>void;onRowExpand?:(rowId:string|number,expanded:boolean)=>void;onColumnSearch?:(field:string,value:string,allFilters:Record<string,string>)=>void;onColumnFilter?:(field:string,selectedValues:string[],column:ZetaTableLegacyColumn)=>void;onTableSearch?:(searchTerm:string)=>void;onRefresh?:()=>void;style?:React.CSSProperties;className?:string;"data-id"?:string;}
/**
 * React wrapper for the `zeta-table-legacy` Lit web component (Light DOM).
 *
 * Why this wrapper exists:
 * React cannot natively set complex properties (objects, arrays, functions) on
 * custom elements — it only sets HTML attributes (strings). This wrapper
 * bridges the gap by imperatively assigning JS properties to the underlying
 * <zeta-table-legacy> DOM element.
 *
 * React element → DOM portal pipeline:
 * When a cell value in `data` is a React element (e.g. <CollapsibleItems />),
 * it's rendered via `createPortal` into a stable container <div> that is handed
 * to the Lit component as a DOM Node. This keeps the React element inside the
 * React tree so it inherits context providers (theme, router, i18n, etc.).
 *
 * All DOM mutations (container creation, Lit property assignment) happen inside
 * `useLayoutEffect` (commit phase) to be safe with React 18 concurrent mode,
 * which may call the render function multiple times before committing.
 */export declare const ZetaTableLegacyReact:React.ForwardRefExoticComponent<ZetaTableLegacyReactProps&React.RefAttributes<HTMLElement>>;
/**
 * TypeScript module augmentation: tells the React JSX type system that
 * <zeta-table-legacy> is a valid intrinsic element, suppressing "Property does not
 * exist on type 'JSX.IntrinsicElements'" errors.
 */declare module"react"{namespace JSX{interface IntrinsicElements{"zeta-table-legacy":React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>,HTMLElement>;}}}