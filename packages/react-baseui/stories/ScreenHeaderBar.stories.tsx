import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, IconButton, ScreenHeaderBar } from "../src/index.js";

const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 16, maxWidth: 480 }}>{children}</div>;
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;
/** The bar is transparent: show it on the page surface it would sit on. */
const Screen = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "var(--surface-page)", border: "1px dashed var(--border-subtle)" }}>{children}</div>
);

const meta: Meta<typeof ScreenHeaderBar> = {
  title: "Components/Screen Header Bar",
  component: ScreenHeaderBar,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "The bar at the top of a pushed screen: a back button, the screen's title as a heading, and one trailing action. Transparent; fills its container. `shape` reaches both the back button and the action. Overlaps Top App Bar (not built yet). Spec: specs/screen-header-bar." } } },
  argTypes: {
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    headingLevel: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    onBack: { action: "back" },
  },
  args: { title: "Add subscribers", showLeadingIcon: true, shape: "rounded", headingLevel: 1, backLabel: "Back" },
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Screen><ScreenHeaderBar {...args} action={<Button size="medium">Save</Button>} /></Screen>
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof ScreenHeaderBar>;

export const Playground: Story = {};

/** Spec `title`: names the screen. A long title wraps; it is never truncated. */
export const Title: Story = {
  render: () => (
    <Stack>
      <Screen><ScreenHeaderBar title="Notifications" action={<Button size="medium">Mark all read</Button>} /></Screen>
      <Screen><ScreenHeaderBar title="Subscriber preferences for the quarterly maintenance bulletin" action={<Button size="medium">Save</Button>} /></Screen>
    </Stack>
  ),
};

/** Spec `showLeadingIcon`: on for a pushed screen; off on a root screen, where the heading takes the space. */
export const ShowLeadingIcon: Story = {
  render: () => (
    <Stack>
      <Cap>true</Cap>
      <Screen><ScreenHeaderBar title="Add subscribers" action={<Button size="medium">Save</Button>} /></Screen>
      <Cap>false</Cap>
      <Screen><ScreenHeaderBar title="Subscribers" showLeadingIcon={false} action={<Button size="medium" leadingIcon="add">Add</Button>} /></Screen>
    </Stack>
  ),
};

/** Spec `rounded` (renamed `shape`): reaches both the back button and the action, so corners never mix. */
export const Shape: Story = {
  render: () => (
    <Stack>
      {(["rounded", "sharp"] as const).map((s) => (
        <React.Fragment key={s}>
          <Cap>{s}</Cap>
          <Screen><ScreenHeaderBar title="Add subscribers" shape={s} action={<Button size="medium">Save</Button>} /></Screen>
        </React.Fragment>
      ))}
    </Stack>
  ),
};

/** Spec `actionSlot`: one Button or IconButton, or none. Hover, press and focus (Tab) come from each control. */
export const Action: Story = {
  render: () => (
    <Stack>
      <Cap>Button</Cap>
      <Screen><ScreenHeaderBar title="Edit route" action={<Button size="medium" leadingIcon="save">Save</Button>} /></Screen>
      <Cap>IconButton</Cap>
      <Screen><ScreenHeaderBar title="Shift report" action={<IconButton size="medium" flavour="subtle" icon="share" label="Share report" />} /></Screen>
      <Cap>overflow menu</Cap>
      <Screen><ScreenHeaderBar title="Device details" shape="sharp" action={<IconButton size="medium" flavour="subtle" icon="more-vertical" label="More options" />} /></Screen>
      <Cap>none</Cap>
      <Screen><ScreenHeaderBar title="About this device" /></Screen>
    </Stack>
  ),
};

/** `headingLevel`: h1 by default; lower it when the bar sits inside a larger page. Looks the same at every level. */
export const HeadingLevel: Story = {
  render: () => (
    <Stack>
      <Screen><ScreenHeaderBar title="Inventory (h1)" action={<Button size="medium">Scan</Button>} /></Screen>
      <Screen><ScreenHeaderBar title="Inventory (h2)" headingLevel={2} action={<Button size="medium">Scan</Button>} /></Screen>
    </Stack>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cls || "base / light"}</Cap>
          <ScreenHeaderBar title="Add subscribers" action={<Button size="medium">Save</Button>} />
          <ScreenHeaderBar title="Shift report" shape="sharp" action={<IconButton size="medium" flavour="subtle" icon="share" label="Share report" />} />
        </div>
      ))}
    </div>
  ),
};
