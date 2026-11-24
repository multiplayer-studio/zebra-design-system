import{ZetaDialogProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import type{ZetaIconName}from"../../icons.js";import"../scrim/scrim.js";export type DialogFlavor="default"|"info"|"success"|"warning"|"error";declare const ZetaDialog_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<{returnValue:string;open:boolean;hide:(returnValue?:string)=>Promise<void>;show:()=>Promise<void>;showModal:()=>Promise<void>;onBarrierClicked:(e:Event)=>void;closeOnBarrierClicked:boolean;}&LitElement>&typeof LitElement;
/** A modal message that interrupts the current task until the user responds or dismisses it. The header carries the
 * flavour's glyph and the title, the body holds the message, and the footer offers up to three actions: a text action
 * on the left, and an outline-subtle and a primary action on the right. With no actions slotted, the footer is
 * removed, leaving an informational dialog with nothing to decide. `flavor` changes only the header glyph.
 *
 * The dialog can be shown either as a modal or non-modal dialog. Modal is recommended for most uses.
 * To show the dialog, call `showModal()` or `show()` method:
 *
 * ```ts
 *   (document.querySelector("#dialog1") as ZetaDialog)?.showModal();
 * ```
 * When shown as a modal, clicking the background barrier will close the modal by default; this can be changed with the `closeOnBarrierClicked` property.
 *
 * When the confirm button is clicked, the dialog will close. To change this behavior, you can set the button's `type` attribute to `submit`.
 *
 * @slot - Body of dialog; typically text.
 * @slot {zeta-button} confirm - Button used in footer. Must be of type zeta-button.
 * @slot {zeta-button} cancel - Button used in footer. Must be of type zeta-button.
 * @slot {zeta-button} other - Button used in footer. Must be of type zeta-button.
 *
 * @part dialog - Styles the whole dialog component
 * @part body - Styles the dialog body
 * @part footer - Styles the dialog footer
 * @part header - Styles the dialog header
 *
 * @cssproperty --dialog-max-width - Widest the dialog gets, padding and border included; it follows the page width below that. Defaults to 480px.
 * @cssproperty --dialog-width - Older name for --dialog-max-width. Still works.
 * @cssproperty --dialog-max-height - Max height of the dialog. Defaults to 80vh.
 * @cssproperty --dialog-title-font-size - Font size of the dialog title. Defaults to 1.25rem.
 * @cssproperty --dialog-title-line-height - Line height of the dialog title. Defaults to 1.5rem.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2526-316
 * @storybook ?path=/docs/components-dialog--docs
 */export declare class ZetaDialog extends ZetaDialog_base{constructor();static shadowRootOptions:{delegatesFocus:boolean;clonable?:boolean;customElementRegistry?:CustomElementRegistry;mode:ShadowRootMode;serializable?:boolean;slotAssignment?:SlotAssignmentMode;};private handleSubmit;private getHeaderIconName;private _title;
/** Title of the dialog. */get title():string;set title(value:string);
/**
 * @deprecated Whether header text should be centered.
 * Feature is deprecated.
 */
centered:boolean;
/** Whether the modal is initially open. */
initialOpen:boolean;
/** Whether to show a leading icon in the header. */
showLeadingIcon:boolean;
/** Shows the close button in the header (spec: _Dialog Header, showClose). Hide it only when the dialog must be
 * answered through its actions. */
showClose:boolean;
/** Icon to display in the header. Initial value is undefined. */
leadingIcon?:ZetaIconName;
/**
 * What type of dialog box to show.
 * This will change the icon and icon colour shown in the header.
 *
 * Possible values are:
 * - `default`: Shows black block icon.
 * - `info`: Shows purple info icon.
 * - `success`: Shows green verified icon.
 * - `warning`: Shows yellow warning icon.
 * - `error`: Shows red error icon.
 *
 * @type {DialogFlavor}
 * @defaultValue 'default'
 */
flavor:DialogFlavor;
/**
 * Colour of the confirm button.
 *
 * Possible values are:
 * - `primary`: Blue background.
 * - `positive`: Green background.
 * - `negative`: Red background.
 *
 * @type {"primary" | "positive" | "negative"}
 * @defaultValue 'primary'
 */
confirmButtonFlavor:"primary"|"positive"|"negative";
/** Action button 1 (Confirm). */
confirmBtn:NodeList;
/** Action button 2 (Cancel). */
cancelBtn:NodeList;
/** Action button 3 (Learn more/Other). */
otherBtn:NodeList;private handleActionButtonChange;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-dialog":ZetaDialog;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A modal message that interrupts the current task until the user responds or dismisses it. The header carries the
 * flavour's glyph and the title, the body holds the message, and the footer offers up to three actions: a text action
 * on the left, and an outline-subtle and a primary action on the right. With no actions slotted, the footer is
 * removed, leaving an informational dialog with nothing to decide. `flavor` changes only the header glyph.
 *
 * The dialog can be shown either as a modal or non-modal dialog. Modal is recommended for most uses.
 * To show the dialog, call `showModal()` or `show()` method:
 *
 * ```ts
 *  (document.querySelector("#dialog1") as ZetaDialog)?.showModal();
 * ```
 * When shown as a modal, clicking the background barrier will close the modal by default; this can be changed with the `closeOnBarrierClicked` property.
 *
 * When the confirm button is clicked, the dialog will close. To change this behavior, you can set the button's `type` attribute to `submit`.
 * ---
 *
 *
 * ### **Events:**
 *  - **close**
 * - **cancel**
 *
 * ### **Slots:**
 *  - _default_ - Body of dialog; typically text.
 * - **confirm** - Button used in footer. Must be of type zeta-button.
 * - **cancel** - Button used in footer. Must be of type zeta-button.
 * - **other** - Button used in footer. Must be of type zeta-button.
 *
 * ### **CSS Properties:**
 *  - **--dialog-max-width** - Widest the dialog gets, padding and border included; it follows the page width below that. Defaults to 480px. _(default: undefined)_
 * - **--dialog-width** - Older name for --dialog-max-width. Still works. _(default: undefined)_
 * - **--dialog-max-height** - Max height of the dialog. Defaults to 80vh. _(default: undefined)_
 * - **--dialog-title-font-size** - Font size of the dialog title. Defaults to 1.25rem. _(default: undefined)_
 * - **--dialog-title-line-height** - Line height of the dialog title. Defaults to 1.5rem. _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **dialog** - Styles the whole dialog component
 * - **body** - Styles the dialog body
 * - **footer** - Styles the dialog footer
 * - **header** - Styles the dialog header
 */"zeta-dialog":Partial<ZetaDialogProps&BaseProps&BaseEvents>}}}