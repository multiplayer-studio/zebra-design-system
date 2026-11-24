import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { AssistChip } from "../assist-chip/AssistChip.js";
import { ProgressCircle } from "../progress-circle/ProgressCircle.js";
import { cx } from "../chip/chip.js";
import "../button/button.css";
import "./message-input.css";
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
const fmt = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
const formatBytes = (n) => n >= 1024 * 1024 ? `${Math.round((n / (1024 * 1024)) * 10) / 10} MB` : `${Math.round(n / 1024)} KB`;
/** The same test the file picker's `accept` applies: extensions, exact types and `type/*`. */
const matchesAccept = (f, accept) => {
    if (!accept)
        return true;
    const type = f.type.toLowerCase();
    const name = f.name.toLowerCase();
    return accept.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean).some((t) => t.startsWith(".") ? name.endsWith(t) : t.endsWith("/*") ? type.startsWith(t.slice(0, -1)) : type === t);
};
const getRecognition = () => {
    if (typeof window === "undefined")
        return null;
    const w = window;
    return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null);
};
const kindOf = (f) => f.type.startsWith("image/") ? "image" : f.type.startsWith("video/") ? "video" : f.type.startsWith("audio/") ? "audio" : "document";
const KIND_ICON = { document: "document", image: "camera", video: "video", audio: "audio" };
/** Colour marks the kind of file (Assist Chip spec "Colour overrides"): PDF red, spreadsheets green, documents blue, video orange (as the Figma attachment state). */
export const defaultAttachmentColor = (a) => {
    const ext = a.file.name.split(".").pop()?.toLowerCase() ?? "";
    if (ext === "pdf")
        return "red";
    if (["xls", "xlsx", "csv", "numbers", "ods"].includes(ext))
        return "green";
    if (["doc", "docx", "txt", "rtf", "pages", "odt", "md"].includes(ext))
        return "blue";
    if (a.kind === "video")
        return "orange";
    return "neutral";
};
const clock = (ms) => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };
let uid = 0;
const newId = () => `att-${Date.now().toString(36)}-${uid++}`;
const BARS = 9;
const SAMPLE_LEVELS = [0.35, 0.7, 0.5, 0.9, 0.6, 0.8, 0.4, 0.65, 0.3];
/** A silent take for `state="playback"`, so the state renders without a recording. */
const SAMPLE_NOTE = {
    blob: new Blob([], { type: "audio/webm" }), durationMs: 4000,
    peaks: [0.3, 0.8, 0.35, 0.45, 0.55, 0.85, 0.7, 0.5, 0.35, 0.45, 0.95, 0.4, 0.7, 0.3, 0.65, 0.5, 0.9, 0.55, 0.4, 0.5, 0.6, 0.95, 0.45, 0.5],
};
/** Bars drawn in currentColor. `progress` 0–1 dims the unplayed part. */
function Waveform({ levels, progress, className }) {
    return (_jsx("span", { className: ["zds-message-input__wave", className].filter(Boolean).join(" "), "aria-hidden": "true", children: levels.map((l, i) => (_jsx("span", { className: "zds-message-input__level", "data-played": progress === undefined || i / levels.length < progress ? "" : undefined, style: { "--zds-bar-level": Math.max(0.15, Math.min(1, l)) } }, i))) }));
}
// One AudioContext for every orb, and one source node per media element:
// createMediaElementSource may only ever be called once per element, and
// takes over its output, so the source is kept and wired to the speakers.
let sharedCtx = null;
const elementSources = new WeakMap();
/** Calls `onLevel` with the source's loudness (0–1) every frame. Returns a stop function. */
function listenTo(source, onLevel) {
    if (typeof window === "undefined" || typeof AudioContext === "undefined")
        return () => { };
    const ctx = (sharedCtx ??= new AudioContext());
    void ctx.resume().catch(() => { });
    let node;
    if (source instanceof MediaStream) {
        node = ctx.createMediaStreamSource(source);
    }
    else {
        let s = elementSources.get(source);
        if (!s) {
            s = ctx.createMediaElementSource(source);
            s.connect(ctx.destination);
            elementSources.set(source, s);
        }
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
        if (!(source instanceof MediaStream) && source.paused) {
            smoothed = 0;
            if (sent !== 0)
                onLevel((sent = 0));
            return;
        }
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (const v of data) {
            const x = (v - 128) / 128;
            sum += x * x;
        }
        const rms = Math.min(1, Math.sqrt(sum / data.length) * 4);
        // Rise fast, fall slowly, so the orb swells on a syllable and eases back.
        smoothed = rms > smoothed ? smoothed + (rms - smoothed) * 0.6 : smoothed + (rms - smoothed) * 0.12;
        // Only write when the level visibly moves, so silence restyles nothing.
        if (Math.abs(smoothed - sent) > 0.004)
            onLevel((sent = smoothed));
        raf = requestAnimationFrame(tick);
    };
    const resume = () => { if (!raf)
        tick(); };
    if (!(source instanceof MediaStream))
        source.addEventListener("play", resume);
    tick();
    return () => {
        cancelAnimationFrame(raf);
        if (!(source instanceof MediaStream))
            source.removeEventListener("play", resume);
        try {
            node.disconnect(analyser);
        }
        catch { /* already gone */ }
        if (source instanceof MediaStream)
            node.disconnect();
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
const Orb = React.forwardRef(function Orb({ reactive }, ref) {
    const gid = `${React.useId()}-orb`;
    return (_jsx("span", { ref: ref, className: "zds-message-input__orb", "data-reactive": reactive || undefined, "aria-hidden": "true", children: RINGS.map((r, i) => (_jsxs("svg", { viewBox: "0 0 100 100", className: "zds-message-input__ring", style: { "--ring": i }, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: `${gid}-${i}`, x1: "0", y1: "0", x2: "1", y2: "1", children: [_jsx("stop", { offset: "0", className: "zds-message-input__orb-stop-start" }), _jsx("stop", { offset: "1", className: "zds-message-input__orb-stop-end" })] }) }), _jsx("ellipse", { cx: "50", cy: "50", rx: r.rx, ry: r.ry, stroke: `url(#${gid}-${i})`, transform: `rotate(${i * 30} 50 50) translate(50 50) scale(${0.7 + i * 0.05}) translate(-50 -50)` })] }, i))) }));
});
const wordsOf = (text) => {
    const out = [];
    const re = /\S+/g;
    for (let m; (m = re.exec(text));)
        out.push({ word: m[0], start: m.index });
    return out;
};
const wordAt = (words, char) => {
    let i = -1;
    while (i + 1 < words.length && words[i + 1].start <= char)
        i++;
    return i;
};
/**
 * The reply, word by word: a word fades in as it is spoken and fades away
 * as the voice moves on; three lines show, older ones fading out at the top.
 */
