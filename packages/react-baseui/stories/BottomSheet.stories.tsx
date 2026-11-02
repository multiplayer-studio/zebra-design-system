import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BottomSheet, Button, GridMenuItem, MenuItem } from "../src/index.js";

const rows = ["Share", "Edit", "Move", "Duplicate", "Archive", "Delete"];
const tiles = [
  { label: "Camera", icon: "camera" },
  { label: "Gallery", icon: "image" },
  { label: "Document", icon: "document" },
  { label: "Location", icon: "location" },
  { label: "Contacts", icon: "contacts" },
  { label: "Audio", icon: "microphone" },
] as const;
const actions = (
  <>
    <Button flavour="outline" size="small" shape="rounded">Cancel</Button>
    <Button size="small" shape="rounded">Apply</Button>
  </>
);
const meta: Meta<typeof BottomSheet> = {
  title: "Components/Bottom Sheet",
  component: BottomSheet,
  tags: ["autodocs"],
  argTypes: {
    contentType: { control: "inline-radio", options: ["list", "grid", "generic"] },
    headerAlignment: { control: "inline-radio", options: ["start", "center"] },
  },
  args: { contentType: "list", heading: "Sheet Title", showLeadingIcon: true, headerAlignment: "start" },
  render: (args) => <div style={{ maxWidth: 360 }}><BottomSheet {...args} actions={actions}>{rows.map((r) => <MenuItem key={r} leadingIcon="star">{r}</MenuItem>)}</BottomSheet></div>,
};
export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const ListContent: Story = { name: "List" };

/** Three tiles to a row, each taking an equal share. */
export const Grid: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <BottomSheet contentType="grid" heading="Attach" actions={actions}>
        {tiles.map((t, i) => <GridMenuItem key={t.label} label={t.label} icon={t.icon} active={i === 0} showBadge={i === 1} disabled={i === 5} />)}
      </BottomSheet>
    </div>
  ),
};

/** Anything else. Spacing between items is the consumer's. */
export const Generic: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <BottomSheet contentType="generic" actions={actions}>
        <p style={{ margin: 0, color: "var(--foreground-primary)" }}>Any content the product supplies.</p>
      </BottomSheet>
    </div>
  ),
};

/** center centres the title and pins the icon to the leading edge. */
export const CenteredHeader: Story = { args: { headerAlignment: "center" } };
