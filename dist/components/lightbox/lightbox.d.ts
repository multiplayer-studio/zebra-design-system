import{ZetaLightboxProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../scrim/scrim.js";import"../icon/icon.js";import"../button/icon-button/icon-button.js";export type LightboxKind="image"|"video"|"pdf"|"other";export interface LightboxItem{
/** Where the content lives: a URL, or a File (an object URL is made and revoked). One of the two. */
src?:string;file?:File;
/** The name in the toolbar and on the download. Defaults to the file's name, or the URL's last segment. */
name?:string;
/** MIME type, when neither the file nor the name can say. */type?:string;}
/** What the item is, from its MIME type first and its name's extension second (spec: Kind is derived, never set). */export declare const lightboxKindOf:(item:LightboxItem)=>LightboxKind;declare const ZetaLightbox_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&import("../../mixins/utils.js").Constructor<{returnValue:string;open:boolean;hide:(returnValue?:string)=>Promise<void>;show:()=>Promise<void>;showModal:()=>Promise<void>;onBarrierClicked:(e:Event)=>void;closeOnBarrierClicked:boolean;}&LitElement>&typeof LitElement;
/** A full-size preview over the page: images, videos and PDFs render themselves; anything else shows a drawn file
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
 *
 * @event {CustomEvent<{ index: number }>} change - Fired when paging changes the current item.
 * @event {CustomEvent<ZetaPopupEventDetail>} open - Fired when the lightbox is opened.
 * @event {Event} close - Fired when the lightbox is closed.
 *
 * @part dialog - The panel.
 * @part stage - The media well.
 *
 * @cssproperty --lightbox-width - Width of the panel. Defaults to control/lg x 16, capped at the viewport less space/page each side.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8186-337
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-lightbox--docs
 */export declare class ZetaLightbox extends ZetaLightbox_base{
/** The items being previewed. One is fine; the navigation then hides itself. */
items:LightboxItem[];
/** Which item shows. */
index:number;
/** The open-in-a-new-tab control. */
showOpenInNew:boolean;
/** The download control. */
showDownload:boolean;
/** The previous / next controls and arrow keys. Hidden anyway with one item. */
showNavigation:boolean;
/** Slide between frames when paging. On by default; it always yields to the reduced-motion preference. */
animated:boolean;
/** Accessible name of the close control. */
closeLabel:string;
/** Accessible name of the open-in-a-new-tab control. */
openInNewLabel:string;
/** Accessible name of the download control. */
downloadLabel:string;
/** Accessible name of the previous control. */
previousLabel:string;
/** Accessible name of the next control. */
nextLabel:string;
/** The counter text; {index} and {count} are replaced. */
counterFormat:string;
/** The message on the drawn file sheet for an unpreviewable item. */
noPreviewText:string;
/** The toolbar name when an item carries none. */
untitledText:string;
/** Whether the lightbox is initially open (in flow, not modal), for documentation and screenshots. */
initialOpen:boolean;private stageHeight;private settled;private settleFrame;private urls;constructor();disconnectedCallback():void;private urlFor;private revokeAll;private get paging();private setIndex;private readonly onKeydown;private readonly onMediaSized;protected updated(changed:PropertyValues<this>):void;
/** The stage takes the current frame's height. Never trust the first measure. */private measure;private readonly openInNew;private readonly download;private renderMedia;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-lightbox":ZetaLightbox;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
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
 */"zeta-lightbox":Partial<ZetaLightboxProps&BaseProps&BaseEvents>}}}