function SpokenCaption({ text, charIndex, media }) {
    const words = React.useMemo(() => wordsOf(text), [text]);
    const [fromMedia, setFromMedia] = React.useState(-1);
    React.useEffect(() => {
        if (charIndex !== undefined || !media)
            return;
        // Follow playback every frame while it plays; idle while paused.
        let raf = 0;
        const read = () => { if (media.duration > 0)
            setFromMedia(wordAt(words, (media.currentTime / media.duration) * text.length)); };
        const tick = () => { read(); raf = media.paused ? 0 : requestAnimationFrame(tick); };
        const start = () => { if (!raf)
            tick(); };
        media.addEventListener("play", start);
        media.addEventListener("seeked", read);
        tick();
        return () => { cancelAnimationFrame(raf); media.removeEventListener("play", start); media.removeEventListener("seeked", read); };
    }, [charIndex, media, words, text.length]);
    const known = charIndex !== undefined || !!media;
    const current = charIndex !== undefined ? wordAt(words, charIndex) : media ? fromMedia : words.length - 1;
    // Keep the spoken word on the caption's last line.
    const boxRef = React.useRef(null);
    React.useEffect(() => {
        const box = boxRef.current;
        const el = box?.querySelector(`[data-i="${Math.max(0, current)}"]`);
        if (!box || !el)
            return;
        const top = Math.max(0, el.offsetTop + el.offsetHeight - box.clientHeight);
        const still = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
        box.scrollTo({ top, behavior: still ? "auto" : "smooth" });
    }, [current]);
    return (_jsx("p", { ref: boxRef, className: "zds-message-input__caption", "aria-hidden": "true", "data-tracking": known || undefined, children: words.map((w, i) => {
            const when = i > current ? "next" : i === current ? "now" : "past";
            return (_jsxs(React.Fragment, { children: [_jsx("span", { "data-i": i, "data-when": when, className: "zds-message-input__word", style: when === "past" ? { "--behind": Math.min(current - i, 12) } : undefined, children: w.word }), " "] }, i));
        }) }));
}
/**
 * An image attachment as a thumbnail chip — Message Input's own subcomponent.
 * Built on the chip base (same 28px height, inset border, focus ring and
 * remove control as Assist Chip) but a rounded rectangle rather than a pill,
 * with the picture inset by a hair of padding and the name kept short by
 * truncation (the picture carries the identity; the full name is the title).
 */
