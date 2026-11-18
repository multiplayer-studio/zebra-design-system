import{ZetaChatThreadProps,ZetaChatPhotosProps,ZetaChatAttachmentProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../icon/icon.js";import"../divider/divider.js";import"../button/icon-button/icon-button.js";
/** "X replies", a divider and a caret; pressing it expands the replies in place, pushing the messages below down.
 *
 * @slot - The Thread Slot: reply messages, each a zeta-chat-message.
 * @event {CustomEvent<{ open: boolean }>} toggle - Fired when the thread opens or closes.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8440-34713
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */export declare class ZetaChatThread extends LitElement{
/** How many replies the thread holds. */
replyCount:number;
/** Expanded, showing the replies. */
open:boolean;
/** The word after the count. */
repliesText:string;
/** The word after a count of one. */
replyText:string;private get noun();private toggle;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare const ZetaChatPhotos_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Photos grouped as one grid: one full width, two equal tiles, or one large tile beside two stacked, the last
 * counting what does not fit. `count` is derived from `photos`.
 *
 * @event {CustomEvent<{ index: number }>} open - Fired when a photo is activated, when `clickable`.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19282
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */export declare class ZetaChatPhotos extends ZetaChatPhotos_base{
/** Image URLs. Up to three show; the rest are counted on the last tile. */
photos:string[];
/** Placeholder glyph while a tile has no image. */
showIcon:boolean;
/** Photos open on activation. */
clickable:boolean;
/** Derived from `photos`. */
count:"1"|"2"|"3"|"more";protected willUpdate(changed:PropertyValues<this>):void;private tile;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare const ZetaChatAttachment_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A file tile with a download control, a video preview, or an audio waveform, in a message's attachments. Playback
 * is real when `src` is set; a playing video keeps a pause control (spec issue, as intended).
 *
 * @event {CustomEvent} download - Fired when Download is pressed on a file with no `src`.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19335
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */export declare class ZetaChatAttachment extends ZetaChatAttachment_base{
/** file, video or audio. */type:"file"|"video"|"audio";
/** The file's name. */
fileName:string;
/** Type and size, e.g. "PDF · 248 KB". */
fileMeta:string;
/** Media length, e.g. "0:08". */
duration:string;
/** Media or file URL. */
src:string;
/** Video poster image. */
poster:string;
/** Placeholder glyph while there is no poster. */
showIcon:boolean;
/** Playing, reflected. */
playing:boolean;private progress;private elapsed;private media?;private toggle;private onTime;private download;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-chat-thread":ZetaChatThread;"zeta-chat-photos":ZetaChatPhotos;"zeta-chat-attachment":ZetaChatAttachment;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
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
 */"zeta-chat-thread":Partial<ZetaChatThreadProps&BaseProps&BaseEvents>
/**
 * Photos grouped as one grid: one full width, two equal tiles, or one large tile beside two stacked, the last
 * counting what does not fit. `count` is derived from `photos`.
 * ---
 *
 *
 * ### **Events:**
 *  - **open** - Fired when a photo is activated, when `clickable`.
 */"zeta-chat-photos":Partial<ZetaChatPhotosProps&BaseProps&BaseEvents>
/**
 * A file tile with a download control, a video preview, or an audio waveform, in a message's attachments. Playback
 * is real when `src` is set; a playing video keeps a pause control (spec issue, as intended).
 * ---
 *
 *
 * ### **Events:**
 *  - **download** - Fired when Download is pressed on a file with no `src`.
 */"zeta-chat-attachment":Partial<ZetaChatAttachmentProps&BaseProps&BaseEvents>}}}