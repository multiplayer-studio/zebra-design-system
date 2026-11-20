import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../assist-chip/assist-chip.js";
import "../progress-circle/progress-circle.js";
import type { IconName } from "@zebra-design-system/icons/names";
import type { AssistChipColor } from "../assist-chip/assist-chip.js";
/** The spec's State values. Normally derived from what the person does; set `state` to pin one. */
export type MessageInputState = "empty" | "filled" | "attachment-open" | "listening" | "transcribing" | "dictated" | "recording" | "playback" | "speaking" | "disabled";
export type MessageAttachmentKind = "document" | "image" | "video" | "audio";
export interface MessageAttachment {
    id: string;
    file: File;
    kind: MessageAttachmentKind;
}
export interface MessageVoiceNote {
    blob: Blob;
    /** Length in milliseconds. */
    durationMs: number;
    /** Normalised 0–1 levels sampled while recording; drawn as the waveform. */
    peaks: number[];
}
export interface MessageSubmission {
    text: string;
    attachments: MessageAttachment[];
    voiceNote: MessageVoiceNote | null;
    /** The text came, at least in part, from dictation. */
    dictated: boolean;
    /** The sender wants the reply read aloud. */
    speakResponse: boolean;
}
export interface MessageInputAction {
    icon: IconName;
    label: string;
    onSelect: () => void;
}
/** Every string the composer shows or announces. The same keys as React's `messageInputStrings`. */
export declare const messageInputStrings: {
    addAttachments: string;
    closeAttachments: string;
    attachFile: string;
    takePhoto: string;
    recordVoiceMessage: string;
    dictate: string;
    stopAndTranscribe: string;
    stopRecording: string;
    send: string;
    readAloud: string;
    stopSpeaking: string;
    listening: string;
    transcribing: string;
    recording: string;
    playbackReady: string;
    listeningHint: string;
    transcribingHint: string;
    recordingHint: string;
    play: string;
    pause: string;
    recordAgain: string;
    deleteVoiceMessage: string;
    cancelDictation: string;
    cancelTranscription: string;
    discardRecording: string;
    replyingTo: string;
    cancelReply: string;
    dictated: string;
    undoDictation: string;
    attached: string;
    speaking: string;
    speakingText: string;
    micBlocked: string;
    recognitionError: string;
    transcribeError: string;
    tooManyAttachments: string;
    fileTooLarge: string;
    fileNotAccepted: string;
    characterCount: string;
};
export type MessageInputStrings = typeof messageInputStrings;
/** As React's `defaultAttachmentColor`: PDF red, spreadsheets green, documents blue, video orange. */
export declare const defaultAttachmentColor: (a: MessageAttachment) => AssistChipColor;
/**
 * A composer for conversational, AI-assisted surfaces: type, attach,
 * dictate, record a voice message, hear the reply.
 *
 * One state moves it between typing, dictation, voice recording and the
 * assistant speaking back, swapping the body region each time: Text, Voice
 * (listening, transcribing, recording, playback) or Speaking (an orb and the
 * caption, with no toolbar). The state follows what the person does; set
 * `state` to pin one of the spec's ten for docs and review.
 *
 * Attachment (the spec's subcomponent) is the toggle and its tray: the
 * toggle swaps add for close and takes the pressed ghost surface while open;
 * the tray holds file, camera, the `attachment-controls` slot, `actions` and
 * voice message. Files also arrive by drop and paste, through one gate that
 * applies `accept`, `max-attachments` and `max-file-bytes`. Recording uses
 * MediaRecorder; dictation uses the `transcribe` property or the browser's
 * speech recognition. Enter sends, Shift+Enter adds a line; Escape cancels a
 * live voice state or closes the tray. Kept in step with
 * packages/react-baseui `<MessageInput>`.
 *
 * @slot attachments - The Attachment File Slot: content above the text, after the files the composer holds.
 * @slot more-tools - The More Tools Slot: icon controls beside Attachment (zds-icon-button, size small, shape full, flavour subtle). Dropped while the tray is open and while listening.
 * @slot attachment-controls - The Attachment Control Slot: extra attachment types in the tray.
 * @fires zds-send - Sent. `detail` is a `MessageSubmission`.
 * @fires zds-input - The text changed. `detail.value`.
 * @fires zds-stop-speaking - Stop speaking was pressed.
 * @fires zds-speak-response-change - The read-aloud toggle changed. `detail.value`.
 * @fires zds-preview-attachment - An image chip was activated. `detail.attachment`.
 * @fires zds-cancel-reply - The Reply Bar was pressed. The whole bar is one button that cancels the reply.
 *
 * @spec specs/message-input/message-input.spec.json
 */
