import { LitElement, html, nothing, svg, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "./message-input.styles.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../assist-chip/assist-chip.js";
import "../progress-circle/progress-circle.js";
import type { IconName } from "@zebra-design-system/icons/names";
import type { AssistChipColor } from "../assist-chip/assist-chip.js";

/** The spec's State values. Normally derived from what the person does; set `state` to pin one. */
export type MessageInputState =
  | "empty" | "filled" | "attachment-open" | "listening" | "transcribing" | "dictated"
  | "recording" | "playback" | "speaking" | "disabled";

export type MessageAttachmentKind = "document" | "image" | "video" | "audio";
export interface MessageAttachment { id: string; file: File; kind: MessageAttachmentKind }
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
export interface MessageInputAction { icon: IconName; label: string; onSelect: () => void }

/** Every string the composer shows or announces. The same keys as React's `messageInputStrings`. */
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
  replyingTo: "Replying to",
  cancelReply: "Cancel reply to {name}",
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

type Mode = "compose" | "listening" | "transcribing" | "recording" | "playback";
type Recognition = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onend: (() => void) | null; onerror: (() => void) | null;
  start: () => void; stop: () => void; abort: () => void;
};

const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
const clock = (ms: number) => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
const formatBytes = (n: number) => (n >= 1048576 ? `${Math.round((n / 1048576) * 10) / 10} MB` : `${Math.round(n / 1024)} KB`);
const kindOf = (f: File): MessageAttachmentKind =>
  f.type.startsWith("image/") ? "image" : f.type.startsWith("video/") ? "video" : f.type.startsWith("audio/") ? "audio" : "document";
const KIND_ICON: Record<MessageAttachmentKind, IconName> = { document: "document", image: "camera", video: "video", audio: "audio" };
const matchesAccept = (f: File, accept?: string) => {
  if (!accept) return true;
  const type = f.type.toLowerCase(), name = f.name.toLowerCase();
  return accept.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
    .some((t) => (t.startsWith(".") ? name.endsWith(t) : t.endsWith("/*") ? type.startsWith(t.slice(0, -1)) : type === t));
};
/** As React's `defaultAttachmentColor`: PDF red, spreadsheets green, documents blue, video orange. */
export const defaultAttachmentColor = (a: MessageAttachment): AssistChipColor => {
  const ext = a.file.name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "red";
  if (["xls", "xlsx", "csv", "numbers", "ods"].includes(ext)) return "green";
  if (["doc", "docx", "txt", "rtf", "pages", "odt", "md"].includes(ext)) return "blue";
  if (a.kind === "video") return "orange";
  return "neutral";
};
const getRecognition = (): (new () => Recognition) | null => {
  const w = globalThis as unknown as Record<string, unknown>;
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as (new () => Recognition) | null;
};
const resample = (peaks: number[], n: number) =>
  peaks.length === 0 ? Array(n).fill(0.2)
    : Array.from({ length: n }, (_, i) => {
      const a = Math.floor((i * peaks.length) / n), b = Math.max(Math.floor(((i + 1) * peaks.length) / n), a + 1);
      return Math.max(...peaks.slice(a, b));
    });

const BARS = 9;
const SAMPLE_LEVELS = [0.35, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.65, 0.3];
const SAMPLE_NOTE: MessageVoiceNote = {
  blob: new Blob([], { type: "audio/webm" }), durationMs: 4000,
  peaks: [0.3, 0.8, 0.35, 0.45, 0.55, 0.85, 0.7, 0.5, 0.35, 0.45, 0.95, 0.4, 0.7, 0.3, 0.65, 0.5, 0.9, 0.55, 0.4, 0.5, 0.6, 0.95, 0.45, 0.5],
};
const RINGS = [
  { rx: 44, ry: 44 }, { rx: 46, ry: 30 }, { rx: 30, ry: 46 },
  { rx: 42, ry: 36 }, { rx: 38, ry: 44 }, { rx: 46, ry: 40 },
];
let uid = 0;
const newId = () => `att-${Date.now().toString(36)}-${uid++}`;

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
@customElement("zds-message-input")
export class ZdsMessageInput extends LitElement {
  static styles = styles;

