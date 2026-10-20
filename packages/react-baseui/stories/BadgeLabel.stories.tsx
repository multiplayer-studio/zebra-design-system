import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BadgeLabel } from "../src/index.js";

const VARIANTS = ["neutral", "info", "positive", "warning", "negative"] as const;
const t = (s: string) => s[0].toUpperCase() + s.slice(1);
const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>{children}</div>;

const meta: Meta<typeof BadgeLabel> = {
  title: "Components/Badge Label", component: BadgeLabel, tags: ["autodocs"],
  parameters: { docs: { description: { component: "Figma's \"Label\" badge: a fixed category in a word or two, solid fill." } } },
  argTypes: { variant: { control: "select", options: VARIANTS }, shape: { control: "inline-radio", options: ["rounded", "sharp"] } },
  args: { variant: "positive", shape: "rounded", children: "New" },
};
export default meta;
type Story = StoryObj<typeof BadgeLabel>;

export const Playground: Story = {};
export const Variant: Story = { render: () => <Row>{VARIANTS.map((v) => <BadgeLabel key={v} variant={v}>{t(v)}</BadgeLabel>)}</Row> };
export const Shape: Story = { render: () => <div style={{ display: "grid", gap: 12 }}>{(["rounded", "sharp"] as const).map((sh) => <Row key={sh}>{VARIANTS.map((v) => <BadgeLabel key={v} variant={v} shape={sh}>{t(v)}</BadgeLabel>)}</Row>)}</div> };
