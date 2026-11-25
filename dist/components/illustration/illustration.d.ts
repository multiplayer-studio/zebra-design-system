import{ZetaIllustrationProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";export declare const ZetaIllustrationNamesList:string[];export type ZetaIllustrationNames="addDevice"|"emptyBox"|"welcomeNav"|"helpChat"|"taskZebra"|"sadZebra"|"search"|"boxEmpty"|"calendar"|"loadFailure"|"serverDisconnect"|"internet1"|"internet2"|"internet3"|"zebraSad"|"zebraHidden"|"zebraRelaxed"|"zebraHappy"|"zebraNeutral"|"zebraThumbsUp"|"login"|"warning"|"welcome";
/**
 * Graphical illustrations are used for visual representation.
 *
 * We recommend using the provided illustrations for consistency, but if required, the src can be set to any image.
 */export declare class ZetaIllustration extends LitElement{static styles:import("lit").CSSResult;
/** The name of the illustration. */
name?:ZetaIllustrationNames;
/** (Optional) alt text for the icons. Defaults to the illustration name. */
alt?:string;
/** The base path of zeta-web components. */
basePath:string;
/** Overrides the source path of the illustration. */
src?:string;getIllustrationPath:()=>string;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-illustration":ZetaIllustration;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Graphical illustrations are used for visual representation.
 *
 * We recommend using the provided illustrations for consistency, but if required, the src can be set to any image.
 * ---
 *
 */"zeta-illustration":Partial<ZetaIllustrationProps&BaseProps&BaseEvents>}}}