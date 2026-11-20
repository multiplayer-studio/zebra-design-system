import * as React from "react";
import { type StepCardShape } from "./context.js";
import "./step.css";
/** Where a step stands. One step in a stepper is `active`. */
export type StepStatus = "default" | "complete" | "active" | "partial" | "error" | "disabled";
export type { StepCardShape };
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
export type StepHorizontalProps = StepProps & StepLineProps;
/**
 * One step of Horizontal Stepper: the label centred under its indicator, and
 * the connector running on to the next step.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export declare const StepHorizontal: React.ForwardRefExoticComponent<StepProps & StepLineProps & React.RefAttributes<HTMLLIElement>>;
export type StepVerticalProps = StepProps & StepLineProps;
/**
 * One step of Vertical Stepper's rail: the label beside its indicator, and
 * the connector dropping to the next step.
 *
 * @spec specs/stepper/stepper.spec.md
 */
export declare const StepVertical: React.ForwardRefExoticComponent<StepProps & StepLineProps & React.RefAttributes<HTMLLIElement>>;
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
export declare const StepCard: React.ForwardRefExoticComponent<StepCardProps & React.RefAttributes<HTMLLIElement>>;
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
export declare const StepSegment: React.ForwardRefExoticComponent<StepSegmentProps & React.RefAttributes<HTMLLIElement>>;
