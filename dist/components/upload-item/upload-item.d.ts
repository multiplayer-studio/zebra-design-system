import{ZetaUploadItemProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"./file-indicator.js";import"../icon/icon.js";import"../button/button.js";import"../button/icon-button/icon-button.js";import"../progress-indicators/progress-bar/progress-bar.js";import"../progress-indicators/progress-circle/progress-circle.js";
/** Bytes as the product would phrase them: KB under a megabyte, MB with one decimal above. */export declare const formatFileSize:(n:number)=>string;declare const ZetaUploadItem_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** One file in a File Upload list: the file indicator, the name and a meta line, and a progress readout. The status
 * is set by the product. The trailing control follows it: close while waiting or uploading, delete once complete or
 * failed, and a failed row also offers Try again. Its accessible name changes with it. `indicator` chooses between a
 * bar under the meta line, which makes the row taller, and a ring at the row's end, which keeps one height.
 *
 * Spec issues followed as intended rather than as drawn: `extension` reaches the indicator; Try again stays on a
 * failed ring row when `showDismiss` is off; `showDismiss` off also removes the cancel inside the ring; ring controls
 * are a full circle when rounded in every status.
 *
 * @slot leading - Replaces the file indicator, e.g. with a thumbnail.
 * @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when close is pressed while waiting or uploading.
 * @event {CustomEvent} remove - Fired when delete is pressed on a complete or failed row.
 * @event {CustomEvent} retry - Fired when Try again is pressed on a failed row.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8288-545
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-file-upload--docs
 */export declare class ZetaUploadItem extends ZetaUploadItem_base{
/** Set by the product as the upload moves on; never derived. */
status:"waiting"|"uploading"|"complete"|"error";
/** bar: a Progress Bar under the meta line (rows grow). ring: a Progress Circle at the end (rows keep one height). */
indicator:"bar"|"ring";
/** The trailing cancel or delete. Off for lists that must not be edited; on a ring row it also turns off the cancel in the circle. */
showDismiss:boolean;
/** The file's name. One line, ellipsised. */
fileName:string;
/** Badges the file indicator. Defaults to the file name's extension. */
extension?:string;
/** The file indicator's type. */
indicatorType:"extension"|"unknown"|"icon";
/** Total size in bytes, for the meta line. */
size?:number;
/** 0–100. Clamped and rounded; complete always reads 100. */
progress:number;
/** Replaces "Failed" on an error row: say why, e.g. "Connection lost". */
errorText?:string;
/** Status label while waiting. */
waitingText:string;
/** Status label once complete. */
completeText:string;
/** Status label on a failed row, when there is no errorText. */
failedText:string;
/** Try again's label. */
retryText:string;
/** Accessible name of cancel; {name} is replaced. */
cancelLabel:string;
/** Accessible name of delete; {name} is replaced. */
removeLabel:string;private announced;protected updated(changed:PropertyValues<this>):void;private get pct();private get statusText();private fire;private cancel;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-upload-item":ZetaUploadItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * One file in a File Upload list: the file indicator, the name and a meta line, and a progress readout. The status
 * is set by the product. The trailing control follows it: close while waiting or uploading, delete once complete or
 * failed, and a failed row also offers Try again. Its accessible name changes with it. `indicator` chooses between a
 * bar under the meta line, which makes the row taller, and a ring at the row's end, which keeps one height.
 *
 * Spec issues followed as intended rather than as drawn: `extension` reaches the indicator; Try again stays on a
 * failed ring row when `showDismiss` is off; `showDismiss` off also removes the cancel inside the ring; ring controls
 * are a full circle when rounded in every status.
 * ---
 *
 *
 * ### **Events:**
 *  - **name**
 * - **cancelUpload** - Fired when close is pressed while waiting or uploading.
 * - **remove** - Fired when delete is pressed on a complete or failed row.
 * - **retry** - Fired when Try again is pressed on a failed row.
 *
 * ### **Slots:**
 *  - **leading** - Replaces the file indicator, e.g. with a thumbnail.
 */"zeta-upload-item":Partial<ZetaUploadItemProps&BaseProps&BaseEvents>}}}