import{ZetaSwitchProps,BaseProps,BaseEvents}from"../../jsx.js";import{type PropertyValues}from"lit";import{type ZetaIconName}from"../../icons.js";import{BaseToggleFormElement}from"../base-toggle-form-element.js";import"../icon/icon.js";import type{ZetaInputType}from"../../mixins/form-field.js";
/**
 * A single on or off toggle: a track with a thumb that slides between its ends. `activeIcon` shows at the start while
 * on and `inactiveIcon` at the end while off; leave both unset for a plain track. Name it with a label beside it, or
 * aria-label, since the switch has no text of its own.
 *
 * @cssproperty --switch-track-color Color of the switch track
 * @cssproperty --switch-track-active-color Color of the switch track when switch is ON
 * @cssproperty --switch-track-disabled-color Color of the switch track when switch is disabled
 * @cssproperty --switch-icon-color Color of the activeIcon & inactiveIcon
 * @cssproperty --switch-icon-disabled-color Color of the activeIcon & inactiveIcon when disabled
 * @cssproperty --switch-thumb-color Color of the switch thumb
 * @cssproperty --switch-thumb-disabled-color Color of the switch thumb when disabled
 * @cssproperty --switch-height Height of the switch
 * @cssproperty --switch-width Width of the switch
 * @cssproperty --switch-thumb-size Height & Width of the switch thumb
 * @cssproperty --switch-icon-size Height & Width of the activeIcon & inactiveIcon
 *
 * @part track - The switch track
 * @part thumb - The switch thumb
 * @part icon active - The active icon
 * @part icon inactive - The inactive icon
 *
 * @event {Event} change - Fired when the checkbox value changes
 * @event {InputEvent} input - Fired when the checkbox value changes
 *
 * @figma https://www.figma.com/design/IIMfLwyDF9xnwmpKpy8Kj7/switch?node-id=5655-893
 * @storybook ?path=/docs/components-switch--docs
 */export declare class ZetaSwitch extends BaseToggleFormElement{constructor();type:Extract<ZetaInputType,"checkbox">;
/** Icon name to display when switch is ON. */
activeIcon?:ZetaIconName;
/** Icon name to display when switch is OFF. */
inactiveIcon?:ZetaIconName;handleChange(event:Event):void;protected updated(changed:PropertyValues<this>):void;static styles:(import("lit").CSSResult|import("lit").CSSResultGroup[])[];protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-switch":ZetaSwitch;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A single on or off toggle: a track with a thumb that slides between its ends. `activeIcon` shows at the start while
 * on and `inactiveIcon` at the end while off; leave both unset for a plain track. Name it with a label beside it, or
 * aria-label, since the switch has no text of its own.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - Fired when the checkbox value changes
 * - **input** - Fired when the checkbox value changes
 *
 * ### **Methods:**
 *  - **handleChange(event: _Event_): _Event | void_** - Event fired when the input value changes and is committed:
 * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
 * or if it is a text-like input, when the user loses focus from the input.
 * or if it is a checkbox-like input, when the checkbox is toggled.
 * or if it is a radio-like input, when the radio is selected (but not unselected).
 * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
 * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
 * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
 *
 * ### **CSS Properties:**
 *  - **--switch-track-color** - Color of the switch track _(default: undefined)_
 * - **--switch-track-active-color** - Color of the switch track when switch is ON _(default: undefined)_
 * - **--switch-track-disabled-color** - Color of the switch track when switch is disabled _(default: undefined)_
 * - **--switch-icon-color** - Color of the activeIcon & inactiveIcon _(default: undefined)_
 * - **--switch-icon-disabled-color** - Color of the activeIcon & inactiveIcon when disabled _(default: undefined)_
 * - **--switch-thumb-color** - Color of the switch thumb _(default: undefined)_
 * - **--switch-thumb-disabled-color** - Color of the switch thumb when disabled _(default: undefined)_
 * - **--switch-height** - Height of the switch _(default: undefined)_
 * - **--switch-width** - Width of the switch _(default: undefined)_
 * - **--switch-thumb-size** - Height & Width of the switch thumb _(default: undefined)_
 * - **--switch-icon-size** - Height & Width of the activeIcon & inactiveIcon _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **track** - The switch track
 * - **thumb** - The switch thumb
 * - **icon** - active - The active icon
 * - **icon** - active - The active icon
 */"zeta-switch":Partial<Omit<React.InputHTMLAttributes<ZetaSwitchProps>,keyof ZetaSwitchProps|keyof BaseEvents|keyof BaseProps>>|Partial<ZetaSwitchProps&BaseProps&BaseEvents>}}}