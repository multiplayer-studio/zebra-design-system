import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/switch/switch.js";
import { iconNames } from "@zebra-design-system/icons/names";

const meta: Meta = {
  title: "Components/Switch",
  component: "zds-switch",
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean", description: "The spec's Switch axis: off / on." },
    disabled: { control: "boolean" },
    onIcon: { control: "select", options: [null, ...iconNames], description: "Start slot, uncovered while on." },
    offIcon: { control: "select", options: [null, ...iconNames], description: "End slot, uncovered while off." },
    label: { control: "text", description: "Accessible name when no <label> points at the switch." },
  },
  args: { checked: false, disabled: false, onIcon: "microphone", offIcon: "microphone-off", label: "Microphone" },
  render: (a) => html`
    <zds-switch
      ?checked=${a.checked}
      ?disabled=${a.disabled}
      on-icon=${a.onIcon ?? undefined}
      off-icon=${a.offIcon ?? undefined}
      label=${a.label ?? undefined}
    ></zds-switch>
  `,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

const row = (children: unknown) => html`<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">${children}</div>`;
const caption = (text: string) => html`<span style="font:500 12px/1.4 system-ui;opacity:.7;min-width:72px">${text}</span>`;

/**
 * The spec's Switch axis. Only the track changes colour; the thumb keeps its
 * colour and moves. Click any of them to see the motion.
 */
export const OnOff: Story = {
  render: () => row(html`
    ${caption("off")}<zds-switch label="Off"></zds-switch>
    ${caption("on")}<zds-switch checked label="On"></zds-switch>
  `),
};

/**
 * The spec's State axis, against both Switch values. Focus is not an
 * attribute: tab into the first row to see the ring, which is drawn inside
 * the footprint.
 */
export const States: Story = {
  render: () => html`<div style="display:grid;gap:12px">
    ${row(html`${caption("enabled")}<zds-switch label="Enabled, off"></zds-switch><zds-switch checked label="Enabled, on"></zds-switch>`)}
    ${row(html`${caption("disabled")}<zds-switch disabled label="Disabled, off"></zds-switch><zds-switch disabled checked label="Disabled, on"></zds-switch>`)}
  </div>`,
};

/**
 * The icon slots, as in the spec's sample: a state-communicating pair. Leave
 * both unset (the spec's hasIcons=false) for a plain track and thumb.
 */
export const Icons: Story = {
  render: () => html`<div style="display:grid;gap:12px">
    ${row(html`${caption("paired")}
      <zds-switch on-icon="microphone" off-icon="microphone-off" label="Microphone"></zds-switch>
      <zds-switch checked on-icon="microphone" off-icon="microphone-off" label="Microphone"></zds-switch>
      <zds-switch disabled on-icon="microphone" off-icon="microphone-off" label="Microphone"></zds-switch>`)}
    ${row(html`${caption("no icons")}
      <zds-switch label="Plain"></zds-switch>
      <zds-switch checked label="Plain"></zds-switch>`)}
  </div>`,
};

/** A native label names the switch and toggles it; inside a form it submits like a checkbox. */
export const WithLabelAndForm: Story = {
  render: () => html`
    <form
      style="display:grid;gap:12px;font:14px/1.4 system-ui;color:var(--foreground-primary)"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const out = (e.currentTarget as HTMLFormElement).querySelector("output")!;
        out.textContent = JSON.stringify(Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement)));
      }}
    >
      <div style="display:flex;gap:8px;align-items:center">
        <zds-switch id="wifi" name="wifi" checked></zds-switch>
        <label for="wifi">Wi-Fi</label>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <zds-switch id="bt" name="bluetooth"></zds-switch>
        <label for="bt">Bluetooth</label>
      </div>
      <div style="display:flex;gap:8px">
        <button type="submit">Submit</button><button type="reset">Reset</button>
      </div>
      <output></output>
    </form>`,
};

/** The thumb is positioned by logical edges, so it starts and travels from the inline-start side in RTL. */
export const RightToLeft: Story = {
  render: () => html`<div dir="rtl">${row(html`
    <zds-switch on-icon="microphone" off-icon="microphone-off" label="Off"></zds-switch>
    <zds-switch checked on-icon="microphone" off-icon="microphone-off" label="On"></zds-switch>
  `)}</div>`,
};

/** Theming is a class, at any level. The switches are identical markup in every panel. */
export const ThemingCascade: Story = {
  render: () => {
    const panel = (cls: string, label: string) => html`
      <div class=${cls} style="padding:16px;border-radius:8px;background:var(--surface-page);color:var(--foreground-primary);border:1px solid var(--border-default)">
        <div style="font:500 12px/1.4 system-ui;margin-bottom:8px;opacity:.7">${label || "base / light"}</div>
        ${row(html`
          <zds-switch on-icon="microphone" off-icon="microphone-off" label="Off"></zds-switch>
          <zds-switch checked on-icon="microphone" off-icon="microphone-off" label="On"></zds-switch>
          <zds-switch disabled checked label="Disabled"></zds-switch>
        `)}
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