  /** The spec's state, reflected. Set it to pin a state; left unset it follows what the person does. */
  @property({ type: String, reflect: true }) state: MessageInputState | null = null;
  @property({ type: String }) placeholder = "Message";
  @property({ type: String }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Accepted file types, as the picker's `accept`; applied to dropped and pasted files too. */
  @property({ type: String }) accept: string | null = null;
  @property({ type: Number, attribute: "max-length" }) maxLength: number | null = null;
  @property({ type: Number, attribute: "max-attachments" }) maxAttachments: number | null = null;
  @property({ type: Number, attribute: "max-file-bytes" }) maxFileBytes: number | null = null;
  @property({ type: Number, attribute: "max-recording-seconds" }) maxRecordingSeconds = 120;
  @property({ type: Number, attribute: "max-dictation-seconds" }) maxDictationSeconds = 60;
  /** Enter sends and Shift+Enter adds a line. Off, Enter only adds a line. */
  @property({ type: Boolean, attribute: "send-on-enter" }) sendOnEnter = true;
  /** BCP 47 language for browser speech recognition. */
  @property({ type: String }) lang = "";
  /** Shows the read-aloud toggle (not in the spec). */
  @property({ type: Boolean, attribute: "show-read-aloud" }) showReadAloud = false;
  /** The read-aloud toggle's value. */
  @property({ type: Boolean, attribute: "speak-response" }) speakResponse = false;
  /** A reply is being read aloud: the orb, the caption and one stop control. */
  @property({ type: Boolean }) speaking = false;
  /** The reply being spoken, shown under the orb. */
  @property({ type: String, attribute: "speaking-text" }) speakingText = "";
  /** Where the voice is in `speaking-text`, as a character offset. */
  @property({ type: Number, attribute: "speaking-char-index" }) speakingCharIndex: number | null = null;
  /** Loudness 0–1 driving the orb. Unset, the orb breathes on its own. */
  @property({ type: Number, attribute: "speaking-level" }) speakingLevel: number | null = null;
  /** Extra tray actions, after file and camera. */
  @property({ attribute: false }) actions: MessageInputAction[] = [];
  /** Turns a dictation recording into text. Without it, the browser's speech recognition is used. */
  @property({ attribute: false }) transcribe: ((audio: Blob) => Promise<string>) | null = null;
  /** Replaces any of the composer's texts; see `messageInputStrings`. */
  @property({ attribute: false }) strings: Partial<MessageInputStrings> = {};
  /** Assist Chip colour per attachment. */
  @property({ attribute: false }) attachmentColor: (a: MessageAttachment) => AssistChipColor = defaultAttachmentColor;
  /** The files held, e.g. a restored draft. */
  @property({ attribute: false }) attachments: MessageAttachment[] = [];
  /** A recorded take to start from. Opens in playback. */
  @property({ attribute: false }) voiceNote: MessageVoiceNote | null = null;
  @property({ type: Boolean }) dictated = false;
  @property({ type: Boolean, attribute: "tray-open" }) trayOpen = false;
  @property({ type: String }) label = "Message";
  /** Who is being answered. Setting it shows the Reply Bar above the body (the spec's Show Reply). Not shown while speaking or disabled. */
  @property({ type: String, attribute: "reply-to" }) replyTo = "";
  /** The quoted line being answered. One line, truncated. */
  @property({ type: String, attribute: "reply-text" }) replyText = "";

  @state() private mode: Mode = "compose";
  @state() private elapsed = 0;
  @state() private levels: number[] = SAMPLE_LEVELS;
  @state() private error: string | null = null;
  @state() private heard = "";
  @state() private playing = false;
  @state() private position = 0;
  @state() private dragging = false;
  @state() private hasMoreTools = false;
  /** The state the person's actions produced; `state` pins over it. */
  private derived: MessageInputState = "empty";
  private dictatedBefore = "";
  private dragDepth = 0;
  private noteUrl: string | null = null;
  private media: {
    stream?: MediaStream; recorder?: MediaRecorder; ctx?: AudioContext; raf?: number; timer?: number;
    chunks: Blob[]; peaks: number[]; started: number; recognition?: Recognition; transcript: string;
    cancelled: boolean; finishing: boolean;
  } = { chunks: [], peaks: [], started: 0, transcript: "", cancelled: false, finishing: false };

  @query(".file") private fileInput?: HTMLInputElement;
  @query(".camera") private cameraInput?: HTMLInputElement;
  @query("audio") private audio?: HTMLAudioElement;
  @query(".tray-toggle") private trayToggle?: HTMLElement;

  private get S() { return { ...messageInputStrings, ...this.strings }; }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.teardown();
    if (this.noteUrl) URL.revokeObjectURL(this.noteUrl);
  }

