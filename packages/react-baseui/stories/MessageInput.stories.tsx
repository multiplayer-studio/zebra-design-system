import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, MessageInput, type MessageAttachment, type MessageSubmission, type MessageVoiceNote } from "../src/index.js";

const file = (name: string, type: string): MessageAttachment =>
  ({ id: name, file: new File([""], name, { type }), kind: type.startsWith("video/") ? "video" : "document" });

/** A real image file (SVG), so the image chip has a thumbnail to draw. */
const imageFile = (name: string): MessageAttachment => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#1f69ff"/><circle cx="28" cy="12" r="7" fill="#ffd34d"/><path d="M0 40 18 18l10 12 6-7 6 7v10z" fill="#0b4dcc"/></svg>`;
  return { id: name, file: new File([svg], name, { type: "image/svg+xml" }), kind: "image" };
};

/** A short two-tone WAV, so the Playback story has something real to play. */
const sampleVoiceNote = (): MessageVoiceNote => {
  const rate = 8000, seconds = 4, n = rate * seconds;
  const buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const w = (o: number, s: string) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); w(8, "WAVEfmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
  v.setUint16(22, 1, true); v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  w(36, "data"); v.setUint32(40, n * 2, true);
  const peaks: number[] = [];
  for (let i = 0; i < n; i++) {
    const env = 0.5 + 0.5 * Math.sin((i / n) * Math.PI * 6);
    v.setInt16(44 + i * 2, Math.sin((i / rate) * 2 * Math.PI * (i < n / 2 ? 330 : 440)) * 8000 * env, true);
    if (i % 400 === 0) peaks.push(0.2 + 0.8 * env);
  }
  return { blob: new Blob([buf], { type: "audio/wav" }), durationMs: seconds * 1000, peaks };
};

const meta: Meta<typeof MessageInput> = {
  title: "Components/Message Input",
  component: MessageInput,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Built from `specs/message-input`. A composer for conversational, AI-assisted surfaces: type, attach files (tray, drag and drop, or paste), dictate a prompt (Listening → Transcribing → Dictated, the words landing as they're heard), record a voice message (Recording → Playback), and ask for the reply to be read aloud. Escape cancels a live voice state or closes the tray; `maxLength`, `maxAttachments` and `maxFileBytes` refuse politely on the error row; every string is replaceable through `strings`. The `state` prop pins any of the spec's ten states without touching the microphone; use **Interactive** to try the real thing." } },
  },
  args: { placeholder: "Placeholder" },
  argTypes: {
    state: { control: "select", options: [undefined, "empty", "filled", "attachment-open", "listening", "transcribing", "dictated", "recording", "playback", "speaking", "disabled"] },
  },
  render: (a) => <div style={{ maxInlineSize: 440 }}><MessageInput {...a} /></div>,
};
export default meta;
type Story = StoryObj<typeof MessageInput>;

export const Empty: Story = {};

export const Filled: Story = { args: { defaultValue: "Message goes in here." } };

/**
 * The spec's Show Reply: set `replyTo` (and `replyText`) to show the Reply Bar
 * above the body. The whole bar is one button; pressing it calls
 * `onCancelReply`. It is not shown while speaking or disabled.
 */
export const Reply: Story = {
  render: function Render(a) {
    const [replying, setReplying] = React.useState(true);
    return (
      <div style={{ maxInlineSize: 440 }}>
        <MessageInput {...a} replyTo={replying ? "Jordan Alvarez" : undefined} replyText="Calibration worked!! The labels line up now."
          onCancelReply={() => setReplying(false)} onSend={() => setReplying(false)} />
      </div>
    );
  },
};

/**
 * The spec's two slots. `attachmentSlot` adds the product's own content to the
 * row above the text; `moreTools` puts icon controls beside Attachment, and
 * drops out while the tray is open and while listening.
 */
export const Slots: Story = {
  args: {
    defaultValue: "Message goes in here.",
    defaultAttachments: [file("Document.pdf", "application/pdf"), file("Video_file.mp4", "video/mp4")],
    moreTools: <IconButton flavour="subtle" shape="full" icon="sticker" label="Add a sticker" />,
  },
};

