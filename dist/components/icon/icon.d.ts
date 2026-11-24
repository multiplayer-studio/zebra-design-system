import{ZetaIconProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import{type ZetaIconName}from"../../icons.js";declare const ZetaIcon_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
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
 *
 * @cssproperty --icon-size The width/height of the icon
 * @cssproperty --icon-color The color of the icon
 * @cssproperty --icon-border-width The border width of the icon.
 * @cssproperty --icon-border-color The border color of the icon.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2046-15004
 * @slot {ZetaIconName} - Name of icon to be displayed. The names are those of the Zebra icon set, `@zebra-design-system/icons`. If this value and the name prop are both populated, the name prop will take precedence.
 */export declare class ZetaIcon extends ZetaIcon_base{
/** Name of icon to be displayed. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
 *
 * If this value and the slot are both populated, this will take precedence.
 */
name:ZetaIconName;
/** Size of the glyph: xsmall (12px), small (16px), medium (20px) or large (28px). Unset, the icon keeps `--icon-size` or 24px. */
size?:"xsmall"|"small"|"medium"|"large";
/** Pads the glyph to a fixed box, 40px (24px at xsmall), so it meets the minimum touch target on its own. Adds space, nothing visible. */
framed:boolean;
/** The glyph for a name placed in the slot, directly or forwarded through another component's slot. */private slottedGlyph?;private observer?;connectedCallback():void;disconnectedCallback():void;protected firstUpdated():void;
/**
 * Reads the name that reaches the slot. A component such as Icon Button forwards its own slot into this one, so the
 * name is read from what the slot finally holds, not from this element's children.
 */private readSlot;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-icon":ZetaIcon;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
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
 */"zeta-icon":Partial<ZetaIconProps&BaseProps&BaseEvents>}}}