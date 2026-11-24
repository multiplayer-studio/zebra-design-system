import{ZetaDropdownMenuItemProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import"../../icon/icon.js";import"../../checkbox/checkbox.js";import"../../radio-button/radio-button.js";export type ZetaDropdownMenuItemType="icon"|"checkbox"|"radio";declare const ZetaDropdownMenuItem_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&import("../../../mixins/utils.js").Constructor<import("../../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/** A single row in a dropdown menu: a leading element, a label and an optional trailing icon. The row fills the menu's
 * width and keeps a fixed height; a long label widens the menu rather than wrapping. `selected` marks the chosen
 * option with a light brand tint. `type` checkbox or radio leads with the real control, checked when the row is
 * selected. The whole row is the click target: a checkbox row toggles and a radio row selects itself, clearing the
 * radio rows beside it. Inside a `zeta-droppable` the row takes the panel's `rounded`.
 *
 * @slot - Content of menu item; typically text.
 * @slot {zeta-icon} icon - A `zeta-icon` shown on the leading side. Not shown for `type` checkbox or radio.
 * @slot {zeta-icon} trailing - A `zeta-icon` at the trailing edge, such as a submenu arrow.
 * @event change - A checkbox or radio row's `selected` changed because the row was activated.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2364-5903
 * @storybook ?path=/docs/components-dropdown--docs
 */export declare class ZetaDropdownMenuItem extends ZetaDropdownMenuItem_base{
/** The row's option is currently chosen. */
selected:boolean;
/** What leads the row: the slotted icon, or a Checkbox or Radio Button that shows `selected`. */type:ZetaDropdownMenuItemType;constructor();private activate;key(e:KeyboardEvent,type:"down"|"up"):void;private renderLeading;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-dropdown-menu-item":ZetaDropdownMenuItem;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
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
 */"zeta-dropdown-menu-item":Partial<ZetaDropdownMenuItemProps&BaseProps&BaseEvents>}}}