  protected willUpdate(changed: PropertyValues<this>) {
    // A pinned state seeds what the microphone, tray and dictation would have set.
    if (changed.has("state") && this.state && this.state !== this.derived) {
      const s = this.state;
      if (s === "listening" || s === "transcribing" || s === "recording") { this.mode = s; this.elapsed = 7000; }
      else if (s === "playback") { this.voiceNote ??= SAMPLE_NOTE; this.mode = "playback"; }
      else this.mode = "compose";
      this.trayOpen = s === "attachment-open";
      if (s === "dictated") this.dictated = true;
      if (s === "speaking") this.speaking = true;
      if (s === "disabled") this.disabled = true;
    }
    if (changed.has("voiceNote")) {
      if (this.noteUrl) URL.revokeObjectURL(this.noteUrl);
      this.noteUrl = this.voiceNote && this.voiceNote.blob.size ? URL.createObjectURL(this.voiceNote.blob) : null;
      if (this.voiceNote && this.mode === "compose") this.mode = "playback";
    }
    this.derived = this.mode === "compose"
      ? (this.speaking ? "speaking" : this.disabled ? "disabled" : this.trayOpen ? "attachment-open"
        : this.dictated ? "dictated" : this.hasContent ? "filled" : "empty")
      : this.mode;
    // Reflected, so the styles can key off it; set here it costs no second render.
    this.state = this.derived;
  }

  // ---- derived ---------------------------------------------------------------
  private get busy() { return this.mode === "listening" || this.mode === "transcribing" || this.mode === "recording"; }
  private get hasContent() { return !!this.value.trim() || this.attachments.length > 0 || !!this.voiceNote; }
  private get canSend() { return !this.disabled && !this.busy && this.hasContent; }
  private get canAttach() { return !this.disabled && !this.busy && this.mode !== "playback" && !this.speaking; }
  private get canDictate() { return !!this.transcribe || !!getRecognition(); }
  private get canRecord() { return typeof MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia; }

