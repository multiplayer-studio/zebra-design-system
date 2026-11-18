import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import { type AssistChipColor } from "../assist-chip/AssistChip.js";
import "../button/button.css";
import "./message-input.css";
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
/**
 * Every string the composer shows or announces, so a product can localise it.
 * `{time}`, `{name}`, `{count}`, `{size}`, `{max}` and `{text}` are filled in.
 */
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
/** The spec's State values. Normally derived from what the person does; pass `state` to pin one. */
export type MessageInputState = "empty" | "filled" | "attachment-open" | "listening" | "transcribing" | "dictated" | "recording" | "playback" | "speaking" | "disabled";
/** @deprecated Use `state`. A voice state to render without touching the microphone. */
export type MessageInputPreview = "listening" | "transcribing" | "recording";
export interface MessageInputProps {
    /** Called with everything the message carries. The input clears afterwards. */
    onSend?: (message: MessageSubmission) => void;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    defaultAttachments?: MessageAttachment[];
    /** A recorded voice message to start from, e.g. a restored draft. Opens in playback. */
    defaultVoiceNote?: MessageVoiceNote | null;
    /** Start with the dictated tag shown (the text came from dictation). */
    defaultDictated?: boolean;
    /** Start with the attachment tray open. */
    defaultTrayOpen?: boolean;
    /** Accepted file types — the picker's `accept`, applied to dropped and pasted files too. */
    accept?: string;
    /** Extra tray actions after file, camera and voice message — a sticker or note picker, say. */
    extraActions?: MessageInputAction[];
    /** Longest voice message, in seconds. */
    maxRecordingSeconds?: number;
    /** Longest dictation, in seconds; the recording stops and transcribes itself at the limit. */
    maxDictationSeconds?: number;
    /** Longest message text. A counter appears near the limit. */
    maxLength?: number;
    /** Most files on one message. Extra drops are refused with a message. */
    maxAttachments?: number;
    /** Largest file, in bytes. Bigger files are refused with a message. */
    maxFileBytes?: number;
    /** Enter sends and Shift+Enter adds a line (the default). Off, Enter only adds a line — for surfaces where typing happens on an on-screen keyboard. */
    sendOnEnter?: boolean;
    /** Replaces any of the composer's texts — see `messageInputStrings` for the keys and defaults. */
    strings?: Partial<MessageInputStrings>;
    /** Assist Chip colour per attachment. Defaults to PDF red, spreadsheets green, documents blue, video orange, everything else neutral. */
    attachmentColor?: (attachment: MessageAttachment) => AssistChipColor;
    /**
     * Called when an image attachment's thumbnail is activated — the place to
     * open a lightbox. Without it, thumbnails are not clickable.
     */
    onPreviewAttachment?: (attachment: MessageAttachment) => void;
    /**
     * Turns a dictation recording into text. Without it, dictation uses the
     * browser's speech recognition where there is one; with neither, the
     * microphone control is not shown.
     */
    transcribe?: (audio: Blob) => Promise<string>;
    /** BCP 47 language for browser speech recognition. */
    lang?: string;
    /** "Read replies aloud" toggle. Omit both to hide the toggle. */
    speakResponse?: boolean;
    defaultSpeakResponse?: boolean;
    onSpeakResponseChange?: (on: boolean) => void;
    /**
     * A reply is being read aloud. The composer gives way to a glowing orb
     * that swells with the speech, and a single stop control.
     */
    speaking?: boolean;
    onStopSpeaking?: () => void;
    /**
     * What the orb listens to while speaking: the `<audio>` / `<video>`
     * element or the MediaStream the reply plays through. Its loudness drives
     * the orb. An element's output is routed through Web Audio once and
     * stays audible.
     */
    speakingSource?: HTMLMediaElement | MediaStream | null;
    /**
     * Loudness 0–1, for speech the component can't hear (e.g. the browser's
     * speechSynthesis, which exposes no audio). Ignored when `speakingSource`
     * is set. With neither, the orb breathes on its own.
     */
    speakingLevel?: number;
    /** The reply being read aloud, shown under the orb as it is spoken. */
    speakingText?: string;
    /**
     * Where the voice is in `speakingText`, as a character offset — e.g.
     * `charIndex` from speechSynthesis `boundary` events. Without it, an
     * HTMLMediaElement `speakingSource` gives the position from its playback
     * time; with neither, the whole text shows at once.
     */
    speakingCharIndex?: number;
    /**
     * Pins one of the spec's states, for docs and visual review, without
     * touching the microphone. Left unset, the state follows what the person
     * does. `filled` needs a value; `playback` uses a sample take when there
     * is no `defaultVoiceNote`.
     */
    state?: MessageInputState;
    /** @deprecated Use `state`. */
    preview?: MessageInputPreview;
    /**
     * The Attachment File Slot: extra content above the text, after the
     * attachments the composer holds itself. Shown on filled and
     * attachment-open.
     */
    attachmentSlot?: React.ReactNode;
    /**
     * The More Tools Slot: icon controls beside Attachment, at the toolbar's
     * size (IconButton, Size small, Shape full, Flavour subtle). Dropped
     * while the tray is open and while listening.
     */
    moreTools?: React.ReactNode;
    disabled?: boolean;
    "aria-label"?: string;
    className?: string;
}
/** Colour marks the kind of file (Assist Chip spec "Colour overrides"): PDF red, spreadsheets green, documents blue, video orange (as the Figma attachment state). */
export declare const defaultAttachmentColor: (a: MessageAttachment) => AssistChipColor;
export interface MessageThumbnailProps {
    /** The image file: the picture drawn and the name shown. */
    file: File;
    /**
     * Called when the picture or name is activated — the place to open a
     * lightbox or preview. Without it, they are inert and only the remove
     * control is interactive.
     */
    onClick?: () => void;
    /** Called when the remove control is activated. Removing it is the caller's job. */
    onDiscard?: () => void;
    /** Accessible name of the remove control. Defaults to "Remove <file name>". */
    discardLabel?: string;
    className?: string;
}
/**
 * An image attachment as a thumbnail chip — Message Input's own subcomponent.
 * Built on the chip base (same 28px height, inset border, focus ring and
 * remove control as Assist Chip) but a rounded rectangle rather than a pill,
 * with the picture inset by a hair of padding and the name kept short by
 * truncation (the picture carries the identity; the full name is the title).
 */
