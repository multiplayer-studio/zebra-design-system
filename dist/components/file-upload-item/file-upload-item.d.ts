import { LitElement, type PropertyValues } from "lit";
import "../file-indicator/file-indicator.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../button/button.js";
import "../progress-bar/progress-bar.js";
import "../progress-circle/progress-circle.js";
import type { FileIndicatorType } from "../file-indicator/file-indicator.js";
export type FileUploadStatus = "waiting" | "uploading" | "complete" | "error";
export type FileUploadIndicator = "bar" | "ring";
/** Every string a row shows or announces. `{name}`, `{done}`, `{total}`, `{percent}`, `{status}` are filled in. */
export declare const fileUploadItemStrings: {
    waiting: string;
    complete: string;
    failed: string;
    transferred: string;
    transferredPercent: string;
    cancel: string;
    remove: string;
    retry: string;
    retryNamed: string;
    announce: string;
};
export type FileUploadItemStrings = typeof fileUploadItemStrings;
/** Bytes as the product would phrase them: KB under a megabyte, MB with one decimal above. */
export declare const formatFileSize: (n: number) => string;
/**
 * One file in a File Upload list: the file indicator, the name and a meta
 * line, and a progress readout. The trailing control follows the status:
 * close while waiting or uploading, delete once complete or failed, and a
 * failed row also offers Try again. Its accessible name changes with it.
 *
 * Spec issues followed as intended rather than as drawn: `extension`
 * reaches the indicator; Try again stays on a failed ring row when
 * `show-dismiss` is off; `show-dismiss` off also removes the cancel inside
 * the ring; ring controls are a full circle when rounded in every status.
 * Kept in step with packages/react-baseui `<FileUploadItem>`.
 *
 * @fires zds-cancel - Close pressed while waiting or uploading.
 * @fires zds-remove - Delete pressed on a complete or failed row.
 * @fires zds-retry - Try again pressed on a failed row.
 *
 * @spec specs/file-upload/file-upload.spec.json
 */
export declare class ZdsFileUploadItem extends LitElement {
    static styles: import("lit").CSSResult;
    /** Set by the product as the upload moves on; never derived. */
    status: FileUploadStatus;
    /** bar: a Progress Bar under the meta line (rows grow). ring: a Progress Circle at the end (rows keep one height). */
    indicator: FileUploadIndicator;
    /** Set by the File Upload it sits in. */
    shape: "rounded" | "sharp";
    /** The trailing cancel or delete. Off for lists that must not be edited; on a ring row it also turns off cancel in the circle. */
    showDismiss: boolean;
    fileName: string;
    /** Badges the file indicator. Defaults to the file name's extension. */
    extension: string | null;
    indicatorType: FileIndicatorType;
    /** Total size in bytes, for the meta line. */
    size: number | null;
    /** 0–100. Clamped and rounded; complete always reads 100. */
    progress: number;
    /** Replaces "Failed" on an error row: say why, e.g. "Connection lost". */
    errorText: string | null;
    strings: Partial<FileUploadItemStrings>;
    private announced;
    protected updated(changed: PropertyValues<this>): void;
    private get pct();
    private statusText;
    private fire;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-file-upload-item": ZdsFileUploadItem;
    }
}
//# sourceMappingURL=file-upload-item.d.ts.map