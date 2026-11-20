import{ZetaFileIndicatorProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import type{ZetaIconName}from"@zebra-fed/zeta-icons";import"../icon/icon.js";declare const ZetaFileIndicator_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** The file's badge in an upload item: a surface/shade tile carrying the extension, a "?" for an unknown type, or a
 * glyph. Decorative: the row names the file.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8416-636
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-file-upload--docs
 */export declare class ZetaFileIndicator extends ZetaFileIndicator_base{
/** extension: the badge reads `extension`; unknown: a fixed "?"; icon: a glyph instead of text. */type:"extension"|"unknown"|"icon";
/** The file's extension, four letters at most. */
extension:string;
/** The glyph on the icon type. */
icon:ZetaIconName;connectedCallback():void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-file-indicator":ZetaFileIndicator;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The file's badge in an upload item: a surface/shade tile carrying the extension, a "?" for an unknown type, or a
 * glyph. Decorative: the row names the file.
 * ---
 *
 */"zeta-file-indicator":Partial<ZetaFileIndicatorProps&BaseProps&BaseEvents>}}}