export declare const MessageThumbnail: React.ForwardRefExoticComponent<MessageThumbnailProps & React.RefAttributes<HTMLSpanElement>>;
/**
 * A composer for conversational, AI-assisted surfaces: type, attach,
 * dictate, record a voice message, hear the reply.
 *
 * States, from the spec: empty, filled, attachment-open,
 * listening → transcribing → dictated (voice prompt), recording → playback
 * (voice message), plus speaking when a reply is being read aloud. One bar
 * above the toolbar carries whichever of listening, transcribing, recording
 * or playback is live, with a hint line under it. Speaking replaces the
 * whole composer with an orb that reacts to the speech and one stop button.
 *
 * Behaviour: buttons are IconButton (Base UI Button), the read-aloud control
 * an IconButton with aria-pressed, and chips are AssistChip — an image file
 * renders as MessageThumbnail, this component's own thumbnail chip.
 * Recording uses MediaRecorder and an AnalyserNode
 * for the live waveform; dictation uses the `transcribe` prop or the
 * browser's speech recognition, shows the words as they land, and stops
 * itself at `maxDictationSeconds`. Files arrive through the tray, drag and
 * drop, or paste, through one gate that applies `accept`, `maxAttachments`
 * and `maxFileBytes`, refusing with a message on the error row. Enter sends
 * and Shift+Enter adds a line (`sendOnEnter`); Escape cancels a live voice
 * state or closes the tray. Every string is replaceable through `strings`.
 * Everything visual comes from the token layer via `message-input.css`.
 *
 * The spec's Attachment subcomponent is the tray toggle plus the tray: the
 * toggle swaps add for close and takes the pressed surface while open, and
 * the tray holds the attachment types (file, camera, `extraActions`, voice
 * message). The read-aloud toggle is an addition the spec does not draw.
 *
 * @spec specs/message-input/message-input.spec.json
 */
export declare const MessageInput: React.ForwardRefExoticComponent<MessageInputProps & React.RefAttributes<HTMLDivElement>>;
