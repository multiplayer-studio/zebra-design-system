import * as React from "react";
import { Icon } from "../icon/Icon.js";
import { StepCardShapeContext, StepShowSubtitleContext, type StepCardShape } from "./context.js";
import "./step.css";

/** Where a step stands. One step in a stepper is `active`. */
export type StepStatus = "default" | "complete" | "active" | "partial" | "error" | "disabled";
export type { StepCardShape };

const STATUS_TEXT: Record<StepStatus, string> = {
  default: "not started", complete: "complete", active: "current step", partial: "in progress", error: "failed", disabled: "unavailable",
};

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

export interface StepProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "className" | "onSelect" | "children"> {
  /** How the step reads at a glance: the indicator, the label colour and the connector all follow it. */
  status?: StepStatus;
  /** Names the step in a word or two. */
  label: React.ReactNode;
  /** A qualifier under the label, a word or two. Drawn when `showSubtitle` is on. */
  subtitle?: React.ReactNode;
  /** Draws the subtitle. Defaults to on when a subtitle is given. */
  showSubtitle?: boolean;
  /** The number in the indicator. Defaults to the step's position in its stepper. complete and error show a glyph instead. */
  stepNumber?: React.ReactNode;
  /**
   * Makes the step's text a button, for going back to a step. Figma models no
   * interaction states, so the only visible change is the focus ring.
   */
  onSelect?: () => void;
  className?: string;
}

export interface StepLineProps {
  /**
   * Draws the connector to the next step. By default every step but the last
   * draws it; Figma leaves this to the designer on each instance.
   */
  showLine?: boolean;
}

/** The numbered circle. Its fill, its border and number-or-glyph all come from `status`. */
function Indicator({ status, stepNumber }: { status: StepStatus; stepNumber?: React.ReactNode }) {
  return (
    <span className="zds-step__indicator" aria-hidden="true">
      {status === "complete" ? <Icon name="check-mark" size="small" />
        : status === "error" ? <Icon name="priority" size="small" />
        : <span className="zds-step__number" data-auto={stepNumber == null ? "" : undefined}>{stepNumber}</span>}
    </span>
  );
}

/** The label, the optional subtitle and the status in words for assistive tech. A button when `onSelect` is set. */
function StepText({ status, label, subtitle, showSubtitle, onSelect }: Pick<StepProps, "label" | "subtitle" | "showSubtitle" | "onSelect"> & { status: StepStatus }) {
  const stepperShows = React.useContext(StepShowSubtitleContext);
  const content = (
    <>
      <span className="zds-step__label">{label}</span>
      {stepperShows && (showSubtitle ?? subtitle != null) && subtitle != null ? <span className="zds-step__subtitle">{subtitle}</span> : null}
      <span className="zds-step__sr">{`, ${STATUS_TEXT[status]}`}</span>
    </>
  );
  return onSelect && status !== "disabled"
    ? <button type="button" className="zds-step__text" onClick={onSelect}>{content}</button>
    : <span className="zds-step__text">{content}</span>;
}

function rootProps(kind: string, status: StepStatus, className: string | undefined) {
  return {
    className: cx("zds-step", className),
    "data-kind": kind,
    "data-status": status,
    "aria-current": status === "active" ? ("step" as const) : undefined,
  };
}

export type StepHorizontalProps = StepProps & StepLineProps;

/**
 * One step of Horizontal Stepper: the label centred under its indicator, and
 * the connector running on to the next step.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const StepHorizontal = React.forwardRef<HTMLLIElement, StepHorizontalProps>(function StepHorizontal(
  { status = "default", label, subtitle, showSubtitle, stepNumber, showLine, onSelect, className, ...rest },
  ref,
) {
  return (
    <li ref={ref} {...rest} {...rootProps("horizontal", status, className)} data-line={showLine === undefined ? "auto" : showLine ? "on" : "off"}>
      <span className="zds-step__head">
        <Indicator status={status} stepNumber={stepNumber} />
        <StepText status={status} label={label} subtitle={subtitle} showSubtitle={showSubtitle} onSelect={onSelect} />
      </span>
      <span className="zds-step__track" aria-hidden="true"><span className="zds-step__line" /></span>
    </li>
  );
});

export type StepVerticalProps = StepProps & StepLineProps;

/**
 * One step of Vertical Stepper's rail: the label beside its indicator, and
 * the connector dropping to the next step.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const StepVertical = React.forwardRef<HTMLLIElement, StepVerticalProps>(function StepVertical(
  { status = "default", label, subtitle, showSubtitle, stepNumber, showLine, onSelect, className, ...rest },
  ref,
) {
  return (
    <li ref={ref} {...rest} {...rootProps("vertical", status, className)} data-line={showLine === undefined ? "auto" : showLine ? "on" : "off"}>
      <span className="zds-step__rail">
        <Indicator status={status} stepNumber={stepNumber} />
        <span className="zds-step__line" aria-hidden="true" />
      </span>
      <StepText status={status} label={label} subtitle={subtitle} showSubtitle={showSubtitle} onSelect={onSelect} />
    </li>
  );
});

export interface StepCardProps extends StepProps {
  /** Corner style: Figma's Step Card/Round and Step Card/Sharp sets. Defaults to the Vertical Stepper's `rounded`. */
  shape?: StepCardShape;
}

/**
 * One step of the cards arrangement: a bordered surface carrying the
 * indicator and the label side by side, with no connector.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const StepCard = React.forwardRef<HTMLLIElement, StepCardProps>(function StepCard(
  { status = "default", label, subtitle, showSubtitle, stepNumber, shape: shapeProp, onSelect, className, ...rest },
  ref,
) {
  const inherited = React.useContext(StepCardShapeContext);
  return (
    <li ref={ref} {...rest} {...rootProps("card", status, className)} data-shape={shapeProp ?? inherited}>
      <Indicator status={status} stepNumber={stepNumber} />
      <StepText status={status} label={label} subtitle={subtitle} showSubtitle={showSubtitle} onSelect={onSelect} />
    </li>
  );
});

export interface StepSegmentProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "className" | "children"> {
  /** Fills neither, the leading half (partial) or both halves of the segment. */
  status?: StepStatus;
  className?: string;
}

/**
 * One division of the compact Horizontal Stepper's bar. It carries no text:
 * the summary above the bar does the naming. Never interactive.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const StepSegment = React.forwardRef<HTMLLIElement, StepSegmentProps>(function StepSegment(
  { status = "default", className, ...rest },
  ref,
) {
  return <li ref={ref} {...rest} className={cx("zds-step-segment", className)} data-status={status} />;
});
