import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/slider/slider.js";

const SHAPES = ["rounded", "sharp"] as const;

const meta: Meta = {
  title: "Components/Slider",
  component: "zds-slider",
  tags: ["autodocs"],
  argTypes: {
    shape: { control: "inline-radio", options: SHAPES },
    disabled: { control: "boolean" },
    stepped: { control: "boolean", description: "Only certain values can be chosen: a dot at every stop. Use with a coarse step." },
    range: { control: "boolean", description: "Adds a start thumb; the fill runs between the two." },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    value: { control: "number" },
    valueStart: { control: "number" },
  },
  args: { shape: "rounded", disabled: false, stepped: true, range: false, min: 0, max: 100, step: 25, value: 50, valueStart: 25 },
  render: (a) => html`
    <div style="max-width:400px">
      <zds-slider
        shape=${a.shape}
        ?disabled=${a.disabled}
        ?stepped=${a.stepped}
        ?range=${a.range}
        min=${a.min}
        max=${a.max}
        step=${a.step}
        value=${a.value}
        value-start=${a.valueStart}
        label=${a.range ? "Maximum" : "Volume"}
        start-label="Minimum"
      ></zds-slider>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const stack = (children: unknown) => html`<div style="display:grid;gap:24px;max-width:400px">${children}</div>`;
const labelled = (text: string, el: unknown) =>
  html`<div style="display:grid;gap:8px"><span style="font:500 12px/1.4 system-ui;opacity:.7">${text}</span>${el}</div>`;

/** Corner treatment of the track and thumb together. It carries no meaning. */
export const Shapes: Story = {
  render: () => stack(SHAPES.map((s) => labelled(s, html`<zds-slider shape=${s} value="60" label=${s}></zds-slider>`))),
};

/**
 * The spec's State axis. Default and disabled are shown; hover (point at a
 * slider) and selected (drag a thumb) are interaction states, and keyboard
 * focus (Tab in) adds a ring the spec doesn't define.
 */
export const States: Story = {
  render: () => stack(html`
    ${labelled("default — hover, drag or Tab into it", html`<zds-slider value="40" label="Default"></zds-slider>`)}
    ${labelled("disabled", html`<zds-slider disabled value="40" label="Disabled"></zds-slider>`)}
  `),
};

/** One dot per valid stop, derived from min, max and step. Off for a continuous range. */
export const Steps: Story = {
  render: () => stack(html`
    ${labelled("step 25", html`<zds-slider stepped step="25" value="50" label="Step 25"></zds-slider>`)}
    ${labelled("step 10", html`<zds-slider stepped step="10" value="30" label="Step 10"></zds-slider>`)}
    ${labelled("continuous", html`<zds-slider value="30" label="Continuous"></zds-slider>`)}
  `),
};

/** A span rather than a value. Each thumb has its own name and value. */
export const Range: Story = {
  render: () => stack(html`
    ${labelled("range", html`<zds-slider range value-start="20" value="70" label="Maximum" start-label="Minimum"></zds-slider>`)}
    ${labelled("range with steps", html`<zds-slider range stepped step="10" value-start="30" value="60" label="Maximum" start-label="Minimum"></zds-slider>`)}
    ${labelled("range, disabled", html`<zds-slider range disabled value-start="20" value="70" label="Maximum" start-label="Minimum"></zds-slider>`)}
  `),
};

/** Logical positioning: the minimum is at the inline start, so the slider runs right to left in RTL. */
export const RightToLeft: Story = {
  render: () => html`<div dir="rtl">${stack(html`
    <zds-slider stepped step="25" value="25" label="RTL"></zds-slider>
    <zds-slider range value-start="20" value="70" label="Maximum" start-label="Minimum"></zds-slider>
  `)}</div>`,
};

/** Theming is a class, at any level. The sliders are identical markup in every panel. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:12px;opacity:.7">${label || "base / light"}</div>
        <div style="display:grid;gap:20px">
          <zds-slider stepped step="25" value="50" label="Default"></zds-slider>
          <zds-slider range value-start="20" value="70" label="Maximum" start-label="Minimum"></zds-slider>
          <zds-slider disabled value="50" label="Disabled"></zds-slider>
        </div>
      </div>`;
    return html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
      ${panel("", "")}
      ${panel("mode-dark", "mode-dark")}
      ${panel("ext-companion", "ext-companion")}
      ${panel("ext-companion mode-dark", "ext-companion mode-dark")}
      ${panel("ext-target", "ext-target")}
      ${panel("ext-target mode-dark", "ext-target mode-dark")}
    </div>`;
  },
};
