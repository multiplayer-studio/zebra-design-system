import{ZetaButtonProps,BaseProps,BaseEvents}from"../../jsx.js";import{BaseButton}from"./base-button.js";import"../icon/icon.js";import type{ZetaIconName}from"@zebra-fed/zeta-icons";
/** Visual weight of the button. */export type ButtonFlavor="primary"|"positive"|"negative"|"subtle"|"text"|"outline-subtle"|"outline"|"gradient"|"text-gradient"|"contrast"|"outline-contrast";
/** Triggers an action from a text label, with optional icons on either side. Flavour sets how much weight the action
 * carries, size and shape fit it to the surface it sits on. When an action has no text label, use Icon Button.
 *
 * Every colour, size and radius is a Zebra token (specs/button). Hover, pressed and focus are CSS states, not
 * properties.
 *
 * @slot - Content shown on button; typically text.
 * @part button - The button element
 * @part label - The wrapper around the slotted label, for text buttons.
 * @part icon - The icon element of the button, for buttons of type "icon".
 * @cssproperty --flavor-background-color - Overrides the resting background.
 * @cssproperty --flavor-disabled-background-color - Overrides the disabled background.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2024-6729
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-buttons--docs
 */export declare class ZetaButton extends BaseButton{
/** @internal */protected _buttonType:"text"|"icon";static get styles():(import("lit").CSSResult|import("lit").CSSResultGroup[])[];
/**
 * The flavor of the component determines the visual style of the component.
 *
 * @type {ButtonFlavor}
 *
 * @defaultValue "primary"
 *
 * @remarks
 * Supported values for `flavor`:
 * - `"primary"` - The single most important action in a view, one per group.
 * - `"positive"` - Confirms a constructive outcome such as approving or publishing.
 * - `"negative"` - Destructive actions the user cannot undo.
 * - `"subtle"` - A neutral action beside a stronger one, typically the cancel next to a primary.
 * - `"text"` - A tertiary action inside dense content.
 * - `"outline-subtle"` - A secondary action on a busy surface where an accent border would compete.
 * - `"outline"` - A secondary action that still needs to look clickable on its own.
 * - `"gradient"` - One promotional or high-emphasis moment.
 * - `"text-gradient"` - The promotional treatment without the filled weight.
 * - `"contrast"` - The strongest neutral against the page.
 * - `"outline-contrast"` - A secondary action that pairs with contrast.
 *
 * @remarks The value `"secondary"` is no longer supported and should not be used.
 */
flavor:ButtonFlavor;
/**
 * Leading icon of button. Full list of icons can be found at {@link https://design.zebra.com/icons | Zeta Icons}.
 */
leadingIcon:ZetaIconName|null;
/**
 * Trailing icon of button. Full list of icons can be found at {@link https://design.zebra.com/icons | Zeta Icons}.
 */
trailingIcon:ZetaIconName|null;
/**
 * Forwarded to the inner button as `aria-expanded`, for a button that opens and closes something (the leading
 * control of a selectable Accordion row). Set it as a property so the button re-renders when it changes.
 */
ariaExpanded:string|null;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-button":ZetaButton;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Triggers an action from a text label, with optional icons on either side. Flavour sets how much weight the action
 * carries, size and shape fit it to the surface it sits on. When an action has no text label, use Icon Button.
 *
 * Every colour, size and radius is a Zebra token (specs/button). Hover, pressed and focus are CSS states, not
 * properties.
 * ---
 *
 *
 * ### **Events:**
 *  - **submit** - Fired when the button is clicked and has the type submit
 *
 * ### **Slots:**
 *  - _default_ - Content shown on button; typically text.
 *
 * ### **CSS Properties:**
 *  - **--flavor-background-color** - Overrides the resting background. _(default: undefined)_
 * - **--flavor-disabled-background-color** - Overrides the disabled background. _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **button** - The button element
 * - **label** - The wrapper around the slotted label, for text buttons.
 * - **icon** - The icon element of the button, for buttons of type "icon".
 */"zeta-button":Partial<ZetaButtonProps&BaseProps&BaseEvents>}}}