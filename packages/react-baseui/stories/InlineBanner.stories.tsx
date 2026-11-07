import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InlineBanner, Button } from "../src/index.js";

const STATUSES = ["neutral", "info", "positive", "warning", "negative"] as const;
const COPY: Record<(typeof STATUSES)[number], [string, string]> = {
  neutral: ["Printer profiles sync every hour", "Changes made on another device appear after the next sync."],
  info: ["A firmware update is available", "Version 3.0.3720 adds wireless roaming. Install it from Settings."],
  positive: ["Profile applied to 12 printers", "Every printer reported back with the new settings."],
  warning: ["Protected Mode is on", "Printer actions are unavailable until the security mode changes."],
  negative: ["The printer stopped responding", "Check the cable or network, then try again."],
};

/** Solid takes outline-contrast actions; subtle takes outline-subtle, whose neutral border sits with every status tint. */
const actionFor = (appearance: "solid" | "subtle") => (
  <Button flavour={appearance === "solid" ? "outline-contrast" : "outline-subtle"} size="small">Take action</Button>
);

const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 16 }}>{children}</div>;

const meta: Meta<typeof InlineBanner> = {
  title: "Components/Inline Banner",
  component: InlineBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A status message inside the content it is about. **Solid** is for the one message on the view that must be noticed now. **Subtle** is for context and guidance that should be read without interrupting. Spec: specs/inline-banner.",
      },
    },
  },
  argTypes: {
    status: { control: "inline-radio", options: STATUSES },
    appearance: { control: "inline-radio", options: ["subtle", "solid"] },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    showIcon: { control: "boolean" },
    showClose: { control: "boolean" },
  },
  args: { status: "info", appearance: "subtle", shape: "rounded", title: COPY.info[0], description: COPY.info[1], showIcon: true, showClose: false },
};
export default meta;
type Story = StoryObj<typeof InlineBanner>;

export const Playground: Story = { render: (args) => <InlineBanner {...args} actions={actionFor(args.appearance ?? "subtle")} /> };

/** Subtle: faint tint, status border, the status colour on the glyph only. */
export const Subtle: Story = {
  render: () => <Stack>{STATUSES.map((s) => <InlineBanner key={s} status={s} appearance="subtle" title={COPY[s][0]} description={COPY[s][1]} actions={actionFor("subtle")} showClose />)}</Stack>,
};

/** Solid: strong fill, always-white text; the controls draw in a Dark island. */
export const Solid: Story = {
  render: () => <Stack>{STATUSES.map((s) => <InlineBanner key={s} status={s} appearance="solid" title={COPY[s][0]} description={COPY[s][1]} actions={actionFor("solid")} showClose />)}</Stack>,
};

/** Title only, no actions: the smallest form. */
export const Compact: Story = {
  render: () => (
    <Stack>
      {STATUSES.map((s) => (
        <div key={s} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <InlineBanner status={s} appearance="subtle" title={COPY[s][0]} />
          <InlineBanner status={s} appearance="solid" title={COPY[s][0]} />
        </div>
      ))}
    </Stack>
  ),
};

/** Shape: the corners, the actions and the dismiss follow it. */
export const Shape: Story = {
  render: () => (
    <Stack>
      <InlineBanner shape="rounded" status="info" title="Rounded" description={COPY.info[1]} actions={actionFor("subtle")} showClose />
      <InlineBanner shape="sharp" status="info" appearance="solid" title="Sharp" description={COPY.info[1]} actions={actionFor("solid")} showClose />
    </Stack>
  ),
};

/** In context: subtle guidance in a narrow card wraps its action below the text. */
export const Narrow: Story = {
  render: () => (
    <div style={{ inlineSize: 360 }}>
      <InlineBanner status="warning" title={COPY.warning[0]} description={COPY.warning[1]} actions={actionFor("subtle")} showClose />
    </div>
  ),
};
