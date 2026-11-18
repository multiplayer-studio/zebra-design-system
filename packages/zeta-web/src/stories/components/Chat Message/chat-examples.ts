/*
 * The three example screens from the Figma Chat Message page (Message Sample):
 *   8600:8354  Mobile  · Group channel
 *   8600:16431 Desktop · Group channel
 *   8600:21204 Desktop · Assistant conversation
 * Plain data; the same file sits beside each package's Chat Message stories.
 * Where Figma mixes platforms inside one screen, the container's platform wins.
 * In text, a blank line starts a paragraph and a single line break stays inside it.
 */

/** The Avatar swatches. */
export type AvatarColor = "purple" | "blue" | "sea" | "yellow" | "orange" | "green" | "burgundy";
export type ExampleReaction = { glyph: "like" | "dislike" | "satisfied" | "point-heart"; count: number };
export type ExampleAttachment =
  | { kind: "photos"; photos: ("photo-lead" | "photo-top" | "photo-bottom")[] }
  | { kind: "file"; name: string; meta: string }
  | { kind: "video"; poster: "video-poster-a" | "video-poster-b"; duration: string }
  | { kind: "audio"; duration: string };
export interface ExampleMessage {
  role: "receiver" | "sender" | "assistant";
  chatStyle: "channel" | "conversation";
  sequence?: "first" | "consecutive";
  state?: "loading" | "active";
  name?: string;
  initials?: string;
  /** Avatar swatch (Figma): one per person; the assistant is always purple. */
  color?: AvatarColor;
  assistantAvatar?: boolean;
  showAvatar?: boolean;
  time?: string;
  text?: string;
  replyTo?: string;
  replyText?: string;
  attachments?: ExampleAttachment[];
  reactions?: ExampleReaction[];
  thread?: { replies: ExampleMessage[] };
  showControls?: boolean;
}
export interface ChatExample {
  id: string;
  container: "mobile" | "desktop";
  instance: "Group channel" | "Assistant conversation";
  figma: string;
  title: string;
  people?: { initials: string; color: AvatarColor }[];
  replying?: { to: string; text: string };
  messages: ExampleMessage[];
}

const ASSISTANT_REPLY =
  "Try the following:\n\nA blinking amber light after a roll change usually means the media sensor needs calibrating. Try this:\n\nHold the feed button until the light flashes twice, then release.\nThe printer will feed a few labels to calibrate.\nPrint a test label.\n\nIf that doesn’t fix it, I can open a service ticket.";
const CALIBRATE = { kind: "file", name: "How to calibrate a printer requiring an update", meta: "PDF · 248 KB" } as const;
/* Each person keeps the swatch Figma gives them. */
const JA = { name: "Jordan Alvarez", initials: "JA", color: "sea" } as const;
const MC = { name: "Maya Chen", initials: "MC", color: "orange" } as const;
const PN = { name: "Priya Nair", initials: "PN", color: "green" } as const;
const PEOPLE = [JA, MC, PN].map(({ initials, color }) => ({ initials, color }));

/** From "Yep. For both." on, the mobile and desktop group channels show the same conversation. */
const groupTail: ExampleMessage[] = [
  { role: "receiver", chatStyle: "channel", ...JA, time: "09:41", text: "Yep. For both. Still stuck",
    attachments: [{ kind: "video", poster: "video-poster-a", duration: "0:08" }], reactions: [{ glyph: "dislike", count: 2 }] },
  { role: "sender", chatStyle: "channel", ...MC, time: "09:41",
    text: "@Zebra Assistant can you help troubleshoot the ZD421 in the stockroom? It stops mid-print after we replaced the roll this morning, and the light is blinking amber. We’ve power cycled it twice and checked the ribbon. We have a truck delivery at 2 and need labels working before then." },
  { role: "assistant", chatStyle: "conversation", name: "Zebra Assistant", assistantAvatar: true, time: "09:41", state: "loading" },
  { role: "assistant", chatStyle: "conversation", name: "Zebra Assistant", assistantAvatar: true, time: "09:41", text: ASSISTANT_REPLY, attachments: [CALIBRATE] },
  { role: "sender", chatStyle: "channel", ...MC, time: "09:41", replyTo: "Zebra Assistant", replyText: "A blinking amber light after a roll change...",
    text: "Create ticket for stock room" },
  { role: "receiver", chatStyle: "channel", ...JA, time: "09:41", text: "Calibration worked!! 🎉",
    attachments: [{ kind: "audio", duration: "0:08" }, { kind: "video", poster: "video-poster-b", duration: "0:08" }],
    reactions: [{ glyph: "satisfied", count: 3 }, { glyph: "point-heart", count: 1 }] },
  { role: "receiver", chatStyle: "channel", ...PN, time: "09:41", replyTo: "Jordan Alvarez", replyText: "Calibration worked!! 🎉",
    text: "Nice work @Jordan Alvarez 👏", reactions: [{ glyph: "satisfied", count: 1 }] },
  { role: "sender", chatStyle: "channel", ...MC, time: "09:41", text: "Perfect, thanks both 🙌" }
];

export const CHAT_EXAMPLES: ChatExample[] = [
  {
    id: "mobile-group-channel", container: "mobile", instance: "Group channel", figma: "8600-8354", title: "Project Team A",
    people: PEOPLE, replying: { to: "Jordan Alvarez", text: "Calibration worked!!..." },
    messages: [
      { role: "receiver", chatStyle: "channel", ...JA, time: "09:41", text: "Hey, the label printer in back is doing it again 😩" },
      { role: "receiver", chatStyle: "channel", sequence: "consecutive", time: "09:41", text: "It prints half a label then stops.",
        attachments: [{ kind: "audio", duration: "0:08" }, { kind: "photos", photos: ["photo-lead", "photo-top", "photo-bottom"] }],
        thread: { replies: [
          { role: "sender", chatStyle: "channel", ...MC, showAvatar: false, time: "09:41", text: "Ugh ok." },
          { role: "sender", chatStyle: "channel", ...PN, showAvatar: false, time: "09:41", text: "Why!!!" }
        ] } },
      { role: "sender", chatStyle: "channel", ...MC, time: "09:41", text: "Did you try power cycling it?" },
      { role: "sender", chatStyle: "channel", sequence: "consecutive", time: "09:41", text: "And check if the ribbon is loaded right",
        reactions: [{ glyph: "like", count: 1 }] },
      ...groupTail
    ]
  },
  {
    id: "desktop-group-channel", container: "desktop", instance: "Group channel", figma: "8600-16431", title: "Project Team A",
    people: PEOPLE, messages: groupTail
  },
  {
    id: "desktop-assistant-conversation", container: "desktop", instance: "Assistant conversation", figma: "8600-21204", title: "Assistant",
    messages: [
      // Earlier assistant replies keep their controls hidden until hover (spec: Show Controls).
      { role: "assistant", chatStyle: "conversation", name: "Assistant", assistantAvatar: true, time: "09:41", text: ASSISTANT_REPLY,
        showControls: false, attachments: [{ kind: "file", name: "Delivery receipt.pdf", meta: "PDF · 248 KB" }] },
      { role: "sender", chatStyle: "conversation", text: "I’ve tried it but am still having issues" },
      { role: "assistant", chatStyle: "conversation", name: "Assistant", assistantAvatar: true, time: "09:41",
        text: "Here’s a more resources on how to fix your problem.",
        attachments: [{ kind: "video", poster: "video-poster-a", duration: "0:08" }, CALIBRATE] }
    ]
  }
];
