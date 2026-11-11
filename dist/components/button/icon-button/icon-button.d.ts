import{ZetaIconButtonProps,BaseProps,BaseEvents}from"../../../jsx.js";import{ZetaButton}from"../button.js";import"../../icon/icon.js";
/** Triggers an action from a single glyph, with no text label. Square at every size, with the same flavours, shapes and
 * states as Button so the two sit together. Nothing on it is readable, so every instance needs an accessible name:
 * set `aria-label`. When the action can carry a word, use Button instead.
 *
 * Small (control/sm, 36px) is under the 40px minimum target; prefer medium wherever the control is tapped.
 *
 * @cssproperty --icon-button-color the color of the button.
 * @cssproperty --icon-button-icon-color the color of the icon.
 * @cssproperty --icon-button-icon-color-disabled the color of the icon when the button is disabled.
 * @slot {ZetaIconName} - The name of the icon. Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2338-1763
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-buttons--docs
 */export declare class ZetaIconButton extends ZetaButton{static get styles():(import("lit").CSSResult|(import("lit").CSSResult|import("lit").CSSResultGroup[])[])[];protected _buttonType:"text"|"icon";}declare global{interface HTMLElementTagNameMap{"zeta-icon-button":ZetaIconButton;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Triggers an action from a single glyph, with no text label. Square at every size, with the same flavours, shapes and
 * states as Button so the two sit together. Nothing on it is readable, so every instance needs an accessible name:
 * set `aria-label`. When the action can carry a word, use Button instead.
 *
 * Small (control/sm, 36px) is under the 40px minimum target; prefer medium wherever the control is tapped.
 * ---
 *
 *
 * ### **Events:**
 *  - **submit** - Fired when the button is clicked and has the type submit
 *
 * ### **Slots:**
 *  - _default_ - The name of the icon. Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}.
 *
 * ### **CSS Properties:**
 *  - **--icon-button-color** - the color of the button. _(default: undefined)_
 * - **--icon-button-icon-color** - the color of the icon. _(default: undefined)_
 * - **--icon-button-icon-color-disabled** - the color of the icon when the button is disabled. _(default: undefined)_
 * - **--flavor-background-color** - Overrides the resting background. _(default: undefined)_
 * - **--flavor-disabled-background-color** - Overrides the disabled background. _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **button** - The button element
 * - **label** - The wrapper around the slotted label, for text buttons.
 * - **icon** - The icon element of the button, for buttons of type "icon".
 */"zeta-icon-button":Partial<ZetaIconButtonProps&BaseProps&BaseEvents>}}}