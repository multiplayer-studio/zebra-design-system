import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { iconNames } from "@zebra-design-system/icons/names";
import { AssistChip } from "../src/index.js";

const ACTIONS = [["calendar", "Add to calendar"], ["share", "Share"], ["star", "Save"], ["location", "Get directions"]] as const;
const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>{children}</div>;
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;

const meta: Meta<typeof AssistChip> = {
  title: "Components/Chips/Assist Chip", component: AssistChip, tags: ["autodocs"],
  argTypes: { icon: { control: "select", options: iconNames }, shape: { control: "inline-radio", options: ["rounded", "sharp"] }, onClick: { action: "click" } },
  args: { children: "Add to calendar", icon: "calendar", showLeadingIcon: true, disabled: false, shape: "rounded" },
};
export default meta;
type Story = StoryObj<typeof AssistChip>;

export const Playground: Story = {};

/** The glyph names the action's domain. Keep it consistent across a row. */
export const ShowLeadingIcon: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Row>{ACTIONS.map(([i, l]) => <AssistChip key={l} icon={i}>{l}</AssistChip>)}</Row>
      <Row>{ACTIONS.map(([i, l]) => <AssistChip key={l} icon={i} showLeadingIcon={false}>{l}</AssistChip>)}</Row>
    </div>
  ),
};

/** Hover and focus come from interaction. 32px tall in every state. */
export const State: Story = {
  render: () => <Row>{ACTIONS.map(([i, l]) => <AssistChip key={l} icon={i}>{l}</AssistChip>)}</Row>,
};

/** Unavailable: greyed and borderless, same height. Say why nearby. */
export const Disabled: Story = {
  render: () => <Row><AssistChip icon="calendar">Add to calendar</AssistChip><AssistChip icon="calendar" disabled>Add to calendar</AssistChip></Row>,
};

/** Spec `rounded`: pill (rounded) or square (sharp). */
export const Shape: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {(["rounded", "sharp"] as const).map((s) => <Row key={s}>{ACTIONS.map(([i, l]) => <AssistChip key={l} icon={i} shape={s}>{l}</AssistChip>)}</Row>)}
    </div>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cls || "base / light"}</Cap>
          <Row>
            <AssistChip icon="calendar">Add to calendar</AssistChip>
            <AssistChip icon="share">Share</AssistChip>
            <AssistChip icon="calendar" disabled>Book</AssistChip>
          </Row>
        </div>
      ))}
    </div>
  ),
};
