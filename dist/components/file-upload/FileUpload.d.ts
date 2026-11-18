import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import "./file-upload.css";
export type FileUploadState = "default" | "dragging" | "error" | "disabled";
export type FileUploadShape = "rounded" | "sharp";
export type FileUploadStatus = "waiting" | "uploading" | "complete" | "error";
export type FileUploadIndicator = "bar" | "ring";
export type FileIndicatorType = "extension" | "unknown" | "icon";
export type FileUploadRejectReason = "type" | "size" | "count";
export interface FileUploadRejection {
    file: File;
    reason: FileUploadRejectReason;
}
/** Every string the component shows or announces. `{name}`, `{size}`, `{count}`, `{done}`, `{total}`, `{percent}`, `{status}` are filled in. */
export declare const fileUploadStrings: {
    headline: string;
    headlineDragging: string;
    or: string;
    selectFiles: string;
    rejectType: string;
    rejectSize: string;
    rejectCount: string;
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
export type FileUploadStrings = typeof fileUploadStrings;
/** Bytes as the product would phrase them: KB under a megabyte, MB with one decimal above. */
export declare const formatFileSize: (n: number) => string;
export interface FileIndicatorProps {
    /** extension: the badge reads `extension`; unknown: a fixed "?"; icon: a glyph instead of text. */
    type?: FileIndicatorType;
    /** The file's extension, four letters at most. Shown on the extension type. */
    extension?: string;
    /** The glyph on the icon type. */
    icon?: IconName;
    shape?: FileUploadShape;
    className?: string;
}
/**
 * The file's badge in a File Upload Item: a surface/shade tile carrying the
 * extension, a "?" for an unknown type, or a glyph.
 *
 * @spec specs/file-upload/file-upload.spec.json
 */
export declare function FileIndicator({ type, extension, icon, shape, className }: FileIndicatorProps): React.JSX.Element;
export interface FileUploadItemProps {
    /** Set by the product as the upload moves on; never derived. */
    status?: FileUploadStatus;
    /** bar: a Progress Bar under the meta line (rows grow). ring: a Progress Circle at the end (rows keep one height). */
    indicator?: FileUploadIndicator;
    /** Follows the File Upload it sits in when unset. */
    shape?: FileUploadShape;
    /** The trailing cancel or delete. Off for lists that must not be edited; on a ring row it also turns off cancel in the circle. */
    showDismiss?: boolean;
    fileName: string;
    /** Badges the file indicator. Defaults to the file name's extension. */
    extension?: string;
    /** The file indicator's type. */
    indicatorType?: FileIndicatorType;
    /** Total size in bytes, for the meta line. */
    size?: number;
    /** 0–100. Clamped and rounded; complete always reads 100. */
    progress?: number;
    /** Replaces "Failed" on an error row: say why, e.g. "Connection lost". */
    errorText?: string;
    onCancel?: () => void;
    onRemove?: () => void;
    onRetry?: () => void;
    className?: string;
}
/**
 * One file in a File Upload list: the file indicator, the name and a meta
 * line, and a progress readout. The trailing control follows the status:
 * close while waiting or uploading, delete once complete or failed, and a
 * failed row also offers Try again. Its accessible name changes with it.
 *
 * Spec issues followed as intended rather than as drawn: `extension` reaches
 * the indicator (Figma binds it to nothing); on a failed ring row Try again
 * stays when `showDismiss` is off (Figma ties both to Show Dismiss); `showDismiss`
 * false also removes the cancel inside the ring, as the metadata says; ring
 * controls are Shape=full when rounded in every status.
 *
 * @spec specs/file-upload/file-upload.spec.json
 */
export declare const FileUploadItem: React.ForwardRefExoticComponent<FileUploadItemProps & React.RefAttributes<HTMLDivElement>>;
export interface FileUploadProps {
    /** Pins the zone's state. Unset, dragging follows a drag of files, error follows `error` or a refusal, disabled follows `disabled`. */
    state?: FileUploadState;
    /** Reaches the zone, the button and every row inside. */
    shape?: FileUploadShape;
    /** The caption line naming what is accepted. */
    caption?: React.ReactNode;
    showCaption?: boolean;
    /** Accepted file types, as the picker's `accept`; applied to dropped files too. */
    accept?: string;
    /** Largest file, in bytes. */
    maxFileBytes?: number;
    /** Most files in one pick or drop. */
    maxFiles?: number;
    multiple?: boolean;
    /** A product error for the zone; shown on the error row. */
    error?: React.ReactNode;
    disabled?: boolean;
    /** Called with the accepted files. The component never uploads. */
    onFilesSelected?: (files: File[]) => void;
    /** Called with the files refused by type, size or count. */
    onFilesRejected?: (rejections: FileUploadRejection[]) => void;
    /** The Files slot: File Upload Item rows, in the order they were added. */
    children?: React.ReactNode;
    strings?: Partial<FileUploadStrings>;
    className?: string;
}
/**
 * A drop zone with a Select files button, and the list of chosen files
 * beneath it. The component never uploads anything: it hands the files
 * over through `onFilesSelected` and shows whatever state the product sets
 * on each row, while `state` reports what the zone itself is doing.
 *
 * Each dropped or picked file is checked against `accept`, `maxFileBytes`
 * and `maxFiles`, in that order; refusals go to `onFilesRejected` and the
 * first one names itself on the error row. Only real files highlight the
 * zone. The Select files button is the keyboard path; the zone takes no
 * focus.
 *
 * @spec specs/file-upload/file-upload.spec.json
 */
export declare const FileUpload: React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLDivElement>>;
