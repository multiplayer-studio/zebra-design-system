import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BadgeLabel } from "../src/index.js";

const VARIANTS = ["neutral", "info", "positive", "warning", "negative"] as const;
const EMPHASIS = [{ name: "bold", bold: true, outlined: false }, { name: "outlined", bold: false, outlined: true }, { name: "plain", bold: false, outlined: false }] as const;
const t = (s: string) => s[0].toUpperCase() + s.slice(1);
const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>{children}</div>;

const meta: Meta<typeof BadgeLabel> = {
  title: "Components/Badges/Badge Label", component: BadgeLabel, tags: ["autodocs"],
  parameters: { docs: { description: { component: "Figma's \"Label\" badge: a category in a word or two. Bold (solid), outlined (tint with an edge) or plain (tint with none)." } } },
  argTypes: { variant: { control: "select", options: VARIANTS }, shape: { control: "inline-radio", options: ["rounded", "sharp"] }, bold: { control: "boolean" }, outlined: { control: "boolean" } },
  args: { variant: "positive", shape: "rounded", bold: true, outlined: false, children: "New" },
};
export default meta;
type Story = StoryObj<typeof BadgeLabel>;

export const Playground: Story = {};
export const Variant: Story = { render: () => <Row>{VARIANTS.map((v) => <BadgeLabel key={v} variant={v}>{t(v)}</BadgeLabel>)}</Row> };
export const Shape: Story = { render: () => <div style={{ display: "grid", gap: 12 }}>{(["rounded", "sharp"] as const).map((sh) => <Row key={sh}>{VARIANTS.map((v) => <BadgeLabel key={v} variant={v} shape={sh}>{t(v)}</BadgeLabel>)}</Row>)}</div> };
/** Three forms, not four: Bold and Outlined together are not built, so bold wins. */
export const Emphasis: Story = { render: () => <div style={{ display: "grid", gap: 12 }}>{EMPHASIS.map((e) => <Row key={e.name}>{VARIANTS.map((v) => <BadgeLabel key={v} variant={v} bold={e.bold} outlined={e.outlined}>{t(v)}</BadgeLabel>)}</Row>)}</div> };
