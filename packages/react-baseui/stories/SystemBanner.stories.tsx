import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SystemBanner, Button } from "../src/index.js";

const STATUSES = ["default", "negative", "warning", "info"] as const;
const DESCRIPTION = "Description of the badge goes here but avoid making multiple lines without braking the bank.";

/** The slot's default content: one small outline-contrast Button. The banner sets its shape. */
const action = <Button flavour="outline-contrast" size="small">Primary</Button>;

const Stack = ({ children, width }: { children: React.ReactNode; width?: number }) => (
  <div style={{ display: "grid", gap: 16, inlineSize: width ?? "100%" }}>{children}</div>
);

const meta: Meta<typeof SystemBanner> = {
  title: "Components/System Banner",
  component: SystemBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: { description: { component: "A full-width status message pinned to the top of a screen or view. Locked to Dark: every element inside resolves dark tokens whatever mode the page is in. Spec: specs/system-banner-mobile, specs/system-banner-desktop." } },
  },
  argTypes: {
    layout: { control: "inline-radio", options: ["desktop", "mobile"] },
    status: { control: "inline-radio", options: STATUSES },
    showLeadingIcon: { control: "boolean" },
    showClose: { control: "boolean" },
    shape: { control: "inline-radio", options: ["sharp", "rounded"] },
  },
  args: { layout: "desktop", status: "default", shape: "sharp", title: "Banner Title", showLeadingIcon: true, showClose: true },
};
export default meta;
type Story = StoryObj<typeof SystemBanner>;

export const Playground: Story = { render: (args) => <SystemBanner {...args} actions={action} /> };

/** Status sets the background and, on desktop, the glyph. negative has no dismiss. */
export const Status: Story = {
  render: () => <Stack>{STATUSES.map((s) => <SystemBanner key={s} status={s} title={`Status ${s}`} actions={action} />)}</Stack>,
};

/** Desktop's Content Type: a description makes it multiline, with the actions beneath. */
export const ContentType: Story = {
  render: () => (
    <Stack>
      <SystemBanner title="Banner Title" actions={action} />
      <SystemBanner title="Banner Title" description={DESCRIPTION} actions={action} />
    </Stack>
  ),
};

/** The mobile layout: title, a description clamped at two lines and the action row beneath. */
export const Mobile: Story = {
  render: () => (
    <Stack width={412}>
      {STATUSES.map((s) => <SystemBanner key={s} layout="mobile" status={s} title="Banner Title" description={DESCRIPTION} actions={action} />)}
    </Stack>
  ),
};

/** Each toggle off: no glyph, no actions, no dismiss. */
export const Minimal: Story = {
  render: () => (
    <Stack>
      <SystemBanner title="Banner Title" showLeadingIcon={false} showClose={false} />
      <SystemBanner layout="mobile" title="Banner Title" showLeadingIcon={false} showClose={false} style={{ inlineSize: 412 }} />
    </Stack>
  ),
};

/** Locked to Dark: the banner and everything in it look the same in a light and a dark container. */
export const LockedToDark: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {(["mode-light", "mode-dark"] as const).map((m) => (
        <div key={m} className={m} style={{ padding: 16, background: "var(--surface-page)" }}>
          <SystemBanner status="info" title={m} description={DESCRIPTION} actions={action} />
        </div>
      ))}
    </div>
  ),
};

/** One shape from the container: the action and the dismiss follow it; the banner stays square. */
export const Shape: Story = {
  render: () => (
    <Stack>
      {(["sharp", "rounded"] as const).map((sh) => <SystemBanner key={sh} shape={sh} status="info" title={`shape ${sh}`} actions={action} />)}
      {(["sharp", "rounded"] as const).map((sh) => <SystemBanner key={"m" + sh} layout="mobile" shape={sh} status="info" title={`shape ${sh}`} description={DESCRIPTION} actions={action} style={{ inlineSize: 412 }} />)}
    </Stack>
  ),
};
