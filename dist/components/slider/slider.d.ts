import{ZetaSliderProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";export*from"./slider-input-field/slider-input-field.js";declare const ZetaSlider_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Sliders choose a value along a range by dragging a thumb. `stepIncrement` marks the valid stops and snaps to them,
 * and `type="range"` adds a second thumb so a span is chosen instead of a single value.
 *
 * Each thumb is a slider for assistive technology, with its own name and value, and moves with the arrow, Page and
 * Home/End keys as well as a pointer. Pressing a thumb or focusing it from the keyboard colours the fill and both
 * thumbs; only the thumb under the pointer grows.
 *
 * @event {CustomEvent<ZetaSliderEventDetail>} change - Fired when the value of a default slider changes: at the end of a drag, on a track press and on each key press. Contains `value:number`.
 * @event {CustomEvent<ZetaRangeSliderEventDetail>} change - Fired when a range slider's values change. Contains `min:number` and `max:number`.
 * @event input - Fired while a thumb is being dragged.
 *
 * @figma https://www.figma.com/design/EScHXxXDQU7qys4ru4ijLg/Slider?node-id=6125-1084
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-slider--docs
 */export declare class ZetaSlider extends ZetaSlider_base{
/** Disables the slider. The track and thumbs drop to the disabled colour. */
disabled?:boolean;
/** Puts a stop at every increment and snaps the thumbs to the nearest one (spec: stepped). */
stepIncrement?:number;
/** `range` adds a second thumb so a span is chosen (spec: range). */type:"default"|"range";
/** The value of a default slider. */
value:number;
/** The start of a range slider's span. */
lowerValue:number;
/** The end of a range slider's span. */
upperValue:number;
/** The minimum value. */
min:number;
/** The maximum value. */
max:number;
/** Accessible name of a default slider's thumb. */
label:string;
/** Accessible name of a range slider's start thumb. */
lowerLabel:string;
/** Accessible name of a range slider's end thumb. */
upperLabel:string;private slider;track:HTMLDivElement;private dragging;private get isRange();private get step();private clamp;
/** Snaps to the nearest stop counted from the minimum. */private snap;private percent;private thumbValue;
/** Sets one thumb, held between the minimum, the maximum and (in range mode) the other thumb. */private setThumb;private emitChange;private valueAt;
/** The thumb a press should move: the one pressed, or else the nearer one. */private thumbFor;private onPointerDown;private onKeyDown;private renderThumb;private renderSteps;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-slider":ZetaSlider;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Sliders choose a value along a range by dragging a thumb. `stepIncrement` marks the valid stops and snaps to them,
 * and `type="range"` adds a second thumb so a span is chosen instead of a single value.
 *
 * Each thumb is a slider for assistive technology, with its own name and value, and moves with the arrow, Page and
 * Home/End keys as well as a pointer. Pressing a thumb or focusing it from the keyboard colours the fill and both
 * thumbs; only the thumb under the pointer grows.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired when a range slider's values change. Contains `min:number` and `max:number`.
 * - **input** - Fired while a thumb is being dragged.
 */"zeta-slider":Partial<ZetaSliderProps&BaseProps&BaseEvents>}}}