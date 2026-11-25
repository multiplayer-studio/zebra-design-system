import { LitElement, type PropertyValues, type TemplateResult } from "lit";
import "../icon/icon.js";
/** Where a step stands. One step in a stepper is `active`. */
export type StepStatus = "default" | "complete" | "active" | "partial" | "error" | "disabled";
/** Step Card corners: Figma's Step Card/Round and Step Card/Sharp sets. */
export type StepCardShape = "rounded" | "sharp";
/**
 * What every step shares: status, label, subtitle, number and the indicator.
 * Not registered; each kind below is.
 */
export declare class ZdsStepBase extends LitElement {
    #private;
    /** How the step reads at a glance: the indicator, the label colour and the connector all follow it. */
    status: StepStatus;
    /** Names the step in a word or two. */
    label: string;
    /** A qualifier under the label, a word or two. Drawn when `show-subtitle` is on. */
    subtitle: string | null;
    /** Draws the subtitle. Defaults to on when a subtitle is given; `show-subtitle="false"` hides it. */
    showSubtitle: boolean | undefined;
    /** The number in the indicator. Defaults to the step's position in its stepper. complete and error show a glyph instead. */
    stepNumber: string | null;
    /**
     * Makes the step's text a button that fires `zds-step-select`, for going
     * back to a step. Figma models no interaction states, so the only visible
     * change is the focus ring.
     */
    selectable: boolean;
    /** Set by the stepper: the step's 1-based position, used when `step-number` is absent. */
    position: number;
    /** Set by `<zds-horizontal-stepper>`: false when its `show-subtitle` is off, which hides this step's subtitle too. */
    parentShowSubtitle: boolean;
    connectedCallback(): void;
    protected updated(changed: PropertyValues<this>): void;
    protected indicator(): TemplateResult;
    protected text(): TemplateResult;
}
/** A step that draws a connector to the next one. */
declare class ZdsStepWithLine extends ZdsStepBase {
    /** Draws the connector to the next step. By default every step but the last draws it; `show-line="false"` drops it. */
    showLine: boolean | undefined;
    /** Set by the stepper on its last step, which then drops its line unless `show-line` says otherwise. */
    last: boolean;
    protected get hasLine(): boolean;
    protected updated(changed: PropertyValues<this>): void;
}
/**
 * One step of `<zds-horizontal-stepper>`: the label centred under its
 * indicator, and the connector running on to the next step.
 *
 * @fires zds-step-select - The step's text was chosen. Only with `selectable`.
 * @csspart indicator - The numbered circle.
 * @csspart label - The label text.
 * @csspart subtitle - The subtitle text.
 *
 * @spec specs/stepper/stepper.spec.json
 */
export declare class ZdsStepHorizontal extends ZdsStepWithLine {
    static styles: import("lit").CSSResult[];
    protected render(): TemplateResult<1>;
}
/**
 * One step of `<zds-vertical-stepper>`'s rail: the label beside its
 * indicator, and the connector dropping to the next step.
 *
 * @fires zds-step-select - The step's text was chosen. Only with `selectable`.
 * @csspart indicator - The numbered circle.
 * @csspart label - The label text.
 * @csspart subtitle - The subtitle text.
 *
 * @spec specs/stepper/stepper.spec.json
 */
export declare class ZdsStepVertical extends ZdsStepWithLine {
    static styles: import("lit").CSSResult[];
    protected render(): TemplateResult<1>;
}
/**
 * One step of the cards arrangement: a bordered surface carrying the
 * indicator and the label side by side, with no connector.
 *
 * @fires zds-step-select - The step's text was chosen. Only with `selectable`.
 * @csspart indicator - The numbered circle.
 * @csspart label - The label text.
 * @csspart subtitle - The subtitle text.
 *
 * @spec specs/stepper/stepper.spec.json
 */
export declare class ZdsStepCard extends ZdsStepBase {
    static styles: import("lit").CSSResult[];
    /** Corner style. Inside `<zds-vertical-stepper>` the stepper's `rounded` sets it. */
    shape: StepCardShape;
    protected render(): TemplateResult<1>;
}
/**
 * One division of the compact `<zds-horizontal-stepper>`'s bar. It carries no
 * text: the summary above the bar does the naming. Never interactive.
 *
 * @spec specs/stepper/stepper.spec.json
 */
export declare class ZdsStepSegment extends LitElement {
    static styles: import("lit").CSSResult;
    /** Fills neither, the leading half (partial) or both halves of the segment. */
    status: StepStatus;
    protected render(): symbol;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-step-horizontal": ZdsStepHorizontal;
        "zds-step-vertical": ZdsStepVertical;
        "zds-step-card": ZdsStepCard;
        "zds-step-segment": ZdsStepSegment;
    }
}
export {};
//# sourceMappingURL=step.d.ts.map