import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonGroup, IconButton } from "../src/index.js";

const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>{children}</div>;
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;

// Items are passed as arrays of elements, not wrapped in a component: the
// group sets size / flavour / shape on its direct children.
/** Figma's sample content: leading verified, trailing expand-more. */
const figmaItems = () => ["Approve", "Review", "Assign", "Archive"].map((l) => (
  <Button key={l} leadingIcon="verified" trailingIcon="expand-more">{l}</Button>
));
const fileItems = () => [
  <Button key="edit" leadingIcon="edit">Edit</Button>,
  <Button key="share" leadingIcon="share">Share</Button>,
  <Button key="download" leadingIcon="download">Download</Button>,
];

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Buttons/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "A row of peer actions on one bordered surface. Items are Button / IconButton; the group sets their size, pins them to subtle and draws a divider between every pair. Spec: specs/button-group." } } },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    shape: { control: "inline-radio", options: ["sharp", "rounded"] },
  },
  args: { size: "medium", shape: "sharp", label: "File actions" },
  render: (args) => <ButtonGroup {...args}>{fileItems()}</ButtonGroup>,
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {};

/** Spec `size`: row height and every item's size together. */
export const Size: Story = {
  render: () => (
    <Stack>
      {(["small", "medium", "large"] as const).map((s) => (
        <React.Fragment key={s}><Cap>{s}</Cap><ButtonGroup label="Review actions" size={s}>{figmaItems()}</ButtonGroup></React.Fragment>
      ))}
    </Stack>
  ),
};

/** Spec `shape`: only the group's outline and the outer ends of the first and last item round. */
export const Shape: Story = {
  render: () => (
    <Stack>
      {(["sharp", "rounded"] as const).map((s) => (
        <React.Fragment key={s}><Cap>{s}</Cap><ButtonGroup label="File actions" shape={s}>{fileItems()}</ButtonGroup></React.Fragment>
      ))}
    </Stack>
  ),
};

/** Every size × shape: a divider between every pair, no overlap (fixes the three mis-assembled Figma variants). */
export const SizeByShape: Story = {
  render: () => (
    <Stack>
      {(["small", "medium", "large"] as const).flatMap((size) =>
        (["sharp", "rounded"] as const).map((shape) => (
          <React.Fragment key={`${size}-${shape}`}>
            <Cap>{size} / {shape}</Cap>
            <ButtonGroup label="File actions" size={size} shape={shape}>{fileItems()}</ButtonGroup>
          </React.Fragment>
        )),
      )}
    </Stack>
  ),
};

/** Spec `items`: any number of Buttons, IconButtons or both. Hover, press and keyboard focus (Tab) come from each item. */
export const Items: Story = {
  render: () => (
    <Stack>
      <Cap>two</Cap>
      <ButtonGroup label="Confirm" shape="rounded"><Button>Cancel</Button><Button>Save draft</Button></ButtonGroup>
      <Cap>Figma sample (leading + trailing icon)</Cap>
      <ButtonGroup label="Review actions" shape="rounded">{figmaItems()}</ButtonGroup>
      <Cap>icon buttons</Cap>
      <ButtonGroup label="History and zoom" shape="rounded">
        <IconButton icon="undo" label="Undo" />
        <IconButton icon="redo" label="Redo" />
        <IconButton icon="zoom-in" label="Zoom in" />
        <IconButton icon="zoom-out" label="Zoom out" />
      </ButtonGroup>
      <Cap>mixed, one disabled</Cap>
      <ButtonGroup label="Message actions" shape="rounded">
        <Button leadingIcon="send">Send</Button>
        <Button leadingIcon="attachment" disabled>Attach</Button>
        <IconButton icon="more-vertical" label="More options" />
      </ButtonGroup>
    </Stack>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8, justifyItems: "start" }}>
          <Cap>{cls || "base / light"}</Cap>
          <ButtonGroup label="File actions">{fileItems()}</ButtonGroup>
          <ButtonGroup label="File actions" shape="rounded" size="small">{fileItems()}</ButtonGroup>
          <ButtonGroup label="History" shape="rounded">
            <IconButton icon="undo" label="Undo" />
            <IconButton icon="redo" label="Redo" />
            <IconButton icon="more-vertical" label="More options" disabled />
          </ButtonGroup>
        </div>
      ))}
    </div>
  ),
};
