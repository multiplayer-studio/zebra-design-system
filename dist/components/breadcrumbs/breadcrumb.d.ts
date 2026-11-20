import{ZetaBreadcrumbProps,BaseProps,BaseEvents}from"../../jsx.js";export*from"./breadcrumb-item/breadcrumb-item.js";import{LitElement,type PropertyValues}from"lit";import"../button/icon-button/icon-button.js";import"../dropdown/droppable.js";import"../dropdown/menu-item/dropdown-menu-item.js";import"../icon/icon.js";import type{ZetaBreadcrumbItem}from"./breadcrumb-item/breadcrumb-item.js";declare const ZetaBreadcrumb_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/** Shows where a page sits in the hierarchy, as a trail of links ending on the current page. Each crumb goes back up a
 * level. A long trail collapses its middle into a compact overflow menu, so every crumb stays reachable.
 *
 * The chevron after each crumb and the current page are worked out from the slotted items; the last one is the current
 * page. `rounded` reaches the overflow control and its menu.
 *
 * @slot - The `zeta-breadcrumb-item` crumbs, root first.
 * @slot leading - Set by the element: it holds the first crumb, so the overflow control follows it.
 *
 * @cssproperty --breadcrumb-current-color - The current page's text and icon. Set by `flavor`.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7667-447
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-breadcrumb--docs
 */export declare class ZetaBreadcrumb extends ZetaBreadcrumb_base{static styles:import("lit").CSSResultGroup[];
/**
 * The maximum number of items to display in the breadcrumb.
 * For example, if the value is 3 and there are 5 items in the breadcrumb:
 * * The first item will always be displayed.
 * * The last 2 items will always be displayed.
 * * The rest of the items will be moved to the overflow menu.
 *
 * The minimum is 2. Leave it at 0 to show every item.
 */
maxItems:number;
/** How the current page stands out. `accent` sets it and its icon in blue. */
flavor:"default"|"accent";
/** Accessible name of the trail. */
label:string;
/** Accessible name of the overflow control (spec issue: Figma has none). */
overflowLabel:string;
/** The items moved to the overflow menu. */private hiddenItems;
/** The overflow menu is showing. */private open;private overflowButton?;
/** The `zeta-breadcrumb-item` children, root first. */get items():ZetaBreadcrumbItem[];private get rows();private get triggerButton();
/** Marks each item for its place in the trail, and works out which ones the overflow menu holds. */private syncItems;private handleOutsideClick;private toggle;private close;
/** Follows the hidden crumb. Going through its link keeps its href and any click listener on it working. */private select;private focusRow;
/** zeta-droppable has no keyboard handling of its own. */private handleMenuKey;private itemLabel;private renderRow;private renderOverflow;connectedCallback():void;disconnectedCallback():void;protected willUpdate(changed:PropertyValues<this>):void;
/** Waits for the menu to draw its rows, then moves focus in. */private focusFirstRow;protected updated(changed:PropertyValues):void;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-breadcrumb":ZetaBreadcrumb;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Shows where a page sits in the hierarchy, as a trail of links ending on the current page. Each crumb goes back up a
 * level. A long trail collapses its middle into a compact overflow menu, so every crumb stays reachable.
 *
 * The chevron after each crumb and the current page are worked out from the slotted items; the last one is the current
 * page. `rounded` reaches the overflow control and its menu.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The `zeta-breadcrumb-item` crumbs, root first.
 * - **leading** - Set by the element: it holds the first crumb, so the overflow control follows it.
 *
 * ### **CSS Properties:**
 *  - **--breadcrumb-current-color** - The current page's text and icon. Set by `flavor`. _(default: undefined)_
 */"zeta-breadcrumb":Partial<ZetaBreadcrumbProps&BaseProps&BaseEvents>}}}