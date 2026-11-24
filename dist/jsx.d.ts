import { type ZetaIconName } from "./icons.js";
/**
 * This type can be used to create scoped tags for your components.
 *
 * Usage:
 *
 * ```ts
 * import type { ScopedElements } from "path/to/library/jsx-integration";
 *
 * declare module "my-library" {
 *   namespace JSX {
 *     interface IntrinsicElements
 *       extends ScopedElements<'test-', ''> {}
 *   }
 * }
 * ```
 *
 */
export type ScopedElements<Prefix extends string = "", Suffix extends string = ""> = {
  [Key in keyof CustomElements as `${Prefix}${Key}${Suffix}`]: CustomElements[Key];
};

type BaseProps = {
  /** Content added between the opening and closing tags of the element */
  children?: any;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  className?: string;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined>;
  /** Specifies the text direction of the element. */
  dir?: "ltr" | "rtl";
  /** Contains a space-separated list of the part names of the element that should be exposed on the host element. */
  exportparts?: string;
  /** For <label> and <output>, lets you associate the label with some control. */
  htmlFor?: string;
  /** Specifies whether the element should be hidden. */
  hidden?: boolean | string;
  /** A unique identifier for the element. */
  id?: string;
  /** Keys tell React which array item each component corresponds to */
  key?: string | number;
  /** Specifies the language of the element. */
  lang?: string;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string;
  /** Use the ref attribute with a variable to assign a DOM element to the variable once the element is rendered. */
  ref?: unknown | ((e: unknown) => void);
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Prop for setting inline styles */
  style?: Record<string, string | number>;
  /** Overrides the default Tab button behavior. Avoid using values other than -1 and 0. */
  tabIndex?: number;
  /** Specifies the tooltip text for the element. */
  title?: string;
  /** Passing 'no' excludes the element content from being translated. */
  translate?: "yes" | "no";
};

type BaseEvents = {
  /** Triggered when the element is clicked by the user by mouse or keyboard. */
  onClick?: (event: MouseEvent) => void;
  /** Fired when a key is pressed down. */
  onKeyDown?: (event: KeyboardEvent) => void;
  /** Fired when a key is released.. */
  onKeyUp?: (event: KeyboardEvent) => void;
  /** Fired when a key is pressed down. */
  onKeyPressed?: (event: KeyboardEvent) => void;
  /** Fired when the element receives focus, often triggered by tab navigation. */
  onFocus?: (event: FocusEvent) => void;
  /** Fired when the element loses focus. */
  onBlur?: (event: FocusEvent) => void;
};