export declare class ZdsMessageInput extends LitElement {
    static styles: import("lit").CSSResult;
    /** The spec's state, reflected. Set it to pin a state; left unset it follows what the person does. */
    state: MessageInputState | null;
    placeholder: string;
    value: string;
    disabled: boolean;
    /** Accepted file types, as the picker's `accept`; applied to dropped and pasted files too. */
    accept: string | null;
    maxLength: number | null;
    maxAttachments: number | null;
    maxFileBytes: number | null;
    maxRecordingSeconds: number;
    maxDictationSeconds: number;
    /** Enter sends and Shift+Enter adds a line. Off, Enter only adds a line. */
    sendOnEnter: boolean;
    /** BCP 47 language for browser speech recognition. */
    lang: string;
    /** Shows the read-aloud toggle (not in the spec). */
    showReadAloud: boolean;
    /** The read-aloud toggle's value. */
    speakResponse: boolean;
    /** A reply is being read aloud: the orb, the caption and one stop control. */
    speaking: boolean;
    /** The reply being spoken, shown under the orb. */
    speakingText: string;
    /** Where the voice is in `speaking-text`, as a character offset. */
    speakingCharIndex: number | null;
    /** Loudness 0–1 driving the orb. Unset, the orb breathes on its own. */
    speakingLevel: number | null;
    /** Extra tray actions, after file and camera. */
    actions: MessageInputAction[];
    /** Turns a dictation recording into text. Without it, the browser's speech recognition is used. */
    transcribe: ((audio: Blob) => Promise<string>) | null;
    /** Replaces any of the composer's texts; see `messageInputStrings`. */
    strings: Partial<MessageInputStrings>;
    /** Assist Chip colour per attachment. */
    attachmentColor: (a: MessageAttachment) => AssistChipColor;
    /** The files held, e.g. a restored draft. */
    attachments: MessageAttachment[];
    /** A recorded take to start from. Opens in playback. */
    voiceNote: MessageVoiceNote | null;
    dictated: boolean;
    trayOpen: boolean;
    label: string;
    /** Who is being answered. Setting it shows the Reply Bar above the body (the spec's Show Reply). Not shown while speaking or disabled. */
    replyTo: string;
    /** The quoted line being answered. One line, truncated. */
    replyText: string;
    private mode;
    private elapsed;
    private levels;
    private error;
    private heard;
    private playing;
    private position;
    private dragging;
    private hasMoreTools;
    /** The state the person's actions produced; `state` pins over it. */
    private derived;
    private dictatedBefore;
    private dragDepth;
    private noteUrl;
    private media;
    private fileInput?;
    private cameraInput?;
    private audio?;
    private trayToggle?;
    private get S();
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues<this>): void;
    private get busy();
    private get hasContent();
    private get canSend();
    private get canAttach();
    private get canDictate();
    private get canRecord();
    private emit;
    private setText;
    private teardown;
    private meter;
    private startClock;
    private record;
    private stopRecorder;
    private startVoiceNote;
    private finishVoiceNote;
    private startDictation;
    private finishDictation;
    private landTranscript;
    private cancelVoice;
    private togglePlay;
    private discardNote;
    private reRecord;
    private addFiles;
    private draggingFiles;
    private onDragEnter;
    private onDragOver;
    private onDragLeave;
    private onDrop;
    private onPaste;
    /** Sends what the composer holds, as the Send control does. */
    send(): void;
    private onKeyDown;
    private wave;
    private renderSpeaking;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-message-input": ZdsMessageInput;
    }
}
//# sourceMappingURL=message-input.d.ts.map