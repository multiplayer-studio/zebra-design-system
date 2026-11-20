import { LitElement, type PropertyValues } from "lit";
import "./step.js";
export type HorizontalStepperSize = "default" | "compact";
/**
 * Shows where a person is in a fixed sequence of steps, in a row.
 *
 * On `default`, slot `<zds-step-horizontal>`s; on `compact`, one
 * `<zds-step-segment>` per step. Each step sets its own `status`; keep
 * exactly one `active`. A navigation landmark holding a list; the active step
 * carries `aria-current="step"`. On compact the bar holds no text and is
 * hidden from assistive tech, so the count and title above it are what is
 * announced.
 *
 * @slot - The steps, or the segments on compact.
 *
 * @spec specs/stepper/stepper.spec.json
 */
export declare class ZdsHorizontalStepper extends LitElement {
    #private;
    static styles: import("lit").CSSResult[];
    /** `default` names every step under its indicator; `compact`, for mobile, names only the current step above a bar of segments. */
    size: HorizontalStepperSize;
    /** Accessible name of the stepper, e.g. "Checkout". */
    accessibleLabel: string;
    /** Compact: the current step number in "STEP n OF m". */
    currentStep: string;
    /** Compact: the total number of steps in "STEP n OF m". */
    totalSteps: string;
    /** Compact: the current step's title. */
    label: string;
    /** Compact: the current step's subtitle. */
    subtitle: string | null;
    /**
     * Draws subtitles: the current step's on compact, every step's on default.
     * `show-subtitle="false"` hides them all, whatever each step sets.
     */
    showSubtitle: boolean;
    protected updated(changed: PropertyValues<this>): void;
    protected render(): import("lit").TemplateResult<1>;
}
/**
 * Shows where a person is in a fixed sequence of steps, in a column: a rail
 * of `<zds-step-vertical>`s, or with `card` a column of `<zds-step-card>`s.
 * Each step sets its own `status`; keep exactly one `active`. A navigation
 * landmark holding a list; the active step carries `aria-current="step"`.
 *
 * @slot - The steps.
 *
 * @spec specs/stepper/stepper.spec.json
 */
export declare class ZdsVerticalStepper extends LitElement {
    #private;
    static styles: import("lit").CSSResult[];
    /** A column of cards instead of a rail. Adds a gap between steps. */
    card: boolean;
    /** Card corners: rounded (Step Card/Round) or sharp (Step Card/Sharp). Only applies with `card`; sets every card's `shape`. */
    rounded: boolean;
    /** Accessible name of the stepper, e.g. "Setup". */
    accessibleLabel: string;
    protected updated(changed: PropertyValues<this>): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-horizontal-stepper": ZdsHorizontalStepper;
        "zds-vertical-stepper": ZdsVerticalStepper;
    }
}
//# sourceMappingURL=stepper.d.ts.map