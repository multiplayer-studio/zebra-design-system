import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon, type IconName } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { AssistChip, type AssistChipColor } from "../assist-chip/AssistChip.js";
import { ProgressCircle } from "../progress-circle/ProgressCircle.js";
import { cx } from "../chip/chip.js";
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
export const messageInputStrings = {
  addAttachments: "Add attachments",
  closeAttachments: "Close attachments",
  attachFile: "Attach a file",
  takePhoto: "Take a photo",
  recordVoiceMessage: "Record a voice message",
  dictate: "Dictate",
  stopAndTranscribe: "Stop and transcribe",
  stopRecording: "Stop recording",
  send: "Send",
  readAloud: "Read replies aloud",
  stopSpeaking: "Stop speaking",
  listening: "Listening…",
  transcribing: "Transcribing…",
  recording: "Recording",
  playbackReady: "Voice message ready to play",
  listeningHint: "Speak naturally. Tap Stop when you're done.",
  transcribingHint: "Usually takes a second or two.",
  recordingHint: "Up to {time}. You can listen back before sending.",
  play: "Play voice message",
  pause: "Pause",
  recordAgain: "Record again",
  deleteVoiceMessage: "Delete voice message",
  cancelDictation: "Cancel dictation",
  cancelTranscription: "Cancel transcription",
  discardRecording: "Discard recording",
  dictated: "Dictated",
  undoDictation: "Undo dictation",
  attached: "Attached",
  speaking: "Speaking the reply",
  speakingText: "Speaking: {text}",
  micBlocked: "Microphone access was blocked. Allow it in the browser to use voice.",
  recognitionError: "Speech recognition stopped. Try again.",
  transcribeError: "Couldn't transcribe that. Try again.",
  tooManyAttachments: "You can attach up to {count} files.",
  fileTooLarge: "{name} is over the {size} limit.",
  fileNotAccepted: "{name} isn't a supported file type.",
  characterCount: "{count} of {max} characters",
};
export type MessageInputStrings = typeof messageInputStrings;

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
const formatBytes = (n: number) =>
  n >= 1024 * 1024 ? `${Math.round((n / (1024 * 1024)) * 10) / 10} MB` : `${Math.round(n / 1024)} KB`;
/** The same test the file picker's `accept` applies: extensions, exact types and `type/*`. */
const matchesAccept = (f: File, accept?: string) => {
  if (!accept) return true;
  const type = f.type.toLowerCase();
  const name = f.name.toLowerCase();
  return accept.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean).some((t) =>
    t.startsWith(".") ? name.endsWith(t) : t.endsWith("/*") ? type.startsWith(t.slice(0, -1)) : type === t);
};

/** The spec's State values. Normally derived from what the person does; pass `state` to pin one. */
export type MessageInputState =
  | "empty" | "filled" | "attachment-open" | "listening" | "transcribing" | "dictated"
  | "recording" | "playback" | "speaking" | "disabled";
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

type Mode = "compose" | "listening" | "transcribing" | "recording" | "playback";

type SpeechRecognitionLike = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onend: (() => void) | null; onerror: (() => void) | null;
  start: () => void; stop: () => void; abort: () => void;
};
const getRecognition = (): (new () => SpeechRecognitionLike) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as (new () => SpeechRecognitionLike) | null;
};

const kindOf = (f: File): MessageAttachmentKind =>
  f.type.startsWith("image/") ? "image" : f.type.startsWith("video/") ? "video" : f.type.startsWith("audio/") ? "audio" : "document";
const KIND_ICON: Record<MessageAttachmentKind, IconName> = { document: "document", image: "camera", video: "video", audio: "audio" };
/** Colour marks the kind of file (Assist Chip spec "Colour overrides"): PDF red, spreadsheets green, documents blue, video orange (as the Figma attachment state). */
export const defaultAttachmentColor = (a: MessageAttachment): AssistChipColor => {
  const ext = a.file.name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "red";
  if (["xls", "xlsx", "csv", "numbers", "ods"].includes(ext)) return "green";
  if (["doc", "docx", "txt", "rtf", "pages", "odt", "md"].includes(ext)) return "blue";
  if (a.kind === "video") return "orange";
  return "neutral";
};
const clock = (ms: number) => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
let uid = 0;
const newId = () => `att-${Date.now().toString(36)}-${uid++}`;
const BARS = 9;
const SAMPLE_LEVELS = [0.35, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.65, 0.3];
/** A silent take for `state="playback"`, so the state renders without a recording. */
const SAMPLE_NOTE: MessageVoiceNote = {
  blob: new Blob([], { type: "audio/webm" }), durationMs: 4000,
  peaks: [0.3, 0.8, 0.35, 0.45, 0.55, 0.85, 0.7, 0.5, 0.35, 0.45, 0.95, 0.4, 0.7, 0.3, 0.65, 0.5, 0.9, 0.55, 0.4, 0.5, 0.6, 0.95, 0.45, 0.5],
};

