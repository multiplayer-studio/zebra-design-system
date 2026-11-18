import * as React from "react";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Icon, type IconName } from "../icon/Icon.js";
import { ProgressBar } from "../progress-bar/ProgressBar.js";
import { ProgressCircle } from "../progress-circle/ProgressCircle.js";
import "./file-upload.css";

export type FileUploadState = "default" | "dragging" | "error" | "disabled";
export type FileUploadShape = "rounded" | "sharp";
export type FileUploadStatus = "waiting" | "uploading" | "complete" | "error";
export type FileUploadIndicator = "bar" | "ring";
export type FileIndicatorType = "extension" | "unknown" | "icon";
export type FileUploadRejectReason = "type" | "size" | "count";
export interface FileUploadRejection { file: File; reason: FileUploadRejectReason }

/** Every string the component shows or announces. `{name}`, `{size}`, `{count}`, `{done}`, `{total}`, `{percent}`, `{status}` are filled in. */
export const fileUploadStrings = {
  headline: "Drop files here to upload",
  headlineDragging: "Release to upload",
  or: "or",
  selectFiles: "Select files",
  rejectType: "{name} isn't a supported file type.",
  rejectSize: "{name} is over the {size} limit.",
  rejectCount: "You can upload up to {count} files.",
  waiting: "Waiting",
  complete: "Complete",
  failed: "Failed",
  transferred: "{done} of {total}",
  transferredPercent: "{done} of {total} · {percent}%",
  cancel: "Cancel upload of {name}",
  remove: "Remove {name}",
  retry: "Try again",
  retryNamed: "Try uploading {name} again",
  announce: "{name}: {status}",
};
export type FileUploadStrings = typeof fileUploadStrings;

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
/** Bytes as the product would phrase them: KB under a megabyte, MB with one decimal above. */
export const formatFileSize = (n: number) =>
  n >= 1024 * 1024 ? `${Math.round((n / (1024 * 1024)) * 10) / 10} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
const matchesAccept = (f: File, accept?: string) => {
  if (!accept) return true;
  const type = f.type.toLowerCase(), name = f.name.toLowerCase();
  return accept.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
    .some((t) => (t.startsWith(".") ? name.endsWith(t) : t.endsWith("/*") ? type.startsWith(t.slice(0, -1)) : type === t));
};
const StringsContext = React.createContext<FileUploadStrings>(fileUploadStrings);
const ShapeContext = React.createContext<FileUploadShape | null>(null);

// ---- File Indicator --------------------------------------------------------

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
export function FileIndicator({ type = "extension", extension = "", icon = "video-play", shape, className }: FileIndicatorProps) {
  const inherited = React.useContext(ShapeContext);
  return (
    <span className={["zds-file-indicator", className].filter(Boolean).join(" ")} data-type={type}
      data-shape={shape ?? inherited ?? "rounded"} aria-hidden="true">
      <span className="zds-file-indicator__badge">
        {type === "icon" ? <Icon name={icon} size="small" /> : type === "unknown" ? "?" : extension.slice(0, 4).toUpperCase()}
      </span>
    </span>
  );
}

// ---- File Upload Item ------------------------------------------------------

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
export const FileUploadItem = React.forwardRef<HTMLDivElement, FileUploadItemProps>(function FileUploadItem(
  { status = "waiting", indicator = "bar", shape, showDismiss = true, fileName, extension, indicatorType = "extension",
    size, progress = 0, errorText, onCancel, onRemove, onRetry, className },
  ref,
) {
  const S = React.useContext(StringsContext);
  const inherited = React.useContext(ShapeContext);
  const sh = shape ?? inherited ?? "rounded";
  const ring = indicator === "ring";
  const pct = status === "complete" ? 100 : Math.round(Math.min(100, Math.max(0, progress)));
  const ext = extension ?? (fileName.includes(".") ? fileName.split(".").pop()! : "");
  const total = size !== undefined ? formatFileSize(size) : "";
  const done = size !== undefined ? formatFileSize((size * pct) / 100) : "";
  const statusText = status === "waiting" ? S.waiting : status === "complete" ? S.complete : status === "error" ? (errorText ?? S.failed) : "";
  const statusIcon: IconName | null = status === "waiting" ? "schedule" : status === "complete" ? "check-circle" : status === "error" ? "error" : null;
  // Ring controls are a full circle when rounded (spec Shape table), sharp when sharp.
  const ctlShape = sh === "sharp" ? "sharp" : ring ? "full" : "rounded";
  const inFlight = status === "waiting" || status === "uploading";
  const dismiss = showDismiss && !(ring && status === "uploading") ? (
    <IconButton className="zds-file-upload-item__dismiss" flavour="subtle" size={ring ? "large" : "small"} shape={ctlShape}
      icon={inFlight ? "close" : "delete-outline"}
      label={fmt(inFlight ? S.cancel : S.remove, { name: fileName })}
      onClick={inFlight ? onCancel : onRemove} />
  ) : null;

  // Announce on a change of status, never on every percent.
  const [announced, setAnnounced] = React.useState("");
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) { first.current = false; return; }
    setAnnounced(fmt(S.announce, { name: fileName, status: statusText || `${pct}%` }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div ref={ref} className={["zds-file-upload-item", className].filter(Boolean).join(" ")}
      data-status={status} data-indicator={indicator} data-shape={sh}>
      <FileIndicator type={indicatorType} extension={ext} shape={sh} />
      <div className="zds-file-upload-item__body">
        <span className="zds-file-upload-item__name" title={fileName}>{fileName}</span>
        <span className="zds-file-upload-item__meta">
          {status === "uploading"
            ? <span className="zds-file-upload-item__size">{ring && total ? fmt(S.transferredPercent, { done, total, percent: pct }) : total ? fmt(S.transferred, { done, total }) : ring ? `${pct}%` : null}</span>
            : total ? <span className="zds-file-upload-item__size">{total}</span> : null}
          {statusIcon ? (
            <span className="zds-file-upload-item__status">
              <Icon name={statusIcon} size="small" iconStyle={sh === "sharp" ? "sharp" : "rounded"} />
              <span>{statusText}</span>
            </span>
          ) : null}
        </span>
        {!ring && status === "uploading" ? (
          <span className="zds-file-upload-item__progress">
            <ProgressBar value={pct} size="small" shape={sh} showLabel={false} label={fileName} />
            <span className="zds-file-upload-item__percent">{pct}%</span>
          </span>
        ) : null}
        {!ring && status === "error" ? (
          <Button className="zds-file-upload-item__retry" flavour="text" size="small" shape={sh} leadingIcon="refresh" onClick={onRetry}>{S.retry}</Button>
        ) : null}
      </div>
      {ring && status === "uploading" ? (
        <ProgressCircle value={pct} size="medium" rounded={sh !== "sharp"} upload showCancel={showDismiss}
          cancelLabel={fmt(S.cancel, { name: fileName })} onCancel={onCancel} label={fileName} />
      ) : null}
      {ring ? (
        status === "error" || dismiss ? (
          <span className="zds-file-upload-item__actions">
            {status === "error" ? (
              <IconButton flavour="subtle" size="large" shape={ctlShape} icon="refresh" label={fmt(S.retryNamed, { name: fileName })} onClick={onRetry} />
            ) : null}
            {dismiss}
          </span>
        ) : null
      ) : dismiss}
      <span className="zds-file-upload-item__sr-only" role="status">{announced}</span>
    </div>
  );
});

// ---- File Upload -----------------------------------------------------------

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
export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(function FileUpload(
  { state: pinned, shape = "rounded", caption = "Supports PDF, PNG and JPG. Max file size 10 MB.", showCaption = true,
    accept, maxFileBytes, maxFiles, multiple = true, error, disabled = false, onFilesSelected, onFilesRejected,
    children, strings, className },
  ref,
) {
  const S = React.useMemo(() => ({ ...fileUploadStrings, ...strings }), [strings]);
  const [dragging, setDragging] = React.useState(false);
  const [refusal, setRefusal] = React.useState<string | null>(null);
  const depth = React.useRef(0);
  const input = React.useRef<HTMLInputElement>(null);
  const off = disabled || pinned === "disabled";
  const message = error ?? refusal;
  const state: FileUploadState = pinned ?? (off ? "disabled" : dragging ? "dragging" : message ? "error" : "default");

  const take = (list: FileList | null) => {
    if (!list || off) return;
    const ok: File[] = [], refused: FileUploadRejection[] = [];
    for (const file of Array.from(list)) {
      if (!matchesAccept(file, accept)) refused.push({ file, reason: "type" });
      else if (maxFileBytes !== undefined && file.size > maxFileBytes) refused.push({ file, reason: "size" });
      else if (maxFiles !== undefined && ok.length >= maxFiles) refused.push({ file, reason: "count" });
      else ok.push(file);
    }
    if (ok.length) onFilesSelected?.(ok);
    if (refused.length) onFilesRejected?.(refused);
    const r = refused[0];
    setRefusal(!r ? null : r.reason === "type" ? fmt(S.rejectType, { name: r.file.name })
      : r.reason === "size" ? fmt(S.rejectSize, { name: r.file.name, size: formatFileSize(maxFileBytes ?? 0) })
        : fmt(S.rejectCount, { count: maxFiles ?? 0 }));
  };
  const hasFiles = (e: React.DragEvent) => Array.from(e.dataTransfer.types).includes("Files");

  return (
    <ShapeContext.Provider value={shape}>
      <StringsContext.Provider value={S}>
        <div ref={ref} className={["zds-file-upload", className].filter(Boolean).join(" ")} data-state={state} data-shape={shape}>
          <div className="zds-file-upload__zone"
            onDragEnter={(e) => { if (off || !hasFiles(e)) return; e.preventDefault(); depth.current += 1; setDragging(true); }}
            onDragOver={(e) => { if (!off && hasFiles(e)) e.preventDefault(); }}
            onDragLeave={() => { if (depth.current > 0 && --depth.current === 0) setDragging(false); }}
            onDrop={(e) => { if (!hasFiles(e)) return; e.preventDefault(); depth.current = 0; setDragging(false); take(e.dataTransfer.files); }}>
            <span className="zds-file-upload__headline">{state === "dragging" ? S.headlineDragging : S.headline}</span>
            <span className="zds-file-upload__or">{S.or}</span>
            <Button flavour="primary" size="small" shape={shape} disabled={off} onClick={() => input.current?.click()}>{S.selectFiles}</Button>
            {showCaption ? <span className="zds-file-upload__caption">{caption}</span> : null}
            {state === "error" && message ? (
              <span className="zds-file-upload__error" role="alert">
                <Icon name="error" size="small" iconStyle={shape === "sharp" ? "sharp" : "rounded"} />
                <span>{message}</span>
              </span>
            ) : null}
            <input ref={input} type="file" hidden accept={accept} multiple={multiple} disabled={off}
              onChange={(e) => { take(e.target.files); e.target.value = ""; }} />
          </div>
          {React.Children.count(children) ? <div className="zds-file-upload__files">{children}</div> : null}
        </div>
      </StringsContext.Provider>
    </ShapeContext.Provider>
  );
});
