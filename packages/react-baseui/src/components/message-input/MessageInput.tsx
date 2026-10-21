import * as React from "react";
import { Toggle } from "@base-ui/react/toggle";
import { Icon, type IconName } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
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

/** A state to render without touching the microphone — for docs and visual review. */
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
  /** `accept` for the file picker. */
  accept?: string;
  /** Extra tray actions after file, camera and voice message — a sticker or note picker, say. */
  extraActions?: MessageInputAction[];
  /** Longest voice message, in seconds. */
  maxRecordingSeconds?: number;
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
  preview?: MessageInputPreview;
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
const clock = (ms: number) => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
let uid = 0;
const newId = () => `att-${Date.now().toString(36)}-${uid++}`;
const BARS = 9;
const SAMPLE_LEVELS = [0.35, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.65, 0.3];

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

/** Resample to `n` buckets by taking each bucket's peak. */
const resample = (peaks: number[], n: number) =>
  peaks.length === 0 ? Array(n).fill(0.2)
    : Array.from({ length: n }, (_, i) => Math.max(...peaks.slice(Math.floor((i * peaks.length) / n), Math.max(Math.floor(((i + 1) * peaks.length) / n), Math.floor((i * peaks.length) / n) + 1))));

/**
 * EXPERIMENTAL — no Figma spec. A message composer for conversational,
 * AI-assisted surfaces: type, attach files, dictate a prompt by voice,
 * record a voice message to send, and ask for the reply to be read aloud.
 *
 * States, from the reference design: empty, filled, attachment tray open,
 * listening → transcribing → dictated (voice prompt), recording → playback
 * (voice message), plus speaking when a reply is being read aloud. One bar
 * above the toolbar carries whichever of listening, transcribing, recording
 * or playback is live, with a hint line under it. Speaking replaces the
 * whole composer with an orb that reacts to the speech and one stop button.
 *
 * Behaviour: buttons are IconButton (Base UI Button); the read-aloud control
 * is Base UI's Toggle. Recording uses MediaRecorder and an AnalyserNode for
 * the live waveform; dictation uses the `transcribe` prop or the browser's
 * speech recognition. Enter sends, Shift+Enter adds a line. Everything
 * visual comes from the token layer via `message-input.css`.
 *
 * @spec none — experimental.
 */
