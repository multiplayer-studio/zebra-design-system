import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/index.js";
import {
  AiReaction, AI_REACTION_KINDS, AI_REACTION_VARIANTS, aiReactionStrings, ChatMessage, ChatText, ChatThread,
  type AiReactionKind, type AiReactionVariant,
} from "../src/experimental.js";

const meta: Meta<typeof AiReaction> = {
  title: "Experimental/AI Reaction",
  component: AiReaction,
  parameters: {
    docs: { description: { component: "**Experimental — no spec yet.** The assistant's presence, animated to react — and kept entirely abstract: a circle is the vessel, the brand gradient is the energy, motion is the meaning. `variant` is the motion style (its personality): vibrant, directional diffuse, calm, freeform or bloom. `reaction` is what it feels now: idle, listening, thinking, agree, love, celebrate, surprised or unsure. Thinking shows inner motes converging; listening ripples outward in rings. Only transform and opacity animate, and reduced motion shows each reaction as a still pose." } },
  },
  argTypes: {
    variant: { control: "select", options: AI_REACTION_VARIANTS },
    reaction: { control: "select", options: AI_REACTION_KINDS },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
  },
  args: { variant: "vibrant", reaction: "celebrate", size: "large" },
};
export default meta;
type Story = StoryObj<typeof AiReaction>;

const STYLE_NAME: Record<AiReactionVariant, string> = {
  vibrant: "Vibrant", "directional-diffuse": "Directional diffuse", calm: "Calm", freeform: "Freeform", bloom: "Bloom",
};
const STYLE_NOTE: Record<AiReactionVariant, string> = {
  vibrant: "Saturated, quick and springy; always throwing light.",
  "directional-diffuse": "A comet of light — sharp leading edge, diffuse tail — whose direction carries the reaction.",
  calm: "Slow, small and quiet.",
  freeform: "Three soft blobs that wander, scatter and regroup.",
  bloom: "Energy gathers into a point, then blossoms outward.",
};
const Cap = ({ children, strong }: { children: React.ReactNode; strong?: boolean }) => (
  <span style={{ font: strong ? "var(--text-label-medium)" : "var(--text-body-xsmall)", color: strong ? "var(--foreground-primary)" : "var(--foreground-secondary)" }}>{children}</span>
);

/** One reaction on every control. Replay restarts its opening beat. */
export const Playground: Story = {
  render: function Playground(args) {
    const [replay, setReplay] = React.useState(0);
    return (
      <div style={{ display: "grid", justifyItems: "center", gap: "var(--space-xl)", padding: "var(--space-xl)" }}>
        <AiReaction {...args} replay={replay} />
        <Button flavour="outline" size="small" onClick={() => setReplay((r) => r + 1)}>Replay</Button>
      </div>
    );
  },
};

