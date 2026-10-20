import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StatusLabel } from "../src/index.js";

const STATUSES = ["neutral", "info", "positive", "warning", "negative"] as const;
const t = (s: string) => s[0].toUpperCase() + s.slice(1);
const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>{children}</div>;

const meta: Meta<typeof StatusLabel> = {
  title: "Components/Status Label", component: StatusLabel, tags: ["autodocs"],
  argTypes: { status: { control: "select", options: STATUSES }, leading: { control: "inline-radio", options: ["indicator", "icon", "none"] }, shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
  args: { status: "info", leading: "indicator", shape: "rounded", children: "Ongoing" },
};
export default meta;
type Story = StoryObj<typeof StatusLabel>;

export const Playground: Story = {};
/** Fill, border and the leading element follow Status; the label holds foreground/primary. */
export const Status: Story = { render: () => <Row>{STATUSES.map((s) => <StatusLabel key={s} status={s}>{t(s)}</StatusLabel>)}</Row> };
/** A dot, a glyph fixed per status (survives greyscale), or nothing. */
export const Leading: Story = { render: () => <div style={{ display: "grid", gap: 12 }}>{(["indicator", "icon", "none"] as const).map((l) => <Row key={l}>{STATUSES.map((s) => <StatusLabel key={s} status={s} leading={l}>{t(s)}</StatusLabel>)}</Row>)}</div> };
export const Shape: Story = { render: () => <div style={{ display: "grid", gap: 12 }}>{(["rounded", "sharp"] as const).map((sh) => <Row key={sh}>{STATUSES.map((s) => <StatusLabel key={s} status={s} shape={sh}>{t(s)}</StatusLabel>)}</Row>)}</div> };