/** Bars drawn in currentColor. `progress` 0–1 dims the unplayed part. */
function Waveform({ levels, progress, className }: { levels: number[]; progress?: number; className?: string }) {
  return (
    <span className={["zds-message-input__wave", className].filter(Boolean).join(" ")} aria-hidden="true">
      {levels.map((l, i) => (
        <span key={i} className="zds-message-input__level"
          data-played={progress === undefined || i / levels.length < progress ? "" : undefined}
          style={{ "--zds-bar-level": Math.max(0.15, Math.min(1, l)) } as React.CSSProperties} />
      ))}
    </span>
  );
}

// One AudioContext for every orb, and one source node per media element:
// createMediaElementSource may only ever be called once per element, and
// takes over its output, so the source is kept and wired to the speakers.
let sharedCtx: AudioContext | null = null;
const elementSources = new WeakMap<HTMLMediaElement, MediaElementAudioSourceNode>();

/** Calls `onLevel` with the source's loudness (0–1) every frame. Returns a stop function. */
function listenTo(source: HTMLMediaElement | MediaStream, onLevel: (level: number) => void): () => void {
  if (typeof window === "undefined" || typeof AudioContext === "undefined") return () => {};
  const ctx = (sharedCtx ??= new AudioContext());
  void ctx.resume().catch(() => {});
  let node: AudioNode;
  if (source instanceof MediaStream) {
    node = ctx.createMediaStreamSource(source);
  } else {
    let s = elementSources.get(source);
    if (!s) { s = ctx.createMediaElementSource(source); s.connect(ctx.destination); elementSources.set(source, s); }
    node = s;
  }
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  node.connect(analyser);
  const data = new Uint8Array(analyser.fftSize);
  let smoothed = 0, sent = -1, raf = 0;
  const tick = () => {
    raf = 0;
    // A paused media element has nothing to measure: stop until it plays.
    if (!(source instanceof MediaStream) && source.paused) { smoothed = 0; if (sent !== 0) onLevel((sent = 0)); return; }
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (const v of data) { const x = (v - 128) / 128; sum += x * x; }
    const rms = Math.min(1, Math.sqrt(sum / data.length) * 4);
    // Rise fast, fall slowly, so the orb swells on a syllable and eases back.
    smoothed = rms > smoothed ? smoothed + (rms - smoothed) * 0.6 : smoothed + (rms - smoothed) * 0.12;
    // Only write when the level visibly moves, so silence restyles nothing.
    if (Math.abs(smoothed - sent) > 0.004) onLevel((sent = smoothed));
    raf = requestAnimationFrame(tick);
  };
  const resume = () => { if (!raf) tick(); };
  if (!(source instanceof MediaStream)) source.addEventListener("play", resume);
  tick();
  return () => {
    cancelAnimationFrame(raf);
    if (!(source instanceof MediaStream)) source.removeEventListener("play", resume);
    try { node.disconnect(analyser); } catch { /* already gone */ }
    if (source instanceof MediaStream) node.disconnect();
    onLevel(0);
  };
}

/**
 * The speaking orb: outlined rings in the brand gradient, no fill. Each ring
 * has its own shape, tilt and slow spin (CSS, keyed off --ring), and swells
 * by its own amount with --zds-orb-level, so louder speech pulls them apart.
 *
 * Each ring is its own <svg>, with its tilt and resting size drawn into the
 * ellipse, so the spin and the swell are CSS `rotate` / `scale` on an element
 * the compositor can move: an idle orb costs no paint per frame.
 */