export const MessageInput = React.forwardRef<HTMLDivElement, MessageInputProps>(function MessageInput(
  {
    onSend, placeholder = "Message", value: valueProp, defaultValue = "", onValueChange,
    defaultAttachments = [], defaultVoiceNote = null, defaultDictated = false, defaultTrayOpen = false,
    accept, extraActions = [], maxRecordingSeconds = 120, transcribe, lang,
    speakResponse: speakProp, defaultSpeakResponse, onSpeakResponseChange, speaking = false, onStopSpeaking,
    speakingSource = null, speakingLevel, speakingText, speakingCharIndex,
    preview, disabled = false, "aria-label": ariaLabel = "Message", className,
  },
  ref,
) {
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

  const speakControlled = speakProp !== undefined;
  const showSpeakToggle = speakControlled || defaultSpeakResponse !== undefined || onSpeakResponseChange !== undefined;
  const [innerSpeak, setInnerSpeak] = React.useState(defaultSpeakResponse ?? false);
  const speakOn = speakProp ?? innerSpeak;

  const canDictate = !!transcribe || !!getRecognition();
  const canRecord = typeof window !== "undefined" && typeof window.MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia;

  // ---- media plumbing ------------------------------------------------------
  const media = React.useRef<{ stream?: MediaStream; recorder?: MediaRecorder; ctx?: AudioContext; raf?: number; timer?: number;
    chunks: Blob[]; peaks: number[]; started: number; recognition?: SpeechRecognitionLike; transcript: string; cancelled: boolean }>({ chunks: [], peaks: [], started: 0, transcript: "", cancelled: false });

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
      setError("Microphone access was blocked. Allow it in the browser to use voice.");
      return false;
    }
    m.chunks = []; m.peaks = []; m.cancelled = false;
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
    const m = media.current;
    m.transcript = ""; m.cancelled = false;
    if (transcribe) {
      if (!(await record())) return;
    } else {
      const Recognition = getRecognition();
      if (!Recognition) return;
      const rec = new Recognition();
      rec.lang = lang ?? (typeof navigator !== "undefined" ? navigator.language : "en-US");
      rec.continuous = true; rec.interimResults = false;
      rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) m.transcript += e.results[i][0].transcript;
      };
      rec.onerror = () => setError("Speech recognition stopped. Try again.");
      m.recognition = rec;
      rec.start();
      // Recognition gives no levels; a quiet stream for the meter where the browser allows it.
      try { m.stream = await navigator.mediaDevices.getUserMedia({ audio: true }); meter(m.stream); } catch { /* bars stay at rest */ }
    }
    setMode("listening");
    startClock();
  };
  const finishDictation = async () => {
    const m = media.current;
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
      setError("Couldn't transcribe that. Try again.");
    }
    if (m.cancelled) return;
    words = words.trim();
    if (words) {
      const before = text;
      setText(before ? `${before.replace(/\s+$/, "")} ${words}` : words);
      setDictated({ before });
    }
    setMode("compose");
  };

  const cancelVoice = () => {
    media.current.cancelled = true;
    media.current.recorder?.stop();
    teardown();
    setMode("compose");
    setElapsed(0);
  };

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
  const addFiles = (list: FileList | null) => {
    if (!list?.length) return;
    setAttachments((a) => [...a, ...Array.from(list, (file) => ({ id: newId(), file, kind: kindOf(file) }))]);
  };

  // ---- send ----------------------------------------------------------------
  const busy = mode === "listening" || mode === "transcribing" || mode === "recording";
  const hasContent = !!text.trim() || attachments.length > 0 || !!voiceNote;
  const canSend = !disabled && !busy && hasContent;
  const send = () => {
    if (!canSend) return;
    audioRef.current?.pause();
    onSend?.({ text: text.trim(), attachments, voiceNote, dictated: !!dictated, speakResponse: speakOn });
    setText(""); setAttachments([]); setVoiceNote(null); setDictated(null); setTrayOpen(false); setMode("compose"); setPosition(0);
  };

  const setSpeak = (on: boolean) => { if (!speakControlled) setInnerSpeak(on); onSpeakResponseChange?.(on); };

  // ---- the bar: whichever voice state is live -------------------------------
  const maxMs = maxRecordingSeconds * 1000;
  let bar: React.ReactNode = null;
  let hint: string | null = null;
  if (mode === "listening") {
    hint = "Speak naturally. Tap Stop when you're done.";
    bar = <>
      <Waveform levels={levels} />
      <span className="zds-message-input__bar-label">Listening…</span>
      <span className="zds-message-input__time">{clock(elapsed)}</span>
      <IconButton flavour="text" shape="full" icon="close" label="Cancel dictation" onClick={cancelVoice} />
    </>;
  } else if (mode === "transcribing") {
    hint = "Usually takes a second or two.";
    bar = <>
      <span className="zds-message-input__spinner" aria-hidden="true" />
      <span className="zds-message-input__bar-label">Transcribing…</span>
      <IconButton flavour="text" shape="full" icon="close" label="Cancel transcription" onClick={cancelVoice} />
    </>;
  } else if (mode === "recording") {
    hint = `Up to ${clock(maxMs)}. You can listen back before sending.`;
    bar = <>
      <span className="zds-message-input__rec-dot" aria-hidden="true" />
      <Waveform levels={levels} />
      <span className="zds-message-input__bar-label">Recording</span>
      <span className="zds-message-input__time">{clock(elapsed)}</span>
      <IconButton flavour="text" shape="full" icon="close" label="Discard recording" onClick={cancelVoice} />
    </>;
  } else if (mode === "playback" && voiceNote) {
    hint = `Up to ${clock(maxMs)}. You can listen back before sending.`;
    bar = <>
      <IconButton className="zds-message-input__play" flavour="primary" shape="full" icon={playing ? "pause" : "play"} label={playing ? "Pause" : "Play voice message"} onClick={togglePlay} />
      <Waveform levels={resample(voiceNote.peaks, 24)} progress={position / Math.max(1, voiceNote.durationMs)} className="zds-message-input__wave--long" />
      <span className="zds-message-input__time">{clock(position)}/{clock(voiceNote.durationMs)}</span>
      <IconButton flavour="text" shape="full" icon="replay" label="Record again" onClick={reRecord} />
      <IconButton flavour="text" shape="full" icon="delete" label="Delete voice message" onClick={discardNote} />
      {noteUrl ? (
        <audio ref={audioRef} src={noteUrl} preload="metadata"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setPosition(0); }}
          onTimeUpdate={(e) => setPosition(e.currentTarget.currentTime * 1000)} />
      ) : null}
    </>;
  }
  const state = mode === "compose" ? (speaking ? "speaking" : trayOpen ? "tray" : hasContent ? "filled" : "empty") : mode;

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
          <span className="zds-message-input__sr-only" role="status">{speakingText ? `Speaking: ${speakingText}` : "Speaking the reply"}</span>
          <IconButton className="zds-message-input__stop-speaking" flavour="subtle" shape="full" size="medium" icon="stop"
            label="Stop speaking" onClick={onStopSpeaking} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} role="group" aria-label={ariaLabel}
      className={["zds-message-input", className].filter(Boolean).join(" ")}
      data-state={state} data-disabled={disabled || undefined}>
      {(attachments.length > 0 || dictated) && mode === "compose" ? (
        <ul className="zds-message-input__chips" aria-label="Attached">
          {dictated ? (
            <li className="zds-message-input__chip" data-kind="dictated">
              <Icon name="microphone" size="small" iconStyle="rounded" />
              <span className="zds-message-input__chip-label">Dictated</span>
              <button type="button" className="zds-message-input__chip-remove" aria-label="Undo dictation"
                onClick={() => { setText(dictated.before); setDictated(null); }}>
                <Icon name="close" size="small" iconStyle="rounded" />
              </button>
            </li>
          ) : null}
          {attachments.map((a) => (
            <li key={a.id} className="zds-message-input__chip" data-kind={a.kind}>
              <Icon name={KIND_ICON[a.kind]} size="small" iconStyle="rounded" />
              <span className="zds-message-input__chip-label">{a.file.name}</span>
              <button type="button" className="zds-message-input__chip-remove" aria-label={`Remove ${a.file.name}`}
                onClick={() => setAttachments((list) => list.filter((x) => x.id !== a.id))}>
                <Icon name="close" size="small" iconStyle="rounded" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {bar ? (
        <div className="zds-message-input__voice">
          <div className="zds-message-input__bar" role="status" aria-live="polite">{bar}</div>
          {hint ? <p className="zds-message-input__hint">{hint}</p> : null}
        </div>
      ) : (
        <textarea className="zds-message-input__text" aria-label={ariaLabel} placeholder={placeholder} rows={2}
          value={text} disabled={disabled}
          onChange={(e) => { setText(e.target.value); if (!e.target.value) setDictated(null); }}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } }} />
      )}

      {error ? <p className="zds-message-input__error" role="alert">{error}</p> : null}

      <div className="zds-message-input__toolbar">
        <div className="zds-message-input__tools">
          {/* One glyph, turned 45° to read as × when open, so the change can animate. */}
          <IconButton className="zds-message-input__tray-toggle" flavour="text" shape="full"
            icon="add" label={trayOpen ? "Close attachments" : "Add attachments"}
            aria-expanded={trayOpen} aria-controls={trayId} data-open={trayOpen || undefined}
            disabled={disabled || busy || mode === "playback" || speaking} onClick={() => setTrayOpen((o) => !o)} />
          {/* Always mounted so closing animates too; inert while closed keeps it out of tab order and AT. */}
          <div id={trayId} className="zds-message-input__tray" data-open={trayOpen || undefined} inert={!trayOpen}>
            <div className="zds-message-input__tray-items">
              <IconButton flavour="text" shape="full" icon="attachment" label="Attach a file" onClick={() => fileRef.current?.click()} />
              <IconButton flavour="text" shape="full" icon="camera" label="Take a photo" onClick={() => cameraRef.current?.click()} />
              {extraActions.map((a) => <IconButton key={a.label} flavour="text" shape="full" icon={a.icon} label={a.label} onClick={a.onSelect} />)}
              {canRecord ? <IconButton flavour="text" shape="full" icon="audio" label="Record a voice message" onClick={() => void startVoiceNote()} /> : null}
            </div>
          </div>
        </div>
        <div className="zds-message-input__actions">
          {showSpeakToggle ? (
            <Toggle className="zds-button zds-icon-button zds-message-input__speak" data-flavour="text" data-size="small" data-shape="full"
              aria-label="Read replies aloud" pressed={speakOn} onPressedChange={setSpeak} disabled={disabled}>
              <Icon className="zds-button__icon" name={speakOn ? "volume-up" : "volume-off"} size="small" iconStyle="rounded" />
            </Toggle>
          ) : null}
          {mode === "listening" || mode === "recording" ? (
            <IconButton flavour="primary" shape="full" size="medium" icon="stop"
              label={mode === "listening" ? "Stop and transcribe" : "Stop recording"}
              onClick={() => void (mode === "listening" ? finishDictation() : finishVoiceNote())} />
          ) : canDictate && mode !== "playback" ? (
            <IconButton flavour="text" shape="full" icon="microphone" label="Dictate" disabled={disabled || busy || speaking} onClick={() => void startDictation()} />
          ) : null}
          <IconButton className="zds-message-input__send" flavour="primary" shape="full" size="medium" icon="send" label="Send"
            disabled={!canSend} onClick={send} />
        </div>
      </div>

      <input ref={fileRef} type="file" multiple accept={accept} hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; setTrayOpen(false); }} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; setTrayOpen(false); }} />
    </div>
  );
});
