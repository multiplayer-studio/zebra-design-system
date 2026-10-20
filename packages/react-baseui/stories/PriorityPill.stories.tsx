import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PriorityPill } from "../src/index.js";

const LEVELS = ["low", "medium", "high", "urgent"] as const;
const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>{children}</div>;

const meta: Meta<typeof PriorityPill> = {
  title: "Components/Priority Pill", component: PriorityPill, tags: ["autodocs"],
  argTypes: { level: { control: "inline-radio", options: LEVELS }, variant: { control: "inline-radio", options: ["lozenge", "badge"] }, size: { control: "inline-radio", options: ["large", "small"] }, leading: { control: "inline-radio", options: ["icon", "number"] } },
  args: { level: "high", variant: "lozenge", size: "large", leading: "icon" },
};
export default meta;
type Story = StoryObj<typeof PriorityPill>;

export const Playground: Story = {};
/** The level fixes glyph, rank and colour. */
export const Level: Story = { render: () => <Row>{LEVELS.map((l) => <PriorityPill key={l} level={l} />)}</Row> };
/** Every size x variant x leading. */
export const Matrix: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {(["large", "small"] as const).flatMap((sz) => (["icon", "number"] as const).map((ld) => (
        <Row key={sz + ld}>
          {LEVELS.map((l) => <PriorityPill key={l} level={l} size={sz} leading={ld} />)}
          {LEVELS.map((l) => <PriorityPill key={"b" + l} variant="badge" level={l} size={sz} leading={ld} />)}
        </Row>
      )))}
    </div>
  ),
};