  private emit(name: string, detail?: unknown) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }
  private setText(v: string) { this.value = v; this.emit("zds-input", { value: v }); }

  // ---- media plumbing --------------------------------------------------------
  private teardown() {
    const m = this.media;
    if (m.raf) cancelAnimationFrame(m.raf);
    if (m.timer) clearInterval(m.timer);
    m.stream?.getTracks().forEach((t) => t.stop());
    void m.ctx?.close().catch(() => {});
    m.recognition?.abort();
    Object.assign(m, { stream: undefined, recorder: undefined, ctx: undefined, raf: undefined, timer: undefined, recognition: undefined });
  }

  private meter(stream: MediaStream) {
    const m = this.media;
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
      this.levels = [...Array(BARS - history.length).fill(0.15), ...history];
      m.raf = requestAnimationFrame(tick);
    };
    m.ctx = ctx;
    tick();
  }

  private startClock(limitMs: number, onLimit: () => void) {
    const m = this.media;
    m.started = Date.now();
    this.elapsed = 0;
    m.timer = window.setInterval(() => {
      this.elapsed = Date.now() - m.started;
      if (this.elapsed >= limitMs) onLimit();
    }, 200);
  }

  private async record(): Promise<boolean> {
    const m = this.media;
    this.error = null;
    try { m.stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch { this.error = this.S.micBlocked; return false; }
    m.chunks = []; m.peaks = []; m.cancelled = false; m.finishing = false;
    m.recorder = new MediaRecorder(m.stream);
    m.recorder.ondataavailable = (e) => { if (e.data.size) m.chunks.push(e.data); };
    m.recorder.start();
    this.meter(m.stream);
    return true;
  }

  private stopRecorder() {
    return new Promise<Blob>((resolve) => {
      const m = this.media, r = m.recorder;
      if (!r || r.state === "inactive") return resolve(new Blob(m.chunks));
      r.onstop = () => resolve(new Blob(m.chunks, { type: r.mimeType }));
      r.stop();
    });
  }

  // ---- voice message: recording → playback -----------------------------------
  private async startVoiceNote() {
    this.trayOpen = false;
    if (!(await this.record())) return;
    this.mode = "recording";
    this.startClock(this.maxRecordingSeconds * 1000, () => void this.finishVoiceNote());
  }
  private async finishVoiceNote() {
    const m = this.media;
    if (m.finishing) return;
    m.finishing = true;
    const durationMs = Date.now() - m.started;
    const blob = await this.stopRecorder();
    const peaks = m.peaks.slice();
    this.teardown();
    if (m.cancelled) return;
    this.voiceNote = { blob, durationMs, peaks };
    this.position = 0;
    this.mode = "playback";
  }

  // ---- dictation: listening → transcribing → dictated -------------------------
  private async startDictation() {
    this.trayOpen = false;
    this.error = null;
    this.heard = "";
    const m = this.media;
    m.transcript = ""; m.cancelled = false; m.finishing = false;
    if (this.transcribe) {
      if (!(await this.record())) return;
    } else {
      const Rec = getRecognition();
      if (!Rec) return;
      const rec = new Rec();
      rec.lang = this.lang || document.documentElement.lang || "en-US";
      rec.continuous = true;
      rec.interimResults = true;
      rec.onresult = (e) => {
        let final = "", interim = "";
        for (let i = 0; i < e.results.length; i++) {
          const r = e.results[i];
          if (r.isFinal) final += r[0].transcript; else interim += r[0].transcript;
        }
        m.transcript = final;
        this.heard = (final + interim).trim();
      };
      rec.onerror = () => { if (!m.cancelled && !m.finishing) { this.error = this.S.recognitionError; this.cancelVoice(); } };
      rec.onend = () => { if (m.finishing) this.landTranscript(m.transcript); };
      m.recognition = rec;
      try { rec.start(); } catch { this.error = this.S.recognitionError; return; }
      // The waveform still wants a stream; without one it keeps its sample shape.
      try { m.stream = await navigator.mediaDevices.getUserMedia({ audio: true }); this.meter(m.stream); } catch { /* recognition alone */ }
    }
    this.mode = "listening";
    this.startClock(this.maxDictationSeconds * 1000, () => void this.finishDictation());
  }
  private async finishDictation() {
    const m = this.media;
    if (m.finishing) return;
    m.finishing = true;
    if (m.timer) clearInterval(m.timer);
    this.mode = "transcribing";
    if (m.recognition) { m.recognition.stop(); return; }
    const blob = await this.stopRecorder();
    this.teardown();
    try {
      const text = await this.transcribe!(blob);
      if (!m.cancelled) this.landTranscript(text);
    } catch {
      if (!m.cancelled) { this.error = this.S.transcribeError; this.mode = "compose"; }
    }
  }
  private landTranscript(text: string) {
    this.teardown();
    if (this.media.cancelled) return;
    const words = text.trim();
    this.mode = "compose";
    if (!words) return;
    this.dictatedBefore = this.value;
    this.setText(this.value ? `${this.value.trimEnd()} ${words}` : words);
    this.dictated = true;
  }
  private cancelVoice() {
    this.media.cancelled = true;
    void this.stopRecorder();
    this.teardown();
    this.mode = this.voiceNote ? "playback" : "compose";
  }

  // ---- playback -------------------------------------------------------------
  private togglePlay() {
    const a = this.audio;
    if (!a) return;
    if (a.paused) void a.play(); else a.pause();
  }
  private discardNote() {
    this.audio?.pause();
    this.voiceNote = null;
    this.playing = false;
    this.position = 0;
    this.mode = "compose";
  }
  private reRecord() { this.discardNote(); void this.startVoiceNote(); }

  // ---- files ------------------------------------------------------------------
  private addFiles(list: FileList | File[] | null) {
    if (!list) return;
    const S = this.S, ok: MessageAttachment[] = [], refused: string[] = [];
    for (const file of Array.from(list)) {
      if (!matchesAccept(file, this.accept ?? undefined)) { refused.push(fmt(S.fileNotAccepted, { name: file.name })); continue; }
      if (this.maxFileBytes !== null && file.size > this.maxFileBytes) {
        refused.push(fmt(S.fileTooLarge, { name: file.name, size: formatBytes(this.maxFileBytes) }));
        continue;
      }
      ok.push({ id: newId(), file, kind: kindOf(file) });
    }
    if (this.maxAttachments !== null && this.attachments.length + ok.length > this.maxAttachments) {
      ok.length = Math.max(0, this.maxAttachments - this.attachments.length);
      refused.push(fmt(S.tooManyAttachments, { count: this.maxAttachments }));
    }
    if (ok.length) this.attachments = [...this.attachments, ...ok];
    this.error = refused[0] ?? null;
  }
  private draggingFiles(e: DragEvent) { return !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files"); }
  private onDragEnter = (e: DragEvent) => {
    if (!this.canAttach || !this.draggingFiles(e)) return;
    e.preventDefault(); this.dragDepth += 1; this.dragging = true;
  };
  private onDragOver = (e: DragEvent) => { if (this.canAttach && this.draggingFiles(e)) e.preventDefault(); };
  private onDragLeave = () => { if (this.dragDepth > 0 && --this.dragDepth === 0) this.dragging = false; };
  private onDrop = (e: DragEvent) => {
    if (!this.draggingFiles(e)) return;
    e.preventDefault(); this.dragDepth = 0; this.dragging = false;
    if (this.canAttach) this.addFiles(e.dataTransfer!.files);
  };
  private onPaste = (e: ClipboardEvent) => {
    if (!this.canAttach || !e.clipboardData?.files.length) return;
    e.preventDefault();
    this.addFiles(e.clipboardData.files);
  };

  // ---- send and keys ---------------------------------------------------------
  /** Sends what the composer holds, as the Send control does. */
  send() {
    if (!this.canSend) return;
    this.audio?.pause();
    const detail: MessageSubmission = {
      text: this.value.trim(), attachments: this.attachments, voiceNote: this.voiceNote,
      dictated: this.dictated, speakResponse: this.speakResponse,
    };
    this.emit("zds-send", detail);
    this.setText("");
    this.attachments = []; this.voiceNote = null; this.dictated = false; this.trayOpen = false;
    this.mode = "compose"; this.position = 0;
  }
  private onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (this.busy) { e.stopPropagation(); this.cancelVoice(); }
    else if (this.trayOpen) { e.stopPropagation(); this.trayOpen = false; this.trayToggle?.focus(); }
  };

  // ---- render -----------------------------------------------------------------
  private wave(levels: number[], progress?: number, long = false) {
    return html`<span class="wave ${long ? "long" : ""}" aria-hidden="true">
      ${levels.map((l, i) => html`<span class="level" style=${styleMap({ "--zds-bar-level": String(Math.max(0.15, l)) })}
        ?data-played=${progress === undefined || i / levels.length < progress}></span>`)}
    </span>`;
  }

  private renderSpeaking() {
    const S = this.S;
    const reactive = this.speakingLevel !== null;
    const level = reactive ? Math.max(0, Math.min(1, this.speakingLevel!)) : null;
    const text = this.speakingText;
    const at = this.speakingCharIndex;
    return html`<div class="root" role="group" aria-label=${this.label}>
      <div class="speaking">
        <span class="orb" ?data-reactive=${reactive} aria-hidden="true"
          style=${styleMap(level === null ? {} : { "--zds-orb-level": level.toFixed(3) })}>
          ${RINGS.map((r, i) => html`<svg class="ring" viewBox="0 0 100 100" style=${styleMap({ "--ring": String(i) })}>
            ${svg`<defs><linearGradient id="g${i}" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" class="stop-start"></stop><stop offset="1" class="stop-end"></stop>
            </linearGradient></defs>
            <ellipse cx="50" cy="50" rx=${r.rx * (0.7 + i * 0.05)} ry=${r.ry * (0.7 + i * 0.05)}
              transform=${`rotate(${i * 30} 50 50)`} stroke=${`url(#g${i})`}></ellipse>`}
          </svg>`)}
        </span>
        ${text ? html`<p class="caption" aria-hidden="true">${at === null ? text : html`<span class="past">${text.slice(0, at)}</span>${text.slice(at)}`}</p>` : nothing}
        <span class="sr-only" role="status">${text ? fmt(S.speakingText, { text }) : S.speaking}</span>
        <zds-icon-button class="stop-speaking" flavour="subtle" shape="full" size="small" icon="stop"
          label=${S.stopSpeaking} @click=${() => this.emit("zds-stop-speaking")}></zds-icon-button>
      </div>
    </div>`;
  }

  protected render() {
    if (this.derived === "speaking") return this.renderSpeaking();
    const S = this.S;
    const mode = this.mode;
    const maxMs = this.maxRecordingSeconds * 1000;
    const heardTail = this.heard.length > 60 ? `…${this.heard.slice(-60)}` : this.heard;
    let bar: unknown = null, hint: string | null = null, status: string | null = null;
    const ib = (icon: IconName, label: string, onClick: () => void, cls = "") =>
      html`<zds-icon-button class=${cls} flavour="subtle" shape="full" size="small" icon=${icon} label=${label} @click=${onClick}></zds-icon-button>`;
    if (mode === "listening") {
      hint = S.listeningHint; status = S.listening;
      bar = html`${this.wave(this.levels)}
        <span class="bar-label" ?data-heard=${!!this.heard} aria-hidden=${this.heard ? "true" : nothing}>${heardTail || S.listening}</span>
        <span class="time" aria-hidden="true">${clock(this.elapsed)}</span>
        ${ib("close", S.cancelDictation, () => this.cancelVoice())}`;
    } else if (mode === "transcribing") {
      hint = S.transcribingHint; status = S.transcribing;
      bar = html`<zds-progress-circle .value=${null} size="xxsmall" label=${S.transcribing}></zds-progress-circle>
        <span class="bar-label">${S.transcribing}</span>
        ${ib("close", S.cancelTranscription, () => this.cancelVoice())}`;
    } else if (mode === "recording") {
      hint = fmt(S.recordingHint, { time: clock(maxMs) }); status = S.recording;
      bar = html`<span class="rec-dot" aria-hidden="true"></span>${this.wave(this.levels)}
        <span class="bar-label">${S.recording}</span>
        <span class="time" aria-hidden="true">${clock(this.elapsed)}</span>
        ${ib("close", S.discardRecording, () => this.cancelVoice())}`;
    } else if (mode === "playback" && this.voiceNote) {
      const note = this.voiceNote;
      hint = fmt(S.recordingHint, { time: clock(maxMs) }); status = S.playbackReady;
      bar = html`<zds-icon-button flavour="primary" shape="full" size="small" icon=${this.playing ? "pause" : "play"}
          label=${this.playing ? S.pause : S.play} @click=${() => this.togglePlay()}></zds-icon-button>
        ${this.wave(resample(note.peaks, 24), this.position / Math.max(1, note.durationMs), true)}
        <span class="time">${clock(this.position)}/${clock(note.durationMs)}</span>
        ${ib("replay", S.recordAgain, () => this.reRecord())}
        ${ib("delete", S.deleteVoiceMessage, () => this.discardNote())}
        ${this.noteUrl ? html`<audio src=${this.noteUrl} preload="metadata"
          @play=${() => (this.playing = true)} @pause=${() => (this.playing = false)}
          @ended=${() => { this.playing = false; this.position = 0; }}
          @timeupdate=${(e: Event) => (this.position = (e.target as HTMLAudioElement).currentTime * 1000)}></audio>` : nothing}`;
    }
    const showChips = mode === "compose" && (this.attachments.length > 0 || this.dictated);
    const dictateOff = this.disabled || this.busy || this.speaking;
    const len = this.value.length;
    const showMore = !this.trayOpen && mode !== "listening";
    return html`<div class="root" role="group" aria-label=${this.label} ?data-dragging=${this.dragging}
      @dragenter=${this.onDragEnter} @dragover=${this.onDragOver} @dragleave=${this.onDragLeave} @drop=${this.onDrop}
      @keydown=${this.onKeyDown}>
      ${this.replyTo && !this.disabled && this.derived !== "disabled" ? html`<button class="reply" type="button"
        aria-label=${fmt(S.cancelReply, { name: this.replyTo })} @click=${() => this.emit("zds-cancel-reply")}>
        <zds-icon name="reply" size="small"></zds-icon>
        <span class="reply-text"><span class="reply-label">${S.replyingTo}</span><span class="reply-name">${this.replyTo}</span>${this.replyText
          ? html`<span class="reply-quote">${this.replyText}</span>` : nothing}</span>
        <zds-icon name="close" size="small"></zds-icon>
      </button>` : nothing}
      <ul class="chips" aria-label=${S.attached} ?hidden=${mode !== "compose"}>
        ${showChips && this.dictated ? html`<li><zds-assist-chip icon="microphone" color="blue" discardable discard-label=${S.undoDictation}
          @zds-discard=${() => { this.setText(this.dictatedBefore); this.dictated = false; }}>${S.dictated}</zds-assist-chip></li>` : nothing}
        ${showChips ? repeat(this.attachments, (a) => a.id, (a) => html`<li><zds-assist-chip icon=${KIND_ICON[a.kind]}
          color=${this.attachmentColor(a)} discardable ?clickable=${a.kind === "image"}
          @click=${() => { if (a.kind === "image") this.emit("zds-preview-attachment", { attachment: a }); }}
          @zds-discard=${() => (this.attachments = this.attachments.filter((x) => x.id !== a.id))}>${a.file.name}</zds-assist-chip></li>`) : nothing}
        <li><slot name="attachments"></slot></li>
      </ul>

      ${bar ? html`<div class="voice"><div class="bar">${bar}</div>${hint ? html`<p class="hint">${hint}</p>` : nothing}</div>`
        : html`<textarea aria-label=${this.label} placeholder=${this.placeholder} rows="2" .value=${this.value}
          ?disabled=${this.disabled} maxlength=${this.maxLength ?? nothing} @paste=${this.onPaste}
          @input=${(e: Event) => { const v = (e.target as HTMLTextAreaElement).value; this.setText(v); if (!v) this.dictated = false; }}
          @keydown=${(e: KeyboardEvent) => {
            if (this.sendOnEnter && e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); this.send(); }
          }}></textarea>`}

      <span class="sr-only" role="status">${status ?? ""}</span>
      ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : nothing}
      ${this.maxLength !== null && len >= Math.ceil(this.maxLength * 0.8) && !bar
        ? html`<p class="count" ?data-full=${len >= this.maxLength}>${fmt(S.characterCount, { count: len, max: this.maxLength })}</p>` : nothing}

      <div class="toolbar">
        <div class="tools">
          <zds-icon-button class="tray-toggle" flavour="subtle" shape="full" size="small" icon=${this.trayOpen ? "close" : "add"}
            label=${this.trayOpen ? S.closeAttachments : S.addAttachments} .expanded=${this.trayOpen}
            ?data-open=${this.trayOpen} ?disabled=${!this.canAttach}
            @click=${() => (this.trayOpen = !this.trayOpen)}></zds-icon-button>
          <div class="tray" ?data-open=${this.trayOpen} ?inert=${!this.trayOpen}>
            <div class="tray-items">
              ${ib("attachment", S.attachFile, () => this.fileInput?.click())}
              ${ib("camera", S.takePhoto, () => this.cameraInput?.click())}
              <slot name="attachment-controls"></slot>
              ${this.actions.map((a) => ib(a.icon, a.label, a.onSelect))}
              ${this.canRecord ? ib("audio", S.recordVoiceMessage, () => void this.startVoiceNote()) : nothing}
            </div>
          </div>
          <div class="more-tools" ?hidden=${!showMore || !this.hasMoreTools}>
            <slot name="more-tools" @slotchange=${(e: Event) => (this.hasMoreTools = (e.target as HTMLSlotElement).assignedElements().length > 0)}></slot>
          </div>
        </div>
        <div class="actions">
          ${this.showReadAloud ? html`<zds-icon-button class="speak" flavour="subtle" shape="full" size="small"
            icon=${this.speakResponse ? "volume-up" : "volume-off"} label=${S.readAloud} aria-pressed=${String(this.speakResponse)}
            ?data-pressed=${this.speakResponse} ?disabled=${this.disabled}
            @click=${() => { this.speakResponse = !this.speakResponse; this.emit("zds-speak-response-change", { value: this.speakResponse }); }}></zds-icon-button>` : nothing}
          ${mode === "listening" || mode === "recording"
            ? html`<zds-icon-button flavour="primary" shape="full" size="small" icon="stop"
                label=${mode === "listening" ? S.stopAndTranscribe : S.stopRecording}
                @click=${() => void (mode === "listening" ? this.finishDictation() : this.finishVoiceNote())}></zds-icon-button>`
            : mode !== "playback" && this.canDictate
              ? html`<zds-icon-button flavour=${dictateOff ? "text" : "subtle"} shape="full" size="small" icon="microphone"
                  label=${S.dictate} ?disabled=${dictateOff} @click=${() => void this.startDictation()}></zds-icon-button>`
              : nothing}
          <zds-icon-button class="send" flavour="primary" shape="full" size="small" icon="send" label=${S.send}
            ?disabled=${!this.canSend} @click=${() => this.send()}></zds-icon-button>
        </div>
      </div>

      <input class="file" type="file" multiple accept=${this.accept ?? nothing} hidden
        @change=${(e: Event) => { const i = e.target as HTMLInputElement; this.addFiles(i.files); i.value = ""; this.trayOpen = false; }} />
      <input class="camera" type="file" accept="image/*" capture="environment" hidden
        @change=${(e: Event) => { const i = e.target as HTMLInputElement; this.addFiles(i.files); i.value = ""; this.trayOpen = false; }} />
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-message-input": ZdsMessageInput;
  }
}
