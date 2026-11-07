import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/stepper/stepper.js";
import type { StepStatus } from "../src/components/stepper/step.js";

const STEPS: Array<{ label: string; subtitle?: string; status: StepStatus }> = [
  { label: "Account", status: "complete" },
  { label: "Shipping", status: "complete" },
  { label: "Payment", subtitle: "Card", status: "active" },
  { label: "Confirm", status: "default" },
  { label: "Review", status: "default" },
];
const STATUSES: StepStatus[] = ["default", "complete", "active", "partial", "error", "disabled"];
const cap = (t: string) => html`<div style="font:var(--text-label-small);color:var(--foreground-secondary);margin-block-end:var(--space-sm)">${t}</div>`;

const meta: Meta = {
  title: "Components/Stepper",
  component: "zds-horizontal-stepper",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Shows where a person is in a fixed sequence of steps. `<zds-horizontal-stepper>` holds `<zds-step-horizontal>`s, or on `compact` a summary above one `<zds-step-segment>` per step. `<zds-vertical-stepper>` holds `<zds-step-vertical>`s, or with `card` a column of `<zds-step-card>`s. Each step sets its own `status`; keep exactly one `active`. Steps number themselves and the last drops its line. Spec: specs/stepper.",
      },
    },
  },
  argTypes: {
    size: { control: "inline-radio", options: ["default", "compact"] },
    showSubtitle: { control: "boolean" },
  },
  args: { size: "default", showSubtitle: true },
  render: (a) => html`<div style="inline-size:${a.size === "compact" ? 340 : 640}px">
    <zds-horizontal-stepper size=${a.size} accessible-label="Checkout" current-step="3" total-steps="5" label="Payment" subtitle="Card" .showSubtitle=${a.showSubtitle}>
      ${a.size === "compact"
        ? STEPS.map((s) => html`<zds-step-segment status=${s.status}></zds-step-segment>`)
        : STEPS.map((s) => html`<zds-step-horizontal status=${s.status} label=${s.label} subtitle=${s.subtitle ?? nothing}></zds-step-horizontal>`)}
    </zds-horizontal-stepper>
  </div>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Horizontal Stepper `size`: default names every step; compact names the current one above the bar. */
export const HorizontalSizes: Story = {
  render: () => html`<div style="display:grid;gap:var(--space-3xl)">
    <div style="inline-size:640px">
      <zds-horizontal-stepper accessible-label="Checkout">
        ${STEPS.map((s) => html`<zds-step-horizontal status=${s.status} label=${s.label} subtitle=${s.subtitle ?? nothing}></zds-step-horizontal>`)}
      </zds-horizontal-stepper>
    </div>
    <div style="inline-size:340px">
      <zds-horizontal-stepper size="compact" accessible-label="Checkout" current-step="3" total-steps="5" label="Payment" subtitle="Card or invoice">
        ${STEPS.map((s, i) => html`<zds-step-segment status=${i === 2 ? "partial" : s.status}></zds-step-segment>`)}
      </zds-horizontal-stepper>
    </div>
  </div>`,
};

/** Vertical Stepper `card` × `rounded`: a rail, sharp cards and rounded cards. */
export const VerticalArrangements: Story = {
  render: () => html`<div style="display:flex;flex-wrap:wrap;align-items:flex-start;gap:var(--space-3xl)">
    <div style="inline-size:220px">
      <zds-vertical-stepper accessible-label="Setup">
        ${STEPS.map((s) => html`<zds-step-vertical status=${s.status} label=${s.label} subtitle=${s.subtitle ?? nothing}></zds-step-vertical>`)}
      </zds-vertical-stepper>
    </div>
    ${[false, true].map((rounded) => html`<div style="inline-size:220px">
      <zds-vertical-stepper card ?rounded=${rounded} accessible-label="Setup">
        ${STEPS.slice(1, 4).map((s) => html`<zds-step-card status=${s.status} label=${s.label} subtitle=${s.subtitle ?? nothing}></zds-step-card>`)}
      </zds-vertical-stepper>
    </div>`)}
  </div>`,
};

/** Every `status` on every step part, numbered by position. */
export const Statuses: Story = {
  render: () => html`<div style="display:flex;flex-wrap:wrap;gap:var(--space-3xl)">
    <div style="inline-size:220px">${cap("Step / Vertical")}
      <zds-vertical-stepper accessible-label="Statuses">
        ${STATUSES.map((s) => html`<zds-step-vertical status=${s} label=${s} subtitle=${s === "active" ? "Subtitle" : nothing}></zds-step-vertical>`)}
      </zds-vertical-stepper>
    </div>
    <div style="inline-size:220px">${cap("Step Card")}
      <zds-vertical-stepper card rounded accessible-label="Statuses">
        ${STATUSES.map((s) => html`<zds-step-card status=${s} label=${s}></zds-step-card>`)}
      </zds-vertical-stepper>
    </div>
    <div style="inline-size:220px">${cap("Step Segment")}
      ${STATUSES.map((s) => html`<div style="display:flex;align-items:center;gap:var(--space-sm);margin-block-end:var(--space-sm)">
        <div style="display:flex;flex:1"><zds-step-segment status=${s}></zds-step-segment></div>
        <span style="font:var(--text-body-small);inline-size:64px">${s}</span>
      </div>`)}
    </div>
    <div style="inline-size:100%">${cap("Step / Horizontal")}
      <div style="inline-size:760px">
        <zds-horizontal-stepper accessible-label="Statuses">
          ${STATUSES.map((s) => html`<zds-step-horizontal status=${s} label=${s}></zds-step-horizontal>`)}
        </zds-horizontal-stepper>
      </div>
    </div>
  </div>`,
};

/** `show-subtitle` and `show-line` on a step. The last step drops its line on its own. */
export const SubtitlesAndLines: Story = {
  render: () => html`<div style="display:grid;gap:var(--space-3xl)">
    <div style="inline-size:640px">
      <zds-horizontal-stepper accessible-label="Subtitles">
        ${STEPS.map((s) => html`<zds-step-horizontal status=${s.status} label=${s.label} subtitle="Subtitle"></zds-step-horizontal>`)}
      </zds-horizontal-stepper>
    </div>
    <div style="inline-size:220px">
      <zds-vertical-stepper accessible-label="Subtitles">
        ${STEPS.map((s) => html`<zds-step-vertical status=${s.status} label=${s.label} subtitle="A longer subtitle that wraps"></zds-step-vertical>`)}
      </zds-vertical-stepper>
    </div>
  </div>`,
};

/** Going back: with `selectable`, a step's text is a button that fires `zds-step-select`. */
export const GoingBack: Story = {
  render: () => {
    const paint = (stepper: HTMLElement, at: number) => {
      [...stepper.children].forEach((el, i) => {
        el.setAttribute("status", i < at ? "complete" : i === at ? "active" : "default");
        el.toggleAttribute("selectable", i < at);
      });
    };
    return html`<div style="inline-size:640px">
      <zds-horizontal-stepper accessible-label="Checkout" @zds-step-select=${(e: CustomEvent) => paint(e.currentTarget as HTMLElement, e.detail.position - 1)}>
        ${STEPS.map((s, i) => html`<zds-step-horizontal label=${s.label} status=${i < 2 ? "complete" : i === 2 ? "active" : "default"} ?selectable=${i < 2}></zds-step-horizontal>`)}
      </zds-horizontal-stepper>
    </div>`;
  },
};
