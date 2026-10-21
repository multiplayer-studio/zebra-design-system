import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StatusChip } from "../src/index.js";

const STATUSES = [["default", "Draft"], ["success", "Shipped"], ["warning", "Delayed"], ["negative", "Overdue"], ["info", "In review"]] as const;
const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>{children}</div>;
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;

const meta: Meta<typeof StatusChip> = {
  title: "Components/Chips/Status Chip", component: StatusChip, tags: ["autodocs"],
  argTypes: { status: { control: "select", options: STATUSES.map(([s]) => s) }, shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
  args: { children: "Shipped", status: "success", shape: "rounded" },
};
export default meta;
type Story = StoryObj<typeof StatusChip>;

export const Playground: Story = {};

/** Only the fill changes; the label names the state. */
export const Status: Story = {
  render: () => <Row>{STATUSES.map(([s, l]) => <StatusChip key={s} status={s}>{l}</StatusChip>)}</Row>,
};

/** Spec `rounded`: radius/element-sm (rounded) or square (sharp). */
export const Shape: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {(["rounded", "sharp"] as const).map((sh) => <Row key={sh}>{STATUSES.map(([s, l]) => <StatusChip key={s} status={s} shape={sh}>{l}</StatusChip>)}</Row>)}
    </div>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cls || "base / light"}</Cap>
          <Row>{STATUSES.map(([s, l]) => <StatusChip key={s} status={s}>{l}</StatusChip>)}</Row>
        </div>
      ))}
    </div>
  ),
};
