import{ZetaStepperProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../icon/icon.js";import"./stepper-item.js";import"../progress-indicators/progress-bar/progress-bar.js";import"../button/button.js";
/** Shows where a person is in a fixed sequence of steps, marking what is finished, what is current and what is still
 * ahead. `variant="horizontal"` is a row: `size="default"` names every step, `size="compact"` (mobile) names only the
 * current step above a bar of segments. `variant="vertical"` is a rail, or with `card` a column of cards.
 *
 * Pass `zeta-stepper-item`s as children; each sets its own `status`. They are numbered from 1 and drawn as the part
 * the stepper calls for. A navigation landmark holding a list; the active step carries `aria-current="step"`. On
 * compact the bar is hidden from assistive tech, so the count and title above it are what is announced.
 *
 * @slot - The steps: `zeta-stepper-item`s.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7357-18457
 * @storybook ?path=/docs/components-stepper--docs
 */export declare class ZetaStepper extends LitElement{
/** Stepper direction. Defaults to horizontal. */
variant:"vertical"|"horizontal";
/** Horizontal only. `default` names every step; `compact`, for mobile, names the current step above a bar. */
size:"default"|"compact";
/** Vertical only. A column of cards instead of a rail. */
card:boolean;
/** Vertical cards only. Rounded corners (Step Card/Round) instead of sharp (Step Card/Sharp). */
rounded:boolean;
/** Compact: the current step number in "STEP n OF m". */
currentStep:string|number;
/** Compact: the total number of steps in "STEP n OF m". */
totalSteps:string|number;
/** Compact: the current step's title. */
label:string;
/** Compact: the current step's subtitle. */
subtitle?:string;
/**
 * Draws subtitles: the current step's on compact, and every step's on the other arrangements.
 * `show-subtitle="false"` hides them all, whatever each step sets.
 */
showSubtitle:boolean;
/** Accessible name of the stepper, e.g. "Checkout". */
accessibleLabel:string;
/**
 * The current progress of the stepper, represented as a floating point number (0.0-1.0).
 * This number is used by the progress bar. Kept from the old stepper; not in the spec.
 */
progress:number;
/**
 * Set to true when not all stepper items can be displayed on screen at once.
 * Displays a button that allows users to view additional stepper items.
 * User can set their own functionality to the button. Kept from the old stepper; not in the spec.
 */
showOverflowButton:boolean;
/** Set to true for the progress bar to be shown. Kept from the old stepper; not in the spec. */
progressBar:boolean;private get compact();
/** Tells every item which part to draw, its position, whether it is last, and the card corners. */private syncItems;protected updated(changed:PropertyValues<this>):void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-stepper":ZetaStepper;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Shows where a person is in a fixed sequence of steps, marking what is finished, what is current and what is still
 * ahead. `variant="horizontal"` is a row: `size="default"` names every step, `size="compact"` (mobile) names only the
 * current step above a bar of segments. `variant="vertical"` is a rail, or with `card` a column of cards.
 *
 * Pass `zeta-stepper-item`s as children; each sets its own `status`. They are numbered from 1 and drawn as the part
 * the stepper calls for. A navigation landmark holding a list; the active step carries `aria-current="step"`. On
 * compact the bar is hidden from assistive tech, so the count and title above it are what is announced.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The steps: `zeta-stepper-item`s.
 */"zeta-stepper":Partial<ZetaStepperProps&BaseProps&BaseEvents>}}}