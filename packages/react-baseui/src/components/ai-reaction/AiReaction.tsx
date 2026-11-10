import * as React from "react";
import "./ai-reaction.css";

/* EXPERIMENTAL — no spec yet (@spec none). The assistant's presence,
   animated to react — and kept entirely abstract: a circle is the vessel,
   the brand gradient pair is the energy inside it, and motion carries the
   meaning. Nothing figurative — no face, no glyphs, no objects; a gradient
   is a vibe, not a thing. Reactions borrow a shared motion vocabulary:
   inner motes converging mean thinking, a radial ripple means listening,
   energy concentrating into a point and blossoming outward means delight.
   Every moving part is transform or opacity, so the compositor runs it;
   reduced motion shows the reaction as a still pose. */

/** The motion style: how the assistant moves, whatever it is reacting to. */
export type AiReactionVariant = "vibrant" | "directional-diffuse" | "calm" | "freeform" | "bloom";
/** What the assistant is reacting with. */
export type AiReactionKind = "idle" | "listening" | "thinking" | "agree" | "love" | "celebrate" | "surprised" | "unsure";
export type AiReactionSize = "small" | "medium" | "large";

export const AI_REACTION_VARIANTS: AiReactionVariant[] = ["vibrant", "directional-diffuse", "calm", "freeform", "bloom"];
export const AI_REACTION_KINDS: AiReactionKind[] = ["idle", "listening", "thinking", "agree", "love", "celebrate", "surprised", "unsure"];

export const aiReactionStrings: Record<AiReactionKind, string> & { name: string } = {
  name: "Assistant",
  idle: "Ready",
  listening: "Listening",
  thinking: "Thinking",
  agree: "Agrees",
  love: "Loves this",
  celebrate: "Celebrating",
  surprised: "Surprised",
  unsure: "Not sure",
};

export interface AiReactionProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "className" | "children"> {
  /** Motion style. Calm by default; vibrant and bloom suit playful products. */
  variant?: AiReactionVariant;
  reaction?: AiReactionKind;
  /** small sits beside text (icon size), medium is avatar size, large is a hero. */
  size?: AiReactionSize;
  /** Change this to replay the reaction's opening beat without changing the reaction. */
  replay?: number | string;
  /** Overrides the accessible name ("Assistant: Celebrating"). */
  label?: string;
  strings?: Partial<typeof aiReactionStrings>;
  className?: string;
}

/** Points of light fly for the bursting reactions, and all the time in the vibrant style. Never in calm or directional diffuse. */
const sparksFor = (variant: AiReactionVariant, reaction: AiReactionKind) =>
  variant === "vibrant" ? reaction !== "unsure"
    : (variant === "bloom" || variant === "freeform") && (reaction === "love" || reaction === "celebrate");

export const AiReaction = React.forwardRef<HTMLSpanElement, AiReactionProps>(function AiReaction(
  { variant = "calm", reaction = "idle", size = "medium", replay, label, strings, className, ...rest },
  ref,
) {
  const t = { ...aiReactionStrings, ...strings };
  return (
    <span
      ref={ref}
      role="img"
      aria-label={label ?? `${t.name}: ${t[reaction]}`}
      className={["zds-ai-reaction", className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-reaction={reaction}
      data-size={size}
      {...rest}
    >
      {/* Keyed so a new reaction (or a replay) restarts every animation from its opening beat. */}
      <span className="zds-ai-reaction__stage" key={`${variant}-${reaction}-${replay ?? ""}`} aria-hidden="true">
        <span className="zds-ai-reaction__glow" />
        {variant === "freeform" ? (
          <span className="zds-ai-reaction__blobs">
            {[0, 1, 2].map((i) => <span key={i} className="zds-ai-reaction__blob" style={{ "--i": i } as React.CSSProperties} />)}
          </span>
        ) : (
          <span className="zds-ai-reaction__core">
            <span className="zds-ai-reaction__hue" />
            {variant === "directional-diffuse" ? <span className="zds-ai-reaction__lead" /> : null}
          </span>
        )}
        {/* The bloom's point sits outside the core, so the blossom can pass the body's edge. */}
        {variant === "bloom" ? <span className="zds-ai-reaction__point" /> : null}
        {/* Inner activity: motes drifting together and apart — information coming together. */}
        {reaction === "thinking" ? (
          <span className="zds-ai-reaction__motes">
            {[0, 1, 2].map((i) => <span key={i} className="zds-ai-reaction__mote" style={{ "--i": i } as React.CSSProperties} />)}
          </span>
        ) : null}
        {/* Listening: a radial ripple responding to the voice. */}
        {reaction === "listening" ? (
          <span className="zds-ai-reaction__ripples">
            {[0, 1, 2].map((i) => <span key={i} className="zds-ai-reaction__ripple" style={{ "--i": i } as React.CSSProperties} />)}
          </span>
        ) : null}
        {sparksFor(variant, reaction) ? (
          <span className="zds-ai-reaction__sparks">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="zds-ai-reaction__spark" style={{ "--i": i } as React.CSSProperties}>
                <span className="zds-ai-reaction__dot" />
              </span>
            ))}
          </span>
        ) : null}
      </span>
    </span>
  );
});