export type ZetaIconProps = {
  /** Name of icon to be displayed. The names are those of the Zebra icon set, `@zebra-design-system/icons`.

If this value and the slot are both populated, this will take precedence. */
  name?: ZetaIconName;
  /** Size of the glyph: xsmall (12px), small (16px), medium (20px) or large (28px). Unset, the icon keeps `--icon-size` or 24px. */
  size?: "xsmall" | "small" | "medium" | "large" | undefined;
  /** Pads the glyph to a fixed box, 40px (24px at xsmall), so it meets the minimum touch target on its own. Adds space, nothing visible. */
  framed?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaButtonProps = {
  /** The flavor of the component determines the visual style of the component. */
  flavor?:
    | "primary"
    | "positive"
    | "negative"
    | "outline"
    | "outline-subtle"
    | "text"
    | "subtle"
    | "contrast"
    | "outline-contrast"
    | "gradient"
    | "text-gradient";
  /** Leading icon of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  leadingIcon?: ZetaIconName | null;
  /** Trailing icon of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  trailingIcon?: ZetaIconName | null;
  /** Whether the component is sharp, rounded or fully rounded.
This will change the border radius and icon font.

Possible values are:
 - `sharp`: No border radius, uses "ZdsIcons-Sharp"
- `rounded`: Minimal border radius, uses "ZdsIcons-Rounded"
- `full`: Full border radius, uses "ZdsIcons-Rounded" */
  shape?: "sharp" | "rounded" | "full";
  /** Size of component */
  size?: SizeType;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** The type of the button when used in a form */
  type?: "submit" | "reset" | "button" | undefined;
  /** Name for the button, used if the button is in a form. */
  name?: string | undefined;
  /** The value of the name property When submitted as part of a form */
  value?: string | undefined;
  /** Forwarded to the inner button as `aria-expanded`, for a button that opens and closes something (the leading
control of a selectable Accordion row). Set it as a property so the button re-renders when it changes. */
  ariaExpanded?: string | null;
  /** Fired when the button is clicked and has the type submit */
  onsubmit?: (e: CustomEvent<SubmitEvent>) => void;
};

export type ZetaIconButtonProps = {
  /** The flavor of the component determines the visual style of the component. */
  flavor?:
    | "primary"
    | "positive"
    | "negative"
    | "outline"
    | "outline-subtle"
    | "text"
    | "subtle"
    | "contrast"
    | "outline-contrast"
    | "gradient"
    | "text-gradient";
  /** Leading icon of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  leadingIcon?: ZetaIconName | null;
  /** Trailing icon of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  trailingIcon?: ZetaIconName | null;
  /** Whether the component is sharp, rounded or fully rounded.
This will change the border radius and icon font.

Possible values are:
 - `sharp`: No border radius, uses "ZdsIcons-Sharp"
- `rounded`: Minimal border radius, uses "ZdsIcons-Rounded"
- `full`: Full border radius, uses "ZdsIcons-Rounded" */
  shape?: "sharp" | "rounded" | "full";
  /** Size of component */
  size?: SizeType;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** The type of the button when used in a form */
  type?: "submit" | "reset" | "button" | undefined;
  /** Name for the button, used if the button is in a form. */
  name?: string | undefined;
  /** The value of the name property When submitted as part of a form */
  value?: string | undefined;
  /** Forwarded to the inner button as `aria-expanded`, for a button that opens and closes something (the leading
control of a selectable Accordion row). Set it as a property so the button re-renders when it changes. */
  ariaExpanded?: string | null;
  /** Fired when the button is clicked and has the type submit */
  onsubmit?: (e: CustomEvent<SubmitEvent>) => void;
};

export type ZetaAccordionItemProps = {
  /** Title of the accordion item. */
  title?: string;
  /** Whether the accordion item is initially open. */
  expanded?: boolean;
  /** Whether the accordion item is initially selected. */
  selected?: boolean;
  /** Whether the item is selectable */
  selectable?: boolean;
  /** Whether the accordion item is a navigation item. */
  navigation?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Dispatched when the accordion item is expanded or collapsed. */
  "onitem-expanded"?: (e: CustomEvent<CustomEvent>) => void;
  /** Dispatched when the accordion item is selected or deselected. */
  "onitem-selected"?: (e: CustomEvent<CustomEvent>) => void;
};

export type ZetaAccordionProps = {
  /** Determines if the ZetaAccordion should be in a card container. */
  inCard?: boolean;
  /** Determines if multiple items can be open at the same time.
When `false`, only one accordion item can be open at a time. */
  expandMultiple?: boolean;
  /** Determines if multiple accordion items can be selected. */
  selectMultiple?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaCheckboxProps = {
  /** Whether the order of the checkbox and its label should be reversed. */
  reverse?: boolean;
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The name of the form control. */
  name?: string;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The minimum value for number inputs */
  min?: number | undefined;
  /** The maximum value for number inputs */
  max?: number | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** Size of component */
  size?: SizeType;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The type of the form control. */
  type?: ZetaInputType;
  /**  */
  role?: string;
  /**  */
  internals?: ElementInternals;
  /**  */
  input?: HTMLInputElement;
  /**  */
  label?: HTMLLabelElement | undefined;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired when the checkbox value changes */
  onchange?: (e: CustomEvent<Event>) => void;
  /** Fired when the checkbox value changes */
  oninput?: (e: CustomEvent<InputEvent>) => void;
};

export type ZetaRadioButtonProps = {
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The name of the form control. */
  name?: string;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The minimum value for number inputs */
  min?: number | undefined;
  /** The maximum value for number inputs */
  max?: number | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** Size of component */
  size?: SizeType;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The type of the form control. */
  type?: ZetaInputType;
  /**  */
  role?: string;
  /**  */
  internals?: ElementInternals;
  /**  */
  input?: HTMLInputElement;
  /**  */
  label?: HTMLLabelElement | undefined;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired when the radio button becomes checked (but not when unchecked) */
  onchange?: (e: CustomEvent<Event>) => void;
  /** Fired when the radio button value changes */
  oninput?: (e: CustomEvent<InputEvent>) => void;
};

export type ZetaDropdownMenuItemProps = {
  /** The row's option is currently chosen. */
  selected?: boolean;
  /** What leads the row: the slotted icon, or a Checkbox or Radio Button that shows `selected`. */
  type?: "checkbox" | "radio" | "icon";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Size of component */
  size?: SizeType;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;

  /** A checkbox or radio row's `selected` changed because the row was activated. */
  onchange?: (e: CustomEvent<never>) => void;
};

export type ZetaDroppableProps = {
  /** Controls the open state of the droppable. */
  open?: boolean;
  /** Tightens the inset for a menu with little room to spare. */
  compact?: boolean;
  /** Controls whether the droppable is fit to the width of the anchor */
  matchParentWidth?: boolean;
  /** The anchor element to position the droppable */
  anchor?: HTMLElement | undefined;
  /** The alignment of the droppable relative to the anchor */
  alignment?: "start" | "end" | "center" | undefined;
  /** The direction of the droppable relative to the anchor */
  direction?: "left" | "right" | "bottom" | "top" | undefined;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /**  */
  slottedElements?: Array<HTMLElement>;
};

export type ZetaDropdownMenuButtonProps = {
  /** Whether the dropdown menu should match the width of its parent. Enabled by default. If disabled, the dropdown menu will size to fit its content. */
  matchParentWidth?: boolean;
  /** Whether the button text should update to match the selected item. Default is true. Only applicable for the text-dropdown type. */
  buttonTextMatchesSelected?: boolean;
  /** The default text to display when no item is selected. Defaults to an empty string if nothing is set. */
  defaultText?: string;
  /** Controls the state of the dropdown menu. Default is false. */
  open?: boolean;
  /** Array of items to populate the dropdown. Includes label, icon (optional), checked (optional), disabled (optional), and onClick (optional) properties. */
  items?: Array<ZetaDropdownItem>;
  /** The flavor of the dropdown button. Default is "primary". */
  flavor?:
    | "primary"
    | "positive"
    | "negative"
    | "outline"
    | "outline-subtle"
    | "text"
    | "subtle"
    | "contrast"
    | "outline-contrast"
    | "gradient"
    | "text-gradient";
  /** The type of dropdown. Options are "text-dropdown", "checkbox-dropdown", and "radio-dropdown". Default is "text-dropdown". */
  type?: "checkbox-dropdown" | "radio-dropdown" | "text-dropdown";
  /** The name of the dropdown menu button for form control. Default is "default". */
  name?: string;
  /** The direction of the droppable relative to the anchor. Defaults to bottom if left undefined. */
  direction?: "left" | "right" | "bottom" | "top";
  /** Which edges of the menu and trigger line up (spec: align). `start` is the spec's left (or top, when `direction`
is left or right), `end` its right (or bottom). Passed to the menu. */
  alignment?: "start" | "end" | "center" | undefined;
  /** Tightens the menu's inset for a cramped rail (spec: Dropdown Menu, Compact). Passed to the menu. */
  compact?: boolean;
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The minimum value for number inputs */
  min?: number | undefined;
  /** The maximum value for number inputs */
  max?: number | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Size of component */
  size?: SizeType;
  /**  */
  anchor?: HTMLElement;
  /**  */
  droppable?: ZetaDroppable;
  /**  */
  internals?: ElementInternals;
  /**  */
  input?: HTMLInputElement;
  /**  */
  label?: HTMLLabelElement | undefined;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired when the dropdown is opened. */
  onopen?: (e: CustomEvent<CustomEvent<ZetaDropdownEventDetail>>) => void;
  /** Fired when the dropdown is closed. */
  onclose?: (e: CustomEvent<CustomEvent<ZetaDropdownEventDetail>>) => void;
  /** Fired when the dropdown is closed. */
  oninput?: (e: CustomEvent<InputEvent>) => void;
};

export type ZetaActionMenuButtonProps = {
  /** Controls the state of the dropdown menu. */
  open?: boolean;
  /** Array of action items */
  items?: Array<ZetaDropdownItem>;
  /** The icon to be displayed on the button */
  icon?: ZetaIconName;
  /** The alignment of the droppable relative to the action menu. Defaults start if left undefined. */
  alignment?: "start" | "end" | "center" | undefined;
  /** The direction of the droppable relative to the anchor. Defaults to bottom if left undefined. */
  direction?: "left" | "right" | "bottom" | "top" | undefined;
  /** The flavor of the component determines the visual style of the component. */
  flavor?:
    | "primary"
    | "positive"
    | "negative"
    | "outline"
    | "outline-subtle"
    | "text"
    | "subtle"
    | "contrast"
    | "outline-contrast"
    | "gradient"
    | "text-gradient";
  /** Leading icon of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  leadingIcon?: ZetaIconName | null;
  /** Trailing icon of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  trailingIcon?: ZetaIconName | null;
  /** Whether the component is sharp, rounded or fully rounded.
This will change the border radius and icon font.

Possible values are:
 - `sharp`: No border radius, uses "ZdsIcons-Sharp"
- `rounded`: Minimal border radius, uses "ZdsIcons-Rounded"
- `full`: Full border radius, uses "ZdsIcons-Rounded" */
  shape?: "sharp" | "rounded" | "full";
  /** Size of component */
  size?: SizeType;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** The type of the button when used in a form */
  type?: "submit" | "reset" | "button" | undefined;
  /** Name for the button, used if the button is in a form. */
  name?: string | undefined;
  /** The value of the name property When submitted as part of a form */
  value?: string | undefined;
  /**  */
  anchor?: HTMLElement;
  /**  */
  droppable?: ZetaDroppable;
  /** Forwarded to the inner button as `aria-expanded`, for a button that opens and closes something (the leading
control of a selectable Accordion row). Set it as a property so the button re-renders when it changes. */
  ariaExpanded?: string | null;
  /** Fired when the button is clicked and has the type submit */
  onsubmit?: (e: CustomEvent<SubmitEvent>) => void;
};

export type ZetaIndicatorProps = {
  /** Icon to be shown on icon type indicator.

The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  icon?: ZetaIconName | undefined;
  /** Whether to render as a notification or icon indicator. */
  type?: "icon" | "notification";
  /** Value to be displayed inside the indicator.
The value should not be negative.
If the value is above 99, it will be displayed as "99+". It never runs past 3 characters.
The value will determine the size of the indicator when the type is set to "notification".
If the value is above 99, the size will be set to "large".
If the value is a number, it will be displayed as a number.s */
  value?: number | undefined;
  /** Size of component */
  size?: SizeType;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaIconIndicatorProps = {
  /** Size of component */
  size?: SizeType;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Icon to be shown on icon type indicator.

The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  icon?: ZetaIconName | undefined;
  /** Whether to render as a notification or icon indicator. */
  type?: "icon" | "notification";
  /** Value to be displayed inside the indicator.
The value should not be negative.
If the value is above 99, it will be displayed as "99+". It never runs past 3 characters.
The value will determine the size of the indicator when the type is set to "notification".
If the value is above 99, the size will be set to "large".
If the value is a number, it will be displayed as a number.s */
  value?: number | undefined;
};

export type ZetaNotificationIndicatorProps = {
  /** Size of component */
  size?: SizeType;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Icon to be shown on icon type indicator.

The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  icon?: ZetaIconName | undefined;
  /** Whether to render as a notification or icon indicator. */
  type?: "icon" | "notification";
  /** Value to be displayed inside the indicator.
The value should not be negative.
If the value is above 99, it will be displayed as "99+". It never runs past 3 characters.
The value will determine the size of the indicator when the type is set to "notification".
If the value is above 99, the size will be set to "large".
If the value is a number, it will be displayed as a number.s */
  value?: number | undefined;
};

export type ZetaAvatarProps = {
  /** Shows the ring around the avatar. */
  "show-ring"?: boolean;
  /** Shows the dismiss badge. */
  "show-close"?: boolean;
  /** The size of the avatar.
Possible values:
- xxxs: 24px
- xxs: 32px
- xs: 36px
- s: 40px
- m: 48px
- l: 60px
- xl: 80px
- xxl: 120px
- xxxl: 200px

Default value: m */
  size?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl" | undefined;
  /** The swatch behind initials or an icon. Not used behind a photo. One of the seven swatches, or any other colour: a
token name (`chart/series/2`), a custom property (`--brand-accent`) or a CSS colour value. */
  "swatch-color"?: "purple" | "blue" | "sea" | "yellow" | "orange" | "green" | "burgundy" | (string & {});
  /** Accessible name for the dismiss badge, such as "Remove Jane Doe". */
  "close-label"?: string;
  /** Presence state, drawn as a badge with its own glyph and colour. When unset, the `status` slot is shown instead. */
  status?: "available" | "away" | "busy" | "dnd" | "offline" | "on-shift" | undefined;
  /** Accessible text for the presence badge, such as "Available". Give one whenever `status` is set. */
  "status-label"?: string | undefined;

  /** Fired when the dismiss badge is clicked. */
  onclose?: (e: CustomEvent<CustomEvent<ZetaCloseEventDetail>>) => void;
};

export type ZetaAvatarRailProps = {
  /** Shows the close icon on all avatars in the rail. An avatar's own `show-close` attribute takes precedence.
The spec's rail pins close off; this stays for existing Zeta use. */
  "show-close"?: boolean;
  /** The size of the avatars in the rail. This will be overridden by the individual avatar's `size` attribute. */
  size?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl" | undefined;
  /** Which end of the stack is shown whole: `start` puts the first avatar on top, `end` the last (and the counter). */
  stacking?: "start" | "end";
  /** How many avatars show, from 2 to 4. Everyone past it is counted into the overflow. */
  max?: 2 | 3 | 4;
  /** Shows the counter when there are more avatars than `max`. Turn off only where the rail shows the whole group. */
  "show-overflow"?: boolean;
};

export type ZetaPriorityPillProps = {
  /** Text of Priority.

Can also be slotted. */
  label?: string | undefined;
  /** Character shown at start of component. Will be truncated to a single character if longer.

Can also be slotted.

The value of this property is usually a single digit number that indicates the priority level. */
  index?: string | number | undefined;
  /** (Optional) Status of the priority pill.

This changes the color and content of the pill.

If not provided, the pill is drawn as low. */
  status?: "urgent" | "high" | "medium" | "low" | undefined;
  /** Size of the priority pill */
  size?: "small" | "large";
  /** Type of the priority pill

Lozenge shows the whole badge, including the text, while badge only shows the index character. */
  type?: "badge" | "lozenge";
  /** What the circle holds: a direction glyph or the rank in `index`. Defaults to `number` when `index` is set. */
  leading?: "icon" | "number" | undefined;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /**  */
  getIndex?: string;
  /**  */
  getText?: string;
};

export type ZetaStatusLabelProps = {
  /** Type of status label. */
  status?: "info" | "positive" | "warning" | "negative" | "neutral";
  /** Text displayed on label.

Can also be slotted. */
  label?: string | undefined;
  /** A custom glyph for the leading icon. Leave unset to use the glyph fixed per status. */
  icon?: ZetaIconName | undefined;
  /** Whether to show the leading element. Superseded by `leading`, which takes precedence when set. */
  showIcon?: boolean;
  /** The leading element: a dot, a glyph fixed per status, or nothing. Defaults from `showIcon` and `icon`. */
  leading?: "indicator" | "icon" | "none" | undefined;
  /** Adds a dismiss button after the label. It removes the label rather than selecting it. */
  discardable?: boolean;
  /** Accessible name for the dismiss button, saying what it removes. */
  "discard-label"?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when the dismiss button is clicked. */
  onclose?: (e: CustomEvent<CustomEvent<ZetaCloseEventDetail>>) => void;
};

export type ZetaTagProps = {
  /** Text displayed in the tag.

Currently, it is best to use this property instead of the slot, as the slot does not provide an aria label. */
  label?: string | undefined;
  /** Direction of the tag point. */
  direction?: "right" | "left";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /**  */
  textSpan?: HTMLElement;
};

export type ZetaLabelProps = {
  /** The standing of the category (spec: variant). */
  status?: "info" | "positive" | "warning" | "negative" | "neutral";
  /** Text displayed on label.

Can also be slotted. */
  label?: string | undefined;
  /** Solid fill with light text, the strongest form. Turn off for a tint that supports the item rather than leads it. */
  bold?: boolean;
  /** Adds a thin border to the tinted fill. Applies only when `bold` is off. */
  outlined?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaGridMenuItemProps = {
  /**  */
  notificationValue?: string | boolean | undefined;
  /**  */
  active?: boolean;
  /** The destination is unavailable. Applies to inactive items only. */
  disabled?: boolean;
  /** The bottom sheet tile: a focusable square with a larger icon and label. */
  tile?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaListItemProps = {
  /** The headline text of the list element. */
  headline?: string | undefined;
};

export type ZetaListProps = {
  /** Adds dividers in between the list items. */
  divide?: boolean;
};

export type ZetaCardFooterProps = {};

export type ZetaScrimProps = {
  /** `scrim` dims the page behind; `modal` hides it completely. */
  tone?: "scrim" | "modal";
  /**  */
  ariaHidden?: string;
};

export type ZetaBottomSheetProps = {
  /** Sheet Header alignment. */
  headerAlignment?: "start" | "center";
  /** Sheet Header text content. */
  headerText?: string;
  /** Glyph before the title. Unset shows none, as this element always has. */
  headerIcon?: ZetaIconName | undefined;
  /** Accessible name of the leading button (spec issue: Figma has none). */
  leadingLabel?: string;
  /** How the items are arranged. Unset works it out from what is slotted. */
  contentType?: "list" | "grid" | "generic" | undefined;
  /** If the bottom sheet is collapsed or not */
  isExpanded?: boolean;
  /** Present the sheet at the bottom of the viewport over a scrim, with focus inside. Code only (spec: modal). */
  modal?: boolean;
  /** Whether a modal sheet is shown. */
  open?: boolean;
  /** Escape and a scrim click close a modal sheet. Set the property to false when the sheet needs a decision. */
  dismissible?: boolean;
  /** If the items are list items or grid items */
  isGrid?: boolean;
  /** If the content is generic. E.g. not list or grid items. */
  isGenericContent?: boolean;
  /** Default slot */
  items?: NodeList | undefined;
  /** A modal sheet closed, by `hide()`, Escape or a scrim click. */
  onclose?: (e: CustomEvent<Event>) => void;
  /** The leading button was activated. */
  "onleading-click"?: (e: CustomEvent<CustomEvent>) => void;
  /** A modal sheet opened. */
  onopen?: (e: CustomEvent<never>) => void;
};

export type ZetaBreadcrumbItemProps = {
  /** The page a person is on. It is text, not a link, even with an `href`. */
  current?: boolean;
  /** Shows the chevron after the crumb. */
  separator?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The URL of the component. */
  href?: string | undefined;
};

export type ZetaBreadcrumbProps = {
  /** The maximum number of items to display in the breadcrumb.
For example, if the value is 3 and there are 5 items in the breadcrumb:
* The first item will always be displayed.
* The last 2 items will always be displayed.
* The rest of the items will be moved to the overflow menu.

The minimum is 2. Leave it at 0 to show every item. */
  maxItems?: number;
  /** How the current page stands out. `accent` sets it and its icon in blue. */
  flavor?: "default" | "accent";
  /** Accessible name of the trail. */
  label?: string;
  /** Accessible name of the overflow control (spec issue: Figma has none). */
  overflowLabel?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** The `zeta-breadcrumb-item` children, root first. */
  items?: string;
};

export type ZetaButtonGroupItemProps = {
  /** Name for the button, used if the button is in a form. */
  name?: string | undefined;
  /** Size of button. Set by the group; setting it here is overridden. */
  size?: "small" | "medium" | "large";
  /** Whether to show the dropdown icon. */
  showDropdown?: boolean | undefined;
  /**  */
  flavor?: "default" | "inverse" | undefined;
  /**  */
  onclick?: ((this: GlobalEventHandlers, ev: MouseEvent) => unknown) | null;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /**  */
  icon?: Array<Node> | undefined;
};

export type ZetaButtonGroupProps = {
  /** Size of the group. Every item takes it. */
  size?: "small" | "medium" | "large";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaCardBodyProps = {};

export type ZetaCardHeaderProps = {
  /** The headline text. Can Also be slotted. */
  headline?: string | undefined;
  /** The sub headline text. */
  subHeadline?: string | undefined;
};

export type ZetaCardProps = {
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaChartCardProps = {
  /** The title of the chart card, displayed in the header when no header slot is provided. */
  title?: string;
  /** The subtitle of the chart card, displayed below the title in the header when no header slot is provided. */
  subtitle?: string;
  /** Error message to display in the content area.

When provided, the error message will be displayed instead of the slotted content. */
  error?: string | undefined;
  /** Whether the card is clickable.

When true, the card will have hover effects and can be clicked.
Use the `click` event to handle clicks. */
  clickable?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaDividerProps = {
  /** The direction the line runs. Vertical fills the height of its container, so give that container a height. */
  orientation?: "horizontal" | "vertical";
  /**  */
  role?: string;
};

export type ZetaChatThreadProps = {
  /** How many replies the thread holds. */
  replyCount?: number;
  /** Expanded, showing the replies. */
  open?: boolean;
  /** The word after the count. */
  repliesText?: string;
  /** The word after a count of one. */
  replyText?: string;

  /** Fired when the thread opens or closes. */
  ontoggle?: (e: CustomEvent<CustomEvent<{ open: boolean }>>) => void;
};

export type ZetaChatPhotosProps = {
  /** Placeholder glyph while a tile has no image. */
  showIcon?: boolean;
  /** Photos open on activation. */
  clickable?: boolean;
  /** Derived from `photos`. */
  count?: "1" | "2" | "3" | "more";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Image URLs. Up to three show; the rest are counted on the last tile. */
  photos?: string[];
  /** Fired when a photo is activated, when `clickable`. */
  onopen?: (e: CustomEvent<CustomEvent<{ index: number }>>) => void;
};

export type ZetaChatAttachmentProps = {
  /** file, video or audio. */
  type?: "file" | "video" | "audio";
  /** The file's name. */
  fileName?: string;
  /** Type and size, e.g. "PDF · 248 KB". */
  fileMeta?: string;
  /** Media length, e.g. "0:08". */
  duration?: string;
  /** Media or file URL. */
  src?: string;
  /** Video poster image. */
  poster?: string;
  /** Placeholder glyph while there is no poster. */
  showIcon?: boolean;
  /** Playing, reflected. */
  playing?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when Download is pressed on a file with no `src`. */
  ondownload?: (e: CustomEvent<CustomEvent>) => void;
};

export type ZetaChatBubbleProps = {
  /** fill: a tinted bubble; none: plain text. */
  bubbleStyle?: "fill" | "none";
  /** Position in a run of one sender's bubbles. */
  status?: "single" | "first" | "middle" | "last";
  /** The spec's Role, named so as not to collide with the ARIA role attribute. */
  roleName?: "sender" | "receiver";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaChatTimestampProps = {};

export type ZetaChatLoadingIndicatorProps = {
  /** What is happening: Thinking, Typing. */
  label?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaChatControlsProps = {
  /** fill: a floating bar; none: transparent (the assistant's). */
  controlsStyle?: "fill" | "none";
  /** Shows the React toggle. */
  showReact?: boolean;
  /** Shows the More toggle. */
  showMore?: boolean;
  /** The reactions row is open. */
  reactOpen?: boolean;
  /** The menu is open. */
  moreOpen?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /**  */
  onn?: (e: CustomEvent<CustomEvent>) => void;
  /** React pressed. */
  onreact?: (e: CustomEvent<CustomEvent>) => void;
  /** More pressed. */
  onmore?: (e: CustomEvent<CustomEvent>) => void;
};

export type ZetaChatMessageProps = {
  /** desktop: controls on hover or focus. mobile: a long press opens reactions and actions over a scrim. */
  platform?: "mobile" | "desktop";
  /** channel: group chats, plain text with avatar and name. conversation: assistant and one-to-one, yours in bubbles on the right. */
  chatStyle?: "conversation" | "channel";
  /** The spec's Role: someone else, you, or the assistant. */
  roleName?: "receiver" | "sender" | "assistant";
  /** Pins the state, reflected. Unset, active follows hover or focus (desktop) or a long press (mobile). */
  state?: "default" | "active" | "loading" | undefined;
  /** first starts a run and carries the header; consecutive lines up under it. */
  sequence?: "first" | "consecutive";
  /** Shows the avatar on a first message. */
  showAvatar?: boolean;
  /** Shows the name and time on a first message. */
  showHeader?: boolean;
  /** The author of the quoted message this one answers. */
  replyTo?: string;
  /** The quoted message's text. */
  replyText?: string;
  /** Keeps a consecutive message's time hidden until hover. The column stays either way. */
  hideTime?: boolean;
  /** The assistant's controls under the message. Its space is kept when off. */
  showControls?: boolean;
  /** Opens the reactions row. */
  reactionControls?: boolean;
  /** Opens the action menu. */
  expandMenu?: boolean;
  /** The sender's name. */
  name?: string;
  /** The avatar's initials. */
  initials?: string;
  /** A Zebra glyph (kebab-case) for the avatar instead of initials: the assistant's own avatar (companion). */
  avatarIcon?: string;
  /** The avatar's swatch behind initials or an icon: give each person their own, and the assistant purple. */
  avatarColor?: string;
  /** The send time, formatted. */
  time?: string;
  /** Position in a run of one sender's bubbles. */
  bubbleStatus?: "single" | "first" | "middle" | "last";
  /** The loading label. Defaults to Thinking for the assistant and Typing otherwise. */
  loadingLabel?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The reactions offered in the row. */
  reactionOptions?: string[];
  /** Fired when the mobile long press opens or closes. */
  onheldchange?: (e: CustomEvent<CustomEvent<{ held: boolean }>>) => void;
  /** Fired when a reaction is chosen. */
  onreact?: (e: CustomEvent<CustomEvent<{ reaction: string }>>) => void;
};

export type ZetaAssistChipProps = {
  /** The leading glyph naming the action's domain (spec: showLeadingIcon, on when set). */
  icon?: ZetaIconName | undefined;
  /** Marks a state or a kind of item through the border and the text. The fill stays neutral. */
  color?: "neutral" | "green" | "orange" | "blue" | "red";
  /** Adds a remove control after the label. */
  discardable?: boolean;
  /** Accessible name for the remove control, saying what it removes. */
  "discard-label"?: string;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when the remove control is clicked. */
  onclose?: (e: CustomEvent<CustomEvent<ZetaCloseEventDetail>>) => void;
};

export type ZetaFilterChipProps = {
  /** Whether the filter is on. */
  active?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when the filter chip is selected/deselected */
  onchange?: (e: CustomEvent<Event>) => void;
};

export type ZetaInputChipProps = {
  /** Accessible name for the remove control, saying what it removes. */
  "remove-label"?: string;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when the remove control is clicked. */
  onclose?: (e: CustomEvent<CustomEvent<ZetaCloseEventDetail>>) => void;
};

export type ZetaStatusChipProps = {
  /** Text displayed in the chip. */
  text?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaDialogProps = {
  /** Title of the dialog. */
  title?: string;
  /** @deprecated Whether header text should be centered.
Feature is deprecated. */
  centered?: boolean;
  /** Whether the modal is initially open. */
  initialOpen?: boolean;
  /** Whether to show a leading icon in the header. */
  showLeadingIcon?: boolean;
  /** Shows the close button in the header (spec: _Dialog Header, showClose). Hide it only when the dialog must be
answered through its actions. */
  showClose?: boolean;
  /** Icon to display in the header. Initial value is undefined. */
  leadingIcon?: ZetaIconName | undefined;
  /** What type of dialog box to show.
This will change the icon and icon colour shown in the header.

Possible values are:
- `default`: Shows black block icon.
- `info`: Shows purple info icon.
- `success`: Shows green verified icon.
- `warning`: Shows yellow warning icon.
- `error`: Shows red error icon. */
  flavor?: "error" | "info" | "warning" | "default" | "success";
  /** Colour of the confirm button.

Possible values are:
- `primary`: Blue background.
- `positive`: Green background.
- `negative`: Red background. */
  confirmButtonFlavor?: "primary" | "positive" | "negative";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Return value of the dialog. */
  returnValue?: string;
  /** Whether the modal should close when the background barrier is clicked.

This is only relevant for modal dialogs, non-modal dialogs do not control their background barrier. */
  closeOnBarrierClicked?: boolean;
  /** Whether component is open or closed. */
  open?: string;
  /** Action button 1 (Confirm). */
  confirmBtn?: NodeList;
  /** Action button 2 (Cancel). */
  cancelBtn?: NodeList;
  /** Action button 3 (Learn more/Other). */
  otherBtn?: NodeList;
  /**  */
  onclose?: (e: CustomEvent<Event>) => void;
  /**  */
  oncancel?: (e: CustomEvent<Event>) => void;
};

export type ZetaEmptyStateProps = {
  /** @deprecated - The title should be slotted in using the `title` slot. This property will be removed in a future release. - Title of the empty state. */
  title?: string;
  /** @deprecated - The description should be slotted in using the `description` slot. This property will be removed in a future release. - Description of the empty state */
  description?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaFileIndicatorProps = {
  /** extension: the badge reads `extension`; unknown: a fixed "?"; icon: a glyph instead of text. */
  type?: "extension" | "unknown" | "icon";
  /** The file's extension, four letters at most. */
  extension?: string;
  /** The glyph on the icon type. */
  icon?: ZetaIconName;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaProgressBarProps = {
  /** The thickness: small (8px) for a bar beside other content, large (16px) when progress is the main thing. `thin`
and `medium` are the old names for small and large. */
  size?: "small" | "large" | "thin" | "medium";
  /** Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored. */
  indeterminate?: boolean | undefined;
  /** The % complete of the process indicator.
Input a floating point number to represent a percentage. Values must be between 0.0-1.0.
If maxValue is set, value can be any number between 0 and maxValue. */
  value?: number;
  /** If maxValue is null treat value as a percentage */
  maxValue?: number | undefined;
  /** The label for the progress indicator. The label row shows when it is set. */
  label?: string | undefined;
  /** Shows the buffer band for what has preloaded. Determinate bars only. */
  buffering?: boolean | undefined;
  /** How much has preloaded, on the same scale as value. The indicator never runs past it. */
  buffer?: number;
  /** Shows the unfilled track behind the indicator, and the buffer band with it. */
  "show-track"?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaProgressCircleProps = {
  /** Size: xxsmall (24px), xsmall (36px), small (40px), medium (48px) or large (64px). Pixel numbers still work. */
  size?: "small" | "medium" | "large" | 24 | 36 | 40 | 48 | 64 | "xxsmall" | "xsmall" | 20;
  /** Progress (0-100). */
  progress?: string;
  /** Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored. */
  indeterminate?: boolean | undefined;
  /** The type of the progress circle. `upload` is the same as setting the upload property. */
  type?: "default" | "upload";
  /** Places the readout and cancel control at the centre. No effect at xsmall or xxsmall, where it is not built. */
  upload?: boolean;
  /** Shows the unfilled track behind the arc. */
  "show-track"?: boolean;
  /** Accessible name of the cancel button. */
  "cancel-label"?: string;
  /** Accessible name of the progress ring. */
  label?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when the cancel button is clicked. */
  oncancelUpload?: (e: CustomEvent<CustomEvent<ZetaCancelUploadEventDetail>>) => void;
};

export type ZetaUploadItemProps = {
  /** Set by the product as the upload moves on; never derived. */
  status?: "waiting" | "uploading" | "complete" | "error";
  /** bar: a Progress Bar under the meta line (rows grow). ring: a Progress Circle at the end (rows keep one height). */
  indicator?: "bar" | "ring";
  /** The trailing cancel or delete. Off for lists that must not be edited; on a ring row it also turns off the cancel in the circle. */
  showDismiss?: boolean;
  /** The file's name. One line, ellipsised. */
  fileName?: string;
  /** Badges the file indicator. Defaults to the file name's extension. */
  extension?: string | undefined;
  /** The file indicator's type. */
  indicatorType?: "extension" | "unknown" | "icon";
  /** Total size in bytes, for the meta line. */
  size?: number | undefined;
  /** 0–100. Clamped and rounded; complete always reads 100. */
  progress?: number;
  /** Replaces "Failed" on an error row: say why, e.g. "Connection lost". */
  errorText?: string | undefined;
  /** Status label while waiting. */
  waitingText?: string;
  /** Status label once complete. */
  completeText?: string;
  /** Status label on a failed row, when there is no errorText. */
  failedText?: string;
  /** Try again's label. */
  retryText?: string;
  /** Accessible name of cancel; {name} is replaced. */
  cancelLabel?: string;
  /** Accessible name of delete; {name} is replaced. */
  removeLabel?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /**  */
  onname?: (e: CustomEvent<CustomEvent>) => void;
  /** Fired when close is pressed while waiting or uploading. */
  oncancelUpload?: (e: CustomEvent<CustomEvent<ZetaCancelUploadEventDetail>>) => void;
  /** Fired when delete is pressed on a complete or failed row. */
  onremove?: (e: CustomEvent<CustomEvent>) => void;
  /** Fired when Try again is pressed on a failed row. */
  onretry?: (e: CustomEvent<CustomEvent>) => void;
};

export type ZetaFileUploadProps = {
  /** The zone's state, reflected. Set it to pin one; unset, dragging, error and disabled follow what happens. */
  state?: "error" | "disabled" | "default" | "dragging" | undefined;
  /** The headline text. */
  headline?: string;
  /** The headline while files are over the zone. */
  headlineDragging?: string;
  /** The Select files button's label. */
  selectFilesText?: string;
  /** The caption naming what is accepted. */
  caption?: string;
  /** Shows the caption. */
  showCaption?: boolean;
  /** A comma separated list of accepted file formats.

For more information see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#additional_attributes. */
  accept?: string | undefined;
  /** Largest file, in bytes. */
  maxFileBytes?: number | undefined;
  /** Most files in one pick or drop. */
  maxFiles?: number | undefined;
  /** Allows multiple files to be added to the input. Also affects drag and drop. */
  multiple?: boolean;
  /** The name given to the file input. */
  name?: string | undefined;
  /** A product error for the zone, shown on the error row. */
  errorMessage?: string | undefined;
  /** No drops or picks. */
  disabled?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /**  */
  fileInput?: HTMLInputElement | undefined;
  /** Fired with the accepted files. */
  onfilesselected?: (e: CustomEvent<CustomEvent<{ files: File[] }>>) => void;
  /** Fired with the refused files. */
  onfilesrejected?: (e: CustomEvent<CustomEvent<{ rejections: FileUploadRejection[] }>>) => void;
};

export type ZetaIllustrationProps = {
  /** The name of the illustration. */
  name?:
    | "search"
    | "calendar"
    | "warning"
    | "addDevice"
    | "emptyBox"
    | "welcomeNav"
    | "helpChat"
    | "taskZebra"
    | "sadZebra"
    | "boxEmpty"
    | "loadFailure"
    | "serverDisconnect"
    | "internet1"
    | "internet2"
    | "internet3"
    | "zebraSad"
    | "zebraHidden"
    | "zebraRelaxed"
    | "zebraHappy"
    | "zebraNeutral"
    | "zebraThumbsUp"
    | "login"
    | "welcome"
    | undefined;
  /** (Optional) alt text for the icons. Defaults to the illustration name. */
  alt?: string | undefined;
  /** The base path of zeta-web components. */
  basePath?: string;
  /** Overrides the source path of the illustration. */
  src?: string | undefined;
  /**  */
  getIllustrationPath?: string;
};

export type ZetaSearchProps = {
  /** Fills the container's width. Without it the field keeps its default width, capped at its container. */
  block?: boolean;
  /** Show microphone icon: the trailing voice-input control (spec: hasTrailing). Shown where speech recognition is
available. */
  hasIcon?: boolean;
  /** Shows the leading magnifier. */
  "has-leading"?: boolean;
  /** default: a bordered field for forms. gradient: a highlight such as an AI search. ghost: no border at rest, for a
surface that already bounds it. */
  flavor?: "default" | "gradient" | "ghost";
  /** Accessible name of the clear button. */
  "clear-label"?: string;
  /** Accessible name of the voice input button. */
  "voice-label"?: string;
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The name of the form control. */
  name?: string;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The minimum value for number inputs */
  min?: number | undefined;
  /** The maximum value for number inputs */
  max?: number | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** Size of component */
  size?: SizeType;
  /** Whether the component is sharp, rounded or fully rounded.
This will change the border radius and icon font.

Possible values are:
 - `sharp`: No border radius, uses "ZdsIcons-Sharp"
- `rounded`: Minimal border radius, uses "ZdsIcons-Rounded"
- `full`: Full border radius, uses "ZdsIcons-Rounded" */
  shape?: "sharp" | "rounded" | "full";
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** The type of the form control. */
  type?: ZetaInputType;
  /**  */
  _round?: false | true | "full";
  /**  */
  internals?: ElementInternals;
  /**  */
  input?: HTMLInputElement;
  /**  */
  label?: HTMLLabelElement | undefined;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired when the search field is focused */
  onfocus?: (e: CustomEvent<FocusEvent>) => void;
  /** Fired when the search field is blurred */
  onblur?: (e: CustomEvent<FocusEvent>) => void;
  /** Fired when the search value changes and is committed */
  onchange?: (e: CustomEvent<Event>) => void;
  /** Fired when the enter is pressed within the search box */
  onsubmit?: (e: CustomEvent<Event>) => void;
  /** Fired when the search value changes */
  oninput?: (e: CustomEvent<InputEvent>) => void;
};

export type ZetaGlobalHeaderProps = {
  /** Frozen in dark whatever the page mode. Set `data-theme="light"` to override it on this header. */
  "data-theme"?: "dark" | "light";
  /** The product's name. It does not change as a person navigates. */
  platformName?: string | undefined;
  /** Locked to the top of the page with a square bar. Make false for a rounded header that floats. */
  anchored?: Boolean;
  /** Shows the account control. Make false to hide it. */
  showProfile?: Boolean;
  /** Keeps the product name beside the mark. */
  showPlatformName?: boolean;
  /** Keeps the logo region. Figma declares this without binding it (spec issue). */
  showLogo?: boolean;
  /** Draws a hairline before the menu items and another after the action items. */
  dividers?: boolean;
  /** The name to show in the header, next to the user icon. */
  name?: String;
  /** The initials to display within the user icon. */
  initials?: String;
  /** Shows the app switcher icon. Make true to show the app switcher icon. */
  appSwitcher?: Boolean;
  /** Shows the search bar. Make true to show the search bar. */
  searchbar?: Boolean;
  /** Accessible name of the menu button (spec issue: Figma has none). */
  menuLabel?: string;
  /** Accessible name of the app switcher (spec issue: Figma has none). */
  appSwitcherLabel?: string;
  /** Accessible name of the navigation region. */
  navigationLabel?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Slot for menu items on the left side of the header.
Expects elements of type zeta-button or zeta-dropdown-menu-button. */
  menuItems?: Array<Node>;
  /** Slot for action items on the right side of the header.
Expects elements of type zeta-icon-button or zeta-action-menu-button. */
  actionItems?: Array<Node>;
  /** Fired when the user info button is clicked. */
  "onuser-info-click"?: (e: CustomEvent<never>) => void;
  /** Fired when the hamburger menu button is clicked. */
  "onhamburger-menu-click"?: (e: CustomEvent<never>) => void;
  /** Fired when the app switcher button is clicked. */
  "onapp-switcher-click"?: (e: CustomEvent<never>) => void;
};

export type ZetaFabProps = {
  /** The label display on or below the button. */
  label?: string;
  /** Flavor of component.

Values:
* primary - blue background.
* positive - green background.
* negative - red background.
* outline - primary outline only.
* outline-subtle - grey outline only.
* text - primary text only.
* inverse - black/white background. Note that this flavor is not supported in all components.
* subtle - white background with grey text. Same action colors as 'text' flavor. */
  flavor?: "primary" | "inverse";
  /**  */
  extended?: boolean;
  /** Size of component */
  size?: SizeType;
  /** Whether the component is sharp, rounded or fully rounded.
This will change the border radius and icon font.

Possible values are:
 - `sharp`: No border radius, uses "ZdsIcons-Sharp"
- `rounded`: Minimal border radius, uses "ZdsIcons-Rounded"
- `full`: Full border radius, uses "ZdsIcons-Rounded" */
  shape?: "sharp" | "rounded" | "full";
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** The type of the button when used in a form */
  type?: "submit" | "reset" | "button" | undefined;
  /** Name for the button, used if the button is in a form. */
  name?: string | undefined;
  /** The value of the name property When submitted as part of a form */
  value?: string | undefined;

  /** Fired when the button is clicked and has the type submit */
  onsubmit?: (e: CustomEvent<SubmitEvent>) => void;
};

export type ZetaInPageBannerProps = {
  /** The status colour and glyph. `default` is the legacy name for neutral. */
  status?: "positive" | "negative" | "info" | "neutral" | "warning" | "default";
  /** `solid` interrupts; `subtle` informs. */
  appearance?: "subtle" | "solid";
  /** The headline: what happened (spec: title). */
  heading?: string;
  /** The legacy name for `heading`. */
  title?: string;
  /** The supporting line: why, and what to do next. Shown when set. */
  description?: string;
  /** Keeps the status glyph so the banner survives greyscale. */
  "show-icon"?: boolean;
  /** Replaces the status glyph. */
  icon?: ZetaIconName | undefined;
  /** Shows the dismiss. */
  "show-close"?: boolean;
  /** The legacy name for `showClose`. */
  canClose?: boolean;
  /** Accessible name of the dismiss. */
  "close-label"?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** The dismiss was pressed. The product removes the banner. */
  onclose?: (e: CustomEvent<CustomEvent<ZetaCloseEventDetail>>) => void;
};

export type ZetaLoginPageProps = {
  /** The URL to redirect to when the Sign in button is pressed */
  url?: string;
  /** Name of Zebra Product. */
  name?: string;
  /** Extra information to display to the user to inform them what they are signing into */
  description?: string | undefined;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaMessageInputProps = {
  /** The spec's state, reflected. Set it to pin a state; left unset it follows what the person does. */
  state?:
    | "recording"
    | "disabled"
    | "filled"
    | "empty"
    | "attachment-open"
    | "listening"
    | "transcribing"
    | "dictated"
    | "playback"
    | "speaking"
    | null;
  /**  */
  placeholder?: string;
  /**  */
  value?: string;
  /**  */
  disabled?: boolean;
  /** Accepted file types, as the picker's `accept`; applied to dropped and pasted files too. */
  accept?: string | null;
  /**  */
  maxLength?: number | null;
  /**  */
  maxAttachments?: number | null;
  /**  */
  maxFileBytes?: number | null;
  /**  */
  maxRecordingSeconds?: number;
  /**  */
  maxDictationSeconds?: number;
  /** Enter sends and Shift+Enter adds a line. Off, Enter only adds a line. */
  sendOnEnter?: boolean;
  /** BCP 47 language for browser speech recognition. */
  lang?: string;
  /** Shows the read-aloud toggle (not in the spec). */
  showReadAloud?: boolean;
  /** The read-aloud toggle's value. */
  speakResponse?: boolean;
  /** A reply is being read aloud: the orb, the caption and one stop control. */
  speaking?: boolean;
  /** The reply being spoken, shown under the orb. */
  speakingText?: string;
  /** Where the voice is in `speaking-text`, as a character offset. */
  speakingCharIndex?: number | null;
  /** Loudness 0–1 driving the orb. Unset, the orb breathes on its own. */
  speakingLevel?: number | null;
  /**  */
  dictated?: boolean;
  /**  */
  trayOpen?: boolean;
  /**  */
  label?: string;
  /** Who is being answered. Setting it shows the Reply Bar above the body (the spec's Show Reply). Not shown while speaking or disabled. */
  replyTo?: string;
  /** The quoted line being answered. One line, truncated. */
  replyText?: string;
  /** Extra tray actions, after file and camera. */
  actions?: MessageInputAction[];
  /** Turns a dictation recording into text. Without it, the browser's speech recognition is used. */
  transcribe?: ((audio: Blob) => Promise<string>) | null;
  /** Replaces any of the composer's texts; see `messageInputStrings`. */
  strings?: Partial<MessageInputStrings>;
  /** Assist Chip colour per attachment. */
  attachmentColor?: (a: MessageAttachment) => AssistChipColor;
  /** The files held, e.g. a restored draft. */
  attachments?: MessageAttachment[];
  /** A recorded take to start from. Opens in playback. */
  voiceNote?: MessageVoiceNote | null;
  /**  */
  onname?: (e: CustomEvent<CustomEvent>) => void;
  /** Fired when the message is sent. */
  onsend?: (e: CustomEvent<CustomEvent<MessageSubmission>>) => void;
  /** Fired when the text changes. */
  onchange?: (e: CustomEvent<CustomEvent<{ value: string }>>) => void;
  /** Fired when Stop speaking is pressed. */
  onstopspeaking?: (e: CustomEvent<CustomEvent>) => void;
  /** Fired when the read-aloud toggle changes. */
  onspeakresponsechange?: (e: CustomEvent<CustomEvent<{ value: boolean }>>) => void;
  /** Fired when an image chip is activated. */
  onpreviewattachment?: (e: CustomEvent<CustomEvent<{ attachment: MessageAttachment }>>) => void;
  /** Fired when the Reply Bar is pressed. The whole bar is one button that cancels the reply. */
  oncancelreply?: (e: CustomEvent<CustomEvent>) => void;
};

export type ZetaNavigationBarProps = {
  /** Items keep their natural width and the groups sit against the ends. Off, the items share the width evenly. */
  shrinkItems?: boolean;
  /** Draws a vertical rule between the main and the `right` group. */
  showDivider?: boolean;
};

export type ZetaLightboxProps = {
  /** Which item shows. */
  index?: number;
  /** The open-in-a-new-tab control. */
  showOpenInNew?: boolean;
  /** The download control. */
  showDownload?: boolean;
  /** The previous / next controls and arrow keys. Hidden anyway with one item. */
  showNavigation?: boolean;
  /** Slide between frames when paging. On by default; it always yields to the reduced-motion preference. */
  animated?: boolean;
  /** Accessible name of the close control. */
  closeLabel?: string;
  /** Accessible name of the open-in-a-new-tab control. */
  openInNewLabel?: string;
  /** Accessible name of the download control. */
  downloadLabel?: string;
  /** Accessible name of the previous control. */
  previousLabel?: string;
  /** Accessible name of the next control. */
  nextLabel?: string;
  /** The counter text; {index} and {count} are replaced. */
  counterFormat?: string;
  /** The message on the drawn file sheet for an unpreviewable item. */
  noPreviewText?: string;
  /** The toolbar name when an item carries none. */
  untitledText?: string;
  /** Whether the lightbox is initially open (in flow, not modal), for documentation and screenshots. */
  initialOpen?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Return value of the dialog. */
  returnValue?: string;
  /** Whether the modal should close when the background barrier is clicked.

This is only relevant for modal dialogs, non-modal dialogs do not control their background barrier. */
  closeOnBarrierClicked?: boolean;
  /** Whether component is open or closed. */
  open?: string;
  /** The items being previewed. One is fine; the navigation then hides itself. */
  items?: LightboxItem[];
  /** Fired when paging changes the current item. */
  onchange?: (e: CustomEvent<CustomEvent<{ index: number }>>) => void;
  /** Fired when the lightbox is opened. */
  onopen?: (e: CustomEvent<CustomEvent<ZetaPopupEventDetail>>) => void;
  /** Fired when the lightbox is closed. */
  onclose?: (e: CustomEvent<Event>) => void;
  /**  */
  oncancel?: (e: CustomEvent<Event>) => void;
};

export type ZetaNavigationDrawerFooterProps = {
  /** The headline text. Can also be slotted. */
  headline?: string | undefined;
  /** The sub headline text. */
  subHeadline?: string | undefined;
  /** Shows a divider above the footer. */
  divide?: boolean;
  /** The variant of the footer.

If set to 'logo' the zebra logo or the contents of the 'logo' slot will be shown and the headline text will be displayed beneath the logo. */
  variant?: "profile" | "logo";
  /**  */
  hideDefaultLogo?: boolean | undefined;
  /**  */
  customLogo?: NodeList;
};

export type ZetaNavigationDrawerHeaderProps = {
  /** The headline text. Can also be slotted. */
  headline?: string | undefined;
  /** The sub headline text. */
  subHeadline?: string | undefined;
  /** Shows a divider below the header. */
  divide?: boolean;
};

export type ZetaNavigationDrawerItemProps = {
  /** The headline text. Can also be slotted. */
  headline?: string | undefined;
  /** Sets the item to active. */
  active?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
};

export type ZetaNavigationDrawerSubItemProps = {
  /** The headline text. Can also be slotted. */
  headline?: string | undefined;
  /** Sets the item to active. */
  active?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
};

export type ZetaNavigationDrawerProps = {
  /** The side of the screen that the drawer is anchored on (spec `side`: left = start, right = end). */
  anchor?: "left" | "right";
  /** Toggles the animation for the navigation drawer. */
  showAnimation?: boolean;
  /** Whether the drawer is initially open. */
  initialOpen?: boolean;
  /** Slides over the page on a scrim. `false` is a standard drawer that sits in the layout and pushes the content. */
  modal?: boolean;
  /** Escape and a scrim click close a modal drawer. */
  dismissible?: boolean;
  /** Choosing a destination closes a modal drawer. Opening a group never does. */
  "close-on-navigate"?: boolean;
  /** The header's icon button becomes the close button. */
  "show-close"?: boolean;
  /** Accessible name of the close button. */
  "close-label"?: string;
  /** Accessible name of the navigation landmark and of the modal drawer. */
  "nav-label"?: string;
  /** A full-width primary button under the header. Unset, there is none. */
  "action-label"?: string | undefined;
  /** The action's icon (Zeta icon name). */
  "action-icon"?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Return value of the dialog. */
  returnValue?: string;
  /** Whether the modal should close when the background barrier is clicked.

This is only relevant for modal dialogs, non-modal dialogs do not control their background barrier. */
  closeOnBarrierClicked?: boolean;
  /** Whether component is open or closed. */
  open?: string;

  /** The drawer opened. */
  onopen?: (e: CustomEvent<never>) => void;
  /** The drawer closed. `returnValue` is "close", "navigate" or "cancel". */
  onclose?: (e: CustomEvent<Event>) => void;
  /** Escape or a scrim click dismissed it. */
  oncancel?: (e: CustomEvent<Event>) => void;
  /** The header action button was pressed. */
  onaction?: (e: CustomEvent<never>) => void;
};

export type ZetaCaretIndicatorProps = {
  /** Whether the thing it marks is open. Turns the glyph. */
  open?: boolean;
  /** vertical: a list that drops down. horizontal: a row that opens a further level. */
  direction?: "vertical" | "horizontal";
  /** The nested Icon's size: small 16px, medium 20px, large 28px (measured in Figma). */
  size?: "small" | "medium" | "large";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaTooltipProps = {
  /** The edge the pointer sits on, facing the trigger. */
  point?: "left" | "right" | "top" | "bottom";
  /** The label, when nothing is slotted. */
  label?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /**  */
  role?: string;
};

export type ZetaSubMenuItemProps = {
  /** The row the user is on. */
  selected?: boolean;
  /** A child row under a collapsible group: indented, quieter label, smaller type. Set by the group. */
  nested?: boolean;
  /** Shows the leading glyph. Keep it on for every row in a list, or off for all. */
  "show-leading-icon"?: boolean;
  /** Shows the trailing caret, for a row that opens a further level. */
  "sub-menu"?: boolean;
  /** Turns the caret while the level it opens is showing. */
  open?: boolean;
  /** Shows the counter badge between the label and the caret. It takes space in the row. */
  "show-badge"?: boolean;
  /** The badge's count. Above 99 it reads "99+". */
  "badge-value"?: number;
  /** Text equivalent of the badge in the accessible name. Defaults to the count. */
  "badge-label"?: string | undefined;
  /** The URL of the component. */
  href?: string | undefined;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
};

export type ZetaCollapsibleMenuItemProps = {
  /** Whether the group's rows show. */
  open?: boolean;
  /** Shows the header's leading glyph. */
  "show-leading-icon"?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;

  /** Fired when the header opens or closes the group; `detail.open` is the new state. */
  ontoggle?: (e: CustomEvent<never>) => void;
};

export type ZetaNavigationHeaderProps = {
  /** Which mark the header carries. Both are slotted; the type sets the logo's framed height. */
  type?: "avatar" | "logo";
  /** The wide form, with title and action. Inside a rail, the rail sets it. */
  expanded?: boolean;
  /** The title beside the mark (spec: title). */
  headline?: string;
  /** Shows the title. No effect when collapsed. */
  "show-title"?: boolean;
  /** Shows the settings action. No effect when collapsed. */
  "show-icon-button"?: boolean;
  /** Accessible name of the action. */
  "action-label"?: string;
  /** The action's glyph (a Zeta icon name). Settings by default; set any icon, with `action-label` to match. */
  "action-icon"?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when the action is clicked. */
  onaction?: (e: CustomEvent<CustomEvent>) => void;
};

export type ZetaNavigationRailItemProps = {
  /** The destination the user is on. Exactly one item across the rail and its panel should carry it. */
  selected?: boolean;
  /** The wide form: glyph and label on one row. Inside a rail, the rail sets it. */
  expanded?: boolean;
  /** Adds the caption under the glyph in the narrow form. No effect in the wide form, where the label always shows. */
  "show-label"?: boolean;
  /** Shows the glyph, and the badge anchored to it. Keep it on in the narrow form. */
  "show-icon"?: boolean;
  /** A notification dot over the glyph's top-right corner. It sits outside the layout. */
  "show-badge"?: boolean;
  /** Text equivalent of the badge, added to the accessible name. */
  "badge-label"?: string | undefined;
  /** Makes the item a disclosure toggle with this `aria-expanded` value. The rail's toggle item uses it. */
  "toggle-expanded"?: boolean | undefined;
  /** The URL of the component. */
  href?: string | undefined;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
};

export type ZetaNavigationRailProps = {
  /** The wide rail, with every item's label beside its glyph. The toggle item flips it. */
  expanded?: boolean;
  /** Captions under each glyph in the narrow rail (spec: label). No effect when expanded. */
  "show-labels"?: boolean;
  /** Shows the create or compose action under the header. Off by default, so existing rails keep their layout. */
  "show-header-action"?: boolean;
  /** The header action's label: its text in the wide rail, its name in the narrow one, where only the glyph shows. */
  "action-label"?: string;
  /** The header action's glyph. */
  "action-icon"?: ZetaIconName;
  /** Shows the toggle item that widens and narrows the rail. Off by default, so existing rails keep their layout. */
  "show-toggle-item"?: boolean;
  /** Shows the divider down the rail's trailing edge, between the rail and the page. Off by default, so existing rails keep their layout. */
  "show-divider"?: boolean;
  /** The toggle item's label in the narrow rail. */
  "expand-label"?: string;
  /** The toggle item's label in the wide rail. */
  "collapse-label"?: string;
  /** Shows the rail in the opposite shade of the page's mode: dark on a light page, light on a dark one. Contrast still follows the page. */
  inverse?: boolean;
  /** Keeps the rail in one mode whatever the page's mode: dark, or light with `inverse`. Contrast still follows the page. */
  locked?: boolean;
  /** The wide rail's width: 200px by default (Figma's measure), a CSS length or a number in px set by the project, or
`fill` to take the width of the rail's container. The narrow rail is unaffected. */
  "rail-width"?: string | number | undefined;
  /** Caps the wide rail. A CSS length, or a number in px. The narrow rail is unaffected. */
  "rail-max-width"?: string | number | undefined;
  /** Caps the sub menu, which otherwise hugs its rows from 240px up. A cap below 240px lowers the minimum. */
  "sub-menu-max-width"?: string | number | undefined;
  /** Accessible name of the navigation landmark. */
  "nav-label"?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when the toggle item widens or narrows the rail; `detail.expanded` is the new state. */
  "onexpanded-change"?: (e: CustomEvent<never>) => void;
  /** Fired when the header action is clicked. */
  onaction?: (e: CustomEvent<never>) => void;
};

export type ZetaSubMenuHeaderProps = {
  /** default leads with a glyph; sub-page leads with a back button. */
  type?: "default" | "sub-page";
  /** The panel's title (spec: title). */
  headline?: string;
  /** Shows the leading glyph or back button. Figma leaves it unwired on sub page (spec warn); here it hides either. */
  "show-leading-icon"?: boolean;
  /** Shows the trailing actions slot. */
  "show-trailing-actions"?: boolean;
  /** Accessible name of the back button. */
  "back-label"?: string;
  /** Heading level of the title. */
  "heading-level"?: number;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when the back button is clicked (type sub-page). */
  onback?: (e: CustomEvent<CustomEvent>) => void;
};

export type ZetaNavigationProfileProps = {
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaNotificationItemProps = {
  /** The entry has been seen: the card drops its fill and the unread dot. */
  read?: boolean;
  /** The entry stands for several collapsed together. Shows a bar under the card while the entry is unread. */
  group?: boolean;
  /** Shows the attachment row. Set `attachment` too; with no filename the row stays hidden. */
  "show-attachment"?: boolean;
  /** Shows the action slot. Turn it off for a purely informational entry. */
  "show-actions"?: boolean;
  /** Flags the entry as needing attention first. Reserve it: on every entry it signals nothing. */
  "show-urgency-indicator"?: boolean;
  /** What happened (spec: title). */
  headline?: string;
  /** When it happened. */
  timestamp?: string;
  /** The attached file's name. */
  attachment?: string;
  /** Accessible text for the unread state. */
  "unread-label"?: string;
  /** Accessible name of the urgency indicator. */
  "urgency-label"?: string;
};

export type ZetaTextInputProps = {
  /** Whether text field is in error state. */
  error?: boolean;
  /** Fills the container's width. Without it the field keeps its default width, capped at its container. */
  block?: boolean;
  /** Leading icon name. */
  leadingIcon?: ZetaIconName | undefined;
  /** Trailing icon name. */
  trailingIcon?: ZetaIconName | undefined;
  /** Prefix text. */
  prefix?: string;
  /** Suffix text. */
  suffix?: string | undefined;
  /** The number of visible text lines for the control. If it is specified, it must be a positive integer. If it is not specified, the default value is 2.

Prop only applies when `type` is set to `textarea`. */
  rows?: number | undefined;
  /** Label shown above text field. */
  label?: string;
  /** Hint text shown below text field.

if `error`, then `errorText` is shown instead. */
  hintText?: string | undefined;
  /** Error hint text

Shown if `error`, replaces `hintText`. */
  errorText?: string | undefined;
  /** default: bordered. gradient: a unique highlight, such as an AI field. ghost: no border at rest. */
  flavor?: "default" | "gradient" | "ghost";
  /** Corner shape; `full` is a pill. When unset, `rounded` decides between rounded and sharp. */
  shape?: "sharp" | "rounded" | "full" | undefined;
  /** Marks the label "(optional)", for a mostly required form. */
  optional?: boolean;
  /** Adds an information icon after the label. */
  "show-information"?: boolean;
  /** Supporting line under the label (spec: Input Label's Show Sub Label). Shown when set; needs a `label`. */
  "sub-label"?: string;
  /** Keeps the icon ahead of the hint, which is what makes an error read as an error before it is read. */
  "show-hint-icon"?: boolean;
  /**  */
  type?: "text" | "textarea" | "password" | "time" | "date" | "number" | "integer";
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The name of the form control. */
  name?: string;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The minimum value for number inputs */
  min?: number | undefined;
  /** The maximum value for number inputs */
  max?: number | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** Size of component */
  size?: SizeType;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /**  */
  internals?: ElementInternals;
  /**  */
  input?: HTMLInputElement;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired when the input value changes and is committed */
  onchange?: (e: CustomEvent<Event>) => void;
  /** Fired when the input field is focused */
  onfocus?: (e: CustomEvent<FocusEvent>) => void;
  /** Fired when the input field is blurred */
  onblur?: (e: CustomEvent<FocusEvent>) => void;
  /** Fired when the input value changes */
  oninput?: (e: CustomEvent<InputEvent>) => void;
};

export type ZetaPhoneInputProps = {
  /** Label shown above the field. Empty hides it. */
  label?: string;
  /** Hint text shown below the field. If `error`, then `errorText` is shown instead. */
  hintText?: string | undefined;
  /** Error hint text. Shown if `error`, replaces `hintText`. */
  errorText?: string | undefined;
  /** Whether the number is in error state. */
  error?: boolean;
  /** Marks the label with an asterisk, and a form won't submit without a number. */
  required?: boolean;
  /** Marks the label "(optional)", for a mostly required form. */
  optional?: boolean;
  /** Keeps the icon ahead of the hint, which is what makes an error read as an error before it is read. */
  "show-hint-icon"?: boolean;
  /** default: bordered. gradient: a unique highlight, for a distinct interaction. ghost: no border at rest. */
  flavor?: "default" | "gradient" | "ghost";
  /** Corner shape, shared by the country control's start and the number's end. `full` is a pill. When unset, `rounded`
decides between rounded and sharp. */
  shape?: "sharp" | "rounded" | "full" | undefined;
  /** Fills the container's width. Without it the field keeps its default width, capped at its container. */
  block?: boolean;
  /** National digits, without the dial code. */
  value?: string;
  /** The selected country's code. */
  country?: string;
  /** The countries offered. */
  countries?: PhoneCountry[];
  /** Accessible name of the country control. The selected country follows it. */
  countryLabel?: string;
  /** Shown while the field is empty. */
  placeholder?: string;
  /** Submits the number in E.164 under this name. */
  name?: string;
  /** Size of component */
  size?: SizeType;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** The whole number in E.164, or empty with no digits. */
  e164?: string;
  /** The digits changed. */
  "onvalue-change"?: (e: CustomEvent<CustomEvent<PhoneInputDetail>>) => void;
  /** A person picked another country. `detail.country` is the country. */
  "oncountry-change"?: (e: CustomEvent<CustomEvent>) => void;
  /** Fired when the number changes and is committed. */
  onchange?: (e: CustomEvent<Event>) => void;
  /** Fired when the number changes. */
  oninput?: (e: CustomEvent<Event>) => void;
};

export type ZetaPaginationProps = {
  /** Total number of pages. */
  totalPages?: number;
  /** Number of pages on both sides of current active page. */
  siblingCount?: number;
  /** Shows first, previous, next and last, the four jump controls, as one group. */
  "show-controls"?: boolean;
  /** Collapses distant pages behind an overflow marker, keeping the first and last page. Off, only the window of
pages around the current one shows. */
  "show-more"?: boolean;
  /** Gives every control and page number a stroke/thin border. */
  outline?: boolean;
  /** Accessible name of the navigation landmark. */
  "nav-label"?: string;
  /** Current active page. */
  currentPage?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when page change. Contains a single value in details: `page: number`. */
  onpageChange?: (e: CustomEvent<CustomEvent<ZetaPageEventDetail>>) => void;
};

export type ZetaScreenHeaderBarProps = {
  /** The screen's name (spec: title). Name the screen rather than the task in progress. */
  headline?: string;
  /** Shows the back button. Turn it off on a root screen with nowhere to go back to. */
  "show-leading-icon"?: boolean;
  /** Accessible name of the back button. */
  "back-label"?: string;
  /** Heading level of the title. */
  "heading-level"?: number;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** Fired when the back button is clicked. */
  onback?: (e: CustomEvent<CustomEvent>) => void;
};

export type ZetaScrollbarProps = {
  /** The axis the region scrolls. Vertical stands against the trailing edge; horizontal lies along the bottom. */
  orientation?: "vertical" | "horizontal";
  /** Where the handle sits: 0 is the start of the content, 1 the end. Code-only — Figma draws one sample. */
  value?: number;
  /** The handle's length as the viewport's share of the content, 0–1. Code-only; defaults to the drawn sample. */
  size?: number;
  /**  */
  role?: string;
};

export type ZetaShimmerProps = {};

export type ZetaSliderInputFieldProps = {
  /** The label displayed above the input. */
  label?: string | undefined;
  /** Error state. */
  error?: boolean;
  /** The minimum value of the slider input field. */
  min?: number | undefined;
  /** The maximum value of the slider input field. */
  max?: number | undefined;
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** If set, will put steps on the slider at the given increments and the slider will snap to the nearest step. */
  stepIncrement?: number | undefined;
  /** Disables the input field. */
  disabled?: boolean;
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The name of the form control. */
  name?: string;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The type of the form control. */
  type?: ZetaInputType;
  /**  */
  input?: HTMLInputElement;
  /**  */
  internals?: ElementInternals;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired whenever value of slider is changed. Contains a single entry in detail: `value:number`. */
  onchange?: (e: CustomEvent<CustomEvent<ZetaSliderEventDetail>>) => void;
};

export type ZetaSliderProps = {
  /** Disables the slider. The track and thumbs drop to the disabled colour. */
  disabled?: boolean | undefined;
  /** Puts a stop at every increment and snaps the thumbs to the nearest one (spec: stepped). */
  stepIncrement?: number | undefined;
  /** `range` adds a second thumb so a span is chosen (spec: range). */
  type?: "default" | "range";
  /** The value of a default slider. */
  value?: number;
  /** The start of a range slider's span. */
  lowerValue?: number;
  /** The end of a range slider's span. */
  upperValue?: number;
  /** The minimum value. */
  min?: number;
  /** The maximum value. */
  max?: number;
  /** Accessible name of a default slider's thumb. */
  label?: string;
  /** Accessible name of a range slider's start thumb. */
  "lower-label"?: string;
  /** Accessible name of a range slider's end thumb. */
  "upper-label"?: string;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /**  */
  track?: HTMLDivElement;
  /** Fired when a range slider's values change. Contains `min:number` and `max:number`. */
  onchange?: (e: CustomEvent<CustomEvent<ZetaRangeSliderEventDetail>>) => void;
  /** Fired while a thumb is being dragged. */
  oninput?: (e: CustomEvent<never>) => void;
};

export type ZetaSnackbarProps = {
  /** The contextual pill, or the plain dark standard bar. */
  variant?: "contextual" | "standard";
  /** Contextual only: the glyph, the tint and the controls, picked for what happened (spec: status). */
  status?: "positive" | "negative" | "info" | "warning" | "view" | "default" | "action" | "deletion";
  /** @deprecated Use `status`; `error` maps to `negative`. */
  flavor?: "positive" | "error" | "info" | "warning" | "view" | "default" | "action" | "deletion" | undefined;
  /** Shows it. On by default, so a snackbar placed in the page shows as it always has. */
  open?: boolean;
  /** Floats it in the top layer, centred above the bottom of the viewport, with its motion. */
  floating?: boolean;
  /** Closes it after this many ms. 0 keeps it until dismissed. */
  duration?: number;
  /** The action's text. Defaults per status (Undo, View, Action); "" removes it. */
  actionLabel?: string | undefined;
  /** Shows the close. Unset, it follows the status; `show-close="false"` turns it off. */
  "show-close"?: boolean | null;
  /** The legacy switch for the close. */
  hasCloseAction?: boolean;
  /** The close's glyph. */
  closeActionIcon?: ZetaIconName | undefined;
  /** Accessible name of the close. */
  "close-label"?: string;
  /** Whether the component is sharp, rounded or fully rounded.
This will change the border radius and icon font.

Possible values are:
 - `sharp`: No border radius, uses "ZdsIcons-Sharp"
- `rounded`: Minimal border radius, uses "ZdsIcons-Rounded"
- `full`: Full border radius, uses "ZdsIcons-Rounded" */
  shape?: "sharp" | "rounded" | "full";
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** Called when the action is pressed, as well as the `action` event. */
  actionClick?: () => void | undefined;
  /** It closed; `detail.reason` is "dismiss", "timeout" or "action". */
  onclose?: (e: CustomEvent<CustomEvent>) => void;
  /** The action button was pressed. The snackbar then closes. */
  onaction?: (e: CustomEvent<never>) => void;
};

export type ZetaSegmentedItemProps = {
  /** Whether the item is active. */
  active?: boolean;
  /** Set by the control: icon and label, the label alone, or the icon alone. */
  flavor?: "default" | "text-only" | "icon-only";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaSegmentedControlProps = {
  /** What every segment shows: icon and label, the label alone, or the icon alone. Sets their padding. */
  flavor?: "default" | "text-only" | "icon-only";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /**  */
  items?: Array<ZetaSegmentedItem>;
  /**  */
  activeItem?: ZetaSegmentedItem | undefined;
  /**  */
  initComplete?: boolean;
  /**  */
  indicator?: HTMLDivElement;
};

export type ZetaStepperItemProps = {
  /** How the step reads at a glance: the indicator, the label colour and the connector all follow it. */
  status?: "error" | "active" | "disabled" | "default" | "complete" | "partial";
  /** @deprecated Use `status`. Sets `status`, with `success` as `complete`. */
  flavor?: "active" | "default" | "success" | "partial" | undefined;
  /** Names the step in a word or two. Wins over the slotted label. */
  label?: string;
  /** A qualifier under the label, a word or two. Drawn when `show-subtitle` is on. */
  subtitle?: string | undefined;
  /** Draws the subtitle. Defaults to on when a subtitle is given; `show-subtitle="false"` hides it. */
  "show-subtitle"?: boolean | undefined;
  /** Draws the connector to the next step. By default every step but the last draws it. */
  "show-line"?: boolean | undefined;
  /** The number in the indicator. Defaults to the step's position. complete and error show a glyph instead. */
  "step-number"?: string | number | undefined;
  /** Makes the step's text a button that fires `select`, for going back to a step. Only the focus ring shows it. */
  selectable?: boolean;
  /** Shows a pen on the indicator while the step is being edited. Kept from the old item; not in the spec. */
  editing?: boolean;
  /** Which step part to draw. Set by the parent zeta-stepper. */
  kind?: "horizontal" | "vertical" | "card" | "segment";
  /** Card corners. Set by the parent's `rounded`. */
  shape?: "rounded" | "sharp";
  /** The step's 1-based position. Set by the parent zeta-stepper. */
  position?: number;
  /** Whether this is the last step. Set by the parent zeta-stepper. */
  last?: boolean;
  /** False when the parent zeta-stepper's `show-subtitle` is off, which hides this step's subtitle too. */
  parentShowSubtitle?: boolean;
  /** The step's text was chosen. Only with `selectable`. `detail.position` is the step's number. */
  onselect?: (e: CustomEvent<never>) => void;
};

export type ZetaStepperProps = {
  /** Stepper direction. Defaults to horizontal. */
  variant?: "vertical" | "horizontal";
  /** Horizontal only. `default` names every step; `compact`, for mobile, names the current step above a bar. */
  size?: "default" | "compact";
  /** Vertical only. A column of cards instead of a rail. */
  card?: boolean;
  /** Vertical cards only. Rounded corners (Step Card/Round) instead of sharp (Step Card/Sharp). */
  rounded?: boolean;
  /** Compact: the current step number in "STEP n OF m". */
  "current-step"?: string | number;
  /** Compact: the total number of steps in "STEP n OF m". */
  "total-steps"?: string | number;
  /** Compact: the current step's title. */
  label?: string;
  /** Compact: the current step's subtitle. */
  subtitle?: string | undefined;
  /** Draws subtitles: the current step's on compact, and every step's on the other arrangements.
`show-subtitle="false"` hides them all, whatever each step sets. */
  "show-subtitle"?: boolean;
  /** Accessible name of the stepper, e.g. "Checkout". */
  "accessible-label"?: string;
  /** The current progress of the stepper, represented as a floating point number (0.0-1.0).
This number is used by the progress bar. Kept from the old stepper; not in the spec. */
  progress?: number;
  /** Set to true when not all stepper items can be displayed on screen at once.
Displays a button that allows users to view additional stepper items.
User can set their own functionality to the button. Kept from the old stepper; not in the spec. */
  showOverflowButton?: boolean;
  /** Set to true for the progress bar to be shown. Kept from the old stepper; not in the spec. */
  progressBar?: boolean;
};

export type ZetaOptionProps = {
  /**  */
  value?: string;
  /**  */
  selected?: boolean;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** Size of component */
  size?: SizeType;
  /**  */
  type?: "option";
};

export type ZetaSelectInputProps = {
  /** Whether field is in error state. */
  error?: boolean;
  /** Whether an option is selected. */
  isSelected?: boolean;
  /** Whether the dialog is open. */
  open?: boolean;
  /** Leading icon name. */
  icon?: ZetaIconName | undefined;
  /** Label shown above the field. */
  label?: string;
  /** Hint text shown below text field.
if `error`, then `errorText` is shown instead. */
  hintText?: string;
  /** Error hint text
Shown if `error`, replaces `hintText`. */
  errorText?: string;
  /** Height of options dropdown
Default is 200px */
  optionsDialogHeight?: number;
  /** default: a bordered field for forms. gradient: a highlight such as an AI field. ghost: no border at rest. */
  flavor?: "default" | "gradient" | "ghost";
  /** The field's corners. Overrides rounded: sharp, rounded, or full (a pill). */
  shape?: "sharp" | "rounded" | "full" | undefined;
  /** Appends "(optional)" after the label. */
  optional?: boolean;
  /** Opens the options on the compact menu (Dropdown Menu's compact): a tighter inset for a cramped spot. */
  compact?: boolean;
  /** Adds an information icon after the label. */
  "show-information"?: boolean;
  /** Supporting line under the label (spec: Input Label's Show Sub Label). Shown when set; needs a `label`. */
  "sub-label"?: string;
  /** Keeps the icon ahead of the hint message. */
  "show-hint-icon"?: boolean;
  /** Whether to use fixed positioning for the options dropdown, so it escapes overflow:hidden ancestors. */
  fixedDropdown?: boolean;
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The name of the form control. */
  name?: string;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The minimum value for number inputs */
  min?: number | undefined;
  /** The maximum value for number inputs */
  max?: number | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** Size of component */
  size?: SizeType;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** The type used in FormField mixin */
  type?: ZetaInputType;
  /**  */
  optionsNodeList?: NodeListOf<HTMLOptionElement>;
  /**  */
  slotElement?: HTMLSlotElement;
  /**  */
  select?: HTMLSelectElement;
  /** Event fired when the input value changes and is committed:
this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
or if it is a text-like input, when the user loses focus from the input.
or if it is a checkbox-like input, when the checkbox is toggled.
or if it is a radio-like input, when the radio is selected (but not unselected). */
  handleChange?: string;
  /**  */
  updateSelectedOption?: string;
  /**  */
  updateOptionsWidth?: string;
  /**  */
  handleSlotChange?: string;
  /**  */
  toggleOpen?: string;
  /**  */
  internals?: ElementInternals;
  /**  */
  input?: HTMLInputElement;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired when the value of the select input changes. */
  onchange?: (e: CustomEvent<Event>) => void;
  /** Fired when the select input receives focus. */
  onfocus?: (e: CustomEvent<FocusEvent>) => void;
  /** Fired when the select input loses focus. */
  onblur?: (e: CustomEvent<FocusEvent>) => void;
};

export type ZetaStepperInputProps = {
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** Disables the control: the field greys out, the buttons move to the primary flavour and the hint is removed. */
  disabled?: boolean;
  /**  */
  size?: "medium" | "large";
  /** Hint text shown below text field.

if `error`, then `errorText` is shown instead. */
  hintText?: string | undefined;
  /** Whether text field is in error state. */
  error?: boolean;
  /** Error hint text

Shown if `error`, replaces `hintText`. */
  errorText?: string | undefined;
  /** Accessible name of the value. */
  "value-label"?: string;
  /** Accessible name of the decrease button. */
  "decrement-label"?: string;
  /** Accessible name of the increase button. */
  "increment-label"?: string;
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The name of the form control. */
  name?: string;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The minimum value for number inputs */
  min?: number | undefined;
  /** The maximum value for number inputs */
  max?: number | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The type of the form control. */
  type?: ZetaInputType;
  /**  */
  internals?: ElementInternals;
  /**  */
  input?: HTMLInputElement;
  /**  */
  label?: HTMLLabelElement | undefined;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired when the value of the stepper input changes. */
  onchange?: (e: CustomEvent<Event>) => void;
  /** Fired when the value of the stepper input changes. */
  oninput?: (e: CustomEvent<InputEvent>) => void;
  /** Fired when the stepper input receives focus. */
  onfocus?: (e: CustomEvent<FocusEvent>) => void;
  /** Fired when the stepper input loses focus. */
  onblur?: (e: CustomEvent<FocusEvent>) => void;
};

export type ZetaSystemBannerProps = {
  /** The status colour. `default` is the success colour, despite the name; `positive` is its legacy name. */
  status?: "positive" | "negative" | "info" | "warning" | "default";
  /** The desktop view banner or the mobile screen banner. */
  layout?: "desktop" | "mobile";
  /** The headline: what happened (spec: title). */
  heading?: string;
  /** The legacy name for `heading`. */
  text?: string | undefined;
  /** The supporting line. On desktop it makes the banner multiline. */
  description?: string;
  /** Keeps the status glyph. */
  "show-leading-icon"?: boolean;
  /** Mobile only: the glyph, chosen per use. Desktop's follows `status`. */
  icon?: ZetaIconName;
  /** Lets the person dismiss the banner. Ignored on negative. */
  "show-close"?: boolean;
  /** Accessible name of the dismiss. */
  "close-label"?: string;
  /** Shows the banner; false plays the exit and hides it, true again replays the reveal. */
  open?: boolean;
  /** Legacy: `center` centres the message in the row. */
  align?: "start" | "center";
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;

  /** The dismiss was pressed. The banner plays its exit and hides first. */
  onclose?: (e: CustomEvent<never>) => void;
};

export type ZetaTableProps = {
  /** Shows the controls bar above the content (search and the `controls` slot). */
  "has-control"?: boolean;
  /** Shows the footer below the content (the page summary and the pagination). */
  "has-footer"?: boolean;
  /** Shows the search field in the controls bar (Table Controls' search). */
  "show-search"?: boolean;
  /** The search query. */
  "search-value"?: string;
  /** Placeholder, and accessible name, of the search field. */
  "search-placeholder"?: string;
  /** The footer summary, such as "Showing 1-3 of 21". Empty hides it. */
  "page-details"?: string;
  /** The pagination's current page, 1-based. */
  page?: number;
  /** The pagination's page count. At 1 or less the pagination renders nothing. Client-side paging works it out. */
  "page-count"?: number;
  /** The table sorts, searches, filters and pages `rows` itself. */
  "client-side"?: boolean;
  /** Client-side: rows per page. 0 shows every row on one page. */
  "page-size"?: number;
  /** The rows-per-page select's label, and its accessible name. */
  "page-size-label"?: string;
  /** Client-side: the footer summary when `pageDetails` is empty. `{from}`, `{to}` and `{total}` are filled in. */
  "page-details-format"?: string;
  /** The text shown in the body when there are no rows to show. */
  "empty-label"?: string;
  /** Client-side: the filter menu's option that clears the column's filter. */
  "clear-filter-label"?: string;
  /** Caps the content's height, a CSS length or px, so rows scroll vertically under a sticky header. Unset, the table
grows with its rows. */
  "max-height"?: string | number | null;
  /** Pins the first N columns while the rest scroll horizontally. */
  "frozen-columns"?: number;
  /** Adds a settings button to the controls bar to show, hide and freeze columns. */
  "column-configure"?: boolean;
  /** The settings button's accessible name. */
  "columns-label"?: string;
  /** The settings panel's heading over the show and hide checkboxes. */
  "show-columns-label"?: string;
  /** The settings panel's heading over the freeze choices. */
  "freeze-columns-label"?: string;
  /** The settings panel's choice that freezes no columns. */
  "no-frozen-label"?: string;
  /** Lets people resize columns from each header's trailing edge. A column opts out with `resizable: false`. */
  resizable?: boolean;
  /** The narrowest a resized column can get, in px. */
  "min-column-width"?: number;
  /** How long, in ms, cut-off text is hovered before its tooltip shows. */
  "tooltip-delay"?: number;
  /** Disables these rows, by key, as each row's own `disabled` does. */
  "disabled-rows"?: string[];
  /** Lets disabled rows be selected, clicked and opened for actions; they still look disabled. */
  "allow-disabled-selection"?: boolean;
  /** Adds a checkbox column with select-all in its header. */
  selectable?: boolean;
  /** The selected-rows count in the controls bar. `{count}` is filled in. */
  "selected-count-format"?: string;
  /** Accessible name of the select-all checkbox. */
  "select-all-label"?: string;
  /** Accessible name of each row's checkbox, followed by the row's first cell. */
  "select-row-label"?: string;
  /** Accessible name of the actions column and of each row's more button. */
  "actions-label"?: string;
  /** Accessible name of the table, as a visually hidden caption. */
  caption?: string | null;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The columns, in order. */
  columns?: ZetaTableColumn[];
  /** The rows, in order. */
  rows?: ZetaTableRow[];
  /** The current sort, or null. The table reorders rows by it only when `clientSide`. */
  sort?: ZetaTableSort | null;
  /** The sizes the footer's rows-per-page select offers. Empty hides it. */
  pageSizeOptions?: number[];
  /** Client-side: the chosen filter values per column key. A row shows when its cell is among each column's values. */
  filters?: Record<string, string[]>;
  /** The keys of the columns not showing. */
  hiddenColumns?: string[];
  /** The selected row keys. Until it is set, it follows each row's `selected`. */
  selectedRows?: string[];
  /** Actions offered in every row's menu. Any row with actions adds the actions column. */
  rowActions?: ZetaTableAction[];
  /** Called when an action is chosen, with its key, the row and the row's index. */
  onRowAction?: ((actionKey: string, row: ZetaTableRow, rowIndex: number) => void) | null;
  /**  */
  onname?: (e: CustomEvent<CustomEvent>) => void;
  /** A sortable header was activated. `detail.sort` is the new sort, or null. */
  "onsort-change"?: (e: CustomEvent<never>) => void;
  /** The search query changed. `detail.value`. */
  "onsearch-change"?: (e: CustomEvent<never>) => void;
  /** A header's filter control was activated. `detail.key` is the column key. */
  onfilter?: (e: CustomEvent<never>) => void;
  /** Client-side: a filter option was toggled or cleared. `detail.filters` is the new filters, `detail.key` the column. */
  "onfilter-change"?: (e: CustomEvent<never>) => void;
  /** An enabled row was clicked. `detail.row`. */
  "onrow-click"?: (e: CustomEvent<never>) => void;
  /** The built-in pagination moved. `detail.page`, 1-based. */
  "onpage-change"?: (e: CustomEvent<never>) => void;
  /** A rows-per-page size was chosen. `detail.pageSize`. */
  "onpage-size-change"?: (e: CustomEvent<never>) => void;
  /** An action was chosen from a row's menu. `detail.action` is its key, `detail.row` the row and `detail.rowIndex` its index in `rows`. */
  "onrow-action"?: (e: CustomEvent<never>) => void;
  /** A column was resized. `detail.key` is the column, `detail.width` its width in px and `detail.widths` every column's width in px, the neighbours that gave or took width included. */
  "oncolumn-resize"?: (e: CustomEvent<never>) => void;
  /** A column was shown or hidden, or the freeze changed, from the settings panel. `detail.hiddenColumns` and `detail.frozenColumns`. */
  "oncolumn-settings-change"?: (e: CustomEvent<never>) => void;
  /** A row or select-all was toggled. `detail.selectedRows` is the new set of keys, `detail.rows` the rows that changed and `detail.selected` whether they were selected or cleared. */
  "onselection-change"?: (e: CustomEvent<never>) => void;
};

export type ZetaTableLegacyProps = {
  /** Column definitions */
  columns?: ZetaTableLegacyColumn[];
  /** Row data - each row must have a unique `id` field */
  data?: ZetaTableLegacyRow[];
  /** Enable checkbox selection column */
  selectable?: boolean;
  /** Show select-all checkbox in header */
  "select-all"?: boolean;
  /** Initially selected row IDs */
  "selected-rows"?: (string | number)[];
  /** Allow checkbox selection and action menu on disabled rows (useful for operations like bulk delete). Rows still appear visually disabled. */
  allowDisabledSelection?: boolean;
  /** Tooltip/label for the actions column header (supports localization) */
  "actions-label"?: string;
  /** Show data count as a highlighted badge (e.g. "5 out of 51") */
  "show-data-count"?: boolean;
  /** Optional title shown next to the data count badge */
  "table-title"?: string;
  /** Pagination type: 'none', 'numbered', or 'infinite' */
  "pagination-type"?: "numbered" | "none" | "infinite";
  /** Number of rows per page */
  "page-size"?: number;
  /** Initial current page number (1-based, for numbered pagination) */
  "current-page"?: number;
  /** Total number of items (for server-side pagination) */
  "total-items"?: number;
  /** Enable nested/expandable rows */
  expandable?: boolean;
  /** Show export button in toolbar */
  exportable?: boolean;
  /** Placeholder text for the global search input (supports localization) */
  "search-placeholder"?: string;
  /** Tooltip/label for the refresh button (supports localization) */
  "refresh-label"?: string;
  /** Show column configure button in toolbar */
  "column-configure"?: boolean;
  /** Tooltip/label for the columns button (supports localization) */
  "columns-label"?: string;
  /** Loading state (for infinite scroll) */
  loading?: boolean;
  /** Whether there is more data to load (infinite scroll). Set to false when all data has been fetched. */
  "has-more-data"?: boolean;
  /** IDs of rows that should be disabled */
  "disabled-rows"?: (string | number)[];
  /** Shows the controls bar above the content (spec: hasControl). It still needs something to hold: a title, the data count, search or a toolbar button. */
  "has-control"?: boolean;
  /** Shows the footer below the content (spec: hasFooter), with numbered pagination. */
  "has-footer"?: boolean;
  /** Rounds the table's corners to radius/element-md and gives the controls inside it their rounded option (spec: shape). */
  rounded?: boolean;
  /** Row click callback - when provided, rows become clickable (pointer cursor + highlight on click) */
  onRowClick?: ((rowData: ZetaTableLegacyRow, rowIndex: number) => void) | null;
  /** When provided, clicking a row also toggles its checkbox selection. Behaves like onRowClick (pointer cursor + highlight). */
  selectOnRowClick?: ((rowData: ZetaTableLegacyRow, rowIndex: number) => void) | null;
  /** Fallback row action menu items - used for rows that don't have `_actions` defined. Set to show a kebab menu as the last column. */
  rowActions?: ZetaTableLegacyAction[];
  /** Callback when a row action is clicked. Receives the action key, row data, and row index. */
  onRowAction?: ((actionKey: string, rowData: ZetaTableLegacyRow, rowIndex: number) => void) | null;
  /** Column search/filter callback - when provided, shows search inputs on columns and delegates filtering to the consumer. Receives the field name and current search value. When not provided, search inputs are hidden. */
  onColumnSearch?: ((field: string, value: string, allFilters: Record<string, string>) => void) | null;
  /** Column filter callback - when provided, shows a filter icon on each column header with a dropdown menu of filter options. Consumer receives the field, selected values, and column when a filter changes. */
  onColumnFilter?: ((field: string, selectedValues: string[], column: ZetaTableLegacyColumn) => void) | null;
  /** Global search callback - when provided, shows a global search bar above the table. Consumer handles the search and updates data. */
  onTableSearch?: ((searchTerm: string) => void) | null;
  /** Refresh callback - when provided, shows a refresh icon button in the toolbar. Consumer handles the data reload. */
  onRefresh?: (() => void) | null;
  /** Callback when infinite scroll needs more data. Receives current data count. */
  onLoadMore?: ((currentCount: number) => void) | null;
  /** Callback when sort state changes. Receives field and direction ('asc' | 'desc' | null). */
  onSortChange?: ((field: string, direction: "asc" | "desc" | null) => void) | null;
  /** Callback when row selection changes. Receives array of selected row IDs. */
  onSelectionChange?: ((selectedIds: (string | number)[]) => void) | null;
  /** Callback when page changes (numbered pagination). Receives page number and page size. */
  onPageChange?: ((page: number, pageSize: number) => void) | null;
  /** Callback when export is triggered. Receives the exported data rows. */
  onExport?: ((data: ZetaTableLegacyRow[]) => void) | null;
  /** Callback when a row is expanded/collapsed. Receives row ID and expanded state. */
  onRowExpand?: ((rowId: string | number, expanded: boolean) => void) | null;
  /**  */
  noDataContent?: unknown;
  /** Custom loading indicator content for infinite scroll. Accepts a DOM node or string. */
  loadingContent?: unknown;
  /** Row clicked. Detail: { row, rowIndex } */
  "onzeta-table-row-click"?: (e: CustomEvent<CustomEvent>) => void;
  /** Column sort changes. Detail: { field, direction } */
  "onzeta-table-sort-change"?: (e: CustomEvent<CustomEvent>) => void;
  /** Column filter applied. Detail: { field, selectedValues } */
  "onzeta-table-column-filter"?: (e: CustomEvent<CustomEvent>) => void;
  /** Column search input changes. Detail: { field, value, searchValues } */
  "onzeta-table-column-search"?: (e: CustomEvent<CustomEvent>) => void;
  /** Row selection changes. Detail: { selectedIds: [] } */
  "onzeta-table-selection-change"?: (e: CustomEvent<CustomEvent>) => void;
  /** Row expanded/collapsed. Detail: { rowId, expanded } */
  "onzeta-table-row-expand"?: (e: CustomEvent<CustomEvent>) => void;
  /** More data needed (infinite scroll) */
  "onzeta-table-load-more"?: (e: CustomEvent<CustomEvent>) => void;
  /** Page changes (numbered). Detail: { page, pageSize } */
  "onzeta-table-page-change"?: (e: CustomEvent<CustomEvent>) => void;
  /** Row action clicked. Detail: { actionKey, row, rowIndex } */
  "onzeta-table-action"?: (e: CustomEvent<CustomEvent>) => void;
  /** Global search input changes. Detail: { value } */
  "onzeta-table-search"?: (e: CustomEvent<never>) => void;
  /** Export button clicked. Detail: { csv, columns, data } */
  "onzeta-table-export"?: (e: CustomEvent<never>) => void;
  /** Refresh button clicked */
  "onzeta-table-refresh"?: (e: CustomEvent<never>) => void;
};

export type ZetaSwitchProps = {
  /** Icon name to display when switch is ON. */
  activeIcon?: ZetaIconName | undefined;
  /** Icon name to display when switch is OFF. */
  inactiveIcon?: ZetaIconName | undefined;
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The name of the form control. */
  name?: string;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The minimum value for number inputs */
  min?: number | undefined;
  /** The maximum value for number inputs */
  max?: number | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** Size of component */
  size?: SizeType;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The type of the form control. */
  type?: ZetaInputType;
  /**  */
  role?: string;
  /**  */
  internals?: ElementInternals;
  /**  */
  input?: HTMLInputElement;
  /**  */
  label?: HTMLLabelElement | undefined;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired when the checkbox value changes */
  onchange?: (e: CustomEvent<Event>) => void;
  /** Fired when the checkbox value changes */
  oninput?: (e: CustomEvent<InputEvent>) => void;
};

export type ZetaTabItemProps = {
  /** The tab shows the current view. */
  selected?: boolean;
  /** The legacy name for `selected`. */
  active?: boolean;
  /** Shows the slotted icon. */
  "show-leading-icon"?: boolean;
  /** Shows a Notification Indicator after the label. */
  "show-badge"?: boolean;
  /** The badge's count. */
  "badge-value"?: number | undefined;
  /** What the badge stands for, read after the label. */
  "badge-label"?: string | undefined;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** Selected, by either name. */
  isSelected?: string;
  /**  */
  role?: string;
};

export type ZetaTabBarProps = {
  /** Full width divides the row; condensed hugs the tabs (spec: flavour). */
  flavor?: "full-width" | "condensed";
  /**  */
  role?: string;
  /** A tab was chosen; `detail.index` is its position and `detail.tab` the element. */
  onchange?: (e: CustomEvent<CustomEvent>) => void;
};

export type ZetaTopAppbarProps = {
  /** Centers the content of the title. */
  centered?: boolean;
  /** Places the title below the main appbar. */
  extended?: boolean;
  /** The arrangement. Each value brings its own leading control and content. */
  type?: "search" | "default" | "centered" | "contextual" | "contextual alt" | "extended" | undefined;
  /** The bar's own corner. Controls inside keep theirs. */
  shape?: "sharp" | "rounded";
  /** Names the screen when `type` is set and nothing is in the default slot. */
  pageTitle?: string | undefined;
  /** Heading level of the title `type` draws. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Avatar photo on `default`. Without a photo or initials there is no avatar. */
  avatarSrc?: string | undefined;
  /** Avatar initials on `default`, used when there is no photo. */
  avatarInitials?: string | undefined;
  /** The search field's value on `search`. It opens empty (spec issue: Figma draws its typing state). */
  searchValue?: string;
  /** The selection count on `contextual` and `contextual alt`. Announced when it changes. */
  count?: string;
  /** Accessible name of the leading control `type` draws. */
  leadingLabel?: string | undefined;
  /** Accessible name of the fixed control on `centered`. */
  trailingLabel?: string;

  /**  */
  onname?: (e: CustomEvent<CustomEvent>) => void;
  /** The leading control `type` draws was activated. */
  "onleading-click"?: (e: CustomEvent<never>) => void;
  /** The fixed control on `centered` was activated. */
  "ontrailing-click"?: (e: CustomEvent<never>) => void;
};

export type ZetaTileButtonProps = {
  /** Flavor of component.

Values:
* primary - blue background.
* positive - green background.
* negative - red background.
* outline - primary outline only.
* outline-subtle - grey outline only.
* text - primary text only.
* inverse - black/white background. Note that this flavor is not supported in all components.
* subtle - white background with grey text. Same action colors as 'text' flavor. */
  flavor?: "outline-subtle";
  /** Size of component */
  size?: "small" | "medium" | "large";
  /** Whether the component is sharp or rounded.
This will change the border radius and icon font.

Possible values are:
- `sharp`: No border radius, uses "ZdsIcons-Sharp"
- `rounded`: Minimal border radius, uses "ZdsIcons-Rounded" */
  shape?: "sharp" | "rounded" | "full";
  /** Main icon of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`. */
  icon?: ZetaIconName | undefined;
  /** Boolean for if component is disabled.

This will apply disabled styles. */
  disabled?: boolean;
  /** The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key. */
  tabIndex?: number;
  /** The type of the button when used in a form */
  type?: "submit" | "reset" | "button" | undefined;
  /** Name for the button, used if the button is in a form. */
  name?: string | undefined;
  /** The value of the name property When submitted as part of a form */
  value?: string | undefined;

  /** Fired when the button is clicked and has the type submit */
  onsubmit?: (e: CustomEvent<SubmitEvent>) => void;
};

export type ZetaCardContainerProps = {
  /** The title of the card, displayed in the header. */
  title?: string;
  /** Description of the card, displayed in the header. */
  description?: string;
  /** Whether the card is collapsible.

Slotted content *must* be provided for the collapsible functionality to work. */
  collapsible?: boolean;
  /** Whether the card is expanded or collapsed.

If `collapsible` is true, this property controls the initial state of the card. */
  expanded?: boolean;
  /** Whether the card is required, indicated by a red asterisk (*) in the header. */
  required?: boolean;
  /** Outlines the card with the brand gradient (spec: flavor=gradient). Use it on one card in a group at most. */
  ai?: boolean;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
};

export type ZetaRangeSelectorProps = {
  /** The label displayed above the input. */
  label?: string | undefined;
  /** The name given to the input field. This is required when in a form. */
  name?: string;
  /** The initial values of the range selector */
  initialValues?: { min: number; max: number };
  /** Error state. */
  error?: boolean;
  /** The minimum value of the slider input field. */
  min?: number | undefined;
  /** The maximum value of the slider input field. */
  max?: number | undefined;
  /** If set, will put steps on the slider at the given increments and the slider will snap to the nearest step. */
  stepIncrement?: number | undefined;
  /** Disables the input field. */
  disabled?: boolean;
  /** Whether inputted text is automatically capitalized and how. Only takes effect on non-keyboard entry */
  autoCapitalize?: "none" | "off" | "sentences" | "on" | "words" | "characters" | undefined;
  /**  */
  autoComplete?: AutoFill | undefined;
  /** The id of the form control. */
  id?: string;
  /** Indicates whether the form control is required to be filled out before submitting the form. */
  required?: boolean;
  /** The value of the Form Control that is submitted when part of a form. */
  value?: string | null;
  /** The state of the Switch or Checkbox that is submitted when part of a form. */
  checked?: boolean;
  /** The state of the Switch or Checkbox defined by a mixed or unknown state. */
  indeterminate?: boolean;
  /** Placeholder text shown when value is empty. */
  placeholder?: string | undefined;
  /** The value can be read and copied but not changed. */
  readOnly?: boolean | undefined;
  /** Whether to spellcheck the input */
  spellCheck?: boolean | "default" | undefined;
  /** Whether the component is rounded or sharp.

When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.

Otherwise, this value will be `--radius-none`. */
  rounded?: boolean | undefined;
  /** The type of the form control. */
  type?: ZetaInputType;
  /**  */
  hiddenInput?: HTMLInputElement;
  /**  */
  lowerInput?: HTMLInputElement;
  /**  */
  upperInput?: HTMLInputElement;
  /**  */
  internals?: ElementInternals;
  /**  */
  input?: HTMLInputElement;
  /**  */
  slottedElements?: Array<HTMLElement>;
  /**  */
  validity?: ValidityState;
  /**  */
  validationMessage?: string;
  /** Fired whenever value of range slider is changed. Contains 2 values in details: `min:number`, `max:number`. */
  onchange?: (e: CustomEvent<CustomEvent<ZetaRangeSliderEventDetail>>) => void;
};

export type CustomElements = {
  /**
   *
   * The Zeta icon component draws glyphs from the Zebra Design System icon set, `@zebra-design-system/icons`.
   * A name is the set's own kebab-case name (`expand-more`); the same name with underscores (`expand_more`) also works.
   * These icons can be rendered as rounded or sharp; and the size and color can be customized using CSS variables.
   *
   * To use this component, you can either use the `name` prop or place an icon in the slot.
   * Using the name prop allows for better typescript integration, whereas using the slot allows for more flexibility in terms of custom icons.
   *
   * ```html
   * <zeta-icon name="home"></zeta-icon>
   * ```
   * or
   * ```html
   * <zeta-icon>home</zeta-icon>
   * ```
   *
   *
   * Custom icons can be created by placing an SVG in the slot:
   *
   * ```html
   * <zeta-icon>
   *   <svg>
   *   ...
   *   </svg>
   * </zeta-icon>
   * ```
   *
   * The embedding component passes its foreground through `--icon-color` (falling back to `--main-default`). The icon is
   * decorative on its own: the meaning has to come from a label beside it or an accessible name on the control around it.
   *
   * `size` picks one of the Zebra icon sizes (`control/icon-xs`, `-sm`, `-md`, `-lg`: 12, 16, 20 and 28px); without it the icon keeps
   * `--icon-size` or its 24px default, as every existing embed expects. `framed` pads the glyph to a 40px box
   * (`control/target-min`) so a standalone icon meets the touch target on its own; xsmall frames to 24px (`control/xs`).
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - Name of icon to be displayed. The names are those of the Zebra icon set, `@zebra-design-system/icons`. If this value and the name prop are both populated, the name prop will take precedence.
   *
   * ### **CSS Properties:**
   *  - **--icon-size** - The width/height of the icon _(default: undefined)_
   * - **--icon-color** - The color of the icon _(default: undefined)_
   * - **--icon-border-width** - The border width of the icon. _(default: undefined)_
   * - **--icon-border-color** - The border color of the icon. _(default: undefined)_
   */
  "zeta-icon": Partial<ZetaIconProps & BaseProps & BaseEvents>;

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
   */
  "zeta-button": Partial<ZetaButtonProps & BaseProps & BaseEvents>;

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
   *  - _default_ - The name of the icon. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
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
   */
  "zeta-icon-button": Partial<ZetaIconButtonProps & BaseProps & BaseEvents>;

  /**
   * One disclosure row in an Accordion. The header names the section it opens; the content sits below it while
   * expanded. A plain row is one target that opens and closes it, with the caret trailing the title. A selectable row
   * splits its targets: a leading control opens and closes it, and the rest of the row selects it, with a check mark
   * trailing the title while selected. Navigation rows have no content and the whole row is the target.
   *
   * Both targets are real buttons (`aria-expanded`, `aria-pressed`) inside the row's heading, so the row works from the
   * keyboard and announces its state.
   * ---
   *
   *
   * ### **Events:**
   *  - **item-expanded** - Dispatched when the accordion item is expanded or collapsed.
   * - **item-selected** - Dispatched when the accordion item is selected or deselected.
   *
   * ### **Slots:**
   *  - _default_ - content displayed when the accordion item is expanded.
   * - **header** - content displayed in the header of the accordion item.
   *
   * ### **CSS Parts:**
   *  - **item-header** - The header of the accordion item.
   * - **item-content** - The content area of the accordion item.
   * - **header-content** - The content area of the accordion item header.
   */
  "zeta-accordion-item": Partial<ZetaAccordionItemProps & BaseProps & BaseEvents>;

  /**
   * A vertical stack of Accordion Items, each a header that opens and closes its own content. By default one item is
   * open at a time; `expandMultiple` lets several stay open. The container has no fill of its own. In a card (`inCard`)
   * it takes a thin border and divides its items; `rounded` curves the card's corners.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - children should be `zeta-accordion-item` elements.
   */
  "zeta-accordion": Partial<ZetaAccordionProps & BaseProps & BaseEvents>;

  /**
   * A square control for turning a single option on or off, with an optional label beside it. `indeterminate` says a
   * checkbox that summarises others is mixed; nothing cycles into it, so set it from code. Reach for it wherever options
   * are independent, and for Radio Button where exactly one of a set has to win.
   *
   * The box sits in a 40px target, and the label beside it extends what a person can aim at. Keep the label, or name
   * the checkbox from the surrounding structure.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the checkbox value changes
   * - **input** - Fired when the checkbox value changes
   *
   * ### **Methods:**
   *  - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleChange(_event: _Event_): _Event | void_** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   *
   * ### **CSS Properties:**
   *  - **--checkbox-background** - Background colour of the checkbox in its default/unchecked state _(default: undefined)_
   * - **--checkbox-checked-background** - Background colour when the checkbox is checked or indeterminate _(default: undefined)_
   * - **--checkbox-hover-background** - Background colour when hovering over a checked/indeterminate checkbox _(default: undefined)_
   * - **--checkbox-border-color** - Border colour of the checkbox container _(default: undefined)_
   * - **--checkbox-icon-color** - Colour of the checkmark or indeterminate icon inside the checkbox _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **icon** - The icon of the element.
   */
/**
   * A square control for turning a single option on or off, with an optional label beside it. `indeterminate` says a
   * checkbox that summarises others is mixed; nothing cycles into it, so set it from code. Reach for it wherever options
   * are independent, and for Radio Button where exactly one of a set has to win.
   *
   * The box sits in a 40px target, and the label beside it extends what a person can aim at. Keep the label, or name
   * the checkbox from the surrounding structure.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the checkbox value changes
   * - **input** - Fired when the checkbox value changes
   *
   * ### **Methods:**
   *  - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleChange(_event: _Event_): _Event | void_** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   *
   * ### **CSS Properties:**
   *  - **--checkbox-background** - Background colour of the checkbox in its default/unchecked state _(default: undefined)_
   * - **--checkbox-checked-background** - Background colour when the checkbox is checked or indeterminate _(default: undefined)_
   * - **--checkbox-hover-background** - Background colour when hovering over a checked/indeterminate checkbox _(default: undefined)_
   * - **--checkbox-border-color** - Border colour of the checkbox container _(default: undefined)_
   * - **--checkbox-icon-color** - Colour of the checkmark or indeterminate icon inside the checkbox _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **icon** - The icon of the element.
   */
"zeta-checkbox":  Partial<Omit<React.InputHTMLAttributes<ZetaCheckboxProps>, keyof ZetaCheckboxProps | keyof BaseEvents | keyof BaseProps>>  | Partial<ZetaCheckboxProps & BaseProps & BaseEvents>

  /**
   * Radio buttons are used for mutually exclusive choices, not for multiple choices. Only one radio button can be selected at a time. When a user chooses a new item, the previous choice is automatically deselected.
   *
   * The ring is 16px at medium and 24px at large, inside a 40px target. The label is the default slot; leave it empty
   * only when the option is named some other way, such as aria-label.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the radio button becomes checked (but not when unchecked)
   * - **input** - Fired when the radio button value changes
   *
   * ### **Methods:**
   *  - **handleChange(event: _Event_): _void_** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   *
   * ### **Slots:**
   *  - _default_ - The label.
   *
   * ### **CSS Parts:**
   *  - **icon** - The icon of the element.
   */
/**
   * Radio buttons are used for mutually exclusive choices, not for multiple choices. Only one radio button can be selected at a time. When a user chooses a new item, the previous choice is automatically deselected.
   *
   * The ring is 16px at medium and 24px at large, inside a 40px target. The label is the default slot; leave it empty
   * only when the option is named some other way, such as aria-label.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the radio button becomes checked (but not when unchecked)
   * - **input** - Fired when the radio button value changes
   *
   * ### **Methods:**
   *  - **handleChange(event: _Event_): _void_** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   *
   * ### **Slots:**
   *  - _default_ - The label.
   *
   * ### **CSS Parts:**
   *  - **icon** - The icon of the element.
   */
"zeta-radio-button":  Partial<Omit<React.InputHTMLAttributes<ZetaRadioButtonProps>, keyof ZetaRadioButtonProps | keyof BaseEvents | keyof BaseProps>>  | Partial<ZetaRadioButtonProps & BaseProps & BaseEvents>

  /**
   * A single row in a dropdown menu: a leading element, a label and an optional trailing icon. The row fills the menu's
   * width and keeps a fixed height; a long label widens the menu rather than wrapping. `selected` marks the chosen
   * option with a light brand tint. `type` checkbox or radio leads with the real control, checked when the row is
   * selected. The whole row is the click target: a checkbox row toggles and a radio row selects itself, clearing the
   * radio rows beside it. Inside a `zeta-droppable` the row takes the panel's `rounded`.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - A checkbox or radio row's `selected` changed because the row was activated.
   *
   * ### **Slots:**
   *  - _default_ - Content of menu item; typically text.
   * - **icon** - A `zeta-icon` shown on the leading side. Not shown for `type` checkbox or radio.
   * - **trailing** - A `zeta-icon` at the trailing edge, such as a submenu arrow.
   */
  "zeta-dropdown-menu-item": Partial<ZetaDropdownMenuItemProps & BaseProps & BaseEvents>;

  /**
   * The surface a dropdown opens onto (spec: Dropdown Menu): a floating panel holding `zeta-dropdown-menu-item` rows,
   * with its own surface and elevation. It opens on the `direction` side of its `anchor`, 8px away, and lines up per
   * `alignment`. `rounded` reaches every row inside it, so panel and rows agree; `compact` tightens the inset.
   * ---
   *
   */
  "zeta-droppable": Partial<ZetaDroppableProps & BaseProps & BaseEvents>;

  /**
   * Dropdown menus allow users to select an option from a list that appears when the menu is clicked or tapped.
   *
   * Zeta Dropdown Menu Button places a button that when clicked opens a dropdown menu containing the items passed into it through the items prop.
   * ---
   *
   *
   * ### **Events:**
   *  - **open** - Fired when the dropdown is opened.
   * - **close** - Fired when the dropdown is closed.
   * - **input** - Fired when the dropdown is closed.
   *
   * ### **Methods:**
   *  - **handleChange(_event: _Event_): _void_** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleInput(_event: _Event_): _void_** - Event fired when the input value changes
   * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   */
  "zeta-dropdown-menu-button": Partial<ZetaDropdownMenuButtonProps & BaseProps & BaseEvents>;

  /**
   * Zeta Action Menu Button places a button that when clicked opens an action menu containing the items passed into it through the items prop.
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
   */
  "zeta-action-menu-button": Partial<ZetaActionMenuButtonProps & BaseProps & BaseEvents>;

  /**
   * Indicators are used to show the status of a user or any messages/notifications they might have.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - Value to be displayed inside the indicator. If the `type` is set to `notification`, this should be the number or text shown inside the indicator. If the `type` is set to `icon`, this should be an icon or any other content you want to display. There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
   */
  "zeta-indicator": Partial<ZetaIndicatorProps & BaseProps & BaseEvents>;

  /**
   * A small circular marker carrying a fixed clock glyph, sized to sit beside text or on its own. Size moves the circle
   * and the glyph together. It names nothing, so whatever it refers to has to be named beside it.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - Value to be displayed inside the indicator. If the `type` is set to `notification`, this should be the number or text shown inside the indicator. If the `type` is set to `icon`, this should be an icon or any other content you want to display. There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
   */
  "zeta-icon-indicator": Partial<ZetaIconIndicatorProps & BaseProps & BaseEvents>;

  /**
   * Marks that something is waiting on whatever it is pinned to, optionally with a count. Size decides whether the
   * count shows: large hugs a count of any length, medium is a 16 square for one digit, and small is a plain dot that
   * says only that something is new. A count above 9 moves to large, above 99 reads 99+, and nothing runs past 3 characters. Remove the indicator for
   * a count of zero rather than showing 0.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - Value to be displayed inside the indicator. If the `type` is set to `notification`, this should be the number or text shown inside the indicator. If the `type` is set to `icon`, this should be an icon or any other content you want to display. There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
   */
  "zeta-notification-indicator": Partial<ZetaNotificationIndicatorProps & BaseProps & BaseEvents>;

  /**
   * A visual representation of a user or entity, shown as a photo, initials or an icon, with an optional presence badge
   * and dismiss badge. Nine sizes step from xxxs to xxxl with m as the base; the badges, ring and initials all scale from
   * the avatar's own size. Each presence state carries its own glyph as well as its colour.
   *
   * The presence glyphs come from the Zebra icon set, `@zebra-design-system/icons`.
   * ---
   *
   *
   * ### **Events:**
   *  - **close** - Fired when the dismiss badge is clicked.
   *
   * ### **Slots:**
   *  - _default_ - The content of the avatar. Should be an img element, a zeta-icon, or text.
   * - **status** - A custom status badge, shown when `status` is not set.
   *
   * ### **CSS Properties:**
   *  - **--avatar-color** - Overrides the swatch behind initials or an icon. _(default: undefined)_
   * - **--avatar-initials-color** - The colour of the initials. _(default: undefined)_
   * - **--avatar-border-color** - The colour of the ring. _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **ring** - The outline ring.
   * - **close** - The dismiss badge.
   * - **status** - The presence badge.
   */
  "zeta-avatar": Partial<ZetaAvatarProps & BaseProps & BaseEvents>;

  /**
   * Shows a group of people as overlapping avatars, with a counter standing in for everyone who did not fit. Up to `max`
   * avatars show (two to four, the first two always), each overlapping the next by a quarter of its diameter. Everyone
   * past `max` is counted into the overflow, so six avatars at `max` 4 read +2. Size moves the whole rail together.
   *
   * Reach for it where the group matters more than the individuals, and for a single Avatar where one person is the
   * subject.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The avatars to be displayed in the rail.
   *
   * ### **CSS Parts:**
   *  - **overflow** - The counter circle.
   */
  "zeta-avatar-rail": Partial<ZetaAvatarRailProps & BaseProps & BaseEvents>;

  /**
   * Shows where an item sits on a four step scale, from low to urgent. `status` (spec: level) sets the fill, the
   * circle and the glyph together, `type` (spec: variant) decides whether the name appears beside the circle or the
   * circle stands alone, and `leading` swaps the direction glyph for a rank number.
   *
   * The glyphs point the way the level does: down for low, a dash for medium, up for high and the priority mark for
   * urgent. A number removes that cue, so prefer the glyph unless the exact position in a queue matters.
   * ---
   *
   *
   * ### **CSS Properties:**
   *  - **--priority-pill-index-background-color** - Color of the index character. _(default: undefined)_
   * - **--priority-pill-index-text-color** - Background color of the index. _(default: undefined)_
   * - **--priority-pill-text-color** - Color of the text. _(default: undefined)_
   * - **--priority-pill-background-color** - Background color of the pill. _(default: undefined)_
   */
  "zeta-priority-pill": Partial<ZetaPriorityPillProps & BaseProps & BaseEvents>;

  /**
   * Reports a read-only state on an item, such as Active or Overdue. `status` sets the fill, the border and the leading
   * element together while the label text holds one colour throughout, and `leading` decides whether the status also
   * shows as a dot, an icon or nothing. `discardable` adds the one control anywhere in the badge family, a dismiss that
   * removes the label rather than selecting it.
   *
   * Use `leading="icon"` where the status has to survive greyscale: the dot and the fill are colour alone.
   * ---
   *
   *
   * ### **Events:**
   *  - **close** - Fired when the dismiss button is clicked.
   *
   * ### **Slots:**
   *  - _default_ - Text displayed on label.
   *
   * ### **CSS Parts:**
   *  - **container** - The top level div making up the component.
   * - **icon-container** - Wrapper around the leading dot or icon.
   * - **text** - The div wrapping the text of either the label or the slot.
   * - **discard** - The dismiss button.
   */
  "zeta-status-label": Partial<ZetaStatusLabelProps & BaseProps & BaseEvents>;

  /**
   * Tags are used to draw attention to a specific area or information. The arrow shape helps direct the users attention to the desired place.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The text to display in the tag.
   */
  "zeta-tag": Partial<ZetaTagProps & BaseProps & BaseEvents>;

  /**
   * Names a category on an item in a word or two. `status` carries the standing of that category, and `bold` and
   * `outlined` decide how hard it pushes, from a solid fill down to a tint with no visible edge. It reports and never
   * responds, which is the line between it and Chip.
   *
   * Bold and outlined combine into three forms: bold, outlined (bold off) and plain (both off). Bold wins when both are
   * set, because that pair is not built.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - Text displayed on the label. If not provided, the `label` property will be used.
   */
  "zeta-label": Partial<ZetaLabelProps & BaseProps & BaseEvents>;

  /**
   * A destination in a navigation bar, or an entry in a bottom sheet's grid (spec: Navigation Item): an icon over a
   * one- or two-word label. `active` marks where the user is, so give it to exactly one item in a bar; `disabled`
   * applies to inactive items only. `notificationValue` set to `true` puts a dot over the icon's corner without
   * changing the item's size; a number shows a count (a Zeta extension). `tile` is the bottom sheet form (spec: Grid Menu
   * Item): a square with a larger icon and label, which a `zeta-bottom-sheet` sets on its grid items.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - Label to be displayed.
   * - **icon** - Icon to be displayed. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
   */
  "zeta-grid-menu-item": Partial<ZetaGridMenuItemProps & BaseProps & BaseEvents>;

  /**
   * An item in a list comprised of a single row, typically containing some text as well as leading or trailing widgets.
   * ---
   *
   *
   * ### **Slots:**
   *  - **leading** - Content placed before the headline
   * - **trailing** - Content placed after the headline
   */
  "zeta-list-item": Partial<ZetaListItemProps & BaseProps & BaseEvents>;

  /**
   * Lists display lists of list items.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The list items. Should be a collection of `zeta-list-item`s.
   */
  "zeta-list": Partial<ZetaListProps & BaseProps & BaseEvents>;

  /**
   * The actions that close out a card. Slotted buttons share the row equally, with space/sm between them; use one
   * primary, or an outline and a primary.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The footer actions, usually zeta-button elements at size small.
   */
  "zeta-card-footer": Partial<ZetaCardFooterProps & BaseProps & BaseEvents>;

  /**
   * The barrier between a raised surface and the page behind it. It fills its nearest positioned ancestor edge to edge,
   * with one fill and nothing else.
   *
   * `zeta-dialog`, `zeta-lightbox` and a modal `zeta-bottom-sheet` render it as their backdrop. With the `popover`
   * attribute it joins the top layer and covers the viewport; the owner shows it just before its own modal. Use it
   * directly only under a custom overlay, one per open surface. It is hidden from assistive technology, never takes focus and holds no content. A click on it
   * bubbles as a normal `click`, so the owner decides whether to close.
   * ---
   *
   */
  "zeta-scrim": Partial<ZetaScrimProps & BaseProps & BaseEvents>;

  /**
   * A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions. It
   * lays out list rows, a grid of tiles three to a row, or generic content, and works out which from what is slotted
   * unless `contentType` says. By default the screen presents the sheet. With `modal`, it presents itself: pinned to the
   * bottom of the viewport over a `zeta-scrim` (tone scrim), focus moved in, and Escape or a scrim click closing it while
   * `dismissible`. Call `show()` and `hide()`, or set `open`.
   * ---
   *
   *
   * ### **Events:**
   *  - **close** - A modal sheet closed, by `hide()`, Escape or a scrim click.
   * - **leading-click** - The leading button was activated.
   * - **open** - A modal sheet opened.
   *
   * ### **Methods:**
   *  - **show()** - Opens a modal sheet.
   * - **hide()** - Closes a modal sheet.
   *
   * ### **Slots:**
   *  - _default_ - Content: `zeta-dropdown-menu-item` or `zeta-list-item` rows, `zeta-grid-menu-item` tiles, or anything else.
   * - **actions** - The footer actions, usually an outline and a primary `zeta-button` at size small.
   *
   * ### **CSS Properties:**
   *  - **--bottom-sheet-max-height** - Caps the sheet's height. Figma defines no cap, so this is a Zeta extension. Defaults to 90vh. _(default: undefined)_
   */
  "zeta-bottom-sheet": Partial<ZetaBottomSheetProps & BaseProps & BaseEvents>;

  /**
   * One crumb in a `zeta-breadcrumb`: an optional glyph, a label and the separator after it. Inside a breadcrumb, the
   * parent sets `current` and `separator`, so neither needs setting by hand.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The crumb's label.
   * - **icon** - A `zeta-icon` before the label.
   */
  "zeta-breadcrumb-item": Partial<ZetaBreadcrumbItemProps & BaseProps & BaseEvents>;

  /**
   * Shows where a page sits in the hierarchy, as a trail of links ending on the current page. Each crumb goes back up a
   * level. A long trail collapses its middle into a compact overflow menu, so every crumb stays reachable.
   *
   * The chevron after each crumb and the current page are worked out from the slotted items; the last one is the current
   * page. `rounded` reaches the overflow control and its menu.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The `zeta-breadcrumb-item` crumbs, root first.
   * - **leading** - Set by the element: it holds the first crumb, so the overflow control follows it.
   *
   * ### **CSS Properties:**
   *  - **--breadcrumb-current-color** - The current page's text and icon. Set by `flavor`. _(default: undefined)_
   */
  "zeta-breadcrumb": Partial<ZetaBreadcrumbProps & BaseProps & BaseEvents>;

  /**
   * One action in a Button Group: a subtle button whose size and outer corners come from the group, with Button's own
   * hover, pressed, focus and disabled states.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - Button label content.
   * - **icon** - Icon to display on leading side of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
   *
   * ### **CSS Parts:**
   *  - **button** - The button element.
   */
  "zeta-button-group-item": Partial<ZetaButtonGroupItemProps & BaseProps & BaseEvents>;

  /**
   * A row of related actions sharing one bordered surface, where each carries equal weight rather than one leading.
   * The group owns the fill, the outline and the rules between items; each item is a subtle button. Size is the
   * group's call and every item inherits it. Reach for a single Button when one action is clearly the primary one.
   *
   * `rounded` reaches the group's outline and the outer corners of the first and last items, nothing else.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - Children must be of type `zeta-button-group-item` otherwise they will not be displayed.
   */
  "zeta-button-group": Partial<ZetaButtonGroupProps & BaseProps & BaseEvents>;

  /**
   * A block of supporting text in a card, inset by space/lg on every side.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The body content.
   */
  "zeta-card-body": Partial<ZetaCardBodyProps & BaseProps & BaseEvents>;

  /**
   * The heading row of a card: optional leading content (usually a small Avatar), a heading and a subheading, and
   * optional trailing content (usually a text Icon Button). Use it in a card's header, or in its body above a block of
   * text.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The headline text.
   * - **leading** - Content placed before the headline
   * - **trailing** - Content placed after the headline
   */
  "zeta-card-header": Partial<ZetaCardHeaderProps & BaseProps & BaseEvents>;

  /**
   * The card shell: a bordered surface holding a header, a body and a footer, stacked. It decides the surface, the
   * border, the corners and that content is clipped to the frame, and nothing else; every inset comes from the slotted
   * parts (`zeta-card-header`, `zeta-card-body`, `zeta-card-footer`). Content follows a rounded corner, so a full-bleed
   * image curves with it. The card itself is not interactive.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The content of the card.
   *
   * ### **CSS Properties:**
   *  - **--card-border-line-width** - The line width of the border _(default: undefined)_
   * - **--card-border-color** - The color of the border _(default: undefined)_
   * - **--card-border-line-style** - The line style of the border _(default: undefined)_
   */
  "zeta-card": Partial<ZetaCardProps & BaseProps & BaseEvents>;

  /**
   * A flexible card component specifically designed for dashboard charts and visualizations.
   * ---
   *
   *
   * ### **Slots:**
   *  - **header** - The header content of the chart card. If not provided, title and subtitle props will be used.
   * - _default_ - The main content of the card, typically containing chart visualizations.
   * - **footer** - Footer content, typically containing action buttons or additional information.
   *
   * ### **CSS Properties:**
   *  - **--chart-card-border-color** - The color of the card border _(default: undefined)_
   * - **--chart-card-border-width** - The width of the card border _(default: undefined)_
   * - **--chart-card-background** - The background color of the card _(default: undefined)_
   * - **--chart-card-min-height** - The minimum height of the card content area _(default: undefined)_
   */
  "zeta-chart-card": Partial<ZetaChartCardProps & BaseProps & BaseEvents>;

  /**
   * A thin line that separates content into sections or groups, such as list rows, cards or menu items. Orientation
   * matches the direction it divides: horizontal between stacked content, vertical between side-by-side content.
   *
   * It fills its container along its length and has no padding of its own, so space it with the layout's gap rather than
   * margins. Assistive technology hears it as a separator.
   * ---
   *
   */
  "zeta-divider": Partial<ZetaDividerProps & BaseProps & BaseEvents>;

  /**
   * "X replies", a divider and a caret; pressing it expands the replies in place, pushing the messages below down.
   * ---
   *
   *
   * ### **Events:**
   *  - **toggle** - Fired when the thread opens or closes.
   *
   * ### **Slots:**
   *  - _default_ - The Thread Slot: reply messages, each a zeta-chat-message.
   */
  "zeta-chat-thread": Partial<ZetaChatThreadProps & BaseProps & BaseEvents>;

  /**
   * Photos grouped as one grid: one full width, two equal tiles, or one large tile beside two stacked, the last
   * counting what does not fit. `count` is derived from `photos`.
   * ---
   *
   *
   * ### **Events:**
   *  - **open** - Fired when a photo is activated, when `clickable`.
   */
  "zeta-chat-photos": Partial<ZetaChatPhotosProps & BaseProps & BaseEvents>;

  /**
   * A file tile with a download control, a video preview, or an audio waveform, in a message's attachments. Playback
   * is real when `src` is set; a playing video keeps a pause control (spec issue, as intended).
   * ---
   *
   *
   * ### **Events:**
   *  - **download** - Fired when Download is pressed on a file with no `src`.
   */
  "zeta-chat-attachment": Partial<ZetaChatAttachmentProps & BaseProps & BaseEvents>;

  /**
   * The text of a message. fill: a tinted bubble that wraps at 80% of the chat; none: plain text on the page. In a run
   * the corner toward the neighbour tightens.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The message text.
   */
  "zeta-chat-bubble": Partial<ZetaChatBubbleProps & BaseProps & BaseEvents>;

  /**
   * The send time, formatted by the product.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The time.
   */
  "zeta-chat-timestamp": Partial<ZetaChatTimestampProps & BaseProps & BaseEvents>;

  /**
   * Stands in while the assistant or someone else produces a reply: three pulsing dots and a short present-tense label.
   * ---
   *
   */
  "zeta-chat-loading-indicator": Partial<ZetaChatLoadingIndicatorProps & BaseProps & BaseEvents>;

  /**
   * The bar of message actions: React, the Control Slot (Reply by default) and More. React and More are toggles; only
   * one of their panels is open at a time. Every control follows `rounded`.
   * ---
   *
   *
   * ### **Events:**
   *  - **n**
   * - **react** - React pressed.
   * - **more** - More pressed.
   *
   * ### **Slots:**
   *  - _default_ - The Control Slot: extra actions. Reply when empty.
   */
  "zeta-chat-controls": Partial<ZetaChatControlsProps & BaseProps & BaseEvents>;

  /**
   * One message in a chat, from someone else, you or the assistant. Style sets the setting: channel for group chats,
   * conversation for assistant and one-to-one chats. Platform sets how actions open: hover on desktop, long press on
   * mobile. Sequence separates the first message in a run, which carries the header, from the consecutive messages
   * under it.
   *
   * Desktop: the controls float over the message's top edge, overlapping it by space/lg, on hover or focus; the
   * reactions row and the menu never show together. Mobile: a long press (about 450 ms) lifts the message over a scrim,
   * reactions above it and the menu below. Escape or a tap on the scrim closes everything. The assistant keeps its
   * controls under the message, with no reactions row or menu. `roleName` and `chatStyle` stand for the spec's Role and
   * Style. `rounded` (Contourable) maps the spec's Rounded and reaches every part.
   *
   * Spec issues followed as intended: channel messages are start aligned; `hideTime` hides only the time, never the
   * column; reactions and footer never show for the assistant.
   * ---
   *
   *
   * ### **Events:**
   *  - **heldchange** - Fired when the mobile long press opens or closes.
   * - **react** - Fired when a reaction is chosen.
   *
   * ### **Slots:**
   *  - _default_ - The message text, shown in a Bubble.
   * - **attachments** - The Attachment Slot: zeta-chat-photos or zeta-chat-attachment. A zeta-chat-thread placed here moves to `thread`.
   * - **thread** - The reply thread, in its own container under the message: outside its surface and indented to its text, so opening it or hovering a reply never makes the parent active (spec Threads).
   * - **reactions** - The Reactions Slot: zeta-assist-chip with counts.
   * - **footer** - Delivery status under your own most recent message.
   * - **controls** - The Control Slot: extra actions between React and More.
   * - **menu** - zeta-dropdown-menu-item rows for the action menu (desktop More, mobile long press).
   */
  "zeta-chat-message": Partial<ZetaChatMessageProps & BaseProps & BaseEvents>;

  /**
   * A compact action, phrased as a verb, with an optional leading glyph naming its domain. `color` marks a state or a
   * kind of item through the border and text; `discardable` adds a remove control for an item someone can discard,
   * such as an attached file.
   * ---
   *
   *
   * ### **Events:**
   *  - **close** - Fired when the remove control is clicked.
   *
   * ### **Slots:**
   *  - _default_ - The content of the chip.
   *
   * ### **CSS Properties:**
   *  - **--assist-chip-foreground** - Overrides the label, icon and remove colour. _(default: undefined)_
   * - **--assist-chip-background** - Overrides the fill. _(default: undefined)_
   * - **--assist-chip-border** - Overrides the border colour. _(default: undefined)_
   */
  "zeta-assist-chip": Partial<ZetaAssistChipProps & BaseProps & BaseEvents>;

  /**
   * A switch for one filter criterion. `active` is the real switch: it adds a check mark and flips the chip to the
   * inverse palette, so the on state reads without colour. Name the criterion, not the result.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the filter chip is selected/deselected
   */
  "zeta-filter-chip": Partial<ZetaFilterChipProps & BaseProps & BaseEvents>;

  /**
   * A value someone entered into a field, usually a name or a term, with a remove control that is always present. Put
   * a `zeta-avatar` at size xxxs in the `leading` slot when the value is a person, and leave it out for a tag or term.
   * ---
   *
   *
   * ### **Events:**
   *  - **close** - Fired when the remove control is clicked.
   *
   * ### **Slots:**
   *  - _default_ - The value, as text.
   * - **leading** - An optional avatar for a person.
   */
  "zeta-input-chip": Partial<ZetaInputChipProps & BaseProps & BaseEvents>;

  /**
   * A chip that looks like a label.
   * ---
   *
   */
  "zeta-status-chip": Partial<ZetaStatusChipProps & BaseProps & BaseEvents>;

  /**
   * A modal message that interrupts the current task until the user responds or dismisses it. The header carries the
   * flavour's glyph and the title, the body holds the message, and the footer offers up to three actions: a text action
   * on the left, and an outline-subtle and a primary action on the right. With no actions slotted, the footer is
   * removed, leaving an informational dialog with nothing to decide. `flavor` changes only the header glyph.
   *
   * The dialog can be shown either as a modal or non-modal dialog. Modal is recommended for most uses.
   * To show the dialog, call `showModal()` or `show()` method:
   *
   * ```ts
   *  (document.querySelector("#dialog1") as ZetaDialog)?.showModal();
   * ```
   * When shown as a modal, clicking the background barrier will close the modal by default; this can be changed with the `closeOnBarrierClicked` property.
   *
   * When the confirm button is clicked, the dialog will close. To change this behavior, you can set the button's `type` attribute to `submit`.
   * ---
   *
   *
   * ### **Events:**
   *  - **close**
   * - **cancel**
   *
   * ### **Slots:**
   *  - _default_ - Body of dialog; typically text.
   * - **confirm** - Button used in footer. Must be of type zeta-button.
   * - **cancel** - Button used in footer. Must be of type zeta-button.
   * - **other** - Button used in footer. Must be of type zeta-button.
   *
   * ### **CSS Properties:**
   *  - **--dialog-max-width** - Widest the dialog gets, padding and border included; it follows the page width below that. Defaults to 480px. _(default: undefined)_
   * - **--dialog-width** - Older name for --dialog-max-width. Still works. _(default: undefined)_
   * - **--dialog-max-height** - Max height of the dialog. Defaults to 80vh. _(default: undefined)_
   * - **--dialog-title-font-size** - Font size of the dialog title. Defaults to 1.25rem. _(default: undefined)_
   * - **--dialog-title-line-height** - Line height of the dialog title. Defaults to 1.5rem. _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **dialog** - Styles the whole dialog component
   * - **body** - Styles the dialog body
   * - **footer** - Styles the dialog footer
   * - **header** - Styles the dialog header
   */
  "zeta-dialog": Partial<ZetaDialogProps & BaseProps & BaseEvents>;

  /**
   * Empty states are used to convey there is no data is available for display. Types include No results, First use, No Data, User Cleared.
   * ---
   *
   *
   * ### **Slots:**
   *  - **primaryAction** - Primary Action Button. Should be a `zeta-button`.
   * - **secondaryAction** - Secondary Action Button. Should be a `zeta-button`.
   * - **illustration** - Illustration to be displayed in the empty state. Should be a `zeta-illustration`.
   * - **title** - Title of the empty state. Should be a `h4` element.
   * - **description** - Description of the empty state. Should be a `p` element.
   *
   * ### **CSS Properties:**
   *  - **--empty-state-max-width** - Max width of the empty state. Default is 375px. _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **container** - The container of the empty state.
   * - **content** - The content of the empty state (title, description, actions).
   * - **actions** - The container for the action buttons.
   */
  "zeta-empty-state": Partial<ZetaEmptyStateProps & BaseProps & BaseEvents>;

  /**
   * The file's badge in an upload item: a surface/shade tile carrying the extension, a "?" for an unknown type, or a
   * glyph. Decorative: the row names the file.
   * ---
   *
   */
  "zeta-file-indicator": Partial<ZetaFileIndicatorProps & BaseProps & BaseEvents>;

  /**
   * Progress indicators express an unspecified wait time or display the length of a process.
   *
   * A determinate bar reports `value` (a share of 1, or of `maxValue`). `indeterminate` slides a short segment along the
   * track. `buffering` adds a band for what has preloaded (`buffer`); the indicator never runs past it, and an
   * indeterminate bar never shows it. The bar is a `progressbar` named by its label.
   * ---
   *
   *
   * ### **Slots:**
   *  - **trailing** - Supporting detail at the trailing end of the label row (spec: Show More Details).
   *
   * ### **CSS Properties:**
   *  - **--progress-bar-color** - The color of the indicator. Defaults to foreground/link. _(default: undefined)_
   * - **--progress-bar-buffer-color** - The color of the buffer band. _(default: undefined)_
   */
  "zeta-progress-bar": Partial<ZetaProgressBarProps & BaseProps & BaseEvents>;

  /**
   * Progress indicators express an unspecified wait time or display the length of a process.
   *
   * A ring whose arc starts at twelve o'clock and runs clockwise. With `upload` (small and up) a readout sits in the
   * middle and swaps for a cancel button on hover or focus. The ring is a `progressbar`.
   * ---
   *
   *
   * ### **Events:**
   *  - **cancelUpload** - Fired when the cancel button is clicked.
   *
   * ### **CSS Properties:**
   *  - **--progress-circle-color** - The color of the arc. Defaults to border/info. _(default: undefined)_
   */
  "zeta-progress-circle": Partial<ZetaProgressCircleProps & BaseProps & BaseEvents>;

  /**
   * One file in a File Upload list: the file indicator, the name and a meta line, and a progress readout. The status
   * is set by the product. The trailing control follows it: close while waiting or uploading, delete once complete or
   * failed, and a failed row also offers Try again. Its accessible name changes with it. `indicator` chooses between a
   * bar under the meta line, which makes the row taller, and a ring at the row's end, which keeps one height.
   *
   * Spec issues followed as intended rather than as drawn: `extension` reaches the indicator; Try again stays on a
   * failed ring row when `showDismiss` is off; `showDismiss` off also removes the cancel inside the ring; ring controls
   * are a full circle when rounded in every status.
   * ---
   *
   *
   * ### **Events:**
   *  - **name**
   * - **cancelUpload** - Fired when close is pressed while waiting or uploading.
   * - **remove** - Fired when delete is pressed on a complete or failed row.
   * - **retry** - Fired when Try again is pressed on a failed row.
   *
   * ### **Slots:**
   *  - **leading** - Replaces the file indicator, e.g. with a thumbnail.
   */
  "zeta-upload-item": Partial<ZetaUploadItemProps & BaseProps & BaseEvents>;

  /**
   * A drop zone with a Select files button, and the list of chosen files beneath it. The component never uploads
   * anything: it hands the files over in `filesselected` and shows whatever state the product sets on each row, while
   * `state` reports what the zone itself is doing, from resting through a drag to a refusal.
   *
   * Each dropped or picked file is checked against `accept`, `maxFileBytes` and `maxFiles`, in that order; refusals
   * fire `filesrejected` and the first one names itself on the error row. Only real files highlight the zone. The Select
   * files button is the keyboard path; the zone takes no focus. `rounded` (Contourable) maps the spec's `shape` and
   * reaches every `zeta-upload-item` in the slot.
   * ---
   *
   *
   * ### **Events:**
   *  - **filesselected** - Fired with the accepted files.
   * - **filesrejected** - Fired with the refused files.
   *
   * ### **Slots:**
   *  - _default_ - The Files slot: zeta-upload-item rows, in the order they were added.
   */
  "zeta-file-upload": Partial<ZetaFileUploadProps & BaseProps & BaseEvents>;

  /**
   * Graphical illustrations are used for visual representation.
   *
   * We recommend using the provided illustrations for consistency, but if required, the src can be set to any image.
   * ---
   *
   */
  "zeta-illustration": Partial<ZetaIllustrationProps & BaseProps & BaseEvents>;

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
   */
  "zeta-search": Partial<ZetaSearchProps & BaseProps & BaseEvents>;

  /**
   * The bar across the top of an application, carrying the product's identity at the leading edge, navigation and search
   * in the middle, and the person's account at the trailing edge. `rounded` carries into every control the header draws.
   * Header will only allow a maximum of 6 menu items and 6 action items. Any additional items will be hidden.
   * If you have a maximum amount (6) of menu and action items, the search bar will be hidden at a screen size of 1440px or smaller.
   * ---
   *
   *
   * ### **Events:**
   *  - **user-info-click** - Fired when the user info button is clicked.
   * - **hamburger-menu-click** - Fired when the hamburger menu button is clicked.
   * - **app-switcher-click** - Fired when the app switcher button is clicked.
   *
   * ### **Slots:**
   *  - **platform-name** - Slot for the platform name in the header. Falls back to the platformName property if not provided.
   * - **menu-items** - Slot for menu items on the left side of the header. Expects elements of type zeta-button or zeta-dropdown-menu-button.
   * - **action-items** - Slot for action items on the right side of the header. Expects elements of type zeta-icon-button or zeta-action-menu-button.
   * - **user-avatar** - The account avatar: a zeta-avatar with any of its properties (photo, initials, an icon, swatch-color, status…). Its size is set to xxs for you.
   * - **logo** - Slot for a custom logo to replace the default Zebra logo.
   *
   * ### **CSS Parts:**
   *  - **logo** - The container for the logo in the header. By default, this will contain the Zebra logo, but if you use the "logo" slot, your custom logo will be placed here instead.
   */
  "zeta-global-header": Partial<ZetaGlobalHeaderProps & BaseProps & BaseEvents>;

  /**
   * Floating Action Buttons are used to trigger the primary action on a screen. They are circular buttons that float above the content.
   * ---
   *
   *
   * ### **Events:**
   *  - **submit** - Fired when the button is clicked and has the type submit
   *
   * ### **Slots:**
   *  - _default_ - The icon of the button. Entered as a plain string.
   */
  "zeta-fab": Partial<ZetaFabProps & BaseProps & BaseEvents>;

  /**
   * A status message placed inside the content it is about: a form, a card, a panel. It sits in the flow at its
   * container's width. `status` sets the colour and glyph; `appearance` sets how loud it is. Solid interrupts, for the
   * one message on a view that must be seen now. Subtle informs, for context and guidance, and several can share a page.
   *
   * On solid the controls draw light on any fill: slotted actions take `data-theme="dark"`, and the dismiss maps its
   * foreground to foreground/on-strong (Figma pins palette Dark on both). The text keeps a 16rem minimum before the
   * actions wrap beneath it. `status="negative"` interrupts assistive technology; the others announce politely.
   * ---
   *
   *
   * ### **Events:**
   *  - **close** - The dismiss was pressed. The product removes the banner.
   *
   * ### **Slots:**
   *  - _default_ - The supporting line, when `description` is not set (the legacy way to give the body).
   * - **actions** - The controls the message needs, normally one small zeta-button: outline-subtle on subtle, outline-contrast on solid. The banner sets their shape.
   * - **action** - The legacy name for `actions`.
   *
   * ### **CSS Parts:**
   *  - **banner** - The banner surface.
   * - **icon** - The container holding the status glyph.
   * - **header** - The title.
   * - **body** - The supporting line.
   * - **footer** - The actions.
   */
  "zeta-in-page-banner": Partial<ZetaInPageBannerProps & BaseProps & BaseEvents>;

  /**
   * TODO
   * ---
   *
   */
  "zeta-login-page": Partial<ZetaLoginPageProps & BaseProps & BaseEvents>;

  /**
   * A composer for conversational, AI-assisted surfaces: type, attach, dictate, record a voice message, hear the
   * reply. One state moves it between typing, dictation, voice recording and the assistant speaking back, swapping the
   * body region each time: Text, Voice (listening, transcribing, recording, playback) or Speaking (an orb and the
   * caption, with no toolbar). The state follows what the person does; set `state` to pin one of the spec's ten.
   *
   * Attachment (the spec's subcomponent) is the toggle and its tray: the toggle swaps add for close and takes the pressed
   * ghost surface while open; the tray holds file, camera, the `attachment-controls` slot, `actions` and voice message.
   * Files also arrive by drop and paste, through one gate that applies `accept`, `maxAttachments` and `maxFileBytes`.
   * Recording uses MediaRecorder; dictation uses the `transcribe` property or the browser's speech recognition. Enter
   * sends, Shift+Enter adds a line; Escape cancels a live voice state or closes the tray.
   * ---
   *
   *
   * ### **Events:**
   *  - **name**
   * - **send** - Fired when the message is sent.
   * - **change** - Fired when the text changes.
   * - **stopspeaking** - Fired when Stop speaking is pressed.
   * - **speakresponsechange** - Fired when the read-aloud toggle changes.
   * - **previewattachment** - Fired when an image chip is activated.
   * - **cancelreply** - Fired when the Reply Bar is pressed. The whole bar is one button that cancels the reply.
   *
   * ### **Methods:**
   *  - **send()** - Sends what the composer holds, as the Send control does.
   *
   * ### **Slots:**
   *  - **attachments** - The Attachment File Slot: content above the text, after the files the composer holds.
   * - **more-tools** - The More Tools Slot: icon controls beside Attachment (`zeta-icon-button`, size small, shape full, flavor subtle). Dropped while the tray is open and while listening.
   * - **attachment-controls** - The Attachment Control Slot: extra attachment types in the tray.
   *
   * ### **CSS Parts:**
   *  - **root** - The composer surface.
   */
  "zeta-message-input": Partial<ZetaMessageInputProps & BaseProps & BaseEvents>;

  /**
   * A bottom bar of an app's primary destinations, built from `zeta-grid-menu-item`s. A second group in the `right`
   * slot sits at the far end, for account or utility entries, with an optional rule between the two (`showDivider`).
   * The `action` slot holds a single button for a call to action that is not a destination.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The main group of destinations: `zeta-grid-menu-item`s.
   * - **right** - A second group at the far end (spec: spacer).
   * - **action** - A single action at the end of the bar, such as a zeta-button.
   */
  "zeta-navigation-bar": Partial<ZetaNavigationBarProps & BaseProps & BaseEvents>;

  /**
   * A full-size preview over the page: images, videos and PDFs render themselves; anything else shows a drawn file
   * sheet with its glyph and "no preview". A toolbar names the item and offers open in a new tab, download and close;
   * previous / next page through the items (buttons and arrow keys). Each control hides behind its `show*` property.
   *
   * Paging slides a track of frames rather than swapping one for another: the neighbouring items stay mounted either
   * side of the current one, so moving between them never reloads media or flickers, and the stage's height follows
   * the current frame on the same timing, re-measured when media reports real dimensions — sizes arrive after mount,
   * so the first measure is never final. Opening is different: the panel springs in from the bottom (animations/spring)
   * with the stage already at the first frame's height — the height never animates on open. `animated` always yields
   * to the reduced-motion preference.
   *
   * Shown with `showModal()` / `show()` from the Popup mixin, as `zeta-dialog`; `rounded` (Contourable) maps the
   * spec's `shape` axis and picks the glyph family.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when paging changes the current item.
   * - **open** - Fired when the lightbox is opened.
   * - **close** - Fired when the lightbox is closed.
   * - **cancel**
   *
   * ### **CSS Properties:**
   *  - **--lightbox-width** - Width of the panel. Defaults to control/lg x 16, capped at the viewport less space/page each side. _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **dialog** - The panel.
   * - **stage** - The media well.
   */
  "zeta-lightbox": Partial<ZetaLightboxProps & BaseProps & BaseEvents>;

  /**
   * The footer used on a navigation drawer.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The headline text.
   * - **leading** - Content placed before the headline. Not shown if 'variant' is set to 'logo'.
   * - **trailing** - Content placed after the headline. Not shown if 'variant' is set to 'logo'.
   * - **logo** - The element that replaces the default Zebra logo. Not shown if 'variant' is set to 'profile'.
   */
  "zeta-navigation-drawer-footer": Partial<ZetaNavigationDrawerFooterProps & BaseProps & BaseEvents>;

  /**
   * The header used on a navigation drawer.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The headline text.
   * - **leading** - Content placed before the headline.
   * - **trailing** - Content placed after the headline.
   */
  "zeta-navigation-drawer-header": Partial<ZetaNavigationDrawerHeaderProps & BaseProps & BaseEvents>;

  /**
   * A navigation item to be used in a zeta-navigation-drawer
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The headline text.
   * - **badge** - Content to be placed in the badge.
   * - **leading** - Content to be placed before the headline.
   * - **trailing** - Content to be placed after the headline.
   */
  "zeta-navigation-drawer-item": Partial<ZetaNavigationDrawerItemProps & BaseProps & BaseEvents>;

  /**
   * A navigation sub item to be used in a zeta-navigation-drawer
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The headline text.
   */
  "zeta-navigation-drawer-sub-item": Partial<ZetaNavigationDrawerSubItemProps & BaseProps & BaseEvents>;

  /**
   * The app's destinations in a tall panel at the edge of the screen, opened from a menu button.
   *
   * Built from the Navigation Rail family: a `zeta-navigation-header` in the `header` slot, then `zeta-sub-menu-item`
   * rows, `zeta-collapsible-menu-item` groups and `zeta-divider` in the menu and footer. The drawer hands them its
   * `rounded` and the header its wide form. It follows the page's theme.
   *
   * Modal (default): a dialog at the screen's edge over a `zeta-scrim` (tone scrim), opened with `show()` or
   * `showModal()`. Escape, a scrim click, the header's close button or a chosen destination closes it. With
   * `modal="false"` it is a standard drawer in the layout, opened with `show()`; closed, it narrows to nothing.
   *
   * Only the header is frozen (sticky). The menu never scrolls on its own and the footer follows it.
   *
   * The legacy `zeta-navigation-drawer-header`, `-item`, `-sub-item` and `-footer` still slot in, but are deprecated:
   * use the Navigation Rail family's parts.
   * ---
   *
   *
   * ### **Events:**
   *  - **open** - The drawer opened.
   * - **close** - The drawer closed. `returnValue` is "close", "navigate" or "cancel".
   * - **cancel** - Escape or a scrim click dismissed it.
   * - **action** - The header action button was pressed.
   *
   * ### **Methods:**
   *  - **_show(_isModal: _boolean_)** - Popup's opener, made to follow `modal`: `show()` and `showModal()` both open a modal drawer in the top layer over
   * its scrim, and a standard drawer in place.
   *
   * ### **Slots:**
   *  - _default_ - The menu: `zeta-sub-menu-item`, `zeta-collapsible-menu-item`, `zeta-divider`.
   * - **header** - A `zeta-navigation-header`. Sticky.
   * - **footer** - More rows after the menu (settings, help). Not pinned.
   *
   * ### **CSS Properties:**
   *  - **--navigation-drawer-width** - The drawer's width; 320px by default (no width token exists). _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **dialog** - The drawer surface.
   */
  "zeta-navigation-drawer": Partial<ZetaNavigationDrawerProps & BaseProps & BaseEvents>;

  /**
   * The caret that marks something as able to open, and turns when it does. Figma swaps glyphs per state; here one
   * glyph rotates (owner decision): `expand_more` turned 180° for vertical, `chevron_right` turned 90° for horizontal.
   * Decorative: the control it sits in carries `aria-expanded`. The colour is currentColor.
   * ---
   *
   *
   * ### **CSS Properties:**
   *  - **--caret-indicator-motion** - Duration and easing of the turn. Inside the rail it is animations/smooth. _(default: undefined)_
   */
  "zeta-caret-indicator": Partial<ZetaCaretIndicatorProps & BaseProps & BaseEvents>;

  /**
   * A short floating message that names what an adjacent control does. `point` is the edge the arrow sits on, the edge
   * facing the trigger: bottom puts the bubble above its trigger, left puts it to the right. Placing it against the
   * trigger, and showing and hiding it, belong to whatever uses it. Give the control its own accessible name too: a
   * tooltip alone never reaches anyone who doesn't hover.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The label: a few words naming the action. A long one wraps.
   */
  "zeta-tooltip": Partial<ZetaTooltipProps & BaseProps & BaseEvents>;

  /**
   * A row in the Navigation Rail's sub menu panel: leading glyph, label, an optional counter badge and an optional
   * caret. Renders a link when `href` is set, otherwise a button; `selected` sets `aria-current="page"`. Inside a
   * `zeta-collapsible-menu-item` the group sets `nested`.
   *
   * A label cut off by its ellipsis shows in full in a tooltip after a 3 second hover, or at once on keyboard focus.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The row's name.
   * - **icon** - The leading glyph. Figma ships a `verified` placeholder; swap it.
   */
  "zeta-sub-menu-item": Partial<ZetaSubMenuItemProps & BaseProps & BaseEvents>;

  /**
   * A group in the Navigation Rail's sub menu: a header row that opens to show nested Sub Menu Items on surface/subtle.
   * The header carries `aria-expanded`; the rows reveal on animations/smooth, off under reduced motion. Slotted
   * `zeta-sub-menu-item`s are set to `nested` and follow the group's `rounded`.
   * ---
   *
   *
   * ### **Events:**
   *  - **toggle** - Fired when the header opens or closes the group; `detail.open` is the new state.
   *
   * ### **Slots:**
   *  - _default_ - The nested rows: `zeta-sub-menu-item`s.
   * - **heading** - The group's name.
   * - **icon** - The header's leading glyph.
   */
  "zeta-collapsible-menu-item": Partial<ZetaCollapsibleMenuItemProps & BaseProps & BaseEvents>;

  /**
   * The Navigation Rail's header: a brand mark, and in the wide rail a title and a settings action. Collapsed it shows
   * the mark alone. Inside a `zeta-navigation-rail` the rail sets `expanded` and `rounded`.
   * ---
   *
   *
   * ### **Events:**
   *  - **action** - Fired when the action is clicked.
   *
   * ### **Slots:**
   *  - **mark** - The brand mark: a `zeta-avatar` at size s (type avatar), or a logo (type logo).
   */
  "zeta-navigation-header": Partial<ZetaNavigationHeaderProps & BaseProps & BaseEvents>;

  /**
   * A single destination in a Navigation Rail: a glyph in a square target, or glyph and label on one row in the wide
   * form. Selection recolours the glyph and label instead of laying a scrim behind them.
   *
   * Renders a link when `href` is set, otherwise a button; `selected` sets `aria-current="page"`. Inside a
   * `zeta-navigation-rail` the rail sets `expanded`, `showLabel` and `rounded`. The label is always the accessible name,
   * even when it is hidden in the narrow form.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The label of the navigation item.
   * - **icon** - The glyph. Figma ships a `star` placeholder; swap it on every item.
   */
  "zeta-navigation-rail-item": Partial<ZetaNavigationRailItemProps & BaseProps & BaseEvents>;

  /**
   * Navigation rails allow navigation between sections of an app: a narrow icon rail at the edge of a desktop view,
   * and a sub menu panel beside it for destinations with a second level.
   *
   * The rail follows the page's mode. `inverse` shows the opposite shade, and `locked` keeps it dark (light with
   * `inverse`) whatever the page does; contrast still follows the page. It sets `expanded`,
   * `showLabel` and `rounded` on every rail part inside it. Widening and narrowing run on animations/smooth, never on
   * first render, and are off under reduced motion.
   * ---
   *
   *
   * ### **Events:**
   *  - **expanded-change** - Fired when the toggle item widens or narrows the rail; `detail.expanded` is the new state.
   * - **action** - Fired when the header action is clicked.
   *
   * ### **Slots:**
   *  - _default_ - The menu: `zeta-navigation-rail-item`s, optionally separated by a `zeta-divider`.
   * - **header** - A `zeta-navigation-header`.
   * - **footer** - Destinations pinned to the bottom, above the toggle item.
   * - **sub-menu-header** - A `zeta-sub-menu-header`. The panel shows when it or the sub-menu slot is filled.
   * - **sub-menu** - `zeta-sub-menu-item`s and `zeta-collapsible-menu-item`s.
   */
  "zeta-navigation-rail": Partial<ZetaNavigationRailProps & BaseProps & BaseEvents>;

  /**
   * The title bar of the Navigation Rail's sub menu panel. The default type leads with a glyph; the sub page type leads
   * with a back button. Trailing actions are slotted. Inside a `zeta-navigation-rail` the rail sets `rounded`.
   * ---
   *
   *
   * ### **Events:**
   *  - **back** - Fired when the back button is clicked (type sub-page).
   *
   * ### **Slots:**
   *  - **icon** - The leading glyph (type default). Figma ships a `verified` placeholder.
   * - **actions** - Trailing actions, such as a small Button.
   */
  "zeta-sub-menu-header": Partial<ZetaSubMenuHeaderProps & BaseProps & BaseEvents>;

  /**
   * TODO this has been removed from the FIGMA, this may become deprecated soon
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The headline text.
   * - **leading** - The leading content. Typically a zeta-avatar.
   */
  "zeta-navigation-profile": Partial<ZetaNavigationProfileProps & BaseProps & BaseEvents>;

  /**
   * A single entry in a notification list: who or what it came from, a title and message, an optional attachment and an
   * action. `read` decides whether the entry still looks unseen; every other part is a toggle, so one element covers
   * the range a real list needs.
   *
   * The leading visual goes in the `leading` slot: a `zeta-avatar` (size xxs) for a person, an `img` for something with
   * artwork of its own, or a `zeta-icon` for a system source, which gets a thin ring. The message goes in the default
   * slot and truncates after two lines, so make sure the full text is reachable elsewhere. Unread and urgency are named
   * for assistive technology, not just drawn.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The message body.
   * - **leading** - The source: a zeta-avatar, an img or a zeta-icon.
   * - **action** - What the entry offers to do, usually one small outline zeta-button.
   */
  "zeta-notification-item": Partial<ZetaNotificationItemProps & BaseProps & BaseEvents>;

  /**
   * A field for entering a value, stacked with its label above and a hint below (spec: Input). `type` picks text,
   * number, password, date or time, each bringing its own trailing control; Zeta adds textarea and integer. The label
   * can mark the field required or optional and carry an information icon; the hint holds guidance at rest and the
   * reason when `error` is set. `flavor` is default (bordered), gradient (a unique highlight, such as an AI field) or
   * ghost (borderless, for a surface that already bounds it).
   *
   * Set `block` to fill the container's width. For any other width, wrap it in a sized container.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the input value changes and is committed
   * - **focus** - Fired when the input field is focused
   * - **blur** - Fired when the input field is blurred
   * - **input** - Fired when the input value changes
   *
   * ### **Methods:**
   *  - **handleChange(_event: _Event_): _void_** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleFocus(_event: _FocusEvent_): _void_** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_): _void_** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   *
   * ### **CSS Parts:**
   *  - **field** - The bordered box around the value.
   * - **prefix** - The prefix text.
   */
/**
   * A field for entering a value, stacked with its label above and a hint below (spec: Input). `type` picks text,
   * number, password, date or time, each bringing its own trailing control; Zeta adds textarea and integer. The label
   * can mark the field required or optional and carry an information icon; the hint holds guidance at rest and the
   * reason when `error` is set. `flavor` is default (bordered), gradient (a unique highlight, such as an AI field) or
   * ghost (borderless, for a surface that already bounds it).
   *
   * Set `block` to fill the container's width. For any other width, wrap it in a sized container.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the input value changes and is committed
   * - **focus** - Fired when the input field is focused
   * - **blur** - Fired when the input field is blurred
   * - **input** - Fired when the input value changes
   *
   * ### **Methods:**
   *  - **handleChange(_event: _Event_): _void_** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleFocus(_event: _FocusEvent_): _void_** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_): _void_** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   *
   * ### **CSS Parts:**
   *  - **field** - The bordered box around the value.
   * - **prefix** - The prefix text.
   */
"zeta-text-input":  Partial<Omit<React.InputHTMLAttributes<ZetaTextInputProps>, keyof ZetaTextInputProps | keyof BaseEvents | keyof BaseProps>>  | Partial<ZetaTextInputProps & BaseProps & BaseEvents>

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
   */
  "zeta-phone-input": Partial<ZetaPhoneInputProps & BaseProps & BaseEvents>;

  /**
   * Buttons for navigating between pages: four jump controls, the page numbers with the current one selected, and an
   * overflow marker where pages collapse. `outline` and `rounded` apply to every control at once.
   * ---
   *
   *
   * ### **Events:**
   *  - **pageChange** - Fired when page change. Contains a single value in details: `page: number`.
   */
  "zeta-pagination": Partial<ZetaPaginationProps & BaseProps & BaseEvents>;

  /**
   * The bar at the top of a screen: a back button, the screen's title and one action. It suits a screen with exactly
   * one primary action; use Top App Bar for more actions or a different leading control.
   *
   * `rounded` sets the shape of the back button and of the Buttons and Icon Buttons in the action slot.
   * The bar is transparent and fills the width of its container.
   * ---
   *
   *
   * ### **Events:**
   *  - **back** - Fired when the back button is clicked.
   *
   * ### **Slots:**
   *  - **action** - The trailing action, usually one primary Button.
   */
  "zeta-screen-header-bar": Partial<ZetaScreenHeaderBarProps & BaseProps & BaseEvents>;

  /**
   * The scroll indicator for a region that clips its content. A padded gutter holds a pill handle whose position and
   * length mirror the scroll offset; hovering raises a track scrim so the grab target reads. The scrolling region, not
   * the bar, owns the behaviour: the element is presentational, takes no focus and fires no events — expose scrolling
   * through the region itself.
   *
   * `value` and `size` are code inputs the spec leaves to the implementation (Figma draws one sample). Size the bar to
   * the region's edge with `--scrollbar-length` (typically `100%`); unset, it draws at the sample length.
   * ---
   *
   *
   * ### **CSS Properties:**
   *  - **--scrollbar-length** - The bar's length along its axis. Defaults to the drawn sample (200px); set it to the scrolling region's edge. _(default: undefined)_
   */
  "zeta-scrollbar": Partial<ZetaScrollbarProps & BaseProps & BaseEvents>;

  /**
   * Shimmer is a loading skeleton component that displays an animated shimmer effect to indicate content is loading.
   * ---
   *
   *
   * ### **CSS Properties:**
   *  - **--shimmer-height** - The height of the shimmer element. Default: 20px _(default: undefined)_
   * - **--shimmer-width** - The width of the shimmer element. Default: 100% _(default: undefined)_
   * - **--shimmer-animation-duration** - The duration of the shimmer animation. Default: 1.5s _(default: undefined)_
   * - **--shimmer-border-radius** - The border radius of the shimmer element. Default: 0px _(default: undefined)_
   */
  "zeta-shimmer": Partial<ZetaShimmerProps & BaseProps & BaseEvents>;

  /**
   * A text input and slider field for entering numerical values.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired whenever value of slider is changed. Contains a single entry in detail: `value:number`.
   *
   * ### **Methods:**
   *  - **handleChange(event: _Event_)** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   */
/**
   * A text input and slider field for entering numerical values.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired whenever value of slider is changed. Contains a single entry in detail: `value:number`.
   *
   * ### **Methods:**
   *  - **handleChange(event: _Event_)** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   */
"zeta-slider-input-field":  Partial<Omit<React.InputHTMLAttributes<ZetaSliderInputFieldProps>, keyof ZetaSliderInputFieldProps | keyof BaseEvents | keyof BaseProps>>  | Partial<ZetaSliderInputFieldProps & BaseProps & BaseEvents>

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
   */
  "zeta-slider": Partial<ZetaSliderProps & BaseProps & BaseEvents>;

  /**
   * A brief message about something the app just did, carrying at most one action. `variant` chooses a contextual pill,
   * where `status` sets the tint, the glyph and the controls together, or a plain dark standard bar.
   *
   * It sits in the page by default, as Zeta's snackbar always has. `floating` lifts it into the top layer, centred above
   * the bottom of the viewport, sliding in over 300ms and out over 200ms (a fade only with reduced motion). With
   * `duration` it closes itself, pausing while the pointer or focus is inside. It announces itself politely (negative
   * interrupts). The dark bars carry their own colour mode, so on a dark page they invert to light.
   * ---
   *
   *
   * ### **Events:**
   *  - **close** - It closed; `detail.reason` is "dismiss", "timeout" or "action".
   * - **action** - The action button was pressed. The snackbar then closes.
   *
   * ### **Methods:**
   *  - **hide(reason: _ZetaSnackbarCloseReason_)** - Closes it, as the close button does.
   *
   * ### **Slots:**
   *  - _default_ - The message: one short line, which ends in an ellipsis where it runs out of room.
   * - **icon** - A leading icon, for the statuses without a glyph of their own (default, action and standard).
   *
   * ### **CSS Parts:**
   *  - **surface** - The bar.
   */
  "zeta-snackbar": Partial<ZetaSnackbarProps & BaseProps & BaseEvents>;

  /**
   * A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button. Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
   *
   * A segment is a radio in its control's group. Give an icon-only segment an `aria-label`.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The content of the item: a `zeta-icon`, a label, or both.
   */
  "zeta-segmented-item": Partial<ZetaSegmentedItemProps & BaseProps & BaseEvents>;

  /**
   * A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button.
   * Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
   *
   * To listen for changes, add a `click` event listener to the `zeta-segmented-control` element.
   *
   * To set the active segment, set the `active` property on the `zeta-segmented-item` element.
   *
   * Exactly one segment is active; the first is chosen when none is. The control is a radio group with one tab stop, and
   * the arrow keys move the choice. A single indicator slides to the active segment on animations/spring, off under
   * reduced motion. `rounded` and `flavor` are set once here and reach every segment.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The content of the segmented control. Should be a collection of `zeta-segmented-item` elements.
   */
  "zeta-segmented-control": Partial<ZetaSegmentedControlProps & BaseProps & BaseEvents>;

  /**
   * One step of a zeta-stepper. It draws Step / Horizontal, Step / Vertical, Step Card or Step Segment, whichever the
   * parent's `variant`, `size` and `card` call for. Each step sets its own `status`; keep exactly one `active`.
   * Steps are numbered from 1 automatically, and the last drops its connector.
   * ---
   *
   *
   * ### **Events:**
   *  - **select** - The step's text was chosen. Only with `selectable`. `detail.position` is the step's number.
   *
   * ### **Slots:**
   *  - _default_ - The label, when `label` is not set.
   *
   * ### **CSS Parts:**
   *  - **indicator** - The numbered circle.
   */
  "zeta-stepper-item": Partial<ZetaStepperItemProps & BaseProps & BaseEvents>;

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
   */
  "zeta-stepper": Partial<ZetaStepperProps & BaseProps & BaseEvents>;

  /**
   * ZetaOption web component. A selected option shows a trailing check mark, as Select's selected row does in the spec.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The default slot
   *
   * ### **CSS Properties:**
   *  - **--option-max-lines** - The maximum number of lines to display before truncating with an ellipsis. Default is 2. _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **option-text** - The text of the option.
   * - **check** - The trailing check mark on the selected option.
   */
  "zeta-option": Partial<ZetaOptionProps & BaseProps & BaseEvents>;

  /**
   * A text input field for selecting from a list of options.
   *
   * Currently no typing or multi-select support.
   *
   * Label, field and hint stack space/xs apart. The field reads the same tokens as Input: `flavor`, `shape` and `size`
   * pick its border, corners and height; `open`, `error`, `readOnly` and `disabled` its state. The options open 4px
   * below the field, as wide as it, on surface/overlay.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the value of the select input changes.
   * - **focus** - Fired when the select input receives focus.
   * - **blur** - Fired when the select input loses focus.
   *
   * ### **Methods:**
   *  - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   *
   * ### **CSS Properties:**
   *  - **--select-input-min-width** - The field's minimum width. Defaults to Input Field's minimum width. _(default: undefined)_
   * - **--select-input-options-min-width** - The options panel's minimum width; it is otherwise as wide as the field. _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **input-text** - The text of the selected option or placeholder.
   */
/**
   * A text input field for selecting from a list of options.
   *
   * Currently no typing or multi-select support.
   *
   * Label, field and hint stack space/xs apart. The field reads the same tokens as Input: `flavor`, `shape` and `size`
   * pick its border, corners and height; `open`, `error`, `readOnly` and `disabled` its state. The options open 4px
   * below the field, as wide as it, on surface/overlay.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the value of the select input changes.
   * - **focus** - Fired when the select input receives focus.
   * - **blur** - Fired when the select input loses focus.
   *
   * ### **Methods:**
   *  - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   *
   * ### **CSS Properties:**
   *  - **--select-input-min-width** - The field's minimum width. Defaults to Input Field's minimum width. _(default: undefined)_
   * - **--select-input-options-min-width** - The options panel's minimum width; it is otherwise as wide as the field. _(default: undefined)_
   *
   * ### **CSS Parts:**
   *  - **input-text** - The text of the selected option or placeholder.
   */
"zeta-select-input":  Partial<Omit<React.InputHTMLAttributes<ZetaSelectInputProps>, keyof ZetaSelectInputProps | keyof BaseEvents | keyof BaseProps>>  | Partial<ZetaSelectInputProps & BaseProps & BaseEvents>

  /**
   * A numeric value with a button either side to decrease or increase it. A button disables itself at `min` or `max`,
   * and a typed value is held between them. Size large suits a touch surface. The hint shows below the control and is
   * removed while disabled; `error` swaps it for `errorText`.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the value of the stepper input changes.
   * - **input** - Fired when the value of the stepper input changes.
   * - **focus** - Fired when the stepper input receives focus.
   * - **blur** - Fired when the stepper input loses focus.
   *
   * ### **Methods:**
   *  - **handleFocus(_event: _FocusEvent_): _void_** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_): _void_** - Event fired when the input is blurred
   * - **handleChange(_event: _Event_)** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   */
/**
   * A numeric value with a button either side to decrease or increase it. A button disables itself at `min` or `max`,
   * and a typed value is held between them. Size large suits a touch surface. The hint shows below the control and is
   * removed while disabled; `error` swaps it for `errorText`.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired when the value of the stepper input changes.
   * - **input** - Fired when the value of the stepper input changes.
   * - **focus** - Fired when the stepper input receives focus.
   * - **blur** - Fired when the stepper input loses focus.
   *
   * ### **Methods:**
   *  - **handleFocus(_event: _FocusEvent_): _void_** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_): _void_** - Event fired when the input is blurred
   * - **handleChange(_event: _Event_)** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   */
"zeta-stepper-input":  Partial<Omit<React.InputHTMLAttributes<ZetaStepperInputProps>, keyof ZetaStepperInputProps | keyof BaseEvents | keyof BaseProps>>  | Partial<ZetaStepperInputProps & BaseProps & BaseEvents>

  /**
   * A full-width message pinned to the top of a screen or view: a status colour, a title, an optional description and
   * optional actions. It spans its container and stays until something clears it. `layout` picks the desktop banner or
   * the mobile one.
   *
   * It is locked to Dark, whatever the page's mode, so the white text and the controls hold on the strong status
   * colours. The banner stays square; `rounded` sets the shape of the dismiss and every Button or Icon Button in the
   * actions. `status="negative"` never shows a dismiss and interrupts assistive technology; the others announce politely.
   * It reveals by sliding down and pushing the content below; the dismiss or `open=false` plays that in reverse.
   * ---
   *
   *
   * ### **Events:**
   *  - **close** - The dismiss was pressed. The banner plays its exit and hides first.
   *
   * ### **Slots:**
   *  - _default_ - The title, when `heading` is not set (the legacy way to give the text).
   * - **actions** - The controls the message needs, typically one small outline-contrast zeta-button.
   * - **leadingIcon** - A leading icon in place of the status glyph (legacy).
   * - **trailingIcon** - An icon at the trailing end (legacy).
   *
   * ### **CSS Parts:**
   *  - **row** - The message row.
   */
  "zeta-system-banner": Partial<ZetaSystemBannerProps & BaseProps & BaseEvents>;

  /**
   * A data table built strictly from the Table spec: rows of content in columns, framed by an optional controls bar
   * above and a pagination footer below. It is a real table (header cells `scope="col"`, `aria-sort` on sortable
   * columns) in a horizontally scrolling wrapper, and takes its container's width.
   *
   * Data comes in as `columns` and `rows`. A cell value is text, or `{ title, subtitle?, avatar? }` for the spec's
   * avatar-and-text cell. Any cell can hold other content (a Checkbox, Status Label, Button, Icon Button) through the
   * named slot `cell-<rowKey>-<colKey>`, whose fallback is the data.
   *
   * Activating a sortable header cycles none, ascending, descending, sets `sort` and fires `sort-change`. By default the
   * table is controlled: the listener reorders, filters and pages `rows`. `client-side` makes the table do it itself
   * from the full `rows`: it sorts by `sort` (text, numbers by value, or the column's `compare`), keeps rows whose text
   * matches `searchValue`, keeps rows whose cell is among the chosen `filters`, and shows `pageSize` rows of page `page`
   * with the page count and footer summary worked out. Sorting, searching or filtering returns to page 1. A filterable
   * column's filter button then opens a compact menu of checkbox options (its `filterOptions`, or its distinct values)
   * and fires `filter-change`; a filtered column keeps its filter button showing. With nothing to show, the body shows
   * `emptyLabel`. `frozenColumns` pins the first columns, measured from the rendered
   * header cells, and the last frozen one casts a horizontal shadow once the rest scroll beneath it. The footer holds an
   * outline zeta-pagination driven by `page` and `pageCount`, or whatever is slotted into `pagination`.
   *
   * `selectable` adds a checkbox column before the columns, with select-all in its header. `selectedRows` holds the
   * selected row keys (seeded from each row's `selected` until it is set) and every toggle fires `selection-change`.
   * Select-all covers the enabled rows shown, so a selection on another page survives; disabled rows can't be toggled.
   * While any row is selected, an info Label at the start of the controls bar counts them (`selectedCountFormat`), and
   * the count is announced as it changes.
   * Selected rows take the selected fill and `aria-selected`.
   *
   * `pageSizeOptions` adds a rows-per-page Select Input to the start of the footer, after the summary, as narrow as its
   * values allow, opening on the compact menu like the table's other menus. Choosing a size sets `pageSize`, returns to page 1 and fires `page-size-change`; client-side, the table pages
   * by it, and otherwise the listener does.
   *
   * `rowActions` adds a trailing column with a more button per row that opens a compact menu of those actions; a row's
   * own `actions` replace them, and `null` hides the menu on that row. Choosing an enabled action closes the menu, calls
   * `onRowAction` and fires `row-action`. The menu opens in the top layer, so the table's clipping never cuts it off;
   * it moves with the arrow keys and closes on Escape, Tab or a click outside, handing focus back to its button.
   *
   * `resizable` lets people resize columns from each header's trailing edge; a column opts out with `resizable: false`.
   * Hovering the edge shows the neutral hover border down the full header cell. Resizing never changes the table's
   * width: a column grows by taking width from the resizable columns after it, the next first and none below
   * `minColumnWidth`, and shrinks by giving it to the next one (the last column trades with those before it). Dragging
   * sets the width, the arrow keys step it, and a double-click returns the column to its declared width. Each change
   * fires `column-resize`.
   *
   * `columnConfigure` adds a settings button to the controls bar that opens a compact panel: a checkbox per column to
   * show or hide it (`hiddenColumns`; the last column showing can't be hidden, nor a column with `hideable: false`), and
   * a choice of how many leading columns to freeze (`frozenColumns`). Every change fires `column-settings-change`.
   * Hidden columns leave every part of the table, search included.
   *
   * Text cut off with an ellipsis (a cell's text, an avatar cell's title or subtitle, a header label) shows in full in a
   * Tooltip above it after `tooltipDelay` ms of hover. A column's `tooltip` shows it even when the text fits, and
   * `tooltipOnEllipsisOnly: false` turns it off. The tooltip opens in the top layer and repeats text already on the page,
   * so it is hidden from assistive technology.
   *
   * A row is disabled by its own `disabled` or by its key in `disabledRows`. Disabled rows look disabled, can't be
   * selected, clicked or opened for actions, and select-all passes them by; `allowDisabledSelection` lets them be
   * selected, clicked and opened for actions while they still look disabled, as for a bulk delete.
   *
   * `maxHeight` caps the content's height: rows beyond it scroll vertically inside the table, under a header that
   * sticks to the top, while the controls bar and footer stay put. Frozen columns stay frozen in both directions.
   *
   * `rounded` rounds the table's corners and its own Search, Pagination, checkboxes and actions menu. The table can't reach slotted content, so
   * slotted controls read `rounded` from the table to match. Rows show a pointer only while something listens for
   * `row-click`; disabled rows never fire it.
   *
   * Kept in step with packages/web-components zds-table.
   * ---
   *
   *
   * ### **Events:**
   *  - **name**
   * - **sort-change** - A sortable header was activated. `detail.sort` is the new sort, or null.
   * - **search-change** - The search query changed. `detail.value`.
   * - **filter** - A header's filter control was activated. `detail.key` is the column key.
   * - **filter-change** - Client-side: a filter option was toggled or cleared. `detail.filters` is the new filters, `detail.key` the column.
   * - **row-click** - An enabled row was clicked. `detail.row`.
   * - **page-change** - The built-in pagination moved. `detail.page`, 1-based.
   * - **page-size-change** - A rows-per-page size was chosen. `detail.pageSize`.
   * - **row-action** - An action was chosen from a row's menu. `detail.action` is its key, `detail.row` the row and `detail.rowIndex` its index in `rows`.
   * - **column-resize** - A column was resized. `detail.key` is the column, `detail.width` its width in px and `detail.widths` every column's width in px, the neighbours that gave or took width included.
   * - **column-settings-change** - A column was shown or hidden, or the freeze changed, from the settings panel. `detail.hiddenColumns` and `detail.frozenColumns`.
   * - **selection-change** - A row or select-all was toggled. `detail.selectedRows` is the new set of keys, `detail.rows` the rows that changed and `detail.selected` whether they were selected or cleared.
   *
   * ### **Slots:**
   *  - **controls** - Actions after the search field in the controls bar, such as outline-subtle zeta-icon-buttons.
   * - **pagination** - Replaces the built-in zeta-pagination at the end of the footer.
   * - **cell-<rowKey>-<colKey>** - Replaces one data cell's content.
   *
   * ### **CSS Parts:**
   *  - **controls** - The controls bar.
   * - **scroller** - The horizontally scrolling wrapper.
   * - **table** - The table element.
   * - **footer** - The footer.
   */
  "zeta-table": Partial<ZetaTableProps & BaseProps & BaseEvents>;

  /**
   * Legacy: superseded by `zeta-table`, which is built from the Table spec. Kept, renamed from `zeta-table`, for apps
   * still on its API (`data`, `paginationType`, callback props).
   *
   * A full-featured, highly configurable data table component.
   *
   * ## Features
   * - **Sorting**: 3-state per-column sort indicator (asc → desc → none). Sorting is delegated to the consumer via `onSortChange`. Configurable per column via `sortable`.
   * - **Column Search**: Optional per-column search inputs. Enabled when `onColumnSearch` callback is provided.
   * - **Column Filter**: Optional per-column filter dropdown with checkboxes (Clear/Apply). Enabled when `onColumnFilter` is provided. Options via `filterOptions` on column or auto-populated from data.
   * - **Global Search**: Optional search bar in header. Enabled when `onTableSearch` callback is provided.
   * - **Selection**: Checkbox column with select-all. Optional `selectOnRowClick` for click-to-select.
   * - **Row Click**: Optional `onRowClick` callback. Rows show pointer cursor and highlight on click.
   * - **Disabled Rows**: Rows can be disabled via `disabledRows` array or `_disabled` property. Use `allowDisabledSelection` to allow selection/actions on disabled rows.
   * - **Frozen Columns**: Columns can be frozen via `frozen` property or the column configure panel.
   * - **Column Resizing**: Drag to resize. Double-click header to auto-fit.
   * - **Column Configure**: Show/hide and freeze/unfreeze columns from a dropdown panel.
   * - **Pagination**: Numbered or infinite scroll. Consumer provides paged data via `onPageChange`/`onLoadMore` callbacks. Use `totalItems` to tell the table the full dataset size for page count calculation.
   * - **Nested Rows**: Expandable child rows via `_nested` property on row data.
   * - **Export**: CSV export of visible data.
   * - **Refresh**: Optional refresh button with consumer-controlled reload.
   * - **Row Actions**: Per-row kebab menu with configurable items per row via `_actions`.
   * - **Tooltips**: Auto-shown on content overflow.
   * - **Localization**: All labels (`refreshLabel`, `columnsLabel`, `actionsLabel`, `searchPlaceholder`) are configurable.
   * - **Custom Styling**: Full theming via CSS custom properties and `::part()` selectors.
   *
   * ## Usage
   * ```html
   * <zeta-table-legacy
   *   .columns=${columns}
   *   .data=${data}
   *   .onTableSearch=${handleSearch}
   *   .onColumnSearch=${handleColumnSearch}
   *   .onColumnFilter=${handleFilter}
   *   .onRefresh=${handleRefresh}
   *   .onRowClick=${handleRowClick}
   *   .onRowAction=${handleAction}
   *   .onSortChange=${handleSort}
   *   .onSelectionChange=${handleSelection}
   *   .onPageChange=${handlePageChange}
   *   .onLoadMore=${handleLoadMore}
   *   .onExport=${handleExport}
   *   .onRowExpand=${handleExpand}
   *   selectable
   *   select-all
   *   exportable
   *   column-configure
   *   show-data-count
   *   table-title="My Table"
   *   pagination-type="numbered"
   *   page-size="10"
   *   style="--table-max-height: 500px; --table-header-bg: #f8fafc;"
   * ></zeta-table-legacy>
   * ```
   *
   * ## Column Definition (ZetaTableLegacyColumn)
   * ```typescript
   * {
   *   field: string;          // Data key
   *   title: string;          // Display header text
   *   width?: number | string; // Initial width — number for px (e.g. 200), string for CSS (e.g. "25%", "12rem")
   *   minWidth?: number;      // Minimum width for resize (default: 60)
   *   sortable?: boolean;     // Enable sorting (default: true)
   *   filterable?: boolean;   // Enable search/filter (default: true)
   *   filterOptions?: string[]; // Predefined filter dropdown options
   *   frozen?: boolean;       // Freeze this column
   *   visible?: boolean;      // Column visibility (default: true)
   *   tooltip?: boolean;      // true = always show tooltip (highest precedence)
   *   tooltipOnEllipsisOnly?: boolean; // true (default) = show on overflow only | false = disable tooltip
   *   resizable?: boolean;    // Allow column resize (default: true)
   *   disabled?: boolean;     // Disable all interaction on column
   * }
   * ```
   *
   * ## Row Data (ZetaTableLegacyRow)
   * ```typescript
   * {
   *   id: string | number;        // Unique row identifier (required)
   *   [key: string]: unknown;     // Data fields matching column `field` names
   *   _disabled?: boolean;        // Disable row (grey out, no interaction)
   *   _checkboxDisabled?: boolean; // Disable only the checkbox (row still interactive)
   *   _nested?: ZetaTableLegacyRow[] | Node; // Nested content: array of child rows (auto-columns) or a DOM Node (custom view)
   *   _actions?: ZetaTableLegacyAction[] | null; // Per-row kebab menu items (null = hide menu)
   * }
   * ```
   *
   * ## Row Action (ZetaTableLegacyAction)
   * ```typescript
   * { key: string; label: string; icon?: string; disabled?: boolean; }
   * ```
   * ---
   *
   *
   * ### **Events:**
   *  - **zeta-table-row-click** - Row clicked. Detail: { row, rowIndex }
   * - **zeta-table-sort-change** - Column sort changes. Detail: { field, direction }
   * - **zeta-table-column-filter** - Column filter applied. Detail: { field, selectedValues }
   * - **zeta-table-column-search** - Column search input changes. Detail: { field, value, searchValues }
   * - **zeta-table-selection-change** - Row selection changes. Detail: { selectedIds: [] }
   * - **zeta-table-row-expand** - Row expanded/collapsed. Detail: { rowId, expanded }
   * - **zeta-table-load-more** - More data needed (infinite scroll)
   * - **zeta-table-page-change** - Page changes (numbered). Detail: { page, pageSize }
   * - **zeta-table-action** - Row action clicked. Detail: { actionKey, row, rowIndex }
   * - **zeta-table-search** - Global search input changes. Detail: { value }
   * - **zeta-table-export** - Export button clicked. Detail: { csv, columns, data }
   * - **zeta-table-refresh** - Refresh button clicked
   *
   * ### **CSS Properties:**
   *  - **--table-width** - Table width. Default: 100% _(default: undefined)_
   * - **--table-max-height** - Max height of scroll area. Default: none _(default: undefined)_
   * - **--table-border-color** - Border color. Default: #e0e3e9 _(default: undefined)_
   * - **--table-border-radius** - Wrapper border radius. Default: 8px _(default: undefined)_
   * - **--table-header-bg** - Header background. Default: #ffffff _(default: undefined)_
   * - **--table-header-text** - Header text color. Default: #1d1e23 _(default: undefined)_
   * - **--table-header-height** - Header row height. Default: 40px _(default: undefined)_
   * - **--table-header-font-size** - Header font size. Default: 12px _(default: undefined)_
   * - **--table-header-font-weight** - Header font weight. Default: 600 _(default: undefined)_
   * - **--table-header-border-bottom** - Header bottom border. Default: 2px solid _(default: undefined)_
   * - **--table-row-height** - Data row height (includes cell padding, box-sizing: border-box). Default: 40px _(default: undefined)_
   * - **--table-row-bg** - Row background. Default: #fff _(default: undefined)_
   * - **--table-row-hover-bg** - Row hover background. Default: #f5f7fa _(default: undefined)_
   * - **--table-row-selected-bg** - Selected row background. Default: #e8f2ff _(default: undefined)_
   * - **--table-row-active-bg** - Active/clicked row background. Default: #e8f4fd _(default: undefined)_
   * - **--table-row-clickable-cursor** - Clickable row cursor. Default: pointer _(default: undefined)_
   * - **--table-cell-padding-y** - Cell vertical padding. Default: 10px _(default: undefined)_
   * - **--table-cell-padding-x** - Cell horizontal padding. Default: 12px _(default: undefined)_
   * - **--table-cell-padding** - Cell padding shorthand (computed from padding-y and padding-x). Default: 10px 12px _(default: undefined)_
   * - **--table-cell-font-size** - Cell font size. Default: 14px _(default: undefined)_
   * - **--table-frozen-shadow** - Frozen column shadow. Default: 4px 0 8px -2px rgba(0,0,0,0.08) _(default: undefined)_
   * - **--table-sort-active-color** - Active sort icon color. Default: #0073e6 _(default: undefined)_
   * - **--table-sort-inactive-color** - Inactive sort icon color. Default: #c4c9d4 _(default: undefined)_
   * - **--table-resize-handle-color** - Resize handle color. Default: #0073e6 _(default: undefined)_
   * - **--table-toolbar-bg** - Toolbar background. Default: #fff _(default: undefined)_
   * - **--table-footer-bg** - Footer background. Default: #fff _(default: undefined)_
   * - **--table-data-count-bg** - Data count badge background. Default: #e8f2ff _(default: undefined)_
   * - **--table-data-count-color** - Data count badge text color. Default: #0073e6 _(default: undefined)_
   */
  "zeta-table-legacy": Partial<ZetaTableLegacyProps & BaseProps & BaseEvents>;

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
   */
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
   */
"zeta-switch":  Partial<Omit<React.InputHTMLAttributes<ZetaSwitchProps>, keyof ZetaSwitchProps | keyof BaseEvents | keyof BaseProps>>  | Partial<ZetaSwitchProps & BaseProps & BaseEvents>

  /**
   * One tab in a zeta-tab-bar: an optional icon, a label and an optional badge. The tab bar sets which tab is selected
   * and moves keyboard focus between them; set `selected` on the tab that shows the current view.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The label. Use real words: it is the tab's name.
   * - **icon** - A leading zeta-icon.
   */
  "zeta-tab-item": Partial<ZetaTabItemProps & BaseProps & BaseEvents>;

  /**
   * A row of tabs for switching between views at the same level. `flavor="full-width"` divides the row between the
   * tabs; `condensed` hugs them, for a bar that shares a row with other content.
   *
   * Choosing a tab selects it and fires `change`; exactly one tab is selected. The selected tab is the tab stop, and the
   * arrow keys, Home and End move between tabs and select as they go.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - A tab was chosen; `detail.index` is its position and `detail.tab` the element.
   *
   * ### **Slots:**
   *  - _default_ - The zeta-tab-items.
   *
   * ### **CSS Properties:**
   *  - **--tab-bar-background** - The background colour of the tab bar. _(default: undefined)_
   */
  "zeta-tab-bar": Partial<ZetaTabBarProps & BaseProps & BaseEvents>;

  /**
   * The header at the top of a mobile screen, carrying the screen's name between a leading control and its actions.
   * Setting `type` picks one of six arrangements, each drawing its own leading control and content; slotted content
   * replaces what it draws. Without `type` the element only lays out its slots, and `centered` and `extended` still work.
   * ---
   *
   *
   * ### **Events:**
   *  - **name**
   * - **leading-click** - The leading control `type` draws was activated.
   * - **trailing-click** - The fixed control on `centered` was activated.
   *
   * ### **Slots:**
   *  - _default_ - The content of the appbar.
   * - **leading** - The content to be placed at the start of the appbar.
   * - **trailing** - The content to be placed at the end of the appbar.
   * - **contextual-controls** - The actions on `contextual` and `contextual alt`, in place of `trailing`.
   */
  "zeta-top-appbar": Partial<ZetaTopAppbarProps & BaseProps & BaseEvents>;

  /**
   * A large, tappable button with an icon stacked above a label.
   * Ideal for grid layouts, dashboards, or mobile interfaces where quick, visually distinct actions are needed.
   * ---
   *
   *
   * ### **Events:**
   *  - **submit** - Fired when the button is clicked and has the type submit
   *
   * ### **Slots:**
   *  - _default_ - Content shown on button; typically text.
   *
   * ### **CSS Parts:**
   *  - **button** - The button element
   */
  "zeta-tile-button": Partial<ZetaTileButtonProps & BaseProps & BaseEvents>;

  /**
   * A card whose body opens and closes behind a header that is always visible (spec: Collapsible Card). The header
   * carries a title, an optional required mark and a description; when `collapsible`, it is a button that opens and
   * closes the body, led by a chevron that turns as it opens. `ai` outlines the card with the brand gradient (spec:
   * flavor=gradient), for the one card in a group that should draw the eye.
   *
   * Without `collapsible` it is a plain titled card whose content is always shown.
   * ---
   *
   *
   * ### **Slots:**
   *  - _default_ - The main content of the card. If `collapsible` is true, this content will be hidden when the card is collapsed.
   *
   * ### **CSS Parts:**
   *  - **content** - The content area of the card where slotted content is rendered.
   * - **header** - The header area of the card.
   */
  "zeta-card-container": Partial<ZetaCardContainerProps & BaseProps & BaseEvents>;

  /**
   * Used for selecting values in a numerical range.
   *
   * A ranged input field using a Zeta Slider
   *
   * The "name" is required when in a form.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired whenever value of range slider is changed. Contains 2 values in details: `min:number`, `max:number`.
   *
   * ### **Methods:**
   *  - **handleChange(event: _Event_)** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   */
/**
   * Used for selecting values in a numerical range.
   *
   * A ranged input field using a Zeta Slider
   *
   * The "name" is required when in a form.
   * ---
   *
   *
   * ### **Events:**
   *  - **change** - Fired whenever value of range slider is changed. Contains 2 values in details: `min:number`, `max:number`.
   *
   * ### **Methods:**
   *  - **handleChange(event: _Event_)** - Event fired when the input value changes and is committed:
   * this specifically occurs when th user commits the change explicitly (i,e, date picker, file picker)
   * or if it is a text-like input, when the user loses focus from the input.
   * or if it is a checkbox-like input, when the checkbox is toggled.
   * or if it is a radio-like input, when the radio is selected (but not unselected).
   * - **handleFocus(_event: _FocusEvent_)** - Event fired when the input is focussed
   * - **handleBlur(_event: _FocusEvent_)** - Event fired when the input is blurred
   * - **handleInput(_event: _InputEvent_)** - Event fired when the input value changes
   */
"zeta-range-selector":  Partial<Omit<React.InputHTMLAttributes<ZetaRangeSelectorProps>, keyof ZetaRangeSelectorProps | keyof BaseEvents | keyof BaseProps>>  | Partial<ZetaRangeSelectorProps & BaseProps & BaseEvents>
};
