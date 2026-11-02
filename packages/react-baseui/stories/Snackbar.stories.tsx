import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Snackbar, Icon } from "../src/index.js";
import type { SnackbarFlavour } from "../src/index.js";

const FLAVOURS = ["info", "positive", "warning", "error", "view", "action", "default", "deletion"] as const;
const MESSAGES: Record<SnackbarFlavour, string> = {
  default: "Your changes were saved.",
  action: "This is an Attention Notification",
  positive: "This is a Success Notification",
  info: "This is an Information Notification",
  warning: "This is a Warning Notification",
  error: "This is an Error Notification",
  deletion: "3 items deleted.",
  view: "This is an Attention Notification",
};

const meta: Meta<typeof Snackbar> = {
  title: "Components/Snackbar",
  component: Snackbar,
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
          "contextual: a pill where `flavour` sets the tint, the glyph and the controls; standard: a plain dark bar. The action is a subtle Button (outline-subtle on action), the close a subtle IconButton. One line, never wrapping. Floats in the top layer; `inline` keeps it in the flow for these docs. Spec: specs/snackbar.",
      },
    },
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["standard", "contextual"] },
    flavour: { control: "select", options: FLAVOURS },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    duration: { control: { type: "number", step: 1000 } },
  },
  args: { variant: "contextual", flavour: "deletion", shape: "rounded", duration: 0, open: true, children: MESSAGES.deletion },
};
export default meta;
type Story = StoryObj<typeof Snackbar>;

const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>{children}</div>;
const Centre = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 24, justifyItems: "center" }}>{children}</div>;

export const Playground: Story = { parameters: { docs: { story: { height: "200px" } } } };

/** A quiet bar: message only, or with one action and a close. */
export const Standard: Story = {
  parameters: { docs: { story: { height: "260px" } } },
  render: () => (
    <Stack>
      <Snackbar inline open variant="standard">Message sent.</Snackbar>
      <Snackbar inline open variant="standard" actionLabel="Retry">Couldn't send message.</Snackbar>
      <Snackbar inline open variant="standard" actionLabel="Undo" showClose>Conversation archived.</Snackbar>
    </Stack>
  ),
};

/** Every contextual flavour with its default controls. */
export const Contextual: Story = {
  parameters: { docs: { story: { height: "660px" } } },
  render: () => <Centre>{FLAVOURS.map((k) => <Snackbar key={k} inline open flavour={k} style={{ width: "max-content", maxWidth: "100%" }}>{MESSAGES[k]}</Snackbar>)}</Centre>,
};

/** Shape: rounded (a pill; radius/md on standard) or sharp (radius/none), carried into the buttons. */
export const Shape: Story = {
  parameters: { docs: { story: { height: "520px" } } },
  render: () => (
    <Centre>
      {(["rounded", "sharp"] as const).map((sh) => (
        <React.Fragment key={sh}>
          <Snackbar inline open shape={sh} flavour="deletion" style={{ width: "max-content" }}>3 items deleted.</Snackbar>
          <Snackbar inline open shape={sh} flavour="action" style={{ width: "max-content" }}>You're offline.</Snackbar>
          <Snackbar inline open shape={sh} variant="standard" actionLabel="Undo" showClose style={{ width: "max-content" }}>Conversation archived.</Snackbar>
        </React.Fragment>
      ))}
    </Centre>
  ),
};

/** The flavours without a glyph of their own take one in the icon slot. */
export const IconSlot: Story = {
  parameters: { docs: { story: { height: "300px" } } },
  render: () => (
    <Centre>
      <Snackbar inline open flavour="default" icon={<Icon name="cloud-done" />} style={{ width: "max-content" }}>Backup complete.</Snackbar>
      <Snackbar inline open flavour="action" actionLabel="Reconnect" icon={<Icon name="wifi-off" />} style={{ width: "max-content" }}>You're offline.</Snackbar>
      <Snackbar inline open variant="standard" actionLabel="Undo" icon={<Icon name="inbox" />} style={{ width: "max-content" }}>Conversation archived.</Snackbar>
    </Centre>
  ),
};

/** The message stays on one line; where the space runs out it ends in an ellipsis. */
export const LongMessage: Story = {
  parameters: { docs: { story: { height: "140px" } } },
  render: () => (
    <Stack>
      <Snackbar inline open flavour="warning" actionLabel="Review">
        Two devices in this group haven't checked in for more than 24 hours and may be out of range or powered off.
      </Snackbar>
    </Stack>
  ),
};

/**
 * Floats in the top layer: it slides in from below (300ms) and leaves sliding
 * up and fading (200ms). The striped bar is fixed at the highest z-index there
 * is, and the snackbar still sits above it.
 */
export const Behaviour: Story = {
  parameters: { docs: { story: { height: "320px" } } },
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [log, setLog] = React.useState<string[]>([]);
    const add = (s: string) => setLog((l) => [s, ...l]);
    return (
      <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button id="snackbar-show" onClick={() => setOpen(true)}>Show (5 s)</button>
          <button id="snackbar-hide" onClick={() => setOpen(false)}>Hide</button>
        </div>
        <div style={{ position: "fixed", inset: "auto 0 0 0", height: 96, zIndex: 2147483647, background: "repeating-linear-gradient(45deg,var(--surface-section),var(--surface-section) 8px,var(--border-default) 8px,var(--border-default) 16px)", display: "grid", placeItems: "center", font: "12px system-ui" }}>z-index: 2147483647</div>
        <Snackbar id="snackbar-demo" open={open} flavour="deletion" duration={5000} onAction={() => add("action")} onClose={(r) => { add(`close (${r})`); setOpen(false); }}>Item deleted.</Snackbar>
        <pre id="snackbar-log" style={{ font: "12px/1.4 ui-monospace,monospace", margin: 0 }}>{log.join("\n")}</pre>
      </div>
    );
  },
};

export const ThemingCascade: Story = {
  parameters: { docs: { story: { height: "660px" } } },
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)", display: "grid", gap: 8 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          <Snackbar inline open variant="standard" actionLabel="Undo">Conversation archived.</Snackbar>
          {(["positive", "error", "deletion"] as const).map((k) => <Snackbar key={k} inline open flavour={k}>{MESSAGES[k]}</Snackbar>)}
        </div>
      ))}
    </div>
  ),
};
