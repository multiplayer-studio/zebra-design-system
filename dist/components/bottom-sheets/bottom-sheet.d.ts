import{ZetaBottomSheetProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import{type ZetaIconName}from"../../icons.js";import"../card/card-footer/card-footer.js";import"../button/icon-button/icon-button.js";import"../scrim/scrim.js";
/** A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions. It
 * lays out list rows, a grid of tiles three to a row, or generic content, and works out which from what is slotted
 * unless `contentType` says. By default the screen presents the sheet. With `modal`, it presents itself: pinned to the
 * bottom of the viewport over a `zeta-scrim` (tone scrim), focus moved in, and Escape or a scrim click closing it while
 * `dismissible`. Call `show()` and `hide()`, or set `open`.
 *
 * @slot - Content: `zeta-dropdown-menu-item` or `zeta-list-item` rows, `zeta-grid-menu-item` tiles, or anything else.
 * @slot actions - The footer actions, usually an outline and a primary `zeta-button` at size small.
 * @cssproperty --bottom-sheet-max-height - Caps the sheet's height. Figma defines no cap, so this is a Zeta extension. Defaults to 90vh.
 *
 * @event leading-click - The leading button was activated.
 * @event open - A modal sheet opened.
 * @event close - A modal sheet closed, by `hide()`, Escape or a scrim click.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-3343
 * @storybook ?path=/docs/components-bottom-sheet--docs
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
/** Present the sheet at the bottom of the viewport over a scrim, with focus inside. Code only (spec: modal). */
modal:boolean;
/** Whether a modal sheet is shown. */
open:boolean;
/** Escape and a scrim click close a modal sheet. Set the property to false when the sheet needs a decision. */
dismissible:boolean;private readonly dialog?;private readonly scrim?;
/** Opens a modal sheet. */
show():void;
/** Closes a modal sheet. */
hide():void;private onCancel;private onDialogClick;protected updated(changed:PropertyValues<this>):void;
/** Default slot */
items:NodeList|undefined;static styles:import("lit").CSSResultGroup[];private setLayout;
/** Footer actions are slotted */private hasActions;private onActions;private renderLeading;protected willUpdate():void;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-bottom-sheet":ZetaBottomSheet;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions. It
 * lays out list rows, a grid of tiles three to a row, or generic content, and works out which from what is slotted
 * unless `contentType` says. By default the screen presents the sheet. With `modal`, it presents itself: pinned to the
 * bottom of the viewport over a `zeta-scrim` (tone scrim), focus moved in, and Escape or a scrim click closing it while
 * `dismissible`. Call `show()` and `hide()`, or set `open`.
 * ---
 *
 *
 * ### **Events:**
 *  - **close** - A modal sheet closed, by `hide()`, Escape or a scrim click.
 * - **leading-click** - The leading button was activated.
 * - **open** - A modal sheet opened.
 *
 * ### **Methods:**
 *  - **show()** - Opens a modal sheet.
 * - **hide()** - Closes a modal sheet.
 *
 * ### **Slots:**
 *  - _default_ - Content: `zeta-dropdown-menu-item` or `zeta-list-item` rows, `zeta-grid-menu-item` tiles, or anything else.
 * - **actions** - The footer actions, usually an outline and a primary `zeta-button` at size small.
 *
 * ### **CSS Properties:**
 *  - **--bottom-sheet-max-height** - Caps the sheet's height. Figma defines no cap, so this is a Zeta extension. Defaults to 90vh. _(default: undefined)_
 */"zeta-bottom-sheet":Partial<ZetaBottomSheetProps&BaseProps&BaseEvents>}}}