export const MessageThumbnail = React.forwardRef(function MessageThumbnail({ file, onClick, onDiscard, discardLabel, className }, ref) {
    const url = React.useMemo(() => URL.createObjectURL(file), [file]);
    React.useEffect(() => () => URL.revokeObjectURL(url), [url]);
    const onKeyDown = (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            onDiscard?.();
        }
    };
    const content = (_jsxs(_Fragment, { children: [_jsx("img", { className: "zds-message-input__thumbnail-image", src: url, alt: "" }), _jsx("span", { className: "zds-chip__label", title: file.name, children: file.name })] }));
    return (_jsxs("span", { ref: ref, className: cx("zds-chip", "zds-message-input__thumbnail", className), "data-discardable": "", "data-clickable": onClick ? "" : undefined, children: [onClick ? _jsx(BaseButton, { className: "zds-message-input__thumbnail-action", onClick: () => onClick(), children: content }) : content, _jsx(BaseButton, { className: "zds-message-input__thumbnail-remove", "aria-label": discardLabel ?? `Remove ${file.name}`, onClick: () => onDiscard?.(), onKeyDown: onKeyDown, children: _jsx(Icon, { className: "zds-chip__glyph", name: "close", size: "small", iconStyle: "rounded" }) })] }));
});
/** An attachment: an image is a MessageThumbnail; every other kind an Assist Chip with its glyph. */
function AttachmentChip({ attachment: a, color, onDiscard, onPreview }) {
    if (a.kind === "image")
        return _jsx(MessageThumbnail, { file: a.file, onClick: onPreview ? () => onPreview(a) : undefined, onDiscard: onDiscard });
    return _jsx(AssistChip, { icon: KIND_ICON[a.kind], color: color, onDiscard: onDiscard, children: a.file.name });
}
/** Resample to `n` buckets by taking each bucket's peak. */
const resample = (peaks, n) => peaks.length === 0 ? Array(n).fill(0.2)
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
export const MessageInput = React.forwardRef(function MessageInput({ onSend, placeholder = "Message", value: valueProp, defaultValue = "", onValueChange, defaultAttachments = [], defaultVoiceNote = null, defaultDictated = false, defaultTrayOpen = false, accept, extraActions = [], maxRecordingSeconds = 120, maxDictationSeconds = 60, maxLength, maxAttachments, maxFileBytes, sendOnEnter = true, strings, attachmentColor = defaultAttachmentColor, onPreviewAttachment, transcribe, lang, speakResponse: speakProp, defaultSpeakResponse, onSpeakResponseChange, speaking = false, onStopSpeaking, speakingSource = null, speakingLevel, speakingText, speakingCharIndex, state: pinned, preview: previewProp, attachmentSlot, moreTools, replyTo, replyText, onCancelReply, disabled: disabledProp = false, "aria-label": ariaLabel = "Message", className, }, ref) {
    // A pinned state stands in for what the microphone, the tray and the
    // dictation would otherwise have set. Voice states start from it; the rest
    // seed the matching piece of state.
    const preview = pinned === "listening" || pinned === "transcribing" || pinned === "recording" ? pinned : previewProp;
    const disabled = disabledProp || pinned === "disabled";
    if (pinned === "playback" && !defaultVoiceNote)
        defaultVoiceNote = SAMPLE_NOTE;
    if (pinned === "dictated")
        defaultDictated = true;
    if (pinned === "attachment-open")
        defaultTrayOpen = true;
    if (pinned === "speaking")
        speaking = true;
    const [innerText, setInnerText] = React.useState(defaultValue);
    const text = valueProp ?? innerText;
    const setText = (v) => { if (valueProp === undefined)
        setInnerText(v); onValueChange?.(v); };
    const [attachments, setAttachments] = React.useState(defaultAttachments);
    const [voiceNote, setVoiceNote] = React.useState(defaultVoiceNote);
    const [dictated, setDictated] = React.useState(defaultDictated ? { before: "" } : null);
    const [trayOpen, setTrayOpen] = React.useState(defaultTrayOpen);
    const trayId = `${React.useId()}-tray`;
    const [mode, setMode] = React.useState(preview ?? (defaultVoiceNote ? "playback" : "compose"));
    const [elapsed, setElapsed] = React.useState(preview ? 7000 : 0);
    const [levels, setLevels] = React.useState(SAMPLE_LEVELS);
    const [error, setError] = React.useState(null);
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
    const media = React.useRef({ chunks: [], peaks: [], started: 0, transcript: "", cancelled: false, finishing: false });
    const teardown = React.useCallback(() => {
        const m = media.current;
        if (m.raf)
            cancelAnimationFrame(m.raf);
        if (m.timer)
            clearInterval(m.timer);
        m.stream?.getTracks().forEach((t) => t.stop());
        void m.ctx?.close().catch(() => { });
        m.recognition?.abort();
        Object.assign(m, { stream: undefined, recorder: undefined, ctx: undefined, raf: undefined, timer: undefined, recognition: undefined });
    }, []);
    React.useEffect(() => teardown, [teardown]);
    const meter = (stream) => {
        const m = media.current;
        const ctx = new AudioContext();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        ctx.createMediaStreamSource(stream).connect(analyser);
        const data = new Uint8Array(analyser.fftSize);
        const history = [];
        const tick = () => {
            analyser.getByteTimeDomainData(data);
            let peak = 0;
            for (const v of data)
                peak = Math.max(peak, Math.abs(v - 128) / 128);
            const level = Math.min(1, peak * 2.5);
            m.peaks.push(level);
            history.push(level);
            if (history.length > BARS)
                history.shift();
            setLevels([...Array(BARS - history.length).fill(0.15), ...history]);
            m.raf = requestAnimationFrame(tick);
        };
        m.ctx = ctx;
        tick();
    };
    const startClock = (limitMs, onLimit) => {
        const m = media.current;
        m.started = Date.now();
        setElapsed(0);
        m.timer = window.setInterval(() => {
            const ms = Date.now() - m.started;
            setElapsed(ms);
            if (limitMs && ms >= limitMs)
                onLimit?.();
        }, 200);
    };
    const record = async () => {
        const m = media.current;
        setError(null);
        try {
            m.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
        catch {
            setError(S.micBlocked);
            return false;
        }
        m.chunks = [];
        m.peaks = [];
        m.cancelled = false;
        m.finishing = false;
        m.recorder = new MediaRecorder(m.stream);
        m.recorder.ondataavailable = (e) => { if (e.data.size)
            m.chunks.push(e.data); };
        m.recorder.start();
        meter(m.stream);
        return true;
    };
    const stopRecorder = () => new Promise((resolve) => {
        const m = media.current;
        const r = m.recorder;
        if (!r || r.state === "inactive")
            return resolve(new Blob(m.chunks));
        r.onstop = () => resolve(new Blob(m.chunks, { type: r.mimeType }));
        r.stop();
    });
    // ---- voice message: recording → playback --------------------------------
    const startVoiceNote = async () => {
        setTrayOpen(false);
        if (!(await record()))
            return;
        setMode("recording");
        startClock(maxRecordingSeconds * 1000, () => void finishVoiceNote());
    };
    const finishVoiceNote = async () => {
        const m = media.current;
        if (m.finishing)
            return; // the limit clock keeps firing while the recorder stops
        m.finishing = true;
        const durationMs = Date.now() - m.started;
        const blob = await stopRecorder();
        const peaks = m.peaks;
        teardown();
        if (m.cancelled)
            return;
        setVoiceNote({ blob, durationMs, peaks });
        setMode("playback");
    };
    // ---- voice prompt: listening → transcribing → dictated ------------------
    const startDictation = async () => {
        setTrayOpen(false);
        setError(null);
        setHeard("");
        const m = media.current;
        m.transcript = "";
        m.cancelled = false;
        m.finishing = false;
        if (transcribe) {
            if (!(await record()))
                return;
        }
        else {
            const Recognition = getRecognition();
            if (!Recognition)
                return;
            const rec = new Recognition();
            rec.lang = lang ?? (typeof navigator !== "undefined" ? navigator.language : "en-US");
            // Interim results show the words landing while the mic is open.
            rec.continuous = true;
            rec.interimResults = true;
            rec.onresult = (e) => {
                let interim = "";
                for (let i = e.resultIndex; i < e.results.length; i++) {
                    if (e.results[i].isFinal)
                        m.transcript += e.results[i][0].transcript;
                    else
                        interim += e.results[i][0].transcript;
                }
                setHeard((m.transcript + interim).trim());
            };
            rec.onerror = () => setError(S.recognitionError);
            m.recognition = rec;
            rec.start();
            // Recognition gives no levels; a quiet stream for the meter where the browser allows it.
            try {
                m.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                meter(m.stream);
            }
            catch { /* bars stay at rest */ }
        }
        setMode("listening");
        // A forgotten open microphone stops itself and keeps what it heard.
        startClock(maxDictationSeconds * 1000, () => void finishDictation());
    };
    const finishDictation = async () => {
        const m = media.current;
        if (m.finishing)
            return; // the limit clock keeps firing while recognition winds down
        m.finishing = true;
        setMode("transcribing");
        let words = "";
        try {
            if (transcribe) {
                const blob = await stopRecorder();
                teardown();
                words = await transcribe(blob);
            }
            else {
                const rec = m.recognition;
                await new Promise((resolve) => { if (!rec)
                    return resolve(); rec.onend = () => resolve(); rec.stop(); });
                m.recognition = undefined;
                teardown();
                words = m.transcript;
            }
        }
        catch {
            setError(S.transcribeError);
        }
        setHeard("");
        if (m.cancelled)
            return;
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
        if (disabled && busyNow)
            cancelVoice();
        // cancelVoice is stable in effect: it only touches refs and setters.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled]);
    // ---- playback ------------------------------------------------------------
    const audioRef = React.useRef(null);
    const [playing, setPlaying] = React.useState(false);
    const [position, setPosition] = React.useState(0);
    const noteUrl = React.useMemo(() => (voiceNote ? URL.createObjectURL(voiceNote.blob) : null), [voiceNote]);
    React.useEffect(() => () => { if (noteUrl)
        URL.revokeObjectURL(noteUrl); }, [noteUrl]);
    const togglePlay = () => {
        const a = audioRef.current;
        if (!a)
            return;
        if (a.paused)
            void a.play();
        else
            a.pause();
    };
    const discardNote = () => { audioRef.current?.pause(); setVoiceNote(null); setPosition(0); setMode("compose"); };
    const reRecord = () => { discardNote(); void startVoiceNote(); };
    // ---- attachments ---------------------------------------------------------
    const fileRef = React.useRef(null);
    const cameraRef = React.useRef(null);
    /** One gate for every way in — picker, camera, drop and paste. Refusals use the error row. */
    const addFiles = (list) => {
        if (!list || list.length === 0 || disabled)
            return;
        const refused = [];
        const ok = [];
        for (const file of Array.from(list)) {
            if (!matchesAccept(file, accept))
                refused.push(fmt(S.fileNotAccepted, { name: file.name }));
            else if (maxFileBytes !== undefined && file.size > maxFileBytes)
                refused.push(fmt(S.fileTooLarge, { name: file.name, size: formatBytes(maxFileBytes) }));
            else
                ok.push({ id: newId(), file, kind: kindOf(file) });
        }
        if (maxAttachments !== undefined && attachments.length + ok.length > maxAttachments) {
            ok.length = Math.max(0, maxAttachments - attachments.length);
            refused.push(fmt(S.tooManyAttachments, { count: maxAttachments }));
        }
        if (ok.length)
            setAttachments((a) => [...a, ...ok]);
        setError(refused.length ? refused[0] : null);
    };
    // ---- send ----------------------------------------------------------------
    const busy = busyNow;
    const hasContent = !!text.trim() || attachments.length > 0 || !!voiceNote;
    const canSend = !disabled && !busy && hasContent;
    const send = () => {
        if (!canSend)
            return;
        audioRef.current?.pause();
        onSend?.({ text: text.trim(), attachments, voiceNote, dictated: !!dictated, speakResponse: speakOn });
        setText("");
        setAttachments([]);
        setVoiceNote(null);
        setDictated(null);
        setTrayOpen(false);
        setMode("compose");
        setPosition(0);
    };
    const setSpeak = (on) => { if (!speakControlled)
        setInnerSpeak(on); onSpeakResponseChange?.(on); };
    // ---- files from anywhere: drop and paste ----------------------------------
    // The same conditions as the tray toggle: no new files while a voice state
    // or a finished voice note holds the composer.
    const canAttach = !disabled && !busy && mode !== "playback" && !speaking;
    const [dragging, setDragging] = React.useState(false);
    const dragDepth = React.useRef(0);
    const draggingFiles = (e) => Array.from(e.dataTransfer.types).includes("Files");
    const onDragEnter = (e) => {
        if (!canAttach || !draggingFiles(e))
            return;
        e.preventDefault();
        dragDepth.current += 1;
        setDragging(true);
    };
    const onDragOver = (e) => { if (canAttach && draggingFiles(e))
        e.preventDefault(); };
    const onDragLeave = () => { if (dragDepth.current > 0 && --dragDepth.current === 0)
        setDragging(false); };
    const onDrop = (e) => {
        if (!draggingFiles(e))
            return;
        e.preventDefault();
        dragDepth.current = 0;
        setDragging(false);
        if (canAttach)
            addFiles(e.dataTransfer.files);
    };
    const onPaste = (e) => {
        if (!canAttach || !e.clipboardData.files.length)
            return;
        e.preventDefault();
        addFiles(e.clipboardData.files);
    };
    // Escape backs out of the nearest thing: a live voice state first, then the open tray.
    const trayToggleRef = React.useRef(null);
    const onKeyDown = (e) => {
        if (e.key !== "Escape")
            return;
        if (busy) {
            e.stopPropagation();
            cancelVoice();
        }
        else if (trayOpen) {
            e.stopPropagation();
            setTrayOpen(false);
            trayToggleRef.current?.focus();
        }
    };
    // ---- the bar: whichever voice state is live -------------------------------
    const maxMs = maxRecordingSeconds * 1000;
    // The last stretch of what recognition heard; the full text lands in the field at the end.
    const heardTail = heard.length > 60 ? `…${heard.slice(-60)}` : heard;
    let bar = null;
    let hint = null;
    /** Announced on mode change only — the clock and the interim words stay out of the live region. */
    let status = null;
    if (mode === "listening") {
        hint = S.listeningHint;
        status = S.listening;
        bar = _jsxs(_Fragment, { children: [_jsx(Waveform, { levels: levels }), _jsx("span", { className: "zds-message-input__bar-label", "data-heard": heard ? "" : undefined, "aria-hidden": heard ? true : undefined, children: heardTail || S.listening }), _jsx("span", { className: "zds-message-input__time", "aria-hidden": "true", children: clock(elapsed) }), _jsx(IconButton, { flavour: "subtle", shape: "full", icon: "close", label: S.cancelDictation, onClick: cancelVoice })] });
    }
    else if (mode === "transcribing") {
        hint = S.transcribingHint;
        status = S.transcribing;
        bar = _jsxs(_Fragment, { children: [_jsx(ProgressCircle, { className: "zds-message-input__spinner", value: null, size: "xxsmall", label: S.transcribing }), _jsx("span", { className: "zds-message-input__bar-label", children: S.transcribing }), _jsx(IconButton, { flavour: "subtle", shape: "full", icon: "close", label: S.cancelTranscription, onClick: cancelVoice })] });
    }
    else if (mode === "recording") {
        hint = fmt(S.recordingHint, { time: clock(maxMs) });
        status = S.recording;
        bar = _jsxs(_Fragment, { children: [_jsx("span", { className: "zds-message-input__rec-dot", "aria-hidden": "true" }), _jsx(Waveform, { levels: levels }), _jsx("span", { className: "zds-message-input__bar-label", children: S.recording }), _jsx("span", { className: "zds-message-input__time", "aria-hidden": "true", children: clock(elapsed) }), _jsx(IconButton, { flavour: "subtle", shape: "full", icon: "close", label: S.discardRecording, onClick: cancelVoice })] });
    }
    else if (mode === "playback" && voiceNote) {
        hint = fmt(S.recordingHint, { time: clock(maxMs) });
        status = S.playbackReady;
        bar = _jsxs(_Fragment, { children: [_jsx(IconButton, { className: "zds-message-input__play", flavour: "primary", shape: "full", icon: playing ? "pause" : "play", label: playing ? S.pause : S.play, onClick: togglePlay }), _jsx(Waveform, { levels: resample(voiceNote.peaks, 24), progress: position / Math.max(1, voiceNote.durationMs), className: "zds-message-input__wave--long" }), _jsxs("span", { className: "zds-message-input__time", children: [clock(position), "/", clock(voiceNote.durationMs)] }), _jsx(IconButton, { flavour: "subtle", shape: "full", icon: "replay", label: S.recordAgain, onClick: reRecord }), _jsx(IconButton, { flavour: "subtle", shape: "full", icon: "delete", label: S.deleteVoiceMessage, onClick: discardNote }), noteUrl ? (_jsx("audio", { ref: audioRef, src: noteUrl, preload: "metadata", onPlay: () => setPlaying(true), onPause: () => setPlaying(false), onEnded: () => { setPlaying(false); setPosition(0); }, onTimeUpdate: (e) => setPosition(e.currentTarget.currentTime * 1000) })) : null] });
    }
    const state = mode === "compose"
        ? (speaking ? "speaking" : disabled ? "disabled" : trayOpen ? "attachment-open" : dictated ? "dictated" : hasContent ? "filled" : "empty")
        : mode;
    // ---- speaking: the orb ------------------------------------------------------
    // The level goes straight onto the orb as a custom property, every frame,
    // without a React render.
    const orbRef = React.useRef(null);
    const reactive = !!speakingSource || speakingLevel !== undefined;
    React.useEffect(() => {
        if (state !== "speaking" || !speakingSource)
            return;
        return listenTo(speakingSource, (level) => orbRef.current?.style.setProperty("--zds-orb-level", level.toFixed(3)));
    }, [state, speakingSource]);
    React.useEffect(() => {
        if (state !== "speaking" || speakingSource || speakingLevel === undefined)
            return;
        orbRef.current?.style.setProperty("--zds-orb-level", String(Math.max(0, Math.min(1, speakingLevel))));
    }, [state, speakingSource, speakingLevel]);
    if (state === "speaking") {
        return (_jsx("div", { ref: ref, role: "group", "aria-label": ariaLabel, className: ["zds-message-input", className].filter(Boolean).join(" "), "data-state": "speaking", "data-disabled": disabled || undefined, children: _jsxs("div", { className: "zds-message-input__speaking", children: [_jsx(Orb, { ref: orbRef, reactive: reactive }), speakingText ? (_jsx(SpokenCaption, { text: speakingText, charIndex: speakingCharIndex, media: speakingSource instanceof HTMLMediaElement ? speakingSource : null })) : null, _jsx("span", { className: "zds-message-input__sr-only", role: "status", children: speakingText ? fmt(S.speakingText, { text: speakingText }) : S.speaking }), _jsx(IconButton, { className: "zds-message-input__stop-speaking", flavour: "subtle", shape: "full", icon: "stop", label: S.stopSpeaking, onClick: onStopSpeaking })] }) }));
    }
    return (_jsxs("div", { ref: ref, role: "group", "aria-label": ariaLabel, className: ["zds-message-input", className].filter(Boolean).join(" "), "data-state": state, "data-disabled": disabled || undefined, "data-dragging": dragging || undefined, onDragEnter: onDragEnter, onDragOver: onDragOver, onDragLeave: onDragLeave, onDrop: onDrop, onKeyDown: onKeyDown, children: [replyTo && !disabled ? (_jsxs(BaseButton, { className: "zds-message-input__reply", "aria-label": fmt(S.cancelReply, { name: replyTo }), onClick: () => onCancelReply?.(), children: [_jsx(Icon, { name: "reply", size: "small", iconStyle: "rounded" }), _jsxs("span", { className: "zds-message-input__reply-text", children: [_jsx("span", { className: "zds-message-input__reply-label", children: S.replyingTo }), _jsx("span", { className: "zds-message-input__reply-name", children: replyTo }), replyText ? _jsx("span", { className: "zds-message-input__reply-quote", children: replyText }) : null] }), _jsx(Icon, { name: "close", size: "small", iconStyle: "rounded" })] })) : null, (attachments.length > 0 || dictated || attachmentSlot) && mode === "compose" ? (_jsxs("ul", { className: "zds-message-input__chips", "aria-label": S.attached, children: [dictated ? (_jsx("li", { className: "zds-message-input__chip", "data-kind": "dictated", children: _jsx(AssistChip, { icon: "microphone", color: "blue", discardLabel: S.undoDictation, onDiscard: () => { setText(dictated.before); setDictated(null); }, children: S.dictated }) })) : null, attachments.map((a) => (_jsx("li", { className: "zds-message-input__chip", "data-kind": a.kind, children: _jsx(AttachmentChip, { attachment: a, color: attachmentColor(a), onPreview: onPreviewAttachment, onDiscard: () => setAttachments((list) => list.filter((x) => x.id !== a.id)) }) }, a.id))), attachmentSlot ? _jsx("li", { className: "zds-message-input__chip", "data-kind": "slot", children: attachmentSlot }) : null] })) : null, bar ? (_jsxs("div", { className: "zds-message-input__voice", children: [_jsx("div", { className: "zds-message-input__bar", children: bar }), hint ? _jsx("p", { className: "zds-message-input__hint", children: hint }) : null] })) : (_jsx("textarea", { className: "zds-message-input__text", "aria-label": ariaLabel, placeholder: placeholder, rows: 2, value: text, disabled: disabled, maxLength: maxLength, onPaste: onPaste, onChange: (e) => { setText(e.target.value); if (!e.target.value)
                    setDictated(null); }, onKeyDown: (e) => { if (sendOnEnter && e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    send();
                } } })), _jsx("span", { className: "zds-message-input__sr-only", role: "status", children: status }), error ? _jsx("p", { className: "zds-message-input__error", role: "alert", children: error }) : null, maxLength !== undefined && text.length >= Math.ceil(maxLength * 0.8) && !bar ? (_jsx("p", { className: "zds-message-input__count", "data-full": text.length >= maxLength || undefined, children: fmt(S.characterCount, { count: text.length, max: maxLength }) })) : null, _jsxs("div", { className: "zds-message-input__toolbar", children: [_jsxs("div", { className: "zds-message-input__tools", children: [_jsx(IconButton, { ref: trayToggleRef, className: "zds-message-input__tray-toggle", flavour: "subtle", shape: "full", icon: trayOpen ? "close" : "add", label: trayOpen ? S.closeAttachments : S.addAttachments, "aria-expanded": trayOpen, "aria-controls": trayId, "data-open": trayOpen || undefined, disabled: !canAttach, onClick: () => setTrayOpen((o) => !o) }), _jsx("div", { id: trayId, className: "zds-message-input__tray", "data-open": trayOpen || undefined, inert: !trayOpen, children: _jsxs("div", { className: "zds-message-input__tray-items", children: [_jsx(IconButton, { flavour: "subtle", shape: "full", icon: "attachment", label: S.attachFile, onClick: () => fileRef.current?.click() }), _jsx(IconButton, { flavour: "subtle", shape: "full", icon: "camera", label: S.takePhoto, onClick: () => cameraRef.current?.click() }), extraActions.map((a) => _jsx(IconButton, { flavour: "subtle", shape: "full", icon: a.icon, label: a.label, onClick: a.onSelect }, a.label)), canRecord ? _jsx(IconButton, { flavour: "subtle", shape: "full", icon: "audio", label: S.recordVoiceMessage, onClick: () => void startVoiceNote() }) : null] }) }), moreTools && !trayOpen && mode !== "listening" ? _jsx("div", { className: "zds-message-input__more-tools", children: moreTools }) : null] }), _jsxs("div", { className: "zds-message-input__actions", children: [showSpeakToggle ? (_jsx(IconButton, { className: "zds-message-input__speak", flavour: "subtle", shape: "full", icon: speakOn ? "volume-up" : "volume-off", label: S.readAloud, "aria-pressed": speakOn, "data-pressed": speakOn || undefined, disabled: disabled, onClick: () => setSpeak(!speakOn) })) : null, mode === "listening" || mode === "recording" ? (_jsx(IconButton, { flavour: "primary", shape: "full", icon: "stop", label: mode === "listening" ? S.stopAndTranscribe : S.stopRecording, onClick: () => void (mode === "listening" ? finishDictation() : finishVoiceNote()) })) : canDictate && mode !== "playback" ? (
                            // Disabled, Dictate drops to the text flavour (spec: transcribing and disabled).
                            _jsx(IconButton, { flavour: disabled || busy || speaking ? "text" : "subtle", shape: "full", icon: "microphone", label: S.dictate, disabled: disabled || busy || speaking, onClick: () => void startDictation() })) : null, _jsx(IconButton, { className: "zds-message-input__send", flavour: "primary", shape: "full", icon: "send", label: S.send, disabled: !canSend, onClick: send })] })] }), _jsx("input", { ref: fileRef, type: "file", multiple: true, accept: accept, hidden: true, onChange: (e) => { addFiles(e.target.files); e.target.value = ""; setTrayOpen(false); } }), _jsx("input", { ref: cameraRef, type: "file", accept: "image/*", capture: "environment", hidden: true, onChange: (e) => { addFiles(e.target.files); e.target.value = ""; setTrayOpen(false); } })] }));
});