const RINGS = [
  { rx: 44, ry: 44 }, { rx: 46, ry: 30 }, { rx: 30, ry: 46 },
  { rx: 42, ry: 36 }, { rx: 38, ry: 44 }, { rx: 46, ry: 40 },
];
const Orb = React.forwardRef<HTMLSpanElement, { reactive: boolean }>(function Orb({ reactive }, ref) {
  const gid = `${React.useId()}-orb`;
  return (
    <span ref={ref} className="zds-message-input__orb" data-reactive={reactive || undefined} aria-hidden="true">
      {RINGS.map((r, i) => (
        <svg key={i} viewBox="0 0 100 100" className="zds-message-input__ring" style={{ "--ring": i } as React.CSSProperties}>
          <defs>
            <linearGradient id={`${gid}-${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" className="zds-message-input__orb-stop-start" />
              <stop offset="1" className="zds-message-input__orb-stop-end" />
            </linearGradient>
          </defs>
          {/* Tilt 30° per ring; inner rings rest smaller (0.7 + 0.05 per ring). */}
          <ellipse cx="50" cy="50" rx={r.rx} ry={r.ry} stroke={`url(#${gid}-${i})`}
            transform={`rotate(${i * 30} 50 50) translate(50 50) scale(${0.7 + i * 0.05}) translate(-50 -50)`} />
        </svg>
      ))}
    </span>
  );
});

const wordsOf = (text: string) => {
  const out: { word: string; start: number }[] = [];
  const re = /\S+/g;
  for (let m; (m = re.exec(text)); ) out.push({ word: m[0], start: m.index });
  return out;
};
const wordAt = (words: { start: number }[], char: number) => {
  let i = -1;
  while (i + 1 < words.length && words[i + 1].start <= char) i++;
  return i;
};

/**
 * The reply, word by word: a word fades in as it is spoken and fades away
 * as the voice moves on; three lines show, older ones fading out at the top.
 */
function SpokenCaption({ text, charIndex, media }: { text: string; charIndex?: number; media: HTMLMediaElement | null }) {
  const words = React.useMemo(() => wordsOf(text), [text]);
  const [fromMedia, setFromMedia] = React.useState(-1);
  React.useEffect(() => {
    if (charIndex !== undefined || !media) return;
    // Follow playback every frame while it plays; idle while paused.
    let raf = 0;
    const read = () => { if (media.duration > 0) setFromMedia(wordAt(words, (media.currentTime / media.duration) * text.length)); };
    const tick = () => { read(); raf = media.paused ? 0 : requestAnimationFrame(tick); };
    const start = () => { if (!raf) tick(); };
    media.addEventListener("play", start);
    media.addEventListener("seeked", read);
    tick();
    return () => { cancelAnimationFrame(raf); media.removeEventListener("play", start); media.removeEventListener("seeked", read); };
  }, [charIndex, media, words, text.length]);
  const known = charIndex !== undefined || !!media;
  const current = charIndex !== undefined ? wordAt(words, charIndex) : media ? fromMedia : words.length - 1;

  // Keep the spoken word on the caption's last line.
  const boxRef = React.useRef<HTMLParagraphElement | null>(null);
  React.useEffect(() => {
    const box = boxRef.current;
    const el = box?.querySelector<HTMLElement>(`[data-i="${Math.max(0, current)}"]`);
    if (!box || !el) return;
    const top = Math.max(0, el.offsetTop + el.offsetHeight - box.clientHeight);
    const still = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    box.scrollTo({ top, behavior: still ? "auto" : "smooth" });
  }, [current]);

  return (
    <p ref={boxRef} className="zds-message-input__caption" aria-hidden="true" data-tracking={known || undefined}>
      {words.map((w, i) => {
        const when = i > current ? "next" : i === current ? "now" : "past";
        return (
          <React.Fragment key={i}>
            <span data-i={i} data-when={when} className="zds-message-input__word"
              style={when === "past" ? ({ "--behind": Math.min(current - i, 12) } as React.CSSProperties) : undefined}>{w.word}</span>{" "}
          </React.Fragment>
        );
      })}
    </p>
  );
}

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
export const MessageThumbnail = React.forwardRef<HTMLSpanElement, MessageThumbnailProps>(function MessageThumbnail(
  { file, onClick, onDiscard, discardLabel, className },
  ref,
) {
  const url = React.useMemo(() => URL.createObjectURL(file), [file]);
  React.useEffect(() => () => URL.revokeObjectURL(url), [url]);
  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      onDiscard?.();
    }
  };
  const content = (
    <>
      {/* Decorative — the name is the label. */}
      <img className="zds-message-input__thumbnail-image" src={url} alt="" />
      <span className="zds-chip__label" title={file.name}>{file.name}</span>
    </>
  );
  return (
    <span ref={ref} className={cx("zds-chip", "zds-message-input__thumbnail", className)}
      data-discardable="" data-clickable={onClick ? "" : undefined}>
      {/* As Assist Chip's split: the picture and name are one action (the preview), the remove another. */}
      {onClick ? <BaseButton className="zds-message-input__thumbnail-action" onClick={() => onClick()}>{content}</BaseButton> : content}
      <BaseButton
        className="zds-message-input__thumbnail-remove"
        aria-label={discardLabel ?? `Remove ${file.name}`}
        onClick={() => onDiscard?.()}
        onKeyDown={onKeyDown}
      >
        {/* As Assist Chip: the close glyph pinned to the rounded family at Icon small. */}
        <Icon className="zds-chip__glyph" name="close" size="small" iconStyle="rounded" />
      </BaseButton>
    </span>
  );
});

/** An attachment: an image is a MessageThumbnail; every other kind an Assist Chip with its glyph. */
function AttachmentChip({ attachment: a, color, onDiscard, onPreview }: {
  attachment: MessageAttachment; color: AssistChipColor; onDiscard: () => void; onPreview?: (a: MessageAttachment) => void;
}) {
  if (a.kind === "image") return <MessageThumbnail file={a.file} onClick={onPreview ? () => onPreview(a) : undefined} onDiscard={onDiscard} />;
  return <AssistChip icon={KIND_ICON[a.kind]} color={color} onDiscard={onDiscard}>{a.file.name}</AssistChip>;
}

