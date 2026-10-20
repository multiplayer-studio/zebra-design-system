import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MessageInput, type MessageAttachment, type MessageSubmission, type MessageVoiceNote } from "../src/index.js";

const file = (name: string, type: string): MessageAttachment =>
  ({ id: name, file: new File([""], name, { type }), kind: type.startsWith("video/") ? "video" : "document" });

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
  title: "Experimental/Message Input",
  component: MessageInput,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "**Experimental — no Figma spec.** A composer for conversational, AI-assisted surfaces: type, attach files, dictate a prompt (Listening → Transcribing → Dictated), record a voice message (Recording → Playback), and ask for the reply to be read aloud. The state stories render each state without touching the microphone; use **Interactive** to try the real thing." } },
  },
  args: { placeholder: "Placeholder" },
  render: (a) => <div style={{ maxInlineSize: 440 }}><MessageInput {...a} /></div>,
};
export default meta;
type Story = StoryObj<typeof MessageInput>;

export const Empty: Story = {};

export const Filled: Story = { args: { defaultValue: "Message goes in here." } };

/** The + turns into a close control and opens file, camera, sticker and voice-message actions. */
export const AttachmentOpen: Story = {
  args: {
    defaultTrayOpen: true,
    defaultAttachments: [file("Document.pdf", "application/pdf"), file("Video_file.mp4", "video/mp4")],
    extraActions: [{ icon: "sticker", label: "Add a sticker", onSelect: () => {} }],
  },
};

/** Voice prompt, step 1: the microphone is open and the speech becomes text when stopped. */
export const Listening: Story = { args: { preview: "listening" } };

/** Voice prompt, step 2. */
export const Transcribing: Story = { args: { preview: "transcribing" } };

/** Voice prompt, step 3: the transcript lands in the field, tagged. × on the tag undoes it. */
export const Dictated: Story = { args: { defaultValue: "Book a table for four on Friday at 7", defaultDictated: true } };

/** Voice message, step 1: recording, up to two minutes. */
export const Recording: Story = { args: { preview: "recording" } };

/** Voice message, step 2: listen back, record again or delete, then send. */
export const Playback: Story = { render: (a) => <div style={{ maxInlineSize: 440 }}><MessageInput {...a} defaultVoiceNote={sampleVoiceNote()} /></div> };

/** A reply is being read aloud; the read-aloud toggle is on. */
export const Speaking: Story = { args: { speaking: true, defaultSpeakResponse: true } };

export const Disabled: Story = { args: { disabled: true, defaultValue: "Can't send right now" } };

/**
 * Everything wired: send a message and a stand-in assistant answers. With
 * read-aloud on, the answer is spoken with the browser's speech synthesis
 * and the Speaking bar can stop it. Dictation uses the browser's speech
 * recognition (Chrome, Edge, Safari).
 */
export const Interactive: Story = {
  render: function Render() {
    const [log, setLog] = React.useState<{ who: "you" | "assistant"; text: string }[]>([]);
    const [speak, setSpeak] = React.useState(true);
    const [speaking, setSpeaking] = React.useState(false);
    const reply = (m: MessageSubmission) => {
      const parts = [m.text && `"${m.text}"`, m.attachments.length && `${m.attachments.length} attachment${m.attachments.length > 1 ? "s" : ""}`, m.voiceNote && `a ${Math.round(m.voiceNote.durationMs / 1000)}s voice message`].filter(Boolean);
      const answer = `Got ${parts.join(", ")}${m.dictated ? ", dictated" : ""}. This is where the assistant's answer would go.`;
      setLog((l) => [...l, { who: "you", text: parts.join(" · ") }, { who: "assistant", text: answer }]);
      if (m.speakResponse && "speechSynthesis" in window) {
        const u = new SpeechSynthesisUtterance(answer);
        u.onend = u.onerror = () => setSpeaking(false);
        speechSynthesis.cancel(); speechSynthesis.speak(u); setSpeaking(true);
      }
    };
    return (
      <div style={{ maxInlineSize: 440, display: "grid", gap: 12 }}>
        <div style={{ display: "grid", gap: 8, font: "14px/1.4 system-ui" }}>
          {log.map((m, i) => <div key={i} style={{ justifySelf: m.who === "you" ? "end" : "start", maxInlineSize: "85%", padding: "8px 12px", borderRadius: 12, background: m.who === "you" ? "var(--interactive-primary-background-default)" : "var(--feedback-neutral-background-subtle)", color: m.who === "you" ? "var(--interactive-primary-foreground-default)" : "var(--foreground-primary)" }}>{m.text}</div>)}
        </div>
        <MessageInput placeholder="Ask anything" onSend={reply} speakResponse={speak} onSpeakResponseChange={setSpeak}
          speaking={speaking} onStopSpeaking={() => { speechSynthesis.cancel(); setSpeaking(false); }} />
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
          <MessageInput preview="recording" />
        </div>
      ))}
    </div>
  ),
};
