import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/snackbar/snackbar.js";
import "../src/components/icon/icon.js";
import type { ZdsSnackbar } from "../src/components/snackbar/snackbar.js";

// In the reference's order first: info, success, warning, error, attention (view), action.
const FLAVOURS = ["info", "positive", "warning", "error", "view", "action", "default", "deletion"] as const;
const MESSAGES: Record<(typeof FLAVOURS)[number], string> = {
  default: "Your changes were saved.",
  action: "This is an Attention Notification",
  positive: "This is a Success Notification",
  info: "This is an Information Notification",
  warning: "This is a Warning Notification",
  error: "This is an Error Notification",
  deletion: "3 items deleted.",
  view: "This is an Attention Notification",
};

const meta: Meta = {
  title: "Components/Snackbar",
  component: "zds-snackbar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      // The snackbar floats in the browser's top layer, positioned against the
      // viewport. On the Docs page every story renders in its own iframe, so
      // that viewport is the story's own box and the bar stays inside it
      // whatever sits above or below. The component itself is unchanged.
      story: { inline: false, height: "200px" },
      description: {
        component:
          "contextual: a pill where `flavour` sets the tint, the glyph and the controls; standard: a plain dark bar. The action is a subtle Button (outline-subtle on action), the close a subtle Icon Button. One line, never wrapping. Floats in the top layer; `inline` keeps it in the flow for these docs. Spec: specs/snackbar.",
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["standard", "contextual"] },
    flavour: { control: "select", options: FLAVOURS },
    actionLabel: { control: "text" },
    duration: { control: { type: "number", step: 1000 } },
  },
  args: { variant: "contextual", flavour: "deletion", message: MESSAGES.deletion, actionLabel: "", duration: 0 },
  render: (a) => html`<zds-snackbar
    open
    variant=${a.variant}
    flavour=${a.flavour}
    duration=${a.duration}
    action-label=${a.actionLabel || nothing}
    >${a.message}</zds-snackbar
  >`,
};
export default meta;
type Story = StoryObj;

const stack = (c: unknown) => html`<div style="display:grid;gap:12px;max-width:560px">${c}</div>`;

export const Playground: Story = { parameters: { docs: { story: { height: "200px" } } } };

/** A quiet bar: message only, or with one action and a close. */
export const Standard: Story = {
  parameters: { docs: { story: { height: "260px" } } },
  render: () => stack(html`
    <zds-snackbar inline open variant="standard">Message sent.</zds-snackbar>
    <zds-snackbar inline open variant="standard" action-label="Retry">Couldn't send message.</zds-snackbar>
    <zds-snackbar inline open variant="standard" action-label="Undo" show-close>Conversation archived.</zds-snackbar>`),
};

/** Every contextual flavour with its default controls. */
export const Contextual: Story = {
  parameters: { docs: { story: { height: "660px" } } },
  render: () => html`<div style="display:grid;gap:24px;justify-items:center">${FLAVOURS.map((k) => html`<zds-snackbar inline open flavour=${k} style="width:max-content;max-width:100%">${MESSAGES[k]}</zds-snackbar>`)}</div>`,
};

/** Shape: rounded (a pill; radius/md on standard) or sharp (radius/none), carried into the buttons. */
export const Shape: Story = {
  parameters: { docs: { story: { height: "520px" } } },
  render: () => html`<div style="display:grid;gap:24px;justify-items:center">
    ${(["rounded", "sharp"] as const).map((sh) => html`
      <zds-snackbar inline open shape=${sh} flavour="deletion" style="width:max-content">3 items deleted.</zds-snackbar>
      <zds-snackbar inline open shape=${sh} flavour="action" style="width:max-content">You're offline.</zds-snackbar>
      <zds-snackbar inline open shape=${sh} variant="standard" action-label="Undo" show-close style="width:max-content">Conversation archived.</zds-snackbar>`)}
  </div>`,
};

/** The flavours without a glyph of their own take one in the icon slot. */
export const IconSlot: Story = {
  parameters: { docs: { story: { height: "300px" } } },
  render: () => html`<div style="display:grid;gap:24px;justify-items:center">
    <zds-snackbar inline open flavour="default" style="width:max-content"><zds-icon slot="icon" name="cloud-done"></zds-icon>Backup complete.</zds-snackbar>
    <zds-snackbar inline open flavour="action" action-label="Reconnect" style="width:max-content"><zds-icon slot="icon" name="wifi-off"></zds-icon>You're offline.</zds-snackbar>
    <zds-snackbar inline open variant="standard" action-label="Undo" style="width:max-content"><zds-icon slot="icon" name="inbox"></zds-icon>Conversation archived.</zds-snackbar>
  </div>`,
};

/** The message stays on one line; where the space runs out it ends in an ellipsis. */
export const LongMessage: Story = {
  parameters: { docs: { story: { height: "140px" } } },
  render: () => stack(html`<zds-snackbar inline open flavour="warning" action-label="Review"
    >Two devices in this group haven't checked in for more than 24 hours and may be out of range or powered off.</zds-snackbar
  >`),
};

/** Open one, let it time out (paused while hovered or focused), and watch the events. */
/**
 * Floats in the top layer: it slides in from below (300ms) and leaves sliding
 * up and fading (200ms). The striped bar is fixed at the highest z-index there
 * is, and the snackbar still sits above it.
 */
export const Behaviour: Story = {
  parameters: { docs: { story: { height: "320px" } } },
  render: () => {
    const log = (e: Event) => {
      const out = document.getElementById("snackbar-log");
      if (out) out.textContent = `${e.type}${e instanceof CustomEvent ? ` (${e.detail.reason})` : ""}\n` + out.textContent;
    };
    const el = () => document.getElementById("snackbar-demo") as ZdsSnackbar;
    return html`<div style="display:grid;gap:12px;max-width:560px">
      <div style="display:flex;gap:8px">
        <button @click=${() => (el().open = true)}>Show (5 s)</button>
        <button @click=${() => el().hide()}>Hide</button>
      </div>
      <div style="position:fixed;inset:auto 0 0 0;height:96px;z-index:2147483647;background:repeating-linear-gradient(45deg,var(--surface-section),var(--surface-section) 8px,var(--border-default) 8px,var(--border-default) 16px);display:grid;place-items:center;font:12px system-ui">z-index: 2147483647</div>
      <zds-snackbar id="snackbar-demo" flavour="deletion" duration="5000" @action=${log} @close=${log}>Item deleted.</zds-snackbar>
      <pre id="snackbar-log" style="font:12px/1.4 ui-monospace,monospace;margin:0"></pre>
    </div>`;
  },
};

export const ThemingCascade: Story = {
  parameters: { docs: { story: { height: "660px" } } },
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(400px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default);display:grid;gap:8px">
        <div style="font:500 12px/1.4 system-ui;opacity:.7">${cls || "base / light"}</div>
        <zds-snackbar inline open variant="standard" action-label="Undo">Conversation archived.</zds-snackbar>
        ${(["positive", "error", "deletion"] as const).map((k) => html`<zds-snackbar inline open flavour=${k}>${MESSAGES[k]}</zds-snackbar>`)}
      </div>`,
    )}
  </div>`,
};