/**
 * The + turns into a close control and opens file, camera, sticker and
 * voice-message actions. Files also arrive by dragging them onto the composer
 * or pasting them; an image attachment shows a thumbnail of itself in its
 * chip. With `onPreviewAttachment` set, clicking the picture or name is the
 * lightbox hook (logged here); the close zone removes the attachment.
 */
export const AttachmentOpen: Story = {
  args: {
    defaultTrayOpen: true,
    defaultAttachments: [file("Document.pdf", "application/pdf"), file("Video_file.mp4", "video/mp4"), imageFile("Holiday.svg")],
    extraActions: [{ icon: "sticker", label: "Add a sticker", onSelect: () => {} }],
    onPreviewAttachment: (a) => console.log("preview (lightbox goes here):", a.file.name),
  },
};

/**
 * `maxLength` (counter from 80% of the limit, error colour at it),
 * `maxAttachments` and `maxFileBytes`. A refused file explains itself on the
 * error row — try dropping a third file or one over 1 MB.
 */
export const Limits: Story = {
  args: {
    defaultValue: "The quick brown fox jumps over the lazy dog, twice over.",
    maxLength: 64,
    maxAttachments: 2,
    maxFileBytes: 1024 * 1024,
    defaultAttachments: [file("Quarterly-report.pdf", "application/pdf")],
  },
};

/** Every string replaced through `strings` — here, French. */
export const Localised: Story = {
  args: {
    placeholder: "Message",
    defaultValue: "Réserver une table pour quatre vendredi",
    defaultDictated: true,
    defaultAttachments: [file("Rapport.pdf", "application/pdf")],
    strings: {
      addAttachments: "Ajouter des pièces jointes",
      dictated: "Dicté",
      undoDictation: "Annuler la dictée",
      attached: "Pièces jointes",
      send: "Envoyer",
      dictate: "Dicter",
    },
  },
};

/** Voice prompt, step 1: the microphone is open and the speech becomes text when stopped. */
export const Listening: Story = { args: { state: "listening" } };

/** Voice prompt, step 2. */
export const Transcribing: Story = { args: { state: "transcribing" } };

/** Voice prompt, step 3: the transcript lands in the field, tagged. × on the tag undoes it. */
export const Dictated: Story = { args: { defaultValue: "Book a table for four on Friday at 7", defaultDictated: true } };

/** Voice message, step 1: recording, up to two minutes. */
export const Recording: Story = { args: { state: "recording" } };

/** Voice message, step 2: listen back, record again or delete, then send. */
export const Playback: Story = { render: (a) => <div style={{ maxInlineSize: 440 }}><MessageInput {...a} defaultVoiceNote={sampleVoiceNote()} /></div> };

