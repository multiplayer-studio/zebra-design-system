import{ZetaFileUploadProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../button/button.js";declare const ZetaFileUpload_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A dialog that allows users to upload files.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=898-10794
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-file-upload--docs
 */export declare class ZetaFileUpload extends ZetaFileUpload_base{private defaultHeadline;private errorMsg;
/** The headline text. */
headline:string;
/** The caption text. */
caption?:string;
/**
 * A comma separated list of accepted file formats.
 *
 * For more information see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#additional_attributes.
 */
accept?:string;
/** Allows multiple files to be added to the input. Also affects drag and drop. */
multiple:boolean;
/** The name given to the file input.*/
name?:string;
/** Used to trigger the 'active' state of the file input. */
active:boolean;
/** Use to show the 'error' state of the file input. */
error:boolean;fileInput?:HTMLInputElement;private checkMultiple;private checkTypes;private typesEqual;private dropHandler;private dragOverHandler;private dragLeaveHandler;private mouseLeaveHandler;private openFileInput;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-file-upload":ZetaFileUpload;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A dialog that allows users to upload files.
 * ---
 *
 */"zeta-file-upload":Partial<ZetaFileUploadProps&BaseProps&BaseEvents>}}}