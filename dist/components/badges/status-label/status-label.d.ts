import{ZetaStatusLabelProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import{type ZetaIconName}from"../../../icons.js";import"../../icon/icon.js";declare const ZetaStatusLabel_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Reports a read-only state on an item, such as Active or Overdue. `status` sets the fill, the border and the leading
 * element together while the label text holds one colour throughout, and `leading` decides whether the status also
 * shows as a dot, an icon or nothing. `discardable` adds the one control anywhere in the badge family, a dismiss that
 * removes the label rather than selecting it.
 *
 * Use `leading="icon"` where the status has to survive greyscale: the dot and the fill are colour alone.
 *
 * @slot - Text displayed on label.
 *
 * @part container - The top level div making up the component.
 * @part icon-container - Wrapper around the leading dot or icon.
 * @part text - The div wrapping the text of either the label or the slot.
 * @part discard - The dismiss button.
 *
 * @event {CustomEvent<ZetaCloseEventDetail>} close - Fired when the dismiss button is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6403-297
 * @storybook ?path=/docs/components-badges--docs
 */export declare class ZetaStatusLabel extends ZetaStatusLabel_base{
/** Type of status label.*/
status:"info"|"positive"|"warning"|"negative"|"neutral";
/** Text displayed on label.
 *
 * Can also be slotted.
 *
 * @defaultValue `undefined`. This will render a slot for text.
 *
 * If provided, it will override the slot.
 * */
label?:string;
/** A custom glyph for the leading icon. Leave unset to use the glyph fixed per status. @see {ZetaIconName}. */
icon?:ZetaIconName;
/** Whether to show the leading element. Superseded by `leading`, which takes precedence when set. */
showIcon:boolean;
/** The leading element: a dot, a glyph fixed per status, or nothing. Defaults from `showIcon` and `icon`. */
leading?:"indicator"|"icon"|"none";
/** Adds a dismiss button after the label. It removes the label rather than selecting it. */
discardable:boolean;
/** Accessible name for the dismiss button, saying what it removes. */
discardLabel:string;static styles:import("lit").CSSResultGroup[];private static readonly GLYPH;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-status-label":ZetaStatusLabel;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
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
 */"zeta-status-label":Partial<ZetaStatusLabelProps&BaseProps&BaseEvents>}}}