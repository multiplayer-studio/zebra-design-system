import{ZetaSearchProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../icon/icon.js";import{type ZetaInputType}from"../../mixins/form-field.js";declare const ZetaSearch_base:import("../../mixins/utils.js").AbstractConstructor<{type:ZetaInputType;name:string;required:boolean;value:string;disabled:boolean;checked?:boolean;indeterminate:boolean;input:HTMLInputElement;internals:ElementInternals;placeholder:string;min:number;max:number;readOnly?:boolean;handleChange(event:Event):void;handleInput(event:Event):void;handleFocus(event:FocusEvent):void;handleBlur(event:FocusEvent):void;}&LitElement>&import("../../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&import("../../mixins/utils.js").Constructor<{shape:import("../../mixins/contourable-three.js").Shape;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/** A text input field for entering search queries.
 *
 * Supports speech recognition search on Chrome. While there is text, a clear button appears before the trailing
 * control. `flavor` picks a bordered, gradient or ghost field; `shape` its corners; `size` its height.
 *
 * @event {FocusEvent} focus - Fired when the search field is focused
 * @event {FocusEvent} blur - Fired when the search field is blurred
 * @event {Event} change - Fired when the search value changes and is committed
 * @event {Event} submit - Fired when the enter is pressed within the search box
 * @event {InputEvent} input - Fired when the search value changes
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2152-8811
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-search--docs
 *
 * @slot leading - Leading icon
 */export declare class ZetaSearch extends ZetaSearch_base{type:Extract<ZetaInputType,"search">;static shadowRootOptions:ShadowRootInit;private readonly inputEl;_round:false|true|"full";handleChange(_event:Event):Event;focus():void;blur():void;
/** Fills the container's width. Without it the field keeps its default width, capped at its container. */
block:boolean;
/** Show microphone icon: the trailing voice-input control (spec: hasTrailing). Shown where speech recognition is
 * available. */
hasIcon:boolean;
/** Shows the leading magnifier. */
hasLeading:boolean;
/** default: a bordered field for forms. gradient: a highlight such as an AI search. ghost: no border at rest, for a
 * surface that already bounds it. */
flavor:"default"|"gradient"|"ghost";
/** Accessible name of the clear button. */
clearLabel:string;
/** Accessible name of the voice input button. */
voiceLabel:string;private resetInput;private handleSpeechRecognition;private renderRightIcon;private renderCancelIcon;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-search":ZetaSearch;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A text input field for entering search queries.
 *
 * Supports speech recognition search on Chrome. While there is text, a clear button appears before the trailing
 * control. `flavor` picks a bordered, gradient or ghost field; `shape` its corners; `size` its height.
 * ---
 *
 *
 * ### **Events:**
 *  - **focus** - Fired when the search field is focused
 * - **blur** - Fired when the search field is blurred
 * - **change** - Fired when the search value changes and is committed
 * - **submit** - Fired when the enter is pressed within the search box
 * - **input** - Fired when the search value changes
 *
 * ### **Methods:**
 *  - **handleChange(_event: _Event_)** - Event fired when the input value changes and is committed:
 * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
 * or if it is a text-like input, when the user loses focus from the input.
 * or if it is a checkbox-like input, when the checkbox is toggled.
 * or if it is a radio-like input, when the radio is selected (but not unselected).
 * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
 * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
 * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
 *
 * ### **Slots:**
 *  - **leading** - Leading icon
 */"zeta-search":Partial<ZetaSearchProps&BaseProps&BaseEvents>}}}