/** Decaying pulses: `pulse()` kicks the level up, it eases back each frame. */
const usePulseLevel = () => {
  const [level, setLevel] = React.useState(0);
  const target = React.useRef(0);
  React.useEffect(() => {
    let raf = 0;
    const tick = () => { target.current *= 0.9; setLevel(target.current); raf = requestAnimationFrame(tick); };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  return { level, pulse: (v = 1) => { target.current = Math.max(target.current, v); } };
};

const SAMPLE_REPLY = "I found a table for four at Marlow's on Friday at seven. It's by the window, and they can hold it until six thirty. Shall I book it and send the confirmation to your calendar?";

/** A reply is being read aloud with nothing to listen to: the orb breathes and the reply shows whole. */
export const Speaking: Story = { args: { speaking: true, defaultSpeakResponse: true, speakingText: SAMPLE_REPLY } };

/**
 * The orb and caption following speech, simulated here: a word every
 * ~260ms with a pause at each full stop, each word a pulse of loudness
 * through `speakingLevel`, its position through `speakingCharIndex`. Loops.
 */
export const SpeakingReactive: Story = {
  render: function Render(a) {
    const { level, pulse } = usePulseLevel();
    const [charIndex, setCharIndex] = React.useState(0);
    React.useEffect(() => {
      const starts = [...SAMPLE_REPLY.matchAll(/\S+/g)].map((m) => ({ i: m.index ?? 0, stop: /[.?!]$/.test(m[0]) }));
      let w = 0, timer = 0;
      const next = () => {
        const cur = starts[w % starts.length];
        setCharIndex(cur.i);
        pulse(0.45 + Math.random() * 0.55);
        w++;
        timer = window.setTimeout(next, cur.stop ? 700 : 200 + Math.random() * 120);
      };
      next();
      return () => clearTimeout(timer);
    }, []);
    return <div style={{ maxInlineSize: 440 }}><MessageInput {...a} speaking speakingLevel={level} speakingText={SAMPLE_REPLY} speakingCharIndex={charIndex} /></div>;
  },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: "Can't send right now" } };

/**
 * Everything wired: send a message and a stand-in assistant answers. With
 * read-aloud on, the answer is spoken with the browser's speech synthesis.
 * speechSynthesis exposes no audio, so the orb pulses on each spoken word
 * (its boundary events) through `speakingLevel`; with a real TTS audio
 * element, pass it as `speakingSource` instead. Dictation uses the
 * browser's speech recognition (Chrome, Edge, Safari).
 */
export const Interactive: Story = {
  render: function Render() {
    const [log, setLog] = React.useState<{ who: "you" | "assistant"; text: string }[]>([]);
    const [speak, setSpeak] = React.useState(true);
    const [speaking, setSpeaking] = React.useState(false);
    const { level, pulse } = usePulseLevel();
    const [spoken, setSpoken] = React.useState({ text: "", at: 0 });
    const reply = (m: MessageSubmission) => {
      const parts = [m.text && `"${m.text}"`, m.attachments.length && `${m.attachments.length} attachment${m.attachments.length > 1 ? "s" : ""}`, m.voiceNote && `a ${Math.round(m.voiceNote.durationMs / 1000)}s voice message`].filter(Boolean);
      const answer = `Got ${parts.join(", ")}${m.dictated ? ", dictated" : ""}. This is where the assistant's answer would go.`;
      setLog((l) => [...l, { who: "you", text: parts.join(" · ") }, { who: "assistant", text: answer }]);
      if (m.speakResponse && "speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(answer);
        u.onend = u.onerror = () => setSpeaking(false);
        u.onboundary = (e) => { if (e.name === "word") { pulse(0.6 + Math.random() * 0.4); setSpoken({ text: answer, at: e.charIndex }); } };
        setSpoken({ text: answer, at: 0 });
        speechSynthesis.cancel(); speechSynthesis.speak(u); setSpeaking(true);
      }
    };
    return (
      <div style={{ maxInlineSize: 440, display: "grid", gap: 12 }}>
        <div style={{ display: "grid", gap: 8, font: "14px/1.4 system-ui" }}>
          {log.map((m, i) => <div key={i} style={{ justifySelf: m.who === "you" ? "end" : "start", maxInlineSize: "85%", padding: "8px 12px", borderRadius: 12, background: m.who === "you" ? "var(--interactive-primary-background-default)" : "var(--feedback-neutral-background-subtle)", color: m.who === "you" ? "var(--interactive-primary-foreground-default)" : "var(--foreground-primary)" }}>{m.text}</div>)}
        </div>
        <MessageInput placeholder="Ask anything" onSend={reply} speakResponse={speak} onSpeakResponseChange={setSpeak}
          speaking={speaking} speakingLevel={level} speakingText={spoken.text} speakingCharIndex={spoken.at} onStopSpeaking={() => { speechSynthesis.cancel(); setSpeaking(false); }} />
      </div>
    );
  },
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          <MessageInput placeholder="Placeholder" defaultValue="Book a table for four" defaultDictated />
          <MessageInput state="recording" />
          <MessageInput speaking speakingLevel={0.5} speakingText="It is by the window, and they can hold it until six thirty." speakingCharIndex={30} />
        </div>
      ))}
    </div>
  ),
};
