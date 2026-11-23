import { LitElement, type PropertyValues } from "lit";
import "../button/button.js";
import "../icon/icon.js";
import "../file-upload-item/file-upload-item.js";
export type FileUploadState = "default" | "dragging" | "error" | "disabled";
export type FileUploadShape = "rounded" | "sharp";
export type FileUploadRejectReason = "type" | "size" | "count";
export interface FileUploadRejection {
    file: File;
    reason: FileUploadRejectReason;
}
/** Every string the zone shows. `{name}`, `{size}`, `{count}` are filled in. */
export declare const fileUploadStrings: {
    headline: string;
    headlineDragging: string;
    or: string;
    selectFiles: string;
    rejectType: string;
    rejectSize: string;
    rejectCount: string;
};
export type FileUploadStrings = typeof fileUploadStrings;
/**
 * A drop zone with a Select files button, and the list of chosen files
 * beneath it. The component never uploads anything: it hands the files over
 * in `zds-files-selected` and shows whatever state the product sets on each
 * row, while `state` reports what the zone itself is doing.
 *
 * Each dropped or picked file is checked against `accept`, `max-file-bytes`
 * and `max-files`, in that order; refusals fire `zds-files-rejected` and the
 * first one names itself on the error row. Only real files highlight the
 * zone. The Select files button is the keyboard path; the zone takes no
 * focus. `shape` reaches every `zds-file-upload-item` in the slot. Kept in
 * step with packages/react-baseui `<FileUpload>`.
 *
 * @slot - The Files slot: zds-file-upload-item rows, in the order they were added.
 * @fires zds-files-selected - Accepted files. `detail.files`.
 * @fires zds-files-rejected - Refused files. `detail.rejections` (`{ file, reason }`).
 *
 * @spec specs/file-upload/file-upload.spec.json
 */
export declare class ZdsFileUpload extends LitElement {
    static styles: import("lit").CSSResult;
    /** The zone's state, reflected. Set it to pin one; unset, dragging, error and disabled follow what happens. */
    state: FileUploadState | null;
    /** Reaches the zone, the button and every row inside. */
    shape: FileUploadShape;
    caption: string;
    showCaption: boolean;
    accept: string | null;
    maxFileBytes: number | null;
    maxFiles: number | null;
    multiple: boolean;
    /** A product error for the zone, shown on the error row. */
    error: string | null;
    disabled: boolean;
    strings: Partial<FileUploadStrings>;
    private dragging;
    private refusal;
    private hasFiles;
    private pinned;
    private depth;
    private input?;
    protected willUpdate(changed: PropertyValues<this>): void;
    private derived;
    private get off();
    protected updated(changed: PropertyValues<this>): void;
    private syncRows;
    private take;
    private isFiles;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-file-upload": ZdsFileUpload;
    }
}
//# sourceMappingURL=file-upload.d.ts.map