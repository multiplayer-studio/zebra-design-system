import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterChip } from "../src/index.js";

const FILTERS = ["In stock", "On sale", "Free delivery", "Rated 4+"];
const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>{children}</div>;
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;

const meta: Meta<typeof FilterChip> = {
  title: "Components/Filter Chip", component: FilterChip, tags: ["autodocs"],
  argTypes: { shape: { control: "inline-radio", options: ["rounded", "sharp"] }, onActiveChange: { action: "activeChange" } },
  args: { children: "In stock", active: false, disabled: false, shape: "rounded" },
};
export default meta;
type Story = StoryObj<typeof FilterChip>;

export const Playground: Story = {};

/** The real switch: inverse palette plus a check mark, which keeps the on state readable without colour. */
export const Active: Story = {
  render: () => <Row><FilterChip active={false}>In stock</FilterChip><FilterChip active>In stock</FilterChip></Row>,
};

/** Hover and focus come from interaction. A group where more than one can be on: click to switch. */
export const State: Story = {
  render: () => <Row>{FILTERS.map((f, i) => <FilterChip key={f} defaultActive={i < 2}>{f}</FilterChip>)}</Row>,
};

/** Locked, inactive and active. Say why nearby. */
export const Disabled: Story = {
  render: () => <Row><FilterChip disabled>On sale</FilterChip><FilterChip disabled active>In stock</FilterChip></Row>,
};

/** Spec `rounded`: pill (rounded) or square (sharp). */
export const Shape: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {(["rounded", "sharp"] as const).map((s) => (
        <Row key={s}>{FILTERS.map((f, i) => <FilterChip key={f} shape={s} defaultActive={i === 0}>{f}</FilterChip>)}</Row>
      ))}
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
            <FilterChip defaultActive>In stock</FilterChip>
            <FilterChip>On sale</FilterChip>
            <FilterChip disabled>Free delivery</FilterChip>
          </Row>
        </div>
      ))}
    </div>
  ),
};
