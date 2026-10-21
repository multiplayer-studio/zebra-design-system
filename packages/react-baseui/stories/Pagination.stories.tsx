import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "../src/index.js";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "First/previous/next/last jumps, a window of page numbers and an optional overflow to the last page. Renders nothing at one page." } } },
  args: { pageCount: 21, defaultPage: 1, showControls: true, showMore: true, outline: false, rounded: false, visiblePages: 3 },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

const Cap = ({ children }: { children: React.ReactNode }) => <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</span>;
const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>{children}</div>;

export const Playground: Story = {};

/** The two group toggles, independently. */
export const ShowControlsAndMore: Story = {
  render: (a) => (
    <Stack>
      {([[true, true], [false, true], [true, false], [false, false]] as const).map(([c, m]) => (
        <React.Fragment key={`${c}${m}`}><Cap>showControls={String(c)} · showMore={String(m)}</Cap>
          <Pagination {...a} showControls={c} showMore={m} /></React.Fragment>
      ))}
    </Stack>
  ),
};

/** Whole-bar styling: border and corners. */
export const OutlineAndRounded: Story = {
  render: (a) => (
    <Stack>
      {([[false, false], [true, false], [false, true], [true, true]] as const).map(([o, r]) => (
        <React.Fragment key={`${o}${r}`}><Cap>outline={String(o)} · rounded={String(r)}</Cap>
          <Pagination {...a} outline={o} rounded={r} defaultPage={2} /></React.Fragment>
      ))}
    </Stack>
  ),
};

/** First page (start disabled), middle, last page (end disabled), a short range with no overflow, and a single page (renders nothing). */
export const States: Story = {
  render: (a) => (
    <Stack>
      <Cap>page 1 of 20</Cap><Pagination {...a} pageCount={20} defaultPage={1} />
      <Cap>page 10 of 20</Cap><Pagination {...a} pageCount={20} defaultPage={10} />
      <Cap>page 20 of 20</Cap><Pagination {...a} pageCount={20} defaultPage={20} />
      <Cap>page 2 of 4</Cap><Pagination {...a} pageCount={4} defaultPage={2} />
      <Cap>1 page — nothing renders</Cap><Pagination {...a} pageCount={1} />
    </Stack>
  ),
};

export const ThemingCascade: Story = {
  render: (a) => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 12 }}>
          <Cap>{cls || "base / light"}</Cap>
          <Pagination {...a} defaultPage={2} />
          <Pagination {...a} defaultPage={2} outline rounded />
        </div>
      ))}
    </div>
  ),
};
