import{ZetaUploadItemProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../icon/icon.js";import"../progress-indicators/progress-circle/progress-circle.js";declare const ZetaUploadItem_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A list tile showing the upload progress of an item.
 *
 * @slot - The title of the file being uploaded.
 * @slot subtitle - Any extra information about the upload.
 * @slot leading - The thumbnail of the file being uploaded.
 *
 * @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when the cancel button inside the progress circle is clicked.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=229-42&node-type=canvas&m=dev
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-file-upload--docs
 */export declare class ZetaUploadItem extends ZetaUploadItem_base{
/** The flavor of the upload item. */
flavor:"default"|"completed"|"error";
/** The progress shown on the progress circle on the upload item. */
progress:number;private getTrailingContent;private onCancelClicked;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-upload-item":ZetaUploadItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A list tile showing the upload progress of an item.
 * ---
 *
 *
 * ### **Events:**
 *  - **cancelUpload** - Fired when the cancel button inside the progress circle is clicked.
 *
 * ### **Slots:**
 *  - _default_ - The title of the file being uploaded.
 * - **subtitle** - Any extra information about the upload.
 * - **leading** - The thumbnail of the file being uploaded.
 */"zeta-upload-item":Partial<ZetaUploadItemProps&BaseProps&BaseEvents>}}}