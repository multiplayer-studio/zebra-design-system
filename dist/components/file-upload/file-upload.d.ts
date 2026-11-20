import{ZetaFileUploadProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../button/button.js";import"../icon/icon.js";export type FileUploadState="default"|"dragging"|"error"|"disabled";export interface FileUploadRejection{file:File;reason:"type"|"size"|"count";}declare const ZetaFileUpload_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A drop zone with a Select files button, and the list of chosen files beneath it. The component never uploads
 * anything: it hands the files over in `filesselected` and shows whatever state the product sets on each row, while
 * `state` reports what the zone itself is doing, from resting through a drag to a refusal.
 *
 * Each dropped or picked file is checked against `accept`, `maxFileBytes` and `maxFiles`, in that order; refusals
 * fire `filesrejected` and the first one names itself on the error row. Only real files highlight the zone. The Select
 * files button is the keyboard path; the zone takes no focus. `rounded` (Contourable) maps the spec's `shape` and
 * reaches every `zeta-upload-item` in the slot.
 *
 * @slot - The Files slot: zeta-upload-item rows, in the order they were added.
 * @event {CustomEvent<{ files: File[] }>} filesselected - Fired with the accepted files.
 * @event {CustomEvent<{ rejections: FileUploadRejection[] }>} filesrejected - Fired with the refused files.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8289-840
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-file-upload--docs
 */export declare class ZetaFileUpload extends ZetaFileUpload_base{
/** The zone's state, reflected. Set it to pin one; unset, dragging, error and disabled follow what happens. */
state?:FileUploadState;
/** The headline text. */
headline:string;
/** The headline while files are over the zone. */
headlineDragging:string;
/** The Select files button's label. */
selectFilesText:string;
/** The caption naming what is accepted. */
caption:string;
/** Shows the caption. */
showCaption:boolean;
/**
 * A comma separated list of accepted file formats.
 *
 * For more information see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#additional_attributes.
 */
accept?:string;
/** Largest file, in bytes. */
maxFileBytes?:number;
/** Most files in one pick or drop. */
maxFiles?:number;
/** Allows multiple files to be added to the input. Also affects drag and drop. */
multiple:boolean;
/** The name given to the file input. */
name?:string;
/** A product error for the zone, shown on the error row. */
errorMessage?:string;
/** No drops or picks. */
disabled:boolean;private dragging;private refusal;private hasFiles;private pinned?;private depth;fileInput?:HTMLInputElement;private derived;protected willUpdate(changed:PropertyValues<this>):void;protected updated(changed:PropertyValues<this>):void;private get off();private rows;
/** Passes `rounded` to the rows; called on a shape change, so it sets no state of its own. */private passShape;private syncRows;private take;private isFiles;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-file-upload":ZetaFileUpload;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A drop zone with a Select files button, and the list of chosen files beneath it. The component never uploads
 * anything: it hands the files over in `filesselected` and shows whatever state the product sets on each row, while
 * `state` reports what the zone itself is doing, from resting through a drag to a refusal.
 *
 * Each dropped or picked file is checked against `accept`, `maxFileBytes` and `maxFiles`, in that order; refusals
 * fire `filesrejected` and the first one names itself on the error row. Only real files highlight the zone. The Select
 * files button is the keyboard path; the zone takes no focus. `rounded` (Contourable) maps the spec's `shape` and
 * reaches every `zeta-upload-item` in the slot.
 * ---
 *
 *
 * ### **Events:**
 *  - **filesselected** - Fired with the accepted files.
 * - **filesrejected** - Fired with the refused files.
 *
 * ### **Slots:**
 *  - _default_ - The Files slot: zeta-upload-item rows, in the order they were added.
 */"zeta-file-upload":Partial<ZetaFileUploadProps&BaseProps&BaseEvents>}}}