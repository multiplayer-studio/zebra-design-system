import{ZetaMessageInputProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../button/icon-button/icon-button.js";import"../chips/assist-chip/assist-chip.js";import"../progress-indicators/progress-circle/progress-circle.js";import type{ZetaIconName}from"@zebra-fed/zeta-icons";type IconName=ZetaIconName;
/** Assist Chip's colours, as `zeta-assist-chip` takes them. */export type AssistChipColor="neutral"|"green"|"orange"|"blue"|"red";
/** The spec's State values. Normally derived from what the person does; set `state` to pin one. */export type MessageInputState="empty"|"filled"|"attachment-open"|"listening"|"transcribing"|"dictated"|"recording"|"playback"|"speaking"|"disabled";export type MessageAttachmentKind="document"|"image"|"video"|"audio";export interface MessageAttachment{id:string;file:File;kind:MessageAttachmentKind;}export interface MessageVoiceNote{blob:Blob;
/** Length in milliseconds. */
durationMs:number;
/** Normalised 0–1 levels sampled while recording; drawn as the waveform. */
peaks:number[];}export interface MessageSubmission{text:string;attachments:MessageAttachment[];voiceNote:MessageVoiceNote|null;
/** The text came, at least in part, from dictation. */
dictated:boolean;
/** The sender wants the reply read aloud. */
speakResponse:boolean;}export interface MessageInputAction{icon:IconName;label:string;onSelect:()=>void;}
/** Every string the composer shows or announces. The same keys as React's `messageInputStrings`. */export declare const messageInputStrings:{addAttachments:string;closeAttachments:string;attachFile:string;takePhoto:string;recordVoiceMessage:string;dictate:string;stopAndTranscribe:string;stopRecording:string;send:string;readAloud:string;stopSpeaking:string;listening:string;transcribing:string;recording:string;playbackReady:string;listeningHint:string;transcribingHint:string;recordingHint:string;play:string;pause:string;recordAgain:string;deleteVoiceMessage:string;cancelDictation:string;cancelTranscription:string;discardRecording:string;dictated:string;undoDictation:string;attached:string;speaking:string;speakingText:string;micBlocked:string;recognitionError:string;transcribeError:string;tooManyAttachments:string;fileTooLarge:string;fileNotAccepted:string;characterCount:string;};export type MessageInputStrings=typeof messageInputStrings;
/** As React's `defaultAttachmentColor`: PDF red, spreadsheets green, documents blue, video orange. */export declare const defaultAttachmentColor:(a:MessageAttachment)=>AssistChipColor;
/** A composer for conversational, AI-assisted surfaces: type, attach, dictate, record a voice message, hear the
 * reply. One state moves it between typing, dictation, voice recording and the assistant speaking back, swapping the
 * body region each time: Text, Voice (listening, transcribing, recording, playback) or Speaking (an orb and the
 * caption, with no toolbar). The state follows what the person does; set `state` to pin one of the spec's ten.
 *
 * Attachment (the spec's subcomponent) is the toggle and its tray: the toggle swaps add for close and takes the pressed
 * ghost surface while open; the tray holds file, camera, the `attachment-controls` slot, `actions` and voice message.
 * Files also arrive by drop and paste, through one gate that applies `accept`, `maxAttachments` and `maxFileBytes`.
 * Recording uses MediaRecorder; dictation uses the `transcribe` property or the browser's speech recognition. Enter
 * sends, Shift+Enter adds a line; Escape cancels a live voice state or closes the tray.
 *
 * @slot attachments - The Attachment File Slot: content above the text, after the files the composer holds.
 * @slot more-tools - The More Tools Slot: icon controls beside Attachment (`zeta-icon-button`, size small, shape full,
 * flavor subtle). Dropped while the tray is open and while listening.
 * @slot attachment-controls - The Attachment Control Slot: extra attachment types in the tray.
 * @event {CustomEvent<MessageSubmission>} send - Fired when the message is sent.
 * @event {CustomEvent<{ value: string }>} change - Fired when the text changes.
 * @event {CustomEvent} stopspeaking - Fired when Stop speaking is pressed.
 * @event {CustomEvent<{ value: boolean }>} speakresponsechange - Fired when the read-aloud toggle changes.
 * @event {CustomEvent<{ attachment: MessageAttachment }>} previewattachment - Fired when an image chip is activated.
 * @part root - The composer surface.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6649-196
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-message-input--docs
 */export declare class ZetaMessageInput extends LitElement{static styles:import("lit").CSSResult[];
/** The spec's state, reflected. Set it to pin a state; left unset it follows what the person does. */
state:MessageInputState|null;placeholder:string;value:string;disabled:boolean;
/** Accepted file types, as the picker's `accept`; applied to dropped and pasted files too. */
accept:string|null;maxLength:number|null;maxAttachments:number|null;maxFileBytes:number|null;maxRecordingSeconds:number;maxDictationSeconds:number;
/** Enter sends and Shift+Enter adds a line. Off, Enter only adds a line. */
sendOnEnter:boolean;
/** BCP 47 language for browser speech recognition. */
lang:string;
/** Shows the read-aloud toggle (not in the spec). */
showReadAloud:boolean;
/** The read-aloud toggle's value. */
speakResponse:boolean;
/** A reply is being read aloud: the orb, the caption and one stop control. */
speaking:boolean;
/** The reply being spoken, shown under the orb. */
speakingText:string;
/** Where the voice is in `speaking-text`, as a character offset. */
speakingCharIndex:number|null;
/** Loudness 0–1 driving the orb. Unset, the orb breathes on its own. */
speakingLevel:number|null;
/** Extra tray actions, after file and camera. */
actions:MessageInputAction[];
/** Turns a dictation recording into text. Without it, the browser's speech recognition is used. */
transcribe:((audio:Blob)=>Promise<string>)|null;
/** Replaces any of the composer's texts; see `messageInputStrings`. */
strings:Partial<MessageInputStrings>;
/** Assist Chip colour per attachment. */
attachmentColor:(a:MessageAttachment)=>AssistChipColor;
/** The files held, e.g. a restored draft. */
attachments:MessageAttachment[];
/** A recorded take to start from. Opens in playback. */
voiceNote:MessageVoiceNote|null;dictated:boolean;trayOpen:boolean;label:string;private mode;private elapsed;private levels;private error;private heard;private playing;private position;private dragging;private hasMoreTools;
/** The state the person's actions produced; `state` pins over it. */private derived;private dictatedBefore;private dragDepth;private noteUrl;private media;private fileInput?;private cameraInput?;private audio?;private trayToggle?;private get S();disconnectedCallback():void;protected willUpdate(changed:PropertyValues<this>):void;private get busy();private get hasContent();private get canSend();private get canAttach();private get canDictate();private get canRecord();private emit;private setText;private teardown;private meter;private startClock;private record;private stopRecorder;private startVoiceNote;private finishVoiceNote;private startDictation;private finishDictation;private landTranscript;private cancelVoice;private togglePlay;private discardNote;private reRecord;private addFiles;private draggingFiles;private onDragEnter;private onDragOver;private onDragLeave;private onDrop;private onPaste;
/** Sends what the composer holds, as the Send control does. */
send():void;private onKeyDown;private wave;private renderSpeaking;protected render():import("lit-html").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-message-input":ZetaMessageInput;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
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
 */"zeta-message-input":Partial<ZetaMessageInputProps&BaseProps&BaseEvents>}}}