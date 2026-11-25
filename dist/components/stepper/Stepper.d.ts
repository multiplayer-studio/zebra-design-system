import * as React from "react";
import "./stepper.css";
export type HorizontalStepperSize = "default" | "compact";
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
export declare const HorizontalStepper: React.ForwardRefExoticComponent<HorizontalStepperProps & React.RefAttributes<HTMLElement>>;
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
export declare const VerticalStepper: React.ForwardRefExoticComponent<VerticalStepperProps & React.RefAttributes<HTMLElement>>;
