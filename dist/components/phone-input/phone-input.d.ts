import{ZetaPhoneInputProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues,type TemplateResult}from"lit";import"../dropdown/droppable.js";import"../dropdown/menu-item/dropdown-menu-item.js";import"../icon/icon.js";import"../text-input/text-input.js";export interface PhoneCountry{
/** ISO 3166-1 alpha-2 code. */
code:string;name:string;
/** Dial code without the plus. */
dialCode:string;
/** How the number groups, with `#` per digit. Without one the digits are left ungrouped. */
format?:string;
/** Real flag artwork, such as an `<img>` or `<svg>` template. It replaces the system's emoji flag. */
flag?:TemplateResult|string;}export interface PhoneInputDetail{
/** National digits, without the dial code. */
value:string;
/** The country the number is dialled in. */
country:PhoneCountry;
/** The whole number in E.164, or empty with no digits. */
e164:string;}
/** The countries offered by default. Set `countries` for your own list. */export declare const PHONE_COUNTRIES:PhoneCountry[];declare const ZetaPhoneInput_base:import("../../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/** Takes a phone number, with a country picker joined to its start. The picker sets the flag and dial code, the field
 * groups digits as they are typed, and the whole number is available in E.164.
 *
 * The number is `zeta-text-input` and the menu is `zeta-droppable`, so states and tokens match Text Input. It submits in
 * forms as E.164 under `name`. Grouping is presentational: pair it with validation and set `error` with `errorText`.
 *
 * Departures from Figma, each a spec issue. The error stays on the number while it is focused, where Figma's typing and
 * focus states replace invalid and the metadata says it stays. `flag` takes real artwork, with the system emoji as the
 * default, where Figma holds the flag glyph as a placeholder.
 *
 * @event {CustomEvent<PhoneInputDetail>} value-change - The digits changed.
 * @event {CustomEvent} country-change - A person picked another country. `detail.country` is the country.
 * @event {Event} input - Fired when the number changes.
 * @event {Event} change - Fired when the number changes and is committed.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7682-19850
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-phone-input--docs
 */export declare class ZetaPhoneInput extends ZetaPhoneInput_base{static formAssociated:boolean;static shadowRootOptions:ShadowRootInit;static styles:import("lit").CSSResultGroup[];
/** Label shown above the field. Empty hides it. */
label:string;
/** Hint text shown below the field. If `error`, then `errorText` is shown instead. */
hintText?:string;
/** Error hint text. Shown if `error`, replaces `hintText`. */
errorText?:string;
/** Whether the number is in error state. */
error:boolean;
/** Marks the label with an asterisk, and a form won't submit without a number. */
required:boolean;
/** Marks the label "(optional)", for a mostly required form. */
optional:boolean;
/** Keeps the icon ahead of the hint, which is what makes an error read as an error before it is read. */
showHintIcon:boolean;
/** default: bordered. gradient: a unique highlight, for a distinct interaction. ghost: no border at rest. */
flavor:"default"|"gradient"|"ghost";
/** Corner shape, shared by the country control's start and the number's end. `full` is a pill. When unset, `rounded`
 * decides between rounded and sharp. */
shape?:"sharp"|"rounded"|"full";
/** Fills the container's width. Without it the field keeps its default width, capped at its container. */
block:boolean;
/** National digits, without the dial code. */
value:string;
/** The selected country's code. */
country:string;
/** The countries offered. */
countries:PhoneCountry[];
/** Accessible name of the country control. The selected country follows it. */
countryLabel:string;
/** Shown while the field is empty. */
placeholder:string;
/** Submits the number in E.164 under this name. */
name:string;
/** The country menu is showing. */private open;private readonly field;private readonly trigger;private readonly internals;private defaultValue;private pendingCaret;private get selected();private get digits();
/** The whole number in E.164, or empty with no digits. */get e164():string;private get rows();private get inputEl();private emitValue;private handleInput;private handleOutsideClick;private toggle;private close;private pick;private focusRow;
/** zeta-droppable has no keyboard handling of its own. */private handleMenuKey;
/** Waits for the menu to draw its rows, then moves focus to the selected one. */private focusSelectedRow;
/** Fills in what zeta-text-input has no property for. Its label and hint are drawn here, so the row sits between them. */private syncInput;private restoreCaret;focus():void;formResetCallback():void;formDisabledCallback(disabled:boolean):void;connectedCallback():void;disconnectedCallback():void;protected updated(changed:PropertyValues<this>):void;private renderFlag;private renderRow;private renderHint;protected render():TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-phone-input":ZetaPhoneInput;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Takes a phone number, with a country picker joined to its start. The picker sets the flag and dial code, the field
 * groups digits as they are typed, and the whole number is available in E.164.
 *
 * The number is `zeta-text-input` and the menu is `zeta-droppable`, so states and tokens match Text Input. It submits in
 * forms as E.164 under `name`. Grouping is presentational: pair it with validation and set `error` with `errorText`.
 *
 * Departures from Figma, each a spec issue. The error stays on the number while it is focused, where Figma's typing and
 * focus states replace invalid and the metadata says it stays. `flag` takes real artwork, with the system emoji as the
 * default, where Figma holds the flag glyph as a placeholder.
 * ---
 *
 *
 * ### **Events:**
 *  - **value-change** - The digits changed.
 * - **country-change** - A person picked another country. `detail.country` is the country.
 * - **change** - Fired when the number changes and is committed.
 * - **input** - Fired when the number changes.
 */"zeta-phone-input":Partial<ZetaPhoneInputProps&BaseProps&BaseEvents>}}}