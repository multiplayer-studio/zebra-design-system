import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/tooltip/tooltip.js";
import "../src/components/icon-button/icon-button.js";
import "../src/components/button/button.js";
import type { TooltipPoint, TooltipShape } from "../src/components/tooltip/tooltip.js";

const POINTS: TooltipPoint[] = ["bottom", "top", "left", "right"];
const SHAPES: TooltipShape[] = ["rounded", "sharp"];

// Every story on the Docs page shares one document, so `for` ids must be unique.
let n = 0;
const uid = (s: string) => `tt-${s}-${++n}`;

const note = (t: string) => html`<div style="font:500 12px/1.4 system-ui;color:var(--foreground-secondary)">${t}</div>`;

type Args = { point: TooltipPoint; shape: TooltipShape; label: string; delay: number; closeDelay: number };

const meta: Meta<Args> = {
  title: "Components/Tooltip",
  component: "zds-tooltip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A short floating message that names what an adjacent control does. `point` names the edge the pointer sits on — the edge facing the trigger — so `point=\"bottom\"` puts the bubble above it. Point it at its trigger with `for`; it opens on hover (after `delay`) and keyboard focus, closes on leave, blur, a press or Escape, flips at viewport edges and wires itself up as the trigger's description. With no trigger it renders the static bubble. Spec: specs/tooltip.",
      },
    },
  },
  argTypes: {
    point: { control: "inline-radio", options: POINTS },
    shape: { control: "inline-radio", options: SHAPES },
    label: { control: "text" },
    delay: { control: "number" },
    closeDelay: { control: "number" },
  },
  args: { point: "bottom", shape: "rounded", label: "Save draft", delay: 600, closeDelay: 0 },
};
export default meta;
type Story = StoryObj<Args>;

/** Hover or tab to the button. */
export const Playground: Story = {
  render: (a) => {
    const id = uid("play");
    return html`<div style="height:200px;display:grid;place-items:center">
      <zds-icon-button id=${id} icon="save" label="Save draft" shape="rounded"></zds-icon-button>
      <zds-tooltip for=${id} point=${a.point} shape=${a.shape} delay=${a.delay} close-delay=${a.closeDelay}>${a.label}</zds-tooltip>
    </div>`;
  },
};

/** Point names the pointer's edge: bottom → bubble above, top → below, left → to the right, right → to the left. Shown open. */
export const Points: Story = {
  render: (a) => html`<div style="display:flex;gap:200px;padding:64px 120px;flex-wrap:wrap">
    ${POINTS.map((p) => {
      const id = uid(p);
      return html`<zds-icon-button id=${id} icon="edit" label="Edit" shape="rounded"></zds-icon-button>
        <zds-tooltip for=${id} point=${p} shape=${a.shape} open>point=${p}</zds-tooltip>`;
    })}
  </div>`,
};

/** Rounded and sharp change the corners and the pointer tip together. */
export const Shapes: Story = {
  render: (a) => html`<div style="display:flex;gap:120px;padding:64px 96px">
    ${SHAPES.map((s) => {
      const id = uid(s);
      return html`<zds-icon-button id=${id} icon="delete" label="Delete" shape=${s} flavour="outline"></zds-icon-button>
        <zds-tooltip for=${id} point=${a.point} shape=${s} open>Delete item</zds-tooltip>`;
    })}
  </div>`,
};

/** The spec's eight variants as static bubbles (no trigger) — the component exactly as Figma draws it. */
export const StaticVariants: Story = {
  render: (a) => html`<div style="display:grid;grid-template-columns:repeat(4,max-content);gap:32px;padding:16px;align-items:center">
    ${SHAPES.flatMap((s) =>
      POINTS.map(
        (p) => html`<div style="display:grid;gap:12px;justify-items:start">
          ${note(`${s} · ${p}`)}
          <zds-tooltip shape=${s} point=${p}>${a.label}</zds-tooltip>
        </div>`,
      ),
    )}
  </div>`,
};

/** No max width in Figma. Here a label wraps at ~32ch of its own font, between words. */
export const LongLabel: Story = {
  args: { label: "Copies the share link for this report to your clipboard so you can paste it into a message" },
  render: (a) => {
    const id = uid("long");
    return html`<div style="height:220px;display:grid;place-items:center">
      <zds-button id=${id} shape="rounded" leading-icon="share">Share</zds-button>
      <zds-tooltip for=${id} point=${a.point} shape=${a.shape} open>${a.label}</zds-tooltip>
    </div>`;
  },
};

/** Pinned to the viewport's top corners: `point="bottom"` has no room above, so the bubble flips below and the pointer follows; `point="right"` has no room on the right, so it flips left. The long label also shifts to stay on screen while its pointer keeps aiming at the trigger. */
export const Collision: Story = {
  parameters: { docs: { story: { inline: false, height: "160px" } } },
  render: (a) => {
    const m = uid("menu");
    const s = uid("settings");
    return html`<div style="height:120px">
      <zds-icon-button id=${m} icon="hamburger-menu" label="Menu" shape="rounded" style="position:fixed;top:4px;left:4px"></zds-icon-button>
      <zds-tooltip for=${m} point="bottom" shape=${a.shape} open>Open the navigation menu</zds-tooltip>
      <zds-icon-button id=${s} icon="settings" label="Settings" shape="rounded" style="position:fixed;top:4px;right:4px"></zds-icon-button>
      <zds-tooltip for=${s} point="right" shape=${a.shape} open>Settings</zds-tooltip>
    </div>`;
  },
};

/** The same pair in each theme scope: base, dark, companion, companion dark. */
export const ThemingCascade: Story = {
  render: (a) => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => {
      const id = uid("theme");
      return html`<div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:16px;justify-items:start;min-height:160px">
        ${note(cls || "base / light")}
        <zds-tooltip shape=${a.shape} point="left">${a.label}</zds-tooltip>
        <div style="padding-top:36px">
          <zds-icon-button id=${id} icon="save" label="Save draft" shape="rounded"></zds-icon-button>
          <zds-tooltip for=${id} point=${a.point} shape=${a.shape} open>${a.label}</zds-tooltip>
        </div>
      </div>`;
    })}
  </div>`,
};
