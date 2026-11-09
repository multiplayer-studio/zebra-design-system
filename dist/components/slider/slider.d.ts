import { LitElement, type PropertyValues } from "lit";
export type SliderShape = "rounded" | "sharp";
/**
 * A control for choosing a value along a range by dragging a thumb.
 *
 * Behaviour comes from native `<input type="range">` elements in the shadow
 * root — one, or two in range mode. They provide the `slider` role with its
 * value, minimum and maximum (spec accessibility: "exposed as a number
 * together with its minimum and maximum"), arrow / Page / Home / End keys, and
 * pointer dragging. The track, active fill and step dots are drawn behind
 * them; the inputs' own thumbs are restyled.
 *
 * Mapping from the spec:
 * - `state` is not a property. `disabled` is `disabled`. The larger thumb
 *   size follows the pointer only: the thumb under it, or being dragged, grows,
 *   and the other doesn't, in every state. `selected` is colour only: the fill
 *   and both thumbs take the selected foreground during a drag or while a
 *   thumb has keyboard focus, and the focused thumb also gets a focus ring
 *   (spec "designerClarifications").
 * - `value`, `min`, `max`, `step` and `valueStart` have no Figma reference
 *   (spec blocker "nothing models the value, minimum, maximum or step");
 *   they follow the native range input.
 * - `stepped` draws one dot per stop, derived from min, max and step,
 *   rather than from slotted dots — so the dots sit at the values they mark,
 *   across the whole track (spec warn "the step dots span the full track
 *   only at 50%").
 * - `range` adds a start thumb, and the fill runs between the two thumbs:
 *   a true span, which the Figma structure can't draw (spec warn "range mode
 *   can't show a span that doesn't start at the minimum").
 *
 * In range mode each thumb needs its own name (spec accessibility); set
 * `label` and `start-label`.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes the slider with no JavaScript.
 *
 * @fires input - The value is changing (during a drag or a key press).
 * @fires change - The value was committed.
 * @csspart track - The base track.
 * @csspart fill - The active fill.
 *
 * @spec specs/slider/slider.spec.json
 */
export declare class ZdsSlider extends LitElement {
    static styles: import("lit").CSSResult;
    static formAssociated: boolean;
    /** Corner treatment of the track and thumb together. Match the controls around it; it carries no meaning. */
    shape: SliderShape;
    /** The value cannot be changed. Track and thumb drop to the disabled foreground. */
    disabled: boolean;
    /**
     * Only certain values can be chosen: draws a dot at every valid stop. Use
     * it with a coarse `step`. The spec defaults this on; it defaults off here
     * because an HTML boolean attribute can only default to false, and because
     * at the native default step of 1 the dots would crowd into a line.
     */
    stepped: boolean;
    /** Choose a span rather than a value: adds a start thumb, and the fill runs between the two. */
    range: boolean;
    /** Lowest value. */
    min: number;
    /** Highest value. */
    max: number;
    /** Distance between valid values. */
    step: number;
    /** The value — or, in range mode, the end of the span. */
    value: number;
    /** Start of the span, in range mode only. */
    valueStart: number;
    /** Accessible name — for the end thumb in range mode. */
    label: string | null;
    /** Accessible name of the start thumb in range mode. */
    startLabel: string | null;
    /** Field name submitted with a form. In range mode the start and end are submitted under this name, in that order. */
    name: string | null;
    /** A thumb is being dragged: one of the two triggers of the spec's `selected` state (keyboard focus is the other, in CSS). */
    private dragging;
    private readonly internals;
    private defaults;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(changed: PropertyValues<this>): void;
    /** Called by the browser when a containing `<form>` resets. */
    formResetCallback(): void;
    /** Called by the browser when a containing `<fieldset disabled>` changes. */
    formDisabledCallback(disabled: boolean): void;
    private clamp;
    private percent;
    private readonly startDrag;
    private readonly endDrag;
    private onInput;
    private onChange;
    private renderDots;
    private renderInput;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-slider": ZdsSlider;
    }
}
//# sourceMappingURL=slider.d.ts.map