import * as React from "react";
import { Progress } from "@base-ui/react/progress";
import { IconButton } from "../icon-button/IconButton.js";
import "./progress-circle.css";

export type ProgressCircleSize = "xxsmall" | "xsmall" | "small" | "medium" | "large";

type RootProps = React.ComponentPropsWithoutRef<typeof Progress.Root>;

export interface ProgressCircleProps
  extends Omit<RootProps, "className" | "value" | "children" | "render" | "min" | "max"> {
  /**
   * The current value, between `min` and `max`; drives the arc's sweep from
   * twelve o'clock. `null` makes the ring indeterminate: the arc spins.
   */
  value?: number | null;
  /** Lower bound of `value`. */
  min?: number;
  /** Upper bound of `value`. */
  max?: number;
  /** Ring diameter: xxsmall 24, xsmall 36, small 40, medium 48, large 64px. */
  size?: ProgressCircleSize;
  /** Round arc ends (a line cap). False squares them off, for sharp-shaped surroundings. */
  rounded?: boolean;
  /** Shows the unfilled remainder of the ring. */
  showTrack?: boolean;
  /**
   * Places the file-transfer control (percentage readout, or cancel) in the
   * centre. Only at small, medium and large: the 36px control does not fit
   * inside the xsmall or xxsmall ring, so it is ignored there (as in Figma).
   */
  upload?: boolean;
  /** With `upload`, swaps the readout for a cancel button (Figma's `_Upload` Stop). */
  showCancel?: boolean;
  /** Accessible name of the cancel button. */
  cancelLabel?: string;
  /** The cancel button was pressed. */
  onCancel?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Accessible name of the ring ("Uploading report.pdf"). The ring has no
   * visible text of its own, so give it one, or `aria-labelledby`.
   */
  label?: string;
  className?: string;
}

/** Sizes that can hold the 36px upload control. */
const UPLOAD_SIZES: ReadonlySet<ProgressCircleSize> = new Set(["small", "medium", "large"]);

/**
 * A ring that reports an ongoing process where a bar will not fit, with an
 * optional file-transfer control (percentage or cancel) at its centre.
 *
 * Behaviour and ARIA (`role="progressbar"`, `aria-valuenow/min/max`,
 * `aria-valuetext`) come from Base UI's Progress; indeterminate also sets
 * `aria-busy`. The progressbar is the ring only, and the cancel button is its
 * sibling, so the button stays reachable (a progressbar's children are
 * presentational). The readout is aria-hidden: it repeats the value the
 * progressbar already exposes.
 *
 * Cancel is an IconButton (subtle, full, small, `close`) with its own states
 * and an accessible name, not Figma's pinned hover.
 *
 * Kept in step with packages/web-components `<zds-progress-circle>`.
 *
 * @spec specs/progress-circle/progress-circle.spec.md
 */
export const ProgressCircle = React.forwardRef<HTMLDivElement, ProgressCircleProps>(function ProgressCircle(
  {
    value = 0,
    min = 0,
    max = 100,
    size = "xxsmall",
    rounded = true,
    showTrack = true,
    upload = false,
    showCancel = false,
    cancelLabel = "Cancel upload",
    onCancel,
    label,
    className,
    ...rest
  },
  ref,
) {
  const determinate = value != null && Number.isFinite(value);
  const percent = determinate
    ? max > min ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)) : 0
    : null;
  const readout = percent != null ? new Intl.NumberFormat(undefined, { style: "percent" }).format(percent / 100) : "";
  const showUpload = upload && UPLOAD_SIZES.has(size);

  return (
    <div
      ref={ref}
      className={["zds-progress-circle", className].filter(Boolean).join(" ")}
      data-size={size}
      data-rounded={rounded ? "" : undefined}
    >
      <Progress.Root
        aria-label={label}
        aria-busy={determinate ? undefined : true}
        {...rest}
        className="zds-progress-circle__ring"
        value={determinate ? value : null}
        min={min}
        max={max}
      >
        <svg className="zds-progress-circle__svg" aria-hidden="true" focusable="false">
          {showTrack ? <circle className="zds-progress-circle__track" /> : null}
          <circle
            className="zds-progress-circle__arc"
            pathLength={100}
            data-empty={percent === 0 ? "" : undefined}
            style={percent != null ? ({ "--zds-progress-circle-value": percent } as React.CSSProperties) : undefined}
          />
        </svg>
      </Progress.Root>
      {showUpload ? (
        <div className="zds-progress-circle__upload">
          {showCancel ? (
            <IconButton
              className="zds-progress-circle__cancel"
              flavour="subtle"
              shape="full"
              size="small"
              icon="close"
              label={cancelLabel}
              onClick={onCancel}
            />
          ) : (
            <span className="zds-progress-circle__readout" aria-hidden="true">{readout}</span>
          )}
        </div>
      ) : null}
    </div>
  );
});
