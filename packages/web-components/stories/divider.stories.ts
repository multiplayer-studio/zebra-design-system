import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/divider/divider.js";

const ORIENTATIONS = ["horizontal", "vertical"] as const;

const meta: Meta = {
  title: "Components/Divider",
  component: "zds-divider",
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "inline-radio", options: ORIENTATIONS },
  },
  args: { orientation: "horizontal" },
  render: (a) => html`
    <div style=${a.orientation === "vertical" ? "height:40px;display:flex" : "width:320px"}>
      <zds-divider orientation=${a.orientation}></zds-divider>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Horizontal separates stacked content; vertical separates side-by-side content. */
export const Orientations: Story = {
  render: () => html`
    <div style="display:flex;gap:32px;align-items:center">
      <div style="width:320px">
        <zds-divider orientation="horizontal"></zds-divider>
      </div>
      <div style="height:40px;display:flex">
        <zds-divider orientation="vertical"></zds-divider>
      </div>
    </div>
  `,
};

/** The line stretches with its container — not fixed at the default 320×1 (or 1×40) size. */
export const FillsContainer: Story = {
  render: () => html`
    <div style="width:480px">
      <zds-divider orientation="horizontal"></zds-divider>
    </div>
  `,
};

/** A class on any ancestor re-themes border/default with no re-render. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:8px;opacity:.7">${label || "base / light"}</div>
        <div style="width:240px">
          <zds-divider orientation="horizontal"></zds-divider>
        </div>
      </div>`;
    return html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
      ${panel("", "")}
      ${panel("mode-dark", "mode-dark")}
      ${panel("ext-companion", "ext-companion")}
    </div>`;
  },
};
