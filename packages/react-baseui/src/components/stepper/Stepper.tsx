import * as React from "react";
import { StepCardShapeContext, StepShowSubtitleContext } from "./context.js";
import "./stepper.css";

export type HorizontalStepperSize = "default" | "compact";

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

export interface HorizontalStepperProps extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /**
   * `default` names every step, each label under its indicator. `compact`, for
   * mobile, names only the current step above a bar of segments.
   */
  size?: HorizontalStepperSize;
  /**
   * The steps: `StepHorizontal` on default, one `StepSegment` per step on
   * compact. Set each step's own status.
   */
  children?: React.ReactNode;
  /** Compact: the current step number in "STEP n OF m". */
  currentStep?: React.ReactNode;
  /** Compact: the total number of steps in "STEP n OF m". */
  totalSteps?: React.ReactNode;
  /** Compact: the current step's title. */
  label?: React.ReactNode;
  /** Compact: the current step's subtitle. */
  subtitle?: React.ReactNode;
  /** Draws subtitles: the current step's on compact, every step's on default. Off hides them all, whatever each step sets. */
  showSubtitle?: boolean;
  className?: string;
}

/**
 * Shows where a person is in a fixed sequence of steps, in a row. A
 * navigation landmark holding an ordered list; the active step carries
 * `aria-current="step"`. Name it with `aria-label`.
 *
 * On compact the bar holds no text and is hidden from assistive tech, so the
 * count and title above it are what is announced.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const HorizontalStepper = React.forwardRef<HTMLElement, HorizontalStepperProps>(function HorizontalStepper(
  { size = "default", children, currentStep, totalSteps, label, subtitle, showSubtitle = true, className, ...rest },
  ref,
) {
  return (
    <nav aria-label="Progress" ref={ref} {...rest} className={cx("zds-stepper", className)} data-orientation="horizontal" data-size={size}>
      {size === "compact" ? (
        <>
          <div className="zds-stepper__summary">
            <p className="zds-stepper__step-info">
              <span>STEP</span> <span>{currentStep}</span> <span>OF</span> <span>{totalSteps}</span>
            </p>
            <div className="zds-stepper__heading">
              <p className="zds-stepper__title">{label}</p>
              {showSubtitle && subtitle != null ? <p className="zds-stepper__subtitle">{subtitle}</p> : null}
            </div>
          </div>
          <ol className="zds-stepper__segments" aria-hidden="true">{children}</ol>
        </>
      ) : (
        <StepShowSubtitleContext.Provider value={showSubtitle}>
          <ol className="zds-stepper__steps">{children}</ol>
        </StepShowSubtitleContext.Provider>
      )}
    </nav>
  );
});

export interface VerticalStepperProps extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  /** A column of `StepCard`s instead of a rail of `StepVertical`s. Adds a gap between steps. */
  card?: boolean;
  /** Card corners: rounded (Step Card/Round) or sharp (Step Card/Sharp). Only applies with `card`. */
  rounded?: boolean;
  /** The steps: `StepVertical`, or `StepCard` with `card`. Set each step's own status. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Shows where a person is in a fixed sequence of steps, in a column: a rail,
 * or a column of cards. A navigation landmark holding an ordered list; the
 * active step carries `aria-current="step"`. Name it with `aria-label`.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export const VerticalStepper = React.forwardRef<HTMLElement, VerticalStepperProps>(function VerticalStepper(
  { card = false, rounded = false, children, className, ...rest },
  ref,
) {
  return (
    <nav aria-label="Progress" ref={ref} {...rest} className={cx("zds-stepper", className)} data-orientation="vertical" data-card={card ? "" : undefined}>
      <StepCardShapeContext.Provider value={rounded ? "rounded" : "sharp"}>
        <ol className="zds-stepper__steps">{children}</ol>
      </StepCardShapeContext.Provider>
    </nav>
  );
});