/** Every style against every reaction. Click one to replay it. */
export const StylesAndReactions: Story = {
  parameters: { layout: "fullscreen" },
  render: function Matrix() {
    const [replay, setReplay] = React.useState<Record<string, number>>({});
    return (
      <div style={{ display: "grid", gridTemplateColumns: `minmax(160px, auto) repeat(${AI_REACTION_KINDS.length}, 96px)`, alignItems: "center", gap: "var(--space-lg) var(--space-sm)", padding: "var(--space-xl)", background: "var(--surface-page)" }}>
        <span />
        {AI_REACTION_KINDS.map((k) => <span key={k} style={{ textAlign: "center" }}><Cap strong>{aiReactionStrings[k]}</Cap></span>)}
        {AI_REACTION_VARIANTS.map((v) => (
          <React.Fragment key={v}>
            <span style={{ display: "grid", gap: "var(--space-3xs)" }}><Cap strong>{STYLE_NAME[v]}</Cap><Cap>{STYLE_NOTE[v]}</Cap></span>
            {AI_REACTION_KINDS.map((k) => {
              const id = `${v}-${k}`;
              return (
                <button key={k} type="button" onClick={() => setReplay((r) => ({ ...r, [id]: (r[id] ?? 0) + 1 }))}
                  aria-label={`Replay ${STYLE_NAME[v]} ${aiReactionStrings[k]}`}
                  style={{ display: "grid", placeItems: "center", blockSize: 96, border: 0, background: "none", cursor: "pointer" }}>
                  <AiReaction variant={v} reaction={k} replay={replay[id]} />
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    );
  },
};

/** Each style at hero size, all showing the same reaction. Pick the reaction below. */
export const SideBySide: Story = {
  parameters: { layout: "fullscreen" },
  render: function SideBySide() {
    const [reaction, setReaction] = React.useState<AiReactionKind>("celebrate");
    const [replay, setReplay] = React.useState(0);
    return (
      <div style={{ display: "grid", gap: "var(--space-xl)", padding: "var(--space-xl)", background: "var(--surface-page)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xl)" }}>
          {AI_REACTION_VARIANTS.map((v) => (
            <div key={v} style={{ display: "grid", justifyItems: "center", gap: "var(--space-md)", inlineSize: 160 }}>
              <AiReaction variant={v} reaction={reaction} size="large" replay={replay} />
              <Cap strong>{STYLE_NAME[v]}</Cap>
            </div>
          ))}
        </div>
        <div role="group" aria-label="Reaction" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)" }}>
          {AI_REACTION_KINDS.map((k) => (
            <Button key={k} size="small" flavour={k === reaction ? "primary" : "outline"} aria-pressed={k === reaction}
              onClick={() => { setReaction(k); setReplay((r) => r + 1); }}>{aiReactionStrings[k]}</Button>
          ))}
        </div>
      </div>
    );
  },
};

const PROMPTS: { text: string; reaction: AiReactionKind }[] = [
  { text: "Hey, are you there?", reaction: "listening" },
  { text: "Can you check why the ZD421 stops mid-print?", reaction: "thinking" },
  { text: "Yes, open a ticket for the stock room.", reaction: "agree" },
  { text: "Calibration worked, thank you!", reaction: "celebrate" },
  { text: "You're the best assistant we've had.", reaction: "love" },
  { text: "Turns out it was never plugged in.", reaction: "surprised" },
  { text: "Can you fix the coffee machine too?", reaction: "unsure" },
];

/** The assistant reacting to what you send. Choose a style, then send a message. */
export const ReactingToMessages: Story = {
  parameters: { layout: "fullscreen" },
  render: function Reacting() {
    const [variant, setVariant] = React.useState<AiReactionVariant>("bloom");
    const [sent, setSent] = React.useState<(typeof PROMPTS)[number] | null>(null);
    const [replay, setReplay] = React.useState(0);
    const reaction = sent?.reaction ?? "idle";
    return (
      <div style={{ display: "grid", gap: "var(--space-lg)", inlineSize: 560, padding: "var(--space-xl)", background: "var(--surface-page)" }}>
        <div role="group" aria-label="Style" style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)" }}>
          {AI_REACTION_VARIANTS.map((v) => (
            <Button key={v} size="small" flavour={v === variant ? "primary" : "outline"} aria-pressed={v === variant}
              onClick={() => { setVariant(v); setReplay((r) => r + 1); }}>{STYLE_NAME[v]}</Button>
          ))}
        </div>
        <div style={{ display: "grid", justifyItems: "center", gap: "var(--space-sm)", paddingBlock: "var(--space-lg)" }}>
          <AiReaction variant={variant} reaction={reaction} size="large" replay={replay} />
          {/* The reaction is also said in words, for anyone who can't see it move. */}
          <span role="status"><Cap>{aiReactionStrings[reaction]}</Cap></span>
        </div>
        <ChatThread>
          {sent ? <ChatMessage role="me" time="now" status="read"><ChatText>{sent.text}</ChatText></ChatMessage> : null}
        </ChatThread>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)" }}>
          {PROMPTS.map((p) => (
            <Button key={p.text} size="small" flavour="subtle" onClick={() => { setSent(p); setReplay((r) => r + 1); }}>{p.text}</Button>
          ))}
        </div>
      </div>
    );
  },
};