/** Resample to `n` buckets by taking each bucket's peak. */
const resample = (peaks: number[], n: number) =>
  peaks.length === 0 ? Array(n).fill(0.2)
    : Array.from({ length: n }, (_, i) => Math.max(...peaks.slice(Math.floor((i * peaks.length) / n), Math.max(Math.floor(((i + 1) * peaks.length) / n), Math.floor((i * peaks.length) / n) + 1))));

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
export const MessageInput = React.forwardRef<HTMLDivElement, MessageInputProps>(function MessageInput(
  {
    onSend, placeholder = "Message", value: valueProp, defaultValue = "", onValueChange,
    defaultAttachments = [], defaultVoiceNote = null, defaultDictated = false, defaultTrayOpen = false,
    accept, extraActions = [], maxRecordingSeconds = 120, maxDictationSeconds = 60,
    maxLength, maxAttachments, maxFileBytes, sendOnEnter = true, strings,
    attachmentColor = defaultAttachmentColor, onPreviewAttachment, transcribe, lang,
    speakResponse: speakProp, defaultSpeakResponse, onSpeakResponseChange, speaking = false, onStopSpeaking,
    speakingSource = null, speakingLevel, speakingText, speakingCharIndex,
    state: pinned, preview: previewProp, attachmentSlot, moreTools,
    disabled: disabledProp = false, "aria-label": ariaLabel = "Message", className,
  },
  ref,
) {
  // A pinned state stands in for what the microphone, the tray and the
  // dictation would otherwise have set. Voice states start from it; the rest
  // seed the matching piece of state.
  const preview: MessageInputPreview | undefined =
    pinned === "listening" || pinned === "transcribing" || pinned === "recording" ? pinned : previewProp;
  const disabled = disabledProp || pinned === "disabled";
  if (pinned === "playback" && !defaultVoiceNote) defaultVoiceNote = SAMPLE_NOTE;
  if (pinned === "dictated") defaultDictated = true;
  if (pinned === "attachment-open") defaultTrayOpen = true;
  if (pinned === "speaking") speaking = true;
  const [innerText, setInnerText] = React.useState(defaultValue);
  const text = valueProp ?? innerText;
  const setText = (v: string) => { if (valueProp === undefined) setInnerText(v); onValueChange?.(v); };

  const [attachments, setAttachments] = React.useState<MessageAttachment[]>(defaultAttachments);
  const [voiceNote, setVoiceNote] = React.useState<MessageVoiceNote | null>(defaultVoiceNote);
  const [dictated, setDictated] = React.useState<{ before: string } | null>(defaultDictated ? { before: "" } : null);
  const [trayOpen, setTrayOpen] = React.useState(defaultTrayOpen);
  const trayId = `${React.useId()}-tray`;
  const [mode, setMode] = React.useState<Mode>(preview ?? (defaultVoiceNote ? "playback" : "compose"));
  const [elapsed, setElapsed] = React.useState(preview ? 7000 : 0);
  const [levels, setLevels] = React.useState<number[]>(SAMPLE_LEVELS);
  const [error, setError] = React.useState<string | null>(null);
  /** What recognition has heard so far, shown in the listening bar as it lands. */
  const [heard, setHeard] = React.useState("");
  const S = React.useMemo(() => ({ ...messageInputStrings, ...strings }), [strings]);

  const speakControlled = speakProp !== undefined;
  const showSpeakToggle = speakControlled || defaultSpeakResponse !== undefined || onSpeakResponseChange !== undefined;
  const [innerSpeak, setInnerSpeak] = React.useState(defaultSpeakResponse ?? false);
  const speakOn = speakProp ?? innerSpeak;

  const canDictate = !!transcribe || !!getRecognition();
  const canRecord = typeof window !== "undefined" && typeof window.MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia;

  // ---- media plumbing ------------------------------------------------------
  const media = React.useRef<{ stream?: MediaStream; recorder?: MediaRecorder; ctx?: AudioContext; raf?: number; timer?: number;
    chunks: Blob[]; peaks: number[]; started: number; recognition?: SpeechRecognitionLike; transcript: string; cancelled: boolean;
    /** A finish is underway — the limit clock keeps ticking while one resolves, and must not start a second. */
    finishing: boolean }>({ chunks: [], peaks: [], started: 0, transcript: "", cancelled: false, finishing: false });

  const teardown = React.useCallback(() => {
    const m = media.current;
    if (m.raf) cancelAnimationFrame(m.raf);
    if (m.timer) clearInterval(m.timer);
    m.stream?.getTracks().forEach((t) => t.stop());
    void m.ctx?.close().catch(() => {});
    m.recognition?.abort();
    Object.assign(m, { stream: undefined, recorder: undefined, ctx: undefined, raf: undefined, timer: undefined, recognition: undefined });
  }, []);
  React.useEffect(() => teardown, [teardown]);

  const meter = (stream: MediaStream) => {
    const m = media.current;
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    ctx.createMediaStreamSource(stream).connect(analyser);
    const data = new Uint8Array(analyser.fftSize);
    const history: number[] = [];
    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let peak = 0;
      for (const v of data) peak = Math.max(peak, Math.abs(v - 128) / 128);
      const level = Math.min(1, peak * 2.5);
      m.peaks.push(level);
      history.push(level); if (history.length > BARS) history.shift();
      setLevels([...Array(BARS - history.length).fill(0.15), ...history]);
      m.raf = requestAnimationFrame(tick);
    };
    m.ctx = ctx;
    tick();
  };

  const startClock = (limitMs?: number, onLimit?: () => void) => {
    const m = media.current;
    m.started = Date.now();
    setElapsed(0);
    m.timer = window.setInterval(() => {
      const ms = Date.now() - m.started;
      setElapsed(ms);
      if (limitMs && ms >= limitMs) onLimit?.();
    }, 200);
  };

  const record = async (): Promise<boolean> => {
    const m = media.current;
    setError(null);
    try {
      m.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError(S.micBlocked);
      return false;
    }
    m.chunks = []; m.peaks = []; m.cancelled = false; m.finishing = false;
    m.recorder = new MediaRecorder(m.stream);
    m.recorder.ondataavailable = (e) => { if (e.data.size) m.chunks.push(e.data); };
    m.recorder.start();
    meter(m.stream);
    return true;
  };

  const stopRecorder = () => new Promise<Blob>((resolve) => {
    const m = media.current;
    const r = m.recorder;
    if (!r || r.state === "inactive") return resolve(new Blob(m.chunks));
    r.onstop = () => resolve(new Blob(m.chunks, { type: r.mimeType }));
    r.stop();
  });

  // ---- voice message: recording → playback --------------------------------
  const startVoiceNote = async () => {
    setTrayOpen(false);
    if (!(await record())) return;
    setMode("recording");
    startClock(maxRecordingSeconds * 1000, () => void finishVoiceNote());
  };
  const finishVoiceNote = async () => {
    const m = media.current;
    if (m.finishing) return; // the limit clock keeps firing while the recorder stops
    m.finishing = true;
    const durationMs = Date.now() - m.started;
    const blob = await stopRecorder();
    const peaks = m.peaks;
    teardown();
    if (m.cancelled) return;
    setVoiceNote({ blob, durationMs, peaks });
    setMode("playback");
  };

  // ---- voice prompt: listening → transcribing → dictated ------------------
  const startDictation = async () => {
    setTrayOpen(false);
    setError(null);
    setHeard("");
    const m = media.current;
    m.transcript = ""; m.cancelled = false; m.finishing = false;
    if (transcribe) {
      if (!(await record())) return;
    } else {
      const Recognition = getRecognition();
      if (!Recognition) return;
      const rec = new Recognition();
      rec.lang = lang ?? (typeof navigator !== "undefined" ? navigator.language : "en-US");
      // Interim results show the words landing while the mic is open.
      rec.continuous = true; rec.interimResults = true;
      rec.onresult = (e) => {
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) m.transcript += e.results[i][0].transcript;
          else interim += e.results[i][0].transcript;
        }
        setHeard((m.transcript + interim).trim());
      };
      rec.onerror = () => setError(S.recognitionError);
      m.recognition = rec;
      rec.start();
      // Recognition gives no levels; a quiet stream for the meter where the browser allows it.
      try { m.stream = await navigator.mediaDevices.getUserMedia({ audio: true }); meter(m.stream); } catch { /* bars stay at rest */ }
    }
    setMode("listening");
    // A forgotten open microphone stops itself and keeps what it heard.
    startClock(maxDictationSeconds * 1000, () => void finishDictation());
  };
  const finishDictation = async () => {
    const m = media.current;
    if (m.finishing) return; // the limit clock keeps firing while recognition winds down
    m.finishing = true;
    setMode("transcribing");
    let words = "";
    try {
      if (transcribe) {
        const blob = await stopRecorder();
        teardown();
        words = await transcribe(blob);
      } else {
        const rec = m.recognition;
        await new Promise<void>((resolve) => { if (!rec) return resolve(); rec.onend = () => resolve(); rec.stop(); });
        m.recognition = undefined;
        teardown();
        words = m.transcript;
      }
    } catch {
      setError(S.transcribeError);
    }
    setHeard("");
    if (m.cancelled) return;
    words = words.trim();
    if (words) {
      const before = text;
      const joined = before ? `${before.replace(/\s+$/, "")} ${words}` : words;
      setText(maxLength !== undefined ? joined.slice(0, maxLength) : joined);
      setDictated({ before });
    }
    setMode("compose");
  };

  const cancelVoice = () => {
    media.current.cancelled = true;
    media.current.recorder?.stop();
    teardown();
    setHeard("");
    setMode("compose");
    setElapsed(0);
  };

  // Disabling the composer mid-recording must not leave the microphone open.
  const busyNow = mode === "listening" || mode === "transcribing" || mode === "recording";
  React.useEffect(() => {
    if (disabled && busyNow) cancelVoice();
    // cancelVoice is stable in effect: it only touches refs and setters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  // ---- playback ------------------------------------------------------------
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [position, setPosition] = React.useState(0);
  const noteUrl = React.useMemo(() => (voiceNote ? URL.createObjectURL(voiceNote.blob) : null), [voiceNote]);
  React.useEffect(() => () => { if (noteUrl) URL.revokeObjectURL(noteUrl); }, [noteUrl]);
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play(); else a.pause();
  };
  const discardNote = () => { audioRef.current?.pause(); setVoiceNote(null); setPosition(0); setMode("compose"); };
  const reRecord = () => { discardNote(); void startVoiceNote(); };

  // ---- attachments ---------------------------------------------------------
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const cameraRef = React.useRef<HTMLInputElement | null>(null);
  /** One gate for every way in — picker, camera, drop and paste. Refusals use the error row. */
  const addFiles = (list: FileList | File[] | null) => {
    if (!list || list.length === 0 || disabled) return;
    const refused: string[] = [];
    const ok: MessageAttachment[] = [];
    for (const file of Array.from(list)) {
      if (!matchesAccept(file, accept)) refused.push(fmt(S.fileNotAccepted, { name: file.name }));
      else if (maxFileBytes !== undefined && file.size > maxFileBytes) refused.push(fmt(S.fileTooLarge, { name: file.name, size: formatBytes(maxFileBytes) }));
      else ok.push({ id: newId(), file, kind: kindOf(file) });
    }
    if (maxAttachments !== undefined && attachments.length + ok.length > maxAttachments) {
      ok.length = Math.max(0, maxAttachments - attachments.length);
      refused.push(fmt(S.tooManyAttachments, { count: maxAttachments }));
    }
    if (ok.length) setAttachments((a) => [...a, ...ok]);
    setError(refused.length ? refused[0] : null);
  };

  // ---- send ----------------------------------------------------------------
  const busy = busyNow;
  const hasContent = !!text.trim() || attachments.length > 0 || !!voiceNote;
  const canSend = !disabled && !busy && hasContent;
  const send = () => {
    if (!canSend) return;
    audioRef.current?.pause();
    onSend?.({ text: text.trim(), attachments, voiceNote, dictated: !!dictated, speakResponse: speakOn });
    setText(""); setAttachments([]); setVoiceNote(null); setDictated(null); setTrayOpen(false); setMode("compose"); setPosition(0);
  };

  const setSpeak = (on: boolean) => { if (!speakControlled) setInnerSpeak(on); onSpeakResponseChange?.(on); };

  // ---- files from anywhere: drop and paste ----------------------------------
  // The same conditions as the tray toggle: no new files while a voice state
  // or a finished voice note holds the composer.
  const canAttach = !disabled && !busy && mode !== "playback" && !speaking;
  const [dragging, setDragging] = React.useState(false);
  const dragDepth = React.useRef(0);
  const draggingFiles = (e: React.DragEvent) => Array.from(e.dataTransfer.types).includes("Files");
  const onDragEnter = (e: React.DragEvent) => {
    if (!canAttach || !draggingFiles(e)) return;
    e.preventDefault();
    dragDepth.current += 1;
    setDragging(true);
  };
  const onDragOver = (e: React.DragEvent) => { if (canAttach && draggingFiles(e)) e.preventDefault(); };
  const onDragLeave = () => { if (dragDepth.current > 0 && --dragDepth.current === 0) setDragging(false); };
  const onDrop = (e: React.DragEvent) => {
    if (!draggingFiles(e)) return;
    e.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    if (canAttach) addFiles(e.dataTransfer.files);
  };
  const onPaste = (e: React.ClipboardEvent) => {
    if (!canAttach || !e.clipboardData.files.length) return;
    e.preventDefault();
    addFiles(e.clipboardData.files);
  };

  // Escape backs out of the nearest thing: a live voice state first, then the open tray.
  const trayToggleRef = React.useRef<HTMLElement | null>(null);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (busy) { e.stopPropagation(); cancelVoice(); }
    else if (trayOpen) { e.stopPropagation(); setTrayOpen(false); trayToggleRef.current?.focus(); }
  };

  // ---- the bar: whichever voice state is live -------------------------------
  const maxMs = maxRecordingSeconds * 1000;
  // The last stretch of what recognition heard; the full text lands in the field at the end.
  const heardTail = heard.length > 60 ? `…${heard.slice(-60)}` : heard;
  let bar: React.ReactNode = null;
  let hint: string | null = null;
  /** Announced on mode change only — the clock and the interim words stay out of the live region. */
  let status: string | null = null;
  if (mode === "listening") {
    hint = S.listeningHint;
    status = S.listening;
    bar = <>
      <Waveform levels={levels} />
      {/* The words will land in the field; the preview is visual only. */}
      <span className="zds-message-input__bar-label" data-heard={heard ? "" : undefined} aria-hidden={heard ? true : undefined}>{heardTail || S.listening}</span>
      <span className="zds-message-input__time" aria-hidden="true">{clock(elapsed)}</span>
      <IconButton flavour="subtle" shape="full" icon="close" label={S.cancelDictation} onClick={cancelVoice} />
    </>;
  } else if (mode === "transcribing") {
    hint = S.transcribingHint;
    status = S.transcribing;
    bar = <>
      <ProgressCircle className="zds-message-input__spinner" value={null} size="xxsmall" label={S.transcribing} />
      <span className="zds-message-input__bar-label">{S.transcribing}</span>
      <IconButton flavour="subtle" shape="full" icon="close" label={S.cancelTranscription} onClick={cancelVoice} />
    </>;
  } else if (mode === "recording") {
    hint = fmt(S.recordingHint, { time: clock(maxMs) });
    status = S.recording;
    bar = <>
      <span className="zds-message-input__rec-dot" aria-hidden="true" />
      <Waveform levels={levels} />
      <span className="zds-message-input__bar-label">{S.recording}</span>
      <span className="zds-message-input__time" aria-hidden="true">{clock(elapsed)}</span>
      <IconButton flavour="subtle" shape="full" icon="close" label={S.discardRecording} onClick={cancelVoice} />
    </>;
  } else if (mode === "playback" && voiceNote) {
    hint = fmt(S.recordingHint, { time: clock(maxMs) });
    status = S.playbackReady;
    bar = <>
      <IconButton className="zds-message-input__play" flavour="primary" shape="full" icon={playing ? "pause" : "play"} label={playing ? S.pause : S.play} onClick={togglePlay} />
      <Waveform levels={resample(voiceNote.peaks, 24)} progress={position / Math.max(1, voiceNote.durationMs)} className="zds-message-input__wave--long" />
      <span className="zds-message-input__time">{clock(position)}/{clock(voiceNote.durationMs)}</span>
      <IconButton flavour="subtle" shape="full" icon="replay" label={S.recordAgain} onClick={reRecord} />
      <IconButton flavour="subtle" shape="full" icon="delete" label={S.deleteVoiceMessage} onClick={discardNote} />
      {noteUrl ? (
        <audio ref={audioRef} src={noteUrl} preload="metadata"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setPosition(0); }}
          onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime * 1000)} />
      ) : null}
    </>;
  }
  const state: MessageInputState = mode === "compose"
    ? (speaking ? "speaking" : disabled ? "disabled" : trayOpen ? "attachment-open" : dictated ? "dictated" : hasContent ? "filled" : "empty")
    : mode;

  // ---- speaking: the orb ------------------------------------------------------
  // The level goes straight onto the orb as a custom property, every frame,
  // without a React render.
  const orbRef = React.useRef<HTMLSpanElement | null>(null);
  const reactive = !!speakingSource || speakingLevel !== undefined;
  React.useEffect(() => {
    if (state !== "speaking" || !speakingSource) return;
    return listenTo(speakingSource, (level) => orbRef.current?.style.setProperty("--zds-orb-level", level.toFixed(3)));
  }, [state, speakingSource]);
  React.useEffect(() => {
    if (state !== "speaking" || speakingSource || speakingLevel === undefined) return;
    orbRef.current?.style.setProperty("--zds-orb-level", String(Math.max(0, Math.min(1, speakingLevel))));
  }, [state, speakingSource, speakingLevel]);

  if (state === "speaking") {
    return (
      <div ref={ref} role="group" aria-label={ariaLabel}
        className={["zds-message-input", className].filter(Boolean).join(" ")}
        data-state="speaking" data-disabled={disabled || undefined}>
        <div className="zds-message-input__speaking">
          <Orb ref={orbRef} reactive={reactive} />
          {speakingText ? (
            <SpokenCaption text={speakingText} charIndex={speakingCharIndex}
              media={speakingSource instanceof HTMLMediaElement ? speakingSource : null} />
          ) : null}
          {/* Announced once, whole; the word-by-word caption is visual only. */}
          <span className="zds-message-input__sr-only" role="status">{speakingText ? fmt(S.speakingText, { text: speakingText }) : S.speaking}</span>
          <IconButton className="zds-message-input__stop-speaking" flavour="subtle" shape="full" icon="stop"
            label={S.stopSpeaking} onClick={onStopSpeaking} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} role="group" aria-label={ariaLabel}
      className={["zds-message-input", className].filter(Boolean).join(" ")}
      data-state={state} data-disabled={disabled || undefined} data-dragging={dragging || undefined}
      onDragEnter={onDragEnter} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onKeyDown={onKeyDown}>
      {(attachments.length > 0 || dictated || attachmentSlot) && mode === "compose" ? (
        <ul className="zds-message-input__chips" aria-label={S.attached}>
          {dictated ? (
            <li className="zds-message-input__chip" data-kind="dictated">
              <AssistChip icon="microphone" color="blue" discardLabel={S.undoDictation}
                onDiscard={() => { setText(dictated.before); setDictated(null); }}>{S.dictated}</AssistChip>
            </li>
          ) : null}
          {attachments.map((a) => (
            <li key={a.id} className="zds-message-input__chip" data-kind={a.kind}>
              <AttachmentChip attachment={a} color={attachmentColor(a)} onPreview={onPreviewAttachment}
                onDiscard={() => setAttachments((list) => list.filter((x) => x.id !== a.id))} />
            </li>
          ))}
          {attachmentSlot ? <li className="zds-message-input__chip" data-kind="slot">{attachmentSlot}</li> : null}
        </ul>
      ) : null}

      {bar ? (
        <div className="zds-message-input__voice">
          <div className="zds-message-input__bar">{bar}</div>
          {hint ? <p className="zds-message-input__hint">{hint}</p> : null}
        </div>
      ) : (
        <textarea className="zds-message-input__text" aria-label={ariaLabel} placeholder={placeholder} rows={2}
          value={text} disabled={disabled} maxLength={maxLength} onPaste={onPaste}
          onChange={(e) => { setText(e.target.value); if (!e.target.value) setDictated(null); }}
          onKeyDown={(e) => { if (sendOnEnter && e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } }} />
      )}

      {/* The voice state, announced when it changes; the clock and interim words stay silent. */}
      <span className="zds-message-input__sr-only" role="status">{status}</span>

      {error ? <p className="zds-message-input__error" role="alert">{error}</p> : null}
      {maxLength !== undefined && text.length >= Math.ceil(maxLength * 0.8) && !bar ? (
        <p className="zds-message-input__count" data-full={text.length >= maxLength || undefined}>
          {fmt(S.characterCount, { count: text.length, max: maxLength })}
        </p>
      ) : null}

      <div className="zds-message-input__toolbar">
        <div className="zds-message-input__tools">
          {/* Attachment's toggle: add closed, close open (spec), on the pressed surface while open. */}
          <IconButton ref={trayToggleRef} className="zds-message-input__tray-toggle" flavour="subtle" shape="full"
            icon={trayOpen ? "close" : "add"} label={trayOpen ? S.closeAttachments : S.addAttachments}
            aria-expanded={trayOpen} aria-controls={trayId} data-open={trayOpen || undefined}
            disabled={!canAttach} onClick={() => setTrayOpen((o) => !o)} />
          {/* Always mounted so closing animates too; inert while closed keeps it out of tab order and AT. */}
          <div id={trayId} className="zds-message-input__tray" data-open={trayOpen || undefined} inert={!trayOpen}>
            <div className="zds-message-input__tray-items">
              <IconButton flavour="subtle" shape="full" icon="attachment" label={S.attachFile} onClick={() => fileRef.current?.click()} />
              <IconButton flavour="subtle" shape="full" icon="camera" label={S.takePhoto} onClick={() => cameraRef.current?.click()} />
              {extraActions.map((a) => <IconButton key={a.label} flavour="subtle" shape="full" icon={a.icon} label={a.label} onClick={a.onSelect} />)}
              {canRecord ? <IconButton flavour="subtle" shape="full" icon="audio" label={S.recordVoiceMessage} onClick={() => void startVoiceNote()} /> : null}
            </div>
          </div>
          {/* More Tools: dropped while the tray is open and while listening (spec). */}
          {moreTools && !trayOpen && mode !== "listening" ? <div className="zds-message-input__more-tools">{moreTools}</div> : null}
        </div>
        <div className="zds-message-input__actions">
          {showSpeakToggle ? (
            <IconButton className="zds-message-input__speak" flavour="subtle" shape="full"
              icon={speakOn ? "volume-up" : "volume-off"} label={S.readAloud}
              aria-pressed={speakOn} data-pressed={speakOn || undefined} disabled={disabled} onClick={() => setSpeak(!speakOn)} />
          ) : null}
          {mode === "listening" || mode === "recording" ? (
            <IconButton flavour="primary" shape="full" icon="stop"
              label={mode === "listening" ? S.stopAndTranscribe : S.stopRecording}
              onClick={() => void (mode === "listening" ? finishDictation() : finishVoiceNote())} />
          ) : canDictate && mode !== "playback" ? (
            // Disabled, Dictate drops to the text flavour (spec: transcribing and disabled).
            <IconButton flavour={disabled || busy || speaking ? "text" : "subtle"} shape="full" icon="microphone" label={S.dictate}
              disabled={disabled || busy || speaking} onClick={() => void startDictation()} />
          ) : null}
          <IconButton className="zds-message-input__send" flavour="primary" shape="full" icon="send" label={S.send}
            disabled={!canSend} onClick={send} />
        </div>
      </div>

      <input ref={fileRef} type="file" multiple accept={accept} hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; setTrayOpen(false); }} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; setTrayOpen(false); }} />
    </div>
  );
});
