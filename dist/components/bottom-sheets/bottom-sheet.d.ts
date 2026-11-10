import{ZetaBottomSheetProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import{type ZetaIconName}from"@zebra-fed/zeta-icons";import"../card/card-footer/card-footer.js";import"../button/icon-button/icon-button.js";
/** A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions. It
 * lays out list rows, a grid of tiles three to a row, or generic content, and works out which from what is slotted
 * unless `contentType` says. Moving focus in and dismissing the sheet belong to the screen that presents it.
 *
 * @slot - Content: `zeta-dropdown-menu-item` or `zeta-list-item` rows, `zeta-grid-menu-item` tiles, or anything else.
 * @slot actions - The footer actions, usually an outline and a primary `zeta-button` at size small.
 * @cssproperty --bottom-sheet-max-height - Caps the sheet's height. Figma defines no cap, so this is a Zeta extension. Defaults to 90vh.
 *
 * @event leading-click - The leading button was activated.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-3343
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-bottom-sheet--docs
 */export declare class ZetaBottomSheet extends LitElement{
/** Sheet Header alignment.*/
headerAlignment:"start"|"center";
/** Sheet Header text content.*/
headerText:string;
/** Glyph before the title. Unset shows none, as this element always has. */
headerIcon?:ZetaIconName;
/** Accessible name of the leading button (spec issue: Figma has none). */
leadingLabel:string;
/** How the items are arranged. Unset works it out from what is slotted. */
contentType?:"list"|"grid"|"generic";
/** If the items are list items or grid items */
isGrid:boolean;
/** If the content is generic. E.g. not list or grid items. */
isGenericContent:boolean;
/** If the bottom sheet is collapsed or not */
isExpanded:boolean;
/** Default slot */
items:NodeList|undefined;static styles:import("lit").CSSResultGroup[];private setLayout;
/** Footer actions are slotted */private hasActions;private onActions;private renderLeading;protected willUpdate():void;protected render():import("lit-html").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-bottom-sheet":ZetaBottomSheet;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions. It
 * lays out list rows, a grid of tiles three to a row, or generic content, and works out which from what is slotted
 * unless `contentType` says. Moving focus in and dismissing the sheet belong to the screen that presents it.
 * ---
 *
 *
 * ### **Events:**
 *  - **leading-click** - The leading button was activated.
 *
 * ### **Slots:**
 *  - _default_ - Content: `zeta-dropdown-menu-item` or `zeta-list-item` rows, `zeta-grid-menu-item` tiles, or anything else.
 * - **actions** - The footer actions, usually an outline and a primary `zeta-button` at size small.
 *
 * ### **CSS Properties:**
 *  - **--bottom-sheet-max-height** - Caps the sheet's height. Figma defines no cap, so this is a Zeta extension. Defaults to 90vh. _(default: undefined)_
 */"zeta-bottom-sheet":Partial<ZetaBottomSheetProps&BaseProps&BaseEvents>}}}