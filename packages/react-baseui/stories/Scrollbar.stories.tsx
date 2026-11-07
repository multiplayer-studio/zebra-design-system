import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Scrollbar } from "../src/index.js";

const meta: Meta<typeof Scrollbar> = {
  title: "Components/Scrollbar",
  component: Scrollbar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The scroll indicator for a region that clips its content. The scrolling region owns the behaviour; the bar only reports position. Hover it: the track scrims and the handle darkens. Spec: specs/scrollbar.",
      },
    },
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"] },
    value: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    size: { control: { type: "range", min: 0.05, max: 1, step: 0.01 } },
  },
  args: { orientation: "vertical", value: 0, size: 0.32 },
};
export default meta;
type Story = StoryObj<typeof Scrollbar>;

export const Playground: Story = {};

/** The two axes draw the same bar: same padding, colours and radius. */
export const Orientation: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      <Scrollbar orientation="vertical" value={0.3} />
      <Scrollbar orientation="horizontal" value={0.3} />
    </div>
  ),
};

/** The handle's length is the viewport's share of the content; its offset mirrors the scroll position. */
export const Values: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Scrollbar value={0} size={0.32} />
      <Scrollbar value={0.5} size={0.32} />
      <Scrollbar value={1} size={0.32} />
      <Scrollbar value={0.25} size={0.7} />
    </div>
  ),
};

/** Wired to a real scrolling region — the region owns scroll; the bar mirrors it. */
export const InContext: Story = {
  render: function InContext() {
    const region = React.useRef<HTMLDivElement>(null);
    const [v, setV] = React.useState(0);
    const [s, setS] = React.useState(0.32);
    const sync = () => {
      const el = region.current;
      if (!el) return;
      setS(el.clientHeight / el.scrollHeight);
      setV(el.scrollTop / (el.scrollHeight - el.clientHeight || 1));
    };
    React.useEffect(sync, []);
    return (
      <div style={{ display: "flex", gap: 4, blockSize: 200 }}>
        <div ref={region} onScroll={sync} style={{ inlineSize: 280, overflowY: "auto", border: "1px solid var(--border-default)", padding: 12 }}>
          {Array.from({ length: 24 }, (_, i) => <p key={i} style={{ margin: "0 0 8px" }}>Row {i + 1}</p>)}
        </div>
        <Scrollbar value={v} size={s} style={{ ["--zds-scrollbar-length" as string]: "100%" }} />
      </div>
    );
  },
};
